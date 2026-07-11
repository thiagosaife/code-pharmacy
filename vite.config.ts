import { defineConfig } from "vite";

// base: "./" makes the build relocatable (works on GitHub Pages subpaths,
// Netlify, Vercel, or any static file server).
export default defineConfig({
  base: "./",
});
