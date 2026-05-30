import { defineConfig } from "vite";

// The core is vendored into public/ and served from this origin. The default
// (single-threaded) ffmpeg core needs no SharedArrayBuffer, so no COOP/COEP
// cross-origin-isolation headers are required.
//
// @ffmpeg/ffmpeg is excluded from dep pre-bundling: it spawns its worker via
// `new Worker(new URL("./worker.js", import.meta.url), { type: "module" })`,
// which Vite's optimizer can't rewrite (it errors looking for worker.js in
// .vite/deps). Excluding it serves the package from source so the URL resolves.
export default defineConfig({
  server: { port: 5174 },
  optimizeDeps: { exclude: ["@ffmpeg/ffmpeg"] },
});
