import React, { useState } from 'react'
import { Calculator, RotateCcw, Info, Home, Car, TrendingUp, Pickaxe } from 'lucide-react'
import { cn } from '@/lib/utils'
import { InfoTooltip } from '@/components/InfoTooltip'

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
    <div className={cn('rounded-xl p-3 text-center', credit ? 'bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-700' : 'bg-primary/5 border border-primary/20')}>
      <p className="text-xs text-muted-foreground mb-0.5">{label}</p>
      <p className={cn('text-base font-bold font-mono tabular-nums', credit ? 'text-green-700 dark:text-green-400' : 'text-primary')}>{val}</p>
    </div>
  )
}
function EtapeResultat({ numero, titre, children }: { numero: number; titre: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
      <div className="flex items-center gap-2.5 px-3 py-3 bg-muted/40 border-b border-border/40">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">{numero}</span>
        <p className="text-xs font-semibold text-foreground">{titre}</p>
      </div>
      <div className="px-3 py-2.5 space-y-1.5">{children}</div>
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
    <div className="rounded-xl border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/20 p-3">
      <div className="flex gap-2">
        <Info className="h-3.5 w-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
        <div className="text-sm text-blue-700 dark:text-blue-300 space-y-1">{children}</div>
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
function OngletIRL() {
  const [loyerMensuel, setLoyerMensuel] = useState('')
  const [nbMois, setNbMois] = useState('12')
  const [res, setRes] = useState<any>(null)

  function calculer() {
    const loyer = parseFloat(loyerMensuel) || 0
    const mois = parseInt(nbMois) || 12
    const totalBrut = loyer * mois
    const irlTotal = totalBrut * 0.22
    const retenuLocataire = totalBrut * 0.20
    const soldeProprietaire = totalBrut * 0.02
    setRes({ loyer, mois, totalBrut, irlTotal, retenuLocataire, soldeProprietaire })
  }
  function reset() { setLoyerMensuel(''); setNbMois('12'); setRes(null) }

  return (
    <div className="space-y-4">
      <DefBox>
        <p className="font-semibold">Impôt sur les Revenus Locatifs (IRL) : Art. 4 à 12, Livre I Partie II</p>
        <p>Frappé les revenus de location de bâtiments et terrains situés en RDC. Taux global : <strong>22%</strong>.</p>
        <p>Mécanisme : le locataire retient <strong>20%</strong> et le verse dans les 10 jours du mois suivant. Le propriétaire paie le solde de <strong>2%</strong> au plus tard le 1er février de l'année suivante.</p>
        <p className="text-xs mt-1">Cet impôt est rétrocédé aux Entités Territoriales Décentralisées (ETD) : Art. 9 al. 5, Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques.</p>
      </DefBox>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
              <p className="text-xs font-semibold text-foreground">Calcul de l'IRL</p>
            </div>
            <div className="px-3 py-2.5 space-y-1.5">
              <LigneR label={`IRL = ${formatFC(res.totalBrut)} × 22%`} val={formatFC(res.irlTotal)} bold />
              <LigneR label="Retenu par le locataire (20%) : dans les 10 jours" val={formatFC(res.retenuLocataire)} indent />
              <LigneR label="Solde propriétaire (2%) : au 1er février" val={formatFC(res.soldeProprietaire)} indent />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
            <BoxFinal label="IRL total (22%)" val={formatFC(res.irlTotal)} />
            <BoxFinal label="Retenu locataire (20%)" val={formatFC(res.retenuLocataire)} />
            <BoxFinal label="Solde propriétaire (2%)" val={formatFC(res.soldeProprietaire)} credit />
          </div>
          <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-3">
            <p className="text-sm text-amber-700 dark:text-amber-300 font-semibold mb-1">Exonérations (Art. 12)</p>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-0.5 list-disc list-inside">
              <li>L'État, les provinces, communes, secteurs, chefferies</li>
              <li>Institutions religieuses, scientifiques, philanthropiques</li>
              <li>Organismes internationaux</li>
              <li>Immeubles neufs dans les provinces de l'Est (5 ans)</li>
            </ul>
          </div>
        </ResultatWrap>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 2 : IF : Impôt Foncier
// ─────────────────────────────────────────────────────────────────────────────

// Barèmes IF (forfait annuel par catégorie : Art. 13 CGI, modifiable par edit budgétaire provincial)
const BAREMES_IF: Record<string, { label: string; bati: { rang: string; montant: number }[]; nonBati: { rang: string; montant: number }[] }> = {
  villa: {
    label: 'Villas (superficie bâtie en m²)',
    bati: [
      { rang: 'Rang 1', montant: 1200 },
      { rang: 'Rang 2', montant: 900 },
      { rang: 'Rang 3', montant: 600 },
      { rang: 'Rang 4', montant: 300 },
    ],
    nonBati: []
  },
  immeuble: {
    label: "Immeubles / bâtiments à usage d'habitation",
    bati: [
      { rang: 'Rang 1', montant: 80000 },
      { rang: 'Rang 2', montant: 50000 },
      { rang: 'Rang 3', montant: 30000 },
      { rang: 'Rang 4', montant: 15000 },
    ],
    nonBati: []
  },
  commercial: {
    label: 'Immeubles à usage commercial / industriel',
    bati: [
      { rang: 'Rang 1', montant: 150000 },
      { rang: 'Rang 2', montant: 100000 },
      { rang: 'Rang 3', montant: 70000 },
      { rang: 'Rang 4', montant: 40000 },
    ],
    nonBati: []
  },
  terrain: {
    label: 'Terrain non bâti (en milieu urbain)',
    bati: [],
    nonBati: [
      { rang: 'Rang 1', montant: 50 },
      { rang: 'Rang 2', montant: 30 },
      { rang: 'Rang 3', montant: 20 },
      { rang: 'Rang 4', montant: 10 },
    ]
  }
}


const RANGS_LOCALITES: Record<string, { titre: string; kinshasa: string; autres: string }> = {
  '0': {
    titre: 'Rang 1 : Zones très urbanisées / prestige',
    kinshasa: 'Gombe (tous quartiers) · Limete (sauf Mombele, Musoso, Salongo, Kingabwa) · Ngaliema (Ma-campagne, IPN, Binza Pigeon, Monts Fleuris, Golf, Mimoza, Utexafrica, Chanic…) · Barumbu (quartier Bon-Marché) · Lemba (quartier Gombele)',
    autres: "Matadi (centre commercial, Soyo ville haute) · Lubumbashi (commune de Lubumbashi) · Bukavu (commune d'Ibanda) · Goma (centre commercial, quartier Himbi) · Mbuji-Mayi (quartier MIBA) · Kisangani (commune Makiso) · Aéroports internationaux et ports maritimes",
  },
  '1': {
    titre: 'Rang 2 : Zones résidentielles intermédiaires',
    kinshasa: 'Matete (quartier Marais) · Lingwala (Boyata, Golf) · Lemba (camp Riche, cité Salongo) · Limete (quartier Salongo) · Selembao (Cité Verte, Ngafani I/II/III) · Mont-Ngafula (cité Maman Mobutu, Mama Yemo, Munongo, Masanga Mbila) · Kintambo (quartier Jamaïque, centre commercial)',
    autres: 'Matadi (commune de Matadi) · Bunia (centre commercial) · Goma (Butembo, Beni) · Gbadolite (centre) · Mbandaka (centre) · Lubumbashi (commune de Kapemba) · Likasi, Kolwezi, Kikwit (plateau et ville basse) · Kananga (centre) · Ports fluviaux KIN/Kisangani',
  },
  '2': {
    titre: 'Rang 3 : Communes urbaines ordinaires',
    kinshasa: 'Kalamu · Kasa-Vubu · Kintambo (sauf Rang 1/2) · Bandalungwa · Kinshasa · Barumbu (sauf Bon-Marché) · Lingwala (sauf Boyata/Golf) · Matete (sauf Marais) · Ngiri-Ngiri · Masina (quartier Sans-Fil) · Ndjili (quartiers 1,2,3,4,7,12) · Mont-Ngafula (sauf Maman Mobutu/Mama Yemo) · Lemba (sauf Gombele/camp Riche) · Limete (quartier Musoso)',
    autres: 'Mbanza-Ngungu · Inkisi · Boma (Nzadi) · Bukavu (Bagira, Kadutu) · Uvira (Mulongwe) · Kindu · Kamina · Kalemie · Lubumbashi (Rwashi) · Bandundu · Mwene-Ditu · Mbandaka (sauf centre) · Bunia (Nyakasanza) · Kikwit (sauf plateau/ville basse) · Ilebo · Tshikapa',
  },
  '3': {
    titre: 'Rang 4 : Localités semi-urbaines et rurales',
    kinshasa: "Toutes les communes et quartiers de Kinshasa non repris aux rangs 1, 2 et 3 (Kimbanseke, Kisenso, Makala, Ngaba, Bumbu, Selembao hors Cité Verte, Masina hors Sans-Fil, Ndjili hors q.1-4/7/12, Maluku…)",
    autres: "Toutes les localités de l'intérieur du pays non classées en rangs 1, 2 ou 3 (chefs-lieux de territoire, cités rurales, agglomérations non urbanisées)",
  },
}

function OngletIF() {
  const [categorie, setCategorie] = useState('villa')
  const [rangIndex, setRangIndex] = useState('0')
  const [superficie, setSuperficie] = useState('')
  const [res, setRes] = useState<any>(null)

  const cat = BAREMES_IF[categorie]
  const lignes = categorie === 'terrain' ? cat.nonBati : cat.bati
  const rang = lignes[parseInt(rangIndex)]

  function calculer() {
    if (!rang) return
    const s = parseFloat(superficie) || 0
    let impot = 0
    let detail = ''
    if (categorie === 'villa') {
      impot = s * rang.montant
      detail = `${s} m² × ${rang.montant.toLocaleString('fr-FR')} FC/m²`
    } else if (categorie === 'terrain') {
      impot = s * rang.montant
      detail = `${s} m² × ${rang.montant.toLocaleString('fr-FR')} FC/m²`
    } else {
      // Forfait fixe pour immeubles
      impot = rang.montant
      detail = `Forfait annuel : ${rang.rang}`
    }
    setRes({ categorie, rang: rang.rang, superficie: s, impot, detail })
  }
  function reset() { setSuperficie(''); setRes(null) }

  const needSuperficie = categorie === 'villa' || categorie === 'terrain'

  return (
    <div className="space-y-4">
      <DefBox>
        <p className="font-semibold">Impôt Foncier (IF) : Art. 1er à 28, Livre I Partie 1ère (Titre II)</p>
        <p>Impôt réel annuel sur la superficie des propriétés foncières bâties et non bâties situées en RDC. Il est dû par le titulaire du droit de propriété, de possession, d'emphytéose ou d'usufruit (Art. 8).</p>
        <p>Le taux est fixé par les provinces via édit budgétaire (Art. 204 al. 16 Constitution). Les barèmes ci-dessous sont indicatifs.</p>
        <p className="text-xs mt-1">Rétrocédé aux ETD : impôt provincial et local.</p>
      </DefBox>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
          options={lignes.map((l, i) => ({ value: String(i), label: l.rang }))}
        />
      </div>

      {needSuperficie && (
        <InputField
          label={categorie === 'terrain' ? 'Superficie du terrain (m²)' : 'Superficie bâtie (m²)'}
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
              {needSuperficie && <LigneR label="Superficie" val={`${res.superficie} m²`} />}
              <LigneR label={`IF annuel = ${res.detail}`} val={formatFC(res.impot)} bold />
            </div>
          </div>
          <BoxFinal label="Impôt Foncier annuel dû" val={formatFC(res.impot)} />
          <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-3">
            <p className="text-sm text-amber-700 dark:text-amber-300 font-semibold mb-1">Règles pratiques (Art. 21 &amp; 23)</p>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-0.5 list-disc list-inside">
              <li>Dû pour l'année entière sur la situation au 1er janvier</li>
              <li>Immeuble neuf imposable à partir du 1er janvier suivant l'occupation</li>
              <li>Dégrèvement si inoccupation ≥ 180 jours consécutifs (Art. 25)</li>
              <li>Déclaration de mutation dans le mois du changement de propriétaire (Art. 11)</li>
            </ul>
          </div>
        </ResultatWrap>
      )}

      {/* Tableau de référence fixe : classement des localités par rang */}
      <div className="rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/20 overflow-hidden">
        <div className="px-3 py-2 bg-slate-100 dark:bg-slate-800/50 border-b border-slate-200 dark:border-slate-700">
          <p className="text-sm font-bold text-slate-700 dark:text-slate-200">Classement des localités par rang (référence)</p>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Arrêté ministériel n°019/CAB/MIN/FIN/97 du 08 oct. 1997 · OL n°69-006 du 10 fév. 1969</p>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {[
            {
              rang: 'Rang 1', couleur: 'text-rose-700 dark:text-rose-300 bg-rose-100 dark:bg-rose-900/30',
              kin: 'Gombe (tous q.) · Limete (sauf Mombele, Musoso, Salongo, Kingabwa) · Ngaliema (Ma-campagne, IPN, Binza Pigeon, Monts Fleuris, Golf, Mimoza, Utexafrica, Chanic…) · Barumbu (Bon-Marché) · Lemba (Gombele)',
              autres: 'Matadi (Soyo, centre commercial) · Lubumbashi (commune) · Bukavu (Ibanda) · Goma (centre, Himbi) · Mbuji-Mayi (MIBA) · Kisangani (Makiso) · Aéroports internationaux · Ports maritimes',
            },
            {
              rang: 'Rang 2', couleur: 'text-orange-700 dark:text-orange-300 bg-orange-100 dark:bg-orange-900/30',
              kin: 'Matete (Marais) · Lingwala (Boyata, Golf) · Lemba (camp Riche, Salongo) · Limete (Salongo) · Selembao (Cité Verte, Ngafani I/II/III) · Mont-Ngafula (Maman Mobutu, Mama Yemo, Munongo, Masanga Mbila) · Kintambo (Jamaïque, centre commercial)',
              autres: 'Matadi (commune) · Bunia (centre) · Goma (Butembo, Beni) · Gbadolite (centre) · Mbandaka (centre) · Lubumbashi (Kapemba) · Likasi · Kolwezi · Kikwit (plateau, ville basse) · Kananga (centre) · Ports fluviaux KIN/Kisangani',
            },
            {
              rang: 'Rang 3', couleur: 'text-amber-700 dark:text-amber-300 bg-amber-100 dark:bg-amber-900/30',
              kin: 'Kalamu · Kasa-Vubu · Bandalungwa · Kinshasa · Ngiri-Ngiri · Masina (Sans-Fil) · Ndjili (q.1,2,3,4,7,12) · Barumbu (sauf Bon-Marché) · Lingwala (sauf Boyata/Golf) · Matete (sauf Marais) · Mont-Ngafula (sauf Maman Mobutu/Mama Yemo) · Lemba (sauf Gombele/Riche) · Limete (Musoso) · Kintambo (sauf Rang 1/2)',
              autres: 'Mbanza-Ngungu · Inkisi · Boma (Nzadi) · Bukavu (Bagira, Kadutu) · Uvira (Mulongwe) · Kindu · Kamina · Kalemie · Lubumbashi (Rwashi) · Bandundu · Mwene-Ditu · Mbandaka (sauf centre) · Bunia (Nyakasanza) · Ilebo · Tshikapa',
            },
            {
              rang: 'Rang 4', couleur: 'text-slate-600 dark:text-slate-300 bg-slate-200 dark:bg-slate-700/50',
              kin: 'Kimbanseke · Kisenso · Makala · Ngaba · Bumbu · Maluku · Selembao (hors Cité Verte) · Masina (hors Sans-Fil) · Ndjili (hors q.1,2,3,4,7,12) · et tout quartier non repris aux rangs 1, 2 ou 3',
              autres: "Toutes localités de l'intérieur non classées en rangs 1, 2 ou 3 : chefs-lieux de territoire, cités rurales, agglomérations non urbanisées",
            },
          ].map(r => (
            <div key={r.rang} className="p-3 space-y-1.5">
              <span className={`text-sm font-bold px-2 py-0.5 rounded ${r.couleur}`}>{r.rang}</span>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mt-1">
                <span className="font-semibold">Kinshasa : </span>{r.kin}
              </p>
              <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
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

function OngletIV() {
  const [catId, setCatId] = useState('tour_pp_s')
  const [cylindree, setCylindree] = useState('')
  const [poids, setPoids] = useState('')
  const [moisDebut, setMoisDebut] = useState('1')
  const [nbVehicules, setNbVehicules] = useState('1')
  const [puissanceManuelle, setPuissanceManuelle] = useState('')
  const [modePuissance, setModePuissance] = useState('formule')
  const [res, setRes] = useState<any>(null)

  const cat = CATEGORIES_IV.find(c => c.id === catId)!
  const isParCV = cat.type === 'par_cv'

  function calculPuissance(): number {
    const cy = parseFloat(cylindree) || 0
    const p = parseFloat(poids) || 0
    return (4 * cy) / 400 + p / 400
  }

  function calculer() {
    const mois = parseInt(moisDebut) || 1
    const nb = parseInt(nbVehicules) || 1
    // Prorata : si commence après janvier → 1/12 par mois restant
    const fraction = mois === 1 ? 1 : (13 - mois) / 12
    let impotUnitaire = 0
    let detail = ''
    let cv = 0

    if (isParCV) {
      cv = modePuissance === 'formule' ? calculPuissance() : (parseFloat(puissanceManuelle) || 0)
      impotUnitaire = Math.round(cv) * cat.taux
      detail = `${Math.round(cv)} CV × ${cat.taux.toLocaleString('fr-FR')} FC`
    } else {
      impotUnitaire = cat.taux
      detail = `Forfait annuel ${cat.label}`
    }

    const impotAnnuel = impotUnitaire
    const impotProrata = Math.round(impotAnnuel * fraction)
    const impotTotal = impotProrata * nb
    setRes({ cat: cat.label, impotAnnuel, fraction, impotProrata, nb, impotTotal, detail, mois, cv: isParCV ? Math.round(cv) : null })
  }
  function reset() { setCylindree(''); setPoids(''); setMoisDebut('1'); setNbVehicules('1'); setPuissanceManuelle(''); setRes(null) }

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

      {isParCV && (
        <div className="space-y-3">
          <div className="flex gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" checked={modePuissance === 'formule'} onChange={() => setModePuissance('formule')} />
              <span className="text-xs">Calculer via formule (Art. 42)</span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input type="radio" checked={modePuissance === 'manuel'} onChange={() => setModePuissance('manuel')} />
              <span className="text-xs">Saisir puissance directement (CV)</span>
            </label>
          </div>
          {modePuissance === 'formule' ? (
            <div className="grid grid-cols-2 gap-3">
              <InputField label="Cylindrée totale (CY en litres)" value={cylindree} onChange={setCylindree} placeholder="Ex : 2.0" unit="L" />
              <InputField label="Poids en ordre de marche (kg)" value={poids} onChange={setPoids} placeholder="Ex : 1500" unit="kg" />
              {cylindree && poids && (
                <div className="col-span-2 rounded-lg bg-muted/50 px-3 py-2 text-sm">
                  <span className="text-muted-foreground">Puissance calculée : </span>
                  <span className="font-semibold">P = (4 × {cylindree}) / 400 + {poids} / 400 = <strong>{calculPuissance().toFixed(2)} CV</strong></span>
                </div>
              )}
            </div>
          ) : (
            <InputField label="Puissance fiscale (CV)" value={puissanceManuelle} onChange={setPuissanceManuelle} placeholder="Ex : 8" unit="CV" />
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
          <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-3">
            <p className="text-sm text-amber-700 dark:text-amber-300 font-semibold mb-1">Principales exonérations (Art. 39)</p>
            <ul className="text-sm text-amber-700 dark:text-amber-300 space-y-0.5 list-disc list-inside">
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
          <div className="rounded-xl border border-amber-200 dark:border-amber-700 bg-amber-50 dark:bg-amber-900/20 p-3">
            <p className="text-sm text-amber-700 dark:text-amber-300 font-semibold mb-1">Note importante</p>
            <p className="text-sm text-amber-700 dark:text-amber-300">Le paiement se fait en FC à l'équivalent du taux de change officiel de la BCC au jour du paiement. Le taux ci-dessus est purement indicatif.</p>
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
  { id: 'tsmc',  label: 'TSMC', sublabel: 'Concessions Minières', icon: Pickaxe, color: 'purple' },
]

const COLOR_MAP: Record<string, string> = {
  amber:  'bg-amber-100 text-amber-700 border-amber-300 dark:bg-amber-900/30 dark:text-amber-300 dark:border-amber-700',
  green:  'bg-green-100 text-green-700 border-green-300 dark:bg-green-900/30 dark:text-green-300 dark:border-green-700',
  blue:   'bg-blue-100 text-blue-700 border-blue-300 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-700',
  purple: 'bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-300 dark:border-purple-700',
}
const COLOR_ACTIVE: Record<string, string> = {
  amber:  'border-amber-500 bg-amber-50 dark:bg-amber-900/20',
  green:  'border-green-500 bg-green-50 dark:bg-green-900/20',
  blue:   'border-blue-500 bg-blue-50 dark:bg-blue-900/20',
  purple: 'border-purple-500 bg-purple-50 dark:bg-purple-900/20',
}

export default function SimulateurAutresImpots() {
  const [ongletActif, setOngletActif] = useState('irl')

  const onglet = ONGLETS.find(o => o.id === ongletActif)!

  return (
    <div className="space-y-4">
      {/* En-tête */}
      <div className="rounded-xl border border-border bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900/50 dark:to-slate-800/50 p-4">
        <h2 className="text-sm font-bold text-foreground mb-1">Autres impôts rétrocédés aux ETD</h2>
        <p className="text-sm text-muted-foreground">
          Ces quatre impôts sont des impôts réels provinciaux et locaux, rétrocédés aux Entités Territoriales Décentralisées (ETD) conformément à l'article 204 al. 16 de la Constitution et à la Loi n° 11/011 du 13 juillet 2011 relative aux finances publiques.
        </p>
      </div>

      {/* Onglets */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {ONGLETS.map(o => {
          const Icon = o.icon
          const isActive = ongletActif === o.id
          return (
            <button key={o.id} onClick={() => setOngletActif(o.id)}
              className={cn(
                'flex flex-col items-center gap-1 rounded-xl border-2 p-3 transition-all text-center',
                isActive ? COLOR_ACTIVE[o.color] : 'border-border bg-background hover:bg-muted/50'
              )}>
              <div className={cn('flex h-8 w-8 items-center justify-center rounded-lg border', COLOR_MAP[o.color])}>
                <Icon className="h-4 w-4" />
              </div>
              <span className={cn('text-xs font-bold', isActive ? 'text-foreground' : 'text-muted-foreground')}>{o.label}</span>
              <span className="text-xs text-muted-foreground leading-tight">{o.sublabel}</span>
            </button>
          )
        })}
      </div>

      {/* Contenu de l'onglet actif */}
      <div className="rounded-xl border border-border bg-card p-4">
        {ongletActif === 'irl'  && <OngletIRL />}
        {ongletActif === 'if'   && <OngletIF />}
        {ongletActif === 'iv'   && <OngletIV />}
        {ongletActif === 'tsmc' && <OngletTSMC />}
      </div>
    </div>
  )
}
