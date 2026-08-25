import React, { useState, useMemo } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  ArrowLeft, Receipt, Plus, Trash2, Info, AlertCircle,
  BookOpen, ArrowLeftRight, Wallet, Upload, Check, FileText, Lock,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { useSessions } from '@/lib/useFirestore'
import { addEcritureAsync } from '@/lib/db-firebase'
import { generateId } from '@/lib/utils'
import { exportFacturePDF } from '@/lib/exportPDF'
import {
  useFacturesDevises, creerFacture, supprimerFacture, calculerDecompte, netAPayerDevise,
  genererEcritureEngagementFournisseur, genererEcritureEngagementClient,
  genererEcritureEscompteRealiseFournisseur, genererEcritureEscompteRealiseClient,
  genererEcritureAvanceRecueFournisseur, genererEcritureAvanceVerseeClient,
  genererEcritureRetourEmballageFournisseur, genererEcritureRetourEmballageClient,
  genererEcritureNonRetourEmballageFournisseur, genererEcritureNonRetourEmballageClient,
  genererEcritureLocationEmballageClient,
  genererEcritureReglement,
  calculerEcartConversionCommercial, genererEcritureEcartConversion, genererEcritureProvisionCommercial,
  genererEcritureDisponibilites,
  type FactureDevise, type Devise, type TypeFacture, type EcritureFactureGeneree,
  type LigneArticle, type ReductionCommerciale, type EmballageConsigne, type DecompteFacture,
} from '@/lib/useFacturesDevises'

// ─── Formatage ────────────────────────────────────────────────────────────────
function formatFC(n: number): string { return `${Math.round(n).toLocaleString('fr-CD')} FC` }
function formatDevise(n: number, devise: Devise): string { return `${n.toLocaleString('fr-CD', { maximumFractionDigits: 2 })} ${devise}` }
const arrondi = (n: number) => Math.round(n * 100) / 100

// Catalogue fermé des réductions commerciales en cascade (RRR) : le libellé
// se choisit dans cette liste, seul le taux % reste saisi librement.
const REDUCTIONS_COMMERCIALES_CATALOGUE = ['Rabais', 'Remise', 'Ristourne']

const ONGLETS = [
  { id: 'factures', label: 'Factures', icon: Receipt, color: 'text-module-rose', border: 'border-module-rose' },
  { id: 'document', label: 'Document', icon: FileText, color: 'text-module-emerald', border: 'border-module-emerald' },
  { id: 'ecritures', label: 'Écritures', icon: BookOpen, color: 'text-module-teal', border: 'border-module-teal' },
  { id: 'ecarts', label: 'Écarts', icon: ArrowLeftRight, color: 'text-module-violet', border: 'border-module-violet' },
  { id: 'disponibilites', label: 'Disponibilités', icon: Wallet, color: 'text-module-blue', border: 'border-module-blue' },
] as const
type OngletId = typeof ONGLETS[number]['id']

// ─── Petits composants d'affichage ─────────────────────────────────────────
function Callout({ children, couleur = 'rose' }: { children: React.ReactNode; couleur?: 'rose' | 'amber' | 'violet' }) {
  const styles = {
    rose: 'border-module-rose/30 bg-module-rose/10',
    amber: 'border-amber-300 bg-amber-50 text-amber-800',
    violet: 'border-module-violet/30 bg-module-violet/10',
  }
  return (
    <div className={cn('rounded-xl border p-3 flex items-start gap-2 text-xs leading-relaxed text-foreground', styles[couleur])}>
      {couleur === 'amber'
        ? <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-600" />
        : <Info className={cn('h-3.5 w-3.5 shrink-0 mt-0.5', couleur === 'violet' ? 'text-module-violet' : 'text-module-rose')} />}
      <span>{children}</span>
    </div>
  )
}

