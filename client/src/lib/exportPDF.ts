import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Ecriture } from './db'
import { formatMontant } from './utils'

/**
 * Téléchargement PDF compatible mobile (iOS Safari)
 * Sur iOS, a.click() ne fonctionne pas : on ouvre le blob dans un nouvel onglet
 */
function savePDF(doc: jsPDF, filename: string) {
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream
  const isMobileSafari = isIOS || (/Safari/.test(navigator.userAgent) && /Mobile/.test(navigator.userAgent))
  if (isMobileSafari) {
    // Sur iOS Safari, ouvrir le blob dans un nouvel onglet (le navigateur propose enregistrer)
    const blobUrl = doc.output('bloburl')
    window.open(blobUrl as unknown as string, '_blank')
  } else {
    doc.save(filename)
  }
}

const BLUE_OHADA: [number, number, number] = [31, 52, 107]  // --primary: 222 72% 28%
const GOLD_OHADA: [number, number, number] = [204, 139, 10]  // --secondary: 43 90% 45%

// Formatage des montants pour PDF : espace normal (pas insécable) pour éviter les glyphes corrompus
function fmtPDF(n: number): string {
  if (n === 0) return '0'
  // On formate avec fr-FR puis on remplace l'espace insécable \u202F et \u00A0 par un espace ordinaire
  return new Intl.NumberFormat('fr-FR', { minimumFractionDigits: 0, maximumFractionDigits: 2 })
    .format(n)
    .replace(/\u202F/g, ' ')
    .replace(/\u00A0/g, ' ')
}

function addHeader(doc: jsPDF, title: string, sessionName: string) {
  // Background header
  doc.setFillColor(...BLUE_OHADA)
  doc.rect(0, 0, 210, 22, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFontSize(14)
  doc.setFont('helvetica', 'bold')
  doc.text('CAMPUS OHADA', 14, 10)

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text('SYSCOHADA Révisé', 14, 16)

  doc.setFontSize(12)
  doc.setFont('helvetica', 'bold')
  doc.text(title, 105, 10, { align: 'center' })

  doc.setFontSize(8)
  doc.setFont('helvetica', 'normal')
  doc.text(sessionName, 105, 16, { align: 'center' })

  doc.setFontSize(8)
  doc.text(new Date().toLocaleDateString('fr-FR'), 196, 10, { align: 'right' })

  doc.setTextColor(0, 0, 0)
  return 28
}

function addFooter(doc: jsPDF) {
  const pageCount = (doc as any).internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(7)
    doc.setTextColor(150)
    doc.text(`CAMPUS OHADA · SYSCOHADA Révisé · Page ${i}/${pageCount}`, 105, 291, { align: 'center' })
    doc.setTextColor(0, 0, 0)
  }
}

