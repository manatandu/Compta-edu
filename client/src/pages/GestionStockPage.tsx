import BackButton from '@/components/BackButton'
import React, { useState } from 'react'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  Package, Plus, ChevronRight, BookOpen, BarChart2,
  ArrowDownCircle, ArrowUpCircle, Sparkles, ClipboardList
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useUser } from '@/lib/userContext'

export default function GestionStockPage() {
  const [, navigate] = useHashLocation()
  const user = useUser()

  const cards = [
    {
      icon: ClipboardList,
      label: 'Fiches de stock',
      desc: 'Créer et gérer les articles (31, 32, 36) avec stock initial.',
      color: 'text-purple-600 bg-purple-50',
      path: '/stock/articles',
    },
    {
      icon: ArrowDownCircle,
      label: 'Entrées / Sorties',
      desc: 'Enregistrer les mouvements de stock (bons de réception et de sortie).',
      color: 'text-emerald-600 bg-emerald-50',
      path: '/stock/mouvement',
    },
    {
      icon: BarChart2,
      label: 'Fiche de stock calculée',
      desc: 'Tableau CUMP après chaque entrée ou PEPS / FIFO par article.',
      color: 'text-blue-600 bg-blue-50',
      path: '/stock/fiche',
    },
    {
      icon: BookOpen,
      label: 'Journal interne',
      desc: 'Écritures générées automatiquement. Exporter vers le Journal général.',
      color: 'text-orange-600 bg-orange-50',
      path: '/stock/journal',
    },
    {
      icon: Sparkles,
      label: 'Exercice pédagogique',
      desc: 'Cas pratique SYSCOHADA : rames de papier A4 : CUMP & PEPS avec correction.',
      color: 'text-purple-600 bg-purple-50',
      path: '/stock/exercice',
    },
  ]

  return (
    <div className="space-y-6 pb-4">
      <BackButton />

      {/* En-tête */}
      <div className="animate-slideDown">
        <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-500/10 via-purple-500/5 to-transparent border border-purple-200/30 px-6 py-5">
          <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-400/10 animate-pulseGlow" />
          <div className="flex items-center gap-3 relative">
            <div className="h-10 w-10 rounded-lg bg-purple-600 flex items-center justify-center shrink-0 shadow-md shadow-purple-500/20">
              <Package className="h-5 w-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-display font-bold text-foreground leading-tight">Gestion de Stock</h1>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5 mt-0.5">
                <Sparkles className="h-3 w-3 text-purple-500" />
                SYSCOHADA : Comptes 31, 32, 36 : CUMP & PEPS
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rappel méthodes */}
      <div className="grid grid-cols-2 gap-3">
        <div className="rounded-xl border border-border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground mb-0.5">Méthode 1</p>
          <p className="text-sm font-semibold text-foreground">CUMP</p>
          <p className="text-xs text-muted-foreground mt-0.5">Coût Unitaire Moyen Pondéré après chaque entrée</p>
        </div>
        <div className="rounded-xl border border-border bg-card px-4 py-3">
          <p className="text-xs text-muted-foreground mb-0.5">Méthode 2</p>
          <p className="text-sm font-semibold text-foreground">PEPS / FIFO</p>
          <p className="text-xs text-muted-foreground mt-0.5">Premier entré : Premier sorti (First In First Out)</p>
        </div>
      </div>

      {/* Modules */}
      <div className="space-y-3">
        {cards.map((card, i) => {
          const Icon = card.icon
          return (
            <button
              key={card.path}
              onClick={() => navigate(card.path)}
              className={cn(
                'group w-full flex items-center gap-3 px-4 py-3.5 rounded-xl border border-border bg-card',
                'hover:border-primary/20 hover:bg-primary/5 hover:shadow-sm transition-all duration-200 cursor-pointer',
                'animate-slideUp text-left'
              )}
              style={{ animationDelay: `${i * 70}ms` }}
            >
              <div className={cn('flex h-10 w-10 items-center justify-center rounded-lg flex-shrink-0 transition-all duration-300 group-hover:scale-110', card.color)}>
                <Icon className="h-5 w-5" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{card.label}</p>
                <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{card.desc}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground/40 shrink-0 group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
            </button>
          )
        })}
      </div>

      {/* Comptes SYSCOHADA rappel */}
      <div className="rounded-xl border border-border bg-muted/30 px-4 py-3">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">Comptes utilisés : Classe 3</p>
        <div className="space-y-1">
          {[
            { num: '31', label: 'Marchandises' },
            { num: '32', label: 'Matières Premières et Fournitures liées' },
            { num: '36', label: 'Produits Finis' },
            { num: '6011/6021', label: 'Achats marchandises / MP' },
            { num: '6031/6032', label: 'Variations de stocks marchandises / MP' },
            { num: '39', label: 'Dépréciations de stocks' },
          ].map(c => (
            <div key={c.num} className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-purple-600 w-16 shrink-0">{c.num}</span>
              <span className="text-xs text-muted-foreground">{c.label}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  )
}
