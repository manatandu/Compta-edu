// Outils communs des scénarios de navigateur (Playwright + Chromium installés
// sur le poste). Le site visé est celui du banc lancé avec le même
// E2E_SITE_PORT. Lancement d'un scénario :
//   NODE_PATH=$(npm root -g) E2E_SITE_PORT=5173 node mon-scenario.mjs
import { createRequire } from 'module'
// require (et non import) : seul require suit NODE_PATH, où se trouve
// l'installation globale de Playwright.
const { chromium } = createRequire(import.meta.url)('playwright')

export const URL = `http://127.0.0.1:${process.env.E2E_SITE_PORT || 5173}/`

export async function ouvrir({ mobile = false } = {}) {
  const args = ['--no-sandbox']
  if (process.env.HTTPS_PROXY) args.push(`--proxy-server=https=${process.env.HTTPS_PROXY.replace(/^https?:\/\//, '')}`)
  const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args })
  const ctx = await browser.newContext({
    viewport: mobile ? { width: 390, height: 844 } : { width: 1366, height: 900 },
    locale: 'fr-FR',
  })
  const page = await ctx.newPage()
  const erreurs = []
  page.on('pageerror', e => erreurs.push('pageerror: ' + e.message))
  page.on('console', m => { if (m.type() === 'error') erreurs.push('console: ' + m.text().slice(0, 300)) })
  return { browser, page, erreurs }
}

export async function connexion(page, identifiant, motDePasse) {
  await page.goto(URL + '#/login')
  await page.waitForLoadState('networkidle')
  await page.locator('input').first().fill(identifiant)
  await page.locator('input[type=password]').fill(motDePasse)
  await page.locator('button[type=submit]').click()
  await page.waitForTimeout(3000)
}

// Ouvre une page de l'application ; la requête éventuelle (?a=b) se place
// avant le # (routage par hash, voir client/src/lib/hashLocation.ts).
export async function aller(page, chemin, attente = 2500) {
  const [route, requete] = chemin.split('?')
  await page.goto(URL + (requete ? '?' + requete : '') + '#' + route)
  await page.waitForTimeout(attente)
}

export const texteDe = async page => (await page.locator('main').innerText().catch(() => '')).replace(/\s+/g, ' ')
