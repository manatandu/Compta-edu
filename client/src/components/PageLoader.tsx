import React from 'react'
import { Loader2 } from 'lucide-react'

interface PageLoaderProps {
  message?: string
}

export default function PageLoader({ message = 'Chargement...' }: PageLoaderProps) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-3 text-muted-foreground animate-fadeIn">
      <Loader2 className="h-8 w-8 animate-spin text-primary" />
      <p className="text-sm">{message}</p>
    </div>
  )
}
