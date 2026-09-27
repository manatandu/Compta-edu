#!/bin/bash
pkill -f "emulators:start" 2>/dev/null || true
pkill -f "vite --port 5173" 2>/dev/null || true
echo "Banc arrêté."
