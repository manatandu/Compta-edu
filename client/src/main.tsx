import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { CLE_RECHARGEMENT_UNIQUE } from './components/ErrorBoundary.tsx'
import './index.css'

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
