import React, { useState, useMemo } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  ArrowLeft, Receipt, Plus, Trash2, Info, AlertCircle,
  BookOpen, ArrowLeftRight, Wallet, Upload, Check,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { useSessions } from '@/lib/useFirestore'
import { addEcritureAsync } from '@/lib/db-firebase'
import { generateId } from '@/lib/utils'
import {
  useFacturesDevises, creerFacture, supprimerFacture, montantTTC,
  genererEcritureEngagement, genererEcritureReglement,
  calculerEcartConversionCommercial, genererEcritureEcartConversion, genererEcritureProvisionCommercial,
  genererEcritureDisponibilites,
  type FactureDevise, type Devise, type TypeFacture, type EcritureFactureGeneree,
} from '@/lib/useFacturesDevises'

// ─── Formatage ────────────────────────────────────────────────────────────────
function formatFC(n: number): string { return `${Math.round(n).toLocaleString('fr-CD')} FC` }
function formatDevise(n: number, devise: Devise): string { return `${n.toLocaleString('fr-CD', { maximumFractionDigits: 2 })} ${devise}` }

const ONGLETS = [
  { id: 'factures', label: 'Factures', icon: Receipt, color: 'text-module-rose', border: 'border-module-rose' },
  { id: 'ecritures', label: 'Écritures', icon: BookOpen, color: 'text-module-teal', border: 'border-module-teal' },
  { id: 'ecarts', label: 'Écarts', icon: ArrowLeftRight, color: 'text-module-violet', border: 'border-module-violet' },
  { id: 'disponibilites', label: 'Disponibilités', icon: Wallet, color: 'text-module-blue', border: 'border-module-blue' },
] as const
type OngletId = typeof ONGLETS[number]['id']

