import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa"
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(), 
    VitePWA({
      injectRegister: "auto",
      registerType: "autoUpdate",
      devOptions: { enabled: true },
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"]
      },
      manifest: {
        name: "KadPad",
        short_name: "KadPad",
        description: "KadPad é um aplicativo de bloco de notas que tem o objetivo de ajudar os usuários a organizarem suas anotações com suas tags e links úteis.",
        theme_color: "#1F2125",
        icons: [
          {
            src: "./pwa-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "./pwa-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "./pwa-384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "any",
          },
          {
            src: "./pwa-384x384.png",
            sizes: "384x384",
            type: "image/png",
            purpose: "maskable"
          }
        ]
      }
    })
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url))
    }
  }
});
