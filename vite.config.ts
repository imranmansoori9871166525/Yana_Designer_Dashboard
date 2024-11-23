import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  // plugins: [react()],
  server: {
    host: true, // true
    port: 5173,
    // headers: {
    //   "Cross-Origin-Opener-Policy": "unsafe-none",
    //   "Cross-Origin-Embedder-Policy": "unsafe-none",
    // },
  },
});
