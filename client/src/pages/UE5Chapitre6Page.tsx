import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import { useGoBack } from '@/lib/navContext'
import { Breadcrumb } from '@/components/Breadcrumb'
import {
  ArrowLeft, ArrowRight, CheckCircle2, XCircle,
  BookOpen, FileText, Users, Clock,
  ChevronRight, RotateCcw, AlertTriangle, Scale, Building2, Coins
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'
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

type Lecon = {
  id: string
  icone: React.ReactNode
  titre: string
  soustitre: string
  contenu: React.ReactNode
}

// ─── QCMBlock ─────────────────────────────────────────────────────────────────
function QCMBlock({ questions }: { questions: QCMQuestion[] }) {
  const [reponses, setReponses] = useState<Record<string, string>>({})
  const [verifie, setVerifie] = useState(false)
  const [score, setScore] = useState<number | null>(null)

  const handleSelect = (qId: string, optId: string) => {
    if (verifie) return
    setReponses(prev => ({ ...prev, [qId]: optId }))
  }
  const handleVerifier = () => {
    let c = 0
    questions.forEach(q => { if (reponses[q.id] === q.reponseCorrecte) c++ })
    setScore(c); setVerifie(true)
  }
  const handleReset = () => { setReponses({}); setVerifie(false); setScore(null) }

  return (
    <div className="space-y-4 mt-4">
      {questions.map((q, qi) => {
        const isCorrect = reponses[q.id] === q.reponseCorrecte
        return (
          <div key={q.id} className="rounded-xl border border-indigo-200 bg-card p-4">
            <p className="text-sm font-semibold text-foreground mb-1">Q{qi + 1}. {q.question}</p>
            <p className="text-xs text-muted-foreground mb-3 italic">{q.articleRef}</p>
            <div className="space-y-2">
              {q.options.map(opt => {
                const selected = reponses[q.id] === opt.id
                const isRight = opt.id === q.reponseCorrecte
                let cls = 'flex items-center gap-2 rounded-lg border px-3 py-2 text-xs cursor-pointer transition-colors '
                if (!verifie) cls += selected ? 'border-indigo-500 bg-indigo-50 text-indigo-800' : 'border-border hover:border-indigo-300 hover:bg-muted'
                else if (isRight) cls += 'border-green-500 bg-green-50 text-green-800'
                else if (selected && !isRight) cls += 'border-red-400 bg-red-50 text-red-700'
                else cls += 'border-border text-muted-foreground'
                return (
                  <div key={opt.id} className={cls} onClick={() => handleSelect(q.id, opt.id)}>
                    {verifie && isRight && <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-green-500" />}
                    {verifie && selected && !isRight && <XCircle className="h-3.5 w-3.5 shrink-0 text-red-500" />}
                    <span>{opt.texte}</span>
                  </div>
                )
              })}
            </div>
            {verifie && (
              <div className={cn('mt-3 rounded-lg p-3 text-xs', isCorrect ? 'bg-green-50 text-green-800' : 'bg-amber-50 text-amber-800')}>
                <strong>{isCorrect ? 'Correct !' : 'Incorrect.'}</strong> {q.explication}
              </div>
            )}
          </div>
        )
      })}
      <div className="flex gap-2">
        {!verifie ? (
          <button onClick={handleVerifier} disabled={Object.keys(reponses).length < questions.length} className="flex-1 rounded-lg bg-indigo-600 text-white text-sm py-2.5 font-semibold hover:bg-indigo-700 disabled:opacity-40 transition-colors">
            Verifier mes reponses
          </button>
        ) : (
          <>
            <div className="flex-1 rounded-lg bg-indigo-50 border border-indigo-200 px-4 py-2.5 text-center">
              <span className="text-sm font-bold text-indigo-700">Score : {score}/{questions.length}</span>
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

// ─── CasPratiqueBlock ─────────────────────────────────────────────────────────
function CasPratiqueBlock({ cas }: { cas: { titre: string; contexte: string; questions: { num: string; enonce: string; correction: string }[] } }) {
  const [open, setOpen] = useState<Record<string, boolean>>({})
  return (
    <div className="rounded-xl border border-indigo-200 bg-card p-4 space-y-3">
      <h3 className="text-sm font-bold text-indigo-700 flex items-center gap-2">
        <FileText className="h-4 w-4" /> {cas.titre}
      </h3>
      <div className="rounded-lg bg-indigo-50/60 border border-indigo-100 p-3">
        <p className="text-xs text-foreground leading-relaxed">{cas.contexte}</p>
      </div>
      <div className="space-y-3">
        {cas.questions.map(q => (
          <div key={q.num} className="rounded-lg border border-border bg-muted/30 p-3">
            <p className="text-xs font-semibold text-foreground mb-2">Question {q.num} : {q.enonce}</p>
            <button onClick={() => setOpen(prev => ({ ...prev, [q.num]: !prev[q.num] }))} className="flex items-center gap-1 text-xs text-indigo-600 hover:underline">
              <ChevronRight className={cn('h-3.5 w-3.5 transition-transform', open[q.num] && 'rotate-90')} />
              {open[q.num] ? 'Masquer la correction' : 'Voir la correction'}
            </button>
            {open[q.num] && (
              <div className="mt-2 rounded-lg bg-indigo-50 p-3 text-xs text-indigo-800 leading-relaxed whitespace-pre-line">
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
    icone: <Scale className="h-5 w-5" />,
    titre: 'Les trois phases d\'execution des recettes (Art. 89-92 LOFIP)',
    soustitre: 'Constatation, Liquidation, Ordonnancement des recettes publiques',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
          <h3 className="text-sm font-bold text-indigo-800 mb-2">Fondement : Art. 89-92 LOFIP</h3>
          <p className="text-xs text-foreground leading-relaxed mb-2">
            L\'Art. 89 LOFIP pose le principe fondamental : <strong>les recettes du Pouvoir central sont executees conformement aux lois et reglements en vigueur.</strong> Cette disposition signifie que l\'Etat ne peut percevoir une recette que si elle est fondee sur un texte legal (loi fiscale, reglementation douaniere, texte domanial...). Aucune recette ne peut etre percue sans base legale : c\'est le principe de legalite fiscale.
          </p>
          <p className="text-xs text-foreground leading-relaxed">
            L\'Art. 90 organise la procedure d\'execution en trois phases successives et obligatoires : <strong>constatation, liquidation et ordonnancement</strong>. Ces trois phases forment la chaine de recouvrement des recettes publiques, par analogie avec la chaine de la depense (engagement, liquidation, ordonnancement, paiement).
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-4 flex items-center gap-2">
            <Scale className="h-4 w-4 text-indigo-600" /> Les trois phases de l\'execution des recettes (Art. 90 LOFIP)
          </h3>
          <div className="space-y-3">
            {[
              {
                num: '1',
                phase: 'CONSTATATION',
                couleur: 'bg-indigo-600',
                texte: 'Art. 90 al. 1 LOFIP : La constatation consiste a identifier et evaluer la matiere imposable (le fait generateur). Elle etablit l\'existence de la creance de l\'Etat sur le redevable. Exemples : pour la TVA, le fait generateur est la livraison du bien ou la prestation de service ; pour les droits de douane, c\'est le franchissement de la frontiere avec la marchandise ; pour l\'IRPP categorie traitements et salaires, c\'est le paiement du salaire.',
                tooltip: 'La constatation est l\'acte par lequel l\'administration fiscale reconnait l\'existence d\'une obligation fiscale. Sans constatation, il n\'y a pas de creance. C\'est l\'equivalent de l\'engagement dans la chaine de la depense.',
                loi: 'Art. 90 LOFIP'
              },
              {
                num: '2',
                phase: 'LIQUIDATION',
                couleur: 'bg-indigo-500',
                texte: 'Art. 90 al. 2 LOFIP : La liquidation consiste a determiner le montant exact de la creance due par le redevable. Elle applique le taux legal (ou le tarif) a la base imposable constatee. Exemples : pour la TVA, la liquidation applique le taux de 16% (Ordonnance-loi n° 10/001 du 20 aout 2010) a la valeur hors taxe de la vente ; pour les droits de douane, elle applique le taux ad valorem (5%, 10% ou 20%) a la valeur CIF de la marchandise importee.',
                tooltip: 'La liquidation est le calcul precis de l\'impot du. Elle necessite trois elements : la base imposable (ou valeur taxable), le taux applicable et les eventuelles deductions ou abattements prevus par la loi. Toute erreur de liquidation peut faire l\'objet d\'un recours du contribuable.',
                loi: 'Art. 90 LOFIP'
              },
              {
                num: '3',
                phase: 'ORDONNANCEMENT',
                couleur: 'bg-violet-600',
                texte: 'Art. 90 al. 3 LOFIP : L\'ordonnancement consiste a etablir le titre de perception qui autorise le comptable public a proceder au recouvrement de la recette. C\'est l\'acte administratif par lequel l\'ordonnateur (ou son representant) donne l\'ordre formel de recouvrer la somme liquidee. Le titre de perception peut prendre differentes formes selon la nature de la recette : avis de mise en recouvrement (AMR) pour les impots directs, declaration et titre de paiement pour la TVA, bulletin de liquidation pour les droits de douane.',
                tooltip: 'L\'ordonnancement des recettes est l\'equivalent de l\'ordonnancement des depenses. Il donne au comptable public (receveur) l\'autorisation formelle de percevoir la somme due. Sans titre de perception, le comptable ne peut pas legalement encaisser la somme.',
                loi: 'Art. 90 LOFIP'
              },
            ].map(e => (
              <div key={e.num} className="flex gap-3 items-start">
                <div className={cn('text-xs font-bold text-white rounded-lg px-3 py-2 shrink-0 text-center min-w-24', e.couleur)}>
                  Phase {e.num}<br />{e.phase}
                </div>
                <div className="flex-1 rounded-lg border border-border p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <InfoTooltip texte={e.tooltip} loi={e.loi} />
                  </div>
                  <p className="text-xs text-foreground leading-relaxed">{e.texte}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <h3 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> Regle speciale : recettes au comptant (Art. 91 al. 2 LOFIP)
          </h3>
          <p className="text-xs text-amber-700 leading-relaxed">
            L\'Art. 91 al. 2 LOFIP prevoit une derogation pour les recettes percues au comptant (paiement immediat) : <strong>les documents justifiant le paiement tiennent lieu de titres de perception.</strong> L\'ordonnancement intervient apres l\'encaissement, pour regularisation comptable. C\'est notamment le cas pour les droits de timbre, les taxes perceptibles a la caisse du tresor et certaines recettes administratives (DGRAD). Cette inversion de la sequence normale est une exception qui confirme la regle generale des trois phases.
          </p>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l1q1',
            question: 'Selon l\'Art. 90 LOFIP, quelle est la premiere phase de l\'execution des recettes publiques ?',
            options: [
              { id: 'a', texte: 'L\'ordonnancement du titre de perception' },
              { id: 'b', texte: 'La liquidation du montant de la creance' },
              { id: 'c', texte: 'La constatation du fait generateur et de la matiere imposable' },
              { id: 'd', texte: 'Le recouvrement par le comptable public' },
              { id: 'e', texte: 'L\'emission de l\'avis de mise en recouvrement' },
            ],
            reponseCorrecte: 'c',
            explication: 'L\'Art. 90 al. 1 LOFIP dispose que la constatation est la premiere phase : elle consiste a identifier et evaluer la matiere imposable (le fait generateur). Sans constatation, il n\'y a pas de creance de l\'Etat. La sequence obligatoire est : constatation → liquidation → ordonnancement → recouvrement par le comptable.',
            articleRef: 'Art. 90 LOFIP'
          },
          {
            type: 'qcm', id: 'l1q2',
            question: 'Selon l\'Art. 91 al. 2 LOFIP, pour les recettes percues au comptant, a quel moment intervient l\'ordonnancement ?',
            options: [
              { id: 'a', texte: 'Avant la constatation du fait generateur' },
              { id: 'b', texte: 'Simultanement a la liquidation' },
              { id: 'c', texte: 'Apres l\'encaissement, pour regularisation comptable' },
              { id: 'd', texte: 'Dans les 30 jours suivant la constatation' },
              { id: 'e', texte: 'Uniquement sur ordre du Ministre des Finances' },
            ],
            reponseCorrecte: 'c',
            explication: 'L\'Art. 91 al. 2 LOFIP prevoit une derogation pour les recettes au comptant : les documents justifiant le paiement tiennent lieu de titres de perception. L\'ordonnancement intervient apres l\'encaissement, pour regularisation. C\'est une exception a la sequence normale (constatation → liquidation → ordonnancement).',
            articleRef: 'Art. 91 al. 2 LOFIP'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l2',
    icone: <Building2 className="h-5 w-5" />,
    titre: 'Les grandes regies de recettes (Art. 89 LOFIP)',
    soustitre: 'DGI, DGDA, DGRAD, BCC - acteurs du recouvrement des recettes publiques',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
          <h3 className="text-sm font-bold text-indigo-800 mb-2">Principe : specialisation des regies financieres</h3>
          <p className="text-xs text-foreground leading-relaxed">
            Conformement a l\'Art. 89 LOFIP, les recettes sont executees par des regies financieres specialisees, chacune competente pour un type de recette. Ce systeme de specialisation garantit une expertise technique dans chaque domaine fiscal et assure la traçabilite des recettes depuis leur constatation jusqu\'a leur versement au Compte general du Tresor (Art. 110 LOFIP). En 2026, les quatre grandes regies sont la DGI, la DGDA, la DGRAD et, pour certaines recettes specifiques, la Banque Centrale du Congo.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              titre: 'Direction Generale des Impots (DGI)',
              couleur: 'indigo',
              recettes: 'Impot sur les Revenus des Personnes Physiques (IRPP), Impot sur les Societes (IS), Taxe sur la Valeur Ajoutee (TVA 16%), Impot Realise sur les Loyers (IRL), autres impots directs et indirects',
              chiffre2026: '19.033,6 milliards FC (LF 2026, Art. 7)',
              detail: 'La DGI est la premiere regie de recettes par le volume. Elle administre l\'ensemble de la fiscalite interieure (impots directs sur les revenus et impots indirects comme la TVA). L\'Art. 4 LF 2026 rappelle qu\'aucune exemption ni allegement n\'est admis sans disposition legale expresse. La DGI assure la constatation (identification des contribuables), la liquidation (calcul de l\'impot) et l\'ordonnancement (emission des avis de mise en recouvrement).',
              tooltip: 'La DGI est placee sous l\'autorite du Ministre des Finances. Son budget de recouvrement 2026 de 19.033,6 Mds FC represente une hausse de +16% par rapport a la LFR 2025, refletant l\'objectif gouvernemental de mobilisation accrue des recettes internes.',
              loi: 'Art. 89 LOFIP, LF 2026 Art. 7'
            },
            {
              titre: 'Direction Generale des Douanes et Accises (DGDA)',
              couleur: 'blue',
              recettes: 'Droits de douane a l\'importation (5%, 10%, 20% selon categorie tarifaire), droits d\'accises sur alcools, tabacs, cosmetiques, hydrocarbures, vehicules, telecoms, taxe de 2% sur exportations minieres (Art. LF 2026)',
              chiffre2026: '7.522,0 milliards FC (LF 2026, Art. 7, +12,4% vs LFR 2025)',
              detail: 'La DGDA administre la fiscalite de frontiere. Elle controle les importations et exportations, applique les tarifs douaniers (Tarif exterieur commun de la COMESA et tarif national), et perçoit les droits d\'accises sur les produits importes. La LF 2026 a etendu la taxe de 2% a toutes les exportations de produits miniers marchands (Chapitre 26 + Section XV du SH), ce qui accroit substantiellement les recettes DGDA par rapport a 2025.',
              tooltip: 'La DGDA intervient aux postes frontaliers terrestres, ports et aeroports. Elle coopere avec l\'OGEFREM pour les frets et le BIVAC pour l\'inspection des marchandises. La DRC est le 1er producteur mondial de cobalt, ce qui rend les recettes minieres DGDA strategiques.',
              loi: 'Art. 89 LOFIP, LF 2026 Art. 7'
            },
            {
              titre: 'Direction Generale des Recettes Administratives, Judiciaires, Domaniales et de Participations (DGRAD)',
              couleur: 'violet',
              recettes: 'Recettes administratives (droits de chancellerie, visas, passeports, licences), recettes judiciaires (amendes, confiscations, greffes), recettes domaniales (loyers domaniaux, concessions foncieres, droits miniers et petrolieres), dividendes des participations de l\'Etat',
              chiffre2026: '6.469,4 milliards FC (LF 2026, Art. 7)',
              detail: 'La DGRAD est la regie des recettes non fiscales au sens strict. Elle couvre un spectre large de recettes : des simples droits de timbre aux royalties minieres, en passant par les dividendes des entreprises publiques ou des societes a participation de l\'Etat. L\'Art. 91 al. 2 LOFIP s\'applique frequemment aux recettes DGRAD : beaucoup sont perçues au comptant (paiement a la caisse) et l\'ordonnancement intervient a posteriori.',
              tooltip: 'La DGRAD percoit notamment les droits superficiaires miniers (redevances annuelles sur les carrres miniers), les bonus de signature petrolieres et les loyers des concessions foncieres de l\'Etat. Ces recettes domaniales sont tres volatiles car dependant des cours mondiaux et de l\'activite miniere.',
              loi: 'Art. 89 LOFIP, LF 2026 Art. 7'
            },
            {
              titre: 'Banque Centrale du Congo (BCC)',
              couleur: 'amber',
              recettes: 'Recettes petrolieres (revenu de la part de l\'Etat dans les contrats de partage de production), dividendes des societes petrolieres, gestion de la tresorerie en devises etrangeres',
              chiffre2026: 'Inclus dans recettes Budget general (Art. 7 LF 2026)',
              detail: 'La BCC n\'est pas a proprement parler une regie financiere au sens de la LOFIP, mais elle joue un role de caissier de l\'Etat. En tant que banquier de l\'Etat (Art. 110 LOFIP), elle tient le Compte general du Tresor et execute les paiements et encaissements pour le compte du Pouvoir central. Elle gere egalement les recettes petrolieres et les ressources en devises (notamment les recettes des societes minieres payant en USD). L\'Art. 3 LF 2026 rappelle le principe d\'universalite : toutes ces recettes, quel que soit leur origine, doivent transiter par le Compte general du Tresor.',
              tooltip: 'La BCC tient le Compte general du Tresor en vertu de sa mission de banquier de l\'Etat. Les mouvements entre le Tresor et la BCC font l\'objet de bordereaux de versement et de relevances de comptes transmis quotidiennement au Tresor central.',
              loi: 'Art. 89, 110 LOFIP, Art. 3 LF 2026'
            },
          ].map(regie => (
            <div key={regie.titre} className={cn('rounded-xl border bg-card p-4', `border-${regie.couleur}-200`)}>
              <div className="flex items-center gap-2 mb-3">
                <div className={cn('rounded-lg p-1.5 text-white', `bg-${regie.couleur}-600`)}>
                  <Building2 className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{regie.titre}</h3>
                <InfoTooltip texte={regie.tooltip} loi={regie.loi} />
              </div>
              <div className="space-y-2">
                <div className="flex gap-2 rounded-lg bg-muted/30 border border-border p-2.5">
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-indigo-500" />
                  <div>
                    <p className="text-xs font-bold text-foreground">Recettes administrees</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{regie.recettes}</p>
                  </div>
                </div>
                <div className="flex gap-2 rounded-lg bg-muted/30 border border-border p-2.5">
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-indigo-500" />
                  <div>
                    <p className="text-xs font-bold text-foreground">Budget 2026 (LF n° 25/060)</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{regie.chiffre2026}</p>
                  </div>
                </div>
                <div className="flex gap-2 rounded-lg bg-muted/30 border border-border p-2.5">
                  <ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-indigo-500" />
                  <div>
                    <p className="text-xs font-bold text-foreground">Role et missions</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{regie.detail}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l2q1',
            question: 'Quelle regie financiere est competente pour la perception de la TVA (16%) en RDC ?',
            options: [
              { id: 'a', texte: 'La DGDA' },
              { id: 'b', texte: 'La DGRAD' },
              { id: 'c', texte: 'La DGI' },
              { id: 'd', texte: 'La BCC' },
              { id: 'e', texte: 'Le Tresor public directement' },
            ],
            reponseCorrecte: 'c',
            explication: 'La DGI (Direction Generale des Impots) est competente pour la perception de la TVA, impot indirect interieur. La TVA est fixee a 16% par l\'Ordonnance-loi n° 10/001 du 20 aout 2010. La DGDA percoit les droits de douane et accises aux frontieres. La DGRAD gere les recettes non fiscales (administratives, judiciaires, domaniales).',
            articleRef: 'Art. 89 LOFIP, LF 2026'
          },
          {
            type: 'qcm', id: 'l2q2',
            question: 'Selon la LF 2026 (n° 25/060), quel montant de recettes la DGI doit-elle recouvrer en 2026 ?',
            options: [
              { id: 'a', texte: '7.522,0 milliards FC' },
              { id: 'b', texte: '6.469,4 milliards FC' },
              { id: 'c', texte: '19.033,6 milliards FC' },
              { id: 'd', texte: '48.969,3 milliards FC' },
              { id: 'e', texte: '54.335,8 milliards FC' },
            ],
            reponseCorrecte: 'c',
            explication: 'Selon la LF 2026 (LF n° 25/060, Art. 7), les recettes DGI sont fixees a 19.033,6 milliards FC, soit une hausse de +16% par rapport a la LFR 2025. Les 7.522,0 Mds FC sont les recettes DGDA (+12,4%), les 6.469,4 Mds FC sont les recettes DGRAD, les 48.969,3 Mds FC representent le total des recettes du Budget general, et les 54.335,8 Mds FC sont l\'equilibre total du budget (Art. 6 LF 2026).',
            articleRef: 'Art. 7 LF 2026 (n° 25/060)'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l3',
    icone: <Coins className="h-5 w-5" />,
    titre: 'Les types de recettes du budget 2026 (LF n° 25/060)',
    soustitre: 'Droits de douane, accises, TVA, IS, IRPP, recettes minieres - taux et bases legales',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
          <h3 className="text-sm font-bold text-indigo-800 mb-2">LF n° 25/060 du 29 decembre 2025 : Budget 2026</h3>
          <p className="text-xs text-foreground leading-relaxed mb-2">
            La Loi de Finances 2026 (LF n° 25/060 du 29 decembre 2025) fixe l\'equilibre du budget a <strong>54.335,8 milliards FC</strong> (Art. 6), dont <strong>48.969,3 milliards FC</strong> de recettes du Budget general (Art. 7). L\'Art. 3 LF 2026 rappelle le principe d\'universalite : toutes les recettes sont portees au budget sans affectation prealable (sauf exceptions prevues par la loi). L\'Art. 4 LF 2026 confirme qu\'aucune exemption fiscale n\'est admise sans disposition legale expresse.
          </p>
          <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-2.5">
            <p className="text-xs font-bold text-indigo-800">Parametres macro-economiques 2026 (LF 2026)</p>
            <p className="text-xs text-indigo-700 mt-1">Taux de change : 2.467,0 FC/USD · Croissance : 5,3% · Inflation : 4,4% · Pression fiscale : 12,3% · PIB nominal : 269.291,9 milliards FC</p>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Coins className="h-4 w-4 text-indigo-600" /> Droits de douane (DGDA)
            <InfoTooltip texte="Les droits de douane sont des impositions sur les marchandises franchissant la frontiere douaniere. En RDC, ils sont ad valorem (% de la valeur CIF) et varies selon le type de produit. La DGDA applique le Tarif des droits et taxes a l\'entree et a la sortie des marchandises." loi="Tarif douanier RDC, LF 2026" />
          </h3>
          <div className="space-y-2">
            {[
              { taux: '5%', cat: 'Matieres premieres, equipements industriels, intrants agricoles, biens de premiere necessite non transformes', exemple: 'Ble en grains, engrais, machines agricoles' },
              { taux: '10%', cat: 'Produits semi-finis, biens intermediaires, equipements electroniques grand public', exemple: 'Composants electroniques, textiles techniques, pieces detachees' },
              { taux: '20%', cat: 'Produits finis de consommation, biens de luxe, marchandises generales', exemple: 'Vehicules de tourisme, appareils electromenagers, vetements de marque' },
            ].map(d => (
              <div key={d.taux} className="flex gap-3 rounded-lg border border-border p-2.5">
                <span className="text-sm font-bold text-indigo-700 w-12 shrink-0">{d.taux}</span>
                <div>
                  <p className="text-xs font-bold text-foreground">{d.cat}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Ex. : {d.exemple}</p>
                </div>
              </div>
            ))}
            <div className="rounded-lg bg-amber-50 border border-amber-200 p-2.5">
              <p className="text-xs font-bold text-amber-800">Taxe exportations minieres (LF 2026)</p>
              <p className="text-xs text-amber-700 mt-0.5">La LF 2026 a etendu la taxe de 2% a TOUTES les exportations de produits miniers marchands (Chapitre 26 du SH + Section XV : metaux de base). Cela inclut le cobalt, le cuivre, le coltan, le lithium, l\'or et les autres mineraux strategiques. La RDC etant le 1er producteur mondial de cobalt, cette mesure accroit substantiellement les recettes DGDA.</p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Coins className="h-4 w-4 text-indigo-600" /> Droits d\'accises (DGDA)
            <InfoTooltip texte="Les droits d\'accises sont des taxes speciales de consommation frappant certains produits specifiques, generalement nocifs pour la sante (alcools, tabacs) ou presentant un caractere de luxe. Ils s\'ajoutent a la TVA et sont inclus dans le prix final au consommateur." loi="Loi portant fiscalite des accises, LF 2026" />
          </h3>
          <div className="space-y-1.5">
            {[
              'Alcools et boissons alcoolisees (bieres, spiritueux, vins)',
              'Tabacs et produits du tabac (cigarettes, cigares)',
              'Produits cosmetiques (parfums, produits de beaute)',
              'Hydrocarbures (essence, gasoil, kerosene)',
              'Vehicules automobiles (surtout de luxe)',
              'Telecomunications (communications telephoniques)',
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-xs text-foreground rounded-lg bg-muted/30 border border-border px-3 py-2">
                <ChevronRight className="h-3.5 w-3.5 shrink-0 text-indigo-500" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">Principaux impots directs (DGI)</h3>
          <div className="space-y-2">
            {[
              {
                impot: 'TVA - Taxe sur la Valeur Ajoutee',
                taux: '16%',
                base: 'Valeur ajoutee a chaque stade de la production/distribution',
                loi: 'Ordonnance-loi n° 10/001 du 20 aout 2010',
                tooltip: 'La TVA congolaise est une TVA-credit : l\'assujetti collecte la TVA sur ses ventes et deduit la TVA payee sur ses achats. Le solde (TVA collectee - TVA deductible) est verse a la DGI. Si le solde est negatif, le credit TVA peut etre rembourse sous conditions.'
              },
              {
                impot: 'IS - Impot sur les Societes',
                taux: '30% (taux general)',
                base: 'Benefices nets imposables des societes et autres personnes morales',
                loi: 'Ordonnance-loi n° 13/002 portant Code des impots',
                tooltip: 'L\'IS frappe les benefices des societes de capitaux (SA, SARL, SCA) etablies en RDC. Un taux reduit de 15% s\'applique aux societes agricoles et cooperatives. Les entreprises minieres sont soumises a un regime fiscal special (Code minier).'
              },
              {
                impot: 'IRPP - Impot sur les Revenus des Personnes Physiques',
                taux: 'Progressif par tranches (0% a 40%)',
                base: 'Revenus des personnes physiques : traitements/salaires, revenus fonciers, BIC, BNC',
                loi: 'Ordonnance-loi n° 13/002 portant Code des impots',
                tooltip: 'L\'IRPP est cedulaire en RDC : chaque categorie de revenu (traitements et salaires, revenus fonciers, benefices industriels et commerciaux, benefices non commerciaux) est imposee separement avec ses propres regles d\'assiette et taux.'
              },
              {
                impot: 'IRL - Impot Realise sur les Loyers',
                taux: '20% (taux general)',
                base: 'Loyers et revenus locatifs reels ou presumes',
                loi: 'Ordonnance-loi n° 13/002 portant Code des impots',
                tooltip: 'L\'IRL frappe les revenus tires de la location de proprietes baties et non baties situees en RDC. Il est preleve a la source par le locataire qui verse le montant retenu a la DGI dans les 15 jours du mois suivant le paiement du loyer.'
              },
            ].map(imp => (
              <div key={imp.impot} className="rounded-lg border border-border p-3">
                <div className="flex items-center gap-2 mb-1">
                  <p className="text-xs font-bold text-foreground">{imp.impot}</p>
                  <span className="text-xs font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">{imp.taux}</span>
                  <InfoTooltip texte={imp.tooltip} loi={imp.loi} />
                </div>
                <p className="text-xs text-muted-foreground">{imp.base}</p>
                <p className="text-xs text-muted-foreground mt-0.5 italic">{imp.loi}</p>
              </div>
            ))}
          </div>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l3q1',
            question: 'Quel est le taux de TVA applicable en RDC selon l\'Ordonnance-loi n° 10/001 du 20 aout 2010 ?',
            options: [
              { id: 'a', texte: '10%' },
              { id: 'b', texte: '18%' },
              { id: 'c', texte: '20%' },
              { id: 'd', texte: '16%' },
              { id: 'e', texte: '15%' },
            ],
            reponseCorrecte: 'd',
            explication: 'Le taux de TVA en RDC est de 16% en vertu de l\'Ordonnance-loi n° 10/001 du 20 aout 2010. Ce taux s\'applique sur la valeur ajoutee a chaque stade de la production et de la distribution. Il ne faut pas confondre avec le taux de 18% (France), 20% (pays de l\'UEMOA) ou 10% (taux reduit de certains pays).',
            articleRef: 'Ordonnance-loi n° 10/001 du 20/08/2010, LF 2026'
          },
          {
            type: 'qcm', id: 'l3q2',
            question: 'Selon la LF 2026 (n° 25/060), quel est le taux applicable aux exportations de produits miniers marchands (cobalt, cuivre, coltan) ?',
            options: [
              { id: 'a', texte: '0% (exoneration totale)' },
              { id: 'b', texte: '5%' },
              { id: 'c', texte: '10%' },
              { id: 'd', texte: '20%' },
              { id: 'e', texte: '2%' },
            ],
            reponseCorrecte: 'e',
            explication: 'La LF 2026 a etendu la taxe de 2% a TOUTES les exportations de produits miniers marchands (Chapitre 26 du Systeme Harmonise + Section XV : metaux de base). Cette mesure vise a mieux capter la rente miniere, la RDC etant le 1er producteur mondial de cobalt. Auparavant, certains produits beneficiaient d\'exemptions a l\'exportation via l\'article 234 du Code minier, suppressees par la LF 2026.',
            articleRef: 'LF 2026 n° 25/060, Code minier'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l4',
    icone: <FileText className="h-5 w-5" />,
    titre: 'Le principe d\'unite de caisse (Art. 110 LOFIP)',
    soustitre: 'Compte general du Tresor, caissier de l\'Etat, centralisation des recettes',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
          <h3 className="text-sm font-bold text-indigo-800 mb-2">Art. 110 LOFIP : le principe d\'unite de caisse</h3>
          <div className="rounded-lg bg-indigo-50 border border-indigo-200 p-3 mb-3">
            <p className="text-xs text-foreground italic leading-relaxed">
              « Tous les fonds publics appartenant au Pouvoir central doivent etre deposes dans le compte general du Tresor ouvert aupres du caissier de l\'Etat. »
            </p>
            <p className="text-xs text-muted-foreground mt-1">Art. 110 LOFIP</p>
          </div>
          <p className="text-xs text-foreground leading-relaxed">
            L\'Art. 110 LOFIP pose le principe de l'<strong>unite de caisse</strong>, parfois appele principe de l'<strong>unite de tresorerie</strong>. Ce principe est l\'une des innovations majeures de la LOFIP de 2011 par rapport a l\'ancien regime budgetaire congolais. Il signifie que toutes les recettes de l\'Etat, quels que soient leur origine et leur nature, doivent obligatoirement transiter par un compte unique : le <strong>Compte general du Tresor</strong>.
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3 flex items-center gap-2">
            <Building2 className="h-4 w-4 text-indigo-600" /> Le Compte general du Tresor : architecture et acteurs
            <InfoTooltip texte="Le Compte general du Tresor (CGT) est le compte pivot de toutes les operations financieres de l\'Etat. Il est tenu par la Banque Centrale du Congo, qui agit comme caissier de l\'Etat. Toutes les recettes y sont versees et toutes les depenses en sont debitees, assurant une vision consolidee de la tresorerie de l\'Etat." loi="Art. 110 LOFIP" />
          </h3>
          <div className="space-y-3">
            <div className="rounded-lg bg-muted/30 border border-border p-3">
              <p className="text-xs font-bold text-foreground mb-2">Qui tient le Compte general du Tresor ?</p>
              <p className="text-xs text-foreground leading-relaxed">La <strong>Banque Centrale du Congo (BCC)</strong> est le caissier de l\'Etat. Elle tient le Compte general du Tresor, execute les ordres de paiement emis par les comptables publics et transfere les fonds entre les comptes du Tresor et les comptes des ministeres. L\'Art. 110 lui confie cette mission par la LOFIP, ce qui donne a la BCC un role operationnel crucial dans la gestion des finances publiques.</p>
            </div>
            <div className="rounded-lg bg-muted/30 border border-border p-3">
              <p className="text-xs font-bold text-foreground mb-2">Pourquoi ce principe est-il fondamental ?</p>
              <div className="space-y-1.5 mt-1">
                {[
                  { titre: 'Transparence', desc: 'Toutes les recettes apparaissent dans un compte unique, rendant impossible les recettes cachees ou les caisses paralleles.' },
                  { titre: 'Controle de la tresorerie', desc: 'L\'Etat connait a tout moment sa position de tresorerie globale, ce qui permet une gestion optimale des liquidites.' },
                  { titre: 'Lien avec l\'universalite (Art. 14 LOFIP)', desc: 'L\'unite de caisse est le complement operationnel du principe de non-affectation : si toutes les recettes sont dans un compte unique, aucune ne peut etre affectee a priori a une depense particuliere.' },
                  { titre: 'Prevention de la fragmentation', desc: 'Sans ce principe, les ministeres pourraient ouvrir des comptes bancaires autonomes pour certaines recettes, creant des tresoreries paralleles incontrôlables.' },
                ].map((item, i) => (
                  <div key={i} className="flex gap-2">
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-indigo-500" />
                    <div>
                      <span className="text-xs font-bold text-foreground">{item.titre} : </span>
                      <span className="text-xs text-muted-foreground">{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-4">
          <h3 className="text-sm font-bold text-amber-800 mb-2 flex items-center gap-2">
            <AlertTriangle className="h-4 w-4" /> Lien avec le principe d\'universalite (Art. 3 LF 2026)
          </h3>
          <p className="text-xs text-amber-700 leading-relaxed">
            L\'Art. 3 LF 2026 rappelle le principe d\'universalite budgetaire : <strong>les recettes et les depenses sont retracees dans le budget sans contraction entre elles.</strong> Toute compensation entre recettes et depenses est strictement prohibee. Ce principe est complementaire a l\'unite de caisse : non seulement toutes les recettes doivent passer par le Compte general du Tresor (unite de caisse), mais elles ne peuvent pas etre directement utilisees pour payer des depenses sans passer par la procedure budgetaire (universalite).
          </p>
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-3">Derogations et comptes speciaux du Tresor</h3>
          <p className="text-xs text-foreground leading-relaxed mb-3">
            Le principe de l\'unite de caisse connait des derogations legalement encadrees. L\'Art. 110 LOFIP lui-meme et les Articles 60-74 sur les comptes speciaux du Tresor permettent certains mecanismes derogatoires, toujours sous controle du Parlement :
          </p>
          <div className="space-y-1.5">
            {[
              { titre: 'Fonds de concours', desc: 'Recettes de tiers (dons, participations) affectees a une depense precise, avec autorisation parlementaire explicite (Art. 61 LOFIP).' },
              { titre: 'Comptes d\'affectation speciale', desc: 'Comptes qui retracent des operations financees par des recettes particulieres (ex: Fonds routier, financement sur ressources propres des etablissements publics). Crees uniquement par loi de finances (Art. 62).' },
              { titre: 'Comptes de prets et avances', desc: 'Comptes retraçant les prets et avances consentis par l\'Etat a des tiers, avec remboursement prevu. La LOFIP les autorise sous conditions strictes.' },
            ].map((d, i) => (
              <div key={i} className="flex gap-2 rounded-lg border border-border bg-muted/30 p-2.5">
                <ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-indigo-500" />
                <div>
                  <span className="text-xs font-bold text-foreground">{d.titre} : </span>
                  <span className="text-xs text-muted-foreground">{d.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l4q1',
            question: 'Selon l\'Art. 110 LOFIP, aupres de qui est ouvert le Compte general du Tresor ?',
            options: [
              { id: 'a', texte: 'Aupres d\'une banque commerciale agreee par le Ministere des Finances' },
              { id: 'b', texte: 'Aupres du caissier de l\'Etat (Banque Centrale du Congo)' },
              { id: 'c', texte: 'Aupres de la Cour des comptes' },
              { id: 'd', texte: 'Aupres du Tresor americain, du fait de la dollarisation partielle' },
              { id: 'e', texte: 'Aupres du FMI dans le cadre du programme d\'ajustement' },
            ],
            reponseCorrecte: 'b',
            explication: 'L\'Art. 110 LOFIP dispose que tous les fonds publics doivent etre deposes dans le Compte general du Tresor « ouvert aupres du caissier de l\'Etat ». Le caissier de l\'Etat en RDC est la Banque Centrale du Congo (BCC). C\'est elle qui tient ce compte pivot et execute les operations pour le compte du Tresor public.',
            articleRef: 'Art. 110 LOFIP'
          },
          {
            type: 'qcm', id: 'l4q2',
            question: 'Le principe d\'unite de caisse (Art. 110 LOFIP) signifie que :',
            options: [
              { id: 'a', texte: 'Chaque ministere doit avoir un seul compte bancaire pour toutes ses operations' },
              { id: 'b', texte: 'Tous les fonds publics du Pouvoir central doivent etre deposes dans un compte unique tenu par la BCC' },
              { id: 'c', texte: 'Les recettes et les depenses doivent s\'equilibrer exactement chaque jour' },
              { id: 'd', texte: 'Le budget doit etre vote en une seule loi de finances par exercice' },
              { id: 'e', texte: 'Toutes les recettes doivent etre perçues par un seul agent comptable' },
            ],
            reponseCorrecte: 'b',
            explication: 'L\'unite de caisse (Art. 110 LOFIP) signifie que TOUS les fonds publics appartenant au Pouvoir central doivent etre deposes dans le Compte general du Tresor ouvert aupres de la BCC (caissier de l\'Etat). Ce principe evite la fragmentation des tresoreries, garantit la transparence et permet un controle global de la position de liquidite de l\'Etat.',
            articleRef: 'Art. 110 LOFIP'
          },
        ]} />
      </div>
    )
  },
  {
    id: 'l5',
    icone: <Users className="h-5 w-5" />,
    titre: 'Acteurs de l\'execution des recettes et controles (Art. 92-94 LOFIP)',
    soustitre: 'Ordonnateurs, comptables publics, contrôleurs budgetaires - roles et responsabilites',
    contenu: (
      <div className="space-y-4">
        <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
          <h3 className="text-sm font-bold text-indigo-800 mb-2">Art. 92-94 LOFIP : roles des acteurs dans l\'execution des recettes</h3>
          <p className="text-xs text-foreground leading-relaxed">
            L\'execution des recettes implique deux categories d\'acteurs aux responsabilites distinctes et complementaires : les <strong>ordonnateurs</strong>, qui constatent, liquident et ordonnancent les recettes, et les <strong>comptables publics</strong>, qui procedent au recouvrement effectif. Cette separation est le principe de la <strong>dualite ordonnateur-comptable</strong>, garantie essentielle de contrôle des finances publiques.
          </p>
        </div>

        <div className="space-y-3">
          {[
            {
              titre: 'L\'ordonnateur (Ministre, directeur ou agent delegue)',
              couleur: 'indigo',
              roles: [
                { label: 'Constatation (Art. 90 al. 1)', desc: 'L\'ordonnateur constate les droits de l\'Etat sur les redevables : identification du fait generateur, de la matiere imposable et du redevable. Pour les impots, ce role est exerce par les agents de la DGI (inspecteurs des impots, controleurs) habilites par l\'ordonnateur principal.' },
                { label: 'Liquidation (Art. 90 al. 2)', desc: 'L\'ordonnateur determine le montant exact de la creance en appliquant le taux legal ou le tarif a la base imposable constatee. Cette operation produit le titre de perception (avis de mise en recouvrement, bulletin de liquidation douaniere, note de debit DGRAD).' },
                { label: 'Ordonnancement (Art. 90 al. 3)', desc: 'L\'ordonnateur etablit et signe le titre de perception qui donne au comptable public l\'ordre formel de recouvrer la somme liquidee. Sans cet ordre de l\'ordonnateur, le comptable ne peut pas legalement encaisser la somme.' },
              ]
            },
            {
              titre: 'Le comptable public (Receveur des impots, Receveur des douanes)',
              couleur: 'blue',
              roles: [
                { label: 'Recouvrement des recettes (Art. 92)', desc: 'Le comptable public prend en charge les titres de perception emis par l\'ordonnateur et procede au recouvrement aupres des redevables. Il dispose de pouvoirs de contrainte (avis a tiers detenteur, saisie) pour forcer le paiement en cas de defaillance du contribuable.' },
                { label: 'Versement au Tresor (Art. 110)', desc: 'Une fois les recettes encaissees, le comptable public les reverse au Compte general du Tresor aupres de la BCC. Ce versement est trace par des bordereaux de versement que le comptable transmet au Tresor central.' },
                { label: 'Responsabilite personnelle et pecuniaire', desc: 'Le comptable public est personnellement et pecuniairement responsable des fonds qu\'il manipule. S\'il decaisse sans titre valable ou s\'il ne recouvre pas les creances exigibles, il engage sa responsabilite personnelle devant la Cour des comptes, qui peut le mettre en debet (lui imposer de rembourser sur ses propres deniers).' },
              ]
            },
            {
              titre: 'Le contrôleur budgetaire',
              couleur: 'violet',
              roles: [
                { label: 'Contrôle de regularite', desc: 'Le contrôleur budgetaire verifie la regularite des operations d\'ordonnancement : les titres de perception sont-ils conformes aux lois et reglements ? La liquidation est-elle correcte ? Le redevable est-il bien identifie ?' },
                { label: 'Visa prealable', desc: 'Pour certaines categories de recettes, le contrôleur budgetaire appose un visa prealable a l\'emission du titre de perception, garantissant la regularite formelle de l\'operation. Ce visa engage la responsabilite du contrôleur.' },
              ]
            },
          ].map(acteur => (
            <div key={acteur.titre} className={cn('rounded-xl border bg-card p-4', `border-${acteur.couleur}-200`)}>
              <div className="flex items-center gap-2 mb-3">
                <div className={cn('rounded-lg p-1.5 text-white', `bg-${acteur.couleur}-600`)}>
                  <Users className="h-4 w-4" />
                </div>
                <h3 className="text-sm font-bold text-foreground">{acteur.titre}</h3>
              </div>
              <div className="space-y-2">
                {acteur.roles.map(r => (
                  <div key={r.label} className="flex gap-2 rounded-lg bg-muted/30 border border-border p-2.5">
                    <ChevronRight className="h-3.5 w-3.5 shrink-0 mt-0.5 text-indigo-500" />
                    <div>
                      <p className="text-xs font-bold text-foreground">{r.label}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">{r.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-4">
          <h3 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
            <Scale className="h-4 w-4 text-indigo-600" /> Dualite ordonnateur-comptable : principe fondamental
            <InfoTooltip texte="La separation des fonctions d\'ordonnateur et de comptable est un principe cardinal de la comptabilite publique. Elle garantit un double controle : l\'ordonnateur constate et liquide la recette (contrôle de fond), le comptable la recouvre (contrôle de forme). Chacun engage sa responsabilite independamment." loi="Art. 92-94 LOFIP" />
          </h3>
          <p className="text-xs text-foreground leading-relaxed">
            La dualite ordonnateur-comptable est une garantie contre les detournements et les irregularites : une meme personne ne peut pas a la fois decider de percevoir une recette (ordonnateur) et proceder a l\'encaissement (comptable). Ce principe s\'applique symetriquement aux recettes (phase execution des recettes) et aux depenses (chaine de la depense). La LOFIP l\'institutionnalise dans les Art. 92-94 pour les recettes et dans les Art. 95-109 pour les depenses.
          </p>
        </div>

        <QCMBlock questions={[
          {
            type: 'qcm', id: 'l5q1',
            question: 'Dans le cadre de l\'execution des recettes publiques (Art. 90-92 LOFIP), qui est habilite a emettre le titre de perception ?',
            options: [
              { id: 'a', texte: 'Le comptable public (receveur des impots)' },
              { id: 'b', texte: 'La Cour des comptes' },
              { id: 'c', texte: 'L\'ordonnateur (ou son delegue habilite)' },
              { id: 'd', texte: 'Le Ministre du Budget' },
              { id: 'e', texte: 'Le President de la Republique par ordonnance' },
            ],
            reponseCorrecte: 'c',
            explication: 'L\'Art. 90 al. 3 LOFIP confie la phase d\'ordonnancement (emission du titre de perception) a l\'ordonnateur ou son delegue. C\'est l\'ordonnateur qui constate, liquide et ordonnance les recettes. Le comptable public (receveur) n\'emet pas le titre : il le prend en charge et procede au recouvrement. C\'est la dualite ordonnateur-comptable qui garantit le double contrôle.',
            articleRef: 'Art. 90-92 LOFIP'
          },
          {
            type: 'qcm', id: 'l5q2',
            question: 'Selon les principes de la comptabilite publique (LOFIP Art. 92-94), la responsabilite personnelle et pecuniaire en matiere de recouvrement des recettes incombe a :',
            options: [
              { id: 'a', texte: 'L\'ordonnateur qui a emis le titre de perception' },
              { id: 'b', texte: 'Le Ministre des Finances' },
              { id: 'c', texte: 'Le comptable public qui a pris en charge le titre' },
              { id: 'd', texte: 'La Banque Centrale du Congo' },
              { id: 'e', texte: 'Le contrôleur budgetaire ayant vise l\'operation' },
            ],
            reponseCorrecte: 'c',
            explication: 'C\'est le comptable public (receveur des impots, receveur des douanes) qui engage sa responsabilite personnelle et pecuniaire lors du recouvrement. S\'il ne recouvre pas une creance exigible ou s\'il encaisse des fonds sans titre valable, la Cour des comptes peut le mettre en debet : il doit rembourser sur ses propres fonds les sommes manquantes. L\'ordonnateur engage sa responsabilite pour la regularite des titres, non pour le recouvrement.',
            articleRef: 'Art. 92-94 LOFIP'
          },
        ]} />
      </div>
    )
  },
]

// ─── QCM GLOBAL 15 QUESTIONS ─────────────────────────────────────────────────
const QCM_GLOBAL: QCMQuestion[] = [
  {
    type: 'qcm', id: 'g1',
    question: 'Selon l\'Art. 90 LOFIP, dans quel ordre les trois phases d\'execution des recettes se succedent-elles ?',
    options: [{ id: 'a', texte: 'Liquidation → Constatation → Ordonnancement' }, { id: 'b', texte: 'Ordonnancement → Liquidation → Constatation' }, { id: 'c', texte: 'Constatation → Liquidation → Ordonnancement' }, { id: 'd', texte: 'Liquidation → Ordonnancement → Constatation' }, { id: 'e', texte: 'Constatation → Ordonnancement → Liquidation' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 90 LOFIP fixe la sequence obligatoire : Constatation (identification du fait generateur et de la matiere imposable) → Liquidation (calcul du montant de la creance) → Ordonnancement (emission du titre de perception). Cette sequence est imperative : toute inversion est une irregularite, sauf pour les recettes au comptant (Art. 91 al. 2) ou l\'ordonnancement intervient apres encaissement.',
    articleRef: 'Art. 90 LOFIP'
  },
  {
    type: 'qcm', id: 'g2',
    question: 'Selon l\'Art. 110 LOFIP, quel principe impose que tous les fonds publics du Pouvoir central soient deposes dans un seul compte ?',
    options: [{ id: 'a', texte: 'Principe d\'universalite budgetaire' }, { id: 'b', texte: 'Principe d\'annualite budgetaire' }, { id: 'c', texte: 'Principe d\'unite de caisse (ou d\'unite de tresorerie)' }, { id: 'd', texte: 'Principe de specialite des credits' }, { id: 'e', texte: 'Principe de legalite fiscale' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 110 LOFIP pose le principe d\'unite de caisse : tous les fonds publics appartenant au Pouvoir central doivent etre deposes dans le Compte general du Tresor ouvert aupres du caissier de l\'Etat (BCC). Ce principe garantit la centralisation et la transparence de toutes les recettes publiques. Il est distinct du principe d\'universalite (Art. 14) qui interdit l\'affectation prealable des recettes aux depenses.',
    articleRef: 'Art. 110 LOFIP'
  },
  {
    type: 'qcm', id: 'g3',
    question: 'La DGI est competente pour le recouvrement de tous les impots suivants, SAUF lequel ?',
    options: [{ id: 'a', texte: 'La TVA a 16%' }, { id: 'b', texte: 'L\'Impot sur les Societes (IS)' }, { id: 'c', texte: 'Les droits de douane a l\'importation' }, { id: 'd', texte: 'L\'IRPP sur les traitements et salaires' }, { id: 'e', texte: 'L\'Impot Realise sur les Loyers (IRL)' }],
    reponseCorrecte: 'c',
    explication: 'Les droits de douane a l\'importation relèvent de la DGDA (Direction Generale des Douanes et Accises), non de la DGI. La DGI administre la fiscalite interieure : TVA (16%), IS (30%), IRPP, IRL et autres impots directs et indirects percus sur le territoire national. La DGDA gere la fiscalite de frontiere : droits de douane, accises sur produits importes, taxe 2% sur exportations minieres.',
    articleRef: 'Art. 89 LOFIP, LF 2026'
  },
  {
    type: 'qcm', id: 'g4',
    question: 'Selon la LF 2026 (n° 25/060, Art. 6), quel est le montant total du budget de la RDC fixe en equilibre ?',
    options: [{ id: 'a', texte: '48.969,3 milliards FC' }, { id: 'b', texte: '19.033,6 milliards FC' }, { id: 'c', texte: '54.335,8 milliards FC' }, { id: 'd', texte: '7.522,0 milliards FC' }, { id: 'e', texte: '269.291,9 milliards FC' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 6 de la LF n° 25/060 du 29 decembre 2025 fixe le budget 2026 en equilibre a 54.335,8 milliards FC (+7,2% vs LFR 2025). Les 48.969,3 Mds FC sont les recettes du Budget general (Art. 7). Les 19.033,6 Mds FC sont les recettes DGI. Les 7.522,0 Mds FC sont les recettes DGDA. Les 269.291,9 Mds FC sont le PIB nominal 2026.',
    articleRef: 'Art. 6 LF 2026 (n° 25/060)'
  },
  {
    type: 'qcm', id: 'g5',
    question: 'Selon l\'Art. 91 al. 2 LOFIP, pour les recettes percues au comptant, que tiennent lieu les documents justifiant le paiement ?',
    options: [{ id: 'a', texte: 'De titres de creance opposables au redevable' }, { id: 'b', texte: 'De titres de perception' }, { id: 'c', texte: 'De bulletins de liquidation definitifs' }, { id: 'd', texte: 'D\'ordres de versement au Tresor' }, { id: 'e', texte: 'De quittances de paiement definitives' }],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 91 al. 2 LOFIP dispose que « les documents justifiant le paiement tiennent lieu de titres de perception » pour les recettes percues au comptant. Cela signifie que le reçu de caisse ou le bordereau de versement remplace le titre de perception formel emis par l\'ordonnateur. L\'ordonnancement est fait apres coup, pour regularisation comptable. C\'est une exception a la sequence normale des trois phases.',
    articleRef: 'Art. 91 al. 2 LOFIP'
  },
  {
    type: 'qcm', id: 'g6',
    question: 'Quelle est la regie financiere competente pour les recettes domaniales (loyers de concessions foncieres, redevances minieres superficiaires) en RDC ?',
    options: [{ id: 'a', texte: 'La DGI' }, { id: 'b', texte: 'La DGDA' }, { id: 'c', texte: 'La DGRAD' }, { id: 'd', texte: 'La BCC directement' }, { id: 'e', texte: 'Le Ministere des Mines directement' }],
    reponseCorrecte: 'c',
    explication: 'La DGRAD (Direction Generale des Recettes Administratives, Judiciaires, Domaniales et de Participations) est competente pour les recettes domaniales, dont les loyers des concessions foncieres de l\'Etat et les droits superficiaires miniers (redevances annuelles). La DGI gere la fiscalite interieure (IRPP, IS, TVA). La DGDA gere la fiscalite de frontiere. Les dividendes des participations de l\'Etat sont egalement un domaine de la DGRAD.',
    articleRef: 'Art. 89 LOFIP'
  },
  {
    type: 'qcm', id: 'g7',
    question: 'La LF 2026 (n° 25/060) a etendu la taxe de 2% aux exportations minieres. Quels produits sont vises par cette mesure ?',
    options: [{ id: 'a', texte: 'Uniquement le cuivre et le cobalt' }, { id: 'b', texte: 'Tous les produits agricoles d\'exportation' }, { id: 'c', texte: 'Les produits petrolifers bruts uniquement' }, { id: 'd', texte: 'Tous les produits miniers marchands (Chapitre 26 SH + Section XV : metaux de base)' }, { id: 'e', texte: 'Uniquement les mineraux rares (terres rares)' }],
    reponseCorrecte: 'd',
    explication: 'La LF 2026 a etendu la taxe de 2% a TOUS les produits miniers marchands exportes : Chapitre 26 du Systeme Harmonise (mineraux, scories, cendres) et Section XV (metaux de base : cuivre, cobalt, coltan, lithium, fer, aluminium, etc.). Cette mesure supprime les exemptions qui existaient notamment via l\'article 234 de l\'ancien Code minier. Elle vise a mieux capter la rente miniere dans un contexte de hausse des cours internationaux.',
    articleRef: 'LF 2026 n° 25/060, Code minier'
  },
  {
    type: 'qcm', id: 'g8',
    question: 'Selon l\'Art. 3 LF 2026 (principe d\'universalite), la compensation entre recettes et depenses est :',
    options: [{ id: 'a', texte: 'Autorisee si elle est approuvee par le Parlement' }, { id: 'b', texte: 'Autorisee uniquement pour les operations de la DGRAD' }, { id: 'c', texte: 'Strictement prohibee' }, { id: 'd', texte: 'Toleree pour les recettes inferieures a 1 milliard FC' }, { id: 'e', texte: 'Autorisee dans les comptes d\'affectation speciale' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 3 LF 2026 affirme le principe d\'universalite budgetaire : les recettes et les depenses sont retracees dans le budget sans contraction. Toute compensation entre recettes et depenses est STRICTEMENT PROHIBEE. Ce principe s\'articule avec l\'unite de caisse (Art. 110 LOFIP) : si une compensation etait permise, une partie des recettes echapperait au Compte general du Tresor, violant les deux principes simultanement.',
    articleRef: 'Art. 3 LF 2026, Art. 14 LOFIP'
  },
  {
    type: 'qcm', id: 'g9',
    question: 'Selon la LF 2026 (Art. 7), les recettes de la DGDA s\'elevent a 7.522,0 milliards FC. Cela represente une variation de combien par rapport a la LFR 2025 ?',
    options: [{ id: 'a', texte: '+7,2%' }, { id: 'b', texte: '+16%' }, { id: 'c', texte: '+12,4%' }, { id: 'd', texte: '-5%' }, { id: 'e', texte: '+20%' }],
    reponseCorrecte: 'c',
    explication: 'Selon la LF 2026 (n° 25/060), les recettes DGDA s\'elevent a 7.522,0 milliards FC, soit une hausse de +12,4% par rapport a la LFR 2025. Les recettes DGI progressent de +16%. L\'equilibre global du budget progresse de +7,2% (de 50.679,8 Mds FC en LFR 2025 a 54.335,8 Mds FC en LF 2026). La hausse DGDA est en partie due a l\'extension de la taxe de 2% aux exportations minieres.',
    articleRef: 'Art. 7 LF 2026 (n° 25/060)'
  },
  {
    type: 'qcm', id: 'g10',
    question: 'L\'Art. 89 LOFIP pose le principe fondamental selon lequel les recettes du Pouvoir central sont executees :',
    options: [{ id: 'a', texte: 'Conformement aux decisions du Conseil des ministres' }, { id: 'b', texte: 'Conformement aux lois et reglements en vigueur' }, { id: 'c', texte: 'Conformement au plan de tresorerie previsionnel' }, { id: 'd', texte: 'Sous le contrôle exclusif de la Cour des comptes' }, { id: 'e', texte: 'Par voie d\'ordonnance-loi du President de la Republique' }],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 89 LOFIP dispose que « les recettes du Pouvoir central sont executees conformement aux lois et reglements en vigueur. » Ce principe de legalite fiscale signifie qu\'aucune recette ne peut etre percue sans base legale. Toute imposition doit etre fondee sur une loi (Code des impots, Code des douanes, texte domanial...). L\'Art. 4 LF 2026 renforce ce principe : aucune exemption sans disposition legale expresse.',
    articleRef: 'Art. 89 LOFIP, Art. 4 LF 2026'
  },
  {
    type: 'qcm', id: 'g11',
    question: 'La liquidation des recettes (Art. 90 al. 2 LOFIP) consiste a :',
    options: [{ id: 'a', texte: 'Identifier le redevable et le fait generateur de la creance' }, { id: 'b', texte: 'Emettre le titre de perception autorisant le comptable a recouvrer' }, { id: 'c', texte: 'Verser les recettes encaissees au Compte general du Tresor' }, { id: 'd', texte: 'Determiner le montant exact de la creance en appliquant le taux ou tarif legal' }, { id: 'e', texte: 'Contrôler la regularite de l\'operation par le contrôleur budgetaire' }],
    reponseCorrecte: 'd',
    explication: 'La liquidation (Art. 90 al. 2 LOFIP) consiste a determiner le montant exact de la creance de l\'Etat en appliquant le taux ou tarif legal a la base imposable constatee. Ex : pour la TVA, liquider = appliquer 16% a la valeur hors taxe. L\'identification du fait generateur est la constatation (art. 90 al. 1). L\'emission du titre est l\'ordonnancement (art. 90 al. 3). Le versement au Tresor releve du comptable (art. 110).',
    articleRef: 'Art. 90 al. 2 LOFIP'
  },
  {
    type: 'qcm', id: 'g12',
    question: 'Selon l\'Art. 4 LF 2026, le Gouvernement ne peut accorder d\'exemptions ou d\'allegements fiscaux :',
    options: [{ id: 'a', texte: 'Sans l\'accord prealable de la Cour des comptes' }, { id: 'b', texte: 'Sans disposition legale expresse' }, { id: 'c', texte: 'Sans un rapport d\'evaluation de la DGI' }, { id: 'd', texte: 'Sans l\'autorisation du FMI dans le cadre du programme en cours' }, { id: 'e', texte: 'Sans decision du Premier ministre en Conseil des ministres' }],
    reponseCorrecte: 'b',
    explication: 'L\'Art. 4 LF 2026 rappelle le principe de legalite fiscale : aucune exemption ni allegement fiscal ne peut etre accorde sans disposition legale expresse. Ce principe protege l\'egalite devant l\'impot (Art. 90 Constitution) et la legalite fiscale (Art. 174 Constitution). Il interdit au Gouvernement d\'accorder des avantages fiscaux par simple circulaire ou decision administrative sans base legale.',
    articleRef: 'Art. 4 LF 2026, Art. 89 LOFIP'
  },
  {
    type: 'qcm', id: 'g13',
    question: 'La DGRAD est competente pour les recettes judiciaires, qui comprennent notamment :',
    options: [{ id: 'a', texte: 'Les impots sur les benefices des tribunaux de commerce' }, { id: 'b', texte: 'Les amendes, confiscations et droits de greffe percus par les juridictions' }, { id: 'c', texte: 'Les taxes sur les services juridiques prives (avocats, notaires)' }, { id: 'd', texte: 'Les droits de timbre fiscal sur les contrats commerciaux' }, { id: 'e', texte: 'Les droits d\'enregistrement des societes commerciales' }],
    reponseCorrecte: 'b',
    explication: 'La DGRAD administre les recettes judiciaires qui comprennent les amendes judiciaires (prononcees par les juridictions), les confiscations, les droits de greffe (taxes perçues par les greffes des tribunaux pour l\'enregistrement des actes de procedure). Les droits de timbre fiscal relèvent de la DGI. Les droits d\'enregistrement des societes sont geres par le Registre du Commerce (RCCM), dont les recettes sont reversees a la DGRAD.',
    articleRef: 'Art. 89 LOFIP'
  },
  {
    type: 'qcm', id: 'g14',
    question: 'Le taux de pression fiscale de la RDC fixe dans les parametres macro-economiques 2026 (LF n° 25/060) est de :',
    options: [{ id: 'a', texte: '5,3%' }, { id: 'b', texte: '4,4%' }, { id: 'c', texte: '16%' }, { id: 'd', texte: '12,3%' }, { id: 'e', texte: '20%' }],
    reponseCorrecte: 'd',
    explication: 'La LF 2026 (n° 25/060) prevoit un taux de pression fiscale de 12,3% (recettes fiscales / PIB). A titre de comparaison : les 5,3% sont le taux de croissance economique, les 4,4% sont le taux d\'inflation previsionnel, les 16% sont le taux de TVA, et 20% est l\'un des taux de droit de douane. La pression fiscale de 12,3% reste faible par rapport aux standards africains (moyenne UEMOA : 17%) mais s\'ameliore progressivement.',
    articleRef: 'LF 2026 n° 25/060'
  },
  {
    type: 'qcm', id: 'g15',
    question: 'Selon l\'Art. 5 LF 2026 (deconcentration de l\'ordonnancement), combien de ministeres pilotes beneficient de la deconcentration de l\'ordonnancement en 2026 ?',
    options: [{ id: 'a', texte: '3 ministeres pilotes' }, { id: 'b', texte: '6 ministeres pilotes' }, { id: 'c', texte: '9 ministeres pilotes' }, { id: 'd', texte: '12 ministeres pilotes' }, { id: 'e', texte: 'Tous les ministeres de maniere uniforme' }],
    reponseCorrecte: 'c',
    explication: 'L\'Art. 5 LF 2026 prevoit la deconcentration de l\'ordonnancement des depenses a 9 ministeres pilotes. Cette reforme decentralise le pouvoir d\'ordonnancement, jusqu\'alors centralise au Ministere du Budget, vers les ministeres sectoriels identifies comme pilotes. C\'est une application des principes du budget-programme (Art. 43 LOFIP) qui vise a rapprocher la decision de depense de la realite operationnelle des programmes.',
    articleRef: 'Art. 5 LF 2026 (n° 25/060)'
  },
]

// ─── CAS PRATIQUES ────────────────────────────────────────────────────────────
const ETUDES_DE_CAS = [
  {
    titre: 'Cas pratique 1 : Analyse d\'une procedure de recouvrement TVA irreguliere (Art. 90-92 LOFIP)',
    contexte: `Un inspecteur de la DGI realise un contrôle fiscal chez la societe KINSHASA TRADING SARL pour l\'exercice 2025. Il constate les situations suivantes :

Situation A : La societe a perçu des honoraires de 500 millions FC en decembre 2025 mais n\'a pas declare ni reverse la TVA correspondante (taux : 16%).

Situation B : Pour regulariser la situation, le receveur des impots de la brigade de contrôle decide, de sa propre initiative, d\'emettre un titre de perception pour un montant de 80 millions FC (TVA : 500M x 16%). Il signe lui-meme le titre sans qu\'aucun inspecteur n\'ait prealablement liquide la dette.

Situation C : La societe conteste la liquidation et propose de compenser la TVA due (80 millions FC) avec un credit TVA qu\'elle revendique pour le meme exercice 2025 (TVA sur achats : 30 millions FC). Elle propose donc de ne payer que 50 millions FC.

Situation D : La DGI accepte la proposition et emet un titre de perception pour 50 millions FC seulement, sans enregistrer le credit TVA comme credit remboursable.`,
    questions: [
      {
        num: '1',
        enonce: 'Analysez les irregularites juridiques commises dans les Situations B et C au regard de la LOFIP. Identifiez les principes violes et les consequences pour chaque acteur.',
        correction: `ANALYSE DES IRREGULARITES :

SITUATION B : Emission du titre par le receveur sans liquidation prealable
VIOLATION : L\'Art. 90 LOFIP pose la sequence obligatoire Constatation → Liquidation → Ordonnancement. L\'ordonnancement (emission du titre de perception) presuppose une liquidation prealable effectuee par l\'ordonnateur (inspecteur des impots) ou son delegue. Ici, le receveur (comptable public) a emis le titre lui-meme, violant deux regles :
1. La dualite ordonnateur-comptable : le comptable ne peut pas emettre un titre de perception, role exclusif de l\'ordonnateur.
2. La sequence des phases : l\'ordonnancement sans liquidation prealable est illegale.
CONSEQUENCES : Le titre est irregulier. Le receveur engage sa responsabilite personnelle. L\'operation devra etre annulee et regulairement refaite par un inspecteur habilite (liquidation) puis par l\'ordonnateur (ordonnancement).

SITUATION C : Compensation TVA due/credit TVA
VIOLATION : L\'Art. 3 LF 2026 (et Art. 14 LOFIP, principe d\'universalite) interdisent toute compensation entre recettes et depenses. Une recette fiscale (TVA due : 80 Mds FC) ne peut pas etre directement compensee avec une creance du contribuable (credit TVA : 30 Mds FC).
DEMARCHE CORRECTE : La TVA due (80 Mds FC) doit etre integrement versee. Le credit TVA de 30 Mds FC doit etre traite separement : soit compense lors d\'une declaration suivante, soit rembourse selon la procedure prevue par le Code TVA. La compensation directe viole le principe d\'universalite budgetaire.

SITUATION D : Emission du titre pour 50 Mds FC
IRREGULARITE CUMULEE : La DGI aggrave la situation en acceptant la compensation directe. Elle viole l\'Art. 3 LF 2026. De plus, en n\'enregistrant pas le credit TVA comme credit remboursable, elle viole les droits du contribuable. Cette pratique constitue une fraude a la loi budgetaire, passible de sanctions devant la Cour des comptes.`
      },
      {
        num: '2',
        enonce: 'Calculez le montant exact de TVA due par KINSHASA TRADING SARL et expliquez la procedure correcte de traitement du credit TVA de 30 millions FC, conformement au droit fiscal congolais.',
        correction: `CALCUL TVA DUE ET PROCEDURE CORRECTE :

CALCUL DE LA TVA DUE :
Base imposable : 500 millions FC (honoraires HT perçus en decembre 2025)
Taux TVA : 16% (Ordonnance-loi n° 10/001 du 20 aout 2010)
TVA collectee due : 500.000.000 FC × 16% = 80.000.000 FC

Le montant integral de 80.000.000 FC (80 millions FC) doit etre verse a la DGI. Aucune compensation directe n\'est permise.

PROCEDURE CORRECTE DU CREDIT TVA (30 millions FC) :
Le credit TVA de 30 millions FC (TVA sur achats deductibles) doit etre traite selon la procedure legale prevue par le Code TVA :

OPTION 1 - Imputation sur la declaration suivante :
Le credit TVA de 30 Mds FC est reporte sur la declaration de janvier 2026. Si la TVA collectee en janvier 2026 depasse 30 Mds FC, le credit est simplement impute sur cette declaration. C\'est la procedure la plus courante et la plus simple.

OPTION 2 - Demande de remboursement :
Si l\'activite de la societe genere structurellement plus de TVA deductible que de TVA collectee (ex: societe exportatrice), elle peut deposer une demande de remboursement du credit TVA aupres de la DGI, selon les modalites prevues par le Code TVA.

MONTANT TOTAL A PAYER IMMEDIATEMENT :
TVA due integrale : 80.000.000 FC
Le credit TVA (30 Mds FC) sera impute sur la prochaine declaration ou donne lieu a remboursement separement.`
      },
    ]
  },
  {
    titre: 'Cas pratique 2 : Unite de caisse et detournement de recettes (Art. 110 LOFIP)',
    contexte: `En 2026, l\'Inspecteur general des finances decouvre lors d\'un controle que deux pratiques irregulières ont ete observees dans l\'administration fiscale de la RDC :

Pratique 1 : Le directeur provincial de la DGRAD de Lualaba a ouvert un compte bancaire prive aupres d\'une banque commerciale locale (Rawbank) pour y deposer les recettes domaniales des concessions minieres de la province. Il justifie ce choix par la « lenteur du virement vers Kinshasa » et la necessite de « regler rapidement les agents locaux ». Au 31 decembre 2025, le solde de ce compte est de 4,2 milliards FC.

Pratique 2 : Le directeur d\'une regie technique annexe (regie des transports) a decide d\'affecter directement les recettes de peage de la RN1 (recettes 2025 : 1,8 milliard FC) au paiement des salaires des agents routiers, sans passer par le budget. Il argue que cette affectation « directe » est plus efficace et evite les delais de versement au Tresor.

Le taux de change 2026 : 2.467,0 FC/USD (LF 2026).`,
    questions: [
      {
        num: '1',
        enonce: 'Analysez juridiquement les deux pratiques au regard de l\'Art. 110 LOFIP et du principe d\'universalite (Art. 14 LOFIP, Art. 3 LF 2026). Qualifiez les infractions et precisez les consequences pour les responsables.',
        correction: `ANALYSE JURIDIQUE DES DEUX PRATIQUES :

PRATIQUE 1 : Compte bancaire prive DGRAD Lualaba (4,2 milliards FC)
BASE LEGALE VIOLEE : Art. 110 LOFIP - « Tous les fonds publics appartenant au Pouvoir central doivent etre deposes dans le Compte general du Tresor ouvert aupres du caissier de l\'Etat. »
QUALIFICATION JURIDIQUE :
1. Violation grave de l\'unite de caisse : les 4,2 milliards FC auraient du etre verses au Compte general du Tresor (BCC), non dans un compte bancaire commercial. La justification de la « lenteur » n\'est pas un motif legal de derogation a l\'Art. 110.
2. Gestion de fait : en manipulant des fonds publics dans un compte non autorise, le directeur DGRAD commet une gestion de fait au sens de la comptabilite publique. Il est reputee comptable de fait et peut etre mis en debet par la Cour des comptes.
CONSEQUENCES : Le directeur engage sa responsabilite personnelle et pecuniaire. Les 4,2 milliards FC doivent etre immediatement verses au Compte general du Tresor. La Cour des comptes peut le sanctionner et le condamner a rembourser les interets perdus.

PRATIQUE 2 : Affectation directe peages (1,8 milliard FC) aux salaires
BASE LEGALE VIOLEE :
1. Art. 110 LOFIP : les recettes de peage sont des fonds publics qui doivent transiter par le Compte general du Tresor.
2. Art. 14 LOFIP / Art. 3 LF 2026 (universalite) : interdiction de toute affectation directe d\'une recette a une depense. Chaque recette doit etre portee au budget en recette et chaque depense doit faire l\'objet d\'une procedure d\'ordonnancement separee.
QUALIFICATION : Double violation (unite de caisse + universalite). La depense de salaires est illegale car effectuee sans autorisation budgetaire et sans procedure d\'ordonnancement (engagement → liquidation → ordonnancement → paiement).
CONSEQUENCES : Gestion de fait pour le directeur. Les 1,8 milliards FC de recettes doivent etre reverses au Tresor. Les salaires payes doivent etre regularises par une procedure budgetaire normale.`
      },
      {
        num: '2',
        enonce: 'L\'Art. 110 LOFIP prevoit des derogations a l\'unite de caisse (comptes speciaux, fonds de concours). Expliquez dans quelles conditions strictes une regie locale pourrait legalement conserver une partie de ses recettes, et dans quelles limites. Appuyez-vous sur la LOFIP.',
        correction: `CONDITIONS STRICTES DE DEROGATION A L\'UNITE DE CAISSE (Art. 110 LOFIP et Art. 55-74) :

PRINCIPE GENERAL : L\'unite de caisse est la regle. Toute derogation est une exception qui necessite une base legale expresse.

DEROGATION 1 - Regies d\'avances et de recettes (Art. 94 LOFIP) :
Les regies d\'avances permettent a un agent-comptable secondaire (regisseur) de conserver une petite avance de fonds pour regler des depenses urgentes de faible montant. Pour les recettes, une regie de recettes permet d\'encaisser des petites sommes localement avant de les verser periodiquement au Tresor.
CONDITIONS : (a) Creation par arrete conjoint Ministre Finances/Budget ; (b) Plafond de la regie fixe par l\'arrete ; (c) Compte rendu periodique au Tresor ; (d) Justification de l\'utilite operationnelle.
Les recettes de peage pourraient entrer dans ce cadre si une regie de recettes est regulierement creee, avec versement periodique au Tresor et plafond limite.

DEROGATION 2 - Fonds de concours (Art. 61 LOFIP) :
Si des tiers (ex: entreprise miniere) contribuent a des depenses determinees (ex: entretien route miniere), cette contribution peut etre geree en dehors du budget general, sous forme de fonds de concours, a condition d\'etre explicitement prevue par la loi de finances et d\'etre retracee dans un compte special.

LIMITES ABSOLUES :
- Aucune derogation ne peut etre decidee unilateralement par un directeur local.
- Toute derogation doit etre creee par texte legal (loi de finances ou arrete conjoint).
- Les sommes dans une regie de recettes restent des fonds publics : le regisseur engage sa responsabilite.

CONCLUSION POUR LE CAS DGRAD LUALABA :
Le directeur DGRAD ne pouvait pas creer unilateralement un compte bancaire prive. Seule une regie de recettes creee par arrete ministeriel, avec plafond limite et versements periodiques au Tresor, aurait ete legalement acceptable.`
      },
    ]
  },
  {
    titre: 'Cas pratique 3 : Analyse des recettes douanieres LF 2026 (Art. 89 LOFIP, DGDA)',
    contexte: `La societe CONGO IMPORT SA importe en janvier 2026 les marchandises suivantes depuis la Chine, declarees au bureau des douanes de Matadi (DGDA) :

Lot A : Machines agricoles (moissonneuses-batteuses et tracteurs) pour une valeur CIF de 2.500.000 USD.
Lot B : Vetements de marque et accessoires de luxe (sacs, chaussures) pour une valeur CIF de 800.000 USD.
Lot C : Composants electroniques semi-finis pour une usine de montage a Kinshasa, valeur CIF de 1.200.000 USD.
Lot D : Produits cosmetiques (parfums et cremes de beaute) pour une valeur CIF de 400.000 USD.

Taux de change 2026 : 2.467,0 FC/USD (LF n° 25/060, Art. 6).
Taux douaniers applicables en RDC : 5% (matieres premieres/equipements), 10% (produits semi-finis), 20% (produits finis/luxe).
La TVA (16%) s\'applique a la valeur CIF + droits de douane pour les produits importes.`,
    questions: [
      {
        num: '1',
        enonce: 'Appliquez les taux douaniers corrects a chaque lot et calculez le montant total des droits de douane dus en FC. Justifiez le taux applique a chaque lot en vous referant aux categories tarifaires.',
        correction: `CALCUL DES DROITS DE DOUANE - JANVIER 2026 :

TAUX DE CHANGE : 2.467,0 FC/USD (LF 2026, Art. 6)

LOT A : Machines agricoles (moissonneuses-batteuses, tracteurs)
CATEGORIE : Equipements industriels / matieres premieres → Taux 5%
JUSTIFICATION : Les machines agricoles (tracteurs, moissonneuses) sont des biens d\'equipement de production, classes dans la categorie des equipements industriels et intrants agricoles beneficiant du taux le plus bas (5%).
Calcul :
Valeur CIF : 2.500.000 USD × 2.467,0 FC/USD = 6.167.500.000 FC
Droits de douane : 6.167.500.000 FC × 5% = 308.375.000 FC

LOT B : Vetements de marque et accessoires de luxe
CATEGORIE : Produits finis de consommation / biens de luxe → Taux 20%
JUSTIFICATION : Les vetements de marque et accessoires de luxe sont des biens de consommation finale, non essentiels, classes dans la categorie la plus taxee (20%).
Calcul :
Valeur CIF : 800.000 USD × 2.467,0 FC/USD = 1.973.600.000 FC
Droits de douane : 1.973.600.000 FC × 20% = 394.720.000 FC

LOT C : Composants electroniques semi-finis
CATEGORIE : Produits semi-finis / biens intermediaires → Taux 10%
JUSTIFICATION : Les composants electroniques destines a une usine de montage sont des biens intermediaires (semi-finis), entre les matieres premieres (5%) et les produits finis (20%).
Calcul :
Valeur CIF : 1.200.000 USD × 2.467,0 FC/USD = 2.960.400.000 FC
Droits de douane : 2.960.400.000 FC × 10% = 296.040.000 FC

LOT D : Produits cosmetiques (parfums, cremes)
CATEGORIE : Produits finis de consommation (+ droits d\'accises) → Taux 20%
JUSTIFICATION : Les parfums et produits cosmetiques sont des produits finis de consommation. Ils sont aussi soumis aux droits d\'accises en sus des droits de douane.
Calcul :
Valeur CIF : 400.000 USD × 2.467,0 FC/USD = 986.800.000 FC
Droits de douane : 986.800.000 FC × 20% = 197.360.000 FC

TOTAL DROITS DE DOUANE DUS :
Lot A : 308.375.000 FC
Lot B : 394.720.000 FC
Lot C : 296.040.000 FC
Lot D : 197.360.000 FC
TOTAL : 1.196.495.000 FC (soit environ 1,196 milliard FC)`
      },
      {
        num: '2',
        enonce: 'Expliquez pourquoi les produits cosmetiques (Lot D) sont soumis non seulement aux droits de douane mais aussi aux droits d\'accises, et quel est l\'acteur charge de les percevoir. Precisez l\'impact de l\'Art. 4 LF 2026 sur toute eventuelle exoneration.',
        correction: `DOUBLES IMPOSITIONS : DROITS DE DOUANE + ACCISES (LOT D)

POURQUOI LE DOUBLE PRELEVEMENT ?
Les droits de douane (20%) et les droits d\'accises sont deux impositions distinctes avec des fondements juridiques differents :

1. DROITS DE DOUANE :
Fondement : Tarif douanier national + TEC COMESA.
Objet : Proteger la production nationale et generer des recettes de frontiere.
Base : Valeur CIF de la marchandise importee.
Percepteur : DGDA.

2. DROITS D\'ACCISES :
Fondement : Loi portant fiscalite des accises (code des accises).
Objet : Taxer la consommation de certains produits specifiques (nocifs ou luxueux) : alcools, tabacs, hydrocarbures, cosmetiques, telecoms.
Base : Generalement la valeur ex-works ou la valeur CIF + droits de douane (assiette variable selon le produit).
Percepteur : La DGDA pour les produits importes (les accises sur importation sont perçues simultanement aux droits de douane au moment du dedouanement) ; la DGI pour les accises sur la production locale.

ACTEUR CHARGE : Pour le Lot D (cosmetiques importes), c\'est la DGDA qui percoit les deux impositions simultanement lors du dedouanement a Matadi.

IMPACT ART. 4 LF 2026 (interdiction des exonerations sans base legale) :
L\'Art. 4 LF 2026 dispose qu\'aucune exemption ni allegement fiscal ne peut etre accorde sans disposition legale expresse. Concretement, cela signifie :
- Aucun directeur de la DGDA ne peut exonerer un importateur de cosmetiques de droits d\'accises sur la base d\'une simple instruction verbale ou d\'une lettre administrative.
- Toute exoneration requiert soit une disposition du Code des accises, soit une disposition de la loi de finances (LF 2026 elle-meme ou une LFR).
- Si une societe cotee pretend beneficier d\'une exoneration, elle doit produire le texte legal habilitant. La DGDA doit le verifier rigoureusement.
Cette regle renforce la lutte contre la fraude et la corruption aux postes douaniers.`
      },
    ]
  },
  {
    titre: 'Cas pratique 4 : Principes budgetaires et recettes LF 2026 (Art. 3, 4, 7 LF 2026)',
    contexte: `Au cours de la session budgetaire 2026, le Parlement examine la LF 2026 (LF n° 25/060 du 29 decembre 2025, equilibre a 54.335,8 milliards FC). Trois situations font l\'objet de debats :

Situation 1 : Un ministre souhaite que la totalite des recettes de la TVA sur les produits petroliers (estimees a 800 milliards FC) soit directement affectee au Fonds d\'electrification rurale (FER) sans passer par le budget general.

Situation 2 : L\'Art. 9 LF 2026 prevoit que la caisse de perequation reçoit 744,6 milliards FC. Un groupe de deputes conteste ce montant, estimant qu\'il devrait etre reduit pour financer un programme de logements sociaux, sans proposition compensatoire.

Situation 3 : Le Gouvernement souhaite accorder une exoneration de TVA pour 3 ans aux entreprises minieres investissant plus de 100 millions USD en RDC, par simple decret du Premier ministre, sans passer par une loi de finances.

Recettes du Budget general 2026 (LF n° 25/060, Art. 7) : DGI 19.033,6 Mds FC, DGDA 7.522,0 Mds FC, DGRAD 6.469,4 Mds FC.`,
    questions: [
      {
        num: '1',
        enonce: 'Analysez la conformite de chacune des trois situations aux principes budgetaires de la LOFIP et de la LF 2026. Identifiez les articles violes et les consequences juridiques.',
        correction: `ANALYSE DE CONFORMITE DES 3 SITUATIONS :

SITUATION 1 : Affectation TVA petrolieres (800 Mds FC) directement au FER
VIOLATION : Art. 14 LOFIP (principe de non-affectation / universalite) + Art. 3 LF 2026 (principe d\'universalite, interdiction des compensations et affectations directes).
ANALYSE : L\'universalite budgetaire interdit d\'affecter une recette particuliere a une depense particuliere. Les recettes TVA sur petrole doivent entrer dans le budget general sans affectation prealable. Si le FER doit recevoir des fonds, cela doit passer par une dotation budgetaire inscrite dans la loi de finances, pas par une affectation directe d\'une recette.
EXCEPTION POSSIBLE : Un compte d\'affectation speciale (Art. 62 LOFIP) peut permettre ce type d\'affectation, mais uniquement s\'il est cree par la loi de finances elle-meme, avec l\'accord du Parlement. Le ministre ne peut pas decider seul de cette affectation.
CONSEQUENCE : La proposition du ministre est illegale sans modification de la LF. Elle viole l\'Art. 14 LOFIP et l\'Art. 3 LF 2026.

SITUATION 2 : Reduction caisse de perequation (744,6 Mds FC) sans compensation
VIOLATION : Art. 86 LOFIP / Art. 127 Constitution (irrecevabilite des amendements diminuant les recettes sans compensation).
ANALYSE : L\'Art. 9 LF 2026 fixe la caisse de perequation a 744,6 milliards FC. Proposer de reduire ce montant pour financer un programme de logements constitue un amendement qui :
(a) Diminue une ressource (caisse de perequation) ;
(b) Cree une depense nouvelle (programme logements) ;
(c) Sans aucune proposition compensatoire.
Cet amendement est doublement irrecevable au sens de l\'Art. 86 al. 1 LOFIP.
CONSEQUENCE : Le President de l\'Assemblee nationale doit rejeter cet amendement d\'office.

SITUATION 3 : Exoneration TVA par decret du Premier ministre
VIOLATION MAJEURE : Art. 4 LF 2026 + Art. 174 Constitution + Art. 89 LOFIP (principe de legalite fiscale).
ANALYSE : L\'Art. 4 LF 2026 dispose qu\'aucune exemption ni allegement fiscal ne peut etre accorde sans disposition legale expresse. Un decret du Premier ministre n\'est pas une loi. Seule une loi (loi de finances ou loi fiscale) peut creer une exoneration fiscale.
Cette pratique violerait egalement l\'Art. 174 Constitution qui reserve a la loi la fixation des regles en matiere d\'assiette, taux et modalites de recouvrement des impositions.
CONSEQUENCE : Tout decret accordant une exoneration TVA est nul et de nul effet juridique. Les entreprises beneficiaires ne peuvent pas se prevaloir de cet exoneration contre la DGI.`
      },
      {
        num: '2',
        enonce: 'Sur la base de la LF 2026 (Art. 8 : retrocession provinces = 7.694,5 milliards FC, Art. 9 : caisse perequation = 744,6 milliards FC), expliquez en quoi ces mecanismes s\'articulent avec le principe d\'universalite (Art. 3 LF 2026) et le principe d\'unite de caisse (Art. 110 LOFIP). Ces affectations constituent-elles des exceptions a ces principes ?',
        correction: `RETROCESSION ET PEREQUATION : EXCEPTIONS OU APPLICATIONS DES PRINCIPES ?

TEXTES DE REFERENCE :
Art. 8 LF 2026 : retrocession aux provinces = 7.694,5 milliards FC (40% recettes nationales, conforme Art. 175 Constitution et Art. 24 LOFIP).
Art. 9 LF 2026 : caisse de perequation = 744,6 milliards FC.
Art. 3 LF 2026 : principe d\'universalite.
Art. 110 LOFIP : principe d\'unite de caisse.

ANALYSE - CES MECANISMES VIOLENT-ILS LES PRINCIPES ?

REPONSE : Non. Ces mecanismes sont des applications legales et constitutionnelles des principes, non des violations.

POURQUOI LA RETROCESSION (Art. 8) EST CONFORME A L\'UNIVERSALITE ?
L\'universalite interdit l\'affectation DIRECTE d\'une recette particuliere sans passer par le budget. Ici, la retrocession des 40% aux provinces passe PAR le budget : les recettes nationales entrent d\'abord dans le budget general (elles sont comptees dans les 48.969,3 Mds FC de recettes - Art. 7), puis la retrocession est inscrite comme dotation/depense au profit des provinces. La loi de finances autorise explicitement cette dotation. Il n\'y a pas d\'affectation directe TVA → province, mais passage obligatoire par le budget.

POURQUOI L\'UNITE DE CAISSE EST RESPECTEE ?
Toutes les recettes nationales transitent par le Compte general du Tresor (BCC) avant d\'etre redistribuees aux provinces. La retrocession se fait par virement du Compte general du Tresor aux comptes des provinces (egalement geres par la BCC selon l\'Art. 110). Il n\'y a pas de compte prive parallele.

CAS DE LA CAISSE DE PEREQUATION (Art. 9 - 744,6 Mds FC) :
La caisse de perequation est creee par la Constitution (Art. 181) et la LOFIP (Art. 25). Elle est alimentee par une fraction des recettes nationales et redistribuee aux provinces les moins dotees. Comme pour la retrocession, elle passe par le budget (inscrite comme recette et depense dans la LF 2026) et transite par le Compte du Tresor. Elle ne viole ni l\'universalite ni l\'unite de caisse.

CONCLUSION :
La retrocession et la perequation sont des mecanismes constitutionnels (Art. 175-181 Constitution) qui coexistent avec les principes budgetaires. Ils ne les violent pas car ils passent par la loi de finances (universalite respectee) et par le Compte general du Tresor (unite de caisse respectee).`
      },
    ]
  },
  {
    titre: 'Cas pratique 5 : Constatation, liquidation et ordonnancement IRPP (Art. 90-92 LOFIP, Code des impots)',
    contexte: `En mars 2026, la DGI de Kinshasa-Gombe traite le dossier fiscal de Monsieur MUTOMBO JEAN, resident congolais, pour l\'exercice fiscal 2025. Les elements de revenus 2025 sont les suivants :

Revenus 1 : Traitements et salaires nets percus comme cadre superieur d\'une banque congolaise : 720.000.000 FC. L\'employeur a retenu a la source et verse a la DGI 108.000.000 FC de taxes salariales (IPR et autres).

Revenus 2 : Loyers percus sur 3 appartements mis en location a Kinshasa : 180.000.000 FC par an. Aucun impot n\'a ete declare sur ces loyers.

Revenus 3 : Honoraires de consultant reçus de societes etrangeres pour des services de conseil fiscal : 50.000.000 FC. Non declares.

La DGI a constate ces revenus lors d\'un contrôle sur pièces. Le taux de l\'IRL (Art. Code impots) est de 20% sur les loyers. L\'IRPP progressif applicable aux honoraires est de 30% au-dela d\'un certain seuil.`,
    questions: [
      {
        num: '1',
        enonce: 'Appliquez les trois phases d\'execution des recettes (Art. 90 LOFIP) au dossier MUTOMBO pour les revenus 2 (loyers) et 3 (honoraires). Procedez a la constatation, la liquidation et l\'ordonnancement pour chaque categorie.',
        correction: `APPLICATION DES TROIS PHASES (ART. 90 LOFIP) - DOSSIER MUTOMBO 2025 :

======= REVENUS 2 : LOYERS (180.000.000 FC) =======

PHASE 1 - CONSTATATION (Art. 90 al. 1) :
Fait generateur : perception de loyers par M. MUTOMBO sur 3 appartements sis a Kinshasa.
Matiere imposable identifiee : loyers bruts reels = 180.000.000 FC (2025).
Redevable : M. MUTOMBO JEAN, resident congolais, imposable en RDC.
Impot applicable : IRL (Impot Realise sur les Loyers) - categorie revenus fonciers.

PHASE 2 - LIQUIDATION (Art. 90 al. 2) :
Base imposable : 180.000.000 FC (loyers bruts - aucun abattement systematique en RDC)
Taux IRL : 20%
IRL du = 180.000.000 FC × 20% = 36.000.000 FC
Penalites pour non-declaration : majorations de retard applicables (Code des impots) sur la somme de 36.000.000 FC, a calculer selon le taux legal de penalite.

PHASE 3 - ORDONNANCEMENT (Art. 90 al. 3) :
L\'inspecteur DGI emet un avis de mise en recouvrement (AMR) pour 36.000.000 FC + penalites.
L\'AMR est signe par l\'ordonnateur habilite.
Le receveur des impots prend en charge l\'AMR et procede au recouvrement aupres de M. MUTOMBO.

======= REVENUS 3 : HONORAIRES (50.000.000 FC) =======

PHASE 1 - CONSTATATION (Art. 90 al. 1) :
Fait generateur : prestation de services de conseil fiscal facturees a des societes etrangeres.
Matiere imposable : honoraires bruts recus = 50.000.000 FC.
Redevable : M. MUTOMBO JEAN (resident fiscal congolais, imposable sur revenus mondiaux).
Impot applicable : IRPP categorie benefices non commerciaux (BNC) / honoraires.

PHASE 2 - LIQUIDATION (Art. 90 al. 2) :
Base imposable : 50.000.000 FC (honoraires bruts)
Taux IRPP applicable : 30% (taux progressif au-dela du seuil, donne dans le cas)
IRPP honoraires = 50.000.000 FC × 30% = 15.000.000 FC
Penalites pour non-declaration applicables en sus.

PHASE 3 - ORDONNANCEMENT (Art. 90 al. 3) :
Emission d\'un AMR pour 15.000.000 FC + penalites par l\'ordonnateur DGI.
Prise en charge par le receveur des impots.

SYNTHESE DE LA LIQUIDATION SUPPLEMENTAIRE :
IRL loyers : 36.000.000 FC
IRPP honoraires : 15.000.000 FC
TOTAL DU SUPPLEMENTAIRE (avant penalites) : 51.000.000 FC`
      },
      {
        num: '2',
        enonce: 'Pour les traitements et salaires (Revenus 1), les 108.000.000 FC ont ete retenus et verses par l\'employeur. Analysez si cette procedure est conforme a l\'Art. 90 LOFIP et expliquez pourquoi la retenue a la source est un mecanisme specifique d\'execution des recettes. En quoi s\'articule-t-elle avec le principe d\'unite de caisse (Art. 110) ?',
        correction: `ANALYSE DE LA RETENUE A LA SOURCE ET CONFORMITE A L\'ART. 90 LOFIP :

MECANISME DE LA RETENUE A LA SOURCE :
Pour les traitements et salaires, la RDC applique un systeme de retenue a la source : c\'est l\'employeur (la banque) qui est redevable legal de l\'impot aupres de la DGI. Il retient l\'impot sur le salaire brut de l\'employe avant versement du salaire net, puis le verse directement a la DGI dans les delais legaux.

CONFORMITE AUX TROIS PHASES (Art. 90 LOFIP) :

PHASE 1 - CONSTATATION : L\'employeur identifie le fait generateur (paiement du salaire) et la matiere imposable (salaire brut).

PHASE 2 - LIQUIDATION : L\'employeur calcule l\'impot du selon le bareme progressif IRPP applicable aux traitements et salaires. Ici, l\'employeur a liquidite 108.000.000 FC pour un salaire brut non precise (le salaire net est 720.000.000 FC apres retenue).

PHASE 3 - ORDONNANCEMENT/PAIEMENT : La specificite est que pour les retenues a la source, l\'ordonnancement et le paiement se confondent : l\'employeur verse directement a la DGI sans emission formelle de titre de perception par un ordonnateur administratif. La declaration de retenues a la source (DSR) tient lieu de titre.

Cette procedure est LEGALE et CONFORME a l\'Art. 90 LOFIP, car la LOFIP n\'interdit pas la retenue a la source : elle s\'analyse comme une variante de l\'ordonnancement au comptant (Art. 91 al. 2) ou la declaration/paiement de l\'employeur tient lieu de titre de perception.

ARTICULATION AVEC L\'UNITE DE CAISSE (Art. 110) :
Les 108.000.000 FC verses par la banque-employeur sont directement transmis au Compte general du Tresor via le Compte bancaire de la DGI. La DGI concentre ces versements et les reverse au Tresor (BCC) selon les procedures de versement au Compte general du Tresor. Le circuit est : Employeur → DGI → Compte general Tresor (BCC) → Budget.
L\'unite de caisse est pleinement respectee : les fonds transitent par le Compte general du Tresor, pas par un compte prive ou une caisse parallele.`
      },
    ]
  },
]

// ─── PAGE PRINCIPALE ─────────────────────────────────────────────────────────
export default function UE5Chapitre6Page() {
  const [, navigate] = useHashLocation()
  const goBack = useGoBack('/ue5-finances-publiques')
  const currentUser = useUser()
  const isStudent = currentUser?.role === 'etudiant'

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
            { label: 'UE 5 — Finances publiques', route: '/ue5-finances-publiques' },
            { label: 'Chapitre 6' },
          ]}
          color="emerald"
        />
        <div className="flex items-center gap-2 flex-wrap">
          <h1 className="text-lg font-bold text-foreground leading-tight">Execution des recettes publiques</h1>
          <InfoTooltip texte="Ce chapitre analyse l\'execution des recettes publiques en RDC : les trois phases (constatation, liquidation, ordonnancement) selon l\'Art. 90 LOFIP, les regies financieres (DGI, DGDA, DGRAD), les types de recettes du budget 2026 et le principe d\'unite de caisse (Art. 110 LOFIP)." loi="Art. 89-92, 110 LOFIP, LF n° 25/060" />
        </div>
        <p className="text-xs text-muted-foreground">LOFIP Art. 89-92, 110 · DGI · DGDA · DGRAD · Unite de caisse · LF 2026</p>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {[
          { label: 'Lecons', value: String(LECONS.length) },
          { label: 'QCM', value: String(QCM_GLOBAL.length) },
          { label: 'Cas pratiques', value: String(ETUDES_DE_CAS.length) },
          { label: 'Duree', value: '4h00' },
        ].map(s => (
          <div key={s.label} className="rounded-xl border border-border bg-card p-3 text-center">
            <p className="text-lg font-bold text-foreground">{s.value}</p>
            <p className="text-xs text-muted-foreground mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-4">
        <div className="flex items-center gap-2 mb-2">
          <BookOpen className="h-4 w-4 text-indigo-600" />
          <span className="text-sm font-semibold text-indigo-800">Objectifs du chapitre</span>
        </div>
        <ul className="space-y-1">
          <li className="flex items-start gap-2 text-xs text-indigo-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-indigo-500" /><span>Maitriser les trois phases d\'execution des recettes : constatation, liquidation et ordonnancement (Art. 90 LOFIP)</span></li>
          <li className="flex items-start gap-2 text-xs text-indigo-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-indigo-500" /><span>Identifier les regies financieres (DGI, DGDA, DGRAD) et leurs competences respectives en matiere de recouvrement</span></li>
          <li className="flex items-start gap-2 text-xs text-indigo-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-indigo-500" /><span>Connaitre les types de recettes et taux applicables en 2026 : droits de douane (5/10/20%), TVA (16%), IS, IRPP, recettes minieres</span></li>
          <li className="flex items-start gap-2 text-xs text-indigo-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-indigo-500" /><span>Comprendre le principe d\'unite de caisse (Art. 110 LOFIP) : Compte general du Tresor, BCC caissier de l\'Etat, derogations</span></li>
          <li className="flex items-start gap-2 text-xs text-indigo-700"><CheckCircle2 className="h-3.5 w-3.5 mt-0.5 shrink-0 text-indigo-500" /><span>Appliquer les principes d\'universalite (Art. 3 LF 2026) et de legalite fiscale (Art. 4 LF 2026, Art. 89 LOFIP) aux cas pratiques</span></li>
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
              <button key={l.id} onClick={() => setLeconIdx(i)} className={cn('flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors', leconIdx === i ? 'bg-indigo-600 text-white border-indigo-600' : 'border-border hover:border-indigo-300 hover:bg-muted')}>
                {l.icone && React.cloneElement(l.icone as React.ReactElement, { className: 'h-3.5 w-3.5' })}
                L{i + 1}
              </button>
            ))}
          </div>
          <div className="rounded-xl border border-border bg-card p-4">
            <div className="flex items-start gap-3 mb-4">
              <div className="rounded-lg bg-indigo-100 p-2 text-indigo-600 shrink-0">
                {lecon.icone}
              </div>
              <div>
                <h2 className="text-sm font-bold text-foreground">{lecon.titre}</h2>
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
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3">
            <p className="text-xs text-indigo-700 font-medium">15 questions · 5 faciles · 5 moyennes · 5 difficiles · Sources : LOFIP Art. 89-92, 110 · LF 2026 n° 25/060</p>
          </div>
          <QCMPageUnique questions={QCM_GLOBAL as unknown as QCMChapitre[]} couleurAccent="indigo" />
        </div>
      )}

      {activeTab === 'cas' && !isStudent && (
        <div className="space-y-4">
          <div className="rounded-xl border border-indigo-200 bg-indigo-50/50 p-3">
            <p className="text-xs text-indigo-700 font-medium">5 cas pratiques de reflexion · Phases execution recettes · Regies DGI/DGDA/DGRAD · Unite de caisse · LF 2026</p>
          </div>
          {ETUDES_DE_CAS.map(cas => (
            <CasPratiqueBlock key={cas.titre} cas={cas} />
          ))}
        </div>
      )}

      {activeTab === 'devoir' && (
        <DevoirChapitreCreateur
          chapitreId="ue5-chapitre-6"
          chapitreNom="Chapitre 6 - Execution des recettes publiques"
          questions={QCM_GLOBAL as unknown as QCMChapitre[]}
          coursId="ue5-finances-publiques"
          casPratiquesExistants={ETUDES_DE_CAS.map(versCasPratiqueExistant)}
        />
      )}

      <button onClick={goBack} className="w-full rounded-xl bg-indigo-600 text-white py-3 font-semibold text-sm hover:bg-indigo-700 transition-colors flex items-center justify-center gap-2">
        <ArrowLeft className="h-4 w-4" /> Retour aux chapitres UE 5
      </button>
    </div>
  )
}