export function exportJournalPDF(sessionName: string, ecritures: Ecriture[]) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })

  // ── EN-TÊTE : fond bleu pleine largeur, deux lignes ──
  // Ligne 1 : "JOURNAL COMPTABLE" centré, gras, blanc
  // Ligne 2 : "Session : xxx  |  SYSCOHADA Révisé  |  CAMPUS OHADA"
  const PW = 297  // largeur A4 paysage
  const MARGIN = 3

  doc.setFillColor(31, 52, 107)
  doc.rect(0, 0, PW, 20, 'F')

  doc.setTextColor(255, 255, 255)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.text('JOURNAL COMPTABLE', PW / 2, 9, { align: 'center' })

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(8)
  doc.text(`Session : ${sessionName}  |  SYSCOHADA Révisé  |  CAMPUS OHADA`, PW / 2, 16, { align: 'center' })

  // ── EN-TÊTE DES COLONNES ──
  // Colonnes : Date | Libellé | Cpt Débit | Cpt Crédit | Intitulé du compte | Débit | Crédit
  // Largeurs (PW=297, marges 3×2=291) : 25+55+22+22+120+24+24 = 292 ≈ ok
  const COL_W = [25, 55, 22, 22, 120, 24, 24]
  const HEADERS = ['Date', 'Libellé', 'Cpt Débit', 'Cpt Crédit', 'Intitulé du compte', 'Débit', 'Crédit']
  const ROW_H   = 6.5
  const HDR_H   = 8
  const BLUE:  [number,number,number] = [31, 52, 107]
  const FILL_A: [number,number,number] = [248, 250, 255]
  const FILL_B: [number,number,number] = [255, 255, 255]
  const FILL_T: [number,number,number] = [220, 230, 248]

  const drawHeaders = (y: number) => {
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(9)
    let hx = MARGIN
    HEADERS.forEach((h, i) => {
      // Fond bleu pour chaque cellule
      doc.setFillColor(31, 52, 107)
      doc.rect(hx, y, COL_W[i], HDR_H, 'F')
      // Texte blanc par-dessus
      doc.setTextColor(255, 255, 255)
      doc.text(h, hx + COL_W[i] / 2, y + 5.2, { align: 'center' })
      hx += COL_W[i]
    })
    // Remettre couleur texte à noir pour les lignes suivantes
    doc.setTextColor(0, 0, 0)
    return y + HDR_H
  }

  let curY = drawHeaders(21)

  // Group by ligneGroupe
  const grouped = new Map<string, Ecriture[]>()
  ecritures.forEach(e => {
    if (!grouped.has(e.ligneGroupe)) grouped.set(e.ligneGroupe, [])
    grouped.get(e.ligneGroupe)!.push(e)
  })

  grouped.forEach((lines, groupe) => {
    const debitLines  = lines.filter(l => l.debit  > 0)
    const creditLines = lines.filter(l => l.credit > 0)
    const isOuverture = groupe.startsWith('ouverture-')
    const libelleText = isOuverture ? `[OUVERTURE] ${lines[0]?.libelle}` : (lines[0]?.libelle || '')
    const numeroPiece = (lines[0] as any)?.numeroPiece || ''
    const libelleAffiche = numeroPiece ? `${libelleText}  [${numeroPiece}]` : libelleText
    const dateStr = lines[0]?.date || ''

    const allLines: Array<{ type: 'D'|'C'; numero: string; intitule: string; montant: number }> = [
      ...debitLines.map(l  => ({ type: 'D' as const, numero: l.numeroCompte, intitule: l.intituleCompte, montant: l.debit })),
      ...creditLines.map(l => ({ type: 'C' as const, numero: l.numeroCompte, intitule: l.intituleCompte, montant: l.credit })),
    ]

    // Saut de page si nécessaire
    const neededH = allLines.length * ROW_H + HDR_H + 8
    if (curY + neededH > 198) {
      doc.addPage()
      // Répéter en-tête léger sur nouvelle page
      doc.setFillColor(...BLUE)
      doc.rect(0, 0, PW, 10, 'F')
      doc.setTextColor(255, 255, 255)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.text('JOURNAL COMPTABLE (suite)', PW / 2, 7, { align: 'center' })
      curY = drawHeaders(11)
    }

    const totalW = COL_W.reduce((a, b) => a + b, 0)

    allLines.forEach((ligne, idx) => {
      const fill = idx % 2 === 0 ? FILL_A : FILL_B
      doc.setFillColor(...fill)
      doc.rect(MARGIN, curY, totalW, ROW_H, 'F')
      doc.setTextColor(0, 0, 0)

      let cx = MARGIN

      // Col 0 : Date
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(8)
      doc.text(idx === 0 ? dateStr : '', cx + 1.5, curY + 4.2)
      cx += COL_W[0]

      // Col 1 : Libellé
      doc.text(idx === 0 ? libelleAffiche : '', cx + 1.5, curY + 4.2)
      cx += COL_W[1]

      // Col 2 : Cpt Débit : numéro uniquement, gras, centré
      doc.setFont('helvetica', 'bold')
      if (ligne.type === 'D') {
        doc.text(ligne.numero, cx + COL_W[2] / 2, curY + 4.2, { align: 'center' })
      }
      cx += COL_W[2]

      // Col 3 : Cpt Crédit : numéro uniquement, gras, centré
      if (ligne.type === 'C') {
        doc.text(ligne.numero, cx + COL_W[3] / 2, curY + 4.2, { align: 'center' })
      }
      cx += COL_W[3]

      // Col 4 : Intitulé : même marge pour débit et crédit
      doc.setFont('helvetica', 'normal')
      doc.text(ligne.intitule, cx + 1.5, curY + 4.2)
      cx += COL_W[4]

      // Col 5 : Débit
      if (ligne.type === 'D') {
        doc.text(fmtPDF(ligne.montant), cx + COL_W[5] - 1.5, curY + 4.2, { align: 'right' })
      }
      cx += COL_W[5]

      // Col 6 : Crédit
      if (ligne.type === 'C') {
        doc.text(fmtPDF(ligne.montant), cx + COL_W[6] - 1.5, curY + 4.2, { align: 'right' })
      }

      curY += ROW_H
    })

    // ── Ligne Total ──
    const totD = lines.reduce((s, l) => s + l.debit,  0)
    const totC = lines.reduce((s, l) => s + l.credit, 0)
    doc.setFillColor(...FILL_T)
    doc.rect(MARGIN, curY, totalW, ROW_H, 'F')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(8)
    doc.setTextColor(20, 40, 100)
    doc.text('Total', MARGIN + COL_W[0] + 1.5, curY + 4.2)
    const montX = MARGIN + COL_W[0] + COL_W[1] + COL_W[2] + COL_W[3] + COL_W[4]
    doc.text(fmtPDF(totD), montX + COL_W[5] - 1.5, curY + 4.2, { align: 'right' })
    doc.text(fmtPDF(totC), montX + COL_W[5] + COL_W[6] - 1.5, curY + 4.2, { align: 'right' })
    curY += ROW_H

    // ── Trait séparateur entre écritures ──
    doc.setDrawColor(170, 185, 215)
    doc.setLineWidth(0.3)
    doc.line(MARGIN, curY + 2, MARGIN + totalW, curY + 2)
    curY += 5
  })

  // ── Pied de page ──
  const pageCount = (doc as any).internal.getNumberOfPages()
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i)
    doc.setFontSize(7)
    doc.setTextColor(150)
    doc.text(`CAMPUS OHADA · SYSCOHADA Révisé · Page ${i}/${pageCount}`, PW / 2, 208, { align: 'center' })
  }

  savePDF(doc, `Journal_${sessionName.replace(/[^a-z0-9]/gi, '_')}.pdf`)
}

