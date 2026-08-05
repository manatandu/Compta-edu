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
import LoginPage from '@/pages/LoginPage'
import DashboardPage from '@/pages/DashboardPage'
import JournalPage from '@/pages/JournalPage'
import GrandLivrePage from '@/pages/GrandLivrePage'
import BalancePage from '@/pages/BalancePage'
import BilanPage from '@/pages/BilanPage'
import PlanComptablePage from '@/pages/PlanComptablePage'
import ExercicesPage from '@/pages/ExercicesPage'
import ExerciceDetailPage from '@/pages/ExerciceDetailPage'
import ProfesseurPage from '@/pages/ProfesseurPage'
import ComptabiliteGeneralePage from '@/pages/ComptabiliteGeneralePage'
import ComptabiliteSYCEBNLPage from '@/pages/ComptabiliteSYCEBNLPage'
import { ModuleProvider } from '@/lib/moduleContext'
import { UserProvider } from '@/lib/userContext'
import { NavProvider } from '@/lib/navContext'
import JournalSYCEBNLPage from '@/pages/JournalSYCEBNLPage'
import GrandLivreSYCEBNLPage from '@/pages/GrandLivreSYCEBNLPage'
import BalanceSYCEBNLPage from '@/pages/BalanceSYCEBNLPage'
import BilanSYCEBNLPage from '@/pages/BilanSYCEBNLPage'
import PlanComptableSYCEBNLPage from '@/pages/PlanComptableSYCEBNLPage'
import ChatPage from '@/pages/ChatPage'
import DocumentsPage from '@/pages/DocumentsPage'

import ComingSoonPage from '@/pages/ComingSoonPage'
import ApercuDevoirPage from '@/pages/ApercuDevoirPage'
import FiscalitePage from '@/pages/FiscalitePage'
import ChargesPersonnelIPRPage from '@/pages/ChargesPersonnelIPRPage'
import ImmobilisationsPage from '@/pages/ImmobilisationsPage'
import DocsComptablesHub from '@/pages/DocsComptablesHub'
import EtatsFinanciersHub from '@/pages/EtatsFinanciersHub'
import DictionnairePage from '@/pages/DictionnairePage'
import PrepaOnecPage from '@/pages/PrepaOnecPage'
import DebuggingAdminPage from '@/pages/DebuggingAdminPage'
import GestionStockPage from '@/pages/GestionStockPage'
import StockArticlesPage from '@/pages/StockArticlesPage'
import StockMouvementPage from '@/pages/StockMouvementPage'
import StockFichePage from '@/pages/StockFichePage'
import StockJournalPage from '@/pages/StockJournalPage'
import StockExercicePage from '@/pages/StockExercicePage'
import MesCoursPage from '@/pages/MesCoursPage'
import UE2DroitSocietesPage from '@/pages/UE2DroitSocietesPage'
import UE2Chapitre1Page from '@/pages/UE2Chapitre1Page'
import UE2Chapitre2Page from '@/pages/UE2Chapitre2Page'
import UE2Chapitre3Page from '@/pages/UE2Chapitre3Page'
import UE2Chapitre4Page from '@/pages/UE2Chapitre4Page'
import UE2Chapitre5Page from '@/pages/UE2Chapitre5Page'
import UE2Chapitre6Page from '@/pages/UE2Chapitre6Page'
import UE2Chapitre7Page from '@/pages/UE2Chapitre7Page'
import UE2Chapitre8Page from '@/pages/UE2Chapitre8Page'
import UE2Chapitre9Page from '@/pages/UE2Chapitre9Page'
import UE2Chapitre10Page from '@/pages/UE2Chapitre10Page'
import UE2Chapitre11Page from '@/pages/UE2Chapitre11Page'
import UE5FinancesPubliquesPage from '@/pages/UE5FinancesPubliquesPage'
import UE5Chapitre1Page from '@/pages/UE5Chapitre1Page'
import UE5Chapitre2Page from '@/pages/UE5Chapitre2Page'
import UE5Chapitre3Page from '@/pages/UE5Chapitre3Page'
import UE5Chapitre4Page from '@/pages/UE5Chapitre4Page'
import UE5Chapitre5Page from '@/pages/UE5Chapitre5Page'
import UE5Chapitre6Page from '@/pages/UE5Chapitre6Page'
import UE5Chapitre7Page from '@/pages/UE5Chapitre7Page'
import UE5Chapitre8Page from '@/pages/UE5Chapitre8Page'
import UE5Chapitre9Page from '@/pages/UE5Chapitre9Page'
import UE5Chapitre10Page from '@/pages/UE5Chapitre10Page'
import UE13IFRSPage from '@/pages/UE13IFRSPage'
import UE13Chapitre1Page from '@/pages/UE13Chapitre1Page'
import UE13Chapitre2Page from '@/pages/UE13Chapitre2Page'
import UE13Chapitre3Page from '@/pages/UE13Chapitre3Page'
import GestionEtudiantsPage from '@/pages/GestionEtudiantsPage'
import FicheEtudiantPage from '@/pages/FicheEtudiantPage'
import InscriptionPlatformePage from '@/pages/InscriptionPlatformePage'

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
    // Thème
    const theme = localStorage.getItem('dwac_theme')
    if (theme === 'dark') document.documentElement.classList.add('dark')

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
      <Toaster />
    </Router>
    </NavProvider>
    </UserProvider>
  )
}
