#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
#  Banc de test du parcours complet, sur émulateurs locaux (jamais la
#  production) : Auth (9099) + Firestore (8080), puis le site en mode
#  développement (5173) branché dessus, et un compte administrateur fictif.
#  Usage : bash scripts/e2e/demarrer.sh   (arrêt : bash scripts/e2e/arreter.sh)
# ═══════════════════════════════════════════════════════════════════
set -e
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
LOGS="${E2E_LOGS:-/tmp/e2e-orbit}"
mkdir -p "$LOGS"

cd "$ROOT"
nohup npx firebase-tools emulators:start --only auth,firestore --project campus-ohada \
  > "$LOGS/emulateurs.log" 2>&1 &
for i in $(seq 1 60); do
  curl -s http://127.0.0.1:9099 >/dev/null && curl -s http://127.0.0.1:8080 >/dev/null && break
  sleep 2
done

cd "$ROOT/client"
VITE_EMULATEURS=1 nohup ./node_modules/.bin/vite --port 5173 --strictPort > "$LOGS/site.log" 2>&1 &
for i in $(seq 1 30); do curl -s http://127.0.0.1:5173 >/dev/null && break; sleep 1; done

node "$ROOT/scripts/e2e/amorcer.mjs"
echo "Banc prêt : http://127.0.0.1:5173 (admin.test / Admin-Test-2026)"
