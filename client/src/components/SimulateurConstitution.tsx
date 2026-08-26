/**
 * ═══════════════════════════════════════════════════════════════════
 *  CAMPUS OHADA : Simulateur de Constitution de Société
 *  Composant : SimulateurConstitution.tsx
 *
 *  Guide l'étudiant à travers les 4 étapes de constitution :
 *  1. Forme sociale (pays fixé : RDC)
 *  2. Informations générales de la société
 *  3. Associés & apports
 *  4. Récapitulatif + validation légale
 *
 *  Monnaie : CDF (Franc Congolais)
 *  Conversion : seuils légaux OHADA en FCFA → affichés en CDF
 *  Taux par défaut : 1 FCFA = 4,05 CDF (juin 2026, source BCC / myfin.fr)
 *
 *  Base légale :
 *  - AUSCGIE 2014 (Art. 1–5, 6, 9, 50-3, 309, 311, 313, 853-5)
 *  - Arrêté interministériel RDC n° 002 & 243 du 30/12/2014
 *  - Startup Act RDC 2022
 * ═══════════════════════════════════════════════════════════════════
 */

import React, { useState } from 'react'
import { cn } from '@/lib/utils'
import {
  ChevronRight, ChevronLeft, CheckCircle2, AlertTriangle,
  Users, Building2, FileText, Scale, RotateCcw, Plus, Trash2,
  Info, RefreshCw, Download
} from 'lucide-react'
import { exportStatutsPDF, exportStatutsDOCX, type StatutsData } from '@/lib/generateStatuts'

// ─── Types ────────────────────────────────────────────────────────────────────

type FormeSociale = 'SARL' | 'SA' | 'SAS' | 'SNC' | 'SCS'
type TypeApport = 'numeraire' | 'nature' | 'industrie'

interface Associe {
  id: string
  nom: string
  typeApport: TypeApport
  montant: number        // en CDF
  description: string    // pour apport en nature / industrie
}

interface Etape2 {
  denomination: string
  objet: string
  siege: string
  duree: number
  valeurNominale: number // en CDF
  gerantNom: string
  gerantNationalite: string
  gerantAdresse: string
}

interface SimData {
  forme: FormeSociale
  etape2: Etape2
  associes: Associe[]
}

// ─── Constantes légales ───────────────────────────────────────────────────────
// Les seuils OHADA sont en FCFA : ils seront convertis en CDF via le taux

const FORMES_DEF: {
  id: FormeSociale
  label: string
  art: string
  desc: string
  minFCFA: number | null   // null = capital libre
}[] = [
  {
    id: 'SARL',
    label: 'SARL',
    art: 'Art. 309–383 AUSCGIE',
    desc: 'Responsabilité limitée aux apports : 1 à 50 associés. Capital LIBRE en RDC (Arrêté 30/12/2014)',
    minFCFA: null, // libre en RDC
  },
  {
    id: 'SA',
    label: 'SA',
    art: 'Art. 385–920 AUSCGIE',
    desc: 'Société Anonyme : appel possible à l\'épargne, 1 actionnaire minimum',
    minFCFA: 10_000_000,
  },
  {
    id: 'SAS',
    label: 'SAS',
    art: 'Art. 853-1–853-23 AUSCGIE',
    desc: 'Société par Actions Simplifiée : grande liberté statutaire, capital libre (Art. 853-5)',
    minFCFA: null,
  },
  {
    id: 'SNC',
    label: 'SNC',
    art: 'Art. 270–290 AUSCGIE',
    desc: 'Responsabilité indéfinie et solidaire. ⚠ Interdite entre époux (Art. 9 AUSCGIE)',
    minFCFA: null,
  },
  {
    id: 'SCS',
    label: 'SCS',
    art: 'Art. 293–313 AUSCGIE',
    desc: 'Commandités (resp. illimitée) + commanditaires (resp. limitée aux apports)',
    minFCFA: null,
  },
]

// Valeur nominale minimale en FCFA (AUSCGIE) → convertie en CDF
const VALEUR_NOMINALE_MIN_FCFA = 5_000

// Taux de change par défaut : 1 FCFA = 4,05 CDF (juin 2026, BCC / myfin.fr)
const TAUX_DEFAUT = 4.05

// ─── Helpers ─────────────────────────────────────────────────────────────────

function formatCDF(n: number): string {
  return n.toLocaleString('fr-FR') + ' CDF'
}

function formatFCFA(n: number): string {
  return n.toLocaleString('fr-FR') + ' FCFA'
}

function genId(): string {
  return Math.random().toString(36).slice(2, 8)
}

// ─── Composant principal ──────────────────────────────────────────────────────