function EcritureCard({ ec, numero, accent = 'teal' }: { ec: EcritureFactureGeneree; numero: number | string; accent?: 'teal' | 'violet' }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-muted/40 border-b border-border">
        <span className={cn('flex h-5 w-5 items-center justify-center rounded-full text-white text-xs font-bold shrink-0', accent === 'teal' ? 'bg-module-teal' : 'bg-module-violet')}>{numero}</span>
        <p className="text-xs font-semibold text-foreground flex-1">{ec.libelle}</p>
        <span className="text-xs font-mono text-muted-foreground">{ec.date}</span>
      </div>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-border">
            <th className="text-left px-3.5 py-1.5 font-mono text-xs uppercase text-muted-foreground font-semibold">Compte</th>
            <th className="text-left px-3.5 py-1.5 font-mono text-xs uppercase text-muted-foreground font-semibold">Intitulé</th>
            <th className="text-right px-3.5 py-1.5 font-mono text-xs uppercase text-muted-foreground font-semibold">Débit</th>
            <th className="text-right px-3.5 py-1.5 font-mono text-xs uppercase text-muted-foreground font-semibold">Crédit</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border/60">
          {ec.lignes.map((l, i) => (
            <tr key={i}>
              <td className={cn('px-3.5 py-1.5 font-mono font-bold', l.credit > 0 && 'pl-8')}>{l.compte}</td>
              <td className={cn('px-3.5 py-1.5 text-muted-foreground', l.credit > 0 && 'italic')}>{l.intitule}</td>
              <td className="px-3.5 py-1.5 text-right font-mono">{l.debit > 0 ? formatFC(l.debit) : ''}</td>
              <td className="px-3.5 py-1.5 text-right font-mono">{l.credit > 0 ? formatFC(l.credit) : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function TwinEcritures({ titre, sousTitre, fournisseur, client }: {
  titre: string; sousTitre?: string; fournisseur: EcritureFactureGeneree; client: EcritureFactureGeneree
}) {
  return (
    <div>
      {titre && (
        <div className="mb-2.5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{titre}</p>
          {sousTitre && <p className="text-xs text-muted-foreground/80 mt-0.5">{sousTitre}</p>}
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-bold text-module-teal mb-1.5">Chez le fournisseur</p>
          <EcritureCard ec={fournisseur} numero="F" accent="teal" />
        </div>
        <div>
          <p className="text-xs font-bold text-module-violet mb-1.5">Chez le client</p>
          <EcritureCard ec={client} numero="C" accent="violet" />
        </div>
      </div>
    </div>
  )
}

function DecompteCard({ d, devise }: { d: DecompteFacture; devise: Devise }) {
  const fmt = (n: number) => formatDevise(n, devise)
  return (
    <div className="rounded-xl border border-border overflow-hidden text-xs">
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-border/60">
        <span className="text-muted-foreground">Montant brut</span>
        <span className="font-mono font-semibold">{fmt(d.brut)}</span>
      </div>
      {d.etapesReductions.map((e, i) => (
        <React.Fragment key={i}>
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-border/60 text-module-rose">
            <span>− {e.libelle} ({e.pct} %)</span>
            <span className="font-mono">{fmt(e.montantReduit)}</span>
          </div>
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-border/60 bg-muted/30 font-semibold">
            <span>= Solde {i + 1}{i === d.etapesReductions.length - 1 ? ' = Net commercial' : ''}</span>
            <span className="font-mono">{fmt(e.solde)}</span>
          </div>
        </React.Fragment>
      ))}
      {d.etapesReductions.length === 0 && (
        <div className="flex items-center justify-between px-3.5 py-2 border-b border-border/60 bg-muted/30 font-semibold">
          <span>Net commercial</span>
          <span className="font-mono">{fmt(d.netCommercial)}</span>
        </div>
      )}
      {d.escompte > 0 && (
        <>
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-border/60 text-module-violet">
            <span>− Escompte{d.baseTVA === d.netCommercial ? ' (indicatif, conditionnel)' : ''}</span>
            <span className="font-mono">{fmt(d.escompte)}</span>
          </div>
          <div className="flex items-center justify-between px-3.5 py-2 border-b border-border/60 bg-muted/30 font-semibold">
            <span>Net financier</span>
            <span className="font-mono">{fmt(d.netFinancier)}</span>
          </div>
        </>
      )}
      <div className="flex items-center justify-between px-3.5 py-2 border-b border-border/60 text-module-teal">
        <span>+ TVA</span>
        <span className="font-mono">{fmt(d.tva)}</span>
      </div>
      <div className="flex items-center justify-between px-3.5 py-2.5 bg-module-rose/10 text-module-rose font-bold">
        <span>Net à payer</span>
        <span className="font-mono">{fmt(d.netAPayer)}</span>
      </div>
      {(d.totalEmballages > 0 || d.avanceRecue > 0) && (
        <div className="px-3.5 py-2 text-muted-foreground/80 text-[11px] leading-relaxed border-t border-border/60">
          Hors décompte, réglés séparément : {d.totalEmballages > 0 && <>emballages consignés {fmt(d.totalEmballages)}</>}
          {d.totalEmballages > 0 && d.avanceRecue > 0 && ' · '}
          {d.avanceRecue > 0 && <>avance déjà versée −{fmt(d.avanceRecue)}</>}
          {' '}→ montant réellement mouvementé : <strong className="text-foreground">{fmt(d.netAEncaisser)}</strong>
        </div>
      )}
    </div>
  )
}

function ModalExport({ ecriture, userId, onClose }: { ecriture: EcritureFactureGeneree; userId: string; onClose: () => void }) {
  const { sessions } = useSessions(userId, 'syscohada')
  const [sessionId, setSessionId] = useState('')
  const [exporting, setExporting] = useState(false)
  const [done, setDone] = useState(false)
  const [erreur, setErreur] = useState('')

  const exporter = async () => {
    if (!sessionId) { setErreur('Sélectionnez une session.'); return }
    setExporting(true)
    try {
      const ligneGroupe = generateId()
      for (const l of ecriture.lignes) {
        await addEcritureAsync({
          sessionId, ligneGroupe,
          date: ecriture.date, libelle: ecriture.libelle,
          numeroPiece: '', numeroCompte: l.compte, intituleCompte: l.intitule,
          debit: l.debit, credit: l.credit, userId,
        }, 'syscohada')
      }
      setDone(true)
    } catch {
      setErreur("Erreur lors de l'export.")
    } finally {
      setExporting(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
      <div className="bg-card rounded-2xl border border-border shadow-2xl p-6 max-w-md w-full space-y-4">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-module-teal/10 flex items-center justify-center">
            <Upload className="h-4 w-4 text-module-teal" />
          </div>
          <h2 className="font-display font-bold text-base text-foreground">Exporter vers le Journal</h2>
        </div>
        {done ? (
          <div className="space-y-3">
            <div className="flex items-center gap-2 rounded-lg bg-emerald-50 px-3 py-3">
              <Check className="h-4 w-4 text-emerald-600 shrink-0" />
              <p className="text-sm text-emerald-700 font-semibold">Écriture exportée avec succès.</p>
            </div>
            <button onClick={onClose} className="w-full rounded-xl bg-primary hover:bg-primary/90 py-2.5 text-sm font-semibold text-primary-foreground transition-colors">Fermer</button>
          </div>
        ) : (
          <>
            <p className="text-xs text-muted-foreground">« {ecriture.libelle} » sera envoyée dans le Journal général de la session choisie.</p>
            <div>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Session cible</label>
              <select value={sessionId} onChange={e => { setSessionId(e.target.value); setErreur('') }}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30">
                <option value="">-- Choisir une session --</option>
                {sessions.map(s => <option key={s.id} value={s.id}>{s.nom} : Exercice {s.exercice}</option>)}
              </select>
            </div>
            {erreur && (
              <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2">
                <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
                <p className="text-xs text-red-600">{erreur}</p>
              </div>
            )}
            <div className="flex gap-2">
              <button onClick={onClose} className="flex-1 rounded-xl border border-border py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted/30 transition-colors">Annuler</button>
              <button onClick={exporter} disabled={exporting}
                className="flex-1 rounded-xl bg-module-teal hover:opacity-90 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                <Upload className="h-4 w-4" />
                {exporting ? 'Export en cours…' : 'Exporter'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

function ExportButton({ ecriture, userId, couleur = 'teal' }: { ecriture: EcritureFactureGeneree; userId: string; couleur?: 'teal' | 'violet' }) {
  const [open, setOpen] = useState(false)
  return (
    <>
      <button onClick={() => setOpen(true)}
        className={cn('mt-2 flex items-center gap-1.5 text-xs font-semibold hover:opacity-80', couleur === 'teal' ? 'text-module-teal' : 'text-module-violet')}>
        <Upload className="h-3.5 w-3.5" /> Exporter vers le Journal
      </button>
      {open && <ModalExport ecriture={ecriture} userId={userId} onClose={() => setOpen(false)} />}
    </>
  )
}

function SansSelection({ onAllerFactures }: { onAllerFactures: () => void }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/20 py-12 text-center space-y-3">
      <Receipt className="h-9 w-9 text-muted-foreground/40 mx-auto" />
      <p className="text-sm text-muted-foreground">Sélectionnez d'abord une facture dans l'onglet « Factures ».</p>
      <button onClick={onAllerFactures}
        className="inline-flex items-center gap-1.5 rounded-xl bg-module-rose hover:opacity-90 px-4 py-2 text-sm font-semibold text-white transition-colors">
        Voir mes factures
      </button>
    </div>
  )
}

// ─── Onglet 1 : Factures ──────────────────────────────────────────────────────
function OngletFactures({ factures, loading, selectionId, onSelect, userId }: {
  factures: FactureDevise[]; loading: boolean; selectionId: string | null
  onSelect: (id: string) => void; userId: string
}) {
  const [form, setForm] = useState({
    type: 'vente' as TypeFacture, tiers: '', reference: '', devise: 'CDF' as Devise,
    coursEngagement: '2800', tauxTVA: '16', escomptePct: '0', escompteConditionnel: true,
    avanceRecue: '0', dateFacture: new Date().toISOString().split('T')[0],
  })
  const [lignes, setLignes] = useState<LigneArticle[]>([{ designation: '', quantite: 1, prixUnitaire: 0 }])
  const [reductions, setReductions] = useState<ReductionCommerciale[]>([])
  const [emballages, setEmballages] = useState<EmballageConsigne[]>([])
  const [saving, setSaving] = useState(false)
  const [erreur, setErreur] = useState('')
  const [confirmSuppr, setConfirmSuppr] = useState<string | null>(null)

  const decompte = useMemo(() => calculerDecompte({
    lignes,
    reductionsCommerciales: reductions,
    escomptePct: Number(form.escomptePct) || 0,
    escompteConditionnel: form.escompteConditionnel,
    tauxTVA: (Number(form.tauxTVA) || 0) / 100,
    emballages,
    avanceRecue: Number(form.avanceRecue) || 0,
  }), [lignes, reductions, emballages, form.escomptePct, form.escompteConditionnel, form.tauxTVA, form.avanceRecue])

  const majLigne = (i: number, patch: Partial<LigneArticle>) => setLignes(ls => ls.map((l, idx) => idx === i ? { ...l, ...patch } : l))
  const majReduction = (i: number, patch: Partial<ReductionCommerciale>) => setReductions(rs => rs.map((r, idx) => idx === i ? { ...r, ...patch } : r))
  const majEmballage = (i: number, patch: Partial<EmballageConsigne>) => setEmballages(es => es.map((e, idx) => idx === i ? { ...e, ...patch } : e))

  const valider = async () => {
    setErreur('')
    if (!form.tiers.trim()) { setErreur(form.type === 'achat' ? 'Indiquez le fournisseur.' : 'Indiquez le client.'); return }
    if (!form.reference.trim()) { setErreur('Indiquez la référence de la facture.'); return }
    const lignesValides = lignes.filter(l => l.designation.trim() && l.quantite > 0 && l.prixUnitaire > 0)
    if (lignesValides.length === 0) { setErreur('Ajoutez au moins une ligne (désignation, quantité, prix unitaire).'); return }
    if (!userId) { setErreur('Session non chargée : rechargez la page et réessayez.'); return }
    setSaving(true)
    try {
      const id = await creerFacture({
        userId,
        type: form.type,
        tiers: form.tiers.trim(),
        reference: form.reference.trim(),
        devise: form.devise,
        coursEngagement: form.devise === 'CDF' ? 1 : Number(form.coursEngagement) || 1,
        lignes: lignesValides,
        reductionsCommerciales: reductions.filter(r => r.libelle.trim() && r.pct > 0),
        escomptePct: Number(form.escomptePct) || 0,
        escompteConditionnel: form.escompteConditionnel,
        emballages: emballages.filter(e => e.designation.trim() && e.quantite > 0),
        avanceRecue: Number(form.avanceRecue) || 0,
        tauxTVA: (Number(form.tauxTVA) || 0) / 100,
        dateFacture: form.dateFacture,
      })
      onSelect(id)
      setForm(f => ({ ...f, tiers: '', reference: '' }))
      setLignes([{ designation: '', quantite: 1, prixUnitaire: 0 }])
      setReductions([])
      setEmballages([])
    } catch {
      setErreur('Erreur lors de la création de la facture. Réessayez.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <Callout>
        <strong>Comptes 401/411.</strong> Achat (fournisseur, compte 401) ou vente (client, compte 411). Chaque facture se construit ligne par ligne : réductions commerciales en cascade, réduction financière, TVA — et génère ses écritures chez le fournisseur ET chez le client.
      </Callout>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Mes factures</p>
        {loading ? (
          <p className="text-sm text-muted-foreground text-center py-8">Chargement…</p>
        ) : factures.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/20 py-10 text-center space-y-2">
            <Receipt className="h-8 w-8 text-muted-foreground/40 mx-auto" />
            <p className="text-sm text-muted-foreground">Aucune facture créée. Utilisez le formulaire ci-dessous.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {factures.map(f => (
              <button key={f.id} onClick={() => onSelect(f.id)}
                className={cn(
                  'w-full flex items-center gap-3 rounded-xl border bg-card p-3.5 text-left transition-all',
                  selectionId === f.id ? 'border-module-rose ring-2 ring-module-rose/20' : 'border-border hover:border-module-rose/40'
                )}>
                <div className="h-9 w-9 rounded-lg bg-module-rose/10 flex items-center justify-center shrink-0">
                  <Receipt className="h-4 w-4 text-module-rose" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">{f.tiers} · {f.reference}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <span className={cn('font-mono font-semibold', f.type === 'achat' ? 'text-module-rose' : 'text-module-teal')}>
                      {f.type === 'achat' ? 'Achat (401)' : 'Vente (411)'}
                    </span>
                    {' '}· {f.devise}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono font-bold text-sm">{netAPayerDevise(f).toLocaleString('fr-CD', { maximumFractionDigits: 2 })}</p>
                  <p className="text-xs text-muted-foreground">{f.devise}</p>
                </div>
                <button onClick={ev => { ev.stopPropagation(); setConfirmSuppr(f.id) }}
                  className="h-7 w-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors shrink-0">
                  <Trash2 className="h-3.5 w-3.5 text-red-400" />
                </button>
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Nouvelle facture</p>
        <div className="rounded-xl border border-border bg-card p-4 space-y-4">
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setForm(f => ({ ...f, type: 'achat' }))}
              className={cn('rounded-lg border-2 px-3 py-2 text-left transition-all',
                form.type === 'achat' ? 'border-module-rose bg-module-rose/10' : 'border-border bg-background hover:border-module-rose/30')}>
              <p className="text-xs font-bold">Achat</p>
              <p className="text-xs text-muted-foreground mt-0.5">Je suis l'acheteur — compte 401 Fournisseurs</p>
            </button>
            <button onClick={() => setForm(f => ({ ...f, type: 'vente' }))}
              className={cn('rounded-lg border-2 px-3 py-2 text-left transition-all',
                form.type === 'vente' ? 'border-module-teal bg-module-teal/10' : 'border-border bg-background hover:border-module-teal/30')}>
              <p className="text-xs font-bold">Vente</p>
              <p className="text-xs text-muted-foreground mt-0.5">Je suis le vendeur — compte 411 Clients</p>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">{form.type === 'achat' ? 'Fournisseur' : 'Client'}</label>
              <input value={form.tiers} onChange={e => setForm(f => ({ ...f, tiers: e.target.value }))}
                placeholder="Nom" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-module-rose/30" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Référence facture</label>
              <input value={form.reference} onChange={e => setForm(f => ({ ...f, reference: e.target.value }))}
                placeholder="ex : FA-2026-014" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-module-rose/30" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Devise</label>
              <select value={form.devise} onChange={e => setForm(f => ({ ...f, devise: e.target.value as Devise }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-module-rose/30">
                <option value="CDF">CDF</option>
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
              </select>
            </div>
            {form.devise !== 'CDF' && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Cours d'engagement (CDF / {form.devise})</label>
                <input type="number" value={form.coursEngagement} onChange={e => setForm(f => ({ ...f, coursEngagement: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-rose/30" />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Date de la facture</label>
              <input type="date" value={form.dateFacture} onChange={e => setForm(f => ({ ...f, dateFacture: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-module-rose/30" />
            </div>
          </div>

          {/* Lignes d'articles */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Lignes de la facture</label>
            <div className="rounded-xl border border-border overflow-hidden">
              <div className="grid grid-cols-[1fr_50px_70px_70px_24px] gap-1.5 px-3 py-1.5 bg-muted/40 text-[10px] font-bold uppercase text-muted-foreground">
                <span>Désignation</span><span>Qté</span><span>PU</span><span>Montant</span><span></span>
              </div>
              {lignes.map((l, i) => (
                <div key={i} className="grid grid-cols-[1fr_50px_70px_70px_24px] gap-1.5 px-3 py-1.5 border-t border-border/60 items-center">
                  <input value={l.designation} onChange={e => majLigne(i, { designation: e.target.value })} placeholder="Article"
                    className="min-w-0 rounded border border-border bg-background px-1.5 py-1 text-xs" />
                  <input type="number" value={l.quantite || ''} onChange={e => majLigne(i, { quantite: Number(e.target.value) || 0 })}
                    className="min-w-0 rounded border border-border bg-background px-1.5 py-1 text-xs font-mono text-right" />
                  <input type="number" value={l.prixUnitaire || ''} onChange={e => majLigne(i, { prixUnitaire: Number(e.target.value) || 0 })}
                    className="min-w-0 rounded border border-border bg-background px-1.5 py-1 text-xs font-mono text-right" />
                  <span className="min-w-0 rounded border border-border/60 bg-muted/30 px-1.5 py-1 text-xs font-mono text-right text-muted-foreground truncate">{(l.quantite * l.prixUnitaire).toLocaleString('fr-CD', { maximumFractionDigits: 2 })}</span>
                  <button onClick={() => setLignes(ls => ls.filter((_, idx) => idx !== i))} className="text-red-400 text-xs">✕</button>
                </div>
              ))}
              <button onClick={() => setLignes(ls => [...ls, { designation: '', quantite: 1, prixUnitaire: 0 }])}
                className="w-full flex items-center gap-1.5 text-xs font-semibold text-module-rose px-3 py-2 border-t border-dashed border-border">
                <Plus className="h-3 w-3" /> Ajouter une ligne
              </button>
            </div>
          </div>

          {/* Réductions commerciales en cascade */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Réductions commerciales (cascade, liste libre)</label>
            {reductions.length > 0 && (
              <div className="rounded-xl border border-border overflow-hidden mb-1.5">
                <div className="grid grid-cols-[1fr_70px_24px] gap-1.5 px-3 py-1.5 bg-muted/40 text-[10px] font-bold uppercase text-muted-foreground">
                  <span>Libellé</span><span>%</span><span></span>
                </div>
                {reductions.map((r, i) => (
                  <div key={i} className="grid grid-cols-[1fr_70px_24px] gap-1.5 px-3 py-1.5 border-t border-border/60 items-center">
                    <select value={r.libelle} onChange={e => majReduction(i, { libelle: e.target.value })}
                      className="min-w-0 rounded border border-border bg-background px-1.5 py-1 text-xs">
                      {REDUCTIONS_COMMERCIALES_CATALOGUE.map(lib => (
                        <option key={lib} value={lib}>{lib}</option>
                      ))}
                    </select>
                    <input type="number" value={r.pct || ''} onChange={e => majReduction(i, { pct: Number(e.target.value) || 0 })}
                      className="min-w-0 rounded border border-border bg-background px-1.5 py-1 text-xs font-mono text-right" />
                    <button onClick={() => setReductions(rs => rs.filter((_, idx) => idx !== i))} className="text-red-400 text-xs">✕</button>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setReductions(rs => [...rs, { libelle: REDUCTIONS_COMMERCIALES_CATALOGUE[rs.length % REDUCTIONS_COMMERCIALES_CATALOGUE.length], pct: 0 }])}
              className="flex items-center gap-1.5 text-xs font-semibold text-module-rose">
              <Plus className="h-3 w-3" /> Ajouter une réduction
            </button>
          </div>

          {/* Escompte */}
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Réduction financière (escompte)</label>
            <div className="grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-muted-foreground">Taux %</span>
                <input type="number" value={form.escomptePct} onChange={e => setForm(f => ({ ...f, escomptePct: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-violet/30" />
              </div>
              <div>
                <span className="text-[10px] text-muted-foreground">Régime</span>
                <select value={form.escompteConditionnel ? 'cond' : 'inc'} onChange={e => setForm(f => ({ ...f, escompteConditionnel: e.target.value === 'cond' }))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-module-violet/30">
                  <option value="inc">Inconditionnel (déduit d'office)</option>
                  <option value="cond">Conditionnel (si paiement anticipé)</option>
                </select>
              </div>
            </div>
            <Callout couleur="violet">
              <strong>Règle générale (sourcée) —</strong> l'escompte se déduit du net commercial pour donner le net financier, base de la TVA. 673/773 apparaît toujours dans l'écriture, jamais absorbé comme les RRR. En régime <em>conditionnel</em>, rien n'est déduit ici — tout se joue au règlement (onglet Écritures).
            </Callout>
          </div>

          {/* TVA, emballages, avance */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 flex items-center gap-1">
                Taux de TVA <Lock className="h-3 w-3 text-muted-foreground/60" />
              </label>
              <input type="number" value={form.tauxTVA} disabled readOnly
                className="w-full rounded-lg border border-border bg-muted/40 px-3 py-2 text-sm font-mono text-muted-foreground cursor-not-allowed" />
              <p className="text-xs text-muted-foreground mt-1">Taux légal RDC (verrouillé)</p>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Avance déjà reçue</label>
              <input type="number" value={form.avanceRecue} onChange={e => setForm(f => ({ ...f, avanceRecue: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-rose/30" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Emballages consignés</label>
            {emballages.length > 0 && (
              <div className="rounded-xl border border-border overflow-hidden mb-1.5">
                <div className="grid grid-cols-[1fr_40px_70px_60px_24px] gap-1.5 px-3 py-1.5 bg-muted/40 text-[10px] font-bold uppercase text-muted-foreground">
                  <span>Désignation</span><span>Qté</span><span>Consigne</span><span>Ident.</span><span></span>
                </div>
                {emballages.map((e, i) => (
                  <div key={i} className="grid grid-cols-[1fr_40px_70px_60px_24px] gap-1.5 px-3 py-1.5 border-t border-border/60 items-center">
                    <input value={e.designation} onChange={ev => majEmballage(i, { designation: ev.target.value })} placeholder="Palette, casier…"
                      className="min-w-0 rounded border border-border bg-background px-1.5 py-1 text-xs" />
                    <input type="number" value={e.quantite || ''} onChange={ev => majEmballage(i, { quantite: Number(ev.target.value) || 0 })}
                      className="min-w-0 rounded border border-border bg-background px-1.5 py-1 text-xs font-mono text-right" />
                    <input type="number" value={e.prixUnitaireConsigne || ''} onChange={ev => majEmballage(i, { prixUnitaireConsigne: Number(ev.target.value) || 0 })}
                      className="min-w-0 rounded border border-border bg-background px-1.5 py-1 text-xs font-mono text-right" />
                    <input type="checkbox" checked={e.identifiable} onChange={ev => majEmballage(i, { identifiable: ev.target.checked })} className="justify-self-center" />
                    <button onClick={() => setEmballages(es => es.filter((_, idx) => idx !== i))} className="text-red-400 text-xs">✕</button>
                  </div>
                ))}
              </div>
            )}
            <button onClick={() => setEmballages(es => [...es, { designation: '', quantite: 1, prixUnitaireConsigne: 0, identifiable: false }])}
              className="flex items-center gap-1.5 text-xs font-semibold text-module-rose">
              <Plus className="h-3 w-3" /> Ajouter un emballage consigné
            </button>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Décompte en direct</label>
            <DecompteCard d={decompte} devise={form.devise} />
          </div>

          {erreur && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2">
              <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
              <p className="text-xs text-red-600">{erreur}</p>
            </div>
          )}

          <button onClick={valider} disabled={saving}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-module-rose hover:opacity-90 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50">
            <Plus className="h-4 w-4" />
            {saving ? 'Création…' : 'Créer la facture'}
          </button>
        </div>
      </div>

      {confirmSuppr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-card rounded-2xl border border-border shadow-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-bold text-foreground">Supprimer cette facture ?</h3>
            <p className="text-sm text-muted-foreground">Cette action est irréversible.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmSuppr(null)} className="flex-1 rounded-xl border border-border py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted/30 transition-colors">Annuler</button>
              <button onClick={async () => { await supprimerFacture(confirmSuppr); setConfirmSuppr(null) }}
                className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 py-2.5 text-sm font-semibold text-white transition-colors">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Onglet 2 : Document (aperçu + PDF) ───────────────────────────────────────
function OngletDocument({ facture }: { facture: FactureDevise }) {
  const decompte = useMemo(() => calculerDecompte(facture, 1), [facture])

  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        <button
          onClick={() => exportFacturePDF(facture, decompte)}
          className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-module-emerald hover:opacity-90 py-2.5 text-sm font-semibold text-white transition-colors">
          <FileText className="h-4 w-4" /> Télécharger le PDF
        </button>
      </div>

      <div className="rounded-sm border border-border bg-[#fdfbf6] p-5 shadow-sm text-[#211f1c]">
        <div className="flex items-start justify-between mb-4 pb-3 border-b border-dashed border-border">
          <div>
            <p className="font-display font-bold text-sm">Orbit — SYSCOHADA Révisé</p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground mt-0.5">Document pédagogique</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] uppercase tracking-wide text-module-rose font-bold">Facture</p>
            <p className="text-xs font-mono text-muted-foreground mt-0.5">{facture.reference}</p>
          </div>
        </div>
        <div className="flex justify-between gap-4 mb-4 pb-3 border-b border-dashed border-border text-xs">
          <div>
            <p className="text-[9px] uppercase text-muted-foreground">{facture.type === 'achat' ? 'Fournisseur' : 'Client'}</p>
            <p className="font-bold">{facture.tiers}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase text-muted-foreground">Date</p>
            <p className="font-bold">{facture.dateFacture}</p>
          </div>
          <div>
            <p className="text-[9px] uppercase text-muted-foreground">Devise</p>
            <p className="font-bold">{facture.devise}</p>
          </div>
        </div>
        <table className="w-full text-xs mb-4">
          <thead>
            <tr className="border-b-2 border-foreground/80">
              <th className="text-left pb-1.5 text-[9px] uppercase text-muted-foreground">Désignation</th>
              <th className="text-right pb-1.5 text-[9px] uppercase text-muted-foreground">Qté</th>
              <th className="text-right pb-1.5 text-[9px] uppercase text-muted-foreground">P.U.</th>
              <th className="text-right pb-1.5 text-[9px] uppercase text-muted-foreground">Montant</th>
            </tr>
          </thead>
          <tbody>
            {facture.lignes.map((l, i) => (
              <tr key={i} className="border-b border-dashed border-border/70">
                <td className="py-1.5">{l.designation}</td>
                <td className="py-1.5 text-right font-mono">{l.quantite}</td>
                <td className="py-1.5 text-right font-mono">{l.prixUnitaire.toLocaleString('fr-CD', { maximumFractionDigits: 2 })}</td>
                <td className="py-1.5 text-right font-mono">{(l.quantite * l.prixUnitaire).toLocaleString('fr-CD', { maximumFractionDigits: 2 })}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="ml-auto max-w-[260px]">
          <DecompteCard d={decompte} devise={facture.devise} />
        </div>
      </div>
    </div>
  )
}

// ─── Onglet 3 : Écritures ─────────────────────────────────────────────────────
function OngletEcritures({ facture, userId }: { facture: FactureDevise; userId: string }) {
  const [dateReglementEscompte, setDateReglementEscompte] = useState(facture.dateFacture)
  const [reprisesEmballages, setReprisesEmballages] = useState<Record<number, { prix: string; date: string; nonRetour: boolean }>>({})

  const ecrEngagementF = useMemo(() => genererEcritureEngagementFournisseur(facture), [facture])
  const ecrEngagementC = useMemo(() => genererEcritureEngagementClient(facture), [facture])

  const decompteCDF = useMemo(() => calculerDecompte(facture, facture.coursEngagement), [facture])

  return (
    <div className="space-y-6">
      <Callout>
        {facture.type === 'achat'
          ? "Écritures côté acheteur : achat au débit (601), TVA récupérable (445), dette fournisseur au crédit (401)."
          : "Écritures côté vendeur : créance client au débit (411), TVA facturée et vente au crédit (443/701)."}
        {' '}Affichées dans les deux perspectives, fournisseur et client, pour la valeur pédagogique.
      </Callout>

      <TwinEcritures titre="1 — Engagement (facturation)" fournisseur={ecrEngagementF} client={ecrEngagementC} />
      <div className="flex gap-4">
        <ExportButton ecriture={ecrEngagementF} userId={userId} couleur="teal" />
        <ExportButton ecriture={ecrEngagementC} userId={userId} couleur="violet" />
      </div>

      {facture.escompteConditionnel && facture.escomptePct > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">2 — Escompte conditionnel réalisé au règlement</p>
          <div className="mb-2.5">
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Date du règlement anticipé</label>
            <input type="date" value={dateReglementEscompte} onChange={e => setDateReglementEscompte(e.target.value)}
              className="w-48 rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-module-teal/30" />
          </div>
          <TwinEcritures titre="" fournisseur={genererEcritureEscompteRealiseFournisseur(facture, dateReglementEscompte)} client={genererEcritureEscompteRealiseClient(facture, dateReglementEscompte)} />
          <div className="flex gap-4">
            <ExportButton ecriture={genererEcritureEscompteRealiseFournisseur(facture, dateReglementEscompte)} userId={userId} couleur="teal" />
            <ExportButton ecriture={genererEcritureEscompteRealiseClient(facture, dateReglementEscompte)} userId={userId} couleur="violet" />
          </div>
        </div>
      )}

      {facture.avanceRecue > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Avance et acompte — réception (4191/4091)</p>
          <p className="text-xs text-muted-foreground mb-2.5">L'imputation de l'avance sur le solde dû figure déjà dans l'écriture d'engagement ci-dessus.</p>
          <TwinEcritures titre=""
            fournisseur={genererEcritureAvanceRecueFournisseur(facture.tiers, arrondi(facture.avanceRecue * facture.coursEngagement), facture.dateFacture)}
            client={genererEcritureAvanceVerseeClient(facture.tiers, arrondi(facture.avanceRecue * facture.coursEngagement), facture.dateFacture)} />
        </div>
      )}

      {facture.emballages.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Emballages consignés — retour</p>
          <div className="space-y-4">
            {facture.emballages.map((emb, i) => {
              const consigneCDF = arrondi(emb.quantite * emb.prixUnitaireConsigne * facture.coursEngagement)
              const saisie = reprisesEmballages[i] ?? { prix: String(emb.prixUnitaireConsigne), date: facture.dateFacture, nonRetour: false }
              const repriseCDF = arrondi(emb.quantite * (Number(saisie.prix) || 0) * facture.coursEngagement)
              return (
                <div key={i} className="rounded-xl border border-border p-3.5 space-y-2.5">
                  <p className="text-xs font-bold">{emb.designation} · {emb.quantite} × {emb.prixUnitaireConsigne.toLocaleString('fr-CD')} {facture.devise}</p>
                  <div className="grid grid-cols-3 gap-2 items-end">
                    <div>
                      <span className="text-[10px] text-muted-foreground">Prix de reprise (u.)</span>
                      <input type="number" value={saisie.prix} onChange={e => setReprisesEmballages(r => ({ ...r, [i]: { ...saisie, prix: e.target.value } }))}
                        className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs font-mono" />
                    </div>
                    <div>
                      <span className="text-[10px] text-muted-foreground">Date</span>
                      <input type="date" value={saisie.date} onChange={e => setReprisesEmballages(r => ({ ...r, [i]: { ...saisie, date: e.target.value } }))}
                        className="w-full rounded-lg border border-border bg-background px-2 py-1.5 text-xs" />
                    </div>
                    <label className="flex items-center gap-1.5 text-xs">
                      <input type="checkbox" checked={saisie.nonRetour} onChange={e => setReprisesEmballages(r => ({ ...r, [i]: { ...saisie, nonRetour: e.target.checked } }))} />
                      Non-retour
                    </label>
                  </div>
                  {saisie.nonRetour ? (
                    <TwinEcritures titre=""
                      fournisseur={genererEcritureNonRetourEmballageFournisseur(emb.designation, consigneCDF, facture.tauxTVA, emb.identifiable, saisie.date)}
                      client={genererEcritureNonRetourEmballageClient(emb.designation, consigneCDF, facture.tauxTVA, emb.identifiable, saisie.date)} />
                  ) : (
                    <TwinEcritures titre=""
                      fournisseur={genererEcritureRetourEmballageFournisseur(emb.designation, consigneCDF, repriseCDF, facture.tauxTVA, saisie.date)}
                      client={genererEcritureRetourEmballageClient(emb.designation, consigneCDF, repriseCDF, facture.tauxTVA, saisie.date)} />
                  )}
                </div>
              )
            })}
          </div>
        </div>
      )}

      {facture.devise !== 'CDF' && (
        <Callout couleur="amber">
          Le règlement en devise (avant clôture, avec écart de change réalisé) reste géré séparément — voir l'onglet <strong>Écarts</strong> pour le solde restant à la clôture.
        </Callout>
      )}
    </div>
  )
}

// ─── Onglet 4 : Écarts de conversion ──────────────────────────────────────────
function OngletEcarts({ facture, userId }: { facture: FactureDevise; userId: string }) {
  const soldeInitial = useMemo(() => netAPayerDevise(facture), [facture])
  const [soldeRestant, setSoldeRestant] = useState(String(soldeInitial))
  const [coursCloture, setCoursCloture] = useState(String(Math.round(facture.coursEngagement * 1.03)))
  const [dateCloture, setDateCloture] = useState(new Date().toISOString().split('T')[0])
  const [modalEcriture, setModalEcriture] = useState<EcritureFactureGeneree | null>(null)

  const solde = Number(soldeRestant) || 0
  const ecart = useMemo(
    () => calculerEcartConversionCommercial(facture, solde, Number(coursCloture) || facture.coursEngagement),
    [facture, solde, coursCloture]
  )
  const ecritureEcart = genererEcritureEcartConversion(facture, ecart, dateCloture)
  const ecritureProvision = genererEcritureProvisionCommercial(facture, ecart, dateCloture)

  if (facture.devise === 'CDF') {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/20 py-12 text-center space-y-2">
        <ArrowLeftRight className="h-9 w-9 text-muted-foreground/40 mx-auto" />
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          « {facture.tiers} · {facture.reference} » est libellée en CDF : aucun écart de conversion n'est possible.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <Callout>
        Une créance ou une dette en devise subsistant à la clôture est reconvertie au <strong>cours du jour de l'inventaire</strong> (Art. 54 AUDCIF). Pour une dette (achat), une hausse du cours est une <strong>perte</strong> ; pour une créance (vente), la même hausse est un <strong>gain</strong>.
      </Callout>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">Solde restant dû à la clôture ({facture.devise})</label>
          <input type="number" value={soldeRestant} onChange={e => setSoldeRestant(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-violet/30" />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">Cours de clôture (CDF/{facture.devise})</label>
          <input type="number" value={coursCloture} onChange={e => setCoursCloture(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-violet/30" />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">Date de clôture</label>
          <input type="date" value={dateCloture} onChange={e => setDateCloture(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-module-violet/30" />
        </div>
      </div>

      {ecart.sens !== 'nul' && (
        <div className={cn('flex items-center justify-between rounded-xl px-4 py-3',
          ecart.sens === 'perte' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700')}>
          <span className="text-sm font-semibold">Écart de conversion ({ecart.sens === 'perte' ? 'perte latente' : 'gain latent'})</span>
          <span className="font-mono font-bold text-lg">{formatFC(ecart.ecart)}</span>
        </div>
      )}

      {ecritureEcart && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Écritures</p>
          <div className="space-y-2.5">
            <div>
              <EcritureCard ec={ecritureEcart} numero={3} />
              <ExportButton ecriture={ecritureEcart} userId={userId} couleur="violet" />
            </div>
            {ecritureProvision && (
              <div>
                <EcritureCard ec={ecritureProvision} numero={4} />
                <ExportButton ecriture={ecritureProvision} userId={userId} couleur="violet" />
              </div>
            )}
          </div>
        </div>
      )}

      <Callout couleur="amber">
        <strong>Prudence (Art. 54) :</strong> une perte latente est provisionnée intégralement — 6591 (Charges pour provisions à court terme) / 4991 — <strong>sans étalement</strong> : contrairement à un emprunt, une créance ou dette commerciale est par nature à moins d'un an, l'Art. 56 (étalement multi-exercices) ne s'y applique pas. Un gain latent (479) n'entre jamais dans le résultat tant qu'il n'est pas réalisé.
      </Callout>

      <div className="rounded-xl border border-border p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">À l'ouverture de l'exercice suivant</p>
        <div className="flex gap-3 text-xs">
          <span className="h-5 w-5 rounded-full bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center shrink-0">↺</span>
          <div>
            <p className="font-semibold">Contrepassation intégrale</p>
            <p className="text-muted-foreground mt-0.5">L'écart de conversion et la provision sont extournés en totalité. Au règlement effectif, la différence entre cours d'engagement et cours de règlement est constatée en 656/756.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Onglet 5 : Disponibilités en devises ────────────────────────────────────
function OngletDisponibilites() {
  const [designation, setDesignation] = useState('Caisse USD')
  const [montant, setMontant] = useState('')
  const [coursEntree, setCoursEntree] = useState('2800')
  const [coursCloture, setCoursCloture] = useState('2850')
  const [dateCloture, setDateCloture] = useState(new Date().toISOString().split('T')[0])
  const [resultat, setResultat] = useState<EcritureFactureGeneree | null | undefined>(undefined)

  const calculer = () => {
    const ec = genererEcritureDisponibilites(designation, Number(montant) || 0, Number(coursEntree) || 1, Number(coursCloture) || 1, dateCloture)
    setResultat(ec)
  }

  return (
    <div className="space-y-5">
      <Callout>
        <strong>Art. 58 AUDCIF — règle propre aux disponibilités.</strong> À la différence des créances et dettes commerciales, l'écart sur une caisse ou un compte bancaire en devise est constaté <strong>directement en résultat</strong> (676/776) — pas de compte 478/479, pas de provision.
      </Callout>

      <div className="rounded-xl border border-border bg-card p-4 space-y-3.5">
        <div className="grid grid-cols-2 gap-3">
          <div className="col-span-2">
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Désignation</label>
            <input value={designation} onChange={e => setDesignation(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-module-blue/30" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Montant en devise</label>
            <input type="number" value={montant} onChange={e => setMontant(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-blue/30" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Cours d'entrée</label>
            <input type="number" value={coursEntree} onChange={e => setCoursEntree(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-blue/30" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Cours de clôture</label>
            <input type="number" value={coursCloture} onChange={e => setCoursCloture(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-blue/30" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Date de clôture</label>
            <input type="date" value={dateCloture} onChange={e => setDateCloture(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-module-blue/30" />
          </div>
        </div>
        <button onClick={calculer}
          className="w-full flex items-center justify-center gap-2 rounded-xl bg-module-blue hover:opacity-90 py-2.5 text-sm font-semibold text-white transition-colors">
          Calculer le redressement
        </button>
      </div>

      {resultat === null && (
        <p className="text-sm text-muted-foreground text-center py-4">Aucun écart : le cours de clôture est identique au cours d'entrée.</p>
      )}
      {resultat && <EcritureCard ec={resultat} numero={1} />}
    </div>
  )
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function FacturesDevisesPage() {
  const [, navigate] = useHashLocation()
  const user = useUser()
  const { factures, loading } = useFacturesDevises(user?.id)
  const [actif, setActif] = useState<OngletId>('factures')
  const [selectionId, setSelectionId] = useState<string | null>(null)

  const factureSelectionnee = factures.find(f => f.id === selectionId) ?? null

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/comptabilite-generale')}
          className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-module-rose/10 flex items-center justify-center">
            <Receipt className="h-4 w-4 text-module-rose" />
          </div>
          <div>
            <h1 className="text-sm font-display font-bold text-foreground leading-tight">Facturation</h1>
            <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Module 5 · 401/411 · 4194/4094 · 4191/4091 · 673/773</p>
          </div>
        </div>
      </div>

      <div role="tablist" aria-label="Facturation" className="flex border-b border-border bg-background sticky top-[57px] z-20 overflow-x-auto">
        {ONGLETS.map(o => {
          const Icon = o.icon
          const estActif = actif === o.id
          return (
            <button key={o.id} role="tab" aria-selected={estActif} onClick={() => setActif(o.id)}
              className={cn('flex-1 min-w-[84px] flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-all whitespace-nowrap',
                estActif ? `${o.border} ${o.color}` : 'border-transparent text-muted-foreground hover:text-foreground')}>
              <Icon className="h-3.5 w-3.5" />
              {o.label}
            </button>
          )
        })}
      </div>

      <div className="px-4 pt-4">
        {actif === 'factures' && (
          <OngletFactures factures={factures} loading={loading} selectionId={selectionId}
            onSelect={id => { setSelectionId(id); setActif('document') }} userId={user?.id ?? ''} />
        )}
        {actif === 'document' && (
          factureSelectionnee
            ? <OngletDocument facture={factureSelectionnee} />
            : <SansSelection onAllerFactures={() => setActif('factures')} />
        )}
        {actif === 'ecritures' && (
          factureSelectionnee
            ? <OngletEcritures facture={factureSelectionnee} userId={user?.id ?? ''} />
            : <SansSelection onAllerFactures={() => setActif('factures')} />
        )}
        {actif === 'ecarts' && (
          factureSelectionnee
            ? <OngletEcarts facture={factureSelectionnee} userId={user?.id ?? ''} />
            : <SansSelection onAllerFactures={() => setActif('factures')} />
        )}
        {actif === 'disponibilites' && <OngletDisponibilites />}
      </div>
    </div>
  )
}
