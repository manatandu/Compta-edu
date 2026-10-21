// k6 — sécurité et concurrence de l'API Firestore (règles), sur le banc
// d'émulateurs uniquement. Trois scénarios simultanés :
//  - isolation : chaque étudiant tente ce qui lui est interdit (copie d'un
//    autre, corrigé avant la date limite, ses propres cours, liste des codes…)
//    et ce qui lui est permis ;
//  - inscription_code : 40 inscriptions simultanées sur un code limité à 10 ;
//  - copie_unique : 20 envois simultanés de la même copie.
// Prérequis : scripts/e2e/demarrer.sh puis node scripts/k6/amorcer.mjs
// Usage : k6 run scripts/k6/securite-concurrence.js
import http from 'k6/http'
import { check } from 'k6'
import exec from 'k6/execution'
import { Counter } from 'k6/metrics'

const AUTH = `http://127.0.0.1:${__ENV.E2E_AUTH_PORT || 9099}/identitytoolkit.googleapis.com/v1`
const RACINE = 'projects/campus-ohada/databases/(default)/documents'
const FS = `http://127.0.0.1:${__ENV.E2E_FS_PORT || 8080}/v1/${RACINE}`
const JSONH = { 'Content-Type': 'application/json' }
const inscriptionsAcceptees = new Counter('inscriptions_acceptees')
const copiesAcceptees = new Counter('copies_acceptees')
// Scénarios menés jusqu'au bout : une itération qui plante n'exécute aucun
// contrôle, et le seuil sur les contrôles restait alors vert.
const terminees = new Counter('scenarios_termines')

export const options = {
  scenarios: {
    isolation: { executor: 'per-vu-iterations', vus: 30, iterations: 1, exec: 'isolation' },
    inscription_code: { executor: 'per-vu-iterations', vus: 40, iterations: 1, exec: 'inscriptionCode' },
    copie_unique: { executor: 'per-vu-iterations', vus: 20, iterations: 1, exec: 'copieUnique' },
    autre_equipe: { executor: 'per-vu-iterations', vus: 1, iterations: 1, exec: 'autreEquipe' },
    meme_equipe: { executor: 'per-vu-iterations', vus: 1, iterations: 1, exec: 'memeEquipe' },
  },
  thresholds: {
    checks: ['rate==1.0'],
    'scenarios_termines{scenario:isolation}': ['count==30'],
    'scenarios_termines{scenario:autre_equipe}': ['count==1'],
    'scenarios_termines{scenario:meme_equipe}': ['count==1'],
  },
}

const num = i => String(i).padStart(3, '0')
function connexion(identifiant, mdp) {
  const r = http.post(`${AUTH}/accounts:signInWithPassword?key=e`, JSON.stringify({ email: `${identifiant}@campus-ohada.app`, password: mdp, returnSecureToken: true }), { headers: JSONH })
  return { jeton: r.json('idToken'), uid: r.json('localId') }
}
const avec = jeton => ({ headers: { ...JSONH, Authorization: `Bearer ${jeton}` } })
const proprio = { headers: { ...JSONH, Authorization: 'Bearer owner' } }
const champs = o => Object.fromEntries(Object.entries(o).map(([k, v]) => [k,
  typeof v === 'boolean' ? { booleanValue: v } : typeof v === 'number' ? { integerValue: String(v) }
  : Array.isArray(v) ? { arrayValue: { values: v.map(x => ({ stringValue: x })) } }
  : typeof v === 'object' ? { mapValue: { fields: champs(v) } } : { stringValue: v }]))

export function setup() {
  const etudiants = []
  for (let i = 1; i <= 31; i++) etudiants.push(connexion(`etu.k6.${num(i)}`, 'Etu-K6-2026'))
  return { etudiants, prof: connexion('prof.k6', 'Prof-K6-2026'), profAutre: connexion('prof.k6b', 'Prof-K6-2026') }
}

