/**
 * MODULE PÉDAGOGIQUE : Procédures Fiscales
 * Source : Loi n° 004/2003 du 13 mars 2003 portant réforme des procédures fiscales
 * Modifiée par : Loi n° 23/052 du 30 novembre 2023 (Art. 28 bis inséré)
 *                Loi n° 23/053 du 30 novembre 2023 (Art. 18 bis, 18 ter, 22 bis insérés)
 *                Loi de Finances 2025 : n° 24/011 du 20 décembre 2024
 *                  (Art. 32→Art. 1 al.2 ; Art. 33→Art. 2 bis ; Art. 34→Art. 13 ; Art. 35→Art. 23 ;
 *                   Art. 37→Art. 41 ; Art. 38→Art. 43 ; Art. 39→Art. 45 ; Art. 40→Art. 47 ;
 *                   Art. 41→Art. 47 bis ; Art. 42→Art. 63 ; Art. 43→Art. 72 ; Art. 44/45→Art. 92 ;
 *                   Art. 47→Art. 96 ter ; Art. 49→Art. 105 ; Art. 50→Art. 105 bis ; Art. 51→Art. 108 bis ;
 *                   Art. 60→Art. 57 bis)
 *                Loi de Finances 2026 : n° 25/060 du 29 décembre 2025
 *                  (Art. 17→Art. 1 ; Art. 18→Art. 12 ; Art. 19→Art. 13 bis ; Art. 20→Art. 17 ;
 *                   Art. 21→intitulé K ; Art. 22→Art. 22 ter ; Art. 23→Art. 22 quater ;
 *                   Art. 24→Art. 23 ; Art. 25→Art. 24 bis ; Art. 26→Art. 24 ter ;
 *                   Art. 27→Art. 24 quinquies ; Art. 28→Art. 29 bis ; Art. 29→Art. 41 ter supprimé ;
 *                   Art. 30→Art. 47 ter ; Art. 31→Art. 57 bis ; Art. 32→Art. 82 bis ;
 *                   Art. 33→Art. 92 bis ; Art. 34→Art. 93 bis ; Art. 35→Art. 96 bis ;
 *                   Art. 36→Art. 97 sexies supprimé ; Art. 37→Art. 108 ter ;
 *                   Art. 38→Point L Titre I ; Art. 39→Art. 22 quarter ;
 *                   Art. 40-44→Art. 149 bis à 149 quinquies [Loi 23/053])
 *
 * Contenu exclusivement fondé sur la loi : aucune rédaction libre.
 */

import React, { useState } from 'react'
import {
  FileText, Shield, Banknote, AlertTriangle, MessageSquare, Info,
  ChevronRight, ChevronDown, BookOpen, Calculator, Scale
} from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Tooltip pédagogique ────────────────────────────────────────────────────
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

