import React, { useEffect, useState } from 'react'
import { useIdleTimer } from '@/hooks/useIdleTimer'
import IdleWarningModal from '@/components/IdleWarningModal'
import { Router, Route, Switch, Redirect } from 'wouter'
import { useHashLocation } from 'wouter/use-hash-location'
import { initDefaultData, User } from '@/lib/db'
import { logoutAsync, getCurrentUserAsync, initAdminIfNeeded, initCoursSystemeAsync } from '@/lib/db-firebase'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from '@/lib/firebase'
import { Layout } from '@/components/Layout'
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
const ComptabiliteSYCEBNLPage = React.lazy(() => import('@/pages/ComptabiliteSYCEBNLPage'))
const JournalSYCEBNLPage = React.lazy(() => import('@/pages/JournalSYCEBNLPage'))
const GrandLivreSYCEBNLPage = React.lazy(() => import('@/pages/GrandLivreSYCEBNLPage'))
const BalanceSYCEBNLPage = React.lazy(() => import('@/pages/BalanceSYCEBNLPage'))
const BilanSYCEBNLPage = React.lazy(() => import('@/pages/BilanSYCEBNLPage'))
const PlanComptableSYCEBNLPage = React.lazy(() => import('@/pages/PlanComptableSYCEBNLPage'))
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
const StockArticlesPage = React.lazy(() => import('@/pages/StockArticlesPage'))
const StockMouvementPage = React.lazy(() => import('@/pages/StockMouvementPage'))
const StockFichePage = React.lazy(() => import('@/pages/StockFichePage'))
const StockJournalPage = React.lazy(() => import('@/pages/StockJournalPage'))
const StockExercicePage = React.lazy(() => import('@/pages/StockExercicePage'))
const MesCoursPage = React.lazy(() => import('@/pages/MesCoursPage'))
const UE2DroitSocietesPage = React.lazy(() => import('@/pages/UE2DroitSocietesPage'))
const UE2Chapitre1Page = React.lazy(() => import('@/pages/UE2Chapitre1Page'))
const UE2Chapitre2Page = React.lazy(() => import('@/pages/UE2Chapitre2Page'))
const UE2Chapitre3Page = React.lazy(() => import('@/pages/UE2Chapitre3Page'))
const UE2Chapitre4Page = React.lazy(() => import('@/pages/UE2Chapitre4Page'))
const UE2Chapitre5Page = React.lazy(() => import('@/pages/UE2Chapitre5Page'))
const UE2Chapitre6Page = React.lazy(() => import('@/pages/UE2Chapitre6Page'))
const UE2Chapitre7Page = React.lazy(() => import('@/pages/UE2Chapitre7Page'))
const UE2Chapitre8Page = React.lazy(() => import('@/pages/UE2Chapitre8Page'))
const UE2Chapitre9Page = React.lazy(() => import('@/pages/UE2Chapitre9Page'))
const UE2Chapitre10Page = React.lazy(() => import('@/pages/UE2Chapitre10Page'))
const UE2Chapitre11Page = React.lazy(() => import('@/pages/UE2Chapitre11Page'))
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

