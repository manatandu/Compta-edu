// ═══════════════════════════════════════════════════════════════════
//  Préchargement au survol - quand l'utilisateur passe la souris sur un
//  lien de la barre latérale, on lance le téléchargement du code de la
//  page AVANT le clic. Au moment du clic, le chunk est déjà en cache
//  navigateur : la navigation paraît instantanée au lieu d'attendre le
//  fetch + parse du bundle JS de la page.
//  (Sur mobile, sans survol, on précharge au premier toucher via
//  onTouchStart, avec le même effet en pratique.)
// ═══════════════════════════════════════════════════════════════════

type Loader = () => Promise<unknown>

// Un seul déclenchement par route : inutile de relancer le fetch si déjà en vol/chargé.
const already = new Set<string>()

// Table des routes les plus fréquentées (nav principale + modules).
// Les chapitres UE ne sont pas préchargés au survol (trop nombreux,
// impact réseau non justifié pour des pages visitées une seule fois).
const registry: Record<string, Loader> = {
  '/': () => import('@/pages/DashboardPage'),
  '/comptabilite-generale': () => import('@/pages/ComptabiliteGeneralePage'),
  '/journal': () => import('@/pages/JournalPage'),
  '/grand-livre': () => import('@/pages/GrandLivrePage'),
  '/balance': () => import('@/pages/BalancePage'),
  '/bilan': () => import('@/pages/BilanPage'),
  '/plan-comptable': () => import('@/pages/PlanComptablePage'),
  '/docs-comptables-hub': () => import('@/pages/DocsComptablesHub'),
  '/etats-financiers-hub': () => import('@/pages/EtatsFinanciersHub'),
  '/immobilisations': () => import('@/pages/ImmobilisationsPage'),
  '/stock': () => import('@/pages/GestionStockPage'),
  '/charges-personnel/ipr': () => import('@/pages/ChargesPersonnelIPRPage'),
  '/exercices': () => import('@/pages/ExercicesPage'),
  '/professeurs': () => import('@/pages/ProfesseurPage'),
  '/chat': () => import('@/pages/ChatPage'),
  '/documents': () => import('@/pages/DocumentsPage'),
  '/fiscalite': () => import('@/pages/FiscalitePage'),
  '/dictionnaire': () => import('@/pages/DictionnairePage'),
  '/analyse-financiere': () => import('@/pages/ComingSoonPage'),
  '/gestion-etudiants': () => import('@/pages/GestionEtudiantsPage'),
  '/prepa-onec': () => import('@/pages/PrepaOnecPage'),
  '/mes-cours': () => import('@/pages/MesCoursPage'),
}

export function prefetchRoute(path: string) {
  const loader = registry[path]
  if (!loader || already.has(path)) return
  already.add(path)
  loader().catch(() => { already.delete(path) })
}
