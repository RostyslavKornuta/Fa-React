import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    port: 4200,
    proxy: {
      "/api": {
        target: "https://fastpress.prezna.com",
        changeOrigin: true,
        secure: false,
        followRedirects: true,
      },
    },
  },
});
