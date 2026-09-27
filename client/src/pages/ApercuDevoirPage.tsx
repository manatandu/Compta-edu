/**
 * ApercuDevoirPage : Récapitulatif complet d'un devoir avant soumission
 * Affiche Journal, Grand Livre, Balance, Bilan Actif, Bilan Passif, Compte de Résultat
 * Paramètres URL hash : ?devoir=DEVOIR_ID&session=SESSION_ID
 */
import BackButton from '@/components/BackButton'
import { useState, useEffect, useMemo } from 'react'
import { useHashLocation } from '@/lib/hashLocation'
import { useSearch } from 'wouter'
import { useUser } from '@/lib/userContext'
import { getEcrituresAsync, createSoumissionAsync } from '@/lib/db-firebase'
import { useSoumissions } from '@/lib/useFirestore'
import { db } from '@/lib/firebase'
import { doc, getDoc } from 'firebase/firestore'
import { formatMontant } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BookOpen, BookMarked, Scale, BarChart2, FileText, AlertTriangle } from 'lucide-react'
import { isDevoirExpire, type Devoir, type Ecriture } from '@/lib/db'
import { ACTIF_RUBRIQUES, PASSIF_RUBRIQUES, CR_RUBRIQUES, calculerSoldes, calculerEtatsFinanciers } from '@/lib/etatsFinanciers'


// ─── Onglets ──────────────────────────────────────────────────────────────────
const ONGLETS = [
  { id: 'journal',   label: 'Journal',          icon: BookOpen },
  { id: 'grandlivre',label: 'Grand Livre',      icon: BookMarked },
  { id: 'balance',   label: 'Balance',          icon: Scale },
  { id: 'bilan',     label: 'Bilan Actif',      icon: FileText },
  { id: 'passif',    label: 'Bilan Passif',     icon: FileText },
  { id: 'cr',        label: 'Compte de Résultat', icon: BarChart2 },
]

