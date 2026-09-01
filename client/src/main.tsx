import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CLE_RECHARGEMENT_UNIQUE } from './components/ErrorBoundary.tsx'
import './index.css'

// Décalage de déploiement, seconde ligne de défense (la première est
// l'ErrorBoundary) : Vite émet cet événement dès qu'un import différé échoue
// (chunk renommé par un nouveau build alors que l'onglet est resté ouvert).
// Un rechargement complet récupère le nouvel index.html et ses chunks ; le
// hash de l'adresse est conservé, l'utilisateur retrouve la page demandée au
// lieu d'être renvoyé ailleurs. Même verrou anti-boucle que l'ErrorBoundary.
window.addEventListener('vite:preloadError', (event) => {
  try {
    if (sessionStorage.getItem(CLE_RECHARGEMENT_UNIQUE)) return
    sessionStorage.setItem(CLE_RECHARGEMENT_UNIQUE, '1')
  } catch { /* navigation privée stricte : on recharge quand même une fois */ }
  event.preventDefault()
  window.location.reload()
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

// Si l'appli tient quelques secondes sans que l'ErrorBoundary attrape une erreur de
// chunk manquant, on la considère stable : on efface le verrou anti-boucle pour qu'un
// prochain déploiement, plus tard dans la même session d'onglet, bénéficie lui aussi
// du rechargement automatique (voir ErrorBoundary.tsx).
setTimeout(() => {
  try { sessionStorage.removeItem(CLE_RECHARGEMENT_UNIQUE) } catch { /* navigation privée stricte : sans effet */ }
}, 5000)
