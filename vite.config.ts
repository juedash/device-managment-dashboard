import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), vueDevTools()],
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://api.restful-api.dev",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        onProxyReq(proxyReq, req, res) {
          console.log("Request URL:", req.url); // Logs the request URL before proxying
        },
      },
    },
  },
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
});
