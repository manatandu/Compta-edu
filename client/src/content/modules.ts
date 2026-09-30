// ─────────────────────────────────────────────────────────────────────────────
// REGISTRE DES MODULES DE COURS
//
// Source unique de tout ce qui décrit un module rédigé : son adresse, son
// intitulé, ses textes de référence et la liste de ses chapitres. La page
// sommaire (pages/SommaireModulePage.tsx), le bouton de retour et les fichiers
// de chapitres lisent ce registre ; aucun titre de chapitre n'est plus recopié
// ailleurs.
//
// Avant ce registre, chaque module avait sa propre page de sommaire (cinq
// fichiers quasi identiques) et chaque titre existait deux fois, dans le
// sommaire et dans le chapitre. Huit titres avaient fini par diverger.
//
// Ce fichier ne contient que des chaînes : il reste léger, et l'importer ne
// charge le contenu d'aucun chapitre.
// ─────────────────────────────────────────────────────────────────────────────

export interface EntreeChapitre {
  titre: string
  /** Repère court affiché sous le titre dans le sommaire. */
  reperes: string
  duree: string
}

export interface ModuleCours {
  /** Clé technique, identique à celle du catalogue des chapitres. */
  ue: string
  numeroUE: number
  /** Adresse du sommaire, identique au moduleKey du cours système. */
  route: string
  titre: string
  /** Libellé court pour le fil d'Ariane et le bouton de retour. */
  libelle: string
  textes: string
  presentation: string
  objectifs?: string[]
  sources: string
  /**
   * Couleur d'accent. Les classes sont écrites en toutes lettres pour que
   * Tailwind les génère (une classe construite par concaténation ne l'est pas).
   */
  accent: { texte: string; anneau: string }
  chapitres: EntreeChapitre[]
}

