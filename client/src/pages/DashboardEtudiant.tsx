import React from 'react'
import { useHashLocation } from '@/lib/hashLocation'
import {
  BookMarked, ClipboardList, GraduationCap, BookOpen,
  ChevronRight, Award, LibraryBig, Lock, CheckCircle2, Clock, FileDown, User, Download,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { isDevoirExpire, QuestionQCM } from '@/lib/db'
import DevoirChapitreEtudiant from '@/components/DevoirChapitreEtudiant'
import {
  useSessions, useAllCours, useAllDevoirs, useSoumissionsEtudiant,
  useUniversites, useFacultes, useExercices, usePresencesEtudiant,
  useCoursStatuts,
} from '@/lib/useFirestore'
import { createSoumissionAsync, createSessionAsync, getCoursUniquesTries, coursSystemeDe } from '@/lib/db-firebase'
import {
  calculerCote, devoirConcerneEtudiant, estDevoirChapitre, estNotee, estACorriger, baremeDevoir,
  formaterNote, formaterNombre, noteDeCopie, type Cote,
} from '@/lib/cotes'
import { useUser } from '@/lib/userContext'
import { useModule } from '@/lib/moduleContext'
import { cn } from '@/lib/utils'
import { prefetchRoute } from '@/lib/prefetch'
import { DashboardHero, greeting, type DashboardStat } from '@/components/DashboardHero'
import { DashboardModulesGrid } from '@/components/DashboardModulesGrid'
import { DashboardFooter } from '@/components/DashboardFooter'

// ─── Composants devoir (usage étudiant uniquement) ─────────────────────────────

function SoumettreButton({ devoirId, sessionId, navigate }: { devoirId: string; sessionId: string; navigate: (p: string) => void }) {
  return (
    <Button
      size="sm"
      variant="outline"
      className="w-full gap-1.5"
      onClick={() => navigate(`/apercu-devoir?devoir=${devoirId}&session=${sessionId}`)}
    >
      <CheckCircle2 className="h-3.5 w-3.5" />Vérifier avant soumission
    </Button>
  )
}

// QCMForm : interface étudiant pour répondre à un QCM + correction automatique
function QCMForm({ devoir, etudiantId, soumission }: { devoir: any; etudiantId: string; soumission: any }) {
  const questions: QuestionQCM[] = devoir.questions || []
  const [reponses, setReponses] = React.useState<Record<number, number>>({})
  const [soumis, setSoumis] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [resultat, setResultat] = React.useState<{ score: number; total: number; details: boolean[] } | null>(null)

  if (soumission && estNotee(soumission)) {
    return (
      <div className="mt-3 bg-green-50 border border-green-200 rounded-lg p-3 space-y-1">
        <p className="text-sm font-semibold text-green-700">✓ QCM corrigé automatiquement</p>
        <p className="text-sm text-green-700">Note : <strong>{formaterNombre(noteDeCopie(soumission, devoir) ?? 0)}/10</strong></p>
        {soumission.commentaire && <p className="text-xs text-muted-foreground">{soumission.commentaire}</p>}
      </div>
    )
  }

  if (soumission && estACorriger(soumission)) {
    return (
      <p className="mt-2 text-xs text-blue-600 flex items-center gap-1">
        <Lock className="h-3 w-3" /> QCM soumis : correction en cours...
      </p>
    )
  }

  if (questions.length === 0) {
    return <p className="mt-2 text-xs text-muted-foreground">Aucune question disponible pour ce QCM.</p>
  }

  const toutesRépondu = questions.every((_, i) => reponses[i] !== undefined)

  const handleSubmit = async () => {
    if (!toutesRépondu) return
    setLoading(true)
    const details = questions.map((q, i) => reponses[i] === q.bonneReponse)
    const score = details.filter(Boolean).length
    const note = Math.round((score / questions.length) * 10 * 10) / 10
    const reponsesArray = questions.map((_, i) => reponses[i])
    try {
      await createSoumissionAsync({
        devoirId: devoir.id,
        etudiantId,
        reponsesQCM: reponsesArray,
        dateSoumission: new Date().toISOString(),
        statut: 'note',
        note,
        commentaire: `Correction automatique : ${score}/${questions.length} bonne${score > 1 ? 's' : ''} réponse${score > 1 ? 's' : ''}.`,
        dateCorrection: new Date().toISOString(),
      } as any)
      setResultat({ score, total: questions.length, details })
      setSoumis(true)
    } catch (err: any) {
      console.error('Erreur soumission QCM:', err)
    }
    setLoading(false)
  }

  if (soumis && resultat) {
    const note = Math.round((resultat.score / resultat.total) * 10 * 10) / 10
    const mention = note >= 8 ? 'Excellent' : note >= 6 ? 'Bien' : note >= 5 ? 'Satisfaisant' : 'Insuffisant'
    const mentionColor = note >= 8 ? 'text-green-600' : note >= 6 ? 'text-blue-600' : note >= 5 ? 'text-amber-600' : 'text-destructive'
    return (
      <div className="mt-3 space-y-3">
        <div className="bg-muted rounded-lg p-4 text-center space-y-1">
          <p className="text-2xl font-mono font-bold text-foreground">{note}<span className="text-sm font-normal text-muted-foreground">/10</span></p>
          <p className={`text-sm font-semibold ${mentionColor}`}>{mention}</p>
          <p className="text-xs text-muted-foreground">{resultat.score}/{resultat.total} bonne{resultat.score > 1 ? 's' : ''} réponse{resultat.score > 1 ? 's' : ''}</p>
        </div>
        {questions.map((q, i) => (
          <div key={i} className={`rounded-lg border p-3 space-y-1.5 ${ resultat.details[i] ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50' }`}>
            <p className="text-xs font-medium text-foreground">{i + 1}. {q.texte}</p>
            <p className="text-xs">
              {resultat.details[i]
                ? <span className="text-green-600">✓ Bonne réponse : {q.choix[q.bonneReponse]}</span>
                : <span className="text-destructive">✗ Votre réponse : {q.choix[reponses[i]]} : Bonne réponse : {q.choix[q.bonneReponse]}</span>
              }
            </p>
            {q.explication && <p className="text-xs text-muted-foreground italic">{q.explication}</p>}
          </div>
        ))}
      </div>
    )
  }

  return (
    <div className="mt-3 space-y-4">
      {questions.map((q, qIdx) => (
        <div key={qIdx} className="space-y-2">
          <p className="text-sm font-medium text-foreground">{qIdx + 1}. {q.texte}</p>
          <div className="space-y-1.5">
            {q.choix.map((choix, cIdx) => (
              <label
                key={cIdx}
                className={`flex items-center gap-2.5 px-3 py-2 rounded-lg border cursor-pointer transition-colors ${
                  reponses[qIdx] === cIdx
                    ? 'border-primary bg-primary/5 text-primary'
                    : 'border-border hover:border-primary/30'
                }`}
              >
                <input
                  type="radio"
                  name={`qcm-${devoir.id}-q${qIdx}`}
                  checked={reponses[qIdx] === cIdx}
                  onChange={() => setReponses(r => ({ ...r, [qIdx]: cIdx }))}
                  className="accent-primary"
                />
                <span className="text-sm">{choix}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
      <Button
        onClick={handleSubmit}
        disabled={!toutesRépondu || loading}
        className="w-full gap-1.5"
      >
        {loading ? 'Soumission...' : `Soumettre le QCM (${Object.keys(reponses).length}/${questions.length} répondu${Object.keys(reponses).length > 1 ? 'es' : 'e'})`}
      </Button>
    </div>
  )
}

// Bouton "Commencer le devoir" : crée une session dédiée et redirige vers le journal
function CommencerDevoirButton({ devoir, etudiantId, sessionExistante, navigate, module, faculteId, universiteId }: {
  devoir: any; etudiantId: string; sessionExistante: any | null; navigate: (p: string) => void; module: string; faculteId?: string; universiteId?: string
}) {
  const [loading, setLoading] = React.useState(false)
  const handleCommencer = async () => {
    setLoading(true)
    try {
      let session = sessionExistante
      if (!session) {
        session = await createSessionAsync({
          nom: devoir.titre,
          exercice: new Date().getFullYear(),
          description: `Devoir : ${devoir.titre}`,
          userId: etudiantId,
          devoirId: devoir.id,
          verrouille: false,
          faculteId: faculteId || undefined,
          universiteId: universiteId || undefined,
        } as any, module as any)
      }
      navigate(`/journal?session=${session.id}`)
    } catch(e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }
  return (
    <Button size="sm" className="w-full gap-1.5" onClick={handleCommencer} disabled={loading}>
      {loading ? 'Création...' : sessionExistante ? '▶ Continuer le devoir' : '▶ Commencer le devoir'}
    </Button>
  )
}

// Zone de réponse théorique
function ReponseTheoriqueForm({ devoir, etudiantId, soumission }: { devoir: any; etudiantId: string; soumission: any }) {
  const [reponse, setReponse] = React.useState('')
  const [etape, setEtape] = React.useState<'redaction' | 'verification' | 'submitting'>('redaction')

  if (soumission) return null

  const handleSoumettre = async () => {
    setEtape('submitting')
    try {
      await createSoumissionAsync({ devoirId: devoir.id, etudiantId, reponseTexte: reponse.trim() } as any)
      window.location.reload()
    } catch(e) {
      console.error(e)
      setEtape('verification')
    }
  }

  if (etape === 'redaction') {
    return (
      <div className="mt-3 space-y-2">
        <textarea
          value={reponse}
          onChange={e => setReponse(e.target.value)}
          placeholder="Rédigez vos réponses ici..."
          rows={5}
          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm resize-y focus:outline-none focus:ring-1 focus:ring-ring"
        />
        <Button
          size="sm"
          variant="outline"
          className="w-full gap-1.5"
          onClick={() => setEtape('verification')}
          disabled={!reponse.trim()}
        >
          <CheckCircle2 className="h-3.5 w-3.5" />Vérifier avant soumission
        </Button>
      </div>
    )
  }

  return (
    <div className="mt-3 rounded-md border border-border bg-muted/40 p-3 space-y-3">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold text-foreground">Vos réponses</p>
        <button onClick={() => setEtape('redaction')} className="text-xs text-muted-foreground hover:text-foreground">× Modifier</button>
      </div>
      <div className="rounded-md bg-background border border-border px-3 py-2 text-sm text-foreground whitespace-pre-wrap max-h-40 overflow-y-auto">
        {reponse}
      </div>
      <div className="rounded-md bg-amber-50 border border-amber-200 px-3 py-2">
        <p className="text-xs text-amber-800">
          Une fois soumis, votre devoir sera transmis au professeur et vous ne pourrez plus modifier vos réponses.
        </p>
      </div>
      <Button
        size="sm"
        className="w-full"
        onClick={handleSoumettre}
        disabled={etape === 'submitting'}
      >
        {etape === 'submitting' ? 'Soumission en cours...' : 'Soumettre définitivement'}
      </Button>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// TABLEAU DE BORD - ÉTUDIANT
//
// Toute la richesse pédagogique (cours inscrits, devoirs, cotes) est propre à
// l'étudiant : le staff n'a pas d'équivalent ici, son suivi se fait dans
// l'Espace pédagogique (/professeurs). Ce composant ne partage donc plus son
// arbre de rendu avec le staff - seuls le bandeau hero, la grille de modules
// et le pied de page sont des composants communs importés.
// ─────────────────────────────────────────────────────────────────────────────

// Échéance exprimée telle qu'on la lit : « aujourd'hui », « demain »,
// « dans 3 jours », puis la date brute au-delà. Les trois premiers jours sont
// marqués urgents - c'est ce qui justifie la couleur d'alerte.
function echeanceLisible(dateLimit: string): { label: string; urgent: boolean } {
  const aujourdhui = new Date(); aujourdhui.setHours(0, 0, 0, 0)
  const limite = new Date(dateLimit); limite.setHours(0, 0, 0, 0)
  const jours = Math.round((limite.getTime() - aujourdhui.getTime()) / 86400000)
  if (jours <= 0) return { label: "aujourd'hui", urgent: true }
  if (jours === 1) return { label: 'demain', urgent: true }
  if (jours <= 3) return { label: `dans ${jours} jours`, urgent: true }
  return { label: new Date(dateLimit).toLocaleDateString('fr-FR'), urgent: false }
}

// Amène une section de la page sous les yeux, depuis « À faire » ou depuis une
// tuile du bandeau. Sans effet si la section n'est pas rendue (pas de devoir,
// pas de cote) - le raccourci n'est alors de toute façon pas proposé.
function allerA(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
function allerAuxDevoirs() {
  allerA(document.getElementById('mes-devoirs') ? 'mes-devoirs' : 'mes-devoirs-chapitre')
}

function allerAuxCotes() {
  document.getElementById('mes-cotes')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function DashboardEtudiant() {
  const [, navigate] = useHashLocation()
  const user = useUser()
  const module = useModule()

  const { sessions } = useSessions(user?.id)
  const { cours: allCoursRaw } = useAllCours()
  const { devoirs: allDevoirs } = useAllDevoirs()
  const { universites: allUniversites } = useUniversites()
  const { facultes: allFacultes } = useFacultes()
  const { soumissions: mesSoumissions } = useSoumissionsEtudiant(user?.id)
  // Mêmes filtres que la page Exercices (cours, faculté, promotion) : le
  // compteur annonçait aussi les exercices d'autres promotions.
  const { exercices: allExercices } = useExercices(
    (user as any)?.coursIds?.length ? (user as any).coursIds : undefined,
    (user as any)?.faculteId || undefined,
    (user as any)?.classe || undefined,
    allCoursRaw,
  )
  const { presences: mesPresences } = usePresencesEtudiant(user?.id)
  const { statuts: coursStatuts } = useCoursStatuts(user?.id)

  const allCours = allCoursRaw.filter(c => c.actif)
  const userCoursIds: string[] = (user as any)?.coursIds || []
  // Triés par ordre croissant d'UE (UE1, UE2...), pas par ordre d'arrivée Firestore.
  const userCours = getCoursUniquesTries(allCours.filter(c => userCoursIds.includes(c.id)))

  // Devoirs qui concernent réellement cet étudiant : un de ses cours, actif,
  // sa faculté, sa promotion. Règle unique (lib/cotes.ts) : ce qui s'affiche
  // ici est exactement ce qui compte dans sa cote, et ce que l'enseignant voit
  // pour lui. La promotion du devoir était ignorée jusqu'ici.
  const mesDevoirs = user ? allDevoirs.filter(d => devoirConcerneEtudiant(d, user as any, allCoursRaw)) : []
  // Devoirs de chapitre (QCM, QCM avec cas) : section dédiée plus bas ;
  // anciens types de devoirs : section « Anciens devoirs ».
  const mesDevoirsChapitre = mesDevoirs.filter(d => estDevoirChapitre(d))
  const mesDevoirsClassiques = mesDevoirs.filter(d => !estDevoirChapitre(d))

  // Cotes : même calcul que l'Espace pédagogique (lib/cotes.ts). Par cours, ou
  // tous cours confondus.
  const [coursCote, setCoursCote] = React.useState<string>('')
  const coteDe = (coursId?: string): Cote => calculerCote({
    etudiant: (user as any) ?? { id: '' },
    seances: mesPresences, devoirs: allDevoirs, soumissions: mesSoumissions,
    coursList: allCoursRaw, maintenant: new Date(), coursId,
  })
  const coteGlobale = coteDe()
  const cote = coursCote ? coteDe(coursCote) : coteGlobale
  const coursDeCote = userCours.find(c => c.id === coursCote)

  // Bulletin PDF : récapitulatif par cours, devoirs comptés, présences. Mêmes
  // chiffres que la section « Mes cotes » et que l'Espace pédagogique.
  const telechargerBulletin = () => {
    import('jspdf').then(({ jsPDF }) => import('jspdf-autotable').then(() => {
      const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
      const pageW = doc.internal.pageSize.getWidth()
      const entete = { fillColor: [26, 50, 114], textColor: 255, fontStyle: 'bold', fontSize: 9 }
      const nb = (x: number | null) => x !== null ? formaterNombre(x) : '-'
      const nomCours = (id?: string) => allCoursRaw.find(c => c.id === id)?.nom || '-'

      doc.setFillColor(26, 50, 114)
      doc.rect(0, 0, pageW, 40, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFontSize(18)
      doc.setFont('helvetica', 'bold')
      doc.text('ORBIT', pageW / 2, 14, { align: 'center' })
      doc.setFontSize(11)
      doc.setFont('helvetica', 'normal')
      doc.text('SYSCOHADA Révisé - Bulletin de cotes', pageW / 2, 22, { align: 'center' })
      doc.setFontSize(9)
      doc.text(`Édité le ${new Date().toLocaleDateString('fr-FR')}`, pageW / 2, 30, { align: 'center' })

      doc.setTextColor(30, 30, 30)
      doc.setFontSize(11)
      doc.setFont('helvetica', 'bold')
      doc.text('Informations étudiant', 14, 52)
      doc.setDrawColor(26, 50, 114)
      doc.setLineWidth(0.5)
      doc.line(14, 54, pageW - 14, 54)
      const nomComplet = [user?.nom, (user as any)?.prenom].filter(Boolean).map((x: string) => x.charAt(0).toUpperCase() + x.slice(1)).join(' ')
      const infos: [string, string][] = [
        ['Nom complet', nomComplet || '-'],
        ['Promotion', (user as any)?.classe || '-'],
        ['Faculté', allFacultes.find((f: any) => f.id === (user as any)?.faculteId)?.nom || '-'],
        ['Université', allUniversites.find((u: any) => u.id === (user as any)?.universiteId)?.nom || '-'],
      ]
      let y = 62
      doc.setFontSize(10)
      infos.forEach(([k, v]) => {
        doc.setFont('helvetica', 'bold'); doc.text(`${k} :`, 14, y)
        doc.setFont('helvetica', 'normal'); doc.text(v, 55, y)
        y += 7
      })

      const titreSection = (t: string) => {
        y += 4
        doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(30, 30, 30)
        doc.text(t, 14, y); doc.line(14, y + 2, pageW - 14, y + 2); y += 6
      }
      const vide = (t: string) => {
        doc.setFont('helvetica', 'italic'); doc.setFontSize(9); doc.setTextColor(150)
        doc.text(t, 14, y); doc.setTextColor(30, 30, 30); y += 8
      }

      // Récapitulatif par cours (5 points de présence + 5 points de devoirs)
      titreSection('Cotes par cours (sur 10 : présences /5 + devoirs /5)')
      const lignesCours = userCours.map(c => {
        const k = coteDe(c.id)
        return [c.nom, nb(k.cotePresence), nb(k.coteDevoirs), nb(k.total), k.mention || '-']
      })
      if (userCours.length > 1) {
        lignesCours.push(['Ensemble des cours', nb(coteGlobale.cotePresence), nb(coteGlobale.coteDevoirs), nb(coteGlobale.total), coteGlobale.mention || '-'])
      }
      if (lignesCours.length > 0) {
        ;(doc as any).autoTable({ startY: y, head: [['Cours', 'Présences /5', 'Devoirs /5', 'Total /10', 'Mention']], body: lignesCours, theme: 'striped', headStyles: entete, bodyStyles: { fontSize: 9 }, columnStyles: { 1: { halign: 'center' }, 2: { halign: 'center' }, 3: { halign: 'center' }, 4: { halign: 'center' } }, margin: { left: 14, right: 14 } })
        y = (doc as any).lastAutoTable.finalY + 6
      } else vide('Aucun cours inscrit.')

      // Devoirs comptés : notes rapportées à leur barème, non rendus à zéro
      titreSection('Devoirs comptés')
      const lignesDevoirs = coteGlobale.devoirs
        .filter(l => l.etat === 'note' || l.etat === 'non_rendu')
        .map(l => [
          l.devoir.titre,
          nomCours(l.devoir.coursId),
          l.etat === 'note' ? formaterNote(noteDeCopie(l.soumission, l.devoir)!, l.bareme) : `${formaterNote(0, l.bareme)} (non rendu)`,
          l.etat === 'note' ? (l.soumission?.commentaire || '-') : '-',
        ])
      if (lignesDevoirs.length > 0) {
        ;(doc as any).autoTable({ startY: y, head: [['Devoir', 'Cours', 'Note', 'Commentaire']], body: lignesDevoirs, theme: 'striped', headStyles: entete, bodyStyles: { fontSize: 8.5 }, columnStyles: { 0: { cellWidth: 55 }, 1: { cellWidth: 45 }, 2: { cellWidth: 28, halign: 'center' } }, margin: { left: 14, right: 14 } })
        y = (doc as any).lastAutoTable.finalY + 6
      } else vide('Aucun devoir compté.')

      // Présences : séances de ses cours où l'étudiant figure
      titreSection('Présences')
      const lignesPresences = [...mesPresences]
        .filter(p => !p.coursId || userCoursIds.includes(p.coursId))
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map(p => {
          const entree = p.etudiants?.find((e: any) => e.etudiantId === user?.id)
          return [new Date(p.date).toLocaleDateString('fr-FR'), p.titre || '-', p.coursId ? nomCours(p.coursId) : '-', entree ? (entree.present ? 'Présent(e)' : 'Absent(e)') : '-']
        })
      if (lignesPresences.length > 0) {
        ;(doc as any).autoTable({ startY: y, head: [['Date', 'Séance', 'Cours', 'Statut']], body: lignesPresences, theme: 'striped', headStyles: entete, bodyStyles: { fontSize: 8.5 }, columnStyles: { 0: { cellWidth: 24, halign: 'center' }, 3: { cellWidth: 26, halign: 'center' } }, margin: { left: 14, right: 14 } })
        y = (doc as any).lastAutoTable.finalY + 6
      } else vide('Aucune séance enregistrée.')

      if (coteGlobale.mention) {
        doc.setFont('helvetica', 'bold'); doc.setFontSize(11); doc.setTextColor(26, 50, 114)
        doc.text(`Mention d'ensemble : ${coteGlobale.mention} (${nb(coteGlobale.total)}/10)`, 14, Math.min(y + 2, doc.internal.pageSize.getHeight() - 16))
      }
      const pgH = doc.internal.pageSize.getHeight()
      doc.setFontSize(8); doc.setFont('helvetica', 'normal'); doc.setTextColor(150)
      doc.text('ORBIT © ' + new Date().getFullYear() + ' - Propriété de Manassé TANDU', pageW / 2, pgH - 8, { align: 'center' })
      doc.save(`bulletin_${(user?.nom || 'etudiant').toLowerCase().replace(/\s+/g, '_')}_${new Date().getFullYear()}.pdf`)
    }))
  }

  // Ce qui appelle une action maintenant : ni rendu, ni expiré. Le plus urgent
  // d'abord - c'est l'ordre dans lequel l'étudiant doit s'en occuper.
  const devoirsAFaire = mesDevoirs
    .filter(d => !isDevoirExpire(d) && !mesSoumissions.some(s => s.devoirId === d.id))
    .sort((a, b) => new Date(a.dateLimit).getTime() - new Date(b.dateLimit).getTime())

  // Chemin d'un cours : celui de son UE. Les cours d'une faculté n'ont pas de
  // moduleKey propre ; le lien retombait sur leur identifiant, une page inexistante.
  const cheminCours = (c: any) => `/${coursSystemeDe(c.coursSystemeId)?.moduleKey || c.moduleKey || 'mes-cours'}`

  const stats: DashboardStat[] = [
    { label: 'Devoirs',   value: mesDevoirs.length, icon: ClipboardList, onClick: allerAuxDevoirs },
    { label: 'Exercices', value: allExercices.filter(e => e.actif).length, icon: GraduationCap, onClick: () => navigate('/exercices') },
    { label: 'Cours',     value: userCours.length,                          icon: BookOpen, onClick: () => navigate('/mes-cours') },
    // Anciennement « Messages », dont la valeur était écrite en dur à 0 : jamais
    // calculée, donc toujours fausse. Un vrai compteur de non-lus n'est pas
    // possible en l'état - les messages portent bien un champ `lu`, mis à false
    // à l'envoi, mais aucun code ne le repasse jamais à true : le compteur ne
    // ferait que croître sans jamais redescendre. Remplacé par la cote, qui est
    // une donnée réelle et déjà calculée plus haut.
    { label: 'Ma cote',   value: coteGlobale.total !== null ? `${formaterNombre(coteGlobale.total)}/10` : '-', icon: Award, onClick: allerAuxCotes },
  ]

  const identity = (
    <div className="mt-1 space-y-0.5">
      <p className="text-sm text-white font-semibold flex items-center gap-1.5">
        <User className="h-3.5 w-3.5 text-secondary shrink-0" />
        <span>{[user?.nom, user?.prenom].filter(Boolean).map(s => (s as string).charAt(0).toUpperCase() + (s as string).slice(1)).join(' ')}</span>
      </p>
      {(user as any)?.classe && (
        <p className="text-sm text-white/75 flex items-center gap-1.5">
          <Award className="h-3.5 w-3.5 text-secondary shrink-0" />
          <span>{(user as any).classe}</span>
        </p>
      )}
      {(() => {
        const nom = allFacultes.find(f => f.id === (user as any)?.faculteId)?.nom
        return nom ? (
          <p className="text-sm text-white/75 flex items-center gap-1.5">
            <BookMarked className="h-3.5 w-3.5 text-secondary shrink-0" />
            <span>{nom}</span>
          </p>
        ) : null
      })()}
      {(() => {
        const nom = allUniversites.find(u => u.id === (user as any)?.universiteId)?.nom
        return nom ? (
          <p className="text-sm text-white/75 flex items-center gap-1.5">
            <GraduationCap className="h-3.5 w-3.5 text-secondary shrink-0" />
            <span>{nom}</span>
          </p>
        ) : null
      })()}
    </div>
  )

  return (
    <div className="space-y-6 pb-8">
      <DashboardHero
        greeting={`${greeting()}${user?.nom ? ` ${user.nom.toUpperCase()}` : ''} !`}
        identity={identity}
        stats={stats}
      />

      {/* ══ À FAIRE ══════════════════════════════════════════════════════════
           En tête de page, avant tout le reste : c'est la seule section qui
           répond à « qu'est-ce que je dois faire maintenant ? ». Les devoirs
           restaient jusqu'ici enterrés en quatrième position, sous une grille
           de navigation. Ne montre que les trois plus urgents - au-delà, un
           lien renvoie vers la section « Mes devoirs » complète. ══ */}
      {userCoursIds.length > 0 && (
        <div className="animate-slideUp" style={{ animationDelay: '450ms' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-display font-semibold text-foreground">À faire</h2>
            {devoirsAFaire.length > 0 && (
              <span className="text-xs text-muted-foreground">
                {devoirsAFaire.length} devoir{devoirsAFaire.length > 1 ? 's' : ''} en attente
              </span>
            )}
          </div>
          {devoirsAFaire.length === 0 ? (
            <div className="rounded-xl border border-border bg-card px-4 py-3 flex items-center gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-green-600 shrink-0" />
              <p className="text-sm text-muted-foreground">Rien à rendre pour le moment.</p>
            </div>
          ) : (
            <div className="space-y-2">
              {devoirsAFaire.slice(0, 3).map((dev, i) => {
                const cours = allCours.find(c => c.id === dev.coursId)
                const ech = echeanceLisible(dev.dateLimit)
                return (
                  <button
                    key={dev.id}
                    onClick={() => allerA(estDevoirChapitre(dev) ? 'mes-devoirs-chapitre' : 'mes-devoirs')}
                    className="w-full rounded-xl border border-border bg-card px-4 py-3 text-left flex items-center gap-3 hover:bg-muted/40 hover:border-primary/30 transition-colors animate-slideUp"
                    style={{ animationDelay: `${500 + i * 60}ms` }}
                  >
                    <div className={cn(
                      'h-9 w-9 rounded-lg flex items-center justify-center shrink-0',
                      ech.urgent ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-blue-700'
                    )}>
                      <ClipboardList className="h-4 w-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-sm text-foreground truncate">{dev.titre}</p>
                      {cours && <p className="text-xs text-muted-foreground truncate">{cours.nom}</p>}
                    </div>
                    <span className={cn(
                      'text-xs font-medium shrink-0',
                      ech.urgent ? 'text-red-600' : 'text-muted-foreground'
                    )}>
                      {ech.label}
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0" />
                  </button>
                )
              })}
              {devoirsAFaire.length > 3 && (
                <button
                  onClick={allerAuxDevoirs}
                  className="text-xs text-primary hover:underline px-1"
                >
                  + {devoirsAFaire.length - 3} autre{devoirsAFaire.length - 3 > 1 ? 's' : ''} en attente
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* ══ MES COURS - registre par cours, pas de progression globale ═════════
           La progression n'a de sens que par cours : deux promotions n'ont pas
           forcément les mêmes cours, donc pas de moyenne unique entre étudiants. ══ */}
      {userCours.length > 0 && (
        <div className="animate-slideRight" style={{ animationDelay: '550ms' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-display font-semibold text-foreground">Mes cours ce semestre</h2>
            <span className="text-xs text-muted-foreground">{userCours.length} cours inscrit{userCours.length > 1 ? 's' : ''}</span>
          </div>
          <div className="rounded-lg border border-border bg-card overflow-hidden table-scroll">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-muted/40">
                  <th className="text-left font-medium text-xs uppercase tracking-wide text-muted-foreground py-2.5 px-4">Cours</th>
                  <th className="text-left font-medium text-xs uppercase tracking-wide text-muted-foreground py-2.5 px-4">Statut</th>
                  <th className="text-left font-medium text-xs uppercase tracking-wide text-muted-foreground py-2.5 px-4">Prochaine échéance</th>
                  <th className="w-10"></th>
                </tr>
              </thead>
              <tbody>
                {userCours.map((cours, i) => {
                  const statutInfo = coursStatuts.find(s => s.coursId === cours.id)?.statut || 'non_commence'
                  const statutMap: Record<string, { label: string; className: string }> = {
                    complete:      { label: 'Terminé',   className: 'border-green-400/50 text-green-700 bg-green-50' },
                    en_cours:      { label: 'En cours',  className: 'border-secondary/50 text-secondary bg-secondary/10' },
                    non_commence:  { label: 'À commencer', className: 'border-border text-muted-foreground' },
                  }
                  const s = statutMap[statutInfo] || statutMap.non_commence

                  const prochainDevoir = devoirsAFaire.find(d => d.coursId === cours.id)
                  const path = cheminCours(cours)

                  return (
                    <tr
                      key={cours.id}
                      onClick={() => navigate(path)}
                      onMouseEnter={() => prefetchRoute(path)}
                      className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors cursor-pointer animate-fadeIn"
                      style={{ animationDelay: `${600 + i * 40}ms` }}
                    >
                      <td className="py-3 px-4">
                        <p className="font-display font-semibold text-foreground leading-tight">{cours.nom}</p>
                        {(cours as any).promotion && (
                          <p className="text-xs text-muted-foreground mt-0.5">{(cours as any).promotion}</p>
                        )}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="outline" className={cn("text-xs font-normal", s.className)}>{s.label}</Badge>
                      </td>
                      <td className="py-3 px-4 text-xs">
                        {prochainDevoir ? (
                          <span className="text-foreground/80">
                            {prochainDevoir.titre} - <span className="font-mono">{new Date(prochainDevoir.dateLimit).toLocaleDateString('fr-FR')}</span>
                          </span>
                        ) : (
                          <span className="text-muted-foreground/60">-</span>
                        )}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <ChevronRight className="h-4 w-4 text-muted-foreground/40 inline-block" />
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* La tuile « Mes cours » est masquée quand le tableau ci-dessus est là :
          elle mènerait au même endroit tout en annonçant un autre nombre. */}
      <DashboardModulesGrid navigate={navigate} afficherMesCours={userCours.length === 0} />

      {/* ══ MES DEVOIRS (devoirs créés depuis les chapitres) ═════════════
           Seule liste de devoirs pour tout devoir récent : les devoirs se
           créent désormais depuis un chapitre (QCM, QCM + cas, questions
           rédigées).
           Les devoirs « QCM + cas » n'étaient jamais transmis à cette section
           (filtre sur le seul type qcm_chapitre), et ceux d'une autre
           promotion ou faculté l'étaient : même règle désormais que le reste
           de la page. ══ */}
      {mesDevoirsChapitre.length > 0 && (
        <div id="mes-devoirs-chapitre" className="animate-slideUp scroll-mt-4" style={{ animationDelay: '1260ms' }}>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-display font-semibold text-foreground">Mes devoirs</h2>
            <span className="text-xs text-muted-foreground">{mesDevoirsChapitre.length} devoir{mesDevoirsChapitre.length > 1 ? 's' : ''} · notés sur 20</span>
          </div>
          <DevoirChapitreEtudiant
            devoirs={mesDevoirsChapitre}
            soumissions={mesSoumissions}
            etudiantId={user!.id}
            promotionId={(user as any)?.classe || undefined}
          />
        </div>
      )}

      {/* ══ ANCIENS DEVOIRS (types d'avant les devoirs de chapitre) : affichés
           seulement s'il en reste ══════════════════════════════════════════════════════ */}
      {userCoursIds.length > 0 && (() => {
        if (mesDevoirsClassiques.length === 0) return null
        return (
          <div id="mes-devoirs" className="animate-slideUp scroll-mt-4" style={{ animationDelay: '1250ms' }}>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-display font-semibold text-foreground">Anciens devoirs</h2>
              <span className="text-xs text-muted-foreground">{mesDevoirsClassiques.length} devoir{mesDevoirsClassiques.length > 1 ? 's' : ''}</span>
            </div>
            <div className="space-y-2">
              {mesDevoirsClassiques.map((dev, i) => {
                const soum = mesSoumissions.find(s => s.devoirId === dev.id)
                const expire = isDevoirExpire(dev)
                const peutSoumettre = !expire && !soum
                const cours = allCours.find(c => c.id === dev.coursId)

                let statutLabel = 'À faire'
                let statutColor = 'border-gray-400 text-gray-500'
                let StatutIcon = Clock
                if (soum && estACorriger(soum)) { statutLabel = 'Soumis'; statutColor = 'border-blue-400 text-blue-600'; StatutIcon = Lock }
                if (soum && estNotee(soum)) { statutLabel = 'Noté'; statutColor = 'border-green-400 text-green-600'; StatutIcon = CheckCircle2 }
                if (expire && !soum) { statutLabel = 'Non rendu (0)'; statutColor = 'border-red-400 text-red-500'; StatutIcon = Clock }

                return (
                  <div
                    key={dev.id}
                    className="rounded-xl border border-border bg-card px-4 py-3 animate-slideUp"
                    style={{ animationDelay: `${1300 + i * 60}ms` }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <LibraryBig className="h-4 w-4 text-primary shrink-0" />
                          <p className="font-semibold text-sm text-foreground">{dev.titre}</p>
                          <Badge variant="outline" className={`text-xs shrink-0 ${statutColor}`}>
                            <StatutIcon className="h-3 w-3 mr-1" />{statutLabel}
                          </Badge>
                        </div>
                        {cours && <p className="text-xs text-muted-foreground mt-0.5">{cours.nom}</p>}
                        {dev.consignes && <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{dev.consignes}</p>}
                        <p className="text-xs text-muted-foreground mt-1">
                          Date limite : {new Date(dev.dateLimit).toLocaleDateString('fr-FR')}
                        </p>
                        {((dev as any).pdfUrl || (dev as any).pdfData) && (
                          <a
                            href={(dev as any).pdfUrl || (dev as any).pdfData}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-red-600 hover:underline"
                          >
                            <FileDown className="h-3.5 w-3.5" />
                            Voir l'énoncé PDF
                          </a>
                        )}
                      </div>
                    </div>

                    {soum && estNotee(soum) && (
                      <div className="mt-3 bg-muted/40 rounded-md p-3">
                        <div className="flex items-center gap-3">
                          <p className={cn('text-2xl font-mono font-bold', noteDeCopie(soum, dev)! >= baremeDevoir(dev) / 2 ? 'text-green-600' : 'text-red-500')}>{formaterNote(noteDeCopie(soum, dev)!, baremeDevoir(dev))}</p>
                          {soum.commentaire && <p className="text-xs text-foreground flex-1 italic">{soum.commentaire}</p>}
                        </div>
                      </div>
                    )}

                    {(() => {
                      const devType = (dev as any).type || 'pratique'
                      const sessionDevoir = sessions.find((s: any) => s.devoirId === dev.id && s.userId === user!.id)

                      if (soum && estACorriger(soum)) return (
                        <p className="mt-2 text-xs text-blue-600 flex items-center gap-1">
                          <Lock className="h-3 w-3" />Soumis : en attente de correction
                        </p>
                      )

                      if (!peutSoumettre && expire) return null

                      if (devType === 'theorique') return (
                        <ReponseTheoriqueForm devoir={dev} etudiantId={user!.id} soumission={soum} />
                      )

                      if (devType === 'qcm') {
                        return <QCMForm devoir={dev} etudiantId={user!.id} soumission={soum} />
                      }

                      if (devType === 'pratique' || devType === 'mixte') {
                        return (
                          <div className="mt-3 space-y-2">
                            {devType === 'mixte' && (
                              <ReponseTheoriqueForm devoir={dev} etudiantId={user!.id} soumission={soum} />
                            )}
                            {!sessionDevoir ? (
                              <CommencerDevoirButton
                                devoir={dev}
                                etudiantId={user!.id}
                                sessionExistante={null}
                                navigate={navigate}
                                module={module}
                                faculteId={(user as any)?.faculteId}
                                universiteId={(user as any)?.universiteId}
                              />
                            ) : (
                              <div className="space-y-2">
                                <p className="text-xs text-muted-foreground">
                                  Session en cours : <span className="font-medium">{sessionDevoir.nom}</span>
                                </p>
                                <div className="space-y-2">
                                  <CommencerDevoirButton
                                    devoir={dev}
                                    etudiantId={user!.id}
                                    sessionExistante={sessionDevoir}
                                    navigate={navigate}
                                    module={module}
                                    faculteId={(user as any)?.faculteId}
                                    universiteId={(user as any)?.universiteId}
                                  />
                                  <SoumettreButton
                                    devoirId={dev.id}
                                    sessionId={sessionDevoir.id}
                                    navigate={navigate}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )
                      }
                      return null
                    })()}
                  </div>
                )
              })}
            </div>
          </div>
        )
      })()}

      {/* ══ MES COTES ══════════════════════════════════════════════════════
           Calcul unique (lib/cotes.ts), identique à celui de l'Espace
           pédagogique : l'étudiant et son enseignant lisent la même cote. Une
           cote se lit par cours ; « Tous mes cours » les réunit. ══ */}
      <div id="mes-cotes" className="rounded-2xl border border-border bg-card overflow-hidden animate-fadeIn scroll-mt-4" style={{ animationDelay: '1100ms' }}>
        <div className="px-5 py-4 bg-gradient-to-r from-primary/8 via-primary/4 to-transparent border-b border-border flex items-center justify-between gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Award className="h-4 w-4 text-primary" />
            </div>
            <div>
              <h2 className="text-sm font-display font-semibold text-foreground">Mes cotes</h2>
              <p className="text-xs text-muted-foreground">Sur 10 : 5 points de présence, 5 points de devoirs</p>
            </div>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            {userCours.length > 1 && (
              <select
                value={coursCote}
                onChange={e => setCoursCote(e.target.value)}
                aria-label="Cours de la cote"
                className="rounded-lg border border-border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
              >
                <option value="">Tous mes cours</option>
                {userCours.map(c => <option key={c.id} value={c.id}>{c.nom}</option>)}
              </select>
            )}
            {cote.mention && (
              <span className={cn(
                'text-xs px-2.5 py-1 rounded-full font-semibold border',
                cote.mention === 'Excellent' ? 'bg-green-100 text-green-700 border-green-200' :
                cote.mention === 'Bien' ? 'bg-blue-100 text-blue-700 border-blue-200' :
                cote.mention === 'Satisfaisant' ? 'bg-yellow-100 text-yellow-700 border-yellow-200' :
                'bg-red-100 text-red-700 border-red-200'
              )}>{cote.mention}</span>
            )}
            <Button
              size="sm"
              variant="outline"
              className="gap-1.5 text-xs h-7 px-2"
              onClick={() => telechargerBulletin()}
            >
              <Download className="h-3 w-3" />
              Bulletin PDF
            </Button>
          </div>
        </div>

        <div className="p-5 space-y-4">
          <div className="space-y-3">
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">Présences</span>
                <div className="flex items-center gap-2">
                  {cote.seances > 0 && <span className="text-xs text-muted-foreground">{cote.presences}/{cote.seances} séances</span>}
                  <span className={cn('text-sm font-bold tabular-nums',
                    cote.cotePresence === null ? 'text-muted-foreground' :
                    cote.cotePresence >= 4 ? 'text-green-600' :
                    cote.cotePresence >= 2.5 ? 'text-yellow-600' : 'text-red-600'
                  )}>{cote.cotePresence !== null ? `${formaterNombre(cote.cotePresence)}/5` : '-'}</span>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-1000',
                    cote.cotePresence === null ? 'w-0' :
                    cote.cotePresence >= 4 ? 'bg-green-500' :
                    cote.cotePresence >= 2.5 ? 'bg-yellow-500' : 'bg-red-500'
                  )}
                  style={{ width: cote.cotePresence !== null ? `${(cote.cotePresence / 5) * 100}%` : '0%' }}
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-foreground">Devoirs</span>
                <div className="flex items-center gap-2">
                  {cote.devoirsNotes + cote.devoirsNonRendus > 0 && (
                    <span className="text-xs text-muted-foreground">
                      {cote.devoirsNotes} noté{cote.devoirsNotes > 1 ? 's' : ''}
                      {cote.devoirsNonRendus > 0 && ` · ${cote.devoirsNonRendus} non rendu${cote.devoirsNonRendus > 1 ? 's' : ''}`}
                      {cote.devoirsACorriger > 0 && ` · ${cote.devoirsACorriger} en correction`}
                    </span>
                  )}
                  <span className={cn('text-sm font-bold tabular-nums',
                    cote.coteDevoirs === null ? 'text-muted-foreground' :
                    cote.coteDevoirs >= 4 ? 'text-green-600' :
                    cote.coteDevoirs >= 2.5 ? 'text-yellow-600' : 'text-red-600'
                  )}>{cote.coteDevoirs !== null ? `${formaterNombre(cote.coteDevoirs)}/5` : '-'}</span>
                </div>
              </div>
              <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
                <div
                  className={cn('h-full rounded-full transition-all duration-1000',
                    cote.coteDevoirs === null ? 'w-0' :
                    cote.coteDevoirs >= 4 ? 'bg-green-500' :
                    cote.coteDevoirs >= 2.5 ? 'bg-yellow-500' : 'bg-red-500'
                  )}
                  style={{ width: cote.coteDevoirs !== null ? `${(cote.coteDevoirs / 5) * 100}%` : '0%' }}
                />
              </div>
            </div>

            <div className="rounded-xl border border-primary/20 bg-primary/5 px-4 py-3 flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground">Score total{coursDeCote ? ` · ${coursDeCote.nom}` : ''}</p>
                <p className={cn('text-2xl font-mono font-bold tabular-nums mt-0.5',
                  cote.total === null ? 'text-muted-foreground' :
                  cote.total >= 8 ? 'text-green-600' :
                  cote.total >= 5 ? 'text-yellow-600' : 'text-red-600'
                )}>
                  {cote.total !== null ? formaterNombre(cote.total) : '-'}<span className="text-sm font-normal text-muted-foreground">/10</span>
                </p>
                {cote.total === null && (
                  <p className="text-xs text-muted-foreground mt-0.5">Le total apparaît dès qu'il y a au moins une séance et un devoir comptés.</p>
                )}
              </div>
              <div className="h-14 w-14 rounded-full border-4 border-border flex items-center justify-center bg-background relative">
                <svg className="absolute inset-0" viewBox="0 0 56 56">
                  <circle cx="28" cy="28" r="24" fill="none" stroke="currentColor" strokeWidth="4" className="text-muted/30" />
                  <circle cx="28" cy="28" r="24" fill="none" strokeWidth="4"
                    strokeDasharray={`${2 * Math.PI * 24}`}
                    strokeDashoffset={`${2 * Math.PI * 24 * (1 - (cote.total ?? 0) / 10)}`}
                    strokeLinecap="round"
                    className={cote.total !== null && cote.total >= 8 ? 'stroke-green-500' : cote.total !== null && cote.total >= 5 ? 'stroke-yellow-500' : 'stroke-red-500'}
                    style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%', transition: 'stroke-dashoffset 1.2s ease' }}
                  />
                </svg>
                <span className={cn('text-xs font-bold relative z-10',
                  cote.total === null ? 'text-muted-foreground' :
                  cote.total >= 8 ? 'text-green-600' :
                  cote.total >= 5 ? 'text-yellow-600' : 'text-red-600'
                )}>{cote.total !== null ? `${Math.round((cote.total / 10) * 100)}%` : '-'}</span>
              </div>
            </div>
          </div>

          {/* Le détail ligne à ligne (devoirs comptés, grille des séances) est
              replié : l'essentiel - mention, cotes, score, bulletin PDF - reste
              visible au-dessus, et le détail s'ouvre à la demande. */}
          {(() => {
            const devoirsComptes = cote.devoirs.filter(l => l.etat === 'note' || l.etat === 'non_rendu')
            const seances = [...mesPresences]
              .filter(p => !coursCote || p.coursId === coursCote)
              .filter(p => !p.coursId || userCoursIds.includes(p.coursId))
              .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
            if (devoirsComptes.length === 0 && seances.length === 0) return null
            return (
          <details className="group px-5 pb-5">
            <summary className="cursor-pointer text-xs font-medium text-primary hover:underline flex items-center gap-1.5 select-none list-none">
              <span className="group-open:rotate-90 transition-transform duration-300 ease-out inline-block">▶</span>
              Voir le détail : devoirs comptés et relevé de présences
            </summary>
            <div className="mt-3 space-y-4">

          {devoirsComptes.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Devoirs comptés</p>
                <div className="rounded-lg border border-border overflow-hidden">
                  <table className="w-full text-xs">
                    <thead className="bg-muted/40">
                      <tr>
                        <th className="text-left px-3 py-2 font-medium text-muted-foreground">Devoir</th>
                        <th className="text-center px-3 py-2 font-medium text-muted-foreground">Note</th>
                        <th className="text-left px-3 py-2 font-medium text-muted-foreground">Commentaire</th>
                      </tr>
                    </thead>
                    <tbody>
                      {devoirsComptes.map(l => (
                        <tr key={l.devoir.id} className="border-t border-border/50">
                          <td className="px-3 py-2 font-medium">{l.devoir.titre}</td>
                          <td className="px-3 py-2 text-center">
                            {l.etat === 'note' ? (
                              <span className={cn('font-bold', (l.ratio ?? 0) >= 0.5 ? 'text-green-600' : 'text-red-500')}>
                                {formaterNote(noteDeCopie(l.soumission, l.devoir)!, l.bareme)}
                              </span>
                            ) : (
                              <span className="font-bold text-red-500">{formaterNote(0, l.bareme)}</span>
                            )}
                          </td>
                          <td className="px-3 py-2 text-muted-foreground italic">
                            {l.etat === 'non_rendu' ? 'Non rendu à la date limite' : (l.soumission?.commentaire || '-')}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot className="bg-muted/30 border-t border-border font-semibold">
                      <tr>
                        <td className="px-3 py-2 text-muted-foreground">Moyenne</td>
                        <td className="px-3 py-2 text-center text-primary">{cote.moyenneDevoirs !== null ? `${formaterNombre(cote.moyenneDevoirs)}/20` : '-'}</td>
                        <td className="px-3 py-2 text-primary">Cote devoirs : {cote.coteDevoirs !== null ? `${formaterNombre(cote.coteDevoirs)}/5` : '-'}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
          )}

          {seances.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Détail des séances</p>
                <div className="overflow-x-auto rounded-lg border border-border">
                  <table className="w-full text-xs">
                    <thead className="bg-muted/40">
                      <tr>
                        {seances.map(sc => (
                          <th key={sc.id} className="text-center px-2 py-2 font-medium text-muted-foreground whitespace-nowrap" title={sc.titre}>
                            {new Date(sc.date).toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' })}
                          </th>
                        ))}
                        <th className="text-center px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">Présences</th>
                        <th className="text-center px-3 py-2 font-medium text-muted-foreground whitespace-nowrap">Cote /5</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        {seances.map(sc => {
                          const entree = sc.etudiants?.find((e: any) => e.etudiantId === user?.id)
                          return (
                            <td key={sc.id} className="px-2 py-2 text-center">
                              {entree ? (
                                <span className={cn(
                                  'inline-flex items-center justify-center w-6 h-6 rounded-full font-bold',
                                  entree.present ? 'bg-green-500 text-white' : 'bg-red-500 text-white'
                                )}>
                                  {entree.present ? '•' : '×'}
                                </span>
                              ) : <span className="opacity-30">-</span>}
                            </td>
                          )
                        })}
                        <td className="px-3 py-2 text-center font-semibold">{cote.presences}/{cote.seances}</td>
                        <td className="px-3 py-2 text-center font-bold">{cote.cotePresence !== null ? formaterNombre(cote.cotePresence) : '-'}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-xs text-muted-foreground">
                  Formule : 5 × ({cote.presences} présences ÷ {cote.seances} séances) = {cote.cotePresence !== null ? formaterNombre(cote.cotePresence) : '-'}/5
                </p>
              </div>
          )}

            </div>
          </details>
            )
          })()}
        </div>
      </div>

      <DashboardFooter />
    </div>
  )
}
