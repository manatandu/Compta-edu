import React from 'react'

interface Props {
  secondsLeft: number
  onStay: () => void
}

export default function IdleWarningModal({ secondsLeft, onStay }: Props) {
  const mins = Math.floor(secondsLeft / 60)
  const secs = secondsLeft % 60
  const label = mins > 0 ? `${mins} min ${secs.toString().padStart(2, '0')} s` : `${secs} s`

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl border border-border p-8 max-w-sm w-full mx-4 text-center">
        <div className="w-14 h-14 rounded-full bg-amber-100 flex items-center justify-center mx-auto mb-4">
          <svg className="w-7 h-7 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-foreground mb-2">Session inactive</h2>
        <p className="text-sm text-muted-foreground mb-1">
          Vous serez automatiquement déconnecté dans
        </p>
        <p className="text-3xl font-bold text-amber-600 my-3 tabular-nums">{label}</p>
        <p className="text-xs text-muted-foreground mb-6">
          Cliquez sur le bouton ci-dessous pour rester connecté.
        </p>
        <button
          onClick={onStay}
          className="w-full rounded-xl bg-primary text-primary-foreground font-semibold py-3 text-sm hover:opacity-90 transition-opacity"
        >
          Rester connecté
        </button>
      </div>
    </div>
  )
}
