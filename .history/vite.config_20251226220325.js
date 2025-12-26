export default defineConfig({
  base: "/",  // Important: absolute paths for Netlify
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Mini PWA',
        short_name: 'MiniPWA',
        start_url: '/',
        display: 'standalone',
        background_color: '#121212',
        theme_color: '#1e88e5',
        icons: [
          {
            src: 'icon-192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'icon-512.png',
            sizes: '512x512',
            type: 'image/png'
          }
        ]
      }
    })
  ],
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
