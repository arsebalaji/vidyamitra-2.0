import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["icons/*", "mascots/*", "illustrations/*", "mitra.svg"],
      manifest: {
        name: "VidyaMitra AI — విద్యామిత్ర",
        short_name: "VidyaMitra",
        description: "Learn mathematics in Telugu, online or offline.",
        theme_color: "#5B5FEF",
        background_color: "#FAFBFF",
        display: "standalone",
        start_url: "/",
        icons: [
          {
            src: "/icons/app-icon-192.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/app-icon-512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/icons/favicon.svg",
            sizes: "any",
            type: "image/svg+xml",
            purpose: "any",
          },
        ],
      },
      workbox: {
        maximumFileSizeToCacheInBytes: 4 * 1024 * 1024,
        globPatterns: ["**/*.{js,css,html,svg,png,json,woff2}"],
        navigateFallback: "/index.html",
      },
    }),
  ],
  server: { proxy: { "/api": "http://127.0.0.1:8000" } },
  preview: { proxy: { "/api": "http://127.0.0.1:8000" } },
});
