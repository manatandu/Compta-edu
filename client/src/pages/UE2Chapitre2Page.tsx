import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  BookOpen, FileText, Scale, Users, AlertTriangle,
  ChevronRight, RotateCcw, Briefcase, Building2
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import DevoirChapitreCreateur, { CasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
import QCMPageUnique from '@/components/QCMPageUnique'
import { QCMChapitre } from '@/lib/db'
import { InfoTooltip } from '@/components/InfoTooltip'

type QCMOption = { id: string; texte: string }
type QCMQuestion = {
  type: 'qcm'
  id: string
  question: string
  options: QCMOption[]
  reponseCorrecte: string
  explication: string
  articleRef: string
}
type Question = QCMQuestion

type Lecon = {
  id: string
  icone: React.ReactNode
  titre: string
  badge?: string
  contenu: React.ReactNode
  questions: Question[]
}

const LECONS: Lecon[] = [
  {
    id: 'l1',
    icone: <Users className="h-5 w-5" />,
    titre: "Conditions de fond : qui peut être associé ? (Art. 7-9 AUSCGIE)",
    badge: 'Art. 7-9 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          L'article 7 de l'AUSCGIE pose le principe de la liberté d'association : toute personne physique ou morale peut être associée dans une société commerciale, sous réserve des incapacités, incompatibilités et interdictions prévues par la loi.<InfoTooltip texte="Ce principe d'ouverture reflète la volonté du législateur OHADA de favoriser la création d'entreprises et l'investissement dans l'espace communautaire." loi="Art. 7 AUSCGIE" />
        </p>
        <p>
          Les personnes morales (sociétés, associations, groupements) peuvent ainsi participer au capital d'une autre société, ce qui permet les montages en groupe ou en holding. Elles agissent alors par l'intermédiaire de leurs représentants légaux.
        </p>

        <p className="font-semibold">1.2 Les incapacités des mineurs (Art. 8)</p>
        <p>
          L'article 8 AUSCGIE établit une distinction fondamentale selon le type de société concerné, en fonction du niveau de risque patrimonial supporté par l'associé :
        </p>
        <ul className="space-y-1.5 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0">•</span><span><strong>Sociétés à responsabilité illimitée (SNC, SCS pour les commandités) :</strong> le mineur non émancipé ne peut pas être associé, car ces formes exposent son patrimoine personnel de façon illimitée.</span></li>
          <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0">•</span><span><strong>Sociétés à responsabilité limitée (SARL, SA, SAS) :</strong> le mineur non émancipé peut être associé, représenté par son tuteur légal. Sa responsabilité est limitée à ses apports.</span></li>
          <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0">•</span><span><strong>Mineur émancipé :</strong> assimilé à une personne majeure, il peut être associé dans toutes les formes sociales sans restriction.</span></li>
        </ul>

        <p className="font-semibold">1.3 L'interdiction faite aux époux (Art. 9)</p>
        <p>
          L'article 9 AUSCGIE interdit aux époux d'être associés dans une même société dont ils seraient tenus solidairement et indéfiniment des dettes sociales. Cette interdiction vise la SNC et la participation comme commandités dans une SCS.
        </p>
        <p>
          Les époux peuvent parfaitement co-associer dans une SARL, SA ou SAS, formes dans lesquelles leur responsabilité reste limitée. Une société existante dont les associés deviennent époux doit être régularisée.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border font-semibold">Catégorie d'associé</th>
                <th className="text-center p-2 border border-border font-semibold">SNC</th>
                <th className="text-center p-2 border border-border font-semibold">SCS (cmd.)</th>
                <th className="text-center p-2 border border-border font-semibold">SARL</th>
                <th className="text-center p-2 border border-border font-semibold">SA</th>
                <th className="text-center p-2 border border-border font-semibold">SAS</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Personne physique majeure', '✔', '✔', '✔', '✔', '✔', 'text-emerald-600'],
                ['Mineur non émancipé', '✘', '✘', '✔*', '✔*', '✔*', ''],
                ['Époux ensemble', '✘', '✘', '✔', '✔', '✔', ''],
                ['Personne morale', '✔', '✔', '✔', '✔', '✔', 'text-emerald-600'],
              ].map(([cat, snc, scs, sarl, sa, sas, cls], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{cat}</td>
                  {[snc, scs, sarl, sa, sas].map((v, j) => (
                    <td key={j} className={cn('p-2 border border-border text-center', v === '✘' ? 'text-red-600 font-bold' : 'text-emerald-600 font-medium')}>{v}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-1">* Sous représentation légale (tuteur ou parents)</p>
        </div>

        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10 p-3">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-1">Point de vigilance (Art. 8-9)</p>
          <p className="text-xs text-muted-foreground">Un associé dont la participation devient contraire aux règles de l'Art. 8 ou 9 en cours de vie sociale (ex. : mariage entre deux associés de SNC) doit régulariser sa situation dans les meilleurs délais, sous peine d'irrégularité pouvant entraîner une action en nullité.</p>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l1q1',
        question: "Selon l'Art. 7 AUSCGIE, qui peut être associé d'une société commerciale ?",
        options: [
          { id: 'a', texte: "Uniquement les personnes physiques majeures" },
          { id: 'b', texte: "Toute personne physique ou morale, sous réserve des incapacités légales" },
          { id: 'c', texte: "Uniquement les ressortissants de l'espace OHADA" },
          { id: 'd', texte: "Uniquement les personnes disposant d'un capital minimum de 5 000 000 FCFA" },
        ],
        reponseCorrecte: 'b',
        explication: "L'Art. 7 AUSCGIE dispose que toute personne physique ou morale peut être associée d'une société commerciale, sauf incapacités prévues par la loi (mineurs non émancipés en SNC/SCS, époux dans SNC/SCS commandités).",
        articleRef: 'Art. 7 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l1q2',
        question: "Un mineur non émancipé peut-il être associé dans une SARL ?",
        options: [
          { id: 'a', texte: "Non, jamais" },
          { id: 'b', texte: "Oui, sans restriction" },
          { id: 'c', texte: "Oui, sous conditions légales et représentation" },
          { id: 'd', texte: "Oui, uniquement s'il apporte du numéraire" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 8 AUSCGIE autorise le mineur non émancipé à être associé dans les sociétés à risque limité (SARL, SA, SAS) sous représentation légale, mais l'interdit dans les sociétés à risque illimité (SNC, SCS pour les commandités).",
        articleRef: 'Art. 8 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l1q3',
        question: "Les époux peuvent-ils être associés ensemble dans une SNC ?",
        options: [
          { id: 'a', texte: "Oui, sans restriction" },
          { id: 'b', texte: "Non, l'Art. 9 AUSCGIE l'interdit expressément" },
          { id: 'c', texte: "Oui, si l'un est commanditaire" },
          { id: 'd', texte: "Oui, avec l'accord du tribunal" },
        ],
        reponseCorrecte: 'b',
        explication: "L'Art. 9 AUSCGIE interdit aux époux d'être associés dans une même société à responsabilité illimitée (SNC) ou d'être tous deux commandités dans une SCS, pour éviter les conflits d'intérêts familiaux et la confusion de patrimoine.",
        articleRef: 'Art. 9 AUSCGIE',
      },
    ],
  },

  {
    id: 'l2',
    icone: <FileText className="h-5 w-5" />,
    titre: "Les statuts : forme et mentions obligatoires (Art. 10-13 AUSCGIE)",
    badge: 'Art. 10-13 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p className="font-semibold">2.1 La forme des statuts (Art. 10)</p>
        <p>
          Les statuts sont l'acte fondateur de la société. L'article 10 AUSCGIE prévoit deux formes possibles :
        </p>
        <ul className="space-y-1.5 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0">•</span><span><strong>Acte notarié :</strong> obligatoire lorsque les statuts comportent des apports immobiliers, ou lorsque le droit national l'impose pour certaines formes sociales.</span></li>
          <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0">•</span><span><strong>Acte sous seing privé (SSP) :</strong> admis pour la plupart des formes sociales sans apport immobilier. Doit être établi en autant d'originaux que de parties ayant un intérêt distinct.</span></li>
        </ul>

        <p className="font-semibold">2.2 Les 13 mentions obligatoires (Art. 13)</p>
        <p>L'article 13 AUSCGIE dresse une liste exhaustive des mentions que tout statut doit contenir. L'absence peut entraîner nullité ou inopposabilité.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">N°</th>
                <th className="text-left p-2 border border-border">Mention obligatoire</th>
                <th className="text-left p-2 border border-border">Exemple pratique</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1", "Forme sociale", "SARL, SA, SNC, SCS, SAS"],
                ["2", "Dénomination sociale", "COMPTA PLUS SARL, ABC SA"],
                ["3", "Objet social", "Commerce de détail d'articles d'électronique"],
                ["4", "Siège social", "123 Av. des Nations, Kinshasa"],
                ["5", "Durée", "99 ans à compter de l'immatriculation"],
                ["6", "Identité des apporteurs en numéraire", "Jean KAMBALE, 5 000 000 FCFA"],
                ["7", "Identité des apporteurs en nature", "Véhicule Toyota Hilux — 8 000 000 FCFA"],
                ["8", "Identité des apporteurs en industrie", "Alice MBEKI — expertise comptable"],
                ["9", "Avantages particuliers", "Droit de vote double, dividende prioritaire"],
                ["10", "Montant du capital social", "10 000 000 FCFA"],
                ["11", "Nombre et valeur nominale des titres", "1 000 parts de 10 000 FCFA chacune"],
                ["12", "Répartition des titres entre associés", "A: 600 parts (60%), B: 400 parts (40%)"],
                ["13", "Dispositions sur les organes de gestion", "Gérant désigné pour 3 ans, révocable à la majorité 3/4"],
              ].map(([num, mention, ex], i) => (
                <tr key={num} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-bold text-violet-600 dark:text-violet-400 text-center">{num}</td>
                  <td className="p-2 border border-border font-medium">{mention}</td>
                  <td className="p-2 border border-border text-muted-foreground italic">{ex}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-semibold">2.3 La durée de la société (Art. 28-36)</p>
        <p>L'article 28 AUSCGIE fixe la durée maximale à 99 ans, librement déterminée dans les statuts. Cette durée peut être prorogée avant expiration par décision des associés.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Événement</th>
                <th className="text-left p-2 border border-border">Règle AUSCGIE</th>
                <th className="text-left p-2 border border-border text-red-600">Conséquence si non-respect</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Durée maximale", "99 ans (Art. 28 al. 1)", "Au-delà, nullité de la clause, durée ramenée à 99 ans"],
                ["Prorogation", "Décision des associés avant expiration", "Société dissoute de plein droit à l'expiration"],
                ["Durée indéterminée", "Non admise", "Clause réputée nulle, durée fixée à 99 ans par défaut"],
                ["Dissolution anticipée", "Décision unanime ou majorité qualifiée", "Dissolution sans responsabilité si règles respectées"],
              ].map(([evt, regle, csq], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{evt}</td>
                  <td className="p-2 border border-border text-muted-foreground">{regle}</td>
                  <td className="p-2 border border-border text-red-600 dark:text-red-400">{csq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/60 dark:bg-violet-900/20 p-3">
          <p className="text-xs font-semibold text-violet-700 dark:text-violet-300 mb-1">Bon à savoir</p>
          <p className="text-xs text-muted-foreground">La durée est une mention statutaire modifiable, mais toute modification doit respecter les règles de quorum et de majorité propres à chaque forme sociale. Une prorogation tardive (après expiration) est inopérante.</p>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l2q1',
        question: "Combien de mentions obligatoires les statuts doivent-ils contenir selon l'Art. 13 AUSCGIE ?",
        options: [
          { id: 'a', texte: "5" },
          { id: 'b', texte: "8" },
          { id: 'c', texte: "13" },
          { id: 'd', texte: "20" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 13 AUSCGIE dresse une liste de 13 mentions obligatoires devant figurer dans les statuts de toute société commerciale, à peine de nullité ou d'inopposabilité.",
        articleRef: 'Art. 13 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l2q2',
        question: "Quelle est la durée maximale d'une société selon l'Art. 28 AUSCGIE ?",
        options: [
          { id: 'a', texte: "50 ans" },
          { id: 'b', texte: "75 ans" },
          { id: 'c', texte: "99 ans" },
          { id: 'd', texte: "Illimitée" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 28 al. 1 AUSCGIE fixe la durée maximale d'une société commerciale à 99 ans. Cette durée est renouvelable par décision des associés avant expiration.",
        articleRef: 'Art. 28 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l2q3',
        question: "Les statuts peuvent-ils être rédigés sous seing privé ?",
        options: [
          { id: 'a', texte: "Non, toujours notariés" },
          { id: 'b', texte: "Oui, sauf pour les SA et si apport d'immeuble en nature" },
          { id: 'c', texte: "Oui, pour toutes les formes sociales sans exception" },
          { id: 'd', texte: "Non, ils doivent être enregistrés au greffe" },
        ],
        reponseCorrecte: 'b',
        explication: "L'Art. 10 AUSCGIE admet la forme notariée ou sous seing privé (SSP). Cependant, les apports immobiliers et certaines formes sociales imposent l'acte authentique selon le droit national.",
        articleRef: 'Art. 10 AUSCGIE',
      },
    ],
  },

  {
    id: 'l3',
    icone: <Scale className="h-5 w-5" />,
    titre: "Les apports : numéraire, nature, industrie (Art. 37-50-4 AUSCGIE)",
    badge: 'Art. 37-50-4 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          L'apport est la contribution que chaque associé s'engage à effectuer au profit de la société en contrepartie de laquelle il reçoit des droits sociaux (parts ou actions).<InfoTooltip texte="Sans apport, pas de qualité d'associé. L'apport constitue la substance même du capital social, qui sert de gage aux créanciers." loi="Art. 37 AUSCGIE" /> L'AUSCGIE distingue trois catégories d'apports.
        </p>

        <p className="font-semibold">3.1 Apports en numéraire (Art. 41-45)</p>
        <p>Somme d'argent versée à la société. Les fonds doivent être déposés sur un compte bancaire bloqué lors de la constitution, libéré après immatriculation au RCCM.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Forme sociale</th>
                <th className="text-center p-2 border border-border">Fraction min. à la constitution</th>
                <th className="text-center p-2 border border-border">Délai de libération du solde</th>
                <th className="text-left p-2 border border-border">Référence</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["SNC", "100%", "Immédiate", "Art. 270"],
                ["SCS", "100%", "Immédiate", "Art. 293"],
                ["SARL", "1/5 minimum (20%)", "2 ans après immatriculation", "Art. 313"],
                ["SA", "1/4 minimum (25%)", "3 ans après immatriculation", "Art. 389"],
                ["SAS", "1/4 minimum (25%)", "3 ans après immatriculation", "Art. 853-8"],
              ].map(([forme, frac, delai, ref], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{forme}</td>
                  <td className="p-2 border border-border text-center font-bold text-violet-600 dark:text-violet-400">{frac}</td>
                  <td className="p-2 border border-border text-center text-muted-foreground">{delai}</td>
                  <td className="p-2 border border-border text-muted-foreground">{ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-semibold">3.2 Apports en nature (Art. 46-50)</p>
        <p>Transfert à la société de la propriété ou jouissance d'un bien autre qu'une somme d'argent : immeuble, fonds de commerce, véhicule, brevet... La valeur doit être évaluée rigoureusement par un Commissaire aux Apports (CAA).</p>

        <div className="rounded-xl border border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-900/10 p-3">
          <p className="text-xs font-semibold text-amber-700 dark:text-amber-300 mb-2">Le Commissaire aux Apports (CAA)</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 text-xs text-muted-foreground">
            <div>
              <p className="font-semibold text-foreground mb-1">Intervention OBLIGATOIRE :</p>
              <ul className="space-y-1">
                <li className="flex items-start gap-1"><span className="text-amber-500">•</span><span>Valeur apport nature {'>'} 5 000 000 FCFA (Art. 312)</span></li>
                <li className="flex items-start gap-1"><span className="text-amber-500">•</span><span>Apport en nature dans une SA (toujours)</span></li>
                <li className="flex items-start gap-1"><span className="text-amber-500">•</span><span>Demande d'un ou plusieurs associés</span></li>
              </ul>
            </div>
            <div>
              <p className="font-semibold text-foreground mb-1">Sanctions du défaut :</p>
              <ul className="space-y-1">
                <li className="flex items-start gap-1"><span className="text-red-500">•</span><span>Responsabilité solidaire des fondateurs</span></li>
                <li className="flex items-start gap-1"><span className="text-red-500">•</span><span>Rejet de l'immatriculation par le RCCM</span></li>
                <li className="flex items-start gap-1"><span className="text-red-500">•</span><span>Nullité possible de l'apport concerné</span></li>
              </ul>
            </div>
          </div>
        </div>

        <p className="font-semibold">3.3 Apports en industrie (Art. 50-1 à 50-4)</p>
        <p>Introduits par la révision 2014 de l'AUSCGIE, ils permettent à un associé de contribuer par son travail, ses compétences ou son savoir-faire, sans apport monétaire direct. Parts reçues : incessibles, non négociables, plafonnées à 25% du capital.</p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Caractéristique</th>
                <th className="text-left p-2 border border-border">Règle applicable</th>
                <th className="text-left p-2 border border-border">Référence</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Admissibilité dans les SA", "INTERDIT", "Art. 50-1"],
                ["Plafond du capital", "25% maximum du capital", "Art. 50-3"],
                ["Cessibilité des parts", "Incessibles et non négociables", "Art. 50-2"],
                ["Droit au bénéfice", "Part au moins égale au plus petit apporteur numéraire/nature", "Art. 50-4"],
                ["Droit de vote", "Oui, comme tout associé", "Art. 50-4"],
              ].map(([car, regle, ref], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{car}</td>
                  <td className={cn('p-2 border border-border', regle === 'INTERDIT' ? 'text-red-600 dark:text-red-400 font-bold' : 'text-muted-foreground')}>{regle}</td>
                  <td className="p-2 border border-border text-violet-600 dark:text-violet-400">{ref}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l3q1',
        question: "Qu'est-ce qu'un commissaire aux apports (CAA) ?",
        options: [
          { id: 'a', texte: "Un associé chargé des apports en numéraire" },
          { id: 'b', texte: "Un expert indépendant désigné pour évaluer les apports en nature" },
          { id: 'c', texte: "Le notaire rédacteur des statuts" },
          { id: 'd', texte: "Le directeur financier de la société" },
        ],
        reponseCorrecte: 'b',
        explication: "Le CAA est un expert indépendant désigné par les fondateurs ou par le tribunal pour évaluer objectivement les apports en nature, afin d'éviter une surévaluation préjudiciable aux créanciers (Art. 312 à 316 AUSCGIE).",
        articleRef: 'Art. 312 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l3q2',
        question: "Dans une SARL, quelle fraction du capital doit être libérée lors de la constitution ?",
        options: [
          { id: 'a', texte: "La totalité" },
          { id: 'b', texte: "La moitié" },
          { id: 'c', texte: "Le quart" },
          { id: 'd', texte: "Le cinquième" },
        ],
        reponseCorrecte: 'd',
        explication: "L'Art. 313 AUSCGIE impose que les apports en numéraire dans une SARL soient libérés d'au moins 1/5 (20%) lors de la constitution, le solde devant être libéré dans un délai de 2 ans à compter de l'immatriculation.",
        articleRef: 'Art. 313 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l3q3',
        question: "Un apport en industrie peut-il être réalisé dans une SA ?",
        options: [
          { id: 'a', texte: "Oui, sans restriction" },
          { id: 'b', texte: "Oui, mais limité à 25% du capital" },
          { id: 'c', texte: "Non, il est expressément interdit dans les SA" },
          { id: 'd', texte: "Oui, uniquement pour les dirigeants" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 50-1 AUSCGIE interdit formellement les apports en industrie dans les sociétés anonymes (SA). Ce type d'apport n'est admis que dans les SNC, SCS, SARL et SAS, avec un plafond de 25% du capital.",
        articleRef: 'Art. 50-1 AUSCGIE',
      },
    ],
  },

  {
    id: 'l4',
    icone: <Building2 className="h-5 w-5" />,
    titre: "Les titres sociaux et le capital (Art. 51-66 AUSCGIE)",
    badge: 'Art. 51-66 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          En contrepartie de leurs apports, les associés reçoivent des titres représentatifs de leurs droits dans la société. L'AUSCGIE opère une distinction fondamentale entre parts sociales et actions.
        </p>

        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Critère</th>
                <th className="text-center p-2 border border-border">Parts sociales (SNC/SCS/SARL)</th>
                <th className="text-center p-2 border border-border">Actions (SA/SAS)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Forme", "Nominative obligatoire", "Nominative ou au porteur"],
                ["Cession", "Agrément des associés requis", "Libre (principe)"],
                ["Négociabilité", "Non négociable", "Négociable (bourse ou gré à gré)"],
                ["Droit de vote", "En principe 1 part = 1 voix", "Peut être modulé (vote double, etc.)"],
                ["Droit aux bénéfices", "Proportionnel aux parts", "Proportionnel aux actions (+ dividende prioritaire possible)"],
              ].map(([crit, parts, actions], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-semibold">{crit}</td>
                  <td className="p-2 border border-border text-center text-muted-foreground">{parts}</td>
                  <td className="p-2 border border-border text-center text-muted-foreground">{actions}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-semibold">4.2 Les droits attachés aux titres (Art. 53-55)</p>
        <ul className="space-y-1.5 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0">•</span><span><strong>Droit aux bénéfices (Art. 53 al. 1) :</strong> participation proportionnelle à la quote-part dans le capital, sauf stipulation contraire.</span></li>
          <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0">•</span><span><strong>Droit à l'actif net (Art. 53 al. 2) :</strong> partage de l'actif résiduel après désintéressement des créanciers lors de la dissolution.</span></li>
          <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0">•</span><span><strong>Contribution aux pertes (Art. 53 al. 3) :</strong> dans les limites fixées par la forme sociale (illimité en SNC, limité aux apports en SARL/SA/SAS).</span></li>
          <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0">•</span><span><strong>Droit de vote (Art. 56) :</strong> participation aux décisions collectives selon les règles de chaque forme sociale.</span></li>
          <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0">•</span><span><strong>Droit à l'information (Art. 57) :</strong> tout associé peut, à toute époque, consulter les documents sociaux au siège de la société.</span></li>
        </ul>

        <p className="font-semibold">4.3 La clause léonine — interdiction absolue (Art. 54 al. 2)</p>
        <p>
          Est réputée léonine toute clause qui attribue à un associé la totalité des bénéfices, l'exonère de toute contribution aux pertes, l'exclut de tout partage des bénéfices, ou lui fait supporter la totalité des pertes.
        </p>
        <div className="rounded-xl border border-rose-200 dark:border-rose-800 bg-rose-50/50 dark:bg-rose-900/10 p-3">
          <p className="text-xs font-semibold text-rose-700 dark:text-rose-300 mb-1">Sanction Art. 54 al. 2 AUSCGIE</p>
          <p className="text-xs text-muted-foreground">La clause léonine est "réputée non écrite" : elle est juridiquement inexistante sans affecter la validité des autres dispositions statutaires. La société demeure valable, mais la clause est ignorée.</p>
        </div>

        <p className="font-semibold">4.4 Capital minimum par forme sociale</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Forme sociale</th>
                <th className="text-center p-2 border border-border">Capital minimum</th>
                <th className="text-left p-2 border border-border">Précisions</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["SNC", "Aucun minimum OHADA", "Fixé par les statuts"],
                ["SCS", "Aucun minimum OHADA", "Fixé par les statuts"],
                ["SARL", "Libre (RDC : Arr. intermin. 002 & 243, 30/12/2014)", "Arrêté RDC : capital libre, plus de minimum fixe"],
                ["SA", "10 000 000 FCFA (Art. 387)", "Minimum ferme imposé par l'AUSCGIE"],
                ["SAS", "Libre (Art. 853-1)", "Les statuts fixent le capital librement"],
              ].map(([forme, capital, prec], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-semibold">{forme}</td>
                  <td className="p-2 border border-border text-center font-medium text-violet-600 dark:text-violet-400">{capital}</td>
                  <td className="p-2 border border-border text-muted-foreground">{prec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l4q1',
        question: "Qu'est-ce qu'une clause léonine selon l'Art. 54 al. 2 AUSCGIE ?",
        options: [
          { id: 'a', texte: "Une clause prévoyant un droit de vote double" },
          { id: 'b', texte: "Une clause permettant à un associé de participer aux bénéfices sans supporter les pertes" },
          { id: 'c', texte: "Une clause imposant un commissaire aux comptes" },
          { id: 'd', texte: "Une clause limitant la cession des parts sociales" },
        ],
        reponseCorrecte: 'b',
        explication: "La clause léonine est celle qui attribue à un associé la totalité des bénéfices ou l'exonère de toute contribution aux pertes, ou l'inverse. L'Art. 54 al. 2 la réputée 'non écrite', c'est-à-dire inexistante, sans affecter la validité du reste des statuts.",
        articleRef: 'Art. 54 al. 2 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l4q2',
        question: "Quel est le plafond des apports en industrie selon l'Art. 50-3 AUSCGIE ?",
        options: [
          { id: 'a', texte: "10%" },
          { id: 'b', texte: "20%" },
          { id: 'c', texte: "25%" },
          { id: 'd', texte: "33%" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 50-3 AUSCGIE limite les apports en industrie à 25% du capital social. Ces parts sont incessibles et non négociables.",
        articleRef: 'Art. 50-3 AUSCGIE',
      },
    ],
  },

  {
    id: 'l5',
    icone: <AlertTriangle className="h-5 w-5" />,
    titre: "Formalités d'immatriculation et personnalité morale (Art. 73-103 AUSCGIE)",
    badge: 'Art. 73-103 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          L'immatriculation au Registre du Commerce et du Crédit Mobilier (RCCM) est l'acte juridique qui transforme la société en personne morale.<InfoTooltip texte="Avant l'immatriculation, la société n'existe pas légalement ; elle est dite 'en formation'. L'AUSCGIE organise ce processus en plusieurs étapes obligatoires." loi="Art. 97 AUSCGIE" />
        </p>

        <p className="font-semibold">5.1 Les 7 étapes de la constitution</p>
        <div className="space-y-2">
          {[
            { step: "1", title: "Rédaction et signature des statuts", desc: "Acte notarié ou SSP — signatures de tous les fondateurs", art: "Art. 10" },
            { step: "2", title: "Dépôt des fonds en numéraire", desc: "Versement sur compte bancaire bloqué au nom de la société en formation", art: "Art. 41-45" },
            { step: "3", title: "Évaluation des apports en nature", desc: "Rapport du Commissaire aux Apports si requis (Art. 312)", art: "Art. 46-50" },
            { step: "4", title: "Assemblée constitutive (si SA)", desc: "Réunion des souscripteurs pour approuver les statuts et nommer les premiers dirigeants", art: "Art. 396" },
            { step: "5", title: "Déclaration de régularité et de conformité", desc: "Document signé par les fondateurs attestant le respect de toutes les conditions légales", art: "Art. 73" },
            { step: "6", title: "Dépôt du dossier au RCCM", desc: "Dépôt des statuts, de la déclaration, de l'attestation de dépôt des fonds, du rapport CAA", art: "Art. 27" },
            { step: "7", title: "Délivrance du certificat d'immatriculation", desc: "La société acquiert la personnalité morale — début de l'existence légale", art: "Art. 97" },
          ].map(({ step, title, desc, art }) => (
            <div key={step} className="flex gap-3 items-start rounded-xl border border-border bg-muted/20 p-3">
              <div className="bg-violet-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold shrink-0">{step}</div>
              <div>
                <p className="text-xs font-semibold text-foreground">{title} <span className="text-muted-foreground font-normal">({art})</span></p>
                <p className="text-xs text-muted-foreground">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        <p className="font-semibold">5.2 La naissance de la personnalité morale (Art. 97)</p>
        <div className="rounded-xl border border-border bg-muted/30 p-3">
          <p className="text-xs font-semibold mb-1">Art. 97 AUSCGIE</p>
          <p className="text-xs italic text-foreground/80">« La société jouit de la personnalité morale à compter de son immatriculation au Registre du Commerce et du Crédit Mobilier. »</p>
          <p className="text-xs text-muted-foreground mt-1.5">À compter de l'immatriculation, la société peut ester en justice, conclure des contrats, embaucher du personnel, ouvrir des comptes bancaires et acquérir des biens en son nom propre.</p>
        </div>

        <p className="font-semibold">5.3 Irrégularités et sanctions (Art. 74-1 à 78)</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Type d'irrégularité</th>
                <th className="text-left p-2 border border-border text-red-600">Sanction</th>
                <th className="text-left p-2 border border-border">Référence</th>
                <th className="text-left p-2 border border-border">Régularisation ?</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Omission d'une mention obligatoire", "Nullité relative si préjudice prouvé", "Art. 74-1", "Oui — délai raisonnable"],
                ["Absence de déclaration de régularité", "Rejet de l'immatriculation", "Art. 73", "Oui — dépôt de la déclaration"],
                ["Absence de rapport CAA requis", "Responsabilité solidaire des fondateurs", "Art. 78", "Possible — désignation d'un CAA"],
                ["Surévaluation frauduleuse d'un apport", "Responsabilité pénale des fondateurs", "Art. 78", "Non (acte intentionnel)"],
                ["Clause léonine dans les statuts", "Clause réputée non écrite", "Art. 54 al. 2", "Oui — modification statutaire"],
              ].map(([irr, sanc, ref, reg], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{irr}</td>
                  <td className="p-2 border border-border text-red-600 dark:text-red-400">{sanc}</td>
                  <td className="p-2 border border-border text-violet-600 dark:text-violet-400">{ref}</td>
                  <td className="p-2 border border-border text-muted-foreground">{reg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-semibold">5.4 Société en formation et reprise des actes (Art. 101-103)</p>
        <p>Entre la signature des statuts et l'immatriculation, la société est "en formation". Les actes accomplis au nom de la société en formation engagent personnellement et solidairement leurs auteurs (Art. 101).</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Situation de l'acte</th>
                <th className="text-left p-2 border border-border">Reprise possible ?</th>
                <th className="text-left p-2 border border-border">Modalité</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Acte annexé aux statuts, signé par tous", "Oui — automatique", "Simple immatriculation"],
                ["Acte avec mandat, non annexé", "Oui — décision expresse", "Vote AG après immatriculation"],
                ["Acte sans mandat, non annexé", "Oui — décision expresse", "Vote AG — associés libres de refuser"],
                ["Acte non repris par la société", "Non", "Auteur reste seul responsable"],
              ].map(([sit, reprise, modal], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{sit}</td>
                  <td className="p-2 border border-border text-muted-foreground">{reprise}</td>
                  <td className="p-2 border border-border text-muted-foreground">{modal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/60 dark:bg-violet-900/20 p-3">
          <p className="text-xs font-semibold text-violet-700 dark:text-violet-300 mb-1">Principe de faveur pour la société (Art. 75)</p>
          <p className="text-xs text-muted-foreground">L'AUSCGIE privilégie la régularisation sur la nullité. Tant qu'une irrégularité peut être corrigée sans léser irrémédiablement les associés ou les tiers, les tribunaux accordent un délai de régularisation plutôt que de prononcer la dissolution.</p>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l5q1',
        question: "Quand la société acquiert-elle la personnalité morale selon l'Art. 97 AUSCGIE ?",
        options: [
          { id: 'a', texte: "À la signature des statuts" },
          { id: 'b', texte: "Au dépôt du capital" },
          { id: 'c', texte: "À l'immatriculation au RCCM" },
          { id: 'd', texte: "À la publication au BODAC" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 97 AUSCGIE est catégorique : la personnalité morale naît à compter de l'immatriculation au Registre du Commerce et du Crédit Mobilier (RCCM). Avant cette date, la société est dite 'en formation'.",
        articleRef: 'Art. 97 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l5q2',
        question: "Qu'est-ce que la déclaration de régularité et de conformité (Art. 73 AUSCGIE) ?",
        options: [
          { id: 'a', texte: "Une déclaration fiscale obligatoire" },
          { id: 'b', texte: "Un document signé par les fondateurs attestant du respect des formalités légales" },
          { id: 'c', texte: "Un rapport du commissaire aux comptes" },
          { id: 'd', texte: "Une attestation bancaire du dépôt des fonds" },
        ],
        reponseCorrecte: 'b',
        explication: "La déclaration de régularité et de conformité est un document signé par les fondateurs et déposé au RCCM, attestant que toutes les conditions légales de constitution ont été respectées. Son absence entraîne le rejet de l'immatriculation.",
        articleRef: 'Art. 73 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l5q3',
        question: "Dans une société en formation, qui est responsable des actes passés avant immatriculation ?",
        options: [
          { id: 'a', texte: "La société, rétroactivement" },
          { id: 'b', texte: "Le RCCM" },
          { id: 'c', texte: "Les personnes ayant agi au nom de la société, sauf reprise formelle" },
          { id: 'd', texte: "Les actionnaires à hauteur de leurs apports" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 101 AUSCGIE dispose que les actes accomplis au nom d'une société en formation engagent personnellement leurs auteurs. La société peut reprendre ces engagements après immatriculation si les conditions de l'Art. 103 sont réunies.",
        articleRef: 'Art. 101 AUSCGIE',
      },
    ],
  },

  {
    id: 'l6',
    icone: <BookOpen className="h-5 w-5" />,
    titre: "Publicité légale et comparatif constitution (Art. 256-1 à 263 & 853-1)",
    badge: 'Art. 256-263 AUSCGIE',
    contenu: (
      <div className="space-y-4 text-sm text-foreground leading-relaxed">
        <p>
          La publicité légale est l'ensemble des formalités par lesquelles la société porte à la connaissance des tiers son existence, ses caractéristiques essentielles et ses actes importants. L'AUSCGIE révisé en 2014 a modernisé ce système avec le BODAC.
        </p>

        <p className="font-semibold">6.1 Les supports de publicité</p>
        <div className="space-y-2">
          {[
            { name: "RCCM", desc: "Support primaire — l'immatriculation est la formalité centrale et obligatoire (Art. 97). Contient les informations officielles de toutes les sociétés immatriculées.", art: "Art. 97" },
            { name: "Journal habilité (JAL/JO)", desc: "Un avis de constitution doit être publié dans un journal habilité dans les 15 jours suivant l'immatriculation.", art: "Art. 257" },
            { name: "BODAC", desc: "Bulletin Officiel de Diffusion des Actes de Commerce — outil numérique introduit en 2014. Centralise la publication électronique des actes commerciaux.", art: "Art. 258-1" },
          ].map(({ name, desc, art }) => (
            <div key={name} className="rounded-xl border border-border bg-card p-3">
              <p className="text-xs font-semibold text-foreground mb-0.5">{name} <span className="text-muted-foreground font-normal">({art})</span></p>
              <p className="text-xs text-muted-foreground">{desc}</p>
            </div>
          ))}
        </div>

        <p className="font-semibold">6.2 Opposabilité aux tiers</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Acte / Information</th>
                <th className="text-left p-2 border border-border">Formalité requise</th>
                <th className="text-center p-2 border border-border">Délai</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Constitution de la société", "Immatriculation RCCM + avis JAL/BODAC", "15 jours après immatriculation"],
                ["Nomination / révocation d'un dirigeant", "Inscription modificative RCCM + avis JAL/BODAC", "15 jours"],
                ["Modification de l'objet social", "Inscription modificative RCCM + avis JAL/BODAC", "15 jours"],
                ["Dépôt des états financiers annuels", "Dépôt au greffe du RCCM", "1 mois après approbation AG"],
                ["Cession de parts sociales", "Inscription au registre des titres + notification", "Variable"],
              ].map(([acte, forma, delai], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-medium">{acte}</td>
                  <td className="p-2 border border-border text-muted-foreground">{forma}</td>
                  <td className="p-2 border border-border text-center text-violet-600 dark:text-violet-400">{delai}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <p className="font-semibold">6.3 La SAS — spécificités (Art. 853-1 ss.)</p>
        <p>La SAS, introduite par la révision 2014, est une forme hybride particulièrement adaptée aux entreprises innovantes et aux joint-ventures :</p>
        <ul className="space-y-1.5 text-muted-foreground">
          <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0">•</span><span><strong>Capital libre (Art. 853-1) :</strong> aucun minimum légal, fixé librement dans les statuts.</span></li>
          <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0">•</span><span><strong>Interdiction d'appel public à l'épargne (Art. 853-2) :</strong> ne peut pas être cotée en bourse.</span></li>
          <li className="flex items-start gap-2"><span className="text-violet-500 shrink-0">•</span><span><strong>Libération du capital (Art. 853-8) :</strong> 1/4 minimum à la constitution, solde dans les 3 ans.</span></li>
        </ul>

        <p className="font-semibold">6.4 Tableau comparatif — constitution des 5 formes</p>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-muted/50">
                <th className="text-left p-2 border border-border">Critère</th>
                <th className="text-center p-2 border border-border">SNC</th>
                <th className="text-center p-2 border border-border">SCS</th>
                <th className="text-center p-2 border border-border">SARL</th>
                <th className="text-center p-2 border border-border">SA</th>
                <th className="text-center p-2 border border-border">SAS</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Nb. min. associés", "2", "2", "1 à 50", "1 à illimité", "2 min."],
                ["Capital minimum", "Libre", "Libre", "Libre (RDC)", "10 000 000 FCFA", "Libre"],
                ["Titres émis", "Parts sociales", "Parts sociales", "Parts sociales", "Actions", "Actions"],
                ["Libération numéraire", "100%", "100%", "1/5 + 2 ans", "1/4 + 3 ans", "1/4 + 3 ans"],
                ["Apport industrie", "Oui", "Oui", "Oui (max 25%)", "Non", "Oui (max 25%)"],
                ["Responsabilité", "Illimitée solidaire", "Illim./Limitée", "Limitée aux apports", "Limitée aux apports", "Limitée aux apports"],
              ].map(([crit, snc, scs, sarl, sa, sas], i) => (
                <tr key={i} className="even:bg-muted/20">
                  <td className="p-2 border border-border font-semibold">{crit}</td>
                  <td className="p-2 border border-border text-center text-muted-foreground">{snc}</td>
                  <td className="p-2 border border-border text-center text-muted-foreground">{scs}</td>
                  <td className="p-2 border border-border text-center text-muted-foreground">{sarl}</td>
                  <td className="p-2 border border-border text-center text-muted-foreground">{sa}</td>
                  <td className="p-2 border border-border text-center text-muted-foreground">{sas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ),
    questions: [
      {
        type: 'qcm',
        id: 'l6q1',
        question: "Quel est le délai de publication d'un avis de constitution dans un journal habilité ?",
        options: [
          { id: 'a', texte: "8 jours après la signature des statuts" },
          { id: 'b', texte: "15 jours après l'immatriculation au RCCM" },
          { id: 'c', texte: "30 jours après le dépôt du capital" },
          { id: 'd', texte: "60 jours après l'assemblée constitutive" },
        ],
        reponseCorrecte: 'b',
        explication: "L'Art. 257 AUSCGIE oblige les fondateurs à publier un avis de constitution dans un journal habilité à recevoir les annonces légales, dans les 15 jours suivant l'immatriculation au RCCM.",
        articleRef: 'Art. 257 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l6q2',
        question: "Qu'est-ce que le BODAC selon l'AUSCGIE révisé 2014 ?",
        options: [
          { id: 'a', texte: "Un bulletin bancaire d'offres de crédit" },
          { id: 'b', texte: "Un bulletin officiel de diffusion des actes de commerce" },
          { id: 'c', texte: "Un registre foncier des apports immobiliers" },
          { id: 'd', texte: "Un document annexé aux statuts" },
        ],
        reponseCorrecte: 'b',
        explication: "Le BODAC (Bulletin Officiel de Diffusion des Actes de Commerce) est introduit par la révision 2014 de l'AUSCGIE. Il centralise la publication électronique des actes commerciaux, offrant une publicité légale modernisée et accessible.",
        articleRef: 'Art. 258-1 AUSCGIE',
      },
      {
        type: 'qcm',
        id: 'l6q3',
        question: "Quelle est la particularité de la SAS en matière de capital selon l'AUSCGIE révisé ?",
        options: [
          { id: 'a', texte: "Capital minimum de 10 000 000 FCFA" },
          { id: 'b', texte: "Capital minimum de 1 000 000 FCFA" },
          { id: 'c', texte: "Capital librement fixé par les statuts" },
          { id: 'd', texte: "Capital minimum de 100 000 000 FCFA" },
        ],
        reponseCorrecte: 'c',
        explication: "L'Art. 853-1 AUSCGIE introduit par la réforme 2014 dispose que le capital de la SAS est librement fixé par les statuts. Il n'existe pas de minimum légal, ce qui distingue la SAS des autres formes sociales.",
        articleRef: 'Art. 853-1 AUSCGIE',
      },
    ],
  },
]

const QCM_GLOBAL: QCMQuestion[] = LECONS.flatMap(l =>
  l.questions.filter((q): q is QCMQuestion => q.type === 'qcm')
)

interface CasPratiqueEtude {
  id: string
  titre: string
  contexte: string
  questions: { num: number; enonce: string; correction: string }[]
  articleRef: string
}

const ETUDES_DE_CAS: CasPratiqueEtude[] = [
  {
    id: 'ec1',
    titre: 'La société KONGOMETAL SARL',
    contexte: "Trois personnes souhaitent créer KONGOMETAL SARL à Kinshasa : (A) M. BANZA, 42 ans, commerçant ; (B) Mme LUFUA, 16 ans, lycéenne non émancipée ; (C) HOLDING KASAI SA. Le capital est de 15 000 000 CDF. M. BANZA apporte 5 000 000 CDF en espèces. Mme LUFUA apporte un véhicule Toyota évalué à 6 000 000 CDF. HOLDING KASAI apporte ses compétences en gestion et son réseau commercial. Seuls 3 000 000 CDF en numéraire sont déposés à la banque lors de la constitution.",
    questions: [
      { num: 1, enonce: "Mme LUFUA (mineure) peut-elle être associée ?", correction: "Oui. L'Art. 8 AUSCGIE autorise le mineur non émancipé à être associé dans une SARL, société à responsabilité limitée. Sa responsabilité est limitée à ses apports (le véhicule évalué à 6 000 000 CDF). Elle devra agir représentée par son tuteur légal pour tous les actes de la vie sociale." },
      { num: 2, enonce: "L'apport de HOLDING KASAI est-il admissible ?", correction: "Partiellement. L'apport en industrie est admis dans une SARL dans la limite de 25% du capital social (Art. 50-3). 25% de 15 000 000 CDF = 3 750 000 CDF maximum. Les parts reçues seront incessibles." },
      { num: 3, enonce: "Un CAA est-il obligatoire pour le véhicule de Mme LUFUA ?", correction: "Oui. L'Art. 312 AUSCGIE impose un Commissaire aux Apports dès lors que la valeur d'un apport en nature dépasse 5 000 000 FCFA. Le véhicule évalué à 6 000 000 CDF dépasse ce seuil. Sans CAA, les fondateurs engagent leur responsabilité solidaire." },
      { num: 4, enonce: "La libération du capital est-elle régulière ?", correction: "Oui. L'Art. 313 AUSCGIE impose 1/5 minimum (20%) des apports en numéraire à la constitution. Sur 5 000 000 CDF, le minimum légal est 1 000 000 CDF. Or 3 000 000 CDF = 60% ont été déposés, ce qui dépasse largement le minimum. Le solde de 2 000 000 CDF devra être libéré dans les 2 ans." },
    ],
    articleRef: 'Art. 8, 50-3, 312, 313 AUSCGIE',
  },
  {
    id: 'ec2',
    titre: 'La SNC des époux MUTOMBO',
    contexte: "M. MUTOMBO et Mme MUTOMBO (époux) ont créé ensemble la SNC MUTOMBO et Associés en 2020, avec un troisième associé M. NGANGA. En 2024, un créancier découvre que les deux époux sont associés solidairement et illimités dans la SNC et saisit le tribunal en invoquant l'Art. 9 AUSCGIE.",
    questions: [
      { num: 1, enonce: "La situation est-elle régulière ?", correction: "Non. L'Art. 9 AUSCGIE interdit formellement aux époux d'être associés ensemble dans une SNC (société à responsabilité illimitée et solidaire). La SNC MUTOMBO est donc irrégulière depuis sa création." },
      { num: 2, enonce: "Quelles solutions s'offrent aux époux ?", correction: "Option 1 : L'un des époux cède ses parts à un tiers ou à M. NGANGA. Option 2 : Transformation de la SNC en SARL ou SA, formes dans lesquelles les époux peuvent légalement co-associer. Le tribunal peut accorder un délai de régularisation avant de prononcer la nullité (Art. 75 AUSCGIE)." },
    ],
    articleRef: 'Art. 9, 74-1, 75 AUSCGIE',
  },
  {
    id: 'ec3',
    titre: 'La clause léonine de la SA KIVU INVEST',
    contexte: "Les statuts de KIVU INVEST SA contiennent la clause suivante : « M. RUSIMBI, associé fondateur, bénéficiera de 40% des bénéfices nets annuels, quelle que soit sa quote-part dans le capital, et ne sera jamais tenu de contribuer aux pertes sociales. » M. RUSIMBI détient 10% du capital. Un associé minoritaire conteste cette clause.",
    questions: [
      { num: 1, enonce: "Cette clause est-elle valide ?", correction: "Non. Cette clause est doublement léonine (Art. 54 al. 2 AUSCGIE) : (1) elle attribue à M. RUSIMBI 40% des bénéfices alors qu'il détient 10% du capital ; (2) elle l'exonère totalement des pertes. Ces deux composantes constituent une clause léonine classique." },
      { num: 2, enonce: "Quelle est la sanction légale et ses conséquences ?", correction: "L'Art. 54 al. 2 AUSCGIE frappe la clause d'une sanction particulière : elle est 'réputée non écrite'. La SA KIVU INVEST demeure parfaitement valide. M. RUSIMBI participera aux bénéfices et aux pertes proportionnellement à sa quote-part réelle (10%). Les dividendes versés en application de cette clause devront être remboursés à la société." },
    ],
    articleRef: 'Art. 54 al. 2, 53 AUSCGIE',
  },
]

function QCMBlock({ q }: { q: QCMQuestion }) {
  const [selected, setSelected] = useState<string | null>(null)
  const [showResult, setShowResult] = useState(false)
  return (
    <div className="rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/30 dark:bg-violet-900/10 p-4 space-y-3">
      <p className="text-xs font-semibold text-violet-700 dark:text-violet-300">{q.question}</p>
      <div className="space-y-1.5">
        {q.options.map(opt => {
          let cls = 'w-full text-left text-xs px-3 py-2 rounded-lg border transition-colors '
          if (!showResult) cls += selected === opt.id ? 'border-violet-500 bg-violet-100 dark:bg-violet-900/30 text-violet-800 dark:text-violet-200' : 'border-border hover:border-violet-300 hover:bg-muted/40'
          else if (opt.id === q.reponseCorrecte) cls += 'border-green-500 bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300'
          else if (opt.id === selected) cls += 'border-red-400 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300'
          else cls += 'border-border opacity-50'
          return <button key={opt.id} className={cls} onClick={() => { if (!showResult) setSelected(opt.id) }} disabled={showResult}><span className="font-bold mr-1.5">{opt.id.toUpperCase()}.</span>{opt.texte}</button>
        })}
      </div>
      {!showResult && <button onClick={() => { if (selected) setShowResult(true) }} disabled={!selected} className="text-xs bg-violet-600 text-white rounded-lg px-4 py-1.5 disabled:opacity-40 hover:bg-violet-700 transition-colors font-semibold">Vérifier</button>}
      {showResult && (
        <div className={cn('rounded-lg p-2.5 text-xs', selected === q.reponseCorrecte ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300' : 'bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-300')}>
          <div className="flex items-center gap-1 font-semibold mb-0.5">{selected === q.reponseCorrecte ? <CheckCircle2 className="h-3.5 w-3.5" /> : <XCircle className="h-3.5 w-3.5" />}{selected === q.reponseCorrecte ? 'Correct !' : 'Incorrect'}</div>
          <p>{q.explication}</p>
          <button onClick={() => { setSelected(null); setShowResult(false) }} className="mt-1.5 text-xs underline opacity-70 hover:opacity-100">Réessayer</button>
        </div>
      )}
    </div>
  )
}

function CasPratiqueBlock({ cp }: { cp: CasPratiqueEtude }) {
  const [open, setOpen] = useState(false)
  const [corrVisible, setCorrVisible] = useState<Set<number>>(new Set())
  return (
    <div className="rounded-xl border border-border bg-card overflow-hidden">
      <button onClick={() => setOpen(o => !o)} className="w-full flex items-center justify-between p-4 hover:bg-muted/30 transition-colors">
        <div className="flex items-center gap-3 text-left">
          <span className="h-7 w-7 rounded-full bg-violet-100 dark:bg-violet-900/40 text-violet-700 dark:text-violet-300 text-xs font-bold flex items-center justify-center shrink-0">C{cp.id.replace('ec', '')}</span>
          <div>
            <p className="text-sm font-semibold text-foreground">{cp.titre}</p>
            <p className="text-xs text-muted-foreground">{cp.articleRef}</p>
          </div>
        </div>
        <ChevronRight className={cn('h-4 w-4 text-muted-foreground shrink-0 transition-transform', open && 'rotate-90')} />
      </button>
      {open && (
        <div className="px-4 pb-4 space-y-4 border-t border-border pt-4">
          <div className="rounded-lg bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 p-3">
            <p className="text-xs font-semibold text-amber-800 dark:text-amber-300 mb-1">Contexte</p>
            <p className="text-xs text-amber-900 dark:text-amber-200 leading-relaxed">{cp.contexte}</p>
          </div>
          <div className="space-y-3">
            {cp.questions.map(q => (
              <div key={q.num} className="space-y-2">
                <p className="text-xs font-semibold text-foreground">Question {q.num} : {q.enonce}</p>
                {corrVisible.has(q.num) ? (
                  <div className="rounded-lg bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 p-3">
                    <p className="text-xs font-semibold text-emerald-700 dark:text-emerald-300 mb-1">Correction</p>
                    <p className="text-xs text-emerald-900 dark:text-emerald-200 leading-relaxed">{q.correction}</p>
                  </div>
                ) : (
                  <button onClick={() => setCorrVisible(s => new Set([...s, q.num]))} className="text-xs text-violet-600 dark:text-violet-400 hover:underline font-medium">Voir la correction</button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default function UE2Chapitre2Page() {
  const [, navigate] = useHashLocation()
  const goBack = useGoBack('/ue2-droit-societes')
  const currentUser = useUser()
  const isStudent = currentUser?.role === 'etudiant'

  const [activeTab, setActiveTab] = useState<'lecons' | 'qcm' | 'cas' | 'devoir'>('lecons')
  const [leconIdx, setLeconIdx] = useState(0)
  const lecon = LECONS[leconIdx]
  const isFirst = leconIdx === 0
  const isLast = leconIdx === LECONS.length - 1

  const [qcmIdx, setQcmIdx] = useState(0)
  const [qcmSelected, setQcmSelected] = useState<string | null>(null)
  const [qcmShowResult, setQcmShowResult] = useState(false)
  const [qcmScore, setQcmScore] = useState(0)
  const [qcmDone, setQcmDone] = useState(false)
  const currentQ = QCM_GLOBAL[qcmIdx]

  function nextQcm() {
    if (!qcmSelected) return
    const correct = qcmSelected === currentQ.reponseCorrecte
    const newScore = qcmScore + (correct ? 1 : 0)
    setQcmScore(newScore)
    if (qcmIdx + 1 >= QCM_GLOBAL.length) {
      setQcmDone(true)
    } else {
      setQcmIdx(qcmIdx + 1)
      setQcmSelected(null)
      setQcmShowResult(false)
    }
  }

  function resetQcm() {
    setQcmIdx(0); setQcmSelected(null); setQcmShowResult(false); setQcmScore(0); setQcmDone(false)
  }

  return (
    <div className="space-y-4 pb-10 animate-fadeIn">
            <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 2 — Droit des sociétés', route: '/ue2-droit-societes' },
            { label: 'Chapitre 2' },
          ]}
          color="indigo"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-bold text-foreground leading-tight">Constitution des Sociétés</h1>
          <InfoTooltip texte="Constitution des sociétés commerciales en droit OHADA" loi="Art. 7 à 103 AUSCGIE" />
        </div>
        <p className="text-xs text-muted-foreground">Art. 7 à 103 AUSCGIE : Art. 256-1 à 263 : Art. 853-1 (SAS)</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Leçons', value: String(LECONS.length) },
          { label: 'QCM', value: String(QCM_GLOBAL.length) },
          { label: 'Cas pratiques', value: String(ETUDES_DE_CAS.length) },
          { label: 'Durée', value: '3h30' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-violet-200 dark:border-violet-800 bg-violet-50/50 dark:bg-violet-900/10 p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-violet-600 dark:text-violet-400" />
          <span className="text-sm font-semibold text-violet-800 dark:text-violet-300">Objectifs du chapitre</span>
        </div>
        <ul className="space-y-1">
          <li className="flex items-start gap-2 text-xs text-violet-700 dark:text-violet-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-violet-500" /><span>Identifier qui peut être associé et les restrictions légales (Art. 7-9 AUSCGIE)</span></li>
          <li className="flex items-start gap-2 text-xs text-violet-700 dark:text-violet-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-violet-500" /><span>Maîtriser les 13 mentions obligatoires des statuts (Art. 13 AUSCGIE)</span></li>
          <li className="flex items-start gap-2 text-xs text-violet-700 dark:text-violet-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-violet-500" /><span>Distinguer les 3 types d'apports et leurs règles de libération (Art. 37-50-4)</span></li>
          <li className="flex items-start gap-2 text-xs text-violet-700 dark:text-violet-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-violet-500" /><span>Comprendre la naissance de la personnalité morale par l'immatriculation RCCM (Art. 97)</span></li>
          <li className="flex items-start gap-2 text-xs text-violet-700 dark:text-violet-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-violet-500" /><span>Appliquer les règles de publicité légale et d'opposabilité aux tiers (Art. 256-263)</span></li>
          <li className="flex items-start gap-2 text-xs text-violet-700 dark:text-violet-300"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-violet-500" /><span>Analyser la clause léonine et la société en formation (Art. 54 al. 2, 101-103)</span></li>
        </ul>
      </div>

      <div className="flex gap-1 rounded-xl bg-muted p-1">
        {(isStudent
          ? [['lecons', 'Leçons'], ['devoir', 'Devoir']] as [typeof activeTab, string][]
          : [['lecons', 'Leçons'], ['qcm', 'QCM'], ['cas', 'Cas pratiques'], ['devoir', 'Devoir']] as [typeof activeTab, string][]
        ).map(([tab, label]) => (
          <button key={tab} onClick={() => setActiveTab(tab)} className={cn('flex-1 text-xs py-1.5 rounded-lg font-medium transition-colors', activeTab === tab ? 'bg-background text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground')}>
            {label}
          </button>
        ))}
      </div>

      {activeTab === 'lecons' && (
        <div className="space-y-4">
          <div className="flex gap-1 flex-wrap">
            {LECONS.map((l, i) => (
              <button key={l.id} onClick={() => setLeconIdx(i)} className={cn('text-xs px-3 py-1.5 rounded-lg border transition-colors', leconIdx === i ? 'bg-violet-600 text-white border-violet-600' : 'border-border hover:border-violet-400')}>
                L{i + 1}
              </button>
            ))}
          </div>
          <div className="rounded-xl border-l-4 border-l-violet-500 bg-card border border-border p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-semibold text-violet-600 dark:text-violet-400">Leçon {leconIdx + 1} / {LECONS.length}</span>
              <span className="text-xs text-muted-foreground">{lecon.badge ?? ''}</span>
            </div>
            <h2 className="text-base font-bold text-foreground">{lecon.titre}</h2>
          </div>
          <div className="space-y-4">
            <div className="rounded-xl border border-border bg-card p-4 space-y-2">
              {lecon.contenu}
            </div>
            {lecon.questions.filter(q => q.type === 'qcm').map((q, idx) => (
              <QCMBlock key={idx} q={q as QCMQuestion} />
            ))}
          </div>
          <div className="flex items-center justify-between pt-2">
            <button onClick={() => { if (!isFirst) setLeconIdx(leconIdx - 1) }} disabled={isFirst} className={cn('flex items-center gap-1 text-sm px-4 py-2 rounded-xl border transition-colors', isFirst ? 'opacity-40 cursor-not-allowed border-border' : 'border-border hover:border-violet-500')}>
              <ArrowLeft className="h-4 w-4" /> Précédente
            </button>
            <span className="text-xs text-muted-foreground">{leconIdx + 1} / {LECONS.length}</span>
            {!isLast ? (
              <button onClick={() => setLeconIdx(leconIdx + 1)} className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl border border-border hover:border-violet-500 transition-colors">
                Suivante <ArrowRight className="h-4 w-4" />
              </button>
            ) : (
              <button onClick={() => setActiveTab('qcm')} className="flex items-center gap-1 text-sm px-4 py-2 rounded-xl bg-violet-600 text-white hover:bg-violet-700 transition-colors">
                Aller aux QCM <ChevronRight className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {activeTab === 'qcm' && !isStudent && (
        <div className="space-y-4">
          <QCMPageUnique questions={QCM_GLOBAL as unknown as QCMChapitre[]} couleurAccent="violet" />
        </div>
      )}

      {activeTab === 'cas' && (
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-foreground px-1">Cas pratiques : {ETUDES_DE_CAS.length} exercices</h2>
          {ETUDES_DE_CAS.map(cp => <CasPratiqueBlock key={cp.id} cp={cp} />)}
        </div>
      )}

      {activeTab === 'devoir' && (
        <div className="space-y-4">
          {!isStudent ? (
            <DevoirChapitreCreateur
              chapitreId="ue2-chapitre-2"
              chapitreNom="Chapitre 2 : Constitution des Sociétés"
              questions={QCM_GLOBAL}
              coursId="ue2-droit-societes"
              casPratiquesExistants={ETUDES_DE_CAS.map(ec => ({
                id: ec.id,
                titre: ec.titre,
                enonce: ec.contexte + '\n' + ec.questions.map(q => q.num + '. ' + q.enonce).join('\n'),
                corrigeType: ec.questions.map(q => q.num + '. ' + q.correction).join('\n'),
              } as CasPratiqueExistant))}
            />
          ) : (
            <div className="rounded-xl border border-border bg-card p-6 text-center space-y-2">
              <BookOpen className="h-8 w-8 text-muted-foreground mx-auto" />
              <p className="text-sm font-medium text-foreground">Devoir en attente</p>
              <p className="text-sm text-muted-foreground">Votre professeur vous enverra un devoir pour ce chapitre.</p>
            </div>
          )}
        </div>
      )}

      <button onClick={goBack} className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-violet-600 text-white text-sm font-semibold hover:bg-violet-700 transition-colors">
        <CheckCircle2 className="h-4 w-4" /> Terminer le chapitre 2
      </button>

      <p className="text-xs text-center text-muted-foreground/60 pb-2">
        Sources : AUSCGIE révisé 30/01/2014 à Ouagadougou · Art. 7 à 103 · Art. 256-1 à 263 · Art. 853-1 ss. · Arrêté Intermin. RDC n° 002 et n° 243 du 30/12/2014
      </p>
    </div>
  )
}
