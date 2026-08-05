import React, { useState, useEffect } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  BookOpen, LayoutDashboard, BookMarked, BarChart2, FileText,
  Users, MessageSquare, FolderOpen, LogOut, Moon, Sun,
  Menu, GraduationCap, ClipboardList, ChevronRight, ChevronDown,
  Calculator, Landmark, Wallet, TrendingUp, Home, BookCheck, X, Lock, Bug
} from 'lucide-react'
import GlobalSearch from '@/components/GlobalSearch'
import { NotificationBell } from '@/components/NotificationBell'
import { getCurrentUser, logout, User } from '@/lib/db'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { useAllCours } from '@/lib/useFirestore'
import { useCoursStatuts } from '@/lib/useFirestore'
import { COURS_SYSTEME } from '@/lib/db-firebase'

interface NavItem {
  path: string
  label: string
  icon: React.ReactNode
  roles?: string[]
}

interface NavFolder {
  id: string
  label: string
  icon: React.ReactNode
  items: NavItem[]
  color?: string
  directPath?: string   // si défini, clic = navigation directe (pas d'accordéon)
  directRoles?: string[] // restreindre l'affichage du lien direct
}

// Items hors dossiers (communs à tous)
const topItems: NavItem[] = [
  { path: '/', label: 'Tableau de bord', icon: <LayoutDashboard className="h-4 w-4" /> },
  { path: '/exercices', label: 'Exercices', icon: <GraduationCap className="h-4 w-4" /> },
  { path: '/documents', label: 'Documents', icon: <FolderOpen className="h-4 w-4" /> },

  { path: '/chat', label: 'Messagerie', icon: <MessageSquare className="h-4 w-4" /> },
  { path: '/dictionnaire', label: 'Dictionnaire', icon: <BookMarked className="h-4 w-4" /> },
]

// Items staff uniquement (en dernier avant Modules)
const staffItems: NavItem[] = [
  { path: '/professeurs', label: 'Espace Administration', icon: <Users className="h-4 w-4" />, roles: ['admin', 'professeur', 'assistant'] },
  { path: '/gestion-etudiants', label: 'Gestion des étudiants', icon: <GraduationCap className="h-4 w-4" />, roles: ['admin', 'professeur', 'assistant'] },
  { path: '/prepa-onec', label: 'Prépa ONEC', icon: <BookCheck className="h-4 w-4" />, roles: ['admin', 'professeur', 'assistant'] },
  // Débogage isolation masqué volontairement
]

// Plus utilisé mais conservé pour compatibilité
const middleItems: NavItem[] = []

const bottomItems: NavItem[] = []

// Dossiers accordéon
const navFolders: NavFolder[] = [
  {
    id: 'comptabilite-generale',
    label: 'Comptabilité Générale',
    icon: <Calculator className="h-4 w-4" />,
    directPath: '/comptabilite-generale',
    items: [],
  },
  {
    id: 'fiscalite',
    label: 'Fiscalité',
    icon: <FileText className="h-4 w-4" />,
    items: [],
  },
  {
    id: 'analyse-financiere',
    label: 'Analyse Financière',
    icon: <BarChart2 className="h-4 w-4" />,
    items: [],
  },
]

// Bottom nav items pour mobile (icônes principales)
const mobileBottomNav = [
  { path: '/', label: 'Accueil', icon: <Home className="h-5 w-5" /> },
  { path: '/mes-cours', label: 'Mes cours', icon: <BookOpen className="h-5 w-5" /> },
  { path: '/fiscalite', label: 'Fiscalité', icon: <FileText className="h-5 w-5" /> },
  { path: '/exercices', label: 'Exercices', icon: <GraduationCap className="h-5 w-5" /> },
  { path: '/documents', label: 'Documents', icon: <FolderOpen className="h-5 w-5" /> },
]

// Bottom nav admin (remplace Documents par Espace Admin)
const mobileBottomNavAdmin = [
  { path: '/', label: 'Accueil', icon: <Home className="h-5 w-5" /> },
  { path: '/mes-cours', label: 'Mes cours', icon: <BookOpen className="h-5 w-5" /> },
  { path: '/exercices', label: 'Exercices', icon: <GraduationCap className="h-5 w-5" /> },
  { path: '/chat', label: 'Messages', icon: <MessageSquare className="h-5 w-5" /> },
  { path: '/professeurs', label: 'Admin', icon: <Users className="h-5 w-5" /> },
]