export default function SimulateurConstitution() {
  const [etapeActive, setEtapeActive] = useState(1)
  const [taux, setTaux] = useState(TAUX_DEFAUT)       // 1 FCFA = X CDF
  const [tauxEdit, setTauxEdit] = useState(false)

  const [data, setData] = useState<SimData>({
    forme: 'SARL',
    etape2: { denomination: '', objet: '', siege: '', duree: 99, valeurNominale: Math.round(VALEUR_NOMINALE_MIN_FCFA * TAUX_DEFAUT), gerantNom: '', gerantNationalite: '', gerantAdresse: '' },
    associes: [{ id: genId(), nom: '', typeApport: 'numeraire', montant: 0, description: '' }],
  })

  const reset = () => {
    setData({
      forme: 'SARL',
      etape2: { denomination: '', objet: '', siege: '', duree: 99, valeurNominale: Math.round(VALEUR_NOMINALE_MIN_FCFA * taux), gerantNom: '', gerantNationalite: '', gerantAdresse: '' },
      associes: [{ id: genId(), nom: '', typeApport: 'numeraire', montant: 0, description: '' }],
    })
    setEtapeActive(1)
  }

  // ── Conversions ──
  const fcfaToCDF = (fcfa: number) => Math.round(fcfa * taux)
  const cdfToFCFA = (cdf: number) => Math.round(cdf / taux)

  // ── Capital calculé (en CDF) ──
  const capitalTotal = data.associes
    .filter(a => a.typeApport !== 'industrie')
    .reduce((s, a) => s + (Number(a.montant) || 0), 0)

  const forme = FORMES_DEF.find(f => f.id === data.forme)!

  // Minimum légal en CDF (converti depuis FCFA)
  const capitalMinCDF = forme.minFCFA !== null ? fcfaToCDF(forme.minFCFA) : null

  // Valeur nominale minimum en CDF
  const valeurNomMinCDF = fcfaToCDF(VALEUR_NOMINALE_MIN_FCFA)

  // Parts sociales
  const nbParts = data.etape2.valeurNominale > 0
    ? Math.floor(capitalTotal / data.etape2.valeurNominale)
    : 0

  // ── Validation ──
  const erreurs: string[] = []

  if (capitalMinCDF !== null && capitalTotal < capitalMinCDF) {
    erreurs.push(
      `Capital insuffisant : ${formatCDF(capitalTotal)} < minimum légal de ${formatFCFA(forme.minFCFA!)} = ${formatCDF(capitalMinCDF)} (${forme.art})`
    )
  }
  if (data.etape2.valeurNominale < valeurNomMinCDF) {
    erreurs.push(
      `Valeur nominale trop faible : ${formatCDF(data.etape2.valeurNominale)} < minimum de ${formatFCFA(VALEUR_NOMINALE_MIN_FCFA)} = ${formatCDF(valeurNomMinCDF)} (AUSCGIE)`
    )
  }
  const nbIndustrie = data.associes.filter(a => a.typeApport === 'industrie').length
  if (nbIndustrie > 0 && data.associes.length > 0) {
    const pct = (nbIndustrie / data.associes.length) * 100
    if (pct > 25) {
      erreurs.push(`Apports en industrie > 25% des associés (Art. 50-3 al. 2 AUSCGIE) : réduire le nombre d'apporteurs en industrie`)
    }
  }
  if (data.forme === 'SNC') {
    erreurs.push('⚠ SNC : vérifier qu\'aucun couple d\'époux n\'est associé : responsabilité indéfinie et solidaire interdite entre époux (Art. 9 AUSCGIE)')
  }
  if (data.forme === 'SARL' && data.associes.length > 50) {
    erreurs.push('SARL : maximum 50 associés (Art. 311 AUSCGIE)')
  }

  const avertissements: string[] = []
  if (data.forme === 'SARL') {
    avertissements.push(
      `En RDC, le capital de la SARL est librement fixé par les associés (Arrêté intermin. n° 002 & 243 du 30/12/2014). Aucun minimum légal : contrairement au plancher OHADA de ${formatFCFA(1_000_000)} = ${formatCDF(fcfaToCDF(1_000_000))} (Art. 311 AUSCGIE).`
    )
  }
  if (data.forme === 'SAS') {
    avertissements.push(`La SAS ne requiert aucun capital minimum (Art. 853-5 AUSCGIE). Capital librement fixé par les statuts.`)
  }
  if (capitalTotal > 0) {
    const lib25 = Math.ceil(capitalTotal * 0.25)
    avertissements.push(
      `Libération à la souscription (min. 25%) : ${formatCDF(lib25)}. Solde de ${formatCDF(capitalTotal - lib25)} à libérer sous 2 ans (Art. 313 AUSCGIE).`
    )
  }

  // ─── Barre de taux ───────────────────────────────────────────────────────
  const renderTauxBandeau = () => (
    <div className="rounded-xl bg-amber-50 border border-amber-200 p-2.5 flex items-center gap-3">
      <RefreshCw className="h-3.5 w-3.5 text-amber-600 shrink-0" />
      <div className="flex-1 text-xs text-amber-800">
        <span className="font-semibold">Taux de change : </span>
        <span>1 FCFA = </span>
        {tauxEdit ? (
          <input
            type="number"
            step="0.01"
            min="1"
            value={taux}
            onChange={e => setTaux(parseFloat(e.target.value) || TAUX_DEFAUT)}
            onBlur={() => setTauxEdit(false)}
            autoFocus
            className="w-16 text-xs rounded border border-amber-400 px-1 py-0.5 bg-white text-amber-900 focus:outline-none"
          />
        ) : (
          <button
            onClick={() => setTauxEdit(true)}
            className="font-bold underline underline-offset-2 text-amber-700"
          >
            {taux.toFixed(2)} CDF
          </button>
        )}
        <span className="text-amber-600 ml-1">(juin 2026 : cliquez pour modifier)</span>
      </div>
    </div>
  )

  // ─── ÉTAPE 1 : Forme sociale ──────────────────────────────────────────────
  const renderEtape1 = () => (
    <div className="space-y-4">
      {/* Badge pays fixé */}
      <div className="flex items-center gap-2 rounded-xl bg-blue-50 border border-blue-200 px-3 py-2.5">
        <span className="text-base">🇨🇩</span>
        <div>
          <p className="text-xs font-bold text-blue-800">République Démocratique du Congo</p>
          <p className="text-xs text-blue-600">AUSCGIE 2014 + Arrêté intermin. 30/12/2014 + Startup Act 2022</p>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        Sélectionnez la forme sociale souhaitée. Les règles de capital affiché sont celles applicables en RDC.
      </p>

      <div className="space-y-2">
        {FORMES_DEF.map(f => {
          const minCDF = f.minFCFA !== null ? fcfaToCDF(f.minFCFA) : null
          return (
            <button
              key={f.id}
              onClick={() => setData(d => ({ ...d, forme: f.id }))}
              className={cn(
                'w-full rounded-xl border px-3 py-3 text-left transition-all',
                data.forme === f.id
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-border bg-card hover:border-indigo-300'
              )}
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <p className={cn('text-xs font-bold', data.forme === f.id ? 'text-indigo-700' : 'text-foreground')}>
                    {f.id}
                    <span className="text-xs font-normal text-muted-foreground ml-1.5">: {f.art}</span>
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{f.desc}</p>
                </div>
                <div className="shrink-0 text-right space-y-0.5">
                  <div>
                    <span className={cn(
                      'text-xs px-1.5 py-0.5 rounded-full font-semibold',
                      minCDF === null
                        ? 'bg-emerald-100 text-emerald-700'
                        : 'bg-amber-100 text-amber-700'
                    )}>
                      {minCDF === null ? 'Capital libre' : `≥ ${formatCDF(minCDF)}`}
                    </span>
                  </div>
                  {f.minFCFA !== null && (
                    <p className="text-xs text-muted-foreground">{formatFCFA(f.minFCFA)}</p>
                  )}
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Note SARL */}
      {data.forme === 'SARL' && (
        <div className="rounded-xl bg-blue-50 border border-blue-200 p-3">
          <div className="flex items-start gap-2">
            <Info className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
            <div className="text-xs text-blue-800">
              <p className="font-semibold mb-0.5">Exception RDC : Capital libre</p>
              <p>L'Art. 2 de l'Arrêté interministériel n° 002 & 243 du 30/12/2014 dispose : « Le capital social de la SARL est librement fixé par les associés en tenant compte de l'objet social. » Aucun minimum légal en RDC.</p>
              <p className="mt-1 text-blue-600">Pour référence, le plancher OHADA est de {formatFCFA(1_000_000)} = <strong>{formatCDF(fcfaToCDF(1_000_000))}</strong> (Art. 311 AUSCGIE).</p>
            </div>
          </div>
        </div>
      )}
    </div>
  )

  // ─── ÉTAPE 2 : Informations société ──────────────────────────────────────
  const renderEtape2 = () => (
    <div className="space-y-4">
      <p className="text-xs text-muted-foreground">
        Mentions obligatoires des statuts (Art. 1–5 AUSCGIE).
      </p>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-semibold text-foreground mb-1 block">
            Dénomination sociale <span className="text-red-500">*</span>
            <span className="font-normal text-muted-foreground ml-1">: Art. 3 AUSCGIE</span>
          </label>
          <input
            type="text"
            placeholder={`Ex : KINSHASA NÉGOCE ${data.forme}`}
            value={data.etape2.denomination}
            onChange={e => setData(d => ({ ...d, etape2: { ...d.etape2, denomination: e.target.value } }))}
            className="w-full text-xs rounded-lg border border-border bg-card px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-muted-foreground"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground mb-1 block">
            Objet social <span className="text-red-500">*</span>
            <span className="font-normal text-muted-foreground ml-1">: Art. 2 AUSCGIE</span>
          </label>
          <textarea
            rows={3}
            placeholder="Ex : Commerce de gros et de détail de produits alimentaires, importation et exportation de marchandises..."
            value={data.etape2.objet}
            onChange={e => setData(d => ({ ...d, etape2: { ...d.etape2, objet: e.target.value } }))}
            className="w-full text-xs rounded-lg border border-border bg-card px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-muted-foreground resize-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground mb-1 block">
            Siège social <span className="text-red-500">*</span>
            <span className="font-normal text-muted-foreground ml-1">: Art. 4 AUSCGIE (adresse physique, pas de boîte postale)</span>
          </label>
          <input
            type="text"
            placeholder="Ex : Avenue du Commerce n° 12, Commune de Lingwala, Kinshasa"
            value={data.etape2.siege}
            onChange={e => setData(d => ({ ...d, etape2: { ...d.etape2, siege: e.target.value } }))}
            className="w-full text-xs rounded-lg border border-border bg-card px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-muted-foreground"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground mb-1 block">
            Durée (années) <span className="text-red-500">*</span>
            <span className="font-normal text-muted-foreground ml-1">: Art. 5 AUSCGIE</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            maxLength={2}
            value={data.etape2.duree === 0 ? '' : data.etape2.duree}
            onChange={e => {
              const raw = e.target.value.replace(/\D/g, '').slice(0, 2)
              if (raw === '') { setData(d => ({ ...d, etape2: { ...d.etape2, duree: 0 } })); return }
              const n = parseInt(raw, 10)
              if (n > 99) return
              setData(d => ({ ...d, etape2: { ...d.etape2, duree: n } }))
            }}
            className="w-full text-xs rounded-lg border border-border bg-card px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
          />
          <p className="text-xs text-muted-foreground mt-1">Usage courant : 99 ans si rien n'est prévu dans les statuts</p>
        </div>

        <div>
          <label className="text-xs font-semibold text-foreground mb-1 block">
            Valeur nominale par part (CDF) <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            inputMode="numeric"
            value={data.etape2.valeurNominale === 0 ? '' : data.etape2.valeurNominale}
            onChange={e => {
              const raw = e.target.value.replace(/\D/g, '')
              if (raw === '') { setData(d => ({ ...d, etape2: { ...d.etape2, valeurNominale: 0 } })); return }
              const n = parseInt(raw, 10)
              setData(d => ({ ...d, etape2: { ...d.etape2, valeurNominale: n } }))
            }}
            className={cn(
              'w-full text-xs rounded-lg border bg-card px-3 py-2.5 focus:outline-none focus:ring-1',
              data.etape2.valeurNominale > 0 && data.etape2.valeurNominale < valeurNomMinCDF
                ? 'border-red-400 focus:border-red-500 focus:ring-red-500'
                : 'border-border focus:border-indigo-500 focus:ring-indigo-500'
            )}
          />
          <p className="text-xs text-muted-foreground mt-1">
            Minimum légal : {formatFCFA(VALEUR_NOMINALE_MIN_FCFA)} = <strong>{formatCDF(valeurNomMinCDF)}</strong> (AUSCGIE)
          </p>
          {data.etape2.valeurNominale < valeurNomMinCDF && (
            <p className="text-xs text-red-600 mt-0.5">⚠ Valeur nominale inférieure au minimum légal</p>
          )}
        </div>

        {/* Gérant */}
        <div className="space-y-3 pt-2 border-t border-border">
          <p className="text-xs font-bold text-foreground uppercase tracking-wide">Gérant</p>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">
              Nom complet du gérant <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.etape2.gerantNom}
              onChange={e => setData(d => ({ ...d, etape2: { ...d.etape2, gerantNom: e.target.value } }))}
              placeholder="Ex : Jean-Pierre MUTOMBO"
              className="w-full text-xs rounded-lg border border-border bg-card px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">
              Nationalité du gérant <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.etape2.gerantNationalite}
              onChange={e => setData(d => ({ ...d, etape2: { ...d.etape2, gerantNationalite: e.target.value } }))}
              placeholder="Ex : Congolaise"
              className="w-full text-xs rounded-lg border border-border bg-card px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-foreground mb-1 block">
              Adresse du gérant <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.etape2.gerantAdresse}
              onChange={e => setData(d => ({ ...d, etape2: { ...d.etape2, gerantAdresse: e.target.value } }))}
              placeholder="Ex : Av. de la Paix n° 12, Kinshasa"
              className="w-full text-xs rounded-lg border border-border bg-card px-3 py-2.5 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500"
            />
          </div>
        </div>

      </div>
    </div>
  )

  // ─── ÉTAPE 3 : Associés ───────────────────────────────────────────────────
  const renderEtape3 = () => {
    const addAssocie = () => setData(d => ({
      ...d,
      associes: [...d.associes, { id: genId(), nom: '', typeApport: 'numeraire', montant: 0, description: '' }]
    }))

    const removeAssocie = (id: string) => setData(d => ({
      ...d, associes: d.associes.filter(a => a.id !== id)
    }))

    const updateAssocie = (id: string, field: keyof Associe, value: string | number) => setData(d => ({
      ...d, associes: d.associes.map(a => a.id === id ? { ...a, [field]: value } : a)
    }))

    return (
      <div className="space-y-4">
        <p className="text-xs text-muted-foreground">
          Saisissez chaque associé et son apport en CDF. L'apport en industrie ne forme pas le capital social (Art. 50-3 AUSCGIE).
        </p>

        {/* Récap capital temps réel */}
        <div className="rounded-xl bg-indigo-50 border border-indigo-200 p-3 space-y-1.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-800">Capital constitué</span>
            <span className="text-sm font-bold text-indigo-700">{formatCDF(capitalTotal)}</span>
          </div>
          <div className="flex items-center justify-between text-xs text-indigo-600">
            <span>Équivalent FCFA (≈)</span>
            <span className="font-medium">{formatFCFA(cdfToFCFA(capitalTotal))}</span>
          </div>
          {capitalMinCDF !== null && (
            <div className={cn(
              'flex items-center justify-between pt-1.5 border-t text-xs',
              capitalTotal >= capitalMinCDF ? 'border-indigo-200' : 'border-red-200'
            )}>
              <span className="text-indigo-600">Minimum légal requis</span>
              <span className={cn('font-semibold', capitalTotal >= capitalMinCDF ? 'text-emerald-600' : 'text-red-600')}>
                {capitalTotal >= capitalMinCDF ? '✓' : '✗'} {formatCDF(capitalMinCDF)}
              </span>
            </div>
          )}
          {capitalMinCDF === null && (
            <p className="text-xs text-emerald-600 border-t border-indigo-200 pt-1.5">
              ✓ Capital libre : aucun minimum légal
            </p>
          )}
        </div>

        {/* Associés */}
        <div className="space-y-3">
          {data.associes.map((a, idx) => (
            <div key={a.id} className="rounded-xl border border-border bg-card p-3 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-foreground">Associé {idx + 1}</span>
                {data.associes.length > 1 && (
                  <button
                    onClick={() => removeAssocie(a.id)}
                    className="h-6 w-6 rounded-lg flex items-center justify-center text-red-500 hover:bg-red-50 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>

              <input
                type="text"
                placeholder="Nom & prénom"
                value={a.nom}
                onChange={e => updateAssocie(a.id, 'nom', e.target.value)}
                className="w-full text-xs rounded-lg border border-border bg-muted/30 px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-muted-foreground"
              />

              {/* Type d'apport */}
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Type d'apport (Art. 37–50-4 AUSCGIE)</label>
                <div className="grid grid-cols-3 gap-1.5">
                  {([
                    { id: 'numeraire', label: 'Numéraire', desc: 'Argent (CDF)' },
                    { id: 'nature', label: 'Nature', desc: 'Bien évalué' },
                    { id: 'industrie', label: 'Industrie', desc: 'Hors capital' },
                  ] as { id: TypeApport; label: string; desc: string }[]).map(t => (
                    <button
                      key={t.id}
                      onClick={() => updateAssocie(a.id, 'typeApport', t.id)}
                      className={cn(
                        'rounded-lg border px-2 py-1.5 text-center transition-all',
                        a.typeApport === t.id
                          ? 'border-indigo-500 bg-indigo-50'
                          : 'border-border bg-card hover:border-indigo-300'
                      )}
                    >
                      <p className={cn('text-xs font-semibold', a.typeApport === t.id ? 'text-indigo-700' : 'text-foreground')}>{t.label}</p>
                      <p className="text-xs text-muted-foreground">{t.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Montant / description */}
              {a.typeApport !== 'industrie' ? (
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Montant de l'apport (CDF)
                    {a.typeApport === 'nature' && ' : évalué par commissaire aux apports'}
                  </label>
                  <input
                    type="number"
                    min={0}
                    step={10000}
                    placeholder="0"
                    value={a.montant || ''}
                    onChange={e => updateAssocie(a.id, 'montant', parseInt(e.target.value) || 0)}
                    className="w-full text-xs rounded-lg border border-border bg-muted/30 px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-muted-foreground"
                  />
                  {a.montant > 0 && (
                    <p className="text-xs text-muted-foreground mt-0.5">
                      ≈ {formatFCFA(cdfToFCFA(a.montant))} au taux de {taux.toFixed(2)} CDF/FCFA
                    </p>
                  )}
                </div>
              ) : (
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">
                    Description de l'apport en industrie (Art. 50-1 AUSCGIE)
                  </label>
                  <input
                    type="text"
                    placeholder="Ex : Expertise comptable, gestion administrative, réseau commercial..."
                    value={a.description}
                    onChange={e => updateAssocie(a.id, 'description', e.target.value)}
                    className="w-full text-xs rounded-lg border border-border bg-muted/30 px-3 py-2 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 placeholder:text-muted-foreground"
                  />
                  <p className="text-xs text-amber-600 mt-1">
                    ⚠ Ne forme pas le capital social (Art. 50-3). L'apporteur reçoit des parts sans valeur capitalistique.
                  </p>
                </div>
              )}

              {/* Parts calculées */}
              {a.typeApport !== 'industrie' && a.montant > 0 && data.etape2.valeurNominale > 0 && (
                <div className="rounded-lg bg-muted/40 px-3 py-1.5 flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">Parts attribuées</span>
                  <span className="text-xs font-bold text-foreground">
                    {Math.floor(a.montant / data.etape2.valeurNominale).toLocaleString('fr-FR')} parts
                    <span className="font-normal text-muted-foreground ml-1.5">
                      ({capitalTotal > 0 ? ((a.montant / capitalTotal) * 100).toFixed(1) : 0}%)
                    </span>
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>

        <button
          onClick={addAssocie}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-dashed border-indigo-300 py-2.5 text-xs text-indigo-600 hover:bg-indigo-50 transition-colors font-medium"
        >
          <Plus className="h-3.5 w-3.5" />
          Ajouter un associé
        </button>
      </div>
    )
  }

  // ─── ÉTAPE 4 : Récapitulatif ──────────────────────────────────────────────
  const renderEtape4 = () => {
    const conforme = erreurs.length === 0

    return (
      <div className="space-y-4">

        {/* Verdict */}
        <div className={cn(
          'rounded-xl border p-4 text-center',
          conforme
            ? 'border-emerald-300 bg-emerald-50'
            : 'border-red-300 bg-red-50'
        )}>
          {conforme ? (
            <>
              <CheckCircle2 className="h-8 w-8 text-emerald-600 mx-auto mb-2" />
              <p className="text-sm font-bold text-emerald-800">Constitution conforme ✓</p>
              <p className="text-xs text-emerald-700 mt-0.5">
                Votre société respecte toutes les conditions légales applicables en RDC.
              </p>
            </>
          ) : (
            <>
              <AlertTriangle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <p className="text-sm font-bold text-red-800">Constitution non conforme</p>
              <p className="text-xs text-red-600 mt-0.5">
                {erreurs.length} problème{erreurs.length > 1 ? 's' : ''} détecté{erreurs.length > 1 ? 's' : ''} : à corriger avant de signer les statuts.
              </p>
            </>
          )}
        </div>

        {/* Erreurs */}
        {erreurs.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-red-700">Problèmes à corriger :</p>
            {erreurs.map((e, i) => (
              <div key={i} className="rounded-lg bg-red-50 border border-red-200 px-3 py-2 text-xs text-red-700 flex items-start gap-2">
                <span className="shrink-0 font-bold">{i + 1}.</span>
                <span>{e}</span>
              </div>
            ))}
          </div>
        )}

        {/* Avertissements */}
        {avertissements.length > 0 && (
          <div className="space-y-2">
            <p className="text-xs font-semibold text-amber-700">À noter :</p>
            {avertissements.map((a, i) => (
              <div key={i} className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700 flex items-start gap-2">
                <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
                <span>{a}</span>
              </div>
            ))}
          </div>
        )}

        {/* Fiche de synthèse */}
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="bg-indigo-600 px-4 py-2.5 flex items-center justify-between">
            <p className="text-xs font-bold text-white">Fiche : {data.etape2.denomination || '(sans dénomination)'}</p>
            <span className="text-xs text-indigo-200">{data.forme} · 🇨🇩 RDC</span>
          </div>
          <div className="p-3 space-y-3 text-xs">

            {/* Identité */}
            <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div>
                <p className="text-muted-foreground">Forme sociale</p>
                <p className="font-semibold">{data.forme} : {forme.art}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Durée</p>
                <p className="font-semibold">{data.etape2.duree} ans</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground">Objet social</p>
                <p className="font-semibold">{data.etape2.objet || ':'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-muted-foreground">Siège social</p>
                <p className="font-semibold">{data.etape2.siege || ':'}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Valeur nominale / part</p>
                <p className="font-semibold">{formatCDF(data.etape2.valeurNominale)}</p>
                <p className="text-muted-foreground">≈ {formatFCFA(cdfToFCFA(data.etape2.valeurNominale))}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Taux de change utilisé</p>
                <p className="font-semibold">1 FCFA = {taux.toFixed(2)} CDF</p>
              </div>
            </div>

            <hr className="border-border" />

            {/* Tableau associés */}
            <div>
              <p className="font-semibold text-foreground mb-2">
                Capital social : <span className="text-indigo-700">{formatCDF(capitalTotal)}</span>
                <span className="text-muted-foreground font-normal ml-1.5">≈ {formatFCFA(cdfToFCFA(capitalTotal))}</span>
              </p>
              <table className="w-full border-collapse text-xs">
                <thead>
                  <tr className="bg-muted/60">
                    <th className="text-left px-2 py-1.5 font-semibold text-foreground">Associé</th>
                    <th className="text-left px-2 py-1.5 font-semibold text-foreground">Type</th>
                    <th className="text-right px-2 py-1.5 font-semibold text-foreground">Apport (CDF)</th>
                    <th className="text-right px-2 py-1.5 font-semibold text-foreground">Parts</th>
                    <th className="text-right px-2 py-1.5 font-semibold text-foreground">%</th>
                  </tr>
                </thead>
                <tbody>
                  {data.associes.map((a, i) => {
                    const parts = a.typeApport !== 'industrie' && data.etape2.valeurNominale > 0
                      ? Math.floor(a.montant / data.etape2.valeurNominale)
                      : 0
                    const pct = capitalTotal > 0 && a.typeApport !== 'industrie'
                      ? ((a.montant / capitalTotal) * 100).toFixed(1)
                      : ':'
                    return (
                      <tr key={a.id} className={i % 2 === 0 ? 'bg-card' : 'bg-muted/30'}>
                        <td className="px-2 py-1.5 font-medium">{a.nom || `Associé ${i + 1}`}</td>
                        <td className="px-2 py-1.5">
                          <span className={cn(
                            'px-1.5 py-0.5 rounded-full text-xs font-medium',
                            a.typeApport === 'numeraire' ? 'bg-blue-100 text-blue-700' :
                              a.typeApport === 'nature' ? 'bg-violet-100 text-violet-700' :
                                'bg-amber-100 text-amber-700'
                          )}>
                            {a.typeApport}
                          </span>
                        </td>
                        <td className="px-2 py-1.5 text-right font-mono">
                          {a.typeApport !== 'industrie'
                            ? <><span>{formatCDF(a.montant)}</span><br /><span className="text-muted-foreground">≈ {formatFCFA(cdfToFCFA(a.montant))}</span></>
                            : <span className="text-muted-foreground italic">{a.description || ':'}</span>
                          }
                        </td>
                        <td className="px-2 py-1.5 text-right font-mono">
                          {a.typeApport !== 'industrie' ? parts.toLocaleString('fr-FR') : '(industrie)'}
                        </td>
                        <td className="px-2 py-1.5 text-right font-mono font-semibold">{pct}{pct !== ':' ? '%' : ''}</td>
                      </tr>
                    )
                  })}
                  <tr className="border-t border-border bg-indigo-50">
                    <td className="px-2 py-1.5 font-bold text-indigo-700" colSpan={2}>TOTAL</td>
                    <td className="px-2 py-1.5 text-right font-bold text-indigo-700 font-mono">
                      {formatCDF(capitalTotal)}<br />
                      <span className="text-muted-foreground font-normal text-xs">≈ {formatFCFA(cdfToFCFA(capitalTotal))}</span>
                    </td>
                    <td className="px-2 py-1.5 text-right font-bold text-indigo-700 font-mono">{nbParts.toLocaleString('fr-FR')}</td>
                    <td className="px-2 py-1.5 text-right font-bold text-indigo-700">100%</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Libération */}
            {capitalTotal > 0 && (
              <>
                <hr className="border-border" />
                <div className="rounded-lg bg-muted/40 px-3 py-2">
                  <p className="font-semibold text-foreground mb-1.5">Obligation de libération (Art. 313 AUSCGIE)</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div>
                      <p className="text-muted-foreground">À libérer à la souscription (min. 25%)</p>
                      <p className="font-bold text-emerald-600">{formatCDF(Math.ceil(capitalTotal * 0.25))}</p>
                      <p className="text-muted-foreground">≈ {formatFCFA(cdfToFCFA(Math.ceil(capitalTotal * 0.25)))}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Solde sous 2 ans</p>
                      <p className="font-bold text-foreground">{formatCDF(Math.floor(capitalTotal * 0.75))}</p>
                      <p className="text-muted-foreground">≈ {formatFCFA(cdfToFCFA(Math.floor(capitalTotal * 0.75)))}</p>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Base légale */}
            <hr className="border-border" />
            <div>
              <p className="font-semibold text-foreground mb-1">Références légales</p>
              <ul className="space-y-0.5 list-disc list-inside text-muted-foreground">
                <li>AUSCGIE 2014 : {forme.art}</li>
                <li>Arrêté interministériel RDC n° 002 & 243 du 30/12/2014</li>
                <li>Art. 50-3 AUSCGIE : Apports en industrie hors capital</li>
                <li>Art. 313 AUSCGIE : Libération du capital</li>
              </ul>
            </div>
          </div>
        </div>

        {/* ── Générateur de statuts ─────────────────────────────── */}
        <div className="rounded-xl border border-indigo-200 bg-indigo-50 p-4 space-y-3">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-indigo-600 shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-bold text-indigo-800">Générateur de statuts OHADA</p>
              <p className="text-xs text-indigo-600 mt-0.5">
                Téléchargez le projet de statuts structuré selon les 27 articles de l'AUSCGIE 2014,
                pré-rempli avec les données de votre simulation. Les mentions manquantes sont signalées entre crochets.
              </p>
            </div>
          </div>

          {!conforme && (
            <div className="rounded-lg bg-amber-50 border border-amber-200 px-3 py-2 text-xs text-amber-700 flex items-start gap-2">
              <Info className="h-3.5 w-3.5 shrink-0 mt-0.5" />
              <span>La constitution présente des irrégularités : le document généré est à titre pédagogique uniquement.</span>
            </div>
          )}

          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => {
                const statutsData: StatutsData = {
                  forme: data.forme,
                  denomination: data.etape2.denomination,
                  objet: data.etape2.objet,
                  siege: data.etape2.siege,
                  duree: data.etape2.duree,
                  capitalCDF: capitalTotal,
                  capitalFCFA: Math.round(capitalTotal / taux),
                  valeurNominaleCDF: data.etape2.valeurNominale,
                  valeurNominaleFCFA: Math.round(data.etape2.valeurNominale / taux),
                  nbParts: nbParts,
                  associes: data.associes.map(a => ({
                    nom: a.nom,
                    typeApport: a.typeApport,
                    montant: a.montant,
                    description: a.description,
                    parts: a.typeApport !== 'industrie' && data.etape2.valeurNominale > 0
                      ? Math.floor(a.montant / data.etape2.valeurNominale)
                      : 0,
                    pct: capitalTotal > 0 && a.typeApport !== 'industrie'
                      ? ((a.montant / capitalTotal) * 100).toFixed(1)
                      : ':',
                  })),
                  taux,
                  dateGeneration: new Date().toLocaleDateString('fr-FR'),
                  gerantNom: data.etape2.gerantNom || undefined,
                  gerantNationalite: data.etape2.gerantNationalite || undefined,
                  gerantAdresse: data.etape2.gerantAdresse || undefined,
                }
                exportStatutsPDF(statutsData)
              }}
              className="flex items-center justify-center gap-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 text-xs font-semibold transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Télécharger PDF
            </button>

            <button
              onClick={() => {
                const statutsData: StatutsData = {
                  forme: data.forme,
                  denomination: data.etape2.denomination,
                  objet: data.etape2.objet,
                  siege: data.etape2.siege,
                  duree: data.etape2.duree,
                  capitalCDF: capitalTotal,
                  capitalFCFA: Math.round(capitalTotal / taux),
                  valeurNominaleCDF: data.etape2.valeurNominale,
                  valeurNominaleFCFA: Math.round(data.etape2.valeurNominale / taux),
                  nbParts: nbParts,
                  associes: data.associes.map(a => ({
                    nom: a.nom,
                    typeApport: a.typeApport,
                    montant: a.montant,
                    description: a.description,
                    parts: a.typeApport !== 'industrie' && data.etape2.valeurNominale > 0
                      ? Math.floor(a.montant / data.etape2.valeurNominale)
                      : 0,
                    pct: capitalTotal > 0 && a.typeApport !== 'industrie'
                      ? ((a.montant / capitalTotal) * 100).toFixed(1)
                      : ':',
                  })),
                  taux,
                  dateGeneration: new Date().toLocaleDateString('fr-FR'),
                  gerantNom: data.etape2.gerantNom || undefined,
                  gerantNationalite: data.etape2.gerantNationalite || undefined,
                  gerantAdresse: data.etape2.gerantAdresse || undefined,
                }
                exportStatutsDOCX(statutsData)
              }}
              className="flex items-center justify-center gap-2 rounded-xl border border-indigo-400 text-indigo-700 hover:bg-indigo-100 py-2.5 text-xs font-semibold transition-colors"
            >
              <Download className="h-3.5 w-3.5" />
              Télécharger DOCX
            </button>
          </div>

          <p className="text-xs text-indigo-500 text-center">
            Document pédagogique : à faire relire et compléter par un juriste avant signature.
          </p>
        </div>

        <button
          onClick={reset}
          className="w-full flex items-center justify-center gap-2 rounded-xl border border-border bg-card py-2.5 text-xs text-muted-foreground hover:bg-muted/50 transition-colors font-medium"
        >
          <RotateCcw className="h-3.5 w-3.5" />
          Nouvelle simulation
        </button>
      </div>
    )
  }

  // ─── Validation par étape ─────────────────────────────────────────────────
  const peutAvancer = () => {
    if (etapeActive === 1) return true
    if (etapeActive === 2) {
      return data.etape2.denomination.trim().length > 0
        && data.etape2.objet.trim().length > 0
        && data.etape2.siege.trim().length > 0
        && data.etape2.valeurNominale >= valeurNomMinCDF
    }
    if (etapeActive === 3) {
      return data.associes.every(a => a.nom.trim().length > 0)
        && data.associes.some(a => a.typeApport !== 'industrie' && a.montant > 0)
    }
    return true
  }

  const ETAPES = [
    { n: 1, label: 'Forme', icone: <Scale className="h-3.5 w-3.5" /> },
    { n: 2, label: 'Société', icone: <Building2 className="h-3.5 w-3.5" /> },
    { n: 3, label: 'Associés', icone: <Users className="h-3.5 w-3.5" /> },
    { n: 4, label: 'Résultat', icone: <FileText className="h-3.5 w-3.5" /> },
  ]

  return (
    <div className="space-y-4 animate-fadeIn">

      {/* Bandeau taux de change */}
      {renderTauxBandeau()}

      {/* Stepper */}
      <div className="flex items-center gap-0 animate-slideDown">
        {ETAPES.map((e, i) => (
          <React.Fragment key={e.n}>
            <div className="flex flex-col items-center">
              <div className={cn(
                'h-8 w-8 rounded-full flex items-center justify-center transition-all border-2',
                etapeActive > e.n ? 'bg-emerald-600 border-emerald-600 text-white' :
                  etapeActive === e.n ? 'bg-indigo-600 border-indigo-600 text-white' :
                    'bg-card border-border text-muted-foreground'
              )}>
                {etapeActive > e.n ? <CheckCircle2 className="h-4 w-4" /> : e.icone}
              </div>
              <span className={cn(
                'text-xs mt-1 font-medium',
                etapeActive === e.n ? 'text-indigo-600' : 'text-muted-foreground'
              )}>
                {e.label}
              </span>
            </div>
            {i < ETAPES.length - 1 && (
              <div className={cn(
                'flex-1 h-0.5 mb-5 mx-1 transition-all',
                etapeActive > e.n ? 'bg-emerald-500' : 'bg-border'
              )} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Contenu */}
      <div className="rounded-xl border border-border bg-card p-4 animate-fadeIn" key={etapeActive}>
        {etapeActive === 1 && renderEtape1()}
        {etapeActive === 2 && renderEtape2()}
        {etapeActive === 3 && renderEtape3()}
        {etapeActive === 4 && renderEtape4()}
      </div>

      {/* Navigation */}
      {etapeActive < 4 && (
        <div className="flex items-center gap-3">
          {etapeActive > 1 && (
            <button
              onClick={() => setEtapeActive(e => e - 1)}
              className="flex items-center gap-2 text-xs px-4 py-2.5 rounded-xl border border-border bg-card hover:bg-muted/50 hover:scale-105 transition-all font-medium"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Retour
            </button>
          )}
          <div className="flex-1" />
          <button
            onClick={() => setEtapeActive(e => e + 1)}
            disabled={!peutAvancer()}
            className="flex items-center gap-2 text-xs px-5 py-2.5 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-105 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 transition-all font-semibold"
          >
            {etapeActive === 3 ? 'Voir le résultat' : 'Suivant'}
            <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>
      )}
    </div>
  )
}
