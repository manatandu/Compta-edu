import React, { useEffect, useState } from 'react'
import { useIdleTimer } from '@/hooks/useIdleTimer'
import IdleWarningModal from '@/components/IdleWarningModal'
import { Router, Route, Switch, Redirect } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'
import { initDefaultData, User } from '@/lib/db'
import { logoutAsync, getCurrentUserAsync, initAdminIfNeeded, initCoursSystemeAsync } from '@/lib/db-firebase'
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



// ─── Pages chargées à la demande (code-splitting) ──────────────────────────
const LoginPage = React.lazy(() => import('@/pages/LoginPage'))
const DashboardPage = React.lazy(() => import('@/pages/DashboardPage'))
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
const ChargesPersonnelIPRPage = React.lazy(() => import('@/pages/ChargesPersonnelIPRPage'))
const ImmobilisationsPage = React.lazy(() => import('@/pages/ImmobilisationsPage'))
const DocsComptablesHub = React.lazy(() => import('@/pages/DocsComptablesHub'))
const EtatsFinanciersHub = React.lazy(() => import('@/pages/EtatsFinanciersHub'))
const DictionnairePage = React.lazy(() => import('@/pages/DictionnairePage'))
const PrepaOnecPage = React.lazy(() => import('@/pages/PrepaOnecPage'))
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
const UE1DroitTravailPage = React.lazy(() => import('@/pages/UE1DroitTravailPage'))
const ChapitrePage = React.lazy(() => import('@/pages/ChapitrePage'))
const UE2DroitSocietesPage = React.lazy(() => import('@/pages/UE2DroitSocietesPage'))
const UE2Chapitre1Page = React.lazy(() => import('@/pages/UE2Chapitre1Page'))
const UE2Chapitre5Page = React.lazy(() => import('@/pages/UE2Chapitre5Page'))
const UE2Chapitre6Page = React.lazy(() => import('@/pages/UE2Chapitre6Page'))
const UE2Chapitre7Page = React.lazy(() => import('@/pages/UE2Chapitre7Page'))
const UE2Chapitre8Page = React.lazy(() => import('@/pages/UE2Chapitre8Page'))
const UE2Chapitre9Page = React.lazy(() => import('@/pages/UE2Chapitre9Page'))
const UE2Chapitre10Page = React.lazy(() => import('@/pages/UE2Chapitre10Page'))
const UE5FinancesPubliquesPage = React.lazy(() => import('@/pages/UE5FinancesPubliquesPage'))
const UE5Chapitre1Page = React.lazy(() => import('@/pages/UE5Chapitre1Page'))
const UE5Chapitre2Page = React.lazy(() => import('@/pages/UE5Chapitre2Page'))
const UE5Chapitre3Page = React.lazy(() => import('@/pages/UE5Chapitre3Page'))
const UE5Chapitre4Page = React.lazy(() => import('@/pages/UE5Chapitre4Page'))
const UE5Chapitre5Page = React.lazy(() => import('@/pages/UE5Chapitre5Page'))
const UE5Chapitre6Page = React.lazy(() => import('@/pages/UE5Chapitre6Page'))
const UE5Chapitre7Page = React.lazy(() => import('@/pages/UE5Chapitre7Page'))
const UE5Chapitre8Page = React.lazy(() => import('@/pages/UE5Chapitre8Page'))
const UE5Chapitre9Page = React.lazy(() => import('@/pages/UE5Chapitre9Page'))
const UE5Chapitre10Page = React.lazy(() => import('@/pages/UE5Chapitre10Page'))
const UE13IFRSPage = React.lazy(() => import('@/pages/UE13IFRSPage'))
const UE13Chapitre1Page = React.lazy(() => import('@/pages/UE13Chapitre1Page'))
const UE13Chapitre2Page = React.lazy(() => import('@/pages/UE13Chapitre2Page'))
const UE13Chapitre3Page = React.lazy(() => import('@/pages/UE13Chapitre3Page'))
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
    // Initialiser données par défaut (plan comptable, etc.) : localStorage uniquement
    initDefaultData()

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
        } catch (e) {
          console.error('Erreur chargement profil:', e)
          setUser(null)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    // Créer l'admin principal si pas encore fait (en arrière-plan)
    initAdminIfNeeded().catch(console.error)
    // Initialiser les cours système par défaut
    initCoursSystemeAsync().catch(console.error)

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
        <Route path="/charges-personnel/ipr">
          <W user={user} onLogout={handleLogout}><ChargesPersonnelIPRPage /></W>
        </Route>
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

        <Route path="/prepa-onec">
          <W user={user} onLogout={handleLogout}><PrepaOnecPage /></W>
        </Route>

        <Route path="/debug-isolation">
          <W user={user} onLogout={handleLogout}><DebuggingAdminPage /></W>
        </Route>

        <Route path="/mes-cours">
          {() => <ProtectedRoute component={MesCoursPage} user={user} onLogout={handleLogout} />}
        </Route>

        {/* ── UE 1 - Droit du travail ── */}
        <Route path="/ue1-droit-travail">
          <W user={user} onLogout={handleLogout}><UE1DroitTravailPage /></W>
        </Route>
        {/* Une seule route dessert tous les chapitres du module : le contenu
            vit dans client/src/content, plus dans un fichier de page par chapitre. */}
        <Route path="/ue1/chapitre-:numero">
          {(params) => (
            <W user={user} onLogout={handleLogout}>
              <ChapitrePage ue="ue1" numero={params.numero} />
            </W>
          )}
        </Route>

        {/* ── UE 2 - Droit des sociétés OHADA ── */}
        <Route path="/ue2-droit-societes">
          <W user={user} onLogout={handleLogout}><UE2DroitSocietesPage /></W>
        </Route>
        <Route path="/ue2/chapitre-1">
          <W user={user} onLogout={handleLogout}><UE2Chapitre1Page /></W>
        </Route>
        <Route path="/ue2/chapitre-2">
          <W user={user} onLogout={handleLogout}><ChapitrePage ue="ue2" numero="2" /></W>
        </Route>
        <Route path="/ue2/chapitre-3">
          <W user={user} onLogout={handleLogout}><ChapitrePage ue="ue2" numero="3" /></W>
        </Route>
        <Route path="/ue2/chapitre-4">
          <W user={user} onLogout={handleLogout}><ChapitrePage ue="ue2" numero="4" /></W>
        </Route>
        <Route path="/ue2/chapitre-5">
          <W user={user} onLogout={handleLogout}><UE2Chapitre5Page /></W>
        </Route>
        <Route path="/ue2/chapitre-6">
          <W user={user} onLogout={handleLogout}><UE2Chapitre6Page /></W>
        </Route>
        <Route path="/ue2/chapitre-7">
          <W user={user} onLogout={handleLogout}><UE2Chapitre7Page /></W>
        </Route>
        <Route path="/ue2/chapitre-8">
          <W user={user} onLogout={handleLogout}><UE2Chapitre8Page /></W>
        </Route>
        <Route path="/ue2/chapitre-9">
          <W user={user} onLogout={handleLogout}><UE2Chapitre9Page /></W>
        </Route>
        <Route path="/ue2/chapitre-10">
          <W user={user} onLogout={handleLogout}><UE2Chapitre10Page /></W>
        </Route>
        <Route path="/ue2/chapitre-11">
          <W user={user} onLogout={handleLogout}><ChapitrePage ue="ue2" numero="11" /></W>
        </Route>

        {/* ── UE 5 - Finances publiques ── */}
        <Route path="/ue5-finances-publiques">
          <W user={user} onLogout={handleLogout}><UE5FinancesPubliquesPage /></W>
        </Route>
        <Route path="/ue5/chapitre-1">
          <W user={user} onLogout={handleLogout}><UE5Chapitre1Page /></W>
        </Route>
        <Route path="/ue5/chapitre-2">
          <W user={user} onLogout={handleLogout}><UE5Chapitre2Page /></W>
        </Route>
        <Route path="/ue5/chapitre-3">
          <W user={user} onLogout={handleLogout}><UE5Chapitre3Page /></W>
        </Route>
        <Route path="/ue5/chapitre-4">
          <W user={user} onLogout={handleLogout}><UE5Chapitre4Page /></W>
        </Route>
        <Route path="/ue5/chapitre-5">
          <W user={user} onLogout={handleLogout}><UE5Chapitre5Page /></W>
        </Route>
        <Route path="/ue5/chapitre-6">
          <W user={user} onLogout={handleLogout}><UE5Chapitre6Page /></W>
        </Route>
        <Route path="/ue5/chapitre-7">
          <W user={user} onLogout={handleLogout}><UE5Chapitre7Page /></W>
        </Route>
        <Route path="/ue5/chapitre-8">
          <W user={user} onLogout={handleLogout}><UE5Chapitre8Page /></W>
        </Route>
        <Route path="/ue5/chapitre-9">
          <W user={user} onLogout={handleLogout}><UE5Chapitre9Page /></W>
        </Route>
        <Route path="/ue5/chapitre-10">
          <W user={user} onLogout={handleLogout}><UE5Chapitre10Page /></W>
        </Route>
        <Route path="/ue13-ifrs-ias">
          <W user={user} onLogout={handleLogout}><UE13IFRSPage /></W>
        </Route>
        <Route path="/ue13/chapitre-1">
          <W user={user} onLogout={handleLogout}><UE13Chapitre1Page /></W>
        </Route>
        <Route path="/ue13/chapitre-2">
          <W user={user} onLogout={handleLogout}><UE13Chapitre2Page /></W>
        </Route>
        <Route path="/gestion-etudiants">
          {() => <ProtectedRoute component={GestionEtudiantsPage} user={user} onLogout={handleLogout} />}
        </Route>
        <Route path="/etudiant/:id">
          {() => <ProtectedRoute component={FicheEtudiantPage} user={user} onLogout={handleLogout} />}
        </Route>
        <Route path="/inscription-plateforme">
          {() => <ProtectedRoute component={InscriptionPlatformePage} user={user} onLogout={handleLogout} />}
        </Route>
        <Route path="/ue13/chapitre-3">
          <W user={user} onLogout={handleLogout}><UE13Chapitre3Page /></W>
        </Route>

        <Route><Redirect to="/" /></Route>
      </Switch>
      </React.Suspense>
      <Toaster />
    </Router>
    </NavProvider>
    </UserProvider>
  )
}
