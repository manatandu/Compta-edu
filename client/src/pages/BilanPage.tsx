import { useUser } from '@/lib/userContext'
import { useMemo, useState, useEffect } from "react";
import BackButton from '@/components/BackButton'
import PageLoader from '@/components/PageLoader'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { FileDown } from "lucide-react";
import { useModule } from "@/lib/moduleContext";
import { formatMontant, cn } from "@/lib/utils";
import { exportBilanPDF, exportResultatPDF } from "@/lib/exportPDF";
import { useSessions, useEcritures } from '@/lib/useFirestore'
import { ACTIF_RUBRIQUES, PASSIF_RUBRIQUES, CR_RUBRIQUES, calculerSoldes, calculerEtatsFinanciers } from '@/lib/etatsFinanciers'

// ─── COMPOSANT PRINCIPAL ────────────────────────────────────────────────────

export default function BilanPage({ mode = "bilan", embedded = false }: { mode?: "bilan" | "cr"; embedded?: boolean }) {
  const user = useUser()
  const module = useModule();
  const { sessions, loading: loadingSessions } = useSessions(user?.id, module);
  const [selectedSession, setSelectedSession] = useState(sessions[0]?.id || "");

  // Sync : si la session sélectionnée n'existe plus (supprimée), revenir à la première
  useEffect(() => {
    if (!sessions.find(s => s.id === selectedSession)) {
      setSelectedSession(sessions[0]?.id || '')
    }
  }, [sessions])
  // mode provient des props : pas de useState tab

  // Réactif : se re-calcule quand une écriture est ajoutée/supprimée/réinitialisée
  const { ecritures: allEcritures, loading: loadingEcritures } = useEcritures(user?.id, module, selectedSession || null)
  const ecritures = useMemo(() =>
    allEcritures.filter(e => e.sessionId === selectedSession),
    [allEcritures, selectedSession]
  );

  // Calcul : lib/etatsFinanciers.ts (source unique, partagée avec l'aperçu des devoirs).
  const { actif: actifVals, passif: passifVals, cr: crVals, resultatNet } = useMemo(
    () => calculerEtatsFinanciers(calculerSoldes(ecritures)),
    [ecritures]
  );

  // ─── RENDER ───────────────────────────────────────────────────────────────

  const session = sessions.find(s => s.id === selectedSession);
  const exerciceLabel = session?.exercice ?? new Date().getFullYear().toString();

  // En-tête officiel SYSCOHADA
  function renderEnTete(titre: string) {
    return (
      <div className="mb-3">
        <div className="flex justify-between text-xs text-muted-foreground mb-1">
          <span>Désignation entité : <span className="font-medium text-foreground">{session?.nom ?? "-"}</span></span>
          <span>Exercice clos le 31/12/{exerciceLabel}</span>
        </div>
        <div className="text-center font-bold text-sm uppercase text-primary border-b border-primary pb-1">
          {titre} AU 31 DÉCEMBRE {exerciceLabel}
        </div>
      </div>
    );
  }

  function renderActif() {
    return (
      <Card className="border-border">
      <CardContent className="p-4">
        {renderEnTete("BILAN : ACTIF")}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground text-xs">
                <th className="px-2 py-2 text-left w-10">REF</th>
                <th className="px-2 py-2 text-left">ACTIF</th>
                <th className="px-2 py-2 text-center w-10">Note</th>
                <th className="px-2 py-2 text-right w-24">BRUT</th>
                <th className="px-2 py-2 text-right w-28">AMORT et DÉPREC.</th>
                <th className="px-2 py-2 text-right w-24">NET</th>
              </tr>
            </thead>
            <tbody>
              {ACTIF_RUBRIQUES.map(r => {
                const v = actifVals.get(r.ref) ?? { brut: 0, corr: 0, net: 0 };
                if (r.isGrandTotal) {
                  return (
                    <tr key={r.ref} className="bg-primary text-primary-foreground font-bold text-xs border-t-2">
                      <td className="px-2 py-2">{r.ref}</td>
                      <td className="px-2 py-2">{r.label}</td>
                      <td className="px-2 py-2 text-center"></td>
                      <td className="px-2 py-2 text-right">{v.brut > 0 ? formatMontant(v.brut) : ""}</td>
                      <td className="px-2 py-2 text-right">{v.corr > 0 ? formatMontant(v.corr) : ""}</td>
                      <td className="px-2 py-2 text-right">{formatMontant(v.net)}</td>
                    </tr>
                  );
                }
                if (r.isTotal) {
                  return (
                    <tr key={r.ref} className="bg-primary/15 font-semibold border-t border-primary/30 text-xs">
                      <td className="px-2 py-1.5 text-primary font-mono">{r.ref}</td>
                      <td className="px-2 py-1.5 text-primary font-semibold">{r.label}</td>
                      <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                      <td className="px-2 py-1.5 text-right text-primary font-bold">{v.brut > 0 ? formatMontant(v.brut) : ""}</td>
                      <td className="px-2 py-1.5 text-right text-primary">{v.corr > 0 ? formatMontant(v.corr) : ""}</td>
                      <td className="px-2 py-1.5 text-right text-primary font-bold">{v.net > 0 ? formatMontant(v.net) : ""}</td>
                    </tr>
                  );
                }
                if (r.isSection) {
                  return (
                    <tr key={r.ref} className="bg-secondary/20 font-semibold text-xs">
                      <td className="px-2 py-1.5 text-secondary-foreground font-mono">{r.ref}</td>
                      <td className="px-2 py-1.5 text-secondary-foreground font-semibold">{r.label}</td>
                      <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                      <td className="px-2 py-1.5 text-right text-secondary-foreground font-bold">{v.brut > 0 ? formatMontant(v.brut) : ""}</td>
                      <td className="px-2 py-1.5 text-right text-secondary-foreground">{v.corr > 0 ? formatMontant(v.corr) : ""}</td>
                      <td className="px-2 py-1.5 text-right text-secondary-foreground font-bold">{v.net > 0 ? formatMontant(v.net) : ""}</td>
                    </tr>
                  );
                }
                return (
                  <tr key={r.ref} className="border-b border-border/40 hover:bg-muted/20 text-xs">
                    <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                    <td className="px-2 py-1.5">{r.label}</td>
                    <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                    <td className="px-2 py-1.5 text-right">{v.brut > 0 ? formatMontant(v.brut) : ""}</td>
                    <td className="px-2 py-1.5 text-right text-muted-foreground">{v.corr > 0 ? formatMontant(v.corr) : ""}</td>
                    <td className="px-2 py-1.5 text-right font-medium">{v.net > 0 ? formatMontant(v.net) : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
      </Card>
    );
  }

  function renderPassif() {
    return (
      <Card className="border-border">
      <CardContent className="p-4">
        {renderEnTete("BILAN : PASSIF")}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground text-xs">
                <th className="px-2 py-2 text-left w-10">REF</th>
                <th className="px-2 py-2 text-left">PASSIF</th>
                <th className="px-2 py-2 text-center w-10">Note</th>
                <th className="px-2 py-2 text-right w-28">NET (N)</th>
              </tr>
            </thead>
            <tbody>
              {PASSIF_RUBRIQUES.map(r => {
                const val = r.isResultat ? resultatNet : (passifVals.get(r.ref) ?? 0);
                if (r.isGrandTotal) {
                  return (
                    <tr key={r.ref} className="bg-primary text-primary-foreground font-bold text-xs border-t-2">
                      <td className="px-2 py-2">{r.ref}</td>
                      <td className="px-2 py-2">{r.label}</td>
                      <td className="px-2 py-2 text-center"></td>
                      <td className="px-2 py-2 text-right">{formatMontant(val)}</td>
                    </tr>
                  );
                }
                if (r.isTotal) {
                  return (
                    <tr key={r.ref} className="bg-primary/15 font-semibold border-t border-primary/30 text-xs">
                      <td className="px-2 py-1.5 text-primary font-mono">{r.ref}</td>
                      <td className="px-2 py-1.5 text-primary font-semibold">{r.label}</td>
                      <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                      <td className={`px-2 py-1.5 text-right font-bold ${val < 0 ? "text-red-600" : "text-primary"}`}>
                        {val !== 0 ? (val < 0 ? `(${formatMontant(Math.abs(val))})` : formatMontant(val)) : ""}
                      </td>
                    </tr>
                  );
                }
                if (r.isResultat) {
                  return (
                    <tr key={r.ref} className="border-b border-border/40 bg-secondary/10 text-xs">
                      <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                      <td className="px-2 py-1.5 font-medium">{r.label}</td>
                      <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                      <td className={`px-2 py-1.5 text-right font-bold ${resultatNet >= 0 ? "text-green-700" : "text-red-700"}`}>
                        {resultatNet !== 0 ? `${formatMontant(Math.abs(resultatNet))} ${resultatNet >= 0 ? "(Bénéfice)" : "(Perte)"}` : ""}
                      </td>
                    </tr>
                  );
                }
                const isSigne = (r as any).isSigne ?? false;
                const displayVal = isSigne
                  ? (val !== 0 ? (val < 0 ? `(${formatMontant(Math.abs(val))})` : formatMontant(val)) : "")
                  : (val !== 0 ? formatMontant(val) : "");
                const valColor = isSigne && val < 0 ? "text-red-600" : "";
                return (
                  <tr key={r.ref} className="border-b border-border/40 hover:bg-muted/20 text-xs">
                    <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                    <td className="px-2 py-1.5">{r.label}</td>
                    <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                    <td className={`px-2 py-1.5 text-right font-medium ${valColor}`}>{displayVal}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
      </Card>
    );
  }

  function renderCR() {
    return (
      <Card className="border-border">
      <CardContent className="p-4">
        {renderEnTete("COMPTE DE RÉSULTAT")}
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-primary text-primary-foreground text-xs">
                <th className="px-2 py-2 text-left w-10">REF</th>
                <th className="px-2 py-2 text-left">LIBELLÉS</th>
                <th className="px-2 py-2 text-center w-10">+/-</th>
                <th className="px-2 py-2 text-center w-16">NOTE</th>
                <th className="px-2 py-2 text-left w-32">Comptes</th>
                <th className="px-2 py-2 text-right w-32">Montant (N)</th>
              </tr>
            </thead>
            <tbody>
              {CR_RUBRIQUES.map(r => {
                const v = crVals.get(r.ref) ?? { montant: 0, compteUtilises: [...(r.comptes ?? [])] };
                if (r.isGrandTotal) {
                  const xi = crVals.get("XI")?.montant ?? resultatNet;
                  return (
                    <tr key={r.ref} className="bg-primary text-primary-foreground font-bold text-xs border-t-2">
                      <td className="px-2 py-2">{r.ref}</td>
                      <td className="px-2 py-2">{r.label}</td>
                      <td className="px-2 py-2 text-center">{xi >= 0 ? "+" : "-"}</td>
                      <td className="px-2 py-2 text-center">{r.note}</td>
                      <td className="px-2 py-2 text-xs">{v.compteUtilises.join(", ")}</td>
                      <td className="px-2 py-2 text-right">{formatMontant(Math.abs(xi))}</td>
                    </tr>
                  );
                }
                if (r.isTotal) {
                  return (
                    <tr key={r.ref} className="bg-primary/15 font-semibold border-t border-primary/30 text-xs">
                      <td className="px-2 py-1.5 text-primary font-mono">{r.ref}</td>
                      <td className="px-2 py-1.5 text-primary font-semibold">{r.label}</td>
                      <td className="px-2 py-1.5 text-center">{v.montant >= 0 ? "+" : "-"}</td>
                      <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                      <td className="px-2 py-1.5 text-xs text-muted-foreground">{v.compteUtilises.join(", ")}</td>
                      <td className={`px-2 py-1.5 text-right font-bold ${v.montant >= 0 ? "text-green-700" : "text-red-700"}`}>
                        {formatMontant(Math.abs(v.montant))}
                      </td>
                    </tr>
                  );
                }
                return (
                  <tr key={r.ref} className="border-b border-border/40 hover:bg-muted/20 text-xs">
                    <td className="px-2 py-1.5 font-mono text-muted-foreground">{r.ref}</td>
                    <td className="px-2 py-1.5">{r.label}</td>
                    <td className="px-2 py-1.5 text-center text-muted-foreground">{r.sens}</td>
                    <td className="px-2 py-1.5 text-center text-muted-foreground">{r.note}</td>
                    <td className="px-2 py-1.5 text-xs text-muted-foreground">{v.compteUtilises.join(", ")}</td>
                    <td className="px-2 py-1.5 text-right font-medium">{v.montant !== 0 ? formatMontant(v.montant) : ""}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </CardContent>
      </Card>
    );
  }

  if (loadingSessions || loadingEcritures) return <PageLoader message="Chargement du bilan..." />

  const isBilan = mode === "bilan"

  const boutonExport = isBilan ? (
    <Button variant="outline" size="sm" className="animate-slideDown" style={{ animationDelay: '100ms' }} onClick={() => {
      const actifRows = ACTIF_RUBRIQUES.map(r => {
        const v = actifVals.get(r.ref) ?? { brut: 0, corr: 0, net: 0 };
        return { ref: r.ref, label: r.label, brut: v.brut, amort: v.corr, net: v.net };
      });
      const passifRows = PASSIF_RUBRIQUES.map(r => {
        const val = r.isResultat ? resultatNet : (passifVals.get(r.ref) ?? 0);
        return { ref: r.ref, label: r.label, net: val };
      });
      exportBilanPDF(session?.nom ?? "Session", actifRows, passifRows);
    }}>
      <FileDown className="w-4 h-4 mr-1" /> PDF Bilan
    </Button>
  ) : (
    <Button variant="outline" size="sm" onClick={() => {
      const rows = CR_RUBRIQUES.map(r => {
        const v = crVals.get(r.ref) ?? { montant: 0, compteUtilises: [...(r.comptes ?? [])] };
        return { ref: r.ref, label: r.label, sens: r.sens, comptes: v.compteUtilises.join(", "), montant: v.montant };
      });
      exportResultatPDF(session?.nom ?? "Session", rows);
    }}>
      <FileDown className="w-4 h-4 mr-1" /> PDF Résultat
    </Button>
  )

  return (
    <div className={cn('space-y-5', !embedded && 'animate-fadeIn')}>

      {!embedded && (
        <>
          {/* ── Bouton retour ── */}
          <BackButton />

          {/* ── Header Banner Animé ── */}
          <div className="animate-slideDown" style={{ animationDelay: '0ms' }}>
            <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border border-primary/10 px-4 sm:px-6 py-4 sm:py-5">
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 animate-pulseGlow" />
              <div className="pointer-events-none absolute -right-2 bottom-0 h-14 w-14 rounded-full bg-primary/6 animate-float" />
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/15 border border-primary/20 shadow-sm transition-all duration-300 hover:scale-110 hover:rotate-6">
                    <FileDown className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h1 className="text-lg sm:text-xl font-display font-bold text-foreground tracking-tight">
                      {isBilan ? "Bilan" : "Compte de Résultat"}
                    </h1>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {isBilan ? "Actif et passif SYSCOHADA révisé" : "Charges et produits, résultat de l'exercice"}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  {boutonExport}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {embedded && (
        <div className="flex justify-end">
          {boutonExport}
        </div>
      )}

      {/* Sélecteur session */}
      <div className={embedded ? undefined : 'animate-slideUp'} style={embedded ? undefined : { animationDelay: '80ms' }}>
      <Card className="border-border">
        <CardContent className="pt-4 pb-4">
          <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
            <Label className="text-sm font-medium shrink-0">Session :</Label>
            <Select value={selectedSession} onValueChange={setSelectedSession}>
              <SelectTrigger className="sm:w-80">
                <SelectValue placeholder="Sélectionner une session" />
              </SelectTrigger>
              <SelectContent>
                {sessions.map(s => (
                  <SelectItem key={s.id} value={s.id}>{s.nom} ({s.exercice})</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      </div>

      {/* Contenu */}
      {sessions.length === 0 ? (
        <Card className="border-border">
          <CardContent className="pt-8 pb-8 text-center text-muted-foreground">
            <FileDown className="h-10 w-10 mx-auto mb-3 opacity-30" />
            <p>Aucune donnée à afficher.</p>
            <p className="text-sm mt-1">Créez une session et saisissez des écritures dans le Livre Journal pour les voir apparaître ici.</p>
          </CardContent>
        </Card>
      ) : isBilan ? (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 animate-slideUp" style={{ animationDelay: '120ms' }}>
          <div>{renderActif()}</div>
          <div>{renderPassif()}</div>
        </div>
      ) : (
        <div className="animate-slideUp" style={{ animationDelay: '120ms' }}>{renderCR()}</div>
      )}
    </div>
  );
}