export function isolation(d) {
  // Rang dans le scénario, et non numéro global de l'utilisateur virtuel :
  // celui-ci dépend du nombre de scénarios lancés ensemble.
  const i = exec.scenario.iterationInTest
  const moi = d.etudiants[i], autre = d.etudiants[(i + 1) % 30]
  const o = avec(moi.jeton)
  const refuse = r => r.status === 403
  check(http.get(`${FS}/users/${moi.uid}`, o), { 'lit son propre profil': r => r.status === 200 })
  check(http.get(`${FS}/soumissions/k6-d-clos_${autre.uid}`, o), { "ne lit pas la copie d'un autre": refuse })
  check(http.get(`${FS}/soumissions/k6-d-clos_${moi.uid}`, o), { 'lit sa propre copie': r => r.status === 200 })
  check(http.get(`${FS}/devoirs_corriges/k6-d-ouvert`, o), { 'pas de corrigé avant la date limite': refuse })
  check(http.get(`${FS}/devoirs_corriges/k6-d-clos`, o), { 'corrigé lisible après la date limite': r => r.status === 200 })
  check(http.post(`${FS}:runQuery`, JSON.stringify({ structuredQuery: { from: [{ collectionId: 'soumissions' }] } }), o), { 'ne liste pas toutes les copies': refuse })
  check(http.post(`${FS}:runQuery`, JSON.stringify({ structuredQuery: { from: [{ collectionId: 'codesAcces' }] } }), o), { "ne liste pas les codes d'accès": refuse })
  check(http.post(`${FS}:runQuery`, JSON.stringify({ structuredQuery: { from: [{ collectionId: 'ecritures' }], where: { fieldFilter: { field: { fieldPath: 'userId' }, op: 'EQUAL', value: { stringValue: autre.uid } } } } }), o), { "ne lit pas le journal d'un autre": refuse })
  check(http.patch(`${FS}/users/${moi.uid}?updateMask.fieldPaths=coursIds`, JSON.stringify({ fields: champs({ coursIds: ['k6-f1-ue1', 'k6-f1-ue3', 'k6-f1-ue9'] }) }), o), { "ne s'ajoute pas de cours": refuse })
  check(http.patch(`${FS}/users/${moi.uid}?updateMask.fieldPaths=role`, JSON.stringify({ fields: champs({ role: 'admin' }) }), o), { 'ne se fait pas administrateur': refuse })
  check(http.patch(`${FS}/soumissions/k6-d-clos_${moi.uid}?updateMask.fieldPaths=note`, JSON.stringify({ fields: champs({ note: 20 }) }), o), { 'ne se met pas 20/20': refuse })
  check(http.patch(`${FS}/soumissions/k6-d-clos_${moi.uid}?updateMask.fieldPaths=scoreCasPratiques`, JSON.stringify({ fields: champs({ scoreCasPratiques: 10 }) }), o), { "n'écrit pas le détail de sa correction": refuse })
  check(http.get(`${FS}/devoirs_corriges/k6-d-redac`, o), { 'pas de corrigé des questions rédigées': refuse })
  check(http.patch(`${FS}/soumissions/k6-d-redac_${moi.uid}`, JSON.stringify({ fields: champs({ devoirId: 'k6-d-redac', etudiantId: moi.uid, dateSoumission: 'x', note: 20, statut: 'note' }) }), o), { 'ne rend pas une copie déjà notée': refuse })
  check(http.patch(`${FS}/presences/k6-fausse-${moi.uid}`, JSON.stringify({ fields: champs({ titre: 'x', createdBy: moi.uid }) }), o), { 'ne crée pas de séance de présence': refuse })
  check(http.patch(`${FS}/annuaire/${moi.uid}`, JSON.stringify({ fields: champs({ nom: 'X', role: 'professeur' }) }), o), { "ne s'inscrit pas à l'annuaire": refuse })
  check(http.patch(`${FS}/devoirs_corriges/k6-d-clos?updateMask.fieldPaths=createdBy`, JSON.stringify({ fields: champs({ createdBy: moi.uid }) }), o), { 'ne modifie pas un corrigé': refuse })
  const rz = http.patch(`${FS}/codesAcces/K6LIMITE?updateMask.fieldPaths=utilisations`, JSON.stringify({ fields: champs({ utilisations: 0 }) }), o)
  // 409 : écriture abandonnée sur conflit avec les inscriptions en cours, non appliquée non plus
  check(rz, { "ne remet pas le compteur d'un code à zéro": r => r.status === 403 || r.status === 409 })
  terminees.add(1)
}

