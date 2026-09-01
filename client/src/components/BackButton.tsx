import { useHashLocation } from 'wouter/use-hash-location'
import { ChevronLeft } from 'lucide-react'

// Mapping route -> page parente
const PARENT_MAP: Record<string, { path: string; label: string }> = {
  // Comptabilite Generale : documents
  '/journal':                    { path: '/comptabilite-generale', label: 'Documents Comptables' },
  '/grand-livre':                { path: '/comptabilite-generale', label: 'Documents Comptables' },
  '/balance':                    { path: '/comptabilite-generale', label: 'Documents Comptables' },
  '/bilan':                      { path: '/comptabilite-generale', label: 'Etats Financiers' },
  '/compte-resultat':            { path: '/comptabilite-generale', label: 'Etats Financiers' },
  '/plan-comptable':             { path: '/comptabilite-generale', label: 'Comptabilite Generale' },
  '/historique':                 { path: '/comptabilite-generale', label: 'Comptabilite Generale' },
  '/immobilisations':            { path: '/comptabilite-generale', label: 'Comptabilite Generale' },
  '/charges-personnel/ipr':      { path: '/comptabilite-generale', label: 'Comptabilite Generale' },
  '/docs-comptables-hub':        { path: '/comptabilite-generale', label: 'Comptabilite Generale' },
  '/etats-financiers-hub':       { path: '/comptabilite-generale', label: 'Comptabilite Generale' },
  '/emprunts':                   { path: '/comptabilite-generale', label: 'Comptabilite Generale' },
  '/factures':                   { path: '/comptabilite-generale', label: 'Comptabilite Generale' },
  // Stock - sous-module de Comptabilite Generale (module 4), pas de Mes cours
  '/stock':                      { path: '/comptabilite-generale', label: 'Comptabilite Generale' },
  '/stock/articles':             { path: '/stock',                 label: 'Gestion de Stock' },
  '/stock/journal':              { path: '/stock',                 label: 'Gestion de Stock' },
  '/stock/exercice':             { path: '/stock',                 label: 'Gestion de Stock' },
  '/stock/mouvement':            { path: '/stock',                 label: 'Gestion de Stock' },
  '/stock/fiche':                { path: '/stock',                 label: 'Gestion de Stock' },
  // Mes cours et Dictionnaire : accessibles depuis le tableau de bord
  '/mes-cours':                  { path: '/',                      label: 'Tableau de bord' },
  '/dictionnaire':               { path: '/',                      label: 'Tableau de bord' },
  // UE1
  '/ue1-droit-travail':          { path: '/mes-cours',             label: 'Mes cours' },
  '/ue1/chapitre-x':             { path: '/ue1-droit-travail',     label: 'UE1 Droit du travail' },
  // UE2
  '/ue2-droit-societes':         { path: '/mes-cours',             label: 'Mes cours' },
  '/ue2/chapitre-1':             { path: '/ue2-droit-societes',    label: 'Droit des societes OHADA' },
  '/ue2/chapitre-2':             { path: '/ue2-droit-societes',    label: 'Droit des societes OHADA' },
  '/ue2/chapitre-3':             { path: '/ue2-droit-societes',    label: 'Droit des societes OHADA' },
  '/ue2/chapitre-4':             { path: '/ue2-droit-societes',    label: 'Droit des societes OHADA' },
  '/ue2/chapitre-5':             { path: '/ue2-droit-societes',    label: 'Droit des societes OHADA' },
  '/ue2/chapitre-6':             { path: '/ue2-droit-societes',    label: 'Droit des societes OHADA' },
  '/ue2/chapitre-7':             { path: '/ue2-droit-societes',    label: 'Droit des societes OHADA' },
  '/ue2/chapitre-8':             { path: '/ue2-droit-societes',    label: 'Droit des societes OHADA' },
  '/ue2/chapitre-9':             { path: '/ue2-droit-societes',    label: 'Droit des societes OHADA' },
  '/ue2/chapitre-10':            { path: '/ue2-droit-societes',    label: 'Droit des societes OHADA' },
  '/ue2/chapitre-11':            { path: '/ue2-droit-societes',    label: 'Droit des societes OHADA' },
  // UE5
  '/ue5-finances-publiques':     { path: '/mes-cours',             label: 'Mes cours' },
  '/ue5/chapitre-1':             { path: '/ue5-finances-publiques', label: 'UE5 Finances publiques' },
  '/ue5/chapitre-2':             { path: '/ue5-finances-publiques', label: 'UE5 Finances publiques' },
  '/ue5/chapitre-3':             { path: '/ue5-finances-publiques', label: 'UE5 Finances publiques' },
  '/ue5/chapitre-4':             { path: '/ue5-finances-publiques', label: 'UE5 Finances publiques' },
  '/ue5/chapitre-5':             { path: '/ue5-finances-publiques', label: 'UE5 Finances publiques' },
  '/ue5/chapitre-6':             { path: '/ue5-finances-publiques', label: 'UE5 Finances publiques' },
  '/ue5/chapitre-7':             { path: '/ue5-finances-publiques', label: 'UE5 Finances publiques' },
  '/ue5/chapitre-8':             { path: '/ue5-finances-publiques', label: 'UE5 Finances publiques' },
  '/ue5/chapitre-9':             { path: '/ue5-finances-publiques', label: 'UE5 Finances publiques' },
  '/ue5/chapitre-10':            { path: '/ue5-finances-publiques', label: 'UE5 Finances publiques' },
  '/ue13-ifrs-ias':              { path: '/mes-cours',             label: 'Mes cours' },
  '/ue13/chapitre-1':            { path: '/ue13-ifrs-ias',         label: 'UE13 IAS/IFRS' },
  '/ue13/chapitre-2':            { path: '/ue13-ifrs-ias',         label: 'UE13 IAS/IFRS' },
  '/ue13/chapitre-3':            { path: '/ue13-ifrs-ias',         label: 'UE13 IAS/IFRS' },
  '/ue13/chapitre-4':            { path: '/ue13-ifrs-ias',         label: 'UE13 IAS/IFRS' },
  '/ue13/chapitre-5':            { path: '/ue13-ifrs-ias',         label: 'UE13 IAS/IFRS' },
  '/ue13/chapitre-6':            { path: '/ue13-ifrs-ias',         label: 'UE13 IAS/IFRS' },
  '/ue13/chapitre-7':            { path: '/ue13-ifrs-ias',         label: 'UE13 IAS/IFRS' },
  '/ue13/chapitre-8':            { path: '/ue13-ifrs-ias',         label: 'UE13 IAS/IFRS' },
  // Autres pages internes
  '/exercices':                  { path: '/',                      label: 'Tableau de bord' },
  '/documents':                  { path: '/',                      label: 'Tableau de bord' },
  '/chat':                       { path: '/',                      label: 'Tableau de bord' },
  '/professeurs':                { path: '/',                      label: 'Tableau de bord' },
  '/comptabilite-generale':      { path: '/mes-cours',             label: 'Mes cours' },
  '/fiscalite':                  { path: '/mes-cours',             label: 'Mes cours' },
  '/coming-soon':                { path: '/',                      label: 'Tableau de bord' },
  '/apercu-devoir':              { path: '/exercices',             label: 'Exercices' },
  '/debug-isolation':            { path: '/',                      label: 'Tableau de bord' },
  // Gestion des étudiants
  '/gestion-etudiants':          { path: '/',                      label: 'Tableau de bord' },
  '/etudiant':                   { path: '/gestion-etudiants',     label: 'Gestion des étudiants' },
  '/inscription-plateforme':     { path: '/gestion-etudiants',     label: 'Gestion des étudiants' },
}

const SOMMAIRES_MODULES: Record<string, { path: string; label: string }> = {
  ue1:  { path: '/ue1-droit-travail',      label: 'UE1 Droit du travail' },
  ue2:  { path: '/ue2-droit-societes',     label: 'Droit des societes OHADA' },
  ue3:  { path: '/ue3-compta-societes',    label: 'UE3 Comptabilite des societes' },
  ue5:  { path: '/ue5-finances-publiques', label: 'UE5 Finances publiques' },
  ue13: { path: '/ue13-ifrs-ias',          label: 'UE13 IAS/IFRS' },
}

function parentDeModule(location: string): { path: string; label: string } | undefined {
  const chapitre = location.match(/^\/(ue\d+)\/chapitre-\d+/)
  if (chapitre) return SOMMAIRES_MODULES[chapitre[1]]
  if (/^\/ue\d+-[a-z-]+$/.test(location)) return { path: '/mes-cours', label: 'Mes cours' }
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
  else if (location.startsWith('/ue1/chapitre-'))    baseRoute = '/ue1/chapitre-x'
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
