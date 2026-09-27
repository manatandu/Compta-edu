// ─────────────────────────────────────────────────────────────────────────────
// AMORTISSEMENTS FISCAUX - Loi n° 23/053, art. 30 à 38
// Linéaire (art. 30, prorata art. 34), dégressif (art. 31 à 35 : coefficients
// 1,5 / 2 / 2,5, bascule en linéaire) et exceptionnel (art. 36 à 38 : 60 % la
// première année, puis dégressif sur la valeur résiduelle). Extrait de
// pages/ImmobilisationsPage.tsx pour être testé (tests/calculs).
// ─────────────────────────────────────────────────────────────────────────────

export interface LigneAmort {
  exercice: number
  valeurDebut: number    // base amortissable (linéaire) ou VNC initiale (dégressif/exceptionnel)
  valeurOrigine?: number // valeur d'origine fixe (dégressif/exceptionnel uniquement)
  taux: number
  annuite: number
  annuiteLineaireResid?: number  // annuité linéaire résiduelle = VNC ÷ années restantes (dégressif/exceptionnel)
  amortCumule: number
  valeurResiduelle: number
  calcul: string
  bascule?: boolean
}

// Art. 33 Loi IS : coefficients officiels
export function getCoeffDegressif(duree: number): number {
  if (duree < 4) return 0       // exclu
  if (duree <= 4) return 1.5    // 3 à 4 ans → 1,5
  if (duree <= 6) return 2      // 5 à 6 ans → 2
  return 2.5                    // > 6 ans → 2,5
}

// Compte d'amortissement correspondant (OHADA 2017 : comptes à 4 chiffres)
// Source : Plan Comptable OHADA 2017 : Classe 28
export function calculerLineaire(valeur: number, duree: number, moisDebut: number): LigneAmort[] {
  // Art. 30 Loi IS : prorata temporis dès le 1er jour du mois d'acquisition
  // Si moisDebut > 1 : N = prorata, N+1..N+durée-1 = annuités normales, N+durée = solde (report)
  const annuiteBase = valeur / duree
  const taux = Math.round((1 / duree) * 10000) / 100
  const lignes: LigneAmort[] = []
  let cumule = 0
  const moisN1 = 13 - moisDebut  // mois restants en N (ex: juillet → 6 mois)
  const avecProrata = moisDebut > 1

  // Nombre total de lignes = durée (acquisition 1er jan) ou durée + 1 (acquisition en cours d'année)
  const nbLignes = avecProrata ? duree + 1 : duree

  for (let i = 0; i < nbLignes; i++) {
    let annuite: number
    let calcul: string

    if (i === 0) {
      // Année N : prorata temporis
      const annuiteProrata = annuiteBase * (avecProrata ? moisN1 / 12 : 1)
      annuite = Math.round(annuiteProrata)
      calcul = avecProrata
        ? `${valeur.toLocaleString('fr-FR')} × ${taux}% × ${moisN1}/12`
        : `${valeur.toLocaleString('fr-FR')} × ${taux}%`
    } else if (avecProrata && i === nbLignes - 1) {
      // Dernière ligne (N+durée) : solde = complément du prorata initial
      annuite = Math.round(valeur - cumule)
      calcul = `Solde : ${valeur.toLocaleString('fr-FR')} - ${cumule.toLocaleString('fr-FR')}`
    } else {
      // Années intermédiaires : annuité normale complète
      annuite = Math.round(annuiteBase)
      calcul = `${valeur.toLocaleString('fr-FR')} × ${taux}%`
    }

    // En linéaire, la base amortissable est CONSTANTE = valeur d'origine (Art. 45 AUDCIF)
    cumule += annuite
    lignes.push({
      exercice: i + 1,
      valeurDebut: Math.round(valeur),  // base amortissable constante
      taux,
      annuite,
      amortCumule: cumule,
      valeurResiduelle: Math.max(0, Math.round(valeur - cumule)),
      calcul,
    })
  }
  return lignes
}

