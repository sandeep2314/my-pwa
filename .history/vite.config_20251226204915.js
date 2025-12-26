import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "/",
  plugins: [react()],
  server: {
    proxy: {
      // Proxy for getlocation
      "/getlocation": {
        target: "https://103.165.119.119:8082",
        changeOrigin: true,
        secure: false, // use false if backend uses self-signed SSL
      },
      // Proxy for getstaff
      "/getstaff": {
        target: "https://103.165.119.119:8082",
        changeOrigin: true,
        secure: false,
      },
      // Proxy for loginmahi
      "/loginmahi": {
        target: "https://103.165.119.119:8082",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
