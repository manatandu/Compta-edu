/**
 * ═══════════════════════════════════════════════════════════════════
 *  CAMPUS OHADA : Générateur de statuts SARL
 *  Fichier : lib/generateStatuts.ts
 *
 *  Génère les statuts complets d'une SARL conformément au modèle
 *  officiel OHADA (AUSCGIE 2014), adapté au droit RDC.
 *  Export : PDF (jspdf) et DOCX (docx)
 *
 *  Structure : 27 articles répartis en 4 titres :
 *  Titre I   : Forme – Objet – Dénomination – Durée – Siège (Art. 1–6)
 *  Titre II  : Administration (Art. 7–17)
 *  Titre III : Décisions des associés (Art. 18–22)
 *  Titre IV  : Comptes – Résultats – Dissolution (Art. 23–27)
 * ═══════════════════════════════════════════════════════════════════
 */

// ─── Types partagés avec SimulateurConstitution ───────────────────────────────

export interface AssocieExport {
  nom: string
  typeApport: 'numeraire' | 'nature' | 'industrie'
  montant: number   // CDF
  description: string
  parts: number
  pct: string
}

export interface StatutsData {
  forme: string
  denomination: string
  objet: string
  siege: string
  duree: number
  capitalCDF: number
  capitalFCFA: number
  valeurNominaleCDF: number
  valeurNominaleFCFA: number
  nbParts: number
  associes: AssocieExport[]
  taux: number      // 1 FCFA = X CDF
  dateGeneration: string
  gerantNom?: string
  gerantNationalite?: string
  gerantAdresse?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

// Formatage pour PDF : utilise un espace simple (pas d'espace insécable)
// toLocaleString('fr-FR') produit \u00A0 qui s'affiche en '/' dans jsPDF
function fmtNum(n: number): string {
  return Math.round(n).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
}
function fmtCDF(n: number) {
  return fmtNum(n) + ' CDF'
}
function fmtFCFA(n: number) {
  return fmtNum(n) + ' FCFA'
}
function placeholder(label: string) {
  return `[${label}]`
}

// ─── Génération du texte des statuts (commun PDF + DOCX) ─────────────────────

export function buildStatutsText(d: StatutsData): { titre: string; articles: { num: string; intitule: string; texte: string }[] }[] {

  const nomSociete = d.denomination || placeholder('DÉNOMINATION SOCIALE')
  const objetSocial = d.objet || placeholder('INDIQUER L\'OBJET SOCIAL')
  const siege = d.siege || placeholder('INDIQUER L\'ADRESSE PHYSIQUE DU SIÈGE : PAS DE BOÎTE POSTALE')
  const duree = d.duree || placeholder('DURÉE EN ANNÉES')
  const forme = d.forme || 'SARL'

  // Table des apports
  const lignesApports = d.associes.map(a => {
    if (a.typeApport === 'industrie') {
      return `- ${a.nom || placeholder('NOM ASSOCIÉ')} : apport en industrie (${a.description || placeholder('DESCRIPTION')}) : ${a.parts} part(s) sans valeur capitalistique (Art. 50-3 AUSCGIE)`
    }
    return `- ${a.nom || placeholder('NOM ASSOCIÉ')} : ${a.typeApport === 'numeraire' ? 'apport en numéraire' : 'apport en nature'} de ${fmtCDF(a.montant)} (≈ ${fmtFCFA(Math.round(a.montant / d.taux))}) : ${fmtNum(a.parts)} part(s) : ${a.pct}%`
  }).join('\n')

  const repartition = d.associes.map(a =>
    `- ${a.nom || placeholder('NOM ASSOCIÉ')} : ${a.typeApport !== 'industrie' ? fmtNum(a.parts) : '(industrie)'} part(s)`
  ).join('\n')

  return [
    {
      titre: 'TITRE PREMIER : Forme – Objet – Dénomination sociale – Durée – Exercice social – Siège',
      articles: [
        {
          num: 'Article 1',
          intitule: 'Forme',
          texte: `Il est formé entre les soussignés une société à responsabilité limitée qui sera régie par les présents statuts, par l'Acte uniforme relatif au droit des sociétés commerciales et du GIE (AUSCGIE 2014) et ses textes d'application, notamment l'Arrêté interministériel n° 002 & 243 du 30 décembre 2014 de la République Démocratique du Congo, et par les protocoles d'accord régulièrement passés entre les parties.`,
        },
        {
          num: 'Article 2',
          intitule: 'Objet social',
          texte: `La société a pour objet en République Démocratique du Congo et à l'étranger :\n\n${objetSocial}\n\nle tout directement ou indirectement pour son compte ou pour le compte de tiers, soit seul, soit avec des tiers par voie de création de sociétés nouvelles, d'apport, de fusion, de société en participation ou de prise de dation en location ou de gérance de tous biens ou de droits ou autrement ;\n\nd'une manière générale, toutes opérations commerciales, industrielles et financières, mobilières, immobilières pouvant se rattacher directement ou indirectement à l'objet social ou à tous objets similaires ou connexes.`,
        },
        {
          num: 'Article 3',
          intitule: 'Dénomination sociale',
          texte: `La société prend pour dénomination sociale « ${nomSociete} ».\n\nDans les actes, factures, annonces, publications et autres documents de toute nature émanant de la société, la dénomination sociale doit être précédée ou suivie des mots écrits lisiblement et en toutes lettres « Société à Responsabilité Limitée » et de l'indication du capital social.\n\nCette dénomination sociale pourra être modifiée en vertu d'une délibération des associés.`,
        },
        {
          num: 'Article 4',
          intitule: 'Siège social',
          texte: `Le siège social est fixé à : ${siege}.\n\nIl pourra être transféré en tout autre lieu de la République Démocratique du Congo en vertu d'une délibération des associés.`,
        },
        {
          num: 'Article 5',
          intitule: 'Durée',
          texte: `La durée de la société est fixée à ${duree} ans à compter de la date de son immatriculation au Registre du Commerce et du Crédit Mobilier (RCCM), sauf en cas de dissolution anticipée ou de prorogation.`,
        },
        {
          num: 'Article 6',
          intitule: 'Apports – Capital et parts sociales',
          texte: `Les associés apportent à la société les sommes et biens suivants :\n\n${lignesApports}\n\nSoit au total un capital social de ${fmtCDF(d.capitalCDF)} (équivalent ≈ ${fmtFCFA(d.capitalFCFA)}, au taux indicatif de 1 FCFA = ${d.taux.toFixed(2)} CDF en vigueur à la date de constitution).\n\nNote : Conformément à l'Arrêté interministériel RDC n° 002 & 243 du 30/12/2014, le capital social de la SARL est librement fixé par les associés en tenant compte de l'objet social. Aucun minimum légal n'est exigé en RDC.\n\nLe capital social est divisé en ${fmtNum(d.nbParts)} parts sociales d'une valeur nominale de ${fmtCDF(d.valeurNominaleCDF)} (≈ ${fmtFCFA(d.valeurNominaleFCFA)}) chacune, entièrement souscrites et réparties entre les associés comme suit :\n\n${repartition}\n\nTotal : ${fmtNum(d.nbParts)} parts sociales.\n\nConformément à l'article 313 de l'AUSCGIE, les associés sont tenus de libérer au minimum un quart (1/4) du capital souscrit à la souscription, soit ${fmtCDF(Math.ceil(d.capitalCDF * 0.25))}. Le solde devra être libéré dans un délai de deux (2) ans à compter de l'immatriculation.`,
        },
      ],
    },
    {
      titre: 'TITRE II : Administration de la société',
      articles: [
        {
          num: 'Article 7',
          intitule: 'Augmentation ou réduction du capital',
          texte: `Le capital peut être augmenté ou réduit dans les conditions et suivant les modalités fixées par les textes en vigueur en République Démocratique du Congo et par l'Acte uniforme relatif au droit des sociétés commerciales.\n\nToute personne entrant dans la société devra être agréée par les associés.`,
        },
        {
          num: 'Article 8',
          intitule: 'Parts sociales',
          texte: `Les parts sociales ne peuvent être représentées par des titres négociables. Chaque associé dispose d'un nombre de voix égal au nombre de parts sociales qu'il possède.\n\nLes associés ne supportent les pertes qu'à concurrence de leurs apports, sous réserve des dispositions légales rendant temporairement les associés solidairement responsables.`,
        },
        {
          num: 'Article 9',
          intitule: 'Transmission des parts sociales',
          texte: `1) Entre vifs\nLa cession de parts sociales s'opère par acte authentique ou sous seing privé et doit être signifiée à la société ou acceptée par elle et publiée au registre du commerce. Entre associés, ascendants et descendants et entre conjoints, les parts sociales se transmettent librement, à titre gratuit ou onéreux.\nElles ne peuvent être cédées à titre onéreux ou gratuit à des tiers non associés qu'avec le consentement de la majorité des associés représentant au moins les trois quarts (3/4) du capital social.\n\n2) Par décès\nLes parts sociales sont transmises librement par succession au profit du conjoint et/ou des héritiers directs. Tous autres héritiers ou ayant droits ne deviennent associés que s'ils ont reçu l'agrément des associés survivants.\n\n3) Liquidation d'une communauté de biens\nLes parts sont librement transmises, que la liquidation intervienne du vivant des époux ou au décès de l'un d'eux.`,
        },
        {
          num: 'Article 10',
          intitule: 'Décès – incapacité – liquidation de biens – faillite personnelle d\'un associé',
          texte: `Le décès, l'incapacité, la liquidation des biens, ou la faillite personnelle de l'un quelconque des associés n'entraîne pas la dissolution de la société sauf stipulation contraire des statuts, mais si l'un de ces évènements se produit en la personne du gérant, il entraînera cessation de sa fonction de gérant.`,
        },
        {
          num: 'Article 11',
          intitule: 'Convention entre la société et ses associés ou gérants',
          texte: `1) Les conventions intervenues entre la société et l'un de ses gérants ou associés font l'objet d'un rapport spécial de la gérance à l'assemblée des associés qui statue sur ce rapport.\n\n2) A peine de nullité du contrat, il est interdit aux gérants ou associés de contracter, sous quelque forme que ce soit des emprunts auprès de la société ou de se faire consentir un découvert, en compte courant ou autrement, ainsi que de faire cautionner ou avaliser par elle leurs engagements envers les tiers. Cette interdiction s'applique également à leurs conjoints, ascendants ou descendants ainsi qu'à toute personne interposée.\n\n3) Les associés peuvent, du consentement de la gérance, laisser ou verser leurs fonds disponibles dans les caisses de la société en compte de dépôt ou compte courant.`,
        },
        {
          num: 'Article 12',
          intitule: 'Nomination du gérant',
          texte: `Le gérant ou les gérants sont nommés dans les statuts ou dans un acte postérieur à la majorité des associés représentant plus de la moitié du capital.\n\nLe premier gérant de la société est : ${d.gerantNom || placeholder('NOM ET PRÉNOM DU GÉRANT')}, de nationalité ${d.gerantNationalite || placeholder('NATIONALITÉ')}, demeurant à ${d.gerantAdresse || placeholder('ADRESSE DU GÉRANT')}.`,
        },
        {
          num: 'Article 13',
          intitule: 'Durée des fonctions',
          texte: `La durée de fonction du ou des gérants est de quatre (4) ans renouvelable, sauf disposition contraire des statuts.`,
        },
        {
          num: 'Article 14',
          intitule: 'Pouvoirs du gérant',
          texte: `Le gérant engage la société, sauf si ses actes ne relèvent pas de l'objet social et que la société prouve que les tiers en avaient connaissance. Il a les pouvoirs les plus étendus pour agir au nom de la société en toutes circonstances, sans avoir à justifier des pouvoirs spéciaux. Il a la signature sociale donnée par la mention de la dénomination sociale avec les mots « Le Gérant ».\n\nToutefois, les emprunts, les achats, échanges et ventes d'établissements commerciaux ou d'immeubles, les hypothèques et nantissements, la fondation de sociétés et tous apports à des sociétés constituées ou à constituer, ainsi que toute prise d'intérêts dans ces sociétés, ne peuvent être faits ou consentis qu'avec l'autorisation des associés.`,
        },
        {
          num: 'Article 15',
          intitule: 'Obligations et responsabilités du gérant',
          texte: `Le gérant peut déléguer les pouvoirs qu'il juge convenables à un ou plusieurs directeurs, associés ou non, pour assurer la direction technique et commerciale des affaires de la société.\n\nLe gérant est responsable individuellement ou solidairement en cas de faute commune envers la société ou envers les tiers, soit des infractions aux dispositions législatives ou réglementaires, soit des violations aux présents statuts, soit des fautes commises dans sa gestion.`,
        },
        {
          num: 'Article 16',
          intitule: 'Cessation de fonctions',
          texte: `Tout gérant, associé ou non, nommé ou non dans les statuts, est révocable par décision de l'assemblée des associés représentant plus de la moitié des parts sociales.`,
        },
        {
          num: 'Article 17',
          intitule: 'Traitement du gérant',
          texte: `Les associés ont la faculté d'allouer au gérant un traitement fixe ou proportionnel ou à la fois fixe et proportionnel dont le montant et les modalités de paiement sont déterminés par décision collective ordinaire des associés ; il a droit en outre au remboursement de ses frais de représentation et de déplacement.\n\nLa fixation de la rémunération du gérant n'est pas soumise au régime des conventions réglementées.`,
        },
      ],
    },
    {
      titre: 'TITRE III : Décisions des associés',
      articles: [
        {
          num: 'Article 18',
          intitule: 'Décisions collectives – forme et modalités',
          texte: `1) La volonté des associés s'exprime par des décisions collectives qualifiées d'extraordinaires quand elles concernent tout objet pouvant entraîner directement ou indirectement une modification des statuts et d'ordinaires dans les autres cas.\n\n2) Ces décisions résultent, au choix de la gérance, d'une assemblée générale ou d'une consultation écrite des associés ; toutefois, la réunion d'une assemblée est obligatoire pour statuer sur l'approbation des comptes de chaque exercice. Elle est convoquée par lettre recommandée avec accusé de réception quinze (15) jours au moins avant la réunion.\n\n3) Tout associé a le droit de participer aux décisions avec un nombre de voix égal au nombre de parts sociales qu'il possède. Tout associé peut se faire représenter par un autre associé, par son conjoint ou par un mandataire même non associé.`,
        },
        {
          num: 'Article 19',
          intitule: 'Décisions collectives ordinaires',
          texte: `Chaque année, dans les six (6) mois de la clôture de l'exercice, les associés sont réunis en assemblée générale annuelle par la gérance pour statuer sur les comptes de l'exercice et l'affectation des résultats.\n\nToutes les décisions collectives ordinaires pour être valables, doivent être adoptées par un ou plusieurs associés représentant plus de la moitié du capital social sur première convocation, ou à la majorité des votes émis quelle que soit la proportion de capital représentée sur seconde convocation.`,
        },
        {
          num: 'Article 20',
          intitule: 'Décisions collectives extraordinaires',
          texte: `Toutes les décisions ayant pour conséquence la modification des statuts sont qualifiées de décisions collectives extraordinaires. Les modifications des statuts sont décidées par les associés représentant au moins les trois quarts (3/4) du capital social.`,
        },
        {
          num: 'Article 21',
          intitule: 'Droit de communication des associés',
          texte: `Tout associé a le droit, à toute époque, de prendre par lui-même et au siège social, connaissance des états financiers de synthèse de l'exercice et du rapport de gestion établi par le gérant, des textes de résolutions proposées et, le cas échéant, du rapport spécial du Commissaire aux Comptes relatif aux conventions intervenues entre la société et un gérant ou un associé.`,
        },
        {
          num: 'Article 22',
          intitule: 'Contrôle des commissaires aux comptes',
          texte: `La collectivité des associés peut, à tout moment, nommer dans les conditions de majorité prévues pour les décisions ordinaires, un ou plusieurs commissaires aux comptes.\n\nEn outre, cette nomination peut être demandée au Président du Tribunal statuant en référé par un ou plusieurs associés représentant au moins le dixième (1/10) du capital.`,
        },
      ],
    },
    {
      titre: 'TITRE IV : Comptes sociaux – Résultats – Dissolution',
      articles: [
        {
          num: 'Article 23',
          intitule: 'Affectation et répartition des bénéfices',
          texte: `Les produits nets de l'exercice déduction faite des frais généraux et autres charges de la société y compris tous amortissements et provisions, constituent des bénéfices nets.\n\nSur le bénéfice de l'exercice, il est prélevé une dotation égale à un dixième (1/10) au moins pour former le fonds de réserve légale. Ce prélèvement cesse d'être obligatoire lorsque la réserve atteint le cinquième (1/5) du capital social.\n\nLe bénéfice distribuable est constitué par le résultat de l'exercice diminué des pertes antérieures et de la réserve légale, augmenté du report bénéficiaire.`,
        },
        {
          num: 'Article 24',
          intitule: 'Dividendes – paiement',
          texte: `Aucun dividende ne peut être mis en paiement avant approbation des comptes et constatation de l'existence des sommes distribuables au moins égales à son montant.\n\nLa mise en paiement de dividende doit intervenir dans le délai maximal de six (6) mois après la tenue de l'assemblée générale.\n\nAucune répétition ne peut être exigée des associés pour un dividende distribué conformément aux présentes dispositions.`,
        },
        {
          num: 'Article 25',
          intitule: 'Perte de la moitié du capital social',
          texte: `Si la société perd la moitié (1/2) de son capital social, le gérant ou le cas échéant le Commissaire aux Comptes est tenu de réunir l'assemblée des associés à l'effet de statuer sur la question de la dissolution anticipée de la société ou sur la poursuite des activités sociales conformément à l'Acte uniforme relatif au droit des sociétés commerciales.`,
        },
        {
          num: 'Article 26',
          intitule: 'Liquidation',
          texte: `A l'expiration de la durée de la société ou en cas de dissolution anticipée pour quelque cause que ce soit, la société est aussitôt mise en liquidation et sa dénomination sociale est dès lors suivie de la mention « société en liquidation ».\n\nLes associés nomment un ou plusieurs liquidateurs à la majorité en capital des associés.`,
        },
        {
          num: 'Article 27',
          intitule: 'Autorisation d\'engagements préalables et/ou postérieurs à la signature des statuts',
          texte: `1. Il a été accompli, dès avant ce jour, pour le compte de la société en formation les actes énoncés dans un état annexé aux présentes, indiquant pour chacun d'eux l'engagement qui en résultera pour la société. Les soussignés, après avoir pris connaissance de cet état, déclarent approuver ces actes et engagements. L'immatriculation de la société au Registre du Commerce et du Crédit Mobilier emportera de plein droit reprise par elle desdits actes et engagements.\n\n2. Les soussignés donnent mandat au gérant à l'effet de conclure pour le compte de la société, en attendant son immatriculation au RCCM, les actes déterminés dont les modalités sont précisées dans un état annexé aux présentes.\n\n3. Dès à présent, le gérant de la société est autorisé à réaliser les actes et engagements rentrant dans le cadre de l'objet social et de ses pouvoirs. Après immatriculation, ces actes et engagements seront soumis aux associés qui statueront aux conditions de majorité propres aux décisions collectives ordinaires.`,
        },
      ],
    },
  ]
}

// ─── Export PDF ───────────────────────────────────────────────────────────────

export async function exportStatutsPDF(d: StatutsData): Promise<void> {
  const { jsPDF } = await import('jspdf')
  const pdf = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  const marginL = 25
  const marginR = 25
  const marginT = 30
  const pageW = 210
  const contentW = pageW - marginL - marginR
  const pageH = 297
  const marginB = 25

  let y = marginT

  // Police : Times (serif : conforme aux statuts officiels)
  pdf.setFont('times', 'normal')

  const addPage = () => {
    pdf.addPage()
    y = marginT
    // Pied de page
    pdf.setFont('times', 'italic')
    pdf.setFontSize(8)
    pdf.setTextColor(120, 120, 120)
    pdf.text(`Statuts générés par CAMPUS OHADA : Document pédagogique : ${d.dateGeneration}`, pageW / 2, pageH - 10, { align: 'center' })
    pdf.setTextColor(0, 0, 0)
    pdf.setFont('times', 'normal')
  }

  const checkPage = (needed: number) => {
    if (y + needed > pageH - marginB) addPage()
  }

  const writeLine = (text: string, size: number, style: 'normal' | 'bold' | 'italic' | 'bolditalic' = 'normal', align: 'left' | 'center' | 'right' = 'left', color: [number, number, number] = [0, 0, 0]) => {
    checkPage(size * 0.5 + 4)
    pdf.setFont('times', style)
    pdf.setFontSize(size)
    pdf.setTextColor(...color)
    const x = align === 'center' ? pageW / 2 : align === 'right' ? pageW - marginR : marginL
    pdf.text(text, x, y, { align })
    y += size * 0.5 + 2
    pdf.setTextColor(0, 0, 0)
  }

  const writeBlock = (text: string, size: number = 12, style: 'normal' | 'bold' | 'italic' = 'normal', indent: number = 0) => {
    pdf.setFont('times', style)
    pdf.setFontSize(size)
    const lines = pdf.splitTextToSize(text, contentW - indent)
    for (const line of lines) {
      checkPage(size * 0.5 + 2)
      pdf.text(line, marginL + indent, y)
      y += size * 0.45 + 1.5
    }
    y += 1
  }

  const space = (mm: number = 4) => { y += mm }

  // ── En-tête ──
  writeLine('RÉPUBLIQUE DÉMOCRATIQUE DU CONGO', 10, 'bold', 'center')
  writeLine('(État Partie au Traité OHADA)', 9, 'italic', 'center')
  space(3)
  writeLine('ACTE UNIFORME RELATIF AU DROIT DES SOCIÉTÉS COMMERCIALES ET DU GIE', 9, 'bold', 'center')
  space(4)
  writeLine(`« ${d.denomination || '[DÉNOMINATION SOCIALE]'} »`, 13, 'bolditalic', 'center')
  space(1)
  writeLine(`SOCIÉTÉ À RESPONSABILITÉ LIMITÉE (SARL)`, 10, 'bold', 'center')
  writeLine(`Capital social : ${fmtCDF(d.capitalCDF)} (≈ ${fmtFCFA(d.capitalFCFA)})`, 10, 'normal', 'center')
  writeLine(`Siège social : ${d.siege || '[INDIQUER LE SIÈGE]'}`, 10, 'normal', 'center')
  space(5)

  // Ligne séparatrice
  pdf.setDrawColor(0)
  pdf.setLineWidth(0.5)
  pdf.line(marginL, y, pageW - marginR, y)
  space(5)

  writeLine('STATUTS', 14, 'bold', 'center')
  space(3)

  writeBlock(`Les soussignés, associés de la société « ${d.denomination || '[DÉNOMINATION]'} », ont établi ainsi qu'il suit les statuts de la société à responsabilité limitée qu'ils ont convenu de constituer.`, 11)
  space(4)

  // Séparatrice
  pdf.line(marginL, y, pageW - marginR, y)
  space(6)

  // ── Titres et articles ──
  const titres = buildStatutsText(d)

  for (const titre of titres) {
    checkPage(20)
    writeLine(titre.titre, 11, 'bold', 'left')
    space(2)

    for (const art of titre.articles) {
      checkPage(16)
      // Numéro + intitulé
      pdf.setFont('times', 'bold')
      pdf.setFontSize(11)
      pdf.text(`${art.num} :`, marginL, y)
      pdf.text(art.intitule, marginL + 28, y)
      y += 7

      // Texte de l'article (paragraphes)
      const paragraphes = art.texte.split('\n\n')
      for (const para of paragraphes) {
        const lines = para.split('\n')
        for (const line of lines) {
          writeBlock(line, 11, 'normal', 5)
        }
        space(2)
      }
      space(2)
    }
    space(3)
  }

  // ── Page de signature ──
  checkPage(80)
  space(4)
  pdf.setDrawColor(0)
  pdf.line(marginL, y, pageW - marginR, y)
  space(6)

  writeLine('SIGNATURES', 12, 'bold', 'center')
  space(4)

  writeBlock(`Fait à ${d.siege ? d.siege.split(',').pop()?.trim() || 'Kinshasa' : 'Kinshasa'}, le ${d.dateGeneration}`, 11)
  space(6)

  writeBlock('En autant d\'originaux que d\'associés, plus un exemplaire pour le dépôt au RCCM et un pour l\'enregistrement.', 11)
  space(8)

  // Colonnes signatures
  const col1 = marginL
  const col2 = pageW / 2 + 5
  const sigY = y

  pdf.setFont('times', 'bold')
  pdf.setFontSize(11)

  d.associes.forEach((a, i) => {
    const x = i % 2 === 0 ? col1 : col2
    const rowY = sigY + Math.floor(i / 2) * 35
    checkPage(40)
    pdf.text(a.nom || `[ASSOCIÉ ${i + 1}]`, x, rowY)
    pdf.setFont('times', 'normal')
    pdf.setFontSize(10)
    pdf.text(`${fmtNum(a.parts)} part(s) : ${a.pct}%`, x, rowY + 5)
    pdf.text(`Lu et approuvé`, x, rowY + 12)
    pdf.line(x, rowY + 22, x + 75, rowY + 22)
    pdf.text('Signature', x, rowY + 28)
    pdf.setFont('times', 'bold')
    pdf.setFontSize(11)
  })

  y = sigY + Math.ceil(d.associes.length / 2) * 35 + 10

  // ── Note pédagogique ──
  checkPage(30)
  space(8)
  pdf.setDrawColor(150, 150, 150)
  pdf.setLineWidth(0.3)
  pdf.line(marginL, y, pageW - marginR, y)
  space(4)
  writeBlock(`Note pédagogique : Document généré par CAMPUS OHADA à des fins d'apprentissage. Ce document est basé sur le modèle officiel OHADA (AUSCGIE 2014) et l'Arrêté interministériel RDC n° 002 & 243 du 30/12/2014. Les mentions entre crochets [  ] doivent être complétées avant toute utilisation juridique. Consulter un notaire ou un avocat avant de signer des statuts définitifs.`, 9, 'italic')

  // Pied de page première page (ajouté après coup)
  pdf.setPage(1)
  pdf.setFont('times', 'italic')
  pdf.setFontSize(8)
  pdf.setTextColor(120, 120, 120)
  pdf.text(`Statuts générés par CAMPUS OHADA : Document pédagogique : ${d.dateGeneration}`, pageW / 2, pageH - 10, { align: 'center' })

  pdf.save(`Statuts-${(d.denomination || 'societe').replace(/\s+/g, '-')}-OHADA.pdf`)
}

// ─── Export DOCX ──────────────────────────────────────────────────────────────

export async function exportStatutsDOCX(d: StatutsData): Promise<void> {
  const {
    Document, Packer, Paragraph, TextRun, HeadingLevel,
    AlignmentType, BorderStyle, Table, TableRow, TableCell,
    WidthType, PageBreak, ShadingType
  } = await import('docx')

  const nomSociete = d.denomination || '[DÉNOMINATION SOCIALE]'

  const titreStyle = (text: string) => new Paragraph({
    children: [new TextRun({ text, bold: true, size: 24, font: 'Times New Roman' })],
    alignment: AlignmentType.CENTER,
    spacing: { after: 120 },
  })

  const sousTitreStyle = (text: string) => new Paragraph({
    children: [new TextRun({ text, bold: true, size: 24, font: 'Times New Roman' })],
    alignment: AlignmentType.LEFT,
    spacing: { before: 240, after: 80 },
    border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: '000000' } },
  })

  const articleTitreStyle = (num: string, intitule: string) => new Paragraph({
    children: [
      new TextRun({ text: `${num} :     `, bold: true, size: 24, font: 'Times New Roman' }),
      new TextRun({ text: intitule, bold: true, size: 24, font: 'Times New Roman' }),
    ],
    spacing: { before: 200, after: 80 },
  })

  const bodyStyle = (text: string, italic = false) => new Paragraph({
    children: [new TextRun({ text, size: 24, italics: italic, font: 'Times New Roman' })],
    alignment: AlignmentType.JUSTIFIED,
    spacing: { after: 120 },
    indent: { left: 360 },
  })

  const buildArticle = (num: string, intitule: string, texte: string) => {
    const paras: any[] = [articleTitreStyle(num, intitule)]
    const paragraphes = texte.split('\n\n')
    for (const para of paragraphes) {
      const lines = para.split('\n')
      for (const line of lines) {
        paras.push(bodyStyle(line))
      }
    }
    return paras
  }

  const titresData = buildStatutsText(d)
  const children: any[] = []

  // ── En-tête ──
  children.push(
    new Paragraph({ children: [new TextRun({ text: 'ACTE UNIFORME RELATIF AU DROIT DES SOCIÉTÉS COMMERCIALES ET DU GIE', bold: true, size: 20, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { after: 80 } }),
    new Paragraph({ children: [new TextRun({ text: 'SOCIÉTÉ À RESPONSABILITÉ LIMITÉE', bold: true, size: 24, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { after: 80 } }),
    new Paragraph({ children: [new TextRun({ text: `« ${nomSociete} »`, bold: true, italics: true, size: 28, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { after: 120 } }),
    new Paragraph({ children: [new TextRun({ text: `AU CAPITAL SOCIAL DE ${fmtCDF(d.capitalCDF)} (≈ ${fmtFCFA(d.capitalFCFA)})`, bold: true, size: 20, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { after: 80 } }),
    new Paragraph({ children: [new TextRun({ text: `SIÈGE SOCIAL : ${d.siege || '[INDIQUER LE SIÈGE]'}`, size: 20, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { after: 80 } }),
    new Paragraph({ children: [new TextRun({ text: 'RÉPUBLIQUE DÉMOCRATIQUE DU CONGO', bold: true, size: 20, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { after: 240 } }),
    new Paragraph({ children: [new TextRun({ text: 'STATUTS', bold: true, size: 32, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { before: 120, after: 240 } }),
    new Paragraph({
      children: [new TextRun({ text: `Les soussignés ont établi ainsi qu'il suit les statuts de la société à responsabilité limitée qu'ils ont convenu de constituer.`, size: 24, font: 'Times New Roman' })],
      alignment: AlignmentType.JUSTIFIED,
      spacing: { after: 360 },
    }),
  )

  // ── Articles ──
  for (const titre of titresData) {
    children.push(sousTitreStyle(titre.titre))
    for (const art of titre.articles) {
      buildArticle(art.num, art.intitule, art.texte).forEach(p => children.push(p))
    }
  }

  // ── Signatures ──
  children.push(
    new Paragraph({ children: [new TextRun({ text: '', size: 24 })], spacing: { after: 240 } }),
    new Paragraph({ children: [new TextRun({ text: 'SIGNATURES', bold: true, size: 24, font: 'Times New Roman' })], alignment: AlignmentType.CENTER, spacing: { after: 240 } }),
    new Paragraph({ children: [new TextRun({ text: `Fait à Kinshasa, le ${d.dateGeneration}`, size: 24, font: 'Times New Roman' })], spacing: { after: 240 } }),
  )

  d.associes.forEach(a => {
    children.push(
      new Paragraph({ children: [new TextRun({ text: a.nom || '[NOM ASSOCIÉ]', bold: true, size: 24, font: 'Times New Roman' })], spacing: { before: 200, after: 40 } }),
      new Paragraph({ children: [new TextRun({ text: `${fmtNum(a.parts)} part(s) : ${a.pct}%`, size: 20, font: 'Times New Roman' })], spacing: { after: 80 } }),
      new Paragraph({ children: [new TextRun({ text: 'Lu et approuvé : Signature : ___________________________', size: 20, font: 'Times New Roman' })], spacing: { after: 200 } }),
    )
  })

  // Note pédagogique
  children.push(
    new Paragraph({ children: [new TextRun({ text: '', size: 24 })], spacing: { after: 240 } }),
    new Paragraph({
      children: [new TextRun({
        text: `Note pédagogique : Document généré par CAMPUS OHADA. Basé sur l'AUSCGIE 2014 et l'Arrêté RDC n° 002 & 243 du 30/12/2014. Les mentions entre crochets [ ] doivent être complétées avant toute utilisation juridique. Consulter un notaire avant de signer des statuts définitifs.`,
        size: 18, italics: true, color: '666666', font: 'Times New Roman',
      })],
      alignment: AlignmentType.JUSTIFIED,
    }),
  )

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: { top: 1134, bottom: 1134, left: 1417, right: 1417 }, // ~2cm
        },
      },
      children,
    }],
  })

  const blob = await Packer.toBlob(doc)
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `Statuts-${(d.denomination || 'societe').replace(/\s+/g, '-')}-OHADA.docx`
  a.click()
  URL.revokeObjectURL(url)
}