// ─── Petits composants d'affichage (mêmes patterns que le module Emprunts) ───
function Callout({ children, couleur = 'rose' }: { children: React.ReactNode; couleur?: 'rose' | 'amber' }) {
  return (
    <div className={cn(
      'rounded-xl border p-3 flex items-start gap-2 text-xs leading-relaxed',
      couleur === 'rose' ? 'border-module-rose/30 bg-module-rose/10 text-foreground' : 'border-amber-300 bg-amber-50 text-amber-800'
    )}>
      {couleur === 'rose'
        ? <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-module-rose" />
        : <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-600" />}
      <span>{children}</span>
    </div>
  )
}

function EcritureCard({ ec, numero }: { ec: EcritureFactureGeneree; numero: number }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-muted/40 border-b border-border">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-module-teal text-white text-xs font-bold shrink-0">{numero}</span>
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
    type: 'achat' as TypeFacture, tiers: '', reference: '', devise: 'USD' as Devise,
    coursEngagement: '2800', montantHT: '', tauxTVA: '16',
    dateFacture: new Date().toISOString().split('T')[0],
  })
  const [saving, setSaving] = useState(false)
  const [erreur, setErreur] = useState('')
  const [confirmSuppr, setConfirmSuppr] = useState<string | null>(null)

  const valider = async () => {
    setErreur('')
    if (!form.tiers.trim()) { setErreur(form.type === 'achat' ? 'Indiquez le fournisseur.' : 'Indiquez le client.'); return }
    if (!form.reference.trim()) { setErreur('Indiquez la référence de la facture.'); return }
    const montantHT = Number(form.montantHT)
    if (!montantHT || montantHT <= 0) { setErreur('Le montant HT doit être un nombre supérieur à 0.'); return }
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
        montantHT,
        tauxTVA: (Number(form.tauxTVA) || 0) / 100,
        dateFacture: form.dateFacture,
      })
      onSelect(id)
      setForm(f => ({ ...f, tiers: '', reference: '', montantHT: '' }))
    } catch {
      setErreur('Erreur lors de la création de la facture. Réessayez.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <Callout>
        <strong>Comptes 401/411 — Créances et dettes commerciales en devises.</strong> Achat (fournisseur, compte 401) ou vente (client, compte 411) libellé en monnaie étrangère. Chaque facture génère automatiquement ses écritures d'engagement, de règlement et d'écart de conversion à la clôture.
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
                    {' '}· {f.devise} · TVA {(f.tauxTVA * 100).toLocaleString('fr-CD')}%
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono font-bold text-sm">{montantTTC(f).toLocaleString('fr-CD', { maximumFractionDigits: 2 })}</p>
                  <p className="text-xs text-muted-foreground">{f.devise} TTC</p>
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
        <div className="rounded-xl border border-border bg-card p-4 space-y-3.5">
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
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CDF">CDF</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Montant HT ({form.devise})</label>
              <input type="number" value={form.montantHT} onChange={e => setForm(f => ({ ...f, montantHT: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-rose/30" />
            </div>
            {form.devise !== 'CDF' && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Cours d'engagement (CDF / {form.devise})</label>
                <input type="number" value={form.coursEngagement} onChange={e => setForm(f => ({ ...f, coursEngagement: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-rose/30" />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Taux de TVA (%)</label>
              <input type="number" value={form.tauxTVA} onChange={e => setForm(f => ({ ...f, tauxTVA: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-rose/30" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Date de la facture</label>
              <input type="date" value={form.dateFacture} onChange={e => setForm(f => ({ ...f, dateFacture: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-module-rose/30" />
            </div>
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

// ─── Onglet 2 : Écritures ─────────────────────────────────────────────────────
function OngletEcritures({ facture, userId }: { facture: FactureDevise; userId: string }) {
  const [montantRegle, setMontantRegle] = useState(String(facture.montantHT * (1 + facture.tauxTVA)))
  const [coursReglement, setCoursReglement] = useState(String(facture.coursEngagement))
  const [modalEcriture, setModalEcriture] = useState<EcritureFactureGeneree | null>(null)

  const ecritureEngagement = useMemo(() => genererEcritureEngagement(facture), [facture])
  const montantRegleNum = Number(montantRegle) || 0
  const ecritureReglement = montantRegleNum > 0
    ? genererEcritureReglement(facture, montantRegleNum, Number(coursReglement) || facture.coursEngagement)
    : null

  return (
    <div className="space-y-5">
      <Callout>
        {facture.type === 'achat'
          ? "Écritures côté acheteur : achat au débit (601), TVA récupérable (445), dette fournisseur au crédit (401)."
          : "Écritures côté vendeur : créance client au débit (411), TVA facturée et vente au crédit (443/701)."}
        {facture.devise !== 'CDF' && <> Cours d'engagement : <strong>1 {facture.devise} = {facture.coursEngagement.toLocaleString('fr-CD')} CDF</strong> (Art. 52 AUDCIF).</>}
      </Callout>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">1 — Engagement (facturation)</p>
        <EcritureCard ec={ecritureEngagement} numero={1} />
        <button onClick={() => setModalEcriture(ecritureEngagement)}
          className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-module-teal hover:opacity-80">
          <Upload className="h-3.5 w-3.5" /> Exporter vers le Journal
        </button>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">2 — {facture.type === 'achat' ? 'Règlement' : 'Encaissement'} (avant clôture)</p>
        <div className="grid grid-cols-2 gap-2.5 mb-2.5">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Montant {facture.type === 'achat' ? 'réglé' : 'encaissé'} TTC ({facture.devise})</label>
            <input type="number" value={montantRegle} onChange={e => setMontantRegle(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-teal/30" />
          </div>
          {facture.devise !== 'CDF' && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Cours du jour</label>
              <input type="number" value={coursReglement} onChange={e => setCoursReglement(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-teal/30" />
            </div>
          )}
        </div>
        {ecritureReglement && (
          <>
            <EcritureCard ec={ecritureReglement} numero={2} />
            <button onClick={() => setModalEcriture(ecritureReglement)}
              className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-module-teal hover:opacity-80">
              <Upload className="h-3.5 w-3.5" /> Exporter vers le Journal
            </button>
          </>
        )}
        {Number(coursReglement) !== facture.coursEngagement && facture.devise !== 'CDF' && (
          <p className="text-xs text-muted-foreground mt-1.5 italic">
            Le cours du jour de règlement diffère du cours d'engagement : la différence est un gain ou une perte de change <strong>réalisé</strong> (656/756), à la date du règlement — distinct des écarts de conversion latents de l'onglet suivant, qui ne concernent que le solde encore ouvert à la clôture.
          </p>
        )}
      </div>

      {modalEcriture && <ModalExport ecriture={modalEcriture} userId={userId} onClose={() => setModalEcriture(null)} />}
    </div>
  )
}

// ─── Onglet 3 : Écarts de conversion ──────────────────────────────────────────
function OngletEcarts({ facture, userId }: { facture: FactureDevise; userId: string }) {
  const [soldeRestant, setSoldeRestant] = useState(String(facture.montantHT * (1 + facture.tauxTVA)))
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
              <button onClick={() => setModalEcriture(ecritureEcart)}
                className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-module-violet hover:opacity-80">
                <Upload className="h-3.5 w-3.5" /> Exporter vers le Journal
              </button>
            </div>
            {ecritureProvision && (
              <div>
                <EcritureCard ec={ecritureProvision} numero={4} />
                <button onClick={() => setModalEcriture(ecritureProvision)}
                  className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-module-violet hover:opacity-80">
                  <Upload className="h-3.5 w-3.5" /> Exporter vers le Journal
                </button>
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
            <p className="text-muted-foreground mt-0.5">L'écart de conversion et la provision sont extournés en totalité. Au règlement effectif, la différence entre cours d'engagement et cours de règlement est constatée en 656/756 (voir onglet Écritures).</p>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Onglet 4 : Disponibilités en devises ────────────────────────────────────
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
        <strong>Art. 58 AUDCIF — règle propre aux disponibilités.</strong> À la différence des créances et dettes commerciales, l'écart sur une caisse ou un compte bancaire en devise est constaté <strong>directement en résultat</strong> (676/776) — pas de compte 478/479, pas de provision : la disponibilité est immédiatement mobilisable au cours du jour, il n'y a pas d'attente de réalisation.
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
            <h1 className="text-sm font-display font-bold text-foreground leading-tight">Enregistrement des Factures</h1>
            <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Module 5 · Comptes 401/411 · 478-479 · 656/756</p>
          </div>
        </div>
      </div>

      <div role="tablist" aria-label="Enregistrement des factures" className="flex border-b border-border bg-background sticky top-[57px] z-20">
        {ONGLETS.map(o => {
          const Icon = o.icon
          const estActif = actif === o.id
          return (
            <button key={o.id} role="tab" aria-selected={estActif} onClick={() => setActif(o.id)}
              className={cn('flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-all',
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
            onSelect={id => { setSelectionId(id); setActif('ecritures') }} userId={user?.id ?? ''} />
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
