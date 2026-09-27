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
