#!/bin/bash
# Arrête le banc : firebase-tools, l'émulateur Firestore (processus Java,
# qui survit sinon à son parent et garde le port 8080) et le site.
pkill -f "emulators:start" 2>/dev/null || true
pkill -f "cloud-firestore-emulator" 2>/dev/null || true
pkill -f "vite --port 5173" 2>/dev/null || true
echo "Banc arrêté."
