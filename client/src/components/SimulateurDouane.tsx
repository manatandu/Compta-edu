/**
 * MODULE PÉDAGOGIQUE : Fiscalité douanière
 * Source : Ordonnance-loi n° 10/002 du 20 août 2010 portant Code des douanes (RDC)
 *          J.O. RDC, numéro spécial du 26 décembre 2010
 * Modifications postérieures signalées inline (notamment Art. 386, mod. LF 2025 n° 24/011 du 20/12/2024, art. 19)
 *
 * Contenu exclusivement fondé sur la loi et sa veille documentaire : aucune rédaction libre.
 */
import React, { useState } from 'react'
import {
  Ship, Container, FileText, Banknote, AlertTriangle, Scale,
  ChevronRight, ChevronDown, BookOpen, Calculator, Info
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

// ─── TITRE : CHAMP D'APPLICATION, TARIF, VALEUR EN DOUANE (Titre III) ──────
function TitreValeur() {
  return (
    <div>
      <SectionHeader icon={FileText} label="Tarif, origine et valeur des marchandises (Art. 52-86)" color="bg-cyan-50 text-cyan-800" />

      <ArticleBox num="52-54" titre="Tarifs des droits et taxes : nomenclature SH">
        <p>Les marchandises entrant ou sortant du territoire douanier sont passibles des droits et taxes prévus aux Tarifs à l'importation et à l'exportation, <strong>dans l'état où elles se trouvent</strong> au moment où ceux-ci deviennent applicables. La nomenclature est basée sur la <strong>convention internationale sur le Système Harmonisé (SH)</strong> de désignation et de codification des marchandises.</p>
        <Ref>Art. 52-54, O.-L. n° 10/002 du 20/08/2010</Ref>
      </ArticleBox>

      <ArticleBox num="55-59" titre="Origine des marchandises">
        <p>Sont originaires d'un pays les marchandises <strong>entièrement obtenues</strong> dans ce pays (produits minéraux extraits, produits végétaux récoltés, animaux nés et élevés, etc. — Art. 56). Lorsque plusieurs pays interviennent dans la production, la marchandise est originaire du pays où a eu lieu la <strong>dernière transformation ou ouvraison substantielle</strong>, économiquement justifiée (Art. 57). Une transformation dont le seul objet est de contourner la législation congolaise ne confère jamais l'origine du pays où elle est effectuée (Art. 58).</p>
        <Ref>Art. 55-59, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <div className="p-3 bg-cyan-50/50 border border-cyan-200 rounded-lg mb-3">
        <p className="text-sm font-bold text-cyan-800 mb-1.5">La hiérarchie stricte des 6 méthodes de valeur en douane à l'importation (Art. 61-67)</p>
        <p className="text-xs text-cyan-700">Chaque méthode ne s'applique que si la précédente est inapplicable — sauf inversion demandée par l'importateur entre les méthodes 5 et 6 (Art. 64).</p>
      </div>

      <ArticleBox num="61" titre="Méthode 1 : valeur transactionnelle (méthode de principe)">
        <p>La valeur en douane est le <strong>prix effectivement payé ou à payer</strong> pour les marchandises lorsqu'elles sont vendues pour l'exportation vers la RDC, après ajustement (Art. 68), à condition qu'il n'existe pas de restriction sur l'usage des marchandises, que le prix ne soit pas subordonné à une prestation non chiffrable, qu'aucune part du produit de revente ne revienne au vendeur, et que l'acheteur et le vendeur ne soient pas liés (ou, s'ils le sont, que le lien n'ait pas influencé le prix).</p>
        <Ref>Art. 61, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="62-63" titre="Méthodes 2 et 3 : marchandises identiques / similaires">
        <p>À défaut de valeur transactionnelle admissible, la valeur en douane se fonde sur la <strong>valeur transactionnelle de marchandises identiques</strong> (Art. 62) exportées vers la RDC au même moment ou presque, au même niveau commercial et en quantité comparable ; à défaut, sur celle de <strong>marchandises similaires</strong> (Art. 63 : mêmes fonctions, interchangeables commercialement). En cas de pluralité de valeurs constatées, on retient <strong>la plus basse</strong>.</p>
        <Ref>Art. 62-63, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="65-66" titre="Méthodes 5 et 6 : déductive et calculée (ordre inversable sur demande)">
        <p><strong>Méthode déductive (Art. 65)</strong> : fondée sur le prix unitaire de revente en RDC des marchandises importées (ou identiques/similaires), diminué des commissions, marges, frais de transport/assurance locaux et des droits et taxes à l'importation.</p>
        <p className="mt-1"><strong>Méthode de la valeur calculée (Art. 66)</strong> : somme du coût des matières et de la fabrication, d'un montant de bénéfice et frais généraux usuels dans le secteur, et des éléments de l'Art. 68 §2 (transport, assurance jusqu'au lieu d'importation).</p>
        <Ref>Art. 65-66, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="67" titre="Méthode 6 (ultime recours) : moyens raisonnables">
        <p>À défaut de toute autre méthode, la valeur est déterminée par des <strong>moyens raisonnables</strong> compatibles avec l'Accord OMC sur l'évaluation en douane et l'Art. VII du GATT 1994, sur la base des données disponibles en RDC. Elle ne peut jamais se fonder sur des <strong>valeurs minimales, arbitraires ou fictives</strong>, ni sur le prix de vente intérieur de marchandises congolaises, ni sur le plus élevé de deux valeurs possibles.</p>
        <Ref>Art. 67, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="68" titre="Ajustements de la valeur transactionnelle">
        <p>S'ajoutent au prix payé, dans la mesure où ils ne sont pas déjà inclus : commissions et courtage (hors commission d'achat), coût des contenants et de l'emballage, valeur des apports de l'acheteur (matières, outillage, études, redevances de licence), <strong>frais de transport jusqu'au port/lieu d'importation, frais de chargement/manutention connexes, et coût de l'assurance</strong> (Art. 68 §2). Aucun autre élément ne peut être ajouté.</p>
        <Ref>Art. 68, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="72" titre="Valeur en douane à l'exportation">
        <p>La valeur à l'exportation est celle de la marchandise <strong>au point de sortie</strong>, majorée le cas échéant des frais de transport jusqu'à la frontière, hors droits et taxes à l'exportation et taxes intérieures déchargées à l'exportateur.</p>
        <Ref>Art. 72, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="73-84" titre="Prohibitions, restrictions et propriété intellectuelle">
        <p>Sont <strong>prohibées</strong> les marchandises dont l'importation/exportation est interdite (ordre public, sécurité, moralité, hygiène/santé, environnement, trésors nationaux, propriété intellectuelle, protection des consommateurs — Art. 73). Mécanisme spécifique de <strong>suspension du dédouanement</strong> à la demande du détenteur d'un droit de propriété intellectuelle qui soupçonne une contrefaçon (Art. 78 : réponse de la douane sous 30 jours, garantie exigible, procédure judiciaire à engager sous 10 jours prorogeables une fois).</p>
        <Ref>Art. 73-84, O.-L. n° 10/002</Ref>
      </ArticleBox>
    </div>
  )
}

