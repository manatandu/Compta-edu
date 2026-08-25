// ═══════════════════════════════════════════════════════════════════
//  DICTIONNAIRE ORBIT — Domaine « Management »
//
//  Source : ouvrages académiques encodés dans le skill
//  `dscg3-management-controle-gestion` — Fiches de révision Expert Sup
//  (Dunod, A. Ragaigne et C. Tahar, 2023) et Les Carrés DSCG 3 (Gualino,
//  M. Leroy). Domaine sans référentiel légal propre (contrairement à la
//  fiscalité ou au droit) : chaque définition cite l'auteur et l'ouvrage
//  dont elle est tirée, à défaut d'un texte de loi.
// ═══════════════════════════════════════════════════════════════════
import type { TermeDict } from './dictionnaire'

export const TERMES_MANAGEMENT: TermeDict[] = [
  {
    id: 'controle-gestion-anthony',
    terme: 'Contrôle de gestion (définition d\'Anthony)',
    domaine: 'management',
    ues: ['controle-de-gestion'],
    definition: "Selon Robert N. Anthony (1965), le processus par lequel les managers s'assurent que les ressources sont obtenues et utilisées de manière efficace et efficiente pour atteindre les objectifs de l'organisation. Une seconde définition, plus tardive (1988), le présente comme le processus par lequel les managers influencent d'autres membres de l'organisation pour mettre en œuvre les stratégies retenues — déplaçant l'accent du contrôle des ressources vers l'aide au déploiement de la stratégie.",
    source: "Robert N. Anthony (1965, 1988), cité in A. Ragaigne et C. Tahar, Fiches de révision DSCG3 « Management et contrôle de gestion », Dunod, 2023",
    voirAussi: ['tableau-bord-social'],
  },
  {
    id: 'gpec-management',
    terme: 'Gestion prévisionnelle des emplois et des compétences (GPEC)',
    domaine: 'management',
    ues: ['controle-de-gestion', 'ue7-management'],
    definition: "Démarche d'ingénierie des ressources humaines consistant à concevoir, à mettre en œuvre et à contrôler des politiques et des pratiques visant à réduire de façon anticipée les écarts entre les besoins et les emplois de l'entreprise, au regard des évolutions de sa stratégie et de son environnement — à la fois sur le plan quantitatif (les emplois) et qualitatif (les compétences).",
    source: "Ministère du Travail (définition reprise in A. Ragaigne et C. Tahar, Fiches de révision DSCG3, Dunod, 2023)",
    voirAussi: [],
  },
  {
    id: 'tableau-bord-social',
    terme: 'Tableau de bord social',
    domaine: 'management',
    ues: ['controle-de-gestion'],
    definition: "Tableau de bord servant à mesurer la performance de la politique de ressources humaines. Il comporte des indicateurs mesurant la performance des ressources humaines et est principalement utilisé par le responsable des ressources humaines.",
    source: "A. Ragaigne et C. Tahar, Fiches de révision DSCG3 « Management et contrôle de gestion », Dunod, 2023",
    voirAussi: ['controle-gestion-anthony'],
  },
  {
    id: 'business-model-osterwalder',
    terme: 'Business model (modèle économique)',
    domaine: 'management',
    ues: ['ue7-management'],
    definition: "Logique selon laquelle une entreprise crée, apporte et « capture » de la valeur. Le Business Model Canvas, outil développé par Osterwalder et Pigneur (2010), en est une représentation synthétique qui explique comment l'entreprise crée de la valeur, utilisée à la fois comme grille d'analyse et comme outil de conception.",
    source: "A. Osterwalder et Y. Pigneur (2010), cité in A. Ragaigne et C. Tahar, Fiches de révision DSCG3, Dunod, 2023",
    voirAussi: [],
  },
  {
    id: 'ethique-affaires-management',
    terme: 'Éthique des affaires',
    domaine: 'management',
    ues: ['ue7-management'],
    definition: "Prise en compte, dans la conduite des entreprises, des considérations morales et des règles de conduite conformes à l'intérêt général — intérêt qui dépasse l'intérêt particulier de l'entreprise et, a fortiori, l'intérêt particulier du dirigeant. Elle pousse les entreprises à intégrer le respect des parties prenantes (salariés, clients, organisations non gouvernementales, syndicats, pouvoirs publics) dans leurs pratiques de gestion.",
    source: "A. Ragaigne et C. Tahar, Fiches de révision DSCG3 « Management et contrôle de gestion », Dunod, 2023",
    voirAussi: [],
  },
  {
    id: 'gouvernance-entreprise-management',
    terme: "Gouvernance d'entreprise",
    domaine: 'management',
    ues: ['ue7-management'],
    definition: "Ensemble des pratiques et normes visant à améliorer la gestion et le contrôle d'une entreprise, en organisant les relations entre les organes de direction, les actionnaires et les autres parties prenantes. En France, l'Afep (Association française des entreprises privées) et le Medef ont ainsi développé un code éthique applicable aux entreprises cotées, dont le suivi est assuré depuis 2013 par un Haut Comité de gouvernement d'entreprise.",
    source: "A. Ragaigne et C. Tahar, Fiches de révision DSCG3 « Management et contrôle de gestion », Dunod, 2023",
    voirAussi: ['ethique-affaires-management'],
  },
]
