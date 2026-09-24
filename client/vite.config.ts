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
        //
        // Seuls React, Firebase (hors stockage de fichiers) et les icônes
        // forment des groupes fixes : ils servent sur tous les écrans. Les
        // composants Radix ne sont plus regroupés en un bloc chargé d'avance :
        // Rollup les répartit avec les pages qui s'en servent, le premier
        // écran ne télécharge donc que ce qu'il affiche.
        manualChunks(id) {
          if (!id.includes('node_modules')) return undefined
          if (/node_modules\/(react|react-dom|scheduler|wouter|regexparam|use-sync-external-store)\//.test(id)) return 'vendor-react'
          if (/node_modules\/(@firebase\/storage|firebase\/storage)\//.test(id)) return 'vendor-firebase-storage'
          if (/node_modules\/(@firebase|firebase|idb)\//.test(id)) return 'vendor-firebase'
          // Icônes : un seul petit fichier (8 Ko compressés) plutôt qu'un
          // fichier par icône, ce qui multiplierait les allers-retours réseau.
          if (/node_modules\/lucide-react\//.test(id)) return 'vendor-icons'
          return undefined
        },
      },
    },
  },
})
