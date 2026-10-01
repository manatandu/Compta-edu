#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
#  Banc de test du parcours complet, sur émulateurs locaux (jamais la
#  production) : Auth + Firestore, puis le site en mode développement
#  branché dessus, et un compte administrateur fictif.
#  Usage : bash scripts/e2e/demarrer.sh   (arrêt : bash scripts/e2e/arreter.sh)
#
#  Plusieurs bancs peuvent tourner côte à côte : il suffit de donner à
#  chacun ses ports (les valeurs par défaut sont celles de firebase.json) :
#    E2E_SITE_PORT=5273 E2E_AUTH_PORT=9199 E2E_FS_PORT=8180 \
#    E2E_HUB_PORT=4410 E2E_LOG_PORT=4510 E2E_WS_PORT=9160 bash scripts/e2e/demarrer.sh
#  L'arrêt se fait avec les mêmes variables (au moins E2E_SITE_PORT).
# ═══════════════════════════════════════════════════════════════════
set -e
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SITE_PORT="${E2E_SITE_PORT:-5173}"
AUTH_PORT="${E2E_AUTH_PORT:-9099}"
FS_PORT="${E2E_FS_PORT:-8080}"
HUB_PORT="${E2E_HUB_PORT:-4400}"
LOG_PORT="${E2E_LOG_PORT:-4500}"
WS_PORT="${E2E_WS_PORT:-9150}"
LOGS="${E2E_LOGS:-/tmp/e2e-orbit-$SITE_PORT}"
mkdir -p "$LOGS"
: > "$LOGS/pids"
echo "$SITE_PORT $AUTH_PORT $FS_PORT $HUB_PORT $LOG_PORT $WS_PORT" > "$LOGS/ports"

# Configuration des émulateurs propre à ce banc (mêmes règles et index que
# firebase.json, seuls les ports changent).
CONFIG="$ROOT/firebase.e2e-$SITE_PORT.json"
node -e '
const fs = require("fs")
const c = JSON.parse(fs.readFileSync(process.argv[1], "utf8"))
const [auth, fsPort, hub, log, ws] = process.argv.slice(3).map(Number)
c.emulators = {
  auth: { host: "127.0.0.1", port: auth },
  firestore: { host: "127.0.0.1", port: fsPort, websocketPort: ws },
  hub: { host: "127.0.0.1", port: hub },
  logging: { host: "127.0.0.1", port: log },
  ui: { enabled: false },
}
fs.writeFileSync(process.argv[2], JSON.stringify(c, null, 2))
' "$ROOT/firebase.json" "$CONFIG" "$AUTH_PORT" "$FS_PORT" "$HUB_PORT" "$LOG_PORT" "$WS_PORT"

# setsid : chaque processus lancé ici dirige son propre groupe, que l'arrêt
# supprime en entier (l'émulateur Firestore est un processus Java enfant qui
# survit sinon à firebase-tools et garde son port).
cd "$ROOT"
setsid nohup npx firebase-tools emulators:start --only auth,firestore --project campus-ohada \
  --config "$CONFIG" > "$LOGS/emulateurs.log" 2>&1 &
echo $! >> "$LOGS/pids"
for i in $(seq 1 60); do
  curl -s "http://127.0.0.1:$AUTH_PORT" >/dev/null && curl -s "http://127.0.0.1:$FS_PORT" >/dev/null && break
  sleep 2
done

cd "$ROOT/client"
VITE_EMULATEURS=1 VITE_EMU_AUTH_PORT="$AUTH_PORT" VITE_EMU_FS_PORT="$FS_PORT" \
  setsid nohup ./node_modules/.bin/vite --port "$SITE_PORT" --strictPort > "$LOGS/site.log" 2>&1 &
echo $! >> "$LOGS/pids"
for i in $(seq 1 30); do curl -s "http://127.0.0.1:$SITE_PORT" >/dev/null && break; sleep 1; done

E2E_AUTH_PORT="$AUTH_PORT" E2E_FS_PORT="$FS_PORT" node "$ROOT/scripts/e2e/amorcer.mjs"
echo "Banc prêt : http://127.0.0.1:$SITE_PORT (admin.test / Admin-Test-2026)"
