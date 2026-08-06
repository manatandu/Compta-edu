/**
 * CAMPUS OHADA — Helpers pour les tests de sécurité Firestore
 * Identités fictives utilisées dans tous les tests
 */

// ─── Identités de test ────────────────────────────────────────────────────────

export const USERS = {
  // Administrateurs
  admin1:   { uid: 'admin1-uid',   role: 'admin',      username: 'admin1' },
  admin2:   { uid: 'admin2-uid',   role: 'admin',      username: 'admin2' },

  // Professeurs
  prof1:    { uid: 'prof1-uid',    role: 'professeur', username: 'prof1',  adminId: 'admin1-uid' },
  prof2:    { uid: 'prof2-uid',    role: 'professeur', username: 'prof2',  adminId: 'admin2-uid' },

  // Étudiants
  etud1:    { uid: 'etud1-uid',    role: 'etudiant',   username: 'etud1',
              coursIds: ['cours-compta-uid', 'cours-droit-uid'],
              promotionId: 'promo-L1-uid' },

  etud2:    { uid: 'etud2-uid',    role: 'etudiant',   username: 'etud2',
              coursIds: ['cours-fiscalite-uid'],
              promotionId: 'promo-L2-uid' },

  etud3:    { uid: 'etud3-uid',    role: 'etudiant',   username: 'etud3',
              coursIds: ['cours-compta-uid'],
              promotionId: 'promo-L1-uid' },

  // Inconnu (non authentifié)
  inconnu:  null,
}

// ─── IDs des entités de test ───────────────────────────────────────────────────

export const IDS = {
  // Cours
  coursCompta:    'cours-compta-uid',      // appartient à admin1 / prof1
  coursDroit:     'cours-droit-uid',       // appartient à admin1 / prof1
  coursFiscalite: 'cours-fiscalite-uid',   // appartient à admin2 / prof2

  // Promotions
  promoL1: 'promo-L1-uid',
  promoL2: 'promo-L2-uid',

  // Universités / Facultés
  univ1:   'univ1-uid',
  univ2:   'univ2-uid',
  fac1:    'fac1-uid',
  fac2:    'fac2-uid',
}

// ─── Données Firestore de base pour les tests ─────────────────────────────────

export const DOCS = {
  // Document "cours-compta" appartenant à admin1/prof1
  coursCompta: {
    id: IDS.coursCompta,
    nom: 'Comptabilité Générale',
    adminId: USERS.admin1.uid,
    createdBy: USERS.prof1.uid,
    faculteId: IDS.fac1,
    universiteId: IDS.univ1,
  },

  // Document "cours-fiscalite" appartenant à admin2/prof2
  coursFiscalite: {
    id: IDS.coursFiscalite,
    nom: 'Fiscalité',
    adminId: USERS.admin2.uid,
    createdBy: USERS.prof2.uid,
    faculteId: IDS.fac2,
    universiteId: IDS.univ2,
  },

  // Note de cours liée à cours-compta + promo-L1
  noteCoursCompta: {
    titre: 'Introduction SYSCOHADA',
    coursId: IDS.coursCompta,
    promotionId: IDS.promoL1,
    createdBy: USERS.prof1.uid,
    actif: true,
    contenu: 'Contenu test',
  },

  // Note de cours liée à cours-fiscalite + promo-L2
  notesCoursFiscalite: {
    titre: 'Introduction TVA',
    coursId: IDS.coursFiscalite,
    promotionId: IDS.promoL2,
    createdBy: USERS.prof2.uid,
    actif: true,
    contenu: 'Contenu test TVA',
  },

  // Devoir lié à cours-compta
  devoirCompta: {
    titre: 'Devoir 1 — Journal',
    coursId: IDS.coursCompta,
    promotionId: IDS.promoL1,
    createdBy: USERS.prof1.uid,
  },

  // Exercice libre lié à cours-compta
  exerciceLibreCompta: {
    titre: 'Exercice CUMP',
    coursId: IDS.coursCompta,
    createdBy: USERS.prof1.uid,
    type: 'pratique',
  },

  // Tentative de etud1 sur un exercice — champ 'userId', PAS 'etudiantId' : c'est le
  // champ réellement écrit par saveTentativeAsync()/ExerciceDetailPage.tsx (voir
  // firestore.rules, bloc TENTATIVES, pour l'historique du bug corrigé).
  tentativeEtud1: {
    userId: USERS.etud1.uid,
    exerciceId: 'ex-001',
    coursId: IDS.coursCompta,
    score: 15,
  },

  // Tentative de etud2 sur un exercice (cours différent)
  tentativeEtud2: {
    userId: USERS.etud2.uid,
    exerciceId: 'ex-002',
    coursId: IDS.coursFiscalite,
    score: 18,
  },

  // Université
  univ1: {
    nom: 'Université de Kinshasa',
    adminId: USERS.admin1.uid,
  },

  // Présence — forme réelle (voir type Presence dans db.ts) : un tableau d'objets
  // 'etudiants', PAS un champ plat 'etudiantId'. 'etudiantIds' est le champ plat
  // dérivé maintenu par createPresenceAsync()/updatePresenceAsync(), utilisé par la
  // règle de lecture et par la requête array-contains (voir firestore.rules et
  // db-firebase.ts pour l'historique du bug corrigé).
  presenceEtud1: {
    coursId: IDS.coursCompta,
    createdBy: USERS.prof1.uid,
    date: '2026-06-24',
    etudiants: [{ etudiantId: USERS.etud1.uid, present: true }],
    etudiantIds: [USERS.etud1.uid],
  },
}

// ─── Auth token simulé ─────────────────────────────────────────────────────────

/**
 * Retourne un objet token Firebase simulé pour l'émulateur
 * @param {object|null} user — USERS.xxx ou null pour non-authentifié
 */
export function token(user) {
  if (!user) return undefined // non authentifié
  return { uid: user.uid }
}
