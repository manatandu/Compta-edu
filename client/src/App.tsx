import React, { useEffect, useState } from 'react'
import { useIdleTimer } from '@/hooks/useIdleTimer'
import IdleWarningModal from '@/components/IdleWarningModal'
import { Router, Route, Switch, Redirect } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'
import type { User } from '@/lib/db'
import { logoutAsync, getCurrentUserAsync, initCoursSystemeAsync } from '@/lib/db-firebase'
import { isProfRole } from '@/lib/permissions'
import { setFirestoreErrorSuppressed } from '@/lib/firestoreErrorHandler'
import { onAuthStateChanged } from 'firebase/auth'
import { terminate, clearIndexedDbPersistence } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'
import { Layout } from '@/components/Layout'
import ErrorBoundary from '@/components/ErrorBoundary'
import { Toaster } from '@/components/ui/toaster'
import { ModuleProvider } from '@/lib/moduleContext'
import { UserProvider } from '@/lib/userContext'
import { NavProvider } from '@/lib/navContext'
import PageLoader from '@/components/PageLoader'
import { MODULES, ROUTE_CHAPITRE } from '@/content/modules'



// ─── Pages chargées à la demande (code-splitting) ──────────────────────────
const LoginPage = React.lazy(() => import('@/pages/LoginPage'))
const DashboardPage = React.lazy(() => import('@/pages/DashboardPage'))
const PageIntrouvable = React.lazy(() => import('@/pages/PageIntrouvable'))
const JournalPage = React.lazy(() => import('@/pages/JournalPage'))
const GrandLivrePage = React.lazy(() => import('@/pages/GrandLivrePage'))
const BalancePage = React.lazy(() => import('@/pages/BalancePage'))
const BilanPage = React.lazy(() => import('@/pages/BilanPage'))
const PlanComptablePage = React.lazy(() => import('@/pages/PlanComptablePage'))
const ExercicesPage = React.lazy(() => import('@/pages/ExercicesPage'))
const ExerciceDetailPage = React.lazy(() => import('@/pages/ExerciceDetailPage'))
const ProfesseurPage = React.lazy(() => import('@/pages/ProfesseurPage'))
const ComptabiliteGeneralePage = React.lazy(() => import('@/pages/ComptabiliteGeneralePage'))
const ChatPage = React.lazy(() => import('@/pages/ChatPage'))
const DocumentsPage = React.lazy(() => import('@/pages/DocumentsPage'))
const ComingSoonPage = React.lazy(() => import('@/pages/ComingSoonPage'))
const ApercuDevoirPage = React.lazy(() => import('@/pages/ApercuDevoirPage'))
const FiscalitePage = React.lazy(() => import('@/pages/FiscalitePage'))
const ChargesPersonnelIRPPPage = React.lazy(() => import('@/pages/ChargesPersonnelIRPPPage'))
const ImmobilisationsPage = React.lazy(() => import('@/pages/ImmobilisationsPage'))
const DocsComptablesHub = React.lazy(() => import('@/pages/DocsComptablesHub'))
const EtatsFinanciersHub = React.lazy(() => import('@/pages/EtatsFinanciersHub'))
const DictionnairePage = React.lazy(() => import('@/pages/DictionnairePage'))
const DebuggingAdminPage = React.lazy(() => import('@/pages/DebuggingAdminPage'))
const GestionStockPage = React.lazy(() => import('@/pages/GestionStockPage'))
const EmpruntsPage = React.lazy(() => import('@/pages/EmpruntsPage'))
const FacturesDevisesPage = React.lazy(() => import('@/pages/FacturesDevisesPage'))
const StockArticlesPage = React.lazy(() => import('@/pages/StockArticlesPage'))
const StockMouvementPage = React.lazy(() => import('@/pages/StockMouvementPage'))
const StockFichePage = React.lazy(() => import('@/pages/StockFichePage'))
const StockJournalPage = React.lazy(() => import('@/pages/StockJournalPage'))
const StockExercicePage = React.lazy(() => import('@/pages/StockExercicePage'))
const MesCoursPage = React.lazy(() => import('@/pages/MesCoursPage'))
const ChapitrePage = React.lazy(() => import('@/pages/ChapitrePage'))
const SommaireModulePage = React.lazy(() => import('@/pages/SommaireModulePage'))
const UE2SimulateurConstitutionPage = React.lazy(() => import('@/pages/UE2SimulateurConstitutionPage'))
const GestionEtudiantsPage = React.lazy(() => import('@/pages/GestionEtudiantsPage'))
const FicheEtudiantPage = React.lazy(() => import('@/pages/FicheEtudiantPage'))
const InscriptionPlatformePage = React.lazy(() => import('@/pages/InscriptionPlatformePage'))

