// k6 — une classe entière s'inscrit au même moment avec le même code d'accès
// (sans limite), comme en amphithéâtre. Chaque inscription incrémente le
// compteur du code : mesure des refus par conflit d'écriture sur ce document.
// Banc d'émulateurs uniquement. Usage : k6 run -e N=60 scripts/k6/inscription-amphi.js
import http from 'k6/http'
import { check } from 'k6'
import { Counter } from 'k6/metrics'

const AUTH = `http://127.0.0.1:${__ENV.E2E_AUTH_PORT || 9099}/identitytoolkit.googleapis.com/v1`
const RACINE = 'projects/campus-ohada/databases/(default)/documents'
const FS = `http://127.0.0.1:${__ENV.E2E_FS_PORT || 8080}/v1/${RACINE}`
const JSONH = { 'Content-Type': 'application/json' }
const proprio = { headers: { ...JSONH, Authorization: 'Bearer owner' } }
const reussies = new Counter('inscriptions_reussies')
const conflits = new Counter('inscriptions_en_conflit')
const N = Number(__ENV.N || 60)

export const options = {
  scenarios: { amphi: { executor: 'per-vu-iterations', vus: N, iterations: 1 } },
  thresholds: { inscriptions_en_conflit: ['count==0'] },
}

export function setup() {
  // Code créé une fois ici : le contexte de chaque VU est réévalué à part.
  const CODE = `K6AMPHI${Date.now() % 100000}`
  const prof = http.post(`${AUTH}/accounts:signInWithPassword?key=e`, JSON.stringify({ email: 'prof.k6@campus-ohada.app', password: 'Prof-K6-2026', returnSecureToken: true }), { headers: JSONH }).json('localId')
  http.patch(`${FS}/codesAcces/${CODE}`, JSON.stringify({ fields: {
    code: { stringValue: CODE }, createdBy: { stringValue: prof }, actif: { booleanValue: true },
    coursIds: { arrayValue: { values: [{ stringValue: 'k6-f1-ue9' }] } }, utilisations: { integerValue: '0' },
  } }), proprio)
  return { prof, CODE }
}

export default function (d) {
  const CODE = d.CODE
  const email = `amphi.${CODE}.${__VU}@campus-ohada.app`.toLowerCase()
  const c = http.post(`${AUTH}/accounts:signUp?key=e`, JSON.stringify({ email, password: 'Amphi-K6-2026', returnSecureToken: true }), { headers: JSONH })
  const uid = c.json('localId'), jeton = c.json('idToken')
  const profil = {
    role: { stringValue: 'etudiant' }, username: { stringValue: email.split('@')[0] }, nom: { stringValue: 'AMPHI' },
    actif: { booleanValue: false }, statutInscription: { stringValue: 'en_attente' }, codeAcces: { stringValue: CODE },
    createdBy: { stringValue: d.prof }, coursIds: { arrayValue: { values: [{ stringValue: 'k6-f1-ue9' }] } },
  }
  const r = http.post(`${FS}:commit`, JSON.stringify({ writes: [
    { update: { name: `${RACINE}/users/${uid}`, fields: profil } },
    { transform: { document: `${RACINE}/codesAcces/${CODE}`, fieldTransforms: [{ fieldPath: 'utilisations', increment: { integerValue: '1' } }] } },
  ] }), { headers: { ...JSONH, Authorization: `Bearer ${jeton}` } })
  if (r.status === 200) reussies.add(1)
  else if (r.status === 409) conflits.add(1)
  check(r, { 'inscription enregistrée': x => x.status === 200 })
}

export function teardown(d) {
  const CODE = d.CODE
  const compteur = http.get(`${FS}/codesAcces/${CODE}`, proprio).json('fields.utilisations.integerValue')
  console.log(`BILAN ${N} inscriptions simultanées sur ${CODE} : compteur ${compteur}`)
}