export const MODULES: ModuleCours[] = [
  {
    ue: 'ue1',
    numeroUE: 1,
    route: '/ue1-droit-travail',
    titre: 'Droit du travail',
    libelle: 'UE 1 · Droit du travail',
    textes: 'Loi n°015/2002 du 16 octobre 2002, modifiée par la loi n°16/010 du 15 juillet 2016',
    presentation: 'Manuel de cours : le Code du travail congolais et son environnement social, de la formation du contrat au décompte final.',
    sources: 'Loi n°015/2002 du 16 octobre 2002 · Loi n°16/010 du 15 juillet 2016 · Décret n°18/041 du 24 novembre 2018 · Décret n°25/22 du 30 mai 2025',
    accent: { texte: 'text-[#1E4A3D]', anneau: 'focus-visible:ring-[#1E4A3D]' },
    chapitres: [
      { titre: 'Notions fondamentales et sources du droit du travail', reperes: 'Titre I, art. 1–7', duree: '4h' },
      { titre: 'Formation professionnelle, apprentissage et INPP', reperes: 'Titres II–III, art. 8–35', duree: '3h' },
      { titre: 'Le contrat de travail : formation, exécution, suspension', reperes: 'Titre IV (1/2), art. 36–60', duree: '6h' },
      { titre: 'La rupture du contrat de travail', reperes: 'Titre IV (2/2), art. 61–85', duree: '5h' },
      { titre: 'La rémunération : salaire, SMIG et sa protection', reperes: 'Titre V, art. 86–118', duree: '4h' },
      { titre: 'Durée du travail, repos, maternité, congés et voyages', reperes: 'Titre VI, art. 119–158', duree: '4h' },
      { titre: 'Santé, sécurité au travail, service médical et sécurité sociale', reperes: 'Titres VII–VIII, Décret n°18/041', duree: '5h' },
      { titre: 'Administration du travail, moyens de contrôle et relations professionnelles', reperes: 'Titres IX–XII, art. 185–296', duree: '6h' },
      { titre: 'Contentieux du travail, grève, sanctions et dispositions finales', reperes: 'Titres XIII–XV, art. 297–329', duree: '4h' },
      { titre: 'Pratique professionnelle : le décompte final', reperes: 'Préavis, congé, gratification, retenues', duree: '4h' },
    ],
  },
  {
    ue: 'ue2',
    numeroUE: 2,
    route: '/ue2-droit-societes',
    titre: 'Droit des sociétés',
    libelle: 'UE 2 · Droit des sociétés',
    textes: 'Acte uniforme OHADA révisé relatif au droit des sociétés commerciales et du GIE (30 janvier 2014)',
    presentation: 'Manuel de cours : le droit OHADA des sociétés commerciales, de la constitution à la dissolution, forme par forme.',
    sources: "Acte uniforme OHADA révisé du 30 janvier 2014 relatif au droit des sociétés commerciales et du GIE · Textes d'application RDC (GUCE)",
    accent: { texte: 'text-[#3B3A82]', anneau: 'focus-visible:ring-[#3B3A82]' },
    chapitres: [
      { titre: 'La société commerciale : notion, constitution et naissance', reperes: 'Art. 1–120-5, 242–262 AUSCGIE — OHADA en RDC, GUCE', duree: '5h' },
      { titre: 'La vie financière de la société : comptes, résultat, dividendes et appel au public', reperes: 'Art. 81–96-1, 137–149, 263–269-7 AUSCGIE', duree: '4h' },
      { titre: 'Les sociétés de personnes : SNC et SCS', reperes: 'Art. 270–308 AUSCGIE — intuitu personae', duree: '3h' },
      { titre: 'Les sociétés par actions : SA et SAS', reperes: 'Art. 385–515, 694–743, 853-1–853-23 AUSCGIE', duree: '5h' },
      { titre: 'La société à responsabilité limitée (SARL)', reperes: 'Art. 309–384 AUSCGIE — capital libre en RDC', duree: '5h' },
      { titre: "Le groupement d'intérêt économique (GIE)", reperes: 'Art. 869–885 AUSCGIE — ni société ni association', duree: '4h' },
      { titre: 'Les dirigeants sociaux : pouvoirs et responsabilités', reperes: 'Art. 121–124, 159–172, 886–905 AUSCGIE · AUPCAP', duree: '5h' },
      { titre: 'Les associés, les assemblées et le capital', reperes: 'Art. 51–66, 125–136, 516–640, 764–778-2 AUSCGIE', duree: '5h' },
      { titre: 'Transformations, restructurations, groupes et prévention des difficultés', reperes: 'Art. 150–158-1, 173–199, 671–693-1 AUSCGIE · AUPCAP', duree: '5h' },
      { titre: 'Dissolution, liquidation et nullités', reperes: 'Art. 200–256, 901–904 AUSCGIE', duree: '5h' },
      { titre: 'La société en participation et la société de fait', reperes: 'Art. 114–115, 854–868 AUSCGIE', duree: '4h' },
    ],
  },
  {
    ue: 'ue3',
    numeroUE: 3,
    route: '/ue3-compta-societes',
    titre: 'Comptabilité des sociétés',
    libelle: 'UE 3 · Comptabilité des sociétés',
    textes: 'AUSCGIE (Acte uniforme révisé du 30 janvier 2014) · SYSCOHADA révisé (AUDCIF)',
    presentation: 'Manuel de cours : la vie comptable des sociétés commerciales OHADA, de la constitution à la liquidation — apports, capital, résultat, obligations, fusions.',
    sources: "Acte uniforme révisé relatif au droit des sociétés commerciales et du GIE (30 janvier 2014) · SYSCOHADA révisé — Guide d'application (AUDCIF)",
    accent: { texte: 'text-[#1E4A3D]', anneau: 'focus-visible:ring-[#1E4A3D]' },
    chapitres: [
      { titre: 'La constitution des sociétés : apports et comptabilisation', reperes: 'AUSCGIE art. 37–70, 97–113, 269-1 s. · AUDCIF art. 36 · App. 58–59', duree: '6h' },
      { titre: 'La constitution selon la forme sociale : SARL, SA, SAS et incidents de libération', reperes: 'AUSCGIE art. 309–316, 385–413, 774–777, 853-1 s., 886–888', duree: '5h' },
      { titre: "L'affectation du résultat et la distribution des dividendes", reperes: 'AUSCGIE art. 137–146, 346–349, 546 · App. 65 · loi 23/053 (IS, retenue 20 %)', duree: '4h' },
      { titre: "L'augmentation de capital", reperes: 'AUSCGIE art. 358–363, 562–626-6 · App. 60, 61, 76, 77', duree: '5h' },
      { titre: "La réduction et l'amortissement du capital", reperes: 'AUSCGIE art. 366–373, 627–669 · App. 62–64 · loi 23/053 art. 74', duree: '4h' },
      { titre: "L'emprunt obligataire", reperes: 'AUSCGIE art. 779–822-15 · AUDCIF ch. 20 · App. 78–80 · loi 23/053 (retenue 20 %)', duree: '5h' },
      { titre: "L'évaluation des titres sociaux et le portefeuille-titres", reperes: 'AUSCGIE art. 59, 173–180 · AUDCIF ch. 13 · App. 48–51 · loi 23/053 (mère-fille)', duree: '4h' },
      { titre: 'Les fusions et opérations assimilées', reperes: 'AUSCGIE art. 189–199, 670–689 · AUDCIF ch. 38 · App. 116–120 · loi 23/053 art. 54', duree: '6h' },
      { titre: 'La dissolution et la liquidation', reperes: 'AUSCGIE art. 200–241, 902–904 · AUDCIF ch. 40 · App. 122 · loi 23/053 art. 11, 13', duree: '4h' },
      { titre: 'Sociétés particulières : participation, sociétés de fait, GIE, transformation', reperes: 'AUSCGIE art. 181–188, 854–885 · AUDCIF ch. 26 et 33 · App. 96–97, 106–107 · loi 23/053', duree: '4h' },
    ],
  },
  {
    ue: 'ue5',
    numeroUE: 5,
    route: '/ue5-finances-publiques',
    titre: 'Finances publiques',
    libelle: 'UE 5 · Finances publiques',
    textes: 'LOFIP n° 11/011 du 13 juillet 2011 (mod. 2018 et 2023) · Constitution RDC 2006 · RGCP, décret n° 24/10 du 14 octobre 2024',
    presentation: "Manuel de cours : le droit budgétaire et la comptabilité publique de la RDC, des principes budgétaires au contrôle de l'exécution.",
    objectifs: [
      'Définir les notions fondamentales des finances publiques et situer leur cadre constitutionnel en RDC',
      'Expliquer et appliquer les principes budgétaires consacrés par la LOFIP',
      "Analyser la structure et la présentation du budget de l'État congolais",
      "Comprendre le processus d'élaboration, de vote et d'adoption des lois de finances",
      'Décrire la chaîne de la dépense publique et les acteurs impliqués',
      'Identifier les mécanismes de contrôle interne et externe des finances publiques',
    ],
    sources: 'Constitution du 18 février 2006 · LOFIP n° 11/011 du 13 juillet 2011 · RGCP (décret n° 24/10 du 14 octobre 2024) · Lois de finances annuelles',
    accent: { texte: 'text-[#1F5A63]', anneau: 'focus-visible:ring-[#1F5A63]' },
    chapitres: [
      { titre: 'Introduction aux finances publiques', reperes: 'LOFIP art. 1–3 · Constitution art. 122, 174, 175', duree: '3h' },
      { titre: 'Les principes budgétaires', reperes: 'LOFIP art. 4–11 : annualité, unité, universalité', duree: '5h' },
      { titre: "Structure et présentation du budget de l'État", reperes: 'LOFIP art. 16–32, 36–41', duree: '5h' },
      { titre: 'Budget-programme et gestion par la performance', reperes: 'LOFIP art. 43–45, 75–82', duree: '4h' },
      { titre: 'Élaboration et adoption du budget', reperes: 'LOFIP art. 76–87 : calendrier budgétaire', duree: '5h' },
      { titre: 'Exécution des recettes publiques', reperes: 'LOFIP art. 88–94 · RGCP', duree: '4h' },
      { titre: 'Exécution des dépenses : la chaîne de la dépense', reperes: 'LOFIP art. 88–115 · RGCP', duree: '5h' },
      { titre: 'La décentralisation budgétaire', reperes: 'LOFIP parties 3 et 4 · Constitution art. 175', duree: '5h' },
      { titre: 'Le contrôle des finances publiques', reperes: 'LOFIP art. 111–132 · Constitution art. 178–180', duree: '5h' },
      { titre: 'Réformes et actualité des finances publiques', reperes: 'Lois de finances 2025–2026 · Cour des comptes', duree: '4h' },
    ],
  },
  {
    ue: 'ue13',
    numeroUE: 13,
    route: '/ue13-ifrs-ias',
    titre: 'Normes comptables internationales IAS/IFRS',
    libelle: 'UE 13 · IAS/IFRS',
    textes: 'Normes IAS/IFRS et interprétations IFRIC · Articulation avec le SYSCOHADA révisé (AUDCIF)',
    presentation: 'Manuel de cours : les normes IFRS appliquées aux entreprises, norme par norme, avec leurs écarts avec le SYSCOHADA révisé.',
    sources: 'IFRS Foundation — normes IAS/IFRS et interprétations IFRIC · Acte uniforme relatif au droit comptable et à l\'information financière (AUDCIF)',
    accent: { texte: 'text-[#1F4E79]', anneau: 'focus-visible:ring-[#1F4E79]' },
    chapitres: [
      { titre: 'Fondements, cadre conceptuel et architecture des IFRS', reperes: 'Cadre conceptuel · IAS 1 · IAS 8 · IFRS 13 · IFRIC 21 · AUDCIF art. 8', duree: '9h' },
      { titre: 'Immobilisations corporelles et incorporelles', reperes: 'IAS 16 · IAS 38 · IAS 23 · IFRIC 1 · IFRIC 20 · AUDCIF art. 62–65', duree: '9h' },
      { titre: 'Dépréciation des actifs et immeubles de placement', reperes: 'IAS 36 · IAS 40 · IFRS 5 · AUDCIF art. 42–46', duree: '8h' },
      { titre: 'Stocks, créances et instruments financiers', reperes: 'IAS 2 · IFRS 9 · IAS 32 · AUDCIF art. 44', duree: '9h' },
      { titre: 'Produits des contrats avec les clients et subventions publiques', reperes: 'IFRS 15 · IAS 20 · IAS 37 § 66–69', duree: '8h' },
      { titre: 'Impôts différés, monnaies étrangères et avantages du personnel', reperes: 'IAS 12 · IAS 21 · IAS 19 · AUDCIF art. 17', duree: '10h' },
      { titre: 'Première adoption des IFRS et IFRS pour les PME', reperes: 'IFRS 1 · IFRS pour les PME (3e éd.) · AUDCIF art. 8, 75 et 113', duree: '9h' },
      { titre: 'Présentation des états financiers et méthodes comptables', reperes: 'IAS 1 · IFRS 18 · IAS 7 · IAS 8 · IAS 10', duree: '10h' },
    ],
  },
]