function getRoleBadge(role: string) {
  const map: Record<string, { label: string; variant: 'default' | 'secondary' | 'outline' | 'destructive' }> = {
    admin: { label: 'Admin', variant: 'destructive' },
    professeur: { label: 'Professeur', variant: 'default' },
    assistant: { label: 'Assistant', variant: 'secondary' },
    etudiant: { label: 'Étudiant', variant: 'outline' },
  }
  return map[role] || { label: role, variant: 'outline' as const }
}

interface LayoutProps {
  children: React.ReactNode
  user: User
  onLogout?: () => void
}

// Icône par moduleKey
function getModuleIcon(moduleKey?: string, icon?: string) {
  if (moduleKey === 'comptabilite-generale') return <Calculator className="h-4 w-4" />
  if (moduleKey === 'fiscalite') return <FileText className="h-4 w-4" />
  if (moduleKey === 'analyse-financiere') return <BarChart2 className="h-4 w-4" />
  if (icon === 'BookOpen') return <BookOpen className="h-4 w-4" />
  if (icon === 'GraduationCap') return <GraduationCap className="h-4 w-4" />
  return <BookOpen className="h-4 w-4" />
}

export function Layout({ children, user, onLogout }: LayoutProps) {
  const [location, navigate] = useHashLocation()
  const [isDark, setIsDark] = useState(() => localStorage.getItem('dwac_theme') === 'dark')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Cours dynamiques depuis Firestore
  const { cours: allCours } = useAllCours()
  // Statuts pour étudiant
  const isStudent = user.role === 'etudiant'
  const { statuts: coursStatuts } = useCoursStatuts(isStudent ? user.id : undefined)

  // Détermine quel dossier est actif selon la route courante
  const activeFolderId = navFolders.find(f =>
    f.items.some(i => location === i.path || (i.path !== '/' && location.startsWith(i.path)))
  )?.id ?? null

  // Dossiers ouverts : ouvre automatiquement le dossier actif au démarrage
  const [openFolders, setOpenFolders] = useState<Set<string>>(() => {
    const initial = new Set<string>()
    const active = navFolders.find(f =>
      f.items.some(i => location === i.path || (i.path !== '/' && location.startsWith(i.path)))
    )
    if (active) initial.add(active.id)
    else initial.add('comptabilite-generale') // ouvert par défaut
    return initial
  })

  const toggleFolder = (id: string) => {
    setOpenFolders(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('dwac_theme', 'dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('dwac_theme', 'light')
    }
  }, [isDark])

  // Fermer sidebar quand on change de page
  useEffect(() => {
    setSidebarOpen(false)
  }, [location])

  const handleLogout = () => {
    logout()
    if (onLogout) {
      onLogout()
    } else {
      navigate('/login')
    }
  }

  const visibleBottomItems = bottomItems.filter(item => !item.roles || item.roles.includes(user.role))
  const roleBadge = getRoleBadge(user.role)
  const isAdmin = ['admin', 'professeur', 'assistant'].includes(user.role)
  const bottomNavItems = isAdmin ? mobileBottomNavAdmin : mobileBottomNav

  const NavButton = ({ item }: { item: NavItem }) => {
    const isActive = location === item.path || (item.path !== '/' && location.startsWith(item.path))
    return (
      <button
        key={item.path}
        onClick={() => { navigate(item.path); setSidebarOpen(false) }}
        className={cn(
          "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left",
          isActive
            ? "bg-primary text-primary-foreground font-medium"
            : "text-foreground hover:bg-muted"
        )}
      >
        {item.icon}
        <span>{item.label}</span>
        {isActive && <ChevronRight className="ml-auto h-3 w-3" />}
      </button>
    )
  }

  const SidebarContent = ({ searchBar }: { searchBar?: React.ReactNode }) => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-border">
        <div className="relative w-10 h-10 flex-shrink-0">
          {/* Anneau pulseGlow derrière */}
          <div className="absolute inset-0 rounded-xl bg-primary/20 animate-pulseGlow" />
          {/* Logo flottant */}
          <div className="relative w-10 h-10 rounded-xl bg-secondary flex items-center justify-center overflow-hidden shadow-md animate-float" style={{ animationDuration: '3s' }}>
            <img
              src="./assets/campus-ohada-logo.jpeg"
              alt="CAMPUS OHADA"
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none'
              }}
            />
          </div>
        </div>
        <div className="min-w-0 flex-1">
          <p className="font-bold text-primary text-sm leading-tight">CAMPUS OHADA</p>
          <p className="text-xs text-muted-foreground">SYSCOHADA Révisé</p>
        </div>
        {/* Bouton fermer sidebar sur mobile */}
        <button
          className="md:hidden p-1 rounded hover:bg-muted transition-colors"
          onClick={() => setSidebarOpen(false)}
        >
          <X className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>

      {/* Recherche rapide */}
      {searchBar}

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-2">

        {/* Navigation principale */}
        {topItems.map(item => <NavButton key={item.path} item={item} />)}

        {/* Espace Administration : staff seulement */}
        {staffItems
          .filter(item => !item.roles || item.roles.includes(user.role))
          .map(item => <NavButton key={item.path} item={item} />)
        }

        {/* Messagerie + Documents */}
        {middleItems.map(item => <NavButton key={item.path} item={item} />)}

        {/* Séparateur + label section Modules */}
        <div className="mx-4 mt-3 mb-1">
          <div className="border-t border-border" />
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-0 pt-2 pb-0.5">Modules</p>
        </div>

        {/* Dossiers modules : dynamiques depuis Firestore */}
        {(() => {
          // Construire la liste des modules à afficher
          // 1. Les cours système dans l'ordre défini
          // 2. Les cours manuels créés par les profs
          const systemIds = COURS_SYSTEME.map(c => c.id)
          const systemModuleKeys = COURS_SYSTEME.map(c => c.moduleKey || c.id)
          const systemNoms = COURS_SYSTEME.map(c => c.nom.trim().toLowerCase())

          const coursAAfficher = [
            // 1. Cours système (récupérés depuis Firestore si possible)
            ...COURS_SYSTEME.map(sc => allCours.find(c => c.id === sc.id) || { ...sc, faculteId: '', universiteId: '', dateCreation: '', createdBy: 'system' }),
            // 2. Cours manuels : exclure tout ce qui correspond à un cours système
            // (même id, même coursSystemeId, même moduleKey, ou même nom)
            ...allCours.filter(c => {
              if (systemIds.includes(c.id)) return false
              if ((c as any).coursSystemeId && systemIds.includes((c as any).coursSystemeId)) return false
              if ((c as any).moduleKey && systemModuleKeys.includes((c as any).moduleKey)) return false
              if (systemNoms.includes(c.nom.trim().toLowerCase())) return false
              return true
            })
          ]

          // Routes connues dans l'application
          const ROUTES_CONNUES = [
            'comptabilite-generale', 'fiscalite', 'analyse-financiere',
            'immobilisations', 'stock', 'charges-personnel',
            'docs-comptables-hub', 'etats-financiers-hub',
            'comptabilite-sycebnl', 'dictionnaire', 'documents', 'exercices',
          ]

          // Dans la sidebar : n'afficher que les cours actifs
          const coursVisiblesSidebar = coursAAfficher.filter(c => (c as any).actif !== false)

          return coursVisiblesSidebar.map(cours => {
            const moduleKey = (cours as any).moduleKey || cours.id
            const path = `/${moduleKey}`
            // Cours sans route connue : on l'affiche mais non cliquable (bientôt)
            const routeInconnue = !ROUTES_CONNUES.some(r => moduleKey === r || moduleKey.startsWith(r))
              && !(cours as any).systeme
              && !(cours as any).coursSystemeId
            const isDirectActive = location === path || location.startsWith(path + '/')

            // Statut pour l'étudiant
            const statut = isStudent
              ? (coursStatuts.find(s => s.coursId === cours.id)?.statut || null)
              : null
            // Inscrit au cours ?
            const userCoursIds: string[] = (user as any).coursIds || []
            const inscrit = !isStudent || userCoursIds.includes(cours.id)
            // Verrouillé = étudiant non inscrit à ce cours (qu'il ait d'autres cours ou pas)
            const verrouille = isStudent && !inscrit && (cours as any).actif !== false
            // Bientôt = cours système pas encore actif ET pas verrouillé, OU cours sans route connue
            const bientot = (!(cours as any).actif && !verrouille && (cours as any).systeme) || routeInconnue

            return (
              <div key={cours.id}>
                <button
                  onClick={() => {
                    if (verrouille || bientot) return
                    navigate(path)
                    setSidebarOpen(false)
                  }}
                  className={cn(
                    "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left",
                    isDirectActive && !verrouille
                      ? "bg-primary text-primary-foreground font-medium"
                      : "text-foreground hover:bg-muted",
                    (verrouille || bientot) && "opacity-60 cursor-default"
                  )}
                >
                  <span className="flex items-center justify-center w-5 h-5">
                    {verrouille
                      ? <Lock className="h-4 w-4 text-muted-foreground" />
                      : getModuleIcon((cours as any).moduleKey, (cours as any).icon)
                    }
                  </span>
                  <span className="flex-1 truncate">{cours.nom}</span>
                  {verrouille && <Lock className="ml-auto h-3 w-3 text-muted-foreground/60 shrink-0" />}
                  {bientot && !verrouille && <Badge variant="outline" className="text-xs px-1 py-0 ml-auto shrink-0">Bientôt</Badge>}
                  {isDirectActive && !verrouille && !bientot && <ChevronRight className="ml-auto h-3 w-3 shrink-0" />}
                </button>
              </div>
            )
          })
        })()}

        {/* Anciens dossiers statiques (conservés si items non vides) */}
        {navFolders.filter(f => f.items.length > 0).map(folder => {
          const isOpen = openFolders.has(folder.id)
          const isEmpty = folder.items.length === 0
          const isDirect = !!folder.directPath
          // Masquer si directRoles défini et user n'a pas le rôle
          if (folder.directRoles && !folder.directRoles.includes(user.role)) return null
          // Actif = on est sur le directPath OU sur un sous-item du dossier
          const isDirectActive = isDirect && (location === folder.directPath || location.startsWith(folder.directPath!))
          const subItemActive = folder.items.some(
            i => location === i.path || (i.path !== '/' && location.startsWith(i.path))
          )
          const folderHasActive = isDirectActive || subItemActive

          return (
            <div key={folder.id}>
              {/* Bouton dossier */}
              <button
                onClick={() => {
                  if (isDirect) {
                    // Navigation directe
                    navigate(folder.directPath!)
                    setSidebarOpen(false)
                  } else if (!isEmpty) {
                    toggleFolder(folder.id)
                  }
                }}
                className={cn(
                  "w-full flex items-center gap-3 px-4 py-2.5 text-sm transition-colors text-left",
                  folderHasActive
                    ? "bg-primary text-primary-foreground font-medium"
                    : "text-foreground hover:bg-muted",
                  isEmpty && !isDirect && "opacity-60 cursor-default"
                )}
              >
                <span className="flex items-center justify-center w-5 h-5">
                  {folder.icon}
                </span>
                <span className="flex-1">{folder.label}</span>
                {/* Indicateur */}
                {isDirect
                  ? folderHasActive && <ChevronRight className="ml-auto h-3 w-3" />
                  : isEmpty
                    ? <Badge variant="outline" className="text-xs px-1 py-0 ml-auto">Bientôt</Badge>
                    : isOpen
                      ? <ChevronDown className="ml-auto h-3.5 w-3.5 opacity-70" />
                      : <ChevronRight className="ml-auto h-3.5 w-3.5 opacity-70" />
                }
              </button>

              {/* Sous-items (seulement pour les dossiers NON-directs) */}
              {!isDirect && isOpen && !isEmpty && (
                <div className="ml-3 border-l border-border pl-1 mb-1">
                  {folder.items
                    .filter(item => !item.roles || item.roles.includes(user.role))
                    .map(item => {
                      const isActive = location === item.path || (item.path !== '/' && location.startsWith(item.path))
                      return (
                        <button
                          key={item.path}
                          onClick={() => { navigate(item.path); setSidebarOpen(false) }}
                          className={cn(
                            "w-full flex items-center gap-2.5 px-3 py-2 text-sm transition-colors text-left rounded-r",
                            isActive
                              ? "bg-primary text-primary-foreground font-medium"
                              : "text-foreground hover:bg-muted"
                          )}
                        >
                          {item.icon}
                          <span>{item.label}</span>
                          {isActive && <ChevronRight className="ml-auto h-3 w-3" />}
                        </button>
                      )
                  })}
                </div>
              )}
            </div>
          )
        })}


      </nav>

      {/* User info */}
      <div className="border-t border-border p-3 pb-20 md:pb-3">
        <div className="flex items-center gap-2 mb-2">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary text-primary-foreground text-xs">
              {(user.nom?.[0] || '') + (user.prenom?.[0] || '')}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">
              {isStudent
                ? `Bonjour ${user.nom}`
                : `Bonjour ${user.prenom}`
              }
            </p>
            <Badge variant={roleBadge.variant} className="text-xs py-0 px-1.5">{roleBadge.label}</Badge>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          {isAdmin && <NotificationBell user={user} />}
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsDark(!isDark)} title="Changer de thème">
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={handleLogout} title="Déconnexion">
            <LogOut className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )

  return (
    <div className="flex h-dvh overflow-hidden bg-background" style={{ height: '100dvh' }}>
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 border-r border-border bg-card flex-shrink-0 animate-slideRight" style={{ animationDuration: '0.4s' }}>
        <SidebarContent searchBar={<GlobalSearch user={user} />} />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="absolute inset-0 bg-black/50 animate-fadeIn"
            style={{ animationDuration: '0.2s' }}
            onClick={() => setSidebarOpen(false)}
          />
          <aside
            className="absolute left-0 top-0 h-full w-72 bg-card border-r border-border animate-slideRight shadow-2xl overflow-hidden"
            style={{ animationDuration: '0.25s' }}
          >
            <SidebarContent searchBar={<GlobalSearch user={user} />} />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile header */}
        <header className="md:hidden flex items-center gap-3 px-3 py-2 border-b border-border bg-card/95 backdrop-blur-sm sticky top-0 z-40">
          <Button variant="ghost" size="icon" className="h-9 w-9 shrink-0" onClick={() => setSidebarOpen(true)}>
            <Menu className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2 flex-1 min-w-0">
            <div className="w-7 h-7 rounded-lg bg-primary/10 flex items-center justify-center overflow-hidden shrink-0">
              <img
                src="./assets/campus-ohada-logo.jpeg"
                alt="CAMPUS OHADA"
                className="w-full h-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = 'none'
                }}
              />
            </div>
            <span className="font-bold text-primary text-sm truncate">CAMPUS OHADA</span>
          </div>
          <div className="flex gap-1 shrink-0 items-center">
            {isAdmin && <NotificationBell user={user} />}
            <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => setIsDark(!isDark)}>
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-destructive" onClick={handleLogout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Contenu principal : padding bottom pour laisser place à la bottom nav */}
        <main key={location} className="flex-1 overflow-auto overscroll-contain p-3 md:p-6 pb-24 md:pb-6 animate-fadeIn scroll-smooth" style={{ animationDuration: '0.3s' }}>
          {children}
        </main>

        {/* Mobile Bottom Navigation Bar */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border" style={{ position: 'fixed', bottom: 0, left: 0, right: 0, paddingBottom: 'env(safe-area-inset-bottom, 0px)' }}>
          <div className="flex items-stretch justify-around">
            {bottomNavItems.map((item) => {
              const isActive = location === item.path || (item.path !== '/' && location.startsWith(item.path))
              return (
                <button
                  key={item.label}
                  onClick={() => { navigate(item.path) }}
                  className={cn(
                    "flex flex-col items-center justify-center gap-0.5 flex-1 py-2 px-1 transition-colors min-h-[56px]",
                    isActive
                      ? "text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  <span className={cn(
                    "p-1 rounded-lg transition-colors",
                    isActive && "bg-primary/10"
                  )}>
                    {item.icon}
                  </span>
                  <span className={cn(
                    "text-xs font-medium leading-none",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}>
                    {item.label}
                  </span>
                </button>
              )
            })}
          </div>
        </nav>
      </div>
    </div>
  )
}
