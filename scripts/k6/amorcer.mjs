// Jeu de données de charge pour les tests k6, sur les émulateurs du banc
// (jamais la production) : une université, deux facultés et leurs 7 cours,
// un professeur, N étudiants (identifiants etu.k6.001…, mot de passe
// Etu-K6-2026), des devoirs de tous types, des copies, des séances de
// présence, une session de journal par étudiant et des codes d'accès.
// Écriture avec le jeton « owner », qui ne vaut que sur l'émulateur.
// Usage : node scripts/k6/amorcer.mjs [nombreEtudiants=150]
const AUTH = `http://127.0.0.1:${process.env.E2E_AUTH_PORT || 9099}`
const FS = `http://127.0.0.1:${process.env.E2E_FS_PORT || 8080}/v1/projects/campus-ohada/databases/(default)/documents`
const H = { 'Content-Type': 'application/json', Authorization: 'Bearer owner' }
const N = Number(process.argv[2] || 150)
const MDP_ETU = 'Etu-K6-2026', MDP_PROF = 'Prof-K6-2026'

const val = x => x === null ? { nullValue: null }
  : typeof x === 'boolean' ? { booleanValue: x }
  : typeof x === 'number' ? (Number.isInteger(x) ? { integerValue: String(x) } : { doubleValue: x })
  : Array.isArray(x) ? { arrayValue: { values: x.map(val) } }
  : typeof x === 'object' ? { mapValue: { fields: Object.fromEntries(Object.entries(x).map(([k, v]) => [k, val(v)])) } }
  : { stringValue: String(x) }
const champs = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k, val(v)]))
async function ecrire(chemin, obj) {
  const r = await fetch(`${FS}/${chemin}`, { method: 'PATCH', headers: H, body: JSON.stringify({ fields: champs(obj) }) })
  if (!r.ok) throw new Error(`${chemin} : ${await r.text()}`)
}
// Écritures groupées par 200 (API commit de l'émulateur)
async function ecrireLot(docs) {
  for (let i = 0; i < docs.length; i += 200) {
    const writes = docs.slice(i, i + 200).map(([chemin, obj]) => ({
      update: { name: `projects/campus-ohada/databases/(default)/documents/${chemin}`, fields: champs(obj) },
    }))
    const r = await fetch(`${FS}:commit`, { method: 'POST', headers: H, body: JSON.stringify({ writes }) })
    if (!r.ok) throw new Error(`commit : ${await r.text()}`)
  }
}
async function compte(email, mdp) {
  const r = await (await fetch(`${AUTH}/identitytoolkit.googleapis.com/v1/accounts:signUp?key=e`, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password: mdp, returnSecureToken: true }),
  })).json()
  if (!r.localId) throw new Error(`compte ${email} : ${JSON.stringify(r)}`)
  return r.localId
}
const enParallele = async (n, fn, lot = 15) => {
  const res = []
  for (let i = 0; i < n; i += lot) res.push(...await Promise.all(Array.from({ length: Math.min(lot, n - i) }, (_, j) => fn(i + j))))
  return res
}

const maintenant = Date.now(), JOUR = 86400000
const iso = ms => new Date(ms).toISOString()
const SYSTEME = [
  ['ue1', 'sys_ue1_droit_travail', 'UE 1 - Droit du travail', 'ue1-droit-travail'],
  ['ue2', 'sys_ue2_droit_societes', 'UE 2 - Droit des sociétés OHADA', 'ue2-droit-societes'],
  ['ue3', 'sys_ue3_compta_societes', 'UE 3 - Comptabilité des sociétés', 'ue3-compta-societes'],
  ['ue4', 'sys_fiscalite', 'UE 4 - Fiscalité des entreprises', 'fiscalite'],
  ['ue5', 'sys_ue5_finances_publiques', 'UE 5 - Finances Publiques', 'ue5-finances-publiques'],
  ['ue9', 'sys_comptabilite_generale', 'UE 9 - Comptabilité générale', 'comptabilite-generale'],
  ['ue13', 'sys_ue13_ias_ifrs', 'UE 13 - Normes IAS/IFRS', 'ue13-ifrs-ias'],
]

const admin = (await (await fetch(`${FS}:runQuery`, { method: 'POST', headers: H, body: JSON.stringify({ structuredQuery: { from: [{ collectionId: 'users' }], where: { fieldFilter: { field: { fieldPath: 'username' }, op: 'EQUAL', value: { stringValue: 'admin.test' } } } } }) })).json())[0]?.document?.name.split('/').pop()
if (!admin) throw new Error('Administrateur du banc introuvable : lancer scripts/e2e/demarrer.sh')