// La sidebar/Layout reste montée pendant le chargement d'une page : seul le
// contenu affiche un état de chargement (transition fluide, pas de flash plein
// écran qui fait disparaître toute l'interface).
// Hoisté au niveau module (et non défini inline dans App()) : une fonction
// composant recréée à chaque rendu de App change d'identité à chaque fois,
// ce qui force React à démonter/remonter tout le sous-arbre enveloppé - y
// compris l'ErrorBoundary et la page lazy - à chaque changement de `user`
// (ex. après connexion/déconnexion), perdant leur état et rejouant le loader.
function W({ user, onLogout, children }: { user: User | null; onLogout: () => void; children: React.ReactNode }) {
  const [location] = useHashLocation()
  return user
    ? <Layout user={user} onLogout={onLogout}>
        {/* key={location} : changer de page réarme l'ErrorBoundary - sans ça,
            une page qui plante resterait affichée en erreur même après avoir
            cliqué vers une autre page dans la sidebar. */}
        <ErrorBoundary key={location}>
          <React.Suspense fallback={<PageLoader />}>{children}</React.Suspense>
        </ErrorBoundary>
      </Layout>
    : <Redirect to="/login" />
}

function ProtectedRoute({ component: Component, user, onLogout }: { component: React.ComponentType; user: User | null; onLogout: () => void }) {
  const [location] = useHashLocation()
  if (!user) return <Redirect to="/login" />
  return (
    <Layout user={user} onLogout={onLogout}>
      <ErrorBoundary key={location}>
        <React.Suspense fallback={<PageLoader />}>
          <Component />
        </React.Suspense>
      </ErrorBoundary>
    </Layout>
  )
}

