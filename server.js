const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);
const databaseUrl = process.env.DATABASE_URL;
let poolPromise;

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
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": status === 200 ? "public, max-age=3600" : "no-store",
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
      return pool;
    })();
  }
  return poolPromise;
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

  if (req.method === "GET" && pathname === "/api/state") {
    const result = await pool.query("select key, value from app_state where key in ('events', 'calendarNotes')");
    const state = Object.fromEntries(result.rows.map(row => [row.key, row.value]));
    sendJson(res, 200, {
      storage: "postgres",
      events: state.events || null,
      calendarNotes: state.calendarNotes || {}
    });
    return true;
  }

  if (req.method === "PUT" && pathname === "/api/events") {
    const events = JSON.parse(await readBody(req));
    await pool.query(`
      insert into app_state(key, value, updated_at)
      values('events', $1::jsonb, now())
      on conflict(key) do update set value = excluded.value, updated_at = now()
    `, [JSON.stringify(events)]);
    sendJson(res, 200, { ok: true });
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