// Professeur d'une autre faculté, sans aucun étudiant en commun : il ne
// devrait voir ni les profils, ni les copies, ni le journal des étudiants
// d'une autre équipe.
export function autreEquipe(d) {
  const o = avec(d.profAutre.jeton), etu = d.etudiants[0]
  const refuse = r => r.status === 403
  check(http.get(`${FS}/users/${etu.uid}`, o), { "autre équipe : pas d'accès au profil d'un étudiant": refuse })
  check(http.get(`${FS}/soumissions/k6-d-clos_${etu.uid}`, o), { "autre équipe : pas d'accès aux copies": refuse })
  check(http.post(`${FS}:runQuery`, JSON.stringify({ structuredQuery: { from: [{ collectionId: 'users' }] } }), o), { 'autre équipe : ne liste pas tous les comptes': refuse })
  check(http.post(`${FS}:runQuery`, JSON.stringify({ structuredQuery: { from: [{ collectionId: 'soumissions' }] } }), o), { 'autre équipe : ne liste pas toutes les copies': refuse })
  check(http.post(`${FS}:runQuery`, JSON.stringify({ structuredQuery: { from: [{ collectionId: 'sessions' }], where: { fieldFilter: { field: { fieldPath: 'userId' }, op: 'EQUAL', value: { stringValue: etu.uid } } } } }), o), { "autre équipe : pas d'accès au journal": refuse })
  check(http.get(`${FS}/presences/k6-seance-0`, o), { "autre équipe : pas d'accès aux présences": refuse })
  check(http.post(`${FS}:runQuery`, JSON.stringify({ structuredQuery: { from: [{ collectionId: 'presences' }] } }), o), { 'autre équipe : ne liste pas toutes les présences': refuse })
  check(http.get(`${FS}/etudiants/k6-fiche-1`, o), { "autre équipe : pas d'accès à la fiche administrative": refuse })
  check(http.post(`${FS}:runQuery`, JSON.stringify({ structuredQuery: { from: [{ collectionId: 'etudiants' }] } }), o), { 'autre équipe : ne liste pas toutes les fiches': refuse })
  check(http.get(`${FS}/notes_manuelles/k6-note-1`, o), { "autre équipe : pas d'accès aux notes manuelles": refuse })
  check(http.get(`${FS}/tentatives/k6-tent-1`, o), { "autre équipe : pas d'accès aux tentatives": refuse })
  terminees.add(1)
}

// L'équipe de l'étudiant garde l'accès à ses données (le cloisonnement ne
// doit rien retirer au professeur concerné).
export function memeEquipe(d) {
  const o = avec(d.prof.jeton), etu = d.etudiants[0]
  const lu = r => r.status === 200
  const requete = (collection, champ, op, valeur) => http.post(`${FS}:runQuery`, JSON.stringify({ structuredQuery: {
    from: [{ collectionId: collection }], where: { fieldFilter: { field: { fieldPath: champ }, op, value: valeur } } } }), o)
  check(http.get(`${FS}/users/${etu.uid}`, o), { "équipe : lit le profil de son étudiant": lu })
  check(http.get(`${FS}/soumissions/k6-d-clos_${etu.uid}`, o), { 'équipe : lit la copie de son étudiant': lu })
  check(http.get(`${FS}/sessions/k6-s-${etu.uid}`, o), { 'équipe : lit le journal de son étudiant': lu })
  check(http.get(`${FS}/presences/k6-seance-0`, o), { 'équipe : lit ses séances de présence': lu })
  check(http.get(`${FS}/etudiants/k6-fiche-1`, o), { 'équipe : lit la fiche administrative': lu })
  check(http.get(`${FS}/notes_manuelles/k6-note-1`, o), { 'équipe : lit ses notes manuelles': lu })
  check(http.get(`${FS}/tentatives/k6-tent-1`, o), { "équipe : lit les tentatives de son étudiant": lu })
  check(requete('users', 'createdBy', 'IN', { arrayValue: { values: [{ stringValue: d.prof.uid }] } }), { 'équipe : liste ses étudiants': lu })
  check(requete('soumissions', 'devoirId', 'IN', { arrayValue: { values: ['k6-d-ouvert', 'k6-d-clos', 'k6-d-cas', 'k6-d-redac'].map(v => ({ stringValue: v })) } }), { 'équipe : liste les copies de ses devoirs': lu })
  terminees.add(1)
}

