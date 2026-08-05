#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
#  CAMPUS OHADA — Lancement des tests d'isolation Firestore
#  Usage : bash scripts/run-tests.sh
#
#  Ce script :
#  1. Démarre l'émulateur Firestore en arrière-plan
#  2. Lance les 45 tests d'isolation avec Vitest
#  3. Arrête l'émulateur proprement après les tests
# ═══════════════════════════════════════════════════════════════════

set -e

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
EMULATOR_PORT=8080
EMULATOR_PID=""

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# ─── Nettoyage à la sortie (même en cas d'erreur) ─────────────────
cleanup() {
  if [ -n "$EMULATOR_PID" ]; then
    echo ""
    echo -e "${YELLOW}→ Arrêt de l'émulateur Firestore (PID $EMULATOR_PID)...${NC}"
    kill "$EMULATOR_PID" 2>/dev/null || true
    wait "$EMULATOR_PID" 2>/dev/null || true
    echo -e "${GREEN}✓ Émulateur arrêté${NC}"
  fi
}
trap cleanup EXIT

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   CAMPUS OHADA — Tests d'isolation Firestore           ${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

cd "$ROOT_DIR"

# ─── Vérification Java (requis pour l'émulateur) ──────────────────
echo -e "${YELLOW}[1/3] Vérification de Java...${NC}"
if ! command -v java &> /dev/null; then
  echo -e "${RED}✗ Java non trouvé. L'émulateur Firestore requiert Java 11+.${NC}"
  echo -e "${RED}  Installe Java : sudo apt-get install default-jre${NC}"
  exit 1
fi
JAVA_VERSION=$(java -version 2>&1 | head -1)
echo -e "${GREEN}✓ Java disponible : $JAVA_VERSION${NC}"
echo ""

# ─── Démarrage de l'émulateur Firestore ───────────────────────────
echo -e "${YELLOW}[2/3] Démarrage de l'émulateur Firestore sur le port $EMULATOR_PORT...${NC}"

# Vérifier si le port est déjà occupé
if lsof -i :$EMULATOR_PORT &>/dev/null 2>&1; then
  echo -e "${YELLOW}  ⚠ Port $EMULATOR_PORT déjà utilisé — arrêt du processus existant...${NC}"
  fuser -k $EMULATOR_PORT/tcp 2>/dev/null || true
  sleep 2
fi

# Démarrer l'émulateur en arrière-plan
# (--import seulement si un jeu de données de test a été sauvegardé au préalable :
#  sans lui, firebase-tools refuse de démarrer si le dossier n'existe pas)
IMPORT_ARGS=()
if [ -d "./emulator-data" ]; then
  IMPORT_ARGS=(--import ./emulator-data)
fi

FIRESTORE_EMULATOR_HOST="localhost:$EMULATOR_PORT" \
npx firebase-tools emulators:start \
  --only firestore \
  --project campus-ohada-test \
  "${IMPORT_ARGS[@]}" \
  2>&1 | grep -v "^$" &

EMULATOR_PID=$!

# Attendre que l'émulateur soit prêt (max 30 secondes)
echo -n "  Attente de l'émulateur"
WAIT=0
MAX_WAIT=30
until curl -sf --max-time 2 "http://localhost:$EMULATOR_PORT" &>/dev/null 2>&1; do
  echo -n "."
  sleep 1
  WAIT=$((WAIT + 1))
  if [ $WAIT -ge $MAX_WAIT ]; then
    echo ""
    echo -e "${RED}✗ L'émulateur n'a pas démarré après ${MAX_WAIT}s${NC}"
    exit 1
  fi
done
echo ""
echo -e "${GREEN}✓ Émulateur Firestore prêt sur localhost:$EMULATOR_PORT${NC}"
echo ""

# ─── Lancement des tests Vitest ───────────────────────────────────
echo -e "${YELLOW}[3/3] Lancement des tests d'isolation...${NC}"
echo ""

export FIRESTORE_EMULATOR_HOST="localhost:$EMULATOR_PORT"

npx vitest run \
  --config vitest.config.js \
  --reporter verbose

TEST_EXIT=$?

echo ""
if [ $TEST_EXIT -eq 0 ]; then
  echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
  echo -e "${GREEN}  ✓ TOUS LES TESTS PASSENT — Isolation confirmée        ${NC}"
  echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
else
  echo -e "${RED}════════════════════════════════════════════════════════${NC}"
  echo -e "${RED}  ✗ DES TESTS ONT ÉCHOUÉ — Voir les détails ci-dessus   ${NC}"
  echo -e "${RED}  Corrige les règles firestore.rules avant de déployer.  ${NC}"
  echo -e "${RED}════════════════════════════════════════════════════════${NC}"
fi

exit $TEST_EXIT
