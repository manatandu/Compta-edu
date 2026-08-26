import React, { useState, useMemo } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  ArrowLeft, Landmark, Plus, Trash2, Info, AlertCircle,
  BarChart2, BookOpen, ArrowLeftRight, Upload, Check, ChevronRight
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { useSessions } from '@/lib/useFirestore'
import { addEcritureAsync } from '@/lib/db-firebase'
import { generateId } from '@/lib/utils'
import {
  useEmprunts, creerEmprunt, supprimerEmprunt, calculerAmortissement, libelleMethode,
  genererEcritureReception, genererEcritureEcheance, genererEcritureInteretsCourus,
  calculerEcartConversion, genererEcritureEcartConversion, genererEcritureProvisionPerteChange,
  calculerProvisionPerteChange,
  type Emprunt, type Devise, type MethodeAmortEmprunt,
  type EcritureEmpruntGeneree,
} from '@/lib/useEmprunts'

// ─── Formatage ────────────────────────────────────────────────────────────────
function formatFC(n: number): string {
  return `${Math.round(n).toLocaleString('fr-CD')} FC`
}
function formatDevise(n: number, devise: Devise): string {
  return `${n.toLocaleString('fr-CD', { maximumFractionDigits: 2 })} ${devise}`
}

const ONGLETS = [
  { id: 'emprunts', label: 'Emprunts', icon: Landmark, color: 'text-module-violet', bg: 'bg-module-violet', border: 'border-module-violet' },
  { id: 'tableau', label: 'Tableau', icon: BarChart2, color: 'text-module-blue', bg: 'bg-module-blue', border: 'border-module-blue' },
  { id: 'ecritures', label: 'Écritures', icon: BookOpen, color: 'text-module-teal', bg: 'bg-module-teal', border: 'border-module-teal' },
  { id: 'ecarts', label: 'Écarts', icon: ArrowLeftRight, color: 'text-module-rose', bg: 'bg-module-rose', border: 'border-module-rose' },
] as const
type OngletId = typeof ONGLETS[number]['id']

// ─── Petits composants d'affichage ────────────────────────────────────────────
function Callout({ children, couleur = 'violet' }: { children: React.ReactNode; couleur?: 'violet' | 'amber' }) {
  return (
    <div className={cn(
      'rounded-xl border p-3 flex items-start gap-2 text-xs leading-relaxed',
      couleur === 'violet' ? 'border-module-violet/30 bg-module-violet/10 text-foreground' : 'border-amber-300 bg-amber-50 text-amber-800'
    )}>
      {couleur === 'violet'
        ? <Info className="h-3.5 w-3.5 shrink-0 mt-0.5 text-module-violet" />
        : <AlertCircle className="h-3.5 w-3.5 shrink-0 mt-0.5 text-amber-600" />}
      <span>{children}</span>
    </div>
  )
}