// dureeNormale : durée normale d'utilisation du bien (Art. 33 Loi 23/053), qui sert
// à choisir le coefficient (1,5 / 2 / 2,5) et le taux linéaire de base. Distincte du
// paramètre `duree`, qui ne fixe que le nombre de périodes à calculer dans cet appel :
// pour un dégressif ordinaire les deux coïncident, mais pour la phase dégressive de
// l'amortissement exceptionnel (Art. 38.2, calculerExceptionnel ci-dessous), il ne
// reste que duree-1 périodes à calculer alors que le coefficient doit rester celui de
// la durée normale d'origine (duree). Sans ce paramètre distinct, un bien de 4 ans
// perdait son éligibilité au dégressif dès la 2e année de son régime exceptionnel
// (getCoeffDegressif(4-1=3) renvoie 0, "exclu"), ce qui annulait à tort l'amortissement
// de cette année-là.
export function calculerDegressif(valeur: number, duree: number, moisDebut: number, dureeNormale: number = duree): LigneAmort[] {
  const coeff = getCoeffDegressif(dureeNormale)
  const tauxLineaire = 1 / dureeNormale
  const tauxDegressif = tauxLineaire * coeff
  const lignes: LigneAmort[] = []
  let valResid = valeur
  let cumule = 0
  const moisN1 = 13 - moisDebut
  let basculeFaite = false        // flag : bascule déjà effectuée
  let baseLineaireFigee = 0       // VNC au moment de la bascule
  let annuiteLineaireFixe = 0     // annuité CONSTANTE après bascule = baseLineaireFigee ÷ anneesRestantesAuMomentBascule
  let anneesRestantesBascule = 0  // nombre d'années restantes au moment exact de la bascule

  for (let i = 0; i < duree; i++) {
    const anneeRestante = duree - i
    const annuiteLineaireRestante = valResid / anneeRestante
    const annuiteDeg = valResid * tauxDegressif * (i === 0 ? moisN1 / 12 : 1)
    const basculeIci = !basculeFaite && annuiteDeg < annuiteLineaireRestante && i > 0
    if (basculeIci) {
      basculeFaite = true
      baseLineaireFigee = Math.round(valResid)         // VNC figee au moment de la bascule
      anneesRestantesBascule = anneeRestante            // nb années restantes au moment de la bascule
      annuiteLineaireFixe = Math.round(baseLineaireFigee / anneesRestantesBascule)  // annuité CONSTANTE
    }
    // Après bascule : annuité = CONSTANTE (baseLineaireFigee ÷ anneesRestantesAuMomentBascule)
    const annuite = basculeFaite ? annuiteLineaireFixe : Math.round(annuiteDeg)
    const valDebut = basculeFaite ? baseLineaireFigee : Math.round(valResid)
    cumule += annuite
    const vnc = Math.max(0, Math.round(valResid) - annuite)
    // Annuité linéaire résiduelle visible dans le tableau pour comparaison
    const annuiteLinResid = Math.round(annuiteLineaireRestante)

    lignes.push({
      exercice: i + 1,
      valeurDebut: valDebut,
      valeurOrigine: valeur,
      taux: basculeFaite
        ? Math.round((1 / anneesRestantesBascule) * 10000) / 100
        : Math.round(tauxDegressif * 10000) / 100,
      annuite,
      annuiteLineaireResid: annuiteLinResid,
      amortCumule: cumule,
      valeurResiduelle: vnc,
      calcul: basculeIci
        ? `Bascule linéaire : ${baseLineaireFigee.toLocaleString('fr-FR')} ÷ ${anneesRestantesBascule}`
        : basculeFaite
          ? `${baseLineaireFigee.toLocaleString('fr-FR')} ÷ ${anneesRestantesBascule}`
          : i === 0
            ? `${Math.round(valResid).toLocaleString('fr-FR')} × ${(tauxDegressif * 100).toFixed(2)}% × ${moisN1}/12`
            : `${Math.round(valResid).toLocaleString('fr-FR')} × ${(tauxDegressif * 100).toFixed(2)}%`,
      bascule: basculeFaite,
    })
    valResid = Math.max(0, valResid - annuite)
  }

  // Prorata temporis : si acquisition en cours d'année, ajouter une ligne de solde (N+durée)
  if (moisDebut > 1 && Math.round(valResid) > 0) {
    const solde = Math.round(valResid)
    const valDebut = basculeFaite ? baseLineaireFigee : solde
    cumule += solde
    lignes.push({
      exercice: duree + 1,
      valeurDebut: valDebut,
      valeurOrigine: valeur,
      taux: basculeFaite ? 0 : Math.round(tauxDegressif * 10000) / 100,
      annuite: solde,
      amortCumule: cumule,
      valeurResiduelle: 0,
      calcul: `Solde prorata : ${solde.toLocaleString('fr-FR')}`,
      bascule: basculeFaite,
    })
  }
  return lignes
}

export function calculerExceptionnel(valeur: number, duree: number, moisDebut: number): LigneAmort[] {
  const moisN1 = 13 - moisDebut
  const lignes: LigneAmort[] = []
  const annee1 = Math.round(valeur * 0.60 * (moisN1 / 12))
  let cumule = annee1
  lignes.push({
    exercice: 1,
    valeurDebut: valeur,
    valeurOrigine: valeur,
    taux: 60,
    annuite: annee1,
    annuiteLineaireResid: Math.round(valeur / duree),  // linéaire résiduel année 1
    amortCumule: annee1,
    valeurResiduelle: Math.max(0, valeur - annee1),
    calcul: `${valeur.toLocaleString('fr-FR')} × 60% × ${moisN1}/12`,
  })

  // Dégressif sur le résiduel (40%)
  const residuel = valeur - annee1
  if (residuel > 0 && duree > 1) {
    const degressifLignes = calculerDegressif(residuel, duree - 1, 1, duree)
    for (const l of degressifLignes) {
      cumule += l.annuite
      lignes.push({
        ...l,
        exercice: l.exercice + 1,
        valeurOrigine: valeur,  // valeur d'origine du bien initial (fixe)
        amortCumule: cumule,
        valeurResiduelle: Math.max(0, valeur - cumule),
      })
    }
  }
  return lignes
}

