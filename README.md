# Compta-edu (Campus OHADA)

Logiciel web pédagogique de comptabilité OHADA/AUDCIF pour étudiants : cours (UE1-UE5), journal, grand livre, balance, bilan, plan comptable, simulateurs fiscaux (TVA, IPR, constitution de société), QCM, gestion des étudiants et des devoirs.

## Stack

- Frontend : React + TypeScript + Vite + Tailwind CSS + Radix UI (dossier `client/`)
- Backend : Firebase (Firestore, Auth, Hosting)
- Tests : Vitest + `@firebase/rules-unit-testing` pour les règles Firestore

## Démarrage

```bash
cd client
npm install
npm run dev
```

## Build

```bash
npm run build   # depuis la racine, lance le build du client
```

## Tests des règles Firestore

```bash
npm run test:firestore
```

## Déploiement automatique (GitHub Actions)

Chaque push sur `main` build l'application, fait tourner les tests d'isolation Firestore, puis déploie automatiquement (Hosting + règles + index) — voir `.github/workflows/firebase-hosting-merge.yml`. Peut aussi être lancé manuellement depuis l'onglet **Actions** de GitHub (bouton **Run workflow**).

### Configuration (une seule fois)

1. Générer une clé de compte de service : [Console Firebase](https://console.firebase.google.com/project/campus-ohada/settings/serviceaccounts/adminsdk) → **Comptes de service** → **Générer une nouvelle clé privée**.
2. Sur GitHub : **Settings** du dépôt → **Secrets and variables** → **Actions** → **New repository secret**.
   - Nom : `FIREBASE_SERVICE_ACCOUNT_CAMPUS_OHADA`
   - Valeur : coller tout le contenu du fichier JSON téléchargé.
3. S'assurer que le compte de service a le rôle **Firebase Admin** (IAM du projet).

Le secret ne quitte jamais GitHub — le workflow y accède uniquement pendant l'exécution, chiffré. Une fois configuré, plus aucune intervention manuelle n'est nécessaire pour déployer.

## Déploiement manuel (dépannage / hors CI)

Prérequis : se connecter au compte Google propriétaire du projet Firebase `campus-ohada`.

```bash
npx firebase-tools login
```

Puis, depuis la racine du dépôt :

```bash
npm run deploy:rules     # règles + index Firestore uniquement (fait tourner les tests d'isolation avant de déployer)
npm run deploy:hosting   # build + déploiement de l'application web (Firebase Hosting)
npm run deploy           # build + déploiement complet (hosting + règles + index)
```

`firebase.json` sert `dist/public` (généré par `npm run build`) via Firebase Hosting, avec réécriture SPA (`**` → `/index.html`) et mise en cache longue durée sur les fichiers hashés du dossier `assets/`.
