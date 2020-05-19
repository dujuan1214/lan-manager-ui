import express from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import ParcelBundler from "parcel-bundler";
import path from "path";

if (!process.env.SERVER_URL) {
  console.warn(
    "SERVER_URL environment variable NOT set, skip proxy configuration",
  );
}

const app = express();

if (process.env.SERVER_URL) {
  app.use(
    "/api",
    createProxyMiddleware(["**", "!/*.*", "!/"], {
      target: process.env.SERVER_URL,
      pathRewrite: { "^/api": "" },
      ws: true,
    }),
  );
}

const entries = path.join(__dirname, "src/index.html");

const bundler = new ParcelBundler(entries, { autoInstall: false } as any);

app.use(bundler.middleware());

const port = 1234;
console.log(`Server running at http://localhost:${port}`);
app.listen(port);
