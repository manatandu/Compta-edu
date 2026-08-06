import { useUser } from '@/lib/userContext'
import { isAdminRole, isStaffRole } from '@/lib/permissions'
import React, { useState, useEffect } from 'react'
import { useLocation } from 'wouter'
import BackButton from '@/components/BackButton'
import PasswordInput from '@/components/PasswordInput'
import {
  getCurrentUser, isDevoirExpire,
  BAREME_DEFAUT,
  User, UserRole, Universite, Faculte, LigneSolution, Cours, Devoir, Soumission, QCMQuestion, QCMOption, NoteCours
} from '@/lib/db'
import {
  createUserAsync, updateUserAsync, deleteUserAsync, onUsersSnapshot,
  uploadDevoirPDF, deleteDevoirPDF, uploadExercicePDF, uploadNoteCoursFile,
  getUniversitesAsync, saveUniversiteAsync, updateUniversiteAsync, deleteUniversiteAsync,
  getFacultesAsync, createFaculteAsync, updateFaculteAsync, deleteFaculteAsync,
  getCoursAsync, createCoursAsync, updateCoursAsync, deleteCoursAsync,
  getDevoirsAsync, createDevoirAsync, updateDevoirAsync, deleteDevoirAsync,
  getSoumissionsAsync, corrigerSoumissionAsync, getEcrituresAsync,
  createExerciceAsync, updateExerciceAsync, deleteExerciceAsync,
  createPresenceAsync, updatePresenceAsync, deletePresenceAsync,
  createNoteCoursAsync, updateNoteCoursAsync, deleteNoteCoursAsync,
  setCoursStatutAsync, onCoursStatutsParCreateur, COURS_SYSTEME
} from '@/lib/db-firebase'
import type { CoursEtudiantStatut } from '@/lib/db'
import {
  useUniversites, useFacultes, useAllFacultes, useAllCours, useDevoirs, useSoumissions, useAllSoumissions,
  useExercices, useTentatives, usePresences, useAllNotesCours
} from '@/lib/useFirestore'
import { generateId } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Switch } from '@/components/ui/switch'
import {
  Plus, Pencil, Trash2, Users, Building2, GraduationCap, BarChart2,
  ChevronDown, ChevronRight, UserPlus, MapPin, Phone, BookOpen, X, ShieldCheck, LibraryBig,
  Paperclip, FileDown, FileText, CalendarCheck, Award, Check, Minus, TrendingDown, Clock, Download,
  Lock, CheckCheck, Unlock, KeyRound, Eye, EyeOff, RefreshCw, Search
} from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'

// ─── Helpers globaux ────────────────────────────────────
const PAGE_SIZE_PROF = 20

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

/** IDs des cours système désactivés (à exclure des selects) */
const COURS_SYSTEME_INACTIFS_IDS = new Set(COURS_SYSTEME.filter(c => !c.actif).map(c => c.id))

/**
 * Retourne une liste dédupliquée de cours actifs, sans doublons de cours système.
 * - Exclut les cours non actifs
 * - Exclut les cours liés à un cours système inactif (Ratios, VAN/TIR, etc.)
 * - Déduplique : un seul cours par coursSystemeId (premier trouvé)
 */
const getCoursUniques = (liste: any[]): any[] => {
  const seen = new Set<string>()
  return liste.filter(c => {
    if (!c.actif) return false
    if (COURS_SYSTEME_INACTIFS_IDS.has(c.id)) return false
    if (c.coursSystemeId && COURS_SYSTEME_INACTIFS_IDS.has(c.coursSystemeId)) return false
    const key = c.coursSystemeId || c.id
    if (seen.has(key)) return false
    seen.add(key)
    return true
  })
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
}

const emptyUniForm = { nom: '', ville: '', adresse: '', facultes: [] as string[] }

// ─── Tabs ─────────────────────────────────────────────────
type Tab = 'cours' | 'universites' | 'staff' | 'progression' | 'presences' | 'cotes' | 'notes'

