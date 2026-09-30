#!/bin/bash
# Arrête le banc lancé par demarrer.sh avec le même E2E_SITE_PORT (5173 par
# défaut) : chaque processus enregistré dirige son groupe, supprimé en entier
# (firebase-tools, l'émulateur Firestore en Java, le site). Les autres bancs
# ne sont pas touchés.
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
SITE_PORT="${E2E_SITE_PORT:-5173}"
LOGS="${E2E_LOGS:-/tmp/e2e-orbit-$SITE_PORT}"
if [ -f "$LOGS/pids" ]; then
  while read -r pid; do
    [ -n "$pid" ] && kill -TERM -- "-$pid" 2>/dev/null
  done < "$LOGS/pids"
  sleep 2
  while read -r pid; do
    [ -n "$pid" ] && kill -KILL -- "-$pid" 2>/dev/null
  done < "$LOGS/pids"
  rm -f "$LOGS/pids"
fi
rm -f "$ROOT/firebase.e2e-$SITE_PORT.json"
echo "Banc $SITE_PORT arrêté."
