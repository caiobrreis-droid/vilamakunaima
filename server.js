const http = require("http");
const fs = require("fs");
const path = require("path");

const root = __dirname;
const port = Number(process.env.PORT || 4173);

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

function send(res, status, body, type = "text/plain; charset=utf-8") {
  res.writeHead(status, {
    "Content-Type": type,
    "Cache-Control": status === 200 ? "public, max-age=3600" : "no-store"
  });
  res.end(body);
}

function resolveFile(urlPath) {
  const cleanUrl = decodeURIComponent(urlPath.split("?")[0]);
  const requested = cleanUrl === "/" ? "/index.html" : cleanUrl;
  const filePath = path.normalize(path.join(root, requested));
  if (!filePath.startsWith(root)) return null;
  return filePath;
}

const server = http.createServer((req, res) => {
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
});

server.listen(port, () => {
  console.log(`Vila Makunaima Eventos running on port ${port}`);
});