export function exportGrandLivrePDF(sessionName: string, comptes: any[]) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })
  const startY = addHeader(doc, 'GRAND LIVRE', sessionName)

  comptes.forEach((compte, ci) => {
    const startYCompte = ci === 0 ? startY : undefined

    const rows = compte.lignes.map((l: Ecriture) => [
      l.date,
      l.libelle,
      l.debit > 0 ? fmtPDF(l.debit) : '',
      l.credit > 0 ? fmtPDF(l.credit) : '',
    ])

    if (compte.soldeDebiteur > 0) {
      rows.push(['SD', 'Solde débiteur', fmtPDF(compte.soldeDebiteur), ''])
    } else {
      rows.push(['SC', 'Solde créditeur', '', fmtPDF(compte.soldeCrediteur)])
    }
    rows.push(['', 'TOTAL', fmtPDF(compte.totalDebit + compte.soldeCrediteur), fmtPDF(compte.totalCredit + compte.soldeDebiteur)])

    autoTable(doc, {
      startY: startYCompte,
      head: [['Date', `${compte.numero} · ${compte.intitule}`, 'Débit', 'Crédit']],
      body: rows,
      theme: 'grid',
      headStyles: { fillColor: BLUE_OHADA, textColor: 255, fontStyle: 'bold', fontSize: 9 },
      bodyStyles: { fontSize: 8 },
      columnStyles: {
        0: { cellWidth: 24 },
        1: { cellWidth: 108 },
        2: { cellWidth: 28, halign: 'right' },
        3: { cellWidth: 28, halign: 'right' },
      },
      margin: { left: 14, right: 14 },
    })
  })

  addFooter(doc)
  savePDF(doc, `GrandLivre_${sessionName.replace(/[^a-z0-9]/gi, '_')}.pdf`)
}

