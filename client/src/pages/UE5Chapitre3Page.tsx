import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  BookOpen, Layers, TrendingUp, FileText, PieChart, Building2,
  ChevronRight, RotateCcw, AlertTriangle, DollarSign
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
import { isStudentRole } from '@/lib/permissions'
import DevoirChapitreCreateur, { versCasPratiqueExistant } from '@/components/DevoirChapitreCreateur'
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
  soustitre: string
  contenu: React.ReactNode
}

// ─── COMPOSANT QCMBlock ───────────────────────────────────────────────────────
function QCMBlock({ questions }: { questions: QCMQuestion[] }) {
  const [reponses, setReponses] = useState<Record<string, string>>({})
  const [vérifie, setVerifie] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  const handleSelect = (qId: string, optId: string) => {
    if (vérifie) return
    setReponses(prev => ({ ...prev, [qId]: optId }))
  }

  const handleVerifier = () => {
    let correct = 0
    questions.forEach(q => { if (reponses[q.id] === q.reponseCorrecte) correct++ })
    setScore(correct)
    setVerifie(true)
  }

  const handleReset = () => {
    setReponses({})
    setVerifie(false)
    setScore(null)
  }

  return (
    <div className="space-y-4 mt-4">
      {questions.map((q, qi) => {
        const isCorrect = reponses[q.id] === q.reponseCorrecte
        return (
          <div key={q.id} className="rounded-xl border border-emerald-200 bg-card p-4">
            <p className="text-sm font-semibold text-foreground mb-1">
              Q{qi + 1}. {q.question}
            </p>
            <p className="text-xs text-muted-foreground mb-3 italic">{q.articleRef}</p>
            <div className="space-y-2">
              {q.options.map(opt => {
                const selected = reponses[q.id] === opt.id
                const isRight = opt.id === q.reponseCorrecte
                let cls = 'flex items-center gap-2 rounded-lg border px-3 py-2 text-xs cursor-pointer transition-colors '
                if (!vérifie) {
                  cls += selected ? 'border-emerald-500 bg-emerald-50 text-emerald-800' : 'border-border hover:border-emerald-300 hover:bg-muted'
                } else {
                  if (isRight) cls += 'border-green-500 bg-green-50 text-green-800'
                  else if (selected && !isRight) cls += 'border-red-400 bg-red-50 text-red-700'
                  else cls += 'border-border text-muted-foreground'
                }
                return (
                  <div key={opt.id} className={cls} onClick={() => handleSelect(q.id, opt.id)}>
                    {vérifie && isRight && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-500" />}
                    {vérifie && selected && !isRight && <XCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />}
                    <span>{opt.texte}</span>
                  </div>
                )
              })}
            </div>
            {vérifie && (
              <div className={cn('mt-3 rounded-lg p-3 text-xs', isCorrect ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800')}>
                <strong>{isCorrect ? 'Correct !' : 'Incorrect.'}</strong> {q.explication}
              </div>
            )}
          </div>
        )
      })}
      <div className="flex gap-2">
        {!vérifie ? (
          <button onClick={handleVerifier} disabled={Object.keys(reponses).length < questions.length} className="flex-1 rounded-lg bg-emerald-600 text-white text-sm py-2.5 font-semibold hover:bg-emerald-700 disabled:opacity-40 transition-colors">
            Verifier mes reponses
          </button>
        ) : (
          <>
            <div className="flex-1 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-2.5 text-center">
              <span className="text-sm font-bold text-emerald-700">Score : {score}/{questions.length}</span>
            </div>
            <button onClick={handleReset} className="rounded-lg border border-border px-4 py-2.5 text-sm hover:bg-muted transition-colors flex items-center gap-1">
              <RotateCcw className="h-3.5 w-3.5" /> Recommencer
            </button>
          </>
        )}
      </div>
    </div>
  )
}

// ─── COMPOSANT CasPratiqueBlock ───────────────────────────────────────────────
function CasPratiqueBlock({ cas }: { cas: { titre: string; contexte: string; questions: { num: string; enonce: string; correction: string }[] } }) {
  const [open, setOpen] = useState<Record<string, boolean>>({})
  return (
    <div className="rounded-xl border border-emerald-200 bg-card p-4 space-y-3">
      <h3 className="text-sm font-bold text-emerald-700 flex items-center gap-2">
        <FileText className="h-4 w-4" /> {cas.titre}
      </h3>
      <div className="rounded-lg bg-emerald-50/60 border border-emerald-100 p-3">
        <p className="text-xs text-foreground leading-relaxed">{cas.contexte}</p>
      </div>
      <div className="space-y-3">
        {cas.questions.map(q => (
          <div key={q.num} className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-xs font-semibold text-foreground mb-2">Question {q.num} : {q.enonce}</p>
            <button onClick={() => setOpen(prev => ({ ...prev, [q.num]: !prev[q.num] }))} className="flex items-center gap-1 text-xs text-emerald-600 hover:underline">
              <ChevronRight className={cn('h-3.5 w-3.5 transition-transform', open[q.num] && 'rotate-90')} />
              {open[q.num] ? 'Masquer la correction' : 'Voir la correction'}
            </button>
            {open[q.num] && (
              <div className="mt-2 rounded-lg bg-emerald-50 p-3 text-xs text-emerald-800 leading-relaxed">
                {q.correction}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── LECONS ──────────────────────────────────────────────────────────────────
const LECONS: Lecon[] = [
  {
    id: 'l1',
    icone: <Layers className="h-5 w-5" />,
    titre: 'Structure générale du budget du Pouvoir central',
    soustitre: 'LOFIP Art. 20, 22, 24, 32 - Les trois composantes du budget',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <h3 className="text-sm font-bold text-emerald-800 mb-2 flex items-center gap-2">
            <Layers className="h-4 w-4" /> Fondement legal : Art. 20 LOFIP
          </h3>
          <p className="text-xs text-foreground leading-relaxed mb-3">
            L\'article 20 de la LOFIP dispose que : <em>« La loi de finances de l\'année contient, pour une année civile, toutes les ressources et toutes les charges du pouvoir central qui traduisent, a travers un document unique appele budget du pouvoir central, le plan d\'actions du Gouvernement, ainsi que son evaluation en termes d\'objectifs et de résultats attendus. »</em>
          </p>
          <p className="text-xs text-foreground leading-relaxed">
            Ce meme article precise que : <em>« Le budget du pouvoir central comprend le budget général, les budgets annexes et les comptes speciaux tels que definis aux articles 55 et 62 de la présenté loi. »</em>
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <Building2 className="h-4 w-4 text-emerald-600" /> Les trois composantes du budget (Art. 20 LOFIP)
          </h3>

          <div className="rounded-xl border border-emerald-200 bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-white bg-emerald-600 rounded-full px-2 py-0.5">1</span>
              <h4 className="text-sm font-bold text-foreground">
                Le budget général{' '}
                <InfoTooltip texte="Le budget général retrace l\'ensemble des ressources et des charges ordinaires de l\'Etat. Il constitue la composante principale du budget du Pouvoir central et est présenté par programme, par ministère ou institution." loi="Art. 20, 22 LOFIP" />
              </h4>
            </div>
            <p className="text-xs text-foreground leading-relaxed mb-2">
              Le budget général retrace l\'ensemble des ressources et des charges ordinaires de l\'Etat. C\'est la composante principale du budget du Pouvoir central. Conformement a l\'Art. 22 de la LOFIP, la loi de finances de l\'année fixe, pour le budget général, <strong>par ministère ou institution et par programme</strong>, le montant des autorisations d\'engagement annuelles et pluriannuelles ainsi que des crédits de paiement.
            </p>
            <p className="text-xs text-foreground leading-relaxed mb-3">
              L\'Art. 24 precise que la loi de finances fixe les plafonds des charges du budget général et arrete les donnees générales de l\'équilibre budgétaire. Elle fixe globalement la dotation de <strong>40% des recettes a caractere national</strong> allouees aux provinces conformement a la Constitution.
            </p>
            <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
              <p className="text-xs font-bold text-emerald-800 mb-1">Budget général 2025 (Loi de finances initiale) :</p>
              <p className="text-lg font-bold text-emerald-700">45 376 945 297 405 FC</p>
              <p className="text-xs text-muted-foreground mt-1">Source : Loi de finances initiale 2025, RDC</p>
            </div>
          </div>

          <div className="rounded-xl border border-cyan-200 bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-white bg-cyan-600 rounded-full px-2 py-0.5">2</span>
              <h4 className="text-sm font-bold text-foreground">
                Les budgets annexes{' '}
                <InfoTooltip texte="Les budgets annexes retracent les operations de certains services du Pouvoir central non dotes de la personnalite juridique, s\'adonnant a titre principal a une activité de production de biens ou de prestations de services remuneres sous forme de redevances (Art. 56 LOFIP)." loi="Art. 55-58 LOFIP" />
              </h4>
            </div>
            <p className="text-xs text-foreground leading-relaxed mb-2">
              Selon l\'Art. 56 de la LOFIP : <em>« Des budgets annexes retracent les seules operations de certains services du pouvoir central non dotes de la personnalite juridique s\'adonnant a titre principal a une activité de production de biens ou de prestations de services remuneres sous forme de redevances. »</em>
            </p>
            <p className="text-xs text-foreground leading-relaxed mb-2">
              L\'Art. 55 dispose que : <em>« Un budget annexe constitue un programme tel que defini a l\'article 44 de la présenté loi. La creation ou la suppression d\'un budget annexe et l\'affectation d\'une recette a un tel budget s\'operent par les lois de finances. »</em>
            </p>
            <p className="text-xs text-foreground leading-relaxed mb-3">
              L\'Art. 57 precise leur presentation en <strong>deux sections</strong> : la section des operations courantes (recettes et dépenses d\'exploitation) et la section des operations en capital (dépenses d\'investissement et ressources affectees). L\'équilibre est assure soit par un versement au budget général en cas d\'excedent, soit par une subvention en cas de déficit dument justifie (Art. 56 al. 2).
            </p>
            <div className="rounded-lg bg-cyan-50 border border-cyan-200 p-3">
              <p className="text-xs font-bold text-cyan-800 mb-1">Budgets annexes 2025 :</p>
              <p className="text-lg font-bold text-cyan-700">788 989 271 833 FC</p>
              <p className="text-xs text-muted-foreground mt-1">Source : Loi de finances initiale 2025, RDC</p>
            </div>
          </div>

          <div className="rounded-xl border border-violet-200 bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-white bg-violet-600 rounded-full px-2 py-0.5">3</span>
              <h4 className="text-sm font-bold text-foreground">
                Les comptes speciaux{' '}
                <InfoTooltip texte="Les comptes speciaux sont constitues des comptes d\'affectation speciale et des comptes de concours financiers. Ils ne peuvent etre ouverts que par une loi de finances (Art. 60 LOFIP)." loi="Art. 59-73 LOFIP" />
              </h4>
            </div>
            <p className="text-xs text-foreground leading-relaxed mb-2">
              L\'Art. 60 de la LOFIP dispose : <em>« Les comptes speciaux sont constitues des comptes d\'affectation speciale et des comptes de concours financiers. Ils ne peuvent etre ouverts que par une loi de finances. L\'affectation d\'une recette a un compte special ne peut resulter que d\'une disposition de loi de finances. »</em>
            </p>
            <p className="text-xs text-foreground leading-relaxed mb-3">
              Un compte special constitue un programme au sens de l\'Art. 43. Aucun mouvement de crédits ne peut etre effectue entre un compte special et le budget auquel il est rattache, ni entre comptes speciaux (Art. 59 al. 2). Sauf dispositions contraires, le solde de chaque compte special est reporte sur l\'année suivante (Art. 61).
            </p>
            <div className="rounded-lg bg-violet-50 border border-violet-200 p-3">
              <p className="text-xs font-bold text-violet-800 mb-1">Comptes speciaux 2025 :</p>
              <p className="text-lg font-bold text-violet-700">3 680 839 771 037 FC</p>
              <p className="text-xs text-muted-foreground mt-1">Source : Loi de finances initiale 2025, RDC</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-emerald-300 bg-emerald-50 p-4">
          <h3 className="text-sm font-bold text-emerald-800 mb-3">Tableau recapitulatif : Budget total 2025</h3>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-emerald-600 text-white">
                <th className="border border-emerald-400 px-2 py-1.5 text-left">Composante</th>
                <th className="border border-emerald-400 px-2 py-1.5 text-right">Recettes = Depenses (FC)</th>
                <th className="border border-emerald-400 px-2 py-1.5 text-right">Part (%)</th>
              </tr>
            </thead>
            <tbody>
              <tr className="bg-emerald-50">
                <td className="border border-emerald-200 px-2 py-1.5 font-medium">Budget général</td>
                <td className="border border-emerald-200 px-2 py-1.5 text-right">45 376 945 297 405</td>
                <td className="border border-emerald-200 px-2 py-1.5 text-right">91,0%</td>
              </tr>
              <tr>
                <td className="border border-emerald-200 px-2 py-1.5 font-medium">Budgets annexes</td>
                <td className="border border-emerald-200 px-2 py-1.5 text-right">788 989 271 833</td>
                <td className="border border-emerald-200 px-2 py-1.5 text-right">1,6%</td>
              </tr>
              <tr className="bg-emerald-50">
                <td className="border border-emerald-200 px-2 py-1.5 font-medium">Comptes speciaux</td>
                <td className="border border-emerald-200 px-2 py-1.5 text-right">3 680 839 771 037</td>
                <td className="border border-emerald-200 px-2 py-1.5 text-right">7,4%</td>
              </tr>
              <tr className="bg-emerald-600 text-white font-bold">
                <td className="border border-emerald-400 px-2 py-1.5">TOTAL BUDGET 2025</td>
                <td className="border border-emerald-400 px-2 py-1.5 text-right">49 846 774 340 275</td>
                <td className="border border-emerald-400 px-2 py-1.5 text-right">100%</td>
              </tr>
            </tbody>
          </table>
          <p className="text-xs text-emerald-700 mt-2 italic">Loi de finances rectificative (LFR juin 2025) : 50 691,8 milliards FC</p>
        </div>

        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
          <p className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5" /> Regle importante (Art. 58 et 59 LOFIP)
          </p>
          <p className="text-xs text-amber-700">Aucun mouvement de crédits ne peut etre effectue ni entre un budget annexe et le budget général, ni entre budgets annexes (Art. 58), ni entre un compte special et le budget général, ni entre comptes speciaux (Art. 59). Cette etancheite garantit l\'affectation stricte des ressources.</p>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l1q1',
            question: 'Selon l\'Art. 20 LOFIP, le budget du Pouvoir central comprend :',
            options: [
              { id: 'a', texte: 'Uniquement le budget général' },
              { id: 'b', texte: 'Le budget général, les budgets annexes et les comptes speciaux' },
              { id: 'c', texte: 'Le budget général et les budgets provinciaux' },
              { id: 'd', texte: 'Les budgets annexes et les comptes speciaux uniquement' },
              { id: 'e', texte: 'Budget général et budgets des ETD uniquement' },
            ],
            reponseCorrecte: 'b',
            explication: 'L\'Art. 20 al. 2 LOFIP dispose expresseement : « Le budget du Pouvoir central comprend le budget général, les budgets annexes et les comptes speciaux tels que definis aux articles 55 et 62 de la présenté loi. »',
            articleRef: 'Art. 20 LOFIP'
          },
          {
            type: 'qcm', id: 'l1q2',
            question: 'Qui peut creer ou supprimer un budget annexe (Art. 55 LOFIP) ?',
            options: [
              { id: 'a', texte: 'Le Ministre du Budget par arrete ministeriel' },
              { id: 'b', texte: 'Le Premier ministre par ordonnance' },
              { id: 'c', texte: 'Exclusivement les lois de finances' },
              { id: 'd', texte: 'Le Parlement par resolution' },
              { id: 'e', texte: 'Le Ministre des Finances par décret' },
            ],
            reponseCorrecte: 'c',
            explication: 'L\'Art. 55 LOFIP est explicite : « La creation ou la suppression d\'un budget annexe et l\'affectation d\'une recette a un tel budget s\'operent par les lois de finances. » Seule une loi de finances peut creer ou supprimer un budget annexe.',
            articleRef: 'Art. 55 LOFIP'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l2',
    icone: <DollarSign className="h-5 w-5" />,
    titre: 'Les ressources et charges budgétaires',
    soustitre: 'LOFIP Art. 17, 21, 24, 32-35 - Recettes fiscales, douanieres, non fiscales et retrocession',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <h3 className="text-sm font-bold text-emerald-800 mb-2">Fondement legal : Art. 32 LOFIP</h3>
          <p className="text-xs text-foreground leading-relaxed">
            L\'Art. 32 de la LOFIP dispose : <em>« Les ressources et les charges du pouvoir central comprennent les ressources et les charges budgétaires ainsi que les ressources et les charges de tresorerie. »</em>
          </p>
        </div>

        <div className="space-y-3">
          <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-emerald-600" /> Les ressources budgétaires (Art. 33 LOFIP)
          </h3>

          <div className="rounded-xl border border-border bg-card p-4">
            <p className="text-xs text-foreground leading-relaxed mb-3">
              L\'Art. 17 precise que les lois de finances determinent, pour un exercice, <strong>la nature, le montant et l\'affectation des ressources et des charges de l\'Etat</strong> compte tenu d\'un équilibre economique et financier qu\'elles definissent. L\'Art. 21 precise que la loi de finances de l\'année comprend l\'evaluation de chaque nature de recettes budgétaires.
            </p>

            <div className="space-y-2">
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                <h4 className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1">
                  Recettes fiscales{' '}
                  <InfoTooltip texte="Les recettes fiscales comprennent les impots sur le revenu (IRPP, IS), les taxes sur les transactions (TVA, droits de douane, droits d\'accise) et toutes contributions obligatoires percues en vertu de la loi. Elles constituent la principale source de financement de l\'Etat." loi="Art. 33 LOFIP" />
                </h4>
                <p className="text-xs text-foreground">Impots directs (IRPP, IS, IPR, IRL), taxes indirectes (TVA, accises), droits de douane a l\'importation et a l\'exportation, droits d\'enregistrement et de timbre. Ces recettes sont percues par la DGI (Direction Generale des Impots) et la DGDA (Direction Generale des Douanes et Accises).</p>
              </div>

              <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                <h4 className="text-xs font-bold text-blue-800 mb-1 flex items-center gap-1">
                  Recettes non fiscales{' '}
                  <InfoTooltip texte="Les recettes non fiscales sont des ressources de l\'Etat qui ne proviennent pas de l\'obligation fiscale. Elles comprennent notamment les redevances minieres, les dividendes des entreprises publiques, les produits du domaine de l\'Etat et les amendes." loi="Art. 33 LOFIP" />
                </h4>
                <p className="text-xs text-foreground">Redevances minieres et petrolieres, dividendes des entreprises du portefeuille de l\'Etat, produits du domaine public et prive, amendes et penalites, droits et redevances administratives. Percues par la DGRAD (Direction Generale des Recettes Administratives, Judiciaires, Domaniales et de Participations).</p>
              </div>

              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                <h4 className="text-xs font-bold text-amber-800 mb-1">Ressources de financement (dons et emprunts)</h4>
                <p className="text-xs text-foreground">Dons et legs de partenaires bi et multilateraux, emprunts interieurs (bons du Tresor, obligations) et exterieurs (prets FMI, Banque mondiale, partenaires bilateraux). L\'Art. 16 LOFIP interdit le recours aux avances de la Banque Centrale du Congo.</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-emerald-200 bg-card p-4">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              <PieChart className="h-4 w-4 text-emerald-600" /> Retrocession aux provinces : Art. 24 LOFIP
              <InfoTooltip texte="L\'Art. 24 al. 3 LOFIP fixe globalement la dotation de 40% des recettes a caractere national allouees aux provinces conformement a la Constitution (Art. 175 al. 2). Cette retrocession est prelevee avant toute affectation et constitue une obligation constitutionnelle." loi="Art. 24 LOFIP, Art. 175 Constitution" />
            </h3>
            <p className="text-xs text-foreground leading-relaxed mb-3">
              L\'Art. 24 al. 3 de la LOFIP dispose que la loi de finances <em>« fixe globalement la dotation de 40% des recettes a caractere national allouees aux provinces conformement a la Constitution. »</em> Cette disposition s\'articule avec l\'Art. 175 al. 2 de la Constitution qui prevoit que <strong>40% des recettes a caractere national sont allouees aux provinces</strong>.
            </p>
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="bg-emerald-600 text-white">
                  <th className="border border-emerald-400 px-2 py-1.5 text-left">Mecanisme</th>
                  <th className="border border-emerald-400 px-2 py-1.5 text-right">Montant 2025 (FC)</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-emerald-50">
                  <td className="border border-emerald-200 px-2 py-1.5">Part Provinces (40% recettes nationales)</td>
                  <td className="border border-emerald-200 px-2 py-1.5 text-right">9 131 900 887 823</td>
                </tr>
                <tr>
                  <td className="border border-emerald-200 px-2 py-1.5">Caisse nationale de perequation{' '}
                    <InfoTooltip texte="La Caisse nationale de perequation vise a corriger les desequilibres de developpement entre provinces. Elle est alimentee par une fraction des ressources nationales et redistribuee selon des criteres de solidarite nationale." loi="Art. 181 Constitution, LF 2025" />
                  </td>
                  <td className="border border-emerald-200 px-2 py-1.5 text-right">2 282 975 221 956</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
          <p className="text-xs font-bold text-amber-800 mb-1 flex items-center gap-1">
            <AlertTriangle className="h-3.5 w-3.5" /> Interdiction des avances BCC (Art. 16 LOFIP)
          </p>
          <p className="text-xs text-amber-700">L\'Art. 16 de la LOFIP dispose expressement : <em>« Le recours aux avances de la Banque Centrale du Congo est prohibe tant pour le pouvoir central que pour la province et l\'entite territoriale decentralisee. »</em> Cette interdiction vise a preserver l\'independance de la politique monetaire et a eviter le financement monetaire des déficits budgétaires, source d\'inflation.</p>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l2q1',
            question: 'Quel pourcentage des recettes a caractere national est alloue aux provinces selon l\'Art. 24 LOFIP et l\'Art. 175 de la Constitution ?',
            options: [
              { id: 'a', texte: '30%' },
              { id: 'b', texte: '35%' },
              { id: 'c', texte: '40%' },
              { id: 'd', texte: '50%' },
              { id: 'e', texte: '25%' },
            ],
            reponseCorrecte: 'c',
            explication: 'L\'Art. 24 al. 3 LOFIP dispose : « elle fixe globalement la dotation de 40% des recettes a caractere national allouees aux provinces conformement a la Constitution. » Ce taux est consacre par l\'Art. 175 al. 2 de la Constitution de 2006.',
            articleRef: 'Art. 24 LOFIP, Art. 175 Constitution'
          },
          {
            type: 'qcm', id: 'l2q2',
            question: 'L\'Art. 16 LOFIP interdit :',
            options: [
              { id: 'a', texte: 'Les emprunts aupres des banques commerciales' },
              { id: 'b', texte: 'Le recours aux avances de la Banque Centrale du Congo' },
              { id: 'c', texte: 'Les dons et legs etrangers' },
              { id: 'd', texte: 'Les bons du Tresor' },
              { id: 'e', texte: 'Les emprunts auprès du Parlement' },
            ],
            reponseCorrecte: 'b',
            explication: 'L\'Art. 16 LOFIP est explicite : « Le recours aux avances de la Banque Centrale du Congo est prohibe tant pour le pouvoir central que pour la province et l\'entite territoriale decentralisee. » Cette interdiction vise a eviter le financement monetaire des déficits.',
            articleRef: 'Art. 16 LOFIP'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l3',
    icone: <TrendingUp className="h-5 w-5" />,
    titre: 'Classification des dépenses : les neuf titres',
    soustitre: 'LOFIP Art. 36-37 - Nomenclature des charges budgétaires',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <h3 className="text-sm font-bold text-emerald-800 mb-2">Art. 36 LOFIP : Principe de classification</h3>
          <p className="text-xs text-foreground leading-relaxed">
            L\'Art. 36 de la LOFIP dispose : <em>« Les charges budgétaires sont classees par programme, administration, nature economique telles que definies par la nomenclature en vigueur ou suivant toute autre classification presentant un intérêt pour leur analyse, suivi et evaluation. Elles comprennent les dépenses courantes, les dépenses en capital ainsi que les prets et avances. »</em>
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-600" /> Nomenclature par titres (Art. 37 LOFIP){' '}
            <InfoTooltip texte="L\'Art. 37 LOFIP établit la nomenclature officielle des dépenses budgétaires en 9 titres. Cette classification par nature economique est obligatoire pour toutes les administrations du Pouvoir central. Elle permet de suivre et d\'evaluer l\'exécution du budget par categorie de dépenses." loi="Art. 37 LOFIP" />
          </h3>
          <p className="text-xs text-foreground leading-relaxed mb-3">
            L\'Art. 37 de la LOFIP établit la nomenclature officielle : <em>« Les dépenses courantes sont groupees sous six titres ou grandes natures [...] Les dépenses en capital sont groupees sous deux titres [...] Les dépenses des prets et avances forment un titre. »</em>
          </p>

          <div className="space-y-2">
            <div className="rounded-lg bg-emerald-50 p-3 border border-emerald-200">
              <p className="text-xs font-bold text-emerald-800 mb-2">DEPENSES COURANTES (Titres I a VI)</p>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-emerald-600 text-white">
                    <th className="border border-emerald-400 px-2 py-1 text-left">Titre</th>
                    <th className="border border-emerald-400 px-2 py-1 text-left">Nature de la dépense</th>
                    <th className="border border-emerald-400 px-2 py-1 text-left">Exemples</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Titre I', 'Dette publique en capital', 'Remboursement du principal de la dette exterieure et interieure'],
                    ['Titre II', 'Frais financiers', 'Interets sur la dette, commissions bancaires, frais de gestion de la dette'],
                    ['Titre III', 'Depenses de personnel', 'Salaires, primes, cotisations sociales, charges salariales des agents de l\'Etat'],
                    ['Titre IV', 'Biens et materiels', 'Carburant, fournitures de bureau, materiels informatiques, mobiliers'],
                    ['Titre V', 'Depenses de prestations', 'Services externes, loyers, telecommunications, consultants, eau, electricite'],
                    ['Titre VI', 'Transferts et interventions', 'Subventions aux établissements publics, transferts aux provinces, aides sociales'],
                  ].map(([titre, nature, ex]) => (
                    <tr key={titre} className="border-b border-emerald-100 even:bg-emerald-50/50">
                      <td className="border border-emerald-200 px-2 py-1.5 font-bold text-emerald-700 whitespace-nowrap">{titre}</td>
                      <td className="border border-emerald-200 px-2 py-1.5 font-medium">{nature}</td>
                      <td className="border border-emerald-200 px-2 py-1.5 text-muted-foreground">{ex}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="rounded-lg bg-blue-50 p-3 border border-blue-200">
              <p className="text-xs font-bold text-blue-800 mb-2">DEPENSES EN CAPITAL (Titres VII et VIII)</p>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-blue-600 text-white">
                    <th className="border border-blue-400 px-2 py-1 text-left">Titre</th>
                    <th className="border border-blue-400 px-2 py-1 text-left">Nature</th>
                    <th className="border border-blue-400 px-2 py-1 text-left">Exemples</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-blue-200 px-2 py-1.5 font-bold text-blue-700">Titre VII</td>
                    <td className="border border-blue-200 px-2 py-1.5 font-medium">Equipements</td>
                    <td className="border border-blue-200 px-2 py-1.5 text-muted-foreground">Vehicules, materiels medicaux, engins lourds, equipements militaires</td>
                  </tr>
                  <tr className="bg-blue-50/50">
                    <td className="border border-blue-200 px-2 py-1.5 font-bold text-blue-700">Titre VIII</td>
                    <td className="border border-blue-200 px-2 py-1.5 font-medium">Construction, refection, rehabilitation, addition d\'ouvrage et edifice, acquisition immobiliere</td>
                    <td className="border border-blue-200 px-2 py-1.5 text-muted-foreground">Routes, batiments administratifs, hopitaux, ecoles, barrages</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-lg bg-violet-50 p-3 border border-violet-200">
              <p className="text-xs font-bold text-violet-800 mb-2">PRETS ET AVANCES (Titre IX)</p>
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="bg-violet-600 text-white">
                    <th className="border border-violet-400 px-2 py-1 text-left">Titre</th>
                    <th className="border border-violet-400 px-2 py-1 text-left">Nature</th>
                    <th className="border border-violet-400 px-2 py-1 text-left">Regime</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="border border-violet-200 px-2 py-1.5 font-bold text-violet-700">Titre IX</td>
                    <td className="border border-violet-200 px-2 py-1.5 font-medium">Prets et avances de l\'Etat</td>
                    <td className="border border-violet-200 px-2 py-1.5 text-muted-foreground">Retrace dans les comptes de concours financiers (Art. 66 LOFIP)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">Execution budgétaire 2025 : donnees reelles</h3>
          <div className="rounded-lg bg-red-50 border border-red-200 p-3">
            <p className="text-xs font-bold text-red-800 mb-1">Taux d\'exécution global T1 2025 : 17,1%</p>
            <p className="text-xs text-red-700 mb-2">A fin mars 2025, le taux d\'exécution global du budget est de <strong>17,1%</strong> des crédits votes. Les dépenses d\'investissement (Titres VII et VIII) n\'ont exécuté que <strong>4%</strong> des crédits votes.</p>
            <p className="text-xs text-muted-foreground italic">Source : Rapport d\'exécution budgétaire, Observatoire de la Depense Publique (ODEP), mars 2025</p>
          </div>
          <p className="text-xs text-foreground leading-relaxed mt-3">Ce faible taux d\'exécution des dépenses en capital illustre le defi structurel de la RDC : les crédits d\'investissement sont votes mais rarement executes, ce qui freine le developpement des infrastructures et la mise en oeuvre des programmes publics.</p>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l3q1',
            question: 'Selon l\'Art. 37 LOFIP, les dépenses de personnel (salaires des agents de l\'Etat) sont classees sous quel titre ?',
            options: [
              { id: 'a', texte: 'Titre I : Dette publique en capital' },
              { id: 'b', texte: 'Titre II : Frais financiers' },
              { id: 'c', texte: 'Titre III : Depenses de personnel' },
              { id: 'd', texte: 'Titre IV : Biens et materiels' },
              { id: 'e', texte: 'Titre IX : Prêts et avances' },
            ],
            reponseCorrecte: 'c',
            explication: 'L\'Art. 37 LOFIP classe les dépenses courantes en 6 titres. Les dépenses de personnel (salaires, primes, cotisations sociales) sont au Titre III. Le Titre I est reserve a la dette publique en capital et le Titre II aux frais financiers (intérêts).',
            articleRef: 'Art. 37 LOFIP'
          },
          {
            type: 'qcm', id: 'l3q2',
            question: 'La construction d\'une route nationale est imputee sur quel titre selon la nomenclature LOFIP ?',
            options: [
              { id: 'a', texte: 'Titre V : Depenses de prestations' },
              { id: 'b', texte: 'Titre VI : Transferts et interventions' },
              { id: 'c', texte: 'Titre VII : Equipements' },
              { id: 'd', texte: 'Titre VIII : Construction, refection, rehabilitation...' },
              { id: 'e', texte: 'Titre III : Depenses de personnel' },
            ],
            reponseCorrecte: 'd',
            explication: 'L\'Art. 37 LOFIP groupe les dépenses en capital sous deux titres : Titre VII (Equipements) et Titre VIII (Construction, refection, rehabilitation, addition d\'ouvrage et edifice, acquisition immobiliere). La construction d\'une route releve du Titre VIII.',
            articleRef: 'Art. 37 LOFIP'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l4',
    icone: <FileText className="h-5 w-5" />,
    titre: 'Credits limitatifs, evaluatifs et provisionnels',
    soustitre: 'LOFIP Art. 38-41 - Regimes juridiques des crédits budgétaires',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <h3 className="text-sm font-bold text-emerald-800 mb-2">Principe général : Art. 38 LOFIP</h3>
          <p className="text-xs text-foreground leading-relaxed">
            L\'Art. 38 de la LOFIP pose le principe général : <em>« Sous reserve des dispositions des articles 39 et 40 de la présenté loi, les crédits budgétaires sont limitatifs. Les dépenses sur crédits limitatifs ne peuvent etre engagees ni ordonnancees au-dela des dotations budgétaires. »</em>
          </p>
          <p className="text-xs text-foreground leading-relaxed mt-2">
            La règle est donc simple : <strong>tout crédit est limitatif par defaut</strong>, sauf exception expressement prevue par la LOFIP (Art. 39 pour les crédits evaluatifs, Art. 40 pour les crédits provisionnels).
          </p>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-emerald-200 bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-white bg-emerald-600 rounded-full px-3 py-0.5">Art. 38</span>
              <h4 className="text-sm font-bold text-foreground">
                Credits limitatifs{' '}
                <InfoTooltip texte="Les crédits limitatifs constituent la règle générale en droit budgétaire congolais. Ils fixent un plafond absolu que les ministères ne peuvent pas depasser. Toute dépense au-dela de la dotation est irreguliere et engage la responsabilite de l\'ordonnateur." loi="Art. 38 LOFIP" />
              </h4>
            </div>
            <p className="text-xs text-foreground leading-relaxed mb-2">
              <strong>Definition :</strong> Les crédits limitatifs constituent un plafond absolu que les ministères ne peuvent pas depasser. Les dépenses engagees ou ordonnancees ne peuvent exceder les dotations budgétaires. C\'est la règle générale.
            </p>
            <p className="text-xs text-foreground leading-relaxed mb-2">
              <strong>Consequence juridique :</strong> Tout engagement de dépense au-dela des crédits disponibles est irrégulier et engage la responsabilite personnelle et pecuniaire de l\'ordonnateur. Le comptable public est tenu de rejeter tout paiement excedant les crédits ouverts.
            </p>
            <div className="rounded-lg bg-emerald-50 p-2 border border-emerald-200">
              <p className="text-xs font-medium text-emerald-800">Exemples : salaires (Titre III), biens et materiels (Titre IV), dépenses de prestations (Titre V), investissements (Titres VII et VIII)</p>
            </div>
          </div>

          <div className="rounded-xl border border-amber-200 bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-white bg-amber-600 rounded-full px-3 py-0.5">Art. 39</span>
              <h4 className="text-sm font-bold text-foreground">
                Credits evaluatifs{' '}
                <InfoTooltip texte="Les crédits evaluatifs ont un caractere de simple evaluation. Ils peuvent etre depasses si les besoins reels le justifient. En RDC, ils s\'appliquent exclusivement aux charges de la dette publique (remboursement du principal et frais financiers - Titres I et II)." loi="Art. 39 LOFIP" />
              </h4>
            </div>
            <p className="text-xs text-foreground leading-relaxed mb-2">
              L\'Art. 39 LOFIP dispose : <em>« Les crédits relatifs aux charges de la dette du pouvoir central ont un caractere evaluatif. Les dépenses sur crédits evaluatifs s\'imputent, si necessaire, au-dela des crédits ouverts. Dans cette hypothese, le Gouvernement informe le Parlement des motifs du depassement. Les depassements des crédits evaluatifs font l\'objet des propositions d\'ouverture de crédits dans le projet de loi de finances rectificative. »</em>
            </p>
            <div className="rounded-lg bg-amber-50 p-2 border border-amber-200">
              <p className="text-xs font-medium text-amber-800">Application exclusive : charges de la dette du Pouvoir central (Titres I et II - remboursement principal + frais financiers)</p>
            </div>
          </div>

          <div className="rounded-xl border border-red-200 bg-card p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold text-white bg-red-600 rounded-full px-3 py-0.5">Art. 40</span>
              <h4 className="text-sm font-bold text-foreground">
                Credits provisionnels{' '}
                <InfoTooltip texte="Les crédits provisionnels couvrent des dépenses imprevues et imprévisibles au moment du vote de la loi de finances : faits de guerre, catastrophes naturelles, urgences humanitaires. Ils ne peuvent etre ordonnances que dans la limite des allocations votees, sauf si le Parlement vote des crédits supplementaires (Art. 40 al. 3)." loi="Art. 40 LOFIP" />
              </h4>
            </div>
            <p className="text-xs text-foreground leading-relaxed mb-2">
              L\'Art. 40 LOFIP dispose : <em>« Les dépenses pour lesquelles les besoins ne peuvent etre exactement chiffres au moment du vote de la loi de finances de l\'année ont un caractere provisionnel. Ils correspondent a des dépenses accidentelles et imprévisibles concernant notamment, les faits de guerre et les catastrophes naturelles. »</em>
            </p>
            <p className="text-xs text-foreground leading-relaxed mb-2">
              <em>« Les dépenses sur crédits provisionnels ne peuvent etre ordonnancees que dans les limites des allocations budgétaires correspondantes. Toutefois, en cas d\'insuffisance de ces crédits, des crédits supplementaires sont demandes au Parlement, conformement a l\'article 129 de la Constitution. »</em>
            </p>
            <div className="rounded-lg bg-red-50 p-2 border border-red-200">
              <p className="text-xs font-medium text-red-800">Exemples : epidemie de mpox, eruption volcanique du Nyiragongo, inondations, conflits armes</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">Tableau comparatif des trois types de crédits</h3>
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="bg-emerald-600 text-white">
                <th className="border border-emerald-400 px-2 py-1.5 text-left">Critere</th>
                <th className="border border-emerald-400 px-2 py-1.5 text-center">Limitatifs (Art. 38)</th>
                <th className="border border-emerald-400 px-2 py-1.5 text-center">Evaluatifs (Art. 39)</th>
                <th className="border border-emerald-400 px-2 py-1.5 text-center">Provisionnels (Art. 40)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Nature', 'Plafond absolu', 'Simple estimation', 'Provision pour imprevu'],
                ['Depassement possible ?', 'NON', 'OUI, avec information du Parlement', 'NON (sauf crédits supplementaires)'],
                ['Domaine', 'Regle générale', 'Dette publique uniquement', 'Faits de guerre, catastrophes'],
                ['Titres concernes', 'Titres III a IX', 'Titres I et II', 'Credits d\'urgence'],
              ].map(([c, l, e, p]) => (
                <tr key={c} className="even:bg-muted/30">
                  <td className="border border-border px-2 py-1.5 font-medium">{c}</td>
                  <td className="border border-border px-2 py-1.5 text-center text-emerald-700">{l}</td>
                  <td className="border border-border px-2 py-1.5 text-center text-amber-700">{e}</td>
                  <td className="border border-border px-2 py-1.5 text-center text-red-700">{p}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-2">Art. 41 LOFIP : Ouverture de crédits supplementaires</h3>
          <p className="text-xs text-foreground leading-relaxed">
            L\'Art. 41 LOFIP dispose : <em>« Toute ouverture de crédits supplementaires prevoit les voies et moyens necessaires a son exécution et s\'accompagne d\'un rapport adresse au Parlement par le Premier ministre. »</em> Cela signifie qu\'aucun crédit supplementaire ne peut etre ouvert sans identifier simultanement les ressources qui le financeront (principe d\'équilibre budgétaire).
          </p>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l4q1',
            question: 'Quel type de crédit budgétaire peut etre depasse en cours d\'année selon la LOFIP ?',
            options: [
              { id: 'a', texte: 'Les crédits limitatifs' },
              { id: 'b', texte: 'Les crédits evaluatifs (dette publique)' },
              { id: 'c', texte: 'Les crédits provisionnels' },
              { id: 'd', texte: 'Tous les types de crédits peuvent etre depasses' },
              { id: 'e', texte: 'Les crédits limitatifs et les crédits évaluatifs seulement' },
            ],
            reponseCorrecte: 'b',
            explication: 'Seuls les crédits evaluatifs (Art. 39 LOFIP) peuvent etre depasses. Ils s\'appliquent exclusivement aux charges de la dette du Pouvoir central. Le Gouvernement doit informer le Parlement et les depassements sont regularises en LFR. Les crédits limitatifs (Art. 38) constituent un plafond absolu.',
            articleRef: 'Art. 38-40 LOFIP'
          },
          {
            type: 'qcm', id: 'l4q2',
            question: 'L\'Art. 41 LOFIP exige que toute ouverture de crédits supplementaires soit accompagnee de :',
            options: [
              { id: 'a', texte: 'Un décret du Président de la Republique' },
              { id: 'b', texte: 'Un rapport au Parlement par le Premier ministre avec les voies et moyens de financement' },
              { id: 'c', texte: 'Une simple note du Ministre du Budget' },
              { id: 'd', texte: 'L\'accord de la Banque Centrale du Congo' },
              { id: 'e', texte: 'La validation préalable de la Cour des comptes' },
            ],
            reponseCorrecte: 'b',
            explication: 'L\'Art. 41 LOFIP dispose expresseement : « Toute ouverture de crédits supplementaires prevoit les voies et moyens necessaires a son exécution et s\'accompagne d\'un rapport adresse au Parlement par le Premier ministre. » Le financement doit etre identifie simultanement a l\'ouverture des crédits.',
            articleRef: 'Art. 41 LOFIP'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l5',
    icone: <Building2 className="h-5 w-5" />,
    titre: 'Budgets annexes et comptes speciaux',
    soustitre: 'LOFIP Art. 55-73 - Regimes juridiques et mecanismes de financement',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
          <h3 className="text-sm font-bold text-emerald-800 mb-2">Vue d\'ensemble</h3>
          <p className="text-xs text-foreground leading-relaxed">
            Les budgets annexes (Art. 55-58) et les comptes speciaux (Art. 59-73) constituent des mecanismes derogatoires au budget général. Ils permettent d\'individualiser certaines operations budgétaires tout en les maintenant sous le contrôle de la loi de finances. Leur creation, modification et suppression relèvent exclusivement de la loi de finances (Art. 55 et 60).
          </p>
        </div>

        <div className="space-y-3">
          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              Budgets annexes (Art. 55-58){' '}
              <InfoTooltip texte="Les budgets annexes ne peuvent etre crees que par loi de finances (Art. 55). Ils concernent des services du Pouvoir central qui produisent des biens ou services remuneres par des redevances. Contrairement aux établissements publics, ces services n\'ont pas de personnalite juridique propre." loi="Art. 55-58 LOFIP" />
            </h3>
            <div className="space-y-2 text-xs text-foreground">
              <p><strong>Art. 55 :</strong> Un budget annexe constitue un programme au sens de l\'Art. 44. Sa creation, suppression et l\'affectation d\'une recette s\'operent exclusivement par les lois de finances.</p>
              <p><strong>Art. 56 :</strong> Condition d\'eligibilite : service du Pouvoir central, sans personnalite juridique, dont l\'activité principale est la production de biens ou prestations de services remuneres par des redevances. L\'équilibre est assure par versement au budget général (excedent) ou subvention (déficit justifie).</p>
              <p><strong>Art. 57 :</strong> Presentation en deux sections obligatoires :</p>
              <ul className="ml-4 space-y-1">
                <li>Section des operations courantes : recettes et dépenses d\'exploitation</li>
                <li>Section des operations en capital : investissements et ressources affectees</li>
              </ul>
              <p><strong>Art. 58 :</strong> Interdiction absolue de mouvements de crédits entre un budget annexe et le budget général ou entre budgets annexes. L\'etancheite est totale.</p>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
              Comptes speciaux du Tresor (Art. 59-73)
            </h3>
            <p className="text-xs text-foreground mb-3">L\'Art. 60 pose le cadre : <em>« Les comptes speciaux sont constitues des comptes d\'affectation speciale et des comptes de concours financiers. Ils ne peuvent etre ouverts que par une loi de finances. »</em></p>

            <div className="space-y-3">
              <div className="rounded-lg bg-emerald-50 border border-emerald-200 p-3">
                <h4 className="text-xs font-bold text-emerald-800 mb-1 flex items-center gap-1">
                  Comptes d\'affectation speciale (Art. 62-65){' '}
                  <InfoTooltip texte="Les comptes d\'affectation speciale retracent des operations financees par des recettes particulieres directement liees aux dépenses concernees. Ex : Fonds routier (financement des travaux routiers par les taxes sur les carburants), Fonds minier (royalties minieres affectees au developpement minier)." loi="Art. 62 LOFIP" />
                </h4>
                <p className="text-xs text-foreground leading-relaxed mb-2">
                  L\'Art. 62 dispose : <em>« Les comptes d\'affectation speciale retracent, dans les conditions prevues par la loi de finances, des operations budgétaires financees au moyen de recettes particulieres qui sont, par nature, en relation directe avec les dépenses concernees. »</em>
                </p>
                <p className="text-xs text-foreground leading-relaxed mb-2">
                  L\'Art. 65 fixe la limite : <em>« Le total des dépenses engagees ou ordonnancees au titre d\'un compte d\'affectation speciale ne peut exceder le total des recettes constatees, sauf pendant les trois mois suivant sa creation. »</em>
                </p>
                <p className="text-xs text-muted-foreground italic">Exemples RDC : Fonds routier, Fonds de promotion de l\'industrie, Caisse nationale de perequation</p>
              </div>

              <div className="rounded-lg bg-blue-50 border border-blue-200 p-3">
                <h4 className="text-xs font-bold text-blue-800 mb-1 flex items-center gap-1">
                  Comptes de concours financiers (Art. 66-68){' '}
                  <InfoTooltip texte="Les comptes de concours financiers retracent les prets et avances consentis par le Pouvoir central. Un compte distinct doit etre ouvert pour chaque debiteur ou categorie de debiteurs (Art. 66 al. 2). Ils sont dotes de crédits limitatifs et assortis d\'un taux d\'intérêt." loi="Art. 66-68 LOFIP" />
                </h4>
                <p className="text-xs text-foreground leading-relaxed mb-2">
                  L\'Art. 66 dispose : <em>« Les comptes de concours financiers retracent les prets et avances consentis par le pouvoir central a une personne physique ou morale. Un compte distinct doit etre ouvert pour chaque debiteur ou categorie de debiteurs. Les comptes de concours financiers sont dotes de crédits limitatifs. »</em>
                </p>
                <p className="text-xs text-foreground leading-relaxed mb-2">
                  L\'Art. 67 precise les conditions : <em>« Les prets et avances sont accordes pour une duree determinee. Excepte les avances sur dépenses de personnel, ils sont assortis d\'un taux d\'intérêt qui doit etre au plus egal au taux interbancaire de meme echeance. »</em>
                </p>
                <p className="text-xs text-foreground leading-relaxed">
                  L\'Art. 68 reglemente les incidents de remboursement : en cas de non-paiement, il est prevu soit le recouvrement immediat (delai 6 mois), soit le reechelonnement, soit la constatation d\'une perte imputee au résultat de l\'exercice.
                </p>
              </div>

              <div className="rounded-lg bg-amber-50 border border-amber-200 p-3">
                <h4 className="text-xs font-bold text-amber-800 mb-2">Autres procédures speciales (Art. 69-73)</h4>
                <div className="space-y-1 text-xs text-foreground">
                  <p><strong>Fonds de concours (Art. 70) :</strong> Fonds non fiscaux verses par des tiers (personnes physiques ou morales) pour concourir a des dépenses d\'intérêt public, et produits de legs et donations. Portes directement en recettes et ouvrent des crédits supplementaires de meme montant.</p>
                  <p><strong>Attributions de produits (Art. 72) :</strong> Recettes tirees de la remuneration des prestations d\'un service du Pouvoir central, affectees a ce meme service par arrete ministeriel.</p>
                  <p><strong>Retablissement de crédits (Art. 73) :</strong> Recettes provenant de restitutions de sommes payees indument ou de cessions de biens, qui viennent retablir les crédits initialement utilises.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l5q1',
            question: 'Selon l\'Art. 66 LOFIP, comment les comptes de concours financiers sont-ils dotes ?',
            options: [
              { id: 'a', texte: 'Credits evaluatifs (peuvent etre depasses)' },
              { id: 'b', texte: 'Credits provisionnels (pour dépenses imprevues)' },
              { id: 'c', texte: 'Credits limitatifs (plafond absolu)' },
              { id: 'd', texte: 'Aucun crédit, financement direct du Tresor' },
              { id: 'e', texte: 'Crédits provisionnels (pour dépenses imprévisibles)' },
            ],
            reponseCorrecte: 'c',
            explication: 'L\'Art. 66 al. 3 LOFIP dispose expressement : « Les comptes de concours financiers sont dotes de crédits limitatifs. » Cela signifie que les prets et avances accordes par le Pouvoir central ne peuvent exceder les dotations votees par la loi de finances.',
            articleRef: 'Art. 66 LOFIP'
          },
          {
            type: 'qcm', id: 'l5q2',
            question: 'Selon l\'Art. 62 LOFIP, qu\'est-ce qui caracterise les recettes des comptes d\'affectation speciale ?',
            options: [
              { id: 'a', texte: 'Elles sont librement reparties entre tous les ministères' },
              { id: 'b', texte: 'Elles sont en relation directe avec les dépenses concernees' },
              { id: 'c', texte: 'Elles proviennent exclusivement des emprunts exterieurs' },
              { id: 'd', texte: 'Elles alimentent d\'abord le budget général avant redistribution' },
              { id: 'e', texte: 'Elles sont reversées automatiquement à la Caisse de péréquation' },
            ],
            reponseCorrecte: 'b',
            explication: 'L\'Art. 62 LOFIP definit les comptes d\'affectation speciale comme retracant des operations financees au moyen de recettes particulieres « qui sont, par nature, en relation directe avec les dépenses concernees ». Le lien de causalite entre recette et dépense est le critere fondamental.',
            articleRef: 'Art. 62 LOFIP'
          },
        ]} />
      </div>
    )
  },
]

// ─── QCM GLOBAL 15 QUESTIONS ─────────────────────────────────────────────────
const QCM_GLOBAL: QCMQuestion[] = [
  // NIVEAU FACILE (Q1-Q5)
  {
    type: 'qcm', id: 'g1',
    question: 'Combien de composantes constitue le budget du Pouvoir central selon l\'Art. 20 LOFIP ?',
    options: [
      { id: 'a', texte: '1 (le budget général uniquement)' },
      { id: 'b', texte: '2 (budget général + budgets annexes)' },
      { id: 'c', texte: '3 (budget général, budgets annexes, comptes speciaux)' },
      { id: 'd', texte: '4 (budget général, budgets annexes, comptes speciaux, budgets provinciaux)' },
      { id: 'e', texte: '5 (budget général, budgets annexes, comptes spéciaux, budgets ETD et BCC)' },
    ],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 20 al. 2 LOFIP dispose : « Le budget du Pouvoir central comprend le budget général, les budgets annexes et les comptes speciaux tels que definis aux articles 55 et 62 de la présenté loi. » Il y a exactement 3 composantes.',
    articleRef: 'Art. 20 LOFIP'
  },
  {
    type: 'qcm', id: 'g2',
    question: 'Quel est le montant total du budget du Pouvoir central 2025 selon la loi de finances initiale ?',
    options: [
      { id: 'a', texte: '45 376 945 297 405 FC' },
      { id: 'b', texte: '49 846 774 340 275 FC' },
      { id: 'c', texte: '50 691,8 milliards FC' },
      { id: 'd', texte: '3 680 839 771 037 FC' },
      { id: 'e', texte: '54.335,8 milliards FC (LF 2026)' },
    ],
    reponseCorrecte: 'b',
    explication: 'Le budget total 2025 (loi de finances initiale) est de 49 846 774 340 275 FC, soit la somme du budget général (45 376 945 297 405 FC) + budgets annexes (788 989 271 833 FC) + comptes speciaux (3 680 839 771 037 FC). Le montant de 50 691,8 milliards FC est celui de la LFR (loi de finances rectificative de juin 2025).',
    articleRef: 'LF initiale 2025, Art. 20 LOFIP'
  },
  {
    type: 'qcm', id: 'g3',
    question: 'Selon l\'Art. 38 LOFIP, quelle est la règle générale applicable aux crédits budgétaires ?',
    options: [
      { id: 'a', texte: 'Les crédits sont evaluatifs par defaut' },
      { id: 'b', texte: 'Les crédits sont limitatifs par defaut' },
      { id: 'c', texte: 'Les crédits sont provisionnels par defaut' },
      { id: 'd', texte: 'Les crédits n\'ont aucune limite fixee a l\'avance' },
      { id: 'e', texte: 'Les crédits sont discrétionnaires par défaut' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 38 LOFIP pose le principe général : « Sous reserve des dispositions des articles 39 et 40, les crédits budgétaires sont limitatifs. Les dépenses sur crédits limitatifs ne peuvent etre engagees ni ordonnancees au-dela des dotations budgétaires. » Les crédits evaluatifs (Art. 39) et provisionnels (Art. 40) sont des exceptions.',
    articleRef: 'Art. 38 LOFIP'
  },
  {
    type: 'qcm', id: 'g4',
    question: 'Combien de titres compte la nomenclature des charges budgétaires selon l\'Art. 37 LOFIP ?',
    options: [
      { id: 'a', texte: '5 titres' },
      { id: 'b', texte: '6 titres' },
      { id: 'c', texte: '8 titres' },
      { id: 'd', texte: '9 titres' },
      { id: 'e', texte: '12 titres' },
    ],
    reponseCorrecte: 'd',
    explication: 'L\'Art. 37 LOFIP établit 9 titres : 6 pour les dépenses courantes (Titres I a VI : dette en capital, frais financiers, personnel, biens et materiels, prestations, transferts), 2 pour les dépenses en capital (Titres VII et VIII : equipements, constructions) et 1 pour les prets et avances (Titre IX).',
    articleRef: 'Art. 37 LOFIP'
  },
  {
    type: 'qcm', id: 'g5',
    question: 'Selon l\'Art. 16 LOFIP, qu\'est-il interdit au Pouvoir central ?',
    options: [
      { id: 'a', texte: 'D\'emprunter aupres des banques etrangeres' },
      { id: 'b', texte: 'De recourir aux avances de la Banque Centrale du Congo' },
      { id: 'c', texte: 'De voter un budget en déficit' },
      { id: 'd', texte: 'D\'accorder des subventions aux provinces' },
      { id: 'e', texte: 'D\'emprunter directement auprès des ETD' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 16 LOFIP est explicite : « Le recours aux avances de la Banque Centrale du Congo est prohibe tant pour le pouvoir central que pour la province et l\'entite territoriale decentralisee. » Cette interdiction vise a preserver l\'independance de la politique monetaire et a eviter l\'inflation.',
    articleRef: 'Art. 16 LOFIP'
  },
  // NIVEAU MOYEN (Q6-Q10)
  {
    type: 'qcm', id: 'g6',
    question: 'Selon l\'Art. 56 LOFIP, quelle condition un service doit-il remplir pour avoir un budget annexe ?',
    options: [
      { id: 'a', texte: 'Etre dote de la personnalite juridique et produire des services' },
      { id: 'b', texte: 'Etre un service du Pouvoir central sans personnalite juridique produisant des biens ou services remuneres par redevances' },
      { id: 'c', texte: 'Etre une entreprise publique generant des benefices' },
      { id: 'd', texte: 'Etre un établissement public sous tutelle d\'un ministère' },
      { id: 'e', texte: 'Etre rattaché à la BCC et produire des rapports annuels' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 56 LOFIP impose deux conditions cumulatives : (1) etre un service du Pouvoir central non dote de la personnalite juridique ; (2) s\'adonner a titre principal a une activité de production de biens ou de prestations de services remuneres sous forme de redevances. Un établissement public (avec personnalite juridique) ne peut pas avoir de budget annexe.',
    articleRef: 'Art. 56 LOFIP'
  },
  {
    type: 'qcm', id: 'g7',
    question: 'Quel pourcentage des crédits votes a ete exécuté pour les dépenses d\'investissement a fin mars 2025 ?',
    options: [
      { id: 'a', texte: '17,1%' },
      { id: 'b', texte: '10%' },
      { id: 'c', texte: '4%' },
      { id: 'd', texte: '25%' },
      { id: 'e', texte: '12%' },
    ],
    reponseCorrecte: 'c',
    explication: 'Selon le rapport d\'exécution budgétaire de l\'ODEP (mars 2025), le taux d\'exécution global du budget est de 17,1% a fin mars 2025. Mais les dépenses d\'investissement (Titres VII et VIII) n\'ont exécuté que 4% des crédits votes, illustrant le defi structurel de sous-exécution des investissements publics en RDC.',
    articleRef: 'Rapport ODEP mars 2025'
  },
  {
    type: 'qcm', id: 'g8',
    question: 'Selon l\'Art. 65 LOFIP, le total des dépenses d\'un compte d\'affectation speciale ne peut exceder :',
    options: [
      { id: 'a', texte: 'Le plafond fixe par le Ministre du Budget' },
      { id: 'b', texte: 'Le total des recettes constatees (sauf pendant les 3 mois suivant sa creation)' },
      { id: 'c', texte: '80% des recettes prevues par la loi de finances' },
      { id: 'd', texte: 'Le montant autorise par la Cour des comptes' },
      { id: 'e', texte: 'Le montant fixé par le Ministre des Finances par arrêté' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 65 LOFIP dispose : « Le total des dépenses engagees ou ordonnancees au titre d\'un compte d\'affectation speciale ne peut exceder le total des recettes constatees, sauf pendant les trois mois suivant sa creation. » Ce principe garantit l\'équilibre de chaque compte d\'affectation speciale.',
    articleRef: 'Art. 65 LOFIP'
  },
  {
    type: 'qcm', id: 'g9',
    question: 'Selon l\'Art. 24 LOFIP, quelle est la dotation constitutionnelle allouee aux provinces sur les recettes nationales ?',
    options: [
      { id: 'a', texte: '30% des recettes a caractere national' },
      { id: 'b', texte: '35% des recettes a caractere national' },
      { id: 'c', texte: '40% des recettes a caractere national' },
      { id: 'd', texte: '50% des recettes a caractere national' },
      { id: 'e', texte: '25% des recettes a caractere national' },
    ],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 24 al. 3 LOFIP dispose que la loi de finances « fixe globalement la dotation de 40% des recettes a caractere national allouees aux provinces conformement a la Constitution ». Ce taux est consacre par l\'Art. 175 al. 2 de la Constitution du 18 fevrier 2006. En 2025, cette part represente 9 131 900 887 823 FC.',
    articleRef: 'Art. 24 LOFIP, Art. 175 Constitution'
  },
  {
    type: 'qcm', id: 'g10',
    question: 'Selon l\'Art. 57 LOFIP, en combien de sections les budgets annexes sont-ils presentes ?',
    options: [
      { id: 'a', texte: '1 section (operations globales)' },
      { id: 'b', texte: '2 sections (operations courantes + operations en capital)' },
      { id: 'c', texte: '3 sections (recettes + dépenses + tresorerie)' },
      { id: 'd', texte: '4 sections (personnel + fonctionnement + investissement + dette)' },
      { id: 'e', texte: '3 sections (recettes + dépenses courantes + dépenses en capital)' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 57 LOFIP dispose : « Les budgets annexes sont presentes en deux sections. La section des operations courantes et celle des operations en capital. La section des operations courantes retrace les recettes et les dépenses d\'exploitation et celle des operations en capital retrace les dépenses d\'investissement et les ressources affectees a ces dépenses. »',
    articleRef: 'Art. 57 LOFIP'
  },
  // NIVEAU DIFFICILE (Q11-Q15)
  {
    type: 'qcm', id: 'g11',
    question: 'Un ministre decide d\'affecter des crédits du budget annexe de son service au budget général pour financer une urgence. Cette décision est-elle legale selon la LOFIP ?',
    options: [
      { id: 'a', texte: 'Oui, si le Premier ministre l\'autorise par ordonnance' },
      { id: 'b', texte: 'Oui, si la Cour des comptes l\'approuve' },
      { id: 'c', texte: 'Non, l\'Art. 58 LOFIP interdit tout mouvement de crédits entre un budget annexe et le budget général' },
      { id: 'd', texte: 'Oui, en cas d\'urgence nationale declaree' },
      { id: 'e', texte: 'Oui, avec un simple avis favorable du Ministre du Budget' },
    ],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 58 LOFIP est categorique : « Aucun des mouvements de crédits prevus aux articles 46 a 50 de la présenté loi ne peut etre effectue ni entre un budget annexe et le budget général auquel il est rattache, ni entre budgets annexes. » Cette interdiction absolue garantit l\'etancheite des budgets annexes. Aucune exception n\'est prevue, meme en cas d\'urgence.',
    articleRef: 'Art. 58 LOFIP'
  },
  {
    type: 'qcm', id: 'g12',
    question: 'Selon l\'Art. 67 LOFIP, le taux d\'intérêt applicable aux prets et avances des comptes de concours financiers doit etre :',
    options: [
      { id: 'a', texte: 'Egal au taux directeur de la BCC' },
      { id: 'b', texte: 'Au plus egal au taux interbancaire de meme echeance' },
      { id: 'c', texte: 'Fixe a 0% (prets sans intérêt)' },
      { id: 'd', texte: 'Fixe librement par le Ministre des Finances' },
      { id: 'e', texte: 'Nul - les prêts sont toujours sans intérêt par principe constitutionnel' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 67 LOFIP dispose : « Excepte les avances sur dépenses de personnel, ils sont assortis d\'un taux d\'intérêt qui doit etre au plus egal au taux interbancaire de meme echeance, ou, a defaut, d\'echeance la plus proche, fixe par arrete du ministre ayant les finances dans ses attributions. » Le plafond est donc le taux interbancaire, pas le taux directeur.',
    articleRef: 'Art. 67 LOFIP'
  },
  {
    type: 'qcm', id: 'g13',
    question: 'Un compte d\'affectation speciale vient d\'etre cree. Selon l\'Art. 65 LOFIP, ses dépenses peuvent exceder ses recettes constatees pendant :',
    options: [
      { id: 'a', texte: 'Jamais, meme a la creation' },
      { id: 'b', texte: 'Les 3 premiers mois suivant sa creation (decouverts autorises)' },
      { id: 'c', texte: 'La premiere année budgétaire complete' },
      { id: 'd', texte: 'Tant que le Parlement n\'a pas vote de loi de finances rectificative' },
      { id: 'e', texte: 'Pendant 6 mois suivant sa création avec accord du Ministre des Finances' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 65 LOFIP prevoit une exception limitee dans le temps : « sauf pendant les trois mois suivant sa creation. Durant cette periode, le decouverts ne peut etre superieur a un montant fixe par la loi de finances creant le compte. » Au-dela de ces 3 mois, les dépenses ne peuvent plus exceder les recettes constatees.',
    articleRef: 'Art. 65 LOFIP'
  },
  {
    type: 'qcm', id: 'g14',
    question: 'Selon l\'Art. 68 LOFIP, en cas de non-remboursement d\'un pret ou d\'une avance par le debiteur, quelles options s\'offrent au Pouvoir central ?',
    options: [
      { id: 'a', texte: 'Uniquement la saisie des biens du debiteur' },
      { id: 'b', texte: 'Recouvrement immediat, reechelonnement ou constatation d\'une perte' },
      { id: 'c', texte: 'Annulation automatique de la dette apres 5 ans' },
      { id: 'd', texte: 'Saisine exclusive de la Cour Supreme de Justice' },
      { id: 'e', texte: 'Annulation automatique de la créance après 3 ans' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 68 LOFIP prevoit trois options en cas de non-remboursement : (1) décision de recouvrement immediat ou, a defaut, poursuites administratives dans les 6 mois ; (2) décision de reechelonnement ; (3) constatation d\'une perte probable imputee au résultat de l\'exercice, avec recuperation des remboursements ulterieurs en recettes du budget général.',
    articleRef: 'Art. 68 LOFIP'
  },
  {
    type: 'qcm', id: 'g15',
    question: 'Selon l\'Art. 30 LOFIP, la loi portant reddition des comptes établit un compte de résultats. Qu\'inclut-il ?',
    options: [
      { id: 'a', texte: 'Uniquement les recettes fiscales de l\'exercice' },
      { id: 'b', texte: 'Le déficit ou excedent du budget général et budgets annexes, les profits/pertes des comptes speciaux, les profits/pertes des operations de tresorerie' },
      { id: 'c', texte: 'Uniquement les dépenses d\'investissement realisees' },
      { id: 'd', texte: 'Le bilan patrimonial de l\'Etat' },
      { id: 'e', texte: 'Uniquement les emprunts et remboursements de dette de l\'exercice' },
    ],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 30 LOFIP dispose que le compte de résultats comprend : le déficit ou l\'excedent resultant de la difference entre recettes et dépenses du budget général et des budgets annexes ; les profits et pertes constatees dans l\'exécution des comptes speciaux ; les profits et pertes resultant eventuellement de la gestion des operations de tresorerie.',
    articleRef: 'Art. 30 LOFIP'
  },
]

// ─── CAS PRATIQUES ────────────────────────────────────────────────────────────
const ETUDES_DE_CAS = [
  {
    titre: 'Cas pratique 1 : Classification et analyse du budget du Ministere de la Sante 2025',
    contexte: `Dans le cadre de la préparation du budget 2026, le Directeur de la Planification du Ministere de la Sante examine l\'exécution du budget 2025. Les donnees suivantes sont disponibles pour son ministère :

BUDGET SANTE 2025 (crédits votes en FC) :
- Titre III (Personnel) : 12 400 000 000 FC - Execute a 98%
- Titre IV (Biens et materiels) : 3 200 000 000 FC - Execute a 45%
- Titre V (Prestations de services) : 1 800 000 000 FC - Execute a 62%
- Titre VI (Transferts : subventions hopitaux) : 8 500 000 000 FC - Execute a 71%
- Titre VII (Equipements medicaux) : 4 100 000 000 FC - Execute a 8%
- Titre VIII (Construction hopitaux) : 6 000 000 000 FC - Execute a 3%

Par ailleurs, une epidemie de cholera eclate dans la province du Maniema en septembre 2025. Le Ministere demande en urgence 500 000 000 FC supplementaires pour l\'achat de medicaments et l\'envoi d\'equipes medicales mobiles, alors que les crédits du Titre IV sont epuises.`,
    questions: [
      {
        num: '1',
        enonce: 'Calculez les montants executes et les restes a executer pour chaque titre. Quel constat faites-vous sur la structure d\'exécution ?',
        correction: `CALCULS D\'EXECUTION :

Titre III (Personnel) : Execute = 12 400 000 000 x 98% = 12 152 000 000 FC | Reste = 248 000 000 FC
Titre IV (Biens) : Execute = 3 200 000 000 x 45% = 1 440 000 000 FC | Reste = 1 760 000 000 FC
Titre V (Prestations) : Execute = 1 800 000 000 x 62% = 1 116 000 000 FC | Reste = 684 000 000 FC
Titre VI (Transferts) : Execute = 8 500 000 000 x 71% = 6 035 000 000 FC | Reste = 2 465 000 000 FC
Titre VII (Equipements) : Execute = 4 100 000 000 x 8% = 328 000 000 FC | Reste = 3 772 000 000 FC
Titre VIII (Constructions) : Execute = 6 000 000 000 x 3% = 180 000 000 FC | Reste = 5 820 000 000 FC

TOTAL exécuté : 21 251 000 000 FC sur 36 000 000 000 FC votes, soit 59% global.

CONSTAT : Le budget sante souffre d\'un biais structurel caracteristique des administrations congolaises : exécution quasi-totale des dépenses de personnel (98%) contre sous-exécution dramatique des investissements (Titre VII : 8%, Titre VIII : 3%). Ce profil d\'exécution confirme les donnees nationales ODEP mars 2025 (4% d\'exécution des crédits d\'investissement). Les dépenses de fonctionnement (Titre IV : 45%) souffrent de problemes de passation des marches et de disponibilite des crédits de tresorerie.`
      },
      {
        num: '2',
        enonce: 'Le Ministre de la Sante peut-il engager les 500 000 000 FC necessaires pour l\'epidemie de cholera sur les crédits du Titre IV alors qu\'ils sont epuises ? Quelle est la procédure legale prevue par la LOFIP ?',
        correction: `REPONSE : NON. L\'Art. 38 LOFIP est categorique : les crédits limitatifs « ne peuvent etre engages ni ordonnances au-dela des dotations budgétaires ». Le Titre IV etant epuise, aucune nouvelle dépense ne peut y etre imputee. Tout engagement au-dela des crédits disponibles est illegal et engage la responsabilite personnelle et pecuniaire de l\'ordonnateur.

PROCEDURES LEGALES DISPONIBLES :

Option 1 - Credits provisionnels (Art. 40 LOFIP) : L\'epidemie de cholera constitue une catastrophe sanitaire, soit exactement le type de dépense "accidentelle et imprévisible" vise par l\'Art. 40. Si une dotation provisionnelle existe au budget, elle peut etre mobilisee. En cas d\'insuffisance, des crédits supplementaires doivent etre demandes au Parlement conformement a l\'Art. 129 de la Constitution.

Option 2 - Loi de finances rectificative (Art. 26-27 LOFIP) : Le Gouvernement peut modifier la loi de finances initiale par une LFR pour ouvrir de nouveaux crédits. L\'Art. 41 exige que les voies et moyens de financement soient identifies simultanement.

Option 3 - Virement de crédits (Art. 46-50 LOFIP) : Sous reserve des conditions fixees par la LOFIP, un virement de crédits peut etre autorise d\'un titre a l\'autre, dans la limite fixee par la loi de finances.

EN PRATIQUE 2025 : La LFR n 25/044 a precisement servi a reajuster des dotations budgétaires en cours d\'année pour faire face a des urgences de ce type.`
      },
    ]
  },
  {
    titre: 'Cas pratique 2 : Analyse d\'un compte d\'affectation speciale - Fonds routier',
    contexte: `Le Fonds routier de la RDC est un compte d\'affectation speciale finance par une fraction des taxes sur les carburants. Pour l\'exercice 2025, les donnees suivantes sont disponibles :

FONDS ROUTIER 2025 :
- Recettes prevues par la loi de finances : 850 000 000 000 FC
- Recettes reellement encaissees a fin septembre 2025 : 620 000 000 000 FC
- Depenses engagees a fin septembre 2025 : 580 000 000 000 FC
- Commandes supplementaires de travaux passes par le Directeur du Fonds : 95 000 000 000 FC (portant les engagements totaux a 675 000 000 000 FC)
- Solde non utilise de l\'année precedente (2024) : 45 000 000 000 FC (reporte automatiquement)

Question de fond : Le Directeur du Fonds routier soutient que le depassement est justifie car les recettes previsionnelles seront atteintes avant fin decembre 2025.`,
    questions: [
      {
        num: '1',
        enonce: 'Evaluez la legalite des engagements supplementaires de 95 000 000 000 FC du Directeur du Fonds au regard de l\'Art. 65 LOFIP.',
        correction: `ANALYSE SELON L\'ART. 65 LOFIP :

L\'Art. 65 LOFIP dispose : « Le total des dépenses engagees ou ordonnancees au titre d\'un compte d\'affectation speciale ne peut exceder le total des recettes constatees. »

CALCUL :
- Recettes constatees (reellement encaissees) a fin septembre : 620 000 000 000 FC
- Solde reporte de 2024 : + 45 000 000 000 FC
- Total ressources disponibles : 665 000 000 000 FC

- Engagements initiaux : 580 000 000 000 FC
- Engagements supplementaires : + 95 000 000 000 FC
- Total engagements : 675 000 000 000 FC

DEPASSEMENT : 675 000 000 000 FC - 665 000 000 000 FC = 10 000 000 000 FC de depassement illegal.

CONCLUSION : Les engagements supplementaires du Directeur violent l\'Art. 65 LOFIP a hauteur de 10 000 000 000 FC. L\'Art. 65 se refere aux recettes CONSTATEES (effectivement encaissees), non aux recettes PREVUES. L\'argument du Directeur selon lequel les recettes previsionnelles seront atteintes avant fin decembre est inoperant : la loi impose de respecter le plafond des recettes reellement encaissees, pas estimees. Cette violation engage la responsabilite du Directeur.`
      },
      {
        num: '2',
        enonce: 'Selon l\'Art. 61 LOFIP, quel est le sort du solde non utilise du Fonds routier a la fin de l\'exercice ? Cela differe-t-il du regime du budget général ?',
        correction: `REGIME DES COMPTES SPECIAUX (Art. 61 LOFIP) :

L\'Art. 61 al. 2 LOFIP dispose : « Sauf dispositions contraires prevues par une loi de finances, le solde de chaque compte special est reporte sur l\'année suivante. »

Pour le Fonds routier : Le solde non utilise de 2024 (45 000 000 000 FC) a ete reporte automatiquement sur 2025, conformement a l\'Art. 61. Ce report est la règle par defaut pour tous les comptes speciaux.

DIFFERENCE AVEC LE BUDGET GENERAL :
Pour le budget général, l\'Art. 29 al. 4 LOFIP prevoit que la loi portant reddition des comptes « annule la difference entre le montant des crédits ouverts par le budget et le montant de dépenses payees au 31 decembre ». Les crédits non utilises du budget général sont donc annules en fin d\'exercice, sauf exceptions (Art. 53 sur les reports de crédits).

SYNTHESE COMPARATIVE :
- Comptes speciaux : solde reporte automatiquement (règle générale Art. 61)
- Budget général : crédits non utilises annules (Art. 29), reports exceptionnels autorises (Art. 53)

Ce mecanisme de report du solde des comptes speciaux constitue une incitation a l\'epargne budgétaire et permet la realisation de projets pluriannuels (ex : travaux routiers sur plusieurs exercices).`
      },
    ]
  },
  {
    titre: 'Cas pratique 3 : Mise en jeu de la responsabilite - compte d\'affectation speciale depassé',
    contexte: `Le Directeur du Fonds national de developpement agricole (FNDA), un compte d\'affectation speciale alimente par une fraction de la TVA agricole, a engage des dépenses de 980 milliards FC au titre de l\'exercice 2026 (LF 2026, Loi n° 25/060). Les recettes effectivement constatees a la date d\'engagement ne s\'elèvent qu\'a 810 milliards FC. Il justifie son depassement par les «perspectives favorables» de collecte de la TVA agricole d\'ici fin decembre 2026. Par ailleurs, il a cree, sans aucune autorisation legale, un sous-compte de tresorerie destine a recevoir des versements volontaires d\'entreprises prives pour financer des projets speciaux.

Question de fond : L\'Inspecteur general des finances, saisi par le Ministre des Finances, analyse la legalite de ces operations.`,
    questions: [
      {
        num: '1',
        enonce: 'Le depassement de 170 milliards FC est-il legal au regard de l\'Art. 65 LOFIP ? L\'argument des « perspectives favorables » peut-il justifier ce depassement selon le texte de la loi ?',
        correction: `NON, le depassement est illegal. L\'Art. 65 LOFIP dispose expresseement : « Le total des dépenses engagees ou ordonnancees au titre d\'un compte d\'affectation speciale ne peut exceder le total des recettes CONSTATEES. » La loi utilise le terme «recettes constatees» (reellement encaissees), pas «recettes previsonelles» ou «recettes esperees». L\'argument du Directeur fondé sur des «perspectives favorables» est inoperant en droit : l\'Art. 65 impose un critère objectif (encaissement effectif) et non un critère subjectif (anticipation). L\'unique exception admise par l\'Art. 65 est la période des 3 premiers mois suivant la creation du compte. Le FNDA n\'étant pas nouvellement créé, cette exception ne s\'applique pas. Le depassement de 170 milliards FC engage la responsabilité personnelle et pecuniaire du Directeur.`
      },
      {
        num: '2',
        enonce: 'La creation d\'un sous-compte de tresorerie destine a recevoir des versements d\'entreprises privees est-elle legale selon les Art. 59-60 LOFIP ?',
        correction: `NON, cette creation est illegal. Les Art. 59 et 60 LOFIP sont clairs : « La creation ou la suppression d\'un compte special et l\'affectation d\'une recette a un tel compte s\'operent exclusivement par les lois de finances. » Aucune autorité administrative - meme le Ministre des Finances ou le Premier Ministre - ne peut creer un compte special par simple decision. Seule la loi de finances (votée par le Parlement) peut le faire. Par ailleurs, la reception de versements d\'entreprises privées sans base légale constitue une violation du principe d\'universalite (Art. 7 LOFIP) et du principe de légalité des recettes (Art. 9 LOFIP). Ces fonds recus illégalement doivent etre reverses au Tresor et l\'ordonnateur peut etre poursuivi.`
      },
      {
        num: '3',
        enonce: 'Quelles sont les consequences juridiques et les sanctions encourues par le Directeur du FNDA selon la LOFIP et la Constitution ?',
        correction: `Le Directeur du FNDA s\'expose a plusieurs types de consequences : (1) Responsabilite personnelle et pecuniaire (LOFIP) : en tant qu\'ordonnateur ayant engage des dépenses au-dela des credits disponibles, il est personnellement responsable du depassement de 170 milliards FC. La Cour des comptes (Art. 178-180 Constitution) peut le condamner a reverser cette somme sur ses deniers propres. (2) Responsabilite penale : la creation d\'un sous-compte illegal pour recevoir des fonds prives peut constituer une infraction de detournement de fonds publics ou de corruption passive, susceptible de poursuites devant les juridictions penales. (3) Sanctions administratives : le Ministre des Finances peut le suspendre de ses fonctions dans l\'attente de l\'issue des enquetes. (4) Irregularite budgetaire a corriger : les 170 milliards FC de depassement doivent etre regularises dans la plus prochaine loi de finances rectificative ou loi de reglements budgetaires.`
      },
    ]
  },
  {
    titre: 'Cas pratique 4 : Reddition des comptes et loi de reglements - Art. 28-31 LOFIP',
    contexte: `A la cloture de l\'exercice 2025, le Ministere des Finances prepare le projet de loi de reglements (Art. 28 LOFIP). Les donnees suivantes sont disponibles pour le budget general :

BUDGET GENERAL 2025 (en milliards FC) :
- Credits votes : 45 376,9 (budget initial) + 5 314,9 (credits supplementaires LFR) = 50 691,8
- Dépenses payees au 31 decembre 2025 : 42 180,5 milliards FC
- Recettes realisees : 39 876,2 milliards FC
- Solde Compte general du Tresor au 31/12/2025 : (2 304,3) milliards FC (debiteur)

Par ailleurs, deux comptes d\'affectation speciale presentent des soldes positifs (excedents non utilises) qui, selon un fonctionnaire, devraient etre «rapatries automatiquement au budget general».`,
    questions: [
      {
        num: '1',
        enonce: 'Etablissez le compte de resultats prevu par l\'Art. 30 LOFIP pour le budget general 2025. Calculez le deficit ou excedent en respectant la nomenclature legale.',
        correction: `COMPTE DE RESULTATS - Budget general 2025 (Art. 30 LOFIP) :

Recettes realisees : 39 876,2 milliards FC
Moins : Dépenses payees : 42 180,5 milliards FC
= Deficit du budget general : (2 304,3) milliards FC

Nota : Conformement aux Art. 29 et 30 LOFIP, la loi portant reddition des comptes presente ce resultat en comparant les recettes realisees et les dépenses effectivement payees au 31 decembre. L\'Art. 29 al. 4 LOFIP prevoit que la difference entre credits ouverts (50 691,8 milliards FC) et dépenses payees (42 180,5 milliards FC), soit 8 511,3 milliards FC, est annulee par la loi de reglements - ce sont les crédits non consommes. La valeur entre parentheses du solde du Compte general du Tresor confirme la position debitrice (deficit de tresorerie).`
      },
      {
        num: '2',
        enonce: 'Le fonctionnaire affirme que les soldes positifs des comptes d\'affectation speciale doivent etre «rapatries automatiquement au budget general» en fin d\'exercice. Est-ce exact selon l\'Art. 61 LOFIP ?',
        correction: `NON, cette affirmation est inexacte. L\'Art. 61 al. 2 LOFIP dispose : « Sauf dispositions contraires prevues par une loi de finances, le solde de chaque compte special est reporte sur l\'annee suivante. » Le principe est donc le REPORT automatique des soldes excedentaires des comptes speciaux, non leur rapatriement au budget general. Ce mecanisme est fondamentalement different du regime du budget general, ou les credits non utilises sont annules (Art. 29 al. 4). Toutefois, si une loi de finances le prevoit expresseement, le solde peut etre cloture et le solde excedentaire verse au budget general. Sans cette disposition legale, le fonctionnaire ne peut pas ordonnancer un tel versement.`
      },
      {
        num: '3',
        enonce: 'Selon l\'Art. 28 LOFIP, quel est le delai constitutional pour deposer le projet de loi portant reddition des comptes devant le Parlement ? Quelle institution certifie ces comptes ?',
        correction: `Selon l\'Art. 28 al. 1 LOFIP : « Le projet de loi portant reddition des comptes est depose par le Gouvernement sur le bureau de l\'Assemblee nationale avant le 30 juin de l\'annee suivant celle de l\'exercice auquel il se rapporte. » Pour l\'exercice 2025, le projet doit donc etre depose avant le 30 juin 2026. L\'Art. 28 al. 2 LOFIP precise que « ce projet est accompagne du rapport de la Cour des comptes ». C\'est la Cour des comptes (Art. 178 Constitution) qui certifie la regularite et la sincerite des comptes de l\'Etat. Elle verifie la conformite des operations budgetaires avec les autorisations parlementaires et rend un rapport public sur ses constatations, qui accompagne obligatoirement le projet de loi de reglements.`
      },
    ]
  },
  {
    titre: 'Cas pratique 5 : Budget 2026 et retrocession aux provinces - Art. 24 LOFIP et LF 2026',
    contexte: `La Loi de Finances 2026 (Loi n° 25/060 du 29 decembre 2025) fixe le budget total en equilibre a 54.335,8 milliards FC (Art. 6). Les recettes du budget general s\'elevent a 48.969,3 milliards FC (Art. 7). L\'Art. 8 de la LF 2026 fixe la retrocession aux provinces a 7.694,5 milliards FC (40% des recettes a caractere national). La Caisse de perequation est dotee de 744,6 milliards FC (Art. 9 LF 2026).

Le Gouverneur de la Province du Kasai affirme en conference de presse : « Le Pouvoir central ne nous verse que 30% de nos droits constitutionnels. Notre province devrait recevoir beaucoup plus. » Par ailleurs, un conseiller ministeriel suggere de creer, par simple arrete interministeriel, une «Caisse provinciale supplementaire» hors budget, alimentee par 5% des recettes minieres de la province.`,
    questions: [
      {
        num: '1',
        enonce: 'Verifiez chiffralement si la retrocession de 7.694,5 milliards FC prevue par l\'Art. 8 LF 2026 respecte la regle constitutionnelle des 40% (Art. 175 Constitution et Art. 24 LOFIP). L\'affirmation du Gouverneur est-elle exacte ?',
        correction: `VERIFICATION CHIFFRALE :

Base de calcul : recettes a caractere national = recettes totales du budget general (48.969,3 milliards FC) moins les recettes non nationales (ressources propres des provinces, dons affectes, etc.). Sans la decomposition exacte, on peut verifier par la proportion : 7.694,5 / 48.969,3 = 15,7% - ce ratio semble bas. Cependant, la retrocession de 40% s\'applique aux seules «recettes a caractere national», pas au total des recettes. Si les recettes a caractere national sont de l\'ordre de 19.236 milliards FC, alors 40% = 7.694,5 milliards FC, ce qui est cohérent. L\'affirmation du Gouverneur (30% au lieu de 40%) n\'est pas etayee par les chiffres de la LF 2026. L\'Art. 8 de la Loi n° 25/060 et l\'Art. 24 al. 3 LOFIP garantissent expressement les 40% constitutionnels. Si le Gouverneur conteste, il peut saisir la Cour constitutionnelle - mais non modifier unilateralement le budget.`
      },
      {
        num: '2',
        enonce: 'La creation d\'une «Caisse provinciale supplementaire» par arrete interministeriel, alimentee par 5% des recettes minieres, est-elle legale selon la LOFIP et la LF 2026 ? Analysez sous l\'angle des principes d\'universalite et de legalite.',
        correction: `Cette creation est doublement illegal. (1) Violation du principe de legalite (Art. 9 LOFIP + Art. 4 LF 2026) : aucun privilege fiscal ni aucune affectation specifique de recettes ne peut etre cree par arrete ministeriel. Seule une loi de finances peut creer un compte special ou affecter une fraction de recettes a une destination particuliere (Art. 59-60 LOFIP). (2) Violation du principe d\'universalite (Art. 7 LOFIP + Art. 3 LF 2026) : l\'Art. 7 interdit l\'affectation prealable de recettes specifiques a des dépenses specifiques. Capturer 5% des recettes minieres hors budget general constitue une affectation preallable prohibee. La LF 2026 (Art. 3) rappelle expresseement l\'interdiction de compensation et de toute derogation au principe d\'universalite sans base legislative. La seule voie legale est de proposer un projet de loi de finances ou une LFR au Parlement.`
      },
      {
        num: '3',
        enonce: 'Comment la LF 2026 (Loi n° 25/060) articule-t-elle la Caisse de perequation (Art. 9) avec la retrocession provinciale (Art. 8) ? Quels sont leurs fondements respectifs dans la LOFIP et la Constitution ?',
        correction: `La LF 2026 (Loi n° 25/060 du 29 décembre 2025) distingue deux mecanismes complementaires : (1) Retrocession 40% (Art. 8 LF 2026 - 7.694,5 milliards FC) : il s\'agit de la part des recettes a caractere national revenant directement aux provinces selon l\'Art. 175 al. 2 de la Constitution. Son fondement dans la LOFIP est l\'Art. 24 al. 3. C\'est un droit constitutionnel absolu, non soumis a la discretion du Gouvernement central. (2) Caisse de perequation (Art. 9 LF 2026 - 744,6 milliards FC) : c\'est un mecanisme de solidarite nationale visant a corriger les desequilibres de developpement entre provinces riches en ressources et provinces pauvres. Son fondement est l\'Art. 181 de la Constitution. La LOFIP y fait reference mais ne le cree pas - c\'est la Constitution qui l\'institue. Ces deux mecanismes sont distincts : la retrocession est un droit de chaque province sur ses propres recettes generees ; la perequation est une redistribution nationale au profit des provinces les moins dotees.`
      },
    ]
  },
]

// ─── PAGE PRINCIPALE ─────────────────────────────────────────────────────────
export default function UE5Chapitre3Page() {
  const [, navigate] = useHashLocation()
  const goBack = useGoBack('/ue5-finances-publiques')
  const currentUser = useUser()
  const isStudent = isStudentRole(currentUser)

  const [activeTab, setActiveTab] = useState<'lecons' | 'qcm' | 'cas' | 'devoir'>('lecons')
  const [leconIdx, setLeconIdx] = useState(0)
  const lecon = LECONS[leconIdx]
  const isFirst = leconIdx === 0
  const isLast = leconIdx === LECONS.length - 1

  return (
    <div className="space-y-4 pb-10 animate-fadeIn">
            <div className="space-y-1">
        <Breadcrumb
          items={[
            { label: 'Mes cours', route: '/mes-cours' },
            { label: 'UE 5 - Finances publiques', route: '/ue5-finances-publiques' },
            { label: 'Chapitre 3' },
          ]}
          color="emerald"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-display font-bold text-foreground leading-tight">Structure et presentation du budget de l\'Etat</h1>
          <InfoTooltip texte="Ce chapitre analyse la structure du budget du Pouvoir central : budget général, budgets annexes, comptes speciaux, nomenclature des charges par titres et regimes des crédits (Art. 20, 32, 36-41, 55-73 LOFIP)." loi="Art. 20, 36-41, 55-73 LOFIP" />
        </div>
        <p className="text-xs text-muted-foreground">LOFIP Art. 16-32, 36-41, 55-73 · Budget 2025 : 49 846 Mds FC · LFR n 25/044</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Lecons', value: String(LECONS.length) },
          { label: 'QCM', value: String(QCM_GLOBAL.length) },
          { label: 'Cas pratiques', value: String(ETUDES_DE_CAS.length) },
          { label: 'Duree', value: '5h00' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-emerald-600" />
          <span className="text-sm font-semibold text-emerald-800">Objectifs du chapitre</span>
        </div>
        <ul className="space-y-1">
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Decrire la structure tripartite du budget du Pouvoir central : budget général, budgets annexes, comptes speciaux (Art. 20 LOFIP)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Identifier les categories de ressources budgétaires et la retrocession de 40% aux provinces (Art. 24, 175 Constitution)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Maitriser la nomenclature des charges par 9 titres (Art. 37 LOFIP) et les regimes des crédits (Art. 38-41)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Distinguer budgets annexes (Art. 55-58) et comptes speciaux : comptes d\'affectation speciale (Art. 62-65) et comptes de concours financiers (Art. 66-68)</span></li>
          <li className="flex items-start gap-2 text-xs text-emerald-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-emerald-500" /><span>Lire et analyser les chiffres reels du budget 2025 : 49 846 Mds FC (LF initiale) et 50 691,8 Mds FC (LFR juin 2025)</span></li>
        </ul>
      </div>

      <div className="flex gap-1 rounded-xl bg-muted p-1">
        {(isStudent
          ? [['lecons', 'Lecons'], ['devoir', 'Devoir']] as [typeof activeTab, string][]
          : [['lecons', 'Lecons'], ['qcm', 'QCM'], ['cas', 'Cas pratiques'], ['devoir', 'Devoir']] as [typeof activeTab, string][]
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
              <button key={l.id} onClick={() => setLeconIdx(i)} className={cn('flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors', leconIdx === i ? 'bg-emerald-600 text-white border-emerald-600' : 'border-border hover:border-emerald-300 hover:bg-muted')}>
                {l.icone && React.cloneElement(l.icone as React.ReactElement, { className: 'h-3.5 w-3.5' })}
                L{i + 1}
              </button>
            ))}
          </div>

          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="rounded-lg bg-emerald-100 p-2 text-emerald-600 shrink-0">
                {lecon.icone}
              </div>
              <div>
                <h2 className="text-sm font-display font-bold text-foreground">{lecon.titre}</h2>
                <p className="text-xs text-muted-foreground mt-0.5">{lecon.soustitre}</p>
              </div>
            </div>
            {lecon.contenu}
          </div>

          <div className="flex gap-2">
            <button onClick={() => setLeconIdx(i => Math.max(0, i - 1))} disabled={isFirst} className="flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted disabled:opacity-40 transition-colors">
              <ArrowLeft className="h-3.5 w-3.5" /> Precedente
            </button>
            <div className="flex-1 flex items-center justify-center">
              <span className="text-xs text-muted-foreground">Lecon {leconIdx + 1} / {LECONS.length}</span>
            </div>
            <button onClick={() => setLeconIdx(i => Math.min(LECONS.length - 1, i + 1))} disabled={isLast} className="flex items-center gap-1 rounded-lg border border-border px-4 py-2 text-sm hover:bg-muted disabled:opacity-40 transition-colors">
              Suivante <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      )}

      {activeTab === 'qcm' && !isStudent && (
        <div className="space-y-2">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
            <p className="text-xs text-emerald-700 font-medium">15 questions · 5 faciles · 5 moyennes · 5 difficiles · Sources : LOFIP Art. 16-73 · Budget 2025</p>
          </div>
          <QCMPageUnique questions={QCM_GLOBAL as unknown as QCMChapitre[]} couleurAccent="emerald" />
        </div>
      )}

      {activeTab === 'cas' && !isStudent && (
        <div className="space-y-4">
          <div className="rounded-xl border border-emerald-200 bg-emerald-50/50 p-3">
            <p className="text-xs text-emerald-700 font-medium">2 cas pratiques enrichis · Application des Art. 37-41, 55-73 LOFIP · Donnees reelles budget 2025</p>
          </div>
          {ETUDES_DE_CAS.map(cas => (
            <CasPratiqueBlock key={cas.titre} cas={cas} />
          ))}
        </div>
      )}

      {activeTab === 'devoir' && (
        <DevoirChapitreCreateur
          chapitreId="ue5-chapitre-3"
          chapitreNom="Chapitre 3 - Structure et presentation du budget de l\'Etat"
          questions={QCM_GLOBAL as unknown as QCMChapitre[]}
          coursId="ue5-finances-publiques"
          casPratiquesExistants={ETUDES_DE_CAS.map(versCasPratiqueExistant)}
        />
      )}

      <button onClick={goBack} className="w-full rounded-xl bg-emerald-600 text-white py-3 font-semibold text-sm hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Retour aux chapitres UE 5
      </button>
    </div>
  )
}
