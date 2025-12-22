import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// Optional: generate self-signed cert for HTTPS
const certPath = path.resolve(__dirname, "cert.pem");
const keyPath = path.resolve(__dirname, "key.pem");

export default defineConfig({
  plugins: [react()],
  server: {
    host: true, // exposes to LAN
    https: fs.existsSync(certPath) && fs.existsSync(keyPath) ? {
      key: fs.readFileSync(keyPath),
      cert: fs.readFileSync(certPath),
    } : false,
    proxy: {
      '/getlocation': {
        target: 'https://103.165.119.119:8082',
        changeOrigin: true,
        secure: false,
      },
      '/getstaff': {
        target: 'https://103.165.119.119:8082',
        changeOrigin: true,
        secure: false,
      },
      '/loginmahi': {
        target: 'https://103.165.119.119:8082',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
