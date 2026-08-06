import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import React, { useState, useEffect } from 'react'
import BackButton from '@/components/BackButton'
import { useNav } from '@/lib/navContext'
import { getDocumentsAsync, saveDocumentAsync, deleteDocumentAsync, onUsersSnapshot } from '@/lib/db-firebase'
import { uploadDocumentFile } from '@/lib/db-firebase'
import { useAllCours } from '@/lib/useFirestore'
// PROMOTIONS statique supprimé — on dérive depuis les cours réels
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog'
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Plus, Trash2, FolderOpen, FileText, Download, Lock, Eye, BookOpen, ClipboardList, ChevronDown, ChevronRight, Paperclip, FileDown, X, GraduationCap, Scale } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { cn } from '@/lib/utils'
import { useNotesCours } from '@/lib/useFirestore'

// Sous-dossiers disponibles
const FOLDERS = [
  {
    id: 'notes-cours',
    label: 'Notes de cours et documents de travail',
    icon: <BookOpen className="h-5 w-5" />,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
  {
    id: 'exercices',
    label: 'Exercices et applications',
    icon: <ClipboardList className="h-5 w-5" />,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
  },
  {
    id: 'fiscalite',
    label: 'Fiscalité : Textes légaux et références',
    icon: <Scale className="h-5 w-5" />,
    color: 'text-purple-600',
    bg: 'bg-purple-50',
  },
]

const DOC_TYPES = ['cours', 'exercice', 'corrigé', 'référence', 'autre']

// Document système OHADA : toujours présent dans "notes-cours", non supprimable
const SYSTEM_DOC = {
  id: '__system_ohada_plan_comptable__',
  titre: 'Plan Comptable OHADA 2017',
  type: 'référence',
  description: "Acte Uniforme OHADA relatif au droit comptable et à l'information financière : SYSCOHADA Révisé 2017.",
  filename: 'OHADA-Plan-comptable-2017.pdf',
  folderId: 'notes-cours',
  system: true,
}

// Documents système Comptabilité : non supprimables
const SYSTEM_DOCS_COMPTA = [
  {
    id: '__system_ohada_plan_comptable__',
    titre: 'Plan Comptable OHADA 2017',
    type: 'référence',
    description: "Acte Uniforme OHADA relatif au droit comptable et à l'information financière : SYSCOHADA Révisé 2017.",
    filename: 'OHADA-Plan-comptable-2017.pdf',
    folderId: 'notes-cours',
    system: true,
  },
]

// Documents système Fiscalité : non supprimables
const SYSTEM_DOCS_FISCALITE = [
  {
    id: '__system_fiscalite_irpp__',
    titre: 'Module IRPP : Direction Générale des Impôts',
    type: 'référence',
    description: 'Module officiel DGI sur l\'Impôt sur les Revenus des Personnes Physiques (IRPP) en RDC. 89 pages.',
    filename: 'Module-IRPP.pdf',
    system: true,
  },
  {
    id: '__system_fiscalite_is__',
    titre: 'Loi n°23/052 du 30/11/2023 — Impôt sur les Sociétés (IS)',
    type: 'référence',
    description: 'Loi n°23/052 portant Impôt sur les Sociétés (IS) en RDC. Taux : 30% bénéfice net + minimum 1% CA. Acomptes : juil./sept./nov.',
    filename: 'Loi-Impot-sur-les-Societes.pdf',
    system: true,
  },
  {
    id: '__system_fiscalite_lf2025__',
    titre: 'LF 2025 — Présentation FEC-UniKin (Innovations fiscales)',
    type: 'référence',
    description: 'Présentation des innovations de la Loi de Finances Mars 2025 par le Prof. MAPOTI, FEC-Université de Kinshasa. 176 slides.',
    filename: 'Loi-Finances-Mars-2025.pdf',
    system: true,
  },
  {
    id: '__system_fiscalite_cgi__',
    titre: 'Code Général des Impôts : RDC 2023',
    type: 'référence',
    description: 'Code Général des Impôts de la République Démocratique du Congo, édition 2023.',
    filename: 'Code-General-Impots-RDC-2023.pdf',
    system: true,
  },
  {
    id: '__system_lf2025__',
    titre: 'Loi n°24/011 du 20 décembre 2024 (LF 2025)',
    type: 'loi',
    description: 'Loi de Finances pour l’exercice 2025 de la République Démocratique du Congo. Modifie notamment l’IRPP, l’IS et la TVA.',
    filename: 'LF2025-Loi-24-011.pdf',
    system: true,
    systeme: true,
    badge: 'Protégé',
  },
  {
    id: '__system_lf2026__',
    titre: 'Loi n°25/060 du 29 décembre 2025 (LF 2026)',
    type: 'loi',
    description: 'Loi de Finances pour l’exercice 2026 de la République Démocratique du Congo. Dernières dispositions fiscales en vigueur.',
    filename: 'LF2026-Loi-25-060.pdf',
    system: true,
    systeme: true,
    badge: 'Protégé',
  },
  {
    id: '__system_cpcc_circulaire_2025__',
    titre: 'Circulaire CPCC N°757/2025 — Dépôt états financiers SYSCOHADA/SYCEBNL',
    type: 'référence',
    description: 'Note circulaire du Conseil Permanent de la Comptabilité au Congo (CPCC) relative à la réception des états financiers et au recouvrement des astreintes pour non-dépôt. Date butoir : 30 juin N+1. Astreinte : USD 100 + USD 100/jour de retard. Signée le 17 juin 2025 par le Prof. William MBUYAMBA KALOMBAYI.',
    filename: 'Circulaire-CPCC-SYSCOHADA-SYCEBNL-juin-2025L-1.pdf',
    system: true,
    badge: 'CPCC 2025',
  },
]

// Mini-composant pour afficher le contenu texte d'une note
function NoteContenuDialog({ note }: { note: any }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <Button variant="outline" size="sm" className="flex-1 h-7 text-xs" onClick={() => setOpen(true)}>
        <Eye className="h-3 w-3 mr-1" /> Lire
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{note.titre}</DialogTitle></DialogHeader>
          <p className="text-xs text-muted-foreground mb-2">
            {new Date(note.dateCreation).toLocaleDateString('fr-FR')}
          </p>
          <div className="max-h-96 overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap font-sans">{note.contenu || 'Aucun contenu.'}</pre>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default function DocumentsPage() {
  const { toast } = useToast()
  const user = useUser()
  const { nav } = useNav()
  const coursParam = nav.cours  // 'fiscalite' | 'comptabilite-generale' | ''

  // Sélection du module actif (deux boutons en haut)
  const defaultModule = coursParam === 'fiscalite' ? 'fiscalite' : 'comptabilite'
  const [moduleActif, setModuleActif] = React.useState<'comptabilite' | 'fiscalite'>(defaultModule as any)

  // Cours disponibles pour le formulaire prof
  const { cours: allCours } = useAllCours()

  // Promotions dynamiques : union de cours.promotion + user.classe (valeurs réelles Firebase)
  const [dynamicPromotions, setDynamicPromotions] = useState<string[]>([])
  useEffect(() => {
    // Depuis les cours
    const fromCours = allCours.map(c => (c as any).promotion).filter(Boolean) as string[]
    // Depuis les étudiants
    const unsub = onUsersSnapshot((users) => {
      const fromUsers = users.map(u => (u as any).classe).filter(Boolean) as string[]
      const merged = Array.from(new Set([...fromCours, ...fromUsers])).sort()
      setDynamicPromotions(merged)
    })
    return () => unsub()
  }, [allCours])

  // Promotion de l'étudiant connecté (champ 'classe', ex: 'L1')
  const isEtudiant = isStudentRole(user)
  const userPromotion: string = (user as any)?.classe || ''
  const userCoursIds: string[] = (user as any)?.coursIds || []

  const [docs, setDocs] = useState<any[]>([])
  React.useEffect(() => {
    if (!user?.id) return
    if (isEtudiant) {
      // ISOLATION STRICTE : on passe promotion + CHAQUE cours inscrit
      // On charge les docs pour chaque cours et on fusionne (dédupliqué)
      if (!userPromotion || userCoursIds.length === 0) { setDocs([]); return }
      Promise.all(
        userCoursIds.map(cid => getDocumentsAsync(user.id, userPromotion, cid))
      ).then(results => {
        const merged = results.flat()
        // Dédupliquer par id
        const seen = new Set<string>()
        setDocs(merged.filter(d => { if (seen.has(d.id)) return false; seen.add(d.id); return true }))
      }).catch(() => {})
    } else {
      // Prof/admin : voit tout
      getDocumentsAsync(user?.id).then(setDocs).catch(() => {})
    }
  }, [user?.id, isEtudiant, userPromotion, JSON.stringify(userCoursIds)])

  // Notes de cours : ISOLATION STRICTE — promotion + cours obligatoires
  const { notes: notesCours } = useNotesCours(
    isEtudiant ? userCoursIds : [],
    isEtudiant ? userPromotion : undefined
  )

  const [showForm, setShowForm] = useState(false)
  const [viewDoc, setViewDoc] = useState<any>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)
  // coursId OBLIGATOIRE pour isoler les documents (promotionId supprimé du formulaire)
  const [form, setForm] = useState({ titre: '', contenu: '', type: 'cours', folderId: 'notes-cours', pdfNom: '', promotionId: '', coursId: '' })
  const formValid = !!form.titre.trim() && !!form.coursId
  const [docFile, setDocFile] = useState<File | null>(null)
  const [docUploading, setDocUploading] = useState(false)
  const [search, setSearch] = useState('')
  const [filtrePromotion, setFiltrePromotion] = useState('')
  const [openFolders, setOpenFolders] = useState<Set<string>>(new Set(['notes-cours', 'exercices']))

  const canCreate = ['admin', 'professeur', 'assistant'].includes(user?.role || '')

  const toggleFolder = (id: string) => {
    setOpenFolders(prev => {
      const n = new Set(prev)
      n.has(id) ? n.delete(id) : n.add(id)
      return n
    })
  }

  const handleSave = async () => {
    if (!form.titre.trim()) return
    setDocUploading(true)
    try {
      let pdfUrl: string | undefined
      let pdfNom: string | undefined = form.pdfNom || undefined
      if (docFile) {
        pdfUrl = await uploadDocumentFile(user?.id || 'shared', docFile)
        pdfNom = docFile.name
      }
      const docData: any = {
        ...form,
        pdfUrl,
        pdfNom,
        userId: user?.id || '',
        promotionId: form.promotionId || undefined,
        coursId: form.coursId || undefined,
      }
      await saveDocumentAsync(docData)
      const updated = await getDocumentsAsync(user?.id)
      setDocs(updated)
      setShowForm(false)
      setForm({ titre: '', contenu: '', type: 'cours', folderId: 'notes-cours', pdfNom: '', promotionId: '', coursId: '' })
      setDocFile(null)
      toast({ title: 'Document enregistré' })
    } catch (err: any) {
      toast({ title: 'Erreur upload : ' + (err?.message || 'inconnue'), variant: 'destructive' })
    } finally {
      setDocUploading(false)
    }
  }

  const handleDelete = async () => {
    if (!deleteId) return
    await deleteDocumentAsync(deleteId)
    const promoFilter = isEtudiant ? userPromotion || undefined : undefined
    const updated = await getDocumentsAsync(user?.id, promoFilter)
    setDocs(updated)
    setDeleteId(null)
    toast({ title: 'Document supprimé', variant: 'destructive' })
  }

  const handleDownloadSystem = () => {
    const a = document.createElement('a')
    a.href = './OHADA-Plan-comptable-2017.pdf'
    a.download = 'OHADA-Plan-comptable-2017.pdf'
    a.target = '_blank'
    a.click()
  }

  const matchesSearch = (titre: string, type: string) => {
    if (!search) return true
    const q = search.toLowerCase()
    return titre.toLowerCase().includes(q) || type.toLowerCase().includes(q)
  }

  // Filtre promotion côté prof : filtre les docs utilisateurs par promotionId
  const matchesPromotion = (doc: any) => {
    if (!filtrePromotion) return true
    // doc sans promotionId = visible toutes promotions
    if (!doc.promotionId) return true
    return doc.promotionId === filtrePromotion
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 border border-primary/20 shadow-sm transition-all duration-300 hover:scale-110 hover:rotate-6">
                <FolderOpen className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="font-display text-xl font-bold text-foreground tracking-tight">Documents</h1>
                <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground mt-0.5">
                  {coursParam === 'fiscalite'
                    ? 'Ressources : Module Fiscalité'
                    : coursParam === 'comptabilite-generale'
                    ? 'Ressources : Comptabilité Générale'
                    : 'Ressources pédagogiques SYSCOHADA'}
                </p>
              </div>
            </div>
            {canCreate && (
              <Button size="sm" onClick={() => setShowForm(true)} className="animate-slideDown" style={{ animationDelay: '200ms' }}>
                <Plus className="h-4 w-4 mr-1" /> Nouveau document
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* ── Boutons de sélection du module ── */}
      <div className="animate-slideUp flex gap-2" style={{ animationDelay: '60ms' }}>
        <button
          onClick={() => setModuleActif('comptabilite')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all',
            moduleActif === 'comptabilite'
              ? 'bg-blue-600 text-white border-blue-600 shadow-md'
              : 'bg-card border-border text-foreground hover:bg-muted/40'
          )}
        >
          <BookOpen className="h-4 w-4" />
          Comptabilité
        </button>
        <button
          onClick={() => setModuleActif('fiscalite')}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold border transition-all',
            moduleActif === 'fiscalite'
              ? 'bg-purple-600 text-white border-purple-600 shadow-md'
              : 'bg-card border-border text-foreground hover:bg-muted/40'
          )}
        >
          <Scale className="h-4 w-4" />
          Fiscalité
        </button>
      </div>

      <div className="animate-slideUp flex flex-wrap gap-2 items-center" style={{ animationDelay: '80ms' }}>
        <Input
          placeholder="Rechercher par titre ou type..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="max-w-sm"
        />
        {/* Filtre promotion : visible uniquement pour prof/admin */}
        {canCreate && (
          <select
            value={filtrePromotion}
            onChange={e => setFiltrePromotion(e.target.value)}
            className="rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          >
            <option value="">Toutes les promotions</option>
            {dynamicPromotions.map(p => <option key={p} value={p}>{p}</option>)}
          </select>
        )}
        {filtrePromotion && canCreate && (
          <button
            onClick={() => setFiltrePromotion('')}
            className="text-xs text-primary hover:underline"
          >Réinitialiser</button>
        )}
      </div>

      {/* ── Notes de cours (étudiants uniquement) ── */}
      {isEtudiant && (
        <div className="animate-slideUp" style={{ animationDelay: '120ms' }}>
          <div className="border border-border rounded-lg overflow-hidden">
            {/* En-tête */}
            <div className="flex items-center gap-3 px-4 py-3 bg-card border-b border-border">
              <div className="w-8 h-8 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                <GraduationCap className="h-5 w-5 text-green-600" />
              </div>
              <span className="flex-1 font-semibold text-foreground">Notes de cours</span>
              <Badge variant="secondary">{notesCours.filter(n => n.actif).length}</Badge>
            </div>

            {/* Contenu */}
            <div className="bg-muted/10 p-3">
              {userCoursIds.length === 0 ? (
                <p className="text-sm text-muted-foreground italic text-center py-4">
                  Vous n'êtes inscrit à aucun cours. Contactez votre professeur.
                </p>
              ) : notesCours.filter(n => n.actif).length === 0 ? (
                <p className="text-sm text-muted-foreground italic text-center py-4">
                  Aucune note de cours disponible pour vos cours.
                </p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {notesCours.filter(n => n.actif).map(note => (
                    <Card key={note.id} className="border-border hover:border-green-300 transition-colors">
                      <CardContent className="pt-3 pb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-9 h-9 rounded-lg bg-green-50 flex items-center justify-center flex-shrink-0">
                            <BookOpen className="h-4 w-4 text-green-600" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{note.titre}</p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {new Date(note.dateCreation).toLocaleDateString('fr-FR')}
                            </p>
                            <div className="flex gap-2 mt-2">
                              {note.pdfUrl ? (
                                <>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="flex-1 h-7 text-xs"
                                    onClick={() => window.open(note.pdfUrl, '_blank')}
                                  >
                                    <Eye className="h-3 w-3 mr-1" /> Ouvrir
                                  </Button>
                                  <Button
                                    variant="outline"
                                    size="sm"
                                    className="h-7 text-xs text-red-600 border-red-300 hover:bg-red-50"
                                    onClick={() => {
                                      const a = document.createElement('a')
                                      a.href = note.pdfUrl!
                                      a.download = note.titre + '.pdf'
                                      a.target = '_blank'
                                      a.click()
                                    }}
                                  >
                                    <FileDown className="h-3 w-3" />
                                  </Button>
                                </>
                              ) : note.contenu ? (
                                <NoteContenuDialog note={note} />
                              ) : (
                                <span className="text-xs text-muted-foreground italic">Aucun contenu</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Sous-dossiers ── */}
      <div className="space-y-3">
        {FOLDERS
        .filter(folder => {
          // Filtrage basé sur le module actif sélectionné par les boutons
          if (moduleActif === 'fiscalite') return folder.id === 'fiscalite'
          // Comptabilité : notes-cours + exercices uniquement
          return folder.id !== 'fiscalite'
        })
        .map(folder => {
          const isOpen = openFolders.has(folder.id)

          // Docs utilisateurs dans ce dossier
          const folderDocs = docs.filter(d =>
            (d as any).folderId === folder.id &&
            matchesSearch(d.titre, d.type) &&
            matchesPromotion(d)
          )

          // Doc système Plan Comptable OHADA : uniquement dans notes-cours en mode Comptabilité
          const showSystem = folder.id === 'notes-cours'
            && matchesSearch(SYSTEM_DOC.titre, SYSTEM_DOC.type)
            && moduleActif === 'comptabilite'

          // Docs système Fiscalité
          const showFiscalite = folder.id === 'fiscalite'
          const fiscaliteDocs = showFiscalite
            ? SYSTEM_DOCS_FISCALITE.filter(d => matchesSearch(d.titre, d.type))
            : []

          const totalCount = folderDocs.length
            + (showSystem ? 1 : 0)
            + (folder.id === 'fiscalite' ? SYSTEM_DOCS_FISCALITE.length : 0)

          return (
            <div key={folder.id} className="border border-border rounded-lg overflow-hidden">

              {/* En-tête dossier */}
              <button
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-muted/40 transition-colors bg-card"
                onClick={() => toggleFolder(folder.id)}
              >
                <div className={`w-8 h-8 rounded-lg ${folder.bg} flex items-center justify-center flex-shrink-0 ${folder.color}`}>
                  {folder.icon}
                </div>
                <span className="flex-1 text-left font-semibold text-foreground">{folder.label}</span>
                <Badge variant="secondary" className="mr-1">{totalCount}</Badge>
                {isOpen
                  ? <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  : <ChevronRight className="h-4 w-4 text-muted-foreground" />
                }
              </button>

              {/* Contenu dossier */}
              {isOpen && (
                <div className="border-t border-border bg-muted/10 p-3 space-y-3">

                  {/* Document système OHADA (notes-cours uniquement) */}
                  {showSystem && (
                    <Card className="border-primary/30 bg-primary/5">
                      <CardContent className="pt-3 pb-3">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                            <FileText className="h-5 w-5 text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-sm text-foreground">{SYSTEM_DOC.titre}</p>
                              <Badge variant="outline" className="text-xs px-1.5 py-0 border-primary/40 text-primary">référence</Badge>
                              <Badge variant="outline" className="text-xs px-1.5 py-0 flex items-center gap-1">
                                <Lock className="h-2.5 w-2.5" /> Protégé
                              </Badge>
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{SYSTEM_DOC.description}</p>
                            <div className="flex gap-2 mt-2">
                              <Button size="sm" onClick={handleDownloadSystem} className="gap-1.5 h-7 text-xs">
                                <Download className="h-3 w-3" /> Télécharger
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => window.open('./OHADA-Plan-comptable-2017.pdf', '_blank')} className="gap-1.5 h-7 text-xs">
                                <Eye className="h-3 w-3" /> Ouvrir
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {/* Documents système Fiscalité */}
                  {showFiscalite && fiscaliteDocs.map(doc => (
                    <Card key={doc.id} className={cn(
                      'border-purple-200 bg-purple-50/40',
                      (doc as any).badge === 'CPCC 2025' && 'border-orange-200 bg-orange-50/40'
                    )}>
                      <CardContent className="pt-3 pb-3">
                        <div className="flex items-start gap-3">
                          <div className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0',
                            (doc as any).badge === 'CPCC 2025'
                              ? 'bg-orange-100'
                              : 'bg-purple-100'
                          )}>
                            <Scale className={cn('h-5 w-5', (doc as any).badge === 'CPCC 2025' ? 'text-orange-600' : 'text-purple-600')} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <p className="font-semibold text-sm text-foreground">{doc.titre}</p>
                              <Badge variant="outline" className={cn('text-xs px-1.5 py-0',
                                (doc as any).badge === 'CPCC 2025'
                                  ? 'border-orange-400 text-orange-600'
                                  : 'border-purple-400 text-purple-600'
                              )}>{doc.type}</Badge>
                              {(doc as any).badge ? (
                                <Badge variant="outline" className={cn('text-xs px-1.5 py-0 flex items-center gap-1',
                                  (doc as any).badge === 'CPCC 2025'
                                    ? 'border-orange-400 text-orange-600'
                                    : ''
                                )}>
                                  {(doc as any).badge !== 'CPCC 2025' && <Lock className="h-2.5 w-2.5" />}
                                  {(doc as any).badge}
                                </Badge>
                              ) : (
                                <Badge variant="outline" className="text-xs px-1.5 py-0 flex items-center gap-1">
                                  <Lock className="h-2.5 w-2.5" /> Protégé
                                </Badge>
                              )}
                            </div>
                            <p className="text-xs text-muted-foreground mt-0.5">{doc.description}</p>
                            <div className="flex gap-2 mt-2">
                              <Button
                                size="sm"
                                className={cn('gap-1.5 h-7 text-xs',
                                  (doc as any).badge === 'CPCC 2025'
                                    ? 'bg-orange-600 hover:bg-orange-700'
                                    : 'bg-purple-600 hover:bg-purple-700'
                                )}
                                onClick={() => {
                                  const a = document.createElement('a')
                                  a.href = './' + doc.filename
                                  a.download = doc.filename
                                  a.target = '_blank'
                                  a.click()
                                }}
                              >
                                <Download className="h-3 w-3" /> Télécharger
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                className="gap-1.5 h-7 text-xs"
                                onClick={() => window.open('./' + doc.filename, '_blank')}
                              >
                                <Eye className="h-3 w-3" /> Ouvrir
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {/* Documents utilisateurs du dossier */}
                  {folderDocs.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                      {folderDocs.map(doc => (
                        <Card key={doc.id} className="border-border">
                          <CardContent className="pt-3 pb-3">
                            <div className="flex items-start gap-3">
                              <FileText className="h-7 w-7 text-primary shrink-0 mt-0.5" />
                              <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{doc.titre}</p>
                                <div className="flex flex-wrap gap-1 mt-1">
                                  <Badge variant="outline" className="text-xs">{doc.type}</Badge>
                                  {(doc as any).promotionId && (
                                    <Badge variant="outline" className="text-xs bg-blue-50 border-blue-300 text-blue-700">
                                      <GraduationCap className="h-2.5 w-2.5 mr-1" />{(doc as any).promotionId}
                                    </Badge>
                                  )}
                                  {!(doc as any).promotionId && canCreate && (
                                    <Badge variant="outline" className="text-xs text-muted-foreground">Tous</Badge>
                                  )}
                                  {(doc as any).coursId && (() => {
                                    const c = allCours.find(c => c.id === (doc as any).coursId)
                                    return c ? (
                                      <Badge variant="outline" className="text-xs bg-purple-50 border-purple-300 text-purple-700">{c.nom}</Badge>
                                    ) : null
                                  })()}
                                </div>
                                <p className="text-xs text-muted-foreground mt-1">
                                  {new Date(doc.dateCreation).toLocaleDateString('fr-FR')}
                                </p>
                                <div className="flex gap-2 mt-2">
                                  {((doc as any).pdfUrl || (doc as any).pdfData) ? (
                                    <Button variant="outline" size="sm" className="flex-1 h-7 text-xs text-red-600 border-red-300 hover:bg-red-50" onClick={() => {
                                      const a = document.createElement('a')
                                      a.href = (doc as any).pdfUrl || (doc as any).pdfData
                                      a.download = (doc as any).pdfNom || doc.titre + '.pdf'
                                      a.target = '_blank'
                                      a.click()
                                    }}>
                                      <FileDown className="h-3 w-3 mr-1" /> PDF
                                    </Button>
                                  ) : (
                                    <Button variant="outline" size="sm" className="flex-1 h-7 text-xs" onClick={() => setViewDoc(doc)}>
                                      <Eye className="h-3 w-3 mr-1" /> Voir
                                    </Button>
                                  )}
                                  {((doc as any).pdfUrl || (doc as any).pdfData) && doc.contenu && (
                                    <Button variant="outline" size="sm" className="h-7 text-xs" onClick={() => setViewDoc(doc)}>
                                      <Eye className="h-3 w-3" />
                                    </Button>
                                  )}
                                  {(canCreate || doc.userId === user?.id) && (
                                    <Button variant="ghost" size="icon" className="h-7 w-7 text-destructive hover:text-destructive" onClick={() => setDeleteId(doc.id)}>
                                      <Trash2 className="h-3 w-3" />
                                    </Button>
                                  )}
                                </div>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    !showSystem && (
                      <p className="text-sm text-muted-foreground italic text-center py-4">
                        Aucun document dans ce dossier.
                      </p>
                    )
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Modale création */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>Nouveau document</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Titre *</Label>
                <Input value={form.titre} onChange={e => setForm(f => ({ ...f, titre: e.target.value }))} className="mt-1" />
              </div>
              <div>
                <Label>Type</Label>
                <Select value={form.type} onValueChange={v => setForm(f => ({ ...f, type: v }))}>
                  <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    {DOC_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label>Dossier</Label>
              <Select value={form.folderId} onValueChange={v => setForm(f => ({ ...f, folderId: v }))}>
                <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {FOLDERS.map(f => <SelectItem key={f.id} value={f.id}>{f.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            {/* Isolation stricte : cours OBLIGATOIRE */}
            <div>
              <Label>Cours ciblé <span className="text-destructive text-xs">* obligatoire</span></Label>
              <Select
                value={form.coursId || '__none__'}
                onValueChange={v => setForm(f => ({ ...f, coursId: v === '__none__' ? '' : v }))}
                disabled={allCours.length === 0}
              >
                <SelectTrigger className="mt-1">
                  <SelectValue placeholder={allCours.length === 0 ? 'Aucun cours disponible' : 'Sélectionner un cours…'} />
                </SelectTrigger>
                <SelectContent>
                  {allCours.filter(c => c.actif).map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.nom}{(c as any).promotion ? ` — ${(c as any).promotion}` : ''}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {/* Indicateur isolation */}
            {form.coursId ? (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-green-50 border border-green-300">
                <GraduationCap className="h-4 w-4 text-green-600 shrink-0" />
                <p className="text-xs text-green-700">
                  Visible uniquement aux étudiants inscrits au cours :
                  <strong> {allCours.find(c => c.id === form.coursId)?.nom || form.coursId}</strong>
                </p>
              </div>
            ) : (
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-red-50 border border-red-300">
                <Lock className="h-4 w-4 text-red-600 shrink-0" />
                <p className="text-xs text-red-700">
                  <strong>Cours obligatoire.</strong> Sélectionnez un cours pour isoler ce document.
                </p>
              </div>
            )}
            {/* Choix : texte OU PDF */}
            <div>
              <Label>Contenu texte</Label>
              <Textarea
                value={form.contenu}
                onChange={e => setForm(f => ({ ...f, contenu: e.target.value }))}
                className="mt-1"
                rows={5}
                placeholder="Contenu textuel du document (optionnel si PDF joint)..."
              />
            </div>
            <div>
              <Label>Fichier PDF (optionnel)</Label>
              <div className="mt-1">
                {docFile ? (
                  <div className="flex items-center gap-2 p-2.5 rounded-md border border-green-300 bg-green-50">
                    <FileText className="h-4 w-4 text-green-600 shrink-0" />
                    <span className="text-sm text-green-700 flex-1 truncate">{docFile.name}</span>
                    <span className="text-xs text-muted-foreground">{(docFile.size/1024/1024).toFixed(1)} Mo</span>
                    <Button variant="ghost" size="icon" className="h-6 w-6 text-destructive" onClick={() => { setDocFile(null); setForm(f => ({ ...f, pdfNom: '' })) }}>
                      <X className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                ) : (
                  <label className="flex items-center gap-2 p-2.5 rounded-md border border-dashed border-border cursor-pointer hover:bg-muted/40 transition-colors">
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
                        setDocFile(file)
                        setForm(f => ({ ...f, pdfNom: file.name }))
                        e.target.value = ''
                      }}
                    />
                  </label>
                )}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)} disabled={docUploading}>Annuler</Button>
            <Button onClick={handleSave} disabled={!formValid || docUploading}>
              {docUploading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  Upload en cours...
                </span>
              ) : 'Enregistrer'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Modale lecture */}
      <Dialog open={!!viewDoc} onOpenChange={o => !o && setViewDoc(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader><DialogTitle>{viewDoc?.titre}</DialogTitle></DialogHeader>
          <div className="flex gap-2 mb-2">
            <Badge variant="outline">{viewDoc?.type}</Badge>
            <span className="text-xs text-muted-foreground">
              {viewDoc && new Date(viewDoc.dateCreation).toLocaleDateString('fr-FR')}
            </span>
          </div>
          <div className="max-h-96 overflow-y-auto">
            <pre className="text-sm whitespace-pre-wrap font-sans">{viewDoc?.contenu || 'Aucun contenu.'}</pre>
          </div>
        </DialogContent>
      </Dialog>

      {/* Confirmation suppression */}
      <AlertDialog open={!!deleteId} onOpenChange={o => !o && setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer le document ?</AlertDialogTitle>
            <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} className="bg-destructive text-destructive-foreground">Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  )
}
