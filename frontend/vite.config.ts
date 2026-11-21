import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import { VitePWA } from 'vite-plugin-pwa';
export default defineConfig({plugins:[react(),tailwindcss(),VitePWA({registerType:'autoUpdate',includeAssets:['mitra.svg','icon-192.png','icon-512.png'],manifest:{name:'VidyaMitra AI — విద్యామిత్ర',short_name:'VidyaMitra',description:'Learn mathematics in Telugu, online or offline.',theme_color:'#5B5FEF',background_color:'#FAFBFF',display:'standalone',start_url:'/',icons:[{src:'/icon-192.png',sizes:'192x192',type:'image/png',purpose:'any'},{src:'/icon-512.png',sizes:'512x512',type:'image/png',purpose:'any'},{src:'/mitra.svg',sizes:'any',type:'image/svg+xml',purpose:'any'}]},workbox:{globPatterns:['**/*.{js,css,html,svg,json,woff2}'],navigateFallback:'/index.html'}})],server:{proxy:{'/api':'http://127.0.0.1:8000'}},preview:{proxy:{'/api':'http://127.0.0.1:8000'}}});