// ─── TITRE I : OBLIGATIONS DÉCLARATIVES ─────────────────────────────────────
function TitreI() {
  return (
    <div>
      <SectionHeader icon={FileText} label="Titre I : Obligations Déclaratives (Art. 1-24)" color="bg-blue-50 text-blue-800" />

      <div className="mb-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Chapitre I : Dispositions Générales
        </p>

        <ArticleBox num="1" titre="Numéro impôt : délai 15 jours" modifie="LF 2025 Art. 32 + LF 2026 Art. 17">
          <p>Toute personne physique ou morale, exonérée ou non, redevable d'impôts, droits, taxes ou acomptes perçus par l'Administration des Impôts est tenue de <strong>se faire connaître dans les quinze jours qui suivent le début de ses activités</strong>, en formulant une demande de Numéro Impôt.</p>
          <p className="mt-2"><strong>Modifications successives :</strong></p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li><strong>LF 2025 (Art. 32) :</strong> Le numéro impôt est <strong>attribué par l'Administration des Impôts</strong> après certification de la localisation effective du contribuable.</li>
            <li><strong>LF 2026 (Art. 17) :</strong> La demande peut être souscrite <strong>soit sur support papier, soit en ligne</strong>, conformément au formulaire dont le modèle est fixé par l'Administration. Le demandeur doit joindre un <strong>plan de localisation</strong>.</li>
            <li><strong>Attribution d'office (LF 2026 Art. 17) :</strong> L'Administration des Impôts peut <strong>attribuer d'office le Numéro Impôt</strong> à un contribuable sur base des informations dont elle dispose.</li>
          </ul>
          <Ref>Art. 1, Loi n° 004/2003 mod. Art. 32 LF 2025 n° 24/011 du 20/12/2024 + Art. 17 LF 2026 n° 25/060 du 29/12/2025</Ref>
        </ArticleBox>

        <ArticleBox num="2" titre="Déclaration des modifications : délai 15 jours">
          <p>Toutes les modifications relatives à l'identité, à la direction, à l'adresse ou affectant un élément imposable ou l'exploitation, ou y mettant un terme, feront l'objet d'une <strong>déclaration auprès de l'Administration des Impôts dans les quinze jours de la survenance de l'événement</strong>.</p>
          <Ref>Art. 2, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="2 bis" titre="Communication des adresses physiques pour notification" modifie="Art. 33, LF 2025">
          <p>Lorsque les envois de l'Administration des Impôts sont destinés à des <strong>ambassades, organisations internationales, ou à des contribuables temporairement absents</strong>, le contribuable concerné est tenu de communiquer à l'Administration des Impôts <strong>une adresse physique permanente sur le territoire national</strong> permettant la réception des notifications fiscales en son absence.</p>
          <p className="mt-1">Les règles de traitement des envois adressés à ces destinataires sont fixées par voie réglementaire.</p>
          <Ref>Art. 2 bis, Loi n° 004/2003 (introduit par Art. 33, LF 2025 : n° 24/011)</Ref>
        </ArticleBox>

        <ArticleBox num="3" titre="Déclaration autoliquidative">
          <p>Les personnes visées à l'article 1er sont tenues de souscrire, dans les conditions et délais prévus, une déclaration auprès de l'Administration des Impôts. <strong>Elles déterminent, dans ces déclarations et sous leur responsabilité, les bases d'imposition et le montant des impôts et autres droits dus</strong>, conformément aux dispositions légales.</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>Les déclarations doivent être dûment remplies, datées et signées par les redevables ou leurs représentants.</li>
            <li>En cas de décès du redevable : les déclarations sont souscrites par ses héritiers, légataires et donataires universels ou leurs mandataires.</li>
            <li>Les déclarations doivent être souscrites <strong>même si le redevable est exonéré</strong>.</li>
            <li>Les personnes exemptées sont dispensées de l'obligation de souscrire les déclarations.</li>
          </ul>
          <Ref>Art. 3, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="4" titre="Absence de formulaire : pas d'excuse">
          <p>Le redevable qui n'aurait pas reçu le formulaire de déclaration <strong>ne peut se prévaloir de cette omission pour se soustraire à l'obligation de déclaration dans les délais impartis</strong>. Il est tenu, dans ce cas, de demander le formulaire auprès de l'Administration des Impôts.</p>
          <Ref>Art. 4, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="5" titre="Lettre de relance : délai 5 jours">
          <p>Tout redevable qui s'est abstenu de souscrire sa déclaration dans le délai fait l'objet d'une <strong>lettre de relance valant mise en demeure de déclarer</strong>. Dans ce cas, il dispose d'un délai de cinq jours à compter de la réception de la lettre de relance pour régulariser sa situation.</p>
          <p className="mt-1 text-amber-700 font-medium">⚠ Cette disposition <strong>ne s'applique pas en cas de récidive</strong>.</p>
          <Ref>Art. 5, Loi n° 004/2003</Ref>
        </ArticleBox>
      </div>

      <div className="mb-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Chapitre II : Dispositions Particulières : Délais de déclaration par impôt
        </p>

        <div className="overflow-x-auto rounded-lg border border-border/60">
          <table className="w-full text-xs">
            <thead className="bg-muted/50">
              <tr>
                <th className="text-left px-3 py-2 font-semibold">Impôt</th>
                <th className="text-left px-3 py-2 font-semibold">Délai de déclaration</th>
                <th className="text-left px-3 py-2 font-semibold">Référence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/40">
              <tr className="hover:bg-muted/20">
                <td className="px-3 py-2">Impôt foncier</td>
                <td className="px-3 py-2 font-medium">Au plus tard le 1er février de chaque année</td>
                <td className="px-3 py-2 text-muted-foreground">Art. 6</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="px-3 py-2">Impôt sur les véhicules</td>
                <td className="px-3 py-2 font-medium">Avant la mise en usage (par véhicule)</td>
                <td className="px-3 py-2 text-muted-foreground">Art. 7</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="px-3 py-2">Impôt sur les concessions minières</td>
                <td className="px-3 py-2 font-medium">Au plus tard le 1er février</td>
                <td className="px-3 py-2 text-muted-foreground">Art. 10</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="px-3 py-2">Impôt sur les revenus locatifs</td>
                <td className="px-3 py-2 font-medium">Au plus tard le 1er février (année N+1)</td>
                <td className="px-3 py-2 text-muted-foreground">Art. 11</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="px-3 py-2">Impôt sur les Sociétés (IS) : déclaration annuelle</td>
                <td className="px-3 py-2 font-medium">Au plus tard le <strong>30 avril</strong> de l'année suivant celle de réalisation des revenus</td>
                <td className="px-3 py-2 text-muted-foreground">Art. 12 mod. LF 2026</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="px-3 py-2">IRPP : déclaration annuelle (toutes catégories)</td>
                <td className="px-3 py-2 font-medium">Au plus tard le <strong>30 avril</strong> de l'année suivant celle de réalisation des revenus</td>
                <td className="px-3 py-2 text-muted-foreground">Art. 17 mod. Art. 20, LF 2026</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="px-3 py-2">Impôt mobilier (capitaux mobiliers)</td>
                <td className="px-3 py-2 font-medium">Dans les 10 jours suivant le mois de paiement</td>
                <td className="px-3 py-2 text-muted-foreground">Art. 19</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="px-3 py-2">TVA à l'intérieur</td>
                <td className="px-3 py-2 font-medium">Au plus tard le 15 du mois suivant</td>
                <td className="px-3 py-2 text-muted-foreground">Art. 21</td>
              </tr>
              <tr className="hover:bg-muted/20">
                <td className="px-3 py-2">TVA à l'exportation (banques)</td>
                <td className="px-3 py-2 font-medium">Au plus tard le 5 de chaque mois</td>
                <td className="px-3 py-2 text-muted-foreground">Art. 22</td>
              </tr>
            </tbody>
          </table>
        </div>

        <ArticleBox num="12" titre="Délai de dépôt de la déclaration IS : 30 avril" modifie="LF 2026 Art. 18">
          <p>La déclaration IS (Impôt sur les Sociétés) doit être souscrite et déposée <strong>au plus tard le 30 avril de l'année civile qui suit celle de la clôture de l'exercice</strong>.</p>
          <p className="mt-1">Exemple : pour l'exercice clos le 31 décembre N, la déclaration IS doit être déposée au plus tard le <strong>30 avril N+1</strong>.</p>
          <p className="mt-1 text-blue-700 text-xs">ℹ Ce délai a été uniformisé par la LF 2026 (Art. 18) pour le mettre en cohérence avec le délai IRPP (Art. 17 de la même loi - voir Art. 17 ci-dessous).</p>
          <Ref>Art. 12, Loi n° 004/2003 mod. LF 2026 : n° 25/060 du 29/12/2025, Art. 18</Ref>
        </ArticleBox>

        <ArticleBox num="17" titre="Délai de dépôt de la déclaration IRPP : 30 avril" modifie="LF 2026 Art. 20">
          <p>La déclaration de l'Impôt sur le Revenu des Personnes Physiques (IRPP), toutes catégories de revenus, doit être souscrite et déposée <strong>au plus tard le 30 avril de l'année civile qui suit celle de la réalisation des revenus</strong>.</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>Bénéfices industriels et commerciaux (BIC)</li>
            <li>Bénéfices non commerciaux (BNC)</li>
            <li>Bénéfices agricoles</li>
            <li>Revenus fonciers et locatifs</li>
            <li>Rémunérations de dirigeants (toutes catégories IRPP)</li>
          </ul>
          <p className="mt-1">Exemple : pour les revenus de l'année N, la déclaration IRPP doit être déposée au plus tard le <strong>30 avril N+1</strong>.</p>
          <p className="mt-1 text-amber-700 font-medium">⚠ Ce délai 30 avril concerne la déclaration annuelle. Les retenues à la source (salaires, mobiliers) restent soumises à leurs propres délais mensuels (Art. 18 bis, 22 bis, etc.).</p>
          <Ref>Art. 17, Loi n° 004/2003 mod. LF 2026 : n° 25/060 du 29/12/2025, Art. 20</Ref>
        </ArticleBox>

        <ArticleBox num="13" titre="Pièces jointes à la déclaration IS/bénéfices" modifie="Art. 34, LF 2025">
          <p>La déclaration annuelle IS/IRPP doit être appuyée <strong>(texte en vigueur après Art. 34, LF 2025 n° 24/011)</strong> :</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>Du <strong>bilan</strong> conforme à l'Acte uniforme OHADA du <strong>26 janvier 2017</strong> relatif au droit comptable et à l'information financière (AUDCIF)</li>
            <li>Du <strong>compte de résultat</strong> (conforme OHADA 2017)</li>
            <li>Du <strong>tableau des flux de trésorerie (TFT)</strong></li>
            <li>Du <strong>tableau de variation des capitaux propres (TVCP)</strong></li>
            <li>Des <strong>notes annexes</strong> conformément à l'AUDCIF</li>
            <li>De la <strong>balance générale des comptes à six colonnes</strong></li>
            <li>D'un <strong>relevé de cessions</strong> des éléments d'actif (montant acquisition, amortissements, prix vente, nom acquéreur, TVA déduite)</li>
            <li>De toutes autres pièces justificatives que le contribuable jugerait nécessaires</li>
          </ul>
          <p className="mt-2"><strong>Cas particuliers :</strong> Les établissements de crédit, microfinance, sociétés d'assurance, organismes de sécurité sociale et entités à but non lucratif joignent leurs <strong>états financiers propres à leurs règles comptables spécifiques</strong> (et non le bilan OHADA standard).</p>
          <p className="mt-2 text-amber-700 font-medium">⚠ La déclaration est <strong>contresignée par le conseil ou le comptable du redevable</strong>.</p>
          <Ref>Art. 13, Loi n° 004/2003 mod. Art. 34, LF 2025 n° 24/011 du 20 décembre 2024</Ref>
        </ArticleBox>

        <ArticleBox num="15" titre="Déclaration obligatoire même en cas de perte">
          <p>La déclaration doit être souscrite <strong>même si le redevable estime qu'il a subi des pertes ou qu'il n'a pas réalisé de revenus imposables</strong>.</p>
          <Ref>Art. 15, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="16" titre="Dissolution, liquidation ou cessation d'affaires">
          <p>En cas de dissolution, liquidation de société ou cessation d'affaires, la déclaration doit être remise <strong>dans le mois et, en tout cas, avant que le dirigeant ne quitte la République Démocratique du Congo</strong>.</p>
          <Ref>Art. 16, Loi n° 004/2003</Ref>
        </ArticleBox>
      </div>

      <div className="mb-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Chapitre III : Dispositions Spéciales : Facturation obligatoire
        </p>

        <ArticleBox num="13 bis" titre="Dépôt du procès-verbal d'Assemblée Générale" modifie="LF 2026">
          <p>Les sociétés et les autres personnes morales soumises à l'Impôt sur les Sociétés sont tenues de déposer auprès de l'Administration des impôts, <strong>dans les dix jours de la tenue de l'Assemblée Générale ordinaire approuvant les états financiers certifiés par les commissaires aux comptes</strong>, le procès-verbal de l'Assemblée Générale.</p>
          <Ref>Art. 13 bis, Loi n° 004/2003 (introduit par LF 2026 : n° 25/060, Art. 19)</Ref>
        </ArticleBox>

        <ArticleBox num="22 ter" titre="Déclaration annuelle des revenus salariaux" modifie="LF 2026">
          <p>Les sociétés et les autres personnes morales ainsi que les personnes physiques soumises au régime réel d'imposition et au régime d'imposition des petites entreprises sont tenues de déposer, <strong>au plus tard le 31 mars de chaque année</strong>, auprès des services compétents de l'Administration des Impôts dont elles relèvent, une <strong>déclaration annuelle sur les revenus salariaux et revenus assimilés versés à leurs employés</strong>, sur un formulaire dont le modèle est défini par l'Administration des Impôts. La déclaration doit être accompagnée des fiches individuelles pour chacun des rémunérés, classées par province et par ordre alphabétique.</p>
          <Ref>Art. 22 ter, Loi n° 004/2003 mod. LF 2026 : n° 25/060, Art. 22</Ref>
        </ArticleBox>

        <ArticleBox num="22 quater" titre="Correction spontanée de déclaration" modifie="LF 2026">
          <p>Sans préjudice du pouvoir de l'Administration d'exercer son contrôle, <strong>une déclaration souscrite à l'échéance peut être spontanément corrigée par un contribuable de bonne foi</strong>. Dans ce cas, <strong>seuls les intérêts de retard seront appliqués et réclamés par voie d'Avis de Mise en Recouvrement</strong>.</p>
          <Ref>Art. 22 quater, Loi n° 004/2003 (introduit par LF 2026 : n° 25/060, Art. 23)</Ref>
        </ArticleBox>

        <ArticleBox num="23" titre="Obligation de facturation normalisée" modifie="LF 2026">
          <p>Sans préjudice de la législation en matière économique et sous réserve des dispositions particulières applicables aux Entreprises de petite taille, les redevables de l'<strong>Impôt sur les Sociétés</strong>, de l'<strong>Impôt sur le Revenu des Personnes Physiques dans les catégories de bénéfices</strong> et de la <strong>Taxe sur la Valeur Ajoutée</strong> doivent obligatoirement, <strong>pour chaque transaction effectuée, délivrer une facture normalisée ou un document en tenant lieu</strong> dont les mentions sont déterminées par voie réglementaire. La facture peut être émise et transmise sous format électronique, avec la même valeur probante qu'une facture papier, sous réserve des conditions fixées par Décret délibéré en Conseil des Ministres.</p>
          <Ref>Art. 23, Loi n° 004/2003 mod. LF 2026 : n° 25/060, Art. 24</Ref>
        </ArticleBox>

        <ArticleBox num="18 bis" titre="Versement des retenues à la source (revenus mobiliers)" modifie="Loi 23/053">
          <p>Les retenues à la source opérées sur les revenus de capitaux mobiliers (dividendes, intérêts, jetons de présence) <strong>doivent être versées par le débiteur des revenus au Trésor dans les quinze jours du mois qui suit celui du paiement ou de la mise à disposition des revenus</strong>.</p>
          <Ref>Art. 18 bis, Loi n° 004/2003 (introduit par Loi n° 23/053 du 30 novembre 2023)</Ref>
        </ArticleBox>

        <ArticleBox num="18 ter" titre="Versement des retenues à la source (plus-values)" modifie="Loi 23/053">
          <p>Les retenues à la source opérées sur les plus-values de cession de biens (Cat. 6 IRPP) <strong>doivent être versées par le débiteur des revenus (l'acquéreur) dans les quinze jours du mois qui suit celui de leur réalisation</strong>. Chaque versement est accompagné d'une déclaration souscrite auprès du service gestionnaire.</p>
          <Ref>Art. 18 ter, Loi n° 004/2003 (introduit par Loi n° 23/053 du 30 novembre 2023)</Ref>
        </ArticleBox>

        <ArticleBox num="22 bis" titre="Précompte sur prestations de non-résidents" modifie="Loi 23/053">
          <p>Prélèvement de <strong>14% sur le montant brut</strong> des factures de prestations de services fournies par des personnes physiques ou morales <strong>non établies en RDC</strong>. Retenu à la source par le bénéficiaire des services. Déclaration <strong>au plus tard le 15 du mois suivant le paiement</strong>.</p>
          <Ref>Art. 22 bis, Loi n° 004/2003 (introduit par Loi n° 23/053 du 30 novembre 2023)</Ref>
        </ArticleBox>

        <ArticleBox num="22 quarter" titre="Déclaration : prélèvement sur revenus mobiliers versés à des non-résidents" modifie="LF 2026">
          <p>Les sociétés établies en RDC qui paient des revenus des capitaux mobiliers versés à des personnes non-résidentes sont tenues de souscrire une déclaration, <strong>au plus tard le quinze du mois qui suit celui du paiement de ces revenus aux bénéficiaires ou de leur mise à disposition</strong>. Cette déclaration, accompagnée du paiement, est à souscrire auprès du Service de l'Administration des Impôts, gestionnaire de la société établie en RDC.</p>
          <Ref>Art. 22 quarter, Loi n° 004/2003 (introduit par LF 2026 : n° 25/060, Art. 39)</Ref>
        </ArticleBox>

        {/* Section Prix de transfert - LF 2026 */}
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2 mt-3">
          Prix de transfert et déclaration pays par pays (LF 2026)
        </p>

        <ArticleBox num="24 bis" titre="Documentation des prix de transfert (obligation documentaire)" modifie="LF 2026 Art. 25">
          <p>Les entreprises établies en RDC qui remplissent l'une des conditions ci-dessous doivent tenir à la disposition de l'Administration des Impôts, <strong>à la date de la première intervention de la vérification sur place</strong>, une documentation permettant de justifier la politique de prix pratiquée dans le cadre des transactions avec des <strong>entreprises liées situées hors de la RDC</strong> (au sens de l'Art. 53 Loi n° 23/053).</p>
          <p className="mt-1.5"><strong>Seuils déclenchant l'obligation :</strong></p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>Toute entreprise ayant un <strong>chiffre d'affaires annuel HT ou un actif brut ≥ 10 000 000 000 FC</strong></li>
            <li>Toute entreprise détenant, directement ou par personne interposée, la majorité du capital social ou des droits de vote d'une entreprise (RDC ou hors RDC) dont le CA HT ou actif brut est ≥ 10 000 000 000 FC</li>
            <li>Toute entreprise dont la majorité du capital social ou des droits de vote est détenue, directement ou par personne interposée, par une entreprise dont le CA HT ou actif brut est ≥ 10 000 000 000 FC</li>
          </ul>
          <p className="mt-1.5"><strong>Contenu de la documentation :</strong></p>
          <ul className="list-disc pl-4 space-y-0.5 mt-1 text-xs">
            <li><strong>Fichier principal</strong> : informations générales sur le groupe d'entreprises liées</li>
            <li><strong>Fichier local</strong> : informations spécifiques sur l'entreprise vérifiée</li>
          </ul>
          <p className="mt-1.5"><strong>Mise en demeure :</strong> Si la documentation n'est pas mise à disposition à la date de première intervention, l'Administration adresse une mise en demeure de la produire ou de la compléter dans un <strong>délai de 5 jours</strong>.</p>
          <p className="mt-1.5 text-amber-700"><strong>Sanction (Art. 93 bis) :</strong> En cas de défaut de réponse à la mise en demeure : amende égale à <strong>2% du montant des transactions concernées par les documents manquants</strong>, avec un minimum de <strong>100 000 000 FC par exercice</strong>.</p>
          <Ref>Art. 24 bis, Loi n° 004/2003 (modifié par LF 2026 n° 25/060, Art. 25)</Ref>
        </ArticleBox>

        <ArticleBox num="24 ter" titre="Déclaration annuelle des prix de transfert" modifie="LF 2026 Art. 26">
          <p>Les entreprises soumises à l'obligation documentaire prévue à l'Art. 24 bis doivent souscrire, <strong>par voie électronique</strong>, une déclaration annuelle des prix de transfert, dans le même délai que celui du dépôt de la déclaration IS (soit le <strong>30 avril</strong>).</p>
          <p className="mt-1.5"><strong>Contenu de la déclaration :</strong></p>
          <ul className="list-disc pl-4 space-y-0.5 mt-1 text-xs">
            <li><em>Informations générales sur le groupe :</em> dénomination et adresse de l'entité mère ultime ; description des principales activités ; politique de prix de transfert du groupe ; actifs incorporels détenus ; restructurations opérées au sein du groupe</li>
            <li><em>Informations spécifiques sur l'entreprise déclarante :</em> description de l'activité ; état récapitulatif des opérations avec entreprises liées ; informations sur les prêts/emprunts intragroupe ; opérations sans contrepartie ; transactions faisant l'objet d'accords préalables</li>
          </ul>
          <p className="mt-1.5 text-amber-700"><strong>Sanction :</strong> Défaut de souscription ou souscription incomplète : amende de <strong>100 000 000 FC</strong> (Art. 93 bis).</p>
          <Ref>Art. 24 ter, Loi n° 004/2003 (modifié par LF 2026 n° 25/060, Art. 26)</Ref>
        </ArticleBox>

        <ArticleBox num="24 quinquies" titre="Déclaration pays par pays (CbCR)" modifie="LF 2026 Art. 27">
          <p>Toute entreprise établie en RDC appartenant à un <strong>groupe multinational</strong> doit déposer, dans les <strong>12 mois suivant la clôture de l'exercice fiscal</strong>, <strong>par voie électronique</strong>, une <strong>déclaration pays par pays</strong> comportant la répartition des bénéfices et des données fiscales/comptables du groupe, lorsqu'elle remplit les conditions suivantes :</p>
          <ul className="list-disc pl-4 space-y-1 mt-1 text-xs">
            <li>Elle détient directement ou indirectement des participations telles qu'elle est tenue d'établir des états financiers consolidés</li>
            <li>Le groupe réalise un <strong>chiffre d'affaires annuel HT consolidé ≥ 850 000 000 USD</strong> (équivalent FC au cours de l'exercice précédent)</li>
            <li>Aucune autre entreprise ne détient de participation dans cette entreprise (entité mère ultime)</li>
          </ul>
          <p className="mt-1.5">Sont également tenus de déposer cette déclaration les filiales congolaises d'un groupe dont l'entité mère est établie dans un pays :</p>
          <ul className="list-disc pl-4 space-y-0.5 mt-1 text-xs">
            <li>N'exigeant pas le dépôt d'une déclaration pays par pays similaire</li>
            <li>Ne figurant pas sur la liste des États ayant conclu un accord d'échange automatique avec la RDC</li>
          </ul>
          <p className="mt-1.5 text-amber-700"><strong>Sanction :</strong> Défaut de souscription ou souscription incomplète/inexacte : amende de <strong>150 000 000 FC</strong> (Art. 93 bis).</p>
          <Ref>Art. 24 quinquies, Loi n° 004/2003 (introduit par LF 2026 n° 25/060, Art. 27)</Ref>
        </ArticleBox>

        <ArticleBox num="24 quater" titre="Accords préalables sur les prix de transfert" modifie="LF 2025 Art. 36">
          <p>Les sociétés soumises à l'obligation de l'Art. 24 bis peuvent demander par écrit à l'Administration des Impôts de conclure des <strong>accords préalables sur la méthode de détermination des prix des transactions intragroupes</strong>, pour une durée ne dépassant pas <strong>quatre exercices</strong>.</p>
          <p className="mt-1.5"><strong>Méthodes de fixation du prix de pleine concurrence :</strong></p>
          <ul className="list-disc pl-4 space-y-0.5 mt-1 text-xs">
            <li>Prix comparable sur marché libre (PCML)</li>
            <li>Méthode du prix de revient majoré (PRM)</li>
            <li>Méthode du prix de revente</li>
            <li>Méthode transactionnelle de la marge nette (MTMN)</li>
            <li>Méthode du partage des bénéfices</li>
            <li>Toute autre méthode justifiée et cohérente avec le principe de pleine concurrence</li>
          </ul>
          <Ref>Art. 24 quater, Loi n° 004/2003 (modifié par LF 2025 n° 24/011, Art. 36)</Ref>
        </ArticleBox>


      </div>
    </div>
  )
}

// ─── TITRE II : CONTRÔLE ─────────────────────────────────────────────────────
function TitreII() {
  return (
    <div>
      <SectionHeader icon={Shield} label="Titre II : Contrôle fiscal (Art. 25-56 quarto)" color="bg-violet-50 text-violet-800" />

      <div className="mb-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Chapitre I : Droit de contrôle
        </p>

        <ArticleBox num="25" titre="Droit exclusif de vérification">
          <p>L'Administration des Impôts a <strong>le pouvoir exclusif</strong> de vérifier, sur pièces ou sur place, l'exactitude des déclarations de tous les impôts et autres droits dus par les redevables, conformément aux dispositions légales en vigueur.</p>
          <Ref>Art. 25, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="26" titre="Contrôle sur pièces">
          <p>L'Administration des Impôts procède au contrôle des déclarations souscrites, <strong>à partir du bureau, sans envoi d'avis préalable</strong>, dans le cadre de contrôles sur pièces. Ces contrôles se limitent à l'examen des déclarations, des actes utilisés pour l'établissement des impôts et des documents déposés en vue d'une déduction ou d'un remboursement. Dans ce cadre, l'Administration peut inviter tout redevable à fournir verbalement ou par écrit des explications, éclaircissements ou justifications et à communiquer, sans déplacement, ses écritures et documents comptables. Ces demandes peuvent porter sur <strong>toutes les opérations auxquelles le redevable a été partie</strong>, et les informations recueillies peuvent être invoquées en vue de l'imposition de tiers.</p>
          <p className="mt-1 text-blue-700 text-xs">ℹ Le contrôle sur pièces est un <strong>contrôle de cohérence</strong> des déclarations, et non un contrôle général de comptabilité (qui relève de la vérification sur place, Art. 28).</p>
          <Ref>Art. 26, Loi n° 004/2003 mod. L.F. n° 22/071 du 28/12/2022</Ref>
        </ArticleBox>

        <ArticleBox num="27" titre="Établissement d'office des impôts">
          <p>L'Administration des Impôts établit d'office les impôts et autres droits dus par les redevables dans les cas prévus à l'Art. 41 (taxation d'office).</p>
          <Ref>Art. 27, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="28" titre="Ordre de vérification et modalités : générale ou ponctuelle">
          <p>Les agents de l'Administration des Impôts, <strong>munis d'un ordre de vérification signé par le fonctionnaire compétent</strong>, peuvent vérifier sur place l'exactitude des déclarations. La vérification peut être :</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li><strong>Générale</strong> : porte sur tous les impôts et taxes, sur toute la période non prescrite</li>
            <li><strong>Ponctuelle</strong> : contrôle d'un seul impôt sur une période inférieure à un exercice fiscal</li>
          </ul>
          <p className="mt-1">Elle s'exerce au siège de l'entreprise ou au lieu de son principal établissement, pendant les heures de service. Si, pour des raisons objectives, le contrôle ne peut s'y dérouler, le redevable doit expressément demander qu'il ait lieu dans les bureaux de son comptable ou dans les locaux de l'Administration des Impôts.</p>
          <Ref>Art. 28, Loi n° 004/2003 mod. O.-L. n° 13/005 du 23/02/2013</Ref>
        </ArticleBox>

        <ArticleBox num="29" titre="Opérations de vérification">
          <p>Les opérations de vérification consistent à <strong>confronter la comptabilité présentée à certaines données de fait ou matérielles</strong>, afin de contrôler la sincérité des déclarations souscrites et de procéder, le cas échéant, à l'établissement des impôts ou autres droits éludés. Le contrôle peut également consister en l'examen de la cohérence entre les éléments déclarés et la situation patrimoniale, la situation de trésorerie et/ou d'autres indices d'où résulte une aisance supérieure à ces éléments.</p>
          <Ref>Art. 29, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="30" titre="Avis de vérification : délai 8 jours">
          <p>L'agent de l'Administration des Impôts <strong>adresse un avis de vérification au redevable, au moins huit jours avant la date de la première intervention</strong>. Cet avis informe le redevable :</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>De son droit de se faire assister d'un conseil de son choix</li>
            <li>De la nature des impôts ou autres droits soumis au contrôle</li>
            <li>De la période soumise au contrôle</li>
          </ul>
          <p className="mt-1">Le redevable peut solliciter le report de la première intervention, par écrit dans les 48 heures ; ce report <strong>ne peut dépasser quinze jours</strong>.</p>
          <Ref>Art. 30, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="30 bis" titre="Durée maximale de la vérification sur place : sous peine de nullité" modifie="créé L.F. 22/071">
          <p>Sous peine de <strong>nullité des impositions</strong>, la vérification sur place ne peut s'étendre sur une durée supérieure à :</p>
          <div className="overflow-x-auto rounded border border-border/40 mt-1">
            <table className="w-full text-xs">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-2 py-1.5 text-left">Taille de l'entreprise</th>
                  <th className="px-2 py-1.5 text-left">Durée maximale</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                <tr><td className="px-2 py-1.5">Petite entreprise</td><td className="px-2 py-1.5 font-bold text-amber-700">3 mois</td></tr>
                <tr><td className="px-2 py-1.5">Moyenne entreprise</td><td className="px-2 py-1.5 font-bold text-amber-700">6 mois</td></tr>
                <tr><td className="px-2 py-1.5">Grande entreprise</td><td className="px-2 py-1.5 font-bold text-amber-700">9 mois</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-1.5">Pour le <strong>contrôle ponctuel</strong>, la durée des interventions sur place ne peut excéder <strong>un mois</strong>.</p>
          <p className="mt-1">Ces délais sont prorogés du temps nécessaire à l'Administration pour obtenir les éléments requis (y compris les relevés bancaires) non intégralement produits par le contribuable, et du temps pris par les autorités étrangères pour répondre à une demande de renseignements. L'expiration de ces délais n'est pas opposable à l'Administration pour l'examen de requêtes postérieures à l'achèvement des opérations, ni en cas de manœuvres frauduleuses et de poursuites pénales.</p>
          <Ref>Art. 30 bis, Loi n° 004/2003 (créé par L.F. n° 22/071 du 28/12/2022)</Ref>
        </ArticleBox>

        <ArticleBox num="31" titre="Vérification inopinée">
          <p>Lorsque les intérêts du Trésor risquent d'être compromis, l'Administration des Impôts peut procéder <strong>sans délai à une vérification inopinée</strong>. Dans ce cas :</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>L'avis de vérification est remis en mains propres lors de la première intervention</li>
            <li>Les opérations se limitent à des constatations matérielles (inventaires, relevés de prix, contrôle des pièces comptables obligatoires)</li>
            <li>Le contrôle proprement dit ne commence que dans les conditions de l'Art. 30</li>
          </ul>
          <Ref>Art. 31, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="32-33" titre="Étendue de l'ordre de vérification et appel à conseils techniques">
          <p><strong>Art. 32</strong> : Lorsque l'ordre de vérification ne précise pas les impôts ou droits ni les années ou périodes soumises, l'agent peut vérifier l'ensemble des impôts et droits dont le contribuable est redevable au titre des exercices non encore vérifiés (sans préjudice de l'Art. 43).</p>
          <p className="mt-1"><strong>Art. 33</strong> : Lorsqu'une vérification de comptabilité ou une procédure de redressement requiert des connaissances techniques particulières, l'Administration peut faire appel aux conseils techniques d'agents de l'État ou d'établissements publics.</p>
          <Ref>Art. 32-33, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="28 bis" titre="Vérification de la situation fiscale personnelle d'ensemble" modifie="Loi 23/052">
          <p>Tout contribuable soumis à l'IRPP peut faire l'objet d'une <strong>vérification de sa situation fiscale personnelle d'ensemble</strong>. À l'occasion de ce contrôle, l'Administration peut vérifier la cohérence entre, d'une part, les revenus déclarés et, d'autre part, <strong>la situation patrimoniale, la situation de trésorerie et les éléments de son train de vie</strong>.</p>
          <Ref>Art. 28 bis, Loi n° 004/2003 (introduit par Loi n° 23/052 du 30 novembre 2023)</Ref>
        </ArticleBox>

        <ArticleBox num="29 ter-29 quater" titre="Acte anormal de gestion et rectification par comparaison" modifie="créés L.F. 19/005">
          <p><strong>Art. 29 ter</strong> : Les opérations constitutives d'un <strong>acte anormal de gestion</strong> (au sens de l'Art. 31 bis de l'O.-L. n° 69/009) ne sont pas opposables à l'Administration des Impôts et peuvent être écartées afin de reconstituer leur véritable caractère, lorsqu'elles visent à éluder l'impôt ou à en réduire le montant.</p>
          <p className="mt-1"><strong>Art. 29 quater</strong> : Pour la rectification du résultat fiscal ou du chiffre d'affaires déclaré en cas de transfert de bénéfices entre entreprises dépendantes, les prix d'achat ou de vente sont déterminés par comparaison au prix de pleine concurrence, à ceux d'entreprises similaires indépendantes, ou par voie d'appréciation directe sur base des informations dont dispose l'Administration.</p>
          <Ref>Art. 29 ter-29 quater, Loi n° 004/2003 (créés par L.F. n° 19/005 du 31/12/2019)</Ref>
        </ArticleBox>

        <ArticleBox num="29 bis" titre="Demande d'informations sur les transferts de bénéfices présumés" modifie="LF 2026 Art. 28">
          <p>Lorsqu'au cours d'une vérification de comptabilité d'une entreprise <strong>non soumise à l'obligation documentaire de l'Art. 24 bis</strong>, l'Administration réunit des éléments faisant présumer un <strong>transfert indirect de bénéfices</strong> (au sens de l'Art. 53 Loi 23/053), elle peut demander à cette entreprise des informations ou documents précisant :</p>
          <ol className="list-decimal pl-4 space-y-1 mt-1 text-xs">
            <li>L'identité des entreprises liées établies hors RDC avec lesquelles cette entreprise réalise des transactions, et la nature de ces transactions</li>
            <li>La nature des relations entre cette entreprise et ces entités étrangères</li>
            <li>La méthode de détermination des prix des opérations industrielles, commerciales ou financières, avec analyse fonctionnelle et analyse de comparabilité complètes</li>
            <li>Les activités exercées par les entités liées dans le cadre de ces opérations</li>
            <li>La copie des contrats conclus avec des entreprises liées</li>
            <li>Le traitement fiscal réservé à ces opérations dans les pays des entités liées</li>
          </ol>
          <p className="mt-1.5">Les demandes doivent être précises et indiquer, par nature d'activité ou par produit : le pays/territoire concerné ; l'entité visée ; les montants en cause.</p>
          <p className="mt-1"><strong>Délai de réponse :</strong> l'entreprise dispose de <strong>15 jours</strong> pour répondre à compter de la réception de la demande.</p>
          <p className="mt-1 text-amber-700"><strong>Sanction (Art. 92 bis) :</strong> Défaut de réponse → astreinte de <strong>10 000 000 FC/jour</strong> jusqu'à communication des informations, réclamée par AMR.</p>
          <Ref>Art. 29 bis, Loi n° 004/2003 (modifié par LF 2026 n° 25/060, Art. 28)</Ref>
        </ArticleBox>

                <ArticleBox num="34" titre="Comptabilité informatique" modifie="Art. 34, LF 2025">
          <p>Lorsque la comptabilité est tenue au moyen de <strong>systèmes informatisés</strong>, l'Administration des Impôts est habilitée à effectuer des tests sur le matériel informatique utilisé et à vérifier :</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>Le système d'exploitation comptable</li>
            <li>L'ensemble des informations, données et traitements qui concourent à la formation des résultats comptables ou fiscaux</li>
            <li>La documentation relative aux analyses, à la programmation et à l'exécution des traitements</li>
          </ul>
          <Ref>Art. 34, Loi n° 004/2003 mod. Art. 34, LF 2025</Ref>
        </ArticleBox>

        <ArticleBox num="35" titre="Délai de réponse aux demandes écrites">
          <p>Le redevable qui reçoit une demande écrite pour fournir des explications, éclaircissements, justifications ou renseignements dispose d'un <strong>délai de vingt jours pour y répondre</strong>.</p>
          <Ref>Art. 35, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="36-39" titre="Procédure de redressement contradictoire">
          <p><strong>Art. 36</strong> : En cas d'insuffisances, inexactitudes ou omissions, l'Administration des Impôts notifie les redressements chiffrés qu'elle se propose d'effectuer, en indiquant les motifs. <strong>La charge de la preuve incombe à l'Administration.</strong></p>
          <p className="mt-1"><strong>Art. 37</strong> : Les redressements sont notifiés sous forme d'avis envoyé sous pli recommandé ou remis en mains propres. Le redevable dispose d'un <strong>délai de vingt jours</strong> pour confirmer ou formuler des observations motivées. Le défaut de réponse dans le délai vaut acceptation.</p>
          <p className="mt-1"><strong>Art. 38</strong> : Lorsque les observations du redevable sont motivées, l'Administration peut abandonner tout ou partie des redressements.</p>
          <p className="mt-1"><strong>Art. 39</strong> : Aucun redressement si le différend résulte d'une interprétation d'une disposition fiscale par un redevable de bonne foi, <strong>lorsque cette interprétation était formellement admise par l'Administration des Impôts à l'époque des faits</strong>.</p>
          <Ref>Art. 36-39, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="41" titre="Taxation d'office : cas d'application">
          <p>Les agents de l'Administration des Impôts procèdent à la <strong>taxation d'office</strong> dans les cas suivants <strong>(Art. 41 mod. Art. 37, LF 2025)</strong> :</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>Absence de déclaration</li>
            <li>Absence de comptabilité</li>
            <li>Défaut de remise des pièces justificatives dans les délais fixés par la loi</li>
            <li>Rejet d'une comptabilité considérée comme irrégulière</li>
            <li>Opposition au contrôle fiscal</li>
            <li className="text-amber-700 font-medium"><strong>Exercice d'une activité occulte ou non déclarée</strong> <span className="font-normal text-muted-foreground">(ajouté par Art. 37, LF 2025)</span></li>
            <li className="text-amber-700 font-medium"><strong>Non-désignation d'un représentant par une société étrangère n'ayant pas de domicile en RDC</strong> <span className="font-normal text-muted-foreground">(ajouté par Art. 37, LF 2025)</span></li>
          </ul>
          <p className="mt-1 text-blue-700 text-xs">ℹ Le rejet de comptabilité et l'opposition au contrôle fiscal font préalablement l'objet d'un <strong>constat sur procès-verbal</strong>, sous peine de nullité de la taxation d'office. Le refus de contresigner doit y être mentionné.</p>
          <p className="mt-1 text-amber-700 font-medium">⚠ En cas de taxation d'office, <strong>la charge de la preuve incombe au redevable</strong> (et non à l'Administration : contrairement au redressement contradictoire).</p>
          <Ref>Art. 41, Loi n° 004/2003 mod. Art. 37, LF 2025 n° 24/011 du 20 décembre 2024</Ref>
        </ArticleBox>

        <div className="border border-red-200 rounded-lg mb-2 overflow-hidden bg-red-50/30 px-3 py-2.5">
          <p className="text-sm font-semibold text-red-700">❌ Art. 41 ter - Supprimé par LF 2026</p>
          <p className="text-xs text-muted-foreground mt-1">L'article 41 ter de la Loi n° 004/2003 a été expressément <strong>supprimé</strong> par l'article 29 de la Loi de Finances 2026 (n° 25/060 du 29 décembre 2025). Il ne produit plus aucun effet juridique à compter de l'entrée en vigueur de ladite loi.</p>
          <p className="text-xs text-muted-foreground mt-1">
            <span className="font-mono bg-muted/50 rounded px-1 py-0.5">Abrogé par Art. 29, LF 2026 n° 25/060 du 29/12/2025</span>
          </p>
        </div>

        <ArticleBox num="43" titre="Délai de rappel : exercice en cours + 4 années précédentes" modifie="Art. 38, LF 2025">
          <p>L'Administration des Impôts dispose du droit de rappeler les impôts ou suppléments d'impôts dus <strong>au titre de l'exercice fiscal en cours et de quatre années précédentes</strong> (texte modifié par Art. 38, LF 2025 - réduit de 5 à 4 années).</p>
          <p className="mt-1">Ce délai est interrompu par :</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>La notification de redressement</li>
            <li>La déclaration ou tout autre acte comportant reconnaissance de l'impôt</li>
            <li>La notification d'un procès-verbal de constat d'infraction fiscale</li>
          </ul>
          <p className="mt-1"><strong>Extensions du droit de rappel (LF 2025 Art. 38) :</strong></p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li><strong>TVA</strong> : lorsque le crédit de TVA reporté ou dont le remboursement est sollicité trouve son origine dans une période antérieure au délai de rappel, l'Administration peut exercer ce droit même au-delà des 4 années.</li>
            <li><strong>Déficits reportables</strong> : l'Administration peut remonter sur un ou plusieurs exercices prescrits lorsque ces exercices sont déficitaires et que ces déficits s'imputent sur les résultats du premier exercice non prescrit.</li>
            <li><strong>Fraude judiciaire</strong> : lorsqu'une décision judiciaire ou tout organisme public a révélé l'existence de fraudes à incidence fiscale, l'Administration peut exercer son droit de vérification sur un exercice déjà prescrit. Elle dispose alors d'un délai de <strong>deux ans à compter de la révélation des faits</strong> pour notifier des suppléments d'impôts.</li>
          </ul>
          <p className="mt-1 text-blue-700 text-xs">ℹ Rappel : dans le texte original de 2003, le délai était de <strong>5 années</strong>. L'Art. 38 LF 2025 l'a réduit à <strong>4 années</strong>.</p>
          <Ref>Art. 43, Loi n° 004/2003 mod. Art. 38, LF 2025 n° 24/011 du 20/12/2024</Ref>
        </ArticleBox>

        <ArticleBox num="45" titre="Non-revérification d'un exercice déjà contrôlé" modifie="Art. 39, LF 2025">
          <p>Il ne peut être procédé à <strong>une nouvelle vérification portant sur un même impôt au titre d'un exercice déjà contrôlé</strong>, sauf dans les deux cas suivants :</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li><strong>Agissements frauduleux</strong> révélés dans le cadre d'une <strong>instance judiciaire</strong></li>
            <li><strong>Instruction pré-juridictionnelle</strong> en cours concernant le redevable (ajouté par Art. 39, LF 2025)</li>
          </ul>
          <Ref>Art. 45, Loi n° 004/2003 mod. Art. 39, LF 2025 : n° 24/011</Ref>
        </ArticleBox>

        <ArticleBox num="40" titre="Inopposabilité des opérations dissimulées">
          <p>Toute opération conclue sous la forme de contrats ou d'actes juridiques quelconques <strong>dissimulant une réalisation ou un transfert d'éléments imposables</strong>, effectué directement ou par personnes interposées, n'est pas opposable à l'Administration des Impôts. Celle-ci dispose du droit de restituer à l'opération son véritable caractère et de déterminer en conséquence les bases imposables.</p>
          <Ref>Art. 40, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="41 bis" titre="Évaluation par signes ou indices">
          <p>Sauf preuve contraire, l'évaluation de la base imposable peut être faite, pour les sociétés comme pour les personnes physiques, soit d'après les <strong>signes ou indices d'où résulte une aisance supérieure</strong> à celle qu'attestent les revenus déclarés, soit eu égard aux <strong>bénéfices normaux d'un ou plusieurs redevables similaires</strong>, compte tenu du capital investi, du chiffre d'affaires, du nombre d'établissements, d'employés, d'ouvriers, et de tous autres renseignements utiles.</p>
          <Ref>Art. 41 bis, Loi n° 004/2003 (créé par L.F. n° 14/027 du 31/12/2014)</Ref>
        </ArticleBox>

        <ArticleBox num="44" titre="Nouvelle cotisation après annulation d'imposition">
          <p>Lorsqu'une imposition a été annulée pour n'avoir pas été établie conformément à une règle légale, l'Administration peut établir, à charge du même redevable, une <strong>nouvelle cotisation</strong> sur tout ou partie des mêmes éléments d'imposition, dans les <strong>six mois</strong> de la décision administrative ou judiciaire coulée en force de chose jugée. Sont assimilés au même redevable : ses héritiers, son conjoint, ou les associés d'une société autre que par actions (et réciproquement).</p>
          <Ref>Art. 44, Loi n° 004/2003</Ref>
        </ArticleBox>
      </div>

      <div className="mb-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Chapitre II : Droit de communication et de recherche
        </p>

        <ArticleBox num="46" titre="Droit général de communication">
          <p>Les agents de l'Administration des Impôts ont le <strong>droit général d'obtenir, des personnes physiques ou morales, publiques ou privées, communication de toutes pièces ou documents nécessaires à l'établissement des impôts</strong>.</p>
          <Ref>Art. 46, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="46 bis" titre="Droit de recherche et d'investigation" modifie="créé LF 2020, mod. LF 2022/2023">
          <p>Les agents des impôts, munis d'un <strong>ordre de mission</strong>, ont le droit de mener toutes opérations de recherche et d'investigation en vue de collecter des renseignements à incidence fiscale et de mettre en évidence les systèmes de fraude fiscale. À l'exception des <strong>locaux affectés au domicile privé</strong>, ils peuvent, durant les heures d'activité professionnelle, avoir accès aux locaux professionnels, terrains, entrepôts, moyens de transport à usage professionnel, procéder à la constatation matérielle des éléments physiques de l'exploitation, et entendre le contribuable ou toute personne utile.</p>
          <p className="mt-1 text-blue-700 text-xs">ℹ Les opérations de recherche ne peuvent, à elles seules, donner lieu à une notification de suppléments d'impôts - sauf régularisation de la situation fiscale de nouveaux contribuables découverts à cette occasion.</p>
          <Ref>Art. 46 bis, Loi n° 004/2003 (créé par L.F. n° 20/020 du 28/12/2020, mod. L.F. n° 22/071 du 28/12/2022 et L.F. n° 23/056 du 10/12/2023)</Ref>
        </ArticleBox>

        <ArticleBox num="48-53" titre="Levée du secret, banques, autorité judiciaire">
          <p><strong>Art. 48</strong> : Les administrations publiques, entités territoriales décentralisées, entreprises publiques ou d'économie mixte ne peuvent opposer le secret professionnel pour se soustraire à l'obligation de communication de leurs documents de service.</p>
          <p className="mt-1"><strong>Art. 49</strong> : Les banques intervenant dans les exportations adressent un relevé des opérations dans les <strong>dix jours du mois suivant</strong>. Elles communiquent également, dans le même délai, les comptes ouverts par les commerçants, professions libérales et personnes morales (identité, adresse, contact), ainsi que toute modification ultérieure.</p>
          <p className="mt-1"><strong>Art. 51</strong> : L'autorité judiciaire doit donner connaissance à l'Administration de toute indication de fraude fiscale recueillie dans une instance, même terminée par un acquittement ou un classement sans suite. Les pièces restent, dans les quinze jours du prononcé, déposées au greffe à disposition de l'Administration.</p>
          <p className="mt-1"><strong>Art. 52</strong> : Toute personne dont l'activité entre dans le champ d'application des impôts doit fournir, dans les <strong>vingt jours</strong>, les renseignements demandés et présenter les livres et pièces annexes.</p>
          <p className="mt-1"><strong>Art. 53</strong> : Tout renseignement, pièce ou acte découvert par un agent dans l'exercice de ses fonctions peut être invoqué pour l'établissement des impôts.</p>
          <Ref>Art. 48-53, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="54-55" titre="Secret professionnel des agents">
          <p>Les agents de l'État ainsi que toute autre personne intervenant pour l'application de la présente loi sont tenus <strong>au secret le plus absolu</strong> au sujet des faits et renseignements dont ils ont connaissance par suite de l'exécution de la présente loi.</p>
          <p className="mt-1">Toute violation est sanctionnée conformément aux dispositions du Code Pénal.</p>
          <Ref>Art. 54-55, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="47" titre="Relevé trimestriel des sommes versées aux tiers" modifie="Art. 40, LF 2025">
          <p>Toute administration publique (provinces, entités territoriales décentralisées, services publics, entreprises publiques, associations) ainsi que tout détenteur de droits d'auteur est tenu d'adresser à l'Administration des Impôts, <strong>dans les dix jours qui suivent la fin de chaque trimestre</strong>, un <strong>relevé des sommes versées à des tiers</strong> comportant :</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>L'identité et l'adresse du bénéficiaire</li>
            <li>La nature des sommes versées</li>
            <li>Le montant versé au cours du trimestre</li>
          </ul>
          <p className="mt-1 text-xs text-muted-foreground italic">Délai : 10 jours après le 31 mars, 30 juin, 30 septembre et 31 décembre de chaque année.</p>
          <Ref>Art. 47, Loi n° 004/2003 mod. Art. 40, LF 2025 : n° 24/011</Ref>
        </ArticleBox>

        <ArticleBox num="47 bis" titre="Liste annuelle des clients fabricants, importateurs et grossistes" modifie="Art. 41, LF 2025">
          <p>Tout fabricant, importateur ou grossiste est tenu d'adresser à l'Administration des Impôts, <strong>au plus tard le 31 mars de chaque année</strong>, la <strong>liste de ses clients</strong> (eux-mêmes fabricants, importateurs ou grossistes) comportant pour chacun d'eux :</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>L'identité et l'adresse physique du client</li>
            <li>Le numéro impôt du client</li>
            <li>Le montant total des achats effectués au cours de l'année précédente</li>
          </ul>
          <p className="mt-1 text-amber-700 text-xs">Cette obligation est <strong>complémentaire</strong> à l'Art. 47 ter (liste des fournisseurs, LF 2026) : l'Art. 47 bis couvre les <em>clients</em>, l'Art. 47 ter couvre les <em>fournisseurs</em>.</p>
          <Ref>Art. 47 bis, Loi n° 004/2003 (introduit par Art. 41, LF 2025 : n° 24/011)</Ref>
        </ArticleBox>

        <ArticleBox num="47 ter" titre="Déclaration annuelle des fournisseurs" modifie="LF 2026">
          <p>Toute personne physique ou morale, soumise à l'impôt sur les sociétés et à l'impôt sur le revenu des personnes physiques, exonérée ou non, doit adresser à l'Administration des Impôts <strong>au plus tard le 31 mars</strong>, sur support papier ou en support numérique, la <strong>liste de ses fournisseurs</strong> comportant pour chacun d'eux :</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>L'identité et l'adresse physique ainsi que le numéro de la boîte postale du fournisseur</li>
            <li>Le numéro impôt</li>
            <li>Le montant facturé hors taxes</li>
            <li>Le montant de la taxe sur la valeur ajoutée</li>
            <li>Le montant toutes taxes comprises payé à chacun d'eux</li>
          </ul>
          <Ref>Art. 47 ter, Loi n° 004/2003 (introduit par LF 2026 : n° 25/060, Art. 30)</Ref>
        </ArticleBox>
      </div>

      <div className="mb-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Chapitre III : Droit d'enquête
        </p>

        <ArticleBox num="56 bis" titre="Présentation et copie de factures, livres et documents">
          <p>Les agents des impôts, munis d'un <strong>ordre de mission</strong>, peuvent se faire présenter et prendre copie des factures, livres, registres et documents professionnels se rapportant à des opérations ayant donné ou devant donner lieu à facturation, ainsi que des documents douaniers justifiant la perception de la TVA à l'importation, la réalité d'une exportation, ou l'application d'un régime suspensif. À l'exception des locaux affectés au domicile privé, ils ont accès, durant les heures d'activité professionnelle, aux locaux professionnels, terrains, entrepôts, moyens de transport professionnels, et peuvent y procéder à la constatation matérielle des éléments physiques de l'exploitation, recueillir des renseignements sur place, et entendre le contribuable ou toute personne utile.</p>
          <Ref>Art. 56 bis, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="56 ter A-C" titre="Formalités : remise de l'ordre, procès-verbal, portée">
          <p><strong>Art. 56 ter A</strong> : Lors de la première intervention, une copie de l'ordre de mission est remise, pour une personne physique, au contribuable, à ses employés ou à toute personne travaillant avec lui ; pour une personne morale, au gérant, au représentant légal, aux employés ou à toute personne travaillant avec le contribuable. En cas de refus d'accuser réception, mention en est faite au procès-verbal établi sur le champ.</p>
          <p className="mt-1"><strong>Art. 56 ter B</strong> : Chaque intervention fait l'objet d'un procès-verbal relatant les opérations effectuées. À l'issue de l'enquête, un procès-verbal consignant les manquements constatés (ou leur absence) est établi, signé par les agents et le contribuable ou son représentant ; mention est faite du refus éventuel de signer.</p>
          <p className="mt-1"><strong>Art. 56 ter C</strong> : Le droit d'enquête ne peut, à lui seul, donner lieu à une notification de redressement. Les constatations du procès-verbal ne peuvent être opposées au contribuable et aux tiers impliqués que dans le cadre des procédures de contrôle fiscal.</p>
          <p className="mt-1 text-amber-700"><strong>Sanction (Art. 97 ter) :</strong> l'opposition au droit d'enquête est sanctionnée par une amende de <strong>1 000 000 FC</strong> (doublée en cas de récidive), et peut entraîner la fermeture provisoire des installations jusqu'à soumission à l'enquête.</p>
          <Ref>Art. 56 ter A-C, Loi n° 004/2003 (créés par l'O.-L. n° 13/005 du 23/02/2013)</Ref>
        </ArticleBox>
      </div>

      <div className="mb-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Chapitre IV : Droit de visite et de saisie
        </p>

        <ArticleBox num="56 quarto A-C" titre="Autorisation du Procureur de la République">
          <p><strong>Art. 56 quarto A</strong> : L'Administration des Impôts saisit le <strong>Procureur de la République</strong> territorialement compétent pour l'autoriser à effectuer des visites en tous lieux, même privés, où des pièces et documents utiles à ses investigations sont susceptibles d'être détenus, et à procéder à leur saisie, lorsqu'elle présume qu'un contribuable se soustrait à l'impôt en achetant/vendant sans facture, en utilisant de fausses factures, ou en passant sciemment des écritures inexactes ou fictives. La demande motivée précise l'adresse des lieux, l'identité du contribuable et l'agent chargé de la visite.</p>
          <p className="mt-1"><strong>Art. 56 quarto B</strong> : Le Procureur vérifie concrètement le bien-fondé de la demande et motive son autorisation en indiquant les éléments de fait et de droit retenus.</p>
          <p className="mt-1"><strong>Art. 56 quarto C</strong> : Seuls les Agents des Impôts revêtus de la qualité d'<strong>officier de police judiciaire</strong> peuvent procéder à la recherche de la preuve de ces agissements.</p>
          <Ref>Art. 56 quarto A-C, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="56 quarto D-I" titre="Déroulement de la visite et de la saisie, recours, restitution">
          <p><strong>Art. 56 quarto D-E</strong> : La visite et la saisie s'effectuent sous l'autorité de l'Administration fiscale. L'autorisation est notifiée sur place à l'occupant des lieux (copie intégrale contre récépissé) ou, en son absence, après la visite par pli recommandé ou remise en mains propres.</p>
          <p className="mt-1"><strong>Art. 56 quarto F</strong> : L'autorisation du Procureur est susceptible de <strong>recours devant le Tribunal de Grande Instance</strong> ; ce recours ne suspend pas les opérations de visite et de saisie.</p>
          <p className="mt-1"><strong>Art. 56 quarto G</strong> : En cas d'urgence, le Procureur peut autoriser les visites et saisies <strong>avant 6h du matin et après 21h</strong>.</p>
          <p className="mt-1"><strong>Art. 56 quarto H</strong> : Un procès-verbal relatant le déroulement de l'opération, avec inventaire des pièces saisies, est dressé sur le champ et signé par les agents et l'occupant (ou son représentant) ; en cas de difficulté d'inventaire sur place, les pièces sont placées sous scellés.</p>
          <p className="mt-1"><strong>Art. 56 quarto I</strong> : Les pièces et documents saisis sont <strong>restitués dans les six mois</strong> suivant la visite (sauf poursuites pénales, où la restitution requiert l'autorisation de l'autorité judiciaire). L'Administration ne peut opposer au contribuable les informations recueillies qu'après cette restitution.</p>
          <Ref>Art. 56 quarto D-I, Loi n° 004/2003</Ref>
        </ArticleBox>
      </div>
    </div>
  )
}

