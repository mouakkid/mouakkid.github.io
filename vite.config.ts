import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import crypto from 'node:crypto'

// --- FIX ROBUSTE POUR NODE.JS ---
// Vite a besoin de crypto.getRandomValues pour démarrer.
// Certains environnements (comme Codespaces ou Node <19) ne l'ont pas par défaut.
// On force l'utilisation de la méthode native de Node 'randomFillSync'.
if (typeof globalThis.crypto === 'undefined') {
  // @ts-ignore
  globalThis.crypto = {};
}

if (typeof globalThis.crypto.getRandomValues === 'undefined') {
  // @ts-ignore
  globalThis.crypto.getRandomValues = (arr: any) => {
    return crypto.randomFillSync(arr);
  };
}
// ----------------------------------

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Le base: './' est crucial pour GitHub Pages car le site est souvent dans un sous-dossier
  base: './', 
})
