import { useUser } from '@/lib/userContext'
import { isAdminRole, isStaffRole } from '@/lib/permissions'
import { useEquipe, creeParEquipe, invaliderCacheEquipe } from '@/lib/equipe'
import React, { useState, useEffect, useRef } from 'react'
import { useLocation, useSearch } from 'wouter'
import BackButton from '@/components/BackButton'
import PasswordInput from '@/components/PasswordInput'
import GestionEtudiantsPage from '@/pages/GestionEtudiantsPage'
import {
  isDevoirExpire, PROMOTIONS,
  User, UserRole, Universite, Faculte, Cours, Devoir, Soumission, NoteCours, Presence
} from '@/lib/db'
import {
  calculerCote, devoirConcerneEtudiant, estNotee, estACorriger, baremeDevoir, formaterNote, formaterNombre,
  type Cote,
} from '@/lib/cotes'
import { codePromotion, libellePromotion } from '@/lib/promotion'
import {
  createUserAsync, updateUserAsync, deleteUserAsync, onUsersSnapshot, purgerMotsDePasseStockesAsync, synchroniserAnnuaireAsync, definirTitulaireAsync,
  uploadNoteCoursFile,
  saveUniversiteAsync, updateUniversiteAsync, deleteUniversiteAsync,
  createFaculteAsync, updateFaculteAsync, deleteFaculteAsync,
  updateCoursAsync, deleteCoursAsync, provisionCoursManquantsAsync,
  updateDevoirAsync, deleteDevoirAsync,
  corrigerSoumissionAsync, getEcrituresAsync,
  createPresenceAsync, updatePresenceAsync, deletePresenceAsync,
  createNoteCoursAsync, updateNoteCoursAsync, deleteNoteCoursAsync,
  onCoursStatutsParCreateur, COURS_SYSTEME, getCoursTries,
  reparerContenusDeChapitreAsync, reparerInscriptionsFaculteAsync, reparerCodesAccesFaculteAsync, inscriptionsDeLaFaculte,
} from '@/lib/db-firebase'
import type { CoursEtudiantStatut } from '@/lib/db'
import {
  useUniversites, useAllFacultes, useAllCours, useDevoirs, useSoumissions, useAllSoumissions,
  useTentatives, usePresences, useAllNotesCours
} from '@/lib/useFirestore'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import { Textarea } from '@/components/ui/textarea'
import {
  Plus, Pencil, Trash2, Users, Building2, GraduationCap, BarChart2,
  ChevronDown, ChevronRight, X, ShieldCheck, LibraryBig,
  Paperclip, FileDown, FileText, CalendarCheck, Award, CheckCircle2, ClipboardList, TrendingDown, Clock, Download,
  Search
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

// ─── Helpers globaux ────────────────────────────────────

/** Normalise une chaîne pour la comparaison accent-insensitive */
const normalizeStr = (s: string) =>
  s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

/**
 * Résout la liste des IDs de cours d'un utilisateur.
 * Accepte un tableau de chaînes ou undefined/null.
 */
const resolveCoursIds = (user: any): string[] => {
  const ids = (user as any)?.coursIds
  if (!ids) return []
  if (Array.isArray(ids)) return ids.map(String)
  return []
}


// ─── Types ───────────────────────────────────────────────
const ROLE_LABELS: Record<UserRole, string> = {
  admin: 'Administrateur',
  professeur: 'Professeur',
  assistant: 'Assistant',
  etudiant: 'Étudiant',
}

const ROLE_COLORS: Record<UserRole, string> = {
  admin: 'bg-red-100 text-red-800',
  professeur: 'bg-blue-100 text-blue-800',
  assistant: 'bg-purple-100 text-purple-800',
  etudiant: 'bg-green-100 text-green-800',
}

const emptyUserForm = {
  username: '', password: '', nom: '', prenom: '',
  role: 'etudiant' as UserRole,
  actif: true, universiteId: '', faculteId: '', classe: '', telephone: '', coursIds: [] as string[],
  titulaireId: '',  // assistant : professeur titulaire de son équipe pédagogique
}

const emptyUniForm = { nom: '', ville: '', adresse: '', facultes: [] as string[] }

// ─── Tabs ─────────────────────────────────────────────────
// La navigation réellement affichée est construite inline, groupée en 3
// sections (Gestion / Pédagogie / Suivi - voir plus bas dans le rendu) : ce
// type sert ces trois groupes. L'ancien tableau TABS plat (et le visibleTabs
// qui en dérivait) a été retiré : calculé mais jamais rendu, remplacé de fait
// par les groupes ci-dessous sans avoir été supprimé à l'époque.
type Tab = 'etudiants' | 'inscriptions' | 'cours' | 'universites' | 'staff' | 'devoirs' | 'copies' | 'progression' | 'presences' | 'cotes' | 'notes'

// ─── DevoirCard : composant isolé pour respecter les règles des hooks ──────────────
function DevoirCard({ dev, coursList, universites, etudiants, openEditDevoir, setDeleteDevoirId, setCorrectionSoumId, setCorrectionNote, setCorrectionComment, setViewSoumission }: {
  dev: Devoir
  coursList: any[]
  universites: any[]
  etudiants: any[]
  openEditDevoir: (d: Devoir) => void
  setDeleteDevoirId: (id: string) => void
  setCorrectionSoumId: (id: string) => void
  setCorrectionNote: (n: string) => void
  setCorrectionComment: (c: string) => void
  setViewSoumission: (s: any) => void
}) {
  const { soumissions: soums } = useSoumissions(dev.id)
  const cours = coursList.find(c => c.id === dev.coursId)
  const uni = universites.find(u => u.id === dev.universiteId)
  // Destinataires : même règle que la liste de devoirs de l'étudiant (cours,
  // faculté, promotion), sans tenir compte de la visibilité du devoir pour que
  // l'enseignant garde le suivi d'un devoir masqué.
  const inscrits = etudiants.filter(e => devoirConcerneEtudiant({ ...dev, actif: true }, e, coursList))
  const expire = isDevoirExpire(dev)
  const bareme = baremeDevoir(dev)
  return (
    <Card className="border-border">
      <CardContent className="pt-4 pb-4">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-foreground">{dev.titre}</p>
              {expire ? (
                <Badge variant="outline" className="text-xs px-1.5 py-0 border-red-400 text-red-500">Délai expiré</Badge>
              ) : (
                <Badge variant="outline" className="text-xs px-1.5 py-0 border-green-400 text-green-600">Actif</Badge>
              )}
            </div>
            <div className="flex gap-3 mt-1 flex-wrap">
              {cours && <p className="text-xs text-muted-foreground">Cours : {cours.nom}</p>}
              {uni && <p className="text-xs text-muted-foreground">Université : {uni.nom}</p>}
              <p className="text-xs text-muted-foreground">Limite : {new Date(dev.dateLimit).toLocaleDateString('fr-FR')}</p>
            </div>
            {dev.consignes && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{dev.consignes}</p>}
            {(dev as any).pdfNom && (
              <div className="flex items-center gap-1.5 mt-1.5">
                <FileText className="h-3.5 w-3.5 text-red-500" />
                <span className="text-xs text-muted-foreground">{(dev as any).pdfNom}</span>
              </div>
            )}
          </div>
          <div className="flex items-center gap-1.5 shrink-0">
            {((dev as any).pdfUrl || (dev as any).pdfData) && (
              <Button variant="ghost" size="icon" className="h-7 w-7 text-red-500 hover:text-red-600" title="Ouvrir le PDF" aria-label="Ouvrir le PDF du devoir" onClick={() => {
                const a = document.createElement('a')
                a.href = (dev as any).pdfUrl || (dev as any).pdfData
                a.download = (dev as any).pdfNom || 'devoir.pdf'
                a.target = '_blank'
                a.click()
              }}><FileDown className="h-3.5 w-3.5" /></Button>
            )}
            <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditDevoir(dev)} aria-label={`Modifier le devoir ${dev.titre}`}><Pencil className="h-3.5 w-3.5" /></Button>
            <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeleteDevoirId(dev.id)} aria-label={`Supprimer le devoir ${dev.titre}`}><Trash2 className="h-3.5 w-3.5" /></Button>
          </div>
        </div>
        {inscrits.length === 0 ? (
          <p className="text-xs text-muted-foreground italic">Aucun étudiant inscrit à ce cours.</p>
        ) : (
          <div className="border border-border rounded-md overflow-hidden">
            <div className="overflow-x-auto -mx-1">
            <table className="w-full text-sm min-w-[600px]">
              <thead className="bg-muted/40">
                <tr>
                  <th className="text-left px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Étudiant</th>
                  <th className="text-center px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Statut</th>
                  <th className="text-center px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Note</th>
                  <th className="text-center px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Actions</th>
                </tr>
              </thead>
              <tbody>
                {inscrits.map(etu => {
                  const soum = soums.find(s => s.etudiantId === etu.id)
                  return (
                    <tr key={etu.id} className="border-t border-border/50 hover:bg-muted/20">
                      <td className="px-3 py-2">
                        <p className="font-medium text-sm">{[etu.nom, etu.prenom].filter(Boolean).join(' ')}</p>
                        <p className="text-xs text-muted-foreground font-mono">@{etu.username}</p>
                      </td>
                      <td className="px-3 py-2 text-center">
                        {!soum ? (
                          expire
                            ? <Badge variant="outline" className="text-xs border-red-400 text-red-500">Non rendu</Badge>
                            : <Badge variant="outline" className="text-xs border-gray-400 text-gray-500">À faire</Badge>
                        ) : estACorriger(soum) ? (
                          <Badge variant="outline" className="text-xs border-blue-400 text-blue-600">À corriger</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs border-green-400 text-green-600">Noté</Badge>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {soum && estNotee(soum) ? (
                          <span className={cn('font-bold text-sm', soum.note! >= bareme / 2 ? 'text-green-600' : 'text-red-500')}>{formaterNote(soum.note!, bareme)}</span>
                        ) : !soum && expire ? (
                          <span className="font-bold text-sm text-red-500">{formaterNote(0, bareme)}</span>
                        ) : (
                          <span className="text-muted-foreground text-xs">-</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {soum && (
                            <Button variant="outline" size="sm" className="h-6 text-xs px-2" onClick={() => setViewSoumission(soum)}>Voir</Button>
                          )}
                          {soum && estACorriger(soum) && (
                            <Button size="sm" className="h-6 text-xs px-2" onClick={() => { setCorrectionSoumId(soum.id); setCorrectionNote(''); setCorrectionComment(soum.commentaire || '') }}>Corriger</Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// ─── Component ────────────────────────────────────────────
// ─── Utilitaires Export ────────────────────────────────────────────────────────
// ─── Journal soumission (affiché dans la modale de correction) ────────────────
function JournalSoumission({ sessionId, etudiantId }: { sessionId: string; etudiantId: string }) {
  const [ecritures, setEcritures] = React.useState<any[]>([])
  const [loading, setLoading] = React.useState(true)

  React.useEffect(() => {
    setLoading(true)
    getEcrituresAsync(etudiantId, sessionId)
      .then(data => {
        // Trier par date puis ligneGroupe
        const sorted = [...data].sort((a, b) => {
          if (a.date !== b.date) return a.date.localeCompare(b.date)
          return a.ligneGroupe.localeCompare(b.ligneGroupe)
        })
        setEcritures(sorted)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [sessionId, etudiantId])

  const fmt = (n: number) => n === 0 ? '' : n.toLocaleString('fr-FR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })

  if (loading) return (
    <div className="text-xs text-muted-foreground py-3 text-center">Chargement du journal...</div>
  )

  if (ecritures.length === 0) return (
    <div className="bg-muted/30 rounded-md p-3">
      <p className="text-xs font-semibold text-muted-foreground mb-1">Journal comptable soumis</p>
      <p className="text-xs text-muted-foreground italic">Aucune écriture trouvée dans cette session.</p>
    </div>
  )

  // Grouper par ligneGroupe pour affichage
  const groupes = ecritures.reduce((acc, e) => {
    if (!acc[e.ligneGroupe]) acc[e.ligneGroupe] = []
    acc[e.ligneGroupe].push(e)
    return acc
  }, {} as Record<string, any[]>)

  const totalDebit = ecritures.reduce((s, e) => s + (e.debit || 0), 0)
  const totalCredit = ecritures.reduce((s, e) => s + (e.credit || 0), 0)

  return (
    <div>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
        Journal comptable : {ecritures.length} ligne{ecritures.length > 1 ? 's' : ''}
      </p>
      <div className="rounded-md border border-border overflow-hidden">
        <div className="overflow-x-auto max-h-56 overflow-y-auto">
          <table className="w-full text-xs">
            <thead className="bg-muted/50 sticky top-0">
              <tr>
                <th className="px-2 py-1.5 text-left font-medium text-muted-foreground">Date</th>
                <th className="px-2 py-1.5 text-left font-medium text-muted-foreground">Libellé</th>
                <th className="px-2 py-1.5 text-left font-medium text-muted-foreground">Compte</th>
                <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">Débit</th>
                <th className="px-2 py-1.5 text-right font-medium text-muted-foreground">Crédit</th>
              </tr>
            </thead>
            <tbody>
              {(Object.values(groupes) as any[][]).map((lignes, gi) => (
                lignes.map((e, i) => (
                  <tr key={e.id} className={gi % 2 === 0 ? 'bg-background' : 'bg-muted/20'}>
                    <td className="px-2 py-1 text-muted-foreground whitespace-nowrap">
                      {i === 0 ? new Date(e.date).toLocaleDateString('fr-FR') : ''}
                    </td>
                    <td className="px-2 py-1 max-w-[120px] truncate">{i === 0 ? e.libelle : ''}</td>
                    <td className="px-2 py-1 font-mono">{e.numeroCompte}</td>
                    <td className="px-2 py-1 text-right tabular-nums">{fmt(e.debit)}</td>
                    <td className="px-2 py-1 text-right tabular-nums">{fmt(e.credit)}</td>
                  </tr>
                ))
              ))}
            </tbody>
            <tfoot className="bg-muted/50 border-t border-border font-semibold">
              <tr>
                <td colSpan={3} className="px-2 py-1.5 text-right text-xs">TOTAUX</td>
                <td className="px-2 py-1.5 text-right tabular-nums">{fmt(totalDebit)}</td>
                <td className="px-2 py-1.5 text-right tabular-nums">{fmt(totalCredit)}</td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  )
}

function exportToCSV(rows: string[][], filename: string) {
  const bom = '﻿'
  const escape = (s: string) => {
    const str = String(s ?? '')
    if (str.includes(',') || str.includes('"') || str.includes('\r') || str.includes('\n')) {
      return '"' + str.replace(/"/g, '""') + '"'
    }
    return str
  }
  const csv = bom + rows.map(row => row.map(escape).join(',')).join('\r\n')
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function ProfesseurPage() {
  const { toast } = useToast()
  const currentUser = useUser()
  const isAdmin = isAdminRole(currentUser)
  // Équipe pédagogique (titulaire + assistants) : devoirs, présences, statuts et
  // étudiants partagés entre ses membres (voir lib/equipe.ts).
  const equipe = useEquipe()
  const cleEquipe = equipe?.ids.join(',') || ''
  const purgeFaite = React.useRef(false)
  const annuaireSynchronise = React.useRef(false)
  const isStaff = isStaffRole(currentUser)
  const [, navigate] = useLocation()

  // Onglet initial pilotable par l'URL (ex: /professeurs?tab=universites),
  // notamment depuis la recherche globale (GlobalSearch) : sans ça, un
  // résultat "université" ou "devoir" renvoyait toujours sur l'onglet Cours
  // par défaut plutôt que sur l'onglet réellement recherché.
  // Onglet d'ouverture par défaut : « Cours » est réservé à l'administrateur,
  // si bien qu'un professeur ou un assistant arrivait sur une page vide. Chacun
  // ouvre désormais sur ce qui l'attend : les inscriptions pour
  // l'administrateur, les copies à corriger pour l'enseignant.
  const ONGLETS_ADMIN: Tab[] = ['cours', 'universites', 'staff']
  const TABS_VALIDES: Tab[] = ['etudiants', 'inscriptions', 'cours', 'universites', 'staff', 'devoirs', 'copies', 'progression', 'presences', 'cotes', 'notes']
  const urlSearch = useSearch()
  const ongletDemande = (() => {
    const t = new URLSearchParams(urlSearch).get('tab') as Tab | null
    if (!t || !TABS_VALIDES.includes(t)) return null
    return ONGLETS_ADMIN.includes(t) && !isAdminRole(currentUser) ? null : t
  })()
  const ongletParDefaut: Tab = isAdminRole(currentUser) ? 'inscriptions' : 'copies'
  const [tab, setTab] = useState<Tab>(ongletDemande ?? ongletParDefaut)
  // Un lien vers un onglet (tableau de bord, notifications, recherche) doit
  // changer d'onglet même quand l'espace est déjà ouvert.
  useEffect(() => { if (ongletDemande) setTab(ongletDemande) }, [ongletDemande])
  // Filtre par faculté de l'onglet Cours - alimenté par le lien "Gérer →"
  // depuis l'accordéon Universités (voir onglet 'universites'), pour éviter
  // de dupliquer la gestion des cours à deux endroits (accordéon + onglet).
  const [coursFiltreFaculteId, setCoursFiltreFaculteId] = useState<string>('')
  const [users, setUsers] = useState<User[]>([])
  const { universites } = useUniversites()
  const { facultes: facultesList } = useAllFacultes()
  const { cours: coursList } = useAllCours()

  // Affectation automatique des UE : chaque faculté doit avoir un cours pour
  // chaque UE active du catalogue, sans passer par "Nouveau cours" - couvre
  // aussi bien les facultés déjà existantes (rattrapage) qu'une UE activée
  // après coup dans le code. provisionCoursManquantsAsync est idempotent
  // (elle revérifie coursList avant de créer), donc rappelable à chaque
  // chargement ; le ref évite juste de relancer le lot pendant qu'il tourne
  // encore (le temps que les créations remontent via onSnapshot).
  const provisionEnCours = useRef(false)
  useEffect(() => {
    if (!isAdmin || !currentUser?.id) return
    if (facultesList.length === 0) return
    if (provisionEnCours.current) return
    const manque = facultesList.some(fac => {
      const assignes = new Set(
        coursList.filter(c => c.faculteId === fac.id && (c as any).coursSystemeId).map(c => (c as any).coursSystemeId)
      )
      return COURS_SYSTEME.some(cs => cs.actif && !assignes.has(cs.id))
    })
    if (!manque) return
    provisionEnCours.current = true
    ;(async () => {
      for (const fac of facultesList) {
        // adminId repris de l'université (même convention que la création
        // manuelle dans handleSaveCours) - pas l'auteur de l'action, qui
        // peut être n'importe quel admin/professeur ouvrant la page.
        const uniAdminId = universites.find(u => u.id === fac.universiteId)?.adminId || currentUser.id
        await provisionCoursManquantsAsync(fac.id, fac.universiteId, uniAdminId, currentUser.id, coursList)
      }
    })().finally(() => { provisionEnCours.current = false })
  }, [isAdmin, currentUser?.id, facultesList, coursList])

  // ── Formulaire Faculté ──
  const [showFaculteForm, setShowFaculteForm] = useState(false)
  const [editFaculteId, setEditFaculteId] = useState<string | null>(null)
  const [deleteFaculteId, setDeleteFaculteId] = useState<string | null>(null)
  const [faculteForm, setFaculteForm] = useState({ nom: '', description: '', universiteId: '', actif: true })

  // ── Formulaire Cours ──
  const [showCoursForm, setShowCoursForm] = useState(false)
  const [editCoursId, setEditCoursId] = useState<string | null>(null)
  const [deleteCoursId, setDeleteCoursId] = useState<string | null>(null)
  const [coursForm, setCoursForm] = useState({ nom: '', description: '', faculteId: '', universiteId: '', promotion: '', actif: true, coursSystemeId: '' })

  // Modales utilisateurs
  const [showUserForm, setShowUserForm] = useState(false)
  const [editUserId, setEditUserId] = useState<string | null>(null)
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null)
  const [userForm, setUserForm] = useState(emptyUserForm)

  // Modales universités
  const [showUniForm, setShowUniForm] = useState(false)
  // ── Devoirs ──
  const { devoirs: devoirsList } = useDevoirs(equipe?.ids)
  const [deleteDevoirId, setDeleteDevoirId] = useState<string | null>(null)
  // Modification d'un devoir existant, limitée à ce qu'un enseignant change
  // après coup : intitulé, consignes, date limite, visibilité. Les questions,
  // le cours et la promotion viennent du chapitre et ne se retouchent pas ici.
  const [devoirEdite, setDevoirEdite] = useState<{ id: string; titre: string; consignes: string; dateLimit: string; actif: boolean } | null>(null)
  const [devoirEnregistrement, setDevoirEnregistrement] = useState(false)
  // ── Correction ──
  const [correctionSoumId, setCorrectionSoumId] = useState<string | null>(null)
  const [correctionNote, setCorrectionNote] = useState('')
  const [correctionComment, setCorrectionComment] = useState('')
  const [viewSoumission, setViewSoumission] = useState<Soumission | null>(null)
  const [editUniId, setEditUniId] = useState<string | null>(null)
  const [deleteUniId, setDeleteUniId] = useState<string | null>(null)
  const [uniForm, setUniForm] = useState(emptyUniForm)

  // Accordéons universités (onglet Étudiants) : ouverts par défaut

  // Recherche onglet Universités
  const [searchUni, setSearchUni] = useState('')
  // Nettoyage doublons onglet Cours
  const [confirmNettoyage, setConfirmNettoyage] = useState(false)
  const [nettoyageEnCours, setNettoyageEnCours] = useState(false)
  const [coursDoublonsIds, setCoursDoublonsIds] = useState<string[]>([])

  // Accordéon onglet Gestion Universités (tout ouvert par défaut). Les
  // facultés n'ont plus leur propre accordéon de cours imbriqué - la gestion
  // des cours (créer/modifier/supprimer) vit uniquement dans l'onglet Cours,
  // vers lequel un lien "Gérer →" renvoie déjà filtré sur la faculté.
  const [openUnisMgmt, setOpenUnisMgmt] = useState<Set<string>>(new Set(['__all__']))
  const toggleUniMgmt = (id: string) => setOpenUnisMgmt(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
  })

  // Listener temps réel Firebase pour les utilisateurs
  useEffect(() => {
    const unsub = onUsersSnapshot((firebaseUsers) => {
      setUsers(firebaseUsers)
      // Nettoyage des anciens profils qui contiennent encore un mot de passe en
      // clair : fait une fois par l'admin, seul autorisé à modifier les autres profils.
      if (isAdmin && !purgeFaite.current && firebaseUsers.some(u => (u as any).password !== undefined)) {
        purgeFaite.current = true
        purgerMotsDePasseStockesAsync(firebaseUsers).catch(() => { purgeFaite.current = false })
      }
      // Annuaire du personnel (contacts de la messagerie étudiante) : réaligné
      // une fois par visite de l'admin sur cette page.
      if (isAdmin && !annuaireSynchronise.current) {
        annuaireSynchronise.current = true
        synchroniserAnnuaireAsync(firebaseUsers).catch(() => { annuaireSynchronise.current = false })
      }
    })
    return () => unsub()
  }, [isAdmin])

  // Réparations des rattachements aux cours, une fois par visite (voir
  // db-firebase.ts) : devoirs et exercices créés depuis un chapitre avec
  // l'identifiant du module au lieu du cours de la faculté, et codes d'accès
  // pointant vers le cours d'une autre faculté (équipe) ; inscriptions des
  // étudiants dans le cours d'une autre faculté (administrateur).
  const rattachementsRepares = useRef(false)
  useEffect(() => {
    if (rattachementsRepares.current || !isStaff || !equipe?.ids.length || coursList.length === 0) return
    rattachementsRepares.current = true
    reparerContenusDeChapitreAsync(equipe.ids, coursList)
      .then(() => reparerCodesAccesFaculteAsync(equipe.ids, coursList))
      .catch(err => console.warn('Réparation des rattachements de cours :', err))
  }, [isStaff, cleEquipe, coursList.length])
  const inscriptionsReparees = useRef(false)
  useEffect(() => {
    if (inscriptionsReparees.current || !isAdmin || users.length === 0 || coursList.length === 0) return
    inscriptionsReparees.current = true
    reparerInscriptionsFaculteAsync(users, coursList)
      .catch(err => console.warn('Réparation des inscriptions :', err))
  }, [isAdmin, users.length, coursList.length])

  const refresh = () => {
    // Tout se met à jour via les hooks Firestore temps réel - pas besoin de refresh manuel
  }

  // ── Devoirs ──
  const openEditDevoir = (d: Devoir) => {
    setDevoirEdite({ id: d.id, titre: d.titre, consignes: d.consignes || '', dateLimit: d.dateLimit.split('T')[0], actif: d.actif })
  }
  const handleSaveDevoirEdite = async () => {
    if (!devoirEdite || !devoirEdite.titre.trim() || !devoirEdite.dateLimit) return
    setDevoirEnregistrement(true)
    try {
      await updateDevoirAsync(devoirEdite.id, {
        titre: devoirEdite.titre.trim(),
        consignes: devoirEdite.consignes.trim(),
        dateLimit: new Date(devoirEdite.dateLimit + 'T23:59:59').toISOString(),
        actif: devoirEdite.actif,
      })
      setDevoirEdite(null)
      toast({ title: 'Devoir modifié' })
    } catch {
      toast({ title: 'Erreur lors de la modification', variant: 'destructive' })
    } finally {
      setDevoirEnregistrement(false)
    }
  }
  // ── Cours Statuts ──
  const [, setCoursStatuts] = useState<CoursEtudiantStatut[]>([])
  useEffect(() => {
    if (!currentUser?.id) return
    const unsub = onCoursStatutsParCreateur(equipe?.ids || currentUser.id, setCoursStatuts)
    return () => unsub()
  }, [currentUser?.id, cleEquipe])

  // ── Toggle actif/suspendu ──
  const toggleActifUser = (userId: string, currentActif: boolean) => {
    updateUserAsync(userId, { actif: !currentActif }).then(() => {
      toast({ title: !currentActif ? 'Compte activé' : 'Compte suspendu', variant: !currentActif ? 'default' : 'destructive' })
    }).catch(() => toast({ title: 'Erreur lors de la mise à jour', variant: 'destructive' }))
  }

  // ── Validation / refus d'une inscription par code d'accès ──
  const validerInscription = (userId: string, nomComplet: string) => {
    updateUserAsync(userId, { actif: true, statutInscription: 'valide' } as any).then(() => {
      toast({ title: 'Inscription validée', description: `${nomComplet} peut désormais se connecter.` })
    }).catch(() => toast({ title: 'Erreur lors de la validation', variant: 'destructive' }))
  }

  const refuserInscription = (userId: string, nomComplet: string) => {
    updateUserAsync(userId, { actif: false, statutInscription: 'refuse' } as any).then(() => {
      toast({ title: 'Inscription refusée', description: `${nomComplet} ne pourra pas se connecter.`, variant: 'destructive' })
    }).catch(() => toast({ title: 'Erreur lors du refus', variant: 'destructive' }))
  }

  const handleDeleteDevoir = () => {
    if (!deleteDevoirId) return
    deleteDevoirAsync(deleteDevoirId).then(() => {
      setDeleteDevoirId(null)
      toast({ title: 'Devoir supprimé', variant: 'destructive' })
    }).catch(() => toast({ title: 'Erreur lors de la suppression', variant: 'destructive' }))
  }
  // Copie en cours de correction et barème de son devoir : sur 20 pour un
  // devoir créé depuis un chapitre, sur 10 pour un devoir classique (voir
  // lib/cotes.ts). Pour un devoir « QCM + cas pratiques » dont l'évaluation
  // automatique des cas a échoué, la partie QCM est déjà calculée (sur 10) :
  // l'enseignant ne note que les cas pratiques, sur 10.
  const correctionContexte = () => {
    const soum = allSoumissions.find(s => s.id === correctionSoumId) as Soumission | undefined
    const dev = soum ? devoirsList.find(d => d.id === soum.devoirId) : undefined
    const bareme = baremeDevoir(dev)
    const partieQCM = dev?.type === 'qcm_cas' && typeof soum?.scoreQCMCas === 'number' ? soum.scoreQCMCas : null
    return { soum, dev, bareme, partieQCM, saisieMax: partieQCM !== null ? bareme - 10 : bareme }
  }
  const handleCorrigerSoumission = () => {
    if (!correctionSoumId) return
    const { partieQCM, saisieMax } = correctionContexte()
    const saisie = parseFloat(correctionNote.replace(',', '.'))
    if (isNaN(saisie) || saisie < 0 || saisie > saisieMax) {
      toast({ title: `Note invalide (0 à ${saisieMax})`, variant: 'destructive' }); return
    }
    const note = partieQCM !== null ? Math.round((partieQCM + saisie) * 100) / 100 : saisie
    corrigerSoumissionAsync(correctionSoumId, note, correctionComment.trim()).then(() => {
      setCorrectionSoumId(null); setCorrectionNote(''); setCorrectionComment('')
      toast({ title: 'Correction enregistrée' })
    }).catch(() => toast({ title: 'Erreur lors de la correction', variant: 'destructive' }))
  }

  // ── Utilisateurs ──
  const openCreateUser = (defaultRole: UserRole = 'etudiant') => {
    setEditUserId(null)
    setUserForm({ ...emptyUserForm, role: defaultRole })
    setShowUserForm(true)
  }

  const openEditUser = (u: User) => {
    setEditUserId(u.id)
    setUserForm({
      username: u.username, password: '', nom: u.nom, prenom: u.prenom || '',
      role: u.role, actif: u.actif,
      universiteId: (u as any).universiteId || '',
      faculteId: (u as any).faculteId || '',
      // Ancienne saisie libre (« L1 Comptabilité ») ramenée à son code à
      // l'ouverture : l'enregistrement suivant la corrige.
      classe: codePromotion((u as any).classe) || (u as any).classe || '',
      telephone: (u as any).telephone || '',
      coursIds: (u as any).coursIds || [],
      titulaireId: (u as any).titulaireId || '',
    })
    setShowUserForm(true)
  }

  const handleSaveUser = () => {
    // Mot de passe exigé seulement à la création (voir le formulaire).
    if (!userForm.username.trim() || !userForm.nom.trim() || (!editUserId && !userForm.password.trim())) return
    const existing = users.find(u => u.username === userForm.username.trim().toLowerCase() && u.id !== editUserId)
    if (existing) { toast({ title: "Ce nom d'utilisateur est déjà pris.=", variant: 'destructive' }); return }

    const data = {
      ...userForm,
      username: userForm.username.trim(),
      nom: userForm.nom.trim(),
      prenom: userForm.prenom.trim(),
      universiteId: userForm.universiteId || undefined,
      faculteId: (userForm as any).faculteId || undefined,
      classe: userForm.classe.trim() || undefined,
      telephone: userForm.telephone.trim() || undefined,
      coursIds: (userForm as any).coursIds?.length > 0 ? (userForm as any).coursIds : undefined,
      // Rattachement à un titulaire : seulement pour un assistant. En
      // modification, il est posé à part (definirTitulaireAsync), pour pouvoir
      // aussi le retirer.
      titulaireId: !editUserId && userForm.role === 'assistant' && userForm.titulaireId ? userForm.titulaireId : undefined,
    }
    const titulaireVoulu = userForm.role === 'assistant' && userForm.titulaireId ? userForm.titulaireId : null
    if (editUserId) {
      const ancienTitulaire = (users.find(u => u.id === editUserId) as any)?.titulaireId || null
      const { titulaireId: _t, ...sansTitulaire } = data
      updateUserAsync(editUserId, sansTitulaire)
        .then(() => ancienTitulaire !== titulaireVoulu ? definirTitulaireAsync(editUserId, titulaireVoulu) : undefined)
        .then(() => {
        invaliderCacheEquipe()
        refresh(); setShowUserForm(false)
        toast({ title: 'Utilisateur modifié' })
      }).catch(() => toast({ title: 'Erreur lors de la modification', variant: 'destructive' }))
    } else {
      createUserAsync({ ...data, createdBy: currentUser?.id || '' } as any).then(() => {
        invaliderCacheEquipe()
        refresh(); setShowUserForm(false)
        toast({ title: 'Utilisateur créé' })
      }).catch((err: any) => {
        const msg = err?.message || err?.code || ''
        toast({ title: msg.includes('déjà') || msg.includes('already-in-use') ? 'Cet identifiant est déjà utilisé.' : 'Erreur lors de la création.', variant: 'destructive' })
      })
    }
  }

  const isProtectedAdmin = (u: User) => u.username === 'manasse.tandu'

  const handleDeleteUser = () => {
    if (!deleteUserId) return
    const target = users.find(u => u.id === deleteUserId)
    if (target && isProtectedAdmin(target)) {
      toast({ title: 'Impossible de supprimer le compte administrateur principal.', variant: 'destructive' })
      setDeleteUserId(null); return
    }
    deleteUserAsync(deleteUserId).then(() => {
      refresh(); setDeleteUserId(null)
      toast({ title: 'Utilisateur supprimé', variant: 'destructive' })
    }).catch(() => toast({ title: 'Erreur lors de la suppression', variant: 'destructive' }))
  }


  // ── Universités ──
  const openCreateUni = () => {
    setEditUniId(null); setUniForm(emptyUniForm); setShowUniForm(true)
  }
  const openEditUni = (u: Universite) => {
    setEditUniId(u.id)
    setUniForm({ nom: u.nom, ville: u.ville || '', adresse: u.adresse || '', facultes: [] })
    setShowUniForm(true)
  }
  const handleSaveUni = async () => {
    if (!uniForm.nom.trim()) return
    const data = { nom: uniForm.nom.trim(), ville: uniForm.ville.trim(), adresse: uniForm.adresse.trim(), adminId: currentUser?.id || '' }
    if (editUniId) {
      await updateUniversiteAsync(editUniId, data)
    } else {
      const newUni = await saveUniversiteAsync(data)
      // Créer les facultés saisies
      const facultesNoms = (uniForm as any).facultes as string[]
      for (const nom of facultesNoms.filter(n => n.trim())) {
        await createFaculteAsync({ nom: nom.trim(), description: '', universiteId: newUni.id, actif: true })
      }
    }
    setShowUniForm(false)
    toast({ title: editUniId ? 'Université modifiée' : 'Université créée' })
  }
  const handleDeleteUni = () => {
    if (!deleteUniId) return
    deleteUniversiteAsync(deleteUniId).then(() => {
      setDeleteUniId(null)
      toast({ title: 'Université supprimée', variant: 'destructive' })
    }).catch(() => toast({ title: 'Erreur lors de la suppression', variant: 'destructive' }))
  }

  // ── Facultés ──
  const openCreateFaculte = (universiteId: string) => {
    setEditFaculteId(null)
    setFaculteForm({ nom: '', description: '', universiteId, actif: true })
    setShowFaculteForm(true)
  }
  const openEditFaculte = (f: Faculte) => {
    setEditFaculteId(f.id)
    setFaculteForm({ nom: f.nom, description: f.description || '', universiteId: f.universiteId, actif: f.actif })
    setShowFaculteForm(true)
  }
  const handleSaveFaculte = async () => {
    if (!faculteForm.nom.trim()) return
    if (editFaculteId) {
      await updateFaculteAsync(editFaculteId, { nom: faculteForm.nom.trim(), description: faculteForm.description.trim(), actif: faculteForm.actif })
    } else {
      await createFaculteAsync({ nom: faculteForm.nom.trim(), description: faculteForm.description.trim(), universiteId: faculteForm.universiteId, actif: faculteForm.actif })
    }
    setShowFaculteForm(false)
    toast({ title: editFaculteId ? 'Faculté modifiée' : 'Faculté créée' })
  }
  const handleDeleteFaculte = async () => {
    if (!deleteFaculteId) return
    // Supprimer aussi les cours liés
    const coursLies = coursList.filter(c => c.faculteId === deleteFaculteId)
    for (const c of coursLies) { await deleteCoursAsync(c.id) }
    await deleteFaculteAsync(deleteFaculteId)
    setDeleteFaculteId(null)
    toast({ title: 'Faculté supprimée', variant: 'destructive' })
  }

  // ── Cours ──
  // Plus de création manuelle : chaque UE active est affectée automatiquement
  // à toute faculté (voir l'effet de provisionnement plus haut). Il ne reste
  // que l'édition (nom/description/actif/promotion) et la suppression.
  const openEditCours = (c: Cours) => {
    setEditCoursId(c.id)
    setCoursForm({ nom: c.nom, description: c.description || '', faculteId: c.faculteId, universiteId: c.universiteId, promotion: c.promotion || '', actif: c.actif, coursSystemeId: (c as any).coursSystemeId || '' })
    setShowCoursForm(true)
  }
  const handleSaveCours = async () => {
    if (!coursForm.nom.trim() || !editCoursId) return
    await updateCoursAsync(editCoursId, { nom: coursForm.nom.trim(), description: coursForm.description.trim(), actif: coursForm.actif, promotion: coursForm.promotion || undefined })
    setShowCoursForm(false)
    toast({ title: 'Cours modifié' })
  }
  const handleDeleteCours = () => {
    if (!deleteCoursId) return
    // Protection : cours système non supprimables
    const coursACible = coursList.find(c => c.id === deleteCoursId)
    if ((coursACible as any)?.systeme) {
      toast({ title: 'Ce cours ne peut pas être supprimé', description: 'Les cours par défaut sont protégés.', variant: 'destructive' })
      setDeleteCoursId(null)
      return
    }
    deleteCoursAsync(deleteCoursId).then(() => {
      setDeleteCoursId(null)
      toast({ title: 'Cours supprimé', variant: 'destructive' })
    }).catch(() => toast({ title: 'Erreur lors de la suppression', variant: 'destructive' }))
  }
  const handleNettoyerDoublons = async () => {
    setNettoyageEnCours(true)
    try {
      for (const id of coursDoublonsIds) { await deleteCoursAsync(id) }
      toast({ title: `${coursDoublonsIds.length} doublon${coursDoublonsIds.length > 1 ? 's' : ''} supprimé${coursDoublonsIds.length > 1 ? 's' : ''}.` })
    } catch { toast({ title: 'Erreur lors de la suppression.', variant: 'destructive' }) }
    setNettoyageEnCours(false)
    setConfirmNettoyage(false)
    setCoursDoublonsIds([])
  }
  // Toggle cours dans une liste d'IDs
  const toggleCoursInList = (id: string, list: string[], setList: (l: string[]) => void) => {
    setList(list.includes(id) ? list.filter(x => x !== id) : [...list, id])
  }



  // ── Données filtrées ──
  // Chaque administrateur/prof voit UNIQUEMENT ses propres étudiants
  const isMainAdmin = currentUser?.username === 'manasse.tandu'
  const etudiants = users.filter(u => {
    if (u.role !== 'etudiant') return false
    const cb = (u as any).createdBy
    // Étudiant sans createdBy : visible uniquement pour l'admin principal
    if (!cb) return isMainAdmin
    return cb === currentUser?.id || cb === currentUser?.username || creeParEquipe(cb, equipe)
  }).sort((a, b) => {
    const nomA = normalizeStr(`${a.nom} ${a.prenom || ''}`.trim())
    const nomB = normalizeStr(`${b.nom} ${b.prenom || ''}`.trim())
    return nomA.localeCompare(nomB, 'fr')
  })
  const staff = users.filter(u => ['professeur', 'assistant'].includes(u.role))
  const admins = users.filter(u => u.role === 'admin')

  // Étudiants ayant rejoint par code d'accès et attendant un accord. Ils sont
  // créés par LoginPage avec actif:false + statutInscription:'en_attente' ;
  // c'est `actif` qui bloque réellement la connexion (voir loginAsync), le
  // statut ne sert qu'à choisir le message affiché. Jusqu'ici aucun écran ne
  // les listait - ni ici (la liste existait mais n'était pas rendue), ni dans
  // Gestion des étudiants (qui lit la collection `etudiants`, pas `users`) :
  // ils restaient donc bloqués dehors indéfiniment.
  const inscriptionsEnAttente = etudiants.filter(e => (e as any).statutInscription === 'en_attente')

  // ── Progression ──
  const { tentatives } = useTentatives(undefined)
  const [progFiltres, setProgFiltres] = useState({ uniId: '', facId: '', coursId: '', classe: '' })
  const [presenceFiltres, setPresenceFiltres] = useState({ uniId: '', facId: '', coursId: '', classe: '' })
  const [coteFiltres, setCoteFiltres] = useState({ uniId: '', facId: '', coursId: '', classe: '' })

  // ── Notes de cours ──
  const { notes: allNotes } = useAllNotesCours()
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [editNoteId, setEditNoteId] = useState<string | null>(null)
  const [deleteNoteId, setDeleteNoteId] = useState<string | null>(null)
  const [noteForm, setNoteForm] = useState({ titre: '', contenu: '', pdfUrl: '', coursId: '', actif: true })
  const [notePdfFile, setNotePdfFile] = useState<File | null>(null)
  const [notePdfUploading, setNotePdfUploading] = useState(false)

  const openCreateNote = () => {
    setEditNoteId(null)
    setNoteForm({ titre: '', contenu: '', pdfUrl: '', coursId: '', actif: true })
    setNotePdfFile(null)
    setShowNoteForm(true)
  }
  const openEditNote = (n: NoteCours) => {
    setEditNoteId(n.id)
    setNoteForm({ titre: n.titre, contenu: n.contenu || '', pdfUrl: n.pdfUrl || '', coursId: n.coursId, actif: n.actif })
    setNotePdfFile(null)
    setShowNoteForm(true)
  }
  const handleSaveNote = async () => {
    if (!noteForm.titre.trim() || !noteForm.coursId) return
    const cours = coursList.find(c => c.id === noteForm.coursId)
    let pdfUrl = noteForm.pdfUrl.trim() || undefined
    if (notePdfFile) {
      try {
        setNotePdfUploading(true)
        const noteId = editNoteId || `note_${Date.now()}`
        pdfUrl = await uploadNoteCoursFile(currentUser?.id || noteId, notePdfFile)
      } catch (e) {
        toast({ title: 'Erreur upload PDF', variant: 'destructive' })
        setNotePdfUploading(false)
        return
      } finally {
        setNotePdfUploading(false)
      }
    }
    const data = {
      titre: noteForm.titre.trim(),
      contenu: noteForm.contenu.trim() || undefined,
      pdfUrl,
      coursId: noteForm.coursId,
      promotionId: cours?.promotion || '',
      faculteId: cours?.faculteId,
      universiteId: cours?.universiteId,
      createdBy: currentUser?.id || '',
      actif: noteForm.actif,
    }
    try {
      if (editNoteId) {
        await updateNoteCoursAsync(editNoteId, data)
        toast({ title: 'Note modifiée' })
      } else {
        await createNoteCoursAsync(data)
        toast({ title: 'Note créée' })
      }
      setShowNoteForm(false)
    } catch { toast({ title: 'Erreur', variant: 'destructive' }) }
  }
  const handleDeleteNote = async () => {
    if (!deleteNoteId) return
    await deleteNoteCoursAsync(deleteNoteId).catch(() => {})
    setDeleteNoteId(null)
    toast({ title: 'Note supprimée' })
  }
  const progressionData = etudiants.map(et => {
    const tents = tentatives.filter(t => t.userId === et.id)
    const scores = tents.map(t => t.score)
    const moyenne = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : null
    return { etudiant: et, tentatives: tents.length, moyenne }
  })

  // ── Présences ──
  // Toutes les séances de l'équipe. La requête était aussi filtrée sur la
  // faculté du profil de l'enseignant : une séance rattachée au cours d'une
  // autre faculté disparaissait de l'écran dès son enregistrement.
  const { presences } = usePresences(equipe?.ids)
  const [showPresenceForm, setShowPresenceForm] = useState(false)
  const [presenceTitre, setPresenceTitre] = useState('')
  const [presenceDate, setPresenceDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [presenceCoursId, setPresenceCoursId] = useState('') // cours de la séance
  const [presenceCoches, setPresenceCoches] = useState<Record<string, boolean>>({}) // etudiantId -> present
  const [editPresenceId, setEditPresenceId] = useState<string | null>(null)
  const [deletePresenceId, setDeletePresenceId] = useState<string | null>(null)

  // Cours de l'équipe : ceux auxquels ses étudiants sont inscrits. Chaque
  // faculté a son propre document pour une même UE : c'est ce document exact
  // qui sert (getCoursTries), avec la faculté dans le libellé. La liste
  // dédupliquée par UE utilisée jusqu'ici retenait le cours d'une faculté au
  // hasard, et la séance se rattachait parfois à la mauvaise.
  const idsCoursEtudiants = new Set(etudiants.flatMap(e => resolveCoursIds(e)))
  const coursEquipe: Cours[] = getCoursTries(coursList.filter(c => idsCoursEtudiants.has(c.id)))
  const libelleCours = (c: Cours) =>
    [c.nom, facultesList.find(f => f.id === c.faculteId)?.nom, c.promotion].filter(Boolean).join(' · ')
  const coursDuFiltre = (uniId: string, facId: string) =>
    coursEquipe.filter(c => (!uniId || c.universiteId === uniId) && (!facId || c.faculteId === facId))

  // Feuille de présence : les étudiants inscrits au cours de la séance, et eux
  // seuls. Elle listait jusqu'ici tous les étudiants de l'enseignant, quel que
  // soit leur cours : chacun recevait une présence pour des séances d'un cours
  // qu'il ne suit pas, et sa cote en était faussée.
  // En modification, la feuille reste celle d'origine (sans les étudiants qui
  // ne sont plus inscrits au cours, dont la ligne est conservée telle quelle).
  const seanceEditee: Presence | null = editPresenceId ? presences.find(p => p.id === editPresenceId) || null : null
  const feuilleOrigine = !!seanceEditee && (seanceEditee.coursId || '') === presenceCoursId
  const etudiantsFeuille: User[] = feuilleOrigine
    ? (seanceEditee!.etudiants || [])
        .map(x => users.find(u => u.id === x.etudiantId))
        .filter((u): u is User => !!u && (!presenceCoursId || resolveCoursIds(u).includes(presenceCoursId)))
    : presenceCoursId ? etudiants.filter(e => resolveCoursIds(e).includes(presenceCoursId)) : []
  // Présent par défaut à la création : l'enseignant signale les absents.
  const estCochePresent = (id: string) => presenceCoches[id] ?? true

  const openCreatePresence = () => {
    setEditPresenceId(null)
    setPresenceTitre('')
    setPresenceDate(new Date().toISOString().slice(0, 10))
    setPresenceCoursId(coursEquipe.length === 1 ? coursEquipe[0].id : '')
    setPresenceCoches({})
    setShowPresenceForm(true)
  }

  const openEditPresence = (p: Presence) => {
    setEditPresenceId(p.id)
    setPresenceTitre(p.titre)
    setPresenceDate(p.date.slice(0, 10))
    setPresenceCoursId(p.coursId || '')
    const coches: Record<string, boolean> = {}
    ;(p.etudiants || []).forEach(x => { coches[x.etudiantId] = !!x.present })
    setPresenceCoches(coches)
    setShowPresenceForm(true)
  }

  // Changer de cours change la feuille : les coches repartent de zéro, sauf
  // retour au cours d'origine d'une séance modifiée.
  const changerCoursSeance = (coursId: string) => {
    setPresenceCoursId(coursId)
    if (seanceEditee && (seanceEditee.coursId || '') === coursId) {
      const coches: Record<string, boolean> = {}
      ;(seanceEditee.etudiants || []).forEach(x => { coches[x.etudiantId] = !!x.present })
      setPresenceCoches(coches)
    } else {
      setPresenceCoches({})
    }
  }

  const handleSavePresence = async () => {
    if (!presenceTitre.trim()) { toast({ title: 'Donnez un titre à la séance', variant: 'destructive' }); return }
    // Une séance appartient à un cours ; seule une séance antérieure à cette
    // règle peut rester sans cours.
    if (!presenceCoursId && !(seanceEditee && !seanceEditee.coursId)) {
      toast({ title: 'Choisissez le cours de la séance', variant: 'destructive' }); return
    }
    if (etudiantsFeuille.length === 0) {
      toast({ title: 'Aucun étudiant sur la feuille', description: 'Inscrivez d\'abord des étudiants à ce cours.', variant: 'destructive' }); return
    }
    const marques = etudiantsFeuille.map(e => ({ etudiantId: e.id, present: estCochePresent(e.id) }))
    const conservees = feuilleOrigine
      ? (seanceEditee!.etudiants || []).filter(x => !marques.some(m => m.etudiantId === x.etudiantId))
      : []
    const etudiantsData = [...marques, ...conservees]
    const coursLie = presenceCoursId ? coursList.find(c => c.id === presenceCoursId) : null
    const presenceFaculteId = coursLie?.faculteId || (currentUser as any)?.faculteId || undefined
    const presenceUniversiteId = coursLie?.universiteId || (currentUser as any)?.universiteId || undefined
    try {
      if (editPresenceId) {
        await updatePresenceAsync(editPresenceId, {
          titre: presenceTitre.trim(), date: presenceDate, etudiants: etudiantsData,
          coursId: presenceCoursId || undefined,
          faculteId: presenceFaculteId,
          universiteId: presenceUniversiteId,
        })
        toast({ title: 'Séance modifiée' })
      } else {
        await createPresenceAsync({
          titre: presenceTitre.trim(), date: presenceDate,
          createdBy: currentUser?.id || '',
          etudiants: etudiantsData,
          coursId: presenceCoursId,
          faculteId: presenceFaculteId,
          universiteId: presenceUniversiteId,
        })
        toast({ title: 'Séance enregistrée' })
      }
      setShowPresenceForm(false)
    } catch {
      toast({ title: 'Erreur lors de l\'enregistrement de la séance', variant: 'destructive' })
    }
  }

  const handleDeletePresence = async () => {
    if (!deletePresenceId) return
    try {
      await deletePresenceAsync(deletePresenceId)
      toast({ title: 'Séance supprimée', variant: 'destructive' })
    } catch {
      toast({ title: 'Erreur lors de la suppression', variant: 'destructive' })
    }
    setDeletePresenceId(null)
  }

  // ── Toutes les soumissions (pour calcul cote devoirs) ──
  const { soumissions: allSoumissions } = useAllSoumissions()

  // Copies rendues attendant une note. La création de devoirs classiques a été
  // volontairement retirée (bloc « ONGLET DEVOIRS », désactivé en dur avec le
  // commentaire « devoirs depuis chapitres »), mais le retrait est resté
  // incomplet : côté étudiant les devoirs déjà existants restent visibles et
  // soumissibles, et leurs copies s'accumulaient sans qu'aucun écran ne
  // permette de les corriger - le bouton « Corriger » vivait lui aussi dans le
  // bloc désactivé. Cet onglet rend la correction accessible, sans rouvrir la
  // création, qui elle reste abandonnée.
  const copiesACorriger = allSoumissions.filter(
    s => estACorriger(s) && devoirsList.some(d => d.id === s.devoirId)
  )

  // ── Cotes (calcul) ──
  // Un seul calcul, celui de lib/cotes.ts, partagé avec le tableau de bord de
  // l'étudiant et son bulletin : les deux affichent la même cote.
  // Lignes : les étudiants de l'équipe, et ceux qui figurent sur une de ses
  // séances (créés par un autre compte mais présents à ses cours).
  const etudiantsPresences: User[] = (() => {
    const idsInPresences = new Set<string>()
    presences.forEach(p => p.etudiants?.forEach(e => idsInPresences.add(e.etudiantId)))
    const merged = [...etudiants]
    users.forEach(u => {
      if (u.role === 'etudiant' && idsInPresences.has(u.id) && !merged.some(m => m.id === u.id)) merged.push(u)
    })
    return merged
  })()

  // Séances triées par date croissante (colonnes du tableau des présences)
  const seancesSorted = [...presences].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())

  const maintenant = new Date()
  // Cote d'un étudiant sur les séances et devoirs de l'équipe, pour un cours
  // précis ou tous cours confondus.
  const coteDe = (et: User, coursId?: string, seances: Presence[] = presences): Cote => calculerCote({
    etudiant: et, seances, devoirs: devoirsList, soumissions: allSoumissions as Soumission[],
    coursList, maintenant, coursId: coursId || undefined,
  })

  // Filtres de groupe communs aux onglets Progression, Présences et Cotes.
  type FiltresGroupe = { uniId: string; facId: string; coursId: string; classe: string }
  const passeFiltresGroupe = (et: User, f: FiltresGroupe) =>
    (!f.uniId || (et as any).universiteId === f.uniId) &&
    (!f.facId || (et as any).faculteId === f.facId) &&
    (!f.coursId || resolveCoursIds(et).includes(f.coursId)) &&
    (!f.classe || libellePromotion((et as any).classe) === f.classe)
  // Promotions présentes parmi les étudiants, variantes regroupées (« L1 » et
  // « L1 Comptabilité » forment un seul groupe).
  const promotionsDispo = [...new Set(etudiants.map(e => libellePromotion((e as any).classe)).filter(Boolean))].sort()
  // Nom affiché d'un étudiant : Nom puis Post-nom (champs nom et prenom).
  const nomEtudiant = (u: User | undefined) => u ? [u.nom, u.prenom].filter(Boolean).join(' ') : 'Étudiant inconnu'

  // Garde de rôle (point 7 de l'audit) : /professeurs n'était protégée que par
  // l'authentification (voir le wrapper W dans App.tsx), pas par le rôle - un
  // étudiant qui naviguait directement vers l'URL montait tout le composant de
  // gestion (données réelles filtrées côté Firestore, mais structure/libellés de
  // gestion exposés). Même garde que GestionEtudiantsPage/FicheEtudiantPage/
  // InscriptionPlatformePage, placée après tous les hooks (règle des hooks React).
  if (!isStaff) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-muted-foreground">Accès non autorisé.</p>
      </div>
    )
  }

  return (
    <div className="space-y-5 animate-fadeIn">

      {/* ── Bouton retour ── */}
      <BackButton />

      {/* ── Header Banner Animé ── */}
      <div className="animate-slideDown" style={{ animationDelay: '0ms' }}>
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 px-4 sm:px-6 py-4 sm:py-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 animate-pulseGlow" />
          <div className="pointer-events-none absolute -right-2 bottom-0 h-14 w-14 rounded-full bg-primary/6 animate-float" />
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 border border-primary/20 shadow-sm transition-all duration-300 hover:scale-110 hover:rotate-6">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground tracking-tight">Espace pédagogique</h1>
              <p className="text-xs text-muted-foreground mt-0.5">{isAdmin
                ? 'Étudiants, devoirs et suivi pédagogique, ainsi que la structure de la plateforme : universités, cours, enseignants'
                : 'Vos étudiants, vos devoirs et leur suivi : copies à corriger, progression, présences, cotes'}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs groupés en 3 sections */}
      <div className="animate-slideDown space-y-3" style={{ animationDelay: '80ms' }}>

        {/* Groupe 1 : Gestion */}
        <div className="space-y-1">
          <div className="px-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Gestion</p>
            <p className="text-[11px] text-muted-foreground/70">{isAdmin ? 'Comptes étudiants, inscriptions à valider, structure académique' : 'Comptes étudiants, inscriptions à valider'}</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            <button
              onClick={() => setTab('etudiants')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                tab === 'etudiants' ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              )}>
              <Users className="h-3.5 w-3.5" /> Étudiants
            </button>
            <button
              onClick={() => setTab('inscriptions')}
              className={cn(
                "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                tab === 'inscriptions' ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
              )}>
              <Clock className="h-3.5 w-3.5" /> Inscriptions
              {inscriptionsEnAttente.length > 0 && (
                <span className="ml-0.5 rounded-full bg-amber-500 text-white text-[10px] font-bold px-1.5 py-px tabular-nums">
                  {inscriptionsEnAttente.length}
                </span>
              )}
            </button>
            {(isAdmin ? [
              { id: 'universites' as Tab, label: 'Universités', icon: <Building2 className="h-3.5 w-3.5" /> },
              { id: 'cours' as Tab,       label: 'Cours', icon: <LibraryBig className="h-3.5 w-3.5" /> },
              { id: 'staff' as Tab,       label: 'Prof / Assistants', icon: <GraduationCap className="h-3.5 w-3.5" /> },
            ] : []).map(t => (
              <button key={t.id} onClick={() => setTab(t.id)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  tab === t.id ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                )}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Groupe 2 : Pédagogie */}
        <div className="space-y-1">
          <div className="px-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Pédagogie</p>
            <p className="text-[11px] text-muted-foreground/70">Devoirs donnés depuis les chapitres, copies à corriger, supports de cours partagés</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {([
              { id: 'devoirs',   label: 'Mes devoirs', icon: <CalendarCheck className="h-3.5 w-3.5" /> },
              { id: 'copies',    label: 'Copies à corriger', icon: <ClipboardList className="h-3.5 w-3.5" /> },
              { id: 'notes',     label: 'Notes de cours', icon: <FileText className="h-3.5 w-3.5" /> },
            ] as {id: Tab, label: string, icon: React.ReactNode}[]).map(t => (
              <button key={t.id} onClick={() => setTab(t.id as Tab)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  tab === t.id ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                )}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Groupe 3 : Suivi */}
        <div className="space-y-1">
          <div className="px-1">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Suivi</p>
            <p className="text-[11px] text-muted-foreground/70">Avancement dans les modules, présence en classe, relevé de notes</p>
          </div>
          <div className="flex flex-wrap gap-1.5">
            {([
              { id: 'progression', label: 'Progression', icon: <BarChart2 className="h-3.5 w-3.5" /> },
              { id: 'presences',   label: 'Présences',   icon: <CalendarCheck className="h-3.5 w-3.5" /> },
              { id: 'cotes',       label: 'Cotes',       icon: <Award className="h-3.5 w-3.5" /> },
            ] as {id: Tab, label: string, icon: React.ReactNode}[]).map(t => (
              <button key={t.id} onClick={() => setTab(t.id as Tab)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all",
                  tab === t.id ? "bg-primary text-primary-foreground shadow-sm" : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted"
                )}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>

      </div>

      {/* ═══════════════════ ONGLET COURS ═══════════════════ */}
      {tab === 'cours' && isAdmin && (
        <div className="space-y-5">
          {/* En-tête */}
          {(() => {
            const nomsVus = new Set<string>()
            const doublons: string[] = []
            for (const c of coursList) {
              const k = (c.nom || '').trim().toLowerCase()
              if (nomsVus.has(k)) { doublons.push(c.id) } else { nomsVus.add(k) }
            }
            return (
              <>
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <h2 className="text-base font-display font-semibold text-foreground">Gestion des cours</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">{coursList.filter(c => c.actif).length} cours actif{coursList.filter(c => c.actif).length > 1 ? 's' : ''} : {COURS_SYSTEME.filter(c => !c.actif).length} en préparation</p>
                    <p className="text-xs text-muted-foreground/70 mt-0.5">Chaque UE active est affectée automatiquement à toute faculté - rien à créer manuellement.</p>
                  </div>
                  {doublons.length > 0 && (
                    <Button
                      size="sm"
                      className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5"
                      onClick={() => { setCoursDoublonsIds(doublons); setConfirmNettoyage(true) }}
                    >
                      Nettoyer {doublons.length} doublon{doublons.length > 1 ? 's' : ''}
                    </Button>
                  )}
                </div>

                {/* Filtre par faculté - seul endroit de l'app où on modifie/
                    supprime un cours (l'affectation elle-même est automatique,
                    voir provisionCoursManquantsAsync) ; l'accordéon Universités
                    y renvoie au lieu de dupliquer cette liste. */}
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-xs text-muted-foreground shrink-0">Filtrer par faculté :</span>
                  <Select value={coursFiltreFaculteId || 'toutes'} onValueChange={v => setCoursFiltreFaculteId(v === 'toutes' ? '' : v)}>
                    <SelectTrigger className="h-8 w-auto min-w-[180px] text-xs">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="toutes">Toutes les facultés</SelectItem>
                      {facultesList.map(f => {
                        const uni = universites.find(u => u.id === f.universiteId)
                        return <SelectItem key={f.id} value={f.id}>{f.nom}{uni ? ` (${uni.nom})` : ''}</SelectItem>
                      })}
                    </SelectContent>
                  </Select>
                  {coursFiltreFaculteId && (
                    <Button size="sm" variant="ghost" className="h-7 text-xs px-2" onClick={() => setCoursFiltreFaculteId('')}>
                      <X className="h-3 w-3 mr-1" /> Effacer
                    </Button>
                  )}
                </div>

                {confirmNettoyage && (
                  <div className="rounded-xl border border-orange-300 bg-orange-50 px-4 py-3 flex items-center justify-between gap-4">
                    <p className="text-sm text-orange-800">
                      Supprimer {coursDoublonsIds.length} cours en double ? Cette action est irréversible.
                    </p>
                    <div className="flex gap-2 shrink-0">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 text-xs border-orange-300"
                        onClick={() => { setConfirmNettoyage(false); setCoursDoublonsIds([]) }}
                        disabled={nettoyageEnCours}
                      >
                        Annuler
                      </Button>
                      <Button
                        size="sm"
                        className="h-8 text-xs bg-orange-500 hover:bg-orange-600 text-white"
                        onClick={handleNettoyerDoublons}
                        disabled={nettoyageEnCours}
                      >
                        {nettoyageEnCours ? 'Suppression...' : 'Confirmer'}
                      </Button>
                    </div>
                  </div>
                )}
              </>
            )
          })()}

          {/* Cours actifs (filtrés par faculté si un filtre est actif) */}
          {(() => {
            const coursFiltres = coursFiltreFaculteId ? coursList.filter(c => c.faculteId === coursFiltreFaculteId) : coursList
            return coursFiltres.filter(c => c.actif).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <LibraryBig className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">{coursFiltreFaculteId ? 'Aucun cours actif pour cette faculté.' : 'Aucun cours actif pour l\'instant.'}</p>
              <p className="text-xs mt-1">Créez des cours pour les assigner aux étudiants.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {/* Tous les cours, un par faculté : l'ancienne liste dédupliquée par
                  UE n'en montrait qu'un, pris dans une faculté au hasard. */}
              {getCoursTries(coursFiltres).map(c => {
                const inscrits = etudiants.filter(e => resolveCoursIds(e).includes(c.id))
                return (
                  <Card key={c.id} className="border-border">
                    <CardContent className="px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">{coursFiltreFaculteId ? c.nom : libelleCours(c)}</span>
                            <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-green-100 text-green-700">
                              Actif
                            </span>
                            {(c as any).systeme && (
                              <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">Système</span>
                            )}
                          </div>
                          {c.description && <p className="text-xs text-muted-foreground mt-0.5">{c.description}</p>}
                          <p className="text-xs text-muted-foreground mt-1">
                            <span className="font-medium text-foreground">{inscrits.length}</span> étudiant{inscrits.length > 1 ? 's' : ''} inscrit{inscrits.length > 1 ? 's' : ''}
                            {inscrits.length > 0 && (
                              <span className="ml-1">: {inscrits.map(e => nomEtudiant(e)).join(', ')}</span>
                            )}
                          </p>
                        </div>
                        <div className="flex gap-1 flex-shrink-0">
                          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => openEditCours(c)} aria-label={`Modifier le cours ${c.nom}`}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          {!(c as any).systeme && (
                            <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive" onClick={() => setDeleteCoursId(c.id)} aria-label={`Supprimer le cours ${c.nom}`}>
                              <Trash2 className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )
          })()}

        </div>
      )}

      {/* ═══════════════════ ONGLET UNIVERSITÉS ═══════════════════ */}
      {tab === 'universites' && isAdmin && (() => {
        const qUni = normalizeStr(searchUni.trim())
        const universitesFiltrees = qUni
          ? universites.filter(u => normalizeStr(u.nom).includes(qUni) || normalizeStr(u.ville || '').includes(qUni))
          : universites
        return (
        <div className="space-y-4">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-muted-foreground">{universites.length} université{universites.length > 1 ? 's' : ''}</p>
            <Button size="sm" onClick={openCreateUni}>
              <Plus className="h-4 w-4 mr-1.5" /> Nouvelle université
            </Button>
          </div>

          {universites.length > 5 && (
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
              <Input
                value={searchUni}
                onChange={e => setSearchUni(e.target.value)}
                placeholder="Rechercher une université par nom ou ville..."
                className="pl-9 h-9 text-sm"
              />
            </div>
          )}

          {universites.length === 0 ? (
            <Card className="border-border">
              <CardContent className="pt-10 pb-10 text-center text-muted-foreground">
                <Building2 className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p>Aucune université enregistrée.</p>
                <p className="text-xs mt-1">Créez une université pour y associer des étudiants.</p>
              </CardContent>
            </Card>
          ) : universitesFiltrees.length === 0 ? (
            <Card className="border-border">
              <CardContent className="pt-8 pb-8 text-center text-muted-foreground">
                <Search className="h-8 w-8 mx-auto mb-2 opacity-30" />
                <p className="text-sm">Aucune université ne correspond à « {searchUni} ».</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {universitesFiltrees.map(u => {
                const uniFacultes = facultesList.filter(f => f.universiteId === u.id)
                const uniEtudiants = etudiants.filter(e => (e as any).universiteId === u.id).length
                // ouvert si pas dans le Set des fermés (ouvert par défaut)
                const uniOpen = !openUnisMgmt.has(u.id)
                return (
                  <Card key={u.id} className="border-border overflow-hidden">
                    {/* ── Ligne Université ── */}
                    <div
                      className="flex items-center justify-between px-4 py-3 cursor-pointer hover:bg-muted/30 transition-colors"
                      onClick={() => toggleUniMgmt(u.id)}
                    >
                      <div className="flex items-center gap-3">
                        {uniOpen ? <ChevronDown className="h-4 w-4 text-muted-foreground" /> : <ChevronRight className="h-4 w-4 text-muted-foreground" />}
                        <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Building2 className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{u.nom}</p>
                          <p className="text-xs text-muted-foreground">
                            {u.ville && <span className="mr-2">{u.ville}</span>}
                            <span>{uniFacultes.length} faculté{uniFacultes.length > 1 ? 's' : ''}</span>
                            <span className="mx-1">·</span>
                            <span>{uniEtudiants} étudiant{uniEtudiants > 1 ? 's' : ''}</span>
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                        <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => openCreateFaculte(u.id)}>
                          <Plus className="h-3 w-3 mr-1" /> Faculté
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditUni(u)} aria-label={`Modifier l'université ${u.nom}`}>
                          <Pencil className="h-3.5 w-3.5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeleteUniId(u.id)} aria-label={`Supprimer l'université ${u.nom}`}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </div>
                    </div>

                    {/* ── Facultés (accordéon) ── */}
                    {uniOpen && (
                      <div className="border-t border-border">
                        {uniFacultes.length === 0 ? (
                          <div className="px-6 py-4 text-xs text-muted-foreground italic">
                            Aucune faculté : cliquez sur "+ Faculté" pour en créer une.
                          </div>
                        ) : (
                          uniFacultes.map(fac => {
                            const nbCoursFac = coursList.filter(c => c.faculteId === fac.id).length
                            return (
                              <div key={fac.id} className="flex items-center justify-between px-8 py-2.5 border-b border-border/50 last:border-0 hover:bg-muted/20 transition-colors">
                                <div className="flex items-center gap-2">
                                  <GraduationCap className="h-3.5 w-3.5 text-primary/70" />
                                  <span className="text-sm font-medium text-foreground">{fac.nom}</span>
                                  <Badge variant="secondary" className="text-xs ml-1">{nbCoursFac} cours</Badge>
                                </div>
                                <div className="flex items-center gap-1">
                                  {/* Gestion des cours (créer/modifier/supprimer) centralisée
                                      dans l'onglet Cours - ce lien y renvoie déjà filtré sur
                                      cette faculté au lieu de dupliquer la liste ici. */}
                                  <Button variant="outline" size="sm" className="h-6 text-xs gap-1" onClick={() => { setCoursFiltreFaculteId(fac.id); setTab('cours') }}>
                                    Gérer les cours <ChevronRight className="h-3 w-3" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => openEditFaculte(fac)} aria-label={`Modifier la faculté ${fac.nom}`}>
                                    <Pencil className="h-3 w-3" />
                                  </Button>
                                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => setDeleteFaculteId(fac.id)} aria-label={`Supprimer la faculté ${fac.nom}`}>
                                    <Trash2 className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                            )
                          })
                        )}
                      </div>
                    )}
                  </Card>
                )
              })}
            </div>
          )}
        </div>
        )
      })()}

      {/* ═══════════════════ ONGLET PROF / ASSISTANTS ═══════════════════ */}
      {tab === 'staff' && isAdmin && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{staff.length} membre{staff.length > 1 ? 's' : ''} du staff</p>
            <div className="flex items-center gap-2">
              {/* Outil de contrôle réservé à l'administrateur : vérifie que chaque
                  enseignant ne voit que ses propres étudiants. Il n'avait aucun
                  lien d'accès dans l'interface. */}
              <Button size="sm" variant="outline" onClick={() => navigate('/debug-isolation')}>
                <ShieldCheck className="h-4 w-4 mr-1.5" /> Contrôle d'isolation
              </Button>
              <Button size="sm" onClick={() => openCreateUser('professeur')}>
                <Plus className="h-4 w-4 mr-1.5" /> Nouveau membre staff
              </Button>
            </div>
          </div>

          {/* Admins */}
          <div>
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Administrateurs</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {admins.map(u => (
                <Card key={u.id} className="border-border">
                  <CardContent className="pt-3 pb-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">{u.prenom} {u.nom}</p>
                        <p className="text-xs font-mono text-muted-foreground">@{u.username}</p>
                        <span className={`text-xs px-2 py-0.5 rounded-full font-medium mt-1.5 inline-block ${ROLE_COLORS[u.role]}`}>
                          {ROLE_LABELS[u.role]}
                        </span>
                      </div>
                      {!isProtectedAdmin(u) && (
                        <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeleteUserId(u.id)} aria-label={`Supprimer ${u.prenom} ${u.nom}`}>
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Staff : tableau avec statut */}
          {(['professeur', 'assistant'] as UserRole[]).map(role => {
            const members = staff.filter(u => u.role === role)
            if (members.length === 0) return null
            return (
              <div key={role}>
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  {ROLE_LABELS[role]}s ({members.length})
                </h3>
                <Card className="border-border overflow-hidden">
                  <div className="overflow-x-auto -mx-1">
                  <table className="w-full text-sm min-w-[600px]">
                    <thead className="bg-muted/30">
                      <tr>
                        <th className="text-left px-4 py-2 font-medium text-muted-foreground uppercase text-xs tracking-wide">Nom</th>
                        <th className="text-left px-4 py-2 font-medium text-muted-foreground uppercase text-xs tracking-wide">Rôle</th>
                        <th className="text-left px-4 py-2 font-medium text-muted-foreground uppercase text-xs tracking-wide">Université</th>
                        <th className="text-left px-4 py-2 font-medium text-muted-foreground uppercase text-xs tracking-wide">Statut</th>
                        <th className="px-4 py-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {members.map(u => {
                        const uni = universites.find(x => x.id === (u as any).universiteId)
                        return (
                          <tr key={u.id} className="border-t border-border/50 hover:bg-muted/20">
                            <td className="px-4 py-2.5">
                              <p className="font-medium text-foreground">{u.prenom} {u.nom}</p>
                              <p className="text-xs text-muted-foreground font-mono">@{u.username}</p>
                              {(() => {
                                // Équipe pédagogique : titulaire d'un assistant, assistants d'un professeur
                                if (u.role === 'assistant') {
                                  const tit = users.find(x => x.id === (u as any).titulaireId)
                                  return tit ? <p className="text-xs text-primary mt-0.5">Équipe de {tit.prenom} {tit.nom}</p> : null
                                }
                                const assistants = users.filter(x => (x as any).titulaireId === u.id)
                                return assistants.length > 0
                                  ? <p className="text-xs text-primary mt-0.5">Assisté par {assistants.map(x => `${x.prenom} ${x.nom}`).join(', ')}</p>
                                  : null
                              })()}
                            </td>
                            <td className="px-4 py-2.5">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_COLORS[u.role]}`}>
                                {ROLE_LABELS[u.role]}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-muted-foreground text-xs">
                              {uni ? uni.nom : '-'}
                            </td>
                            <td className="px-4 py-2.5">
                              <button
                                onClick={() => toggleActifUser(u.id, u.actif)}
                                className={`text-xs px-2.5 py-1 rounded-full font-medium border transition-colors ${u.actif ? 'bg-green-100 text-green-700 border-green-300 hover:bg-green-200' : 'bg-red-100 text-red-600 border-red-300 hover:bg-red-200'}`}
                              >
                                {u.actif ? '● Actif' : '● Suspendu'}
                              </button>
                            </td>
                            <td className="px-4 py-2.5">
                              <div className="flex gap-1 justify-end">
                                <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditUser(u)} aria-label={`Modifier ${u.prenom} ${u.nom}`}>
                                  <Pencil className="h-3.5 w-3.5" />
                                </Button>
                                <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeleteUserId(u.id)} aria-label={`Supprimer ${u.prenom} ${u.nom}`}>
                                  <Trash2 className="h-3.5 w-3.5" />
                                </Button>
                              </div>
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </table>
                  </div>
                </Card>
              </div>
            )
          })}
        </div>
      )}


      {/* ═══════════════════ ONGLET PROGRESSION ═══════════════════ */}
      {tab === 'progression' && (() => {
        // ── Filtres cascade ──
        const filtUniId  = progFiltres.uniId
        const filtFacId  = progFiltres.facId
        const filtCoursId= progFiltres.coursId
        const filtClasse = progFiltres.classe

        // Facultés disponibles pour l'université sélectionnée
        const facsDispo  = filtUniId  ? facultesList.filter(f => f.universiteId === filtUniId) : facultesList
        // Cours de l'équipe dans l'université et la faculté sélectionnées
        const coursDispo = coursDuFiltre(filtUniId, filtFacId)
        const classesDispo = promotionsDispo

        // Étudiants du groupe filtré, et leur cote sur le cours choisi (ou
        // tous cours confondus)
        const perfData = etudiants.filter(et => passeFiltresGroupe(et, progFiltres)).map(et => {
          const cote  = coteDe(et, filtCoursId)
          const prog  = progressionData.find(p => p.etudiant.id === et.id)
          const uni   = universites.find(u => u.id === (et as any).universiteId)
          return {
            etudiant: et, uni,
            totalSeances:  cote.seances,
            nbPresent:     cote.presences,
            tauxPresence:  cote.tauxPresence ?? 0,
            cotePresence:  cote.cotePresence,
            coteDevoirs:   cote.coteDevoirs,
            total:         cote.total,
            mention:       cote.mention,
            tentatives:    prog?.tentatives     ?? 0,
            moyenneTP:     prog?.moyenne        ?? null,
          }
        }).sort((a, b) => (a.total ?? 99) - (b.total ?? 99))

        const enDifficulte = perfData.filter(d => d.total !== null && d.total < 5)
        const sansActivite = perfData.filter(d => d.tentatives === 0 && d.totalSeances === 0)
        const bons         = perfData.filter(d => d.total !== null && d.total >= 8)
        const aucunFiltre  = !filtUniId && !filtFacId && !filtCoursId && !filtClasse

        return (
          <div className="space-y-4">

            {/* Barre de filtres cascade */}
            <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Filtrer le groupe</p>
                {!aucunFiltre && (
                  <button
                    onClick={() => setProgFiltres({ uniId: '', facId: '', coursId: '', classe: '' })}
                    className="text-xs text-primary hover:underline"
                  >Réinitialiser</button>
                )}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {/* Université */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Université</label>
                  <select
                    value={filtUniId}
                    onChange={e => setProgFiltres((f: any) => ({ ...f, uniId: e.target.value, facId: '', coursId: '' }))}
                    className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                  >
                    <option value="">Toutes</option>
                    {universites.map(u => <option key={u.id} value={u.id}>{u.nom}</option>)}
                  </select>
                </div>
                {/* Faculté */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Faculté</label>
                  <select
                    value={filtFacId}
                    onChange={e => setProgFiltres((f: any) => ({ ...f, facId: e.target.value, coursId: '' }))}
                    disabled={facsDispo.length === 0}
                    className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                  >
                    <option value="">Toutes</option>
                    {facsDispo.map(f => <option key={f.id} value={f.id}>{f.nom}</option>)}
                  </select>
                </div>
                {/* Cours */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Cours</label>
                  <select
                    value={filtCoursId}
                    onChange={e => setProgFiltres((f: any) => ({ ...f, coursId: e.target.value }))}
                    disabled={coursDispo.length === 0}
                    className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                  >
                    <option value="">Tous</option>
                    {coursDispo.map(c => <option key={c.id} value={c.id}>{libelleCours(c)}</option>)}
                  </select>
                </div>
                {/* Classe */}
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Promotion</label>
                  <select
                    value={filtClasse}
                    onChange={e => setProgFiltres((f: any) => ({ ...f, classe: e.target.value }))}
                    disabled={classesDispo.length === 0}
                    className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                  >
                    <option value="">Toutes</option>
                    {classesDispo.map(cl => <option key={cl} value={cl}>{cl}</option>)}
                  </select>
                </div>
              </div>
              {aucunFiltre && (
                <p className="text-xs text-amber-600">
                  Aucun filtre actif : tous les étudiants sont affichés. Sélectionnez un groupe pour une comparaison pertinente.
                </p>
              )}
            </div>

            {/* Alertes rapides */}
            {perfData.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className={cn('rounded-xl border p-3 flex items-center gap-3', enDifficulte.length > 0 ? 'border-red-300 bg-red-50' : 'border-border bg-muted/20')}>
                  <div className="h-9 w-9 rounded-lg bg-red-100 flex items-center justify-center shrink-0">
                    <TrendingDown className="h-4 w-4 text-red-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-red-600">{enDifficulte.length}</p>
                    <p className="text-xs text-muted-foreground">En difficulté (&lt; 5/10)</p>
                  </div>
                </div>
                <div className={cn('rounded-xl border p-3 flex items-center gap-3', sansActivite.length > 0 ? 'border-amber-300 bg-amber-50' : 'border-border bg-muted/20')}>
                  <div className="h-9 w-9 rounded-lg bg-amber-100 flex items-center justify-center shrink-0">
                    <Clock className="h-4 w-4 text-amber-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-amber-600">{sansActivite.length}</p>
                    <p className="text-xs text-muted-foreground">Aucune activité</p>
                  </div>
                </div>
                <div className={cn('rounded-xl border p-3 flex items-center gap-3', bons.length > 0 ? 'border-green-300 bg-green-50' : 'border-border bg-muted/20')}>
                  <div className="h-9 w-9 rounded-lg bg-green-100 flex items-center justify-center shrink-0">
                    <Award className="h-4 w-4 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-green-600">{bons.length}</p>
                    <p className="text-xs text-muted-foreground">Excellents (≥ 8/10)</p>
                  </div>
                </div>
              </div>
            )}

            {/* Tableau */}
            {perfData.length === 0 ? (
              <Card className="border-border">
                <CardContent className="pt-10 pb-10 text-center text-muted-foreground">
                  <BarChart2 className="h-10 w-10 mx-auto mb-3 opacity-30" />
                  <p>{aucunFiltre ? 'Aucun étudiant enregistré.' : 'Aucun étudiant pour ces critères.'}</p>
                </CardContent>
              </Card>
            ) : (
              <Card className="border-border overflow-hidden">
                <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="text-left px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Étudiant</th>
                      <th className="text-center px-3 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Présences</th>
                      <th className="text-center px-3 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Cote prés. /5</th>
                      <th className="text-center px-3 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Exercices</th>
                      <th className="text-center px-3 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Cote devoirs /5</th>
                      <th className="text-center px-3 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Total /10</th>
                      <th className="text-center px-3 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {perfData.map(({ etudiant: e, uni, totalSeances, nbPresent, tauxPresence, cotePresence, coteDevoirs, total, mention, tentatives, moyenneTP }) => {
                      const enDiff  = total !== null && total < 5
                      const inactif = tentatives === 0 && totalSeances === 0
                      return (
                        <tr key={e.id} className={cn('border-t border-border/50 hover:bg-muted/20', enDiff && 'bg-red-50/40')}>
                          <td className="px-4 py-2.5">
                            <p className="font-medium text-foreground">{nomEtudiant(e)}</p>
                            <p className="text-xs text-muted-foreground">{uni ? uni.nom : <span className="italic">Sans université</span>}{(e as any).classe ? ` · ${(e as any).classe}` : ''}</p>
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {totalSeances > 0
                              ? <span className={cn('font-semibold text-sm', tauxPresence >= 75 ? 'text-green-600' : tauxPresence >= 50 ? 'text-yellow-600' : 'text-red-600')}>{nbPresent}/{totalSeances}</span>
                              : <span className="text-muted-foreground text-xs">-</span>}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {cotePresence !== null
                              ? <span className={cn('font-bold text-sm', cotePresence >= 4 ? 'text-green-600' : cotePresence >= 2.5 ? 'text-yellow-600' : 'text-red-600')}>{formaterNombre(cotePresence)}</span>
                              : <span className="text-muted-foreground text-xs">-</span>}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {tentatives > 0
                              ? <span className="text-sm">{tentatives} <span className="text-xs text-muted-foreground">({moyenneTP}%)</span></span>
                              : <span className="text-muted-foreground text-xs">-</span>}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {coteDevoirs !== null
                              ? <span className={cn('font-bold text-sm', coteDevoirs >= 4 ? 'text-green-600' : coteDevoirs >= 2.5 ? 'text-yellow-600' : 'text-red-600')}>{formaterNombre(coteDevoirs)}</span>
                              : <span className="text-muted-foreground text-xs">-</span>}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {total !== null
                              ? <span className={cn('font-bold text-base', total >= 8 ? 'text-green-600' : total >= 5 ? 'text-yellow-600' : 'text-red-600')}>{formaterNombre(total)}</span>
                              : <span className="text-muted-foreground text-xs">-</span>}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {inactif ? (
                              <Badge variant="outline" className="text-xs border-gray-400 text-gray-500">Inactif</Badge>
                            ) : mention ? (
                              <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium',
                                mention === 'Excellent'    ? 'bg-green-100 text-green-800' :
                                mention === 'Bien'         ? 'bg-blue-100 text-blue-800' :
                                mention === 'Satisfaisant' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              )}>{mention}</span>
                            ) : <span className="text-muted-foreground text-xs">-</span>}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                </div>
              </Card>
            )}
            <p className="text-xs text-muted-foreground">Triés du plus faible au plus fort · Lignes rouges : total &lt; 5/10 · Le total apparaît quand l'étudiant a au moins une séance et un devoir comptés.</p>
          </div>
        )
      })()}

      {/* ═══════════════════ ONGLET NOTES DE COURS ═══════════════════ */}
      {tab === 'notes' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{allNotes.length} note{allNotes.length > 1 ? 's' : ''} au total</p>
            <Button size="sm" onClick={openCreateNote}>
              <Plus className="h-4 w-4 mr-1.5" />Nouvelle note
            </Button>
          </div>

          {allNotes.length === 0 ? (
            <Card className="border-border">
              <CardContent className="pt-10 pb-10 text-center text-muted-foreground">
                <FileText className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p>Aucune note de cours.</p>
                <p className="text-xs mt-1">Créez une note pour la partager avec vos étudiants.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {allNotes.map(note => {
                const cours = coursList.find(c => c.id === note.coursId)
                return (
                  <Card key={note.id} className="border-border">
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <FileText className="h-4 w-4 text-primary shrink-0" />
                            <p className="font-semibold text-foreground">{note.titre}</p>
                            {!note.actif && <Badge variant="outline" className="text-xs text-muted-foreground">Masquée</Badge>}
                          </div>
                          {cours && <p className="text-xs text-muted-foreground mt-0.5">{cours.nom}</p>}
                          {note.contenu && (
                            <p className="text-sm text-foreground/80 mt-2 whitespace-pre-wrap line-clamp-3">{note.contenu}</p>
                          )}
                          {note.pdfUrl && (
                            <a href={note.pdfUrl} target="_blank" rel="noopener noreferrer"
                              className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:underline">
                              <FileDown className="h-3.5 w-3.5" />Voir le PDF
                            </a>
                          )}
                          <p className="text-xs text-muted-foreground mt-1">
                            {new Date(note.dateCreation).toLocaleDateString('fr-FR')}
                          </p>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEditNote(note)} aria-label={`Modifier la note ${note.titre}`}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeleteNoteId(note.id)} aria-label={`Supprimer la note ${note.titre}`}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Formulaire création / édition note */}
          <Dialog open={showNoteForm} onOpenChange={setShowNoteForm}>
            <DialogContent className="max-w-lg">
              <DialogHeader>
                <DialogTitle>{editNoteId ? 'Modifier la note' : 'Nouvelle note de cours'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-3">
                <div>
                  <Label>Titre *</Label>
                  <Input value={noteForm.titre} onChange={e => setNoteForm(f => ({ ...f, titre: e.target.value }))} placeholder="Ex : Chapitre 1 : Introduction au SYSCOHADA=" />
                </div>
                <div>
                  <Label>Cours *</Label>
                  <Select value={noteForm.coursId} onValueChange={v => setNoteForm(f => ({ ...f, coursId: v }))}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner un cours=" /></SelectTrigger>
                    <SelectContent>
                      {(isAdmin ? getCoursTries(coursList) : [...coursEquipe, ...coursList.filter(c => c.id === noteForm.coursId && !coursEquipe.some(x => x.id === c.id))])
                        .map(c => <SelectItem key={c.id} value={c.id}>{libelleCours(c)}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Contenu (texte)</Label>
                  <textarea
                    value={noteForm.contenu}
                    onChange={e => setNoteForm(f => ({ ...f, contenu: e.target.value }))}
                    placeholder="Rédigé le contenu de la note ici...="
                    rows={6}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-y focus:outline-none focus:ring-1 focus:ring-ring"
                  />
                </div>
                {/* Upload PDF */}
                <div>
                  <Label>Fichier PDF (optionnel)</Label>
                  <div className="mt-1.5 space-y-2">
                    <label className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-md border border-dashed border-border hover:border-primary/50 hover:bg-muted/30 transition-colors">
                      <Paperclip className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="text-sm text-muted-foreground flex-1 truncate">
                        {notePdfFile ? notePdfFile.name : noteForm.pdfUrl ? '(PDF existant : remplacer)' : 'Choisir un fichier PDF...'}
                      </span>
                      <input
                        type="file"
                        accept="application/pdf"
                        className="hidden"
                        onChange={e => {
                          const f = e.target.files?.[0] || null
                          setNotePdfFile(f)
                        }}
                      />
                    </label>
                    {/* Aperçu du PDF existant */}
                    {noteForm.pdfUrl && !notePdfFile && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground truncate flex-1">PDF actuel enregistré</span>
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-red-500 hover:text-red-600" onClick={() => setNoteForm(f => ({ ...f, pdfUrl: '' }))}>
                          Retirer
                        </Button>
                        <Button variant="ghost" size="sm" className="h-6 text-xs" onClick={() => window.open(noteForm.pdfUrl, '_blank')}>
                          Voir
                        </Button>
                      </div>
                    )}
                    {/* Fichier sélectionné */}
                    {notePdfFile && (
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-green-600 flex-1 truncate">{notePdfFile.name} ({(notePdfFile.size / 1024).toFixed(0)} Ko)</span>
                        <Button variant="ghost" size="sm" className="h-6 text-xs text-red-500" onClick={() => setNotePdfFile(null)}>
                          Retirer
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Switch checked={noteForm.actif} onCheckedChange={v => setNoteForm(f => ({ ...f, actif: v }))} id="note-actif" />
                  <Label htmlFor="note-actif">Visible par les étudiants</Label>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowNoteForm(false)}>Annuler</Button>
                <Button onClick={handleSaveNote} disabled={!noteForm.titre.trim() || !noteForm.coursId || notePdfUploading}>
                  {notePdfUploading ? 'Envoi PDF...' : editNoteId ? 'Enregistrer' : 'Créer'}
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Confirmation suppression */}
          <AlertDialog open={!!deleteNoteId} onOpenChange={o => { if (!o) setDeleteNoteId(null) }}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer cette note ?</AlertDialogTitle>
                <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteNote} className="bg-destructive text-destructive-foreground">Supprimer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      )}

      {/* ═══════════════════ ONGLET PRÉSENCES ═══════════════════ */}
      {tab === 'presences' && (() => {
        const pFiltUniId   = presenceFiltres.uniId
        const pFiltFacId   = presenceFiltres.facId
        const pFiltCoursId = presenceFiltres.coursId
        const pFiltClasse  = presenceFiltres.classe
        const pFacsDispo   = pFiltUniId  ? facultesList.filter(f => f.universiteId === pFiltUniId) : facultesList
        const pCoursDispo  = coursDuFiltre(pFiltUniId, pFiltFacId)
        const pClassesDispo = promotionsDispo
        const pAucunFiltre = !pFiltUniId && !pFiltFacId && !pFiltCoursId && !pFiltClasse
        // Séances du cours, de la faculté ou de l'université choisis. Le filtre
        // ne portait auparavant que sur les étudiants : les colonnes restaient
        // celles de tous les cours.
        const seancesFiltrees = seancesSorted.filter(s =>
          (!pFiltCoursId || s.coursId === pFiltCoursId) &&
          (!pFiltFacId || s.faculteId === pFiltFacId) &&
          (!pFiltUniId || s.universiteId === pFiltUniId)
        )
        const etudiantsVus = etudiantsPresences.filter(et => passeFiltresGroupe(et, presenceFiltres))
        const coursDeSeance = (s: Presence) => s.coursId ? coursList.find(c => c.id === s.coursId) : undefined
        return (
        <div className="space-y-4">

          {/* Filtre groupe */}
          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Filtrer le groupe</p>
              {!pAucunFiltre && (
                <button
                  onClick={() => setPresenceFiltres({ uniId: '', facId: '', coursId: '', classe: '' })}
                  className="text-xs text-primary hover:underline"
                >Réinitialiser</button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Université */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Université</label>
                <select
                  value={pFiltUniId}
                  onChange={e => setPresenceFiltres((f: any) => ({ ...f, uniId: e.target.value, facId: '', coursId: '' }))}
                  className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Toutes</option>
                  {universites.map(u => <option key={u.id} value={u.id}>{u.nom}</option>)}
                </select>
              </div>
              {/* Faculté */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Faculté</label>
                <select
                  value={pFiltFacId}
                  onChange={e => setPresenceFiltres((f: any) => ({ ...f, facId: e.target.value, coursId: '' }))}
                  disabled={pFacsDispo.length === 0}
                  className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                >
                  <option value="">Toutes</option>
                  {pFacsDispo.map(f => <option key={f.id} value={f.id}>{f.nom}</option>)}
                </select>
              </div>
              {/* Cours */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Cours</label>
                <select
                  value={pFiltCoursId}
                  onChange={e => setPresenceFiltres((f: any) => ({ ...f, coursId: e.target.value }))}
                  disabled={pCoursDispo.length === 0}
                  className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                >
                  <option value="">Tous</option>
                  {pCoursDispo.map(c => <option key={c.id} value={c.id}>{libelleCours(c)}</option>)}
                </select>
              </div>
              {/* Promotion */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Promotion</label>
                <select
                  value={pFiltClasse}
                  onChange={e => setPresenceFiltres((f: any) => ({ ...f, classe: e.target.value }))}
                  disabled={pClassesDispo.length === 0}
                  className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                >
                  <option value="">Toutes</option>
                  {pClassesDispo.map(cl => <option key={cl} value={cl}>{cl}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2">
            <p className="text-sm text-muted-foreground">{seancesFiltrees.length} séance{seancesFiltrees.length !== 1 ? 's' : ''} : {etudiantsVus.length} étudiant{etudiantsVus.length !== 1 ? 's' : ''}</p>
            <Button size="sm" onClick={openCreatePresence}>
              <Plus className="h-4 w-4 mr-1.5" />Nouvelle séance
            </Button>
          </div>

          {seancesFiltrees.length === 0 ? (
            <Card className="border-border">
              <CardContent className="pt-10 pb-10 text-center text-muted-foreground">
                <CalendarCheck className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p>Aucune séance enregistrée{pAucunFiltre ? '' : ' pour ce groupe'}.</p>
                <p className="text-xs mt-1">Créez une séance pour marquer les présences.</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr>
                      {/* Colonne étudiant fixe */}
                      <th className="text-left px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide whitespace-nowrap sticky left-0 bg-muted/40 z-10">Étudiant</th>
                      {/* Une colonne par séance */}
                      {seancesFiltrees.map(s => (
                        <th key={s.id} className="text-center px-2 py-2.5 font-medium text-muted-foreground text-xs whitespace-nowrap" title={[s.titre, coursDeSeance(s) ? libelleCours(coursDeSeance(s)!) : 'Sans cours'].join(' · ')}>
                          <div>{new Date(s.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}</div>
                          <div className="flex gap-1 justify-center mt-1">
                            <Button size="icon" variant="ghost" className="h-5 w-5" onClick={() => openEditPresence(s)} aria-label={`Modifier la séance ${s.titre}`}><Pencil className="h-2.5 w-2.5" /></Button>
                            <Button size="icon" variant="ghost" className="h-5 w-5 text-destructive" onClick={() => setDeletePresenceId(s.id)} aria-label={`Supprimer la séance ${s.titre}`}><Trash2 className="h-2.5 w-2.5" /></Button>
                          </div>
                        </th>
                      ))}
                      <th className="text-center px-3 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide whitespace-nowrap">Présences</th>
                      <th className="text-center px-3 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide whitespace-nowrap">Taux</th>
                      <th className="text-center px-3 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide whitespace-nowrap">Cote /5</th>
                    </tr>
                  </thead>
                  <tbody>
                    {etudiantsVus.map(et => {
                      // Même calcul que l'onglet Cotes et que le tableau de bord de
                      // l'étudiant, sur les séances affichées.
                      const cote = coteDe(et, pFiltCoursId, seancesFiltrees)
                      return (
                        <tr key={et.id} className="border-t border-border/50 hover:bg-muted/20">
                          <td className="px-4 py-2 sticky left-0 bg-card z-10">
                            <p className="font-medium text-sm whitespace-nowrap">{nomEtudiant(et)}</p>
                          </td>
                          {seancesFiltrees.map(s => {
                            const entry = s.etudiants?.find(e => e.etudiantId === et.id)
                            const present = entry?.present ?? false
                            // Figure sur la feuille d'un cours qu'il ne suit pas
                            // (anciennes feuilles) : affiché, mais non compté.
                            const horsCours = !!entry && !!s.coursId && !resolveCoursIds(et).includes(s.coursId)
                            return (
                              <td key={s.id} className="px-2 py-2 text-center">
                                {entry ? (
                                  <span
                                    className={cn(
                                      'inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold',
                                      present ? 'bg-green-500 text-white' : 'bg-red-500 text-white',
                                      horsCours && 'opacity-30'
                                    )}
                                    title={horsCours ? 'Cours non suivi : séance non comptée' : undefined}
                                  >
                                    {present ? '•' : '×'}
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground opacity-30 text-xs">-</span>
                                )}
                              </td>
                            )
                          })}
                          <td className="px-3 py-2 text-center text-xs font-medium">{cote.seances > 0 ? `${cote.presences}/${cote.seances}` : '-'}</td>
                          <td className="px-3 py-2 text-center">
                            {cote.tauxPresence !== null ? (
                              <span className={cn('text-xs font-semibold',
                                cote.tauxPresence >= 75 ? 'text-green-600' : cote.tauxPresence >= 50 ? 'text-yellow-600' : 'text-red-600'
                              )}>{cote.tauxPresence}%</span>
                            ) : <span className="opacity-30">-</span>}
                          </td>
                          <td className="px-3 py-2 text-center">
                            {cote.cotePresence !== null ? (
                              <span className={cn('font-bold',
                                cote.cotePresence >= 4 ? 'text-green-600' : cote.cotePresence >= 2.5 ? 'text-yellow-600' : 'text-red-600'
                              )}>{formaterNombre(cote.cotePresence)}</span>
                            ) : <span className="opacity-30">-</span>}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}

          {/* Dialog création / édition séance */}
          <Dialog open={showPresenceForm} onOpenChange={setShowPresenceForm}>
            <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>{editPresenceId ? 'Modifier la séance' : 'Nouvelle séance de présence'}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-2">
                <div className="space-y-1.5">
                  <Label>Titre de la séance</Label>
                  <Input placeholder="Ex: Séance du 01/02/2025" value={presenceTitre} onChange={e => setPresenceTitre(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Date</Label>
                  <Input type="date" value={presenceDate} onChange={e => setPresenceDate(e.target.value)} />
                </div>
                <div className="space-y-1.5">
                  <Label>Cours *</Label>
                  <Select value={presenceCoursId || (seanceEditee && !seanceEditee.coursId ? '__none__' : '')} onValueChange={v => changerCoursSeance(v === '__none__' ? '' : v)}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner le cours" /></SelectTrigger>
                    <SelectContent>
                      {seanceEditee && !seanceEditee.coursId && (
                        <SelectItem value="__none__">Sans cours (séance antérieure)</SelectItem>
                      )}
                      {[...coursEquipe, ...(seanceEditee?.coursId && !coursEquipe.some(c => c.id === seanceEditee.coursId)
                        ? coursList.filter(c => c.id === seanceEditee.coursId) : [])].map(c => (
                        <SelectItem key={c.id} value={c.id}>{libelleCours(c)}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {coursEquipe.length === 0 ? (
                    <p className="text-xs text-amber-600">Aucun de vos étudiants n'est inscrit à un cours. Inscrivez-les d'abord (onglet Étudiants) : la feuille de présence liste les inscrits du cours choisi.</p>
                  ) : (
                    <p className="text-xs text-muted-foreground">La feuille liste les étudiants inscrits à ce cours ; la séance ne compte que pour eux.</p>
                  )}
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Présences{etudiantsFeuille.length > 0 ? ` (${etudiantsFeuille.filter(e => estCochePresent(e.id)).length}/${etudiantsFeuille.length})` : ''}</Label>
                    {etudiantsFeuille.length > 0 && (
                      <div className="flex gap-2">
                        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => { const c: Record<string,boolean> = {}; etudiantsFeuille.forEach(e => { c[e.id] = true }); setPresenceCoches(c) }}>Tous présents</Button>
                        <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => { const c: Record<string,boolean> = {}; etudiantsFeuille.forEach(e => { c[e.id] = false }); setPresenceCoches(c) }}>Tous absents</Button>
                      </div>
                    )}
                  </div>
                  {etudiantsFeuille.length === 0 ? (
                    <p className="text-xs text-muted-foreground">{presenceCoursId || seanceEditee ? 'Aucun étudiant inscrit à ce cours.' : 'Choisissez le cours pour afficher la feuille.'}</p>
                  ) : (
                    <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                      {etudiantsFeuille.map(e => (
                        <div key={e.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30">
                          <span className="text-sm">{nomEtudiant(e)}</span>
                          <Switch
                            checked={estCochePresent(e.id)}
                            onCheckedChange={v => setPresenceCoches(c => ({ ...c, [e.id]: v }))}
                            aria-label={`Présence de ${nomEtudiant(e)}`}
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowPresenceForm(false)}>Annuler</Button>
                <Button onClick={handleSavePresence}>{editPresenceId ? 'Modifier' : 'Enregistrer'}</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          {/* Confirm suppression */}
          <AlertDialog open={!!deletePresenceId} onOpenChange={o => !o && setDeletePresenceId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer cette séance ?</AlertDialogTitle>
                <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeletePresence} className="bg-destructive text-destructive-foreground">Supprimer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
        )
      })()}

      {/* ═══════════════════ ONGLET COTES ═══════════════════ */}
      {tab === 'cotes' && (() => {
        const cFiltUniId   = coteFiltres.uniId
        const cFiltFacId   = coteFiltres.facId
        const cFiltCoursId = coteFiltres.coursId
        const cFiltClasse  = coteFiltres.classe
        const cFacsDispo   = cFiltUniId  ? facultesList.filter(f => f.universiteId === cFiltUniId) : facultesList
        const cCoursDispo  = coursDuFiltre(cFiltUniId, cFiltFacId)
        const cClassesDispo = promotionsDispo
        const cAucunFiltre = !cFiltUniId && !cFiltFacId && !cFiltCoursId && !cFiltClasse
        // Cote recalculée sur le cours choisi : ses séances et ses devoirs
        // seulement. Le filtre « Cours » ne faisait auparavant que masquer des
        // lignes, sans changer les chiffres.
        const lignesCotes = etudiantsPresences
          .filter(et => passeFiltresGroupe(et, coteFiltres))
          .map(et => ({ etudiant: et, cote: coteDe(et, cFiltCoursId) }))
        const coursChoisi = cFiltCoursId ? coursList.find(c => c.id === cFiltCoursId) : undefined
        return (
        <div className="space-y-4">

          {/* Filtre groupe */}
          <div className="rounded-xl border border-border bg-muted/30 p-4 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Filtrer le groupe</p>
              {!cAucunFiltre && (
                <button
                  onClick={() => setCoteFiltres({ uniId: '', facId: '', coursId: '', classe: '' })}
                  className="text-xs text-primary hover:underline"
                >Réinitialiser</button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {/* Université */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Université</label>
                <select
                  value={cFiltUniId}
                  onChange={e => setCoteFiltres((f: any) => ({ ...f, uniId: e.target.value, facId: '', coursId: '' }))}
                  className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  <option value="">Toutes</option>
                  {universites.map(u => <option key={u.id} value={u.id}>{u.nom}</option>)}
                </select>
              </div>
              {/* Faculté */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Faculté</label>
                <select
                  value={cFiltFacId}
                  onChange={e => setCoteFiltres((f: any) => ({ ...f, facId: e.target.value, coursId: '' }))}
                  disabled={cFacsDispo.length === 0}
                  className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                >
                  <option value="">Toutes</option>
                  {cFacsDispo.map(f => <option key={f.id} value={f.id}>{f.nom}</option>)}
                </select>
              </div>
              {/* Cours */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Cours</label>
                <select
                  value={cFiltCoursId}
                  onChange={e => setCoteFiltres((f: any) => ({ ...f, coursId: e.target.value }))}
                  disabled={cCoursDispo.length === 0}
                  className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                >
                  <option value="">Tous</option>
                  {cCoursDispo.map(c => <option key={c.id} value={c.id}>{libelleCours(c)}</option>)}
                </select>
              </div>
              {/* Promotion */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Promotion</label>
                <select
                  value={cFiltClasse}
                  onChange={e => setCoteFiltres((f: any) => ({ ...f, classe: e.target.value }))}
                  disabled={cClassesDispo.length === 0}
                  className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                >
                  <option value="">Toutes</option>
                  {cClassesDispo.map(cl => <option key={cl} value={cl}>{cl}</option>)}
                </select>
              </div>
            </div>
            {!cAucunFiltre && (
              <p className="text-xs text-muted-foreground">
                {lignesCotes.length} étudiant{lignesCotes.length !== 1 ? 's' : ''} dans ce groupe
              </p>
            )}
          </div>

          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div className="text-xs text-muted-foreground space-y-0.5 max-w-2xl">
              <p className="text-sm">Cotes sur 10 : 5 points de présence, 5 points de devoirs{coursChoisi ? ` · ${libelleCours(coursChoisi)}` : ' · tous vos cours'}.</p>
              <p>Présence : séances du cours où l'étudiant figure sur la feuille. Devoirs : chaque note rapportée à son barème (sur 20 pour un devoir de chapitre, sur 10 sinon) ; un devoir non rendu à la date limite compte zéro ; une copie en attente de correction ne compte pas encore. Le total apparaît quand les deux parts existent.</p>
            </div>
            {lignesCotes.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={() => {
                  const date = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')
                  const headers = ['Nom', 'Post-nom', 'Identifiant', 'Promotion', 'Cours', 'Séances', 'Présences', 'Cote présences /5', 'Devoirs notés', 'Devoirs non rendus', 'Copies à corriger', 'Moyenne devoirs /20', 'Cote devoirs /5', 'Total /10', 'Mention']
                  const rows = lignesCotes.map(({ etudiant: e, cote }) => [
                    e.nom || '',
                    e.prenom || '',
                    e.username || '',
                    (e as any).classe || '',
                    coursChoisi ? libelleCours(coursChoisi) : 'Tous',
                    String(cote.seances),
                    String(cote.presences),
                    cote.cotePresence !== null ? formaterNombre(cote.cotePresence) : '',
                    String(cote.devoirsNotes),
                    String(cote.devoirsNonRendus),
                    String(cote.devoirsACorriger),
                    cote.moyenneDevoirs !== null ? formaterNombre(cote.moyenneDevoirs) : '',
                    cote.coteDevoirs !== null ? formaterNombre(cote.coteDevoirs) : '',
                    cote.total !== null ? formaterNombre(cote.total) : '',
                    cote.mention || '',
                  ])
                  exportToCSV([headers, ...rows], `orbit-cotes-${date}.csv`)
                }}
              >
                <Download className="h-4 w-4" /> Exporter CSV
              </Button>
            )}
          </div>

          {lignesCotes.length === 0 ? (
            <Card className="border-border">
              <CardContent className="pt-10 pb-10 text-center text-muted-foreground">
                <Award className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p>Aucun étudiant dans ce groupe.</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[760px]">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="text-left px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Étudiant</th>
                      <th className="text-center px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Présences</th>
                      <th className="text-center px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Cote présences /5</th>
                      <th className="text-center px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Devoirs</th>
                      <th className="text-center px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Cote devoirs /5</th>
                      <th className="text-center px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Total /10</th>
                      <th className="text-center px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Mention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lignesCotes.map(({ etudiant: e, cote }) => (
                      <tr key={e.id} className="border-t border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2.5">
                          <p className="font-medium">{nomEtudiant(e)}</p>
                          <p className="text-xs text-muted-foreground font-mono">@{e.username}</p>
                        </td>
                        <td className="px-4 py-2.5 text-center text-xs text-muted-foreground">
                          {cote.seances > 0 ? `${cote.presences}/${cote.seances}` : <span className="opacity-40">-</span>}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {cote.cotePresence !== null
                            ? <span className={cn('font-semibold', cote.cotePresence >= 4 ? 'text-green-600' : cote.cotePresence >= 2.5 ? 'text-yellow-600' : 'text-red-600')}>{formaterNombre(cote.cotePresence)}</span>
                            : <span className="text-muted-foreground opacity-40">-</span>}
                        </td>
                        <td className="px-4 py-2.5 text-center text-xs text-muted-foreground">
                          {cote.devoirsNotes + cote.devoirsNonRendus + cote.devoirsACorriger > 0 ? (
                            <span title="notés · non rendus (zéro) · à corriger">
                              {cote.devoirsNotes} noté{cote.devoirsNotes > 1 ? 's' : ''}
                              {cote.devoirsNonRendus > 0 && <span className="text-red-500"> · {cote.devoirsNonRendus} non rendu{cote.devoirsNonRendus > 1 ? 's' : ''}</span>}
                              {cote.devoirsACorriger > 0 && <span className="text-blue-600"> · {cote.devoirsACorriger} à corriger</span>}
                            </span>
                          ) : <span className="opacity-40">-</span>}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {cote.coteDevoirs !== null
                            ? <span className={cn('font-semibold', cote.coteDevoirs >= 4 ? 'text-green-600' : cote.coteDevoirs >= 2.5 ? 'text-yellow-600' : 'text-red-600')}>{formaterNombre(cote.coteDevoirs)}</span>
                            : <span className="text-muted-foreground opacity-40">-</span>}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {cote.total !== null
                            ? <span className={cn('font-bold text-base', cote.total >= 8 ? 'text-green-600' : cote.total >= 5 ? 'text-yellow-600' : 'text-red-600')}>{formaterNombre(cote.total)}</span>
                            : <span className="text-muted-foreground opacity-40">-</span>}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {cote.mention ? (
                            <span className={cn(
                              'text-xs px-2 py-0.5 rounded-full font-medium',
                              cote.mention === 'Excellent' ? 'bg-green-100 text-green-800' :
                              cote.mention === 'Bien' ? 'bg-blue-100 text-blue-800' :
                              cote.mention === 'Satisfaisant' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            )}>{cote.mention}</span>
                          ) : <span className="text-muted-foreground opacity-40">-</span>}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
        )
      })()}

      {/* ═══════════════════ ONGLET ÉTUDIANTS ═══════════════════ */}
      {tab === 'etudiants' && <GestionEtudiantsPage embedded />}

      {/* ═══════════════════ ONGLET MES DEVOIRS ═══════════════════
          Les devoirs se créent depuis un chapitre (bouton « Créer un devoir ») ;
          cet onglet est le seul endroit où l'on retrouve ceux de l'équipe pour
          en changer la date limite, les masquer ou les supprimer. */}
      {tab === 'devoirs' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-display font-bold text-foreground">Mes devoirs</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Devoirs créés par vous ou votre équipe pédagogique, du plus récent au plus ancien. Pour en créer un, ouvrez un chapitre de cours et utilisez « Créer un devoir ».
            </p>
          </div>
          {devoirsList.length === 0 ? (
            <Card className="border-border">
              <CardContent className="py-8 flex flex-col items-center gap-2 text-center">
                <LibraryBig className="h-8 w-8 text-muted-foreground/40" />
                <p className="text-sm font-medium text-foreground">Aucun devoir pour l'instant</p>
                <p className="text-xs text-muted-foreground max-w-sm">Ouvrez un chapitre depuis Mes cours et utilisez « Créer un devoir ».</p>
              </CardContent>
            </Card>
          ) : (
            [...devoirsList]
              .sort((a, b) => (b.dateLimit || '').localeCompare(a.dateLimit || ''))
              .map(dev => (
                <DevoirCard
                  key={dev.id}
                  dev={dev}
                  coursList={coursList}
                  universites={universites}
                  etudiants={etudiants}
                  openEditDevoir={openEditDevoir}
                  setDeleteDevoirId={setDeleteDevoirId}
                  setCorrectionSoumId={setCorrectionSoumId}
                  setCorrectionNote={setCorrectionNote}
                  setCorrectionComment={setCorrectionComment}
                  setViewSoumission={setViewSoumission}
                />
              ))
          )}
        </div>
      )}

      {/* ═══════════════════ ONGLET COPIES À CORRIGER ═══════════════════ */}
      {tab === 'copies' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-display font-bold text-foreground">Copies à corriger</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Copies rendues par vos étudiants et en attente d'une note. Tant qu'une copie n'est pas corrigée, elle ne compte pas dans la cote de l'étudiant.
            </p>
          </div>

          {copiesACorriger.length === 0 ? (
            <Card className="border-border">
              <CardContent className="py-8 flex flex-col items-center gap-2 text-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <p className="text-sm font-medium text-foreground">Aucune copie en attente</p>
                <p className="text-xs text-muted-foreground max-w-sm">
                  Toutes les copies rendues sur vos devoirs ont été corrigées.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Étudiant</th>
                      <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Devoir</th>
                      <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Rendue le</th>
                      <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {copiesACorriger.map(soum => {
                      const etu = users.find(u => u.id === soum.etudiantId)
                      const dev = devoirsList.find(d => d.id === soum.devoirId)
                      return (
                        <tr key={soum.id} className="border-t border-border/50 hover:bg-muted/20">
                          <td className="px-4 py-2.5">
                            <p className="font-medium text-foreground">{nomEtudiant(etu)}</p>
                            {etu?.username && <p className="text-xs text-muted-foreground font-mono">@{etu.username}</p>}
                          </td>
                          <td className="px-4 py-2.5 text-muted-foreground text-xs">{dev?.titre || '-'}</td>
                          <td className="px-4 py-2.5 text-muted-foreground text-xs">
                            {(soum as any).dateSoumission
                              ? new Date((soum as any).dateSoumission).toLocaleDateString('fr-FR')
                              : '-'}
                          </td>
                          <td className="px-4 py-2.5">
                            <div className="flex gap-2 justify-end">
                              <Button size="sm" variant="outline" className="h-7 text-xs px-3" onClick={() => setViewSoumission(soum)}>
                                Voir
                              </Button>
                              <Button
                                size="sm"
                                className="h-7 text-xs px-3"
                                onClick={() => {
                                  setCorrectionSoumId(soum.id)
                                  setCorrectionNote('')
                                  setCorrectionComment(soum.commentaire || '')
                                }}
                              >
                                Corriger
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* ═══════════════════ ONGLET INSCRIPTIONS ═══════════════════ */}
      {tab === 'inscriptions' && (
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-display font-bold text-foreground">Inscriptions en attente</h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Étudiants ayant rejoint via un code d'accès. Tant qu'une inscription n'est pas validée, l'étudiant ne peut pas se connecter.
            </p>
          </div>

          {inscriptionsEnAttente.length === 0 ? (
            <Card className="border-border">
              <CardContent className="py-8 flex flex-col items-center gap-2 text-center">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
                <p className="text-sm font-medium text-foreground">Aucune inscription en attente</p>
                <p className="text-xs text-muted-foreground max-w-sm">
                  Les étudiants qui rejoindront une classe avec un code d'accès apparaîtront ici pour être validés.
                </p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Étudiant</th>
                      <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Classe</th>
                      <th className="text-left px-4 py-2.5 font-medium text-muted-foreground">Université</th>
                      <th className="text-right px-4 py-2.5 font-medium text-muted-foreground">Décision</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inscriptionsEnAttente.map(u => {
                      const uni = universites.find(x => x.id === (u as any).universiteId)
                      const nomComplet = `${u.prenom || ''} ${u.nom}`.trim()
                      return (
                        <tr key={u.id} className="border-t border-border/50 hover:bg-muted/20">
                          <td className="px-4 py-2.5">
                            <p className="font-medium text-foreground">{nomComplet}</p>
                            <p className="text-xs text-muted-foreground font-mono">@{u.username}</p>
                          </td>
                          <td className="px-4 py-2.5 text-muted-foreground text-xs">{(u as any).classe || '-'}</td>
                          <td className="px-4 py-2.5 text-muted-foreground text-xs">{uni ? uni.nom : '-'}</td>
                          <td className="px-4 py-2.5">
                            <div className="flex gap-2 justify-end">
                              <Button size="sm" className="h-7 text-xs px-3" onClick={() => validerInscription(u.id, nomComplet)}>
                                Valider
                              </Button>
                              <Button size="sm" variant="outline" className="h-7 text-xs px-3 text-destructive hover:text-destructive" onClick={() => refuserInscription(u.id, nomComplet)}>
                                Refuser
                              </Button>
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </Card>
          )}
        </div>
      )}


      {/* ═══════════════════ MODALE DEVOIR (modification) ═══════════════════ */}
      <Dialog open={!!devoirEdite} onOpenChange={o => !o && setDevoirEdite(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Modifier le devoir</DialogTitle>
          </DialogHeader>
          {devoirEdite && (
            <div className="space-y-3">
              <div className="space-y-1">
                <Label htmlFor="devoir-titre">Intitulé</Label>
                <Input id="devoir-titre" value={devoirEdite.titre} onChange={e => setDevoirEdite({ ...devoirEdite, titre: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="devoir-consignes">Consignes</Label>
                <Textarea id="devoir-consignes" rows={3} value={devoirEdite.consignes} onChange={e => setDevoirEdite({ ...devoirEdite, consignes: e.target.value })} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="devoir-date">Date limite</Label>
                <Input id="devoir-date" type="date" value={devoirEdite.dateLimit} onChange={e => setDevoirEdite({ ...devoirEdite, dateLimit: e.target.value })} />
              </div>
              <div className="flex items-center gap-2">
                <Switch id="devoir-actif" checked={devoirEdite.actif} onCheckedChange={v => setDevoirEdite({ ...devoirEdite, actif: v })} />
                <Label htmlFor="devoir-actif">Visible par les étudiants</Label>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setDevoirEdite(null)}>Annuler</Button>
            <Button onClick={handleSaveDevoirEdite} disabled={devoirEnregistrement || !devoirEdite?.titre.trim() || !devoirEdite?.dateLimit}>
              {devoirEnregistrement ? 'Enregistrement…' : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══ Confirm delete devoir ═══ */}
      <AlertDialog open={!!deleteDevoirId} onOpenChange={o => !o && setDeleteDevoirId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce devoir ?</AlertDialogTitle>
            <AlertDialogDescription>Les copies rendues sur ce devoir seront supprimées avec lui.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteDevoir} className="bg-destructive text-destructive-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ═══ Modale correction ═══ */}
      <Dialog open={!!correctionSoumId} onOpenChange={o => !o && setCorrectionSoumId(null)}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Corriger la soumission</DialogTitle>
          </DialogHeader>
          {(() => {
            const { dev, bareme, partieQCM, saisieMax } = correctionContexte()
            const saisie = parseFloat(correctionNote.replace(',', '.'))
            return (
          <div className="space-y-3">
            {dev && <p className="text-xs text-muted-foreground">{dev.titre} · noté sur {bareme}</p>}
            {partieQCM !== null && (
              <p className="text-xs rounded-md bg-muted/50 px-3 py-2">
                Partie QCM déjà calculée : <strong>{formaterNote(partieQCM, 10)}</strong>. Notez les cas pratiques sur 10 ; la note finale est leur somme, sur 20.
              </p>
            )}
            <div>
              <Label>{partieQCM !== null ? 'Note des cas pratiques' : 'Note'} (0 à {saisieMax}) *</Label>
              <Input type="number" min="0" max={saisieMax} step="0.5" value={correctionNote} onChange={e => setCorrectionNote(e.target.value)} placeholder={`Ex : ${Math.round(saisieMax * 0.7)}`} className="mt-1" />
              {partieQCM !== null && !isNaN(saisie) && saisie >= 0 && saisie <= saisieMax && (
                <p className="text-xs text-muted-foreground mt-1">Note finale : {formaterNote(partieQCM + saisie, bareme)}</p>
              )}
            </div>
            <div>
              <Label>Commentaire</Label>
              <textarea
                value={correctionComment}
                onChange={e => setCorrectionComment(e.target.value)}
                placeholder="Feedback pour l'étudiant..."
                rows={3}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
          </div>
            )
          })()}
          <DialogFooter className="mt-4">
            <Button variant="outline" onClick={() => setCorrectionSoumId(null)}>Annuler</Button>
            <Button onClick={handleCorrigerSoumission}>Enregistrer la note</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══ Modale voir soumission ═══ */}
      <Dialog open={!!viewSoumission} onOpenChange={o => !o && setViewSoumission(null)}>
        <DialogContent className="max-w-lg flex flex-col max-h-[90vh]">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>Détails de la soumission</DialogTitle>
          </DialogHeader>
          {viewSoumission && (() => {
            const etu = users.find(u => u.id === viewSoumission.etudiantId)
            const dev = devoirsList.find(d => d.id === viewSoumission.devoirId)
            const devType = (dev as any)?.type || 'pratique'
            return (
              <div className="flex-1 overflow-y-auto pr-1 space-y-4 text-sm">
                {/* Infos */}
                <div className="grid grid-cols-2 gap-2">
                  <div><p className="text-xs text-muted-foreground">Étudiant</p><p className="font-medium">{nomEtudiant(etu)}</p></div>
                  <div><p className="text-xs text-muted-foreground">Devoir</p><p className="font-medium">{dev?.titre || '-'}</p></div>
                  <div><p className="text-xs text-muted-foreground">Type</p><p className="capitalize">{devType}</p></div>
                  <div><p className="text-xs text-muted-foreground">Soumis le</p><p>{new Date(viewSoumission.dateSoumission).toLocaleDateString('fr-FR')}</p></div>
                </div>

                {/* Réponse texte (théorique / mixte) */}
                {(devType === 'theorique' || devType === 'mixte') && (viewSoumission as any).reponseTexte && (
                  <div>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">Réponses de l'étudiant</p>
                    <div className="bg-muted/40 rounded-md p-3 max-h-48 overflow-y-auto">
                      <pre className="text-sm whitespace-pre-wrap font-sans">{(viewSoumission as any).reponseTexte}</pre>
                    </div>
                  </div>
                )}

                {/* Journal comptable soumis (pratique / mixte) */}
                {(devType === 'pratique' || devType === 'mixte') && viewSoumission.sessionId && (
                  <JournalSoumission
                    sessionId={viewSoumission.sessionId}
                    etudiantId={viewSoumission.etudiantId}
                  />
                )}

                {/* QCM de chapitre : score obtenu */}
                {devType === 'qcm_chapitre' && typeof viewSoumission.scoreQCMChapitre === 'number' && (
                  <p className="text-xs text-muted-foreground">
                    Bonnes réponses : <strong className="text-foreground">{viewSoumission.scoreQCMChapitre}/{dev?.questionsChapitre?.length ?? '?'}</strong>
                  </p>
                )}

                {/* QCM + cas pratiques : partie QCM et réponses aux cas, avec le corrigé type */}
                {devType === 'qcm_cas' && (
                  <div className="space-y-3">
                    {typeof viewSoumission.scoreQCMCas === 'number' && (
                      <p className="text-xs text-muted-foreground">
                        Partie QCM : <strong className="text-foreground">{formaterNote(viewSoumission.scoreQCMCas, 10)}</strong>
                        {typeof viewSoumission.scoreCasPratiques === 'number' && <> · Cas pratiques : <strong className="text-foreground">{formaterNote(viewSoumission.scoreCasPratiques, 10)}</strong></>}
                      </p>
                    )}
                    {(dev?.casPratiques || []).map(cas => (
                      <div key={cas.id} className="rounded-md border border-border p-3 space-y-2">
                        <p className="text-xs font-semibold text-foreground">{cas.titre} <span className="font-normal text-muted-foreground">({cas.pointsMax} pts)</span></p>
                        <div>
                          <p className="text-xs text-muted-foreground mb-1">Réponse de l'étudiant</p>
                          <pre className="text-sm whitespace-pre-wrap font-sans bg-muted/40 rounded p-2 max-h-40 overflow-y-auto">{viewSoumission.reponsesCasPratiques?.[cas.id] || '(aucune réponse)'}</pre>
                        </div>
                        <details className="text-xs">
                          <summary className="cursor-pointer text-primary">Corrigé type</summary>
                          <pre className="mt-1 whitespace-pre-wrap font-sans text-muted-foreground">{cas.corrigeType}</pre>
                        </details>
                      </div>
                    ))}
                  </div>
                )}

                {/* Note existante */}
                {estNotee(viewSoumission) && (
                  <div className="bg-muted/40 rounded-md p-3">
                    <p className="text-xs text-muted-foreground mb-1">Note attribuée</p>
                    <p className={cn('text-2xl font-bold', viewSoumission.note! >= baremeDevoir(dev) / 2 ? 'text-green-600' : 'text-red-500')}>{formaterNote(viewSoumission.note!, baremeDevoir(dev))}</p>
                    {viewSoumission.commentaire && <p className="text-xs mt-2 text-foreground">{viewSoumission.commentaire}</p>}
                  </div>
                )}
              </div>
            )
          })()}
          <DialogFooter className="flex-shrink-0 pt-2 border-t border-border">
            {viewSoumission && estACorriger(viewSoumission) && (
              <Button
                size="sm"
                variant="default"
                onClick={() => {
                  setCorrectionSoumId(viewSoumission.id)
                  setCorrectionNote('')
                  setCorrectionComment('')
                  setViewSoumission(null)
                }}
              >
                Corriger et noter
              </Button>
            )}
            <Button variant="outline" onClick={() => setViewSoumission(null)}>Fermer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════ MODALE UTILISATEUR ═══════════════════ */}
      <Dialog open={showUserForm} onOpenChange={setShowUserForm}>
        <DialogContent className="max-w-md flex flex-col max-h-[90vh]">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>{editUserId ? 'Modifier l\'utilisateur' : 'Nouvel utilisateur'}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-1 space-y-3">
            {/* Ordre et libellés selon le rôle */}
            {userForm.role === 'etudiant' ? (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Nom *</Label>
                  <Input value={userForm.nom} onChange={e => setUserForm(f => ({ ...f, nom: e.target.value }))} className="mt-1" />
                </div>
                <div>
                  <Label>Post-nom</Label>
                  <Input value={userForm.prenom} onChange={e => setUserForm(f => ({ ...f, prenom: e.target.value }))} className="mt-1" />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Prénom</Label>
                  <Input value={userForm.prenom} onChange={e => setUserForm(f => ({ ...f, prenom: e.target.value }))} className="mt-1" />
                </div>
                <div>
                  <Label>Nom *</Label>
                  <Input value={userForm.nom} onChange={e => setUserForm(f => ({ ...f, nom: e.target.value }))} className="mt-1" />
                </div>
              </div>
            )}
            <div>
              <Label>Nom d'utilisateur *</Label>
              <Input value={userForm.username} onChange={e => setUserForm(f => ({ ...f, username: e.target.value }))} placeholder="" className="mt-1" />
            </div>
            {editUserId ? (
              // Le mot de passe d'un compte existant est géré par Firebase
              // Authentication : il n'est ni stocké ni modifiable ici. Chacun le
              // change lui-même (bouton clé, à côté de la déconnexion).
              <p className="text-xs text-muted-foreground rounded-md bg-muted/40 p-2">
                Mot de passe : l'utilisateur le change lui-même avec le bouton « Changer mon mot de passe », à côté de la déconnexion. En cas d'oubli, réinitialisez-le depuis la console Firebase (Authentication).
              </p>
            ) : (
              <div>
                <Label>Mot de passe *</Label>
                <PasswordInput value={userForm.password} onChange={e => setUserForm(f => ({ ...f, password: e.target.value }))} className="mt-1" />
              </div>
            )}

            {/* Rôle : visible uniquement pour les membres du staff (pas étudiant) */}
            {(userForm.role === 'professeur' || userForm.role === 'assistant') && (
              <div>
                <Label>Rôle *</Label>
                <Select
                  value={userForm.role}
                  onValueChange={v => setUserForm(f => ({ ...f, role: v as UserRole }))}
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="Choisir un rôle" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="professeur">Professeur</SelectItem>
                    <SelectItem value="assistant">Assistant</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Équipe pédagogique : l'assistant partage la classe de son titulaire */}
            {userForm.role === 'assistant' && isAdmin && (
              <div>
                <Label>Professeur titulaire</Label>
                <Select value={userForm.titulaireId || '__none__'} onValueChange={v => setUserForm(f => ({ ...f, titulaireId: v === '__none__' ? '' : v }))}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Aucun" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">- Aucun (assistant indépendant) -</SelectItem>
                    {users.filter(u => u.role === 'professeur' && u.id !== editUserId).map(u => (
                      <SelectItem key={u.id} value={u.id}>{u.prenom} {u.nom}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground mt-1">
                  Le titulaire et ses assistants gèrent ensemble la même classe : étudiants, devoirs, présences et corrections.
                </p>
              </div>
            )}

            {/* Université + Faculté pour profs/assistants */}
            {(userForm.role === 'professeur' || userForm.role === 'assistant') && (
              <>
                <div>
                  <Label>Université rattachée</Label>
                  <Select value={userForm.universiteId || '__none__'} onValueChange={v => setUserForm(f => ({ ...f, universiteId: v === '__none__' ? '' : v, faculteId: '' } as any))}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Sans université" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">- Aucune -</SelectItem>
                      {universites.map(u => <SelectItem key={u.id} value={u.id}>{u.nom}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                {userForm.universiteId && facultesList.filter(f => f.universiteId === userForm.universiteId && f.actif).length > 0 && (
                  <div>
                    <Label>Faculté de rattachement</Label>
                    <Select value={(userForm as any).faculteId || '__none__'} onValueChange={v => setUserForm(f => ({ ...f, faculteId: v === '__none__' ? '' : v } as any))}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Sélectionner une faculté" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">- Aucune -</SelectItem>
                        {facultesList.filter(f => f.universiteId === userForm.universiteId && f.actif).map(f => (
                          <SelectItem key={f.id} value={f.id}>{f.nom}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div>
                  <Label>Téléphone</Label>
                  <Input value={userForm.telephone} onChange={e => setUserForm(f => ({ ...f, telephone: e.target.value }))} placeholder="+243..." className="mt-1" />
                </div>
              </>
            )}
            {/* Champs étudiants */}
            {userForm.role === 'etudiant' && (
              <>
                <div>
                  <Label>Université</Label>
                  <Select value={userForm.universiteId || '__none__'} onValueChange={v => setUserForm(f => ({ ...f, universiteId: v === '__none__' ? '' : v, faculteId: '' } as any))}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Sans université" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">Sans université (indépendant)</SelectItem>
                      {universites.map(u => <SelectItem key={u.id} value={u.id}>{u.nom}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                {userForm.universiteId && facultesList.filter(f => f.universiteId === userForm.universiteId && f.actif).length > 0 && (
                  <div>
                    <Label>Faculté</Label>
                    {/* Changer de faculté reporte les inscriptions sur les cours de la
                        nouvelle faculté (même UE) : chaque faculté a les siens. */}
                    <Select value={(userForm as any).faculteId || '__none__'} onValueChange={v => setUserForm(f => ({ ...f, faculteId: v === '__none__' ? '' : v, coursIds: v === '__none__' ? f.coursIds : inscriptionsDeLaFaculte(f.coursIds, v, coursList) } as any))}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Sélectionner une faculté" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">- Aucune faculté -</SelectItem>
                        {facultesList.filter(f => f.universiteId === userForm.universiteId && f.actif).map(f => (
                          <SelectItem key={f.id} value={f.id}>{f.nom}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label>Promotion</Label>
                    {/* Liste fermée, comme à l'inscription par code ou par lot : les
                        devoirs, notes de cours et documents ciblent L1…M2, et un
                        texte libre (« L1 Comptabilité ») ne leur correspondait pas. */}
                    <Select value={userForm.classe || '__none__'} onValueChange={v => setUserForm(f => ({ ...f, classe: v === '__none__' ? '' : v }))}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Choisir" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">Non renseignée</SelectItem>
                        {PROMOTIONS.map(p => <SelectItem key={p} value={p}>{p}</SelectItem>)}
                        {userForm.classe && !(PROMOTIONS as readonly string[]).includes(userForm.classe) && (
                          <SelectItem value={userForm.classe}>{userForm.classe} (ancienne saisie)</SelectItem>
                        )}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label>Téléphone</Label>
                    <Input value={userForm.telephone} onChange={e => setUserForm(f => ({ ...f, telephone: e.target.value }))} placeholder="+243..." className="mt-1" />
                  </div>
                </div>
                {/* Cours : multi-sélection, parmi les cours de la faculté de
                    l'étudiant. La liste dédupliquée par UE proposait parfois le
                    cours d'une autre faculté : l'étudiant ne voyait alors ni les
                    devoirs ni les notes de son enseignant. */}
                {coursList.filter(c => c.actif).length > 0 && (
                  <div>
                    <Label>Cours inscrits</Label>
                    {!(userForm as any).faculteId && (
                      <p className="text-xs text-muted-foreground mt-1">Sans faculté : tous les cours sont proposés, avec leur faculté. Choisissez la faculté pour ne voir que les siens.</p>
                    )}
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {getCoursTries((userForm as any).faculteId ? coursList.filter(c => c.faculteId === (userForm as any).faculteId) : coursList).map(c => {
                        const ids = (userForm as any).coursIds || []
                        const selected = ids.includes(c.id)
                        return (
                          <button
                            key={c.id}
                            type="button"
                            onClick={() => toggleCoursInList(c.id, ids, newIds => setUserForm(f => ({ ...f, coursIds: newIds } as any)))}
                            className={`text-xs px-3 py-1.5 rounded-full border font-medium transition-colors ${
                              selected
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'bg-background text-foreground border-border hover:border-primary/60'
                            }`}
                          >
                            {selected ? '✓ ' : ''}{(userForm as any).faculteId ? c.nom : libelleCours(c)}
                          </button>
                        )
                      })}
                    </div>
                  </div>
                )}
              </>
            )}
            <div className="flex items-center gap-2">
              <Switch checked={userForm.actif} onCheckedChange={v => setUserForm(f => ({ ...f, actif: v }))} />
              <Label>Compte actif</Label>
            </div>
          </div>
          <DialogFooter className="flex-shrink-0 pt-2 border-t border-border">
            <Button variant="outline" onClick={() => setShowUserForm(false)}>Annuler</Button>
            <Button onClick={handleSaveUser} disabled={!userForm.username.trim() || !userForm.nom.trim() || (!editUserId && !userForm.password.trim())}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════ MODALE UNIVERSITÉ ═══════════════════ */}
      <Dialog open={showUniForm} onOpenChange={setShowUniForm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editUniId ? 'Modifier l\'université' : 'Nouvelle université'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Nom de l'université *</Label>
              <Input value={uniForm.nom} onChange={e => setUniForm(f => ({ ...f, nom: e.target.value }))} placeholder="ex: Université de Kinshasa=" className="mt-1" />
            </div>
            <div>
              <Label>Ville</Label>
              <Input value={uniForm.ville} onChange={e => setUniForm(f => ({ ...f, ville: e.target.value }))} placeholder="ex: Kinshasa, RDC=" className="mt-1" />
            </div>
            <div>
              <Label>Adresse</Label>
              <Input value={uniForm.adresse} onChange={e => setUniForm(f => ({ ...f, adresse: e.target.value }))} className="mt-1" />
            </div>
            {/* Facultés : uniquement à la création */}
            {!editUniId && (
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <Label>Facultés</Label>
                  <button
                    type="button"
                    className="text-xs text-primary hover:underline font-medium"
                    onClick={() => setUniForm(f => ({ ...f, facultes: [...(f as any).facultes, ''] } as any))}
                  >
                    + Ajouter une faculté
                  </button>
                </div>
                {((uniForm as any).facultes as string[]).length === 0 && (
                  <p className="text-xs text-muted-foreground italic">Aucune faculté : vous pourrez en ajouter plus tard.</p>
                )}
                <div className="space-y-2">
                  {((uniForm as any).facultes as string[]).map((nom: string, i: number) => (
                    <div key={i} className="flex items-center gap-2">
                      <Input
                        value={nom}
                        onChange={e => setUniForm(f => {
                          const facs = [...(f as any).facultes as string[]]
                          facs[i] = e.target.value
                          return { ...f, facultes: facs } as any
                        })}
                        placeholder={`ex: Faculté des Sciences Éco.`}
                        className="text-sm h-8"
                      />
                      <button
                        type="button"
                        className="text-muted-foreground hover:text-destructive shrink-0"
                        onClick={() => setUniForm(f => {
                          const facs = ((f as any).facultes as string[]).filter((_: string, j: number) => j !== i)
                          return { ...f, facultes: facs } as any
                        })}
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowUniForm(false)}>Annuler</Button>
            <Button onClick={handleSaveUni} disabled={!uniForm.nom.trim()}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══════════════════ CONFIRM DELETE UTILISATEUR ═══════════════════ */}
      <AlertDialog open={!!deleteUserId} onOpenChange={o => !o && setDeleteUserId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'utilisateur ?</AlertDialogTitle>
            <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUser} className="bg-destructive text-destructive-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ═══════════════════ CONFIRM DELETE UNIVERSITÉ ═══════════════════ */}
      <AlertDialog open={!!deleteUniId} onOpenChange={o => !o && setDeleteUniId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'université ?</AlertDialogTitle>
            <AlertDialogDescription>Les étudiants associés deviendront indépendants.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteUni} className="bg-destructive text-destructive-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ═══════════════════ MODALE COURS (édition uniquement - l'affectation
          des UE aux facultés est automatique, voir provisionCoursManquantsAsync) ═══ */}
      <Dialog open={showCoursForm} onOpenChange={setShowCoursForm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>Modifier le cours</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Promotion</Label>
              <Select value={coursForm.promotion || '__none__'} onValueChange={v => setCoursForm(f => ({ ...f, promotion: v === '__none__' ? '' : v }))}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Sélectionner une promotion" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">- Toutes promotions -</SelectItem>
                  {(['L1', 'L2', 'L3', 'M1', 'M2'] as const).map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Cours</Label>
              <Input value={coursForm.nom} onChange={e => setCoursForm(f => ({ ...f, nom: e.target.value }))} className="mt-1" />
            </div>
            {coursForm.description && (
              <p className="text-xs text-muted-foreground -mt-1">{coursForm.description}</p>
            )}
            <div className="flex items-center gap-2">
              <Switch checked={coursForm.actif} onCheckedChange={v => setCoursForm(f => ({ ...f, actif: v }))} />
              <Label>Cours actif</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCoursForm(false)}>Annuler</Button>
            <Button onClick={handleSaveCours} disabled={!coursForm.nom.trim()}>
              Enregistrer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Confirm delete cours */}
      <AlertDialog open={!!deleteCoursId} onOpenChange={o => !o && setDeleteCoursId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce cours ?</AlertDialogTitle>
            <AlertDialogDescription>Les étudiants inscrits à ce cours perdront leur accès.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteCours} className="bg-destructive text-destructive-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* ═══ Modale Créer / Modifier Faculté ═══ */}
      <Dialog open={showFaculteForm} onOpenChange={setShowFaculteForm}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{editFaculteId ? 'Modifier la faculté' : 'Nouvelle faculté'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Nom de la faculté *</Label>
              <Input
                value={faculteForm.nom}
                onChange={e => setFaculteForm(f => ({ ...f, nom: e.target.value }))}
                placeholder="ex: Faculté des Sciences Économiques"
                className="mt-1"
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                value={faculteForm.description}
                onChange={e => setFaculteForm(f => ({ ...f, description: e.target.value }))}
                placeholder="Description optionnelle="
                className="mt-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={faculteForm.actif} onCheckedChange={v => setFaculteForm(f => ({ ...f, actif: v }))} />
              <Label>Faculté active</Label>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowFaculteForm(false)}>Annuler</Button>
            <Button onClick={handleSaveFaculte} disabled={!faculteForm.nom.trim()}>Enregistrer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══ Confirm delete faculté ═══ */}
      <AlertDialog open={!!deleteFaculteId} onOpenChange={o => !o && setDeleteFaculteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer cette faculté ?</AlertDialogTitle>
            <AlertDialogDescription>Tous les cours de cette faculté seront aussi supprimés.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteFaculte} className="bg-destructive text-destructive-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
