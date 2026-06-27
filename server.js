const http = require("http");
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const databaseUrl = process.env.DATABASE_URL;
const debugPersistence = process.env.DEBUG_PERSISTENCE === "1";
let poolPromise;

function persistLog(label, payload = {}) {
  if (!debugPersistence) return;
  console.log(`[persist] ${label}`, JSON.stringify(payload));
}

function hashPassword(password, salt = crypto.randomBytes(16).toString("hex")) {
  const hash = crypto.pbkdf2Sync(String(password), salt, 120000, 32, "sha256").toString("hex");
  return `${salt}:${hash}`;
}

function verifyPassword(password, stored = "") {
  const [salt, original] = String(stored).split(":");
  if (!salt || !original) return false;
  const candidate = hashPassword(password, salt).split(":")[1];
  return crypto.timingSafeEqual(Buffer.from(candidate, "hex"), Buffer.from(original, "hex"));
}

function publicUser(row) {
  return {
    id: row.id,
    name: row.name,
    email: row.email,
    role: row.role,
    active: row.active
  };
}

const mimeTypes = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf"
};

function send(res, status, body, type = "text/plain; charset=utf-8", extraHeaders = {}) {
  const dynamicAsset = type.includes("text/html") || type.includes("text/css") || type.includes("javascript");
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": status !== 200 || dynamicAsset ? "no-store" : "public, max-age=3600",
    ...extraHeaders
  });
  res.end(body);
}

function sendJson(res, status, payload) {
  send(res, status, JSON.stringify(payload), "application/json; charset=utf-8");
}

function readBody(req, limit = 80 * 1024 * 1024) {
  return new Promise((resolve, reject) => {
    let size = 0;
    const chunks = [];
    req.on("data", chunk => {
      size += chunk.length;
      if (size > limit) {
        reject(new Error("Payload too large"));
        req.destroy();
        return;
      }
      chunks.push(chunk);
    });
    req.on("end", () => resolve(Buffer.concat(chunks).toString("utf8")));
    req.on("error", reject);
  });
}

async function getPool() {
  if (!databaseUrl) return null;
  if (!poolPromise) {
    poolPromise = (async () => {
      const { Pool } = require("pg");
      const pool = new Pool({
        connectionString: databaseUrl,
        ssl: process.env.PGSSLMODE === "disable" ? false : { rejectUnauthorized: false }
      });
      await pool.query(`
        create table if not exists app_state (
          key text primary key,
          value jsonb not null,
          updated_at timestamptz not null default now()
        );
      `);
      await pool.query(`
        create table if not exists app_documents (
          id bigserial primary key,
          event_id text not null,
          file_name text not null,
          doc_type text not null default 'Documento',
          content_type text not null default 'application/pdf',
          data bytea not null,
          created_at timestamptz not null default now(),
          unique(event_id, file_name)
        );
      `);
      await pool.query(`
        create table if not exists app_users (
          id bigserial primary key,
          name text not null,
          email text not null unique,
          role text not null,
          password_hash text not null,
          active boolean not null default true,
          created_at timestamptz not null default now()
        );
      `);
      await pool.query(`
        create table if not exists app_events (
          id text primary key,
          value jsonb not null,
          updated_at timestamptz not null default now()
        );
      `);
      await pool.query(`
        insert into app_events(id, value, updated_at)
        select item->>'id', item, now()
        from app_state,
          jsonb_array_elements(case when jsonb_typeof(value) = 'array' then value else '[]'::jsonb end) as item
        where key = 'events'
          and item ? 'id'
        on conflict(id) do nothing;
      `);
      const users = await pool.query("select count(*)::int as total from app_users");
      if (!users.rows[0].total) {
        await pool.query(
          "insert into app_users(name, email, role, password_hash) values($1, $2, $3, $4)",
          ["Admin Vila", "admin@vilamakunaima.com", "Administrador", hashPassword("admin123")]
        );
      }
      return pool;
    })();
  }
  return poolPromise;
}

async function readEvents(pool) {
  const result = await pool.query(`
    select value
    from app_events
    order by
      coalesce(value->>'date', '') desc,
      coalesce(value->>'start', '') desc,
      updated_at desc
  `);
  if (result.rowCount) {
    const events = result.rows.map(row => row.value);
    persistLog("readEvents:app_events", { count: events.length, ids: events.map(event => event.id) });
    return events;
  }
  const legacy = await pool.query("select value from app_state where key = 'events'");
  const events = Array.isArray(legacy.rows[0]?.value) ? legacy.rows[0].value : [];
  persistLog("readEvents:legacy_app_state", { count: events.length, ids: events.map(event => event.id) });
  return events;
}