// ─── TITRE : RÉGIMES DOUANIERS (Titre VI + VII) ─────────────────────────────
function TitreRegimes() {
  return (
    <div>
      <SectionHeader icon={Container} label="Régimes douaniers (Art. 144-255)" color="bg-blue-50 text-blue-800" />

      <ArticleBox num="146" titre="Mise à la consommation">
        <p>Régime qui permet aux marchandises importées d'être mises en <strong>libre circulation</strong> sur le territoire douanier après paiement des droits et taxes exigibles et accomplissement de toutes les formalités.</p>
        <Ref>Art. 146, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="156-174" titre="Entrepôt de douane : public (1 an) / privé (3 ans)">
        <p>Régime sous lequel les marchandises sont <strong>stockées sous contrôle douanier</strong>, en suspension des droits et taxes. Deux catégories : <strong>public</strong> (type A géré par la douane, type B géré par un tiers agréé — durée <strong>1 an</strong>) et <strong>privé</strong> (l'entreposeur s'identifie à l'entrepositaire — durée <strong>3 ans</strong>). La mise en entrepôt suspend aussi les prohibitions et mesures économiques.</p>
        <Ref>Art. 156, 160, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="175-181" titre="Transit douanier">
        <p>Marchandises transportées <strong>sous contrôle douanier</strong> d'un bureau à un autre, non assujetties aux droits et taxes sous réserve d'une garantie couvrant les droits exigibles en cas de mise à consommation. Scellements douaniers obligatoires (ou, à défaut, escorte douanière avec redevance due). Le transporteur répond des déficits constatés à l'arrivée.</p>
        <Ref>Art. 175-181, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="182" titre="Transbordement">
        <p>Transfert, <strong>sous contrôle de la douane</strong>, de marchandises d'un moyen de transport à un autre, dans le ressort d'un même bureau (à la fois bureau d'entrée et de sortie).</p>
        <Ref>Art. 182, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="194-204" titre="Admission temporaire : suspension totale ou partielle (3%/mois)">
        <p>Introduction de marchandises destinées à être <strong>réexportées</strong>, dans un délai déterminé, sans modification (hors dépréciation normale d'usage). Délai fixé par la douane, <strong>12 mois maximum</strong> (prorogeable). Liste des cas de suspension totale à l'Art. 199 (expositions, matériel professionnel, conteneurs/palettes/échantillons, but éducatif/scientifique/culturel, effets de voyageurs, matériel humanitaire, moyens de transport…).</p>
        <div className="mt-2 p-2.5 rounded-lg bg-amber-50 border border-amber-200">
          <p className="text-sm font-semibold text-amber-800">Suspension partielle : 3% par mois ou fraction de mois</p>
          <p className="text-xs text-amber-700 mt-0.5">Montant dû = 3% × (droits et taxes qui auraient été perçus en cas de mise à la consommation) × nombre de mois ou fraction de mois sous le régime — plafonné au montant qui aurait été perçu en mise à consommation (Art. 202).</p>
        </div>
        <Ref>Art. 194-202, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="205-208" titre="Réimportation en l'état">
        <p>Mise à la consommation, <strong>en franchise des droits et taxes</strong>, de marchandises exportées puis réimportées sans avoir subi de transformation à l'étranger. Délai maximum <strong>12 mois</strong>, prorogeable. Sous condition d'acquittement des sommes dues au titre d'un remboursement/remise/subvention perçue à l'exportation.</p>
        <Ref>Art. 205-206, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="209-222" titre="Perfectionnement actif : suspension ou rembours">
        <p>Réception en RDC, <strong>en suspension des droits et taxes</strong>, de marchandises étrangères destinées à subir une transformation, ouvraison ou réparation puis à être réexportées sous forme de <strong>produits compensateurs</strong>.</p>
        <ul className="list-disc pl-4 space-y-1 mt-1">
          <li><strong>Perfectionnement actif suspension</strong> : pas de paiement des droits à l'importation</li>
          <li><strong>Perfectionnement actif rembours (drawback)</strong> : droits acquittés à l'importation, remboursés à l'exportation des produits compensateurs</li>
        </ul>
        <p className="mt-1 text-xs text-muted-foreground italic">Le recours à des « marchandises équivalentes » (nationales ou déjà en libre circulation, de même qualité) est possible, y compris en exportation anticipée (Art. 212).</p>
        <Ref>Art. 209-222, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="223-239" titre="Perfectionnement passif (y compris échange standard)">
        <p>Exportation <strong>temporaire</strong> de marchandises en libre circulation en RDC, en vue d'une transformation, ouvraison ou réparation à l'étranger, puis réimportation en <strong>exonération totale ou partielle</strong> des droits et taxes. N'est accordé qu'aux personnes établies en RDC, et pour autant qu'il ne porte pas atteinte aux intérêts des entreprises congolaises (Art. 227).</p>
        <Ref>Art. 223-227, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="247-255" titre="Zones franches et zones économiques spéciales (ZES)">
        <p><strong>Zone franche (Art. 247)</strong> : partie du territoire où les marchandises introduites sont considérées comme <strong>hors du territoire douanier</strong> au regard des droits et taxes. Instituée par décret du Premier ministre en Conseil des ministres. Durée de séjour <strong>illimitée</strong> en principe.</p>
        <p className="mt-1"><strong>ZES (Art. 254)</strong> : espace où les lois économiques sont <strong>plus libérales</strong> que le droit commun — régime économique/fiscal dérogatoire, pas nécessairement une extraterritorialité douanière. Instituée de la même manière.</p>
        <p className="mt-1 text-blue-700 text-xs">ℹ Deux notions distinctes : ne pas confondre l'exterritorialité douanière de la zone franche avec le simple régime fiscal préférentiel de la ZES.</p>
        <Ref>Art. 247, 254, O.-L. n° 10/002</Ref>
      </ArticleBox>
    </div>
  )
}

// ─── TITRE : DÉDOUANEMENT (Titre V) ─────────────────────────────────────────
function TitreDedouanement() {
  return (
    <div>
      <SectionHeader icon={FileText} label="Opérations de dédouanement (Art. 112-143)" color="bg-emerald-50 text-emerald-800" />

      <ArticleBox num="112-113" titre="Déclaration obligatoire : délai 3 jours francs">
        <p>Toutes les marchandises importées ou exportées doivent faire l'objet d'une <strong>déclaration de marchandises</strong> — l'exemption de droits et taxes n'en dispense pas. Dispensés : navires/aéronefs en trafic international, locomotives (Art. 112).</p>
        <p className="mt-1">La déclaration doit être déposée <strong>dans les 3 jours francs</strong> (hors dimanches/fériés) après l'arrivée des marchandises au bureau, à l'importation ; <strong>dès l'arrivée</strong>, à l'exportation.</p>
        <Ref>Art. 112-113, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="115-119" titre="Commissionnaire en douane agréé">
        <p>La déclaration est faite par la personne ayant le droit de disposer des marchandises, ou par un <strong>commissionnaire en douane agréé</strong>. Nul ne peut accomplir ces formalités pour autrui sans agrément du directeur général des douanes — accordé uniquement à des <strong>personnes morales</strong>, à titre personnel. Répertoires annuels à conserver <strong>3 ans</strong>.</p>
        <Ref>Art. 115-119, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="120-126" titre="Forme, recevabilité et enregistrement">
        <p>La déclaration doit en principe être faite par <strong>procédé électronique</strong> (Sydonia World). Une fois reconnue recevable, elle est <strong>immédiatement enregistrée</strong>. La date d'enregistrement est la date de référence pour l'ensemble du régime douanier concerné (Art. 125).</p>
        <p className="mt-1 text-blue-700 text-xs">ℹ Depuis le 29/12/2025, transmission électronique obligatoire de la liasse documentaire entre le système S-One (SEGUCE/GUICE) et Sydonia World — fin de la circulation physique des dossiers, déploiement national généralisé à partir du 18/02/2026.</p>
        <Ref>Art. 120-126, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="127" titre="Rectification de la déclaration">
        <p>Le déclarant peut rectifier une déclaration enregistrée, avant l'enlèvement (import) ou avant la sortie des marchandises (export) — sauf si la douane a déjà annoncé un examen ou constaté une inexactitude. La rectification <strong>ne peut jamais porter</strong> sur l'espèce des marchandises ni sur le nombre de colis.</p>
        <Ref>Art. 127, O.-L. n° 10/002</Ref>
      </ArticleBox>
    </div>
  )
}

// ─── TITRE : DETTE DOUANIÈRE ET RECOUVREMENT (Titre X) ──────────────────────
function TitreDette() {
  return (
    <div>
      <SectionHeader icon={Banknote} label="Dette douanière : garantie, naissance, recouvrement (Art. 292-336)" color="bg-violet-50 text-violet-800" />

      <ArticleBox num="301, 309" titre="Naissance régulière : déclarant seul débiteur">
        <p>La dette douanière naît, à l'importation, au moment de l'<strong>enregistrement de la déclaration</strong> de mise à la consommation — le <strong>déclarant</strong> en est le seul débiteur (Art. 301). Symétrique à l'exportation (Art. 309).</p>
        <Ref>Art. 301, 309, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="302-305, 310-311" titre="Naissances irrégulières : cercle de débiteurs élargi">
        <p>La dette naît aussi en cas d'<strong>introduction irrégulière</strong> (Art. 302), de <strong>soustraction à la surveillance douanière</strong> (Art. 303), d'<strong>inexécution d'une obligation</strong> liée au séjour en magasin ou au régime douanier (Art. 304), ou de <strong>consommation en zone franche</strong> hors des conditions légales (Art. 305). Dans tous ces cas, sont débiteurs non seulement l'auteur du fait, mais aussi <strong>toute personne ayant su ou dû raisonnablement savoir</strong> qu'elle participait à l'irrégularité, ou ayant acquis/détenu la marchandise en connaissance de cause.</p>
        <p className="mt-1 text-amber-700 font-medium">⚠ Lorsqu'il y a plusieurs débiteurs pour une même dette, ils sont <strong>solidaires</strong> (Art. 314).</p>
        <Ref>Art. 302-305, 310-311, 314, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="292-300" titre="Garantie de la dette douanière">
        <p>Constituée au choix du débiteur par <strong>dépôt en espèces</strong> ou par <strong>caution</strong> (tiers établi en RDC, engagé solidairement, sans bénéfice de discussion). Fixée au montant exact de la dette si déterminable, sinon au montant le plus élevé estimé par le receveur. Libérée dès l'extinction de la dette.</p>
        <Ref>Art. 292-298, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="317-322" titre="Paiement, report et facilités">
        <p>Le débiteur peut solliciter un <strong>report de paiement</strong> (contre garantie), d'une durée comprise entre <strong>14 et 30 jours</strong> (Art. 321). D'autres facilités de paiement peuvent être accordées contre garantie et <strong>intérêt de crédit</strong> (Art. 322, taux fixé par arrêté ministériel).</p>
        <Ref>Art. 317-322, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="327" titre="Extinction de la dette douanière">
        <p>La dette s'éteint par : le <strong>paiement</strong>, la <strong>remise</strong>, la <strong>destruction</strong> de la marchandise constatée par la douane avant mainlevée, la <strong>confiscation</strong>, le <strong>retrait</strong> de la déclaration, la <strong>vente aux enchères</strong> de marchandises abandonnées, ou la <strong>prescription</strong>.</p>
        <Ref>Art. 327, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="329-336" titre="Remboursement et remise">
        <p><strong>Remboursement</strong> : restitution de droits et taxes déjà acquittés indûment. <strong>Remise</strong> : décision de non-perception d'un montant pris en compte mais non encore payé. Délai de droit commun : <strong>3 ans</strong> à compter de l'enregistrement de la déclaration (Art. 330) ; délai réduit à <strong>90 jours</strong> pour les marchandises défectueuses ou non conformes, ou non livrées (Art. 332-333). Aucun remboursement/remise si les faits résultent d'une manœuvre de l'intéressé.</p>
        <Ref>Art. 329-334, O.-L. n° 10/002</Ref>
      </ArticleBox>
    </div>
  )
}

// ─── TITRE : FRANCHISES DOUANIÈRES (Titre XI) ───────────────────────────────
function TitreFranchises() {
  const items = [
    "Échantillons sans valeur commerciale, de valeur négligeable, destinés à rechercher des commandes",
    "Biens mobiliers (hors matériel industriel/commercial/agricole) liés à un transfert de résidence",
    "Biens recueillis par succession, affectés à l'usage personnel du défunt",
    "Cadeaux personnels (hors alcool, boissons alcoolisées, tabacs)",
    "Denrées, médicaments, vêtements donnés à des organismes charitables agréés",
    "Récompenses décernées à des résidents en RDC",
    "Cercueils et urnes funéraires, avec leurs objets d'ornement",
    "Matériels et articles destinés à la recherche et/ou l'éducation",
    "Objets religieux destinés au culte",
    "Produits importés pour essais, dans les quantités strictement nécessaires",
    "Marchandises importées au titre de privilèges diplomatiques et consulaires",
    "Dons ou matériels fournis gratuitement à l'État et aux ETD",
    "Marchandises de la coopération bilatérale ou multilatérale",
    "Billets et pièces ayant cours légal, papiers fiduciaires importés par la BCC",
    "Devises étrangères importées par les banques commerciales",
    "Timbres-poste et timbres fiscaux non oblitérés",
  ]
  return (
    <div>
      <SectionHeader icon={BookOpen} label="Franchises douanières (Art. 337-340)" color="bg-lime-50 text-lime-800" />

      <ArticleBox num="337-338" titre="Principe : franchise sur habilitation légale">
        <p>La franchise est la mise à la consommation ou l'exportation en <strong>exonération des droits et taxes</strong>, indépendamment du classement tarifaire normal. Elle ne peut être accordée <strong>qu'en application d'une convention internationale ou de la loi</strong> (ou en vertu de celle-ci) — jamais par simple tolérance administrative.</p>
        <Ref>Art. 337-338, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="339" titre="Liste des cas de franchise à l'importation">
        <p>Aux conditions fixées par le ministre des Finances, peuvent être admis en franchise :</p>
        <ul className="list-disc pl-4 space-y-1 mt-1 text-xs">
          {items.map((it, i) => <li key={i}>{it}</li>)}
        </ul>
        <p className="mt-2 text-blue-700 text-xs">ℹ Chaque hypothèse suppose un arrêté d'application propre du ministre des Finances : le Code pose le principe et l'énumération, non les modalités chiffrées.</p>
        <Ref>Art. 339, O.-L. n° 10/002</Ref>
      </ArticleBox>
    </div>
  )
}

// ─── TITRE : CONTENTIEUX ET RECOURS (Titre XII + XIV) ───────────────────────
function TitreContentieux() {
  return (
    <div>
      <SectionHeader icon={AlertTriangle} label="Contentieux douanier, sanctions et voies de recours (Art. 341-400)" color="bg-red-50 text-red-800" />

      <div className="overflow-x-auto rounded-lg border border-border/60 mb-3">
        <table className="w-full text-xs">
          <thead className="bg-red-50">
            <tr>
              <th className="text-left px-3 py-2 font-semibold">Infraction</th>
              <th className="text-left px-3 py-2 font-semibold">Amende</th>
              <th className="text-left px-3 py-2 font-semibold">Réf.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            <tr className="hover:bg-muted/20">
              <td className="px-3 py-2">Irrégularité formelle sans incidence fiscale</td>
              <td className="px-3 py-2 font-medium">500 000 à 2 000 000 FC</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 384</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="px-3 py-2">Infraction compromettant le recouvrement (sans fausse déclaration)</td>
              <td className="px-3 py-2 font-medium">1 à 2× les droits éludés</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 385</td>
            </tr>
            <tr className="hover:bg-muted/20 bg-amber-50/40">
              <td className="px-3 py-2">Fausse déclaration d'espèce, valeur ou origine</td>
              <td className="px-3 py-2 font-medium">1 à 5× les droits éludés</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 386 §1</td>
            </tr>
            <tr className="hover:bg-muted/20 bg-amber-50/40">
              <td className="px-3 py-2">Idem, avec faux documents</td>
              <td className="px-3 py-2 font-medium">1 à 10× les droits éludés</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 386 §2</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="px-3 py-2">Fausse déclaration d'espèce pour éluder une prohibition</td>
              <td className="px-3 py-2 font-medium">Confiscation + 2× la valeur</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 386 §3</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="px-3 py-2">Détournement de destination privilégiée</td>
              <td className="px-3 py-2 font-medium">2× la valeur des marchandises</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 387</td>
            </tr>
            <tr className="hover:bg-muted/20 bg-red-50/40">
              <td className="px-3 py-2 font-medium">Contrebande — marchandises libres</td>
              <td className="px-3 py-2 font-bold text-red-700">Servitude ≤ 3 ans + confiscations + 1 à 3× la valeur</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 389</td>
            </tr>
            <tr className="hover:bg-muted/20 bg-red-50/40">
              <td className="px-3 py-2 font-medium">Contrebande — marchandises prohibées/restreintes</td>
              <td className="px-3 py-2 font-bold text-red-700">Servitude ≤ 3 ans + confiscations + 1 à 5× la valeur</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 390</td>
            </tr>
            <tr className="hover:bg-muted/20 bg-red-50/40">
              <td className="px-3 py-2 font-medium">Blanchiment lié à une infraction douanière</td>
              <td className="px-3 py-2 font-bold text-red-700">Servitude 2 à 10 ans + 1 à 5× la somme</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 391</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ArticleBox num="386" titre="Modification LF 2025 : « droits à effet équivalent »" modifie="LF 2025 art. 19">
        <p>L'Art. 19 de la Loi de finances n° 24/011 du 20/12/2024 (exercice 2025) a modifié l'Art. 386 : la sanction de la fausse déclaration d'espèce, de valeur ou d'origine vise désormais non seulement les <strong>droits et taxes</strong> classiques, mais aussi les « <strong>droits à effet équivalent</strong> » — notion empruntée au droit de l'UE (directive 70/50/CEE, jurisprudence <em>Dassonville</em>), <strong>non définie</strong> par le texte congolais lui-même.</p>
        <p className="mt-1 text-amber-700 font-medium">⚠ Absence de définition légale précise : risque d'interprétation extensive relevé par la doctrine (FEC-RDC, mars 2025). Prélèvements le plus souvent cités comme candidats : accises à l'importation, TVA import si plus lourde que sur le produit local, frais de scanning/contrôle, redevance OCC, inspection DGDA.</p>
        <Ref>Art. 386, O.-L. n° 10/002 mod. L.F. n° 24/011 du 20/12/2024, art. 19</Ref>
      </ArticleBox>

      <ArticleBox num="368-371" titre="Transaction et prescription">
        <p><strong>Transaction (Art. 368)</strong> : convention par laquelle le directeur général des douanes (ou son délégué) renonce à poursuivre, contre respect de conditions déterminées. Avant saisine du tribunal, elle éteint définitivement l'action ; après saisine, elle requiert l'accord du président du tribunal ; impossible après jugement définitif.</p>
        <p className="mt-1"><strong>Prescription</strong> : <strong>3 ans</strong> à compter de l'enregistrement de la déclaration, lorsque les marchandises ont été régulièrement déclarées (Art. 369) ; <strong>6 ans</strong> en l'absence de déclaration enregistrée — typiquement en cas de contrebande (Art. 370). Interrompue par tout acte écrit d'instruction ou de poursuite ; acquise irrévocablement si l'instance n'est pas introduite dans l'année suivant l'acte interruptif (Art. 371).</p>
        <Ref>Art. 368-371, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="341-350" titre="Voies de recours à trois paliers">
        <ol className="list-decimal pl-4 space-y-1.5">
          <li><strong>Recours administratif</strong> devant le directeur général des douanes : 30 jours pour l'introduire, 30 jours pour la réponse (Art. 342)</li>
          <li>Selon l'objet : <strong>Commission de règlement des litiges douaniers</strong> (espèce, origine ou valeur — présidée par le Premier Président de la Cour administrative d'appel, 2 conseillers + 2 assesseurs techniques, Art. 346-347) <em>ou</em> <strong>ministre des Finances</strong> (autres cas, 30 jours pour répondre)</li>
          <li><strong>Conseil d'État</strong>, qui statue en premier et dernier ressort quant au fond, dans les 30 jours de la notification contestée (Art. 343)</li>
        </ol>
        <p className="mt-2 text-amber-700 font-medium">⚠ Le recours n'est jamais suspensif de plein droit (Art. 344) : seule une mainlevée sous garantie (jusqu'au double des droits présumés compromis) permet de disposer des marchandises pendant l'instance.</p>
        <Ref>Art. 341-350, O.-L. n° 10/002</Ref>
      </ArticleBox>

      <ArticleBox num="400" titre="Répartition du produit des amendes">
        <p><strong>40%</strong> au Trésor public. Le solde (60%) se répartit à raison de <strong>50%</strong> pour l'équipement de la douane (contrôle, recherche, répression de la fraude) et <strong>50%</strong> pour la rétribution des agents ayant participé à la découverte, la constatation et la répression de l'infraction.</p>
        <Ref>Art. 400, O.-L. n° 10/002</Ref>
      </ArticleBox>
    </div>
  )
}

// ─── SIMULATEUR : DROITS ET TAXES À L'IMPORTATION ───────────────────────────
function SimulateurDroitsImportation() {
  const [valeurCIF, setValeurCIF] = useState('')
  const [tauxDroitEntree, setTauxDroitEntree] = useState('10')
  const [tauxTVA, setTauxTVA] = useState('16')
  const [droitsAccises, setDroitsAccises] = useState('')
  const [result, setResult] = useState<null | {
    cif: number; droitEntree: number; baseTVA: number; tva: number; accises: number; total: number
  }>(null)

  function calculer() {
    const cif = parseFloat(valeurCIF) || 0
    const droitEntree = cif * ((parseFloat(tauxDroitEntree) || 0) / 100)
    const accises = parseFloat(droitsAccises) || 0
    // Base TVA à l'importation = CIF + droits d'entrée + droits de consommation le cas échéant
    const baseTVA = cif + droitEntree + accises
    const tva = baseTVA * ((parseFloat(tauxTVA) || 0) / 100)
    const total = droitEntree + accises + tva
    setResult({ cif, droitEntree, baseTVA, tva, accises, total })
  }

  function formatFC(v: number) {
    return v.toLocaleString('fr-FR', { maximumFractionDigits: 2 })
  }

  return (
    <div>
      <SectionHeader icon={Calculator} label="Simulateur : droits et taxes à l'importation" color="bg-cyan-50 text-cyan-800" />

      <div className="p-3 bg-cyan-50/50 border border-cyan-200 rounded-lg mb-3">
        <p className="text-xs text-muted-foreground italic">
          Calcul pédagogique simplifié : Valeur en douane (CIF, méthode 1 — Art. 61) → Droit d'entrée (Tarif SH, Art. 52) → Base TVA import = CIF + droit d'entrée + droits de consommation éventuels (cohérent avec l'assiette TVA à l'importation du droit fiscal congolais). Le taux de droit d'entrée dépend de la position tarifaire exacte de la marchandise : à vérifier dans le Tarif des droits et taxes à l'importation avant tout usage engageant.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-sm font-semibold text-foreground block mb-1">Valeur en douane CIF (FC) <Ref>Art. 61, 68</Ref></label>
          <input
            type="number" value={valeurCIF} onChange={e => setValeurCIF(e.target.value)}
            placeholder="Ex : 50 000 000"
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground block mb-1">Taux du droit d'entrée (%) <Ref>Tarif SH</Ref></label>
          <input
            type="number" value={tauxDroitEntree} onChange={e => setTauxDroitEntree(e.target.value)}
            placeholder="Ex : 10"
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground block mb-1">Droits de consommation / accises (FC, si applicable)</label>
          <input
            type="number" value={droitsAccises} onChange={e => setDroitsAccises(e.target.value)}
            placeholder="0"
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground block mb-1">Taux TVA à l'importation (%)</label>
          <input
            type="number" value={tauxTVA} onChange={e => setTauxTVA(e.target.value)}
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-cyan-400 focus:outline-none"
          />
        </div>
      </div>

      <button
        onClick={calculer}
        disabled={!valeurCIF}
        className="w-full bg-cyan-600 hover:bg-cyan-700 disabled:opacity-40 text-white font-semibold text-sm py-2 rounded-lg transition-colors mb-3"
      >
        Calculer
      </button>

      {result && (
        <div className="border border-cyan-200 rounded-lg overflow-hidden">
          <div className="bg-cyan-50 px-3 py-2 border-b border-cyan-200">
            <p className="text-sm font-semibold text-cyan-800">Résultat</p>
          </div>
          <div className="p-3 space-y-1.5">
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Valeur en douane (CIF)</span><span className="font-medium">{formatFC(result.cif)} FC</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Droit d'entrée</span><span className="font-medium">{formatFC(result.droitEntree)} FC</span></div>
            {result.accises > 0 && <div className="flex justify-between text-sm"><span className="text-muted-foreground">Droits de consommation</span><span className="font-medium">{formatFC(result.accises)} FC</span></div>}
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Base TVA import</span><span className="font-medium">{formatFC(result.baseTVA)} FC</span></div>
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">TVA à l'importation</span><span className="font-medium text-cyan-700">{formatFC(result.tva)} FC</span></div>
            <div className="flex justify-between text-sm font-bold border-t border-border/60 pt-1.5 mt-1">
              <span>TOTAL DROITS ET TAXES DUS</span>
              <span className="text-cyan-800">{formatFC(result.total)} FC</span>
            </div>
            <p className="text-sm text-muted-foreground mt-1 italic">Base légale : Art. 52-72, O.-L. n° 10/002 du 20 août 2010 portant Code des douanes</p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── COMPOSANT PRINCIPAL ─────────────────────────────────────────────────────
const TITRES = [
  { id: 'valeur',      label: 'Valeur & tarif',   sublabel: 'Valeur en douane',        icon: FileText,      component: TitreValeur },
  { id: 'regimes',     label: 'Régimes',          sublabel: 'Entrepôt, transit…',      icon: Container,     component: TitreRegimes },
  { id: 'dedouanement',label: 'Dédouanement',     sublabel: 'Déclaration, délais',      icon: Ship,          component: TitreDedouanement },
  { id: 'dette',       label: 'Dette douanière',  sublabel: 'Garantie, recouvrement',   icon: Banknote,      component: TitreDette },
  { id: 'franchises',  label: 'Franchises',       sublabel: 'Art. 337-340',             icon: BookOpen,      component: TitreFranchises },
  { id: 'contentieux', label: 'Contentieux',      sublabel: 'Sanctions, recours',       icon: AlertTriangle, component: TitreContentieux },
  { id: 'sim',         label: 'Simulateur',       sublabel: 'Droits & TVA import',      icon: Calculator,    component: SimulateurDroitsImportation },
]

export default function SimulateurDouane() {
  const [actif, setActif] = useState('valeur')
  const Composant = TITRES.find(t => t.id === actif)!.component

  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="flex items-start gap-2">
          <Ship className="h-4 w-4 mt-0.5 text-slate-600 shrink-0" />
          <div>
            <p className="text-sm font-bold text-foreground">
              Ordonnance-loi n° 10/002 du 20 août 2010 portant Code des douanes
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              J.O. RDC, numéro spécial du 26 décembre 2010 · 403 articles, 15 titres
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Modifications ponctuelles par les lois de finances annuelles (ex. Art. 386, mod. LF 2025) : le Code n'a jamais été formellement republié dans une version consolidée.
            </p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {TITRES.map(t => {
          const Icon = t.icon
          const isActif = actif === t.id
          return (
            <button
              key={t.id}
              onClick={() => setActif(t.id)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-200 border',
                isActif
                  ? 'bg-cyan-700 text-white border-cyan-700 shadow-sm scale-[1.02]'
                  : 'bg-background text-muted-foreground border-border/60 hover:border-cyan-400 hover:text-foreground hover:scale-[1.02]'
              )}
            >
              <Icon className="h-3 w-3" />
              <span>{t.label}</span>
              <span className="hidden sm:inline text-sm opacity-70">— {t.sublabel}</span>
            </button>
          )
        })}
      </div>

      <div key={actif} className="animate-fadeIn">
        <Composant />
      </div>

      <div className="p-2 border-t border-border/40">
        <p className="text-sm text-muted-foreground text-center italic">
          Ce module est fondé exclusivement sur l'Ordonnance-loi n° 10/002 du 20 août 2010 portant Code des douanes (RDC) et sa veille documentaire.
          Articulation avec la fiscalité intérieure (TVA, accises) : voir le module « Procédures fiscales ». Régime douanier minier spécifique : voir le module « Fiscalité minière ».
        </p>
      </div>
    </div>
  )
}