// ─── TITRE III : RECOUVREMENT ────────────────────────────────────────────────
function TitreIII() {
  return (
    <div>
      <SectionHeader icon={Banknote} label="Titre III : Recouvrement (Art. 57-82)" color="bg-emerald-50 text-emerald-800" />

      <div className="mb-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Chapitre I : Modalités de paiement
        </p>

        <ArticleBox num="57" titre="Paiement au dépôt de la déclaration">
          <p>Les impôts et autres droits établis par les redevables dans leurs déclarations <strong>doivent être payés au moment du dépôt de celles-ci</strong>.</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li>Les acomptes provisionnels et le précompte sur l'impôt sur les bénéfices sont versés aux échéances fixées par la loi, à l'aide d'un bordereau de paiement.</li>
            <li>La retenue sur loyers est versée <strong>dans les dix jours du mois qui suit celui du paiement du loyer</strong>.</li>
          </ul>
          <Ref>Art. 57, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="57 bis" titre="Acomptes provisionnels IS/IRPP" modifie="LF 2025 + LF 2026">
          <p>Les acomptes provisionnels sont calculés sur la base de <strong>l'impôt déclaré au titre de l'exercice précédent, augmenté des suppléments éventuels établis par l'Administration des Impôts</strong>, ou, en cas d'absence de déclaration, de l'impôt reconstitué d'office, que ces sommes fassent ou non l'objet de contestation. Trois acomptes :</p>
          <div className="overflow-x-auto rounded border border-border/40 mt-1">
            <table className="w-full text-xs">
              <thead className="bg-muted/40">
                <tr>
                  <th className="px-2 py-1.5 text-left">Acompte</th>
                  <th className="px-2 py-1.5 text-left">Taux</th>
                  <th className="px-2 py-1.5 text-left">Échéance (LF 2025 + LF 2026)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/30">
                <tr><td className="px-2 py-1.5">1er acompte</td><td className="px-2 py-1.5 font-medium">30%</td><td className="px-2 py-1.5">Au plus tard le <strong>25 juillet</strong></td></tr>
                <tr><td className="px-2 py-1.5">2e acompte</td><td className="px-2 py-1.5 font-medium">30%</td><td className="px-2 py-1.5">Au plus tard le <strong>25 septembre</strong></td></tr>
                <tr><td className="px-2 py-1.5">3e acompte</td><td className="px-2 py-1.5 font-medium">20%</td><td className="px-2 py-1.5">Au plus tard le <strong>25 novembre</strong></td></tr>
                <tr><td className="px-2 py-1.5">Solde</td><td className="px-2 py-1.5 font-medium">20%</td><td className="px-2 py-1.5">Au dépôt de la déclaration annuelle</td></tr>
              </tbody>
            </table>
          </div>
          <p className="mt-1.5">Si les acomptes versés excèdent l'impôt dû, le crédit constaté peut servir au paiement d'autres impôts et droits dus, <strong>mais ne peut pas faire l'objet de cession</strong> (Art. 57 ter).</p>
          <Ref>Art. 57 bis + Art. 57 ter, Loi n° 004/2003 mod. Art. 60 LF 2025 + LF 2026 n° 25/060, Art. 31</Ref>
        </ArticleBox>

        <ArticleBox num="57 quater" titre="Modalités de paiement : petites entreprises (IRPP forfaitaire)">
          <p>Les petites entreprises (IRPP 1% ou 2% × CA) acquittent l'impôt en <strong>deux quotités</strong> :</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li><strong>1re quotité : 60%</strong> : à la souscription de la déclaration autoliquidative, au plus tard le 31 janvier de l'année suivante</li>
            <li><strong>2e quotité : 40%</strong> : par bordereau de versement, au plus tard le 30 avril de la même année</li>
          </ul>
          <Ref>Art. 57 quater, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="58-60" titre="Avis de mise en recouvrement (AMR)">
          <p><strong>Art. 58</strong> : Les impôts, suppléments d'impôts et autres droits établis par l'Administration sont recouvrés par l'émission d'un <strong>avis de mise en recouvrement (AMR)</strong>.</p>
          <p className="mt-1"><strong>Art. 59</strong> : L'AMR est signé par le Receveur des Impôts et doit contenir :</p>
          <ul className="list-disc pl-4 space-y-0.5 mt-1">
            <li>L'identification précise du redevable et son numéro impôt</li>
            <li>La nature de l'impôt ou autres droits dus</li>
            <li>La base imposable</li>
            <li>Le montant en principal des droits mis à sa charge</li>
            <li>Le délai de paiement</li>
          </ul>
          <p className="mt-1"><strong>Art. 60</strong> : Le redevable doit acquitter les montants dus dans un <strong>délai de quinze jours à compter de la réception de l'AMR</strong>.</p>
          <Ref>Art. 58-60, Loi n° 004/2003</Ref>
        </ArticleBox>
      </div>

      <div className="mb-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Chapitre II : Action en recouvrement
        </p>

        <ArticleBox num="63" titre="Serment du Receveur des Impôts" modifie="Art. 42, LF 2025">
          <p>Le Receveur Principal des Impôts et le Receveur Adjoint des Impôts prêtent serment <strong>devant le Ministre ayant les Finances dans ses attributions</strong> avant d'entrer en fonction.</p>
          <Ref>Art. 63 al. 2, Loi n° 004/2003 mod. Art. 42, LF 2025 : n° 24/011</Ref>
        </ArticleBox>

        <ArticleBox num="64-66" titre="Procédure de poursuites">
          <p>Les poursuites s'exercent en vertu des contraintes décernées par le Receveur des Impôts :</p>
          <ul className="list-disc pl-4 space-y-1 mt-1">
            <li><strong>Art. 64</strong> : En cas de déclaration sans paiement ou paiement insuffisant, mise en demeure d'acquitter dans un <strong>délai de huit jours</strong></li>
            <li><strong>Art. 65</strong> : Commandement signifié au redevable pour payer dans les <strong>huit jours</strong>, sous peine d'exécution des mesures de poursuite</li>
            <li><strong>Art. 66</strong> : Les mesures de poursuite comprennent les Avis à Tiers Détenteurs, les saisies mobilières et immobilières ainsi que les ventes</li>
          </ul>
          <Ref>Art. 64-66, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="72" titre="Délai de prononciation du Receveur : 72 heures" modifie="Art. 43, LF 2025">
          <p>Le Receveur des Impôts doit se prononcer sur toute demande qui lui est soumise <strong>dans un délai de 72 heures</strong> à compter de la réception de ladite demande.</p>
          <p className="mt-1 text-amber-700 font-medium">⚠ Passé ce délai, le Receveur des Impôts est <strong>frappé de forclusion</strong> : il ne peut plus s'opposer à la demande.</p>
          <Ref>Art. 72 al. 3 et 4, Loi n° 004/2003 mod. Art. 43, LF 2025 : n° 24/011</Ref>
        </ArticleBox>

        <ArticleBox num="73" titre="Prescription du recouvrement : 15 ans">
          <p>Il y a prescription pour le recouvrement des impôts et autres droits dus après <strong>quinze ans à compter du dépôt de la déclaration ou de l'émission de l'AMR</strong>.</p>
          <Ref>Art. 73, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="74" titre="Étalement de paiement : plan d'apurement">
          <p>Lorsque le débiteur n'est pas en mesure de payer une dette fiscale, compte tenu de l'état de sa trésorerie, une <strong>suspension des poursuites</strong> peut être consentie par le Directeur compétent, en contrepartie de l'engagement du débiteur d'acquitter sa dette majorée des pénalités selon un plan échelonné. <strong>Le délai d'échelonnement ne peut excéder six mois.</strong></p>
          <Ref>Art. 74, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="74 bis" titre="Créances irrécouvrables : procès-verbal de carence">
          <p>Le Receveur des Impôts présente, par voie hiérarchique, au Directeur Général des Impôts la situation des <strong>créances irrécouvrables</strong> constatées par un procès-verbal de carence, appuyée de tous documents justifiant les mesures de recouvrement déjà prises. Le Receveur peut en obtenir décharge et être dégagé de sa responsabilité lorsque ces créances ont été admises en non-valeur par décision du Ministre des Finances. <strong>Les contribuables ne sont pas libérés de leur dette</strong> du fait de cette admission en non-valeur : le Receveur doit reprendre le recouvrement si le débiteur est retrouvé ou redevient solvable.</p>
          <Ref>Art. 74 bis, Loi n° 004/2003 (créé par L.F. n° 15/021 du 31/12/2015)</Ref>
        </ArticleBox>

        <ArticleBox num="75-76" titre="Garanties du Trésor : privilège et hypothèque">
          <p><strong>Art. 75 : Privilège du Trésor</strong> : Le Trésor a privilège général sur tous les biens meubles et immeubles du redevable - et, dans la mesure où le recouvrement peut être poursuivi sur ses biens (Art. 81), de son conjoint - s'exerçant avant tout autre et pendant deux ans à compter de la date de dépôt de la déclaration ou de l'émission de l'AMR. La saisie des biens avant l'expiration de ce délai conserve le privilège jusqu'à leur réalisation.</p>
          <p className="mt-1"><strong>Art. 76 : Hypothèque légale</strong> : Le Trésor a droit d'hypothèque légale sur les immeubles du redevable, et de son conjoint dans la même mesure, exerçable dès que les droits sont exigibles et au plus tard le 31 décembre de l'année qui suit celle de l'exigibilité.</p>
          <Ref>Art. 75-76, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="77-81 bis" titre="Solidarité au paiement de l'impôt">
          <p><strong>Art. 77</strong> : Le recouvrement de l'impôt établi à charge du prestataire d'assistance peut être poursuivi sur les biens du bénéficiaire des prestations, solidairement responsable de l'impôt éludé.</p>
          <p className="mt-1"><strong>Art. 78</strong> : Les sociétés étrangères et redevables sans domicile ou résidence en RDC mais y possédant un établissement doivent avoir un <strong>représentant</strong> en RDC, solidairement tenu au paiement des impôts, pénalités et frais.</p>
          <p className="mt-1"><strong>Art. 79</strong> : En cas de cession complète des éléments d'actif ou d'un secteur d'activité, cédant et cessionnaire doivent en aviser l'Administration ; à défaut de notification par le cessionnaire, celui-ci est tenu au paiement, solidairement avec le cédant.</p>
          <p className="mt-1"><strong>Art. 80</strong> : En cas de dissolution ou liquidation, le liquidateur doit aviser l'Administration ; à défaut, il est tenu au paiement, solidairement avec la société.</p>
          <p className="mt-1"><strong>Art. 81</strong> : Le recouvrement de l'impôt à charge du mari peut être poursuivi sur les biens de la femme, sauf preuve qu'elle les possédait avant le mariage ou qu'ils proviennent de succession, donation d'un tiers, ou de ses revenus personnels. La quote-part afférente aux revenus de la femme peut être poursuivie sur tous ses biens.</p>
          <p className="mt-1"><strong>Art. 81 bis</strong> : Les héritiers d'un redevable décédé sont tenus, à concurrence de leurs parts héréditaires, au paiement des impôts dus par le défunt.</p>
          <Ref>Art. 77-81 bis, Loi n° 004/2003</Ref>
        </ArticleBox>

        <ArticleBox num="82" titre="Autorisation de sortie du territoire">
          <p>Le Directeur Général des Impôts peut saisir le <strong>Service de la Sûreté de l'État</strong> pour empêcher la sortie du territoire national de tout redevable <strong>non en règle de paiement des impôts</strong> ou sur lequel des faits avérés de fraude fiscale sont constatés à l'occasion des missions de recherche.</p>
          <Ref>Art. 82, Loi n° 004/2003 (créé par L.F. n° 21/029 du 31/12/2021, mod. L.F. n° 22/071 du 28/12/2022)</Ref>
        </ArticleBox>

        <ArticleBox num="82 bis" titre="Quitus fiscal élargi (marchés publics et documents administratifs)" modifie="LF 2026">
          <p>La conclusion des <strong>marchés publics</strong>, l'obtention de certains <strong>documents administratifs</strong> et le bénéfice de certains services, dont la liste sera déterminée par Arrêté du Ministre ayant les Finances dans ses attributions, sont subordonnés à la présentation d'un <strong>quitus fiscal en cours de validité délivré par le Receveur des Impôts</strong> attestant que le requérant est en règle de paiement des impôts. Sont également considérés comme étant en règle de paiement les contribuables débiteurs qui bénéficient de mesures d'échelonnement de la dette ou de sursis de recouvrement prévues aux articles 74 et 110 de la présente Loi.</p>
          <Ref>Art. 82 bis, Loi n° 004/2003 mod. LF 2026 : n° 25/060, Art. 32</Ref>
        </ArticleBox>
      </div>
    </div>
  )
}