await ecrire('universites/k6-u1', { nom: 'Université de Charge', ville: 'Kinshasa', adminId: admin, createdBy: admin, actif: true, dateCreation: iso(maintenant) })
const docs = []
for (const fac of ['k6-f1', 'k6-f2']) {
  docs.push([`facultes/${fac}`, { nom: fac === 'k6-f1' ? 'Sciences économiques' : 'Droit', universiteId: 'k6-u1', adminId: admin, createdBy: admin, actif: true, dateCreation: iso(maintenant) }])
  for (const [ue, sys, nom, cle] of SYSTEME) {
    docs.push([`cours/${fac}-${ue}`, { nom, coursSystemeId: sys, moduleKey: cle, faculteId: fac, universiteId: 'k6-u1', adminId: admin, createdBy: admin, actif: true, systeme: false, dateCreation: iso(maintenant) }])
  }
}

const prof = await compte('prof.k6@campus-ohada.app', MDP_PROF)
docs.push([`users/${prof}`, { username: 'prof.k6', nom: 'KALONJI', prenom: 'Prof', role: 'professeur', actif: true, universiteId: 'k6-u1', faculteId: 'k6-f1', createdBy: admin, dateCreation: iso(maintenant) }])
docs.push([`annuaire/${prof}`, { username: 'prof.k6', nom: 'KALONJI', prenom: 'Prof', role: 'professeur' }])

// Professeur d'une autre faculté, sans aucun étudiant : sert aux contrôles
// d'isolation entre équipes (scripts/k6/securite-concurrence.js).
const profAutre = await compte('prof.k6b@campus-ohada.app', MDP_PROF)
docs.push([`users/${profAutre}`, { username: 'prof.k6b', nom: 'MUKENDI', prenom: 'Autre', role: 'professeur', actif: true, universiteId: 'k6-u1', faculteId: 'k6-f2', createdBy: admin, dateCreation: iso(maintenant) }])

const num = i => String(i + 1).padStart(3, '0')
const etudiants = await enParallele(N, async i => ({ i, uid: await compte(`etu.k6.${num(i)}@campus-ohada.app`, MDP_ETU) }))
const coursEtu = ['k6-f1-ue3', 'k6-f1-ue9']
for (const { i, uid } of etudiants) {
  docs.push([`users/${uid}`, { username: `etu.k6.${num(i)}`, nom: `ETUDIANT${num(i)}`, prenom: 'Charge', role: 'etudiant', actif: true, statutInscription: 'valide', classe: 'L2', coursIds: coursEtu, universiteId: 'k6-u1', faculteId: 'k6-f1', createdBy: prof, dateCreation: iso(maintenant - 60 * JOUR) }])
}