// ─── Composant principal ──────────────────────────────────────────────────────
export default function ApercuDevoirPage() {
  const [, navigate] = useHashLocation()
  const user = useUser()

  // Lire les paramètres depuis l'URL. useSearch() (wouter), pas
  // window.location.hash : en routage hash, le navigate(...) de
  // useHashLocation pose la query dans la vraie search de l'URL (avant le
  // #), jamais dans le hash - une lecture regex sur window.location.hash ne
  // trouve donc jamais rien (devoirId/sessionId toujours vides).
  const search = useSearch()
  const { devoirId, sessionId } = useMemo(() => {
    const params = new URLSearchParams(search)
    return {
      devoirId: params.get('devoir') || '',
      sessionId: params.get('session') || '',
    }
  }, [search])

  const [ecritures, setEcritures] = useState<Ecriture[]>([])
  const [loading, setLoading] = useState(true)
  const [onglet, setOnglet] = useState('journal')
  const [submitting, setSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Le devoir lui-même et la copie déjà rendue : la page ne chargeait ni l'un
  // ni l'autre, si bien qu'on pouvait soumettre après la date limite, ou
  // plusieurs fois (une copie de plus à chaque clic).
  const [devoir, setDevoir] = useState<Devoir | null>(null)
  useEffect(() => {
    if (!devoirId) return
    getDoc(doc(db, 'devoirs', devoirId))
      .then(snap => setDevoir(snap.exists() ? ({ id: snap.id, ...snap.data() } as Devoir) : null))
      .catch(() => setDevoir(null))
  }, [devoirId])
  const { soumissions: mesCopies } = useSoumissions(devoirId || undefined, user?.id)
  const dejaRendu = mesCopies.length > 0
  const expire = !!devoir && isDevoirExpire(devoir)
  const soumissionBloquee = !devoir || dejaRendu || expire

  useEffect(() => {
    if (!user?.id || !sessionId) return
    getEcrituresAsync(user.id, sessionId)
      .then(data => setEcritures(data))
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [user?.id, sessionId])

  // ── Calcul Journal (groupé par ligneGroupe, débit avant crédit) ──────────
  const grouped = useMemo(() => {
    const map = new Map<string, Ecriture[]>()
    ecritures.forEach(e => {
      if (!map.has(e.ligneGroupe)) map.set(e.ligneGroupe, [])
      map.get(e.ligneGroupe)!.push(e)
    })
    // Trier : débit d'abord, puis crédit
    map.forEach((lines, key) => {
      map.set(key, [
        ...lines.filter(l => l.debit > 0),
        ...lines.filter(l => l.credit > 0),
      ])
    })
    return Array.from(map.entries()).sort(([, a], [, b]) =>
      (a[0]?.date ?? '').localeCompare(b[0]?.date ?? '')
    )
  }, [ecritures])

  // ── Calcul Grand Livre ───────────────────────────────────────────────────
  const comptesGL = useMemo(() => {
    const map = new Map<string, { intitule: string; lignes: Ecriture[] }>()
    ecritures.forEach(e => {
      if (!map.has(e.numeroCompte)) map.set(e.numeroCompte, { intitule: e.intituleCompte, lignes: [] })
      map.get(e.numeroCompte)!.lignes.push(e)
    })
    return Array.from(map.entries())
      .map(([numero, data]) => {
        const totalDebit = data.lignes.reduce((s, l) => s + l.debit, 0)
        const totalCredit = data.lignes.reduce((s, l) => s + l.credit, 0)
        const diff = totalDebit - totalCredit
        return {
          numero,
          intitule: data.intitule,
          lignes: data.lignes.sort((a, b) => a.date.localeCompare(b.date)),
          totalDebit,
          totalCredit,
          soldeDebiteur: diff > 0 ? diff : 0,
          soldeCrediteur: diff < 0 ? -diff : 0,
        }
      })
      .sort((a, b) => a.numero.localeCompare(b.numero))
  }, [ecritures])

  // ── Calcul Balance ───────────────────────────────────────────────────────
  const lignesBalance = useMemo(() => {
    const map = new Map<string, { intitule: string; mouvD: number; mouvC: number }>()
    ecritures.forEach(e => {
      if (!map.has(e.numeroCompte)) map.set(e.numeroCompte, { intitule: e.intituleCompte, mouvD: 0, mouvC: 0 })
      const l = map.get(e.numeroCompte)!
      l.mouvD += e.debit
      l.mouvC += e.credit
    })
    return Array.from(map.entries())
      .map(([numero, d]) => {
        const diff = d.mouvD - d.mouvC
        return {
          numero,
          intitule: d.intitule,
          mouvD: d.mouvD,
          mouvC: d.mouvC,
          soldeD: diff > 0 ? diff : 0,
          soldeC: diff < 0 ? -diff : 0,
        }
      })
      .sort((a, b) => a.numero.localeCompare(b.numero))
  }, [ecritures])

  const totalsBalance = useMemo(() => ({
    mouvD: lignesBalance.reduce((s, l) => s + l.mouvD, 0),
    mouvC: lignesBalance.reduce((s, l) => s + l.mouvC, 0),
    soldeD: lignesBalance.reduce((s, l) => s + l.soldeD, 0),
    soldeC: lignesBalance.reduce((s, l) => s + l.soldeC, 0),
  }), [lignesBalance])

  // ── Calcul Bilan / CR : lib/etatsFinanciers.ts, source unique partagée avec
  // la page Bilan. La copie locale oubliait les amortissements (comptes 28).
  const { actif: actifVals, passif: passifVals, cr: crVals, resultatNet } = useMemo(
    () => calculerEtatsFinanciers(calculerSoldes(ecritures)),
    [ecritures]
  )

  // ── Soumission ────────────────────────────────────────────────────────────
  const handleSoumettre = async () => {
    if (!user?.id || !devoirId || soumissionBloquee) return
    setSubmitting(true)
    try {
      await createSoumissionAsync({ devoirId, etudiantId: user.id, sessionId } as any)
      setSubmitted(true)
      setTimeout(() => navigate('/'), 2000)
    } catch (e) {
      console.error(e)
      setSubmitting(false)
    }
  }

  // ── Rendu onglets ─────────────────────────────────────────────────────────

  function renderJournal() {
    if (grouped.length === 0) return <p className="text-sm text-muted-foreground text-center py-8">Aucune écriture dans ce devoir.</p>
    return (
      <div className="space-y-3">
        {grouped.map(([groupe, lines]) => {
          const isOuverture = groupe.startsWith('ouverture-')
          const totalD = lines.reduce((s, l) => s + l.debit, 0)
          const totalC = lines.reduce((s, l) => s + l.credit, 0)
          const date = lines[0]?.date ?? ''
          const libelle = lines[0]?.libelle ?? ''
          return (
            <div key={groupe} className="rounded-md border border-border bg-card overflow-hidden">
              <div className={`px-3 py-2 flex items-center gap-3 text-xs font-medium ${isOuverture ? 'bg-violet-50 text-violet-700' : 'bg-muted/40 text-foreground'}`}>
                <span className="font-mono">{date}</span>
                <span className="flex-1 truncate">{libelle}</span>
                {isOuverture && <Badge variant="outline" className="text-xs">Bilan d'ouverture</Badge>}
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[500px]">
                  <thead>
                    <tr className="text-muted-foreground border-b border-border bg-muted/20">
                      <th className="text-left py-1.5 px-3 w-20">N° Cpt</th>
                      <th className="text-left py-1.5 px-3">Intitulé</th>
                      <th className="text-right py-1.5 px-3 w-28">Débit</th>
                      <th className="text-right py-1.5 px-3 w-28">Crédit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {lines.map(l => (
                      <tr key={l.id} className={`border-b border-border/40 last:border-0 ${l.credit > 0 ? 'pl-6' : ''}`}>
                        <td className={`py-1.5 px-3 font-mono ${l.credit > 0 ? 'pl-8' : ''}`}>{l.numeroCompte}</td>
                        <td className={`py-1.5 px-3 ${l.credit > 0 ? 'italic pl-8' : ''}`}>{l.intituleCompte}</td>
                        <td className="py-1.5 px-3 text-right text-green-700 font-mono">{l.debit > 0 ? formatMontant(l.debit) : ''}</td>
                        <td className="py-1.5 px-3 text-right text-red-700 font-mono">{l.credit > 0 ? formatMontant(l.credit) : ''}</td>
                      </tr>
                    ))}
                    <tr className="bg-muted/30 font-semibold border-t border-border text-xs">
                      <td colSpan={2} className="py-1.5 px-3 text-right text-muted-foreground">Total</td>
                      <td className="py-1.5 px-3 text-right text-green-700 font-mono">{formatMontant(totalD)}</td>
                      <td className="py-1.5 px-3 text-right text-red-700 font-mono">{formatMontant(totalC)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  function renderGrandLivre() {
    if (comptesGL.length === 0) return <p className="text-sm text-muted-foreground text-center py-8">Aucune donnée.</p>
    return (
      <div className="space-y-3">
        {comptesGL.map(compte => {
          const isDebiteur = compte.soldeDebiteur > 0
          const displayTotalD = compte.totalDebit + compte.soldeCrediteur
          const displayTotalC = compte.totalCredit + compte.soldeDebiteur
          return (
            <div key={compte.numero} className="rounded-md border border-border bg-card overflow-hidden">
              <div className="px-3 py-2 flex items-center gap-2 bg-muted/30">
                <span className="font-mono font-bold text-primary text-sm">{compte.numero}</span>
                <span className="flex-1 font-medium text-sm truncate">{compte.intitule}</span>
                <Badge className={`text-xs shrink-0 ${isDebiteur ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {isDebiteur ? 'SD' : 'SC'} {formatMontant(isDebiteur ? compte.soldeDebiteur : compte.soldeCrediteur)}
                </Badge>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-xs min-w-[400px]">
                  <thead>
                    <tr className="text-muted-foreground border-b border-border bg-muted/10">
                      <th className="text-left py-1.5 px-3">Date</th>
                      <th className="text-left py-1.5 px-3">Libellé</th>
                      <th className="text-right py-1.5 px-3">Débit</th>
                      <th className="text-right py-1.5 px-3">Crédit</th>
                    </tr>
                  </thead>
                  <tbody>
                    {compte.lignes.map(l => (
                      <tr key={l.id} className="border-b border-border/30 last:border-0">
                        <td className="py-1 px-3 font-mono">{l.date}</td>
                        <td className="py-1 px-3">{l.libelle}</td>
                        <td className="py-1 px-3 text-right text-green-700 font-mono">{l.debit > 0 ? formatMontant(l.debit) : ''}</td>
                        <td className="py-1 px-3 text-right text-red-700 font-mono">{l.credit > 0 ? formatMontant(l.credit) : ''}</td>
                      </tr>
                    ))}
                    <tr className={`font-medium border-t border-border ${isDebiteur ? 'text-green-700' : 'text-red-700'}`}>
                      <td className="py-1.5 px-3 font-mono italic text-muted-foreground">-</td>
                      <td className="py-1.5 px-3 italic">{isDebiteur ? 'Solde débiteur' : 'Solde créditeur'}</td>
                      <td className="py-1.5 px-3 text-right font-mono">{!isDebiteur ? formatMontant(compte.soldeCrediteur) : ''}</td>
                      <td className="py-1.5 px-3 text-right font-mono">{isDebiteur ? formatMontant(compte.soldeDebiteur) : ''}</td>
                    </tr>
                    <tr className="font-bold bg-muted/30 border-t-2 border-border">
                      <td colSpan={2} className="py-1.5 px-3 text-right text-muted-foreground text-xs">TOTAL</td>
                      <td className="py-1.5 px-3 text-right text-green-700 font-mono">{formatMontant(displayTotalD)}</td>
                      <td className="py-1.5 px-3 text-right text-red-700 font-mono">{formatMontant(displayTotalC)}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  function renderBalance() {
    if (lignesBalance.length === 0) return <p className="text-sm text-muted-foreground text-center py-8">Aucune donnée.</p>
    return (
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-xs min-w-[600px]">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="text-left py-2 px-3">N° Compte</th>
              <th className="text-left py-2 px-3">Intitulé</th>
              <th className="text-right py-2 px-3 border-l border-primary-foreground/20">Mouvement D</th>
              <th className="text-right py-2 px-3">Mouvement C</th>
              <th className="text-right py-2 px-3 border-l border-primary-foreground/20">Solde D</th>
              <th className="text-right py-2 px-3">Solde C</th>
            </tr>
          </thead>
          <tbody>
            {lignesBalance.map(l => (
              <tr key={l.numero} className="border-b border-border/40 hover:bg-muted/20">
                <td className="py-1.5 px-3 font-mono text-primary">{l.numero}</td>
                <td className="py-1.5 px-3">{l.intitule}</td>
                <td className="py-1.5 px-3 text-right border-l border-border/30 font-mono text-green-700">{l.mouvD > 0 ? formatMontant(l.mouvD) : ''}</td>
                <td className="py-1.5 px-3 text-right font-mono text-red-700">{l.mouvC > 0 ? formatMontant(l.mouvC) : ''}</td>
                <td className="py-1.5 px-3 text-right border-l border-border/30 font-mono text-green-700">{l.soldeD > 0 ? formatMontant(l.soldeD) : ''}</td>
                <td className="py-1.5 px-3 text-right font-mono text-red-700">{l.soldeC > 0 ? formatMontant(l.soldeC) : ''}</td>
              </tr>
            ))}
            <tr className="bg-primary text-primary-foreground font-bold border-t-2">
              <td colSpan={2} className="py-2 px-3">TOTAUX</td>
              <td className="py-2 px-3 text-right font-mono border-l border-primary-foreground/20">{formatMontant(totalsBalance.mouvD)}</td>
              <td className="py-2 px-3 text-right font-mono">{formatMontant(totalsBalance.mouvC)}</td>
              <td className="py-2 px-3 text-right font-mono border-l border-primary-foreground/20">{formatMontant(totalsBalance.soldeD)}</td>
              <td className="py-2 px-3 text-right font-mono">{formatMontant(totalsBalance.soldeC)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }

  function renderActif() {
    return (
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-xs min-w-[600px] border-collapse">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-2 py-2 text-left w-10">REF</th>
              <th className="px-2 py-2 text-left">ACTIF</th>
              <th className="px-2 py-2 text-center w-10">Note</th>
              <th className="px-2 py-2 text-right w-24">BRUT</th>
              <th className="px-2 py-2 text-right w-28">AMORT/DÉPREC.</th>
              <th className="px-2 py-2 text-right w-24">NET</th>
            </tr>
          </thead>
          <tbody>
            {ACTIF_RUBRIQUES.map(r => {
              const v = actifVals.get(r.ref) ?? { brut: 0, corr: 0, net: 0 }
              if ((r as any).isGrandTotal) return (
                <tr key={r.ref} className="bg-primary text-primary-foreground font-bold text-xs border-t-2">
                  <td className="px-2 py-2">{r.ref}</td><td className="px-2 py-2">{r.label}</td>
                  <td className="px-2 py-2 text-center"></td>
                  <td className="px-2 py-2 text-right font-mono">{v.brut > 0 ? formatMontant(v.brut) : ''}</td>
                  <td className="px-2 py-2 text-right font-mono">{v.corr > 0 ? formatMontant(v.corr) : ''}</td>
                  <td className="px-2 py-2 text-right font-mono">{formatMontant(v.net)}</td>
                </tr>
              )
              if ((r as any).isTotal) return (
                <tr key={r.ref} className="bg-primary/15 font-semibold border-t border-primary/30">
                  <td className="px-2 py-1.5 text-primary font-mono">{r.ref}</td>
                  <td className="px-2 py-1.5 text-primary">{r.label}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className="px-2 py-1.5 text-right text-primary font-bold font-mono">{v.brut > 0 ? formatMontant(v.brut) : ''}</td>
                  <td className="px-2 py-1.5 text-right text-primary font-mono">{v.corr > 0 ? formatMontant(v.corr) : ''}</td>
                  <td className="px-2 py-1.5 text-right text-primary font-bold font-mono">{v.net > 0 ? formatMontant(v.net) : ''}</td>
                </tr>
              )
              if ((r as any).isSection) return (
                <tr key={r.ref} className="bg-secondary/20 font-semibold">
                  <td className="px-2 py-1.5 font-mono">{r.ref}</td>
                  <td className="px-2 py-1.5 font-semibold">{r.label}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className="px-2 py-1.5 text-right font-mono">{v.brut > 0 ? formatMontant(v.brut) : ''}</td>
                  <td className="px-2 py-1.5 text-right font-mono">{v.corr > 0 ? formatMontant(v.corr) : ''}</td>
                  <td className="px-2 py-1.5 text-right font-bold font-mono">{v.net > 0 ? formatMontant(v.net) : ''}</td>
                </tr>
              )
              return (
                <tr key={r.ref} className="border-b border-border/40 hover:bg-muted/20">
                  <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                  <td className="px-2 py-1.5">{r.label}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className="px-2 py-1.5 text-right font-mono">{v.brut > 0 ? formatMontant(v.brut) : ''}</td>
                  <td className="px-2 py-1.5 text-right text-muted-foreground font-mono">{v.corr > 0 ? formatMontant(v.corr) : ''}</td>
                  <td className="px-2 py-1.5 text-right font-medium font-mono">{v.net > 0 ? formatMontant(v.net) : ''}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  function renderPassif() {
    return (
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-xs min-w-[400px] border-collapse">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-2 py-2 text-left w-10">REF</th>
              <th className="px-2 py-2 text-left">PASSIF</th>
              <th className="px-2 py-2 text-center w-10">Note</th>
              <th className="px-2 py-2 text-right w-32">NET (N)</th>
            </tr>
          </thead>
          <tbody>
            {PASSIF_RUBRIQUES.map(r => {
              const val = (r as any).isResultat ? resultatNet : (passifVals.get(r.ref) ?? 0)
              const isSigne = (r as any).isSigne ?? false
              const displayVal = isSigne
                ? (val !== 0 ? (val < 0 ? `(${formatMontant(Math.abs(val))})` : formatMontant(val)) : '')
                : (val !== 0 ? formatMontant(val) : '')
              if ((r as any).isGrandTotal) return (
                <tr key={r.ref} className="bg-primary text-primary-foreground font-bold border-t-2">
                  <td className="px-2 py-2">{r.ref}</td><td className="px-2 py-2">{r.label}</td>
                  <td className="px-2 py-2"></td>
                  <td className="px-2 py-2 text-right font-mono">{formatMontant(val)}</td>
                </tr>
              )
              if ((r as any).isTotal) return (
                <tr key={r.ref} className="bg-primary/15 font-semibold border-t border-primary/30">
                  <td className="px-2 py-1.5 text-primary font-mono">{r.ref}</td>
                  <td className="px-2 py-1.5 text-primary">{r.label}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className={`px-2 py-1.5 text-right font-bold font-mono ${val < 0 ? 'text-red-600' : 'text-primary'}`}>{val !== 0 ? (val < 0 ? `(${formatMontant(Math.abs(val))})` : formatMontant(val)) : ''}</td>
                </tr>
              )
              if ((r as any).isResultat) return (
                <tr key={r.ref} className="border-b border-border/40 bg-secondary/10">
                  <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                  <td className="px-2 py-1.5 font-medium">{r.label}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className={`px-2 py-1.5 text-right font-bold font-mono ${resultatNet >= 0 ? 'text-green-700' : 'text-red-700'}`}>
                    {resultatNet !== 0 ? `${formatMontant(Math.abs(resultatNet))} ${resultatNet >= 0 ? '(Bénéfice)' : '(Perte)'}` : ''}
                  </td>
                </tr>
              )
              return (
                <tr key={r.ref} className="border-b border-border/40 hover:bg-muted/20">
                  <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                  <td className="px-2 py-1.5">{r.label}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className={`px-2 py-1.5 text-right font-medium font-mono ${isSigne && val < 0 ? 'text-red-600' : ''}`}>{displayVal}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  function renderCR() {
    return (
      <div className="overflow-x-auto rounded-md border border-border">
        <table className="w-full text-xs min-w-[500px] border-collapse">
          <thead>
            <tr className="bg-primary text-primary-foreground">
              <th className="px-2 py-2 text-left w-10">REF</th>
              <th className="px-2 py-2 text-left">LIBELLÉS</th>
              <th className="px-2 py-2 text-center w-10">+/-</th>
              <th className="px-2 py-2 text-center w-16">NOTE</th>
              <th className="px-2 py-2 text-right w-32">Montant (N)</th>
            </tr>
          </thead>
          <tbody>
            {CR_RUBRIQUES.map(r => {
              const v = crVals.get(r.ref) ?? { montant: 0 }
              if ((r as any).isGrandTotal) {
                const xi = crVals.get("XI")?.montant ?? resultatNet
                return (
                  <tr key={r.ref} className="bg-primary text-primary-foreground font-bold border-t-2">
                    <td className="px-2 py-2">{r.ref}</td>
                    <td className="px-2 py-2">{r.label}</td>
                    <td className="px-2 py-2 text-center">{xi >= 0 ? '+' : '-'}</td>
                    <td className="px-2 py-2 text-center">{r.note}</td>
                    <td className="px-2 py-2 text-right font-mono">{formatMontant(Math.abs(xi))}</td>
                  </tr>
                )
              }
              if ((r as any).isTotal) return (
                <tr key={r.ref} className="bg-primary/15 font-semibold border-t border-primary/30">
                  <td className="px-2 py-1.5 text-primary font-mono">{r.ref}</td>
                  <td className="px-2 py-1.5 text-primary">{r.label}</td>
                  <td className="px-2 py-1.5 text-center">{v.montant >= 0 ? '+' : '-'}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className={`px-2 py-1.5 text-right font-bold font-mono ${v.montant >= 0 ? 'text-green-700' : 'text-red-700'}`}>{formatMontant(Math.abs(v.montant))}</td>
                </tr>
              )
              return (
                <tr key={r.ref} className="border-b border-border/40 hover:bg-muted/20">
                  <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                  <td className="px-2 py-1.5">{r.label}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.sens}</td>
                  <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                  <td className="px-2 py-1.5 text-right font-medium font-mono">{v.montant !== 0 ? formatMontant(v.montant) : ''}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    )
  }

  // ── Rendu page ────────────────────────────────────────────────────────────
  if (submitted) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4 text-center">
      <div className="h-16 w-16 rounded-full bg-green-100 flex items-center justify-center">
        <span className="text-3xl">✓</span>
      </div>
      <h2 className="text-xl font-display font-bold text-green-700">Devoir soumis avec succès</h2>
      <p className="text-sm text-muted-foreground">Votre devoir a été transmis au professeur. Redirection...</p>
    </div>
  )

  return (
    <div className="space-y-5 animate-fadeIn pb-32">

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div className="flex items-center gap-3">
        <BackButton />
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <h1 className="text-lg font-display font-bold text-foreground">Récapitulatif du devoir{devoir ? ` : ${devoir.titre}` : ''}</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Vérifiez vos travaux dans chaque document avant de soumettre.
          {devoir && ` Date limite : ${new Date(devoir.dateLimit).toLocaleString('fr-FR', { dateStyle: 'short', timeStyle: 'short' })}.`}
        </p>
        {loading && <p className="text-sm text-muted-foreground mt-2">Chargement des données...</p>}
        {!loading && ecritures.length === 0 && (
          <div className="mt-3 flex items-center gap-2 text-amber-600">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <p className="text-sm">Aucune écriture dans cette session. Assurez-vous d'avoir bien saisi vos écritures dans le journal avant de soumettre.</p>
          </div>
        )}
        {!loading && ecritures.length > 0 && (
          <p className="text-xs text-muted-foreground mt-1">{ecritures.length} écriture(s) : {grouped.length} opération(s)</p>
        )}
      </div>

      {/* ── Onglets ─────────────────────────────────────────────────────── */}
      <div className="flex gap-1 flex-wrap">
        {ONGLETS.map(o => (
          <button
            key={o.id}
            onClick={() => setOnglet(o.id)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
              onglet === o.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-muted text-muted-foreground hover:text-foreground hover:bg-muted/80'
            }`}
          >
            <o.icon className="h-3.5 w-3.5" />
            {o.label}
          </button>
        ))}
      </div>

      {/* ── Contenu ──────────────────────────────────────────────────────── */}
      <Card className="border-border">
        <CardContent className="pt-4">
          {!loading && (
            <>
              {onglet === 'journal'    && renderJournal()}
              {onglet === 'grandlivre' && renderGrandLivre()}
              {onglet === 'balance'    && renderBalance()}
              {onglet === 'bilan'      && renderActif()}
              {onglet === 'passif'     && renderPassif()}
              {onglet === 'cr'         && renderCR()}
            </>
          )}
        </CardContent>
      </Card>

      {/* ── Lien corriger ────────────────────────────────────────────────── */}
      <div className="text-center">
        <button
          onClick={() => navigate(`/journal?session=${sessionId}`)}
          className="text-sm text-blue-600 underline underline-offset-2"
        >
          Retourner au journal pour corriger mes écritures
        </button>
      </div>

      {/* ── Barre de soumission fixe en bas ──────────────────────────────── */}
      <div className="fixed bottom-0 left-0 right-0 z-50 bg-background/95 backdrop-blur border-t border-border px-4 py-3">
        <div className="max-w-3xl mx-auto space-y-2">
          <div className="flex items-start gap-2 text-xs text-amber-700 bg-amber-50 border border-amber-200 rounded-md px-3 py-2">
            <AlertTriangle className="h-3.5 w-3.5 shrink-0 mt-0.5" />
            <span>
              {dejaRendu ? 'Vous avez déjà rendu ce devoir : une seule copie est acceptée.'
                : expire ? 'La date limite est dépassée : ce devoir ne peut plus être rendu.'
                : !devoir ? 'Devoir introuvable ou inaccessible.'
                : 'Une fois soumis, votre devoir sera transmis au professeur et vous ne pourrez plus modifier vos réponses.'}
            </span>
          </div>
          <Button
            className="w-full"
            size="lg"
            onClick={handleSoumettre}
            disabled={submitting || loading || soumissionBloquee}
          >
            {submitting ? 'Soumission en cours...' : dejaRendu ? 'Devoir déjà rendu' : 'Soumettre définitivement'}
          </Button>
        </div>
      </div>

    </div>
  )
}
