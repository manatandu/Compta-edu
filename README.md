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

## Déploiement des règles Firestore

```bash
npm run deploy:rules
```
