// ═══════════════════════════════════════════════════════════════════
//  CAMPUS OHADA — Configuration Vitest
//  Fichier : vitest.config.js
//
//  Configure le framework de test pour les règles Firestore.
//  Les tests s'exécutent avec l'émulateur Firestore local.
// ═══════════════════════════════════════════════════════════════════

import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    // Fichiers de test ciblés
    include: ['tests/firestore/**/*.test.js'],

    // Environnement Node.js (pas de browser — on teste des règles Firestore)
    environment: 'node',

    // Timeout généreux pour les opérations Firestore émulées
    testTimeout: 30000,
    hookTimeout: 30000,

    // Exécution séquentielle (un seul émulateur, pas de parallélisme)
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },

    // Rapport détaillé
    reporter: 'verbose',

    // Variables d'environnement injectées dans les tests
    env: {
      FIRESTORE_EMULATOR_HOST: process.env.FIRESTORE_EMULATOR_HOST || 'localhost:8080',
    },

    // Pas de watch en mode CI
    watch: false,
  },
})
