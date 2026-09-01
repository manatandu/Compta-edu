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
  '/ue2/simulateur-constitution': () => import('@/pages/UE2SimulateurConstitutionPage'),
}

// Chapitres d'UE : préchargés uniquement au survol de leur ligne dans le
// sommaire du module (pas depuis la nav générale) - ce sont les chunks les
// plus lourds du site (60 à 180 KB), et le survol d'une ligne de sommaire
// est le signal d'intention le plus fiable qui soit.
// UE1 passe par le moteur commun : précharger le moteur + le contenu du
// chapitre (deux chunks distincts). Le chargeur de contenu vient du
// catalogue (imports statiques analysables par Vite, pas de template
// literal dans import()).
import('@/content/catalogue').then(({ CATALOGUE }) => {
  for (const [ue, chapitres] of Object.entries(CATALOGUE)) {
    for (const [numero, chargeur] of Object.entries(chapitres)) {
      registry[`/${ue}/chapitre-${numero}`] = () => Promise.all([
        import('@/components/chapitre/ChapitreManuscrit'),
        chargeur(),
      ])
    }
  }
})
const PAGES_CHAPITRES: Record<string, Loader> = {
  '/ue5/chapitre-4': () => import('@/pages/UE5Chapitre4Page'),
  '/ue5/chapitre-5': () => import('@/pages/UE5Chapitre5Page'),
  '/ue5/chapitre-6': () => import('@/pages/UE5Chapitre6Page'),
  '/ue5/chapitre-7': () => import('@/pages/UE5Chapitre7Page'),
  '/ue5/chapitre-8': () => import('@/pages/UE5Chapitre8Page'),
  '/ue5/chapitre-9': () => import('@/pages/UE5Chapitre9Page'),
  '/ue5/chapitre-10': () => import('@/pages/UE5Chapitre10Page'),
  '/ue13/chapitre-1': () => import('@/pages/UE13Chapitre1Page'),
  '/ue13/chapitre-2': () => import('@/pages/UE13Chapitre2Page'),
  '/ue13/chapitre-3': () => import('@/pages/UE13Chapitre3Page'),
}
Object.assign(registry, PAGES_CHAPITRES)

export function prefetchRoute(path: string) {
  const loader = registry[path]
  if (!loader || already.has(path)) return
  already.add(path)
  loader().catch(() => { already.delete(path) })
}
