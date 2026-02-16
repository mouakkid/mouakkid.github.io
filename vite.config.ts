import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import crypto from 'node:crypto'

// --- FIX COMPATIBILITÉ NODE.JS ---
// Si la version de Node est ancienne (<19), globalThis.crypto n'existe pas.
// On l'injecte manuellement pour que Vite puisse démarrer.
if (!globalThis.crypto) {
  // @ts-ignore
  globalThis.crypto = crypto.webcrypto;
}
// ----------------------------------

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Le base: './' est crucial pour GitHub Pages car le site est souvent dans un sous-dossier
  base: './', 
})
