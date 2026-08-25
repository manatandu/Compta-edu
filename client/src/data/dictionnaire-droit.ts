// ═══════════════════════════════════════════════════════════════════
//  DICTIONNAIRE ORBIT — Domaine « Droit »
//
//  Deux sources : l'AUSCGIE (Acte uniforme OHADA relatif au droit des
//  sociétés commerciales et du GIE, 30/01/2014) pour le droit des
//  sociétés, et la Loi n° 015/2002 du 16 octobre 2002 portant Code du
//  travail (telle que modifiée par la Loi n° 16/010 du 15 juillet 2016)
//  pour le droit du travail. Chaque définition cite l'article exact.
// ═══════════════════════════════════════════════════════════════════
import type { TermeDict } from './dictionnaire'

export const TERMES_DROIT: TermeDict[] = [
  {
    id: 'societe-commerciale-auscgie',
    terme: 'Société commerciale (AUSCGIE)',
    domaine: 'droit',
    ues: ['ue2-droit-societes'],
    definition: "Créée par deux ou plusieurs personnes qui conviennent, par un contrat, d'affecter à une activité des biens en numéraire ou en nature, ou de l'industrie, dans le but de partager le bénéfice ou de profiter de l'économie qui peut en résulter. Les associés s'engagent à contribuer aux pertes dans les conditions prévues par l'Acte uniforme. Elle peut aussi être créée, dans les cas prévus par le texte, par une seule personne, dénommée « associé unique », par un acte écrit.",
    source: 'Art. 4 et 5, AUSCGIE (Acte uniforme OHADA du 30 janvier 2014)',
    voirAussi: ['personnalite-juridique-auscgie', 'caractere-commercial-auscgie'],
  },
  {
    id: 'caractere-commercial-auscgie',
    terme: "Caractère commercial d'une société (AUSCGIE)",
    domaine: 'droit',
    ues: ['ue2-droit-societes'],
    definition: "Le caractère commercial d'une société est déterminé par sa forme ou par son objet. Sont commerciales à raison de leur forme, et quel que soit leur objet, les sociétés en nom collectif, les sociétés en commandite simple, les sociétés à responsabilité limitée, les sociétés anonymes et les sociétés par actions simplifiées.",
    source: 'Art. 6, AUSCGIE',
    voirAussi: ['societe-commerciale-auscgie'],
  },
  {
    id: 'personnalite-juridique-auscgie',
    terme: 'Personnalité juridique (AUSCGIE)',
    domaine: 'droit',
    ues: ['ue2-droit-societes'],
    definition: "Toute société jouit de la personnalité juridique à compter de son immatriculation au registre du commerce et du crédit mobilier (RCCM), à l'exception de la société en participation qui n'a pas la personnalité juridique et n'est, de ce fait, jamais immatriculée.",
    source: 'Art. 97 et 98, AUSCGIE',
    voirAussi: ['societe-commerciale-auscgie'],
  },
  {
    id: 'gie-auscgie',
    terme: "Groupement d'intérêt économique (GIE)",
    domaine: 'droit',
    ues: ['ue2-droit-societes'],
    definition: "Le groupement d'intérêt économique jouit de la personnalité morale et de la pleine capacité à compter de son immatriculation au registre du commerce et du crédit mobilier. Il met en œuvre pour une durée déterminée tous les moyens propres à faciliter ou à développer l'activité économique de ses membres, à améliorer ou à accroître les résultats de cette activité, sans réaliser de bénéfices pour lui-même.",
    source: 'AUSCGIE, Partie 2, Livre 6 (Groupements d\'intérêt économique)',
    voirAussi: ['personnalite-juridique-auscgie'],
  },
  {
    id: 'travailleur-ct',
    terme: 'Travailleur (Code du travail RDC)',
    domaine: 'droit',
    ues: ['ue1-droit-travail'],
    definition: "Toute personne physique en âge de contracter, quels que soient son sexe, son état civil et sa nationalité, qui s'est engagée à mettre son activité professionnelle, moyennant rémunération, sous la direction et l'autorité d'une personne physique ou morale, publique ou privée, dans les liens d'un contrat de travail. Pour la détermination de la qualité de travailleur, il n'est tenu compte ni du statut juridique de l'employeur, ni de celui de l'employé.",
    source: 'Art. 7, 1°, Loi n° 015/2002 du 16 octobre 2002 (Code du travail), modifié par la Loi n° 16/010 du 15 juillet 2016',
    voirAussi: ['contrat-travail-ct', 'employeur-ct'],
  },
  {
    id: 'employeur-ct',
    terme: 'Employeur (Code du travail RDC)',
    domaine: 'droit',
    ues: ['ue1-droit-travail'],
    definition: "Toute personne physique ou morale, de droit public ou privé, qui utilise les services d'un ou de plusieurs travailleurs en vertu d'un contrat de travail.",
    source: 'Art. 7, 2°, Loi n° 015/2002',
    voirAussi: ['travailleur-ct', 'contrat-travail-ct'],
  },
  {
    id: 'contrat-travail-ct',
    terme: 'Contrat de travail (Code du travail RDC)',
    domaine: 'droit',
    ues: ['ue1-droit-travail'],
    definition: "Toute convention, écrite ou verbale, par laquelle une personne, le travailleur, s'engage à fournir à une autre personne, l'employeur, un travail manuel ou autre sous la direction et l'autorité directe ou indirecte de celui-ci et moyennant rémunération. Tout contrat de travail est à durée déterminée ou à durée indéterminée.",
    source: 'Art. 7, 3°, Loi n° 015/2002',
    voirAussi: ['travailleur-ct', 'employeur-ct', 'preavis-ct'],
  },
  {
    id: 'remuneration-ct',
    terme: 'Rémunération (Code du travail RDC)',
    domaine: 'droit',
    ues: ['ue1-droit-travail', 'fiscalite'],
    definition: "Somme représentative de l'ensemble des gains susceptibles d'être évalués en espèces et fixés par un accord ou par les dispositions légales ou réglementaires qui sont dus en vertu d'un contrat de travail, par un employeur à un travailleur. Elle comprend notamment le salaire ou traitement, les commissions, l'indemnité de vie chère, les primes, la participation aux bénéfices, les gratifications, la valeur des avantages en nature et l'allocation de congé.",
    source: 'Art. 7, 8°, Loi n° 015/2002',
    voirAussi: ['contrat-travail-ct', 'assiette-securite-sociale'],
  },
  {
    id: 'preavis-ct',
    terme: 'Préavis de résiliation (Code du travail RDC)',
    domaine: 'droit',
    ues: ['ue1-droit-travail'],
    definition: "Délai minimal de quatorze jours ouvrables, à dater du lendemain de la notification, lorsque le préavis est donné par l'employeur pour un contrat à durée indéterminée — augmenté de sept jours ouvrables par année entière de services continus. Le préavis donné par le travailleur est égal à la moitié de celui que l'employeur aurait dû observer. La rupture sans préavis, ou sans que le préavis ait été intégralement observé, oblige la partie responsable à verser une indemnité correspondant à la rémunération et aux avantages dont aurait bénéficié l'autre partie durant le délai non respecté.",
    source: 'Art. 63 et 64, Loi n° 015/2002',
    voirAussi: ['contrat-travail-ct', 'licenciement-ct'],
  },
  {
    id: 'licenciement-ct',
    terme: 'Résiliation sans motif valable (licenciement abusif)',
    domaine: 'droit',
    ues: ['ue1-droit-travail'],
    definition: "La résiliation sans motif valable du contrat à durée indéterminée donne droit, pour le travailleur, à une réintégration. À défaut de celle-ci, le travailleur a droit à des dommages-intérêts fixés par le tribunal du travail, calculés en tenant compte de la nature des services engagés, de l'ancienneté, de l'âge et des droits acquis du travailleur, sans pouvoir excéder 36 mois de sa dernière rémunération.",
    source: 'Art. 63, Loi n° 015/2002',
    voirAussi: ['preavis-ct'],
  },
  {
    id: 'contrat-duree-determinee-ct',
    terme: 'Contrat à durée déterminée (Code du travail RDC)',
    domaine: 'droit',
    ues: ['ue1-droit-travail'],
    definition: "Le contrat à durée déterminée prend fin à l'expiration du terme fixé par les parties. Toute clause insérée dans un tel contrat prévoyant le droit d'y mettre fin par préavis est nulle de plein droit. Toute rupture prononcée en violation de cette règle donne lieu à des dommages-intérêts : lorsque la rupture irrégulière est le fait de l'employeur, ils correspondent aux salaires et avantages dont le travailleur aurait bénéficié jusqu'au terme du contrat.",
    source: 'Art. 69 et 70, Loi n° 015/2002',
    voirAussi: ['contrat-travail-ct'],
  },
  {
    id: 'contrat-apprentissage-ct',
    terme: "Contrat d'apprentissage (Code du travail RDC)",
    domaine: 'droit',
    ues: ['ue1-droit-travail'],
    definition: "Contrat par lequel une personne physique ou morale, le maître d'apprentissage, s'oblige à donner ou à faire donner une formation professionnelle méthodique et complète à une personne, l'apprenti, et par lequel ce dernier s'oblige en retour à se conformer aux instructions qu'il recevra et à exécuter les ouvrages qui lui seront confiés en vue de son apprentissage.",
    source: 'Art. 7, 7°, Loi n° 015/2002',
    voirAussi: ['contrat-travail-ct'],
  },
]
