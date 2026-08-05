import React from "react";
import GrandLivrePage from "./GrandLivrePage";

// Wrapper SYCEBNL : réutilise le composant Grand Livre existant
export default function GrandLivreSYCEBNLPage() {
  return (
    <div className="space-y-4 animate-fadeIn">
      <div className="rounded-lg border border-blue-200 bg-blue-50 px-4 py-2">
        <p className="text-xs text-blue-800 font-medium">
          Grand Livre · Module SYCEBNL
        </p>
        <p className="text-xs text-blue-700 mt-0.5">
          Visualisation des mouvements par compte avec soldes déroulés.
          Fonctionne avec la même logique que SYSCOHADA.
        </p>
      </div>
      <GrandLivrePage />
    </div>
  );
}
