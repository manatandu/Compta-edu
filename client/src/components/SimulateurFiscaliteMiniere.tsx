/**
 * MODULE PÉDAGOGIQUE : Fiscalité minière
 * Source : Loi n° 007/2002 du 11 juillet 2002 portant Code minier, telle que modifiée
 *          et complétée par la Loi n° 18/001 du 9 mars 2018 — Titre IX (Art. 219-262)
 *          J.O. RDC, numéro spécial du 3 mai 2018
 * Textes complémentaires : Décret n° 23/32 du 26/08/2023 (recouvrement et répartition
 *          de la redevance minière), Décret n° 18/042 du 24/11/2018 (substances
 *          stratégiques), Décret n° 19/17 du 25/11/2019 mod. Décret n° 23/05 du
 *          20/02/2023 (FOMIN), Arrêté interministériel du 21/12/2021 (dotation 0,3%)
 *
 * Contenu exclusivement fondé sur la loi : aucune rédaction libre.
 */
import React, { useState } from 'react'
import {
  Pickaxe, Landmark, Receipt, TrendingUp, Users, AlertTriangle,
  ChevronRight, ChevronDown, Gem
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Helpers pédagogiques (mêmes conventions que ProceduresFiscales.tsx) ────
function Ref({ children }: { children: React.ReactNode }) {
  return (
    <span className="text-xs font-mono text-muted-foreground bg-muted/50 rounded px-1 py-0.5 ml-1">
      {children}
    </span>
  )
}

function ArticleBox({
  num, titre, children, modifie
}: {
  num: string; titre?: string; children: React.ReactNode; modifie?: string
}) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border border-border/60 rounded-lg mb-2 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-start gap-2 px-3 py-2.5 bg-muted/30 hover:bg-muted/60 transition-colors text-left"
      >
        {open
          ? <ChevronDown className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
          : <ChevronRight className="h-4 w-4 mt-0.5 shrink-0 text-muted-foreground" />
        }
        <div className="flex-1">
          <span className="text-sm font-semibold text-foreground">Art. {num}</span>
          {titre && <span className="text-sm text-muted-foreground ml-2">{titre}</span>}
          {modifie && (
            <span className="ml-2 text-sm bg-amber-100 text-amber-700 rounded px-1 py-0.5">
              mod. {modifie}
            </span>
          )}
        </div>
      </button>
      {open && (
        <div className="px-4 py-3 text-sm text-foreground leading-relaxed space-y-1.5 bg-background">
          {children}
        </div>
      )}
    </div>
  )
}

function SectionHeader({ icon: Icon, label, color }: { icon: any; label: string; color: string }) {
  return (
    <div className={cn('flex items-center gap-2 px-3 py-2 rounded-lg mb-3', color)}>
      <Icon className="h-4 w-4" />
      <span className="text-xs font-bold uppercase tracking-wide">{label}</span>
    </div>
  )
}

