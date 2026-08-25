import { useState } from 'react'
import { Home, Car, MapPin, Landmark } from 'lucide-react'
import { Section, Depliant, Exemple, ARetenir, Ref } from './coursHelpers'

const SOUS = [
  { id: 'cadre', label: "Cadre général" },
  { id: 'irl', label: 'IRL' },
  { id: 'if', label: 'IF' },
  { id: 'autres', label: 'IV, TSCR, TSMC' },
] as const

export default function NotesCoursAutresImpots() {
  const [actif, setActif] = useState<typeof SOUS[number]['id']>('cadre')

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-1.5">
        {SOUS.map(s => (
          <button
            key={s.id}
            onClick={() => setActif(s.id)}
            className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
              actif === s.id ? 'bg-amber-600 text-white border-amber-600' : 'bg-background text-muted-foreground border-border/60 hover:border-amber-400'
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>

      {actif === 'cadre' && (
        <Section titre="Des impôts réels, de compétence provinciale" icon={Landmark}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            À côté de l'IS et de l'IRPP — impôts d'État, assis sur un revenu ou un résultat — le système fiscal congolais comprend une famille d'impôts <strong>réels</strong> : ils frappent un bien (immeuble, véhicule, concession) indépendamment de la situation personnelle ou du revenu global de son propriétaire.
          </p>
          <ARetenir>
            <p>L'Art. 204, point 16 de la Constitution attribue ces impôts réels à la compétence des provinces. Chaque province peut fixer son propre barème par un acte distinct : un taux valable à Kinshasa n'est pas nécessairement celui d'une autre province.</p>
          </ARetenir>
          <p className="text-xs text-foreground/80 leading-relaxed">
            Ces impôts ne relèvent pas de la réforme IS/IRPP de la loi 23/053 — ils demeurent régis par l'Ordonnance-loi n°69-006 du 10 février 1969 (impôts réels) et l'Ordonnance-loi n°69/009 du 10 février 1969 (impôt sur les revenus locatifs), sous réserve des barèmes provinciaux qui viennent les compléter.
          </p>
        </Section>
      )}

      {actif === 'irl' && (
        <Section titre="Impôt sur les Revenus Locatifs (IRL)" icon={Home}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            L'IRL frappe le revenu tiré de la location d'un bâtiment ou d'un terrain. Il obéit à un mécanisme à deux temps : une <strong>retenue à la source</strong> opérée par le locataire (redevable légal), qui vient en déduction de l'impôt final dû par le bailleur (redevable réel).
          </p>
          <div className="grid grid-cols-2 gap-2">
            <div className="rounded-lg border border-border/60 p-2.5">
              <p className="text-[11px] font-bold text-foreground mb-0.5">Taux national de référence</p>
              <p className="text-xs text-muted-foreground">22% flat, quel que soit le montant du loyer (Art. 11, O.-L. n°69/009).</p>
            </div>
            <div className="rounded-lg border border-border/60 p-2.5">
              <p className="text-[11px] font-bold text-foreground mb-0.5">Barème kinois (2024)</p>
              <p className="text-xs text-muted-foreground">Modulé par rang de localité : 22% (1er rang) ou 17% (2e à 4e rang).</p>
            </div>
          </div>
          <Depliant titre="Mise à disposition gratuite à usage professionnel">
            <p>Lorsqu'un bâtiment ou un terrain est mis gratuitement à disposition d'une entreprise pour un usage professionnel, l'opération reste imposable à l'IRL, mais sur une base forfaitaire au m² (et non un loyer réel, puisqu'il n'y en a pas) — un mécanisme distinct qu'il ne faut pas confondre avec le régime général de location.</p>
          </Depliant>
          <p className="text-xs text-foreground/70 leading-relaxed">
            <Ref>Le barème chiffré vérifié pour la Ville-Province de Kinshasa (Arrêtés provinciaux n°015 et 016/2023 du 07/12/2023) est disponible dans le simulateur de ce chapitre.</Ref>
          </p>
        </Section>
      )}

      {actif === 'if' && (
        <Section titre="Impôt Foncier (IF)" icon={MapPin}>
          <p className="text-xs text-foreground/80 leading-relaxed">
            L'impôt foncier — appelé « impôt sur la superficie des propriétés foncières » dans la pratique administrative kinoise — frappe les propriétés bâties (villas, immeubles, appartements) et non bâties (terrains) selon deux logiques différentes de calcul :
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div className="rounded-lg border border-border/60 p-2.5">
              <p className="text-[11px] font-bold text-foreground mb-0.5">Personnes physiques</p>
              <p className="text-xs text-muted-foreground">Taux <strong>forfaitaire</strong> par immeuble, indépendant de la superficie exacte, gradué par rang de localité.</p>
            </div>
            <div className="rounded-lg border border-border/60 p-2.5">
              <p className="text-[11px] font-bold text-foreground mb-0.5">Personnes morales</p>
              <p className="text-xs text-muted-foreground">Taux au <strong>m²</strong>, appliqué à la superficie bâtie réelle du bien.</p>
            </div>
          </div>
          <Exemple>
            <p>Un particulier propriétaire d'une villa en 1er rang paie un forfait fixe par immeuble. Une société immobilière propriétaire de la même villa paie un taux au m² sur la superficie effectivement construite — le montant final dépendra donc de la taille du bien, contrairement au forfait applicable à la personne physique.</p>
          </Exemple>
        </Section>
      )}

      {actif === 'autres' && (
        <Section titre="Impôt sur les Véhicules, TSCR, TSMC" icon={Car}>
          <Depliant titre="Impôt sur les Véhicules (IV)" defaultOpen>
            <p>Impôt annuel dû par tout propriétaire de véhicule à moteur, assis sur des critères techniques du véhicule (puissance, poids, usage). Régi par le Titre III de l'O.-L. n°69-006.</p>
          </Depliant>
          <Depliant titre="Taxe Spéciale de Circulation Routière (TSCR)">
            <p>Distincte de l'impôt sur les véhicules, la TSCR finance l'entretien du réseau routier. Régie par l'O.-L. n°88-029 du 15 juillet 1988, intégralement.</p>
          </Depliant>
          <Depliant titre="Taxe sur la Superficie des concessions Minières (TSMC)">
            <p>Due par le titulaire d'un titre minier ou de carrières sur la superficie de son périmètre, indépendamment de la production effective. Ne pas confondre avec la redevance minière (assise sur la valeur des ventes), traitée au chapitre Fiscalité minière.</p>
          </Depliant>
        </Section>
      )}
    </div>
  )
}