function EcritureCard({ ec, numero, couleur = 'teal' }: { ec: EcritureEmpruntGeneree; numero: number; couleur?: 'teal' | 'rose' }) {
  const totalDebit = ec.lignes.reduce((s, l) => s + l.debit, 0)
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="flex items-center gap-2.5 px-3.5 py-2.5 bg-muted/40 border-b border-border">
        <span className={cn('flex h-5 w-5 items-center justify-center rounded-full text-white text-xs font-bold shrink-0',
          couleur === 'teal' ? 'bg-module-teal' : 'bg-module-rose')}>{numero}</span>
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

// ─── Modal export vers le Journal général ────────────────────────────────────
function ModalExport({ ecriture, userId, onClose }: { ecriture: EcritureEmpruntGeneree; userId: string; onClose: () => void }) {
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

// ─── Onglet 1 : Emprunts ──────────────────────────────────────────────────────
// Banques les plus courantes en RDC (agréées BCC) : sélection rapide, plutôt
// que de laisser un champ libre sans repère. « Autre » bascule sur la saisie
// manuelle pour tout établissement non listé.
const BANQUES_RDC = [
  'Rawbank', 'BCDC (Banque Commerciale Du Congo)', 'Equity BCDC', 'TMB (Trust Merchant Bank)',
  'Ecobank RDC', 'Access Bank RDC', 'FBNBank RDC', 'UBA RDC (United Bank for Africa)',
  'Afriland First Bank RDC', 'ProCredit Bank Congo', 'Stanbic Bank RDC', 'Sofibanque',
  'Advans Banque Congo', 'CRDB Bank Congo', 'BGFIBank RDC',
] as const

// Objets d'emprunt courants : suggestions cliquables pour un champ dont la
// finalité n'est pas toujours évidente à remplir (retour utilisateur).
const OBJETS_COURANTS = [
  'Fonds de roulement', 'Équipement industriel', 'Acquisition de véhicules',
  'Extension d\'activité', 'Construction / aménagement', 'Financement de stock',
  'Trésorerie', 'Rachat de crédit',
] as const

function OngletEmprunts({ emprunts, loading, selectionId, onSelect, onCreated, userId }: {
  emprunts: Emprunt[]; loading: boolean; selectionId: string | null
  onSelect: (id: string) => void; onCreated: (emprunt: Emprunt) => void; userId: string
}) {
  const [form, setForm] = useState({
    preteur: '', preteurAutre: '', devise: 'USD' as Devise, reference: '',
    capital: '', coursEntree: '2800', tauxAnnuel: '8', dureeAnnees: '5',
    dateMiseADisposition: new Date().toISOString().split('T')[0],
    methode: 'constant' as MethodeAmortEmprunt,
  })
  const [saving, setSaving] = useState(false)
  const [erreur, setErreur] = useState('')
  const [confirmSuppr, setConfirmSuppr] = useState<string | null>(null)

  const preteurFinal = form.preteur === 'Autre' ? form.preteurAutre.trim() : form.preteur

  const valider = async () => {
    setErreur('')
    if (!preteurFinal) { setErreur('Indiquez l\'établissement prêteur.'); return }
    if (!form.reference.trim()) { setErreur('Indiquez la référence / objet de l\'emprunt (voir les suggestions sous le champ).'); return }
    const capital = Number(form.capital)
    if (!capital || capital <= 0) { setErreur('Le capital emprunté doit être un nombre supérieur à 0.'); return }
    if (!userId) { setErreur('Session non chargée : rechargez la page et réessayez.'); return }
    setSaving(true)
    try {
      const donnees = {
        userId,
        preteur: preteurFinal,
        reference: form.reference.trim(),
        devise: form.devise,
        coursEntree: form.devise === 'CDF' ? 1 : Number(form.coursEntree) || 1,
        capital,
        tauxAnnuel: (Number(form.tauxAnnuel) || 0) / 100,
        dureeAnnees: Number(form.dureeAnnees) || 1,
        dateMiseADisposition: form.dateMiseADisposition,
        methode: form.methode,
      }
      const id = await creerEmprunt(donnees)
      // Mise à jour optimiste : on passe l'emprunt complet au parent tout de
      // suite, sans attendre que l'écoute temps réel Firestore (useEmprunts)
      // le fasse redescendre dans la liste. Sans ça, le changement immédiat
      // vers l'onglet Tableau pouvait tomber sur « aucun emprunt sélectionné »
      // pendant les quelques centaines de ms où le nouvel enregistrement
      // n'était pas encore remonté par l'écoute temps réel.
      onCreated({ id, ...donnees })
      setForm(f => ({ ...f, preteur: '', preteurAutre: '', reference: '', capital: '' }))
    } catch (e) {
      setErreur("Erreur lors de la création de l'emprunt. Réessayez.")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-5">
      <Callout>
        <strong>Compte 162 — Emprunts et dettes / établissements de crédit.</strong> Ressources externes remboursables à terme. Chaque emprunt créé génère automatiquement son tableau d'amortissement et ses écritures. Limité ici à l'emprunt bancaire classique (l'emprunt obligataire, compte 161, relève d'un régime distinct).
      </Callout>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Mes emprunts</p>
        {loading ? (
          <p className="text-sm text-muted-foreground text-center py-8">Chargement…</p>
        ) : emprunts.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-muted/20 py-10 text-center space-y-2">
            <Landmark className="h-8 w-8 text-muted-foreground/40 mx-auto" />
            <p className="text-sm text-muted-foreground">Aucun emprunt créé. Utilisez le formulaire ci-dessous.</p>
          </div>
        ) : (
          <div className="space-y-2.5">
            {emprunts.map(e => (
              <button key={e.id} onClick={() => onSelect(e.id)}
                className={cn(
                  'w-full flex items-center gap-3 rounded-xl border bg-card p-3.5 text-left transition-all',
                  selectionId === e.id ? 'border-module-violet ring-2 ring-module-violet/20' : 'border-border hover:border-module-violet/40'
                )}>
                <div className="h-9 w-9 rounded-lg bg-module-violet/10 flex items-center justify-center shrink-0">
                  <Landmark className="h-4 w-4 text-module-violet" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-foreground truncate">{e.preteur} · {e.reference}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <span className="font-mono font-semibold text-module-violet">{e.devise}</span>
                    {' '}· {(e.tauxAnnuel * 100).toLocaleString('fr-CD')} %/an · {e.dureeAnnees} ans · {libelleMethode(e.methode)}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <p className="font-mono font-bold text-sm">{e.capital.toLocaleString('fr-CD')}</p>
                  <p className="text-xs text-muted-foreground">{e.devise}</p>
                </div>
                <button onClick={ev => { ev.stopPropagation(); setConfirmSuppr(e.id) }}
                  className="h-7 w-7 rounded-lg hover:bg-red-50 flex items-center justify-center transition-colors shrink-0">
                  <Trash2 className="h-3.5 w-3.5 text-red-400" />
                </button>
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Nouvel emprunt</p>
        <div className="rounded-xl border border-border bg-card p-4 space-y-3.5">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Établissement prêteur</label>
              <select value={form.preteur} onChange={e => setForm(f => ({ ...f, preteur: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-module-violet/30">
                <option value="">-- Choisir une banque --</option>
                {BANQUES_RDC.map(b => <option key={b} value={b}>{b}</option>)}
                <option value="Autre">Autre (préciser)</option>
              </select>
              {form.preteur === 'Autre' && (
                <input value={form.preteurAutre} onChange={e => setForm(f => ({ ...f, preteurAutre: e.target.value }))}
                  placeholder="Nom de l'établissement" autoFocus
                  className="w-full mt-1.5 rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-module-violet/30" />
              )}
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Référence / objet</label>
              <input value={form.reference} onChange={e => setForm(f => ({ ...f, reference: e.target.value }))}
                placeholder="ex : Équipement industriel" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-module-violet/30" />
              <div className="flex flex-wrap gap-1 mt-1.5">
                {OBJETS_COURANTS.map(o => (
                  <button key={o} type="button" onClick={() => setForm(f => ({ ...f, reference: o }))}
                    className="text-xs px-2 py-0.5 rounded-full border border-border bg-muted/40 text-muted-foreground hover:border-module-violet/40 hover:text-module-violet transition-colors">
                    {o}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Devise</label>
              <select value={form.devise} onChange={e => setForm(f => ({ ...f, devise: e.target.value as Devise }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-module-violet/30">
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="CDF">CDF</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Capital emprunté ({form.devise})</label>
              <input type="number" value={form.capital} onChange={e => setForm(f => ({ ...f, capital: e.target.value }))}
                placeholder="20000" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-violet/30" />
            </div>
            {form.devise !== 'CDF' && (
              <div>
                <label className="text-xs font-semibold text-muted-foreground mb-1 block">Cours d'entrée (CDF / {form.devise})</label>
                <input type="number" value={form.coursEntree} onChange={e => setForm(f => ({ ...f, coursEntree: e.target.value }))}
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-violet/30" />
              </div>
            )}
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Taux d'intérêt annuel (%)</label>
              <input type="number" value={form.tauxAnnuel} onChange={e => setForm(f => ({ ...f, tauxAnnuel: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-violet/30" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Durée (années)</label>
              <input type="number" value={form.dureeAnnees} onChange={e => setForm(f => ({ ...f, dureeAnnees: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-violet/30" />
            </div>
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Date de mise à disposition</label>
              <input type="date" value={form.dateMiseADisposition} onChange={e => setForm(f => ({ ...f, dateMiseADisposition: e.target.value }))}
                className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-module-violet/30" />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1.5 block">Méthode d'amortissement</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { id: 'constant', t: 'Constant', d: 'Capital identique chaque échéance ; annuité dégressive.' },
                { id: 'annuites_constantes', t: 'Annuités constantes', d: 'Annuité identique ; capital croissant, intérêts décroissants.' },
                { id: 'in_fine', t: 'In fine', d: 'Intérêts seuls chaque échéance ; capital remboursé au terme.' },
              ] as const).map(m => (
                <button key={m.id} onClick={() => setForm(f => ({ ...f, methode: m.id }))}
                  className={cn('rounded-lg border-2 px-2.5 py-2 text-left transition-all',
                    form.methode === m.id ? 'border-module-violet bg-module-violet/10' : 'border-border bg-background hover:border-module-violet/30')}>
                  <p className="text-xs font-bold">{m.t}</p>
                  <p className="text-xs text-muted-foreground leading-snug mt-0.5">{m.d}</p>
                </button>
              ))}
            </div>
          </div>

          {erreur && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 px-3 py-2">
              <AlertCircle className="h-3.5 w-3.5 text-red-500 shrink-0" />
              <p className="text-xs text-red-600">{erreur}</p>
            </div>
          )}

          <button onClick={valider} disabled={saving}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-module-violet hover:opacity-90 py-2.5 text-sm font-semibold text-white transition-colors disabled:opacity-50">
            <Plus className="h-4 w-4" />
            {saving ? 'Création…' : "Créer l'emprunt"}
          </button>
        </div>
      </div>

      {confirmSuppr && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-card rounded-2xl border border-border shadow-2xl p-6 max-w-sm w-full space-y-4">
            <h3 className="font-bold text-foreground">Supprimer cet emprunt ?</h3>
            <p className="text-sm text-muted-foreground">Cette action est irréversible.</p>
            <div className="flex gap-2">
              <button onClick={() => setConfirmSuppr(null)} className="flex-1 rounded-xl border border-border py-2.5 text-sm font-semibold text-muted-foreground hover:bg-muted/30 transition-colors">Annuler</button>
              <button onClick={async () => { await supprimerEmprunt(confirmSuppr); setConfirmSuppr(null) }}
                className="flex-1 rounded-xl bg-red-500 hover:bg-red-600 py-2.5 text-sm font-semibold text-white transition-colors">Supprimer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── Placeholder « sélectionnez un emprunt » ─────────────────────────────────
function SansSelection({ onAllerEmprunts }: { onAllerEmprunts: () => void }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-muted/20 py-12 text-center space-y-3">
      <Landmark className="h-9 w-9 text-muted-foreground/40 mx-auto" />
      <p className="text-sm text-muted-foreground">Sélectionnez d'abord un emprunt dans l'onglet « Emprunts ».</p>
      <button onClick={onAllerEmprunts}
        className="inline-flex items-center gap-1.5 rounded-xl bg-module-violet hover:opacity-90 px-4 py-2 text-sm font-semibold text-white transition-colors">
        Voir mes emprunts <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  )
}

// ─── Onglet 2 : Tableau d'amortissement ──────────────────────────────────────
function OngletTableau({ emprunt }: { emprunt: Emprunt }) {
  const lignes = useMemo(() => calculerAmortissement(emprunt), [emprunt])
  const totalInterets = lignes.reduce((s, l) => s + l.interets, 0)
  const totalAmort = lignes.reduce((s, l) => s + l.amortCapital, 0)
  const totalAnnuite = lignes.reduce((s, l) => s + l.annuite, 0)

  const autresMethodes = (['constant', 'annuites_constantes', 'in_fine'] as MethodeAmortEmprunt[])
    .map(m => {
      const l = calculerAmortissement({ ...emprunt, methode: m })
      return { methode: m, totalInterets: l.reduce((s, x) => s + x.interets, 0) }
    })

  return (
    <div className="space-y-5">
      <Callout>
        <strong>{emprunt.preteur} · {emprunt.reference}</strong> — {formatDevise(emprunt.capital, emprunt.devise)}, {(emprunt.tauxAnnuel * 100).toLocaleString('fr-CD')} %/an, {emprunt.dureeAnnees} ans, <strong>{libelleMethode(emprunt.methode)}</strong>.
        {emprunt.methode === 'constant' && ` Capital constant = ${emprunt.capital.toLocaleString('fr-CD')} ÷ ${emprunt.dureeAnnees} = ${(emprunt.capital / emprunt.dureeAnnees).toLocaleString('fr-CD', { maximumFractionDigits: 2 })} ${emprunt.devise}/échéance.`}
        {' '}Intérêt de la période = capital dû en début de période × taux.
      </Callout>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Échéancier ({emprunt.devise})</p>
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full text-xs min-w-[600px]">
            <thead>
              <tr className="bg-muted/60">
                {['Éch.', 'Date', 'Capital dû début', 'Intérêts', 'Amort. capital', 'Annuité', 'Capital dû fin'].map((h, i) => (
                  <th key={h} className={cn('px-3 py-2 font-mono uppercase text-xs text-muted-foreground font-semibold border-b border-border', i > 1 ? 'text-right' : 'text-left')}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border/60">
              {lignes.map(l => (
                <tr key={l.periode} className="hover:bg-muted/20">
                  <td className="px-3 py-2 font-semibold">{l.periode}</td>
                  <td className="px-3 py-2 font-mono text-muted-foreground">{l.dateEcheance}</td>
                  <td className="px-3 py-2 text-right font-mono">{l.capitalDebut.toLocaleString('fr-CD', { maximumFractionDigits: 2 })}</td>
                  <td className="px-3 py-2 text-right font-mono">{l.interets.toLocaleString('fr-CD', { maximumFractionDigits: 2 })}</td>
                  <td className="px-3 py-2 text-right font-mono">{l.amortCapital.toLocaleString('fr-CD', { maximumFractionDigits: 2 })}</td>
                  <td className="px-3 py-2 text-right font-mono">{l.annuite.toLocaleString('fr-CD', { maximumFractionDigits: 2 })}</td>
                  <td className="px-3 py-2 text-right font-mono">{l.capitalFin.toLocaleString('fr-CD', { maximumFractionDigits: 2 })}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="bg-muted/60 font-bold">
                <td colSpan={3} className="px-3 py-2">TOTAUX</td>
                <td className="px-3 py-2 text-right font-mono">{totalInterets.toLocaleString('fr-CD', { maximumFractionDigits: 2 })}</td>
                <td className="px-3 py-2 text-right font-mono">{totalAmort.toLocaleString('fr-CD', { maximumFractionDigits: 2 })}</td>
                <td className="px-3 py-2 text-right font-mono">{totalAnnuite.toLocaleString('fr-CD', { maximumFractionDigits: 2 })}</td>
                <td />
              </tr>
            </tfoot>
          </table>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Comparaison des méthodes <span className="normal-case font-normal">— même capital, même taux, même durée</span></p>
        <div className="grid sm:grid-cols-3 gap-2.5">
          {autresMethodes.map(m => (
            <div key={m.methode} className={cn('rounded-xl border p-3', m.methode === emprunt.methode ? 'border-module-violet bg-module-violet/10' : 'border-border bg-card')}>
              <p className="text-xs font-bold flex items-center gap-1.5">
                {m.methode === emprunt.methode && <span className="text-module-violet">●</span>}
                {libelleMethode(m.methode)}
              </p>
              <p className="text-xs text-muted-foreground mt-1">Total intérêts : <span className="font-mono font-semibold text-foreground">{m.totalInterets.toLocaleString('fr-CD', { maximumFractionDigits: 2 })} {emprunt.devise}</span></p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─── Onglet 3 : Écritures ─────────────────────────────────────────────────────
function OngletEcritures({ emprunt, userId }: { emprunt: Emprunt; userId: string }) {
  const lignes = useMemo(() => calculerAmortissement(emprunt), [emprunt])
  const [periodeChoisie, setPeriodeChoisie] = useState(1)
  const [coursReglement, setCoursReglement] = useState(String(emprunt.coursEntree))
  const [joursCourus, setJoursCourus] = useState('0')
  const [coursCourus, setCoursCourus] = useState(String(emprunt.coursEntree))
  const [dateCloture, setDateCloture] = useState(new Date().toISOString().split('T')[0])
  const [modalEcriture, setModalEcriture] = useState<EcritureEmpruntGeneree | null>(null)

  const ligneCourante = lignes[periodeChoisie - 1]
  const ecritureReception = useMemo(() => genererEcritureReception(emprunt), [emprunt])
  const ecritureEcheance = useMemo(
    () => ligneCourante ? genererEcritureEcheance(emprunt, ligneCourante, Number(coursReglement) || emprunt.coursEntree) : null,
    [emprunt, ligneCourante, coursReglement]
  )
  const capitalDebutCourant = ligneCourante?.capitalDebut ?? emprunt.capital
  const montantInteretsCourus = capitalDebutCourant * emprunt.tauxAnnuel * (Number(joursCourus) || 0) / 360
  const ecritureInteretsCourus = montantInteretsCourus > 0
    ? genererEcritureInteretsCourus(emprunt, montantInteretsCourus, Number(coursCourus) || emprunt.coursEntree, dateCloture)
    : null

  return (
    <div className="space-y-5">
      <Callout>
        Écritures générées automatiquement à chaque étape, exportables vers le Journal général.
        {emprunt.devise !== 'CDF' && <> Cours d'entrée retenu : <strong>1 {emprunt.devise} = {emprunt.coursEntree.toLocaleString('fr-CD')} CDF</strong> (cours au comptant à la mise à disposition, Art. 52 AUDCIF).</>}
      </Callout>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">1 — Mise à disposition des fonds</p>
        <EcritureCard ec={ecritureReception} numero={1} />
        <button onClick={() => setModalEcriture(ecritureReception)}
          className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-module-teal hover:opacity-80">
          <Upload className="h-3.5 w-3.5" /> Exporter vers le Journal
        </button>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">2 — Échéance</p>
        <div className="flex flex-wrap items-end gap-3 mb-2.5">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Échéance n°</label>
            <select value={periodeChoisie} onChange={e => setPeriodeChoisie(Number(e.target.value))}
              className="rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-module-teal/30">
              {lignes.map(l => <option key={l.periode} value={l.periode}>{l.periode} — {l.dateEcheance}</option>)}
            </select>
          </div>
          {emprunt.devise !== 'CDF' && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Cours du jour de règlement</label>
              <input type="number" value={coursReglement} onChange={e => setCoursReglement(e.target.value)}
                className="w-32 rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-teal/30" />
            </div>
          )}
        </div>
        {ecritureEcheance && (
          <>
            <EcritureCard ec={ecritureEcheance} numero={2} />
            <button onClick={() => setModalEcriture(ecritureEcheance)}
              className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-module-teal hover:opacity-80">
              <Upload className="h-3.5 w-3.5" /> Exporter vers le Journal
            </button>
          </>
        )}
        {Number(coursReglement) !== emprunt.coursEntree && emprunt.devise !== 'CDF' && (
          <p className="text-xs text-muted-foreground mt-1.5 italic">
            Le cours du jour de règlement diffère du cours d'entrée : la portion capital remboursée dégage un écart <strong>réalisé</strong> (676/776), distinct des écarts de conversion latents de l'onglet suivant.
          </p>
        )}
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">3 — Intérêts courus non échus, à la clôture</p>
        <div className="grid grid-cols-3 gap-2.5 mb-2.5">
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Date de clôture</label>
            <input type="date" value={dateCloture} onChange={e => setDateCloture(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-module-teal/30" />
          </div>
          <div>
            <label className="text-xs font-semibold text-muted-foreground mb-1 block">Jours courus depuis la dernière échéance</label>
            <input type="number" value={joursCourus} onChange={e => setJoursCourus(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-teal/30" />
          </div>
          {emprunt.devise !== 'CDF' && (
            <div>
              <label className="text-xs font-semibold text-muted-foreground mb-1 block">Cours de clôture</label>
              <input type="number" value={coursCourus} onChange={e => setCoursCourus(e.target.value)}
                className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-teal/30" />
            </div>
          )}
        </div>
        {ecritureInteretsCourus ? (
          <>
            <EcritureCard ec={ecritureInteretsCourus} numero={3} />
            <button onClick={() => setModalEcriture(ecritureInteretsCourus)}
              className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-module-teal hover:opacity-80">
              <Upload className="h-3.5 w-3.5" /> Exporter vers le Journal
            </button>
          </>
        ) : (
          <p className="text-xs text-muted-foreground italic">Saisissez un nombre de jours courus &gt; 0 pour générer l'écriture.</p>
        )}
        <Callout couleur="amber">
          Nécessaire seulement si l'échéance de l'emprunt ne coïncide pas avec la date de clôture. <strong>Cette écriture est contrepassée à l'ouverture de l'exercice suivant</strong> (débit 1662 / crédit 6712).
        </Callout>
      </div>

      {modalEcriture && <ModalExport ecriture={modalEcriture} userId={userId} onClose={() => setModalEcriture(null)} />}
    </div>
  )
}

// ─── Onglet 4 : Écarts de conversion ──────────────────────────────────────────
function OngletEcarts({ emprunt, userId }: { emprunt: Emprunt; userId: string }) {
  const lignes = useMemo(() => calculerAmortissement(emprunt), [emprunt])
  const [apresEcheance, setApresEcheance] = useState(lignes.length > 0 ? 1 : 0)
  const [coursCloture, setCoursCloture] = useState(String(Math.round(emprunt.coursEntree * 1.05)))
  const [dateCloture, setDateCloture] = useState(new Date().toISOString().split('T')[0])
  const [modalEcriture, setModalEcriture] = useState<EcritureEmpruntGeneree | null>(null)

  const capitalRestant = apresEcheance === 0 ? emprunt.capital : (lignes[apresEcheance - 1]?.capitalFin ?? 0)
  const ecart = useMemo(
    () => calculerEcartConversion(emprunt, capitalRestant, Number(coursCloture) || emprunt.coursEntree),
    [emprunt, capitalRestant, coursCloture]
  )
  const ecritureEcart = genererEcritureEcartConversion(emprunt, ecart, dateCloture)
  const provision = useMemo(() => calculerProvisionPerteChange(emprunt, ecart, dateCloture), [emprunt, ecart, dateCloture])
  const ecritureProvision = genererEcritureProvisionPerteChange(emprunt, provision, dateCloture)

  if (emprunt.devise === 'CDF') {
    return (
      <div className="rounded-xl border border-dashed border-border bg-muted/20 py-12 text-center space-y-2">
        <ArrowLeftRight className="h-9 w-9 text-muted-foreground/40 mx-auto" />
        <p className="text-sm text-muted-foreground max-w-sm mx-auto">
          « {emprunt.preteur} · {emprunt.reference} » est libellé en CDF : aucun écart de conversion n'est possible (Art. 51-57 AUDCIF ne concernent que les dettes en devise étrangère).
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      <Callout>
        Un emprunt en devise subsistant à la clôture est reconverti au <strong>cours de change du jour de l'inventaire</strong> (Art. 54 AUDCIF). L'écart par rapport à sa valeur d'origine est isolé dans un compte dédié — jamais mélangé au capital ni aux intérêts.
      </Callout>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">Capital restant dû après l'échéance</label>
          <select value={apresEcheance} onChange={e => setApresEcheance(Number(e.target.value))}
            className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-module-rose/30">
            <option value={0}>0 (avant toute échéance)</option>
            {lignes.map(l => <option key={l.periode} value={l.periode}>{l.periode} — {l.dateEcheance}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">Cours de clôture (CDF/{emprunt.devise})</label>
          <input type="number" value={coursCloture} onChange={e => setCoursCloture(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-module-rose/30" />
        </div>
        <div>
          <label className="text-xs font-semibold text-muted-foreground mb-1 block">Date de clôture</label>
          <input type="date" value={dateCloture} onChange={e => setDateCloture(e.target.value)}
            className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-module-rose/30" />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">Capital restant dû : {formatDevise(capitalRestant, emprunt.devise)}</p>
        <div className="grid grid-cols-[1fr,auto,1fr] items-center gap-3">
          <div className="rounded-lg bg-muted/50 text-center py-3">
            <p className="text-xs font-mono uppercase text-muted-foreground">Cours d'entrée</p>
            <p className="font-mono font-bold text-lg mt-0.5">{emprunt.coursEntree.toLocaleString('fr-CD')}</p>
          </div>
          <span className="text-muted-foreground text-lg">→</span>
          <div className="rounded-lg bg-muted/50 text-center py-3">
            <p className="text-xs font-mono uppercase text-muted-foreground">Cours de clôture</p>
            <p className="font-mono font-bold text-lg mt-0.5">{(Number(coursCloture) || 0).toLocaleString('fr-CD')}</p>
          </div>
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Calcul de l'écart</p>
        <ol className="rounded-xl border border-border bg-card divide-y divide-border">
          <li className="flex gap-3 p-3">
            <span className="h-5 w-5 rounded-full bg-module-violet/10 text-module-violet text-xs font-bold flex items-center justify-center shrink-0">1</span>
            <div className="text-xs"><p className="font-semibold">Valeur d'origine du capital restant dû</p>
              <p className="text-muted-foreground font-mono mt-0.5">{formatDevise(capitalRestant, emprunt.devise)} × {emprunt.coursEntree.toLocaleString('fr-CD')} = <strong className="text-foreground">{formatFC(ecart.valeurOrigine)}</strong></p></div>
          </li>
          <li className="flex gap-3 p-3">
            <span className="h-5 w-5 rounded-full bg-module-violet/10 text-module-violet text-xs font-bold flex items-center justify-center shrink-0">2</span>
            <div className="text-xs"><p className="font-semibold">Valeur au cours de clôture</p>
              <p className="text-muted-foreground font-mono mt-0.5">{formatDevise(capitalRestant, emprunt.devise)} × {(Number(coursCloture) || 0).toLocaleString('fr-CD')} = <strong className="text-foreground">{formatFC(ecart.valeurCloture)}</strong></p></div>
          </li>
          <li className="flex gap-3 p-3">
            <span className="h-5 w-5 rounded-full bg-module-violet/10 text-module-violet text-xs font-bold flex items-center justify-center shrink-0">3</span>
            <div className="text-xs"><p className="font-semibold">
              {ecart.sens === 'perte' ? `Le ${emprunt.devise} s'est apprécié → la dette augmente en CDF`
                : ecart.sens === 'gain' ? `Le ${emprunt.devise} s'est déprécié → la dette diminue en CDF`
                : 'Cours inchangé : aucun écart'}
            </p>
              {ecart.sens !== 'nul' && (
                <p className="text-muted-foreground mt-0.5">
                  {ecart.sens === 'perte'
                    ? "Pour l'emprunteur, c'est une perte latente : il faudra plus de CDF pour rembourser le même nombre de dollars."
                    : "Pour l'emprunteur, c'est un gain latent : il faudra moins de CDF pour rembourser le même nombre de dollars."}
                </p>
              )}
            </div>
          </li>
        </ol>
      </div>

      {ecart.sens !== 'nul' && (
        <div className={cn('flex items-center justify-between rounded-xl px-4 py-3',
          ecart.sens === 'perte' ? 'bg-rose-50 text-rose-700' : 'bg-emerald-50 text-emerald-700')}>
          <span className="text-sm font-semibold">Écart de conversion ({ecart.sens === 'perte' ? 'perte latente' : 'gain latent'})</span>
          <span className="font-mono font-bold text-lg">{ecart.sens === 'perte' ? '+' : '−'} {formatFC(ecart.ecart)}</span>
        </div>
      )}

      {ecritureEcart && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Écritures</p>
          <div className="space-y-2.5">
            <div>
              <EcritureCard ec={ecritureEcart} numero={4} couleur="rose" />
              <button onClick={() => setModalEcriture(ecritureEcart)}
                className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-module-rose hover:opacity-80">
                <Upload className="h-3.5 w-3.5" /> Exporter vers le Journal
              </button>
            </div>
            {ecritureProvision && (
              <div>
                <div className="rounded-lg bg-muted/40 border border-border px-3 py-2.5 mb-2 text-xs">
                  <p className="font-semibold text-foreground mb-0.5">Étalement de la provision (Art. 56 AUDCIF)</p>
                  <p className="text-muted-foreground">
                    Un emprunt affecte plusieurs exercices : la provision n'est pas égale à l'écart entier, elle est <strong>limitée à la fraction de mois déjà couverte par le contrat</strong> depuis la mise à disposition.
                    {' '}{provision.moisEcoules} mois écoulés ÷ {provision.dureeTotaleMois} mois (durée totale) = {formatFC(ecart.ecart)} × {(provision.fraction * 100).toLocaleString('fr-CD', { maximumFractionDigits: 1 })} % = <strong className="text-foreground">{formatFC(provision.montant)}</strong>.
                  </p>
                </div>
                <EcritureCard ec={ecritureProvision} numero={5} couleur="rose" />
                <button onClick={() => setModalEcriture(ecritureProvision)}
                  className="mt-2 flex items-center gap-1.5 text-xs font-semibold text-module-rose hover:opacity-80">
                  <Upload className="h-3.5 w-3.5" /> Exporter vers le Journal
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <Callout couleur="amber">
        <strong>Prudence (Art. 54 AUDCIF) :</strong> une perte latente (478) est <strong>toujours</strong> provisionnée à hauteur de l'écart. Un gain latent (479) — cours qui aurait baissé — <strong>n'entre jamais dans le résultat</strong> tant qu'il n'est pas réalisé : aucune provision, aucun produit.
      </Callout>

      <div className="rounded-xl border border-border p-4 space-y-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">À l'ouverture de l'exercice suivant</p>
        <div className="flex gap-3 text-xs">
          <span className="h-5 w-5 rounded-full bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center shrink-0">↺</span>
          <div>
            <p className="font-semibold">Contrepassation de l'écart</p>
            <p className="text-muted-foreground mt-0.5">La dette revient à sa valeur d'origine. Un <strong>nouvel écart</strong> sera recalculé à la prochaine clôture, toujours par rapport au cours d'entrée — jamais par rapport au cours de clôture précédent.</p>
          </div>
        </div>
        <div className="flex gap-3 text-xs">
          <span className="h-5 w-5 rounded-full bg-muted text-muted-foreground text-xs font-bold flex items-center justify-center shrink-0">↺</span>
          <div>
            <p className="font-semibold">Extourne intégrale de la provision de l'exercice</p>
            <p className="text-muted-foreground mt-0.5">Débit 194 / Crédit 7971, pour la <strong>totalité</strong> de la provision constituée cette clôture — pas seulement l'excédent. À la clôture suivante, une provision entièrement nouvelle est calculée sur le nouvel écart et la nouvelle fraction de mois écoulés (Art. 56).</p>
          </div>
        </div>
      </div>

      <Callout>
        <strong>Écart latent ≠ écart réalisé.</strong> Au règlement effectif d'une échéance, si le cours du jour de paiement diffère du cours d'entrée, la différence est un gain ou une perte <strong>réalisé</strong> — compte 676 (perte) ou 776 (gain), <em>Pertes / Gains de change financiers</em> — distinct des comptes 478/479 qui ne servent qu'à la clôture, pour des montants encore latents.
      </Callout>

      {modalEcriture && <ModalExport ecriture={modalEcriture} userId={userId} onClose={() => setModalEcriture(null)} />}
    </div>
  )
}

// ─── Page principale ──────────────────────────────────────────────────────────
export default function EmpruntsPage() {
  const [, navigate] = useHashLocation()
  const user = useUser()
  const { emprunts, loading } = useEmprunts(user?.id)
  const [actif, setActif] = useState<OngletId>('emprunts')
  const [selectionId, setSelectionId] = useState<string | null>(null)
  // Voir le commentaire dans OngletEmprunts.valider() : comble le délai entre
  // la création Firestore et la remontée par l'écoute temps réel useEmprunts.
  const [empruntOptimiste, setEmpruntOptimiste] = useState<Emprunt | null>(null)

  const empruntSelectionne = emprunts.find(e => e.id === selectionId)
    ?? (empruntOptimiste?.id === selectionId ? empruntOptimiste : null)

  return (
    <div className="min-h-screen bg-background pb-24 animate-fadeIn">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3 animate-slideDown">
        <button onClick={() => navigate('/comptabilite-generale')}
          className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted hover:scale-110 transition-all">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-module-violet/10 flex items-center justify-center">
            <Landmark className="h-4 w-4 text-module-violet" />
          </div>
          <div>
            <h1 className="text-sm font-display font-bold text-foreground leading-tight">Gestion des Emprunts</h1>
            <p className="text-xs font-mono uppercase tracking-wide text-muted-foreground">Module 7 · Comptes 16 / 478-479 / 671</p>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div role="tablist" aria-label="Gestion des emprunts" className="flex border-b border-border bg-background sticky top-[57px] z-20">
        {ONGLETS.map(o => {
          const Icon = o.icon
          const estActif = actif === o.id
          return (
            <button key={o.id} role="tab" aria-selected={estActif} onClick={() => setActif(o.id)}
              className={cn('flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-all',
                estActif ? `${o.border} ${o.color} scale-105` : 'border-transparent text-muted-foreground hover:text-foreground hover:scale-105')}>
              <Icon className="h-3.5 w-3.5" />
              {o.label}
            </button>
          )
        })}
      </div>

      <div className="px-4 pt-4 animate-fadeIn" key={actif}>
        {actif === 'emprunts' && (
          <OngletEmprunts emprunts={emprunts} loading={loading} selectionId={selectionId}
            onSelect={id => { setSelectionId(id); setActif('tableau') }}
            onCreated={emprunt => { setEmpruntOptimiste(emprunt); setSelectionId(emprunt.id); setActif('tableau') }}
            userId={user?.id ?? ''} />
        )}
        {actif === 'tableau' && (
          empruntSelectionne
            ? <OngletTableau emprunt={empruntSelectionne} />
            : <SansSelection onAllerEmprunts={() => setActif('emprunts')} />
        )}
        {actif === 'ecritures' && (
          empruntSelectionne
            ? <OngletEcritures emprunt={empruntSelectionne} userId={user?.id ?? ''} />
            : <SansSelection onAllerEmprunts={() => setActif('emprunts')} />
        )}
        {actif === 'ecarts' && (
          empruntSelectionne
            ? <OngletEcarts emprunt={empruntSelectionne} userId={user?.id ?? ''} />
            : <SansSelection onAllerEmprunts={() => setActif('emprunts')} />
        )}
      </div>
    </div>
  )
}
