#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
#  CAMPUS OHADA — Hook pré-build automatique
#  Usage : lancé automatiquement par "npm run build" via "prebuild"
#
#  Ce script BLOQUE le build si les règles Firestore ne sont pas
#  conformes. Il garantit qu'on ne publie jamais une version
#  avec des failles d'isolation.
#
#  Flux :
#    npm run build
#      → "prebuild" déclenche ce script
#      → Tests d'isolation lancés
#      → ✅ OK : build continue
#      → ❌ Échec : build annulé avec message d'erreur
# ═══════════════════════════════════════════════════════════════════

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}┌─────────────────────────────────────────────────────┐${NC}"
echo -e "${BLUE}│  CAMPUS OHADA — Vérification pré-build Firestore    │${NC}"
echo -e "${BLUE}└─────────────────────────────────────────────────────┘${NC}"
echo ""

cd "$ROOT_DIR"

# ─── Vérifier si les tests doivent être sautés ────────────────────
# (utile en développement rapide avec SKIP_FIRESTORE_TESTS=1)
if [ "${SKIP_FIRESTORE_TESTS}" = "1" ]; then
  echo -e "${YELLOW}⚠ Tests Firestore ignorés (SKIP_FIRESTORE_TESTS=1)${NC}"
  echo -e "${YELLOW}  ATTENTION : Ne jamais ignorer en production !${NC}"
  echo ""
  exit 0
fi

# ─── Vérification des fichiers critiques ──────────────────────────
echo -e "${YELLOW}→ Vérification des fichiers de sécurité...${NC}"

MISSING=0

[ ! -f "firestore.rules" ] && echo -e "${RED}  ✗ firestore.rules manquant${NC}" && MISSING=1
[ ! -f "firestore.indexes.json" ] && echo -e "${RED}  ✗ firestore.indexes.json manquant${NC}" && MISSING=1
[ ! -f ".firebaserc" ] && echo -e "${RED}  ✗ .firebaserc manquant${NC}" && MISSING=1
[ ! -f "tests/firestore/isolation.test.js" ] && echo -e "${RED}  ✗ tests/firestore/isolation.test.js manquant${NC}" && MISSING=1
[ ! -f "tests/firestore/helpers.js" ] && echo -e "${RED}  ✗ tests/firestore/helpers.js manquant${NC}" && MISSING=1

if [ $MISSING -eq 1 ]; then
  echo ""
  echo -e "${RED}✗ BUILD ANNULÉ — Des fichiers de sécurité sont manquants.${NC}"
  exit 1
fi

echo -e "${GREEN}  ✓ Tous les fichiers de sécurité sont présents${NC}"
echo ""

# ─── Lancement des tests d'isolation ──────────────────────────────
echo -e "${YELLOW}→ Lancement des tests d'isolation Firestore...${NC}"
echo ""

bash scripts/run-tests.sh

TEST_EXIT=$?

echo ""
if [ $TEST_EXIT -eq 0 ]; then
  echo -e "${GREEN}┌─────────────────────────────────────────────────────┐${NC}"
  echo -e "${GREEN}│  ✓ Vérification pré-build réussie — Build autorisé  │${NC}"
  echo -e "${GREEN}└─────────────────────────────────────────────────────┘${NC}"
  echo ""
  exit 0
else
  echo -e "${RED}┌─────────────────────────────────────────────────────┐${NC}"
  echo -e "${RED}│  ✗ BUILD ANNULÉ — Tests d'isolation échoués         │${NC}"
  echo -e "${RED}│                                                     │${NC}"
  echo -e "${RED}│  Action requise :                                   │${NC}"
  echo -e "${RED}│  1. Lire les erreurs ci-dessus                      │${NC}"
  echo -e "${RED}│  2. Corriger firestore.rules                        │${NC}"
  echo -e "${RED}│  3. Relancer : npm run build                        │${NC}"
  echo -e "${RED}│                                                     │${NC}"
  echo -e "${RED}│  Pour ignorer (dev uniquement) :                    │${NC}"
  echo -e "${RED}│  SKIP_FIRESTORE_TESTS=1 npm run build               │${NC}"
  echo -e "${RED}└─────────────────────────────────────────────────────┘${NC}"
  echo ""
  exit 1
fi
