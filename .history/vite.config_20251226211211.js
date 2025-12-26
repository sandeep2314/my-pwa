import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./",  // Use relative paths so assets load correctly on Vercel
  plugins: [react()],
  server: {
    proxy: {
      "/getlocation": {
        target: "https://103.165.119.119:8082",
        changeOrigin: true,
        secure: false,
      },
      "/getstaff": {
        target: "https://103.165.119.119:8082",
        changeOrigin: true,
        secure: false,
      },
      "/loginmahi": {
        target: "https://103.165.119.119:8082",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