// ─── ONGLET : CADRE GÉNÉRAL (Art. 219-224) ──────────────────────────────────
function OngletCadre() {
  return (
    <div>
      <SectionHeader icon={Landmark} label="Cadre général du régime fiscal, douanier et des recettes non fiscales (Art. 219-224)" color="bg-stone-50 text-stone-800" />

      <ArticleBox num="219" titre="Contribuables visés">
        <p>Le régime du Titre IX s'applique au <strong>titulaire</strong> pour toutes ses activités minières sur le territoire national, ainsi qu'aux <strong>sous-traitants</strong> (Loi n° 17/001 du 8 février 2017), au titulaire d'une <strong>autorisation d'exploitation de carrières permanente</strong> (hors matériaux de construction d'usage courant), et aux <strong>entités de traitement agréées</strong>. Les titulaires d'autorisations de recherches/exploitation temporaire de carrières relèvent, eux, du droit commun.</p>
        <Ref>Art. 219, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <ArticleBox num="220" titre="Régime exclusif et exhaustif">
        <p>Le régime fiscal, douanier et de recettes non fiscales applicable aux activités minières du titulaire est défini <strong>exclusivement et exhaustivement</strong> au Titre IX — couvrant impôts, taxes, droits, redevances et prélèvements parafiscaux du Gouvernement, des provinces et des ETD. Aucun autre prélèvement ne peut lui être ajouté par un texte extérieur au Code minier, sauf via la procédure de révision de l'Art. 276 (stabilité du régime).</p>
        <Ref>Art. 220-221, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <ArticleBox num="220 bis" titre="Prélèvements au profit du Pouvoir central" modifie="inséré Loi 18/001, art. 23">
        <p><strong>Selon les modalités du Code minier</strong> : impôt sur les bénéfices et profits, impôt professionnel sur prestations de non-résidents, impôt mobilier, impôt professionnel sur les rémunérations, impôt exceptionnel sur les rémunérations des expatriés, droits d'entrée, droits d'accises, droits proportionnels (hypothèques, cessions, amodiation/option/transmission, cession de parts sociales), droits superficiaires annuels par carré, <strong>redevance minière</strong>, redevance sur carburants/lubrifiants, bonus de signature, pas-de-porte.</p>
        <p className="mt-1"><strong>Selon les modalités du droit commun</strong> : TVA, taxe d'autorisation de minage temporaire, taxe sur exportation d'échantillons irrégulière, taxe d'implantation et taxe rémunératoire environnementale, taxe de déboisement, droit de carte de travail étranger, taxes télécommunication, taxe d'agrément de dépôts d'explosifs, droit d'enregistrement des dragues, redevance des entités de traitement/tailleries, agrément de boutefeux.</p>
        <Ref>Art. 220 bis, Loi 007/2002 (inséré par l'art. 23, Loi 18/001)</Ref>
      </ArticleBox>

      <ArticleBox num="220 ter" titre="Prélèvements au profit des provinces et ETD" modifie="inséré Loi 18/001, art. 23">
        <p><strong>Impôts</strong> : impôt foncier, impôt sur les véhicules, impôt sur les revenus locatifs. <strong>Taxes d'intérêt commun</strong> : taxe spéciale de circulation routière, taxe de superficie sur les concessions minières. Perçus conformément à la législation sur les recettes des provinces et ETD.</p>
        <Ref>Art. 220 ter, Loi 007/2002 (inséré par l'art. 23, Loi 18/001)</Ref>
      </ArticleBox>

      <ArticleBox num="224" titre="Procédure fiscale et douanière : droit commun">
        <p>Sans préjudice des dispositions propres du Code minier, la <strong>procédure fiscale et douanière</strong> applicable au titulaire (déclarations, contrôle, recouvrement, contentieux) est celle du <strong>droit commun</strong> — voir les modules « Procédures fiscales » et « Douane ».</p>
        <Ref>Art. 224, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>
    </div>
  )
}

// ─── ONGLET : RÉGIME DOUANIER MINIER (Art. 225-235) ─────────────────────────
function OngletDouanier() {
  return (
    <div>
      <SectionHeader icon={Pickaxe} label="Régime douanier minier (Art. 225-235)" color="bg-orange-50 text-orange-800" />

      <ArticleBox num="225" titre="Liste des biens à régime privilégié">
        <p>Avant le début des travaux, le titulaire présente la <strong>liste des biens mobiliers, équipements et intrants</strong> relevant du régime privilégié, distinguant les phases <strong>recherche / construction-développement / exploitation</strong>. Approuvée par arrêté conjoint Mines-Finances sous <strong>60 jours ouvrables</strong> (réputée approuvée à défaut de réponse). Sont exclus les consommables, réactifs et produits d'entretien non directement liés à l'activité minière.</p>
        <Ref>Art. 225, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <div className="p-3 bg-orange-50/50 border border-orange-200 rounded-lg mb-3">
        <p className="text-sm font-bold text-orange-800 mb-1.5">Droits d'entrée à taux préférentiels par phase (Art. 232)</p>
        <div className="overflow-x-auto rounded border border-orange-200 mt-1 bg-white">
          <table className="w-full text-xs">
            <thead className="bg-orange-100">
              <tr>
                <th className="px-2 py-1.5 text-left">Phase</th>
                <th className="px-2 py-1.5 text-left">Taux</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-orange-100">
              <tr><td className="px-2 py-1.5">Avant exploitation effective (recherche, construction)</td><td className="px-2 py-1.5 font-bold text-orange-700">2%</td></tr>
              <tr><td className="px-2 py-1.5">1ère production → fin de la 3e année</td><td className="px-2 py-1.5 font-bold text-orange-700">5%</td></tr>
              <tr><td className="px-2 py-1.5">Biens intermédiaires et consommables</td><td className="px-2 py-1.5 font-bold text-orange-700">10%</td></tr>
              <tr><td className="px-2 py-1.5">Carburants et lubrifiants pour activités minières</td><td className="px-2 py-1.5 font-bold text-orange-700">5%</td></tr>
            </tbody>
          </table>
        </div>
        <p className="text-xs text-orange-700 mt-1.5">Le régime préférentiel cesse à partir de la <strong>6e année</strong> à compter de l'octroi du titre (ou de l'agrément pour entités de traitement/sous-traitants). Droits d'accises de droit commun.</p>
      </div>

      <ArticleBox num="226" titre="Exportation d'échantillons">
        <p>Exonérée de <strong>tout droit de douane</strong> lorsqu'elle est destinée aux analyses et essais industriels. Devient imposable au taux de droit commun (+ taxe spécifique) si l'exportation viole l'Art. 50 al. 3, si les échantillons sont vendus à des tiers, ou en cas de quantité à caractère commercial.</p>
        <Ref>Art. 226, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <ArticleBox num="231" titre="Franchise temporaire : 6 mois renouvelables">
        <p>Les biens destinés à être réexportés sont admis en franchise temporaire, sur autorisation douanière, pour <strong>six mois</strong>, prorogeable <strong>deux fois pour la même durée</strong> en cas de raisons indépendantes de la volonté du titulaire.</p>
        <Ref>Art. 231, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <ArticleBox num="233" titre="Extension : condition de +30% de capacité">
        <p>Le titulaire réalisant un investissement d'extension peut bénéficier du régime préférentiel s'il démontre une <strong>augmentation de capacité de production d'au moins 30%</strong>. Si les travaux ne sont pas achevés ou si le seuil n'est pas atteint, il est <strong>rétroactivement redevable</strong> des droits au taux « exploitation ».</p>
        <Ref>Art. 233, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <ArticleBox num="234" titre="Droit de sortie : exonération totale">
        <p>Le titulaire est <strong>totalement exonéré</strong>, à la sortie, de tout droit de douane pour ses exportations liées au projet. Les redevances/frais pour services rendus à l'exportation ne peuvent excéder <strong>1%</strong> de la valeur commerciale brute. Les exportations frauduleuses ou irrégulières restent soumises aux amendes et pénalités douanières de droit commun.</p>
        <Ref>Art. 234, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>
    </div>
  )
}

// ─── ONGLET : IMPÔTS RÉELS ET REDEVANCE MINIÈRE (Art. 236-243) ──────────────
const TAUX_REDEVANCE: Record<string, { label: string; taux: number }> = {
  construction:   { label: 'Matériaux de construction d\'usage courant', taux: 0 },
  industriel:     { label: 'Minéraux industriels, hydrocarbures solides, substances non citées', taux: 1 },
  fer:            { label: 'Fer et métaux ferreux', taux: 1 },
  non_ferreux:    { label: 'Métaux non ferreux et/ou de base (cuivre, zinc, étain…)', taux: 3.5 },
  precieux:       { label: 'Métaux précieux (or, argent, platine…)', taux: 3.5 },
  pierres:        { label: 'Pierres précieuses et de couleur (diamant…)', taux: 6 },
  strategique:    { label: 'Substances stratégiques (cobalt, germanium, coltan)', taux: 10 },
}

function OngletRedevance() {
  const [substance, setSubstance] = useState('non_ferreux')
  const [ca, setCa] = useState('')
  const [result, setResult] = useState<null | { taux: number; montant: number }>(null)

  function calculer() {
    const base = parseFloat(ca) || 0
    const taux = TAUX_REDEVANCE[substance].taux
    setResult({ taux, montant: base * (taux / 100) })
  }

  function formatUSD(v: number) {
    return v.toLocaleString('fr-FR', { maximumFractionDigits: 2 }) + ' USD'
  }

  return (
    <div>
      <SectionHeader icon={Receipt} label="Impôts réels et redevance minière (Art. 236-243)" color="bg-amber-50 text-amber-800" />

      <ArticleBox num="236-239 bis" titre="Impôts réels : droit commun avec exceptions minières">
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Impôt foncier (Art. 236)</strong> : droit commun, mais uniquement sur les immeubles pour lesquels la <strong>taxe de superficie</strong> n'est pas due</li>
          <li><strong>Impôt sur les véhicules (Art. 237)</strong> : droit commun, sauf véhicules de transport/manutention/traction utilisés <strong>exclusivement dans le périmètre minier</strong></li>
          <li><strong>Taxe spéciale de circulation routière (Art. 239)</strong> : droit commun</li>
          <li><strong>Impôt sur les revenus locatifs (Art. 239 bis)</strong> : droit commun</li>
        </ul>
        <Ref>Art. 236-239 bis, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <ArticleBox num="238" titre="Taxe de superficie sur les concessions minières">
        <div className="overflow-x-auto rounded border border-border/40 mt-1">
          <table className="w-full text-xs">
            <thead className="bg-muted/40">
              <tr><th className="px-2 py-1.5 text-left">Titre</th><th className="px-2 py-1.5 text-left">1ère année</th><th className="px-2 py-1.5 text-left">2e année</th><th className="px-2 py-1.5 text-left">3e année</th><th className="px-2 py-1.5 text-left">Années suivantes</th></tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              <tr><td className="px-2 py-1.5">Permis de Recherches</td><td className="px-2 py-1.5">0,2 USD/ha</td><td className="px-2 py-1.5">0,3 USD/ha</td><td className="px-2 py-1.5">0,35 USD/ha</td><td className="px-2 py-1.5">0,4 USD/ha</td></tr>
              <tr><td className="px-2 py-1.5">Droit minier d'exploitation</td><td className="px-2 py-1.5">0,4 USD/ha</td><td className="px-2 py-1.5">0,6 USD/ha</td><td className="px-2 py-1.5">0,7 USD/ha</td><td className="px-2 py-1.5">0,8 USD/ha</td></tr>
            </tbody>
          </table>
        </div>
        <Ref>Art. 238, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <ArticleBox num="240-241" titre="Redevance minière : assiette et taux par substance">
        <p><strong>Assujettis</strong> : titulaires de Permis d'exploitation (y compris rejets, petite mine), Autorisation d'exploitation de carrières permanente (hors matériaux courants), entités de traitement/transformation agréées.</p>
        <p className="mt-1"><strong>Assiette</strong> : la <strong>valeur commerciale brute</strong> du produit marchand, dès le commencement de l'exploitation effective — calculée et due à la <strong>sortie du site</strong> d'extraction ou des installations de traitement, pour expédition.</p>
        <div className="overflow-x-auto rounded border border-border/40 mt-2">
          <table className="w-full text-xs">
            <thead className="bg-muted/40">
              <tr><th className="px-2 py-1.5 text-left">Catégorie de substance</th><th className="px-2 py-1.5 text-left">Taux</th></tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {Object.values(TAUX_REDEVANCE).map(t => (
                <tr key={t.label}><td className="px-2 py-1.5">{t.label}</td><td className="px-2 py-1.5 font-bold text-amber-700">{t.taux}%</td></tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-1.5 text-xs text-blue-700">ℹ Le cobalt, le germanium et la colombo-tantalite (coltan) sont déclarés « substances stratégiques » par le Décret n° 18/042 du 24/11/2018 (texte d'application de l'Art. 7 bis du Code minier) : taux de 10%, le plus élevé de la nomenclature.</p>
        <Ref>Art. 240-241, Loi 007/2002 mod. Loi 18/001 ; Décret 18/042 du 24/11/2018</Ref>
      </ArticleBox>

      <ArticleBox num="242" titre="Répartition de la redevance minière" modifie="précisée par Décret 23/32/2023">
        <p className="text-amber-700 font-medium mb-1.5">⚠ La clé de répartition de l'Art. 242 (50/25/15/10) a été modifiée par le Décret n° 23/32 du 26/08/2023, qui insère un nouveau bénéficiaire (FONAREV) et réduit la part du FOMIN :</p>
        <div className="overflow-x-auto rounded border border-border/40 mt-1">
          <table className="w-full text-xs">
            <thead className="bg-muted/40">
              <tr><th className="px-2 py-1.5 text-left">Bénéficiaire</th><th className="px-2 py-1.5 text-left">Quotité (Décret 23/32/2023)</th></tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              <tr><td className="px-2 py-1.5">Pouvoir central</td><td className="px-2 py-1.5 font-bold text-amber-700">44%</td></tr>
              <tr><td className="px-2 py-1.5">Province du projet</td><td className="px-2 py-1.5 font-bold text-amber-700">23%</td></tr>
              <tr><td className="px-2 py-1.5">ETD du ressort de l'exploitation</td><td className="px-2 py-1.5 font-bold text-amber-700">14%</td></tr>
              <tr><td className="px-2 py-1.5">FONAREV (réparation des victimes de violences sexuelles liées aux conflits)</td><td className="px-2 py-1.5 font-bold text-amber-700">11%</td></tr>
              <tr><td className="px-2 py-1.5">FOMIN (Fonds minier pour les générations futures)</td><td className="px-2 py-1.5 font-bold text-amber-700">8%</td></tr>
            </tbody>
          </table>
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground italic">Texte d'origine du Code minier (Art. 242, non modifié formellement) : 50% Pouvoir central / 25% province / 15% ETD / 10% FOMIN — remplacé en pratique par la clé ci-dessus, fixée par le Décret n° 23/32 du 26/08/2023 modifiant l'Art. 526 du Règlement minier, sur habilitation de la Loi n° 22/065 du 26/12/2022 (FONAREV).</p>
        <Ref>Art. 242, Loi 007/2002 ; Décret n° 23/32 du 26/08/2023, art. 1er (Art. 526 Règlement minier)</Ref>
      </ArticleBox>

      <div className="mt-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Simulateur : redevance minière</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
          <div>
            <label className="text-sm font-semibold text-foreground block mb-1">Catégorie de substance</label>
            <select
              value={substance} onChange={e => { setSubstance(e.target.value); setResult(null) }}
              className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-amber-400 focus:outline-none"
            >
              {Object.entries(TAUX_REDEVANCE).map(([key, t]) => (
                <option key={key} value={key}>{t.label} ({t.taux}%)</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-sm font-semibold text-foreground block mb-1">Valeur commerciale brute du produit marchand (USD)</label>
            <input
              type="number" value={ca} onChange={e => setCa(e.target.value)}
              placeholder="Ex : 1 000 000"
              className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-amber-400 focus:outline-none"
            />
          </div>
        </div>
        <button
          onClick={calculer}
          disabled={!ca}
          className="w-full bg-amber-600 hover:bg-amber-700 disabled:opacity-40 text-white font-semibold text-sm py-2 rounded-lg transition-colors mb-3"
        >
          Calculer la redevance minière
        </button>
        {result && (
          <div className="border border-amber-200 rounded-lg overflow-hidden">
            <div className="bg-amber-50 px-3 py-2 border-b border-amber-200"><p className="text-sm font-semibold text-amber-800">Résultat</p></div>
            <div className="p-3 space-y-1.5">
              <div className="flex justify-between text-sm"><span className="text-muted-foreground">Taux applicable</span><span className="font-medium">{result.taux}%</span></div>
              <div className="flex justify-between text-sm font-bold border-t border-border/60 pt-1.5 mt-1">
                <span>REDEVANCE MINIÈRE DUE</span>
                <span className="text-amber-800">{formatUSD(result.montant)}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-1 italic">Base légale : Art. 240-241, Loi n° 007/2002 mod. Loi n° 18/001 du 9 mars 2018 — répartition selon le Décret n° 23/32 du 26 août 2023.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── ONGLET : IMPÔTS SUR LES REVENUS (Art. 244-247 bis) ─────────────────────
function OngletRevenus() {
  return (
    <div>
      <SectionHeader icon={TrendingUp} label="Impôts sur les revenus (Art. 244-247 bis)" color="bg-emerald-50 text-emerald-800" />

      <ArticleBox num="244-244 bis" titre="Impôt professionnel sur les rémunérations">
        <p><strong>Art. 244</strong> : le titulaire est redevable légal, au taux de droit commun, à charge de ses employés.</p>
        <p className="mt-1"><strong>Art. 244 bis (impôt exceptionnel expatriés)</strong> : taux réduit de <strong>moitié</strong> pour les <strong>dix premières années</strong> du projet, taux plein ensuite. Déductible de l'impôt sur les bénéfices et profits.</p>
        <Ref>Art. 244-244 bis, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <ArticleBox num="246" titre="Impôt mobilier : dividendes à 10%">
        <p>Droit commun, avec deux exceptions : les <strong>intérêts d'emprunts contractés en devises à l'étranger</strong> sont exonérés (sauf, entre affiliés, si les conditions ne respectent pas la pleine concurrence) ; les <strong>dividendes et autres distributions</strong> versés aux actionnaires sont assujettis au taux de <strong>10%</strong>.</p>
        <Ref>Art. 246, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <ArticleBox num="246 bis" titre="Impôt professionnel sur les prestations de services : 14%">
        <p>Le titulaire est redevable, au taux de <strong>14%</strong>, sur les sommes payées à des personnes physiques ou morales <strong>non établies en RDC</strong> en rémunération de services rendus.</p>
        <Ref>Art. 246 bis, Loi 007/2002 (inséré par l'art. 23, Loi 18/001)</Ref>
      </ArticleBox>

      <ArticleBox num="247" titre="Impôt sur les bénéfices et profits : 30%">
        <p>Taux de <strong>30%</strong> — identique au taux de droit commun de l'IS. Les dispositions de droit commun non spécifiquement modifiées par le Code minier restent pleinement applicables, telles qu'en vigueur à la date de promulgation du Code (Art. 247 bis).</p>
        <Ref>Art. 247-247 bis, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
        <p className="text-sm font-bold text-red-800 mb-1">Art. 251 bis — Impôt spécial sur les profits excédentaires : 50%</p>
        <p className="text-xs text-red-700">Les « super profits » — bénéfices réalisés lorsque les cours connaissent un accroissement exceptionnel <strong>supérieur à 25%</strong> par rapport à l'étude de faisabilité bancable — sont taxés à <strong>50%</strong>, déterminés à partir de l'excédent brut d'exploitation. Ce revenu n'est <strong>pas</strong> soumis, en plus, à l'impôt sur les bénéfices et profits (Art. 247).</p>
        <p className="text-xs text-red-700 mt-1.5 italic">Une analyse externe (Centre Carter, avril 2025) relève des défaillances pratiques dans l'application de ce mécanisme depuis 2018 — voir l'onglet « Application concrète ».</p>
      </div>

      <ArticleBox num="253-253 bis" titre="Plus-values de cession de titres miniers ou de parts sociales">
        <p><strong>Art. 253</strong> : la plus/moins-value de cession d'un titre minier intègre l'assiette de l'IS. Entre affiliés : conditions de pleine concurrence exigées.</p>
        <p className="mt-1"><strong>Art. 253 bis</strong> : toute cession d'actions/parts d'une société titulaire est taxée sur la différence entre prix de cession et valeur nette comptable, réputée de source congolaise si les actifs sont situés en RDC. <strong>Retenue à la source par le cessionnaire</strong>, exigible à l'encaissement.</p>
        <Ref>Art. 253-253 bis, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>
    </div>
  )
}

// ─── ONGLET : BÉNÉFICE IMPOSABLE ET PROVISIONS (Art. 248-258 bis) ───────────
function OngletBenefice() {
  return (
    <div>
      <SectionHeader icon={Gem} label="Détermination du bénéfice imposable (Art. 248-258 bis)" color="bg-teal-50 text-teal-800" />

      <ArticleBox num="249-252" titre="Amortissement, report déficitaire, dépenses R&D">
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Amortissement (Art. 249)</strong> : règles de l'amortissement <strong>linéaire</strong></li>
          <li><strong>Amortissement différé (Art. 250)</strong> : les amortissements en période déficitaire sont réputés différés, cumulables et reportables <strong>sans limitation de temps</strong></li>
          <li><strong>Report déficitaire (Art. 251)</strong> : pertes déductibles jusqu'au <strong>5e exercice</strong> suivant l'exercice déficitaire</li>
          <li><strong>Dépenses de R&D (Art. 252)</strong> : actualisées à l'octroi du Permis d'Exploitation, amorties sur 2 exercices à <strong>50%/an</strong> ; perte en résultant reportable sans limite</li>
        </ul>
        <Ref>Art. 249-252, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-3">
        <div className="rounded-lg border border-teal-200 bg-teal-50/50 p-3">
          <p className="text-xs font-bold text-teal-800 mb-1">Provision reconstitution de gisement</p>
          <p className="text-lg font-bold text-teal-700">0,5%</p>
          <p className="text-xs text-teal-600 mt-1">Max. du CA de l'exercice. Utilisation : recherches en RDC avant 3 ans, sinon réintégrée au 4e exercice suivant.</p>
          <Ref>Art. 257</Ref>
        </div>
        <div className="rounded-lg border border-teal-200 bg-teal-50/50 p-3">
          <p className="text-xs font-bold text-teal-800 mb-1">Provision réhabilitation du site</p>
          <p className="text-lg font-bold text-teal-700">0,5%</p>
          <p className="text-xs text-teal-600 mt-1">Max. du CA, obligatoire. Utilisation : 10 ans, sinon réintégrée au 11e exercice suivant.</p>
          <Ref>Art. 258</Ref>
        </div>
        <div className="rounded-lg border border-teal-200 bg-teal-50/50 p-3">
          <p className="text-xs font-bold text-teal-800 mb-1">Dotation développement communautaire</p>
          <p className="text-lg font-bold text-teal-700">0,3% min.</p>
          <p className="text-xs text-teal-600 mt-1">Min. du CA, obligatoire. Mise à disposition intégrale des communautés locales avant la fin de l'exercice suivant.</p>
          <Ref>Art. 258 bis</Ref>
        </div>
      </div>

      <ArticleBox num="255" titre="Déduction de la redevance minière">
        <p>La redevance minière est <strong>déductible</strong> de la base imposable à l'impôt sur les bénéfices et profits, pour le titulaire d'un droit d'exploitation, l'entité de traitement, et le titulaire d'une Autorisation d'exploitation de carrières permanente qui transforme des produits de carrières.</p>
        <Ref>Art. 255, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <ArticleBox num="254, 256" titre="Intérêts d'emprunt et charges déductibles">
        <p><strong>Intérêts payés à l'étranger (Art. 254)</strong> : déductibles seulement si l'emprunt est effectivement destiné au projet minier, et si le taux n'excède pas la moyenne pratiquée dans le pays du prêteur (données BCC).</p>
        <p className="mt-1"><strong>Charges professionnelles (Art. 256)</strong> : notamment déductibles les loyers, frais d'entretien, rémunérations du personnel, intérêts de capitaux empruntés à des tiers, commissions/honoraires justifiés, amortissements. <strong>Non déductibles</strong> : frais de transport sur vente de substances minérales. Rémunérations à une personne liée à l'étranger admises seulement si <strong>4 conditions cumulatives</strong> sont réunies (service réel, non réalisable en RDC, valeur de marché, bénéficiaire non situé dans un territoire à fiscalité privilégiée).</p>
        <Ref>Art. 254, 256, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <ArticleBox num="259" titre="TVA : droit commun">
        <p>Les titulaires de droits miniers et/ou de carrières sont assujettis à la <strong>TVA de droit commun</strong> — voir le module TVA pour les taux, exonérations et modalités de déduction.</p>
        <Ref>Art. 259, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>
    </div>
  )
}

// ─── ONGLET : ARTISANAL & PETITE ÉCHELLE + FOMIN/IGM (Art. 261-262) ─────────
function OngletArtisanalGouvernance() {
  return (
    <div>
      <SectionHeader icon={Users} label="Exploitation artisanale, petite échelle et gouvernance du secteur (Art. 261-262)" color="bg-indigo-50 text-indigo-800" />

      <ArticleBox num="261" titre="Exploitation artisanale">
        <p>Le régime fiscal et douanier des exploitants artisanaux, négociants et comptoirs agréés est fixé <strong>par voie réglementaire</strong> — non détaillé par le Code minier lui-même.</p>
        <Ref>Art. 261, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <ArticleBox num="262" titre="Exploitation minière à petite échelle : taxation unique 10%">
        <p>Soumise au régime douanier des Art. 225-235 (voir onglet « Régime douanier »). Régime fiscal de <strong>taxation unique</strong> : <strong>10% du chiffre d'affaires</strong> (valeur de vente des produits marchands), due au moment de la vente.</p>
        <p className="mt-1 text-indigo-700 font-medium">Ce paiement unique exempte le titulaire de : la redevance minière, l'impôt mobilier, l'impôt sur les bénéfices et profits, et l'impôt exceptionnel sur les rémunérations des expatriés.</p>
        <p className="mt-1 text-xs text-muted-foreground">La quotité de redevance minière à répartir (au sein du prélèvement unique) suit néanmoins la clé des Art. 240-242. L'exploitant peut opter, de façon <strong>irrévocable</strong>, entre le régime de taxation unique et le régime de droit commun du Titre IX (Chapitres I et III).</p>
        <Ref>Art. 262, Loi 007/2002 mod. Loi 18/001</Ref>
      </ArticleBox>

      <div className="mt-4">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Institutions de gouvernance du secteur</p>

        <ArticleBox num="FOMIN" titre="Fonds Minier pour les Générations Futures">
          <p>Établissement public institué par les Art. 8 al. 3 et 8 bis du Code minier, statut fixé par le <strong>Décret n° 19/17 du 25/11/2019</strong> (modifié par le <strong>Décret n° 23/05 du 20/02/2023</strong>). Ressources : quotité de la redevance minière (<strong>8%</strong> depuis le Décret 23/32/2023, portée de 10% initialement), quotité de <strong>20%</strong> du pas-de-porte (ajoutée en 2023). Gouvernance : Conseil d'Administration, Direction Générale, Commissaires aux comptes, sous tutelle du Ministre des Mines. Publication annuelle obligatoire des rapports depuis 2023 (Art. 32 bis).</p>
          <Ref>Décret n° 19/17 du 25/11/2019 mod. Décret n° 23/05 du 20/02/2023</Ref>
        </ArticleBox>

        <ArticleBox num="IGM" titre="Inspection Générale des Mines">
          <p>Créée par le <strong>Décret n° 23/19 du 9/06/2023</strong> : service public autonome chargé de la lutte contre la fraude et la contrebande minières, distinct des Directions de Géologie/Mines/DPEM et du Centre d'Expertise, d'Évaluation et de Certification (CEEC).</p>
          <Ref>Décret n° 23/19 du 9/06/2023</Ref>
        </ArticleBox>

        <ArticleBox num="Dotation 0,3%" titre="Manuel de la dotation développement communautaire">
          <p>L'Arrêté interministériel du 21/12/2021 fixe le <strong>Manuel des procédures</strong> et le Règlement intérieur-type de gestion de la dotation de 0,3% minimum du CA (Art. 258 bis et 285 octies du Code, Art. 414 sexies-septies du Règlement minier) : organisme spécialisé, comité de supervision, unité d'exécution des projets, procédures financières et de passation de marchés, sanctions en cas de manquement.</p>
          <Ref>Arrêté interministériel du 21/12/2021</Ref>
        </ArticleBox>
      </div>
    </div>
  )
}

// ─── ONGLET : APPLICATION CONCRÈTE (analyse non normative) ──────────────────
function OngletApplication() {
  return (
    <div>
      <SectionHeader icon={AlertTriangle} label="Application concrète du régime fiscal depuis 2018" color="bg-rose-50 text-rose-800" />

      <div className="p-3 bg-rose-50/50 border border-rose-200 rounded-lg mb-3">
        <p className="text-xs text-rose-700">Synthèse <strong>non normative</strong> de deux études externes indépendantes — à ne jamais citer comme source d'un article de loi, uniquement comme éclairage sur l'effectivité pratique du régime révisé par la Loi n° 18/001 de 2018.</p>
      </div>

      <ArticleBox num="—" titre="Écart entre recettes projetées et recettes réelles">
        <p>Une étude du <strong>Centre Carter</strong> (avril 2025) relève un écart significatif entre les recettes fiscales minières projetées lors de la réforme de 2018 et les recettes effectivement recouvrées, ainsi que des <strong>défaillances de mise en œuvre de l'impôt spécial sur le profit excédentaire</strong> (Art. 251 bis) — mécanisme rarement appliqué en pratique malgré des variations de cours parfois supérieures au seuil de 25%.</p>
      </ArticleBox>

      <ArticleBox num="—" titre="Fragmentation de l'administration fiscale minière">
        <p>Une étude de la <strong>Studia UBB Europaea</strong> (2025) documente la fragmentation de l'administration fiscale et parafiscale minière congolaise : un référentiel de <strong>plus de 60 paiements distincts</strong> (impôts, taxes, redevances, droits) dus par un même opérateur minier à des administrations différentes (DGI, DGDA, DGRAD, Cadastre minier, Direction des Mines, provinces, ETD, FOMIN, FONAREV…), avec des comparaisons régionales défavorables à la RDC en matière de simplicité de conformité fiscale.</p>
      </ArticleBox>

      <p className="text-xs text-muted-foreground italic mt-2">Sources : Centre Carter, avril 2025 ; Studia UBB Europaea, 2025 — synthèses non normatives, à actualiser par une recherche complémentaire pour tout travail engageant sur l'exercice courant.</p>
    </div>
  )
}

// ─── COMPOSANT PRINCIPAL ─────────────────────────────────────────────────────
const ONGLETS = [
  { id: 'cadre',      label: 'Cadre général',   sublabel: 'Art. 219-224',        icon: Landmark,      component: OngletCadre },
  { id: 'douanier',   label: 'Régime douanier', sublabel: 'Taux préférentiels',  icon: Pickaxe,       component: OngletDouanier },
  { id: 'redevance',  label: 'Redevance min.',  sublabel: 'Impôts réels',        icon: Receipt,       component: OngletRedevance },
  { id: 'revenus',    label: 'Impôts revenus',  sublabel: 'IS, plus-values',     icon: TrendingUp,    component: OngletRevenus },
  { id: 'benefice',   label: 'Bénéfice imp.',   sublabel: 'Provisions',          icon: Gem,           component: OngletBenefice },
  { id: 'artisanal',  label: 'Artisanal & gouv.', sublabel: 'FOMIN, IGM',        icon: Users,         component: OngletArtisanalGouvernance },
  { id: 'application',label: 'Application',     sublabel: 'Analyse 2018-2025',   icon: AlertTriangle, component: OngletApplication },
]

export default function SimulateurFiscaliteMiniere() {
  const [actif, setActif] = useState('cadre')
  const Composant = ONGLETS.find(o => o.id === actif)!.component

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Pickaxe className="h-4 w-4 mt-0.5 text-slate-600 shrink-0" />
          <div>
            <p className="text-sm font-bold text-foreground">
              Code minier — Loi n° 007/2002 du 11 juillet 2002, mod. Loi n° 18/001 du 9 mars 2018
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Titre IX : régime fiscal, douanier et des recettes non fiscales (Art. 219-262) · J.O. RDC, numéro spécial du 3 mai 2018
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Textes complémentaires : Décret 23/32/2023 (redevance minière), Décret 18/042/2018 (substances stratégiques), Décrets FOMIN 19/17/2019 et 23/05/2023, Décret IGM 23/19/2023
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {ONGLETS.map(o => {
          const Icon = o.icon
          const isActif = actif === o.id
          return (
            <button
              key={o.id}
              onClick={() => setActif(o.id)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border',
                isActif
                  ? 'bg-orange-700 text-white border-orange-700 shadow-sm scale-[1.02]'
                  : 'bg-background text-muted-foreground border-border/60 hover:border-orange-400 hover:text-foreground hover:scale-[1.02]'
              )}
            >
              <Icon className="h-3 w-3" />
              <span>{o.label}</span>
              <span className="hidden sm:inline text-sm opacity-70">— {o.sublabel}</span>
            </button>
          )
        })}
      </div>

      <div key={actif} className="animate-fadeIn">
        <Composant />
      </div>

      <div className="p-2 border-t border-border/40">
        <p className="text-sm text-muted-foreground text-center italic">
          Ce module est fondé exclusivement sur la Loi n° 007/2002 portant Code minier, telle que modifiée par la Loi n° 18/001 du 9 mars 2018, et ses textes d'application.
          Régime douanier général (hors activités minières) : voir le module « Douane ». Procédures fiscales de droit commun (Art. 224) : voir le module « Procédures fiscales ».
        </p>
      </div>
    </div>
  )
}
