import React, { useState } from 'react'
import { Calculator, RotateCcw, Info, Home, Car, TrendingUp, Pickaxe, Signpost } from 'lucide-react'
import { cn } from '@/lib/utils'
// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function formatFC(n: number): string {
  if (n < 0) return `(${Math.abs(Math.round(n)).toLocaleString('fr-FR')} FC)`
  return `${Math.round(n).toLocaleString('fr-FR')} FC`
}
function formatUSD(n: number): string {
  return `${n.toFixed(2)} USD`
}

// ─────────────────────────────────────────────────────────────────────────────
// UI ATOMS
// ─────────────────────────────────────────────────────────────────────────────
function BtnCalculer({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-xs font-semibold text-primary-foreground hover:bg-primary/90 transition-colors">
      <Calculator className="h-3.5 w-3.5" />Calculer
    </button>
  )
}
function BtnReset({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="flex items-center gap-1.5 rounded-lg border border-border bg-background px-4 py-2 text-xs font-medium text-muted-foreground hover:bg-muted transition-colors">
      <RotateCcw className="h-3.5 w-3.5" />Réinitialiser
    </button>
  )
}
function LigneR({ label, val, bold, indent }: { label: string; val: string; bold?: boolean; indent?: boolean }) {
  return (
    <div className={cn('flex justify-between items-center gap-2 py-0.5', indent && 'pl-3')}>
      <span className={cn('text-sm text-muted-foreground', bold && 'font-semibold text-foreground')}>{label}</span>
      <span className={cn('text-sm font-mono tabular-nums shrink-0', bold && 'font-bold text-foreground')}>{val}</span>
    </div>
  )
}
function BoxFinal({ label, val, credit }: { label: string; val: string; credit?: boolean }) {
  return (
    <div className={cn('rounded-xl p-3 text-center', credit ? 'bg-green-50 border border-green-200' : 'bg-primary/5 border border-primary/20')}>
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className={cn('text-base font-bold font-mono tabular-nums', credit ? 'text-green-700' : 'text-primary')}>{val}</p>
    </div>
  )
}
function ResultatWrap({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <div className="px-3 py-2 border-b border-border bg-muted/30">
        <p className="text-xs font-semibold text-foreground">{titre}</p>
      </div>
      <div className="p-3 space-y-3">{children}</div>
    </div>
  )
}
function DefBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
      <div className="flex gap-2">
        <Info className="h-3.5 w-3.5 text-blue-600 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700 space-y-1">{children}</div>
      </div>
    </div>
  )
}
function SelectField({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      <select value={value} onChange={e => onChange(e.target.value)}
        className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
        {options.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
      </select>
    </div>
  )
}
function InputField({ label, value, onChange, placeholder, unit }: { label: string; value: string; onChange: (v: string) => void; placeholder?: string; unit?: string }) {
  return (
    <div>
      <label className="text-xs font-medium text-muted-foreground mb-1.5 block">{label}</label>
      <div className="relative">
        <input type="number" placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 pr-14" />
        {unit && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">{unit}</span>}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 1 : IRL : Impôt sur les Revenus Locatifs
// ─────────────────────────────────────────────────────────────────────────────
// Taux IRL par rang de localité — Kinshasa : Arrêté du Ministre Provincial des
// Finances et Économie n°015/CAB/MIN.PROV/FIN.ECO/2023 du 07/12/2023 (modifiant
// l'Arrêté n°016/CAB/MIN.PROV/FIN.ECO/2022 du 14/10/2022), Art. 5 — J.O. RDC,
// numéro spécial du 14 décembre 2023, en vigueur depuis le 1er janvier 2024.
// Taux national de référence (tout rang confondu) : Art. 11, O.-L. n°69/009 du
// 10/02/1969 — 22%. L'arrêté provincial de Kinshasa module ce taux par rang.
const TAUX_IRL_KINSHASA: Record<string, { label: string; irl: number; retenue: number }> = {
  '1': { label: '1er rang', irl: 0.22, retenue: 0.20 },
  '2': { label: '2e, 3e et 4e rang', irl: 0.17, retenue: 0.15 },
}

function OngletIRL() {
  const [rang, setRang] = useState('1')
  const [loyerMensuel, setLoyerMensuel] = useState('')
  const [nbMois, setNbMois] = useState('12')
  const [res, setRes] = useState<any>(null)

  function calculer() {
    const loyer = parseFloat(loyerMensuel) || 0
    const mois = parseInt(nbMois) || 12
    const totalBrut = loyer * mois
    const t = TAUX_IRL_KINSHASA[rang]
    const irlTotal = totalBrut * t.irl
    const retenuLocataire = totalBrut * t.retenue
    const soldeProprietaire = irlTotal - retenuLocataire
    setRes({ loyer, mois, totalBrut, irlTotal, retenuLocataire, soldeProprietaire, t })
  }
  function reset() { setLoyerMensuel(''); setNbMois('12'); setRes(null) }

  return (
    <div className="space-y-4">
      <DefBox>
        <p className="font-semibold">Impôt sur les Revenus Locatifs (IRL) : Art. 4 à 12, Livre I Partie II</p>
        <p>Frappe les revenus de location de bâtiments et terrains situés en RDC. Taux national de référence (Art. 11, O.-L. n°69/009 du 10/02/1969) : <strong>22%</strong>, avec retenue à la source de 20% par le locataire et solde de 2% à charge du propriétaire.</p>
        <p className="text-xs mt-1">Cet impôt est rétrocédé aux Entités Territoriales Décentralisées (ETD) : Art. 9 al. 5, Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques — chaque province peut moduler le taux par rang de localité via son propre édit/arrêté budgétaire (Art. 204 al. 16 Constitution).</p>
      </DefBox>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
        <p className="text-sm text-emerald-800 font-semibold mb-1">✓ Barème vérifié — Ville-province de Kinshasa</p>
        <p className="text-sm text-emerald-700">Le taux applicable à Kinshasa est différencié par rang de localité, « tout loyer confondu » (pas de seuil minimal) :</p>
        <div className="overflow-x-auto rounded border border-emerald-200 mt-1.5 bg-white">
          <table className="w-full text-sm">
            <thead className="bg-emerald-100">
              <tr><th className="px-2 py-1.5 text-left">Rang de localité</th><th className="px-2 py-1.5 text-left">Taux IRL</th><th className="px-2 py-1.5 text-left">Retenue locataire (RL)</th></tr>
            </thead>
            <tbody className="divide-y divide-emerald-100">
              <tr><td className="px-2 py-1.5">1er rang</td><td className="px-2 py-1.5 font-bold text-emerald-700">22%</td><td className="px-2 py-1.5">20%</td></tr>
              <tr><td className="px-2 py-1.5">2e, 3e et 4e rang</td><td className="px-2 py-1.5 font-bold text-emerald-700">17%</td><td className="px-2 py-1.5">15%</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-sm text-emerald-700 mt-1.5">Source : Arrêté du Ministre Provincial des Finances et Économie n°015/CAB/MIN.PROV/FIN.ECO/2023 du 07 décembre 2023, Art. 5 — J.O. RDC, numéro spécial du 14 décembre 2023, en vigueur depuis le 1er janvier 2024. Ce barème est <strong>propre à la ville-province de Kinshasa</strong> ; les autres provinces fixent le leur par leur propre acte.</p>
        <p className="text-sm text-emerald-700 mt-1">Cas distinct non couvert par ce simulateur : les <strong>indemnités de logement</strong> versées aux salariés (mise à disposition gratuite d'un logement par l'employeur) suivent un barème par tranche de montant, et non par rang — 22% au-delà de 301 USD/mois, 17% de 1 à 300 USD/mois (Arrêté n°016/CAB/MIN.PROV/FIN.ECO/2023 du 07/12/2023, Art. 5).</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SelectField
          label="Rang de la localité (Kinshasa)"
          value={rang}
          onChange={v => { setRang(v); setRes(null) }}
          options={Object.entries(TAUX_IRL_KINSHASA).map(([k, v]) => ({ value: k, label: `${v.label} (IRL ${(v.irl * 100).toFixed(0)}%)` }))}
        />
        <InputField label="Loyer mensuel (FC)" value={loyerMensuel} onChange={setLoyerMensuel} placeholder="Ex : 1 500 000" unit="FC" />
        <InputField label="Nombre de mois imposés" value={nbMois} onChange={setNbMois} placeholder="12" unit="mois" />
      </div>

      <div className="flex gap-2"><BtnCalculer onClick={calculer} /><BtnReset onClick={reset} /></div>

      {res && (
        <ResultatWrap titre="IRL : Résultat du calcul">
          <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
            <div className="flex items-center gap-2.5 px-3 py-3 bg-muted/40 border-b border-border/40">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">1</span>
              <p className="text-xs font-semibold text-foreground">Base imposable</p>
            </div>
            <div className="px-3 py-2.5 space-y-1.5">
              <LigneR label={`Loyer mensuel × ${res.mois} mois`} val={`${formatFC(res.loyer)} × ${res.mois} = ${formatFC(res.totalBrut)}`} bold />
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
            <div className="flex items-center gap-2.5 px-3 py-3 bg-muted/40 border-b border-border/40">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">2</span>
              <p className="text-xs font-semibold text-foreground">Calcul de l'IRL ({res.t.label})</p>
            </div>
            <div className="px-3 py-2.5 space-y-1.5">
              <LigneR label={`IRL = ${formatFC(res.totalBrut)} × ${(res.t.irl * 100).toFixed(0)}%`} val={formatFC(res.irlTotal)} bold />
              <LigneR label={`Retenu par le locataire (${(res.t.retenue * 100).toFixed(0)}%) : dans les 10 jours`} val={formatFC(res.retenuLocataire)} indent />
              <LigneR label="Solde propriétaire : au 1er février" val={formatFC(res.soldeProprietaire)} indent />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <BoxFinal label={`IRL total (${(res.t.irl * 100).toFixed(0)}%)`} val={formatFC(res.irlTotal)} />
            <BoxFinal label={`Retenu locataire (${(res.t.retenue * 100).toFixed(0)}%)`} val={formatFC(res.retenuLocataire)} />
            <BoxFinal label="Solde propriétaire" val={formatFC(res.soldeProprietaire)} credit />
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <p className="text-sm text-amber-700 font-semibold mb-1">Exonérations (Art. 12)</p>
            <ul className="text-sm text-amber-700 space-y-0.5 list-disc list-inside">
              <li>L'État, les provinces, communes, secteurs, chefferies</li>
              <li>Institutions religieuses, scientifiques, philanthropiques</li>
              <li>Organismes internationaux</li>
              <li>Immeubles neufs dans les provinces de l'Est (5 ans)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
            <p className="text-sm text-blue-700 font-semibold mb-1">Base forfaitaire minimum (Loi n° 83/004 du 23/02/1983)</p>
            <p className="text-sm text-blue-700">Si le loyer déclaré est inférieur à un minimum forfaitaire (surface totale développée × tarif minimum au m²), c'est ce minimum qui sert de base - sans empêcher l'Administration de redresser si les revenus réels sont supérieurs. Le tarif se décompose en 6 classes A à F selon le classement de la localité et le standing du local (Art. 3), avec un abattement de 30% sur le Tarif A et 10% sur le Tarif C pour les locaux industriels et commerciaux (au-delà des 200 premiers m²).</p>
            <p className="text-sm text-blue-700 mt-1">⚠️ Les montants au m² de chaque tarif ne sont pas chiffrés dans le texte consulté : à vérifier province par province avant tout usage engageant. Non applicable aux locations à l'État ou aux établissements publics ne vivant que de subventions (Art. 7). À Kinshasa, la mise à disposition gratuite d'un bâtiment/terrain à usage professionnel suit un tarif minima propre, distinct de celui de la Loi 83/004 : 20 USD/m² (1er rang), 15 USD/m² (2e rang), 10 USD/m² (3e rang), 5 USD/m² (4e rang) — Arrêté n°015/2023, Art. 4.</p>
          </div>
        </ResultatWrap>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 2 : IF : Impôt Foncier
// ─────────────────────────────────────────────────────────────────────────────

// Barème IF vérifié — Ville-province de Kinshasa : Arrêté du Ministre Provincial
// des Finances et Économie n°017/CAB/MIN.PROV/FIN.ECO/2023 du 07/12/2023
// (modifiant l'Arrêté n°007/CAB/MIN.PROV/FIN.ECO/2022 du 30/03/2022), Annexe —
// J.O. RDC, numéro spécial du 14 décembre 2023, en vigueur depuis le 1er janvier
// 2024. Montants fixés en USD, acquittés en FC au taux officiel du jour du paiement.
// PM = personnes morales autres que sociétés immobilières (taux $/m²) ;
// Société immo = sociétés immobilières (taux $/m², plus élevé) ;
// PP = personnes physiques (forfait par immeuble, indépendant de la superficie).
type LigneIF = { rang: string; pm: number; societeImmo: number; pp: number }
const BAREMES_IF: Record<string, { label: string; type: 'batie' | 'terrain'; lignes: LigneIF[] }> = {
  villa: {
    label: "Villas et immeubles autres qu'à étages",
    type: 'batie',
    lignes: [
      { rang: '1er rang', pm: 3.5, societeImmo: 8, pp: 450 },
      { rang: '2e rang', pm: 2.5, societeImmo: 5, pp: 150 },
      { rang: '3e rang', pm: 2, societeImmo: 4, pp: 50 },
      { rang: '4e rang', pm: 1.5, societeImmo: 3, pp: 10 },
    ],
  },
  appartement: {
    label: 'Appartements',
    type: 'batie',
    lignes: [
      { rang: '1er rang', pm: 3.5, societeImmo: 8, pp: 450 },
      { rang: '2e rang', pm: 2.5, societeImmo: 5, pp: 150 },
      { rang: '3e rang', pm: 2, societeImmo: 4, pp: 50 },
      { rang: '4e rang', pm: 1.5, societeImmo: 3, pp: 10 },
    ],
  },
  terrain: {
    label: 'Terrains non bâtis (1er palier, ≤ 5 000 m²)',
    type: 'terrain',
    lignes: [
      { rang: '1er rang', pm: 1, societeImmo: 4, pp: 250 },
      { rang: '2e rang', pm: 0.5, societeImmo: 3, pp: 50 },
      { rang: '3e rang', pm: 0.3, societeImmo: 2, pp: 16.5 },
      { rang: '4e rang', pm: 0.15, societeImmo: 1, pp: 10 },
    ],
  },
}
type TypeProprietaire = 'pm' | 'societeImmo' | 'pp'



function OngletIF() {
  const [categorie, setCategorie] = useState('villa')
  const [rangIndex, setRangIndex] = useState('0')
  const [typeProp, setTypeProp] = useState<TypeProprietaire>('pp')
  const [superficie, setSuperficie] = useState('')
  const [res, setRes] = useState<any>(null)

  const cat = BAREMES_IF[categorie]
  const rang = cat.lignes[parseInt(rangIndex)]
  const needSuperficie = typeProp !== 'pp'

  function calculer() {
    if (!rang) return
    let impot = 0
    let detail = ''
    if (typeProp === 'pp') {
      impot = rang.pp
      detail = `Forfait par immeuble (${rang.rang})`
    } else {
      const s = parseFloat(superficie) || 0
      const tauxM2 = typeProp === 'pm' ? rang.pm : rang.societeImmo
      if (cat.type === 'terrain' && s > 5000) {
        // Palier : taux plein jusqu'à 5 000 m², puis 50% du taux sur le surplus (Art. 1er palier, Annexe B)
        impot = 5000 * tauxM2 + (s - 5000) * tauxM2 * 0.5
        detail = `5 000 m² × ${tauxM2} USD + ${(s - 5000).toLocaleString('fr-FR')} m² × ${tauxM2} USD × 50% (surplus)`
      } else {
        impot = s * tauxM2
        detail = `${s} m² × ${tauxM2} USD/m²`
      }
    }
    setRes({ categorie, rang: rang.rang, typeProp, superficie: parseFloat(superficie) || 0, impotUSD: impot, detail })
  }
  function reset() { setSuperficie(''); setRes(null) }

  const LABEL_TYPE: Record<TypeProprietaire, string> = { pm: 'Personne morale (hors société immobilière)', societeImmo: 'Société immobilière', pp: 'Personne physique (forfait)' }

  return (
    <div className="space-y-4">
      <DefBox>
        <p className="font-semibold">Impôt Foncier (IF) : Art. 1er à 28, Livre I Partie 1ère (Titre II)</p>
        <p>Impôt réel annuel sur la superficie des propriétés foncières bâties et non bâties situées en RDC. Il est dû par le titulaire du droit de propriété, de possession, d'emphytéose ou d'usufruit (Art. 8).</p>
        <p>Le taux est fixé par les provinces via édit budgétaire (Art. 204 al. 16 Constitution).</p>
        <p className="text-xs mt-1">Rétrocédé aux ETD : impôt provincial et local.</p>
      </DefBox>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
        <p className="text-sm text-emerald-800 font-semibold mb-1">✓ Barème vérifié — Ville-province de Kinshasa</p>
        <p className="text-sm text-emerald-700">Source : Arrêté du Ministre Provincial des Finances et Économie n°017/CAB/MIN.PROV/FIN.ECO/2023 du 07 décembre 2023 (modifiant l'Arrêté n°007/CAB/MIN.PROV/FIN.ECO/2022 du 30 mars 2022), Annexe — J.O. RDC, numéro spécial du 14 décembre 2023, en vigueur depuis le 1er janvier 2024. Montants fixés en <strong>USD</strong>, acquittés en FC au taux officiel du jour du paiement.</p>
        <p className="text-sm text-emerald-700 mt-1">Ce barème est <strong>propre à la ville-province de Kinshasa</strong> : chaque province fixe le sien par son propre édit/arrêté budgétaire (Art. 204 al. 16 Constitution). Le simulateur ci-dessous ne couvre que « villas et immeubles autres qu'à étages », « appartements » et « terrains non bâtis » ; les immeubles à étage (rez-de-chaussée + 50% de l'impôt par étage) et les « autres constructions » (Art. 3 : hangars, guérites, piscines…) suivent un barème par palier propre, non repris ici.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <SelectField
          label="Catégorie de bien"
          value={categorie}
          onChange={v => { setCategorie(v); setRangIndex('0'); setRes(null) }}
          options={Object.entries(BAREMES_IF).map(([k, v]) => ({ value: k, label: v.label }))}
        />
        <SelectField
          label="Rang de localité"
          value={rangIndex}
          onChange={v => { setRangIndex(v); setRes(null) }}
          options={cat.lignes.map((l, i) => ({ value: String(i), label: l.rang }))}
        />
        <SelectField
          label="Nature du propriétaire"
          value={typeProp}
          onChange={v => { setTypeProp(v as TypeProprietaire); setRes(null) }}
          options={(['pp', 'pm', 'societeImmo'] as TypeProprietaire[]).map(t => ({ value: t, label: LABEL_TYPE[t] }))}
        />
      </div>

      {needSuperficie && (
        <InputField
          label={cat.type === 'terrain' ? 'Superficie du terrain (m²)' : 'Superficie bâtie (m²)'}
          value={superficie}
          onChange={setSuperficie}
          placeholder="Ex : 250"
          unit="m²"
        />
      )}

      <div className="flex gap-2"><BtnCalculer onClick={calculer} /><BtnReset onClick={reset} /></div>

      {res && (
        <ResultatWrap titre="IF : Résultat du calcul">
          <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
            <div className="flex items-center gap-2.5 px-3 py-3 bg-muted/40 border-b border-border/40">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">1</span>
              <p className="text-xs font-semibold text-foreground">Calcul de l'impôt foncier</p>
            </div>
            <div className="px-3 py-2.5 space-y-1.5">
              <LigneR label="Catégorie" val={BAREMES_IF[res.categorie].label} />
              <LigneR label="Localité" val={res.rang} />
              <LigneR label="Propriétaire" val={LABEL_TYPE[res.typeProp as TypeProprietaire]} />
              {needSuperficie && <LigneR label="Superficie" val={`${res.superficie} m²`} />}
              <LigneR label={`IF annuel = ${res.detail}`} val={formatUSD(res.impotUSD)} bold />
            </div>
          </div>
          <BoxFinal label="Impôt Foncier annuel dû" val={formatUSD(res.impotUSD)} />
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <p className="text-sm text-amber-700 font-semibold mb-1">Règles pratiques (Art. 21 &amp; 23)</p>
            <ul className="text-sm text-amber-700 space-y-0.5 list-disc list-inside">
              <li>Dû pour l'année entière sur la situation au 1er janvier</li>
              <li>Immeuble neuf imposable à partir du 1er janvier suivant l'occupation</li>
              <li>Dégrèvement si inoccupation ≥ 180 jours consécutifs (Art. 25)</li>
              <li>Déclaration de mutation dans le mois du changement de propriétaire (Art. 11)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 p-3">
            <p className="text-sm text-green-700 font-semibold mb-1">Exonérations (Art. 2 à 5)</p>
            <ul className="text-sm text-green-700 space-y-0.5 list-disc list-inside">
              <li>État, Provinces, ETD, offices publics sans autre ressource que des subventions (Art. 2, 1°)</li>
              <li>Institutions et associations religieuses, scientifiques ou philanthropiques, établissements d'utilité publique (Art. 2, 2°)</li>
              <li>Personnes de plus de 55 ans et veuves, sur leur habitation principale, sous conditions d'occupation (Art. 2 bis)</li>
              <li>Immeubles affectés exclusivement à l'agriculture ou à l'élevage (≥ 80% des produits traités issus de l'exploitation du contribuable) (Art. 3, 1°)</li>
              <li>Immeubles à but non lucratif : culte, enseignement, recherche scientifique, hôpitaux/dispensaires, chambres de commerce, œuvres sociales (Art. 3, 2°)</li>
              <li>Terrains affectés aux mêmes fins non lucratives que ci-dessus (Art. 4)</li>
              <li>Exonérations accordées par le Code des investissements ou convention spéciale (Art. 5)</li>
            </ul>
          </div>
        </ResultatWrap>
      )}

      {/* Tableau de référence fixe : classement des localités par rang */}
      <div className="rounded-xl border border-slate-200 bg-slate-50 overflow-hidden">
        <div className="px-3 py-2 bg-slate-100 border-b border-slate-200">
          <p className="text-sm font-bold text-slate-700">Classement des localités par rang (référence)</p>
          <p className="text-sm text-slate-500 mt-0.5">Classement Kinshasa vérifié : Arrêté n°017/CAB/MIN.PROV/FIN.ECO/2023 du 07/12/2023, Art. 13 (liste complète par commune/quartier, J.O. du 14/12/2023) · Classement des autres provinces : indicatif, non vérifié · OL n°69-006 du 10 fév. 1969</p>
        </div>
        <div className="divide-y divide-slate-200">
          {[
            {
              rang: 'Rang 1', couleur: 'text-rose-700 bg-rose-100',
              kin: 'Gombe (tous q.) · Limete (sauf Mombele, Musoso, Salongo, Kingabwa) · Ngaliema (Ma-campagne, IPN, Binza Pigeon, Monts Fleuris, Golf, Mimoza, Utexafrica, Chanic…) · Barumbu (Bon-Marché) · Lemba (Gombele)',
              autres: 'Matadi (Soyo, centre commercial) · Lubumbashi (commune) · Bukavu (Ibanda) · Goma (centre, Himbi) · Mbuji-Mayi (MIBA) · Kisangani (Makiso) · Aéroports internationaux · Ports maritimes',
            },
            {
              rang: 'Rang 2', couleur: 'text-orange-700 bg-orange-100',
              kin: 'Matete (Marais) · Lingwala (Boyata, Golf) · Lemba (camp Riche, Salongo) · Limete (Salongo) · Selembao (Cité Verte, Ngafani I/II/III) · Mont-Ngafula (Maman Mobutu, Mama Yemo, Munongo, Masanga Mbila) · Kintambo (Jamaïque, centre commercial)',
              autres: 'Matadi (commune) · Bunia (centre) · Goma (Butembo, Beni) · Gbadolite (centre) · Mbandaka (centre) · Lubumbashi (Kapemba) · Likasi · Kolwezi · Kikwit (plateau, ville basse) · Kananga (centre) · Ports fluviaux KIN/Kisangani',
            },
            {
              rang: 'Rang 3', couleur: 'text-amber-700 bg-amber-100',
              kin: 'Kalamu · Kasa-Vubu · Bandalungwa · Kinshasa · Ngiri-Ngiri · Masina (Sans-Fil) · Ndjili (q.1,2,3,4,7,12) · Barumbu (sauf Bon-Marché) · Lingwala (sauf Boyata/Golf) · Matete (sauf Marais) · Mont-Ngafula (sauf Maman Mobutu/Mama Yemo) · Lemba (sauf Gombele/Riche) · Limete (Musoso) · Kintambo (sauf Rang 1/2)',
              autres: 'Mbanza-Ngungu · Inkisi · Boma (Nzadi) · Bukavu (Bagira, Kadutu) · Uvira (Mulongwe) · Kindu · Kamina · Kalemie · Lubumbashi (Rwashi) · Bandundu · Mwene-Ditu · Mbandaka (sauf centre) · Bunia (Nyakasanza) · Ilebo · Tshikapa',
            },
            {
              rang: 'Rang 4', couleur: 'text-slate-600 bg-slate-200',
              kin: 'Kimbanseke · Kisenso · Makala · Ngaba · Bumbu · Maluku · Selembao (hors Cité Verte) · Masina (hors Sans-Fil) · Ndjili (hors q.1,2,3,4,7,12) · et tout quartier non repris aux rangs 1, 2 ou 3',
              autres: "Toutes localités de l'intérieur non classées en rangs 1, 2 ou 3 : chefs-lieux de territoire, cités rurales, agglomérations non urbanisées",
            },
          ].map(r => (
            <div key={r.rang} className="p-3 space-y-1.5">
              <span className={`text-sm font-bold px-2 py-0.5 rounded ${r.couleur}`}>{r.rang}</span>
              <p className="text-xs text-slate-700 leading-relaxed mt-1">
                <span className="font-semibold">Kinshasa : </span>{r.kin}
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                <span className="font-semibold">Autres provinces : </span>{r.autres}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 3 : IV : Impôt sur les Véhicules
// ─────────────────────────────────────────────────────────────────────────────

// Taux IV indicatifs (fixés par les provinces : Art. 41 CGI)
const CATEGORIES_IV = [
  { id: 'moto', label: 'Motocycle', type: 'forfait', taux: 15000 },
  { id: 'util_s', label: 'Véhicule utilitaire : moins de 2 500 kg', type: 'forfait', taux: 50000 },
  { id: 'util_m', label: 'Véhicule utilitaire : 2 500 à 10 000 kg', type: 'forfait', taux: 120000 },
  { id: 'util_l', label: 'Véhicule utilitaire : plus de 10 000 kg', type: 'forfait', taux: 250000 },
  { id: 'tour_pp_s', label: 'Tourisme (pers. physique) : 1 à 10 CV', type: 'forfait', taux: 80000 },
  { id: 'tour_pp_m', label: 'Tourisme (pers. physique) : 11 à 15 CV', type: 'forfait', taux: 160000 },
  { id: 'tour_pp_l', label: 'Tourisme (pers. physique) : plus de 15 CV', type: 'forfait', taux: 250000 },
  { id: 'tour_pm_s', label: 'Tourisme (pers. morale) : 1 à 10 CV', type: 'forfait', taux: 120000 },
  { id: 'tour_pm_m', label: 'Tourisme (pers. morale) : 11 à 15 CV', type: 'forfait', taux: 240000 },
  { id: 'tour_pm_l', label: 'Tourisme (pers. morale) : plus de 15 CV', type: 'forfait', taux: 380000 },
  { id: 'bateau', label: 'Bateau à propulsion mécanique (transport personnes) : par CV', type: 'par_cv', taux: 5000 },
  { id: 'bateau_mc', label: 'Bateau transport marchandises / remorquage : par CV', type: 'par_cv', taux: 3500 },
]

// Art. 42, alinéa 2 : puissance des bateaux et embarcations à moteur, P = K·d²·C·N·n.
// K et le régime n par défaut dépendent du type de carburant (n reste modifiable :
// c'est le régime réel du moteur, la loi ne fixe qu'une valeur type par carburant).
const CARBURANTS_BATEAU: Record<string, { label: string; k: number; nDefaut: number }> = {
  puissant:       { label: 'Carburant puissant (essence, benzol...)', k: 2, nDefaut: 4500 },
  faible:         { label: 'Carburant faible (huiles lourdes, huiles brutes...)', k: 4, nDefaut: 1500 },
  vapeur_simple:  { label: 'Machine à vapeur à simple expansion', k: 6, nDefaut: 0 },
  vapeur_double:  { label: 'Machine à vapeur à double expansion', k: 3, nDefaut: 0 },
}

function OngletIV() {
  const [catId, setCatId] = useState('tour_pp_s')
  const [, setCylindree] = useState('')
  const [, setPoids] = useState('')
  const [moisDebut, setMoisDebut] = useState('1')
  const [nbVehicules, setNbVehicules] = useState('1')
  const [alesage, setAlesage] = useState('')
  const [course, setCourse] = useState('')
  const [nbCylindres, setNbCylindres] = useState('')
  const [carburantBateau, setCarburantBateau] = useState('puissant')
  const [regimeMoteur, setRegimeMoteur] = useState('')
  const [res, setRes] = useState<any>(null)

  const cat = CATEGORIES_IV.find(c => c.id === catId)!
  const isBateau = cat.type === 'par_cv'
  const carb = CARBURANTS_BATEAU[carburantBateau]
  const regime = regimeMoteur ? parseFloat(regimeMoteur) : carb.nDefaut

  // Art. 42, alinéa 1 : puissance des véhicules terrestres, P = 4·CY + Poids/400.
  // Non utilisée par aucune catégorie IV aujourd'hui (les catégories véhicules sont
  // toutes taxées par tranche forfaitaire de puissance, Art. 41.C) - conservée pour
  // exactitude si une catégorie par formule est ajoutée un jour. Le terme 4·CY n'est
  // PAS divisé par 400 : seul le terme Poids l'est.

  function calculPuissanceBateau(): number {
    const d = parseFloat(alesage) || 0
    const c = parseFloat(course) || 0
    const n = parseFloat(nbCylindres) || 0
    return carb.k * d * d * c * n * regime
  }

  function calculer() {
    const mois = parseInt(moisDebut) || 1
    const nb = parseInt(nbVehicules) || 1
    // Prorata : si commence après janvier → 1/12 par mois restant
    const fraction = mois === 1 ? 1 : (13 - mois) / 12
    let impotUnitaire = 0
    let detail = ''
    let cv = 0

    if (isBateau) {
      cv = calculPuissanceBateau()
      impotUnitaire = Math.round(cv) * cat.taux
      detail = `${Math.round(cv)} CV × ${cat.taux.toLocaleString('fr-FR')} FC`
    } else {
      impotUnitaire = cat.taux
      detail = `Forfait annuel ${cat.label}`
    }

    const impotAnnuel = impotUnitaire
    const impotProrata = Math.round(impotAnnuel * fraction)
    const impotTotal = impotProrata * nb
    setRes({ cat: cat.label, impotAnnuel, fraction, impotProrata, nb, impotTotal, detail, mois, cv: isBateau ? Math.round(cv) : null })
  }
  function reset() {
    setCylindree(''); setPoids(''); setMoisDebut('1'); setNbVehicules('1')
    setAlesage(''); setCourse(''); setNbCylindres(''); setCarburantBateau('puissant'); setRegimeMoteur(''); setRes(null)
  }

  const MOIS_LABELS = ['Janvier (année entière)', 'Février (11/12)', 'Mars (10/12)', 'Avril (9/12)', 'Mai (8/12)', 'Juin (7/12)', 'Juillet (6/12)', 'Août (5/12)', 'Septembre (4/12)', 'Octobre (3/12)', 'Novembre (2/12)', 'Décembre (1/12)']

  return (
    <div className="space-y-4">
      <DefBox>
        <p className="font-semibold">Impôt sur les Véhicules (IV) : Art. 38 à 65, Livre I Partie 1ère (Titre III)</p>
        <p>Impôt réel dû par toute personne physique ou morale qui utilise un ou plusieurs véhicules (Art. 40). Le taux est fixé par les provinces (Art. 41).</p>
        <p>Si l'usage commence après janvier : impôt dû au prorata de 1/12 par mois ou fraction de mois (Art. 44). En cas de cessation d'usage, dégrèvement accordé sur remise du signe distinctif (Art. 45).</p>
        <p className="text-xs mt-1">Rétrocédé aux ETD : impôt provincial et local. Taux indicatifs : à confirmer avec l'édit budgétaire provincial en vigueur.</p>
      </DefBox>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Catégorie de véhicule (Art. 41)</label>
          <select value={catId} onChange={e => { setCatId(e.target.value); setRes(null) }}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            {CATEGORIES_IV.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
          </select>
        </div>
        <SelectField
          label="Mois de début d'utilisation (Art. 43-44)"
          value={moisDebut}
          onChange={v => { setMoisDebut(v); setRes(null) }}
          options={MOIS_LABELS.map((l, i) => ({ value: String(i + 1), label: l }))}
        />
      </div>

      {isBateau && (
        <div className="space-y-3">
          <div className="rounded-lg bg-blue-50 border border-blue-200 px-3 py-2 text-xs text-blue-700">
            La puissance des bateaux et embarcations à moteur se calcule par une formule distincte de celle des véhicules terrestres (Art. 42, al. 2) : <strong>P = K × d² × C × N × n</strong>.
          </div>
          <SelectField
            label="Type de carburant / moteur (fixe K et le régime type)"
            value={carburantBateau}
            onChange={v => { setCarburantBateau(v); setRegimeMoteur(''); setRes(null) }}
            options={Object.entries(CARBURANTS_BATEAU).map(([k, v]) => ({ value: k, label: v.label }))}
          />
          <div className="grid grid-cols-2 gap-3">
            <InputField label="Alésage des cylindres (d, en m)" value={alesage} onChange={setAlesage} placeholder="Ex : 0.08" unit="m" />
            <InputField label="Course des pistons (C, en m)" value={course} onChange={setCourse} placeholder="Ex : 0.07" unit="m" />
            <InputField label="Nombre de cylindres (N)" value={nbCylindres} onChange={setNbCylindres} placeholder="Ex : 4" />
            <InputField
              label={carburantBateau.startsWith('vapeur') ? 'Nombre de coups doubles (n), déclaré ou constaté' : `Régime moteur (n, tours/min) - défaut ${carb.nDefaut}`}
              value={regimeMoteur} onChange={setRegimeMoteur} placeholder={String(carb.nDefaut || 'à saisir')} unit="tr/min" />
          </div>
          {alesage && course && nbCylindres && (
            <div className="rounded-lg bg-muted/50 px-3 py-2 text-sm">
              <span className="text-muted-foreground">Puissance calculée : </span>
              <span className="font-semibold">P = {carb.k} × {alesage}² × {course} × {nbCylindres} × {regime} = <strong>{calculPuissanceBateau().toFixed(2)} CV</strong></span>
            </div>
          )}
        </div>
      )}

      <InputField label="Nombre de véhicules" value={nbVehicules} onChange={setNbVehicules} placeholder="1" unit="véh." />

      <div className="flex gap-2"><BtnCalculer onClick={calculer} /><BtnReset onClick={reset} /></div>

      {res && (
        <ResultatWrap titre="IV : Résultat du calcul">
          <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
            <div className="flex items-center gap-2.5 px-3 py-3 bg-muted/40 border-b border-border/40">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">1</span>
              <p className="text-xs font-semibold text-foreground">Calcul de l'impôt annuel</p>
            </div>
            <div className="px-3 py-2.5 space-y-1.5">
              <LigneR label="Catégorie" val={res.cat} />
              {res.cv && <LigneR label="Puissance fiscale" val={`${res.cv} CV`} />}
              <LigneR label={`IV annuel = ${res.detail}`} val={formatFC(res.impotAnnuel)} bold />
            </div>
          </div>
          {res.fraction < 1 && (
            <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
              <div className="flex items-center gap-2.5 px-3 py-3 bg-muted/40 border-b border-border/40">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">2</span>
                <p className="text-xs font-semibold text-foreground">Prorata temporis (Art. 44)</p>
              </div>
              <div className="px-3 py-2.5 space-y-1.5">
                <LigneR label={`IV prorata = ${formatFC(res.impotAnnuel)} × ${(res.fraction * 12).toFixed(0)}/12`} val={formatFC(res.impotProrata)} bold />
              </div>
            </div>
          )}
          {res.nb > 1 && (
            <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
              <div className="flex items-center gap-2.5 px-3 py-3 bg-muted/40 border-b border-border/40">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">{res.fraction < 1 ? 3 : 2}</span>
                <p className="text-xs font-semibold text-foreground">Flotte ({res.nb} véhicules)</p>
              </div>
              <div className="px-3 py-2.5 space-y-1.5">
                <LigneR label={`${formatFC(res.impotProrata)} × ${res.nb} véhicules`} val={formatFC(res.impotTotal)} bold />
              </div>
            </div>
          )}
          <BoxFinal label="IV total dû" val={formatFC(res.impotTotal)} />
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <p className="text-sm text-amber-700 font-semibold mb-1">Principales exonérations (Art. 39)</p>
            <ul className="text-sm text-amber-700 space-y-0.5 list-disc list-inside">
              <li>Véhicules de l'État et établissements publics à subvention</li>
              <li>Corps diplomatique (sous réserve de réciprocité)</li>
              <li>Cyclomoteurs ≤ 50 cm³ : véhicules à traction humaine/animale</li>
              <li>Dépanneuses : auto-ambulances : véhicules d'essai des marchands</li>
              <li>Navires au long cours et grand cabotage</li>
            </ul>
          </div>
        </ResultatWrap>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 4 : TSMC : Taxe de Superficie sur les Concessions Minières
// ─────────────────────────────────────────────────────────────────────────────

const TAUX_TSMC = {
  recherche: [
    { annee: '1ère année', taux: 0.20 },
    { annee: '2ème année', taux: 0.30 },
    { annee: '3ème année', taux: 0.35 },
    { annee: 'Autres années', taux: 0.40 },
  ],
  exploitation: [
    { annee: '1ère année', taux: 0.40 },
    { annee: '2ème année', taux: 0.60 },
    { annee: '3ème année', taux: 0.70 },
    { annee: 'Autres années', taux: 0.80 },
  ]
}

function OngletTSMC() {
  const [typePermis, setTypePermis] = useState('exploitation')
  const [anneeIndex, setAnneeIndex] = useState('3')
  const [superficie, setSuperficie] = useState('')
  const [tauxUSD, setTauxUSD] = useState('2850')
  const [res, setRes] = useState<any>(null)

  const taux = TAUX_TSMC[typePermis as keyof typeof TAUX_TSMC][parseInt(anneeIndex)]

  function calculer() {
    const s = parseFloat(superficie) || 0
    const usd = parseFloat(tauxUSD) || 2850
    const montantUSD = s * taux.taux
    const montantFC = montantUSD * usd
    setRes({ typePermis, annee: taux.annee, superficie: s, tauxUSD_ha: taux.taux, montantUSD, montantFC, tauxChange: usd })
  }
  function reset() { setSuperficie(''); setTauxUSD('2850'); setRes(null) }

  return (
    <div className="space-y-4">
      <DefBox>
        <p className="font-semibold">Taxe de Superficie sur les Concessions Minières (TSMC) : Art. 54, Livre I Partie 1ère (Titre IV)</p>
        <p>Impôt réel annuel dû par le titulaire d'un permis minier (recherche ou exploitation), calculé en USD par hectare. Adapté conformément au Code Minier révisé le 9 mars 2018 (L. n° 18/001).</p>
        <p>Les redevables du régime général des hydrocarbures ne sont plus assujettis à cette taxe (L. n° 15/012 du 1er août 2015).</p>
        <p className="text-xs mt-1">Rétrocédé aux ETD : impôt réel local.</p>
      </DefBox>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <SelectField
          label="Type de permis"
          value={typePermis}
          onChange={v => { setTypePermis(v); setRes(null) }}
          options={[
            { value: 'recherche', label: 'Permis de recherches minières' },
            { value: 'exploitation', label: "Droit minier d'exploitation" },
          ]}
        />
        <SelectField
          label="Année du permis"
          value={anneeIndex}
          onChange={v => { setAnneeIndex(v); setRes(null) }}
          options={TAUX_TSMC[typePermis as keyof typeof TAUX_TSMC].map((t, i) => ({ value: String(i), label: `${t.annee} : ${t.taux} USD/ha` }))}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <InputField label="Superficie de la concession (hectares)" value={superficie} onChange={setSuperficie} placeholder="Ex : 5000" unit="ha" />
        <InputField label="Taux de change USD/FC (indicatif)" value={tauxUSD} onChange={setTauxUSD} placeholder="2850" unit="FC" />
      </div>

      {/* Tableau récapitulatif des taux */}
      <div className="rounded-xl border border-border overflow-hidden">
        <div className="px-3 py-2 bg-muted/40 border-b border-border">
          <p className="text-xs font-semibold">Barème : {typePermis === 'recherche' ? 'Permis de recherches' : "Droit d'exploitation"} (Art. 54)</p>
        </div>
        <div className="divide-y divide-border/50">
          {TAUX_TSMC[typePermis as keyof typeof TAUX_TSMC].map((t, i) => (
            <div key={i} className={cn('flex justify-between items-center px-3 py-2', String(i) === anneeIndex && 'bg-primary/5')}>
              <span className="text-sm text-muted-foreground">{t.annee}</span>
              <span className="text-sm font-semibold font-mono">{t.taux} USD/ha</span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2"><BtnCalculer onClick={calculer} /><BtnReset onClick={reset} /></div>

      {res && (
        <ResultatWrap titre="TSMC : Résultat du calcul">
          <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
            <div className="flex items-center gap-2.5 px-3 py-3 bg-muted/40 border-b border-border/40">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">1</span>
              <p className="text-xs font-semibold text-foreground">Calcul de la taxe</p>
            </div>
            <div className="px-3 py-2.5 space-y-1.5">
              <LigneR label="Type de permis" val={res.typePermis === 'recherche' ? 'Recherches minières' : 'Exploitation minière'} />
              <LigneR label="Année" val={res.annee} />
              <LigneR label={`TSMC = ${res.superficie.toLocaleString('fr-FR')} ha × ${res.tauxUSD_ha} USD/ha`} val={formatUSD(res.montantUSD)} bold />
            </div>
          </div>
          <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
            <div className="flex items-center gap-2.5 px-3 py-3 bg-muted/40 border-b border-border/40">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">2</span>
              <p className="text-xs font-semibold text-foreground">Conversion en Francs Congolais</p>
            </div>
            <div className="px-3 py-2.5 space-y-1.5">
              <LigneR label={`${formatUSD(res.montantUSD)} × ${res.tauxChange.toLocaleString('fr-FR')} FC/USD`} val={formatFC(res.montantFC)} bold />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <BoxFinal label="TSMC en USD" val={formatUSD(res.montantUSD)} />
            <BoxFinal label="TSMC en FC (indicatif)" val={formatFC(res.montantFC)} />
          </div>
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <p className="text-sm text-amber-700 font-semibold mb-1">Note importante</p>
            <p className="text-sm text-amber-700">Le paiement se fait en FC à l'équivalent du taux de change officiel de la BCC au jour du paiement. Le taux ci-dessus est purement indicatif.</p>
          </div>
        </ResultatWrap>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 5 : TSCR : Taxe Spéciale de Circulation Routière
// ─────────────────────────────────────────────────────────────────────────────
function OngletTSCR() {
  const [catId, setCatId] = useState('tour_pp_s')
  const [transportPublic, setTransportPublic] = useState(false)
  const [nbVehicules, setNbVehicules] = useState('1')
  const [res, setRes] = useState<any>(null)

  const cat = CATEGORIES_IV.find(c => c.id === catId)!

  function calculer() {
    const nb = parseInt(nbVehicules) || 1
    // Art. 3 ter : les entreprises de transport public supportent la moitié du taux,
    // pour les véhicules affectés au transport public des personnes.
    const tauxUnitaire = transportPublic ? cat.taux / 2 : cat.taux
    const total = tauxUnitaire * nb
    setRes({ cat: cat.label, tauxUnitaire, transportPublic, nb, total })
  }
  function reset() { setNbVehicules('1'); setTransportPublic(false); setRes(null) }

  return (
    <div className="space-y-4">
      <DefBox>
        <p className="font-semibold">Taxe Spéciale de Circulation Routière (TSCR) : O.-L. n° 88-029 du 15/07/1988</p>
        <p>Droit de péage au profit du Trésor public, assis sur tous les véhicules admis à circuler sur le réseau routier public, quelle que soit la qualité du propriétaire (Art. 1er et 2) - distincte de l'Impôt sur les Véhicules (IV), bien que les mêmes catégories tarifaires s'appliquent (Art. 4).</p>
        <p>Entreprises de transport public de personnes : la taxe est réduite de moitié pour les véhicules affectés à cet usage (Art. 3 ter).</p>
        <p className="text-xs mt-1">Impôt provincial et local (Art. 204 al. 16 Constitution). Montants non chiffrés dans le texte : mêmes catégories et mêmes montants indicatifs que l'onglet IV, à confirmer avec l'édit budgétaire provincial en vigueur.</p>
      </DefBox>

      <div>
        <label className="text-xs font-medium text-muted-foreground mb-1.5 block">Catégorie de véhicule (Art. 4, mêmes catégories que l'IV)</label>
        <select value={catId} onChange={e => { setCatId(e.target.value); setRes(null) }}
          className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
          {CATEGORIES_IV.map(c => <option key={c.id} value={c.id}>{c.label}</option>)}
        </select>
      </div>

      <label className="flex items-center gap-2 cursor-pointer rounded-lg border border-border bg-card px-3 py-2">
        <input type="checkbox" checked={transportPublic} onChange={e => { setTransportPublic(e.target.checked); setRes(null) }} />
        <span className="text-sm">Véhicule affecté au transport public de personnes (taux réduit de moitié, Art. 3 ter)</span>
      </label>

      <InputField label="Nombre de véhicules" value={nbVehicules} onChange={setNbVehicules} placeholder="1" unit="véh." />

      <div className="flex gap-2"><BtnCalculer onClick={calculer} /><BtnReset onClick={reset} /></div>

      {res && (
        <ResultatWrap titre="TSCR : Résultat du calcul">
          <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
            <div className="flex items-center gap-2.5 px-3 py-3 bg-muted/40 border-b border-border/40">
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">1</span>
              <p className="text-xs font-semibold text-foreground">Calcul de la taxe</p>
            </div>
            <div className="px-3 py-2.5 space-y-1.5">
              <LigneR label="Catégorie" val={res.cat} />
              {res.transportPublic && <LigneR label="Réduction transport public (Art. 3 ter)" val="− 50%" />}
              <LigneR label={`TSCR = ${res.tauxUnitaire.toLocaleString('fr-FR')} FC${res.nb > 1 ? ` × ${res.nb} véhicules` : ''}`} val={formatFC(res.total)} bold />
            </div>
          </div>
          <BoxFinal label="TSCR annuelle due" val={formatFC(res.total)} />
          <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
            <p className="text-sm text-amber-700 font-semibold mb-1">Période et paiement (Art. 5 &amp; 7)</p>
            <ul className="text-sm text-amber-700 space-y-0.5 list-disc list-inside">
              <li>Due pour l'année civile entière, quelle que soit la date de mise en circulation ou hors service</li>
              <li>Cession en cours d'année : le paiement déjà effectué bénéficie au nouveau propriétaire</li>
              <li>Véhicule acquis avant le 1er janvier : paiement avant le 31 mars</li>
              <li>Véhicule acquis en cours d'année : paiement à la date d'immatriculation</li>
              <li>Majoration de 100% en cas de défaut de paiement relevé par procès-verbal lors d'un contrôle routier (Art. 13)</li>
            </ul>
          </div>
          <div className="rounded-xl border border-green-200 bg-green-50 p-3">
            <p className="text-sm text-green-700 font-semibold mb-1">Exemptions (Art. 3 bis)</p>
            <ul className="text-sm text-green-700 space-y-0.5 list-disc list-inside">
              <li>Véhicules de l'État, des Provinces, des ETD et des offices publics sans autre ressource que des subventions</li>
              <li>Véhicules des institutions religieuses, scientifiques ou philanthropiques exemptées de l'impôt foncier</li>
              <li>Véhicules des États étrangers affectés aux agents diplomatiques, sous réserve de réciprocité</li>
              <li>Véhicules des organismes internationaux, pour leurs besoins exclusifs</li>
              <li>Véhicules des membres du corps diplomatique et consulaire accrédités, à triple condition de réciprocité</li>
              <li>Véhicules des sociétés bénéficiaires d'une convention particulière d'exonération</li>
            </ul>
          </div>
        </ResultatWrap>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL : SimulateurAutresImpots
// ─────────────────────────────────────────────────────────────────────────────

const ONGLETS = [
  { id: 'irl',   label: 'IRL',  sublabel: 'Revenus Locatifs',  icon: TrendingUp, color: 'amber' },
  { id: 'if',    label: 'IF',   sublabel: 'Impôt Foncier',     icon: Home,       color: 'green' },
  { id: 'iv',    label: 'IV',   sublabel: 'Véhicules',         icon: Car,        color: 'blue' },
  { id: 'tscr',  label: 'TSCR', sublabel: 'Circulation Routière', icon: Signpost, color: 'rose' },
  { id: 'tsmc',  label: 'TSMC', sublabel: 'Concessions Minières', icon: Pickaxe, color: 'purple' },
]

const COLOR_MAP: Record<string, string> = {
  amber:  'bg-amber-100 text-amber-700 border-amber-300',
  rose:   'bg-rose-100 text-rose-700 border-rose-300',
  green:  'bg-green-100 text-green-700 border-green-300',
  blue:   'bg-blue-100 text-blue-700 border-blue-300',
  purple: 'bg-purple-100 text-purple-700 border-purple-300',
}
const COLOR_ACTIVE: Record<string, string> = {
  amber:  'bg-amber-600 border-transparent text-white shadow-md scale-[1.03]',
  green:  'bg-green-600 border-transparent text-white shadow-md scale-[1.03]',
  blue:   'bg-blue-600 border-transparent text-white shadow-md scale-[1.03]',
  purple: 'bg-purple-600 border-transparent text-white shadow-md scale-[1.03]',
  rose:   'bg-rose-600 border-transparent text-white shadow-md scale-[1.03]',
}

export default function SimulateurAutresImpots() {
  const [ongletActif, setOngletActif] = useState('irl')


  return (
    <div className="space-y-4 animate-fadeIn">
      {/* En-tête */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-slate-50 to-slate-100 p-4">
        <h2 className="text-sm font-bold text-foreground mb-1">Autres impôts rétrocédés aux ETD</h2>
        <p className="text-sm text-muted-foreground">
          Ces cinq impôts sont des impôts réels provinciaux et locaux, rétrocédés aux Entités Territoriales Décentralisées (ETD) conformément à l'article 204 al. 16 de la Constitution et à la Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques.
        </p>
      </div>

      {/* Onglets */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
        {ONGLETS.map(o => {
          const Icon = o.icon
          const isActive = ongletActif === o.id
          return (
            <button key={o.id} onClick={() => setOngletActif(o.id)}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl border p-3 transition-all duration-200 text-center',
                isActive ? COLOR_ACTIVE[o.color] : 'border-border bg-card hover:bg-muted/50 hover:scale-[1.01]'
              )}>
              <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg border', isActive ? 'bg-white/15 border-white/25 text-white' : COLOR_MAP[o.color])}>
                <Icon className="h-4 w-4" />
              </div>
              <span className={cn('text-xs font-bold', isActive ? 'text-white' : 'text-muted-foreground')}>{o.label}</span>
              <span className={cn('text-xs leading-tight', isActive ? 'text-white/80' : 'text-muted-foreground')}>{o.sublabel}</span>
            </button>
          )
        })}
      </div>

      {/* Contenu de l'onglet actif */}
      <div key={ongletActif} className="rounded-xl border border-border bg-card p-4 animate-fadeIn">
        {ongletActif === 'irl'  && <OngletIRL />}
        {ongletActif === 'if'   && <OngletIF />}
        {ongletActif === 'iv'   && <OngletIV />}
        {ongletActif === 'tscr' && <OngletTSCR />}
        {ongletActif === 'tsmc' && <OngletTSMC />}
      </div>
    </div>
  )
}
