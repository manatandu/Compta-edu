import React from "react";
import JournalPage from "./JournalPage";

// Wrapper SYCEBNL : réutilise le composant Journal existant
// Le journal fonctionne avec la même logique que SYSCOHADA (partie double obligatoire)
// La distinction SYCEBNL est au niveau des états financiers (BilanSYCEBNLPage)
export default function JournalSYCEBNLPage() {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2">
        <p className="text-xs text-blue-800 font-medium">
          Journal · Module SYCEBNL
        </p>
        <p className="text-xs text-blue-700 mt-0.5">
          Même logique de saisie que SYSCOHADA. La partie double est obligatoire.
          Les états financiers SYCEBNL (Bilan, Compte de Résultat) sont accessibles via l'onglet dédié.
        </p>
      </div>
      <JournalPage />
    </div>
  );
}