// Inscription telle que l'écrit l'application : compte, puis profil et
// compteur du code d'un bloc.
function inscrire(code) {
  const email = `k6.code.${code}.${__VU}.${Date.now()}@campus-ohada.app`
  const c = http.post(`${AUTH}/accounts:signUp?key=e`, JSON.stringify({ email, password: 'Code-K6-2026', returnSecureToken: true }), { headers: JSONH })
  const uid = c.json('localId'), jeton = c.json('idToken')
  const profil = { role: 'etudiant', username: email.split('@')[0], nom: 'CODE', actif: false, statutInscription: 'en_attente', codeAcces: code, createdBy: __ENV.PROF || 'inconnu', coursIds: ['k6-f1-ue9'] }
  return { uid, jeton, profil }
}
export function inscriptionCode(d) {
  const { uid, jeton, profil } = inscrire('K6LIMITE')
  profil.createdBy = d.prof.uid
  const r = http.post(`${FS}:commit`, JSON.stringify({ writes: [
    { update: { name: `${RACINE}/users/${uid}`, fields: champs(profil) } },
    { transform: { document: `${RACINE}/codesAcces/K6LIMITE`, fieldTransforms: [{ fieldPath: 'utilisations', increment: { integerValue: '1' } }] } },
  ] }), avec(jeton))
  if (r.status === 200) inscriptionsAcceptees.add(1)
  check(r, { 'inscription acceptée ou refusée proprement': x => x.status === 200 || x.status === 403 || x.status === 409 || x.status === 400 })
}

export function copieUnique(d) {
  const moi = d.etudiants[30]
  const r = http.patch(`${FS}/soumissions/k6-d-ouvert_${moi.uid}`, JSON.stringify({ fields: champs({
    devoirId: 'k6-d-ouvert', etudiantId: moi.uid, dateSoumission: new Date().toISOString(), correctionAuto: true, reponsesQCMChapitre: { 'k6-q1': 'abcd'[__VU % 4] },
  }) }), avec(moi.jeton))
  if (r.status === 200) copiesAcceptees.add(1)
  // 409 : écriture abandonnée par contention (« Transaction lock timeout »),
  // non appliquée ; le SDK de l'application la réessaie.
  check(r, { 'envoi accepté ou refusé proprement': x => x.status === 200 || x.status === 403 || x.status === 409 })
}

export function teardown(d) {
  const code = http.get(`${FS}/codesAcces/K6LIMITE`, proprio).json('fields.utilisations.integerValue')
  const inscrits = http.post(`${FS}:runQuery`, JSON.stringify({ structuredQuery: { from: [{ collectionId: 'users' }], where: { fieldFilter: { field: { fieldPath: 'codeAcces' }, op: 'EQUAL', value: { stringValue: 'K6LIMITE' } } } } }), proprio).json().filter(x => x.document).length
  const copie = http.get(`${FS}/soumissions/k6-d-ouvert_${d.etudiants[30].uid}`, proprio)
  console.log(`BILAN code limité à 10 : ${inscrits} profils créés, compteur ${code} | copie unique : ${copie.status === 200 ? 1 : 0} document`)
  check(null, {
    'code limité : au plus 10 inscrits': () => inscrits <= 10,
    'code limité : compteur = nombre de profils': () => Number(code) === inscrits,
    'une seule copie après 20 envois simultanés': () => copie.status === 200,
  })
}
