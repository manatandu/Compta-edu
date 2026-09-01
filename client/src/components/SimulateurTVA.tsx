import React, { useState } from 'react'
import {
  Calculator, Info, RotateCcw, CheckCircle2, X, Search,
  AlertCircle, ChevronDown, ChevronUp, BookOpen, Percent,
  FileText, AlertTriangle, ArrowRight, Plus,
  Clock, ShieldAlert, QrCode, BookMarked
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { InfoTooltip } from '@/components/InfoTooltip'

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────
function formatFC(n: number): string {
  if (n < 0) return `(${Math.abs(Math.round(n)).toLocaleString('fr-FR')} FC)`
  return `${Math.round(n).toLocaleString('fr-FR')} FC`
}

// Arrondi de liquidation TVA (Décret n° 011/42, Art. 137) : la décimale est arrondie
// à l'unité (≥ 0,5 → unité sup., sinon unité inf.), puis la tranche de FC est ramenée
// à la centaine la plus proche (≥ 50 FC → centaine sup., sinon centaine inf.) - même
// mécanique en deux temps que l'Art. 150 pour l'IRPP et l'IS.
function arrondiTVA(val: number): number {
  const u = Math.round(val)
  const reste = u % 100
  if (reste >= 50) return u + (100 - reste)
  return u - reste
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANTS UI RÉUTILISABLES
// ─────────────────────────────────────────────────────────────────────────────
function EtapeResultat({ numero, titre, children }: { numero: number; titre: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
      <div className="flex items-center gap-2.5 px-3 py-2 bg-muted/40 border-b border-border/40">
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold shrink-0">{numero}</span>
        <p className="text-xs font-semibold text-foreground">{titre}</p>
      </div>
      <div className="px-3 py-2.5 space-y-1.5">{children}</div>
    </div>
  )
}

function LigneR({ label, val, bold, neg, accent, note, indent, signe, tooltip }: {
  label: string; val: string; bold?: boolean; neg?: boolean; accent?: boolean; note?: string; indent?: boolean
  signe?: '+' | '−' | '=' | '×'; tooltip?: { texte: string; loi?: string }
}) {
  return (
    <div className={cn('flex items-baseline justify-between gap-2', indent && 'ml-4')}>
      <div className="flex items-baseline gap-1.5 flex-1 min-w-0">
        {signe && (
          <span className={cn('text-xs font-bold shrink-0 w-3 text-center',
            signe === '−' || neg ? 'text-red-500' :
            signe === '=' || accent ? 'text-primary' : 'text-muted-foreground')}>{signe}</span>
        )}
        <span className={cn('text-xs inline-flex items-center gap-0.5', bold ? 'font-semibold text-foreground' : 'text-muted-foreground')}>
          {label}{note && <span className="ml-1 text-xs opacity-60">({note})</span>}
          {tooltip && <InfoTooltip texte={tooltip.texte} loi={tooltip.loi} />}
        </span>
      </div>
      <span className={cn('text-xs font-mono shrink-0', bold ? 'font-bold' : '',
        accent ? 'text-primary font-bold' : neg ? 'text-red-600' : 'text-foreground')}>
        {val}
      </span>
    </div>
  )
}

function Separateur() { return <div className="border-t border-border/40 my-1" /> }

function BoxFinal({ label, sublabel, val, credit, couleur }: {
  label: string; sublabel?: string; val: string; credit?: boolean; couleur?: string
}) {
  const bg = credit ? 'bg-amber-50 border-amber-200'
    : couleur === 'red' ? 'bg-red-50 border-red-200'
    : couleur === 'orange' ? 'bg-orange-50 border-orange-200'
    : 'bg-primary/8 border-primary/25'
  const tc = credit ? 'text-amber-600'
    : couleur === 'red' ? 'text-red-600'
    : couleur === 'orange' ? 'text-orange-600'
    : 'text-primary'
  return (
    <div className={cn('rounded-xl p-3.5 text-center border shadow-sm', bg)}>
      <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest mb-0.5">{label}</p>
      {sublabel && <p className="text-[10px] text-muted-foreground/70 italic mb-1">{sublabel}</p>}
      <p className={cn('text-lg font-bold leading-tight', tc)}>{val}</p>
    </div>
  )
}

function BtnCalculer({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="flex-1 bg-primary text-primary-foreground rounded-xl py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2">
      <Calculator className="h-4 w-4" /> Calculer
    </button>
  )
}

function BtnReset({ onClick }: { onClick: () => void }) {
  return (
    <button onClick={onClick}
      className="px-4 rounded-xl border border-border bg-card text-muted-foreground hover:text-foreground text-sm transition-colors flex items-center gap-1.5">
      <RotateCcw className="h-3.5 w-3.5" /> Réinitialiser
    </button>
  )
}

function ResultatWrap({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-green-200 bg-gradient-to-b from-green-50 to-white overflow-hidden shadow-sm">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-green-500/10 border-b border-green-200">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-green-500 shrink-0">
          <CheckCircle2 className="h-4 w-4 text-white" />
        </div>
        <p className="font-bold text-sm text-green-800">{titre}</p>
      </div>
      <div className="p-4 space-y-4">{children}</div>
    </div>
  )
}

function DefinitionBox({ titre, children }: { titre: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-blue-200 bg-blue-50 p-3.5">
      <div className="flex items-center gap-2 mb-2">
        <BookOpen className="h-3.5 w-3.5 text-blue-600 shrink-0" />
        <p className="text-xs font-bold text-blue-700 uppercase tracking-wide">{titre}</p>
      </div>
      <div className="space-y-1">{children}</div>
    </div>
  )
}

function DefLigne({ terme, def, loi }: { terme: string; def: string; loi?: string }) {
  return (
    <div className="flex gap-2 text-xs">
      <span className="font-semibold text-foreground shrink-0 min-w-[120px]">{terme}</span>
      <span className="text-muted-foreground flex-1">{def}{loi && <span className="ml-1 text-xs opacity-60">({loi})</span>}</span>
    </div>
  )
}

function BadgeLoi({ loi }: { loi: string }) {
  return (
    <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
      {loi}
    </span>
  )
}

function SectionTitre({ texte, loi }: { texte: string; loi?: string }) {
  return (
    <div className="flex items-center gap-2 mb-2">
      <p className="text-xs font-bold text-foreground uppercase tracking-wide">{texte}</p>
      {loi && <BadgeLoi loi={loi} />}
    </div>
  )
}

function AlertInfo({ texte, type = 'info' }: { texte: string; type?: 'info' | 'warning' | 'success' }) {
  const styles = {
    info: 'border-blue-200 bg-blue-50 text-blue-700',
    warning: 'border-amber-200 bg-amber-50 text-amber-700',
    success: 'border-green-200 bg-green-50 text-green-700',
  }
  const icons = { info: Info, warning: AlertTriangle, success: CheckCircle2 }
  const Icon = icons[type]
  return (
    <div className={cn('rounded-xl border p-3 flex items-start gap-2', styles[type])}>
      <Icon className="h-3.5 w-3.5 shrink-0 mt-0.5" />
      <p className="text-xs">{texte}</p>
    </div>
  )
}

// Modal catalogue générique

// ─────────────────────────────────────────────────────────────────────────────
// CATALOGUES TVA
// ─────────────────────────────────────────────────────────────────────────────

const CATALOGUE_EXONERATIONS_BIENS = [
  { code: 'EXB-01', label: 'Ventes de biens meubles d\'occasion (sans droit à déduction lors de l\'achat)', article: 'Art. 15-1' },
  { code: 'EXB-02', label: 'Ventes/importations des ASBL à caractère social, sportif, culturel, religieux, éducatif ou philanthropique', article: 'Art. 15-2' },
  { code: 'EXB-03', label: 'Ventes/cessions de l\'État, provinces, ETD, organismes publics non industriels', article: 'Art. 15-3' },
  { code: 'EXB-04', label: 'Timbres officiels et papiers timbrés', article: 'Art. 15-4' },
  { code: 'EXB-05', label: 'Billets de banque, intrants/équipements de fabrication de signes monétaires (BCC) + importation de devises par banques commerciales', article: 'Art. 15-5' },
  { code: 'EXB-06', label: 'Intrants agricoles destinés à l\'agriculture (liste réglementaire)', article: 'Art. 15-6' },
  { code: 'EXB-07', label: 'Cessions d\'immeubles par des personnes autres que promoteurs immobiliers (soumises aux droits d\'enregistrement)', article: 'Art. 15-7' },
  { code: 'EXB-08', label: 'Importation et livraison d\'organes et sang humains par institutions médicales agréées + importation et fourniture de prothèses', article: 'Art. 15-8' },
  { code: 'EXB-09', label: 'Importation et vente de bateaux et filets de pêche', article: 'Art. 15-9' },
  { code: 'EXB-10', label: 'Importation et acquisition de produits pharmaceutiques, emballages pharmaceutiques, intrants pharma (liste réglementaire) + matériels médicaux', article: 'Art. 15-10' },
  { code: 'EXB-11', label: 'Importation et vente de moustiquaires', article: 'Art. 15-11' },
  { code: 'EXB-12', label: 'Importation et acquisition d\'équipements, matériels, réactifs et produits chimiques pour prospection/exploration/construction de projet minier et pétrolier (avant exploitation)', article: 'Art. 15-12' },
  { code: 'EXB-13', label: 'Importations diverses : échantillons sans valeur commerciale, bagages de voyageurs, effets personnels (déménagement), biens par succession, récompenses, cercueils, produits pour essais, dons à l\'État', article: 'Art. 15-13' },
  { code: 'EXB-14', label: 'Ventes d\'œuvres d\'art originales par l\'artiste créateur (tableaux, gravures, sculptures, tapisseries, céramiques, émaux)', article: 'Art. 15-14' },
  { code: 'EXB-15', label: 'Importation et vente de cercueils', article: 'Art. 15-15' },
  { code: 'EXB-16', label: 'Importation de blé, maïs, farine de froment et farine de maïs', article: 'Art. 15-16' },
  { code: 'EXB-17', label: 'Vente locale de blé, pain, maïs, farine de froment et farine de maïs', article: 'Art. 15-17' },
  { code: 'EXB-18', label: 'Vente locale de bêtes sur pied', article: 'Art. 15-18' },
  { code: 'EXB-19', label: 'Importation, par les entreprises nouvelles, de biens d\'équipements destinés aux investissements de création', article: 'Art. 15-20' },
  { code: 'EXB-20', label: 'Livraisons de Fuel Oil Marché Intérieur (FOMI)', article: 'Art. 15-21' },
]

const CATALOGUE_EXONERATIONS_SERVICES = [
  { code: 'EXS-01', label: 'Composition, impression, importation et vente de journaux, livres et périodiques (hors recettes de publicité)', article: 'Art. 17-1' },
  { code: 'EXS-02', label: 'Location de livres, périodiques, supports magnétiques scientifiques/éducatifs/culturels/religieux : services de bibliothèques et archives', article: 'Art. 17-2' },
  { code: 'EXS-03', label: 'Visites des monuments historiques, musées nationaux, parcs zoologiques et botaniques', article: 'Art. 17-3' },
  { code: 'EXS-04', label: 'Frais de scolarité et de pension dans les établissements d\'enseignement national régulièrement autorisés', article: 'Art. 17-4' },
  { code: 'EXS-05', label: 'Examens, consultations, soins, hospitalisations, travaux d\'analyse et de biologie médicale pour les humains', article: 'Art. 17-5' },
  { code: 'EXS-06', label: 'Transport des malades et blessés par des moyens spécialement équipés', article: 'Art. 17-6' },
  { code: 'EXS-07', label: 'Prestations des pompes funèbres et transport de corps', article: 'Art. 17-7' },
  { code: 'EXS-08', label: 'Prestations des ASBL dans le cadre de leurs activités normales (sans distorsion de concurrence)', article: 'Art. 17-8' },
  { code: 'EXS-09', label: 'Services aéronautiques (atterrissage, décollage, amarrage, entretien, sécurité) pour compagnies dont le trafic international ≥ 80%', article: 'Art. 17-9' },
  { code: 'EXS-10', label: 'Transport aérien de personnes ou marchandises à destination/provenance de l\'étranger', article: 'Art. 17-10' },
  { code: 'EXS-11', label: 'Transport terrestre, lacustre, fluvial, maritime et ferroviaire pour la partie du trajet hors territoire national', article: 'Art. 17-11' },
  { code: 'EXS-12', label: 'Prestations de contrôle technique du poids et qualité des marchandises destinées à l\'exportation par un organisme public', article: 'Art. 17-12' },
  { code: 'EXS-13', label: 'Services maritimes : pilotage, amarrage, remorquage, séjour des bateaux, entretien, sécurité incendie, visites de sécurité', article: 'Art. 17-13' },
  { code: 'EXS-14', label: 'Intérêts relatifs aux crédits bancaires à l\'investissement, crédits-bails, crédits agricoles et découverts bancaires', article: 'Art. 17-14' },
  { code: 'EXS-15', label: 'Intérêts rémunérant les dépôts de non-professionnels auprès des établissements de crédit', article: 'Art. 17-15' },
  { code: 'EXS-16', label: 'Intérêts rémunérant les emprunts extérieurs', article: 'Art. 17-16' },
  { code: 'EXS-17', label: 'Opérations de crédit social ou agricole : caisses de crédit mutuel, coopératives d\'épargne, institutions de microfinance', article: 'Art. 17-17' },
  { code: 'EXS-18', label: 'Prestations de services pétroliers étrangers au profit des entreprises pétrolières de production', article: 'Art. 17-18' },
  { code: 'EXS-19', label: 'Locations de locaux nus à usage d\'habitation par des assujettis TVA autres que promoteurs immobiliers', article: 'Art. 17-19' },
  { code: 'EXS-20', label: 'Prime d\'assurance-vie, prime d\'assurance-maladie, prime d\'assurance directe à l\'étranger autorisée, prime de réassurance', article: 'Art. 17-20' },
]

const CATALOGUE_EXONERATIONS_TAXATIONS_SPECIALES = [
  { code: 'EXT-01', label: 'Ventes de billets d\'accès aux manifestations de loisirs dans les installations sportives', article: 'Art. 18-1' },
  { code: 'EXT-02', label: 'Droits d\'entrée dans une manifestation culturelle', article: 'Art. 18-2' },
  { code: 'EXT-03', label: 'Transmission de propriété ou d\'usufruit de biens immeubles, fonds de commerce ou clientèle, droit au bail (soumis aux droits d\'enregistrement)', article: 'Art. 18-3a' },
  { code: 'EXT-04', label: 'Ventes publiques aux enchères (soumises aux droits d\'enregistrement)', article: 'Art. 18-3b' },
  { code: 'EXT-05', label: 'Gains de parieurs dans le cadre des jeux de hasard', article: 'Art. 18-4' },
]

// Taux réduit - refonte par l'Art. 46 de la Loi de Finances n° 25/060 du 29/12/2025 (LF 2026),
// modifiant l'Art. 35 CGI-TVA, en vigueur depuis le 1er janvier 2026.
// L'ancien taux réduit unique de 8% (LF 21/029 et LF 22/071) est supprimé et remplacé par
// une structure à deux paliers : 1% (ex-produits à 8% + nouvelles opérations) et 5% (billets
// d'avion sur trafic aérien national uniquement - seul cas visé par ce taux).
const CATALOGUE_TAUX_1 = [
  { code: 'T1-01', position: '02.01', label: 'Viandes fraîches ou réfrigérées des animaux de l\'espèce bovine', taux: '1%' },
  { code: 'T1-02', position: '02.02', label: 'Viandes congelées des animaux de l\'espèce bovine', taux: '1%' },
  { code: 'T1-03', position: '02.03', label: 'Viandes fraîches, réfrigérées ou congelées des animaux de l\'espèce porcine', taux: '1%' },
  { code: 'T1-04', position: '02.06', label: 'Abats comestibles frais, réfrigérés ou congelés des animaux bovins, porcins, ovins, caprins, chevaux', taux: '1%' },
  { code: 'T1-05', position: '02.07', label: 'Viandes et abats comestibles frais, réfrigérés ou congelés des volailles', taux: '1%' },
  { code: 'T1-06', position: '0303.23.00', label: 'Tilapias congelés', taux: '1%' },
  { code: 'T1-07', position: '0303.55.00', label: 'Chinchards congelés', taux: '1%' },
  { code: 'T1-08', position: '0305.51.00', label: 'Morues séchées et salées', taux: '1%' },
  { code: 'T1-09', position: '0305.52.00', label: 'Tilapias, siluridés, carpes, anguilles séchés et salés', taux: '1%' },
  { code: 'T1-10', position: '0305.53.00', label: 'Poissons des familles Gadidae, Merluccidae, Macrouridae… séchés et salés', taux: '1%' },
  { code: 'T1-11', position: '0305.54.00', label: 'Harengs, anchois, sardines, sardinelles, sprats, maquereaux, thazards, chinchards séchés et salés', taux: '1%' },
  { code: 'T1-12', position: '0305.59.00', label: 'Autres poissons séchés et salés', taux: '1%' },
  { code: 'T1-13', position: '1006.20.00', label: 'Riz décortiqué (riz cargo ou riz brun)', taux: '1%' },
  { code: 'T1-14', position: '1006.30.00', label: 'Riz semi-blanchi ou blanchi, même poli ou glacé', taux: '1%' },
  { code: 'T1-15', position: '1006.40.00', label: 'Riz en brisures', taux: '1%' },
  { code: 'T1-16', position: '1701.91.00', label: 'Sucre de canne ou betteraves, additionnés d\'arômes ou colorants', taux: '1%' },
  { code: 'T1-17', position: '1701.99.00', label: 'Sucre de canne ou betteraves (autres)', taux: '1%' },
  { code: 'T1-18', position: '1901.10.00', label: 'Préparations à base de lait pour l\'alimentation des nourrissons et enfants en bas âge', taux: '1%' },
  { code: 'T1-19', position: '1901.90.90', label: 'Autres préparations de lait (produits n° 04.01 à 04.04), moins de 5% de cacao', taux: '1%' },
  { code: 'T1-20', position: '04.02', label: 'Lait et crème de lait, concentrés ou additionnés de sucre ou édulcorants', taux: '1%' },
  { code: 'T1-21', position: '2201.90.10', label: 'Eaux conditionnées pour la table', taux: '1%' },
  { code: 'T1-22', position: '2501.00.00', label: 'Sel iodé', taux: '1%' },
  { code: 'T1-23', position: '3401.19.10', label: 'Savons de ménage présentés en barres, pains ou morceaux', taux: '1%' },
  { code: 'T1-24', position: '3605.00.00', label: 'Allumettes (autres qu\'articles de pyrotechnie)', taux: '1%' },
  { code: 'T1-25', position: '-', label: 'Matières premières pour la valorisation de l\'industrie locale : cuivre, étain, plomb, aluminium, zinc, sous forme de produit brut', taux: '1%' },
  { code: 'T1-26', position: '-', label: 'Acquisition de produits agricoles bruts et intrants pour l\'agro-industrie (engrais, équipements agricoles inclus)', taux: '1%' },
  { code: 'T1-27', position: '-', label: 'Acquisition d\'intrants pour la fabrication locale du ciment', taux: '1%' },
  { code: 'T1-28', position: '-', label: 'Acquisition de matériaux et services de construction pour les projets publics d\'infrastructures d\'intérêt national', taux: '1%' },
]

const CATALOGUE_TAUX_5 = [
  { code: 'T5-01', position: '-', label: 'Billets d\'avion sur le trafic aérien national', taux: '5%' },
]

const CATALOGUE_TAUX_0 = [
  { code: 'EX-01', label: 'Construction, transformation, réparation, entretien, affrètement d\'aéronefs pour compagnies dont le trafic international ≥ 80% + fournitures incorporées', article: 'Art. 7-1' },
  { code: 'EX-02', label: 'Livraisons de marchandises destinées à l\'avitaillement d\'aéronefs effectuant des liaisons internationales', article: 'Art. 7-2' },
  { code: 'EX-03', label: 'Construction, transformation, réparation, entretien, affrètement de bâtiments de mer, bateaux de pêche professionnelle maritime/fluviale/lacustre, bateaux de sauvetage + fournitures incorporées', article: 'Art. 7-3' },
  { code: 'EX-04', label: 'Livraison d\'engins et filets de pêche + fournitures pour bateaux de pêche professionnelle', article: 'Art. 7-4' },
  { code: 'EX-05', label: 'Manutention, magasinage et aconage sur marchandises en transit international et sur marchandises exportées', article: 'Art. 7-5' },
  { code: 'EX-06', label: 'Livraisons de biens sous régime suspensif de droits de douane ou avant dédouanement (sous réserve d\'exportation effective)', article: 'Art. 7-6' },
  { code: 'EX-07', label: 'Transport de marchandises destinées à l\'exportation', article: 'Art. 7-7' },
]

const CATALOGUE_TAUX_16 = [
  { code: 'T16-01', label: 'Vente de marchandises générales (produits manufacturés, matériaux, fournitures)' },
  { code: 'T16-02', label: 'Prestations de services professionnels (conseil, expertise, comptabilité, audit, juridique)' },
  { code: 'T16-03', label: 'Travaux de construction et travaux immobiliers' },
  { code: 'T16-04', label: 'Location de matériels, équipements, outils' },
  { code: 'T16-05', label: 'Fourniture d\'eau, électricité, gaz, télécommunications, internet' },
  { code: 'T16-06', label: 'Transport de personnes (intérieur national)' },
  { code: 'T16-07', label: 'Ventes d\'actifs et équipements d\'occasion par des professionnels' },
  { code: 'T16-08', label: 'Opérations de crédit-bail (leasing)' },
  { code: 'T16-09', label: 'Jeux de hasard et de divertissement' },
  { code: 'T16-10', label: 'Ventes à consommer sur place (restauration, cafés, hôtels)' },
  { code: 'T16-11', label: 'Importation de produits non exonérés et non soumis au taux réduit' },
  { code: 'T16-12', label: 'Prestations publicitaires, marketing, communication' },
  { code: 'T16-13', label: 'Ventes immobilières par promoteurs immobiliers' },
  { code: 'T16-14', label: 'Location de locaux nus professionnels par des assujettis TVA' },
  { code: 'T16-15', label: 'Travaux informatiques, développement logiciel, infogérance' },
  { code: 'T16-16', label: 'Prestations de gardiennage, sécurité, nettoyage' },
  { code: 'T16-17', label: 'Ventes de produits cosmétiques, parfums, articles de luxe' },
  { code: 'T16-18', label: 'Ventes d\'appareils électroniques, électroménagers, informatique' },
  { code: 'T16-19', label: 'Services de transport de fonds et valeurs' },
  { code: 'T16-20', label: 'Prestations d\'hôtellerie, hébergement (sauf assurances-vie)' },
]

const CATALOGUE_EXCLUSIONS_DEDUCTION = [
  { code: 'EXD-01', label: 'Dépenses de logement et hébergement (sauf professionnels du tourisme)', article: 'Art. 41-1', deductible: false },
  { code: 'EXD-02', label: 'Dépenses de restauration (sauf professionnels de la restauration)', article: 'Art. 41-1', deductible: false },
  { code: 'EXD-03', label: 'Dépenses de réception, spectacles', article: 'Art. 41-1', deductible: false },
  { code: 'EXD-04', label: 'Location de véhicules de tourisme et transport de personnes (sauf professionnels)', article: 'Art. 41-1', deductible: false },
  { code: 'EXD-05', label: 'Biens et services utilisés par les tiers, dirigeants ou personnel (sauf vêtements de travail et logement de garde)', article: 'Art. 41-2', deductible: false },
  { code: 'EXD-06', label: 'Produits pétroliers (usage général)', article: 'Art. 41-3', deductible: false },
  { code: 'EXD-07', label: 'Produits pétroliers : carburants pour appareils fixes industriels ou aéronefs', article: 'Art. 41-3bis', deductible: true },
  { code: 'EXD-08', label: 'Produits pétroliers (autres cas) : déductibles à 50% seulement', article: 'Art. 41-3ter', deductible: true },
  { code: 'EXD-09', label: 'Services liés à des biens ou produits eux-mêmes exclus (location, entretien, réparation)', article: 'Art. 41-4', deductible: false },
  { code: 'EXD-10', label: 'Objets mobiliers non utilisés pour l\'exploitation', article: 'Art. 41-5', deductible: false },
  { code: 'EXD-11', label: 'Immeubles autres que bâtiments et locaux à usage professionnel', article: 'Art. 41-6', deductible: false },
  { code: 'EXD-12', label: 'Cadeaux, gratuités, commissions inférieures au prix de revient (sauf objets publicitaires de faible valeur)', article: 'Art. 41-7', deductible: false },
  { code: 'EXD-13', label: 'Véhicules de transport de personnes (immobilisations) + pièces détachées et services afférents', article: 'Art. 42-1', deductible: false },
  { code: 'EXD-14', label: 'Véhicules ≥ 10 places pour transport exclusif du personnel : exception', article: 'Art. 42-1', deductible: true },
  { code: 'EXD-15', label: 'Véhicules de transport public de voyageurs (affectés exclusivement) : exception', article: 'Art. 42-1', deductible: true },
  { code: 'EXD-16', label: 'Véhicules acquis par entreprises de location de voitures : exception', article: 'Art. 42-1', deductible: true },
  { code: 'EXD-17', label: 'Transports de personnes et opérations accessoires', article: 'Art. 42-2', deductible: false },
  { code: 'EXD-18', label: 'Factures émises hors dispositifs électroniques fiscaux (DEF) par assujettis soumis à l\'obligation DEF', article: 'Art. 42-3', deductible: false },
  // Exclusion créée par la L.F. n° 25/060 du 29/12/2025 (LF 2026), art. 47.
  { code: 'EXD-19', label: 'Facture émise par un fournisseur introuvable à l\'adresse communiquée à l\'Administration des Impôts', article: 'Art. 42-4', deductible: false },
]

const CATALOGUE_INFRACTIONS = [
  // Art. 69 : amende portée de 500 000 à 5 000 000 FC par la L.F. n° 24/011 du 20/12/2024, art. 54.
  { code: 'INF-01', label: 'Absence de déclaration d\'assujettissement dans le délai', amende: 5_000_000, type: 'fixe', article: 'Art. 69' },
  { code: 'INF-02', label: 'Défaut de souscription d\'une déclaration TVA créditrice dans le délai', amende: 1_500_000, perte_credit: 10, type: 'fixe', article: 'Art. 69 bis' },
  { code: 'INF-03', label: 'Déclaration TVA d\'un montant zéro non souscrite', amende: 500_000, type: 'fixe', article: 'Art. 69 bis' },
  { code: 'INF-03bis', label: 'Taxation d\'office pour absence de dépôt de la déclaration TVA', type: 'perte_deduction', article: 'Art. 69 ter' },
  { code: 'INF-04', label: 'Mention abusive de TVA sur facture', amende: 3, type: 'triple', article: 'Art. 70' },
  { code: 'INF-05', label: 'Émission de fausse facture comprenant la TVA ou falsification de facture justifiant une déduction', amende: 3, type: 'triple', article: 'Art. 71' },
  { code: 'INF-06', label: 'Absence de facture ou document en tenant lieu lors d\'une livraison ou prestation', amende: 2, type: 'double', article: 'Art. 72' },
  { code: 'INF-07', label: 'Remboursement de crédit TVA obtenu sur base de fausses factures', amende: 1, type: 'restitution+amende', article: 'Art. 73' },
  { code: 'INF-08', label: 'Déduction ne correspondant pas à une acquisition réelle', amende: 1, type: 'montant_deduit', article: 'Art. 74' },
  { code: 'INF-09', label: 'Manquement à l\'obligation de paiement par chèque/virement pour transactions ≥ 1 000 000 FC', type: 'perte_deduction', article: 'Art. 74 bis' },
  { code: 'INF-10', label: 'Défaut de retenue à la source de TVA', amende: 1, type: 'montant_retenue', article: 'Art. 74 ter' },
  { code: 'INF-11', label: 'Défaut d\'utilisation du dispositif électronique fiscal (DEF)', amende: 10_000_000, type: 'fixe', article: 'Art. 74 quater' },
  { code: 'INF-12', label: 'Corruption délibérée du fonctionnement du DEF', amende: 5_000_000, type: 'fixe', article: 'Art. 74 quinquies' },
  { code: 'INF-13', label: 'Transaction sans délivrance de facture normalisée (assujetti DEF)', amende: 5, type: 'multiple_tva', min: 10_000_000, article: 'Art. 74 sexies' },
  { code: 'INF-14', label: 'Récidive : transaction sans facture normalisée', amende: 10, type: 'multiple_tva', min: 50_000_000, article: 'Art. 74 sexies' },
  { code: 'INF-15', label: 'Modification illégale du système de facturation / usurpation d\'identité pour fausses factures', amende: 10_000_000, type: 'par_facture', article: 'Art. 74 octies' },
  { code: 'INF-16', label: 'Fournisseurs de logiciels de facturation non homologués', amende: 50_000_000, type: 'fixe', article: 'Art. 74 nonies' },
  { code: 'INF-17', label: 'Facture normalisée de valeur/quantité minorée, ou dysfonctionnement causé au DEF', amende: 10_000_000, type: 'fixe', article: 'Art. 74 septies' },
  { code: 'INF-18', label: 'Manquement non spécifié à la réglementation des dispositifs électroniques fiscaux', amende: 10_000_000, type: 'fixe', article: 'Art. 74 decies' },
]

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 1 : CHAMP D'APPLICATION
// ─────────────────────────────────────────────────────────────────────────────
function OngletChampApplication() {
  const [typeOp, setTypeOp] = useState('')
  const [resultat, setResultat] = useState<null | { statut: 'imposable' | 'exonere' | 'hors_champ'; explication: string; article: string }>(null)

  const operations = [
    { id: 'livraison_tiers', label: 'Livraison de biens meubles à des tiers (à titre onéreux)', statut: 'imposable', explication: 'Une livraison de biens meubles corporels effectuée à titre onéreux par un assujetti agissant en tant que tel est une opération imposable à la TVA.', article: 'Art. 3' },
    { id: 'prestation_tiers', label: 'Prestation de services à des tiers (à titre onéreux)', statut: 'imposable', explication: 'Toute prestation de services effectuée à titre onéreux par un assujetti est soumise à la TVA. Les prestations de services comprennent notamment : locations, transports, travaux, conseils, télécommunications, jeux de hasard...', article: 'Art. 3 et 8' },
    { id: 'livraison_soi_meme', label: 'Livraison de biens à soi-même (production d\'immobilisation ou biens exclus du droit à déduction)', statut: 'imposable', explication: 'Les prélèvements et affectations effectués par les assujettis pour leurs propres besoins (exploitation ou non) sont imposables. Exemple : une entreprise fabrique elle-même un équipement qu\'elle va utiliser.', article: 'Art. 9 et 10' },
    { id: 'prestation_soi_meme', label: 'Prestation de services à soi-même', statut: 'imposable', explication: 'Les services que l\'assujetti réalise pour ses propres besoins (d\'exploitation ou autres) sont imposables. Exemple : une entreprise utilise ses salariés pour rénover ses propres locaux.', article: 'Art. 9 et 11' },
    { id: 'importation', label: 'Importation de biens (entrée en RDC)', statut: 'imposable', explication: 'Toutes les importations sont soumises à la TVA quelle que soit leur valeur. La TVA est perçue par la Douane au moment de l\'enregistrement de la déclaration de mise à la consommation.', article: 'Art. 9 et 12' },
    { id: 'exportation', label: 'Exportation de marchandises', statut: 'imposable', explication: 'Les exportations sont imposables mais soumises au taux zéro (0%). Cela signifie que l\'exportateur ne facture pas de TVA, mais conserve son droit à déduction de la TVA payée en amont.', article: 'Art. 35' },
    { id: 'don_gratuit', label: 'Don ou cession à titre gratuit à une personne', statut: 'imposable', explication: 'Un don sans contrepartie n\'est en principe pas imposable. Toutefois, s\'il s\'agit d\'une livraison à soi-même (ex : prélèvement de stocks pour usage personnel), l\'opération peut devenir imposable.', article: 'Art. 4' },
    { id: 'activite_publique', label: 'Activités administratives, sociales, éducatives, culturelles, sportives des personnes morales de droit public', statut: 'hors_champ', explication: 'Les personnes morales de droit public ne sont pas assujetties à la TVA pour leurs activités administratives, sociales, éducatives, culturelles et sportives, à condition que leur non-assujettissement ne crée pas de distorsion de concurrence.', article: 'Art. 13 al. 3' },
    { id: 'salaire', label: 'Versement de salaires à un employé', statut: 'hors_champ', explication: 'Les salaires ne constituent pas des livraisons de biens ni des prestations de services au sens de la TVA. Le lien de subordination entre l\'employeur et l\'employé exclut ce versement du champ d\'application.', article: 'Art. 3' },
    { id: 'scolarite', label: 'Frais de scolarité perçus par un établissement d\'enseignement autorisé', statut: 'exonere', explication: 'Les frais de scolarité et de pension dans les établissements d\'enseignement national régulièrement autorisés sont exonérés de TVA. Cela couvre l\'enseignement primaire, secondaire, professionnel et universitaire.', article: 'Art. 17-4' },
    { id: 'soins_medicaux', label: 'Soins médicaux, consultations et hospitalisations', statut: 'exonere', explication: 'Les examens, consultations, soins médicaux, hospitalisations et travaux d\'analyse biologique pour les humains sont exonérés de TVA.', article: 'Art. 17-5' },
    { id: 'fomi', label: 'Livraison de Fuel Oil Marché Intérieur (FOMI)', statut: 'exonere', explication: 'Les livraisons de Fuel Oil Marché Intérieur (FOMI) sont exonérées de TVA. Cette exonération a été introduite dans le CGI 2023 (LF n° 22/071 du 28 décembre 2022).', article: 'Art. 15-21' },
  ] as const

  function evaluer() {
    const op = operations.find(o => o.id === typeOp)
    if (!op) return
    setResultat({ statut: op.statut as any, explication: op.explication, article: op.article })
  }

  return (
    <div className="space-y-4">
      <DefinitionBox titre="Définition de la TVA : Art. 1er">
        <p className="text-xs text-foreground">La TVA est un <strong>impôt général sur la consommation</strong> institué conformément aux articles 122 et 174 de la Constitution. C'est un impôt indirect qui touche tous les biens et services de toutes origines <strong>consommés ou utilisés en RDC</strong>.</p>
        <p className="text-xs text-muted-foreground mt-1">Base légale : Ordonnance-Loi n° 10/001 du 20 août 2010, modifiée jusqu'à la LF n° 25/060 du 29 décembre 2025 (LF 2026).</p>
      </DefinitionBox>

      <div className="space-y-3">
        <SectionTitre texte="Définitions clés" loi="Art. 2" />
        <div className="grid gap-2">
          <DefLigne terme="Activités économiques" def="Activités de production, importation, prestation de services et de distribution, y compris activités extractives, agricoles, agro-industrielles, artisanales et professions libérales." loi="Art. 2" />
          <DefLigne terme="Assujetti" def="Personne physique ou morale qui effectue de manière indépendante, à titre habituel ou occasionnel, des opérations économiques imposables.=" loi="Art. 13" />
          <DefLigne terme="Importation" def="Entrée en RDC d'un bien ou service.=" loi="Art. 2" />
          <DefLigne terme="Exportation" def="Sortie du territoire de la RDC d'un bien ou service.=" loi="Art. 2" />
          <DefLigne terme="Mise à la consommation=" def="Régime douanier permettant aux marchandises importées de circuler librement en RDC après accomplissement de toutes les formalités douanières." loi="Art. 2" />
          <DefLigne terme="Promoteur immobilier=" def="Personne physique ou morale qui réalise de manière habituelle des opérations de construction et/ou de rachat d'immeubles en vue de les louer ou vendre.=" loi="Art. 2" />
          <DefLigne terme="Zone franche=" def="Étendue de la RDC considérée hors frontières douanières : biens et services affranchis de droits et taxes à l'entrée et à la sortie pour réexportation." loi="Art. 2" />
        </div>
      </div>

      <div className="space-y-3">
        <SectionTitre texte="Opérations imposables=" loi="Art. 3–12" />
        <div className="grid gap-2">
          {[
            { titre: 'Livraisons de biens meubles corporels à des tiers', desc: 'Inclut : échanges, apports en société, location-vente, vente à tempérament, ventes d\'occasion par professionnels, cessions d\'actifs, exportations. Art. 3 et 6.' },
            { titre: 'Prestations de services à des tiers', desc: 'Inclut : locations de biens, transports, télécommunications, eau/électricité, conseil, travaux immobiliers, jeux de hasard, ventes à consommer sur place... Art. 3 et 8.' },
            { titre: 'Livraisons à soi-même', desc: 'Prélèvements et affectations par l\'assujetti pour ses besoins d\'exploitation ou personnels. Art. 9 et 10.' },
            { titre: 'Prestations de services à soi-même', desc: 'Services que l\'assujetti réalise pour ses propres besoins. Art. 9 et 11.' },
            { titre: 'Importations', desc: 'Toutes importations, quelle que soit leur valeur. Art. 9 et 12.' },
          ].map((op, i) => (
            <div key={i} className="rounded-lg border border-border/60 bg-card p-3">
              <p className="text-xs font-semibold text-foreground">{op.titre}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{op.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <SectionTitre texte="Territorialité" loi="Art. 21–23" />
        <div className="rounded-xl border border-border/60 bg-card p-3 space-y-2">
          <p className="text-xs text-foreground">Sont soumises à la TVA <strong>toutes les opérations réalisées en RDC</strong>, même si l'assujetti est établi à l'étranger.</p>
          <div className="grid gap-1.5">
            <DefLigne terme="Livraison de bien=" def="Opération réputée en RDC si le bien se trouve sur le territoire au moment de la vente.=" />
            <DefLigne terme="Travaux immobiliers=" def="Réputés en RDC s'ils sont effectués sur le territoire.=" />
            <DefLigne terme="Prestations de services=" def="Réputées en RDC si le service est utilisé ou exploité en RDC.=" />
            <DefLigne terme="Redevable étranger" def="Doit désigner un représentant agréé résidant en RDC, solidairement responsable du paiement. À défaut, la TVA est payée par le client.=" loi="Art. 23" />
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <SectionTitre texte="Outil : Qualifier mon opération" />
        <div className="rounded-xl border border-border/60 bg-card p-4 space-y-3">
          <p className="text-xs text-muted-foreground">Sélectionnez une opération pour savoir si elle est imposable, exonérée ou hors champ.</p>
          <select value={typeOp} onChange={e => { setTypeOp(e.target.value); setResultat(null) }}
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
            <option value="">- Choisir une opération -</option>
            <optgroup label="Opérations courantes=">
              {operations.slice(0, 8).map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
            </optgroup>
            <optgroup label="Cas particuliers=">
              {operations.slice(8).map(o => <option key={o.id} value={o.id}>{o.label}</option>)}
            </optgroup>
          </select>
          {typeOp && <button onClick={evaluer} className="w-full bg-primary text-primary-foreground rounded-xl py-2.5 text-sm font-semibold hover:bg-primary/90 transition-colors flex items-center justify-center gap-2"><ArrowRight className="h-4 w-4" /> Qualifier</button>}
          {resultat && (
            <div className={cn('rounded-xl border p-3.5 space-y-2', resultat.statut === 'imposable' ? 'border-green-200 bg-green-50' : resultat.statut === 'exonere' ? 'border-amber-200 bg-amber-50' : 'border-slate-200 bg-slate-50')}>
              <div className="flex items-center gap-2">
                {resultat.statut === 'imposable' ? <CheckCircle2 className="h-4 w-4 text-green-600" /> : resultat.statut === 'exonere' ? <AlertCircle className="h-4 w-4 text-amber-600" /> : <X className="h-4 w-4 text-slate-500" />}
                <span className={cn('text-sm font-bold', resultat.statut === 'imposable' ? 'text-green-700' : resultat.statut === 'exonere' ? 'text-amber-700' : 'text-slate-600')}>
                  {resultat.statut === 'imposable' ? 'Opération IMPOSABLE à la TVA' : resultat.statut === 'exonere' ? 'Opération EXONÉRÉE de TVA' : 'Opération HORS CHAMP de la TVA'}
                </span>
              </div>
              <p className="text-xs text-foreground">{resultat.explication}</p>
              <BadgeLoi loi={resultat.article} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 2 : ASSUJETTIS & SEUIL
// ─────────────────────────────────────────────────────────────────────────────
function OngletAssujettis() {
  const [ca, setCa] = useState('')
  const [res, setRes] = useState<null | { statut: string; detail: string; couleur: string }>(null)

  function evaluer() {
    const v = parseFloat(ca) || 0
    const seuil = 80_000_000
    if (v >= seuil) {
      setRes({ statut: 'Assujetti obligatoire', detail: `Votre CA annuel de ${formatFC(v)} est supérieur ou égal au seuil de ${formatFC(seuil)}. Vous êtes obligatoirement assujetti à la TVA. Vous devez souscrire une déclaration d\'assujettissement auprès de l\'Administration des Impôts avant le début de vos activités imposables.`, couleur: 'green' })
    } else if (v > 0) {
      setRes({ statut: 'Assujetti par option possible', detail: `Votre CA annuel de ${formatFC(v)} est inférieur au seuil de ${formatFC(seuil)}. Vous n\'êtes pas obligatoirement assujetti. Toutefois, vous pouvez opter volontairement pour le régime TVA. L\'option est accordée sur demande et est irrévocable pendant 2 ans. Passé ce délai, si votre CA reste inférieur au seuil, vous conservez votre qualité d\'assujetti pendant encore 2 ans après la constatation de la diminution.`, couleur: 'amber' })
    }
  }

  return (
    <div className="space-y-4">
      <DefinitionBox titre="Qui est assujetti à la TVA ? : Art. 13">
        <p className="text-xs text-foreground">Sont assujetties à la TVA les <strong>personnes physiques ou morales</strong>, y compris l'État et les organismes publics, qui effectuent de manière <strong>indépendante</strong>, à titre <strong>habituel ou occasionnel</strong>, des opérations économiques imposables.</p>
        <p className="text-xs text-muted-foreground mt-1">L'assujettissement s'applique quels que soient le statut juridique, la situation fiscale, la forme ou la nature des interventions.</p>
      </DefinitionBox>

      <div className="space-y-3">
        <SectionTitre texte="Seuil d'assujettissement" loi="Art. 14" />
        <div className="rounded-xl border border-rose-200 bg-rose-50 p-4 text-center">
          <p className="text-xs text-rose-600 uppercase font-semibold tracking-wider mb-1">Seuil obligatoire</p>
          <p className="text-2xl font-bold text-rose-700">80 000 000 FC</p>
          <p className="text-xs text-muted-foreground mt-1">Chiffre d'affaires annuel</p>
        </div>
        <div className="grid gap-2">
          <AlertInfo texte="Si le CA atteint le seuil en cours d'année : déclaration d'assujettissement avant le 15 du mois suivant celui au cours duquel le seuil a été dépassé. (Art. 55)" type="info" />
          <AlertInfo texte="Quand le CA devient inférieur au seuil : l'assujetti conserve sa qualité TVA pendant encore 2 ans après la constatation de la diminution. (Art. 14)" type="warning" />
        </div>
      </div>

      <div className="space-y-3">
        <SectionTitre texte="Non-assujettissement : Cas particuliers=" loi="Art. 13" />
        <div className="grid gap-2">
          {[
            { titre: 'Personnes morales de droit public', desc: 'Non assujetties pour leurs activités administratives, sociales, éducatives, culturelles et sportives : à condition que leur non-assujettissement ne crée pas de distorsion de concurrence.' },
            { titre: 'Salariés et travailleurs dépendants', desc: 'Les personnes qui exercent une activité dans un lien de subordination (contrat de travail) ne sont pas considérées comme effectuant des activités économiques indépendantes.' },
          ].map((cas, i) => (
            <div key={i} className="rounded-lg border border-border/60 bg-card p-3">
              <p className="text-xs font-semibold text-foreground">{cas.titre}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{cas.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <SectionTitre texte="Simulateur : Suis-je assujetti ?" />
        <div className="rounded-xl border border-border/60 bg-card p-4 space-y-3">
          <label className="block text-xs font-medium text-foreground">Chiffre d'affaires annuel (FC)</label>
          <input type="number" value={ca} onChange={e => { setCa(e.target.value); setRes(null) }} placeholder="Ex : 120 000 000"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          <div className="flex gap-2"><BtnCalculer onClick={evaluer} /><BtnReset onClick={() => { setCa(''); setRes(null) }} /></div>
          {res && (
            <div className={cn('rounded-xl border p-3.5 space-y-2', res.couleur === 'green' ? 'border-green-200 bg-green-50' : 'border-amber-200 bg-amber-50')}>
              <p className={cn('text-sm font-bold', res.couleur === 'green' ? 'text-green-700' : 'text-amber-700')}>{res.statut}</p>
              <p className="text-xs text-foreground">{res.detail}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 3 : EXONÉRATIONS
// ─────────────────────────────────────────────────────────────────────────────
function OngletExonerations() {
  const [ongletEx, setOngletEx] = useState<'biens' | 'services' | 'speciales'>('biens')
  const [recherche, setRecherche] = useState('')
  const [selection, setSelection] = useState<any>(null)

  const listes = { biens: CATALOGUE_EXONERATIONS_BIENS, services: CATALOGUE_EXONERATIONS_SERVICES, speciales: CATALOGUE_EXONERATIONS_TAXATIONS_SPECIALES }
  const liste = listes[ongletEx].filter(it => it.label.toLowerCase().includes(recherche.toLowerCase()) || it.code.toLowerCase().includes(recherche.toLowerCase()))

  return (
    <div className="space-y-4">
      <DefinitionBox titre="Principe des exonérations : Art. 15–20">
        <p className="text-xs text-foreground">Certaines opérations sont exonérées de TVA, ce qui signifie que le vendeur/prestataire <strong>ne collecte pas de TVA</strong>. Attention : l'exonération peut entraîner la <strong>perte du droit à déduction</strong> de la TVA payée en amont.</p>
        <p className="text-xs text-muted-foreground mt-1"><strong>Règle importante (Art. 20) :</strong> Aucune exonération ne peut être accordée en dehors de celles prévues aux articles 15 à 19. Tout texte particulier prétendant accorder une exonération est sans effet.</p>
      </DefinitionBox>

      <div className="flex gap-1 rounded-xl border border-border bg-muted/30 p-2">
        {[
          { id: 'biens', label: 'Biens (Art. 15)', n: CATALOGUE_EXONERATIONS_BIENS.length },
          { id: 'services', label: 'Services (Art. 17)', n: CATALOGUE_EXONERATIONS_SERVICES.length },
          { id: 'speciales', label: 'Taxations spécifiques (Art. 18)', n: CATALOGUE_EXONERATIONS_TAXATIONS_SPECIALES.length },
        ].map(t => (
          <button key={t.id} onClick={() => { setOngletEx(t.id as any); setRecherche(''); setSelection(null) }}
            className={cn('flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors', ongletEx === t.id ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground')}>
            {t.label} <span className="ml-1 opacity-60">({t.n})</span>
          </button>
        ))}
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input value={recherche} onChange={e => setRecherche(e.target.value)} placeholder="Rechercher une exonération..."
          className="w-full rounded-lg border border-border bg-background pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      <div className="space-y-1.5 max-h-80 overflow-y-auto">
        {liste.map(it => (
          <button key={it.code} onClick={() => setSelection(selection?.code === it.code ? null : it)}
            className={cn('w-full rounded-lg border p-3 text-left transition-colors', selection?.code === it.code ? 'border-amber-300 bg-amber-50' : 'border-border/60 bg-card hover:bg-muted/30')}>
            <div className="flex items-start gap-2">
              <span className="text-xs font-mono text-primary/70 shrink-0 mt-0.5">{it.code}</span>
              <span className="text-xs text-foreground flex-1">{it.label}</span>
              <BadgeLoi loi={it.article} />
            </div>
          </button>
        ))}
        {liste.length === 0 && <p className="text-center text-sm text-muted-foreground py-4">Aucune exonération trouvée</p>}
      </div>

      {selection && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 space-y-2">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-amber-600" />
            <p className="text-sm font-bold text-amber-700">Opération exonérée de TVA</p>
          </div>
          <p className="text-xs text-foreground font-medium">{selection.label}</p>
          <BadgeLoi loi={selection.article} />
          <AlertInfo texte="Cette opération est exonérée : aucune TVA n'est collectée sur la vente. Attention : si l'opération est exonérée, la TVA payée en amont (sur les achats liés à cette opération) ne peut généralement pas être déduite. Seul le prorata s'applique si vous avez des activités mixtes.=" type="warning" />
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 4 : TAUX & BASE D'IMPOSITION
// ─────────────────────────────────────────────────────────────────────────────
// Sélection du taux : mêmes couleurs partout où le module affiche les 4 taux.
const TAUX_CONFIG: { v: '16' | '1' | '5' | '0'; label: string; sublabel: string; color: string; activeBg: string; activeTxt: string; borderActive: string; inactiveBg: string; inactiveBorder: string }[] = [
  { v: '16', label: '16%', sublabel: 'Normal',  color: 'text-rose-600',   activeBg: 'bg-rose-600',   activeTxt: 'text-white', borderActive: 'border-rose-600',   inactiveBg: 'bg-rose-50',   inactiveBorder: 'border-rose-200' },
  { v: '1',  label: '1%',  sublabel: 'Réduit',  color: 'text-orange-600', activeBg: 'bg-orange-500', activeTxt: 'text-white', borderActive: 'border-orange-500', inactiveBg: 'bg-orange-50', inactiveBorder: 'border-orange-200' },
  { v: '5',  label: '5%',  sublabel: 'Réduit',  color: 'text-amber-600',  activeBg: 'bg-amber-500',  activeTxt: 'text-white', borderActive: 'border-amber-500',  inactiveBg: 'bg-amber-50',  inactiveBorder: 'border-amber-200' },
  { v: '0',  label: '0%',  sublabel: 'Export',  color: 'text-blue-600',   activeBg: 'bg-blue-600',   activeTxt: 'text-white', borderActive: 'border-blue-600',   inactiveBg: 'bg-blue-50',   inactiveBorder: 'border-blue-200' },
]

// Catalogue d'opérations imposables par taux (pour affichage déroulant, onglet consultation)
const CATALOGUE_PAR_TAUX: Record<'16' | '1' | '5' | '0', { code: string; label: string; ref?: string }[]> = {
  '16': CATALOGUE_TAUX_16.map(it => ({ code: it.code, label: it.label, ref: '' })),
  '1':  CATALOGUE_TAUX_1.map(it => ({ code: it.code, label: it.label, ref: it.taux })),
  '5':  CATALOGUE_TAUX_5.map(it => ({ code: it.code, label: it.label, ref: it.taux })),
  '0':  CATALOGUE_TAUX_0.map(it => ({ code: it.code, label: it.label, ref: it.article })),
}

// Formules de calcul extraites du CGI (Art. 27 à 35, Ordonnance-Loi n° 10/001 du 20/08/2010),
// une par type d'opération, groupées par taux (onglet calculateur)
type TypeOpTVA = 'standard' | 'import' | 'occasion' | 'agence' | 'transitaire' | 'T16-03' | 'T16-08' | 'T16-13' | 'EX-01'
const OPS_PAR_TAUX: Record<'16' | '1' | '5' | '0', { value: TypeOpTVA; label: string; ref: string; formule: string; loi: string }[]> = {
  '16': [
    {
      value: 'standard',
      label: 'Livraison de biens / Prestation de services standard',
      ref: 'Art. 27 §4–5',
      formule: 'Base HT = toutes sommes ou valeurs reçues en contrepartie (prix convenu, subventions incluses, frais accessoires inclus) | TVA = Base HT × 16% | TTC = Base HT + TVA',
      loi: 'Art. 27 al. 1 + §4 (livraison biens) + §5 (prestation services) : CGI RDC (OL 10/001 du 20/08/2010)'
    },
    {
      value: 'import',
      label: 'Importation de biens (base CIF + droits)',
      ref: 'Art. 27 §1',
      formule: 'Base = Valeur CIF + Droits d\'entrée douaniers + Droits de consommation (le cas échéant) | TVA = Base × 16% | Collectée par la Douane lors de la déclaration de mise à la consommation',
      loi: 'Art. 27 §1 CGI RDC : « la valeur CIF majorée des droits d\'entrée et, le cas échéant, des droits de consommation, pour les produits importés »'
    },
    {
      value: 'T16-03',
      label: 'Travaux immobiliers (construction, rénovation)',
      ref: 'Art. 27 §7',
      formule: 'Base = Montant du marché / mémoire / facture HT | TVA = Montant HT × 16% | TTC = Montant HT + TVA | Exigibilité : encaissement ou débit (sur option DGI)',
      loi: 'Art. 27 §7 CGI RDC : « le montant de marchés, mémoires ou factures, pour les travaux immobiliers »'
    },
    {
      value: 'T16-08',
      label: 'Crédit-bail mobilier / immobilier (leasing)',
      ref: 'Art. 27 §11',
      formule: 'Base = Montant des loyers facturés par la société de crédit-bail | TVA = Loyers HT × 16% | TTC = Loyers HT + TVA | Note : le prix d\'option d\'achat est aussi imposable le cas échéant',
      loi: 'Art. 27 §11 CGI RDC : « le montant des loyers facturés par les sociétés de crédit-bail, pour les opérations de crédit-bail »'
    },
    {
      value: 'T16-13',
      label: 'Vente immobilière par promoteur immobilier',
      ref: 'Art. 27 §4 + Art. 24 §6',
      formule: 'Base = Prix de vente HT de l\'immeuble (toutes sommes reçues en contrepartie de la livraison) | TVA = Prix HT × 16% | TTC = Prix HT + TVA | Note : cessions par non-promoteurs → hors TVA, soumises aux droits d\'enregistrement (Art. 15-7)',
      loi: 'Art. 27 §4 CGI RDC + Art. 24 §6 : promoteurs immobiliers soumis à la TVA sur les ventes d\'immeubles neufs'
    },
    {
      value: 'occasion',
      label: 'Biens d\'occasion acquis auprès d\'un non-assujetti (régime marge)',
      ref: 'Art. 31',
      formule: 'Base = Prix de vente − Prix d\'achat auprès du non-assujetti (marge brute) | TVA = Marge × 16% | Si marge ≤ 0 : TVA = 0 | Attention : déduction TVA amont impossible sur ces achats',
      loi: 'Art. 31 CGI RDC : « lorsqu\'il s\'agit de biens acquis auprès de non-assujettis, ces négociants doivent payer la taxe sur la valeur ajoutée sur la différence entre le prix de vente et le prix de revient »'
    },
    {
      value: 'agence',
      label: 'Agence de voyages / Organisateur de circuits touristiques (marge)',
      ref: 'Art. 32',
      formule: 'Base = Prix total payé par le client − Total factures fournisseurs (transport, hôtel, restauration, spectacles…) | TVA = Marge × 16% | Note : aucune déduction TVA sur les achats fournisseurs (Art. 33)',
      loi: 'Art. 32 CGI RDC : « la base est constituée par la différence entre le prix total payé par le client et le prix facturé à l\'agence par les entrepreneurs de transports, hôteliers, restaurateurs… »'
    },
    {
      value: 'transitaire',
      label: 'Transitaire / Commissionnaire en douane (rémunération nette)',
      ref: 'Art. 34',
      formule: 'Base = Total sommes encaissées TTC − TVA incluse − Débours (transport + dédouanement, sur justificatifs) | TVA incluse extraite = Encaissements TTC × 16/116 | TVA = Base nette HT × 16%',
      loi: 'Art. 34 CGI RDC : « la rémunération brute, comprenant la totalité des sommes encaissées, déduction faite de la TVA et des seuls débours afférents au transport lui-même ainsi que de ceux payés à l\'occasion du dédouanement, pourvu que lesdits débours soient justifiés »'
    },
  ],
  '1': [
    {
      value: 'standard',
      label: 'Produit à taux réduit 1% (24 produits de 1ère nécessité + matières premières industrielles + agriculture/ciment/construction publique)',
      ref: 'Art. 35 al. 2',
      formule: 'Base HT = Prix de vente HT ou valeur CIF + droits si importation | TVA = Base HT × 1% | TTC = Base HT + TVA | Applicable aux produits figurant dans la liste tarifaire de l\'Art. 35 (viandes, poissons, riz, sucre, lait, eau, sel, savon, allumettes) ainsi qu\'aux matières premières industrielles brutes (cuivre, étain, plomb, aluminium, zinc), aux intrants agricoles/agro-industriels, aux intrants du ciment local et aux matériaux/services de construction des projets publics d\'infrastructures',
      loi: 'Art. 35 CGI RDC modifié par l\'Art. 46 de la LF n° 25/060 du 29/12/2025 (LF 2026), en vigueur depuis le 1er janvier 2026 : l\'ancien taux réduit unique de 8% est supprimé et remplacé par 1% pour ces opérations'
    },
  ],
  '5': [
    {
      value: 'standard',
      label: 'Billets d\'avion sur le trafic aérien national (taux réduit 5%)',
      ref: 'Art. 35 al. 2',
      formule: 'Base HT = Prix du billet HT | TVA = Base HT × 5% | TTC = Base HT + TVA | Seul cas visé par le taux de 5% depuis la LF 2026',
      loi: 'Art. 35 CGI RDC modifié par l\'Art. 46 de la LF n° 25/060 du 29/12/2025 (LF 2026), en vigueur depuis le 1er janvier 2026 : le taux de 5% est réservé au seul cas de la vente de billets d\'avion sur le trafic aérien national'
    },
  ],
  '0': [
    {
      value: 'EX-01',
      label: 'Exportation de marchandises hors RDC (taux zéro)',
      ref: 'Art. 35 al. 3 + Art. 7',
      formule: 'Base = Valeur FOB (Franco à Bord) | TVA = Base × 0% = 0 FC | Aucune TVA facturée sur l\'exportation | DROIT À DÉDUCTION MAINTENU : la TVA payée sur les achats liés à cette exportation reste déductible | Remboursement du crédit TVA possible, sous condition d\'effectivité de l\'export (Art. 39) - voir Art. 63-64 pour le remboursement lui-même',
      loi: 'Art. 35 al. 3 CGI RDC : taux 0% applicable aux exportations et opérations assimilées (Art. 7). Art. 27 §2 : base = valeur FOB pour les exportations de marchandises'
    },
  ],
}

function getOpTypeTVA(code: TypeOpTVA): string {
  if (['import', 'occasion', 'agence', 'transitaire'].includes(code)) return code
  if (code === 'T16-03') return 'travaux_immo'
  if (code === 'T16-08') return 'credit_bail'
  if (code === 'T16-13') return 'promoteur'
  if (code === 'EX-01') return 'export_fob'
  return 'standard'
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET : TAUX APPLICABLES - consultation (Art. 27, 35)
// ─────────────────────────────────────────────────────────────────────────────
// ─────────────────────────────────────────────────────────────────────────────
// ONGLET : TAUX & BASE (Art. 27-35) - consultation + calculateur, un seul taux
// partagé entre les deux sous-vues pour ne jamais avoir à le rechoisir.
// ─────────────────────────────────────────────────────────────────────────────
function OngletTauxBase() {
  type Taux = '16' | '1' | '5' | '0'
  const [vue, setVue] = useState<'consultation' | 'calculateur'>('consultation')
  const [taux, setTaux] = useState<Taux>('16')
  const [, setShowCatalogue] = useState(false)
  const [typeOp, setTypeOp] = useState<TypeOpTVA>('standard')
  const [baseHT, setBaseHT] = useState('')
  const [cifVal, setCifVal] = useState('')
  const [droitsEntree, setDroitsEntree] = useState('')
  const [droitsConsommation, setDroitsConsommation] = useState('')
  const [prixVente, setPrixVente] = useState('')
  const [prixAchat, setPrixAchat] = useState('')
  const [prixClient, setPrixClient] = useState('')
  const [factureFournisseurs, setFactureFournisseurs] = useState('')
  const [remunerationBrute, setRemunerationBrute] = useState('')
  const [debours, setDebours] = useState('')
  const [montantMarche, setMontantMarche] = useState('')
  const [loyers, setLoyers] = useState('')
  const [prixVenteProm, setPrixVenteProm] = useState('')
  const [valeurFOB, setValeurFOB] = useState('')
  const [res, setRes] = useState<null | any>(null)

  const tauxNum = taux === '16' ? 0.16 : taux === '1' ? 0.01 : taux === '5' ? 0.05 : 0

  function handleTauxChange(t: Taux) {
    setTaux(t)
    setRes(null)
    setShowCatalogue(false)
    const firstOp = OPS_PAR_TAUX[t][0]?.value
    if (firstOp) setTypeOp(firstOp)
  }

  function calculer() {
    let base = 0, tvaCalc = 0, detail: any[] = []
    const opType = getOpTypeTVA(typeOp)

    if (opType === 'travaux_immo') {
      base = parseFloat(montantMarche) || 0
      tvaCalc = base * tauxNum
      detail = [
        { label: 'Montant marché / mémoire / facture HT', val: formatFC(base), signe: '=' as const },
        { label: 'Taux TVA applicable', val: '16%', signe: '×' as const },
        { label: 'TVA sur travaux immobiliers', val: formatFC(tvaCalc), signe: '=' as const, bold: true, accent: true },
        { label: 'Montant TTC', val: formatFC(base + tvaCalc), signe: '+' as const, bold: true },
      ]
    } else if (opType === 'credit_bail') {
      base = parseFloat(loyers) || 0
      tvaCalc = base * tauxNum
      detail = [
        { label: 'Loyers facturés HT', val: formatFC(base), signe: '=' as const },
        { label: 'Taux TVA applicable', val: '16%', signe: '×' as const },
        { label: 'TVA sur crédit-bail', val: formatFC(tvaCalc), signe: '=' as const, bold: true, accent: true },
        { label: 'Loyer TTC', val: formatFC(base + tvaCalc), signe: '+' as const, bold: true },
      ]
    } else if (opType === 'promoteur') {
      base = parseFloat(prixVenteProm) || 0
      tvaCalc = base * tauxNum
      detail = [
        { label: 'Prix de vente HT immeuble', val: formatFC(base), signe: '=' as const },
        { label: 'Taux TVA applicable', val: '16%', signe: '×' as const },
        { label: 'TVA immobilière promoteur', val: formatFC(tvaCalc), signe: '=' as const, bold: true, accent: true },
        { label: 'Prix TTC', val: formatFC(base + tvaCalc), signe: '+' as const, bold: true },
      ]
    } else if (opType === 'export_fob') {
      base = parseFloat(valeurFOB) || 0
      tvaCalc = 0
      detail = [
        { label: 'Valeur FOB (Franco à Bord)', val: formatFC(base), signe: '=' as const },
        { label: 'Taux TVA exportation', val: '0%', signe: '×' as const },
        { label: 'TVA = 0 (taux zéro légal)', val: formatFC(0), signe: '=' as const, bold: true, accent: true },
      ]
    } else if (opType === 'standard') {
      base = parseFloat(baseHT) || 0
      tvaCalc = base * tauxNum
      detail = [
        { label: 'Base hors taxe', val: formatFC(base), signe: '=' as const },
        { label: `Taux TVA applicable`, val: `${taux}%`, signe: '×' as const },
        { label: 'TVA calculée', val: formatFC(tvaCalc), signe: '=' as const, bold: true, accent: true },
        { label: 'Prix TTC', val: formatFC(base + tvaCalc), signe: '+' as const, bold: true },
      ]
    } else if (opType === 'import') {
      const cif = parseFloat(cifVal) || 0
      const de  = parseFloat(droitsEntree) || 0
      const dc  = parseFloat(droitsConsommation) || 0
      base = cif + de + dc
      tvaCalc = base * tauxNum
      detail = [
        { label: 'Valeur CIF', val: formatFC(cif), signe: '+' as const },
        { label: 'Droits d\'entrée (douane)', val: formatFC(de), signe: '+' as const },
        { label: 'Droits de consommation', val: formatFC(dc), signe: '+' as const },
        { label: 'Base d\'imposition TVA', val: formatFC(base), signe: '=' as const, bold: true },
        { label: `Taux TVA (${taux}%)`, val: '', signe: '×' as const },
        { label: 'TVA à l\'importation', val: formatFC(tvaCalc), signe: '=' as const, bold: true, accent: true },
      ]
    } else if (opType === 'occasion') {
      const pv = parseFloat(prixVente) || 0
      const pa = parseFloat(prixAchat) || 0
      base = Math.max(0, pv - pa)
      tvaCalc = base * tauxNum
      detail = [
        { label: 'Prix de vente', val: formatFC(pv), signe: '+' as const },
        { label: 'Prix d\'achat (non-assujetti)', val: formatFC(pa), signe: '−' as const },
        { label: 'Marge (base d\'imposition)', val: formatFC(base), signe: '=' as const, bold: true },
        { label: `Taux TVA (${taux}%)`, val: '', signe: '×' as const },
        { label: 'TVA sur la marge', val: formatFC(tvaCalc), signe: '=' as const, bold: true, accent: true },
      ]
    } else if (opType === 'agence') {
      const pc = parseFloat(prixClient) || 0
      const ff = parseFloat(factureFournisseurs) || 0
      base = Math.max(0, pc - ff)
      tvaCalc = base * tauxNum
      detail = [
        { label: 'Prix total payé par le client', val: formatFC(pc), signe: '+' as const },
        { label: 'Factures fournisseurs (transport, hôtel…)', val: formatFC(ff), signe: '−' as const },
        { label: 'Marge agence (base d\'imposition)', val: formatFC(base), signe: '=' as const, bold: true },
        { label: `Taux TVA (${taux}%)`, val: '', signe: '×' as const },
        { label: 'TVA agence de voyages', val: formatFC(tvaCalc), signe: '=' as const, bold: true, accent: true },
      ]
    } else if (opType === 'transitaire') {
      const rb = parseFloat(remunerationBrute) || 0
      const db = parseFloat(debours) || 0
      const tvaDb = rb * tauxNum / (1 + tauxNum)
      base = rb - db - tvaDb
      tvaCalc = base * tauxNum
      detail = [
        { label: 'Total sommes encaissées TTC', val: formatFC(rb), signe: '+' as const },
        { label: 'TVA incluse', val: formatFC(tvaDb), signe: '−' as const },
        { label: 'Débours (transport, dédouanement)', val: formatFC(db), signe: '−' as const },
        { label: 'Rémunération nette HT', val: formatFC(base), signe: '=' as const, bold: true },
        { label: `Taux TVA (${taux}%)`, val: '', signe: '×' as const },
        { label: 'TVA du transitaire', val: formatFC(tvaCalc), signe: '=' as const, bold: true, accent: true },
      ]
    }
    setRes({ base, tvaCalc, ttc: base + tvaCalc, detail, typeOp, taux })
  }

  const resetAll = () => {
    setBaseHT(''); setCifVal(''); setDroitsEntree(''); setDroitsConsommation('')
    setPrixVente(''); setPrixAchat(''); setPrixClient(''); setFactureFournisseurs('')
    setRemunerationBrute(''); setDebours(''); setMontantMarche(''); setLoyers('')
    setPrixVenteProm(''); setValeurFOB(''); setRes(null)
  }

  const cls = 'w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30'

  return (
    <div className="space-y-4">
      <DefinitionBox titre="Base d'imposition : Art. 27">
        <p className="text-xs text-muted-foreground">Toutes les sommes, valeurs, biens ou services reçus <strong>en contrepartie</strong> de l'opération, y compris subventions et tous frais, impôts, droits et taxes, à l'<strong>exclusion de la TVA elle-même</strong>.</p>
      </DefinitionBox>

      {/* ── Résumé des 4 taux (LF 2026 : ex-8% remplacé par 1%/5%) ── */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {[
          { taux: '16%', sublabel: 'Normal',  couleur: 'rose',   desc: 'Toutes opérations imposables' },
          { taux: '1%',  sublabel: 'Réduit',  couleur: 'orange', desc: '24 produits 1ère nécessité + matières premières industrielles + agriculture/ciment/construction publique' },
          { taux: '5%',  sublabel: 'Réduit',  couleur: 'amber',  desc: 'Billets d\'avion - trafic aérien national' },
          { taux: '0%',  sublabel: 'Export',  couleur: 'blue',   desc: 'Exportations - droit à déduction' },
        ].map(t => (
          <div key={t.taux} className={cn(
            'rounded-lg border p-3 text-center flex flex-col items-center justify-center gap-0.5',
            t.couleur === 'rose'   ? 'border-rose-200 bg-rose-50' :
            t.couleur === 'orange' ? 'border-orange-200 bg-orange-50' :
            t.couleur === 'amber'  ? 'border-amber-200 bg-amber-50' :
                                     'border-blue-200 bg-blue-50'
          )}>
            <p className={cn('text-xl font-bold leading-none',
              t.couleur === 'rose'   ? 'text-rose-600' :
              t.couleur === 'orange' ? 'text-orange-600' :
              t.couleur === 'amber'  ? 'text-amber-600' :
                                       'text-blue-600'
            )}>{t.taux}</p>
            <p className="text-xs font-semibold text-foreground/70">{t.sublabel}</p>
            <p className="text-xs text-muted-foreground leading-tight text-center">{t.desc}</p>
          </div>
        ))}
      </div>

      {/* ── Sélecteur de taux, partagé par les deux sous-vues ── */}
      <div className="grid grid-cols-4 gap-1.5">
        {TAUX_CONFIG.map(t => (
          <button
            key={t.v}
            onClick={() => handleTauxChange(t.v)}
            className={cn(
              'rounded-lg border py-3 transition-all flex flex-col items-center justify-center gap-0.5',
              taux === t.v
                ? `${t.activeBg} ${t.activeTxt} ${t.borderActive} shadow-sm`
                : `${t.inactiveBg} ${t.inactiveBorder} hover:brightness-95`
            )}
          >
            <p className={cn('text-sm font-bold leading-none', taux === t.v ? 'text-white' : t.color)}>{t.label}</p>
            <p className={cn('text-xs mt-0.5 leading-none', taux === t.v ? 'text-white/80' : 'text-muted-foreground')}>{t.sublabel}</p>
          </button>
        ))}
      </div>

      {/* ── Sous-onglets : consultation du catalogue / calculateur ── */}
      <div className="flex gap-1 rounded-xl border border-border bg-muted/30 p-2">
        <button onClick={() => setVue('consultation')}
          className={cn('flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors', vue === 'consultation' ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground')}>
          Opérations imposables à {taux}%
        </button>
        <button onClick={() => setVue('calculateur')}
          className={cn('flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors', vue === 'calculateur' ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground')}>
          Calculateur de base
        </button>
      </div>

      {vue === 'consultation' && (
        <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
          <div className="px-4 py-3 border-b border-border/40 bg-muted/30">
            <p className="text-xs font-bold text-foreground uppercase tracking-wide">Opérations imposables à {taux}% <span className="font-normal text-muted-foreground ml-1">Art. 35</span></p>
          </div>
          <div className="max-h-96 overflow-y-auto divide-y divide-border/30">
            {CATALOGUE_PAR_TAUX[taux].map((it, i) => (
              <div key={i} className="flex items-start gap-2.5 px-3 py-2 hover:bg-muted/30 transition-colors">
                <span className="text-xs font-mono text-primary/60 shrink-0 pt-0.5 min-w-[52px]">{it.code}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-foreground leading-snug">{it.label}</p>
                  {it.ref && <p className="text-xs text-muted-foreground/70 mt-0.5">{it.ref}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {vue === 'calculateur' && (
        <div className="rounded-xl border border-border/60 bg-card overflow-hidden">
          <div className="p-4 space-y-4">
            <div>
              <p className="text-xs font-semibold text-muted-foreground mb-1.5 uppercase tracking-wide">Type d'opération, au taux de {taux}%</p>
              <select
                value={typeOp}
                onChange={e => { setTypeOp(e.target.value as TypeOpTVA); setRes(null) }}
                className={cls}
              >
                {OPS_PAR_TAUX[taux].map(op => (
                  <option key={op.value} value={op.value}>{op.label} - {op.ref}</option>
                ))}
              </select>
              {(() => {
                const opSelected = OPS_PAR_TAUX[taux].find(op => op.value === typeOp)
                if (!opSelected) return null
                return (
                  <div className="mt-2 rounded-lg border border-primary/20 bg-primary/5 p-3 space-y-1.5">
                    <p className="text-xs font-semibold text-primary/80 uppercase tracking-wide">Formule de calcul - {opSelected.ref}</p>
                    <div className="space-y-1">
                      {opSelected.formule.split(' | ').map((ligne, i) => (
                        <p key={i} className={cn('text-xs', i === 0 ? 'text-foreground font-medium' : 'text-muted-foreground')}>
                          {i > 0 && <span className="text-primary/60 mr-1">→</span>}{ligne}
                        </p>
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground/70 italic border-t border-border/30 pt-1.5 mt-1.5">
                      {opSelected.loi}
                    </p>
                  </div>
                )
              })()}
            </div>

            {(() => {
              const opType = getOpTypeTVA(typeOp)
              const field = (label: string, ref: string, val: string, setter: (v: string) => void, placeholder: string) => (
                <div>
                  <div className="flex items-baseline justify-between mb-1">
                    <label className="text-xs font-medium text-foreground">{label}</label>
                    <span className="text-xs text-muted-foreground/70">{ref}</span>
                  </div>
                  <input type="number" value={val} onChange={e => { setter(e.target.value); setRes(null) }} placeholder={placeholder} className={cls} />
                </div>
              )
              const note = (text: string) => <p className="text-xs text-muted-foreground/80 italic">{text}</p>

              if (opType === 'standard') return field('Base hors taxe (FC)', 'Art. 27', baseHT, setBaseHT, 'Ex : 1 000 000')
              if (opType === 'travaux_immo') return field('Montant marché / mémoire / facture HT (FC)', 'Art. 27 §7', montantMarche, setMontantMarche, 'Ex : 5 000 000')
              if (opType === 'credit_bail') return field('Loyers facturés HT (FC)', 'Art. 27 §11', loyers, setLoyers, 'Ex : 800 000')
              if (opType === 'promoteur') return field('Prix de vente HT immeuble (FC)', 'Art. 27 §4 + Art. 24 §6', prixVenteProm, setPrixVenteProm, 'Ex : 50 000 000')
              if (opType === 'export_fob') return field('Valeur FOB - Franco à Bord (FC)', 'Art. 27 §2', valeurFOB, setValeurFOB, 'Ex : 10 000 000')
              if (opType === 'import') return (
                <div className="space-y-3">
                  {field('Valeur CIF (Coût + Assurance + Fret)', 'Art. 27 §1', cifVal, setCifVal, 'Valeur CIF')}
                  {field('Droits d\'entrée douaniers (FC)', 'Tarif douanier', droitsEntree, setDroitsEntree, 'Droits de douane')}
                  {field('Droits de consommation (FC)', 'Si applicable', droitsConsommation, setDroitsConsommation, 'Droits de consommation')}
                  {note('Base = CIF + Droits d\'entrée + Droits de consommation')}
                </div>
              )
              if (opType === 'occasion') return (
                <div className="space-y-3">
                  {field('Prix de vente (FC)', 'Art. 31', prixVente, setPrixVente, 'Prix de vente')}
                  {field('Prix d\'achat auprès du non-assujetti (FC)', 'Art. 31', prixAchat, setPrixAchat, 'Prix d\'achat')}
                  {note('Base d\'imposition = Prix de vente − Prix d\'achat (marge brute)')}
                </div>
              )
              if (opType === 'agence') return (
                <div className="space-y-3">
                  {field('Prix total payé par le client (FC)', 'Art. 32', prixClient, setPrixClient, 'Prix client')}
                  {field('Total factures fournisseurs (FC)', 'Art. 32', factureFournisseurs, setFactureFournisseurs, 'Factures fournisseurs')}
                  {note('Base = Prix client − Factures fournisseurs (marge de l\'agence)')}
                </div>
              )
              if (opType === 'transitaire') return (
                <div className="space-y-3">
                  {field('Total sommes encaissées TTC (FC)', 'Art. 34', remunerationBrute, setRemunerationBrute, 'Total encaissé TTC')}
                  {field('Débours (transport + dédouanement) (FC)', 'Art. 34', debours, setDebours, 'Débours justifiés')}
                  {note('Base = Rémunération brute − Débours − TVA incluse')}
                </div>
              )
              return null
            })()}

            <div className="flex gap-2">
              <BtnCalculer onClick={calculer} />
              <BtnReset onClick={resetAll} />
            </div>

            {res && (
              <ResultatWrap titre="Calcul TVA">
                <EtapeResultat numero={1} titre="Détail du calcul">
                  {res.detail.map((l: any, i: number) => (
                    <LigneR key={i} signe={l.signe} label={l.label} val={l.val} bold={l.bold} accent={l.accent} neg={l.neg} />
                  ))}
                </EtapeResultat>
                <div className="grid grid-cols-2 gap-2">
                  <BoxFinal label="TVA collectée" val={formatFC(res.tvaCalc)} />
                  {res.taux !== '0' && <BoxFinal label="Prix TTC" val={formatFC(res.base + res.tvaCalc)} />}
                  {res.taux === '0' && <BoxFinal label="TVA = 0 FC - Taux zéro" val="Exportation" couleur="orange" />}
                </div>
                {res.taux === '0' && <AlertInfo texte="Au taux zéro, aucune TVA n'est facturée sur l'exportation. Vous conservez néanmoins votre droit à déduction de la TVA payée sur vos achats liés à cette exportation." type="success" />}
              </ResultatWrap>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 5 : DÉDUCTIONS
// ─────────────────────────────────────────────────────────────────────────────
function OngletDeductions() {
  const [lignes, setLignes] = useState<{ label: string; montantHT: string; montantTVA: string; code: string; deductible: boolean | null; article: string; pct: number }[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [rechercheAchat, setRechercheAchat] = useState('')
  const [res, setRes] = useState<null | any>(null)

  function ajouterDepuisCatalogue(it: any) {
    setLignes(p => [...p, { label: it.label, montantHT: '', montantTVA: '', code: it.code, deductible: it.deductible, article: it.article, pct: it.code === 'EXD-08' ? 50 : 100 }])
    setRes(null)
  }

  function updateLigne(i: number, f: string, v: string) {
    setLignes(p => p.map((l, idx) => idx === i ? { ...l, [f]: v } : l))
    setRes(null)
  }

  function calculer() {
    let totalDeductible = 0, totalExclu = 0
    const lignesCalc = lignes.map(l => {
      const tva = parseFloat(l.montantTVA) || 0
      const pct = l.pct / 100
      const deductible = l.deductible ? tva * pct : 0
      if (l.deductible) totalDeductible += deductible
      else totalExclu += tva
      return { ...l, tvaVal: tva, deductibleVal: deductible }
    })
    setRes({ lignesCalc, totalDeductible, totalExclu })
  }

  return (
    <div className="space-y-4">


      <DefinitionBox titre="Principe de déduction : Art. 36">
        <p className="text-xs text-foreground">La TVA qui a grevé en amont les éléments du prix d'une opération imposable est déductible. Les assujettis peuvent déduire de leur TVA collectée, la TVA payée sur leurs <strong>achats, importations et investissements</strong> liés à leur activité imposable.</p>
      </DefinitionBox>

      <div className="space-y-3">
        <SectionTitre texte="Ce qui ouvre droit à déduction" loi="Art. 36" />
        <div className="grid gap-1.5">
          {[
            { item: 'Matières premières et consommables entrant dans la composition des produits taxables', loi: 'Art. 36-1' },
            { item: 'Biens destinés à être revendus dans le cadre d\'une opération imposable', loi: 'Art. 36-2' },
            { item: 'Services entrant dans le prix de revient d\'opérations ouvrant droit à déduction', loi: 'Art. 36-3' },
            { item: 'Biens meubles, immeubles et services acquis pour les besoins de l\'exploitation (investissements + frais généraux)', loi: 'Art. 36-4' },
          ].map((it, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2">
              <CheckCircle2 className="h-3.5 w-3.5 text-green-600 shrink-0 mt-0.5" />
              <span className="text-xs text-foreground flex-1">{it.item}</span>
              <BadgeLoi loi={it.loi} />
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <SectionTitre texte="Conditions formelles de déductibilité" loi="Art. 37–40" />
        <div className="grid gap-1.5">
          {[
            { titre: 'Facture normalisée obligatoire (Art. 38)', desc: 'La TVA doit figurer sur une facture normalisée produite par les dispositifs électroniques fiscaux (DEF), avec le numéro impôt de l\'assujetti fournisseur. Pour les importations : déclaration douanière de mise à la consommation.' },
            { titre: 'Délai de déduction (Art. 37)', desc: 'Le droit à déduction doit être exercé au plus tard le 31 décembre de l\'année qui suit celle au cours de laquelle la taxe est devenue exigible. Passé ce délai, la TVA non déduite est définitivement acquise au Trésor.' },
            { titre: 'Stock lors de l\'entrée dans le régime TVA (Art. 40)', desc: 'La TVA sur les biens en stock (non immobilisations) à la date d\'entrée dans le régime TVA est déductible, à condition que ces biens soient destinés à des opérations imposables et que le stock ait fait l\'objet d\'une déclaration détaillée.' },
          ].map((c, i) => (
            <div key={i} className="rounded-lg border border-border/60 bg-card p-3">
              <p className="text-xs font-semibold text-foreground">{c.titre}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{c.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-3">
        <SectionTitre texte="Simulateur : Calcul TVA déductible" />
        <div className="rounded-xl border border-border/60 bg-card p-4 space-y-3">
          <button
            onClick={() => { setDropdownOpen(v => !v); setRechercheAchat('') }}
            className="w-full rounded-xl border border-dashed border-primary/40 bg-primary/5 p-3 text-sm font-medium text-primary hover:bg-primary/10 transition-colors flex items-center justify-center gap-2">
            {dropdownOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            {dropdownOpen ? 'Replier le catalogue' : '+ Ajouter un achat depuis le catalogue'}
          </button>
          {dropdownOpen && (() => {
            const filtresAchats = CATALOGUE_EXCLUSIONS_DEDUCTION.filter(it =>
              Object.values(it).some(v => String(v).toLowerCase().includes(rechercheAchat.toLowerCase()))
            )
            return (
              <div className="rounded-xl border border-border bg-background overflow-hidden">
                <div className="px-3 py-2 border-b border-border bg-muted/30">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
                    <input
                      autoFocus
                      placeholder="Rechercher un achat..."
                      value={rechercheAchat}
                      onChange={e => setRechercheAchat(e.target.value)}
                      className="w-full rounded-lg border border-border bg-background pl-8 pr-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30"
                    />
                  </div>
                </div>
                <div className="max-h-56 overflow-y-auto divide-y divide-border/30">
                  {filtresAchats.map((it, i) => (
                    <button key={i}
                      onClick={() => { ajouterDepuisCatalogue(it); setDropdownOpen(false); setRechercheAchat('') }}
                      className="w-full flex items-start gap-3 px-3 py-2.5 hover:bg-primary/5 text-left transition-colors group">
                      {it.code && <span className="text-xs font-mono text-primary/60 shrink-0 min-w-[60px] pt-0.5">{it.code}</span>}
                      <div className="flex-1 min-w-0">
                        <p className="text-xs text-foreground group-hover:text-primary transition-colors">{it.label || (it as any).designation}</p>
                        {(it as any).taux && <span className="inline-flex items-center rounded-full bg-rose-100 px-1.5 py-0.5 text-xs font-medium text-rose-700 mt-0.5">{(it as any).taux}</span>}
                        {it.article && <span className="ml-1 text-xs text-muted-foreground">{it.article}</span>}
                      </div>
                      <Plus className="h-3.5 w-3.5 text-muted-foreground/40 group-hover:text-primary shrink-0 mt-0.5 transition-colors" />
                    </button>
                  ))}
                  {filtresAchats.length === 0 && (
                    <p className="text-center text-xs text-muted-foreground py-4">Aucun résultat</p>
                  )}
                </div>
              </div>
            )
          })()}
          <p className="text-xs text-muted-foreground text-center">Le catalogue vérifie automatiquement si la TVA est déductible ou exclue</p>

          {lignes.length > 0 && (
            <div className="space-y-2">
              {lignes.map((l, i) => (
                <div key={i} className={cn('rounded-lg border p-3 space-y-2', l.deductible ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50')}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-medium text-foreground">{l.label}</p>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <BadgeLoi loi={l.article} />
                        {l.deductible ? (
                          l.pct < 100 ? <span className="text-xs text-amber-600 font-medium">Déductible à {l.pct}%</span>
                          : <span className="text-xs text-green-600 font-medium">✓ Déductible</span>
                        ) : <span className="text-xs text-red-600 font-medium">✗ Exclu du droit à déduction</span>}
                      </div>
                    </div>
                    <button onClick={() => { setLignes(p => p.filter((_, idx) => idx !== i)); setRes(null) }}
                      className="text-muted-foreground hover:text-red-500 shrink-0"><X className="h-3.5 w-3.5" /></button>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <label className="block text-xs text-muted-foreground mb-0.5">Montant HT (FC)</label>
                      <input type="number" value={l.montantHT} onChange={e => updateLigne(i, 'montantHT', e.target.value)} placeholder="Base HT="
                        className="w-full rounded border border-border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary/30" />
                    </div>
                    <div>
                      <label className="block text-xs text-muted-foreground mb-0.5">TVA sur facture (FC)</label>
                      <input type="number" value={l.montantTVA} onChange={e => updateLigne(i, 'montantTVA', e.target.value)} placeholder="TVA facturée"
                        className="w-full rounded border border-border bg-background px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary/30" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {lignes.length > 0 && (
            <div className="flex gap-2"><BtnCalculer onClick={calculer} /><BtnReset onClick={() => { setLignes([]); setRes(null) }} /></div>
          )}

          {res && (
            <ResultatWrap titre="TVA déductible calculée">
              <EtapeResultat numero={1} titre="Détail par achat=">
                {res.lignesCalc.map((l: any, i: number) => (
                  <div key={i} className="flex items-baseline justify-between gap-2">
                    <span className="text-xs text-muted-foreground flex-1 min-w-0 truncate">{l.label}</span>
                    <span className={cn('text-xs font-mono shrink-0', l.deductible ? 'text-green-600' : 'text-red-500 line-through opacity-60')}>
                      {formatFC(l.tvaVal)}
                      {l.deductible && l.pct < 100 && <span className="text-xs ml-1">× {l.pct}%</span>}
                    </span>
                  </div>
                ))}
              </EtapeResultat>
              <EtapeResultat numero={2} titre="Récapitulatif">
                <LigneR signe="+" label="TVA déductible" val={formatFC(res.totalDeductible)} />
                <LigneR signe="+" label="TVA exclue (non récupérable)" val={formatFC(res.totalExclu)} neg />
                <Separateur />
                <LigneR signe="=" label="Total TVA sur achats=" val={formatFC(res.totalDeductible + res.totalExclu)} bold />
              </EtapeResultat>
              <BoxFinal label="TVA déductible à reporter en onglet 6" val={formatFC(res.totalDeductible)} />
            </ResultatWrap>
          )}
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 6 : TVA NETTE DUE
// ─────────────────────────────────────────────────────────────────────────────
function OngletTVANette() {
  const [lignesCol, setLignesCol] = useState<{ label: string; baseHT: string; taux: string }[]>([
    { label: '', baseHT: '', taux: '16' }
  ])
  const [lignesDed, setLignesDed] = useState<{ label: string; baseHT: string; taux: string }[]>([
    { label: '', baseHT: '', taux: '16' }
  ])
  const [creditPrecedent, setCreditPrecedent] = useState('')
  const [mois, setMois] = useState('')
  const [annee, setAnnee] = useState(new Date().getFullYear().toString())
  const [res, setRes] = useState<null | any>(null)

  function addLigneCol() { setLignesCol(p => [...p, { label: '', baseHT: '', taux: '16' }]); setRes(null) }
  function addLigneDed() { setLignesDed(p => [...p, { label: '', baseHT: '', taux: '16' }]); setRes(null) }

  function calculer() {
    const tvaCollectee = lignesCol.reduce((s, l) => {
      const ht = parseFloat(l.baseHT) || 0
      const t = parseFloat(l.taux) / 100
      return s + ht * t
    }, 0)
    const tvaDeductible = lignesDed.reduce((s, l) => {
      const ht = parseFloat(l.baseHT) || 0
      const t = parseFloat(l.taux) / 100
      return s + ht * t
    }, 0)
    const credit = parseFloat(creditPrecedent) || 0
    // Art. 137, Décret n° 011/42 : le montant net à reverser (ou le crédit) est
    // arrondi selon la même mécanique en deux temps que l'IRPP/IS (Art. 150).
    const solde = arrondiTVA(tvaCollectee - tvaDeductible - credit)
    const moisLabel = mois ? `${mois}/${annee}` : annee

    // Date limite : 15 du mois suivant
    const moisNums: Record<string, string> = { '01': 'Février', '02': 'Mars', '03': 'Avril', '04': 'Mai', '05': 'Juin', '06': 'Juillet', '07': 'Août', '08': 'Septembre', '09': 'Octobre', '10': 'Novembre', '11': 'Décembre', '12': 'Janvier' }
    const dateLimit = mois ? `15 ${moisNums[mois]} ${mois === '12' ? parseInt(annee) + 1 : annee}` : '-'
    setRes({ tvaCollectee, tvaDeductible, credit, solde, moisLabel, dateLimit, lignesCol, lignesDed })
  }

  const MOIS = [
    { v: '01', l: 'Janvier' }, { v: '02', l: 'Février' }, { v: '03', l: 'Mars' }, { v: '04', l: 'Avril' },
    { v: '05', l: 'Mai' }, { v: '06', l: 'Juin' }, { v: '07', l: 'Juillet' }, { v: '08', l: 'Août' },
    { v: '09', l: 'Septembre' }, { v: '10', l: 'Octobre' }, { v: '11', l: 'Novembre' }, { v: '12', l: 'Décembre' },
  ]

  return (
    <div className="space-y-4">
      <DefinitionBox titre="Déclaration TVA mensuelle : Art. 60">
        <p className="text-xs text-foreground"><strong>TVA nette due = TVA collectée − TVA déductible − Crédit TVA du mois précédent</strong></p>
        <p className="text-xs text-muted-foreground mt-1">La déclaration mensuelle doit être souscrite au plus tard le <strong>15 du mois suivant</strong>, accompagnée du paiement. Elle est obligatoire même si aucune opération n'a été réalisée (mention "Néant").</p>
      </DefinitionBox>

      <div className="rounded-xl border border-border/60 bg-card p-4 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-xs font-medium mb-1">Mois déclaré</label>
            <select value={mois} onChange={e => { setMois(e.target.value); setRes(null) }}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30">
              <option value="">- Sélectionner -</option>
              {MOIS.map(m => <option key={m.v} value={m.v}>{m.l}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Année</label>
            <input type="number" value={annee} onChange={e => { setAnnee(e.target.value); setRes(null) }} className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>

        {/* TVA collectée */}
        <div>
          <p className="text-xs font-semibold text-green-700 uppercase mb-2">TVA collectée (sur ventes)</p>
          <div className="space-y-2">
            {lignesCol.map((l, i) => (
              <div key={i} className="grid grid-cols-[1fr_100px_60px_24px] gap-1.5 items-center">
                <input placeholder="Libellé de la vente=" value={l.label} onChange={e => { setLignesCol(p => p.map((r, idx) => idx === i ? { ...r, label: e.target.value } : r)); setRes(null) }}
                  className="min-w-0 rounded-lg border border-border bg-background px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input type="number" placeholder="Base HT=" value={l.baseHT} onChange={e => { setLignesCol(p => p.map((r, idx) => idx === i ? { ...r, baseHT: e.target.value } : r)); setRes(null) }}
                  className="min-w-0 rounded-lg border border-border bg-background px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <select value={l.taux} onChange={e => { setLignesCol(p => p.map((r, idx) => idx === i ? { ...r, taux: e.target.value } : r)); setRes(null) }}
                  className="min-w-0 rounded-lg border border-border bg-background px-1 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="16">16%</option>
                  <option value="1">1%</option>
                  <option value="5">5%</option>
                  <option value="0">0%</option>
                </select>
                {lignesCol.length > 1 && <button onClick={() => { setLignesCol(p => p.filter((_, idx) => idx !== i)); setRes(null) }} className="text-red-400 hover:text-red-600"><X className="h-3.5 w-3.5" /></button>}
              </div>
            ))}
          </div>
          <button onClick={addLigneCol} className="mt-2 text-xs text-primary/70 hover:text-primary flex items-center gap-1">+ Ajouter une ligne de vente</button>
        </div>

        {/* TVA déductible */}
        <div>
          <p className="text-xs font-semibold text-orange-700 uppercase mb-2">TVA déductible (sur achats)</p>
          <div className="space-y-2">
            {lignesDed.map((l, i) => (
              <div key={i} className="grid grid-cols-[1fr_100px_60px_24px] gap-1.5 items-center">
                <input placeholder="Libellé de l'achat" value={l.label} onChange={e => { setLignesDed(p => p.map((r, idx) => idx === i ? { ...r, label: e.target.value } : r)); setRes(null) }}
                  className="min-w-0 rounded-lg border border-border bg-background px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <input type="number" placeholder="Base HT=" value={l.baseHT} onChange={e => { setLignesDed(p => p.map((r, idx) => idx === i ? { ...r, baseHT: e.target.value } : r)); setRes(null) }}
                  className="min-w-0 rounded-lg border border-border bg-background px-2 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30" />
                <select value={l.taux} onChange={e => { setLignesDed(p => p.map((r, idx) => idx === i ? { ...r, taux: e.target.value } : r)); setRes(null) }}
                  className="rounded-lg border border-border bg-background px-1 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-primary/30">
                  <option value="16">16%</option>
                  <option value="1">1%</option>
                  <option value="5">5%</option>
                  <option value="0">0%</option>
                </select>
                {lignesDed.length > 1 && <button onClick={() => { setLignesDed(p => p.filter((_, idx) => idx !== i)); setRes(null) }} className="text-red-400 hover:text-red-600"><X className="h-3.5 w-3.5" /></button>}
              </div>
            ))}
          </div>
          <button onClick={addLigneDed} className="mt-2 text-xs text-primary/70 hover:text-primary flex items-center gap-1">+ Ajouter une ligne d'achat</button>
        </div>

        {/* Crédit précédent */}
        <div>
          <label className="block text-xs font-medium mb-1">Crédit TVA reporté du mois précédent (FC)</label>
          <input type="number" value={creditPrecedent} onChange={e => { setCreditPrecedent(e.target.value); setRes(null) }} placeholder="0 si aucun crédit"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        <div className="flex gap-2"><BtnCalculer onClick={calculer} /><BtnReset onClick={() => { setLignesCol([{ label: '', baseHT: '', taux: '16' }]); setLignesDed([{ label: '', baseHT: '', taux: '16' }]); setCreditPrecedent(''); setRes(null) }} /></div>

        {res && (
          <ResultatWrap titre={`Déclaration TVA${res.moisLabel ? ' : ' + res.moisLabel : ''}`}>
            <EtapeResultat numero={1} titre="Calcul de la TVA collectée">
              {res.lignesCol.filter((l: any) => l.baseHT && l.taux !== '0').map((l: any, i: number) => (
                <LigneR key={i} signe="+" label={`${l.label || 'Vente'} (${formatFC(parseFloat(l.baseHT) || 0)} HT × ${l.taux}%)`}
                  val={formatFC((parseFloat(l.baseHT) || 0) * parseFloat(l.taux) / 100)} indent />
              ))}
              <Separateur />
              <LigneR signe="=" label="Total TVA collectée" val={formatFC(res.tvaCollectee)} bold accent />
            </EtapeResultat>
            <EtapeResultat numero={2} titre="Calcul de la TVA déductible">
              {res.lignesDed && res.lignesDed.filter((l: any) => l.baseHT && l.taux !== '0').map((l: any, i: number) => (
                <LigneR key={i} signe="+" label={`${l.label || 'Achat'} (${formatFC(parseFloat(l.baseHT) || 0)} HT × ${l.taux}%)`}
                  val={formatFC((parseFloat(l.baseHT) || 0) * parseFloat(l.taux) / 100)} indent />
              ))}
              <Separateur />
              <LigneR signe="=" label="Total TVA déductible" val={formatFC(res.tvaDeductible)} bold accent />
            </EtapeResultat>
            <EtapeResultat numero={3} titre="Déduction et crédit reporté">
              <LigneR signe="+" label="TVA collectée" val={formatFC(res.tvaCollectee)} />
              <LigneR signe="−" label="TVA déductible (sur achats)" val={formatFC(res.tvaDeductible)} neg />
              {res.credit > 0 && <LigneR signe="−" label="Crédit TVA reporté du mois précédent" val={formatFC(res.credit)} neg />}
              <Separateur />
              <LigneR signe="=" label={res.solde >= 0 ? 'TVA nette due' : 'Crédit TVA'} val={formatFC(Math.abs(res.solde))} bold accent />
            </EtapeResultat>
            <div className="grid gap-2">
              <BoxFinal
                label={res.solde >= 0 ? 'TVA nette à verser au Trésor' : 'Crédit TVA à reporter'}
                sublabel={res.solde >= 0 ? `Date limite : ${res.dateLimit}` : 'Imputable sur la TVA du mois suivant'}
                val={formatFC(Math.abs(res.solde))}
                credit={res.solde < 0}
              />
            </div>
            {res.solde < 0 && <AlertInfo texte="Crédit TVA : non remboursable en principe. Il est reporté sur la déclaration du mois suivant jusqu'à épuisement. Remboursement possible uniquement pour les exportateurs, investissements lourds (≥ 1 milliard FC), entreprises minières/pétrolières, ou en cessation d'activités (Art. 64)." type="warning" />}
            {res.solde >= 0 && <AlertInfo texte={`Paiement obligatoire au plus tard le ${res.dateLimit || '15 du mois suivant'}. La déclaration doit être souscrite en double exemplaire et accompagnée du paiement (Art. 60).`} type="info" />}
          </ResultatWrap>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 7 : PRORATA
// ─────────────────────────────────────────────────────────────────────────────
function OngletProrata() {
  const [recettesImp, setRecettesImp] = useState('')
  const [totalRecettes, setTotalRecettes] = useState('')
  const [tvaAmont, setTvaAmont] = useState('')
  const [res, setRes] = useState<null | any>(null)

  function calculer() {
    const ri = parseFloat(recettesImp) || 0
    const rt = parseFloat(totalRecettes) || 0
    const tva = parseFloat(tvaAmont) || 0
    if (rt === 0) return
    const pct = Math.ceil((ri / rt) * 100)
    const tvaAjustee = tva * pct / 100
    const tvaExclue = tva - tvaAjustee
    setRes({ ri, rt, pct, tva, tvaAjustee, tvaExclue })
  }

  return (
    <div className="space-y-4">
      <DefinitionBox titre="Principe du prorata : Art. 43">
        <p className="text-xs text-foreground">Les assujettis qui réalisent à la fois des opérations taxées et des opérations exonérées ne peuvent pas déduire la totalité de leur TVA en amont. Ils appliquent un <strong>prorata de déduction</strong>, qui représente la fraction des recettes ouvrant droit à déduction par rapport au total des recettes.</p>
      </DefinitionBox>

      <div className="rounded-xl border border-border/60 bg-card p-4 space-y-3">
        <div className="rounded-xl border border-blue-200 bg-blue-50 p-3">
          <p className="text-xs font-bold text-blue-700 mb-1">Formule du prorata</p>
          <p className="text-xs font-mono text-foreground">Prorata = Recettes imposables (+ exports) / Total recettes × 100</p>
          <p className="text-xs text-muted-foreground mt-1">Arrondi à l'unité supérieure : Art. 43</p>
        </div>

        <div className="space-y-2">
          <div>
            <label className="block text-xs font-medium mb-1">Recettes imposables + exportations (FC) <BadgeLoi loi="Numérateur" /></label>
            <input type="number" value={recettesImp} onChange={e => { setRecettesImp(e.target.value); setRes(null) }} placeholder="Ex : 80 000 000"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">Total recettes de toutes natures (FC) <BadgeLoi loi="Dénominateur" /></label>
            <input type="number" value={totalRecettes} onChange={e => { setTotalRecettes(e.target.value); setRes(null) }} placeholder="Ex : 100 000 000"
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
            <p className="text-xs text-muted-foreground mt-0.5">Sont exclus : cessions d'actifs immobilisés, subventions d'équipements, indemnités d'assurance hors TVA, débours (Art. 43)</p>
          </div>
          <div>
            <label className="block text-xs font-medium mb-1">TVA en amont (sur tous achats) (FC)</label>
            <input type="number" value={tvaAmont} onChange={e => { setTvaAmont(e.target.value); setRes(null) }} placeholder="Total TVA sur achats du mois="
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        </div>
        <div className="flex gap-2"><BtnCalculer onClick={calculer} /><BtnReset onClick={() => { setRecettesImp(''); setTotalRecettes(''); setTvaAmont(''); setRes(null) }} /></div>

        {res && (
          <ResultatWrap titre="Calcul du prorata de déduction">
            <EtapeResultat numero={1} titre="Calcul du taux prorata=">
              <LigneR signe="+" label="Recettes imposables + exports=" val={formatFC(res.ri)} />
              <LigneR signe={"\u00f7" as any} label="Total recettes=" val={formatFC(res.rt)} />
              <Separateur />
              <LigneR signe="=" label={`Rapport brut = ${(res.ri / res.rt * 100).toFixed(4)}% → arrondi à l\'unité supérieure`} val={`${res.pct}%`} bold accent />
            </EtapeResultat>
            <EtapeResultat numero={2} titre="Application du prorata à la TVA en amont=">
              <LigneR signe="+" label="TVA en amont (total)" val={formatFC(res.tva)} />
              <LigneR signe="×" label={`Prorata de déduction (${res.pct}%)`} val={`${res.pct}%`} />
              <Separateur />
              <LigneR signe="=" label="TVA déductible ajustée" val={formatFC(res.tvaAjustee)} bold accent />
              <LigneR signe="=" label="TVA non déductible (charge définitive)" val={formatFC(res.tvaExclue)} neg />
            </EtapeResultat>
            <BoxFinal label="TVA déductible après prorata=" val={formatFC(res.tvaAjustee)} />
            <AlertInfo texte="Le prorata est calculé provisoirement sur la base des recettes de l'année N-1. Le prorata définitif est arrêté au plus tard le 31 mars de l'année suivante. Si la variation entre prorata provisoire et définitif est supérieure à 10%, une régularisation est effectuée (Art. 45-46)." type="info" />
          </ResultatWrap>
        )}
      </div>

      <div className="space-y-3">
        <SectionTitre texte="Ce qui figure au numérateur et au dénominateur" loi="Art. 43" />
        <div className="grid gap-2">
          <div className="rounded-lg border border-green-200 bg-green-50 p-3">
            <p className="text-xs font-semibold text-green-700 mb-1">Au numérateur (recettes imposables)</p>
            <ul className="text-xs text-foreground space-y-0.5">
              <li>• Recettes des ventes et prestations imposables à la TVA</li>
              <li>• Exportations et opérations assimilées</li>
              <li>• Livraisons aux missions diplomatiques, consulaires et organisations internationales</li>
            </ul>
          </div>
          <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
            <p className="text-xs font-semibold text-foreground mb-1">Au dénominateur (total recettes)</p>
            <p className="text-xs text-muted-foreground">Toutes les recettes (imposables + exonérées), <strong>sauf</strong> :</p>
            <ul className="text-xs text-muted-foreground space-y-0.5 mt-0.5">
              <li>• Cessions d'éléments d'actifs immobilisés</li>
              <li>• Subventions d'équipements</li>
              <li>• Indemnités d'assurance non liées à une opération TVA</li>
              <li>• Débours (remboursements exacts au client)</li>
              <li>• Livraisons et prestations à soi-même (exclues des deux termes)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 8 : RÉGULARISATIONS
// ─────────────────────────────────────────────────────────────────────────────
function OngletRegularisations() {
  const [typeReg, setTypeReg] = useState<'actif' | 'perte' | 'impaye'>('actif')
  const [typeBien, setTypeBien] = useState<'meuble' | 'immeuble'>('meuble')
  const [tvaDeduite, setTvaDeduite] = useState('')
  const [anneeAcq, setAnneeAcq] = useState('')
  const [anneeReg, setAnneeReg] = useState('')
  const [tvaAmont, setTvaAmont] = useState('')
  const [tvaAval, setTvaAval] = useState('')
  const [montantImpaye, setMontantImpaye] = useState('')
  const [tvaImpayee, setTvaImpayee] = useState('')
  const [res, setRes] = useState<null | any>(null)

  function calculer() {
    if (typeReg === 'actif') {
      const tva = parseFloat(tvaDeduite) || 0
      const aq = parseInt(anneeAcq) || 0
      const ar = parseInt(anneeReg) || 0
      const duree = typeBien === 'meuble' ? 5 : 20
      const diviseur = typeBien === 'meuble' ? 5 : 20
      const anneesEcoulees = Math.min(ar - aq, duree - 1)
      const anneesRestantes = duree - 1 - anneesEcoulees
      const fraction = anneesRestantes > 0 ? anneesRestantes / diviseur : 0
      const reversement = tva * fraction
      setRes({ type: 'actif', tva, anneesEcoulees, anneesRestantes, diviseur, fraction, reversement, typeBien })
    } else if (typeReg === 'perte') {
      const ta = parseFloat(tvaAmont) || 0
      const tv = parseFloat(tvaAval) || 0
      const limitation = Math.min(ta, tv)
      const reversement = ta - limitation
      setRes({ type: 'perte', ta, tv, limitation, reversement })
    } else {
      const mi = parseFloat(montantImpaye) || 0
      const ti = parseFloat(tvaImpayee) || 0
      setRes({ type: 'impaye', mi, ti })
    }
  }

  return (
    <div className="space-y-4">
      <DefinitionBox titre="Régularisations TVA : Art. 50–52">
        <p className="text-xs text-foreground">Dans certains cas, la TVA précédemment déduite doit être <strong>reversée partiellement ou totalement</strong> au Trésor. Ces régularisations concernent principalement les actifs (sortie ou changement d'affectation), les ventes à perte et les créances irrécouvrables.</p>
      </DefinitionBox>

      <div className="flex gap-1 rounded-xl border border-border bg-muted/30 p-2">
        {[
          { id: 'actif', label: 'Sortie d\'actif (Art. 50)' },
          { id: 'perte', label: 'Vente à perte (Art. 51)' },
          { id: 'impaye', label: 'Impayés / Annulation (Art. 52)' },
        ].map(t => (
          <button key={t.id} onClick={() => { setTypeReg(t.id as any); setRes(null) }}
            className={cn('flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors', typeReg === t.id ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground')}>
            {t.label}
          </button>
        ))}
      </div>

      {typeReg === 'actif' && (
        <div className="rounded-xl border border-border/60 bg-card p-4 space-y-3">
          <p className="text-xs text-muted-foreground">Lorsqu'un bien immobilisé sort des actifs ou change d'affectation avant la fin de la période de surveillance, une fraction de la TVA déduite doit être reversée.</p>
          <div className="grid grid-cols-2 gap-2">
            <button onClick={() => setTypeBien('meuble')} className={cn('rounded-xl border p-3 text-center transition-colors', typeBien === 'meuble' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-muted-foreground')}>
              <p className="text-xs font-semibold">Bien meuble</p>
              <p className="text-xs mt-0.5">Période : 4 ans / Diviseur : 5</p>
            </button>
            <button onClick={() => setTypeBien('immeuble')} className={cn('rounded-xl border p-3 text-center transition-colors', typeBien === 'immeuble' ? 'border-primary bg-primary/10 text-primary' : 'border-border bg-card text-muted-foreground')}>
              <p className="text-xs font-semibold">Immeuble</p>
              <p className="text-xs mt-0.5">Période : 19 ans / Diviseur : 20</p>
            </button>
          </div>
          <div className="space-y-2">
            <div><label className="block text-xs font-medium mb-1">TVA initialement déduite (FC)</label><input type="number" value={tvaDeduite} onChange={e => { setTvaDeduite(e.target.value); setRes(null) }} placeholder="Montant TVA déduit lors de l'achat" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
            <div className="grid grid-cols-2 gap-2">
              <div><label className="block text-xs font-medium mb-1">Année d'acquisition</label><input type="number" value={anneeAcq} onChange={e => { setAnneeAcq(e.target.value); setRes(null) }} placeholder="Ex : 2022" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
              <div><label className="block text-xs font-medium mb-1">Année de sortie/régularisation</label><input type="number" value={anneeReg} onChange={e => { setAnneeReg(e.target.value); setRes(null) }} placeholder="Ex : 2024" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
            </div>
          </div>
          <div className="flex gap-2"><BtnCalculer onClick={calculer} /><BtnReset onClick={() => { setTvaDeduite(''); setAnneeAcq(''); setAnneeReg(''); setRes(null) }} /></div>
          {res?.type === 'actif' && (
            <ResultatWrap titre="Calcul du reversement TVA : Sortie d'actif">
              <EtapeResultat numero={1} titre={`Régularisation : ${res.typeBien === 'meuble' ? 'Bien meuble (Art. 50)' : 'Immeuble (Art. 50)'}`}>
                <LigneR signe="+" label="TVA initialement déduite" val={formatFC(res.tva)} />
                <LigneR signe="−" label={`Années écoulées depuis acquisition`} val={`${res.anneesEcoulees} an(s)`} />
                <LigneR signe="+" label={`Années restantes dans la période de surveillance`} val={`${res.anneesRestantes} an(s)`} />
                <Separateur />
                <LigneR label={`Fraction reversible = TVA × (${res.anneesRestantes} / ${res.diviseur})`} val={`${formatFC(res.tva)} × ${res.anneesRestantes}/${res.diviseur}`} />
                <Separateur />
                <LigneR signe="=" label="Reversement TVA dû" val={formatFC(res.reversement)} bold accent />
              </EtapeResultat>
              <BoxFinal label="Montant à reverser au Trésor" val={formatFC(res.reversement)} couleur={res.reversement > 0 ? 'red' : undefined} />
              {res.reversement === 0 && <AlertInfo texte="Aucun reversement dû : la période de surveillance est terminée." type="success" />}
            </ResultatWrap>
          )}
        </div>
      )}

      {typeReg === 'perte' && (
        <div className="rounded-xl border border-border/60 bg-card p-4 space-y-3">
          <p className="text-xs text-muted-foreground">En cas de vente à perte, la déduction de la TVA amont est limitée au montant de la TVA due sur la vente. L'excédent doit être reversé.</p>
          <div className="space-y-2">
            <div><label className="block text-xs font-medium mb-1">TVA amont (sur l'achat du bien) (FC)</label><input type="number" value={tvaAmont} onChange={e => { setTvaAmont(e.target.value); setRes(null) }} placeholder="TVA payée lors de l'achat" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
            <div><label className="block text-xs font-medium mb-1">TVA aval (sur la vente, au prix de vente inférieur) (FC)</label><input type="number" value={tvaAval} onChange={e => { setTvaAval(e.target.value); setRes(null) }} placeholder="TVA collectée sur la vente à perte=" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
          </div>
          <div className="flex gap-2"><BtnCalculer onClick={calculer} /><BtnReset onClick={() => { setTvaAmont(''); setTvaAval(''); setRes(null) }} /></div>
          {res?.type === 'perte' && (
            <ResultatWrap titre="Calcul : Vente à perte (Art. 51)">
              <EtapeResultat numero={1} titre="Limitation de la déduction">
                <LigneR signe="+" label="TVA amont (sur achat)" val={formatFC(res.ta)} />
                <LigneR signe="+" label="TVA aval (sur vente à perte)" val={formatFC(res.tv)} />
                <Separateur />
                <LigneR label="Déduction limitée à min(TVA amont, TVA aval)" val={formatFC(res.limitation)} bold />
                <LigneR signe="=" label="Reversement requis=" val={formatFC(res.reversement)} bold accent neg={res.reversement > 0} />
              </EtapeResultat>
              <BoxFinal label="Reversement TVA=" val={formatFC(res.reversement)} couleur={res.reversement > 0 ? 'red' : undefined} />
            </ResultatWrap>
          )}
        </div>
      )}

      {typeReg === 'impaye' && (
        <div className="rounded-xl border border-border/60 bg-card p-4 space-y-3">
          <p className="text-xs text-muted-foreground">En cas d'annulation, de résiliation ou de créance irrécouvrable, la TVA précédemment acquittée peut être récupérée par imputation sur la TVA due ultérieure.</p>
          <AlertInfo texte="Procédure : Pour une annulation ou résiliation, envoyer au client une nouvelle facture rectificative annulant l'ancienne. Pour un impayé définitif : envoyer un duplicata de facture avec la mention du montant impayé HT et TVA correspondante non récupérable. (Art. 52)" type="info" />
          <div className="space-y-2">
            <div><label className="block text-xs font-medium mb-1">Montant HT de l'opération annulée/impayée (FC)</label><input type="number" value={montantImpaye} onChange={e => { setMontantImpaye(e.target.value); setRes(null) }} placeholder="Montant HT=" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
            <div><label className="block text-xs font-medium mb-1">TVA acquittée sur cette opération (FC)</label><input type="number" value={tvaImpayee} onChange={e => { setTvaImpayee(e.target.value); setRes(null) }} placeholder="TVA déjà versée au Trésor" className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" /></div>
          </div>
          <div className="flex gap-2"><BtnCalculer onClick={calculer} /><BtnReset onClick={() => { setMontantImpaye(''); setTvaImpayee(''); setRes(null) }} /></div>
          {res?.type === 'impaye' && (
            <ResultatWrap titre="Récupération TVA : Annulation / Impayé (Art. 52)">
              <EtapeResultat numero={1} titre="TVA récupérable">
                <LigneR signe="+" label="Montant HT annulé / impayé" val={formatFC(res.mi)} />
                <LigneR signe="+" label="TVA acquittée à récupérer" val={formatFC(res.ti)} bold accent />
              </EtapeResultat>
              <BoxFinal label="TVA à imputer sur prochaine déclaration" val={formatFC(res.ti)} credit />
              <AlertInfo texte="Cette TVA est récupérée par imputation sur la TVA due pour les opérations faites ultérieurement. Elle ne donne pas lieu à remboursement direct (Art. 52)." type="info" />
            </ResultatWrap>
          )}
        </div>
      )}
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 9 : REMBOURSEMENT
// ─────────────────────────────────────────────────────────────────────────────
function OngletRemboursement() {
  const [profil, setProfil] = useState<'export' | 'invest' | 'minier' | 'cessation' | 'public' | 'autre'>('export')
  const [creditTVA, setCreditTVA] = useState('')
  const [montantExport, setMontantExport] = useState('')
  const [montantImmob, setMontantImmob] = useState('')
  const [res, setRes] = useState<null | any>(null)

  function calculer() {
    const credit = parseFloat(creditTVA) || 0
    if (profil === 'export') {
      const exp = parseFloat(montantExport) || 0
      const plafond = exp * 0.16
      const remb = Math.min(credit, plafond)
      setRes({ profil, credit, remb, plafond, exp, eligible: true })
    } else if (profil === 'invest') {
      const immob = parseFloat(montantImmob) || 0
      const eligible = immob >= 1_000_000_000
      const tvaImmob = immob * 0.16
      const remb = eligible ? Math.min(credit, tvaImmob) : 0
      setRes({ profil, credit, remb, immob, eligible, tvaImmob })
    } else if (profil === 'autre') {
      setRes({ profil, credit, eligible: false })
    } else {
      setRes({ profil, credit, remb: credit, eligible: true })
    }
  }

  return (
    <div className="space-y-4">
      <DefinitionBox titre="Remboursement du crédit TVA : Art. 63–67">
        <p className="text-xs text-foreground">En principe, le crédit TVA <strong>ne peut pas être remboursé</strong> et s'impute sur la TVA des mois suivants. Par exception, certains assujettis peuvent demander le remboursement sur demande expresse adressée à l'Administration des Impôts.</p>
      </DefinitionBox>

      <div className="rounded-xl border border-border/60 bg-card p-4 space-y-3">
        <div>
          <label className="block text-xs font-medium mb-2">Profil de l'entreprise</label>
          <div className="grid grid-cols-2 gap-1.5">
            {[
              { v: 'export', label: 'Exportateur', desc: 'Plafond : TVA taux normal × Exports du mois', loi: 'Art. 64' },
              { v: 'invest', label: 'Investissement lourd', desc: '≥ 1 000 000 000 FC d\'immobilisations neuves', loi: 'Art. 64' },
              { v: 'minier', label: 'Minier / Pétrolier', desc: 'En phase de recherche ou développement', loi: 'Art. 64' },
              { v: 'cessation', label: 'Cessation d\'activités', desc: 'Crédit restant après imputation sur autres impôts', loi: 'Art. 65' },
              { v: 'public', label: 'Établissement public', desc: 'TVA retenue à la source par Trésor ou entreprises minières', loi: 'Art. 64' },
              { v: 'autre', label: 'Autre entreprise', desc: 'Remboursement non applicable en principe', loi: 'Art. 63' },
            ].map(p => (
              <button key={p.v} onClick={() => { setProfil(p.v as any); setRes(null) }}
                className={cn('rounded-xl border p-3 text-left transition-colors', profil === p.v ? 'border-primary bg-primary/10' : 'border-border bg-card hover:bg-muted/30')}>
                <p className={cn('text-xs font-semibold', profil === p.v ? 'text-primary' : 'text-foreground')}>{p.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{p.desc}</p>
                <BadgeLoi loi={p.loi} />
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium mb-1">Crédit TVA du mois (FC)</label>
          <input type="number" value={creditTVA} onChange={e => { setCreditTVA(e.target.value); setRes(null) }} placeholder="Montant du crédit TVA="
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
        </div>

        {/* Délais de traitement par catégorie de risque, A.M. n° 018 du 18/03/2016 */}
        <div className="rounded-xl border border-border bg-muted/20 p-3 space-y-2">
          <p className="text-xs font-semibold text-foreground">Délai de traitement, selon la catégorie de risque de l'entreprise</p>
          <div className="grid grid-cols-3 gap-1.5">
            {[
              { cat: 'A', risque: 'Faible', delai: '30 jours', desc: 'Contrôle formel uniquement', couleur: 'green' },
              { cat: 'B', risque: 'Moyen',  delai: '60 jours', desc: 'Contrôle sur pièces',        couleur: 'amber' },
              { cat: 'C', risque: 'Élevé',  delai: '90 jours', desc: 'Contrôle sur place systématique', couleur: 'red' },
            ].map(c => (
              <div key={c.cat} className={cn('rounded-lg border p-2 text-center',
                c.couleur === 'green' ? 'border-green-200 bg-green-50' : c.couleur === 'amber' ? 'border-amber-200 bg-amber-50' : 'border-red-200 bg-red-50')}>
                <p className={cn('text-xs font-bold', c.couleur === 'green' ? 'text-green-700' : c.couleur === 'amber' ? 'text-amber-700' : 'text-red-700')}>Catégorie {c.cat}</p>
                <p className="text-xs text-muted-foreground">{c.risque}</p>
                <p className="text-xs font-semibold text-foreground mt-0.5">{c.delai}</p>
                <p className="text-xs text-muted-foreground leading-tight mt-0.5">{c.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground">Classification établie par la DGI, en concertation avec la DGDA et les organisations professionnelles ; contrôle a posteriori semestriel pour les catégories A et B.</p>
          <BadgeLoi loi="A.M. n° 018 du 18/03/2016" />
        </div>

        <details className="group rounded-xl border border-border bg-card">
          <summary className="cursor-pointer text-xs font-medium text-primary px-3 py-2 flex items-center gap-1 select-none list-none">
            <span className="group-open:rotate-90 transition-transform inline-block">▶</span>
            Pièces à joindre à la demande (Art. 144-145)
          </summary>
          <div className="px-3 pb-3 space-y-1.5">
            <p className="text-xs text-muted-foreground">Dans tous les cas : copie de la dernière déclaration mensuelle faisant apparaître le crédit, état récapitulatif des factures fournisseurs (n°, n° impôt, nom du fournisseur, montant HT), copies des factures fournisseurs.</p>
            <ul className="text-xs text-foreground space-y-1 pl-1">
              <li>• <strong>Exportation :</strong> document bancaire du paiement client, titre de transport, déclarations d'exportation/réexportation visées par la douane.</li>
              <li>• <strong>Importation :</strong> déclarations de mise à la consommation, preuves de paiement des droits de douane.</li>
              <li>• <strong>Perte de la qualité d'assujetti :</strong> copie de la déclaration modificative (changement d'activité).</li>
              <li>• <strong>Cessation d'activités :</strong> copie de la déclaration de cessation.</li>
            </ul>
            <p className="text-xs text-amber-600">Demande incomplète ou hors ordre chronologique : retournée dans les 7 jours, régularisation possible dans les 3 mois - passé ce délai, rejet.</p>
          </div>
        </details>

        {profil === 'export' && (
          <div>
            <label className="block text-xs font-medium mb-1">Montant des exportations du mois (FC)</label>
            <input type="number" value={montantExport} onChange={e => { setMontantExport(e.target.value); setRes(null) }} placeholder="Total exports du mois="
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        )}

        {profil === 'invest' && (
          <div>
            <label className="block text-xs font-medium mb-1">Valeur des immobilisations neuves acquises (FC)</label>
            <input type="number" value={montantImmob} onChange={e => { setMontantImmob(e.target.value); setRes(null) }} placeholder="Valeur projet ≥ 1 000 000 000 FC="
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
          </div>
        )}

        <div className="flex gap-2"><BtnCalculer onClick={calculer} /><BtnReset onClick={() => { setCreditTVA(''); setMontantExport(''); setMontantImmob(''); setRes(null) }} /></div>

        {res && (
          <ResultatWrap titre="Analyse du remboursement TVA=">
            {!res.eligible ? (
              <AlertInfo texte="Votre profil ne permet pas le remboursement du crédit TVA. Le crédit sera reporté sur la déclaration du mois suivant jusqu'à épuisement (Art. 63)." type="warning" />
            ) : (
              <>
                <EtapeResultat numero={1} titre="Calcul du montant remboursable=">
                  {res.profil === 'export' && (
                    <>
                      <LigneR signe="+" label="Montant des exportations du mois=" val={formatFC(res.exp)} />
                      <LigneR signe="×" label="Taux normal (16%)" val="16%" />
                      <Separateur />
                      <LigneR signe="=" label="Plafond de remboursement=" val={formatFC(res.plafond)} bold />
                      <LigneR signe="+" label="Crédit TVA disponible=" val={formatFC(res.credit)} />
                      <Separateur />
                      <LigneR signe="=" label="Remboursement = min(Crédit, Plafond)" val={formatFC(res.remb)} bold accent />
                    </>
                  )}
                  {res.profil === 'invest' && (
                    <>
                      <LigneR signe="+" label="Valeur immobilisations neuves=" val={formatFC(res.immob)} />
                      <LigneR label={res.immob >= 1_000_000_000 ? '✓ Seuil 1 000 000 000 FC atteint' : '✗ Seuil 1 000 000 000 FC non atteint'} val="" bold />
                      {res.eligible && (
                        <>
                          <LigneR signe="×" label="TVA estimée sur immobilisations (× 16%)" val={formatFC(res.tvaImmob)} />
                          <LigneR signe="+" label="Crédit TVA disponible=" val={formatFC(res.credit)} />
                          <Separateur />
                          <LigneR signe="=" label="Remboursement = min(Crédit, TVA immob.)" val={formatFC(res.remb)} bold accent />
                        </>
                      )}
                    </>
                  )}
                  {(res.profil === 'minier' || res.profil === 'cessation' || res.profil === 'public') && (
                    <>
                      <LigneR signe="+" label="Crédit TVA disponible=" val={formatFC(res.credit)} />
                      <LigneR signe="=" label="Remboursable intégralement (sur demande)" val={formatFC(res.remb)} bold accent />
                    </>
                  )}
                </EtapeResultat>
                <BoxFinal label="Montant remboursable (sur demande à la DGI)" val={formatFC(res.remb)} />
                <AlertInfo texte="Le remboursement est accordé sur demande expresse adressée à l'Administration des Impôts. Pour les investissements lourds d'extension/modernisation : demande dans les 3 mois suivant l'acquisition (Art. 64)." type="info" />
              </>
            )}
          </ResultatWrap>
        )}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET 10 : DÉCLARATION & PÉNALITÉS
// ─────────────────────────────────────────────────────────────────────────────
function OngletDeclarationPenalites() {
  const [ongletDP, setOngletDP] = useState<'obligations' | 'penalites'>('obligations')
  const [infraction, setInfraction] = useState<any>(null)
  const [montantBase, setMontantBase] = useState('')
  const [recidive, setRecidive] = useState(false)
  const [res, setRes] = useState<null | any>(null)

  function calculerPenalite() {
    if (!infraction) return
    const base = parseFloat(montantBase) || 0
    let amende = 0
    let detail = ''
    const inf = CATALOGUE_INFRACTIONS.find(i => i.code === infraction.code)
    if (!inf) return

    if (inf.type === 'fixe') {
      amende = inf.amende || 0
      if (recidive && (inf.code === 'INF-12')) amende *= 3
      detail = `Amende fixe : ${formatFC(inf.amende || 0)}`
    } else if (inf.type === 'triple') {
      amende = base * 3
      detail = `${formatFC(base)} × 3 = ${formatFC(amende)}`
    } else if (inf.type === 'double') {
      amende = base * 2
      if (recidive) amende = base * 3
      detail = recidive ? `${formatFC(base)} × 3 (récidive) = ${formatFC(amende)}` : `${formatFC(base)} × 2 = ${formatFC(amende)}`
    } else if (inf.type === 'multiple_tva') {
      amende = Math.max(base * (inf.amende || 5), inf.min || 0)
      detail = `max(${formatFC(base)} × ${inf.amende}, ${formatFC(inf.min || 0)}) = ${formatFC(amende)}`
    } else if (inf.type === 'montant_deduit' || inf.type === 'montant_retenue' || inf.type === 'restitution+amende') {
      amende = base
      if (inf.type === 'restitution+amende') amende = base * 2
      detail = inf.type === 'restitution+amende' ? `Restitution ${formatFC(base)} + amende ${formatFC(base)} = ${formatFC(amende)}` : `${formatFC(base)}`
    } else if (inf.type === 'par_facture') {
      amende = base * (inf.amende || 10_000_000)
      detail = `${formatFC(inf.amende || 10_000_000)} par facture × ${base || 1} facture(s)`
    } else {
      detail = 'Perte du droit à déduction de la TVA supportée'
    }
    setRes({ amende, detail, inf, perte_credit: inf.perte_credit })
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-1 rounded-xl border border-border bg-muted/30 p-2">
        {[{ id: 'obligations', label: 'Obligations déclaratives' }, { id: 'penalites', label: 'Infractions & Pénalités' }].map(t => (
          <button key={t.id} onClick={() => setOngletDP(t.id as any)}
            className={cn('flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors', ongletDP === t.id ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground')}>
            {t.label}
          </button>
        ))}
      </div>

      {ongletDP === 'obligations' && (
        <div className="space-y-4">
          <div className="space-y-2">
            {[
              { titre: 'Déclaration mensuelle (Art. 60)', desc: 'Tout redevable doit souscrire une déclaration chaque mois, au plus tard le 15 du mois suivant les opérations. La déclaration est souscrite en double exemplaire et accompagnée du paiement.', badge: '15 du mois suivant', couleur: 'rose' },
              { titre: 'Déclaration zéro obligatoire (Art. 60)', desc: 'Même si aucune opération imposable n\'a été réalisée, la déclaration doit être souscrite avec la mention "Néant". Le défaut de souscription est sanctionné.', badge: 'Obligatoire', couleur: 'amber' },
              { titre: 'TVA à l\'importation (Art. 61)', desc: 'La TVA due à l\'importation doit être déclarée et versée avant l\'enlèvement de la marchandise. Elle est perçue par l\'Administration des Douanes (sauf cas particuliers des entreprises minières).', badge: 'Avant enlèvement', couleur: 'blue' },
              { titre: 'Déclaration d\'assujettissement (Art. 54)', desc: 'Toute personne qui devient assujettie doit souscrire une déclaration d\'assujettissement auprès de la DGI avant le début de ses activités, pour obtenir son numéro TVA.', badge: 'Avant activité', couleur: 'green' },
              { titre: 'Seuil atteint en cours d\'année (Art. 55)', desc: 'Si le CA cumulé atteint 80 000 000 FC en cours d\'année, la déclaration d\'assujettissement doit être souscrite avant le 15 du mois suivant le dépassement du seuil.', badge: '15 du mois suivant', couleur: 'purple' },
              { titre: 'Paiement électronique obligatoire (Art. 59 bis)', desc: 'Toute transaction entre assujettis d\'un montant d\'au moins 1 000 000 FC doit être réglée par chèque, virement bancaire ou carte bancaire. À défaut : perte du droit à déduction.', badge: '≥ 1 000 000 FC', couleur: 'rose' },
              { titre: 'Dispositifs Électroniques Fiscaux : DEF (Art. 59 ter/quater)', desc: 'Les assujettis sont tenus d\'utiliser des DEF homologués connectés au système DGI pour délivrer automatiquement des factures normalisées. Les systèmes de facturation d\'entreprise doivent être homologués par la DGI.', badge: 'DEF homologué', couleur: 'amber' },
              { titre: 'Retenue à la source (Art. 53)', desc: 'La TVA est retenue à la source (1) par les entreprises minières pour le compte des entreprises publiques et (2) par le Trésor Public pour le compte des fournisseurs et prestataires de l\'État lors du paiement des factures.', badge: 'Retenue source', couleur: 'blue' },
            ].map((ob, i) => {
              const couleurs: Record<string, string> = {
                rose: 'border-rose-200',
                amber: 'border-amber-200',
                blue: 'border-blue-200',
                green: 'border-green-200',
                purple: 'border-purple-200',
              }
              const badgeCouleurs: Record<string, string> = {
                rose: 'bg-rose-100 text-rose-700',
                amber: 'bg-amber-100 text-amber-700',
                blue: 'bg-blue-100 text-blue-700',
                green: 'bg-green-100 text-green-700',
                purple: 'bg-purple-100 text-purple-700',
              }
              return (
                <div key={i} className={cn('rounded-xl border bg-card p-3', couleurs[ob.couleur])}>
                  <div className="flex items-start justify-between gap-2 mb-1">
                    <p className="text-xs font-semibold text-foreground">{ob.titre}</p>
                    <span className={cn('text-xs font-medium rounded-full px-2 py-0.5 shrink-0', badgeCouleurs[ob.couleur])}>{ob.badge}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{ob.desc}</p>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {ongletDP === 'penalites' && (
        <div className="space-y-4">
          <DefinitionBox titre="Infractions et sanctions TVA : Art. 69–76">
            <p className="text-xs text-foreground">Le CGI 2023 prévoit un arsenal de sanctions en matière de TVA, allant de <strong>500 000 FC</strong> pour les infractions légères à <strong>100 000 000 FC</strong> pour les infractions graves liées aux DEF. Les sanctions pénales s'appliquent en parallèle des amendes fiscales.</p>
          </DefinitionBox>

          <div className="rounded-xl border border-border/60 bg-card p-4 space-y-3">
            <div>
              <label className="block text-xs font-medium mb-1">Sélectionner l'infraction</label>
              <div className="space-y-1.5 max-h-60 overflow-y-auto">
                {CATALOGUE_INFRACTIONS.map(inf => (
                  <button key={inf.code} onClick={() => { setInfraction(inf); setRes(null) }}
                    className={cn('w-full rounded-lg border p-2.5 text-left transition-colors', infraction?.code === inf.code ? 'border-red-300 bg-red-50' : 'border-border/60 bg-card hover:bg-muted/30')}>
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <span className="text-xs font-mono text-primary/70">{inf.code}</span>
                        <p className="text-xs text-foreground mt-0.5">{inf.label}</p>
                      </div>
                      <BadgeLoi loi={inf.article} />
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {infraction && (infraction.type === 'triple' || infraction.type === 'double' || infraction.type === 'multiple_tva' || infraction.type === 'montant_deduit' || infraction.type === 'montant_retenue' || infraction.type === 'restitution+amende' || infraction.type === 'par_facture') && (
              <div>
                <label className="block text-xs font-medium mb-1">
                  {infraction.type === 'triple' ? 'Montant de la TVA illégalement facturée (FC)' :
                   infraction.type === 'double' ? 'Montant des droits compromis (FC)' :
                   infraction.type === 'multiple_tva' ? 'Montant TVA non facturée (FC)' :
                   infraction.type === 'montant_deduit' ? 'Montant des droits indûment déduits (FC)' :
                   infraction.type === 'montant_retenue' ? 'Montant de la retenue non effectuée (FC)' :
                   infraction.type === 'restitution+amende' ? 'Montant du remboursement indu (FC)' :
                   'Nombre de factures non délivrées'}
                </label>
                <input type="number" value={montantBase} onChange={e => { setMontantBase(e.target.value); setRes(null) }} placeholder="Montant"
                  className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
              </div>
            )}

            {infraction && infraction.type === 'double' && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" checked={recidive} onChange={e => { setRecidive(e.target.checked); setRes(null) }} className="rounded" />
                <span className="text-xs text-foreground">Récidive (amende triplée)</span>
              </label>
            )}

            {infraction && (
              <div className="flex gap-2"><BtnCalculer onClick={calculerPenalite} /><BtnReset onClick={() => { setInfraction(null); setMontantBase(''); setRecidive(false); setRes(null) }} /></div>
            )}

            {res && (
              <ResultatWrap titre={`Sanction : ${res.inf.code}`}>
                <EtapeResultat numero={1} titre="Calcul de l'amende">
                  <p className="text-xs text-foreground font-medium">{res.inf.label}</p>
                  <BadgeLoi loi={res.inf.article} />
                  {res.detail && <p className="text-xs text-muted-foreground mt-1">{res.detail}</p>}
                  {res.perte_credit && <AlertInfo texte={`En plus de l\'amende : perte de ${res.perte_credit}% du crédit TVA.`} type="warning" />}
                </EtapeResultat>
                {res.inf.type !== 'perte_deduction' ? (
                  <BoxFinal label="Amende TVA applicable=" val={formatFC(res.amende)} couleur="red" />
                ) : (
                  <AlertInfo texte="Sanction : Perte définitive du droit à déduction de la TVA supportée sur l'opération concernée." type="warning" />
                )}
              </ResultatWrap>
            )}
          </div>
        </div>
      )}
    </div>
  )
}


// ─────────────────────────────────────────────────────────────────────────────
// LISTES RÉGLEMENTAIRES - positions tarifaires exonérées (Art. 15-6 et 15-10)
// Extraites intégralement des arrêtés interministériels sources (44 positions
// agricoles, 376 intrants pharmaceutiques) : seule la position tarifaire exacte
// exonère, jamais l'appartenance à une catégorie générale.
// ─────────────────────────────────────────────────────────────────────────────
const LISTE_EQUIPEMENTS_AGRICOLES: { n: number; code: string; designation: string; sousPositions: string[] }[] = [
  { n: 1, code: '45.04', designation: 'Liège aggloméré (avec ou sans liant) et ouvrages en liège aggloméré.', sousPositions: ['90.91 - Autres : flotteurs pour la pêche.'] },
  { n: 2, code: '55.09', designation: 'Fils de fibres synthétiques discontinues (autres que les fils à coudre), non conditionnés pour la vente au détail - contenant au moins 85 % en poids de fibres discontinues de nylon ou d\'autres polyamides.', sousPositions: ['12.00 - Retors ou câblés.'] },
  { n: 3, code: '56.08', designation: 'Filets à mailles nouées, en nappes ou en pièces, obtenus à partir de ficelles, cordes ou cordages ; filets confectionnés pour la pêche et autres filets confectionnés, en matières textiles.', sousPositions: ['11.00 - En matières textiles synthétiques ou artificielles : filets confectionnés pour la pêche.'] },
  { n: 4, code: '73.14', designation: 'Toiles métalliques (y compris les toiles continues ou sans fin), grillages et treillis, en fils de fer ou d\'acier ; tôles et bandes déployées, en fer ou en acier.', sousPositions: ['20.00 - Grillages et treillis soudés aux points de rencontre, en fils dont la plus grande dimension de coupe transversale est ≥ 3 mm et dont les mailles ont une surface d\'au moins 100 cm² (autres grillages et treillis soudés aux points de rencontre) : 31.00 Zingués ; 39.00 Autres.', 'Autres toiles métalliques, grillages et treillis : 41.00 Zingués ; 42.00 Recouverts de matières plastiques ; 49.00 Autres.'] },
  { n: 5, code: '73.26', designation: 'Autres ouvrages en fer ou en acier - ouvrages en fils de fer ou d\'acier.', sousPositions: ['20.20 - Batteries pour élevage.', '90.20 - Autres : matériels et équipements de stabulation pour fermes bovine, porcine et avicole.'] },
  { n: 6, code: '82.01', designation: 'Bêches, pelles, pioches, pics, houes, binettes, fourches, râteaux et racloirs ; haches, serpes et outils similaires à taillants ; sécateurs de tous types ; faux et faucilles, couteaux à foin ou à paille, cisailles à haies, coins et autres outils agricoles, horticoles ou forestiers, à main.', sousPositions: ['10.00 Bêches et pelles ; 30.00 Pioches, pics, houes, binettes, râteaux et racloirs ; 40.00 Haches, serpes et outils similaires à taillants ; 50.00 Sécateurs (y compris cisailles à volaille) maniés à une main ; 60.00 Cisailles à haies, sécateurs et outils similaires maniés à deux mains ; 90.00 Autres outils agricoles, horticoles ou forestiers à main.'] },
  { n: 7, code: '84.13', designation: 'Pompes pour liquides, même comportant un dispositif mesureur ; élévateurs à liquides.', sousPositions: ['50.10 - Autres pompes volumétriques alternatives, à usages agricoles.', '60.10 - Autres pompes volumétriques rotatives, à usages agricoles.', '70.10 - Autres pompes centrifuges, à usages agricoles.', '81.10 - Pompe à usage agricole.', '82.10 - Élévateur à liquide, à usage agricole.'] },
  { n: 8, code: '84.24', designation: 'Appareils mécaniques (même à main) à projeter, disperser ou pulvériser des matières liquides ou en poudre ; extincteurs, même chargés ; pistolets aérographes et appareils similaires ; machines et appareils à jet de sable, à jet de vapeur et appareils à jet similaires.', sousPositions: ['81.00 - Pour l\'agriculture ou l\'horticulture.'] },
  { n: 9, code: '84.32', designation: 'Machines, appareils et engins agricoles, horticoles ou sylvicoles pour la préparation ou le travail du sol ou pour la culture ; rouleaux pour pelouses ou terrains de sport.', sousPositions: ['10.00 Charrues ; 21.00 Herses à disques (pulvériseurs) ; 29.00 Autres (herses, scarificateurs, cultivateurs, extirpateurs, houes, sarcleuses et bineuses) ; 30.00 Semoirs, plantoirs et repiqueurs ; 40.00 Épandeurs de fumier et distributeurs d\'engrais ; 80.10 Autres machines, appareils et engins utilisés dans l\'agriculture, l\'horticulture ou la sylviculture pour la préparation/le travail du sol ou la culture.'] },
  { n: 10, code: '84.33', designation: 'Machines, appareils et engins pour la récolte ou le battage des produits agricoles, y compris les presses à paille ou à fourrage ; tondeuses à gazon et faucheuses ; machines pour le nettoyage ou le triage des œufs, fruits ou autres produits agricoles (autres que celles du n° 84.37).', sousPositions: ['11.00 Tondeuses à gazon à moteur, dispositif de coupe tournant dans un plan horizontal ; 19.00 Autres tondeuses ; 20.00 Faucheuses, y compris barres de coupe à monter sur tracteur ; 30.00 Autres machines et appareils de fenaison ; 40.00 Presses à paille ou à fourrage, y compris presses ramasseuses ; 51.00 Moissonneuses-batteuses ; 52.00 Autres machines et appareils pour le battage ; 53.00 Machines pour la récolte des racines ou tubercules ; 59.00 Autres machines pour la récolte ; 60.00 Machines pour le nettoyage ou le triage des œufs, fruits ou autres produits agricoles.'] },
  { n: 11, code: '84.34', designation: 'Machines à traire et machines et appareils de laiterie.', sousPositions: ['10.00 Machines à traire ; 20.00 Machines et appareils de laiterie.'] },
  { n: 12, code: '84.35', designation: 'Presses et pressoirs, fouloirs et machines et appareils analogues pour la fabrication du vin, du cidre, des jus de fruits ou de boissons similaires.', sousPositions: ['10.00 Machines et appareils.'] },
  { n: 13, code: '84.36', designation: 'Autres machines et appareils pour l\'agriculture, l\'horticulture, la sylviculture, l\'aviculture ou l\'apiculture, y compris les germoirs à dispositifs mécaniques ou thermiques et les couveuses et éleveuses pour l\'aviculture.', sousPositions: ['10.00 Machines et appareils pour la préparation des aliments ou provendes pour animaux ; 21.00 Couveuses et éleveuses ; 29.00 Autres machines/appareils pour l\'aviculture ; 80.10 Autres machines et appareils pour l\'agriculture, l\'horticulture, la sylviculture et l\'apiculture, y compris germoirs à dispositifs mécaniques ou thermiques.'] },
  { n: 14, code: '84.37', designation: 'Machines pour le nettoyage, le triage ou le criblage des grains ou des légumes secs, machines et appareils pour la minoterie ou le traitement des céréales ou légumes secs, autres que les machines et appareils du type fermier.', sousPositions: ['10.00 Machines pour le nettoyage, le triage ou le criblage des grains ou légumes secs ; 80.00 Autres machines et appareils.'] },
  { n: 15, code: '85.39', designation: 'Lampes et tubes électriques à incandescence ou à décharge, y compris les articles dits « phares et projecteurs scellés » et les lampes et tubes à rayons ultraviolets ou infrarouges ; lampes à arc.', sousPositions: ['49.00 - Autres (lampes et tubes à rayons ultraviolets et infrarouges pour l\'élevage).'] },
  { n: 16, code: '87.01', designation: 'Tracteurs (à l\'exclusion des chariots-tracteurs du n° 87.09).', sousPositions: ['10.00 Motoculteurs ; 90.00 Autres (tracteurs agricoles).'] },
  { n: 17, code: '87.16', designation: 'Remorques et semi-remorques pour tous véhicules ; autres véhicules non automobiles ; leurs parties.', sousPositions: ['20.00 Remorques et semi-remorques autochargeuses ou autodéchargeuses, pour usages agricoles ; 39.00 Autres remorques agricoles et semi-remorques pour le transport de marchandises.'] },
  { n: 18, code: '89.02', designation: 'Bateaux de pêche, navires-usines et autres bateaux pour le traitement ou la mise en conserve des produits de la pêche.', sousPositions: ['00.01 Pour la navigation maritime ; 00.20 Pour la navigation intérieure.'] },
  { n: 19, code: '90.18', designation: 'Instruments et appareils pour la médecine, la chirurgie, l\'art dentaire ou l\'art vétérinaire, y compris les appareils de scintigraphie et autres appareils électromédicaux ainsi que les appareils pour tests visuels.', sousPositions: ['90.00 - Autres instruments et appareils (pour l\'art vétérinaire).'] },
  { n: 20, code: '95.07', designation: 'Cannes à pêche, hameçons et autres articles pour la pêche à la ligne ; épuisettes pour tous usages ; leurres (autres que ceux des n°s 92.08 ou 97.05) et articles de chasse similaires.', sousPositions: ['10.00 Cannes à pêche ; 20.00 Hameçons, même montés sur avançons ; 30.00 Moulinets pour la pêche ; 90.10 Autres, de pêche.'] },
  { n: 21, code: '96.17', designation: 'Bouteilles isolantes et autres récipients isothermiques montés, dont l\'isolation est assurée par le vide, ainsi que leurs parties (à l\'exclusion des ampoules en verre).', sousPositions: ['00.11 - Récipients isothermiques pour la pêche.'] },
  { n: 22, code: '01.01', designation: 'Chevaux, ânes, mulets et bardots, vivants.', sousPositions: ['31.00 Ânes reproducteurs de race pure ; 91.00 Autres (mulets et bardots) reproducteurs de race pure.'] },
  { n: 23, code: '01.02', designation: 'Animaux vivants de l\'espèce bovine.', sousPositions: ['21.00 - Bovins domestiques reproducteurs de race pure.'] },
  { n: 24, code: '01.03', designation: 'Animaux vivants de l\'espèce porcine.', sousPositions: ['10.00 - Reproducteurs de race pure.'] },
  { n: 25, code: '01.04', designation: 'Animaux vivants de l\'espèce ovine ou caprine.', sousPositions: ['10.00 De l\'espèce ovine, reproducteurs de race pure ; 20.00 De l\'espèce caprine, reproducteurs de race pure.'] },
  { n: 26, code: '01.05', designation: 'Coqs, poulets, canards, oies, dindons, dindes et pintades, vivants, des espèces domestiques, d\'un poids n\'excédant pas 185 g.', sousPositions: ['11.10 - Coqs et poules : poussins d\'un jour.'] },
  { n: 27, code: '04.07', designation: 'Œufs d\'oiseaux, en coquilles, frais, conservés ou cuits - œufs fertilisés destinés à l\'incubation.', sousPositions: ['11.00 De volailles de l\'espèce Gallus domesticus ; 19.00 Autres.'] },
  { n: 28, code: '07.01', designation: 'Pommes de terre, à l\'état frais ou réfrigéré.', sousPositions: ['10.00 - De semence.'] },
  { n: 29, code: '07.13', designation: 'Légumes à cosse secs, écossés, même décortiqués ou cassés (uniquement les sous-positions « de semence ») : 10.10 Pois (Pisum sativum) de semence ; 20.10 Pois chiches de semence ; 31.10 Haricots des espèces Vigna mungo (L.) Hepper ou Vigna radiata (L.) Wilczek, de semence ; 32.10 Haricot « Petits rouges » (haricot adzuki, Phaseolus ou Vigna angularis), de semence ; 33.10 Haricots communs (Phaseolus vulgaris), de semence ; 34.10 Pois bambara/pois de terre (Vigna subterranea ou Voandzeia subterranea), de semence ; 35.10 Dolique à œil noir/pois de Brésil/niébé (Vigna unguiculata), de semence ; 39.10 Autres haricots, de semence ; 40.10 Lentilles de semence ; 50.10 Fèves (Vicia faba var. major) et féveroles (Vicia faba var. equina, var. minor), de semence.', sousPositions: [] },
  { n: 30, code: '10.05', designation: 'Maïs.', sousPositions: ['10.10 - De semence.'] },
  { n: 31, code: '10.06', designation: 'Riz.', sousPositions: ['10.10 - Riz en paille (riz paddy), de semence.'] },
  { n: 32, code: '12.09', designation: 'Graines, fruits et spores à ensemencer.', sousPositions: ['10.00 Graines de betteraves à sucre ; 21.00 Graines fourragères de luzerne ; 22.00 De trèfle (Trifolium spp.) ; 23.00 De fétuque ; 24.00 Du pâturin des prés du Kentucky (Poa pratensis L.) ; 25.00 De ray-grass (Lolium multiflorum Lam., Lolium perenne L.) ; 29.00 Autres graines fourragères ; 30.00 Graines de plantes herbacées utilisées principalement pour leurs fleurs ; 91.00 Autres, graines de légumes ; 99.00 Autres.'] },
  { n: 33, code: '23.01', designation: 'Farines, poudres et agglomérées sous forme de pellets, de viandes, d\'abats, de poissons ou de crustacés, de mollusques ou d\'autres invertébrés aquatiques, impropres à l\'alimentation humaine ; cretons.', sousPositions: ['10.00 Farines, poudres et agglomérées sous forme de pellets, de viandes, d\'abats ; cretons.', 'Farines, poudres et agglomérées sous forme de pellets de poissons.'] },
  { n: 34, code: '2304.00.00', designation: 'Tourteaux et autres résidus solides, même broyés ou agglomérés sous forme de pellets, de l\'extraction de l\'huile de soja.', sousPositions: [] },
  { n: 35, code: '23.09', designation: 'Préparations des types utilisés pour l\'alimentation des animaux.', sousPositions: ['90.10 Additifs alimentaires ; 90.90 Autres.'] },
  { n: 36, code: '29.36', designation: 'Provitamines et vitamines, naturelles ou reproduites par synthèse (y compris les concentrés naturels), ainsi que leurs dérivés utilisés principalement en tant que vitamines, mélangés ou non entre eux, même en solutions.', sousPositions: ['21.00 Vitamine A et ses dérivés ; 22.00 Vitamine B1 et ses dérivés ; 23.00 Vitamine B2 et ses dérivés ; 24.00 Acide D- ou DL-pantothénique (vitamine B3/B5) et ses dérivés ; 25.00 Vitamine B6 et ses dérivés ; 26.00 Vitamine B12 et ses dérivés ; 27.00 Vitamine C et ses dérivés ; 28.00 Vitamine E et ses dérivés ; 29.00 Autres vitamines et leurs dérivés ; 90.00 Autres, y compris les concentrats naturels.'] },
  { n: 37, code: '30.02', designation: 'Sang humain ; sang animal préparé en vue d\'usages thérapeutiques, prophylactiques ou de diagnostic ; antisérums, autres fractions du sang et produits immunologiques, même modifiés ou obtenus par voie biotechnologique ; vaccins, toxines, cultures de micro-organismes (à l\'exclusion des levures) et produits similaires.', sousPositions: ['30.00 - Vaccins pour la médecine vétérinaire.'] },
  { n: 38, code: '30.03', designation: 'Médicaments (à l\'exclusion des produits des n°s 30.02, 30.05 ou 30.06) constitués de produits mélangés entre eux, préparés à des fins thérapeutiques ou prophylactiques, ni présentés sous forme de doses ni conditionnés pour la vente au détail.', sousPositions: ['90.00 - Autres.'] },
  { n: 39, code: '30.04', designation: 'Médicaments (à l\'exclusion des produits des n°s 30.02, 30.05 ou 30.06) constitués de produits mélangés ou non, préparés à des fins thérapeutiques ou prophylactiques, présentés sous forme de doses (y compris ceux administrés par voie percutanée) ou conditionnés pour la vente au détail.', sousPositions: ['90.90 - Autres.'] },
  { n: 40, code: '31.02', designation: 'Engrais minéraux ou chimiques azotés.', sousPositions: ['10.00 - Urée, même en solution aqueuse.'] },
  { n: 41, code: '31.03', designation: 'Engrais minéraux ou chimiques phosphatés.', sousPositions: ['10.00 - Superphosphates.'] },
  { n: 42, code: '31.04', designation: 'Engrais minéraux ou chimiques potassiques.', sousPositions: ['30.00 - Sulfate de potassium.'] },
  { n: 43, code: '31.05', designation: 'Engrais minéraux ou chimiques contenant deux ou trois des éléments fertilisants azote, phosphore et potassium ; autres engrais ; produits du chapitre présentés en tablettes ou formes similaires, ou en emballages d\'un poids brut n\'excédant pas 10 kg.', sousPositions: ['20.00 - Engrais minéraux ou chimiques contenant les trois éléments fertilisants azote, phosphore et potassium.'] },
  { n: 44, code: '38.08', designation: 'Insecticides, antirongeurs, fongicides, herbicides, inhibiteurs de germination et régulateurs de croissance pour plantes, désinfectants et produits similaires, présentés dans des formes ou emballages de vente au détail ou à l\'état de préparations, ou sous forme d\'articles (rubans, mèches, bougies soufrées, papier tue-mouches).', sousPositions: ['92.00 Fongicides ; 93.00 Herbicides, inhibiteurs de germination et régulateurs de croissance pour plantes ; Autres (antirongeurs).'] },
]

const LISTE_INTRANTS_PHARMACEUTIQUES: { n: number; label: string; position: string }[] = [
  { n: 1, label: 'Acétate de soude', position: '29.15.39.00' },
  { n: 2, label: 'Acétone', position: '29.14.11.00' },
  { n: 3, label: 'Acide salicylique', position: '29.18.21.00' },
  { n: 4, label: 'Acide ascorbique Vit. C', position: '29.36.27.00' },
  { n: 5, label: 'Acide benzoïque', position: '29.16.31.00' },
  { n: 6, label: 'Acide borique', position: '28.10.00.00' },
  { n: 7, label: 'Acide chlorhydrique', position: '28.06.10.00' },
  { n: 8, label: 'Acide citrique', position: '29.18.14.00' },
  { n: 9, label: 'Acide folique', position: '29.36.29.00' },
  { n: 10, label: 'Acide formique', position: '29.15.11.00' },
  { n: 11, label: 'Acide lactique', position: '29.18.11.00' },
  { n: 12, label: 'Acide sulfurique', position: '28.07.00.00' },
  { n: 13, label: 'Aérosil (dioxyde de silicium)', position: '28.11.22.00' },
  { n: 14, label: 'Alcool de bon goût', position: '22.07.10.00' },
  { n: 15, label: 'Alcool dénaturé à l’éther 98%', position: '22.07.20.10' },
  { n: 16, label: 'Alcool isoproplique', position: '22.07.10.00' },
  { n: 17, label: 'Aluminium foil diverses dimensions', position: '76.07.11.00' },
  { n: 18, label: 'Aluminium hydroxyde gel', position: '28.33.22.00' },
  { n: 19, label: 'Aloe vera gel', position: '13.01.39.00' },
  { n: 20, label: 'Alpha tocophérol (Vit. E) liquide', position: '29.36.28.00' },
  { n: 21, label: 'Alpha tocophérol (Vit. E) poudre', position: '29.36.28.00' },
  { n: 22, label: 'Aluminium (de fermeture de bocal)', position: '76.07.11.00' },
  { n: 23, label: 'Alvéoles ovules (diverses dimensions)', position: '39.93.90.00' },
  { n: 24, label: 'Amidon de froment', position: '11.08.11.00' },
  { n: 25, label: 'Amidon de maïs', position: '11.08.12.00' },
  { n: 26, label: 'Aminophylline anhydre', position: '29.39.49.00' },
  { n: 27, label: 'Ammonium chlorure', position: '28.27.10.10' },
  { n: 28, label: 'Ammonium ferrique citrate', position: '29.18.15.00' },
  { n: 29, label: 'Amodiaquine base', position: '29.42.00.00' },
  { n: 30, label: 'Amodiaquine chlorhydrate', position: '29.42.00.00' },
  { n: 31, label: 'Analgine', position: '29.42.00.00' },
  { n: 32, label: 'Anéthol', position: '29.42.00.00' },
  { n: 33, label: 'Anhydride acétique', position: '29.15.24.00' },
  { n: 34, label: 'Anise oil', position: '33.02.10.10' },
  { n: 35, label: 'Artesunate', position: '29.42.00.00' },
  { n: 36, label: 'Arthermeter', position: '29.42.00.00' },
  { n: 37, label: 'Ashpartam', position: '29.40.00.00' },
  { n: 38, label: 'Aspirine poudre', position: '29.18.00.00' },
  { n: 39, label: 'Atropine sulfate', position: '29.39.99.00' },
  { n: 40, label: 'Avicel (cellulose microcristalline)', position: '39.12.90.00' },
  { n: 41, label: 'Balsam Pérou', position: '13.01.00.00' },
  { n: 42, label: 'Balsam tolu (baume de Pérou) x 1 kg', position: '13.01.00.00' },
  { n: 43, label: 'Banana flavour', position: '33.02.10.10' },
  { n: 44, label: 'Bees wax x 1 kg', position: '15.21.90.00' },
  { n: 45, label: 'Bentonite', position: '25.08.10.00' },
  { n: 46, label: 'Benzalkonium chlorure', position: '29.42.00.00' },
  { n: 47, label: 'Benzoate de sodium', position: '29.16.31.00' },
  { n: 48, label: 'Benzocaine', position: '29.16.31.00' },
  { n: 49, label: 'Benzyl benzoate', position: '29.16.31.00' },
  { n: 50, label: 'BHT', position: '29.02.30.00' },
  { n: 51, label: 'Bicarbonate de soude', position: '28.36.99.00' },
  { n: 52, label: 'Borax', position: '28.48.20.00' },
  { n: 53, label: 'Bisacodyl', position: '29.22.50.00' },
  { n: 54, label: 'Bismuth oxyde', position: '28.29.90.00' },
  { n: 55, label: 'Bismuth subgalate', position: '28.25.90.00' },
  { n: 56, label: 'Bismuth subiodide', position: '28.25.90.00' },
  { n: 57, label: 'Bleu de Méthylène', position: '38.07.00.00' },
  { n: 58, label: 'Bleu indigo carmine', position: '32.03.00.10' },
  { n: 59, label: 'Brillant Blue Supra', position: '32.04.19.90' },
  { n: 60, label: 'Bromhexine Hcl', position: '29.42.00.00' },
  { n: 61, label: 'Bronopol', position: '29.42.00.00' },
  { n: 62, label: 'C.M.C. NA', position: '39.12.90.00' },
  { n: 63, label: 'Caféine Anhydre', position: '29.39.30.00' },
  { n: 64, label: 'Calcium de carbonate', position: '28.36.50.00' },
  { n: 65, label: 'Calcium pantothenate', position: '28.36.50.00' },
  { n: 66, label: 'Camphosulfonate de Soude', position: '29.42.00.00' },
  { n: 67, label: 'Camphrée Synthétique DBE', position: '29.42.00.00' },
  { n: 68, label: 'Capsicum oil', position: '33.01.90.00' },
  { n: 69, label: 'Capsules vides', position: '96.02.00.00' },
  { n: 70, label: 'Caramel pharma', position: '17.02.90.00' },
  { n: 71, label: 'Carbocisteine', position: '29.30.90.00' },
  { n: 72, label: 'Carbomer 940', position: '29.42.00.00' },
  { n: 73, label: 'Carbon Tetra Chlorid', position: '29.03.14.00' },
  { n: 74, label: 'Carbonate de soude', position: '33.01.90.00' },
  { n: 75, label: 'Carbopol 940', position: '29.42.00.00' },
  { n: 76, label: 'Carmellose', position: '29.40.00.00' },
  { n: 77, label: 'Carmoisine Supra', position: '32.03.00.00' },
  { n: 78, label: 'Carnauba', position: '15.21.10.00' },
  { n: 79, label: 'Castor Oil', position: '15.15.30.00' },
  { n: 80, label: 'Cefadroxyl Monohydrate', position: '33.01.90.00' },
  { n: 81, label: 'Cetirizine dihydrochloride', position: '29.42.00.00' },
  { n: 82, label: 'Cetrimide', position: '29.42.00.00' },
  { n: 83, label: 'Charbon actif', position: '38.02.10.00' },
  { n: 84, label: 'Chaux éteinte', position: '38.02.10.00' },
  { n: 85, label: 'Chemi Gum', position: '25.22.20.00' },
  { n: 86, label: 'Chloramphénicol Base', position: '29.41.40.00' },
  { n: 87, label: 'Chloramphénicol palmitate', position: '29.41.00.00' },
  { n: 88, label: 'Chlorhexidine Gluconate', position: '29.42.10.00' },
  { n: 89, label: 'Chloroforme', position: '29.03.13.00' },
  { n: 90, label: 'Chloropheniramine Maleate BP', position: '29.42.00.00' },
  { n: 91, label: 'Chloroquine Diphosphate', position: '29.42.00.00' },
  { n: 92, label: 'Chloroxylenol', position: '29.42.00.00' },
  { n: 93, label: 'Chlorure de Baryum', position: '28.27.39.00' },
  { n: 94, label: 'Chlorure de Potassium', position: '28.27.39.00' },
  { n: 95, label: 'Chlorure de Sodium', position: '25.01.00.91' },
  { n: 96, label: 'Chlorzoxane', position: '29.42.00.00' },
  { n: 97, label: 'Chocolate Brown Colour', position: '32.04.17.90' },
  { n: 98, label: 'Cholecalciferol (vit d 3) pow x 1 grm', position: '29.36.29.00' },
  { n: 99, label: 'Choline Theophlilline', position: '29.23.10.00' },
  { n: 100, label: 'Cinamon Oil', position: '33.01.90.00' },
  { n: 101, label: 'Ciprofloaxacine Base', position: '29.42.00.00' },
  { n: 102, label: 'Ciprofloaxacine HCL', position: '29.42.00.00' },
  { n: 103, label: 'Ciprofloaxacine Chlorhydrated', position: '29.42.00.00' },
  { n: 104, label: 'Ciprolaxine diffuporm', position: '29.42.00.00' },
  { n: 105, label: 'Citrate de pipérazine', position: '29.18.15.00' },
  { n: 106, label: 'Citrate de sodium', position: '29.18.15.00' },
  { n: 107, label: 'Clotrimazole', position: '29.42.00.00' },
  { n: 108, label: 'Clove Oil 86', position: '33.01.90.00' },
  { n: 109, label: 'Coco buter', position: '18.04.00.00' },
  { n: 110, label: 'Codeine Phosphate', position: '29.39.11.00' },
  { n: 111, label: 'Cola Extract', position: '21.06.00.00' },
  { n: 112, label: 'Color red amaranth', position: '32.04.17.00' },
  { n: 113, label: 'Color erythrosine lake', position: '32.04.17.00' },
  { n: 114, label: 'Color Erytrocine', position: '32.04.17.00' },
  { n: 115, label: 'Colorants pharmaceutique (Toutes formes)', position: '32.04.17.00' },
  { n: 116, label: 'Cramoisine colour', position: '32.04.17.00' },
  { n: 117, label: 'Creosole Oil', position: '33.01.90.00' },
  { n: 118, label: 'Cyanocoblamine (Vit B12)', position: '29.36.26.00' },
  { n: 119, label: 'Cyclamate de Soude', position: '29.40.00.00' },
  { n: 120, label: 'Cyproheptadine chlorhydrate', position: '29.42.00.00' },
  { n: 121, label: 'D-Califerol (Vit.D3)', position: '29.36.90.00' },
  { n: 122, label: 'Dexamenthasone', position: '29.42.00.00' },
  { n: 123, label: 'Dextromethorphan Hydrobromide', position: '29.42.00.00' },
  { n: 124, label: 'Dextrpropoxyphene HCL', position: '29.42.00.00' },
  { n: 125, label: 'Dextrroze onhydrus', position: '29.42.00.00' },
  { n: 126, label: 'Di basic calcium phosphate', position: '28.35.26.00' },
  { n: 127, label: 'Diazepam poudre', position: '29.42.00.00' },
  { n: 128, label: 'Diclofenac sodique', position: '29.42.00.00' },
  { n: 129, label: 'Diethylcarbamazine citrate', position: '29.18.15.00' },
  { n: 130, label: 'Dihydroartemisine', position: '29.42.00.00' },
  { n: 131, label: 'Dimethicone 30%', position: '29.42.00.00' },
  { n: 132, label: 'Dimeticone 20', position: '29.42.00.00' },
  { n: 133, label: 'Dioxyde de titane rutile 902', position: '32.06.00.00' },
  { n: 134, label: 'Diphenydramine', position: '29.32.00.00' },
  { n: 135, label: 'Diphenoxylate', position: '29.32.00.00' },
  { n: 136, label: 'Dipyrone poudre', position: '29.42.00.00' },
  { n: 137, label: 'Disodium Edta', position: '29.42.00.00' },
  { n: 138, label: 'Dithranol poudre', position: '29.42.00.00' },
  { n: 139, label: 'DL Methionine USP', position: '29.42.00.00' },
  { n: 140, label: 'Domperidon', position: '29.42.00.00' },
  { n: 141, label: 'Ecorces de quinquina', position: '12.11.90.00' },
  { n: 142, label: 'Elsine Monohydrochloride', position: '29.42.00.00' },
  { n: 143, label: 'Ephedrine', position: '29.33.00.00' },
  { n: 144, label: 'Erythomycine Strearate', position: '29.41.00.00' },
  { n: 145, label: 'Erythomycin estolate', position: '29.41.00.00' },
  { n: 146, label: 'Essence d’anethol', position: '33.01.09.00' },
  { n: 147, label: 'Essence de Banane', position: '33.01.09.00' },
  { n: 148, label: 'Essence de Mandarine', position: '33.01.09.00' },
  { n: 149, label: 'Essence de Mangue poudre', position: '33.01.09.00' },
  { n: 150, label: 'Essence de peperment oil', position: '33.01.09.00' },
  { n: 151, label: 'Essence de pineapple liquide', position: '33.01.09.00' },
  { n: 152, label: 'Essence de rasberry', position: '33.01.09.00' },
  { n: 153, label: 'Essence de Turpentine', position: '33.01.09.00' },
  { n: 154, label: 'Essence de tutti fruti', position: '33.01.09.00' },
  { n: 155, label: 'Essence de vanile', position: '33.01.09.00' },
  { n: 156, label: 'Essence d’Eucalyptus', position: '33.01.09.00' },
  { n: 157, label: 'Essence d’orange liquide', position: '33.01.09.00' },
  { n: 158, label: 'Essence d’orange poudre', position: '33.01.09.00' },
  { n: 159, label: 'Essence mixed frute', position: '33.01.09.00' },
  { n: 160, label: 'Essence pineapple pouder', position: '33.01.09.00' },
  { n: 161, label: 'Essence lemon lime', position: '33.01.09.00' },
  { n: 162, label: 'Essence fragrances', position: '33.01.09.00' },
  { n: 163, label: 'Eucalyptus Oil', position: '33.01.09.00' },
  { n: 164, label: 'Extrait Fluide de Balladone', position: '33.01.09.00' },
  { n: 165, label: 'Extrait Fluide d’Ippeca', position: '33.01.09.00' },
  { n: 166, label: 'Flavour Clarty (w)', position: '33.02.10.10' },
  { n: 167, label: 'Furosemide', position: '29.42.00.00' },
  { n: 168, label: 'Gélatine poudre', position: '35.03.00.90' },
  { n: 169, label: 'Gélatine poudre', position: '12.11.00.00' },
  { n: 170, label: 'Ginger Flavour', position: '33.02.10.10' },
  { n: 171, label: 'Glibenclamide', position: '29.42.00.00' },
  { n: 172, label: 'Glucose liquide', position: '15.20.00.00' },
  { n: 173, label: 'Glycérine', position: '15.20.00.00' },
  { n: 174, label: 'Glycérine 99%', position: '15.20.00.00' },
  { n: 175, label: 'Glycirrhiza Glabra', position: '33.01.90.00' },
  { n: 176, label: 'Glycolate sodique d’amidon', position: '11.08.19.00' },
  { n: 177, label: 'Glyconate de calcium', position: '28.05.12.00' },
  { n: 178, label: 'Gomme Adragente', position: '13.01.00.00' },
  { n: 179, label: 'Gomme Arabique', position: '13.01.00.00' },
  { n: 180, label: 'Gomme xanthan', position: '13.01.00.00' },
  { n: 181, label: 'Griseofulvine', position: '29.42.00.00' },
  { n: 182, label: 'Guanephenesine', position: '29.42.00.00' },
  { n: 183, label: 'Gomme Accacia', position: '13.01.00.00' },
  { n: 184, label: 'Gomme Guar', position: '13.01.00.00' },
  { n: 185, label: 'H.P.M.C', position: '13.01.00.00' },
  { n: 186, label: 'Huile de paraffine', position: '29.12.20.00' },
  { n: 187, label: 'Huile de pin', position: '38.05.10.00' },
  { n: 188, label: 'Huile de Ricin', position: '15.15.30.00' },
  { n: 189, label: 'Hydrocortisone Acetate', position: '29.37.21.00' },
  { n: 190, label: 'Hydrogen peroxide', position: '29.37.21.00' },
  { n: 191, label: 'Hydrosyde d’Aluminium', position: '28.18.30.00' },
  { n: 192, label: 'Hydrosyde de Magnesium', position: '28.16.10.00' },
  { n: 193, label: 'Hydroxide pottasium', position: '28.15.20.00' },
  { n: 194, label: 'Hydroxyde de sodium pallets', position: '28.15.20.00' },
  { n: 195, label: 'Hydroxypropymethy Cellulose', position: '39.12.90.00' },
  { n: 196, label: 'Ibuprofene', position: '29.42.00.00' },
  { n: 197, label: 'Ichtamole', position: '29.42.00.00' },
  { n: 198, label: 'Indion', position: '29.42.00.00' },
  { n: 199, label: 'Indomethacine', position: '29.42.00.00' },
  { n: 200, label: 'Insta coat 1c-u-5579, red', position: '29.42.00.00' },
  { n: 201, label: 'Insta Glow', position: '29.42.00.00' },
  { n: 202, label: 'Instacota universal white', position: '28.01.20.00' },
  { n: 203, label: 'Lode Métallique', position: '28.01.20.00' },
  { n: 204, label: 'Lodure de potasium', position: '28.27.60.00' },
  { n: 205, label: 'Isopropyl alcohom', position: '21.07.23.00' },
  { n: 206, label: 'Itchol', position: '33.02.10.10' },
  { n: 207, label: 'Jasmine Parfum', position: '33.02.10.10' },
  { n: 208, label: 'Kaolin light', position: '25.07.00.00' },
  { n: 209, label: 'Ketoconazole', position: '29.42.00.00' },
  { n: 210, label: 'Lactose', position: '04.04.90.90' },
  { n: 211, label: 'Lanoline x 1 kg', position: '15.05.00.00' },
  { n: 212, label: 'Lauryl Sulfate Sodique', position: '29.42.00.00' },
  { n: 213, label: 'Lavamisole', position: '29.42.00.00' },
  { n: 214, label: 'Lidocaine', position: '29.42.00.00' },
  { n: 215, label: 'Liquorice Powder', position: '04.04.90.00' },
  { n: 216, label: 'L-Lysine', position: '29.22.41.00' },
  { n: 217, label: 'Lumefantrine', position: '29.42.00.00' },
  { n: 218, label: 'Magnesium alluminium silicate', position: '28.39.90.00' },
  { n: 219, label: 'Magnesium Hydroxyde Paste', position: '28.16.10.00' },
  { n: 220, label: 'Magnesium Strearate', position: '29.15.70.00' },
  { n: 221, label: 'Magnesium Sulphate', position: '28.33.21.00' },
  { n: 222, label: 'Magnesium Trisilicate', position: '28.39.90.00' },
  { n: 223, label: 'Mebendazole HCL', position: '29.42.00.00' },
  { n: 224, label: 'Menthol Crystal', position: '29.06.11.00' },
  { n: 225, label: 'Merbromine', position: '29.42.00.00' },
  { n: 226, label: 'Meprobamate', position: '29.41.11.00' },
  { n: 227, label: 'Metformin hydrochloride', position: '29.42.00.00' },
  { n: 228, label: 'Metabisulfite sodium', position: '29.32.10.00' },
  { n: 229, label: 'Methy chloride', position: '29.03.11.00' },
  { n: 230, label: 'Methyl paraben sodium', position: '29.42.00.00' },
  { n: 231, label: 'Methyl salicylate', position: '29.42.00.00' },
  { n: 232, label: 'Methyl testosterone', position: '29.42.00.00' },
  { n: 233, label: 'Methyldopa', position: '29.03.12.00' },
  { n: 234, label: 'Methylène Chlorure', position: '29.42.00.00' },
  { n: 235, label: 'Metronidazole benzoate', position: '29.42.00.00' },
  { n: 236, label: 'Metronidazole Base', position: '29.42.00.00' },
  { n: 237, label: 'Mixed Fruit Flavour Liquide', position: '33.02.10.10' },
  { n: 238, label: 'Mixed Fruit Flavour Poudre', position: '33.02.10.10' },
  { n: 239, label: 'Neomycine sulfate', position: '29.41.00.00' },
  { n: 240, label: 'Nicotinamide', position: '29.36.00.00' },
  { n: 241, label: 'Nipagine Sel Sodique', position: '29.42.00.00' },
  { n: 242, label: 'Nipasol Sel Sodique', position: '29.42.00.00' },
  { n: 243, label: 'Nitrofurantoine', position: '29.41.00.00' },
  { n: 244, label: 'Nitrofuroxazide', position: '29.42.00.00' },
  { n: 245, label: 'Norfloxacine', position: '29.42.00.00' },
  { n: 246, label: 'Nipagine Base', position: '29.42.00.00' },
  { n: 247, label: 'Nystatin BP/USP', position: '29.42.00.00' },
  { n: 248, label: 'Nystatine Granule 5%', position: '29.42.00.00' },
  { n: 249, label: 'Ocimum Sanctum', position: '29.42.00.00' },
  { n: 250, label: 'Oleic Acid', position: '29.42.00.00' },
  { n: 251, label: 'Oleoresin capscum 59', position: '33.01.10.10' },
  { n: 252, label: 'Ondansetron hcl dihydrate', position: '29.42.00.00' },
  { n: 253, label: 'Opadry', position: '29.42.00.00' },
  { n: 254, label: 'Oxyde de zinc', position: '28.17.00.00' },
  { n: 255, label: 'P.V.P.K-30', position: '29.42.00.00' },
  { n: 256, label: 'Panthenol', position: '29.36.00.00' },
  { n: 257, label: 'Papaverine HCL', position: '48.05.40.00' },
  { n: 258, label: 'Papier –filtre', position: '48.05.40.00' },
  { n: 259, label: 'Paracetamol Plain DC 90%', position: '29.42.00.00' },
  { n: 260, label: 'Paraffine Liquide', position: '27.12.20.00' },
  { n: 261, label: 'Parafin wax', position: '27.12.20.00' },
  { n: 262, label: 'Pectine de pomme', position: '13.02.20.00' },
  { n: 263, label: 'Pectine poudre', position: '29.42.00.00' },
  { n: 264, label: 'Pen-V-potasium', position: '29.41.10.10' },
  { n: 265, label: 'Peppermint Flavour', position: '33.02.10.10' },
  { n: 266, label: 'Phenobarbital', position: '29.33.53.00' },
  { n: 267, label: 'Phenyl mercure act.gr', position: '29.42.00.00' },
  { n: 268, label: 'Phenyleprine HCL', position: '29.42.00.00' },
  { n: 269, label: 'Phosphate acide Dissodique', position: '28.35.22.00' },
  { n: 270, label: 'Phosphate Dicalcique', position: '28.35.22.00' },
  { n: 271, label: 'Pine Oil 40', position: '33.02.90.00' },
  { n: 272, label: 'Pineapple Flavour', position: '33.02.90.00' },
  { n: 273, label: 'Piperaquine Phosphate', position: '29.42.90.00' },
  { n: 274, label: 'Pippermint Oil', position: '33.01.90.00' },
  { n: 275, label: 'Plante médicinale', position: '12.11.00.00' },
  { n: 276, label: 'Polyoxyl 40 hydrogel Nated Castrol Oil', position: '33.01.90.00' },
  { n: 277, label: 'Polyoxyl 40 strearate', position: '29.15.70.00' },
  { n: 278, label: 'Potasium dhydrogieno Phosphate', position: '28.35.22.00' },
  { n: 279, label: 'Potassium Hydroxyde', position: '28.15.20.00' },
  { n: 280, label: 'Potassium lodine', position: '28.42.00.00' },
  { n: 281, label: 'Poudre d’amoxycilline (toutes formes)', position: '29.41.90.00' },
  { n: 282, label: 'Poudre d’ampicilline', position: '29.41.90.00' },
  { n: 283, label: 'Poudre de Quinine (divers formes)', position: '29.31.21.00' },
  { n: 284, label: 'Povidone lodine', position: '29.42.00.00' },
  { n: 285, label: 'Prednisolone', position: '29.42.00.00' },
  { n: 286, label: 'Promethazine HCL', position: '29.42.00.00' },
  { n: 287, label: 'Propyl paraben sodium', position: '29.42.00.00' },
  { n: 288, label: 'Propyl paraben sodium', position: '29.42.00.00' },
  { n: 289, label: 'Propyl paraben', position: '29.42.00.00' },
  { n: 290, label: 'Propyl paraben', position: '29.42.00.00' },
  { n: 291, label: 'Propyphenazone', position: '29.42.00.00' },
  { n: 292, label: 'Proteine hydrolydate liquide 20%', position: '29.42.00.00' },
  { n: 293, label: 'Pyrantel Pamoate', position: '29.42.00.00' },
  { n: 294, label: 'Pyridoxine HCL Vit. B6', position: '29.36.00.00' },
  { n: 295, label: 'Pyrimethamine', position: '29.42.00.00' },
  { n: 296, label: 'Resorcine', position: '29.42.00.00' },
  { n: 297, label: 'Retinol (Vit. A) poudre', position: '29.36.00.00' },
  { n: 298, label: 'Retinol (Vit. A) Palmitate', position: '29.36.21.00' },
  { n: 299, label: 'Ribolflavine 5 Phosphate (Vit B2)', position: '29.36.21.00' },
  { n: 300, label: 'Saccharine Sodique', position: '29.36.21.00' },
  { n: 301, label: 'Saccharine sodique', position: '29.35.11.00' },
  { n: 302, label: 'Salbutamol sulphate', position: '29.36.90.00' },
  { n: 303, label: 'Shellac Powder', position: '13.01.00.00' },
  { n: 304, label: 'Sillicone Deoxyne', position: '39.10.00.00' },
  { n: 305, label: 'Simethicone', position: '29.36.20.00' },
  { n: 306, label: 'Sodium alignate', position: '25.36.20.00' },
  { n: 307, label: 'Sodium benzoate', position: '25.05.00.00' },
  { n: 308, label: 'Sodium bicarbonate', position: '29.16.00.00' },
  { n: 309, label: 'Sodium carbonate (light ash)', position: '28.36.20.00' },
  { n: 310, label: 'Sodium citrate', position: '29.18.15.00' },
  { n: 311, label: 'Sodium CMC', position: '28.19.90.00' },
  { n: 312, label: 'Sodium di-Phosphate', position: '28.35.22.00' },
  { n: 313, label: 'Sodium Glycero Phosphate BPC', position: '29.19.90.00' },
  { n: 314, label: 'Sodium lactate', position: '29.19.90.00' },
  { n: 315, label: 'Sodium meta-bi sulfate', position: '28.33.19.00' },
  { n: 316, label: 'Sodium Strach Glycolate', position: '29.05.11.00' },
  { n: 317, label: 'Sodium laury sulphat', position: '28.33.19.00' },
  { n: 318, label: 'Sorbitol liquide', position: '29.05.44.00' },
  { n: 319, label: 'Sorbitol 70%', position: '29.04.44.00' },
  { n: 320, label: 'Soude caustique', position: '28.15.11.00' },
  { n: 321, label: 'Soufre poudre', position: '25.03.00.00' },
  { n: 322, label: 'Steartate de magnesium', position: '29.15.70.00' },
  { n: 323, label: 'Strawberry flavour poudre', position: '33.02.10.10' },
  { n: 324, label: 'Strawberry flavour liquide', position: '33.02.10.10' },
  { n: 325, label: 'Strychnine phosphate', position: '29.39.00.00' },
  { n: 326, label: 'Sulfadoxine', position: '29.42.00.00' },
  { n: 327, label: 'Sulfamethoxazole', position: '29.42.00.00' },
  { n: 328, label: 'Sulfametoxypyrazine', position: '29.42.00.00' },
  { n: 329, label: 'Sulfanilamide', position: '29.42.00.00' },
  { n: 330, label: 'Sulfate de fer', position: '29.33.29.00' },
  { n: 331, label: 'Sulfate de cuivre', position: '28.33.25.00' },
  { n: 332, label: 'Sulfate de Zinc', position: '28.33.29.00' },
  { n: 333, label: 'Sulfogaiacolate K', position: '29.42.00.00' },
  { n: 334, label: 'Sulphur insolube', position: '25.03.00.00' },
  { n: 335, label: 'Sunset yellow', position: '32.06.20.00' },
  { n: 336, label: 'Talc', position: '35.26.20.00' },
  { n: 337, label: 'Tartrazine', position: '29.42.00.00' },
  { n: 338, label: 'Terpentine oil', position: '33.01.00.00' },
  { n: 339, label: 'Terpine oil', position: '29.06.00.00' },
  { n: 340, label: 'Terpine hydrate', position: '33.01.90.00' },
  { n: 341, label: 'Tetramizole', position: '29.42.00.00' },
  { n: 342, label: 'Thiamine (Vit. B 1)', position: '29.36.00.00' },
  { n: 343, label: 'Thiamine HCL', position: '29.30.90.00' },
  { n: 344, label: 'Thio Uree', position: '29.30.90.00' },
  { n: 345, label: 'Thymol', position: '29.42.00.00' },
  { n: 346, label: 'Thyrotricine', position: '29.42.00.00' },
  { n: 347, label: 'Timolol maleate', position: '29.42.00.00' },
  { n: 348, label: 'Tissu filtrant', position: '59.11.40.00' },
  { n: 349, label: 'Totanium dioxyde', position: '32.06.00.00' },
  { n: 350, label: 'Toluèle', position: '29.02.30.00' },
  { n: 351, label: 'Trietanolamine', position: '29.42.00.00' },
  { n: 352, label: 'Trimethoprine', position: '29.41.90.00' },
  { n: 353, label: 'Trisilicate de magnesium', position: '28.39.90.00' },
  { n: 354, label: 'Tween -80', position: '29.42.00.00' },
  { n: 355, label: 'Vanilla flavour liquide', position: '33.02.11.00' },
  { n: 356, label: 'Vanilla flavour poudre', position: '33.02.11.00' },
  { n: 357, label: 'Vaseline blanche pure', position: '27.12.00.00' },
  { n: 358, label: 'Vaseline blanche', position: '27.12.10.00' },
  { n: 359, label: 'Vit. D2 crystalise gr', position: '29.36.00.00' },
  { n: 360, label: 'Vitamine A liquide', position: '29.36.00.00' },
  { n: 361, label: 'Vitamine A palmitate', position: '29.36.00.00' },
  { n: 362, label: 'Vitamine acitate', position: '29.36.28.00' },
  { n: 363, label: 'Vitamine B-1', position: '29.36.00.00' },
  { n: 364, label: 'Vitamine B12. Gr cyno', position: '29.36.00.00' },
  { n: 365, label: 'Vitamine B12.gr Manitol', position: '29.36.00.00' },
  { n: 366, label: 'Vitamine B2 Base', position: '29.36.00.00' },
  { n: 367, label: 'Vitamine B2 Phosphate', position: '29.36.00.00' },
  { n: 368, label: 'Vitamine B6', position: '29.36.00.00' },
  { n: 369, label: 'Vitamine PP', position: '29.36.00.00' },
  { n: 370, label: 'Vitamine -HIS', position: '39.42.00.00' },
  { n: 371, label: 'Witepsol E 76', position: '83.09.90.00' },
  { n: 372, label: 'Xantham Gum', position: '35.05.20.00' },
  { n: 373, label: 'Xylometazoline', position: '29.42.00.00' },
  { n: 374, label: 'Yohimbine HCL', position: '29.39.90.00' },
  { n: 375, label: 'Zinc stearrate', position: '29.15.70.00' },
  { n: 376, label: 'Zinc sulfate', position: '28.33.28.00' },
]


// ─────────────────────────────────────────────────────────────────────────────
// ONGLET : FAIT GÉNÉRATEUR & EXIGIBILITÉ (Art. 24-26)
// ─────────────────────────────────────────────────────────────────────────────
const CAS_FAIT_GENERATEUR = [
  { n: 1, texte: 'Livraison du bien, pour les ventes de biens meubles corporels (y compris à soi-même).' },
  { n: 2, texte: 'Exécution du service ou des travaux (ou de leurs tranches), y compris travaux à façon et travaux immobiliers.' },
  { n: 3, texte: 'Franchissement des frontières de la RDC, pour les importations et les exportations.' },
  { n: 4, texte: 'Mise à la consommation, pour les marchandises placées sous régime douanier suspensif.' },
  { n: 5, texte: 'Sortie des marchandises de la zone franche, en vue de leur mise à la consommation en RDC.' },
  { n: 6, texte: 'Acte de mutation ou de transfert de propriété - à défaut d\'acte, l\'entrée en jouissance - pour les opérations immobilières des promoteurs immobiliers.' },
  { n: 7, texte: 'Acte de mutation, de jouissance ou, à défaut, l\'entrée en jouissance, pour les locations de terrains nus ou de locaux nus par des promoteurs immobiliers.' },
  { n: 8, texte: 'Première utilisation ou première mise en service, pour les biens et services que les redevables se livrent à eux-mêmes.' },
  { n: 9, texte: 'Expiration des périodes de décompte ou d\'encaissement, pour les opérations à décomptes ou paiements successifs (hors vente à tempérament, location, location-vente).' },
  { n: 10, texte: 'Encaissement du prix ou d\'un acompte, pour les autres opérations imposables.' },
]

const CAS_EXIGIBILITE = [
  { n: 1, texte: 'Réalisation du fait générateur, pour les livraisons de biens (y compris à soi-même).' },
  { n: 2, texte: 'Encaissement du prix, des acomptes ou avances, pour les prestations de services et les travaux immobiliers.' },
  { n: 3, texte: 'Enregistrement de la déclaration de mise à la consommation en RDC, pour les biens importés, placés sous régime suspensif, ou sortis de zone franche.' },
  { n: 4, texte: 'Échéance de l\'effet, en cas d\'escompte d\'un effet de commerce.' },
  { n: 5, texte: 'Échéance des intérêts ou des loyers, pour le crédit à la consommation ou le crédit-bail des établissements financiers.' },
  { n: 6, texte: 'Livraison des produits ou perception du préfinancement, pour les opérations liées aux cultures pérennes.' },
  { n: 7, texte: 'Date de mutation ou de transfert de propriété, pour les mutations d\'immeuble - sauf location-vente en habitat social et locations de terrains/locaux nus par les promoteurs immobiliers, où l\'exigibilité intervient à chaque échéance.' },
]

function OngletFaitGenerateurExigibilite() {
  return (
    <div className="space-y-4">
      <DefinitionBox titre="Deux notions distinctes : Art. 24-26">
        <p className="text-xs text-foreground">Le <strong>fait générateur</strong> est l'événement qui fait naître la dette de TVA. L'<strong>exigibilité</strong> est le moment à partir duquel le Trésor peut en réclamer le paiement - les deux coïncident pour les livraisons de biens, mais pas pour les prestations de services (exigibles à l'encaissement, pas à l'exécution).</p>
      </DefinitionBox>

      <details className="group rounded-xl border border-border/60 bg-card">
        <summary className="cursor-pointer select-none list-none flex items-center gap-2 px-3 py-2.5">
          <span className="group-open:rotate-90 transition-transform inline-block text-xs text-muted-foreground">▶</span>
          <p className="text-xs font-bold text-foreground uppercase tracking-wide flex-1">Fait générateur - les {CAS_FAIT_GENERATEUR.length} cas</p>
          <BadgeLoi loi="Art. 24" />
        </summary>
        <div className="px-3 pb-3 grid gap-1.5">
          {CAS_FAIT_GENERATEUR.map(c => (
            <div key={c.n} className="flex items-start gap-2 rounded-lg border border-border/60 bg-background px-3 py-2">
              <span className="text-xs font-mono text-primary/60 shrink-0 mt-0.5">{c.n}.</span>
              <span className="text-xs text-foreground flex-1">{c.texte}</span>
            </div>
          ))}
        </div>
      </details>

      <details className="group rounded-xl border border-blue-200 bg-blue-50/20">
        <summary className="cursor-pointer select-none list-none flex items-center gap-2 px-3 py-2.5">
          <span className="group-open:rotate-90 transition-transform inline-block text-xs text-blue-600/70">▶</span>
          <p className="text-xs font-bold text-foreground uppercase tracking-wide flex-1">Exigibilité - les {CAS_EXIGIBILITE.length} cas</p>
          <BadgeLoi loi="Art. 25" />
        </summary>
        <div className="px-3 pb-3 grid gap-1.5">
          {CAS_EXIGIBILITE.map(c => (
            <div key={c.n} className="flex items-start gap-2 rounded-lg border border-blue-200 bg-blue-50/40 px-3 py-2">
              <span className="text-xs font-mono text-blue-600/70 shrink-0 mt-0.5">{c.n}.</span>
              <span className="text-xs text-foreground flex-1">{c.texte}</span>
            </div>
          ))}
        </div>
      </details>

      <div className="rounded-xl border border-amber-200 bg-amber-50 p-3 space-y-1.5">
        <p className="text-xs font-bold text-amber-700">Option : le régime des débits (Art. 26)</p>
        <p className="text-xs text-foreground">Les entrepreneurs de travaux publics/immobiliers et les prestataires de services qui justifient de circonstances particulières peuvent être autorisés, sur décision du DGI (ou son délégué provincial), à acquitter la TVA <strong>d'après les débits</strong> - l'exigibilité intervient alors à l'inscription au débit du compte du client, et non à l'encaissement. L'autorisation reste valable tant que le redevable ne demande pas par écrit à en sortir. Elle ne dispense pas d'acquitter la TVA à l'encaissement si celui-ci intervient avant le débit.</p>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET : LISTES RÉGLEMENTAIRES (Art. 15-6 et 15-10)
// ─────────────────────────────────────────────────────────────────────────────
function OngletListesReglementaires() {
  const [liste, setListe] = useState<'agricole' | 'pharma'>('agricole')
  const [recherche, setRecherche] = useState('')

  const resultatsAgricole = LISTE_EQUIPEMENTS_AGRICOLES.filter(it =>
    it.designation.toLowerCase().includes(recherche.toLowerCase()) ||
    it.code.toLowerCase().includes(recherche.toLowerCase()) ||
    it.sousPositions.some(s => s.toLowerCase().includes(recherche.toLowerCase()))
  )
  const resultatsPharma = LISTE_INTRANTS_PHARMACEUTIQUES.filter(it =>
    it.label.toLowerCase().includes(recherche.toLowerCase()) || it.position.includes(recherche)
  )

  return (
    <div className="space-y-4">
      <DefinitionBox titre="Seule la position tarifaire exonère : Art. 15-6 et 15-10">
        <p className="text-xs text-foreground">Les intrants agricoles (Art. 15-6) et les produits pharmaceutiques (Art. 15-10) sont exonérés <strong>sur la base d'une liste limitative</strong> fixée par arrêté. L'appartenance à une catégorie générale (« matériel agricole », « produit pharmaceutique ») ne suffit pas - seule la position tarifaire listée ci-dessous exonère.</p>
      </DefinitionBox>

      <div className="flex gap-1 rounded-xl border border-border bg-muted/30 p-2">
        <button onClick={() => { setListe('agricole'); setRecherche('') }}
          className={cn('flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors', liste === 'agricole' ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground')}>
          Équipements agricoles ({LISTE_EQUIPEMENTS_AGRICOLES.length})
        </button>
        <button onClick={() => { setListe('pharma'); setRecherche('') }}
          className={cn('flex-1 rounded-lg py-1.5 text-xs font-medium transition-colors', liste === 'pharma' ? 'bg-card shadow text-foreground' : 'text-muted-foreground hover:text-foreground')}>
          Intrants pharmaceutiques ({LISTE_INTRANTS_PHARMACEUTIQUES.length})
        </button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
        <input value={recherche} onChange={e => setRecherche(e.target.value)}
          placeholder={liste === 'agricole' ? 'Rechercher un équipement ou une position tarifaire...' : 'Rechercher un intrant ou une position tarifaire...'}
          className="w-full rounded-lg border border-border bg-background pl-8 pr-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30" />
      </div>

      {liste === 'agricole' ? (
        <div className="space-y-1.5 max-h-96 overflow-y-auto">
          {resultatsAgricole.map(it => (
            <div key={it.n} className="rounded-lg border border-border/60 bg-card p-3">
              <div className="flex items-start gap-2">
                <span className="text-xs font-mono text-primary/70 shrink-0 mt-0.5">{it.n}. {it.code}</span>
                <span className="text-xs text-foreground flex-1">{it.designation}</span>
              </div>
              {it.sousPositions.length > 0 && (
                <div className="mt-1.5 pl-1 space-y-0.5">
                  {it.sousPositions.map((s, i) => (
                    <p key={i} className="text-xs text-muted-foreground">- {s}</p>
                  ))}
                </div>
              )}
            </div>
          ))}
          {resultatsAgricole.length === 0 && <p className="text-center text-sm text-muted-foreground py-4">Aucune position trouvée</p>}
        </div>
      ) : (
        <div className="rounded-xl border border-border bg-card overflow-hidden">
          <div className="max-h-96 overflow-y-auto divide-y divide-border/30">
            {resultatsPharma.map(it => (
              <div key={it.n} className="flex items-center gap-3 px-3 py-2">
                <span className="text-xs font-mono text-primary/60 shrink-0 min-w-[28px]">{it.n}</span>
                <span className="text-xs text-foreground flex-1">{it.label}</span>
                <span className="text-xs font-mono text-muted-foreground shrink-0">{it.position}</span>
              </div>
            ))}
            {resultatsPharma.length === 0 && <p className="text-center text-sm text-muted-foreground py-4">Aucun intrant trouvé</p>}
          </div>
        </div>
      )}
      <BadgeLoi loi={liste === 'agricole' ? "A. Inter. n° 606 et n° 028 du 10/11/2012" : "A. Inter. n° 016 et n° 328 du 28/12/2011"} />
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET : RÉGIMES DÉROGATOIRES - suspensions sectorielles
// ─────────────────────────────────────────────────────────────────────────────
const REGIMES_DEROGATOIRES = [
  {
    nom: 'Équipements et matériels d\'aviation',
    texte: 'Suspension de la TVA à l\'importation des équipements et matériels d\'aviation (aéronefs ≤ 15 ans, matériels de manutention et de ravitaillement aéroportuaires, pneumatiques neufs, pièces de rechange) importés par les compagnies aériennes de transport public.',
    duree: '3 ans à dater de la signature (27/07/2016)',
    statut: 'expire',
    loi: 'Décret n° 16/029 du 22/07/2016',
  },
  {
    nom: 'Produits de première nécessité',
    texte: 'Suspension de la TVA en régime intérieur et à l\'importation sur 43 positions tarifaires de produits alimentaires de base et biens de première nécessité (viandes, poissons, riz, lait, huiles, sucre, savons, sel iodé...).',
    duree: 'Échéance au 31/12/2023',
    statut: 'expire',
    loi: 'Décret n° 22/30 du 15/10/2022, modifié par le Décret n° 23/15 du 15/04/2023',
  },
  {
    nom: 'Cimenterie et immobilier',
    texte: 'Suspension de la TVA (importation et régime intérieur) sur les matières premières de fabrication du ciment gris, sur la vente du ciment gris produit localement, et sur la vente des bâtiments neufs (≤ 3 ans) des promoteurs immobiliers.',
    duree: 'Échéance au 31/12/2023',
    statut: 'expire',
    loi: 'Décret n° 22/31 du 15/10/2022, modifié par le Décret n° 23/16 du 15/04/2023',
  },
  {
    nom: 'Entreprises pétrolières et minières conventionnelles',
    texte: 'Suspension de la perception de la TVA à l\'importation sur les marchandises importées par les entreprises pétrolières de production et les entreprises minières relevant d\'un régime conventionnel (exonération totale antérieure en matière d\'impôt sur le chiffre d\'affaires).',
    duree: '« Jusqu\'à nouvel ordre » - sans échéance fixe',
    statut: 'verifier',
    loi: 'Arrêté Ministériel n° 072 du 30/12/2011',
  },
  {
    nom: 'Partenariat stratégique sur les chaînes de valeur',
    texte: 'Suspension de la TVA (régime intérieur et importation) sur les matériels/matériaux, intrants et prestations de services liés au projet, pour les entreprises agréées (investissement ≥ 15 millions USD, ≥ 100 emplois créés).',
    duree: '4 ans, extensible selon le programme d\'amortissement',
    statut: 'conditionnel',
    loi: 'Décret n° 13/049 du 06/10/2013',
  },
  {
    nom: 'Marchés publics à financement extérieur',
    texte: 'La fiscalité indirecte (dont la TVA) liée à l\'exécution du marché est prise en charge par l\'État via un titre de paiement - le fournisseur/prestataire ne la supporte pas.',
    duree: 'Durée du marché concerné',
    statut: 'conditionnel',
    loi: 'Arrêté Ministériel n° 076 du 13/01/2012',
  },
  {
    nom: 'Énergie électrique et énergies renouvelables',
    texte: 'Suspension des droits de douane et de la TVA à l\'importation sur l\'énergie électrique, les matériels de production/transport/distribution, les équipements d\'économie d\'énergie et d\'exploitation de l\'énergie solaire/renouvelable.',
    duree: '4 ans (5 ans pour l\'import/export d\'énergie électrique elle-même), renouvelable après évaluation',
    statut: 'verifier',
    loi: 'Décret n° 18/054 du 27/12/2018',
  },
]

function OngletRegimesDerogatoires() {
  const badgeStatut: Record<string, { texte: string; classe: string }> = {
    expire:      { texte: '⚠ Échéance dépassée - vérifier une prorogation', classe: 'bg-red-100 text-red-700 border-red-200' },
    verifier:    { texte: '⚠ Sans échéance fixe - vérifier qu\'aucun texte n\'y a mis fin', classe: 'bg-amber-100 text-amber-700 border-amber-200' },
    conditionnel:{ texte: 'Sous conditions d\'agrément', classe: 'bg-blue-100 text-blue-700 border-blue-200' },
  }
  return (
    <div className="space-y-4">
      <DefinitionBox titre="Des régimes distincts du droit commun">
        <p className="text-xs text-foreground">Ces suspensions de TVA sont des <strong>régimes dérogatoires</strong>, accordés secteur par secteur, distincts de la liste limitative d'exonérations de droit commun (Art. 15-19). Vérifier systématiquement l'éligibilité précise (secteur, produit exact, échéance non expirée) avant d'affirmer qu'une suspension s'applique à une opération donnée.</p>
      </DefinitionBox>

      <div className="grid gap-2">
        {REGIMES_DEROGATOIRES.map((r, i) => {
          const b = badgeStatut[r.statut]
          return (
            <details key={i} className="group rounded-xl border border-border/60 bg-card">
              <summary className="cursor-pointer select-none list-none flex items-center gap-2 px-3 py-2.5">
                <span className="group-open:rotate-90 transition-transform inline-block text-xs text-muted-foreground shrink-0">▶</span>
                <p className="text-xs font-bold text-foreground flex-1">{r.nom}</p>
                {b && <span className={cn('text-xs font-medium rounded-full px-2 py-0.5 shrink-0 border', b.classe)}>{b.texte}</span>}
              </summary>
              <div className="px-3 pb-3 space-y-1.5">
                <p className="text-xs text-muted-foreground">{r.texte}</p>
                <p className="text-xs text-foreground/70"><strong>Durée :</strong> {r.duree}</p>
                <BadgeLoi loi={r.loi} />
              </div>
            </details>
          )
        })}
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET : FACTURE NORMALISÉE & DEF
// ─────────────────────────────────────────────────────────────────────────────
function OngletFactureDEF() {
  return (
    <div className="space-y-4">
      <DefinitionBox titre="Dispositifs électroniques fiscaux (DEF) : Décret n° 23/10 du 03/03/2023">
        <p className="text-xs text-foreground">Un DEF est un appareil ou un logiciel <strong>homologué</strong> par l'Administration des Impôts, destiné à produire la facture normalisée. Il existe sous forme physique ou dématérialisée.</p>
      </DefinitionBox>

      <div className="space-y-3">
        <SectionTitre texte="Les quatre types de DEF" loi="Art. 5-10" />
        <div className="grid gap-2">
          {[
            { sigle: 'UF', nom: 'Unité de Facturation', desc: 'Appareil physique homologué qui enregistre les données de facturation, gère les articles, imprime les factures et transmet les données au serveur de l\'Administration.' },
            { sigle: 'MCF', nom: 'Module de Contrôle de Facturation', desc: 'Appareil physique homologué, connecté à un Système de Facturation d\'Entreprise (SFE) homologué : collecte, traite et transmet les données de facturation.' },
            { sigle: 'e-UF', nom: 'Unité de Facturation dématérialisée', desc: 'Application de l\'Administration mise à disposition des entreprises sans système de facturation propre - mêmes fonctions que l\'UF, sans appareil physique.' },
            { sigle: 'e-MCF', nom: 'Module de Contrôle dématérialisé', desc: 'Application de l\'Administration pour les entreprises disposant déjà d\'un SFE homologué - mêmes fonctions que le MCF, sans appareil physique.' },
          ].map((d, i) => (
            <div key={i} className="rounded-lg border border-border/60 bg-card p-3 flex items-start gap-3">
              <span className="text-xs font-mono font-bold text-primary bg-primary/10 rounded-lg px-2 py-1 shrink-0">{d.sigle}</span>
              <div>
                <p className="text-xs font-semibold text-foreground">{d.nom}</p>
                <p className="text-xs text-muted-foreground mt-0.5">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-muted-foreground italic">Seuls les DEF (UF/MCF) et les SFE homologués peuvent être vendus et utilisés en RDC pour produire une facture normalisée (Art. 11 et 20).</p>
      </div>

      <div className="space-y-3">
        <SectionTitre texte="Mentions obligatoires de la facture normalisée" loi="Art. 26" />
        <div className="rounded-xl border border-border bg-muted/20 p-3">
          <div className="flex flex-wrap gap-1.5">
            {[
              'Identité et n° impôt du vendeur/prestataire', 'Identité et n° impôt du client', 'Date et n° de série',
              'Désignation et quantité', 'Prix unitaire et global', 'Prix hors TVA', 'Taux et montant de TVA',
              'Montant non taxable', 'Montant TTC', 'Montant des autres impôts/taxes',
            ].map((m, i) => (
              <span key={i} className="text-xs rounded-lg border border-border bg-card px-2 py-1 text-foreground">{m}</span>
            ))}
          </div>
          <div className="mt-2 flex items-center gap-1.5">
            <QrCode className="h-3.5 w-3.5 text-rose-600 shrink-0" />
            <span className="text-xs rounded-lg border border-rose-200 bg-rose-50 px-2 py-1 text-rose-700 font-medium">N° d'identification du DEF + code d'authentification et QR code</span>
          </div>
          <p className="text-xs text-muted-foreground mt-1.5">Un document tenant lieu de facture normalisée reprend toutes ces mentions, sauf les deux dernières (n° DEF, code d'authentification/QR).</p>
        </div>
      </div>

      <div className="space-y-3">
        <SectionTitre texte="Retenue à la source par le Trésor Public" loi="Circ. n° 002 du 03/07/2023" />
        <div className="rounded-xl border border-blue-200 bg-blue-50/40 p-3 space-y-2">
          <p className="text-xs text-foreground">Sur les paiements aux fournisseurs et prestataires de l'État, la TVA facturée est retenue à la source et reversée directement au Trésor, selon trois procédures possibles :</p>
          <div className="grid gap-1.5">
            {[
              { n: '1', titre: 'Procédure normale', desc: 'Deux ordres de paiement (fournisseur : montant HT ; DGI : TVA retenue), via la chaîne de la dépense publique.' },
              { n: '2', titre: 'Procédure d\'urgence', desc: 'Sur instruction du Ministre des Finances : deux domiciliations distinctes. Relevé transmis au plus tard le 5 du mois suivant.' },
              { n: '3', titre: 'Déconcentration de l\'ordonnancement', desc: 'Les Ordonnateurs sectoriels établissent les deux ordres de paiement. Relevé mensuel transmis au plus tard le 5 du mois suivant.' },
            ].map(p => (
              <div key={p.n} className="flex items-start gap-2 rounded-lg bg-white/60 border border-blue-200 px-3 py-2">
                <span className="text-xs font-bold text-blue-600 shrink-0">{p.n}</span>
                <div>
                  <p className="text-xs font-semibold text-foreground">{p.titre}</p>
                  <p className="text-xs text-muted-foreground">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-xs text-blue-700">Dans les trois cas, la déclaration de TVA retenue à la source est déposée auprès de la Direction des Grandes Entreprises au plus tard le <strong>15 du mois</strong> suivant le paiement des factures.</p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// ONGLET : COMPTABILITÉ & NUMÉRO TVA
// ─────────────────────────────────────────────────────────────────────────────
function OngletComptabiliteNumeroTVA() {
  return (
    <div className="space-y-4">
      <DefinitionBox titre="Numéro TVA : Art. 54">
        <p className="text-xs text-foreground">Tout assujetti à la TVA est identifié par un <strong>numéro TVA</strong> dont les modalités d'attribution sont fixées par Arrêté du Ministre des Finances. Il doit, à cet effet, souscrire une <strong>déclaration d'assujettissement</strong> auprès de l'Administration des Impôts <strong>avant le début de ses activités</strong>.</p>
      </DefinitionBox>

      <div className="space-y-3">
        <SectionTitre texte="Comptabilité obligatoire" loi="Art. 57" />
        <p className="text-xs text-muted-foreground">Tout assujetti à la TVA doit tenir une comptabilité régulière comportant :</p>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            'Livre-journal', 'Grand livre des comptes', 'Balance des comptes', 'Journal des ventes',
            'Journal des achats', 'Livre d\'inventaire', 'Livre des immobilisations',
          ].map((r, i) => (
            <div key={i} className="rounded-lg border border-border/60 bg-card px-3 py-2 text-xs text-foreground flex items-center gap-1.5">
              <BookMarked className="h-3.5 w-3.5 text-primary/60 shrink-0" />
              {r}
            </div>
          ))}
        </div>
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-3">
          <p className="text-xs text-foreground">La comptabilité doit être <strong>disponible en RDC</strong>, au siège social ou au principal établissement de l'entreprise - ou, en cas de représentant agréé (redevable établi hors RDC, Art. 23), chez ce dernier. Les pièces justificatives d'une opération ouvrant droit à déduction doivent être des <strong>documents originaux</strong>.</p>
        </div>
      </div>
    </div>
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSANT PRINCIPAL : SIMULATEUR TVA
// ─────────────────────────────────────────────────────────────────────────────
// Quatre groupes, dans l'ordre où ils sont parcourus (précédent/suivant) et affichés.
// Chaque onglet porte son groupe : la barre de navigation se replie en 4 blocs au lieu
// d'aligner 15 pastilles à plat.
const GROUPES_TVA = [
  { id: 'champ',        label: 'Champ & Redevables' },
  { id: 'base',          label: 'Base, Taux & Exonérations' },
  { id: 'liquidation',   label: 'Déduction & Liquidation' },
  { id: 'obligations',   label: 'Obligations & Contentieux' },
] as const

const ONGLETS_TVA = [
  { id: 'champ',           groupe: 'champ',        label: 'Champ d\'application',    sublabel: 'Art. 1–12',  icon: BookOpen },
  { id: 'assujettis',      groupe: 'champ',        label: 'Assujettis & Seuil',      sublabel: 'Art. 13–14', icon: FileText },
  { id: 'exigibilite',     groupe: 'champ',        label: 'Fait générateur & Exigibilité', sublabel: 'Art. 24–26', icon: Clock },

  { id: 'exonerations',    groupe: 'base',         label: 'Exonérations',           sublabel: 'Art. 15–20', icon: CheckCircle2 },
  { id: 'taux',            groupe: 'base',         label: 'Taux & Base',            sublabel: 'Art. 27–35', icon: Percent },
  { id: 'listes',          groupe: 'base',         label: 'Listes réglementaires',  sublabel: 'Positions tarifaires', icon: Search },
  { id: 'derogatoires',    groupe: 'base',         label: 'Régimes dérogatoires',   sublabel: 'Suspensions sectorielles', icon: ShieldAlert },

  { id: 'deductions',      groupe: 'liquidation',  label: 'Déductions',             sublabel: 'Art. 36–42', icon: Calculator },
  { id: 'prorata',         groupe: 'liquidation',  label: 'Prorata',                sublabel: 'Art. 43–49', icon: BarChart },
  { id: 'regularisations', groupe: 'liquidation',  label: 'Régularisations',        sublabel: 'Art. 50–52', icon: RefreshIcon },
  { id: 'nette',           groupe: 'liquidation',  label: 'TVA Nette Due',          sublabel: 'Art. 60',    icon: Receipt },
  { id: 'def',             groupe: 'liquidation',  label: 'Facture normalisée & DEF', sublabel: 'Décret 23/10/2023', icon: QrCode },

  { id: 'declaration',     groupe: 'obligations',  label: 'Déclaration & Pénalités', sublabel: 'Art. 60–76', icon: AlertTriangle },
  { id: 'remboursement',   groupe: 'obligations',  label: 'Remboursement',          sublabel: 'Art. 63–67', icon: CreditCard },
  { id: 'comptabilite',    groupe: 'obligations',  label: 'Comptabilité & N° TVA',  sublabel: 'Art. 54, 57', icon: BookMarked },
]

// icônes manquantes : on utilise des aliases
function Receipt({ className }: { className?: string }) { return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v6a2 2 0 01-2 2h-4m-6 4v-4m6 4v-4m-6 4h6" /></svg> }
function BarChart({ className }: { className?: string }) { return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg> }
function RefreshIcon({ className }: { className?: string }) { return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg> }
function CreditCard({ className }: { className?: string }) { return <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg> }

export default function SimulateurTVA() {
  const [onglet, setOnglet] = useState('champ')
  const actif = ONGLETS_TVA.find(o => o.id === onglet)!
  const currentIndex = ONGLETS_TVA.findIndex(o => o.id === onglet)

  function goNext() {
    const next = ONGLETS_TVA[currentIndex + 1]
    if (next) setOnglet(next.id)
  }
  function goPrev() {
    const prev = ONGLETS_TVA[currentIndex - 1]
    if (prev) setOnglet(prev.id)
  }

  return (
    <div className="space-y-4 animate-fadeIn">
      {/* Header */}
      <div className="rounded-xl border border-rose-200 bg-rose-50 p-3">
        <div className="flex items-center gap-2">
          <Percent className="h-4 w-4 text-rose-600 shrink-0" />
          <div>
            <p className="text-xs font-bold text-rose-700">Simulateur TVA : CGI 2023</p>
            <p className="text-xs text-muted-foreground">Ordonnance-Loi n° 10/001 du 20 août 2010, modifiée jusqu'à LF n° 25/060 du 29 décembre 2025 (LF 2026)</p>
          </div>
        </div>
      </div>

      {/* Navigation fléchée ‹ › + compteur */}
      <div className="flex items-center justify-between gap-2">
        <button
          onClick={goPrev}
          disabled={currentIndex === 0}
          className={cn(
            'flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
            currentIndex === 0
              ? 'border-border text-muted-foreground opacity-40 cursor-not-allowed'
              : 'border-rose-300 text-rose-700 hover:bg-rose-50'
          )}
        >
          ‹ {currentIndex > 0 ? ONGLETS_TVA[currentIndex - 1].label : ''}
        </button>
        <span className="text-xs font-semibold text-muted-foreground">{currentIndex + 1} / {ONGLETS_TVA.length}</span>
        <button
          onClick={goNext}
          disabled={currentIndex === ONGLETS_TVA.length - 1}
          className={cn(
            'flex items-center gap-1 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors',
            currentIndex === ONGLETS_TVA.length - 1
              ? 'border-border text-muted-foreground opacity-40 cursor-not-allowed'
              : 'border-rose-300 text-rose-700 hover:bg-rose-50'
          )}
        >
          {currentIndex < ONGLETS_TVA.length - 1 ? ONGLETS_TVA[currentIndex + 1].label : ''} ›
        </button>
      </div>

      {/* Tous les onglets, à plat, dans une seule bande défilable - un simple repère
          de groupe (texte discret) précède le premier onglet de chaque groupe, sans
          rien cacher derrière un clic : on voit et on atteint tout directement. */}
      <div className="overflow-x-auto">
        <div className="flex items-stretch gap-1 pb-1 min-w-max">
          {ONGLETS_TVA.map((o, i) => {
            const Icon = o.icon
            const nouveauGroupe = i === 0 || ONGLETS_TVA[i - 1].groupe !== o.groupe
            const groupe = GROUPES_TVA.find(g => g.id === o.groupe)
            return (
              <React.Fragment key={o.id}>
                {nouveauGroupe && i > 0 && <div className="w-px bg-border shrink-0 my-1" />}
                <div className="flex flex-col shrink-0">
                  {nouveauGroupe && (
                    <p className="text-xs text-muted-foreground/70 font-medium mb-0.5 px-0.5 truncate max-w-[80px]">{groupe?.label}</p>
                  )}
                  <button onClick={() => setOnglet(o.id)}
                    className={cn('flex flex-col items-center gap-0.5 rounded-xl border px-3 py-2 transition-all duration-200 min-w-[80px] flex-1',
                      onglet === o.id ? 'border-rose-300 bg-rose-50 text-rose-700 shadow-sm' : 'border-border bg-card text-muted-foreground hover:text-foreground hover:bg-muted/30 hover:scale-[1.02]')}>
                    <Icon className="h-3.5 w-3.5" />
                    <p className="text-xs font-semibold text-center leading-tight">{o.label}</p>
                    <p className="text-xs opacity-60 text-center">{o.sublabel}</p>
                  </button>
                </div>
              </React.Fragment>
            )
          })}
        </div>
      </div>

      {/* Titre onglet actif */}
      <div className="flex items-center gap-2">
        <div className="h-5 w-1 rounded-full bg-rose-500" />
        <p className="text-sm font-bold text-foreground">{actif.label}</p>
        <BadgeLoi loi={actif.sublabel} />
      </div>

      {/* Contenu */}
      <div key={onglet} className="animate-fadeIn">
        {onglet === 'champ' && <OngletChampApplication />}
        {onglet === 'assujettis' && <OngletAssujettis />}
        {onglet === 'exigibilite' && <OngletFaitGenerateurExigibilite />}
        {onglet === 'exonerations' && <OngletExonerations />}
        {onglet === 'taux' && <OngletTauxBase />}
        {onglet === 'listes' && <OngletListesReglementaires />}
        {onglet === 'derogatoires' && <OngletRegimesDerogatoires />}
        {onglet === 'deductions' && <OngletDeductions />}
        {onglet === 'nette' && <OngletTVANette />}
        {onglet === 'prorata' && <OngletProrata />}
        {onglet === 'regularisations' && <OngletRegularisations />}
        {onglet === 'def' && <OngletFactureDEF />}
        {onglet === 'remboursement' && <OngletRemboursement />}
        {onglet === 'declaration' && <OngletDeclarationPenalites />}
        {onglet === 'comptabilite' && <OngletComptabiliteNumeroTVA />}
      </div>
    </div>
  )
}
