import { useHashLocation } from '@/lib/hashLocation'
import { ChevronLeft } from 'lucide-react'
import { moduleDe, moduleParRoute } from '@/content/modules'

// Correspondance adresse → page parente
const PARENT_MAP: Record<string, { path: string; label: string }> = {
  // Comptabilité générale : documents
  '/journal':                    { path: '/docs-comptables-hub',   label: 'Documents comptables' },
  '/plan-comptable':             { path: '/comptabilite-generale', label: 'Comptabilité générale' },
  '/immobilisations':            { path: '/comptabilite-generale', label: 'Comptabilité générale' },
  '/charges-personnel/irpp':     { path: '/comptabilite-generale', label: 'Comptabilité générale' },
  '/docs-comptables-hub':        { path: '/comptabilite-generale', label: 'Comptabilité générale' },
  '/etats-financiers-hub':       { path: '/comptabilite-generale', label: 'Comptabilité générale' },
  '/emprunts':                   { path: '/comptabilite-generale', label: 'Comptabilité générale' },
  '/factures':                   { path: '/comptabilite-generale', label: 'Comptabilité générale' },
  // Stock - sous-module de Comptabilité générale (module 4), pas de Mes cours
  '/stock':                      { path: '/comptabilite-generale', label: 'Comptabilité générale' },
  '/stock/journal':              { path: '/stock',                 label: 'Gestion de stock' },
  '/stock/mouvement':            { path: '/stock',                 label: 'Gestion de stock' },
  '/stock/fiche':                { path: '/stock',                 label: 'Gestion de stock' },
  // Mes cours et Dictionnaire : accessibles depuis le tableau de bord
  '/mes-cours':                  { path: '/',                      label: 'Tableau de bord' },
  '/dictionnaire':               { path: '/',                      label: 'Tableau de bord' },
  // Autres pages internes
  '/exercices':                  { path: '/',                      label: 'Tableau de bord' },
  '/documents':                  { path: '/',                      label: 'Tableau de bord' },
  '/chat':                       { path: '/',                      label: 'Tableau de bord' },
  '/professeurs':                { path: '/',                      label: 'Tableau de bord' },
  '/comptabilite-generale':      { path: '/mes-cours',             label: 'Mes cours' },
  '/fiscalite':                  { path: '/mes-cours',             label: 'Mes cours' },
  '/apercu-devoir':              { path: '/exercices',             label: 'Exercices' },
  '/ue2/simulateur-constitution': { path: '/ue2-droit-societes',   label: 'UE 2 · Droit des sociétés' },
  '/debug-isolation':            { path: '/professeurs?tab=staff', label: 'Espace pédagogique' },
  // Gestion des étudiants
  '/etudiant':                   { path: '/professeurs?tab=etudiants', label: 'Étudiants' },
  '/inscription-plateforme':     { path: '/professeurs?tab=etudiants', label: 'Étudiants' },
}

function parentDeModule(location: string): { path: string; label: string } | undefined {
  const chapitre = location.match(/^\/(ue\d+)\/chapitre-\d+/)
  if (chapitre) {
    const m = moduleDe(chapitre[1])
    return m && { path: m.route, label: m.libelle }
  }
  if (moduleParRoute(location)) return { path: '/mes-cours', label: 'Mes cours' }
  return undefined
}

interface BackButtonProps {
  label?: string
  to?: string
}

export default function BackButton({ label, to }: BackButtonProps) {
  const [location, navigate] = useHashLocation()

  let baseRoute = location
  if (location.startsWith('/exercices/'))           baseRoute = '/exercices'
  else if (location.startsWith('/stock/mouvement/')) baseRoute = '/stock/mouvement'
  else if (location.startsWith('/stock/fiche/'))     baseRoute = '/stock/fiche'
  else if (location.startsWith('/stock/journal/'))   baseRoute = '/stock/journal'
  else if (location.startsWith('/etudiant/'))        baseRoute = '/etudiant'

  // Modules de cours : la parenté se déduit de l'adresse elle-même, sans
  // dépendre d'une entrée ajoutée à la main pour chaque nouveau chapitre.
  //   /ue3/chapitre-7        -> sommaire du module (/ue3-...)
  //   /ue3-compta-societes   -> /mes-cours
  // Sans cette règle, un module absent de PARENT_MAP (UE3 lors de sa
  // création) n'avait tout simplement pas de bouton de retour.
  const parent = PARENT_MAP[baseRoute] ?? parentDeModule(location)

  if (!parent && !to) return null

  const dest = to || parent!.path
  const lbl  = label || parent!.label

  return (
    <button
      onClick={() => navigate(dest)}
      className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors duration-200 group mb-1"
    >
      <ChevronLeft className="h-4 w-4 transition-transform duration-200 group-hover:-translate-x-0.5" />
      <span className="underline-offset-2 group-hover:underline">{lbl}</span>
    </button>
  )
}
