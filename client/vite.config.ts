import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  base: "./",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    outDir: "../dist/public",
    emptyOutDir: true,
    rollupOptions: {
      output: {
        // Sépare les grosses dépendances stables dans leurs propres fichiers :
        // le navigateur les met en cache indépendamment du code applicatif
        // (qui change à chaque déploiement), donc les visites suivantes
        // n'ont plus qu'à re-télécharger le petit chunk de page.
        manualChunks: {
          'vendor-react': ['react', 'react-dom', 'wouter'],
          'vendor-firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          'vendor-radix': [
            '@radix-ui/react-accordion', '@radix-ui/react-alert-dialog', '@radix-ui/react-avatar',
            '@radix-ui/react-checkbox', '@radix-ui/react-dialog', '@radix-ui/react-dropdown-menu',
            '@radix-ui/react-label', '@radix-ui/react-popover', '@radix-ui/react-progress',
            '@radix-ui/react-scroll-area', '@radix-ui/react-select', '@radix-ui/react-separator',
            '@radix-ui/react-slot', '@radix-ui/react-switch', '@radix-ui/react-tabs',
            '@radix-ui/react-toast', '@radix-ui/react-tooltip',
          ],
          'vendor-icons': ['lucide-react'],
        },
      },
    },
  },
})
