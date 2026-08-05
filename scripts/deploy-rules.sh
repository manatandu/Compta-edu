#!/bin/bash
# ═══════════════════════════════════════════════════════════════════
#  CAMPUS OHADA — Déploiement des règles Firestore
#  Usage : bash scripts/deploy-rules.sh
#
#  Ce script :
#  1. Lance les tests d'isolation en local (émulateur)
#  2. Si tous les tests passent → déploie les règles sur Firebase
#  3. Si un test échoue → BLOQUE le déploiement
# ═══════════════════════════════════════════════════════════════════

set -e  # Arrêt immédiat si une commande échoue

ROOT_DIR="$(cd "$(dirname "$0")/.." && pwd)"
RULES_FILE="$ROOT_DIR/firestore.rules"
INDEXES_FILE="$ROOT_DIR/firestore.indexes.json"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo ""
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo -e "${BLUE}   CAMPUS OHADA — Déploiement Firestore Security Rules   ${NC}"
echo -e "${BLUE}════════════════════════════════════════════════════════${NC}"
echo ""

# ─── Étape 1 : Vérification des fichiers requis ───────────────────
echo -e "${YELLOW}[1/4] Vérification des fichiers...${NC}"

if [ ! -f "$RULES_FILE" ]; then
  echo -e "${RED}✗ ERREUR : firestore.rules introuvable${NC}"
  exit 1
fi

if [ ! -f "$INDEXES_FILE" ]; then
  echo -e "${RED}✗ ERREUR : firestore.indexes.json introuvable${NC}"
  exit 1
fi

if [ ! -f "$ROOT_DIR/.firebaserc" ]; then
  echo -e "${RED}✗ ERREUR : .firebaserc introuvable — projet Firebase non configuré${NC}"
  exit 1
fi

echo -e "${GREEN}✓ Tous les fichiers Firebase sont présents${NC}"
echo ""

# ─── Étape 2 : Lancement des tests d'isolation ────────────────────
echo -e "${YELLOW}[2/4] Lancement des tests d'isolation Firestore...${NC}"
echo ""

cd "$ROOT_DIR"
bash scripts/run-tests.sh

if [ $? -ne 0 ]; then
  echo ""
  echo -e "${RED}════════════════════════════════════════════════════════${NC}"
  echo -e "${RED}  ✗ DÉPLOIEMENT BLOQUÉ — Des tests ont échoué          ${NC}"
  echo -e "${RED}  Corrige les règles avant de déployer en production.   ${NC}"
  echo -e "${RED}════════════════════════════════════════════════════════${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}✓ Tous les tests d'isolation sont passés${NC}"
echo ""

# ─── Étape 3 : Déploiement sur Firebase ───────────────────────────
echo -e "${YELLOW}[3/4] Déploiement des règles sur Firebase...${NC}"

if ! command -v firebase &> /dev/null; then
  echo -e "${YELLOW}  firebase-tools non trouvé en global, utilisation de npx...${NC}"
  FIREBASE_CMD="npx firebase-tools"
else
  FIREBASE_CMD="firebase"
fi

$FIREBASE_CMD deploy --only firestore:rules,firestore:indexes \
  --project campus-ohada \
  --non-interactive

if [ $? -ne 0 ]; then
  echo -e "${RED}✗ Échec du déploiement Firebase${NC}"
  exit 1
fi

echo ""
echo -e "${GREEN}✓ Règles déployées avec succès sur campus-ohada${NC}"

# ─── Étape 4 : Backup automatique post-déploiement ────────────────
echo ""
echo -e "${YELLOW}[4/4] Backup automatique post-déploiement...${NC}"

cd "$(dirname "$ROOT_DIR")"
TIMESTAMP=$(date +"%Y%m%d-%H%M")
BACKUP="campus-ohada-backup-${TIMESTAMP}.tar.gz"

tar -czf "$BACKUP" \
  --exclude="compta-edu/node_modules" \
  --exclude="compta-edu/client/node_modules" \
  --exclude="compta-edu/.git" \
  compta-edu/

# Nettoyage : garder seulement les 3 derniers backups
BACKUPS=($(ls -t campus-ohada-backup-[0-9]*.tar.gz 2>/dev/null))
for i in "${!BACKUPS[@]}"; do
  if [ $i -ge 3 ]; then
    rm -f "${BACKUPS[$i]}"
  fi
done

echo -e "${GREEN}✓ Backup créé : $BACKUP${NC}"
echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✓ DÉPLOIEMENT TERMINÉ AVEC SUCCÈS                    ${NC}"
echo -e "${GREEN}  Règles + Index déployés sur campus-ohada              ${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════${NC}"
echo ""
