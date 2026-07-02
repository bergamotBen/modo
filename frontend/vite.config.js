import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // 1. Keeps your ngrok tunnel working smoothly without warning pages
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
    // 2. Permits your specific ngrok domain to access the Vite dev server
    allowedHosts: ["saxophone-stricken-refold.ngrok-free.dev"],

    // 3. Routes incoming DB traffic internally to Supabase on port 54321
    proxy: {
      "/supabase-local": {
        target: "http://localhost:50021",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/supabase-local/, ""),
      },
    },
  },
});