/** Adresses (sans « / ») des cours système qui ont une page : les modules
 *  rédigés ci-dessus, plus les espaces à outils de l'UE 4 et de l'UE 9.
 *  Seule source : Mes cours et le menu latéral en tenaient chacun une copie. */
export const ROUTES_COURS: string[] = [...MODULES.map(m => m.route.slice(1)), 'comptabilite-generale', 'fiscalite']

/** Adresse d'un chapitre (/ue3/chapitre-7). Groupes nommés lus par wouter
 *  comme paramètres de route : params.ue et params.numero. */
export const ROUTE_CHAPITRE = /^\/(?<ue>ue\d+)\/chapitre-(?<numero>\d+)\/?$/

export function moduleDe(ue: string): ModuleCours | undefined {
  return MODULES.find(m => m.ue === ue)
}

export function moduleParRoute(route: string): ModuleCours | undefined {
  return MODULES.find(m => m.route === route)
}

/** Titre d'un chapitre, lu dans le registre. Lève une erreur si le chapitre n'y
 *  figure pas : un fichier de chapitre non inscrit se voit dès la compilation
 *  du module, pas en production. */
export function titreChapitre(ue: string, numero: number): string {
  const entree = moduleDe(ue)?.chapitres[numero - 1]
  if (!entree) throw new Error(`Chapitre ${ue}/${numero} absent du registre des modules`)
  return entree.titre
}
