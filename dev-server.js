#!/usr/bin/env node
const http = require('http');
const path = require('path');
const fs = require('fs');
const url = require('url');

const HOST = process.env.HOST || '0.0.0.0';
const PORT = Number(process.env.PORT || 3000);
const PUBLIC_ROOT = path.join(__dirname);

const mimeTypes = new Map([
  ['.html', 'text/html; charset=utf-8'],
  ['.js', 'application/javascript; charset=utf-8'],
  ['.css', 'text/css; charset=utf-8'],
  ['.json', 'application/json; charset=utf-8'],
  ['.png', 'image/png'],
  ['.jpg', 'image/jpeg'],
  ['.jpeg', 'image/jpeg'],
  ['.gif', 'image/gif'],
  ['.svg', 'image/svg+xml'],
  ['.ico', 'image/x-icon'],
  ['.webp', 'image/webp'],
  ['.woff', 'font/woff'],
  ['.woff2', 'font/woff2'],
]);

function sendError(res, statusCode, message) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'text/plain; charset=utf-8');
  res.end(message);
}

function serveStatic(res, filePath) {
  fs.readFile(filePath, (err, data) => {
    if (err) {
      if (err.code === 'ENOENT') {
        res.statusCode = 404;
        res.end('Not Found');
      } else {
        console.error('Static file error:', err);
        sendError(res, 500, 'Internal Server Error');
      }
      return;
    }

    const ext = path.extname(filePath).toLowerCase();
    const mime = mimeTypes.get(ext) || 'application/octet-stream';
    res.statusCode = 200;
    res.setHeader('Content-Type', mime);
    res.end(data);
  });
}

const apiHandlers = new Map([
  ['/api/submit', path.join(__dirname, 'api', 'submit.js')],
]);

function handleApi(req, res, pathname) {
  const handlerPath = apiHandlers.get(pathname);
  if (!handlerPath) {
    sendError(res, 404, 'API route not found');
    return;
  }

  delete require.cache[handlerPath];
  const handlerModule = require(handlerPath);
  const handler = handlerModule.default || handlerModule;

  if (typeof handler !== 'function') {
    console.error(`API handler at ${handlerPath} does not export a function.`);
    sendError(res, 500, 'Misconfigured API handler');
    return;
  }

  try {
    const result = handler(req, res);
    if (result && typeof result.catch === 'function') {
      result.catch((err) => {
        console.error('Unhandled API error:', err);
        if (!res.headersSent) {
          sendError(res, 500, 'Internal Server Error');
        } else {
          res.end();
        }
      });
    }
  } catch (err) {
    console.error('API handler crashed:', err);
    if (!res.headersSent) {
      sendError(res, 500, 'Internal Server Error');
    }
  }
}

function resolveStaticPath(pathname) {
  const decoded = decodeURIComponent(pathname);
  if (decoded.includes('\0')) return null;

  const absolutePath = path.join(PUBLIC_ROOT, decoded);
  if (!absolutePath.startsWith(PUBLIC_ROOT)) return null;
  return absolutePath;
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url);
  const pathname = parsedUrl.pathname || '/';

  if (pathname.startsWith('/api/')) {
    handleApi(req, res, pathname);
    return;
  }

  let staticPath = resolveStaticPath(pathname);

  if (!staticPath) {
    sendError(res, 400, 'Bad Request');
    return;
  }

  fs.stat(staticPath, (err, stats) => {
    if (!err && stats.isDirectory()) {
      staticPath = path.join(staticPath, 'index.html');
    }

    fs.stat(staticPath, (statErr, statInfo) => {
      if (statErr) {
        if (statErr.code === 'ENOENT') {
          const fallbackPath = path.join(PUBLIC_ROOT, 'index.html');
          serveStatic(res, fallbackPath);
        } else {
          console.error('Static lookup error:', statErr);
          sendError(res, 500, 'Internal Server Error');
        }
        return;
      }

      if (statInfo.isFile()) {
        serveStatic(res, staticPath);
      } else {
        const fallbackPath = path.join(PUBLIC_ROOT, 'index.html');
        serveStatic(res, fallbackPath);
      }
    });
  });
});

server.listen(PORT, HOST, () => {
  console.log(`Local dev server running at http://${HOST}:${PORT}`);
  console.log('Serving static assets from', PUBLIC_ROOT);
});