// Devoirs du cours UE 3 (L2)
const options = [{ id: 'a', texte: 'Réponse A' }, { id: 'b', texte: 'Réponse B' }, { id: 'c', texte: 'Réponse C' }, { id: 'd', texte: 'Réponse D' }]
const questions = Array.from({ length: 10 }, (_, k) => ({ id: `k6-q${k + 1}`, question: `Question ${k + 1}`, options, articleRef: 'AUDCIF' }))
const corrigeQCM = Object.fromEntries(questions.map((q, k) => [q.id, { reponseCorrecte: 'abcd'[k % 4], explication: 'Explication.' }]))
const devoirBase = { coursId: 'k6-f1-ue3', universiteId: 'k6-u1', faculteId: 'k6-f1', promotionId: 'L2', createdBy: prof, actif: true, chapitreId: 'ue3-ch4', chapitreNom: 'Chapitre 4', dateCreation: iso(maintenant - 30 * JOUR) }
const qPubliques = questions.map(q => ({ ...q, reponseCorrecte: '', explication: '' }))
const devoirs = {
  'k6-d-ouvert': { ...devoirBase, titre: 'QCM ouvert', type: 'qcm_chapitre', questionsChapitre: qPubliques, corrigeQCMSepare: true, dateLimitMs: maintenant + 7 * JOUR, dateLimit: iso(maintenant + 7 * JOUR), consignes: 'QCM.' },
  'k6-d-clos': { ...devoirBase, titre: 'QCM clos', type: 'qcm_chapitre', questionsChapitre: qPubliques, corrigeQCMSepare: true, dateLimitMs: maintenant - 2 * JOUR, dateLimit: iso(maintenant - 2 * JOUR), consignes: 'QCM.' },
  'k6-d-cas': { ...devoirBase, titre: 'QCM + cas', type: 'qcm_cas', questionsChapitre: qPubliques.slice(0, 4), corrigeQCMSepare: true, dateLimitMs: maintenant + 5 * JOUR, dateLimit: iso(maintenant + 5 * JOUR), casPratiques: [{ id: 'cas1', titre: 'Cas 1', enonce: 'Énoncé.', corrigeType: '', pointsMax: 10 }], consignes: 'Mixte.' },
  'k6-d-redac': { ...devoirBase, titre: 'Questions rédigées', type: 'redaction', dateLimitMs: maintenant + 5 * JOUR, dateLimit: iso(maintenant + 5 * JOUR), casPratiques: [{ id: 'q1', titre: 'Question 1', enonce: 'Expliquez.', corrigeType: '', pointsMax: 20 }], consignes: 'Rédaction.' },
}
for (const [id, d] of Object.entries(devoirs)) {
  docs.push([`devoirs/${id}`, d])
  docs.push([`devoirs_corriges/${id}`, { devoirId: id, createdBy: prof, corriges: { cas1: 'Corrigé type.', q1: 'Réponse attendue.' }, ...(d.corrigeQCMSepare ? { qcm: corrigeQCM } : {}) }])
}
// Copies : toute la promotion a rendu le QCM clos
for (const { uid } of etudiants) {
  docs.push([`soumissions/k6-d-clos_${uid}`, { devoirId: 'k6-d-clos', etudiantId: uid, dateSoumission: iso(maintenant - 3 * JOUR), correctionAuto: true, statut: 'soumis', reponsesQCMChapitre: Object.fromEntries(questions.map((q, k) => [q.id, 'abcd'[(k + uid.length) % 4]])) }])
}
// 10 séances de présence
for (let s = 0; s < 10; s++) {
  const presents = etudiants.map(e => ({ etudiantId: e.uid, present: (e.i + s) % 5 !== 0 }))
  docs.push([`presences/k6-seance-${s}`, { titre: `Séance ${s + 1}`, date: iso(maintenant - (20 - s) * JOUR), createdBy: prof, coursId: 'k6-f1-ue3', faculteId: 'k6-f1', universiteId: 'k6-u1', etudiants: presents, etudiantIds: etudiants.map(e => e.uid) }])
}
// Données cloisonnées par équipe : fiche administrative, note manuelle et
// tentative d'exercice du premier étudiant
const premier = etudiants[0].uid
docs.push(['etudiants/k6-fiche-1', { type: 'interne', userId: premier, nom: 'ETUDIANT001', prenom: 'Charge', statut: 'actif', createdBy: prof }])
docs.push(['notes_manuelles/k6-note-1', { etudiantFicheId: 'k6-fiche-1', note: 14, saisiePar: prof, dateSaisie: iso(maintenant), chapitreLabel: 'Interrogation 1', mode: 'manuel' }])
docs.push(['tentatives/k6-tent-1', { userId: premier, exerciceId: 'k6-ex-1', score: 12, dateCreation: iso(maintenant) }])
// Une session de journal par étudiant, 10 écritures équilibrées
for (const { uid } of etudiants) {
  docs.push([`sessions/k6-s-${uid}`, { nom: 'KASAI SARL', exercice: 2026, userId: uid, module: 'syscohada', dateCreation: iso(maintenant - 10 * JOUR) }])
  for (let e = 0; e < 10; e++) {
    const g = `k6-g-${uid}-${e}`, montant = 100000 * (e + 1)
    docs.push([`ecritures/${g}-d`, { sessionId: `k6-s-${uid}`, ligneGroupe: g, date: `2026-0${1 + (e % 9)}-15`, libelle: `Achat ${e + 1}`, numeroCompte: '601', intituleCompte: 'Achats de marchandises', debit: montant, credit: 0, userId: uid, module: 'syscohada' }])
    docs.push([`ecritures/${g}-c`, { sessionId: `k6-s-${uid}`, ligneGroupe: g, date: `2026-0${1 + (e % 9)}-15`, libelle: `Achat ${e + 1}`, numeroCompte: '401', intituleCompte: 'Fournisseurs', debit: 0, credit: montant, userId: uid, module: 'syscohada' }])
  }
}
// Codes d'accès : un limité à 10 inscriptions, un expiré
docs.push(['codesAcces/K6LIMITE', { code: 'K6LIMITE', universiteId: 'k6-u1', faculteId: 'k6-f1', coursIds: ['k6-f1-ue9'], classe: 'L1', createdBy: prof, createdAt: iso(maintenant), actif: true, utilisationsMax: 10, utilisations: 0 }])
docs.push(['codesAcces/K6EXPIRE', { code: 'K6EXPIRE', universiteId: 'k6-u1', faculteId: 'k6-f1', coursIds: ['k6-f1-ue9'], classe: 'L1', createdBy: prof, createdAt: iso(maintenant), actif: true, expireLeMs: maintenant - JOUR }])

await ecrireLot(docs)
console.log(JSON.stringify({ etudiants: N, prof, documents: docs.length }))
