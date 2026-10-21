// k6 — charge en lecture : les requêtes Firestore que l'application lance à
// l'ouverture du tableau de bord, pour des étudiants et des enseignants
// simultanés. Mesure les temps de réponse, les refus et surtout le nombre de
// documents lus par ouverture de page (Firestore facture chaque document lu).
// Banc d'émulateurs uniquement ; prérequis : node scripts/k6/amorcer.mjs 150
// Usage : k6 run scripts/k6/charge-lectures.js
import http from 'k6/http'
import { check, sleep } from 'k6'
import { Trend, Counter } from 'k6/metrics'

const AUTH = `http://127.0.0.1:${__ENV.E2E_AUTH_PORT || 9099}/identitytoolkit.googleapis.com/v1`
const FS = `http://127.0.0.1:${__ENV.E2E_FS_PORT || 8080}/v1/projects/campus-ohada/databases/(default)/documents`
const JSONH = { 'Content-Type': 'application/json' }
const lectEtu = new Trend('documents_lus_tableau_etudiant')
const lectProf = new Trend('documents_lus_espace_enseignant')
const refus = new Counter('requetes_refusees')

export const options = {
  scenarios: {
    etudiants: { executor: 'ramping-vus', exec: 'etudiant', startVUs: 0, stages: [{ duration: '30s', target: 150 }, { duration: '60s', target: 150 }, { duration: '10s', target: 0 }] },
    enseignants: { executor: 'constant-vus', exec: 'enseignant', vus: 5, duration: '100s' },
  },
  thresholds: {
    requetes_refusees: ['count==0'],
    'http_req_duration{page:etudiant}': ['p(95)<1500'],
    checks: ['rate==1.0'],
  },
}

const num = i => String(i).padStart(3, '0')
function connexion(identifiant, mdp) {
  const r = http.post(`${AUTH}/accounts:signInWithPassword?key=e`, JSON.stringify({ email: `${identifiant}@campus-ohada.app`, password: mdp, returnSecureToken: true }), { headers: JSONH, tags: { page: 'connexion' } })
  return { jeton: r.json('idToken'), uid: r.json('localId') }
}
const filtre = (champ, op, valeur) => ({ fieldFilter: { field: { fieldPath: champ }, op, value: valeur } })
const et = (...filtres) => ({ compositeFilter: { op: 'AND', filters: filtres } })
const chaine = s => ({ stringValue: s })
const tableau = l => ({ arrayValue: { values: l.map(chaine) } })
// Une requête = une lecture de liste ; renvoie le nombre de documents lus
function requete(jeton, collection, where, page) {
  const corps = { structuredQuery: { from: [{ collectionId: collection }], ...(where ? { where } : {}) } }
  const r = http.post(`${FS}:runQuery`, JSON.stringify(corps), { headers: { ...JSONH, Authorization: `Bearer ${jeton}` }, tags: { page, requete: collection } })
  if (r.status !== 200) { refus.add(1); console.log(`REFUS ${page} ${collection} ${r.status} ${r.body.slice(0, 160)}`); return 0 }
  return r.json().filter(x => x.document).length
}
function lire(jeton, chemin, page) {
  const r = http.get(`${FS}/${chemin}`, { headers: { Authorization: `Bearer ${jeton}` }, tags: { page, requete: chemin.split('/')[0] } })
  if (r.status !== 200 && r.status !== 404) { refus.add(1); console.log(`REFUS ${page} ${chemin} ${r.status}`) }
  return r.status === 200 ? 1 : 0
}

export function setup() {
  const etudiants = []
  for (let i = 1; i <= 150; i++) etudiants.push(connexion(`etu.k6.${num(i)}`, 'Etu-K6-2026'))
  return { etudiants, prof: connexion('prof.k6', 'Prof-K6-2026') }
}

// Tableau de bord étudiant (DashboardEtudiant, cloche, menu) : mêmes
// requêtes que les hooks de lib/useFirestore.ts
export function etudiant(d) {
  const { jeton, uid } = d.etudiants[(__VU - 1) % d.etudiants.length]
  const p = 'etudiant'
  const coursIds = ['k6-f1-ue3', 'k6-f1-ue9']
  let n = 0
  n += lire(jeton, `users/${uid}`, p)
  n += requete(jeton, 'cours', null, p)                                          // useAllCours
  n += requete(jeton, 'devoirs', filtre('coursId', 'IN', tableau(coursIds)), p)  // useAllDevoirs
  n += requete(jeton, 'soumissions', filtre('etudiantId', 'EQUAL', chaine(uid)), p)
  n += requete(jeton, 'presences', filtre('etudiantIds', 'ARRAY_CONTAINS', chaine(uid)), p)
  n += requete(jeton, 'sessions', filtre('userId', 'EQUAL', chaine(uid)), p)
  n += requete(jeton, 'exercices_libres', filtre('coursId', 'IN', tableau(coursIds)), p)
  n += requete(jeton, 'annuaire', null, p)
  n += lire(jeton, 'devoirs_corriges/k6-d-clos', p)                               // corrigé publié
  lectEtu.add(n)
  check(n, { 'tableau étudiant chargé': x => x > 0 })
  sleep(2 + Math.random() * 3)
}

// Espace pédagogique / tableau de bord du personnel
export function enseignant(d) {
  const { jeton, uid } = d.prof
  const p = 'enseignant'
  let n = 0
  // onUsersEquipeSnapshot : le personnel, puis les étudiants de l'équipe
  n += requete(jeton, 'users', filtre('role', 'IN', tableau(['admin', 'professeur', 'assistant'])), p)
  n += requete(jeton, 'users', et(filtre('createdBy', 'IN', tableau([uid, 'prof.k6'])), filtre('role', 'EQUAL', chaine('etudiant'))), p)
  n += requete(jeton, 'cours', null, p)
  n += requete(jeton, 'devoirs', filtre('createdBy', 'IN', tableau([uid])), p)
  // useAllSoumissions : copies des devoirs de l'équipe, par paquets de 10
  n += requete(jeton, 'soumissions', filtre('devoirId', 'IN', tableau(['k6-d-ouvert', 'k6-d-clos', 'k6-d-cas', 'k6-d-redac'])), p)
  n += requete(jeton, 'presences', filtre('createdBy', 'IN', tableau([uid])), p)
  lectProf.add(n)
  check(n, { 'espace enseignant chargé': x => x > 0 })
  sleep(5)
}