function ProtectedRoute({ component: Component, user, onLogout }: { component: React.ComponentType; user: User | null; onLogout: () => void }) {
  if (!user) return <Redirect to="/login" />
  return (
    <Layout user={user} onLogout={onLogout}>
      <Component />
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
    await logoutAsync()
    setUser(null)
  }

  const W = ({ children }: { children: React.ReactNode }) =>
    user ? <Layout user={user} onLogout={handleLogout}>{children}</Layout> : <Redirect to="/login" />

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
          <W><DashboardPage /></W>
        </Route>

        {/* ── Comptabilité Générale (SYSCOHADA) ── */}
        <Route path="/comptabilite-generale">
          <W><ComptabiliteGeneralePage /></W>
        </Route>
        <Route path="/journal">
          <W><ModuleProvider module="syscohada"><JournalPage /></ModuleProvider></W>
        </Route>
        <Route path="/grand-livre">
          <W><ModuleProvider module="syscohada"><GrandLivrePage /></ModuleProvider></W>
        </Route>
        <Route path="/balance">
          <W><ModuleProvider module="syscohada"><BalancePage /></ModuleProvider></W>
        </Route>
        <Route path="/bilan">
          <W><ModuleProvider module="syscohada"><BilanPage mode="bilan" /></ModuleProvider></W>
        </Route>
        <Route path="/compte-resultat">
          <W><ModuleProvider module="syscohada"><BilanPage mode="cr" /></ModuleProvider></W>
        </Route>
        <Route path="/plan-comptable">
          <W><PlanComptablePage /></W>
        </Route>

        {/* ── Comptabilité SYCEBNL ── */}
        <Route path="/comptabilite-sycebnl">
          <W><ComptabiliteSYCEBNLPage /></W>
        </Route>
        <Route path="/sycebnl/journal">
          <W><ModuleProvider module="sycebnl"><JournalSYCEBNLPage /></ModuleProvider></W>
        </Route>
        <Route path="/sycebnl/grand-livre">
          <W><ModuleProvider module="sycebnl"><GrandLivreSYCEBNLPage /></ModuleProvider></W>
        </Route>
        <Route path="/sycebnl/balance">
          <W><ModuleProvider module="sycebnl"><BalanceSYCEBNLPage /></ModuleProvider></W>
        </Route>
        <Route path="/sycebnl/bilan">
          <W><ModuleProvider module="sycebnl"><BilanSYCEBNLPage /></ModuleProvider></W>
        </Route>
        <Route path="/sycebnl/plan-comptable">
          <W><PlanComptableSYCEBNLPage /></W>
        </Route>

        {/* ── Hubs dossiers 1 et 2 ── */}
        <Route path="/docs-comptables-hub">
          <W><DocsComptablesHub /></W>
        </Route>
        <Route path="/etats-financiers-hub">
          <W><EtatsFinanciersHub /></W>
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
          <W><ChargesPersonnelIPRPage /></W>
        </Route>

        {/* ── Autres ── */}
        <Route path="/exercices">
          <W><ExercicesPage /></W>
        </Route>
        <Route path="/exercices/:id">
          <W><ExerciceDetailPage /></W>
        </Route>
        <Route path="/professeurs">
          <W><ProfesseurPage /></W>
        </Route>
        <Route path="/chat">
          <W><ChatPage /></W>
        </Route>
        <Route path="/documents">
          <W><DocumentsPage /></W>
        </Route>

        <Route path="/apercu-devoir">
          <W><ApercuDevoirPage /></W>
        </Route>
        <Route path="/fiscalite">
          <W><FiscalitePage /></W>
        </Route>
        <Route path="/dictionnaire">
          <W><DictionnairePage /></W>
        </Route>
        <Route path="/analyse-financiere">
          <W><ComingSoonPage
            titre="Analyse Financière"
            description="Le module Analyse Financière permet d'étudier la santé financière d'une entreprise : rentabilité, liquidité, solvabilité et ratios clés."
            fonctionnalites={['Calcul des ratios financiers', 'Analyse de la rentabilité', 'Tableau des flux de trésorerie', 'Diagnostic financier', 'Exercices d\'analyse']}
          /></W>
        </Route>

        <Route path="/prepa-onec">
          <W><PrepaOnecPage /></W>
        </Route>

        <Route path="/debug-isolation">
          <W><DebuggingAdminPage /></W>
        </Route>

        <Route path="/mes-cours">
          {() => <ProtectedRoute component={MesCoursPage} user={user} onLogout={handleLogout} />}
        </Route>

        {/* ── UE 2 — Droit des sociétés OHADA ── */}
        <Route path="/ue2-droit-societes">
          <W><UE2DroitSocietesPage /></W>
        </Route>
        <Route path="/ue2/chapitre-1">
          <W><UE2Chapitre1Page /></W>
        </Route>
        <Route path="/ue2/chapitre-2">
          <W><UE2Chapitre2Page /></W>
        </Route>
        <Route path="/ue2/chapitre-3">
          <W><UE2Chapitre3Page /></W>
        </Route>
        <Route path="/ue2/chapitre-4">
          <W><UE2Chapitre4Page /></W>
        </Route>
        <Route path="/ue2/chapitre-5">
          <W><UE2Chapitre5Page /></W>
        </Route>
        <Route path="/ue2/chapitre-6">
          <W><UE2Chapitre6Page /></W>
        </Route>
        <Route path="/ue2/chapitre-7">
          <W><UE2Chapitre7Page /></W>
        </Route>
        <Route path="/ue2/chapitre-8">
          <W><UE2Chapitre8Page /></W>
        </Route>
        <Route path="/ue2/chapitre-9">
          <W><UE2Chapitre9Page /></W>
        </Route>
        <Route path="/ue2/chapitre-10">
          <W><UE2Chapitre10Page /></W>
        </Route>
        <Route path="/ue2/chapitre-11">
          <W><UE2Chapitre11Page /></W>
        </Route>

        {/* ── UE 5 — Finances publiques ── */}
        <Route path="/ue5-finances-publiques">
          <W><UE5FinancesPubliquesPage /></W>
        </Route>
        <Route path="/ue5/chapitre-1">
          <W><UE5Chapitre1Page /></W>
        </Route>
        <Route path="/ue5/chapitre-2">
          <W><UE5Chapitre2Page /></W>
        </Route>
        <Route path="/ue5/chapitre-3">
          <W><UE5Chapitre3Page /></W>
        </Route>
        <Route path="/ue5/chapitre-4">
          <W><UE5Chapitre4Page /></W>
        </Route>
        <Route path="/ue5/chapitre-5">
          <W><UE5Chapitre5Page /></W>
        </Route>
        <Route path="/ue5/chapitre-6">
          <W><UE5Chapitre6Page /></W>
        </Route>
        <Route path="/ue5/chapitre-7">
          <W><UE5Chapitre7Page /></W>
        </Route>
        <Route path="/ue5/chapitre-8">
          <W><UE5Chapitre8Page /></W>
        </Route>
        <Route path="/ue5/chapitre-9">
          <W><UE5Chapitre9Page /></W>
        </Route>
        <Route path="/ue5/chapitre-10">
          <W><UE5Chapitre10Page /></W>
        </Route>
        <Route path="/ue13-ifrs-ias">
          <W><UE13IFRSPage /></W>
        </Route>
        <Route path="/ue13/chapitre-1">
          <W><UE13Chapitre1Page /></W>
        </Route>
        <Route path="/ue13/chapitre-2">
          <W><UE13Chapitre2Page /></W>
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
          <W><UE13Chapitre3Page /></W>
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
