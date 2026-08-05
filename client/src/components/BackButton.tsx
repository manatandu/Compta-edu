import React from 'react'
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
  // SYCEBNL
  '/comptabilite-sycebnl':       { path: '/mes-cours',             label: 'Mes cours' },
  '/sycebnl/journal':            { path: '/comptabilite-sycebnl',  label: 'Comptabilite SYCEBNL' },
  '/sycebnl/grand-livre':        { path: '/comptabilite-sycebnl',  label: 'Comptabilite SYCEBNL' },
  '/sycebnl/balance':            { path: '/comptabilite-sycebnl',  label: 'Comptabilite SYCEBNL' },
  '/sycebnl/bilan':              { path: '/comptabilite-sycebnl',  label: 'Comptabilite SYCEBNL' },
  '/sycebnl/plan-comptable':     { path: '/comptabilite-sycebnl',  label: 'Comptabilite SYCEBNL' },
  // Stock
  '/stock':                      { path: '/mes-cours',             label: 'Mes cours' },
  '/stock/articles':             { path: '/stock',                 label: 'Gestion de Stock' },
  '/stock/journal':              { path: '/stock',                 label: 'Gestion de Stock' },
  '/stock/exercice':             { path: '/stock',                 label: 'Gestion de Stock' },
  '/stock/mouvement':            { path: '/stock',                 label: 'Gestion de Stock' },
  '/stock/fiche':                { path: '/stock',                 label: 'Gestion de Stock' },
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
  else if (location.startsWith('/ue2/chapitre-'))    baseRoute = location

  const parent = PARENT_MAP[baseRoute]

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