// ─── TITRE IV : PÉNALITÉS FISCALES ──────────────────────────────────────────
function TitreIV() {
  return (
    <div>
      <SectionHeader icon={AlertTriangle} label="Titre IV : Pénalités Fiscales (Art. 83-103)" color="bg-red-50 text-red-800" />

      <ArticleBox num="83-84" titre="Nature et définitions des pénalités">
        <p>Les pénalités fiscales comprennent (Art. 83) :</p>
        <ul className="list-disc pl-4 space-y-1 mt-1">
          <li><strong>Pénalités d'assiette (majorations)</strong> : sanctionnent le défaut de déclaration, les déclarations inexactes, incomplètes ou fausses (Art. 84.1)</li>
          <li><strong>Pénalités de recouvrement (intérêts moratoires)</strong> : sanctionnent le retard dans le paiement des impôts et autres droits dus (Art. 84.2)</li>
          <li><strong>Amendes administratives</strong> : répriment le non-respect des formalités comptables et fiscales ainsi que le mauvais comportement du contribuable (Art. 84.3)</li>
          <li><strong>Astreintes</strong> : sanctions pécuniaires par jour de retard pour défaut de réponse à une demande de renseignements (Art. 84)</li>
          <li><strong>Sanctions pénales</strong> : pour infractions fiscales procédant d'une intention frauduleuse (Art. 83)</li>
          <li><strong>Récidive</strong> : le fait de commettre une même infraction déjà sanctionnée, dans un délai de <strong>deux ans</strong> (impôts annuels) ou <strong>six mois</strong> (autres impôts) (Art. 84)</li>
        </ul>
        <Ref>Art. 83-84, Loi n° 004/2003</Ref>
      </ArticleBox>

      <div className="overflow-x-auto rounded-lg border border-border/60 mb-3">
        <table className="w-full text-xs">
          <thead className="bg-red-50">
            <tr>
              <th className="text-left px-3 py-2 font-semibold">Type de pénalité</th>
              <th className="text-left px-3 py-2 font-semibold">Taux / Montant</th>
              <th className="text-left px-3 py-2 font-semibold">Cas d'application</th>
              <th className="text-left px-3 py-2 font-semibold">Réf.</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border/40">
            <tr className="hover:bg-muted/20">
              <td className="px-3 py-2 font-medium">Taxation d'office (absence de déclaration)</td>
              <td className="px-3 py-2 text-red-700 font-bold">50%</td>
              <td className="px-3 py-2">Sur le montant de l'impôt dû</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 89</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="px-3 py-2 font-medium">Récidive (absence de déclaration)</td>
              <td className="px-3 py-2 text-red-700 font-bold">100%</td>
              <td className="px-3 py-2">Sur le montant de l'impôt dû</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 89</td>
            </tr>
            <tr className="hover:bg-muted/20 bg-amber-50/40">
              <td className="px-3 py-2 font-medium">Régularisation après mise en demeure (Art. 5)</td>
              <td className="px-3 py-2 text-amber-700 font-bold">25%</td>
              <td className="px-3 py-2">Si régularisation dans le délai de 5 jours (Art. 5)</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 89</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="px-3 py-2 font-medium">Redressement contradictoire</td>
              <td className="px-3 py-2 text-red-700 font-bold">20%</td>
              <td className="px-3 py-2">Sur le montant de l'impôt éludé</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 89</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="px-3 py-2 font-medium">Récidive (redressement)</td>
              <td className="px-3 py-2 text-red-700 font-bold">40%</td>
              <td className="px-3 py-2">Sur le montant de l'impôt éludé</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 89</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="px-3 py-2 font-medium">Taxation d'office (tous motifs, Art. 41)</td>
              <td className="px-3 py-2 text-red-700 font-bold">50%</td>
              <td className="px-3 py-2">Sur le montant de l'impôt reconstitué</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 89</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="px-3 py-2 font-medium">Récidive (taxation d'office)</td>
              <td className="px-3 py-2 text-red-700 font-bold">100%</td>
              <td className="px-3 py-2">Sur le montant de l'impôt reconstitué</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 89</td>
            </tr>
            <tr className="hover:bg-muted/20 bg-orange-50/40">
              <td className="px-3 py-2 font-medium">Intérêt de retard (redressement ou taxation d'office)</td>
              <td className="px-3 py-2 text-orange-700 font-bold">2% par mois, plafonné à 50%</td>
              <td className="px-3 py-2">Sur l'impôt éludé/reconstitué, en sus de la majoration ci-dessus</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 89</td>
            </tr>
            <tr className="hover:bg-muted/20">
              <td className="px-3 py-2 font-medium">Défaut de paiement d'acompte provisionnel</td>
              <td className="px-3 py-2 text-red-700 font-bold">50%</td>
              <td className="px-3 py-2">Sur le montant de l'acompte dû</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 98 bis</td>
            </tr>
            <tr className="hover:bg-muted/20 bg-red-50/40">
              <td className="px-3 py-2 font-medium">Retard de paiement (majoration de recouvrement)</td>
              <td className="px-3 py-2 text-red-700 font-bold">2% par mois</td>
              <td className="px-3 py-2">Tout mois commencé compté intégralement, non plafonné</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 91</td>
            </tr>
            <tr className="hover:bg-muted/20 bg-amber-50/40">
              <td className="px-3 py-2 font-medium">Astreinte (refus de renseigner l'Administration)</td>
              <td className="px-3 py-2 font-bold">
                <span className="block">250 000 FC/jour (grandes entreprises)</span>
                <span className="block">150 000 FC/jour (moyennes entreprises)</span>
                <span className="block">100 000 FC/jour (petites entreprises)</span>
              </td>
              <td className="px-3 py-2">Refus ou absence de réponse à une demande de renseignements</td>
              <td className="px-3 py-2 text-muted-foreground">Art. 92 al. 1 mod. LF 2025</td>
            </tr>
          </tbody>
        </table>
      </div>

      <ArticleBox num="92" titre="Astreinte par jour : taux selon taille d'entreprise" modifie="Art. 44/45, LF 2025">
        <p>Lorsqu'un redevable refuse de fournir les renseignements demandés par l'Administration des Impôts, il est redevable d'une <strong>astreinte par jour</strong>, dont le montant est modulé selon la taille de l'entreprise :</p>
        <div className="overflow-x-auto rounded border border-border/40 mt-1">
          <table className="w-full text-xs">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-2 py-1.5 text-left">Catégorie d'entreprise</th>
                <th className="px-2 py-1.5 text-left">Astreinte par jour</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              <tr><td className="px-2 py-1.5">Grande entreprise</td><td className="px-2 py-1.5 font-bold text-amber-700">250 000 FC</td></tr>
              <tr><td className="px-2 py-1.5">Moyenne entreprise</td><td className="px-2 py-1.5 font-bold text-amber-700">150 000 FC</td></tr>
              <tr><td className="px-2 py-1.5">Petite entreprise</td><td className="px-2 py-1.5 font-bold text-amber-700">100 000 FC</td></tr>
            </tbody>
          </table>
        </div>
        <Ref>Art. 92 al. 1, Loi n° 004/2003 mod. Art. 44/45, LF 2025 : n° 24/011</Ref>
      </ArticleBox>

      <ArticleBox num="92 bis" titre="Astreinte pour défaut de réponse à une demande de documents" modifie="LF 2026">
        <p>Le défaut de réponse à la demande des informations ou documents indiqués à l'article 29 bis de la présente Loi entraîne l'application d'une <strong>astreinte de 10 000 000,00 de Francs congolais par jour</strong> jusqu'à la communication desdites informations. L'astreinte est établie par l'Agent en contrôle et réclamée par voie d'Avis de Mise en Recouvrement.</p>
        <Ref>Art. 92 bis, Loi n° 004/2003 (introduit par LF 2026 : n° 25/060, Art. 33)</Ref>
      </ArticleBox>

      <ArticleBox num="93 bis" titre="Amende pour défaut de souscription de déclaration" modifie="LF 2026">
        <p>Le défaut de souscription de déclaration dans le délai est sanctionné par une amende selon le cas :</p>
        <div className="overflow-x-auto rounded border border-border/40 mt-2">
          <table className="w-full text-xs">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-2 py-1.5 text-left">Cas</th>
                <th className="px-2 py-1.5 text-left">Amende</th>
                <th className="px-2 py-1.5 text-left">Réf.</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              <tr>
                <td className="px-2 py-1.5">Déclaration d'un contribuable exonéré ou réalisant des opérations exonérées ; déclaration avec mention « Néant »</td>
                <td className="px-2 py-1.5 font-bold text-amber-700">400 000 FC</td>
                <td className="px-2 py-1.5">Art. 93 bis al. 1</td>
              </tr>
              <tr>
                <td className="px-2 py-1.5">Déclaration créditrice IS, en cas de régularisation après mise en demeure de déclarer</td>
                <td className="px-2 py-1.5 font-bold text-amber-700">3 000 000 FC</td>
                <td className="px-2 py-1.5">Art. 93 bis al. 1</td>
              </tr>
              <tr className="bg-red-50/40">
                <td className="px-2 py-1.5">Défaut de souscription ou souscription incomplète/inexacte de la <strong>déclaration pays par pays</strong> (Art. 24 quinquies)</td>
                <td className="px-2 py-1.5 font-bold text-red-700">150 000 000 FC</td>
                <td className="px-2 py-1.5">Art. 93 bis al. 3</td>
              </tr>
              <tr className="bg-orange-50/40">
                <td className="px-2 py-1.5">Défaut de réponse ou réponse incomplète à la mise en demeure Art. 24 bis (documentation prix de transfert), par exercice vérifié</td>
                <td className="px-2 py-1.5 font-bold text-orange-700">2% des transactions manquantes<br/><span className="font-normal">minimum : 100 000 000 FC/exercice</span></td>
                <td className="px-2 py-1.5">Art. 93 bis al. 4</td>
              </tr>
              <tr className="bg-orange-50/40">
                <td className="px-2 py-1.5">Défaut de souscription ou souscription incomplète/inexacte de la <strong>déclaration annuelle des prix de transfert</strong> (Art. 24 ter)</td>
                <td className="px-2 py-1.5 font-bold text-orange-700">100 000 000 FC</td>
                <td className="px-2 py-1.5">Art. 93 bis al. 5</td>
              </tr>
            </tbody>
          </table>
        </div>
        <Ref>Art. 93 bis, Loi n° 004/2003 mod. LF 2026 n° 25/060 Art. 34</Ref>
      </ArticleBox>

      <ArticleBox num="93-98 ter" titre="Amendes administratives">
        <p className="text-amber-700 font-medium mb-1.5">⚠ Les montants ci-dessous sont exprimés en <strong>Francs congolais (FC)</strong>, et non en « francs fiscaux » : une unité de compte abrogée depuis l'O.-L. n° 13/005 du 23/02/2013, qui a converti toutes les amendes de la Loi en FC.</p>
        <ul className="list-disc pl-4 space-y-1">
          <li><strong>Art. 93</strong> : Absence d'annexes à la déclaration de l'impôt sur les bénéfices : <strong>100 000 FC par annexe</strong> (récidive : 200 000 FC). Défaut d'annexes à la déclaration de l'impôt professionnel du dernier mois : 1 000 000 FC (état récapitulatif), 500 000 FC (relevé nominatif), 25 000 FC par fiche individuelle</li>
          <li><strong>Art. 93 ter</strong> (LF 2023) : Défaut de certification des états financiers annuels par un expert-comptable inscrit à l'Ordre : <strong>100 000 000 FC</strong> (1er manquement), <strong>200 000 000 FC</strong> (récidive)</li>
          <li><strong>Art. 94</strong> : Absence d'une déclaration ne servant pas au calcul de l'impôt (ex. relevé trimestriel des tiers, déclaration de l'Art. 2) : <strong>5 000 000 FC</strong> (grande entreprise), <strong>2 500 000 FC</strong> (moyenne entreprise / ASBL), <strong>250 000 FC</strong> (petite entreprise)</li>
          <li><strong>Art. 95</strong> : <em>Abrogé (conformément à l'O.-L. n° 13/004 du 23/02/2013)</em></li>
          <li><strong>Art. 96</strong> : Défaut de retenue sur loyers ou de reversement : amende égale au montant de la retenue due</li>
          <li><strong>Art. 96 bis</strong> (LF 2026) : Toute personne tenue de retenir à la source un impôt qui n'a pas effectué cette retenue ou qui aurait opéré une retenue insuffisante est <strong>personnellement redevable du montant de la retenue non effectuée et des pénalités y afférentes</strong>.</li>
          <li><strong>Art. 96 ter</strong> (LF 2025) : Le défaut de déclaration de l'impôt professionnel par tout agent public, même avec mention « Néant », est sanctionné par une amende de <strong>2 000 000 FC par déclaration manquante</strong>, due par l'ordonnateur du service concerné.</li>
          <li><strong>Art. 97</strong> : Communication de faux renseignements : <strong>1 500 000 FC (PM) / 250 000 FC (PP)</strong>. Renseignements incomplets : <strong>750 000 FC (PM) / 125 000 FC (PP)</strong></li>
          <li><strong>Art. 97 bis</strong> : Omission d'une mention obligatoire sur une facture ou document en tenant lieu : <strong>750 000 FC (PM) / 250 000 FC (PP)</strong>, par omission</li>
          <li><strong>Art. 97 ter</strong> : Opposition au droit d'enquête : <strong>1 000 000 FC</strong> (doublée en cas de récidive), + fermeture provisoire des installations</li>
          <li><strong>Art. 97 quater</strong> (LF 2023) : Défaut de réponse à l'obligation de communication de l'Art. 49 (banques) : astreinte de <strong>1 000 000 FC/jour</strong> jusqu'à communication</li>
          <li><strong>Art. 97 quinquies</strong> (LF 2023) : Expert-comptable certifiant des états financiers non sincères : <strong>50 000 000 FC</strong> (grande entreprise) / <strong>20 000 000 FC</strong> (moyenne entreprise)</li>
          <li><strong>Art. 97 sexies</strong> : <em>Supprimé par la Loi de Finances 2026 : n° 25/060, Art. 36</em></li>
          <li><strong>Art. 98</strong> : Exercice d'une activité sans numéro impôt : fermeture provisoire + amende de <strong>1 000 000 FC (PM) / 100 000 FC (commerçant/profession libérale) / 50 000 FC (revenus locatifs)</strong>. Même sanction pour l'absence du numéro impôt de l'acheteur sur la facture lors d'une transaction entre professionnels</li>
          <li><strong>Art. 98 ter</strong> : Le Ministre des Finances peut, par arrêté, <strong>modifier les montants des pénalités</strong> de la présente Loi lorsque les circonstances l'exigent</li>
        </ul>
        <p className="mt-1.5 text-xs text-muted-foreground italic">PM = personnes morales · PP = personnes physiques</p>
        <Ref>Art. 93-98 ter, Loi n° 004/2003 · Art. 93 ter et 97 quater-quinquies introduits par L.F. n° 23/056 du 10/12/2023 · Art. 94 mod. L.F. n° 22/071 et L.F. n° 23/056 · Art. 96 bis mod. LF 2026 (Art. 35) · Art. 96 ter introduit par LF 2025 (Art. 47)</Ref>
      </ArticleBox>

      <ArticleBox num="100" titre="Frais de poursuites">
        <p>En matière de recouvrement forcé, les poursuites entraînent des frais proportionnels :</p>
        <ul className="list-disc pl-4 space-y-0.5 mt-1">
          <li>Commandement : <strong>3%</strong></li>
          <li>Saisie : <strong>5%</strong></li>
          <li>Vente : <strong>3%</strong></li>
        </ul>
        <Ref>Art. 100, Loi n° 004/2003</Ref>
      </ArticleBox>

      <ArticleBox num="101-102" titre="Sanctions pénales : infractions fiscales">
        <p>Les auteurs d'infractions fiscales procédant d'une <strong>intention frauduleuse</strong> sont passibles (Art. 101) :</p>
        <ul className="list-disc pl-4 space-y-1 mt-1">
          <li><strong>1re infraction</strong> : emprisonnement de 1 à 30 jours et/ou amende égale au montant de l'impôt éludé</li>
          <li><strong>Récidive</strong> : emprisonnement de 40 à 60 jours et/ou amende égale au double de l'impôt éludé</li>
        </ul>
        <p className="mt-1">Les infractions fiscales (Art. 102) comprennent :</p>
        <ul className="list-disc pl-4 space-y-0.5 mt-1">
          <li>L'omission volontaire de déclaration</li>
          <li>La dissimulation volontaire des sommes sujettes à l'impôt</li>
          <li>La passation délibérée d'écritures fictives ou inexactes dans les livres comptables</li>
          <li>L'incitation du public à refuser ou retarder le paiement de l'impôt</li>
          <li>L'émission de fausses factures</li>
          <li>L'opposition à l'action de l'Administration des Impôts</li>
          <li>L'agression ou l'outrage envers un agent de l'Administration des Impôts</li>
        </ul>
        <Ref>Art. 101-102, Loi n° 004/2003</Ref>
      </ArticleBox>
    </div>
  )
}

// ─── TITRE V : RÉCLAMATIONS ET RECOURS ──────────────────────────────────────
function TitreV() {
  return (
    <div>
      <SectionHeader icon={MessageSquare} label="Titre V : Réclamations et Recours (Art. 104-110) · Titre VI : Computation des délais (Art. 110 bis)" color="bg-orange-50 text-orange-800" />

      <ArticleBox num="104" titre="Droit à réclamation contentieuse : délai 3 mois">
        <p>Les redevables ainsi que leurs mandataires justifiant d'un mandat général ou spécial doivent, <strong>avant toute saisine du juge, se pourvoir par écrit en réclamation contre le montant de leur imposition auprès du Directeur ou du Chef de Centre compétent, sans justifier du paiement de l'impôt</strong>.</p>
        <p className="mt-1">Pour être recevable, la réclamation doit être <strong>motivée</strong>. Sous peine de déchéance, elle doit être introduite dans les <strong>trois (3) mois à partir de la date de la déclaration ou de la réception de l'AMR</strong>. Il est délivré reçu de la réclamation au redevable.</p>
        <p className="mt-1 text-amber-700 font-medium">⚠ Le délai est de trois mois, et non six : à ne pas confondre avec le délai de décision de l'Administration (Art. 105, également trois mois).</p>
        <Ref>Art. 104, Loi n° 004/2003 mod. L. n° 06/003 du 27/02/2006, L.F. n° 15/021 du 31/12/2015, L.F. n° 20/020 du 28/12/2020</Ref>
      </ArticleBox>

      <ArticleBox num="105" titre="Décision de réclamation : délai 3 mois" modifie="Art. 49, LF 2025">
        <p>Le Directeur des Impôts compétent statue sur la réclamation <strong>dans un délai de trois mois à compter de la date de réception de la réclamation</strong>. Passé ce délai sans décision, le silence de l'Administration vaut rejet implicite.</p>
        <p className="mt-1"><strong>Droit de compléter la réclamation (al. 2 mod. LF 2025) :</strong> Le redevable peut compléter sa réclamation par de nouveaux moyens ou pièces justificatives dans un <strong>délai de 30 jours</strong> à compter du dépôt de sa réclamation initiale.</p>
        <p className="mt-1"><strong>Définition du double emploi (al. 5 mod. LF 2025) :</strong> Il y a double emploi lorsque le même revenu ou la même base imposable a donné lieu à deux impositions distinctes au profit du même créancier public.</p>
        <Ref>Art. 105 al. 1, 2 et 5, Loi n° 004/2003 mod. Art. 49, LF 2025 : n° 24/011</Ref>
      </ArticleBox>

      <ArticleBox num="105 bis" titre="Seuils de dégrèvement par direction compétente" modifie="Art. 50, LF 2025">
        <p>Les décisions de dégrèvement sont rendues par le Directeur compétent selon les seuils suivants :</p>
        <div className="overflow-x-auto rounded border border-border/40 mt-1">
          <table className="w-full text-xs">
            <thead className="bg-muted/40">
              <tr>
                <th className="px-2 py-1.5 text-left">Direction</th>
                <th className="px-2 py-1.5 text-left">Seuil de compétence</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              <tr><td className="px-2 py-1.5">Direction Générale des Impôts (DGI)</td><td className="px-2 py-1.5 font-medium">Au-delà de <strong>20 milliards FC</strong></td></tr>
              <tr><td className="px-2 py-1.5">Direction des Grandes Entreprises (DGE)</td><td className="px-2 py-1.5 font-medium">Jusqu'à <strong>20 milliards FC</strong></td></tr>
              <tr><td className="px-2 py-1.5">Direction Provinciale Urbaine des Impôts (DPUI)</td><td className="px-2 py-1.5 font-medium">De <strong>200 millions</strong> à <strong>20 milliards FC</strong></td></tr>
              <tr><td className="px-2 py-1.5">Chef de Centre des Impôts</td><td className="px-2 py-1.5 font-medium">En dessous de <strong>200 millions FC</strong></td></tr>
            </tbody>
          </table>
        </div>
        <Ref>Art. 105 bis, Loi n° 004/2003 mod. Art. 50, LF 2025 : n° 24/011</Ref>
      </ArticleBox>

      <ArticleBox num="106-107" titre="Instruction de la réclamation">
        <p><strong>Art. 106</strong> : Pour l'instruction de la réclamation, l'Administration peut vérifier les écritures du redevable, s'assurer de la conformité des pièces produites, et user de tous les moyens de preuve du droit commun (sauf le serment). Si le redevable s'abstient plus de vingt jours de fournir les renseignements ou pièces demandés, sa réclamation est rejetée.</p>
        <p className="mt-1"><strong>Art. 107</strong> : L'Administration peut exiger communication de tous renseignements utiles auprès des services publics, créanciers ou débiteurs du redevable.</p>
        <Ref>Art. 106-107, Loi n° 004/2003</Ref>
      </ArticleBox>

      <ArticleBox num="108" titre="Recours devant la Cour administrative d'appel : délai 3 mois">
        <p>La décision de rejet total ou partiel peut faire l'objet d'un <strong>recours devant la Cour administrative d'appel</strong>. Sous peine de déchéance, ce recours doit être introduit dans un <strong>délai de trois (3) mois à partir de la notification de la décision</strong> (ou, en l'absence de décision, à compter de la date d'expiration du délai de l'Art. 105). Aucune demande nouvelle ne peut être présentée à l'occasion de ce recours.</p>
        <p className="mt-1 text-amber-700 font-medium">⚠ Le délai est de trois mois, et non six, et la juridiction est la <strong>Cour administrative d'appel</strong> (et non une « Cour d'Appel » de droit commun).</p>
        <Ref>Art. 108, Loi n° 004/2003 mod. O.-L. n° 13/005 du 23/02/2013, L.F. n° 17/005 du 23/06/2017, L.F. n° 17/014 du 24/12/2017, L.F. n° 20/020 du 28/12/2020</Ref>
      </ArticleBox>

      <ArticleBox num="108 bis" titre="Commission Nationale de Médiation Fiscale : institution et effet contraignant" modifie="LF 2025 art. 51, mod. LFR 25/044">
        <p>Il est institué une <strong>Commission Nationale de Médiation Fiscale</strong>, instance consultative, paritaire et indépendante, destinée à formuler des avis au Ministre des Finances en vue de résoudre les litiges persistants, à l'issue de l'examen de la réclamation en phase administrative.</p>
        <ul className="list-disc pl-4 space-y-1 mt-1">
          <li><strong>Saisine :</strong> Ne peut s'effectuer <strong>qu'avant le recours juridictionnel</strong> (phase précontentieuse)</li>
          <li><strong>Effet de l'avis :</strong> Sur base de l'avis de la Commission, le Ministre peut soit demander à l'Administration de réexaminer le litige (avis favorable au contribuable), soit notifier au contribuable la confirmation (avis conforme à la décision de l'Administration)</li>
          <li className="text-amber-700 font-medium"><strong>Effet contraignant :</strong> Saisie dans ce cadre, l'Administration <strong>ne peut statuer dans un sens contraire à l'avis</strong> de la Commission</li>
          <li><strong>Composition et fonctionnement :</strong> Fixés par Arrêté du Ministre ayant les Finances dans ses attributions</li>
        </ul>
        <Ref>Art. 108 bis, Loi n° 004/2003 (inséré par L.F. n° 24/011 du 20/12/2024, art. 51 ; mod. par la L.F.R. n° 25/044 du 28/06/2025, art. 9)</Ref>
      </ArticleBox>

      <ArticleBox num="108 ter" titre="Commission Nationale de Médiation Fiscale : effet suspensif" modifie="LF 2026">
        <p>La saisine de la <strong>Commission Nationale de Médiation Fiscale</strong> est suspensive des délais de recours devant les cours et tribunaux. Ainsi, le contribuable qui saisit cette Commission bénéficie d'une <strong>suspension automatique des délais de recours judiciaire</strong> pendant toute la durée de la procédure de médiation.</p>
        <Ref>Art. 108 ter, Loi n° 004/2003 (introduit par LF 2026 : n° 25/060, Art. 37)</Ref>
      </ArticleBox>

      <ArticleBox num="109" titre="Pourvoi en cassation">
        <p>Le pourvoi en cassation est ouvert contre les arrêts de la <strong>Cour administrative d'appel</strong> dans les conditions fixées par les dispositions légales régissant la matière.</p>
        <Ref>Art. 109, Loi n° 004/2003 mod. L.F. n° 17/005 du 23/06/2017</Ref>
      </ArticleBox>

      <ArticleBox num="109 bis-109 ter" titre="Réexamen pour erreur de droit et maintien du sursis" modifie="LF 2017, mod. LFR 25/044">
        <p><strong>Art. 109 bis</strong> : Lorsqu'une <strong>erreur de droit</strong> est découverte dans le fondement légal d'une imposition, postérieurement à la notification de la décision clôturant l'instruction d'une réclamation, le Ministre des Finances peut autoriser le <strong>réexamen du litige</strong>, à la demande de l'Administration ou sur requête du redevable. Le sursis de recouvrement déjà accordé (Art. 110) demeure valable, et est accordé de plein droit lorsque les impositions contestées ont été établies par taxation d'office. L'Administration dispose alors de <strong>trois mois</strong> pour notifier sa nouvelle décision.</p>
        <p className="mt-1"><strong>Art. 109 ter</strong> : Le sursis de recouvrement déjà accordé demeure valable pendant toute la procédure devant la Commission Nationale de Médiation Fiscale, jusqu'à la notification de la confirmation ou de la décision après réexamen.</p>
        <Ref>Art. 109 bis, Loi n° 004/2003 (créé par L.F. n° 17/005 du 23/06/2017) ; Art. 109 ter (inséré par L.F.R. n° 25/044 du 28/06/2025, art. 9)</Ref>
      </ArticleBox>

      <ArticleBox num="110" titre="Non-suspension de l'exigibilité">
        <p>Sauf en cas d'erreur matérielle ou de double emploi, l'introduction d'une réclamation, d'un recours en appel ou d'un pourvoi en cassation <strong>ne suspend pas l'exigibilité de l'impôt</strong> et autres droits dus ainsi que des pénalités.</p>
        <p className="mt-1">Toutefois, lorsque la réclamation porte sur un supplément d'impôt, le contribuable peut, à sa demande, bénéficier d'un sursis de recouvrement de l'impôt litigieux et des pénalités y afférentes, à condition de verser un montant égal <strong>au dixième du supplément d'impôt contesté</strong>.</p>
        <ul className="list-disc pl-4 space-y-1 mt-1">
          <li className="text-amber-700 font-medium">Le sursis <strong>ne s'applique pas aux cas de taxation d'office</strong> (sauf réexamen accordé de plein droit en vertu de l'Art. 109 bis)</li>
          <li>En cas de silence de l'Administration valant rejet tacite de la réclamation, le sursis <strong>subsiste</strong> pendant la phase juridictionnelle</li>
          <li>Le sursis ne dispense pas l'Administration d'appliquer les pénalités de recouvrement en cas de rejet de la réclamation (sauf rejet tacite)</li>
        </ul>
        <p className="mt-1 text-amber-700 font-medium">⚠ Le taux du dépôt conditionnant le sursis est <strong>un dixième</strong> (10%), et non un cinquième.</p>
        <Ref>Art. 110, Loi n° 004/2003 mod. L.F. n° 14/027 du 31/12/2014, L.F. n° 15/021 du 31/12/2015, L.F. n° 17/014 du 24/12/2017, L.F. n° 20/020 du 28/12/2020, L.F. n° 21/029 du 31/12/2021</Ref>
      </ArticleBox>

      <ArticleBox num="110 bis" titre="Computation des délais (Titre VI)">
        <p>Lorsque la législation fiscale exprime un délai en jours ou en mois pour l'établissement, la transmission ou la réaction à un acte, le délai prend cours le <strong>premier jour ouvrable qui suit celui de l'accusé de réception</strong>. Si le dernier jour du délai tombe un jour non ouvrable, l'exécution de l'obligation ou l'exercice du droit est reporté au <strong>premier jour ouvrable suivant</strong>. Par dérogation, l'Administration peut, en matière de déclaration et de paiement, fixer l'échéance au jour ouvrable <strong>précédant</strong> la date légale.</p>
        <Ref>Art. 110 bis, Loi n° 004/2003, Titre VI (créé par L.F. n° 21/029 du 31/12/2021)</Ref>
      </ArticleBox>

      {/* Schéma des voies de recours */}
      <div className="mt-4 p-3 border border-orange-200 rounded-lg bg-orange-50/50">
        <p className="text-xs font-semibold text-orange-800 mb-2">Schéma des voies de recours (LF 2025 + LF 2026)</p>
        <div className="flex flex-col gap-1.5 text-xs">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-400 shrink-0" />
            <span><strong>1. Réclamation contentieuse</strong> : auprès du Directeur ou Chef de Centre compétent (délai : 3 mois à partir de la déclaration ou de la réception de l'AMR) (Art. 104)</span>
          </div>
          <div className="ml-4 text-muted-foreground">↓ Décision dans <strong>3 mois</strong> (Art. 105) : silence = rejet implicite</div>
          <div className="ml-4 text-muted-foreground text-sm">Le redevable peut compléter sa réclamation dans les <strong>30 jours</strong> suivant son dépôt (Art. 105 al. 2 mod. LF 2025)</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
            <span><strong>2. [Optionnel] Commission Nationale de Médiation Fiscale</strong> : saisine facultative avant recours judiciaire, avis contraignant pour l'Administration, suspend les délais (Art. 108 bis LF 2025 + Art. 108 ter LF 2026)</span>
          </div>
          <div className="ml-4 text-muted-foreground">↓ Avis de la Commission, lie l'Administration</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-500 shrink-0" />
            <span><strong>3. Recours devant la Cour administrative d'appel</strong> (délai : 3 mois après notification de la décision) (Art. 108)</span>
          </div>
          <div className="ml-4 text-muted-foreground">↓ Arrêt de la Cour administrative d'appel</div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-orange-600 shrink-0" />
            <span><strong>4. Pourvoi en cassation</strong>, dans les conditions fixées par les dispositions légales en la matière (Art. 109)</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── SIMULATEUR DE PÉNALITÉS ─────────────────────────────────────────────────
function SimulateurPenalites() {
  const [impot, setImpot] = useState('')
  const [typePenalite, setTypePenalite] = useState<string>('')
  const [moiRetard, setMoisRetard] = useState('')
  const [result, setResult] = useState<null | {
    penaliteAssiette: number
    interetMoratoire: number
    total: number
    details: string[]
  }>(null)

  function calculer() {
    const base = parseFloat(impot) || 0
    const mois = parseInt(moiRetard) || 0

    const taux: Record<string, number> = {
      'taxation_office': 0.50,
      'taxation_office_recidive': 1.00,
      'redressement': 0.20,
      'redressement_recidive': 0.40,
      'regularisation_art5': 0.25,
      'acompte_defaut': 0.50,
    }
    const descPenalite: Record<string, string> = {
      'taxation_office': "Taxation d'office, tous motifs de l'Art. 41 (Art. 89)",
      'taxation_office_recidive': "Taxation d'office - récidive (Art. 89)",
      'redressement': 'Redressement contradictoire (Art. 89)',
      'redressement_recidive': 'Redressement contradictoire - récidive (Art. 89)',
      'regularisation_art5': 'Régularisation après mise en demeure Art. 5 (Art. 89)',
      'acompte_defaut': "Défaut de paiement d'acompte provisionnel (Art. 98 bis)",
    }
    // Art. 89 : l'intérêt de retard de 2%/mois, plafonné à 50% de l'impôt éludé/reconstitué,
    // n'est prévu par la loi qu'en cas de redressement ou de taxation d'office.
    const casPlafonnesArt89 = ['redressement', 'redressement_recidive', 'taxation_office', 'taxation_office_recidive']

    const tauxAssiette = taux[typePenalite] ?? 0
    const penaliteAssiette = base * tauxAssiette
    // Art. 85 : les majorations et l'intérêt de retard sont assis sur le montant de l'impôt
    // dû, éludé ou reconstitué - pas sur la pénalité d'assiette déjà appliquée.
    let interetMoratoire = mois > 0 ? base * 0.02 * mois : 0
    if (casPlafonnesArt89.includes(typePenalite)) {
      interetMoratoire = Math.min(interetMoratoire, base * 0.50)
    }
    const total = base + penaliteAssiette + interetMoratoire

    const details: string[] = []
    if (typePenalite) details.push(`${descPenalite[typePenalite]} : ${(tauxAssiette * 100).toFixed(0)}% × ${base.toLocaleString('fr-FR')} FC = ${penaliteAssiette.toLocaleString('fr-FR')} FC`)
    if (mois > 0) {
      const plafondTxt = casPlafonnesArt89.includes(typePenalite) ? ' (plafonné à 50% de l\'impôt éludé/reconstitué, Art. 89)' : ' (non plafonné, Art. 91)'
      details.push(`Intérêt de retard : 2%/mois × ${mois} mois × ${base.toLocaleString('fr-FR')} FC = ${interetMoratoire.toLocaleString('fr-FR')} FC${plafondTxt}`)
    }

    setResult({ penaliteAssiette, interetMoratoire, total, details })
  }

  function formatFC(v: number) {
    return v.toLocaleString('fr-FR') + ' FC'
  }

  return (
    <div>
      <SectionHeader icon={Calculator} label="Simulateur de Pénalités Fiscales" color="bg-rose-50 text-rose-800" />

      <div className="p-3 bg-rose-50/50 border border-rose-200 rounded-lg mb-3">
        <p className="text-xs text-muted-foreground italic">
          Fondé exclusivement sur la Loi n° 004/2003 du 13 mars 2003 portant réforme des procédures fiscales (Art. 83-100).
          Taux d'intérêt de retard : 2% par mois - plafonné à 50% de l'impôt éludé/reconstitué en cas de redressement ou de taxation d'office (Art. 89), non plafonné en cas de simple retard de paiement (Art. 91). Tout mois commencé est compté intégralement.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
        <div>
          <label className="text-sm font-semibold text-foreground block mb-1">
            Montant de l'impôt dû (FC) <Ref>Art. 85-86</Ref>
          </label>
          <input
            type="number"
            value={impot}
            onChange={e => setImpot(e.target.value)}
            placeholder="Ex : 500 000"
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-rose-400 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-foreground block mb-1">
            Mois de retard de paiement <Ref>Art. 91</Ref>
          </label>
          <input
            type="number"
            min="0"
            value={moiRetard}
            onChange={e => setMoisRetard(e.target.value)}
            placeholder="Ex : 3"
            className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-rose-400 focus:outline-none"
          />
        </div>
      </div>

      <div className="mb-3">
        <label className="text-sm font-semibold text-foreground block mb-1">
          Type de pénalité d'assiette <Ref>Art. 89-90</Ref>
        </label>
        <select
          value={typePenalite}
          onChange={e => { setTypePenalite(e.target.value); setResult(null) }}
          className="w-full border border-border rounded-md px-3 py-2 text-sm bg-background focus:ring-2 focus:ring-rose-400 focus:outline-none"
        >
          <option value="">-- Sélectionner --</option>
          <option value="regularisation_art5">Régularisation après lettre de relance Art. 5 (25%) : Art. 89</option>
          <option value="redressement">Redressement contradictoire (20%) : Art. 89</option>
          <option value="redressement_recidive">Redressement contradictoire - récidive (40%) : Art. 89</option>
          <option value="taxation_office">Taxation d'office, tous motifs Art. 41 (50%) : Art. 89</option>
          <option value="taxation_office_recidive">Taxation d'office - récidive (100%) : Art. 89</option>
          <option value="acompte_defaut">Défaut de paiement d'acompte provisionnel (50%) : Art. 98 bis</option>
          <option value="aucune">Aucune pénalité d'assiette (retard pur)</option>
        </select>
      </div>

      <button
        onClick={calculer}
        disabled={!impot || !typePenalite}
        className="w-full bg-rose-600 hover:bg-rose-700 disabled:opacity-40 text-white font-semibold text-sm py-2 rounded-lg transition-colors mb-3"
      >
        Calculer les pénalités
      </button>

      {result && (
        <div className="border border-rose-200 rounded-lg overflow-hidden">
          <div className="bg-rose-50 px-3 py-2 border-b border-rose-200">
            <p className="text-sm font-semibold text-rose-800">Résultat du calcul</p>
          </div>
          <div className="p-3 space-y-2">
            {result.details.map((d, i) => (
              <p key={i} className="text-xs text-foreground leading-relaxed">{d}</p>
            ))}
            <div className="border-t border-border/60 pt-2 mt-2 space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Impôt principal</span>
                <span className="font-medium">{formatFC(parseFloat(impot) || 0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Pénalité d'assiette</span>
                <span className="font-medium text-amber-700">{formatFC(result.penaliteAssiette)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Intérêt de retard (2%/mois)</span>
                <span className="font-medium text-red-600">{formatFC(result.interetMoratoire)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold border-t border-border/60 pt-1.5 mt-1">
                <span>TOTAL À PAYER</span>
                <span className="text-red-700">{formatFC(result.total)}</span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-1 italic">
              Base légale : Art. 83-100, Loi n° 004/2003 du 13 mars 2003 portant réforme des procédures fiscales
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── COMPOSANT PRINCIPAL ─────────────────────────────────────────────────────
// ─── TITRE VI (FISCAL) : PRÉLÈVEMENTS SPÉCIAUX ─────────────────────────────
function TitreVI() {
  return (
    <div>
      <SectionHeader icon={Scale} label="Titre VI : Prélèvements spéciaux (Art. 149 bis – 149 quinquies)" color="bg-teal-50 text-teal-800" />

      <div className="mb-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
          Prélèvement sur les revenus des capitaux mobiliers versés à des personnes non-résidentes (LF 2026)
        </p>
        <p className="text-xs text-muted-foreground italic mb-2">
          Introduit sous le Titre V « Des autres prélèvements en matière des revenus » de la Loi n° 23/053 du 30 novembre 2023 par les Art. 40-44 de la LF 2026 n° 25/060 du 29 décembre 2025.
        </p>

        <ArticleBox num="149 bis" titre="Institution du prélèvement sur revenus de capitaux mobiliers (non-résidents)" modifie="LF 2026 Art. 41">
          <p>Il est institué un <strong>prélèvement sur les revenus des capitaux mobiliers versés à des personnes non-résidentes</strong> en République Démocratique du Congo.</p>
          <Ref>Art. 149 bis, Loi n° 23/053 (introduit par LF 2026 n° 25/060, Art. 41)</Ref>
        </ArticleBox>

        <ArticleBox num="149 ter" titre="Assiette du prélèvement" modifie="LF 2026 Art. 42">
          <p>Le prélèvement est assis sur <strong>le montant brut des sommes payées ou mises à la disposition de leurs bénéficiaires</strong>, au titre de revenus de capitaux mobiliers versés par des sociétés établies en RDC à des personnes morales ou physiques situées à l'étranger.</p>
          <Ref>Art. 149 ter, Loi n° 23/053 (introduit par LF 2026 n° 25/060, Art. 42)</Ref>
        </ArticleBox>

        <ArticleBox num="149 quater" titre="Taux du prélèvement : 20%" modifie="LF 2026 Art. 43">
          <p>Le taux du prélèvement sur les revenus des capitaux mobiliers versés à des personnes non-résidentes est fixé à <strong>20 % du montant brut des revenus versés</strong>.</p>
          <Ref>Art. 149 quater, Loi n° 23/053 (introduit par LF 2026 n° 25/060, Art. 43)</Ref>
        </ArticleBox>

        <ArticleBox num="149 quinquies" titre="Exigibilité et retenue à la source" modifie="LF 2026 Art. 44">
          <p>Le prélèvement est dû <strong>au moment du paiement ou de la mise à disposition des revenus à leurs bénéficiaires</strong>. Il est <strong>retenu à la source par les sociétés établies en RDC</strong> qui paient ces revenus.</p>
          <Ref>Art. 149 quinquies, Loi n° 23/053 (introduit par LF 2026 n° 25/060, Art. 44)</Ref>
        </ArticleBox>

        {/* Déclaration - Art. 22 quarter / Point L Titre I LF 2026 */}
        <div className="mt-3 p-3 bg-teal-50/50 border border-teal-200 rounded-lg">
          <p className="text-xs font-semibold text-teal-800 mb-1">Déclaration (Art. 22 quarter)</p>
          <p className="text-xs text-foreground">Les sociétés établies en RDC qui paient des revenus des capitaux mobiliers à des non-résidents souscrivent une déclaration <strong>au plus tard le 15 du mois suivant le paiement</strong>, accompagnée du paiement, auprès du Service gestionnaire compétent de l'Administration des Impôts.</p>
          <p className="text-xs text-muted-foreground mt-1">Réf : Art. 22 quarter inséré par LF 2026 n° 25/060 Art. 39 ; Point L inséré par Art. 38 LF 2026</p>
        </div>
      </div>
    </div>
  )
}

const TITRES = [
  { id: 'I',    label: 'Titre I',         sublabel: 'Obligations déclaratives',    icon: FileText,      component: TitreI },
  { id: 'II',   label: 'Titre II',        sublabel: 'Contrôle fiscal',             icon: Shield,        component: TitreII },
  { id: 'III',  label: 'Titre III',       sublabel: 'Recouvrement',                icon: Banknote,      component: TitreIII },
  { id: 'IV',   label: 'Titre IV',        sublabel: 'Pénalités fiscales',          icon: AlertTriangle, component: TitreIV },
  { id: 'V',    label: 'Titre V',         sublabel: 'Réclamations et recours',     icon: MessageSquare, component: TitreV },
  { id: 'VI',   label: 'Titre VI',        sublabel: 'Prélèvements spéciaux',       icon: Scale,         component: TitreVI },
  { id: 'SIM',  label: 'Simulateur',      sublabel: 'Calcul des pénalités',        icon: Calculator,    component: SimulateurPenalites },
]

export default function ProceduresFiscales() {
  const [actif, setActif] = useState('I')
  const Composant = TITRES.find(t => t.id === actif)!.component

  return (
    <div className="space-y-4">
      {/* En-tête */}
      <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg">
        <div className="flex items-start gap-2">
          <BookOpen className="h-4 w-4 mt-0.5 text-slate-600 shrink-0" />
          <div>
            <p className="text-sm font-bold text-foreground">
              Loi n° 004/2003 du 13 mars 2003 portant réforme des procédures fiscales
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Modifiée par : Loi n° 23/052 du 30/11/2023 , Loi n° 23/053 du 30/11/2023 , LF 2025 : n° 24/011 du 20/12/2024 (Art. 1, 2 bis, 13, 13 bis, 41, 43, 45, 47, 47 bis, 57 bis, 63, 72, 92, 96 ter, 105, 105 bis, 108 bis) · LF 2026 : n° 25/060 du 29/12/2025 (Art. 1, 12, 13 bis, 17, 22 ter, 22 quater, 22 quarter, 23, 24 bis, 24 ter, 24 quinquies, 29 bis, 47 ter, 57 bis, 82 bis, 92 bis, 93 bis, 96 bis, 108 ter, 149 bis-quinquies)
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Art. 112 : Sort ses effets à compter du 1er janvier 2003 · 6 Titres · 112 Articles
            </p>
          </div>
        </div>
      </div>

      {/* Navigation par Titre */}
      <div className="flex flex-wrap gap-1.5">
        {TITRES.map(t => {
          const Icon = t.icon
          const isActif = actif === t.id
          return (
            <button
              key={t.id}
              onClick={() => setActif(t.id)}
              className={cn(
                'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all border',
                isActif
                  ? 'bg-slate-800 text-white border-slate-800'
                  : 'bg-background text-muted-foreground border-border/60 hover:border-slate-400 hover:text-foreground'
              )}
            >
              <Icon className="h-3 w-3" />
              <span>{t.label}</span>
              <span className="hidden sm:inline text-sm opacity-70">- {t.sublabel}</span>
            </button>
          )
        })}
      </div>

      {/* Contenu */}
      <div>
        <Composant />
      </div>

      {/* Pied de page légal */}
      <div className="p-2 border-t border-border/40">
        <p className="text-sm text-muted-foreground text-center italic">
          Ce module est fondé exclusivement sur la Loi n° 004/2003 du 13 mars 2003 portant réforme des procédures fiscales (J.O. RDC) et ses textes modificatifs.
          Source : leganet.cd · Toute référence est vérifiable.
        </p>
      </div>
    </div>
  )
}
