// ═══════════════════════════════════════════════════════════════════
//  DICTIONNAIRE ORBIT — Domaine « Audit »
//
//  Source : Normes internationales d'audit (ISA) de l'IAASB, texte
//  officiel encodé dans le skill `isa-isqm-normes`. Chaque définition
//  cite le paragraphe exact de la norme concernée.
// ═══════════════════════════════════════════════════════════════════
import type { TermeDict } from './dictionnaire'

export const TERMES_AUDIT: TermeDict[] = [
  {
    id: 'assurance-raisonnable-isa200',
    terme: 'Assurance raisonnable (ISA 200)',
    domaine: 'audit',
    ues: ['ue12-audit'],
    definition: "Niveau d'assurance élevé, atteint lorsque l'auditeur a obtenu des éléments probants suffisants et appropriés pour ramener le risque d'audit — le risque que l'auditeur exprime une opinion inappropriée sur des états financiers comportant des anomalies significatives — à un niveau suffisamment faible. L'assurance raisonnable ne correspond pas à un niveau absolu d'assurance, en raison des limites inhérentes à l'audit.",
    source: 'ISA 200, §5 et 12(m)',
    voirAussi: ['risque-audit-isa200', 'elements-probants-isa500'],
  },
  {
    id: 'risque-audit-isa200',
    terme: "Risque d'audit (ISA 200)",
    domaine: 'audit',
    ues: ['ue12-audit'],
    definition: "Risque que l'auditeur exprime une opinion inappropriée alors que les états financiers comportent des anomalies significatives. Le risque d'audit est fonction des risques d'anomalies significatives et du risque de non-détection : le risque de non-détection est le risque que les procédures mises en œuvre par l'auditeur ne lui permettent pas de détecter une anomalie existante et susceptible d'être significative.",
    source: 'ISA 200, §12(c) et (e)',
    voirAussi: ['assurance-raisonnable-isa200', 'seuil-signification-isa320'],
  },
  {
    id: 'elements-probants-isa500',
    terme: 'Éléments probants (ISA 500)',
    domaine: 'audit',
    ues: ['ue12-audit'],
    definition: "Informations sur lesquelles s'appuie l'auditeur pour parvenir aux conclusions qui serviront de fondement à son opinion. Ils comprennent les informations contenues dans les documents comptables sous-tendant les états financiers, ainsi que d'autres informations. Le caractère suffisant s'entend de leur dimension quantitative, le caractère approprié de leur dimension qualitative (pertinence et fiabilité).",
    source: 'ISA 200, §12(b) ; ISA 500',
    voirAussi: ['assurance-raisonnable-isa200'],
  },
  {
    id: 'esprit-critique-isa200',
    terme: 'Esprit critique (ISA 200)',
    domaine: 'audit',
    ues: ['ue12-audit'],
    definition: "Attitude qui implique de faire preuve de scepticisme, d'être attentif aux états de fait pouvant éventuellement dénoter des anomalies — que celles-ci résultent de fraudes ou d'erreurs — et de n'accepter aucun élément probant sans s'interroger d'abord sur sa valeur.",
    source: 'ISA 200, §12(l)',
    voirAussi: ['elements-probants-isa500'],
  },
  {
    id: 'seuil-signification-isa320',
    terme: 'Seuil de signification (ISA 320)',
    domaine: 'audit',
    ues: ['ue12-audit'],
    definition: "Détermination relevant du jugement professionnel de l'auditeur, appliquée aux fins de la planification comme de la réalisation de l'audit. Le seuil de signification pour les travaux désigne le ou les montants établis en deçà du seuil de signification pour les états financiers pris dans leur ensemble, afin de ramener à un niveau suffisamment faible le risque d'agrégation — la probabilité que le total des anomalies non corrigées et non détectées excède ce seuil global.",
    source: 'ISA 320, §9',
    voirAussi: ['risque-audit-isa200'],
  },
  {
    id: 'opinion-avec-reserve-isa705',
    terme: 'Opinion avec réserve (ISA 705)',
    domaine: 'audit',
    ues: ['ue12-audit'],
    definition: "L'auditeur exprime une opinion avec réserve lorsque, ayant obtenu des éléments probants suffisants et appropriés, il conclut que des anomalies sont significatives mais n'ont pas d'incidence généralisée sur les états financiers, ou lorsqu'il n'a pas pu obtenir des éléments probants suffisants et appropriés, mais conclut que les incidences éventuelles d'anomalies non détectées pourraient être significatives sans être généralisées. Elle se distingue de l'opinion défavorable et de l'impossibilité d'exprimer une opinion, réservées aux cas d'incidence généralisée.",
    source: 'ISA 705 (révisée), §7',
    voirAussi: ['seuil-signification-isa320'],
  },
]