export function exportBalancePDF(sessionName: string, lignes: any[]) {
  const doc = new jsPDF({ orientation: 'landscape', unit: 'mm', format: 'a4' })
  const startY = addHeader(doc, 'BALANCE GÉNÉRALE', sessionName)

  const rows = lignes.map(l => [
    l.numero,
    l.intitule,
    l.ouvertureD > 0 ? fmtPDF(l.ouvertureD) : '',
    l.ouvertureC > 0 ? fmtPDF(l.ouvertureC) : '',
    l.mouvementD > 0 ? fmtPDF(l.mouvementD) : '',
    l.mouvementC > 0 ? fmtPDF(l.mouvementC) : '',
    l.clotureD > 0 ? fmtPDF(l.clotureD) : '',
    l.clotureC > 0 ? fmtPDF(l.clotureC) : '',
  ])

  const totals = lignes.reduce((acc, l) => ({
    od: acc.od + l.ouvertureD,
    oc: acc.oc + l.ouvertureC,
    md: acc.md + l.mouvementD,
    mc: acc.mc + l.mouvementC,
    cd: acc.cd + l.clotureD,
    cc: acc.cc + l.clotureC,
  }), { od: 0, oc: 0, md: 0, mc: 0, cd: 0, cc: 0 })

  rows.push([
    '', 'TOTAUX',
    fmtPDF(totals.od), fmtPDF(totals.oc),
    fmtPDF(totals.md), fmtPDF(totals.mc),
    fmtPDF(totals.cd), fmtPDF(totals.cc),
  ])

  autoTable(doc, {
    startY,
    head: [['Compte', 'Intitulé', 'Ouv. D', 'Ouv. C', 'Mouv. D', 'Mouv. C', 'Clôt. D', 'Clôt. C']],
    body: rows,
    theme: 'striped',
    headStyles: { fillColor: BLUE_OHADA, textColor: 255, fontStyle: 'bold', fontSize: 8 },
    bodyStyles: { fontSize: 7 },
    columnStyles: {
      0: { cellWidth: 20, fontStyle: 'bold' },
      1: { cellWidth: 70 },
      2: { cellWidth: 22, halign: 'right' },
      3: { cellWidth: 22, halign: 'right' },
      4: { cellWidth: 22, halign: 'right' },
      5: { cellWidth: 22, halign: 'right' },
      6: { cellWidth: 22, halign: 'right' },
      7: { cellWidth: 22, halign: 'right' },
    },
    didParseCell: (data) => {
      if (data.row.index === rows.length - 1) {
        data.cell.styles.fontStyle = 'bold'
        data.cell.styles.fillColor = BLUE_OHADA
        data.cell.styles.textColor = 255
      }
    },
  })

  addFooter(doc)
  savePDF(doc, `Balance_${sessionName.replace(/[^a-z0-9]/gi, '_')}.pdf`)
}

