// ═══════════════════════════════════════════════════════════════════
//  Tests des calculs de l'application (états financiers, IRPP, amortissements,
//  emprunts...). Fonctions pures du dossier client/src/lib : aucun émulateur.
//  Lancé par « npm run test:calculs », et avant chaque build (prebuild).
// ═══════════════════════════════════════════════════════════════════
import { defineConfig } from 'vitest/config'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  resolve: {
    alias: { '@': fileURLToPath(new URL('./client/src', import.meta.url)) },
  },
  test: {
    include: ['tests/calculs/**/*.test.ts'],
    environment: 'node',
    reporter: 'verbose',
    watch: false,
  },
})
