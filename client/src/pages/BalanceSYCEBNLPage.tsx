import React from "react";
import BalancePage from "./BalancePage";

// Wrapper SYCEBNL : réutilise le composant Balance existant
export default function BalanceSYCEBNLPage() {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="rounded-lg border border-blue-200 bg-blue-50 dark:bg-blue-900/10 dark:border-blue-800 px-4 py-2">
        <p className="text-xs text-blue-800 dark:text-blue-300 font-medium">
          Balance Générale · Module SYCEBNL
        </p>
        <p className="text-xs text-blue-700 dark:text-blue-400 mt-0.5">
          Balance à 6 colonnes : ouverture (D/C), mouvements (D/C), clôture (D/C).
          Fonctionne avec la même logique que SYSCOHADA.
        </p>
      </div>
      <BalancePage />
    </div>
  );
}