async function writeEvents(pool, events) {
  const list = Array.isArray(events) ? events.filter(event => event && event.id !== undefined && event.id !== null) : [];
  persistLog("writeEvents:start", { count: list.length, ids: list.map(event => event.id) });
  if (!list.length) return;
  await pool.query("begin");
  try {
    for (const event of list) {
      await pool.query(`
        insert into app_events(id, value, updated_at)
        values($1, $2::jsonb, now())
        on conflict(id) do update set value = excluded.value, updated_at = now()
      `, [String(event.id), JSON.stringify(event)]);
    }
    await pool.query("commit");
  } catch (error) {
    await pool.query("rollback");
    throw error;
  }
}

async function writeEvent(pool, event) {
  persistLog("writeEvent:start", { id: event?.id, name: event?.name });
  await pool.query(`
    insert into app_events(id, value, updated_at)
    values($1, $2::jsonb, now())
    on conflict(id) do update set value = excluded.value, updated_at = now()
  `, [String(event.id), JSON.stringify(event)]);
}

async function handleApi(req, res, pathname) {
  const pool = await getPool();
  if (!pool) {
    sendJson(res, 200, { storage: "local", message: "DATABASE_URL not configured" });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/health") {
    sendJson(res, 200, { ok: true, storage: "postgres" });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/login") {
    const payload = JSON.parse(await readBody(req));
    const email = String(payload.email || "").trim().toLowerCase();
    const password = String(payload.password || "");
    const result = await pool.query(
      "select id, name, email, role, active, password_hash from app_users where lower(email) = $1 and active = true",
      [email]
    );
    const user = result.rows[0];
    if (!user || !verifyPassword(password, user.password_hash)) {
      sendJson(res, 401, { error: "E-mail ou senha inválidos." });
      return true;
    }
    sendJson(res, 200, { ok: true, user: publicUser(user) });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/users") {
    const result = await pool.query("select id, name, email, role, active from app_users order by id");
    sendJson(res, 200, { users: result.rows.map(publicUser) });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/users") {
    const payload = JSON.parse(await readBody(req));
    const name = String(payload.name || "").trim();
    const email = String(payload.email || "").trim().toLowerCase();
    const role = String(payload.role || "Funcionário/Equipe").trim();
    const password = String(payload.password || "");
    if (!name || !email || password.length < 4) {
      sendJson(res, 400, { error: "Informe nome, e-mail e uma senha com pelo menos 4 caracteres." });
      return true;
    }
    try {
      const result = await pool.query(
        "insert into app_users(name, email, role, password_hash) values($1, $2, $3, $4) returning id, name, email, role, active",
        [name, email, role, hashPassword(password)]
      );
      sendJson(res, 201, { ok: true, user: publicUser(result.rows[0]) });
    } catch (error) {
      if (error.code === "23505") {
        sendJson(res, 409, { error: "Já existe um usuário com esse e-mail." });
      } else {
        throw error;
      }
    }
    return true;
  }

  const userPasswordMatch = pathname.match(/^\/api\/users\/(\d+)\/password$/);
  if (req.method === "PUT" && userPasswordMatch) {
    const payload = JSON.parse(await readBody(req));
    const password = String(payload.password || "");
    if (password.length < 4) {
      sendJson(res, 400, { error: "A senha precisa ter pelo menos 4 caracteres." });
      return true;
    }
    const result = await pool.query(
      "update app_users set password_hash = $1 where id = $2 returning id, name, email, role, active",
      [hashPassword(password), userPasswordMatch[1]]
    );
    if (!result.rowCount) {
      sendJson(res, 404, { error: "Usuário não encontrado." });
      return true;
    }
    sendJson(res, 200, { ok: true, user: publicUser(result.rows[0]) });
    return true;
  }

  if (req.method === "GET" && pathname === "/api/state") {
    persistLog("GET /api/state:start");
    const result = await pool.query("select key, value from app_state where key in ('events', 'calendarNotes')");
    const state = Object.fromEntries(result.rows.map(row => [row.key, row.value]));
    const events = await readEvents(pool);
    persistLog("GET /api/state:send", { count: events.length, ids: events.map(event => event.id) });
    sendJson(res, 200, {
      storage: "postgres",
      events,
      calendarNotes: state.calendarNotes || {}
    });
    return true;
  }

  if (req.method === "PUT" && pathname === "/api/events") {
    const events = JSON.parse(await readBody(req));
    persistLog("PUT /api/events", { count: Array.isArray(events) ? events.length : null, ids: Array.isArray(events) ? events.map(event => event.id) : [] });
    await writeEvents(pool, events);
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/events/upsert") {
    const event = JSON.parse(await readBody(req));
    persistLog("POST /api/events/upsert", { id: event?.id, name: event?.name });
    if (!event || event.id === undefined || event.id === null) {
      sendJson(res, 400, { error: "Event id is required" });
      return true;
    }
    await writeEvent(pool, event);
    sendJson(res, 200, { ok: true, events: await readEvents(pool) });
    return true;
  }

  const eventDeleteMatch = pathname.match(/^\/api\/events\/([^/]+)$/);
  if (req.method === "DELETE" && eventDeleteMatch) {
    const eventId = decodeURIComponent(eventDeleteMatch[1]);
    await pool.query("delete from app_events where id = $1", [eventId]);
    sendJson(res, 200, { ok: true, events: await readEvents(pool) });
    return true;
  }

  if (req.method === "PUT" && pathname === "/api/calendar-notes") {
    const notes = JSON.parse(await readBody(req));
    await pool.query(`
      insert into app_state(key, value, updated_at)
      values('calendarNotes', $1::jsonb, now())
      on conflict(key) do update set value = excluded.value, updated_at = now()
    `, [JSON.stringify(notes)]);
    sendJson(res, 200, { ok: true });
    return true;
  }

  if (req.method === "POST" && pathname === "/api/documents") {
    const payload = JSON.parse(await readBody(req));
    const data = Buffer.from(payload.base64 || "", "base64");
    await pool.query(`
      insert into app_documents(event_id, file_name, doc_type, content_type, data)
      values($1, $2, $3, $4, $5)
      on conflict(event_id, file_name)
      do update set doc_type = excluded.doc_type, content_type = excluded.content_type, data = excluded.data
    `, [
      String(payload.eventId),
      payload.fileName,
      payload.docType || "Documento",
      payload.contentType || "application/pdf",
      data
    ]);
    sendJson(res, 200, { ok: true });
    return true;
  }

  const docMatch = pathname.match(/^\/api\/documents\/([^/]+)\/(.+)$/);
  if (req.method === "GET" && docMatch) {
    const eventId = decodeURIComponent(docMatch[1]);
    const fileName = decodeURIComponent(docMatch[2]);
    const result = await pool.query(
      "select file_name, content_type, data from app_documents where event_id = $1 and file_name = $2",
      [eventId, fileName]
    );
    if (!result.rowCount) {
      sendJson(res, 404, { error: "Document not found" });
      return true;
    }
    const doc = result.rows[0];
    send(res, 200, doc.data, doc.content_type, {
      "Content-Disposition": `attachment; filename="${encodeURIComponent(doc.file_name)}"`,
      "Cache-Control": "no-store"
    });
    return true;
  }

  sendJson(res, 404, { error: "API route not found" });
  return true;
}

function resolveFile(urlPath) {
  const cleanUrl = decodeURIComponent(urlPath.split("?")[0]);
  const requested = cleanUrl === "/" ? "/index.html" : cleanUrl;
  const filePath = path.normalize(path.join(root, requested));
  if (!filePath.startsWith(root)) return null;
  return filePath;
}

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url || "/", `http://${req.headers.host || "localhost"}`);
    if (url.pathname.startsWith("/api/")) {
      await handleApi(req, res, url.pathname);
      return;
    }

    const filePath = resolveFile(req.url || "/");
    if (!filePath) {
      send(res, 403, "Forbidden");
      return;
    }

    fs.readFile(filePath, (error, data) => {
      if (error) {
        fs.readFile(path.join(root, "index.html"), (indexError, indexData) => {
          if (indexError) send(res, 404, "Not found");
          else send(res, 200, indexData, mimeTypes[".html"]);
        });
        return;
      }

      send(res, 200, data, mimeTypes[path.extname(filePath).toLowerCase()] || "application/octet-stream");
    });
  } catch (error) {
    console.error(error);
    sendJson(res, 500, { error: "Internal server error" });
  }
});

server.listen(port, () => {
  console.log(`Vila Makunaima Eventos running on port ${port}`);
});