export default function App() {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Écouter l'état Firebase Auth
    const unsub = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Une connexion réussie referme la fenêtre de suppression ouverte par
        // un logout précédent (manuel ou pour inactivité) : au-delà de ce
        // point, une erreur onSnapshot signale de nouveau un vrai problème.
        setFirestoreErrorSuppressed(false)
        // Passer directement firebaseUser pour éviter les problèmes de timing
        try {
          const appUser = await getCurrentUserAsync(firebaseUser)
          setUser(appUser)
          // Synchronisation du catalogue des cours système : elle écrit dans
          // /cours, ce que firestore.rules ne permet qu'à un professeur ou un
          // administrateur (isProf()). Lancée pour tout visiteur - anonyme ou
          // étudiant - elle échouait en permission-denied à chaque chargement,
          // d'où des erreurs rouges en console dès l'écran de connexion. Elle
          // ne part donc qu'une fois une session à privilèges établie.
          if (appUser && isProfRole(appUser)) {
            initCoursSystemeAsync().catch(console.error)
          }
        } catch (e) {
          console.error('Erreur chargement profil:', e)
          setUser(null)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsub()
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-background">
        <div className="text-primary font-bold text-xl">Chargement...</div>
      </div>
    )
  }

  const handleLogout = async () => {
    // Le signOut() qui suit révoque immédiatement les droits Firestore : les
    // onSnapshot() encore montés vont échouer en permission-denied avant que
    // la page ne se recharge. Ce n'est pas une coupure réseau, on coupe donc
    // l'avertissement pour cette fenêtre attendue.
    setFirestoreErrorSuppressed(true)
    await logoutAsync()
    // Le cache Firestore persistant (IndexedDB) survit à la déconnexion :
    // sur un poste partagé (salle informatique), les données du compte
    // précédent resteraient sinon lisibles instantanément par le suivant,
    // indépendamment des règles de sécurité Firestore. On le vide, puis on
    // recharge la page pour repartir sur une instance Firestore propre.
    try {
      await terminate(db)
      await clearIndexedDbPersistence(db)
    } catch (e) {
      console.warn('Nettoyage du cache Firestore impossible :', e)
    }
    window.location.reload()
  }

  function IdleGuard() {
    const { showWarning, secondsLeft, stayConnected } = useIdleTimer()
    if (!user) return null
    return showWarning ? <IdleWarningModal secondsLeft={secondsLeft} onStay={stayConnected} /> : null
  }

  return (
    <UserProvider user={user}>
    <NavProvider>
    <IdleGuard />
    <Router hook={useHashLocation}>
      <React.Suspense fallback={<PageLoader />}>
      <Switch>
        <Route path="/login">
          {user ? <Redirect to="/" /> : <LoginPage onLogin={setUser} />}
        </Route>
        <Route path="/">
          <W user={user} onLogout={handleLogout}><DashboardPage /></W>
        </Route>

        {/* ── Comptabilité Générale (SYSCOHADA) ── */}
        <Route path="/comptabilite-generale">
          <W user={user} onLogout={handleLogout}><ComptabiliteGeneralePage /></W>
        </Route>
        <Route path="/journal">
          <W user={user} onLogout={handleLogout}><ModuleProvider module="syscohada"><JournalPage /></ModuleProvider></W>
        </Route>
        <Route path="/grand-livre">
          <W user={user} onLogout={handleLogout}><ModuleProvider module="syscohada"><GrandLivrePage /></ModuleProvider></W>
        </Route>
        <Route path="/balance">
          <W user={user} onLogout={handleLogout}><ModuleProvider module="syscohada"><BalancePage /></ModuleProvider></W>
        </Route>
        <Route path="/bilan">
          <W user={user} onLogout={handleLogout}><ModuleProvider module="syscohada"><BilanPage mode="bilan" /></ModuleProvider></W>
        </Route>
        <Route path="/compte-resultat">
          <W user={user} onLogout={handleLogout}><ModuleProvider module="syscohada"><BilanPage mode="cr" /></ModuleProvider></W>
        </Route>
        <Route path="/plan-comptable">
          <W user={user} onLogout={handleLogout}><PlanComptablePage /></W>
        </Route>

        {/* ── Hubs dossiers 1 et 2 ── */}
        <Route path="/docs-comptables-hub">
          <W user={user} onLogout={handleLogout}><DocsComptablesHub /></W>
        </Route>
        <Route path="/etats-financiers-hub">
          <W user={user} onLogout={handleLogout}><EtatsFinanciersHub /></W>
        </Route>

        {/* ── Charges du personnel (Comptabilité Générale) ── */}
        <Route path="/immobilisations">
          {() => <ProtectedRoute component={ImmobilisationsPage} user={user} onLogout={handleLogout} />}
        </Route>
        <Route path="/stock">
          {() => <ProtectedRoute component={GestionStockPage} user={user} onLogout={handleLogout} />}
        </Route>
        <Route path="/stock/articles">
          {() => <ProtectedRoute component={StockArticlesPage} user={user} onLogout={handleLogout} />}
        </Route>
        <Route path="/stock/mouvement/:id">
          {() => <ProtectedRoute component={StockMouvementPage} user={user} onLogout={handleLogout} />}
        </Route>
        <Route path="/stock/fiche/:id">
          {() => <ProtectedRoute component={StockFichePage} user={user} onLogout={handleLogout} />}
        </Route>
        <Route path="/stock/journal">
          {() => <ProtectedRoute component={StockJournalPage} user={user} onLogout={handleLogout} />}
        </Route>
        <Route path="/stock/journal/:id">
          {() => <ProtectedRoute component={StockJournalPage} user={user} onLogout={handleLogout} />}
        </Route>
        <Route path="/stock/exercice">
          {() => <ProtectedRoute component={StockExercicePage} user={user} onLogout={handleLogout} />}
        </Route>
        <Route path="/charges-personnel/irpp">
          <W user={user} onLogout={handleLogout}><ChargesPersonnelIRPPPage /></W>
        </Route>
        {/* Ancienne adresse (l'IPR est abrogé depuis le 1er janvier 2026) :
            conservée en redirection pour les favoris et les liens déjà partagés. */}
        <Route path="/charges-personnel/ipr"><Redirect to="/charges-personnel/irpp" /></Route>
        <Route path="/emprunts">
          {() => <ProtectedRoute component={EmpruntsPage} user={user} onLogout={handleLogout} />}
        </Route>
        <Route path="/factures">
          {() => <ProtectedRoute component={FacturesDevisesPage} user={user} onLogout={handleLogout} />}
        </Route>

        {/* ── Autres ── */}
        <Route path="/exercices">
          <W user={user} onLogout={handleLogout}><ExercicesPage /></W>
        </Route>
        <Route path="/exercices/:id">
          <W user={user} onLogout={handleLogout}><ExerciceDetailPage /></W>
        </Route>
        <Route path="/professeurs">
          <W user={user} onLogout={handleLogout}><ProfesseurPage /></W>
        </Route>
        <Route path="/chat">
          <W user={user} onLogout={handleLogout}><ChatPage /></W>
        </Route>
        <Route path="/documents">
          <W user={user} onLogout={handleLogout}><DocumentsPage /></W>
        </Route>

        <Route path="/apercu-devoir">
          <W user={user} onLogout={handleLogout}><ApercuDevoirPage /></W>
        </Route>
        <Route path="/fiscalite">
          <W user={user} onLogout={handleLogout}><FiscalitePage /></W>
        </Route>
        <Route path="/dictionnaire">
          <W user={user} onLogout={handleLogout}><DictionnairePage /></W>
        </Route>
        <Route path="/analyse-financiere">
          <W user={user} onLogout={handleLogout}><ComingSoonPage
            titre="Analyse Financière"
            description="Le module Analyse Financière permet d'étudier la santé financière d'une entreprise : rentabilité, liquidité, solvabilité et ratios clés."
            fonctionnalites={['Calcul des ratios financiers', 'Analyse de la rentabilité', 'Tableau des flux de trésorerie', 'Diagnostic financier', 'Exercices d\'analyse']}
          /></W>
        </Route>

        <Route path="/debug-isolation">
          <W user={user} onLogout={handleLogout}><DebuggingAdminPage /></W>
        </Route>

        <Route path="/mes-cours">
          {() => <ProtectedRoute component={MesCoursPage} user={user} onLogout={handleLogout} />}
        </Route>

        {/* ── Modules de cours rédigés ──
            Sommaires et chapitres sont décrits par content/modules.ts et
            content/catalogue.ts : ajouter un module ou un chapitre n'exige
            aucune route supplémentaire ici. */}
        {MODULES.map(m => (
          <Route key={m.ue} path={m.route}>
            <W user={user} onLogout={handleLogout}><SommaireModulePage ue={m.ue} /></W>
          </Route>
        ))}
        <Route path="/ue2/simulateur-constitution">
          <W user={user} onLogout={handleLogout}><UE2SimulateurConstitutionPage /></W>
        </Route>
        {/* Motif en expression régulière : le parseur de wouter (regexparam) ne
            reconnaît un paramètre qu'en début de segment. « chapitre-:numero »
            y était lu comme un texte littéral, si bien qu'aucune adresse de
            chapitre ne correspondait et que l'UE1 et l'UE3 affichaient
            « Page introuvable ». */}
        <Route path={ROUTE_CHAPITRE}>
          {(params) => (
            <W user={user} onLogout={handleLogout}>
              <ChapitrePage ue={params.ue ?? ""} numero={params.numero ?? ""} />
            </W>
          )}
        </Route>

        {/* ── Gestion des étudiants ── */}
        <Route path="/gestion-etudiants">
          {() => <ProtectedRoute component={GestionEtudiantsPage} user={user} onLogout={handleLogout} />}
        </Route>
        <Route path="/etudiant/:id">
          {() => <ProtectedRoute component={FicheEtudiantPage} user={user} onLogout={handleLogout} />}
        </Route>
        <Route path="/inscription-plateforme">
          {() => <ProtectedRoute component={InscriptionPlatformePage} user={user} onLogout={handleLogout} />}
        </Route>

        {/* Adresse inconnue : page explicite plutôt qu'un renvoi muet vers
            l'accueil, qui masquait les liens cassés (voir PageIntrouvable). */}
        <Route>
          <W user={user} onLogout={handleLogout}><PageIntrouvable /></W>
        </Route>
      </Switch>
      </React.Suspense>
      <Toaster />
    </Router>
    </NavProvider>
    </UserProvider>
  )
}
