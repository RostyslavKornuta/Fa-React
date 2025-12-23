import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
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
