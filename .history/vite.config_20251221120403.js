import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/loginmahi": {
        target: "https://103.165.119.119:8082",
        changeOrigin: true,
        secure: false, // only if backend uses self-signed SSL
      },
    },
  },
});
