// ─────────────────────────────────────────────────────────────────────────────
// ROUTAGE PAR HASH, SANS PARAMÈTRE RÉSIDUEL
//
// wouter place les paramètres d'une adresse (« ?tab=copies ») dans la vraie
// search de l'URL, avant le #, et ne les efface pas quand on navigue ensuite
// vers une adresse qui n'en a pas (`if (search) url.search = search`). Un
// paramètre survivait donc à la page qui l'avait reçu : l'Espace pédagogique
// rouvrait sur l'onglet d'un ancien lien, la messagerie resélectionnait un
// ancien contact, le dictionnaire rouvrait un ancien terme.
//
// Cette version remplace la search à chaque navigation : celle de l'adresse
// demandée, ou aucune. Toute l'application l'importe à la place de
// « wouter/use-hash-location ».
// ─────────────────────────────────────────────────────────────────────────────
import { useHashLocation as useHashLocationWouter } from 'wouter/use-hash-location'

type Options = { state?: unknown; replace?: boolean }

// Adresse tapée ou partagée sous la forme « #/professeurs?tab=copies » : le
// paramètre, placé après le #, empêchait de reconnaître la page (« Page
// introuvable »). Il est remis à sa place, avant le #, à l'ouverture comme à
// chaque changement d'adresse (adresse collée dans un onglet déjà ouvert).
function remettreParametres(): boolean {
  if (!window.location.hash.includes('?')) return false
  const [chemin, parametres] = window.location.hash.slice(1).split('?')
  const url = new URL(window.location.href)
  url.hash = chemin
  url.search = parametres ? `?${parametres}` : ''
  history.replaceState(history.state, '', url.href)
  return true
}
if (typeof window !== 'undefined') {
  remettreParametres()
  // Écoute posée avant celle du routeur (qui s'abonne au montage) : l'adresse
  // est corrigée avant qu'il ne la lise.
  window.addEventListener('hashchange', () => {
    if (remettreParametres()) dispatchEvent(new HashChangeEvent('hashchange'))
  })
}

export const navigate = (to: string, { state = null, replace = false }: Options = {}) => {
  const oldURL = location.href
  const [hash, search] = to.replace(/^#?\/?/, '').split('?')
  const url = new URL(location.href)
  url.hash = `/${hash}`
  url.search = search ? `?${search}` : ''
  const newURL = url.href
  if (replace) history.replaceState(state, '', newURL)
  else history.pushState(state, '', newURL)
  dispatchEvent(new HashChangeEvent('hashchange', { oldURL, newURL }))
}

export function useHashLocation(): [string, typeof navigate] {
  const [location] = useHashLocationWouter()
  return [location, navigate]
}
// Préfixe « # » des liens <Link> (wouter lit hook.hrefs, voir Router).
useHashLocation.hrefs = (href: string) => "#" + href
