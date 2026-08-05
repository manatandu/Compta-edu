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

## Déploiement

Prérequis (une seule fois) : se connecter au compte Google propriétaire du projet Firebase `campus-ohada`.

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