const TABS: { id: Tab; label: string; icon: React.ReactNode; adminOnly?: boolean }[] = [
  { id: 'cours',        label: 'Cours',        icon: <LibraryBig className="h-4 w-4" />, adminOnly: true },
  { id: 'universites',  label: 'Universités',  icon: <Building2 className="h-4 w-4" />, adminOnly: true },
  { id: 'staff',        label: 'Prof / Assistants', icon: <GraduationCap className="h-4 w-4" />, adminOnly: true },
  { id: 'progression',  label: 'Progression',  icon: <BarChart2 className="h-4 w-4" /> },
  { id: 'presences',    label: 'Présences',    icon: <CalendarCheck className="h-4 w-4" /> },
  { id: 'cotes',        label: 'Cotes',        icon: <Award className="h-4 w-4" /> },
]

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
  const inscrits = etudiants.filter(e => resolveCoursIds(e).includes(dev.coursId))
  const expire = isDevoirExpire(dev)
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
                        <p className="font-medium text-sm">{etu.prenom} {etu.nom}</p>
                        <p className="text-xs text-muted-foreground font-mono">@{etu.username}</p>
                      </td>
                      <td className="px-3 py-2 text-center">
                        {!soum ? (
                          <Badge variant="outline" className="text-xs border-gray-400 text-gray-500">À faire</Badge>
                        ) : soum.statut === 'soumis' ? (
                          <Badge variant="outline" className="text-xs border-blue-400 text-blue-600">Soumis</Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs border-green-400 text-green-600">Noté</Badge>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        {soum?.statut === 'note' ? (
                          <span className={cn('font-bold text-sm', soum.note! >= 5 ? 'text-green-600' : 'text-red-500')}>{soum.note}/10</span>
                        ) : (
                          <span className="text-muted-foreground text-xs">—</span>
                        )}
                      </td>
                      <td className="px-3 py-2 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {soum && (
                            <Button variant="outline" size="sm" className="h-6 text-xs px-2" onClick={() => setViewSoumission(soum)}>Voir</Button>
                          )}
                          {soum?.statut === 'soumis' && (
                            <Button size="sm" className="h-6 text-xs px-2" onClick={() => { setCorrectionSoumId(soum.id); setCorrectionNote(String(soum.note || '')); setCorrectionComment(soum.commentaire || '') }}>Corriger</Button>
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
  const isStaff = isStaffRole(currentUser)

  const [, navigate] = useLocation()
  const [tab, setTab] = useState<Tab>('cours')
  const [users, setUsers] = useState<User[]>([])
  const { universites } = useUniversites()
  const { facultes: facultesList } = useAllFacultes()
  const { cours: coursList } = useAllCours()

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

  // ── Formulaire Créer Étudiant (onglet dédié) ──
  const [creerForm, setCreerForm] = useState({
    username: '', password: '', nom: '', prenom: '',
    universiteId: '', faculteId: '', classe: '', telephone: '', actif: true, coursIds: [] as string[]
  })
  const [creerError, setCreerError] = useState('')
  const [creerSuccess, setCreerSuccess] = useState(false)

  // ── Import CSV ──
  const [csvMode, setCsvMode] = useState<'form' | 'csv' | 'code'>('form')
  const [csvFile, setCsvFile] = useState<File | null>(null)
  const [csvPreview, setCsvPreview] = useState<any[]>([])
  const [csvError, setCsvError] = useState('')
  const [csvImporting, setCsvImporting] = useState(false)
  const [csvResult, setCsvResult] = useState<{ success: number; errors: string[] } | null>(null)

  // ── Code d'accès (Option B) ──
  const [codeAccesForm, setCodeAccesForm] = useState({ universiteId: '', faculteId: '', coursIds: [] as string[], classe: '' })
  const [showMdpId, setShowMdpId] = useState<string | null>(null)
  const [resetMdpVal, setResetMdpVal] = useState('')
  const [generatedCode, setGeneratedCode] = useState('')
  const [codeAccesError, setCodeAccesError] = useState('')
  const [codeCopied, setCodeCopied] = useState(false)

  // Modales utilisateurs
  const [showUserForm, setShowUserForm] = useState(false)
  const [editUserId, setEditUserId] = useState<string | null>(null)
  const [deleteUserId, setDeleteUserId] = useState<string | null>(null)
  const [userForm, setUserForm] = useState(emptyUserForm)

  // Modales universités
  const [showUniForm, setShowUniForm] = useState(false)
  // ── Devoirs ──
  const { devoirs: devoirsList } = useDevoirs(currentUser?.id)
  const [showDevoirForm, setShowDevoirForm] = useState(false)
  const [editDevoirId, setEditDevoirId] = useState<string | null>(null)
  const [deleteDevoirId, setDeleteDevoirId] = useState<string | null>(null)
  const [devoirForm, setDevoirForm] = useState({ titre: '', consignes: '', coursId: '', universiteId: '', faculteId: '', dateLimit: '', actif: true, type: 'pratique' as 'pratique'|'theorique'|'mixte'|'qcm', pdfData: '', pdfNom: '' })
  const [qcmQuestions, setQcmQuestions] = useState<{ id: string; texte: string; choix: string[]; bonneReponse: number; explication: string }[]>([])

  const addQcmQuestion = () => {
    setQcmQuestions(qs => [...qs, { id: Math.random().toString(36).slice(2), texte: '', choix: ['', '', '', ''], bonneReponse: 0, explication: '' }])
  }
  const removeQcmQuestion = (idx: number) => setQcmQuestions(qs => qs.filter((_, i) => i !== idx))
  const updateQcmQuestion = (idx: number, field: string, value: any) => setQcmQuestions(qs => qs.map((q, i) => i === idx ? { ...q, [field]: value } : q))
  const updateQcmChoix = (qIdx: number, cIdx: number, value: string) => setQcmQuestions(qs => qs.map((q, i) => i === qIdx ? { ...q, choix: q.choix.map((c, j) => j === cIdx ? value : c) } : q))
  const [pdfFile, setPdfFile] = useState<File | null>(null)
  const [pdfUploading, setPdfUploading] = useState(false)
  // ── Correction ──
  const [correctionSoumId, setCorrectionSoumId] = useState<string | null>(null)
  const [correctionNote, setCorrectionNote] = useState('')
  const [correctionComment, setCorrectionComment] = useState('')
  const [viewSoumission, setViewSoumission] = useState<Soumission | null>(null)
  const [editUniId, setEditUniId] = useState<string | null>(null)
  const [deleteUniId, setDeleteUniId] = useState<string | null>(null)
  const [uniForm, setUniForm] = useState(emptyUniForm)

  // Accordéons universités (onglet Étudiants) : ouverts par défaut
  const [openUnis, setOpenUnis] = useState<Set<string>>(new Set(['__indep__', '__all__']))
  const toggleUni = (id: string) => setOpenUnis(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
  })

  // Recherche accent-insensitive étudiants + pagination indépendants
  const [searchEtu, setSearchEtu] = useState('')
  const [pageIndep, setPageIndep] = useState(1)
  // Recherche GLOBALE onglet Étudiants
  const [searchGlobal, setSearchGlobal] = useState('')
  const [pageGlobal, setPageGlobal] = useState(1)
  // Nettoyage doublons onglet Cours
  const [confirmNettoyage, setConfirmNettoyage] = useState(false)
  const [nettoyageEnCours, setNettoyageEnCours] = useState(false)
  const [coursDoublonsIds, setCoursDoublonsIds] = useState<string[]>([])

  // Accordéons onglet Gestion Universités (tout ouvert par défaut)
  const [openUnisMgmt, setOpenUnisMgmt] = useState<Set<string>>(new Set(['__all__']))
  const [openFacsMgmt, setOpenFacsMgmt] = useState<Set<string>>(new Set(['__all__']))
  const toggleUniMgmt = (id: string) => setOpenUnisMgmt(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
  })
  const toggleFacMgmt = (id: string) => setOpenFacsMgmt(prev => {
    const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n
  })

  // Listener temps réel Firebase pour les utilisateurs
  useEffect(() => {
    const unsub = onUsersSnapshot((firebaseUsers) => {
      setUsers(firebaseUsers)
    })
    return () => unsub()
  }, [])

  const refresh = () => {
    // Tout se met à jour via les hooks Firestore temps réel - pas besoin de refresh manuel
  }

  // ── Devoirs ──
  const openCreateDevoir = () => {
    setEditDevoirId(null)
    setDevoirForm({ titre: '', consignes: '', coursId: '', universiteId: '', faculteId: '', dateLimit: '', actif: true, type: 'pratique', pdfData: '', pdfNom: '' })
    setQcmQuestions([])
    setPdfFile(null)
    setShowDevoirForm(true)
  }
  const openEditDevoir = (d: Devoir) => {
    setEditDevoirId(d.id)
    setDevoirForm({ titre: d.titre, consignes: d.consignes, coursId: d.coursId, universiteId: d.universiteId || '', faculteId: (d as any).faculteId || '', dateLimit: d.dateLimit.split('T')[0], actif: d.actif, type: (d as any).type || 'pratique', pdfData: (d as any).pdfUrl || (d as any).pdfData || '', pdfNom: (d as any).pdfNom || '' })
    setQcmQuestions((d as any).questions || [])
    setPdfFile(null)
    setShowDevoirForm(true)
  }
  const handleSaveDevoir = async () => {
    if (!devoirForm.titre.trim() || !devoirForm.coursId || !devoirForm.dateLimit) return
    setPdfUploading(true)
    try {
      // Générer l'ID du devoir d'abord (pour l'organiser dans Storage)
      const devoirId = editDevoirId || generateId()
      let pdfUrl = devoirForm.pdfData || undefined  // URL existante ou base64 legacy
      let pdfNom = devoirForm.pdfNom || undefined

      // Si un nouveau fichier est sélectionné → uploader vers Firebase Storage
      if (pdfFile) {
        pdfUrl = await uploadDevoirPDF(devoirId, pdfFile)
        pdfNom = pdfFile.name
      }

      const data = {
        titre: devoirForm.titre.trim(),
        consignes: devoirForm.consignes.trim(),
        coursId: devoirForm.coursId,
        universiteId: devoirForm.universiteId || undefined,
        faculteId: devoirForm.faculteId || undefined,
        dateLimit: new Date(devoirForm.dateLimit + 'T23:59:59').toISOString(),
        createdBy: currentUser?.id || '',
        actif: devoirForm.actif,
        type: devoirForm.type || 'pratique',
        questions: devoirForm.type === 'qcm' ? qcmQuestions : undefined,
        pdfUrl,
        pdfNom,
      }

      if (editDevoirId) {
        await updateDevoirAsync(editDevoirId, data)
      } else {
        // Créer avec l'ID qu'on a généré
        await createDevoirAsync({ ...data, id: devoirId } as any)
      }

      setShowDevoirForm(false)
      setPdfFile(null)
      toast({ title: editDevoirId ? 'Devoir modifié' : 'Devoir créé' })
    } catch (err: any) {
      toast({ title: 'Erreur upload PDF : ' + (err?.message || 'inconnue'), variant: 'destructive' })
    } finally {
      setPdfUploading(false)
    }
  }
  // ── Cours Statuts ──
  const [coursStatuts, setCoursStatuts] = useState<CoursEtudiantStatut[]>([])
  useEffect(() => {
    if (!currentUser?.id) return
    const unsub = onCoursStatutsParCreateur(currentUser.id, setCoursStatuts)
    return () => unsub()
  }, [currentUser?.id])

  const getStatutEtudiantCours = (etudiantId: string, coursId: string) =>
    coursStatuts.find(s => s.etudiantId === etudiantId && s.coursId === coursId)?.statut || null

  const handleSetCoursStatut = async (etudiantId: string, coursId: string, moduleKey: string, statut: 'actif' | 'termine' | 'verrouille') => {
    try {
      await setCoursStatutAsync(etudiantId, coursId, moduleKey, statut, currentUser?.id || '')
      toast({ title: statut === 'termine' ? 'Cours marqué comme terminé' : statut === 'actif' ? 'Cours activé' : 'Cours verrouillé' })
    } catch (e) {
      toast({ title: 'Erreur', description: String(e), variant: 'destructive' })
    }
  }

  // ── Toggle actif/suspendu ──
  const toggleActifUser = (userId: string, currentActif: boolean) => {
    updateUserAsync(userId, { actif: !currentActif }).then(() => {
      toast({ title: !currentActif ? 'Compte activé' : 'Compte suspendu', variant: !currentActif ? 'default' : 'destructive' })
    }).catch(() => toast({ title: 'Erreur lors de la mise à jour', variant: 'destructive' }))
  }

  const handleDeleteDevoir = () => {
    if (!deleteDevoirId) return
    deleteDevoirAsync(deleteDevoirId).then(() => {
      setDeleteDevoirId(null)
      toast({ title: 'Devoir supprimé', variant: 'destructive' })
    }).catch(() => toast({ title: 'Erreur lors de la suppression', variant: 'destructive' }))
  }
  const handleCorrigerSoumission = () => {
    if (!correctionSoumId) return
    const note = parseFloat(correctionNote)
    if (isNaN(note) || note < 0 || note > 20) {
      toast({ title: 'Note invalide (0-20)', variant: 'destructive' }); return
    }
    corrigerSoumissionAsync(correctionSoumId, note, correctionComment.trim()).then(() => {
      setCorrectionSoumId(null); setCorrectionNote(''); setCorrectionComment('')
      toast({ title: 'Correction enregistrée' })
    }).catch(() => toast({ title: 'Erreur lors de la correction', variant: 'destructive' }))
  }

  // ── Créer Étudiant (onglet dédié) ──
  const handleCreerEtudiant = () => {
    setCreerError('')
    setCreerSuccess(false)
    if (!creerForm.username.trim() || !creerForm.nom.trim() || !creerForm.password.trim()) {
      setCreerError('Nom, identifiant et mot de passe sont obligatoires.')
      return
    }
    // Vérification dans la liste Firestore (temps réel)
    const existing = users.find(u => u.username === creerForm.username.trim().toLowerCase())
    if (existing) { setCreerError("Ce nom d'utilisateur est déjà pris.="); return }
    // Création via Firebase (async)
    createUserAsync({
      username: creerForm.username.trim(),
      password: creerForm.password.trim(),
      nom: creerForm.nom.trim(),
      prenom: creerForm.prenom.trim(),
      faculteId: creerForm.faculteId || undefined,
      role: 'etudiant',
      actif: creerForm.actif,
      universiteId: creerForm.universiteId || undefined,
      classe: creerForm.classe.trim() || undefined,
      telephone: creerForm.telephone.trim() || undefined,
      coursIds: creerForm.coursIds.length > 0 ? creerForm.coursIds : undefined,
      createdBy: currentUser?.id || '',
    } as any).then(() => {
      setCreerSuccess(true)
      setCreerForm(f => ({ ...f, username: '', password: '', nom: '', prenom: '', classe: '', telephone: '' }))
      toast({ title: 'Étudiant créé avec succès' })
    }).catch((err: any) => {
      const msg = err?.message || err?.code || ''
      if (msg.includes('déjà utilisé') || msg.includes('already-in-use')) {
        setCreerError("Cet identifiant est déjà utilisé. Choisissez un autre.=")
      } else {
        setCreerError("Erreur lors de la création : " + (msg || 'inconnue'))
      }
    })
  }

  // ── Import CSV ──
  const parseCsvFile = (file: File) => {
    setCsvError('')
    setCsvResult(null)
    const reader = new FileReader()
    reader.onload = (e) => {
      const text = e.target?.result as string
      if (!text) { setCsvError('Fichier vide ou illisible.'); return }
      const lines = text.split(/\r?\n/).filter(l => l.trim())
      if (lines.length < 2) { setCsvError('Le fichier doit contenir au moins une ligne de données (en-tête + 1 étudiant).'); return }
      // Détecter séparateur (virgule ou point-virgule)
      const sep = lines[0].includes(';') ? ';' : ','
      const headers = lines[0].split(sep).map(h => h.trim().toLowerCase().replace(/[^a-z]/g, ''))
      const rows = lines.slice(1).map((line, idx) => {
        const cols = line.split(sep).map(c => c.trim().replace(/^"|"$/g, ''))
        const row: any = { _line: idx + 2 }
        headers.forEach((h, i) => { row[h] = cols[i] || '' })
        return row
      }).filter(r => r.nom || r.prenom || r.username)
      if (rows.length === 0) { setCsvError('Aucune ligne valide trouvée.'); return }
      setCsvPreview(rows)
    }
    reader.readAsText(file, 'UTF-8')
  }

  const handleCsvImport = async () => {
    if (csvPreview.length === 0) return
    setCsvImporting(true)
    setCsvResult(null)
    let success = 0
    const errors: string[] = []
    for (const row of csvPreview) {
      const nom = (row.nom || '').trim()
      const prenom = (row.prenom || '').trim()
      const username = (row.username || row.id || row.identifiant || '').trim().toLowerCase()
      const password = (row.motdepasse || row.password || row.mdp || 'campus2026').trim()
      const classe = (row.classe || '').trim()
      const telephone = (row.telephone || row.tel || '').trim()
      if (!nom || !username) {
        errors.push(`Ligne ${row._line} : Nom et Identifiant obligatoires.`)
        continue
      }
      const exists = users.find(u => u.username === username)
      if (exists) {
        errors.push(`Ligne ${row._line} : Identifiant "${username}" déjà utilisé.`)
        continue
      }
      try {
        await createUserAsync({
          username,
          password,
          nom,
          prenom,
          role: 'etudiant',
          actif: true,
          universiteId: creerForm.universiteId || undefined,
          faculteId: creerForm.faculteId || undefined,
          classe: classe || creerForm.classe || undefined,
          telephone: telephone || undefined,
          coursIds: creerForm.coursIds.length > 0 ? creerForm.coursIds : undefined,
          createdBy: currentUser?.id || '',
        } as any)
        success++
      } catch (err: any) {
        errors.push(`Ligne ${row._line} (${username}) : ${err?.message || 'Erreur inconnue'}`)
      }
    }
    setCsvImporting(false)
    setCsvResult({ success, errors })
    if (success > 0) toast({ title: `${success} étudiant${success > 1 ? 's' : ''} importé${success > 1 ? 's' : ''} avec succès` })
  }

  // ── Générer code d'accès ──
  const handleGenerateCode = async () => {
    setCodeAccesError('')
    setGeneratedCode('')
    // Université optionnelle : au moins un critère suffit
    // Générer un code lisible de 8 caractères
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'
    const code = Array.from({ length: 8 }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
    const codeData = {
      code,
      universiteId: codeAccesForm.universiteId,
      faculteId: codeAccesForm.faculteId || null,
      coursIds: codeAccesForm.coursIds.length > 0 ? codeAccesForm.coursIds : [],
      classe: codeAccesForm.classe || null,
      createdBy: currentUser?.id || '',
      createdAt: new Date().toISOString(),
      actif: true,
    }
    try {
      const { setDoc, doc, collection, getFirestore } = await import('firebase/firestore')
      const { getApp } = await import('firebase/app')
      const db2 = getFirestore(getApp())
      await setDoc(doc(collection(db2, 'codesAcces'), code), codeData)
      setGeneratedCode(code)
      toast({ title: 'Code généré avec succès' })
    } catch (err: any) {
      setCodeAccesError('Erreur lors de la sauvegarde : ' + (err?.message || 'inconnue'))
    }
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
      username: u.username, password: u.password, nom: u.nom, prenom: u.prenom || '',
      role: u.role, actif: u.actif,
      universiteId: (u as any).universiteId || '',
      faculteId: (u as any).faculteId || '',
      classe: (u as any).classe || '',
      telephone: (u as any).telephone || '',
      coursIds: (u as any).coursIds || [],
    })
    setShowUserForm(true)
  }

  const handleSaveUser = () => {
    if (!userForm.username.trim() || !userForm.nom.trim() || !userForm.password.trim()) return
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
    }
    if (editUserId) {
      updateUserAsync(editUserId, data).then(() => {
        refresh(); setShowUserForm(false)
        toast({ title: 'Utilisateur modifié' })
      }).catch(() => toast({ title: 'Erreur lors de la modification', variant: 'destructive' }))
    } else {
      createUserAsync({ ...data, createdBy: currentUser?.id || '' } as any).then(() => {
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

  const canEditUser = (u: User) => {
    if (!isStaff) return false
    if (isAdmin) return true
    return u.role === 'etudiant'
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
  const openCreateCours = (faculteId: string, universiteId: string) => {
    setEditCoursId(null)
    setCoursForm({ nom: '', description: '', faculteId, universiteId, promotion: '', actif: true, coursSystemeId: '' })
    setShowCoursForm(true)
  }
  const openEditCours = (c: Cours) => {
    setEditCoursId(c.id)
    setCoursForm({ nom: c.nom, description: c.description || '', faculteId: c.faculteId, universiteId: c.universiteId, promotion: c.promotion || '', actif: c.actif, coursSystemeId: (c as any).coursSystemeId || '' })
    setShowCoursForm(true)
  }
  const handleSaveCours = async () => {
    if (!coursForm.nom.trim()) return
    if (editCoursId) {
      await updateCoursAsync(editCoursId, { nom: coursForm.nom.trim(), description: coursForm.description.trim(), actif: coursForm.actif, promotion: coursForm.promotion || undefined })
    } else {
      // C7 : anti-doublon — vérifier si ce cours système est déjà assigné à cette faculté
      if (coursForm.coursSystemeId) {
        const doublon = coursList.some(
          c => (c as any).coursSystemeId === coursForm.coursSystemeId && c.faculteId === coursForm.faculteId
        )
        if (doublon) {
          toast({ title: 'Cours déjà assigné', description: 'Ce cours est déjà présent dans cette faculté.', variant: 'destructive' })
          return
        }
      }
      // adminId : la règle firestore.rules exige ce champ à la création
      // (hasAll(['adminId','createdBy'])) — repris de l'université choisie
      // (source de vérité de "qui possède ce cours") plutôt que de l'auteur
      // de l'action, car un professeur (pas seulement un admin) peut créer
      // un cours : son propre id ne serait pas un adminId valide.
      const uniAdminId = universites.find(u => u.id === coursForm.universiteId)?.adminId || currentUser?.id || ''
      await createCoursAsync({
        nom: coursForm.nom.trim(),
        description: coursForm.description.trim(),
        faculteId: coursForm.faculteId,
        universiteId: coursForm.universiteId,
        promotion: coursForm.promotion || undefined,
        actif: coursForm.actif,
        createdBy: currentUser?.id || '',
        adminId: uniAdminId,
        ...(coursForm.coursSystemeId ? { coursSystemeId: coursForm.coursSystemeId } : {})
      })
    }
    setShowCoursForm(false)
    toast({ title: editCoursId ? 'Cours modifié' : 'Cours créé' })
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

  // ── Exercices ──
  const emptyQCMOption = (): QCMOption => ({ id: generateId(), texte: '', correct: false })
  const emptyQCMQuestion = (): QCMQuestion => ({ id: generateId(), question: '', options: [emptyQCMOption(), emptyQCMOption(), emptyQCMOption(), emptyQCMOption()] })

  const emptyExForm = {
    titre: '', description: '', difficulte: 'Facile' as 'Facile'|'Moyen'|'Difficile',
    categorie: 'Journal comptable',
    contexte: '', questions: [''], explicationCorrige: '', actif: true,
    bareme: { compte: 40, sens: 30, montant: 20, equilibre: 10 },
    pdfData: '', pdfNom: '',  // legacy base64
    pdfUrl: '',               // nouveau : Firebase Storage URL
    coursId: '',              // isolation : cours lié
    faculteId: '',            // isolation : faculté
    universiteId: '',         // isolation : université
  }
  const emptyLigneSol = (): LigneSolution => ({ id: generateId(), numeroCompte: '', intitule: '', sens: 'D', montant: '' })

  const [exForm, setExForm] = useState(emptyExForm)
  const [exPdfFile, setExPdfFile] = useState<File | null>(null)
  const [exPdfUploading, setExPdfUploading] = useState(false)
  const [exSolution, setExSolution] = useState<LigneSolution[]>([emptyLigneSol(), emptyLigneSol()])
  const [exQCM, setExQCM] = useState<QCMQuestion[]>([])
  const [editExId, setEditExId] = useState<string | null>(null)
  const [deleteExId, setDeleteExId] = useState<string | null>(null)
  const [showExForm, setShowExForm] = useState(false)

  const openCreateEx = () => {
    setEditExId(null)
    setExForm(emptyExForm)
    setExPdfFile(null)
    setExSolution([emptyLigneSol(), emptyLigneSol()])
    setExQCM([])
    setShowExForm(true)
  }
  const openEditEx = (ex: any) => {
    setEditExId(ex.id)
    setExForm({
      titre: ex.titre || '', description: ex.description || '',
      difficulte: ex.difficulte || 'Facile', categorie: ex.categorie || 'Journal comptable',
      contexte: ex.contexte || '',
      questions: (ex.questions && ex.questions.length) ? ex.questions : [''],
      explicationCorrige: ex.explicationCorrige || '', actif: ex.actif ?? true,
      bareme: ex.bareme || { compte: 40, sens: 30, montant: 20, equilibre: 10 },
      pdfData: '',
      pdfNom: ex.pdfNom || '',
      pdfUrl: ex.pdfUrl || ex.pdfData || '',  // compat legacy base64
      coursId: ex.coursId || '',
      faculteId: ex.faculteId || '',
      universiteId: ex.universiteId || '',
    })
    setExPdfFile(null)
    setExSolution((ex.solution && ex.solution.length) ? ex.solution : [emptyLigneSol(), emptyLigneSol()])
    setExQCM((ex.qcm && ex.qcm.length) ? ex.qcm : [])
    setShowExForm(true)
  }
  const handleSaveEx = async () => {
    if (!exForm.titre.trim()) return
    setExPdfUploading(true)
    try {
      const exId = editExId || generateId()
      let pdfUrl: string | undefined = exForm.pdfUrl || undefined
      let pdfNom: string | undefined = exForm.pdfNom || undefined

      if (exPdfFile) {
        pdfUrl = await uploadExercicePDF(exId, exPdfFile)
        pdfNom = exPdfFile.name
      }

      const data = {
        ...exForm,
        solution: exSolution.filter(l => l.numeroCompte.trim()),
        qcm: exQCM.filter(q => q.question.trim()),
        ecrituresAttendues: exSolution.filter(l => l.numeroCompte.trim()).map(l => ({ numeroCompte: l.numeroCompte, sens: l.sens, montant: parseFloat(l.montant) || 0 })),
        bareme: exForm.bareme,
        sessionId: '',
        instructions: exForm.contexte,
        userId: currentUser?.id || '',
        pdfUrl,
        pdfNom,
        pdfData: undefined,  // ne plus stocker base64
      }
      if (editExId) await updateExerciceAsync(editExId, data)
      else await createExerciceAsync({ ...data, id: exId } as any)
      setShowExForm(false)
      setExPdfFile(null)
      toast({ title: editExId ? 'Exercice modifié' : 'Exercice créé' })
    } catch (err: any) {
      toast({ title: 'Erreur upload PDF : ' + (err?.message || 'inconnue'), variant: 'destructive' })
    } finally {
      setExPdfUploading(false)
    }
  }
  const handleDeleteEx = async () => {
    if (!deleteExId) return
    await deleteExerciceAsync(deleteExId)
    setDeleteExId(null)
    toast({ title: 'Exercice supprimé', variant: 'destructive' })
  }

  // Questions helpers
  const addQuestion = () => setExForm(f => ({ ...f, questions: [...f.questions, ''] }))
  const updateQuestion = (i: number, v: string) => setExForm(f => ({ ...f, questions: f.questions.map((q, idx) => idx === i ? v : q) }))
  const removeQuestion = (i: number) => setExForm(f => ({ ...f, questions: f.questions.filter((_, idx) => idx !== i) }))

  // QCM helpers
  const addQCMQuestion = () => setExQCM(q => [...q, emptyQCMQuestion()])
  const removeQCMQuestion = (id: string) => setExQCM(q => q.filter(x => x.id !== id))
  const updateQCMQuestion = (id: string, text: string) => setExQCM(q => q.map(x => x.id === id ? { ...x, question: text } : x))
  const updateQCMOption = (qId: string, oId: string, field: 'texte' | 'correct', value: string | boolean) =>
    setExQCM(q => q.map(x => x.id === qId ? { ...x, options: x.options.map(o => o.id === oId ? { ...o, [field]: value } : (field === 'correct' && value === true ? { ...o, correct: false } : o)) } : x))

  // Solution helpers
  const addLigneSol = () => setExSolution(s => [...s, emptyLigneSol()])
  const updateLigneSol = (id: string, field: keyof LigneSolution, value: string) =>
    setExSolution(s => s.map(l => l.id === id ? { ...l, [field]: value } : l))
  const removeLigneSol = (id: string) => { if (exSolution.length > 1) setExSolution(s => s.filter(l => l.id !== id)) }

  // ── Données filtrées ──
  // Chaque administrateur/prof voit UNIQUEMENT ses propres étudiants
  const isMainAdmin = currentUser?.username === 'manasse.tandu'
  const etudiants = users.filter(u => {
    if (u.role !== 'etudiant') return false
    const cb = (u as any).createdBy
    // Étudiant sans createdBy : visible uniquement pour l'admin principal
    if (!cb) return isMainAdmin
    return cb === currentUser?.id || cb === currentUser?.username
  }).sort((a, b) => {
    const nomA = normalizeStr(`${a.nom} ${a.prenom || ''}`.trim())
    const nomB = normalizeStr(`${b.nom} ${b.prenom || ''}`.trim())
    return nomA.localeCompare(nomB, 'fr')
  })
  const staff = users.filter(u => ['professeur', 'assistant'].includes(u.role))
  const admins = users.filter(u => u.role === 'admin')

  const universiteIds = new Set(universites.map(u => u.id))
  const etudiantsParUni = universites.map(uni => ({
    uni,
    etudiants: etudiants.filter(e => (e as any).universiteId === uni.id)
      .sort((a, b) => normalizeStr(`${a.nom} ${a.prenom || ''}`.trim())
        .localeCompare(normalizeStr(`${b.nom} ${b.prenom || ''}`.trim()), 'fr')),
  }))
  // Indépendants = pas d'universiteId OU universiteId qui ne correspond à aucune université connue
  const etudiantsIndepAll = etudiants.filter(e => !(e as any).universiteId || !universiteIds.has((e as any).universiteId))
  // Filtre recherche + pagination indépendants
  const qEtu = normalizeStr(searchEtu.trim())
  const etudiantsIndep = etudiantsIndepAll.filter(e =>
    !qEtu ||
    normalizeStr(e.nom).includes(qEtu) ||
    normalizeStr(e.prenom || '').includes(qEtu) ||
    normalizeStr(e.username || '').includes(qEtu)
  )
  const totalPagesIndep = Math.max(1, Math.ceil(etudiantsIndep.length / PAGE_SIZE_PROF))
  const etudiantsIndepPage = etudiantsIndep.slice((pageIndep - 1) * PAGE_SIZE_PROF, pageIndep * PAGE_SIZE_PROF)

  // ── Recherche globale étudiants ──
  const qGlobal = normalizeStr(searchGlobal.trim())
  const etudiantsFiltresGlobal = React.useMemo(() => {
    if (!qGlobal) return []
    return etudiants.filter(e => {
      const uni = universites.find(u => u.id === (e as any).universiteId)
      const fac = facultesList.find(f => f.id === (e as any).faculteId)
      return (
        normalizeStr(e.nom || '').includes(qGlobal) ||
        normalizeStr(e.prenom || '').includes(qGlobal) ||
        normalizeStr(e.username || '').includes(qGlobal) ||
        normalizeStr((e as any).classe || '').includes(qGlobal) ||
        normalizeStr(uni?.nom || '').includes(qGlobal) ||
        normalizeStr(fac?.nom || '').includes(qGlobal)
      )
    }).sort((a, b) => normalizeStr(`${a.nom} ${a.prenom || ''}`).localeCompare(normalizeStr(`${b.nom} ${b.prenom || ''}`), 'fr'))
  }, [qGlobal, etudiants, universites, facultesList])
  const totalPagesGlobal = Math.max(1, Math.ceil(etudiantsFiltresGlobal.length / PAGE_SIZE_PROF))
  const etudiantsGlobalPage = etudiantsFiltresGlobal.slice((pageGlobal - 1) * PAGE_SIZE_PROF, pageGlobal * PAGE_SIZE_PROF)

  // ── Progression ──
  const { exercices } = useExercices()
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
  const { presences, loading: loadingPresences } = usePresences(currentUser?.id, (currentUser as any)?.faculteId)
  const [showPresenceForm, setShowPresenceForm] = useState(false)
  const [presenceTitre, setPresenceTitre] = useState('')
  const [presenceDate, setPresenceDate] = useState(() => new Date().toISOString().slice(0, 10))
  const [presenceCoursId, setPresenceCoursId] = useState('') // cours lié à la séance
  const [presenceCoches, setPresenceCoches] = useState<Record<string, boolean>>({}) // etudiantId -> present
  const [editPresenceId, setEditPresenceId] = useState<string | null>(null)
  const [deletePresenceId, setDeletePresenceId] = useState<string | null>(null)

  const openCreatePresence = () => {
    setEditPresenceId(null)
    setPresenceTitre('')
    setPresenceDate(new Date().toISOString().slice(0, 10))
    setPresenceCoursId('')
    // Par défaut tous présents
    const coches: Record<string, boolean> = {}
    etudiants.forEach(e => { coches[e.id] = true })
    setPresenceCoches(coches)
    setShowPresenceForm(true)
  }

  const openEditPresence = (p: any) => {
    setEditPresenceId(p.id)
    setPresenceTitre(p.titre)
    setPresenceDate(p.date.slice(0, 10))
    setPresenceCoursId(p.coursId || '')
    const coches: Record<string, boolean> = {}
    etudiants.forEach(e => {
      const found = p.etudiants?.find((x: any) => x.etudiantId === e.id)
      coches[e.id] = found ? found.present : false
    })
    setPresenceCoches(coches)
    setShowPresenceForm(true)
  }

  const handleSavePresence = async () => {
    if (!presenceTitre.trim()) { toast({ title: 'Donnez un titre à la séance', variant: 'destructive' }); return }
    const etudiantsData = etudiants.map(e => ({ etudiantId: e.id, present: !!presenceCoches[e.id] }))
    // Résoudre faculteId/universiteId depuis le cours sélectionné ou depuis le profil du prof
    const coursLie = presenceCoursId ? coursList.find(c => c.id === presenceCoursId) : null
    const presenceFaculteId = coursLie ? (coursLie as any).faculteId || (currentUser as any)?.faculteId || undefined
                                       : (currentUser as any)?.faculteId || undefined
    const presenceUniversiteId = coursLie ? (coursLie as any).universiteId || (currentUser as any)?.universiteId || undefined
                                          : (currentUser as any)?.universiteId || undefined
    if (editPresenceId) {
      await updatePresenceAsync(editPresenceId, {
        titre: presenceTitre, date: presenceDate, etudiants: etudiantsData,
        coursId: presenceCoursId || undefined,
        faculteId: presenceFaculteId,
        universiteId: presenceUniversiteId,
      })
      toast({ title: 'Séance modifiée' })
    } else {
      await createPresenceAsync({
        titre: presenceTitre, date: presenceDate,
        createdBy: currentUser?.id || '',
        etudiants: etudiantsData,
        coursId: presenceCoursId || undefined,
        faculteId: presenceFaculteId,
        universiteId: presenceUniversiteId,
      })
      toast({ title: 'Séance enregistrée' })
    }
    setShowPresenceForm(false)
  }

  const handleDeletePresence = async () => {
    if (!deletePresenceId) return
    await deletePresenceAsync(deletePresenceId)
    setDeletePresenceId(null)
    toast({ title: 'Séance supprimée', variant: 'destructive' })
  }

  // ── Toutes les soumissions (pour calcul cote devoirs) ──
  const { soumissions: allSoumissions } = useAllSoumissions()

  // ── Cotes (calcul) ──
  // Tous les étudiants qui apparaissent dans au moins une séance de présence
  // (inclut ceux créés par d'autres admins s'ils sont dans les séances)
  const etudiantsPresences: User[] = React.useMemo(() => {
    const idsInPresences = new Set<string>()
    presences.forEach(p => p.etudiants?.forEach(e => idsInPresences.add(e.etudiantId)))
    // union : ceux dans les séances + ceux de cet admin
    const tous = users.filter(u => u.role === 'etudiant')
    const fromPresences = tous.filter(u => idsInPresences.has(u.id))
    const fromAdmin = etudiants
    const merged = [...fromPresences]
    fromAdmin.forEach(e => { if (!merged.find(m => m.id === e.id)) merged.push(e) })
    return merged
  }, [presences, users, etudiants])

  // Toutes les séances triées par date croissante (pour le tableau croisé)
  const seancesSorted = React.useMemo(() =>
    [...presences].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  , [presences])

  // Cote présences : 5 × (nb présences / total séances)
  // Cote TP : 5 × (moyenne scores / 100)
  const cotesData = etudiantsPresences.map(et => {
    const totalSeances = seancesSorted.length
    const nbPresent = seancesSorted.filter(p => p.etudiants?.find(e => e.etudiantId === et.id)?.present).length
    const cotePresence = totalSeances > 0 ? parseFloat((5 * nbPresent / totalSeances).toFixed(2)) : null
    const tauxPresence = totalSeances > 0 ? Math.round(nbPresent / totalSeances * 100) : null

    // Cote devoirs : 5 × (cumul notes obtenues / cumul notes max)
    // Chaque devoir est sur 10, on cumule toutes les soumissions notées
    const soumissionsEtu = allSoumissions.filter(s => s.etudiantId === et.id && s.statut === 'note' && typeof s.note === 'number')
    const totalDevoirsNotes = soumissionsEtu.length
    const cumulNotes = soumissionsEtu.reduce((acc, s) => acc + (s.note ?? 0), 0)
    const cumulMax = totalDevoirsNotes * 10
    const coteDevoirs = totalDevoirsNotes > 0
      ? parseFloat((5 * cumulNotes / cumulMax).toFixed(2))
      : null

    const total = (cotePresence !== null || coteDevoirs !== null)
      ? parseFloat(((cotePresence ?? 0) + (coteDevoirs ?? 0)).toFixed(2))
      : null

    let mention = ''
    if (total !== null) {
      if (total >= 8) mention = 'Excellent'
      else if (total >= 6) mention = 'Bien'
      else if (total >= 5) mention = 'Satisfaisant'
      else mention = 'Insuffisant'
    }

    return { etudiant: et, totalSeances, nbPresent, tauxPresence, cotePresence, coteDevoirs, totalDevoirsNotes, cumulNotes, total, mention }
  })

  // ── Rendu onglets ──
  const visibleTabs = TABS.filter(t => !t.adminOnly || isAdmin)

  // Garde de rôle (point 7 de l'audit) : /professeurs n'était protégée que par
  // l'authentification (voir le wrapper W dans App.tsx), pas par le rôle — un
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
              <h1 className="text-xl font-display font-bold text-foreground tracking-tight">Espace Administrateur</h1>
              <p className="text-xs text-muted-foreground mt-0.5">Gérez les étudiants, universités, exercices et suivez la progression</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs groupés en 3 sections */}
      <div className="animate-slideDown space-y-2" style={{ animationDelay: '80ms' }}>

        {/* Groupe 1 : Gestion */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">Gestion</p>
          <div className="flex flex-wrap gap-1.5">
            {/* Bouton redirection étudiants */}
            <button
              onClick={() => navigate('/gestion-etudiants')}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            >
              <Users className="h-3.5 w-3.5" /> Étudiants
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
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">Pédagogie</p>
          <div className="flex flex-wrap gap-1.5">
            {([
              { id: 'notes',     label: 'Notes de cours', icon: <FileText className="h-3.5 w-3.5" /> },
            ] as {id: Tab, label: string, icon: React.ReactNode}[]).map(t => (
              <button key={t.id} onClick={() => setTab(t.id as Tab)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all=",
                  tab === t.id ? "bg-primary text-primary-foreground shadow-sm=" : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted="
                )}>
                {t.icon}{t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Groupe 3 : Suivi */}
        <div className="space-y-1">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest px-1">Suivi</p>
          <div className="flex flex-wrap gap-1.5">
            {([
              { id: 'progression', label: 'Progression', icon: <BarChart2 className="h-3.5 w-3.5" /> },
              { id: 'presences',   label: 'Présences',   icon: <CalendarCheck className="h-3.5 w-3.5" /> },
              { id: 'cotes',       label: 'Cotes',       icon: <Award className="h-3.5 w-3.5" /> },
            ] as {id: Tab, label: string, icon: React.ReactNode}[]).map(t => (
              <button key={t.id} onClick={() => setTab(t.id as Tab)}
                className={cn(
                  "flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all=",
                  tab === t.id ? "bg-primary text-primary-foreground shadow-sm=" : "bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted="
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
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-base font-display font-semibold text-foreground">Gestion des cours</h2>
                    <p className="text-sm text-muted-foreground mt-0.5">{coursList.filter(c => c.actif).length} cours actif{coursList.filter(c => c.actif).length > 1 ? 's' : ''} : {COURS_SYSTEME.filter(c => !c.actif).length} en préparation</p>
                  </div>
                  <div className="flex items-center gap-2">
                    {doublons.length > 0 && (
                      <Button
                        size="sm"
                        className="bg-orange-500 hover:bg-orange-600 text-white gap-1.5"
                        onClick={() => { setCoursDoublonsIds(doublons); setConfirmNettoyage(true) }}
                      >
                        Nettoyer {doublons.length} doublon{doublons.length > 1 ? 's' : ''}
                      </Button>
                    )}
                    <Button size="sm" onClick={() => openCreateCours('', '')}>
                      <Plus className="h-4 w-4 mr-1.5" /> Nouveau cours
                    </Button>
                  </div>
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

          {/* Cours actifs */}
          {coursList.filter(c => c.actif).length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <LibraryBig className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="text-sm">Aucun cours actif pour l'instant.</p>
              <p className="text-xs mt-1">Créez des cours pour les assigner aux étudiants.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {getCoursUniques(coursList).map(c => {
                const inscrits = etudiants.filter(e => resolveCoursIds(e).includes(c.id))
                return (
                  <Card key={c.id} className="border-border">
                    <CardContent className="px-4 py-3">
                      <div className="flex items-start justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-foreground">{c.nom}</span>
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
                              <span className="ml-1">: {inscrits.map(e => `${(e as any).prenom || ''} ${e.nom}`.trim()).join(', ')}</span>
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
          )}

          {/* Séparateur : Cours en préparation (verrouillés) */}
          {COURS_SYSTEME.filter(c => !c.actif).length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-2 pt-1">
                <Lock className="h-3.5 w-3.5 text-muted-foreground/60" />
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Cours en préparation : verrouillés</p>
              </div>
              {COURS_SYSTEME.filter(c => !c.actif).map(c => (
                <Card key={c.id} className="border-dashed border-border bg-muted/20">
                  <CardContent className="px-4 py-3">
                    <div className="flex items-center gap-3 opacity-60">
                      <Lock className="h-4 w-4 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-foreground text-sm">{c.nom}</span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-gray-100 text-gray-500">
                            Verrouillé
                          </span>
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium bg-blue-100 text-blue-700">Système</span>
                        </div>
                        {c.description && <p className="text-xs text-muted-foreground mt-0.5">{c.description}</p>}
                        <p className="text-xs text-muted-foreground/70 mt-0.5 italic">Ce cours sera disponible prochainement.</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* ═══════════════════ ONGLET UNIVERSITÉS ═══════════════════ */}
      {tab === 'universites' && isAdmin && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{universites.length} université{universites.length > 1 ? 's' : ''}</p>
            <Button size="sm" onClick={openCreateUni}>
              <Plus className="h-4 w-4 mr-1.5" /> Nouvelle université
            </Button>
          </div>

          {universites.length === 0 ? (
            <Card className="border-border">
              <CardContent className="pt-10 pb-10 text-center text-muted-foreground">
                <Building2 className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p>Aucune université enregistrée.</p>
                <p className="text-xs mt-1">Créez une université pour y associer des étudiants.</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {universites.map(u => {
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
                            const facCours = coursList.filter(c => c.faculteId === fac.id)
                            // ouvert si pas dans le Set des fermés (ouvert par défaut)
                            const facOpen = !openFacsMgmt.has(fac.id)
                            return (
                              <div key={fac.id} className="border-b border-border/50 last:border-0">
                                {/* Ligne Faculté */}
                                <div
                                  className="flex items-center justify-between px-8 py-2.5 cursor-pointer hover:bg-muted/20 transition-colors"
                                  onClick={() => toggleFacMgmt(fac.id)}
                                >
                                  <div className="flex items-center gap-2">
                                    {facOpen ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />}
                                    <GraduationCap className="h-3.5 w-3.5 text-primary/70" />
                                    <span className="text-sm font-medium text-foreground">{fac.nom}</span>
                                    <Badge variant="secondary" className="text-xs ml-1">{facCours.length} cours</Badge>
                                  </div>
                                  <div className="flex items-center gap-1" onClick={e => e.stopPropagation()}>
                                    <Button variant="outline" size="sm" className="h-6 text-xs" onClick={() => openCreateCours(fac.id, u.id)}>
                                      <Plus className="h-3 w-3 mr-1" /> Cours
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => openEditFaculte(fac)} aria-label={`Modifier la faculté ${fac.nom}`}>
                                      <Pencil className="h-3 w-3" />
                                    </Button>
                                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => setDeleteFaculteId(fac.id)} aria-label={`Supprimer la faculté ${fac.nom}`}>
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  </div>
                                </div>

                                {/* Cours de la faculté */}
                                {facOpen && (
                                  <div className="px-12 pb-2">
                                    {facCours.length === 0 ? (
                                      <p className="text-xs text-muted-foreground italic py-1">Aucun cours : cliquez sur "+ Cours".</p>
                                    ) : (
                                      <div className="space-y-1">
                                        {facCours.map(c => {
                                          const nbEtu = etudiants.filter(e => resolveCoursIds(e).includes(c.id)).length
                                          return (
                                            <div key={c.id} className="flex items-center justify-between py-1.5 px-3 rounded-md hover:bg-muted/30">
                                              <div className="flex items-center gap-2">
                                                <BookOpen className="h-3.5 w-3.5 text-primary/60" />
                                                <span className="text-sm text-foreground">{c.nom}</span>
                                                <Badge variant="outline" className="text-xs">{nbEtu} étudiant{nbEtu > 1 ? 's' : ''}</Badge>
                                                {!c.actif && <Badge variant="secondary" className="text-xs">Inactif</Badge>}
                                              </div>
                                              <div className="flex items-center gap-1">
                                                <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => openEditCours(c)} aria-label={`Modifier le cours ${c.nom}`}>
                                                  <Pencil className="h-3 w-3" />
                                                </Button>
                                                {!(c as any).systeme && (
                                                  <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive hover:text-destructive" onClick={() => setDeleteCoursId(c.id)} aria-label={`Supprimer le cours ${c.nom}`}>
                                                    <Trash2 className="h-3 w-3" />
                                                  </Button>
                                                )}
                                              </div>
                                            </div>
                                          )
                                        })}
                                      </div>
                                    )}
                                  </div>
                                )}
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
      )}

      {/* ═══════════════════ ONGLET PROF / ASSISTANTS ═══════════════════ */}
      {tab === 'staff' && isAdmin && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{staff.length} membre{staff.length > 1 ? 's' : ''} du staff</p>
            <Button size="sm" onClick={() => openCreateUser('professeur')}>
              <Plus className="h-4 w-4 mr-1.5" /> Nouveau membre staff
            </Button>
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
                            </td>
                            <td className="px-4 py-2.5">
                              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${ROLE_COLORS[u.role]}`}>
                                {ROLE_LABELS[u.role]}
                              </span>
                            </td>
                            <td className="px-4 py-2.5 text-muted-foreground text-xs">
                              {uni ? uni.nom : '—'}
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

      {/* ═══════════════════ ONGLET EXERCICES ═══════════════════ */}
      {false && (tab as string) === 'exercices' && ( /* désactivé — devoirs depuis chapitres */
        <div className="space-y-5">

          {/* Liste des exercices existants */}
          {exercices.length > 0 && (
            <div className="space-y-2">
              <p className="text-sm text-muted-foreground">{exercices.length} exercice{exercices.length > 1 ? 's' : ''} créé{exercices.length > 1 ? 's' : ''}</p>
              {exercices.map(ex => {
                const tents = tentatives.filter(t => t.exerciceId === ex.id)
                return (
                  <Card key={ex.id} className="border-border">
                    <CardContent className="pt-3 pb-3">
                      <div className="flex items-center justify-between gap-3">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className="font-medium text-foreground">{ex.titre}</p>
                            {(ex as any).difficulte && (
                              <Badge variant="outline" className={cn('text-xs px-1.5 py-0',
                                (ex as any).difficulte === 'Facile' ? 'border-green-400 text-green-600' :
                                (ex as any).difficulte === 'Moyen' ? 'border-yellow-400 text-yellow-600' :
                                'border-red-400 text-red-600'
                              )}>{(ex as any).difficulte}</Badge>
                            )}
                            {(ex as any).categorie && <Badge variant="secondary" className="text-xs px-1.5 py-0">{(ex as any).categorie}</Badge>}
                          </div>
                          {ex.description && <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">{ex.description}</p>}
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant="outline" className="text-xs">{tents.length} tentative{tents.length > 1 ? 's' : ''}</Badge>
                          <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => openEditEx(ex)}>
                            <Pencil className="h-3.5 w-3.5" />
                          </Button>
                          <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeleteExId(ex.id)}>
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

          {/* Formulaire création/édition */}
          {showExForm ? (
            <Card className="border-border">
              <CardContent className="pt-5 pb-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-display font-semibold">{editExId ? 'Modifier l\'exercice' : 'Nouvel exercice pédagogique'}</h2>
                  <Button variant="ghost" size="icon" className="h-7 w-7" onClick={() => setShowExForm(false)}><X className="h-4 w-4" /></Button>
                </div>
                <div className="space-y-4">

                  {/* Titre */}
                  <div>
                    <Label>Titre *</Label>
                    <Input value={exForm.titre} onChange={e => setExForm(f => ({ ...f, titre: e.target.value }))} placeholder="Ex : Achat de marchandises au comptant=" className="mt-1" />
                  </div>

                  {/* Description */}
                  <div>
                    <Label>Description</Label>
                    <Input value={exForm.description} onChange={e => setExForm(f => ({ ...f, description: e.target.value }))} placeholder="Brève description=" className="mt-1" />
                  </div>

                  {/* Difficulté + Catégorie */}
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Difficulté</Label>
                      <Select value={exForm.difficulte} onValueChange={v => setExForm(f => ({ ...f, difficulte: v as any }))}>
                        <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {['Facile', 'Moyen', 'Difficile'].map(d => <SelectItem key={d} value={d}>{d}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>Catégorie</Label>
                      <Select value={exForm.categorie} onValueChange={v => setExForm(f => ({ ...f, categorie: v }))}>
                        <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          {['Journal comptable', 'Grand Livre', 'Balance', 'Bilan & Résultat', 'Plan Comptable', 'Autre'].map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Contexte / Énoncé */}
                  <div>
                    <Label>Contexte / Énoncé</Label>
                    <textarea
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[90px] resize-y"
                      value={exForm.contexte}
                      onChange={e => setExForm(f => ({ ...f, contexte: e.target.value }))}
                      placeholder="Décrivez la situation comptable...="
                    />
                  </div>

                  {/* Questions */}
                  <div>
                    <Label>Questions</Label>
                    <div className="space-y-2 mt-1">
                      {exForm.questions.map((q, i) => (
                        <div key={i} className="flex gap-2">
                          <Input
                            value={q}
                            onChange={e => updateQuestion(i, e.target.value)}
                            placeholder={`Question ${i + 1}...`}
                            className="flex-1"
                          />
                          {exForm.questions.length > 1 && (
                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive" onClick={() => removeQuestion(i)}>
                              <X className="h-3.5 w-3.5" />
                            </Button>
                          )}
                        </div>
                      ))}
                      <button onClick={addQuestion} className="text-sm text-primary hover:underline flex items-center gap-1">
                        <Plus className="h-3.5 w-3.5" /> Ajouter une question
                      </button>
                    </div>
                  </div>

                  {/* SOLUTION */}
                  <div>
                    <Label className="text-sm font-bold uppercase tracking-wide">Solution</Label>
                    <div className="space-y-2 mt-2">
                      {exSolution.map(l => (
                        <div key={l.id} className="grid grid-cols-[110px_1fr_80px_90px_32px] gap-2 items-center">
                          <Input
                            value={l.numeroCompte}
                            onChange={e => updateLigneSol(l.id, 'numeroCompte', e.target.value)}
                            placeholder="N° compte="
                            className="font-mono text-sm"
                          />
                          <Input
                            value={l.intitule}
                            onChange={e => updateLigneSol(l.id, 'intitule', e.target.value)}
                            placeholder="Intitulé"
                            className="text-sm"
                          />
                          {/* Toggle Débit / Crédit */}
                          <button
                            onClick={() => updateLigneSol(l.id, 'sens', l.sens === 'D' ? 'C' : 'D')}
                            className={cn(
                              'h-9 rounded-md text-sm font-semibold border transition-colors',
                              l.sens === 'D'
                                ? 'bg-blue-600 text-white border-blue-600'
                                : 'bg-green-600 text-white border-green-600'
                            )}
                          >
                            {l.sens === 'D' ? 'D Débit' : 'C Crédit'}
                          </button>
                          <Input
                            value={l.montant}
                            onChange={e => updateLigneSol(l.id, 'montant', e.target.value)}
                            placeholder="Montant"
                            type="number"
                            className="text-sm text-right"
                          />
                          <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-destructive" onClick={() => removeLigneSol(l.id)}>
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ))}
                      <button onClick={addLigneSol} className="text-sm text-primary hover:underline flex items-center gap-1">
                        <Plus className="h-3.5 w-3.5" /> Ajouter une ligne
                      </button>
                    </div>
                  </div>

                  {/* Barème */}
                  <div>
                    <Label className="text-sm font-bold uppercase tracking-wide">Barème (total = 100 pts)</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <div>
                        <Label className="text-xs text-muted-foreground">Compte ({exForm.bareme.compte} pts)</Label>
                        <Input type="number" min={0} max={100} value={exForm.bareme.compte}
                          onChange={e => setExForm(f => ({ ...f, bareme: { ...f.bareme, compte: parseInt(e.target.value) || 0 } }))}
                          className="mt-1 text-sm" />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Sens D/C ({exForm.bareme.sens} pts)</Label>
                        <Input type="number" min={0} max={100} value={exForm.bareme.sens}
                          onChange={e => setExForm(f => ({ ...f, bareme: { ...f.bareme, sens: parseInt(e.target.value) || 0 } }))}
                          className="mt-1 text-sm" />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Montant ({exForm.bareme.montant} pts)</Label>
                        <Input type="number" min={0} max={100} value={exForm.bareme.montant}
                          onChange={e => setExForm(f => ({ ...f, bareme: { ...f.bareme, montant: parseInt(e.target.value) || 0 } }))}
                          className="mt-1 text-sm" />
                      </div>
                      <div>
                        <Label className="text-xs text-muted-foreground">Équilibre ({exForm.bareme.equilibre} pts)</Label>
                        <Input type="number" min={0} max={100} value={exForm.bareme.equilibre}
                          onChange={e => setExForm(f => ({ ...f, bareme: { ...f.bareme, equilibre: parseInt(e.target.value) || 0 } }))}
                          className="mt-1 text-sm" />
                      </div>
                    </div>
                    <p className={cn('text-xs mt-1', (exForm.bareme.compte + exForm.bareme.sens + exForm.bareme.montant + exForm.bareme.equilibre) === 100 ? 'text-green-600' : 'text-destructive')}>
                      Total : {exForm.bareme.compte + exForm.bareme.sens + exForm.bareme.montant + exForm.bareme.equilibre} / 100
                      {(exForm.bareme.compte + exForm.bareme.sens + exForm.bareme.montant + exForm.bareme.equilibre) !== 100 && ' ⚠️ Le total doit être 100'}
                    </p>
                  </div>

                  {/* Explication du corrigé */}
                  <div>
                    <Label>Explication du corrigé</Label>
                    <textarea
                      className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring min-h-[70px] resize-y"
                      value={exForm.explicationCorrige}
                      onChange={e => setExForm(f => ({ ...f, explicationCorrige: e.target.value }))}
                      placeholder="Explication du corrigé..."
                    />
                  </div>

                  {/* QCM */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label className="text-sm font-bold uppercase tracking-wide">QCM (optionnel)</Label>
                      <button onClick={addQCMQuestion} className="text-sm text-primary hover:underline flex items-center gap-1">
                        <Plus className="h-3.5 w-3.5" /> Ajouter une question QCM
                      </button>
                    </div>
                    {exQCM.length === 0 && (
                      <p className="text-xs text-muted-foreground italic">Aucune question QCM. Cliquez pour en créer.</p>
                    )}
                    {exQCM.map((qcmQ, qi) => (
                      <div key={qcmQ.id} className="border border-border rounded-md p-3 mb-2 space-y-2">
                        <div className="flex items-start gap-2">
                          <span className="text-xs font-bold text-muted-foreground mt-2 shrink-0">Q{qi + 1}</span>
                          <Input
                            value={qcmQ.question}
                            onChange={e => updateQCMQuestion(qcmQ.id, e.target.value)}
                            placeholder={`Question ${qi + 1}...`}
                            className="flex-1"
                          />
                          <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive shrink-0" onClick={() => removeQCMQuestion(qcmQ.id)}>
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                        <div className="space-y-1 pl-6">
                          {qcmQ.options.map((opt, oi) => (
                            <div key={opt.id} className="flex items-center gap-2">
                              <span className="text-xs font-bold text-muted-foreground w-5 shrink-0">{String.fromCharCode(65 + oi)}.</span>
                              <Input
                                value={opt.texte}
                                onChange={e => updateQCMOption(qcmQ.id, opt.id, 'texte', e.target.value)}
                                placeholder={`Option ${String.fromCharCode(65 + oi)}...`}
                                className="flex-1 h-8 text-sm"
                              />
                              <label className="flex items-center gap-1 text-xs text-muted-foreground cursor-pointer shrink-0">
                                <input
                                  type="radio"
                                  name={`correct-${qcmQ.id}`}
                                  checked={opt.correct}
                                  onChange={() => updateQCMOption(qcmQ.id, opt.id, 'correct', true)}
                                  className="accent-green-600"
                                />
                                Bonne réponse
                              </label>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* PDF joint : Firebase Storage */}
                  <div>
                    <Label>Fichier PDF joint (optionnel)</Label>
                    <div className="mt-1">
                      {exPdfFile ? (
                        <div className="flex items-center gap-2 p-3 rounded-md border border-green-300 bg-green-50">
                          <FileText className="h-4 w-4 text-green-600 shrink-0" />
                          <span className="text-sm text-green-700 flex-1 truncate">{exPdfFile!.name}</span>
                          <span className="text-xs text-muted-foreground">{(exPdfFile!.size/1024/1024).toFixed(1)} Mo</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => { setExPdfFile(null); setExForm(f => ({ ...f, pdfNom: '', pdfUrl: '' })) }}>
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ) : exForm.pdfNom ? (
                        <div className="flex items-center gap-2 p-3 rounded-md border border-blue-300 bg-blue-50">
                          <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                          <span className="text-sm text-blue-700 flex-1 truncate">{exForm.pdfNom}</span>
                          <span className="text-xs text-blue-500">Déjà uploadé</span>
                          <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => setExForm(f => ({ ...f, pdfNom: '', pdfUrl: '', pdfData: '' }))}>
                            <X className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      ) : (
                        <label className="flex items-center gap-2 p-3 rounded-md border border-dashed border-border cursor-pointer hover:bg-muted/40 transition-colors">
                          <Paperclip className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">Cliquer pour joindre un PDF (max 20 Mo)</span>
                          <input
                            type="file"
                            accept=".pdf,application/pdf"
                            className="hidden"
                            onChange={e => {
                              const file = e.target.files?.[0]
                              if (!file) return
                              if (file.size > 20 * 1024 * 1024) { toast({ title: 'Fichier trop volumineux (max 20 Mo)', variant: 'destructive' }); return }
                              setExPdfFile(file)
                              setExForm(f => ({ ...f, pdfNom: file.name }))
                              e.target.value = ''
                            }}
                          />
                        </label>
                      )}
                    </div>
                  </div>

                  {/* Cours (isolation) */}
                  <div>
                    <Label>Cours lié (isolation faculté)</Label>
                    <Select value={exForm.coursId || '__none__'} onValueChange={v => {
                      const c = coursList.find(cc => cc.id === v)
                      setExForm(f => ({ ...f,
                        coursId: v === '__none__' ? '' : v,
                        faculteId: c ? (c as any).faculteId || '' : '',
                        universiteId: c ? (c as any).universiteId || '' : ''
                      }))
                    }}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Sélectionner un cours (optionnel)" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">Aucun cours (exercice global)</SelectItem>
                        {getCoursUniques(coursList).map(c => (
                          <SelectItem key={c.id} value={c.id}>{c.nom}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <p className="text-xs text-muted-foreground mt-1">Si un cours est sélectionné, l'exercice sera visible uniquement par les étudiants de cette faculté.</p>
                  </div>

                  {/* Actif */}
                  <div className="flex items-center gap-2">
                    <Switch checked={exForm.actif} onCheckedChange={v => setExForm(f => ({ ...f, actif: v }))} />
                    <Label>Exercice actif (visible par les étudiants)</Label>
                  </div>

                  {/* Bouton créer */}
                  <Button onClick={handleSaveEx} disabled={!exForm.titre.trim() || exPdfUploading} className="w-full">
                    {exPdfUploading ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                        Upload en cours...
                      </span>
                    ) : editExId ? 'Enregistrer les modifications' : 'Créer l\'exercice'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Button onClick={openCreateEx} className="w-full" variant="outline">
              <Plus className="h-4 w-4 mr-2" /> Nouvel exercice pédagogique
            </Button>
          )}

          {/* Confirm delete ex */}
          <AlertDialog open={!!deleteExId} onOpenChange={o => !o && setDeleteExId(null)}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Supprimer l'exercice ?</AlertDialogTitle>
                <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Annuler</AlertDialogCancel>
                <AlertDialogAction onClick={handleDeleteEx} className="bg-destructive text-destructive-foreground">Supprimer</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>

        </div>
      )}

      {/* ═══════════════════ ONGLET PROGRESSION ═══════════════════ */}
      {tab === 'progression' && (() => {
        // ── Filtres cascade ──
        const filtUniId  = (progFiltres as any).uniId  as string
        const filtFacId  = (progFiltres as any).facId  as string
        const filtCoursId= (progFiltres as any).coursId as string
        const filtClasse = (progFiltres as any).classe as string

        // Facultés disponibles pour l'université sélectionnée
        const facsDispo  = filtUniId  ? facultesList.filter(f => f.universiteId === filtUniId) : facultesList
        // Cours disponibles pour la faculté sélectionnée
        const coursDispo = getCoursUniques(filtFacId ? coursList.filter(c => c.faculteId === filtFacId) : coursList)
        // Classes disponibles parmi les étudiants
        const classesDispo = [...new Set(etudiants.map(e => (e as any).classe).filter(Boolean))].sort()

        // Filtrer les étudiants selon les critères
        const etudiantsFiltres = etudiants.filter(et => {
          if (filtUniId   && (et as any).universiteId !== filtUniId)  return false
          if (filtFacId   && (et as any).faculteId    !== filtFacId)  return false
          if (filtCoursId && !resolveCoursIds(et).includes(filtCoursId)) return false
          if (filtClasse  && (et as any).classe       !== filtClasse) return false
          return true
        })

        // Construire perfData sur les étudiants filtrés
        const perfData = etudiantsFiltres.map(et => {
          const cotes = cotesData.find(c => c.etudiant.id === et.id)
          const prog  = progressionData.find(p => p.etudiant.id === et.id)
          const uni   = universites.find(u => u.id === (et as any).universiteId)
          return {
            etudiant: et, uni,
            totalSeances:  cotes?.totalSeances  ?? 0,
            nbPresent:     cotes?.nbPresent     ?? 0,
            tauxPresence:  cotes?.tauxPresence  ?? 0,
            cotePresence:  cotes?.cotePresence  ?? null,
            coteTP:        cotes?.coteDevoirs   ?? null,
            total:         cotes?.total         ?? null,
            mention:       cotes?.mention       ?? null,
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
                    {coursDispo.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
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
                      <th className="text-center px-3 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Cote TP /5</th>
                      <th className="text-center px-3 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Total /10</th>
                      <th className="text-center px-3 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Statut</th>
                    </tr>
                  </thead>
                  <tbody>
                    {perfData.map(({ etudiant: e, uni, totalSeances, nbPresent, tauxPresence, cotePresence, coteTP, total, mention, tentatives, moyenneTP }) => {
                      const enDiff  = total !== null && total < 5
                      const inactif = tentatives === 0 && totalSeances === 0
                      return (
                        <tr key={e.id} className={cn('border-t border-border/50 hover:bg-muted/20', enDiff && 'bg-red-50/40')}>
                          <td className="px-4 py-2.5">
                            <p className="font-medium text-foreground">{e.prenom} {e.nom}</p>
                            <p className="text-xs text-muted-foreground">{uni ? uni.nom : <span className="italic">Sans université</span>}{(e as any).classe ? ` · ${(e as any).classe}` : ''}</p>
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {totalSeances > 0
                              ? <span className={cn('font-semibold text-sm', tauxPresence >= 75 ? 'text-green-600' : tauxPresence >= 50 ? 'text-yellow-600' : 'text-red-600')}>{nbPresent}/{totalSeances}</span>
                              : <span className="text-muted-foreground text-xs">—</span>}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {cotePresence !== null
                              ? <span className={cn('font-bold text-sm', cotePresence >= 4 ? 'text-green-600' : cotePresence >= 2.5 ? 'text-yellow-600' : 'text-red-600')}>{cotePresence}</span>
                              : <span className="text-muted-foreground text-xs">—</span>}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {tentatives > 0
                              ? <span className="text-sm">{tentatives} <span className="text-xs text-muted-foreground">({moyenneTP}%)</span></span>
                              : <span className="text-muted-foreground text-xs">—</span>}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {coteTP !== null
                              ? <span className={cn('font-bold text-sm', coteTP >= 4 ? 'text-green-600' : coteTP >= 2.5 ? 'text-yellow-600' : 'text-red-600')}>{coteTP}</span>
                              : <span className="text-muted-foreground text-xs">—</span>}
                          </td>
                          <td className="px-3 py-2.5 text-center">
                            {total !== null
                              ? <span className={cn('font-bold text-base', total >= 8 ? 'text-green-600' : total >= 5 ? 'text-yellow-600' : 'text-red-600')}>{total}</span>
                              : <span className="text-muted-foreground text-xs">—</span>}
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
                            ) : <span className="text-muted-foreground text-xs">—</span>}
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
                </div>
              </Card>
            )}
            <p className="text-xs text-muted-foreground">Triés du plus faible au plus fort · Lignes rouges : total &lt; 5/10</p>
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
                      {getCoursUniques(coursList).map(c => <SelectItem key={c.id} value={c.id}>{c.nom}</SelectItem>)}
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
        const pCoursDispo  = getCoursUniques(pFiltFacId ? coursList.filter(c => c.faculteId === pFiltFacId) : coursList)
        const pClassesDispo = [...new Set(etudiants.map(e => (e as any).classe).filter(Boolean))].sort()
        const pAucunFiltre = !pFiltUniId && !pFiltFacId && !pFiltCoursId && !pFiltClasse
        const etudiantsPresenceFiltres = etudiants.filter(et => {
          if (pFiltUniId   && (et as any).universiteId !== pFiltUniId)  return false
          if (pFiltFacId   && (et as any).faculteId    !== pFiltFacId)  return false
          if (pFiltCoursId && !resolveCoursIds(et).includes(pFiltCoursId)) return false
          if (pFiltClasse  && (et as any).classe       !== pFiltClasse) return false
          return true
        })
        // Séances qui ont au moins un étudiant du groupe filtré
        const seancesFiltrees = pAucunFiltre ? seancesSorted : seancesSorted.filter(s =>
          s.etudiants?.some(e => etudiantsPresenceFiltres.find(et => et.id === e.etudiantId))
        )
        // Étudiants visibles dans les séances filtrées
        const etudiantsVus = pAucunFiltre ? etudiantsPresences : etudiantsPresences.filter(et =>
          etudiantsPresenceFiltres.find(ef => ef.id === et.id)
        )
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
                  disabled={!pFiltUniId || pFacsDispo.length === 0}
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
                  disabled={!pFiltFacId || pCoursDispo.length === 0}
                  className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                >
                  <option value="">Tous</option>
                  {pCoursDispo.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
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
            {!pAucunFiltre && (
              <p className="text-xs text-muted-foreground">
                {etudiantsVus.length} étudiant{etudiantsVus.length !== 1 ? 's' : ''} • {seancesFiltrees.length} séance{seancesFiltrees.length !== 1 ? 's' : ''}
              </p>
            )}
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
                <p>Aucune séance enregistrée.</p>
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
                        <th key={s.id} className="text-center px-2 py-2.5 font-medium text-muted-foreground text-xs whitespace-nowrap">
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
                      const totalS = seancesFiltrees.length
                      const nbP = seancesFiltrees.filter(s => s.etudiants?.find(e => e.etudiantId === et.id)?.present).length
                      const taux = totalS > 0 ? Math.round(nbP / totalS * 100) : 0
                      const cote = totalS > 0 ? parseFloat((5 * nbP / totalS).toFixed(2)) : null
                      return (
                        <tr key={et.id} className="border-t border-border/50 hover:bg-muted/20">
                          <td className="px-4 py-2 sticky left-0 bg-card z-10">
                            <p className="font-medium text-sm whitespace-nowrap">{et.prenom} {et.nom}</p>
                          </td>
                          {seancesFiltrees.map(s => {
                            const entry = s.etudiants?.find(e => e.etudiantId === et.id)
                            const present = entry?.present ?? false
                            const inSeance = !!entry
                            return (
                              <td key={s.id} className="px-2 py-2 text-center">
                                {inSeance ? (
                                  <span className={cn(
                                    'inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-bold',
                                    present
                                      ? 'bg-green-500 text-white'
                                      : 'bg-red-500 text-white'
                                  )}>
                                    {present ? '•' : '×'}
                                  </span>
                                ) : (
                                  <span className="text-muted-foreground opacity-30 text-xs">—</span>
                                )}
                              </td>
                            )
                          })}
                          <td className="px-3 py-2 text-center text-xs font-medium">{nbP}/{totalS}</td>
                          <td className="px-3 py-2 text-center">
                            <span className={cn('text-xs font-semibold',
                              taux >= 75 ? 'text-green-600' : taux >= 50 ? 'text-yellow-600' : 'text-red-600'
                            )}>{taux}%</span>
                          </td>
                          <td className="px-3 py-2 text-center">
                            {cote !== null ? (
                              <span className={cn('font-bold',
                                cote >= 4 ? 'text-green-600' : cote >= 2.5 ? 'text-yellow-600' : 'text-red-600'
                              )}>{cote}</span>
                            ) : <span className="opacity-30">—</span>}
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
                  <Label>Cours lié (optionnel)</Label>
                  <Select value={presenceCoursId || '__none__'} onValueChange={v => setPresenceCoursId(v === '__none__' ? '' : v)}>
                    <SelectTrigger><SelectValue placeholder="Sélectionner un cours" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">Toutes les facultés</SelectItem>
                      {getCoursUniques(coursList).map(c => (
                        <SelectItem key={c.id} value={c.id}>{c.nom}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <p className="text-xs text-muted-foreground">Si un cours est sélectionné, la séance est strictement liée à la faculté de ce cours.</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label>Présences</Label>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => { const c: Record<string,boolean> = {}; etudiants.forEach(e => { c[e.id] = true }); setPresenceCoches(c) }}>Tous présents</Button>
                      <Button size="sm" variant="outline" className="h-7 text-xs" onClick={() => { const c: Record<string,boolean> = {}; etudiants.forEach(e => { c[e.id] = false }); setPresenceCoches(c) }}>Tous absents</Button>
                    </div>
                  </div>
                  {etudiants.length === 0 ? (
                    <p className="text-xs text-muted-foreground">Aucun étudiant enregistré.</p>
                  ) : (
                    <div className="space-y-1.5 max-h-60 overflow-y-auto pr-1">
                      {etudiants.map(e => (
                        <div key={e.id} className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/30">
                          <span className="text-sm">{e.prenom} {e.nom}</span>
                          <Switch
                            checked={!!presenceCoches[e.id]}
                            onCheckedChange={v => setPresenceCoches(c => ({ ...c, [e.id]: v }))}
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
        const cCoursDispo  = getCoursUniques(cFiltFacId ? coursList.filter(c => c.faculteId === cFiltFacId) : coursList)
        const cClassesDispo = [...new Set(etudiants.map(e => (e as any).classe).filter(Boolean))].sort()
        const cAucunFiltre = !cFiltUniId && !cFiltFacId && !cFiltCoursId && !cFiltClasse
        const etudiantsCotesFiltres = etudiants.filter(et => {
          if (cFiltUniId   && (et as any).universiteId !== cFiltUniId)  return false
          if (cFiltFacId   && (et as any).faculteId    !== cFiltFacId)  return false
          if (cFiltCoursId && !resolveCoursIds(et).includes(cFiltCoursId)) return false
          if (cFiltClasse  && (et as any).classe       !== cFiltClasse) return false
          return true
        })
        const cotesDataFiltres = cAucunFiltre
          ? cotesData
          : cotesData.filter(({ etudiant: e }) => etudiantsCotesFiltres.find(ef => ef.id === e.id))
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
                  disabled={!cFiltUniId || cFacsDispo.length === 0}
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
                  disabled={!cFiltFacId || cCoursDispo.length === 0}
                  className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-50"
                >
                  <option value="">Tous</option>
                  {cCoursDispo.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
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
                {cotesDataFiltres.length} étudiant{cotesDataFiltres.length !== 1 ? 's' : ''} dans ce groupe
              </p>
            )}
          </div>

          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Cotes sur 10 — 5 pts présences + 5 pts devoirs</p>
            {cotesDataFiltres.length > 0 && (
              <Button
                size="sm"
                variant="outline"
                className="gap-1.5"
                onClick={() => {
                  const date = new Date().toLocaleDateString('fr-FR').replace(/\//g, '-')
                  const headers = ['Nom', 'Post-nom', 'Identifiant', 'Séances totales', 'Présences', 'Cote Présences /5', 'Cumul notes', 'Cote Devoirs /5', 'Total /10', 'Mention']
                  const rows = cotesDataFiltres.map(({ etudiant: e, totalSeances, nbPresent, cotePresence, coteDevoirs, cumulNotes, total, mention }) => [
                    e.prenom || '',
                    e.nom || '',
                    e.username || '',
                    String(totalSeances),
                    String(nbPresent),
                    cotePresence !== null ? String(cotePresence) : '',
                    cumulNotes !== undefined ? String(cumulNotes) : '',
                    coteDevoirs !== null ? String(coteDevoirs) : '',
                    total !== null ? String(total) : '',
                    mention || ''
                  ])
                  exportToCSV([headers, ...rows], `campus-ohada-cotes-${date}.csv`)
                }}
              >
                <Download className="h-4 w-4" /> Exporter CSV
              </Button>
            )}
          </div>

          {cotesDataFiltres.length === 0 ? (
            <Card className="border-border">
              <CardContent className="pt-10 pb-10 text-center text-muted-foreground">
                <Award className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p>Aucun étudiant dans ce groupe.</p>
              </CardContent>
            </Card>
          ) : (
            <Card className="border-border overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm min-w-[700px]">
                  <thead className="bg-muted/40">
                    <tr>
                      <th className="text-left px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Étudiant</th>
                      <th className="text-center px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Présences</th>
                      <th className="text-center px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Cote Présences /5</th>
                      <th className="text-center px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Cote Devoirs /5</th>
                      <th className="text-center px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Total /10</th>
                      <th className="text-center px-4 py-2.5 font-medium text-muted-foreground uppercase text-xs tracking-wide">Mention</th>
                    </tr>
                  </thead>
                  <tbody>
                    {cotesDataFiltres.map(({ etudiant: e, totalSeances, nbPresent, cotePresence, coteDevoirs, totalDevoirsNotes, cumulNotes, total, mention }) => (
                      <tr key={e.id} className="border-t border-border/50 hover:bg-muted/20">
                        <td className="px-4 py-2.5">
                          <p className="font-medium">{e.prenom} {e.nom}</p>
                          <p className="text-xs text-muted-foreground font-mono">@{e.username}</p>
                        </td>
                        <td className="px-4 py-2.5 text-center text-xs text-muted-foreground">
                          {totalSeances > 0 ? `${nbPresent}/${totalSeances}` : <span className="opacity-40">—</span>}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {cotePresence !== null
                            ? <span className={cn('font-semibold', cotePresence >= 4 ? 'text-green-600' : cotePresence >= 2.5 ? 'text-yellow-600' : 'text-red-600')}>{cotePresence}</span>
                            : <span className="text-muted-foreground opacity-40">—</span>}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {coteDevoirs !== null
                            ? <span className={cn('font-semibold', coteDevoirs >= 4 ? 'text-green-600' : coteDevoirs >= 2.5 ? 'text-yellow-600' : 'text-red-600')}>{coteDevoirs}</span>
                            : <span className="text-muted-foreground opacity-40">—</span>}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {total !== null
                            ? <span className={cn('font-bold text-base', total >= 8 ? 'text-green-600' : total >= 5 ? 'text-yellow-600' : 'text-red-600')}>{total}</span>
                            : <span className="text-muted-foreground opacity-40">—</span>}
                        </td>
                        <td className="px-4 py-2.5 text-center">
                          {mention ? (
                            <span className={cn(
                              'text-xs px-2 py-0.5 rounded-full font-medium',
                              mention === 'Excellent' ? 'bg-green-100 text-green-800' :
                              mention === 'Bien' ? 'bg-blue-100 text-blue-800' :
                              mention === 'Satisfaisant' ? 'bg-yellow-100 text-yellow-800' :
                              'bg-red-100 text-red-800'
                            )}>{mention}</span>
                          ) : <span className="text-muted-foreground opacity-40">—</span>}
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

      {/* ═══════════════════ ONGLET DEVOIRS ═══════════════════ */}
      {false && (tab as string) === 'devoirs' && ( /* désactivé — devoirs depuis chapitres */
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">{devoirsList.length} devoir{devoirsList.length > 1 ? 's' : ''} créé{devoirsList.length > 1 ? 's' : ''}</p>
            <Button size="sm" onClick={openCreateDevoir}>
              <Plus className="h-4 w-4 mr-1.5" />Nouveau devoir
            </Button>
          </div>

          {devoirsList.length === 0 && (
            <Card className="border-border">
              <CardContent className="pt-10 pb-10 text-center text-muted-foreground">
                <LibraryBig className="h-10 w-10 mx-auto mb-3 opacity-30" />
                <p>Aucun devoir créé.</p>
                <p className="text-xs mt-1">Créez un devoir pour que vos étudiants travaillent dans le journal.</p>
              </CardContent>
            </Card>
          )}

          {devoirsList.map(dev => (
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
          ))}
        </div>
      )}

      {/* ═══════════════════ MODALE DEVOIR (créer/modifier) ═══════════════════ */}
      <Dialog open={showDevoirForm} onOpenChange={setShowDevoirForm}>
        <DialogContent className="max-w-md flex flex-col max-h-[90vh]">
          <DialogHeader className="flex-shrink-0">
            <DialogTitle>{editDevoirId ? 'Modifier le devoir' : 'Nouveau devoir'}</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-y-auto pr-1 space-y-3">
            <div>
              <Label>Titre *</Label>
              <Input value={devoirForm.titre} onChange={e => setDevoirForm(f => ({ ...f, titre: e.target.value }))} placeholder="Ex : Écriture d'un achat comptant=" className="mt-1" />
            </div>

            {/* Type de devoir */}
            <div>
              <Label>Type de devoir *</Label>
              <div className="mt-1.5 grid grid-cols-4 gap-2">
                {(['pratique', 'theorique', 'mixte', 'qcm'] as const).map(t => {
                  const labels = { pratique: '📊 Pratique', theorique: '📝 Théorique', mixte: '🔀 Mixte', qcm: '🎯 QCM' }
                  const descs = { pratique: 'Journal + états', theorique: 'Réponses texte', mixte: 'Les deux', qcm: 'Choix multiples' }
                  const selected = devoirForm.type === t
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setDevoirForm(f => ({ ...f, type: t }))}
                      className={`flex flex-col items-center gap-0.5 px-2 py-2.5 rounded-lg border text-center transition-colors ${
                        selected
                          ? 'border-primary bg-primary/5 text-primary'
                          : 'border-border hover:border-primary/40 text-foreground'
                      }`}
                    >
                      <span className="text-xs font-semibold">{labels[t]}</span>
                      <span className="text-xs text-muted-foreground">{descs[t]}</span>
                    </button>
                  )
                })}
              </div>
            </div>

            <div>
              <Label>Cours *</Label>
              <Select value={devoirForm.coursId || '__none__'} onValueChange={v => {
                const c = coursList.find(cc => cc.id === v)
                setDevoirForm(f => ({ ...f, coursId: v === '__none__' ? '' : v, universiteId: c ? (c as any).universiteId || '' : '', faculteId: c ? (c as any).faculteId || '' : '' }))
              }}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Sélectionner un cours=" /></SelectTrigger>
                <SelectContent>
                  {getCoursUniques(coursList).map(c => (
                    <SelectItem key={c.id} value={c.id}>{c.nom}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* ═══ SECTION QCM ═══ */}
            {devoirForm.type === 'qcm' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label>Questions ({qcmQuestions.length})</Label>
                  <Button type="button" size="sm" variant="outline" onClick={addQcmQuestion} className="gap-1">
                    <Plus className="h-3.5 w-3.5" /> Ajouter une question
                  </Button>
                </div>
                {qcmQuestions.length === 0 && (
                  <p className="text-xs text-muted-foreground text-center py-4 border border-dashed border-border rounded-lg">Aucune question. Cliquez sur "Ajouter une question=" pour commencer.</p>
                )}
                {qcmQuestions.map((q, qIdx) => (
                  <div key={q.id} className="border border-border rounded-lg p-4 space-y-3 bg-muted/30">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-semibold text-muted-foreground">Question {qIdx + 1}</span>
                      <button type="button" onClick={() => removeQcmQuestion(qIdx)} className="text-destructive hover:text-destructive/80 text-xs">Supprimer</button>
                    </div>
                    <div>
                      <Label className="text-xs">Énoncé *</Label>
                      <textarea
                        value={q.texte}
                        onChange={e => updateQcmQuestion(qIdx, 'texte', e.target.value)}
                        placeholder="Ex : Quel compte est utilisé pour enregistrer une vente de marchandises ?"
                        className="w-full mt-1 text-sm border border-border rounded-md p-2 bg-background resize-none"
                        rows={2}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs">Choix de réponses (cochez la bonne réponse)</Label>
                      {q.choix.map((choix, cIdx) => (
                        <div key={cIdx} className="flex items-center gap-2">
                          <input
                            type="radio"
                            name={`bonne-reponse-${q.id}`}
                            checked={q.bonneReponse === cIdx}
                            onChange={() => updateQcmQuestion(qIdx, 'bonneReponse', cIdx)}
                            className="accent-primary"
                          />
                          <Input
                            value={choix}
                            onChange={e => updateQcmChoix(qIdx, cIdx, e.target.value)}
                            placeholder={`Choix ${cIdx + 1}`}
                            className="h-8 text-sm flex-1"
                          />
                        </div>
                      ))}
                    </div>
                    <div>
                      <Label className="text-xs">Explication (optionnel : affichée après correction)</Label>
                      <Input
                        value={q.explication}
                        onChange={e => updateQcmQuestion(qIdx, 'explication', e.target.value)}
                        placeholder="Ex : Le compte 701 est crédité lors d'une vente de marchandises.="
                        className="mt-1 h-8 text-sm"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div>
              <Label>Date limite *</Label>
              <Input type="date" value={devoirForm.dateLimit} onChange={e => setDevoirForm(f => ({ ...f, dateLimit: e.target.value }))} className="mt-1" />
            </div>
            <div>
              <Label>Consignes</Label>
              <textarea
                value={devoirForm.consignes}
                onChange={e => setDevoirForm(f => ({ ...f, consignes: e.target.value }))}
                placeholder="Instructions pour les étudiants..."
                rows={3}
                className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
            </div>
            {/* Upload PDF énoncé */}
            <div>
              <Label>Fichier PDF énoncé (optionnel)</Label>
              <div className="mt-1">
                {/* Fichier nouveau sélectionné */}
                {pdfFile ? (
                  <div className="flex items-center gap-2 p-3 rounded-md border border-green-300 bg-green-50 overflow-hidden">
                    <FileText className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="text-sm text-green-700 flex-1 truncate min-w-0">{pdfFile.name}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{(pdfFile.size / 1024 / 1024).toFixed(1)} Mo</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive shrink-0" onClick={() => { setPdfFile(null); setDevoirForm(f => ({ ...f, pdfNom: '' })) }} aria-label="Retirer le fichier PDF">
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ) : devoirForm.pdfNom ? (
                  // PDF existant (déjà uploadé)
                  <div className="flex items-center gap-2 p-3 rounded-md border border-blue-300 bg-blue-50 overflow-hidden">
                    <FileText className="h-4 w-4 text-blue-600 shrink-0" />
                    <span className="text-sm text-blue-700 flex-1 truncate min-w-0">{devoirForm.pdfNom}</span>
                    <span className="text-xs text-blue-500">Déjà uploadé</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => setDevoirForm(f => ({ ...f, pdfData: '', pdfNom: '' }))} aria-label="Retirer le fichier PDF">
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex items-center gap-2 p-3 rounded-md border border-dashed border-border cursor-pointer hover:bg-muted/40 transition-colors">
                    <Paperclip className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Cliquer pour joindre un PDF</span>
                    <input
                      type="file"
                      accept=".pdf,application/pdf"
                      className="hidden"
                      onChange={e => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        if (file.size > 20 * 1024 * 1024) {
                          toast({ title: 'Fichier trop volumineux (max 20 Mo)', variant: 'destructive' }); return
                        }
                        setPdfFile(file)
                        setDevoirForm(f => ({ ...f, pdfNom: file.name }))
                        e.target.value = ''
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
          <DialogFooter className="flex-shrink-0 pt-2 border-t border-border">
            <Button variant="outline" onClick={() => setShowDevoirForm(false)} disabled={pdfUploading}>Annuler</Button>
            <Button onClick={handleSaveDevoir} disabled={!devoirForm.titre.trim() || !devoirForm.coursId || !devoirForm.dateLimit || pdfUploading}>
              {pdfUploading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Upload en cours...
                </span>
              ) : editDevoirId ? 'Enregistrer' : 'Créer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* ═══ Confirm delete devoir ═══ */}
      <AlertDialog open={!!deleteDevoirId} onOpenChange={o => !o && setDeleteDevoirId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer ce devoir ?</AlertDialogTitle>
            <AlertDialogDescription>Toutes les soumissions associées seront aussi supprimées.</AlertDialogDescription>
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
          <div className="space-y-3">
            <div>
              <Label>Note (0 à 20) *</Label>
              <Input type="number" min="0" max="20" step="0.5" value={correctionNote} onChange={e => setCorrectionNote(e.target.value)} placeholder="Ex : 14" className="mt-1" />
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
                  <div><p className="text-xs text-muted-foreground">Étudiant</p><p className="font-medium">{etu ? `${etu.prenom} ${etu.nom}` : '—'}</p></div>
                  <div><p className="text-xs text-muted-foreground">Devoir</p><p className="font-medium">{dev?.titre || '—'}</p></div>
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

                {/* Note existante */}
                {viewSoumission.statut === 'note' && (
                  <div className="bg-muted/40 rounded-md p-3">
                    <p className="text-xs text-muted-foreground mb-1">Note attribuée</p>
                    <p className={cn('text-2xl font-bold', viewSoumission.note! >= 10 ? 'text-green-600' : 'text-red-500')}>{viewSoumission.note}/20</p>
                    {viewSoumission.commentaire && <p className="text-xs mt-2 text-foreground">{viewSoumission.commentaire}</p>}
                  </div>
                )}
              </div>
            )
          })()}
          <DialogFooter className="flex-shrink-0 pt-2 border-t border-border">
            {viewSoumission?.statut === 'soumis' && (
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
            <div>
              <Label>Mot de passe *</Label>
              <PasswordInput value={userForm.password} onChange={e => setUserForm(f => ({ ...f, password: e.target.value }))} className="mt-1" />
            </div>

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

            {/* Université + Faculté pour profs/assistants */}
            {(userForm.role === 'professeur' || userForm.role === 'assistant') && (
              <>
                <div>
                  <Label>Université rattachée</Label>
                  <Select value={userForm.universiteId || '__none__'} onValueChange={v => setUserForm(f => ({ ...f, universiteId: v === '__none__' ? '' : v, faculteId: '' } as any))}>
                    <SelectTrigger className="mt-1"><SelectValue placeholder="Sans université" /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="__none__">— Aucune —</SelectItem>
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
                        <SelectItem value="__none__">— Aucune —</SelectItem>
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
                    <Select value={(userForm as any).faculteId || '__none__'} onValueChange={v => setUserForm(f => ({ ...f, faculteId: v === '__none__' ? '' : v } as any))}>
                      <SelectTrigger className="mt-1"><SelectValue placeholder="Sélectionner une faculté" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="__none__">— Aucune faculté —</SelectItem>
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
                    <Input value={userForm.classe} onChange={e => setUserForm(f => ({ ...f, classe: e.target.value }))} placeholder="ex: L1 Comptabilité" className="mt-1" />
                  </div>
                  <div>
                    <Label>Téléphone</Label>
                    <Input value={userForm.telephone} onChange={e => setUserForm(f => ({ ...f, telephone: e.target.value }))} placeholder="+243..." className="mt-1" />
                  </div>
                </div>
                {/* Cours : multi-sélection */}
                {coursList.filter(c => c.actif).length > 0 && (
                  <div>
                    <Label>Cours inscrits</Label>
                    <div className="mt-1.5 flex flex-wrap gap-2">
                      {getCoursUniques(coursList).map(c => {
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
                            {selected ? '✓ ' : ''}{c.nom}
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
            <Button onClick={handleSaveUser} disabled={!userForm.username.trim() || !userForm.nom.trim() || !userForm.password.trim()}>
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

      {/* ═══════════════════ MODALE COURS ═══════════════════ */}
      <Dialog open={showCoursForm} onOpenChange={setShowCoursForm}>
        <DialogContent className="max-w-sm">
          <DialogHeader>
            <DialogTitle>{editCoursId ? 'Modifier le cours' : 'Nouveau cours'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            {/* Université : obligatoire si pas encore défini */}
            {!editCoursId && (
              <div>
                <Label>Université *</Label>
                <Select value={coursForm.universiteId || '__none__'} onValueChange={v => setCoursForm(f => ({ ...f, universiteId: v === '__none__' ? '' : v, faculteId: '' }))}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Choisir une université" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">— Choisir —</SelectItem>
                    {universites.map(u => <SelectItem key={u.id} value={u.id}>{u.nom}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Faculté : filtrée par université */}
            {!editCoursId && coursForm.universiteId && (
              <div>
                <Label>Faculté *</Label>
                <Select value={coursForm.faculteId || '__none__'} onValueChange={v => setCoursForm(f => ({ ...f, faculteId: v === '__none__' ? '' : v }))}>
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Choisir une faculté" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">— Choisir —</SelectItem>
                    {facultesList.filter(f => f.universiteId === coursForm.universiteId && f.actif).map(f => (
                      <SelectItem key={f.id} value={f.id}>{f.nom}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}
            {/* Promotion */}
            <div>
              <Label>Promotion *</Label>
              <Select value={coursForm.promotion || '__none__'} onValueChange={v => setCoursForm(f => ({ ...f, promotion: v === '__none__' ? '' : v }))}>
                <SelectTrigger className="mt-1"><SelectValue placeholder="Sélectionner une promotion" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="__none__">— Toutes promotions —</SelectItem>
                  {(['L1', 'L2', 'L3', 'M1', 'M2'] as const).map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Cours *</Label>
              {editCoursId ? (
                <Input value={coursForm.nom} onChange={e => setCoursForm(f => ({ ...f, nom: e.target.value }))} className="mt-1" />
              ) : (
                <Select
                  value={coursForm.coursSystemeId || '__none__'}
                  onValueChange={v => {
                    if (v === '__none__') {
                      setCoursForm(f => ({ ...f, coursSystemeId: '', nom: '', description: '' }))
                      return
                    }
                    const cs = COURS_SYSTEME.find(c => c.id === v)
                    setCoursForm(f => ({ ...f, coursSystemeId: v, nom: cs?.nom || '', description: cs?.description || '' }))
                  }}
                >
                  <SelectTrigger className="mt-1"><SelectValue placeholder="Sélectionner un cours" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="__none__">— Choisir —</SelectItem>
                    {COURS_SYSTEME.map(c => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.nom}{!c.actif ? ' (bientôt)' : ''}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
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
            <Button
              onClick={handleSaveCours}
              disabled={!coursForm.nom.trim() || (!editCoursId && (!coursForm.universiteId || !coursForm.faculteId || !coursForm.coursSystemeId))}
            >
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
