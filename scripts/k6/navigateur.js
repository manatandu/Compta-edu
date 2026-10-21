// k6 — parcours réels dans Chromium (module navigateur de k6) : étudiants
// et enseignants simultanés sur la version compilée du site, branchée sur
// les émulateurs. Mesure les temps d'affichage (web vitals), le temps de
// chargement de chaque écran et les erreurs JavaScript de la page.
// Prérequis : banc lancé, node scripts/k6/amorcer.mjs 150, version compilée
// servie (VITE_EMULATEURS=1 vite build, puis vite preview --port 4173).
// Usage : K6_BROWSER_EXECUTABLE_PATH=/opt/pw-browsers/chromium K6_BROWSER_ARGS=no-sandbox \
//         k6 run -e SITE=http://127.0.0.1:4173 scripts/k6/navigateur.js
import { browser } from 'k6/browser'
import { check } from 'k6'
import { Trend, Counter } from 'k6/metrics'

const SITE = __ENV.SITE || 'http://127.0.0.1:4173'
const ecran = new Trend('ecran_affiche_ms', true)
const erreursJs = new Counter('erreurs_javascript')
const ecransVides = new Counter('ecrans_vides')
const attenteDonnees = new Trend('tableau_vide_avant_donnees_ms', true)

export const options = {
  scenarios: {
    etudiants: { executor: 'per-vu-iterations', exec: 'etudiant', vus: Number(__ENV.VUS || 5), iterations: 2, options: { browser: { type: 'chromium' } } },
    enseignants: { executor: 'per-vu-iterations', exec: 'enseignant', vus: 2, iterations: 2, options: { browser: { type: 'chromium' } } },
  },
  thresholds: {
    erreurs_javascript: ['count==0'],
    ecrans_vides: ['count==0'],
    browser_web_vital_lcp: ['p(95)<4000'],
    ecran_affiche_ms: ['p(95)<6000'],
  },
}

const num = i => String(i).padStart(3, '0')
async function ouvrir() {
  const page = await browser.newPage()
  page.on('console', m => {
    if (m.type() === 'error' && !/DevTools|favicon|Download the React/.test(m.text())) {
      erreursJs.add(1); console.log(`ERREUR JS ${m.text().slice(0, 200)}`)
    }
  })
  return page
}
async function connexion(page, identifiant, mdp) {
  await page.goto(`${SITE}/#/login`)
  await page.locator('input').first().fill(identifiant)
  await page.locator('input[type=password]').fill(mdp)
  const t0 = Date.now()
  await page.locator('button[type=submit]').click()
  await page.waitForFunction(() => !location.hash.includes('login') && document.querySelector('main')?.innerText.length > 50, { timeout: 30000 })
  ecran.add(Date.now() - t0, { ecran: 'connexion+tableau' })
}
// Ouvre un écran et attend qu'il affiche un contenu ; compte un écran vide
async function visiter(page, route, attendu) {
  const t0 = Date.now()
  await page.evaluate(r => { location.hash = r }, route)
  try {
    await page.waitForFunction(m => (document.querySelector('main')?.innerText || '').includes(m), { timeout: 20000, polling: 200 }, attendu)
    ecran.add(Date.now() - t0, { ecran: route })
    if (__ENV.DETAIL) console.log(`ÉCRAN ${route} ${Date.now() - t0} ms`)
  } catch (e) {
    ecransVides.add(1); console.log(`ÉCRAN VIDE ${route} (attendu « ${attendu} »)`)
  }
}

export async function etudiant() {
  const page = await ouvrir()
  try {
    await connexion(page, `etu.k6.${num(((__VU - 1) % 150) + 1)}`, 'Etu-K6-2026')
    // Le tableau s'affiche d'abord vide (« Rien à rendre pour le moment »,
    // 0 cours) avant l'arrivée des données : durée de cet état trompeur.
    const t0 = Date.now()
    const vuVide = await page.evaluate(() => (document.querySelector('main')?.innerText || '').includes('Rien à rendre'))
    await page.waitForFunction(() => (document.querySelector('main')?.innerText || '').includes('Mes cours ce semestre'), { timeout: 30000, polling: 100 })
    attenteDonnees.add(Date.now() - t0)
    check(vuVide, { "pas d'état vide trompeur avant les données": v => !v })
    await visiter(page, '/mes-cours', 'Mes cours')
    await visiter(page, '/ue3-compta-societes', 'Comptabilité des sociétés')
    await visiter(page, '/journal', 'Journal')
    await visiter(page, '/docs-comptables-hub?onglet=balance', 'Balance')
    await visiter(page, '/exercices', 'Exercices')
    await visiter(page, '/chat', 'Messagerie')
    await visiter(page, '/dictionnaire', 'Dictionnaire')
  } finally { await page.close() }
}

export async function enseignant() {
  const page = await ouvrir()
  try {
    await connexion(page, 'prof.k6', 'Prof-K6-2026')
    await visiter(page, '/professeurs', 'Espace pédagogique')
    await visiter(page, '/professeurs?tab=etudiants', 'Comptes de connexion')
    await visiter(page, '/professeurs?tab=cotes', 'Cotes')
    await visiter(page, '/professeurs?tab=copies', 'Copies')
  } finally { await page.close() }
}