export function exportBilanPDF(
  sessionName: string,
  actifRubriques: { ref: string; label: string; brut: number; amort: number; net: number }[],
  passifRubriques: { ref: string; label: string; net: number }[]
) {
  const doc = new jsPDF({ orientation: 'portrait', unit: 'mm', format: 'a4' })

  // ════════════════════════════════════════
  // PAGE 1 : ACTIF
  // ════════════════════════════════════════
  const startY = addHeader(doc, 'BILAN : ACTIF', sessionName)

  const actifRows = actifRubriques.map(r => [
    r.ref,
    r.label,
    r.brut > 0 ? fmtPDF(r.brut) : '',
    r.amort > 0 ? fmtPDF(r.amort) : '',
    r.net > 0 ? fmtPDF(r.net) : '',
  ])

  autoTable(doc, {
    startY: startY + 2,
    head: [['REF', 'ACTIF', 'BRUT', 'AMORT et DÉPREC.', 'NET (N)']],
    body: actifRows,
    styles: { fontSize: 7.5, cellPadding: 2 },
    headStyles: { fillColor: BLUE_OHADA, textColor: 255, fontStyle: 'bold', fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 14, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 30, halign: 'right' },
      3: { cellWidth: 30, halign: 'right' },
      4: { cellWidth: 30, halign: 'right', fontStyle: 'bold' },
    },
    didParseCell: (data) => {
      const ref = (data.row.raw as string[])[0]
      if (['AZ','BK','BT','BZ'].includes(ref)) {
        data.cell.styles.fillColor = BLUE_OHADA
        data.cell.styles.textColor = 255
        data.cell.styles.fontStyle = 'bold'
      } else if (['AD','AI','AQ','BG'].includes(ref)) {
        data.cell.styles.fillColor = [220, 230, 245]
        data.cell.styles.fontStyle = 'bold'
      }
    },
    margin: { left: 14, right: 14 },
  })

  // ════════════════════════════════════════
  // PAGE 2 : PASSIF
  // ════════════════════════════════════════
  doc.addPage()
  const startY2 = addHeader(doc, 'BILAN : PASSIF', sessionName)

  const passifRows = passifRubriques.map(r => [
    r.ref,
    r.label,
    r.net !== 0 ? fmtPDF(r.net) : '',
  ])

  autoTable(doc, {
    startY: startY2 + 2,
    head: [['REF', 'PASSIF', 'NET (N)']],
    body: passifRows,
    styles: { fontSize: 7.5, cellPadding: 2 },
    headStyles: { fillColor: BLUE_OHADA, textColor: 255, fontStyle: 'bold', fontSize: 8 },
    columnStyles: {
      0: { cellWidth: 14, halign: 'center', fontStyle: 'bold' },
      1: { cellWidth: 'auto' },
      2: { cellWidth: 35, halign: 'right', fontStyle: 'bold' },
    },
    didParseCell: (data) => {
      const ref = (data.row.raw as string[])[0]
      if (['CP','DD','DF','DP','DT','DZ'].includes(ref)) {
        data.cell.styles.fillColor = BLUE_OHADA
        data.cell.styles.textColor = 255
        data.cell.styles.fontStyle = 'bold'
      }
      if (['CJ','CI'].includes(ref)) {
        data.cell.styles.fillColor = [220, 245, 220]
        data.cell.styles.fontStyle = 'bold'
      }
    },
    margin: { left: 14, right: 14 },
  })

  addFooter(doc)
  savePDF(doc, `Bilan_${sessionName.replace(/[^a-z0-9]/gi, '_')}.pdf`)
}

export function exportResultatPDF(sessionName: string, lignes: { ref: string; label: string; sens: string; comptes: string; montant: number }[]) {
  const doc = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageWidth = doc.internal.pageSize.getWidth();

  // En-tête
  doc.setFillColor(26, 58, 108);
  doc.rect(0, 0, pageWidth, 18, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  doc.text("CAMPUS OHADA : COMPTE DE RÉSULTAT", pageWidth / 2, 12, { align: "center" });

  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  doc.text(`Session : ${sessionName}`, 14, 24);
  doc.text(`Édité le : ${new Date().toLocaleDateString("fr-FR")}`, pageWidth - 14, 24, { align: "right" });

  const rows = lignes.map(l => [
    l.ref,
    l.label,
    l.sens,
    l.comptes,
    l.montant !== 0 ? fmtPDF(Math.abs(l.montant)) : "",
  ]);

  autoTable(doc, {
    startY: 28,
    head: [["REF", "LIBELLÉ", "+/-", "Comptes", "Montant"]],
    body: rows,
    styles: { fontSize: 7, cellPadding: 1.5 },
    headStyles: { fillColor: [26, 58, 108], textColor: 255, fontStyle: "bold" },
    columnStyles: {
      0: { cellWidth: 12, halign: "center" },
      1: { cellWidth: "auto" },
      2: { cellWidth: 10, halign: "center" },
      3: { cellWidth: 32, halign: "left" },
      4: { cellWidth: 28, halign: "right" },
    },
    didParseCell: (data) => {
      const ref = (data.row.raw as any)[0] as string;
      if (ref && (ref.startsWith("X") || ref === "XA" || ref === "XB" || ref === "XC" || ref === "XD" || ref === "XE" || ref === "XF" || ref === "XG" || ref === "XM" || ref === "XI")) {
        data.cell.styles.fillColor = [230, 240, 255];
        data.cell.styles.fontStyle = "bold";
      }
      if (ref === "XI") {
        data.cell.styles.fillColor = [26, 58, 108];
        data.cell.styles.textColor = 255;
        data.cell.styles.fontStyle = "bold";
      }
    },
    margin: { left: 14, right: 14 },
  });

  savePDF(doc, `compte-resultat-${sessionName.replace(/\s+/g, "-").toLowerCase()}.pdf`);
}
