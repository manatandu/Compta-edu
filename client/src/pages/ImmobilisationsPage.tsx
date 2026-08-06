import React, { useState, useMemo, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useHashLocation } from 'wouter/use-hash-location'
import {
  Building2, Search, Calculator,
  BookOpen, ArrowLeft, AlertCircle, CheckCircle2, HelpCircle, FileText,
  ChevronDown, Lock
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────
interface Immobilisation {
  designation: string
  categorie: string
  compteOHADA: string      // ex : '2411' (4 chiffres OHADA 2017)
  intituleCompte: string   // intitulé OHADA exact
  duree: number | null     // durée fiscale (AR n°088)
  tauxLineaire: number | null
  eligibleDegressif: boolean
  raisonNonDegressif?: string
  eligibleExceptionnel: boolean
  raisonNonExceptionnel?: string
}

// ─── Plan comptable OHADA 2017 : Classe 2 (comptes à 4 chiffres exacts) ──────
// INCORPORELS
// 2121 Brevets
// 2122 Licences
// 2131 Logiciels
// 2132 Sites internet
// 2150 Fonds commercial
// 2160 Droit au bail
// 2181 Frais de prospection et d'évaluation de ressources minérales
// TERRAINS
// 2221 Terrains agricoles  2222 Terrains nus  2223 Terrains bâtis  2261 Terrains aménagés
// BÂTIMENTS (Classe 23)
// 2311 Bâtiments industriels sol propre       2312 Bâtiments agricoles sol propre
// 2313 Bâtiments administratifs et commerciaux sol propre
// 2314 Bâtiments logement personnel
// 2321 Bâtiments industriels sol d'autrui     2323 Bâtiments admin/commerciaux sol d'autrui
// 2331 Voies de terre  2332 Voies de fer  2333 Voies d'eau  2334 Barrages, Digues
// 2335 Pistes d'aérodrome   2338 Autres ouvrages d'infrastructure
// 2341 Installations complexes sol propre     2342 Installations complexes sol d'autrui
// 2343 Installations spécifiques sol propre   2344 Installations spécifiques sol d'autrui
// 2345 Aménagements et agencements des bâtiments
// 2351 Installations générales (aménagements de bureaux)
// MATÉRIELS (Classe 24)
// 2411 Matériel industriel        2412 Outillage industriel
// 2421 Matériel agricole          2422 Outillage agricole
// 2441 Matériel de bureau         2442 Matériel informatique
// 2443 Matériel bureautique       2444 Mobilier de bureau
// 2451 Matériel automobile        2452 Matériel ferroviaire
// 2453 Matériel fluvial/lagunaire 2454 Matériel naval   2455 Matériel aérien
// 2457 Matériel hippomobile       2458 Autres matériels de transport
// 2461 Cheptel animaux de trait   2462 Cheptel animaux reproducteurs
// 2465 Plantations agricoles
// 2471 Agencements et aménagements du matériel
// 2488 Divers matériels mobiliers
// AMORTISSEMENTS (Classe 28)
// 2812 Amort. brevets, licences, concessions
// 2813 Amort. logiciels et sites internet
// 2814 Amort. marques
// 2815 Amort. fonds commercial
// 2816 Amort. droit au bail
// 2824 Amort. travaux de mise en valeur des terrains
// 2831 Amort. bâtiments industriels/agricoles/admin/commerciaux sol propre
// 2832 Amort. bâtiments sol d'autrui
// 2833 Amort. ouvrages d'infrastructure
// 2834 Amort. aménagements, agencements et installations techniques
// 2835 Amort. aménagements de bureaux
// 2841 Amort. matériel et outillage industriel et commercial
// 2842 Amort. matériel et outillage agricole
// 2844 Amort. matériel et mobilier
// 2845 Amort. matériel de transport
// 2847 Amort. agencements et aménagements du matériel et actifs biologiques
// 2848 Amort. autres matériels

// ─── Données catalogue ── AR n°088 du 19/02/2025 (vigeur 01/01/2026) ──────────
// Éligibilité dégressif : Art. 31 Loi IS (liste exhaustive ci-dessous)
// Éligibilité exceptionnel : Art. 36-37 Loi IS = mêmes biens que dégressif (Art. 31) + exportation ≥ 20% CA
// Exclusions dégressif (Art. 32) : durée < 4 ans OU > 20 ans OU incorporels
// Coefficients (Art. 33 Loi IS) : 1,5 (3–4 ans) | 2 (5–6 ans) | 2,5 (> 6 ans)
// NB : véhicules de tourisme ≠ éligibles dégressif (exclusion Art. 31 al. 1)
// NB : mobilier de bureau ≠ éligible dégressif (exclusion Art. 31 al. 6)

const CATALOGUE: Immobilisation[] = [

  // ── I. ÉLÉMENTS INCORPORELS ─────────────────────────────────────────────────
  // 2121 Brevets | 2122 Licences | 2131 Logiciels | 2150 Fonds commercial
  { designation: 'Brevets', categorie: 'I. Éléments incorporels',
    compteOHADA: '2121', intituleCompte: 'Brevets',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: false, raisonNonDegressif: 'Immobilisation incorporelle (Art. 32 al. 2 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Réservé aux biens de l\'Art. 31 Loi IS (corporels uniquement)' },

  { designation: 'Licences', categorie: 'I. Éléments incorporels',
    compteOHADA: '2122', intituleCompte: 'Licences',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: false, raisonNonDegressif: 'Immobilisation incorporelle (Art. 32 al. 2 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Réservé aux biens de l\'Art. 31 Loi IS (corporels uniquement)' },

  { designation: 'Logiciels', categorie: 'I. Éléments incorporels',
    compteOHADA: '2131', intituleCompte: 'Logiciels',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: false, raisonNonDegressif: 'Immobilisation incorporelle (Art. 32 al. 2 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Réservé aux biens de l\'Art. 31 Loi IS (corporels uniquement)' },

  { designation: 'Fonds de commerce', categorie: 'I. Éléments incorporels',
    compteOHADA: '2150', intituleCompte: 'Fonds commercial',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: false, raisonNonDegressif: 'Immobilisation incorporelle (Art. 32 al. 2 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Réservé aux biens de l\'Art. 31 Loi IS (corporels uniquement)' },

  // ── II. CONSTRUCTIONS ────────────────────────────────────────────────────────
  // 231 = Bâtiments (tout usage : industriel, commercial, administratif, habitation)
  // 232 = Agencements/aménagements sur constructions de tiers
  // 233 = Ouvrages d'infrastructure
  // 234 = Aménagements de terrains

  { designation: 'Constructions en matériaux durables', categorie: 'II. Constructions',
    compteOHADA: '2311', intituleCompte: 'Bâtiments industriels (sol propre)',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: false, raisonNonDegressif: 'Bâtiments non listés à l\'Art. 31 Loi IS',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Bâtiments commerciaux, garages, hangars, ateliers', categorie: 'II. Constructions',
    compteOHADA: '2313', intituleCompte: 'Bâtiments administratifs et commerciaux (sol propre)',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: false, raisonNonDegressif: 'Bâtiments non listés à l\'Art. 31 Loi IS',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Cabines de transformation électrique', categorie: 'II. Constructions',
    compteOHADA: '2341', intituleCompte: 'Installations complexes spécialisées (sol propre)',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true,
    eligibleExceptionnel: true },

  { designation: 'Installations de chutes d\'eau, barrages', categorie: 'II. Constructions',
    compteOHADA: '2334', intituleCompte: 'Barrages, Digues',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true,
    eligibleExceptionnel: true },

  { designation: 'Châteaux d\'eau', categorie: 'II. Constructions',
    compteOHADA: '2338', intituleCompte: "Autres ouvrages d'infrastructure",
    duree: 25, tauxLineaire: 4,
    eligibleDegressif: false, raisonNonDegressif: 'Durée > 20 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Canalisations et réseaux de canalisations', categorie: 'II. Constructions',
    compteOHADA: '2338', intituleCompte: "Autres ouvrages d'infrastructure",
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true,
    eligibleExceptionnel: true },

  { designation: 'Usines', categorie: 'II. Constructions',
    compteOHADA: '2311', intituleCompte: 'Bâtiments industriels (sol propre)',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: false, raisonNonDegressif: 'Bâtiments non listés à l\'Art. 31 Loi IS',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Maisons d\'habitation', categorie: 'II. Constructions',
    compteOHADA: '2314', intituleCompte: 'Bâtiments affectés au logement du personnel',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: false, raisonNonDegressif: 'Bâtiments non listés à l\'Art. 31 Loi IS',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Fours à chaux et à plâtre', categorie: 'II. Constructions',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true,
    eligibleExceptionnel: true },

  { designation: 'Fours électriques', categorie: 'II. Constructions',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true,
    eligibleExceptionnel: true },

  { designation: 'Bâtiments démontables ou provisoires', categorie: 'II. Constructions',
    compteOHADA: '2313', intituleCompte: 'Bâtiments administratifs et commerciaux (sol propre)',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: false, raisonNonDegressif: 'Bâtiments non listés à l\'Art. 31 Loi IS',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Autoroutes, ponts et échangeurs', categorie: 'II. Constructions',
    compteOHADA: '2331', intituleCompte: 'Voies de terre',
    duree: 40, tauxLineaire: 2.5,
    eligibleDegressif: false, raisonNonDegressif: 'Durée > 20 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Dépenses grosses réparations autoroutes', categorie: 'II. Constructions',
    compteOHADA: '2331', intituleCompte: 'Voies de terre',
    duree: 8, tauxLineaire: 12.5,
    eligibleDegressif: true,
    eligibleExceptionnel: true },

  { designation: 'Quais portuaires', categorie: 'II. Constructions',
    compteOHADA: '2338', intituleCompte: "Autres ouvrages d'infrastructure",
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true,
    eligibleExceptionnel: true },

  { designation: 'Pistes pour avions', categorie: 'II. Constructions',
    compteOHADA: '2335', intituleCompte: "Pistes d'aérodrome",
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true,
    eligibleExceptionnel: true },

  { designation: 'Voies ferrées (infrastructure)', categorie: 'II. Constructions',
    compteOHADA: '2332', intituleCompte: 'Voies de fer',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true,
    eligibleExceptionnel: true },

  { designation: 'Signalisations voies ferrées', categorie: 'II. Constructions',
    compteOHADA: '2345', intituleCompte: 'Aménagements et agencements des bâtiments',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true,
    eligibleExceptionnel: true },

  { designation: 'Parkings non couverts', categorie: 'II. Constructions',
    compteOHADA: '2345', intituleCompte: 'Aménagements et agencements des bâtiments',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: false, raisonNonDegressif: 'Constructions non listées à l\'Art. 31 Loi IS',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Courts de tennis', categorie: 'II. Constructions',
    compteOHADA: '2345', intituleCompte: 'Aménagements et agencements des bâtiments',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: false, raisonNonDegressif: 'Constructions non listées à l\'Art. 31 Loi IS',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Piscines', categorie: 'II. Constructions',
    compteOHADA: '2345', intituleCompte: 'Aménagements et agencements des bâtiments',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: false, raisonNonDegressif: 'Constructions non listées à l\'Art. 31 Loi IS',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Dépenses grosses réparations parkings, courts, piscines', categorie: 'II. Constructions',
    compteOHADA: '2345', intituleCompte: 'Aménagements et agencements des bâtiments',
    duree: 4, tauxLineaire: 25,
    eligibleDegressif: false, raisonNonDegressif: 'Constructions non listées à l\'Art. 31 Loi IS',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  // ── III. MACHINES, MATÉRIELS, ÉQUIPEMENTS ────────────────────────────────────
  // 241 = Matériels et outillages industriels (fabrication, transformation, extraction)
  // 247 = Agencements et installations divers (chauffage, sécurité, sanitaires fixes)

  { designation: 'Chaudières à vapeur', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Cuves à ciment', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Machines à papier et à carton', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Presses hydrauliques', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Presses, compresseurs', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Réservoirs à pétrole', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2412', intituleCompte: 'Outillage industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Transformateurs lourds de forte puissance', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Turbines et machines à vapeur', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Pétrins mécaniques, malaxeurs', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Excavateurs', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Foudres, cuves brasseries et distillation', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Appareils d\'épuration et de triage', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Appareils de laminage et d\'essorage', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Machines-outils légères, tours, mortaiseuses', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Raboteuses, perceuses', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2412', intituleCompte: 'Outillage industriel',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Lignes de transport d\'énergie électrique', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2341', intituleCompte: 'Installations complexes spécialisées (sol propre)',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Appareils à découper le bois', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Matériels d\'usines (machines-outils inclus)', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Marteaux pneumatiques', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2412', intituleCompte: 'Outillage industriel',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Perforatrices', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2412', intituleCompte: 'Outillage industriel',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Matériels d\'usine fixes', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 3, tauxLineaire: 33.33,
    eligibleDegressif: false, raisonNonDegressif: 'Durée < 4 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Dépenses grosses réparations machines', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 4, tauxLineaire: 25,
    eligibleDegressif: true, eligibleExceptionnel: true },

  // Installations productrices de chaleur/froid → Art. 31 al. 3 = éligible dégressif
  { designation: 'Machines et équipements de chauffage et frigorifiques', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2471', intituleCompte: 'Agencements et aménagements du matériel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  // Ascenseurs → manutention/levage (Art. 31 al. 2) = éligible dégressif
  { designation: 'Ascenseurs, monte-charges, escaliers mécaniques', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2471', intituleCompte: 'Agencements et aménagements du matériel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  // Installations de stockage → Art. 31 al. 8 = éligible dégressif
  { designation: 'Silos et bacs de stockage', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2488', intituleCompte: 'Divers matériels mobiliers',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Dépenses grosses réparations chauffage/ascenseurs', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2471', intituleCompte: 'Agencements et aménagements du matériel',
    duree: 4, tauxLineaire: 25,
    eligibleDegressif: true, eligibleExceptionnel: true },

  // Rayonnages → stockage (Art. 31 al. 8)
  { designation: 'Rayonnages métalliques', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2488', intituleCompte: 'Divers matériels mobiliers',
    duree: 7, tauxLineaire: 14.28,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Citernes et fûts (stockage)', categorie: 'III. Machines, matériels, équipements',
    compteOHADA: '2488', intituleCompte: 'Divers matériels mobiliers',
    duree: 7, tauxLineaire: 14.28,
    eligibleDegressif: true, eligibleExceptionnel: true },

  // ── IV. MATÉRIEL TP & BÂTIMENT ───────────────────────────────────────────────
  // Engins TP = matériels industriels d'extraction/transport → Art. 31 al. 1

  { designation: 'Gros engins TP (bulldozers, scrapers, bétonneuses, foreuses)', categorie: 'IV. Matériel TP & Bâtiment',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Petits engins TP (camion goudronneur…)', categorie: 'IV. Matériel TP & Bâtiment',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  // Engins de transport TP → 243 Matériels de transport (usage professionnel transport)
  { designation: 'Engins de transport (TP)', categorie: 'IV. Matériel TP & Bâtiment',
    compteOHADA: '2451', intituleCompte: 'Matériel automobile',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Bétonnières auto-tractées ou mobiles', categorie: 'IV. Matériel TP & Bâtiment',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Poste de soudure fixe', categorie: 'IV. Matériel TP & Bâtiment',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Poste de soudure mobile', categorie: 'IV. Matériel TP & Bâtiment',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Dépenses grosses réparations TP', categorie: 'IV. Matériel TP & Bâtiment',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 3, tauxLineaire: 33.33,
    eligibleDegressif: false, raisonNonDegressif: 'Durée < 4 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  // Équipements production/distribution électricité → installations productrices d'énergie (Art. 31 al. 3)
  { designation: 'Équipements production/transport/distribution électricité', categorie: 'IV. Matériel TP & Bâtiment',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Dépenses grosses réparations électricité/gaz', categorie: 'IV. Matériel TP & Bâtiment',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 3, tauxLineaire: 33.33,
    eligibleDegressif: false, raisonNonDegressif: 'Durée < 4 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Grosses grues', categorie: 'IV. Matériel TP & Bâtiment',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  // ── V. MATÉRIELS ET MOYENS DE TRANSPORT ─────────────────────────────────────
  // 243 = Matériels de transport

  { designation: 'Wagons et locomotives', categorie: 'V. Moyens de transport',
    compteOHADA: '2452', intituleCompte: 'Matériel ferroviaire',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Wagons transport marchandises', categorie: 'V. Moyens de transport',
    compteOHADA: '2452', intituleCompte: 'Matériel ferroviaire',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Wagons techniques', categorie: 'V. Moyens de transport',
    compteOHADA: '2452', intituleCompte: 'Matériel ferroviaire',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Dépenses grosses réparations voies ferrées', categorie: 'V. Moyens de transport',
    compteOHADA: '2452', intituleCompte: 'Matériel ferroviaire',
    duree: 3, tauxLineaire: 33.33,
    eligibleDegressif: false, raisonNonDegressif: 'Durée < 4 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Voies de chemin de fer', categorie: 'V. Moyens de transport',
    compteOHADA: '2332', intituleCompte: 'Voies de fer',
    duree: 50, tauxLineaire: 2,
    eligibleDegressif: false, raisonNonDegressif: 'Durée > 20 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  // Véhicules élévateurs → manutention/levage (Art. 31 al. 2) = éligible dégressif
  { designation: 'Véhicules élévateurs (chariots élévateurs)', categorie: 'V. Moyens de transport',
    compteOHADA: '2451', intituleCompte: 'Matériel automobile',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Aéronefs et appareils navals', categorie: 'V. Moyens de transport',
    compteOHADA: '2455', intituleCompte: 'Matériel aérien',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Parties fixes avions et moteurs d\'avions', categorie: 'V. Moyens de transport',
    compteOHADA: '2455', intituleCompte: 'Matériel aérien',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Dépenses grosses réparations avions', categorie: 'V. Moyens de transport',
    compteOHADA: '2455', intituleCompte: 'Matériel aérien',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Dépenses grosses réparations moteurs d\'avions', categorie: 'V. Moyens de transport',
    compteOHADA: '2455', intituleCompte: 'Matériel aérien',
    duree: 3, tauxLineaire: 33.33,
    eligibleDegressif: false, raisonNonDegressif: 'Durée < 4 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Fûts de transport (bière et vin)', categorie: 'V. Moyens de transport',
    compteOHADA: '2488', intituleCompte: 'Divers matériels mobiliers',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Fûts de transport métalliques', categorie: 'V. Moyens de transport',
    compteOHADA: '2488', intituleCompte: 'Divers matériels mobiliers',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Containers', categorie: 'V. Moyens de transport',
    compteOHADA: '2458', intituleCompte: 'Autres matériels de transport',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  // Véhicules de tourisme → EXCLUS dégressif (Art. 31 al. 1 "à l'exclusion des véhicules de tourisme")
  { designation: 'Véhicules automobiles de tourisme', categorie: 'V. Moyens de transport',
    compteOHADA: '2451', intituleCompte: 'Matériel automobile',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: false, raisonNonDegressif: 'Véhicules de tourisme exclus (Art. 31 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Véhicules automobiles utilitaires légers', categorie: 'V. Moyens de transport',
    compteOHADA: '2451', intituleCompte: 'Matériel automobile',
    duree: 3, tauxLineaire: 33.33,
    eligibleDegressif: false, raisonNonDegressif: 'Durée < 4 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Véhicules automobiles transport marchandises', categorie: 'V. Moyens de transport',
    compteOHADA: '2451', intituleCompte: 'Matériel automobile',
    duree: 3, tauxLineaire: 33.33,
    eligibleDegressif: false, raisonNonDegressif: 'Durée < 4 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Matériels automobiles transport en commun', categorie: 'V. Moyens de transport',
    compteOHADA: '2451', intituleCompte: 'Matériel automobile',
    duree: 3, tauxLineaire: 33.33,
    eligibleDegressif: false, raisonNonDegressif: 'Durée < 4 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Tracteurs (transport)', categorie: 'V. Moyens de transport',
    compteOHADA: '2451', intituleCompte: 'Matériel automobile',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Charrettes', categorie: 'V. Moyens de transport',
    compteOHADA: '2457', intituleCompte: 'Matériel hippomobile',
    duree: 4, tauxLineaire: 25,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Tracteurs forestiers', categorie: 'V. Moyens de transport',
    compteOHADA: '2451', intituleCompte: 'Matériel automobile',
    duree: 4, tauxLineaire: 25,
    eligibleDegressif: true, eligibleExceptionnel: true },

  // ── VI. MOBILIER, AGENCEMENT, INSTALLATION ───────────────────────────────────
  // 245 = Mobilier (meubles et objets mobiliers)
  // 244 = Matériels de bureau (machines à écrire, calculatrices, etc.)
  // 246 = Matériels informatiques (ordinateurs, serveurs)
  // 247 = Agencements et installations divers
  // 232 = Agencements sur constructions de tiers (immeubles loués)

  { designation: 'Agencements, aménagements, installations (sur immeubles propres)', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '23451', intituleCompte: 'Aménagements et agencements des bâtiments : sol propre',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Agencements, aménagements sur constructions de tiers (immeubles loués)', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '23452', intituleCompte: 'Aménagements et agencements des bâtiments : sol d\'autrui',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  // Mobiliers de bureau → Art. 31 al. 6 : EXCLUS dégressif ("à l'exclusion du mobilier de bureau")
  { designation: 'Mobiliers de bureau', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2444', intituleCompte: 'Mobilier de bureau',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: false, raisonNonDegressif: 'Mobilier de bureau exclu (Art. 31 al. 6 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Meubles meublants (lits, chaises, tables, armoires)', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2444', intituleCompte: 'Mobilier de bureau',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: false, raisonNonDegressif: 'Mobilier de bureau exclu (Art. 31 al. 6 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  // Matériels de bureau → Art. 31 al. 6 : "machines de bureau" éligibles dégressif
  // Mais "autre matériel de bureau" = EXCLU. Matériel de bureau ≠ machine de bureau.
  { designation: 'Matériels de bureau (calculatrices, machines à écrire)', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2441', intituleCompte: 'Matériel de bureau',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: false, raisonNonDegressif: 'Autre matériel de bureau exclu (Art. 31 al. 6 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Matériels de campements', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2488', intituleCompte: 'Divers matériels mobiliers',
    duree: 2, tauxLineaire: 50,
    eligibleDegressif: false, raisonNonDegressif: 'Durée < 4 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Coffres forts et armoires blindées', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2488', intituleCompte: 'Divers matériels mobiliers',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: false, raisonNonDegressif: 'Non listé à l\'Art. 31 Loi IS',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  // Machines informatiques = machines de bureau (Art. 31 al. 6) = éligibles dégressif
  { designation: 'Machines informatiques, serveurs', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2442', intituleCompte: 'Matériel informatique',
    duree: 4, tauxLineaire: 25,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Matériels de reprographie (imprimantes, photocopieurs)', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2443', intituleCompte: 'Matériel bureautique',
    duree: 3, tauxLineaire: 33.33,
    eligibleDegressif: false, raisonNonDegressif: 'Durée < 4 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Extincteurs', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2471', intituleCompte: 'Agencements et aménagements du matériel',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  // Installations téléphoniques → installations de sécurité/communication (Art. 31 al. 4)
  { designation: 'Installations téléphoniques', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2471', intituleCompte: 'Agencements et aménagements du matériel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  // Équipements sanitaires fixes → installations médico-sociales (Art. 31 al. 5)
  { designation: 'Équipements sanitaires fixes', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2471', intituleCompte: 'Agencements et aménagements du matériel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Équipements sanitaires mobiles', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2488', intituleCompte: 'Divers matériels mobiliers',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Bâches et protections souples', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2488', intituleCompte: 'Divers matériels mobiliers',
    duree: 3, tauxLineaire: 33.33,
    eligibleDegressif: false, raisonNonDegressif: 'Durée < 4 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Panneaux publicitaires et enseignes fixes', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2471', intituleCompte: 'Agencements et aménagements du matériel',
    duree: 3, tauxLineaire: 33.33,
    eligibleDegressif: false, raisonNonDegressif: 'Durée < 4 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Tondeuses à gazon à moteur', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2488', intituleCompte: 'Divers matériels mobiliers',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: false, raisonNonDegressif: 'Non listé à l\'Art. 31 Loi IS',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  // Climatisation centrale → installations productrices de froid (Art. 31 al. 3)
  { designation: 'Climatisation centrale', categorie: 'VI. Mobilier & Agencements',
    compteOHADA: '2471', intituleCompte: 'Agencements et aménagements du matériel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  // ── VII. ÉLECTROMÉNAGER ───────────────────────────────────────────────────────
  // 248 = Autres matériels et outillages

  { designation: 'Climatiseurs, ventilateurs fixes', categorie: 'VII. Électroménager',
    compteOHADA: '2488', intituleCompte: 'Divers matériels mobiliers',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: false, raisonNonDegressif: 'Électroménager non listé à l\'Art. 31 Loi IS',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Ventilateurs mobiles, humidificateurs', categorie: 'VII. Électroménager',
    compteOHADA: '2488', intituleCompte: 'Divers matériels mobiliers',
    duree: 2, tauxLineaire: 50,
    eligibleDegressif: false, raisonNonDegressif: 'Durée < 4 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Horloges pointeuses et assimilées', categorie: 'VII. Électroménager',
    compteOHADA: '2441', intituleCompte: 'Matériel de bureau',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: false, raisonNonDegressif: 'Autre matériel de bureau exclu (Art. 31 al. 6 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  // ── VIII. HÔTELS ET RESTAURATION ─────────────────────────────────────────────
  // Art. 31 al. 9 : "Immeubles et matériels des entreprises hôtelières, à l'exclusion
  // des entreprises exerçant uniquement l'activité de restaurateur ou de cafetier"
  // → hôtels éligibles dégressif, restaurateurs/cafetiers NON

  { designation: 'Matériels de cuisine professionnelle (hôtels)', categorie: 'VIII. Hôtels & Restauration',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Mobilier hôtelier (lits, tables, chaises)', categorie: 'VIII. Hôtels & Restauration',
    compteOHADA: '2444', intituleCompte: 'Mobilier de bureau',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Équipements de bar et restauration (hôtels)', categorie: 'VIII. Hôtels & Restauration',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Réfrigérateurs et congélateurs professionnels (hôtels)', categorie: 'VIII. Hôtels & Restauration',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Matériels de blanchisserie (hôtels)', categorie: 'VIII. Hôtels & Restauration',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Matériels de cuisine professionnelle (restaurateurs/cafetiers)', categorie: 'VIII. Hôtels & Restauration',
    compteOHADA: '2411', intituleCompte: 'Matériel industriel',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: false, raisonNonDegressif: 'Restaurateurs/cafetiers exclus (Art. 31 al. 9 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  { designation: 'Matériels audiovisuels (hôtels)', categorie: 'VIII. Hôtels & Restauration',
    compteOHADA: '2488', intituleCompte: 'Divers matériels mobiliers',
    duree: 3, tauxLineaire: 33.33,
    eligibleDegressif: false, raisonNonDegressif: 'Durée < 4 ans (Art. 32 al. 1 Loi IS)',
    eligibleExceptionnel: false, raisonNonExceptionnel: 'Non éligible dégressif donc non éligible exceptionnel (Art. 37)' },

  // ── IX. MATÉRIELS AGRICOLES, PÊCHE, CHASSE ────────────────────────────────────
  // Art. 31 al. 10 : "machines agricoles et installations d'élevage, à l'exception des bâtiments et terrains"
  // 242 = Matériels et outillages agricoles

  { designation: 'Tracteurs agricoles', categorie: 'IX. Matériels agricoles',
    compteOHADA: '2421', intituleCompte: 'Matériel agricole',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Moissonneuses-batteuses', categorie: 'IX. Matériels agricoles',
    compteOHADA: '2421', intituleCompte: 'Matériel agricole',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Matériels d\'irrigation', categorie: 'IX. Matériels agricoles',
    compteOHADA: '2421', intituleCompte: 'Matériel agricole',
    duree: 10, tauxLineaire: 10,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Plantations et cultures pérennes', categorie: 'IX. Matériels agricoles',
    compteOHADA: '2465', intituleCompte: 'Plantations agricoles',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Matériels de pêche', categorie: 'IX. Matériels agricoles',
    compteOHADA: '2422', intituleCompte: 'Outillage agricole',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Matériels de chasse', categorie: 'IX. Matériels agricoles',
    compteOHADA: '2422', intituleCompte: 'Outillage agricole',
    duree: 5, tauxLineaire: 20,
    eligibleDegressif: true, eligibleExceptionnel: true },

  { designation: 'Silos agricoles', categorie: 'IX. Matériels agricoles',
    compteOHADA: '2421', intituleCompte: 'Matériel agricole',
    duree: 20, tauxLineaire: 5,
    eligibleDegressif: true, eligibleExceptionnel: true },
]

const CATEGORIES = [
  'I. Éléments incorporels',
  'II. Constructions',
  'III. Machines, matériels, équipements',
  'IV. Matériel TP & Bâtiment',
  'V. Moyens de transport',
  'VI. Mobilier & Agencements',
  'VII. Électroménager',
  'VIII. Hôtels & Restauration',
  'IX. Matériels agricoles',
]

// ─── Calcul amortissement ──────────────────────────────────────────────────────
interface LigneAmort {
  exercice: number
  valeurDebut: number    // base amortissable (linéaire) ou VNC initiale (dégressif/exceptionnel)
  valeurOrigine?: number // valeur d'origine fixe (dégressif/exceptionnel uniquement)
  taux: number
  annuite: number
  annuiteLineaireResid?: number  // annuité linéaire résiduelle = VNC ÷ années restantes (dégressif/exceptionnel)
  amortCumule: number
  valeurResiduelle: number
  calcul: string
  bascule?: boolean
}

// Art. 33 Loi IS : coefficients officiels
function getCoeffDegressif(duree: number): number {
  if (duree < 4) return 0       // exclu
  if (duree <= 4) return 1.5    // 3 à 4 ans → 1,5
  if (duree <= 6) return 2      // 5 à 6 ans → 2
  return 2.5                    // > 6 ans → 2,5
}

// Compte d'amortissement correspondant (OHADA 2017 : comptes à 4 chiffres)
// Source : Plan Comptable OHADA 2017 : Classe 28
function getCompteAmort(compteImmo: string): string {
  const map: Record<string, string> = {
    // ─ Incorporels → 281x
    '2121': '2812',  // Brevets → Amort. brevets, licences, concessions
    '2122': '2812',  // Licences → Amort. brevets, licences, concessions
    '2123': '2812',  // Concessions → idem
    '2128': '2812',  // Autres concessions → idem
    '2131': '2813',  // Logiciels → Amort. logiciels et sites internet
    '2132': '2813',  // Sites internet → idem
    '2140': '2814',  // Marques → Amort. marques
    '2150': '2815',  // Fonds commercial → Amort. fonds commercial
    '2160': '2816',  // Droit au bail → Amort. droit au bail
    '2181': '2818',  // Prospection ressources → Amort. autres droits incorporels
    // ─ Terrains → non amortissables (sauf travaux de mise en valeur)
    '2221': '—',     // Terrains agricoles → non amortissable
    '2222': '—',     // Terrains nus → non amortissable
    '2223': '—',     // Terrains bâtis → non amortissable
    '2224': '2824',  // Travaux mise en valeur terrains → Amort. travaux mise en valeur
    '2225': '—',     // Terrains de gisement → non amortissable
    '2261': '—',     // Terrains aménagés → non amortissable (terrains nus aménagés)
    // ─ Bâtiments, installations (sol propre) → 2831
    '2311': '2831',  // Bât. industriels sol propre → Amort. bât. industriels/agricoles/admin sol propre
    '2312': '2831',  // Bât. agricoles sol propre → idem
    '2313': '2831',  // Bât. admin/commerciaux sol propre → idem
    '2314': '2831',  // Bât. logement personnel → idem
    // ─ Bâtiments sur sol d'autrui → 2832
    '2321': '2832',  // Bât. industriels sol d'autrui → Amort. bât. sol d'autrui
    '2322': '2832',  // Bât. agricoles sol d'autrui → idem
    '2323': '2832',  // Bât. admin/commerciaux sol d'autrui → idem
    // ─ Ouvrages d'infrastructure → 2833
    '2331': '2833',  // Voies de terre → Amort. ouvrages d'infrastructure
    '2332': '2833',  // Voies de fer → idem
    '2333': '2833',  // Voies d'eau → idem
    '2334': '2833',  // Barrages, Digues → idem
    '2335': '2833',  // Pistes aérodrome → idem
    '2338': '2833',  // Autres ouvrages → idem
    // ─ Installations complexes, agencements, aménagements → 2834 / 2835
    '2341': '2834',  // Installations complexes sol propre → Amort. aménagements et installations techniques
    '2342': '2834',  // Installations complexes sol d'autrui → idem
    '2343': '2834',  // Installations spécifiques sol propre → idem
    '2344': '2834',  // Installations spécifiques sol d'autrui → idem
    '2345': '2834',  // Aménagements et agencements bâtiments → idem (parkings, courts, piscines inclus)
    '23451': '2834', // Aménagements sol propre → idem
    '23452': '2834', // Aménagements sol d'autrui → idem
    '2351': '2835',  // Aménagements de bureaux → Amort. aménagements de bureaux
    '2358': '2835',  // Autres aménagements bureaux → idem
    // ─ Matériel et outillage industriel/commercial → 2841
    '2411': '2841',  // Matériel industriel → Amort. matériel et outillage industriel et commercial
    '2412': '2841',  // Outillage industriel → idem
    '2413': '2841',  // Matériel commercial → idem
    '2414': '2841',  // Outillage commercial → idem
    // ─ Matériel et outillage agricole → 2842
    '2421': '2842',  // Matériel agricole → Amort. matériel et outillage agricole
    '2422': '2842',  // Outillage agricole → idem
    // ─ Matériel et mobilier → 2844
    '2441': '2844',  // Matériel de bureau → Amort. matériel et mobilier
    '2442': '2844',  // Matériel informatique → idem
    '2443': '2844',  // Matériel bureautique → idem
    '2444': '2844',  // Mobilier de bureau → idem
    // ─ Matériel de transport → 2845
    '2451': '2845',  // Matériel automobile → Amort. matériel de transport
    '2452': '2845',  // Matériel ferroviaire → idem
    '2453': '2845',  // Matériel fluvial/lagunaire → idem
    '2454': '2845',  // Matériel naval → idem
    '2455': '2845',  // Matériel aérien → idem
    '2457': '2845',  // Matériel hippomobile → idem
    '2458': '2845',  // Autres matériels de transport → idem
    // ─ Actifs biologiques / plantations → 2846
    '2461': '2846',  // Cheptel animaux de trait → Amort. actifs biologiques
    '2462': '2846',  // Cheptel animaux reproducteurs → idem
    '2465': '2846',  // Plantations agricoles → idem
    // ─ Agencements du matériel → 2847
    '2471': '2847',  // Agencements et aménagements du matériel → Amort. agencements matériel
    // ─ Autres matériels → 2848
    '2488': '2848',  // Divers matériels mobiliers → Amort. autres matériels
  }
  return map[compteImmo] || '2848'
}

function calculerLineaire(valeur: number, duree: number, moisDebut: number): LigneAmort[] {
  // Art. 30 Loi IS : prorata temporis dès le 1er jour du mois d'acquisition
  // Si moisDebut > 1 : N = prorata, N+1..N+durée-1 = annuités normales, N+durée = solde (report)
  const annuiteBase = valeur / duree
  const taux = Math.round((1 / duree) * 10000) / 100
  const lignes: LigneAmort[] = []
  let cumule = 0
  const moisN1 = 13 - moisDebut  // mois restants en N (ex: juillet → 6 mois)
  const avecProrata = moisDebut > 1

  // Nombre total de lignes = durée (acquisition 1er jan) ou durée + 1 (acquisition en cours d'année)
  const nbLignes = avecProrata ? duree + 1 : duree

  for (let i = 0; i < nbLignes; i++) {
    let annuite: number
    let calcul: string

    if (i === 0) {
      // Année N : prorata temporis
      const annuiteProrata = annuiteBase * (avecProrata ? moisN1 / 12 : 1)
      annuite = Math.round(annuiteProrata)
      calcul = avecProrata
        ? `${valeur.toLocaleString('fr-FR')} × ${taux}% × ${moisN1}/12`
        : `${valeur.toLocaleString('fr-FR')} × ${taux}%`
    } else if (avecProrata && i === nbLignes - 1) {
      // Dernière ligne (N+durée) : solde = complément du prorata initial
      annuite = Math.round(valeur - cumule)
      calcul = `Solde : ${valeur.toLocaleString('fr-FR')} - ${cumule.toLocaleString('fr-FR')}`
    } else {
      // Années intermédiaires : annuité normale complète
      annuite = Math.round(annuiteBase)
      calcul = `${valeur.toLocaleString('fr-FR')} × ${taux}%`
    }

    // En linéaire, la base amortissable est CONSTANTE = valeur d'origine (Art. 45 AUDCIF)
    cumule += annuite
    lignes.push({
      exercice: i + 1,
      valeurDebut: Math.round(valeur),  // base amortissable constante
      taux,
      annuite,
      amortCumule: cumule,
      valeurResiduelle: Math.max(0, Math.round(valeur - cumule)),
      calcul,
    })
  }
  return lignes
}

function calculerDegressif(valeur: number, duree: number, moisDebut: number): LigneAmort[] {
  const coeff = getCoeffDegressif(duree)
  const tauxLineaire = 1 / duree
  const tauxDegressif = tauxLineaire * coeff
  const lignes: LigneAmort[] = []
  let valResid = valeur
  let cumule = 0
  const moisN1 = 13 - moisDebut
  let basculeFaite = false        // flag : bascule déjà effectuée
  let baseLineaireFigee = 0       // VNC au moment de la bascule
  let annuiteLineaireFixe = 0     // annuité CONSTANTE après bascule = baseLineaireFigee ÷ anneesRestantesAuMomentBascule
  let anneesRestantesBascule = 0  // nombre d'années restantes au moment exact de la bascule

  for (let i = 0; i < duree; i++) {
    const anneeRestante = duree - i
    const annuiteLineaireRestante = valResid / anneeRestante
    const annuiteDeg = valResid * tauxDegressif * (i === 0 ? moisN1 / 12 : 1)
    const basculeIci = !basculeFaite && annuiteDeg < annuiteLineaireRestante && i > 0
    if (basculeIci) {
      basculeFaite = true
      baseLineaireFigee = Math.round(valResid)         // VNC figee au moment de la bascule
      anneesRestantesBascule = anneeRestante            // nb années restantes au moment de la bascule
      annuiteLineaireFixe = Math.round(baseLineaireFigee / anneesRestantesBascule)  // annuité CONSTANTE
    }
    // Après bascule : annuité = CONSTANTE (baseLineaireFigee ÷ anneesRestantesAuMomentBascule)
    const annuite = basculeFaite ? annuiteLineaireFixe : Math.round(annuiteDeg)
    const valDebut = basculeFaite ? baseLineaireFigee : Math.round(valResid)
    cumule += annuite
    const vnc = Math.max(0, Math.round(valResid) - annuite)
    // Annuité linéaire résiduelle visible dans le tableau pour comparaison
    const annuiteLinResid = Math.round(annuiteLineaireRestante)

    lignes.push({
      exercice: i + 1,
      valeurDebut: valDebut,
      valeurOrigine: valeur,
      taux: basculeFaite
        ? Math.round((1 / anneesRestantesBascule) * 10000) / 100
        : Math.round(tauxDegressif * 10000) / 100,
      annuite,
      annuiteLineaireResid: annuiteLinResid,
      amortCumule: cumule,
      valeurResiduelle: vnc,
      calcul: basculeIci
        ? `Bascule linéaire : ${baseLineaireFigee.toLocaleString('fr-FR')} ÷ ${anneesRestantesBascule}`
        : basculeFaite
          ? `${baseLineaireFigee.toLocaleString('fr-FR')} ÷ ${anneesRestantesBascule}`
          : i === 0
            ? `${Math.round(valResid).toLocaleString('fr-FR')} × ${(tauxDegressif * 100).toFixed(2)}% × ${moisN1}/12`
            : `${Math.round(valResid).toLocaleString('fr-FR')} × ${(tauxDegressif * 100).toFixed(2)}%`,
      bascule: basculeFaite,
    })
    valResid = Math.max(0, valResid - annuite)
  }

  // Prorata temporis : si acquisition en cours d'année, ajouter une ligne de solde (N+durée)
  if (moisDebut > 1 && Math.round(valResid) > 0) {
    const solde = Math.round(valResid)
    const valDebut = basculeFaite ? baseLineaireFigee : solde
    cumule += solde
    lignes.push({
      exercice: duree + 1,
      valeurDebut: valDebut,
      valeurOrigine: valeur,
      taux: basculeFaite ? 0 : Math.round(tauxDegressif * 10000) / 100,
      annuite: solde,
      amortCumule: cumule,
      valeurResiduelle: 0,
      calcul: `Solde prorata : ${solde.toLocaleString('fr-FR')}`,
      bascule: basculeFaite,
    })
  }
  return lignes
}

function calculerExceptionnel(valeur: number, duree: number, moisDebut: number): LigneAmort[] {
  const moisN1 = 13 - moisDebut
  const lignes: LigneAmort[] = []
  const annee1 = Math.round(valeur * 0.60 * (moisN1 / 12))
  let cumule = annee1
  lignes.push({
    exercice: 1,
    valeurDebut: valeur,
    valeurOrigine: valeur,
    taux: 60,
    annuite: annee1,
    annuiteLineaireResid: Math.round(valeur / duree),  // linéaire résiduel année 1
    amortCumule: annee1,
    valeurResiduelle: Math.max(0, valeur - annee1),
    calcul: `${valeur.toLocaleString('fr-FR')} × 60% × ${moisN1}/12`,
  })

  // Dégressif sur le résiduel (40%)
  const residuel = valeur - annee1
  if (residuel > 0 && duree > 1) {
    const degressifLignes = calculerDegressif(residuel, duree - 1, 1)
    for (const l of degressifLignes) {
      cumule += l.annuite
      lignes.push({
        ...l,
        exercice: l.exercice + 1,
        valeurOrigine: valeur,  // valeur d'origine du bien initial (fixe)
        amortCumule: cumule,
        valeurResiduelle: Math.max(0, valeur - cumule),
      })
    }
  }
  return lignes
}

// ─── Composant Bulle d'info ────────────────────────────────────────────────────
function InfoBulle({ texte, loi }: { texte: string; loi?: string }) {
  const [open, setOpen] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)
  const [pos, setPos] = useState<{ top: number; left: number }>({ top: 0, left: 0 })

  const handleOpen = () => {
    if (!btnRef.current) return
    const r = btnRef.current.getBoundingClientRect()
    const popW = 260
    const margin = 8
    let left = r.left
    if (left + popW > window.innerWidth - margin) left = window.innerWidth - popW - margin
    if (left < margin) left = margin
    const top = r.bottom + 6
    setPos({ top, left })
    setOpen(true)
  }

  return (
    <span className="relative inline-block align-middle ml-1">
      <button
        ref={btnRef}
        onClick={(e) => { e.stopPropagation(); open ? setOpen(false) : handleOpen() }}
        className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-700 transition-colors"
        type="button"
        aria-label="Définition"
      >
        ?
      </button>
      {open && createPortal(
        <div
          style={{ position: 'fixed', top: pos.top, left: pos.left, zIndex: 99999, width: 260 }}
          className="rounded-xl border border-emerald-200 bg-white shadow-2xl p-3 text-xs"
        >
          <p className="text-zinc-800 leading-relaxed">{texte}</p>
          {loi && <p className="mt-1.5 text-emerald-700 font-semibold">{loi}</p>}
          <button
            onClick={() => setOpen(false)}
            className="absolute top-1.5 right-2 text-zinc-400 hover:text-zinc-700 text-sm leading-none font-bold"
          >×</button>
        </div>,
        document.body
      )}
    </span>
  )
}

// ─── Formatage nombre (valeurs négatives entre parenthèses) ───────────────────
function fmt(n: number): string {
  if (n < 0) return `(${Math.abs(n).toLocaleString('fr-FR')})`
  return n.toLocaleString('fr-FR')
}

// ─── Composant principal ──────────────────────────────────────────────────────
// ─── Liste comptes OHADA pour autocomplete simulateur ──────────────────────────
// Source : CATALOGUE (dédupliqué, trié par numéro)
const COMPTES_OHADA_SIMULATEUR: { code: string; intitule: string }[] = [
  { code: '2121', intitule: 'Brevets' },
  { code: '2122', intitule: 'Licences' },
  { code: '2131', intitule: 'Logiciels' },
  { code: '2150', intitule: 'Fonds commercial' },
  { code: '2311', intitule: 'Bâtiments industriels (sol propre)' },
  { code: '2313', intitule: 'Bâtiments administratifs et commerciaux (sol propre)' },
  { code: '2314', intitule: 'Bâtiments affectés au logement du personnel' },
  { code: '2331', intitule: 'Voies de terre' },
  { code: '2332', intitule: 'Voies de fer' },
  { code: '2334', intitule: 'Barrages, Digues' },
  { code: '2335', intitule: "Pistes d'aérodrome" },
  { code: '2338', intitule: "Autres ouvrages d'infrastructure" },
  { code: '2341', intitule: 'Installations complexes spécialisées (sol propre)' },
  { code: '2345', intitule: 'Aménagements et agencements des bâtiments' },
  { code: '23451', intitule: 'Aménagements et agencements des bâtiments : sol propre' },
  { code: '23452', intitule: "Aménagements et agencements des bâtiments : sol d'autrui" },
  { code: '2411', intitule: 'Matériel industriel' },
  { code: '2412', intitule: 'Outillage industriel' },
  { code: '2421', intitule: 'Matériel agricole' },
  { code: '2422', intitule: 'Outillage agricole' },
  { code: '2441', intitule: 'Matériel de bureau' },
  { code: '2442', intitule: 'Matériel informatique' },
  { code: '2443', intitule: 'Matériel bureautique' },
  { code: '2444', intitule: 'Mobilier de bureau' },
  { code: '2451', intitule: 'Matériel automobile' },
  { code: '2452', intitule: 'Matériel ferroviaire' },
  { code: '2455', intitule: 'Matériel aérien' },
  { code: '2457', intitule: 'Matériel hippomobile' },
  { code: '2458', intitule: 'Autres matériels de transport' },
  { code: '2465', intitule: 'Plantations agricoles' },
  { code: '2471', intitule: 'Agencements et aménagements du matériel' },
  { code: '2488', intitule: 'Divers matériels mobiliers' },
]

export default function ImmobilisationsPage() {
  const [, navigate] = useHashLocation()
  const [onglet, setOnglet] = useState<'catalogue' | 'simulateur' | 'fiches'>('catalogue')

  // Catalogue
  const [recherche, setRecherche] = useState('')
  const [categorieFiltre, setCategorieFiltre] = useState('Toutes')

  // Simulateur
  const [formData, setFormData] = useState({
    designation: '',
    compteOHADA: '',
    intituleCompte: '',
    valeur: '',
    moisDebut: 1,
    mode: 'lineaire' as 'lineaire' | 'degressif' | 'exceptionnel',
    dureeCustom: '',
  })
  const [tableauGenere, setTableauGenere] = useState<LigneAmort[] | null>(null)
  const [immoPrechoisie, setImmoPrechoisie] = useState<Immobilisation | null>(null)
  const [erreur, setErreur] = useState('')
  // Autocomplete compte OHADA
  const [compteQuery, setCompteQuery] = useState('')
  const [showSuggestions, setShowSuggestions] = useState(false)
  const compteInputRef = useRef<HTMLInputElement>(null)

  // Catalogue filtré
  const catalogueFiltré = useMemo(() => {
    return CATALOGUE.filter(item => {
      const matchCat = categorieFiltre === 'Toutes' || item.categorie === categorieFiltre
      const matchRecherche = recherche === '' ||
        item.designation.toLowerCase().includes(recherche.toLowerCase()) ||
        item.compteOHADA.includes(recherche) ||
        item.intituleCompte.toLowerCase().includes(recherche.toLowerCase())
      return matchCat && matchRecherche
    })
  }, [recherche, categorieFiltre])

  function simulerDepuisCatalogue(immo: Immobilisation) {
    setImmoPrechoisie(immo)
    setFormData(f => ({
      ...f,
      designation: immo.designation,
      compteOHADA: immo.compteOHADA,
      intituleCompte: immo.intituleCompte,
      dureeCustom: immo.duree?.toString() || '',
      mode: 'lineaire',
    }))
    setCompteQuery(immo.compteOHADA)
    setTableauGenere(null)
    setErreur('')
    setOnglet('simulateur')
  }

  function genererTableau() {
    setErreur('')
    const valeur = parseFloat(formData.valeur.replace(/\s/g, '').replace(',', '.'))
    const duree = parseInt(formData.dureeCustom)
    const mois = formData.moisDebut

    if (isNaN(valeur) || valeur <= 0) { setErreur('Saisissez une valeur d\'origine valide.'); return }
    if (isNaN(duree) || duree < 1) { setErreur('Saisissez une durée valide.'); return }

    let lignes: LigneAmort[] = []
    if (formData.mode === 'lineaire') lignes = calculerLineaire(valeur, duree, mois)
    else if (formData.mode === 'degressif') lignes = calculerDegressif(valeur, duree, mois)
    else lignes = calculerExceptionnel(valeur, duree, mois)

    setTableauGenere(lignes)
  }

  const MOIS = ['Janvier','Février','Mars','Avril','Mai','Juin','Juillet','Août','Septembre','Octobre','Novembre','Décembre']

  // Éligibilité de l'immo sélectionnée pour les modes
  const immoDegressifOk = immoPrechoisie?.eligibleDegressif ?? true
  const immoExceptionnelOk = immoPrechoisie?.eligibleExceptionnel ?? true

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/95 backdrop-blur border-b border-border px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/comptabilite-generale')} className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-muted transition-colors">
          <ArrowLeft className="h-4 w-4 text-foreground" />
        </button>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-emerald-50 flex items-center justify-center">
            <Building2 className="h-4 w-4 text-emerald-600" />
          </div>
          <div>
            <h1 className="text-sm font-display font-bold text-foreground leading-tight">Immobilisations & Amortissements</h1>
            <p className="text-xs text-muted-foreground">AR n°088 · Loi IS Art. 28-38 · OHADA 2017</p>
          </div>
        </div>
      </div>

      {/* Onglets */}
      <div className="flex border-b border-border bg-background sticky top-[57px] z-20">
        {[
          { id: 'catalogue', label: 'Catalogue', icon: BookOpen },
          { id: 'simulateur', label: 'Simulateur', icon: Calculator },
          { id: 'fiches', label: 'Fiches', icon: FileText },
        ].map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => setOnglet(id as typeof onglet)}
            className={cn(
              'flex-1 flex items-center justify-center gap-1.5 py-3 text-xs font-semibold border-b-2 transition-all',
              onglet === id
                ? 'border-emerald-500 text-emerald-600'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon className="h-3.5 w-3.5" />
            {label}
          </button>
        ))}
      </div>

      <div className="px-4 pt-4 space-y-4">

        {/* ─── CATALOGUE ─────────────────────────────────────────────────────────── */}
        {onglet === 'catalogue' && (
          <div className="space-y-4">
            <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3">
              <p className="text-xs text-emerald-800 font-medium">
                Catalogue officiel : AR n°088 du 19/02/2025 (en vigueur au 01/01/2026). Éligibilité dégressif et exceptionnel selon Loi IS Art. 31-37. Comptes OHADA 2017.
              </p>
            </div>

            {/* Recherche */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Rechercher une immobilisation, un compte..." value={recherche} onChange={e => setRecherche(e.target.value)} className="pl-9 text-sm" />
            </div>

            {/* Filtre catégorie */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {['Toutes', ...CATEGORIES].map(cat => (
                <button key={cat} onClick={() => setCategorieFiltre(cat)}
                  className={cn('shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-all',
                    categorieFiltre === cat ? 'bg-emerald-500 text-white border-emerald-500' : 'bg-card text-muted-foreground border-border hover:border-emerald-300')}>
                  {cat === 'Toutes' ? 'Toutes' : cat.split('.')[0] + '.'}
                </button>
              ))}
            </div>

            <p className="text-xs text-muted-foreground">{catalogueFiltré.length} immobilisation{catalogueFiltré.length !== 1 ? 's' : ''} trouvée{catalogueFiltré.length !== 1 ? 's' : ''}</p>

            <div className="space-y-3">
              {CATEGORIES.filter(cat => categorieFiltre === 'Toutes' || cat === categorieFiltre).map(cat => {
                const items = catalogueFiltré.filter(i => i.categorie === cat)
                if (items.length === 0) return null
                return (
                  <div key={cat}>
                    <div className="flex items-center gap-2 mb-2">
                      <div className="h-5 w-5 rounded bg-emerald-100 flex items-center justify-center">
                        <Building2 className="h-3 w-3 text-emerald-600" />
                      </div>
                      <h3 className="text-xs font-bold text-foreground">{cat}</h3>
                      <span className="text-xs text-muted-foreground">({items.length})</span>
                    </div>
                    <div className="space-y-1.5">
                      {items.map((item, idx) => (
                        <div key={idx} className="rounded-xl border border-border bg-card p-3">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1 min-w-0">
                              <p className="text-xs font-semibold text-foreground">{item.designation}</p>
                              <div className="flex items-center gap-1 mt-0.5">
                                <span className="text-xs font-mono bg-muted px-1.5 py-0.5 rounded text-emerald-700 font-bold">{item.compteOHADA}</span>
                                <span className="text-xs text-muted-foreground truncate">{item.intituleCompte}</span>
                              </div>
                            </div>
                            <div className="flex flex-col items-end gap-1 shrink-0">
                              <span className="text-xs font-bold text-foreground">{item.tauxLineaire !== null ? item.tauxLineaire + '%' : '—'}</span>
                              <span className="text-xs text-muted-foreground">{item.duree !== null ? item.duree + ' an' + (item.duree > 1 ? 's' : '') : '—'}</span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-2">
                            <div className="flex gap-1.5 flex-wrap">
                              {/* Badge dégressif */}
                              <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1',
                                item.eligibleDegressif
                                  ? 'bg-blue-50 text-blue-700'
                                  : 'bg-muted text-muted-foreground')}>
                                {!item.eligibleDegressif && <Lock className="h-2.5 w-2.5" />}
                                Dégressif {item.eligibleDegressif && item.duree ? `(×${getCoeffDegressif(item.duree)})` : ''}
                              </span>
                              {/* Badge exceptionnel */}
                              <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium flex items-center gap-1',
                                item.eligibleExceptionnel
                                  ? 'bg-purple-50 text-purple-700'
                                  : 'bg-muted text-muted-foreground')}>
                                {!item.eligibleExceptionnel && <Lock className="h-2.5 w-2.5" />}
                                Exceptionnel
                              </span>
                            </div>
                            <button onClick={() => simulerDepuisCatalogue(item)}
                              className="text-xs px-3 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-semibold hover:bg-emerald-100 transition-colors flex items-center gap-1">
                              <Calculator className="h-3 w-3" />
                              Simuler
                            </button>
                          </div>

                          {/* Raison non éligibilité */}
                          {(!item.eligibleDegressif && item.raisonNonDegressif) && (
                            <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                              <AlertCircle className="h-3 w-3 shrink-0 text-amber-500" />
                              {item.raisonNonDegressif}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {/* ─── SIMULATEUR ────────────────────────────────────────────────────────── */}
        {onglet === 'simulateur' && (
          <div className="space-y-4">
            {immoPrechoisie && (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-3 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                <p className="text-xs text-emerald-800 flex-1">
                  Pré-rempli depuis le catalogue : <strong>{immoPrechoisie.designation}</strong>
                </p>
                <button onClick={() => { setImmoPrechoisie(null); setFormData(f => ({ ...f, designation: '', compteOHADA: '', intituleCompte: '', dureeCustom: '' })); setCompteQuery(''); setTableauGenere(null) }}
                  className="text-muted-foreground hover:text-foreground text-sm shrink-0">×</button>
              </div>
            )}

            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <h3 className="text-sm font-bold text-foreground">Paramètres</h3>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Désignation</label>
                <Input value={formData.designation} onChange={e => setFormData(f => ({ ...f, designation: e.target.value }))} placeholder="Ex : Véhicule de tourisme" className="text-sm" />
              </div>

              {/* ── Compte OHADA : autocomplete ── */}
              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">
                  Compte OHADA
                  {immoPrechoisie && <span className="ml-1 text-xs text-amber-600 font-semibold">(verrouillé)</span>}
                </label>
                {immoPrechoisie ? (
                  /* Verrouillé depuis catalogue */
                  <div className="flex items-center gap-2">
                    <div className="flex-shrink-0 px-2 py-1.5 rounded-md border border-border bg-muted text-xs font-mono font-bold text-emerald-700">
                      {formData.compteOHADA}
                    </div>
                    <div className="flex-1 px-3 py-1.5 rounded-md border border-border bg-muted text-xs text-muted-foreground truncate">
                      {formData.intituleCompte}
                    </div>
                  </div>
                ) : (
                  /* Autocomplete libre */
                  <div className="relative">
                    <div className="flex items-center gap-2 rounded-md border border-input bg-background px-3 py-1.5 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-0">
                      <input
                        ref={compteInputRef}
                        type="text"
                        value={compteQuery}
                        onChange={e => {
                          const v = e.target.value
                          setCompteQuery(v)
                          setShowSuggestions(true)
                          // Si on efface, réinitialise aussi le formData
                          if (!v) setFormData(f => ({ ...f, compteOHADA: '', intituleCompte: '' }))
                        }}
                        onFocus={() => setShowSuggestions(true)}
                        onBlur={() => setTimeout(() => setShowSuggestions(false), 180)}
                        placeholder="Tapez un numéro ou un libellé…"
                        className="flex-1 text-xs font-mono bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
                      />
                      {formData.intituleCompte && (
                        <span className="text-xs text-muted-foreground truncate max-w-[130px]">{formData.intituleCompte}</span>
                      )}
                    </div>
                    {showSuggestions && compteQuery.length >= 1 && (() => {
                      const q = compteQuery.toLowerCase()
                      const filtered = COMPTES_OHADA_SIMULATEUR.filter(c =>
                        c.code.startsWith(compteQuery) ||
                        c.code.includes(compteQuery) ||
                        c.intitule.toLowerCase().includes(q)
                      ).slice(0, 8)
                      if (filtered.length === 0) return null
                      return (
                        <div className="absolute z-50 left-0 right-0 top-full mt-1 rounded-xl border border-border bg-background shadow-lg overflow-hidden">
                          {filtered.map(c => (
                            <button
                              key={c.code}
                              type="button"
                              onMouseDown={e => e.preventDefault()}
                              onClick={() => {
                                setFormData(f => ({ ...f, compteOHADA: c.code, intituleCompte: c.intitule }))
                                setCompteQuery(c.code)
                                setShowSuggestions(false)
                              }}
                              className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-muted transition-colors"
                            >
                              <span className="text-xs font-mono font-bold text-emerald-700 w-14 shrink-0">{c.code}</span>
                              <span className="text-xs text-foreground truncate">{c.intitule}</span>
                            </button>
                          ))}
                        </div>
                      )
                    })()}
                  </div>
                )}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-muted-foreground">Valeur d'origine (Fc)</label>
                <Input value={formData.valeur} onChange={e => setFormData(f => ({ ...f, valeur: e.target.value }))} placeholder="Ex : 10000000" className="text-sm" type="number" />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">
                    Durée (ans)
                    <InfoBulle texte="Durée fiscale issue de l'AR n°088. Modifiable si nécessaire." loi="AR n°088 du 19/02/2025" />
                  </label>
                  <Input
                    value={formData.dureeCustom}
                    onChange={e => setFormData(f => ({ ...f, dureeCustom: e.target.value }))}
                    placeholder="Ex : 5"
                    className="text-sm"
                    type="number"
                    min={1}
                    disabled={!!immoPrechoisie}
                    readOnly={!!immoPrechoisie}
                  />
                  {immoPrechoisie && (
                    <p className="text-xs text-amber-600">Durée fiscale verrouillée (AR n°088)</p>
                  )}
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-muted-foreground">Mois de mise en service</label>
                  <select value={formData.moisDebut} onChange={e => setFormData(f => ({ ...f, moisDebut: parseInt(e.target.value) }))}
                    className="w-full h-9 rounded-md border border-input bg-background px-3 text-xs text-foreground">
                    {MOIS.map((m, i) => <option key={i} value={i + 1}>{m}</option>)}
                  </select>
                </div>
              </div>

              {/* Mode d'amortissement : bloqué si non éligible */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground">
                  Mode d'amortissement
                  <InfoBulle texte="Linéaire : droit commun (Art. 30). Dégressif : taux majoré sur VNC initiale, bascule linéaire si annuité < VNC ÷ années restantes (Art. 31-35). Exceptionnel : régime dérogatoire : 60% année 1, dégressif sur les 40% résiduels, réservé aux industriels exportateurs ≥20% CA (Art. 36-38)." loi="Loi IS Art. 30-38" />
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {/* Linéaire : toujours disponible */}
                  <button onClick={() => setFormData(f => ({ ...f, mode: 'lineaire' }))}
                    className={cn('p-3 rounded-xl border text-center transition-all',
                      formData.mode === 'lineaire' ? 'border-emerald-500 bg-emerald-50' : 'border-border bg-card hover:border-emerald-300')}>
                    <p className={cn('text-xs font-bold', formData.mode === 'lineaire' ? 'text-emerald-700' : 'text-foreground')}>Linéaire</p>
                    <p className="text-xs text-muted-foreground">Art. 30</p>
                  </button>

                  {/* Dégressif : bloqué si non éligible */}
                  <button
                    onClick={() => { if (immoDegressifOk) setFormData(f => ({ ...f, mode: 'degressif' })) }}
                    disabled={!immoDegressifOk}
                    className={cn('p-3 rounded-xl border text-center transition-all relative',
                      !immoDegressifOk
                        ? 'border-border/40 bg-muted/30 opacity-60 cursor-not-allowed'
                        : formData.mode === 'degressif'
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-border bg-card hover:border-blue-300')}>
                    {!immoDegressifOk && <Lock className="absolute top-1 right-1 h-2.5 w-2.5 text-muted-foreground" />}
                    <p className={cn('text-xs font-bold', formData.mode === 'degressif' ? 'text-blue-700' : !immoDegressifOk ? 'text-muted-foreground' : 'text-foreground')}>Dégressif</p>
                    <p className="text-xs text-muted-foreground">Art. 31-35</p>
                  </button>

                  {/* Exceptionnel : bloqué si non éligible */}
                  <button
                    onClick={() => { if (immoExceptionnelOk) setFormData(f => ({ ...f, mode: 'exceptionnel' })) }}
                    disabled={!immoExceptionnelOk}
                    className={cn('p-3 rounded-xl border text-center transition-all relative',
                      !immoExceptionnelOk
                        ? 'border-border/40 bg-muted/30 opacity-60 cursor-not-allowed'
                        : formData.mode === 'exceptionnel'
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-border bg-card hover:border-purple-300')}>
                    {!immoExceptionnelOk && <Lock className="absolute top-1 right-1 h-2.5 w-2.5 text-muted-foreground" />}
                    <p className={cn('text-xs font-bold', formData.mode === 'exceptionnel' ? 'text-purple-700' : !immoExceptionnelOk ? 'text-muted-foreground' : 'text-foreground')}>Exceptionnel</p>
                    <p className="text-xs text-muted-foreground">Art. 36-38</p>
                  </button>
                </div>

                {/* Message raison blocage */}
                {immoPrechoisie && formData.mode === 'lineaire' && (!immoDegressifOk || !immoExceptionnelOk) && (
                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 flex gap-2">
                    <AlertCircle className="h-3.5 w-3.5 text-amber-600 shrink-0 mt-0.5" />
                    <div className="text-xs text-amber-800 space-y-0.5">
                      {!immoDegressifOk && <p>Dégressif non applicable : {immoPrechoisie.raisonNonDegressif}</p>}
                      {!immoExceptionnelOk && <p>Exceptionnel non applicable : {immoPrechoisie.raisonNonExceptionnel}</p>}
                    </div>
                  </div>
                )}

                {/* Avertissement exceptionnel */}
                {formData.mode === 'exceptionnel' && (
                  <div className="rounded-lg bg-purple-50 border border-purple-200 p-3 flex gap-2">
                    <AlertCircle className="h-4 w-4 text-purple-600 shrink-0 mt-0.5" />
                    <p className="text-xs text-purple-800">
                      Réservé aux entreprises industrielles fabriquant des produits ouvrés/semi-ouvrés et exportant au moins 20% de leur CA (Art. 36 Loi IS).
                    </p>
                  </div>
                )}
              </div>

              {erreur && (
                <div className="rounded-lg bg-red-50 border border-red-200 p-3 flex gap-2">
                  <AlertCircle className="h-4 w-4 text-red-600 shrink-0 mt-0.5" />
                  <p className="text-xs text-red-700">{erreur}</p>
                </div>
              )}

              <Button onClick={genererTableau} className="w-full bg-emerald-600 hover:bg-emerald-700 text-white">
                <Calculator className="h-4 w-4 mr-2" />
                Générer le tableau d'amortissement
              </Button>
            </div>

            {/* Résultat */}
            {tableauGenere && (
              <div className="space-y-3">
                {/* Récapitulatif */}
                <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-3">
                  <h4 className="text-xs font-bold text-emerald-800 mb-2">Récapitulatif</h4>
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <span className="text-muted-foreground">Immobilisation :</span>
                    <span className="font-semibold text-foreground">{formData.designation || '—'}</span>
                    <span className="text-muted-foreground">Compte OHADA :</span>
                    <span className="font-mono font-bold text-emerald-700">{formData.compteOHADA} : {formData.intituleCompte}</span>
                    <span className="text-muted-foreground">Valeur d'origine :</span>
                    <span className="font-semibold text-foreground">{fmt(parseFloat(formData.valeur || '0'))} Fc</span>
                    <span className="text-muted-foreground">Mode :</span>
                    <span className="font-semibold text-foreground capitalize">{formData.mode}</span>
                    <span className="text-muted-foreground">Compte amortissement :</span>
                    <span className="font-mono font-bold text-blue-600">{getCompteAmort(formData.compteOHADA)}</span>
                    {formData.mode === 'degressif' && (() => {
                      const dureeN = parseInt(formData.dureeCustom) || 0
                      const coeff = getCoeffDegressif(dureeN)
                      const tauxLin = dureeN > 0 ? Math.round((1 / dureeN) * 10000) / 100 : 0
                      const tauxDeg = Math.round(tauxLin * coeff * 100) / 100
                      return (
                        <>
                          <span className="text-muted-foreground">Coefficient fiscal :</span>
                          <span className="font-semibold text-foreground">×{coeff} (Art. 33 Loi IS)</span>
                          <span className="text-muted-foreground">Taux linéaire :</span>
                          <span className="font-semibold text-foreground">{tauxLin}% (1 ÷ {dureeN} ans)</span>
                          <span className="text-muted-foreground">Taux dégressif :</span>
                          <span className="font-semibold text-foreground">{tauxDeg}% ({tauxLin}% × {coeff})</span>
                        </>
                      )
                    })()}
                  </div>
                </div>

                {/* Tableau */}
                <div className="rounded-xl border border-border bg-card overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-xs">
                      <thead className="bg-muted/50">
                        <tr>
                          <th className="px-3 py-2 text-left font-semibold text-muted-foreground whitespace-nowrap">Exercice</th>
                          {formData.mode === 'lineaire' ? (
                            <th className="px-3 py-2 text-right font-semibold text-muted-foreground whitespace-nowrap">Base amortissable</th>
                          ) : (
                            <>
                              <th className="px-3 py-2 text-right font-semibold text-muted-foreground whitespace-nowrap">Valeur d'origine</th>
                              <th className="px-3 py-2 text-right font-semibold text-muted-foreground whitespace-nowrap">VNC initiale</th>
                            </>
                          )}
                          <th className="px-3 py-2 text-right font-semibold text-muted-foreground whitespace-nowrap">Annuité d'amort.</th>
                          {(formData.mode === 'degressif' || formData.mode === 'exceptionnel') && (
                            <th className="px-3 py-2 text-right font-semibold text-muted-foreground whitespace-nowrap">
                              Annuité linéaire
                              <InfoBulle
                                texte="Annuité que donnerait le mode linéaire sur la VNC restante. Dès qu'elle devient supérieure ou égale à l'annuité dégressive, on bascule en mode linéaire (Art. 35 Loi IS)."
                                loi="Art. 35 Loi IS"
                              />
                            </th>
                          )}
                          <th className="px-3 py-2 text-right font-semibold text-muted-foreground whitespace-nowrap">Amort. cumulés</th>
                          <th className="px-3 py-2 text-right font-semibold text-muted-foreground whitespace-nowrap">VNC</th>
                          <th className="px-3 py-2 text-left font-semibold text-muted-foreground whitespace-nowrap">Calcul</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tableauGenere.map((ligne, idx) => (
                          <tr key={idx} className={cn('border-t border-border',
                            ligne.bascule ? 'bg-blue-50/50' : 'hover:bg-muted/30',
                            ligne.valeurResiduelle === 0 && 'bg-emerald-50/50')}>
                            <td className="px-3 py-2 font-semibold text-foreground whitespace-nowrap">
                              N{ligne.exercice > 1 ? `+${ligne.exercice - 1}` : ''}
                              {ligne.bascule && <span className="ml-1 text-xs text-blue-600 font-bold">↩ linéaire</span>}
                            </td>
                            {formData.mode === 'lineaire' ? (
                              // En linéaire : base amortissable = constante (valeurDebut est la même toutes les années)
                              <td className="px-3 py-2 text-right font-mono text-foreground whitespace-nowrap">{fmt(ligne.valeurDebut)}</td>
                            ) : (
                              // En dégressif/exceptionnel : valeur d'origine (fixe) + VNC initiale (décroissante)
                              <>
                                <td className="px-3 py-2 text-right font-mono text-muted-foreground whitespace-nowrap">{fmt(ligne.valeurOrigine ?? ligne.valeurDebut)}</td>
                                <td className="px-3 py-2 text-right font-mono text-foreground whitespace-nowrap">{fmt(ligne.valeurDebut)}</td>
                              </>
                            )}
                            <td className={cn(
                              'px-3 py-2 text-right font-mono font-bold whitespace-nowrap',
                              // Avant bascule : annuité dégressive retenue = vert
                              // Après bascule : annuité linéaire retenue = bleu
                              ligne.bascule ? 'text-blue-600' : 'text-emerald-700'
                            )}>{fmt(ligne.annuite)}</td>
                            {(formData.mode === 'degressif' || formData.mode === 'exceptionnel') && (
                              <td className="px-3 py-2 text-right font-mono whitespace-nowrap">
                                {ligne.annuiteLineaireResid !== undefined ? (
                                  ligne.bascule ? (
                                    // Ligne de bascule et après : linéaire = valeur retenue (bleu), dégressif barré ci-dessous
                                    <span className="text-blue-600 font-bold">{fmt(ligne.annuiteLineaireResid)}</span>
                                  ) : ligne.annuiteLineaireResid >= ligne.annuite ? (
                                    // Linéaire ≥ dégressif = seuil atteint, affiché en orange
                                    <span className="text-orange-500 font-bold">{fmt(ligne.annuiteLineaireResid)}</span>
                                  ) : (
                                    // Linéaire < dégressif = on reste dégressif, gris
                                    <span className="text-muted-foreground">{fmt(ligne.annuiteLineaireResid)}</span>
                                  )
                                ) : <span className="text-muted-foreground">—</span>}
                              </td>
                            )}
                            <td className="px-3 py-2 text-right font-mono text-foreground whitespace-nowrap">{fmt(ligne.amortCumule)}</td>
                            <td className={cn('px-3 py-2 text-right font-mono whitespace-nowrap', ligne.valeurResiduelle === 0 ? 'text-emerald-600 font-bold' : 'text-foreground')}>
                              {fmt(ligne.valeurResiduelle)}
                            </td>
                            <td className="px-3 py-2 text-muted-foreground text-xs whitespace-nowrap">{ligne.calcul}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Écriture comptable */}
                <div className="rounded-xl border border-border bg-card p-3">
                  <h4 className="text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
                    <FileText className="h-3.5 w-3.5 text-primary" />
                    Écriture comptable : Exercice N
                  </h4>
                  <table className="w-full text-xs border-collapse">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-3 py-1.5 text-left font-semibold text-muted-foreground border border-border">Compte</th>
                        <th className="px-3 py-1.5 text-left font-semibold text-muted-foreground border border-border">Intitulé</th>
                        <th className="px-3 py-1.5 text-right font-semibold text-muted-foreground border border-border">Débit</th>
                        <th className="px-3 py-1.5 text-right font-semibold text-muted-foreground border border-border">Crédit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="px-3 py-1.5 font-mono font-bold text-foreground border border-border">681</td>
                        <td className="px-3 py-1.5 text-foreground border border-border">Dotations aux amortissements</td>
                        <td className="px-3 py-1.5 text-right font-mono font-bold border border-border">{fmt(tableauGenere[0]?.annuite || 0)}</td>
                        <td className="px-3 py-1.5 border border-border"></td>
                      </tr>
                      <tr className="bg-muted/20">
                        <td className="px-3 py-1.5 font-mono font-bold text-blue-600 border border-border">{getCompteAmort(formData.compteOHADA)}</td>
                        <td className="px-3 py-1.5 text-foreground border border-border">Amortissement : {formData.intituleCompte || formData.designation}</td>
                        <td className="px-3 py-1.5 border border-border"></td>
                        <td className="px-3 py-1.5 text-right font-mono font-bold border border-border">{fmt(tableauGenere[0]?.annuite || 0)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ─── FICHES PÉDAGOGIQUES ────────────────────────────────────────────────── */}
        {onglet === 'fiches' && (
          <div className="space-y-4">
            <FichePedagogique
              titre="Amortissement linéaire"
              article="Art. 30 Loi IS"
              couleur="blue"
              definition="L'amortissement linéaire est le régime de droit commun. Il répartit la dépréciation de façon égale sur toute la durée d'utilisation du bien. L'annuité reste constante chaque exercice."
              formule="Annuité = Valeur d'origine ÷ Durée d'utilisation"
              regles={[
                "Applicable à toutes les immobilisations amortissables (Art. 30)",
                "Point de départ : date de mise en service (Art. 30 al. 2)",
                "1ère annuité proratisée à compter du 1er jour du mois de mise en service",
                "En cas de cession, l'amortissement peut être pratiqué jusqu'au jour de cession",
                "Taux = 100% ÷ Durée normale d'utilisation (AR n°088)",
                "Base = valeur d'origine (prix de revient hors TVA récupérable)",
              ]}
              exemple={{
                titre: "Machine industrielle : 5 000 000 Fc : 5 ans : mise en service en mars N",
                lignes: [
                  { label: "Taux linéaire", valeur: "100% ÷ 5 = 20%" },
                  { label: "Annuité pleine", valeur: "5 000 000 × 20% = 1 000 000 Fc" },
                  { label: "Annuité N (prorata 10/12)", valeur: "1 000 000 × 10/12 = 833 333 Fc" },
                  { label: "Annuités N+1 à N+4", valeur: "1 000 000 Fc chacune" },
                  { label: "Complément dernière annuité", valeur: "1 000 000 × 2/12 = 166 667 Fc" },
                ]
              }}
            />

            <FichePedagogique
              titre="Amortissement dégressif"
              article="Art. 31 à 35 Loi IS"
              couleur="purple"
              definition="L'amortissement dégressif permet de déduire fiscalement plus rapidement. Il s'applique sur la valeur résiduelle (valeur nette comptable) avec un taux majoré par un coefficient légal."
              formule="Annuité = Valeur résiduelle × (Taux linéaire × Coefficient)"
              regles={[
                "Réservé aux biens neufs listés à l'Art. 31 Loi IS (10 catégories)",
                "Coefficients (Art. 33) : 1,5 (4 ans) | 2 (5–6 ans) | 2,5 (plus de 6 ans)",
                "Exclusions (Art. 32) : durée < 4 ans, durée > 20 ans, immobilisations incorporelles",
                "Véhicules de tourisme : exclus (Art. 31 al. 1)",
                "Mobilier de bureau : exclu (Art. 31 al. 6)",
                "Bascule automatique vers linéaire quand annuité dégressif < valeur résiduelle ÷ années restantes (Art. 35)",
                "1ère annuité proratisée à compter du 1er jour du mois de mise en service (Art. 34)",
              ]}
              exemple={{
                titre: "Matériel industriel : 10 000 000 Fc : 5 ans : janvier N",
                lignes: [
                  { label: "Taux linéaire", valeur: "100% ÷ 5 = 20%" },
                  { label: "Coefficient (5 ans)", valeur: "×2" },
                  { label: "Taux dégressif", valeur: "20% × 2 = 40%" },
                  { label: "Annuité N", valeur: "10 000 000 × 40% = 4 000 000 Fc" },
                  { label: "Annuité N+1", valeur: "6 000 000 × 40% = 2 400 000 Fc" },
                  { label: "Annuité N+2", valeur: "3 600 000 × 40% = 1 440 000 Fc" },
                  { label: "Annuité N+3 (bascule linéaire)", valeur: "2 160 000 ÷ 2 = 1 080 000 Fc" },
                ]
              }}
            />

            <FichePedagogique
              titre="Amortissement exceptionnel"
              article="Art. 36 à 38 Loi IS"
              couleur="amber"
              definition="Régime dérogatoire accordé aux entreprises industrielles exportatrices. Il permet de déduire 60% du bien dès la première année, accélérant fortement la récupération fiscale."
              formule="Année 1 : 60% de la valeur d'origine : Années suivantes : dégressif sur le résiduel (40%)"
              regles={[
                "Réservé aux entreprises industrielles fabricant des produits ouvrés ou semi-ouvrés (Art. 36)",
                "Condition : prorata d'exportation ≥ 20% du CA hors taxes (Art. 36)",
                "Applicable aux mêmes biens que le dégressif (Art. 37 → Art. 31)",
                "Année 1 : 60% de la valeur d'origine, proratisé au mois de mise en service (Art. 38 al. 1)",
                "Années suivantes : système dégressif sur les 40% restants (Art. 38 al. 2)",
                "Bascule automatique vers linéaire quand annuité < valeur résiduelle ÷ années restantes (Art. 38 al. 3)",
              ]}
              exemple={{
                titre: "Équipement industriel : 20 000 000 Fc : 5 ans : janvier N",
                lignes: [
                  { label: "Annuité exceptionnelle N", valeur: "20 000 000 × 60% = 12 000 000 Fc" },
                  { label: "Résiduel à amortir", valeur: "20 000 000 × 40% = 8 000 000 Fc" },
                  { label: "Taux dégressif sur résiduel (4 ans)", valeur: "25% × 1,5 = 37,5%" },
                  { label: "Annuité N+1", valeur: "8 000 000 × 37,5% = 3 000 000 Fc" },
                  { label: "Annuité N+2", valeur: "5 000 000 × 37,5% = 1 875 000 Fc" },
                  { label: "Annuité N+3 (bascule)", valeur: "3 125 000 ÷ 2 = 1 562 500 Fc" },
                ]
              }}
            />

            {/* Tableau comptes OHADA */}
            <div className="rounded-xl border border-border bg-card p-4 space-y-3">
              <h3 className="text-sm font-bold text-foreground flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-600" />
                Comptes OHADA 2017 : Classe 2
              </h3>
              <div className="space-y-1.5">
                {[
                  // : Immobilisations incorporelles
                  { immo: '2111', amort: '2811', label: 'Frais de développement' },
                  { immo: '2112', amort: '2811', label: 'Frais de recherche appliquée' },
                  { immo: '2121', amort: '2812', label: 'Brevets, licences' },
                  { immo: '2122', amort: '2812', label: 'Marques, procédés, droits similaires' },
                  { immo: '2131', amort: '2813', label: 'Logiciels' },
                  { immo: '2132', amort: '2813', label: 'Sites internet' },
                  { immo: '2150', amort: '2815', label: 'Fonds commercial' },
                  { immo: '2181', amort: '2818', label: 'Droit au bail' },
                  { immo: '2188', amort: '2818', label: 'Autres immobilisations incorporelles' },
                  // : Terrains
                  { immo: '2211', amort: '—', label: 'Terrains nus (non amortissables)' },
                  { immo: '2212', amort: '—', label: 'Terrains aménagés (non amortissables)' },
                  { immo: '2213', amort: '—', label: 'Sous-sols et surfaçages (non amortissables)' },
                  // : Constructions
                  { immo: '2311', amort: '2831', label: 'Bâtiments industriels (sol propre)' },
                  { immo: '2312', amort: '2831', label: 'Bâtiments administratifs (sol propre)' },
                  { immo: '2313', amort: '2831', label: 'Bâtiments commerciaux (sol propre)' },
                  { immo: '2315', amort: '2831', label: 'Bâtiments à usage d\'habitation' },
                  { immo: '2316', amort: '2831', label: 'Bâtiments sur sol d\'autrui' },
                  { immo: '2331', amort: '2833', label: 'Voies de terre (routes, pistes)' },
                  { immo: '2332', amort: '2833', label: 'Voies de fer' },
                  { immo: '2333', amort: '2833', label: 'Voies d\'eau' },
                  { immo: '2334', amort: '2833', label: 'Barrages et digues' },
                  { immo: '2335', amort: '2833', label: 'Pistes d\'aérodrome' },
                  { immo: '2338', amort: '2833', label: 'Autres ouvrages d\'infrastructure' },
                  { immo: '2341', amort: '2834', label: 'Installations complexes (sol propre)' },
                  { immo: '2342', amort: '2834', label: 'Installations complexes (sol d\'autrui)' },
                  { immo: '2343', amort: '2834', label: 'Installations spécifiques (sol propre)' },
                  { immo: '2344', amort: '2834', label: 'Installations spécifiques (sol d\'autrui)' },
                  { immo: '2345', amort: '2834', label: 'Aménagements et agencements des bâtiments' },
                  { immo: '23451', amort: '2834', label: 'Agencements bâtiments : sol propre' },
                  { immo: '23452', amort: '2834', label: 'Agencements bâtiments : sol d\'autrui' },
                  { immo: '2351', amort: '2835', label: 'Aménagements de bureaux' },
                  { immo: '2358', amort: '2835', label: 'Autres aménagements et agencements' },
                  // : Matériel et outillage industriel/commercial
                  { immo: '2411', amort: '2841', label: 'Matériel industriel' },
                  { immo: '2412', amort: '2841', label: 'Outillage industriel' },
                  { immo: '2413', amort: '2841', label: 'Matériel commercial' },
                  { immo: '2414', amort: '2841', label: 'Outillage commercial' },
                  // : Matériel agricole
                  { immo: '2421', amort: '2842', label: 'Matériel agricole' },
                  { immo: '2422', amort: '2842', label: 'Outillage agricole' },
                  // : Matériel de bureau et informatique
                  { immo: '2441', amort: '2844', label: 'Matériel de bureau' },
                  { immo: '2442', amort: '2844', label: 'Matériel informatique' },
                  { immo: '2443', amort: '2844', label: 'Matériel bureautique' },
                  { immo: '2444', amort: '2844', label: 'Mobilier de bureau' },
                  // : Matériel de transport
                  { immo: '2451', amort: '2845', label: 'Matériel automobile' },
                  { immo: '2452', amort: '2845', label: 'Matériel ferroviaire' },
                  { immo: '2455', amort: '2845', label: 'Matériel aérien' },
                  { immo: '2458', amort: '2845', label: 'Autres matériels de transport' },
                  // : Actifs biologiques (246)
                  { immo: '2461', amort: '2846', label: 'Actifs biologiques : bovins et équins' },
                  { immo: '2462', amort: '2846', label: 'Actifs biologiques : ovins et caprins' },
                  { immo: '2463', amort: '2846', label: 'Actifs biologiques : porcins et avicoles' },
                  { immo: '2464', amort: '2846', label: 'Actifs biologiques : cultures pérennes' },
                  { immo: '2465', amort: '2846', label: 'Actifs biologiques : plantation forestière' },
                  { immo: '2468', amort: '2846', label: 'Autres actifs biologiques' },
                  // : Autres immobilisations corporelles
                  { immo: '2481', amort: '2848', label: 'Emballages récupérables' },
                  { immo: '2488', amort: '2848', label: 'Autres matériels et outillages divers' },
                  // : Immobilisations en cours
                  { immo: '2711', amort: '—', label: 'Immobilisations incorporelles en cours' },
                  { immo: '2712', amort: '—', label: 'Immobilisations corporelles en cours' },
                  // : Avances et acomptes
                  { immo: '2751', amort: '—', label: 'Avances et acomptes sur immobilisations incorporelles' },
                  { immo: '2752', amort: '—', label: 'Avances et acomptes sur immobilisations corporelles' },
                ].map((r, i) => (
                  <div key={i} className={cn('flex items-center gap-2 text-xs py-1.5 border-b border-border/50 last:border-0',
                    r.amort === '—' && 'opacity-50')}>
                    <span className="font-mono font-bold text-emerald-700 w-16 shrink-0">{r.immo}</span>
                    <span className="flex-1 text-foreground">{r.label}</span>
                    <span className={cn('font-mono font-bold w-10 text-right shrink-0', r.amort === '—' ? 'text-muted-foreground' : 'text-blue-600')}>{r.amort}</span>
                  </div>
                ))}
              </div>
              <p className="text-xs text-muted-foreground">Source : Plan Comptable OHADA 2017 : Classe 2</p>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

// ─── Composant fiche pédagogique ───────────────────────────────────────────────
function FichePedagogique({ titre, article, couleur, definition, formule, regles, exemple }: {
  titre: string; article: string; couleur: 'blue' | 'purple' | 'amber'
  definition: string; formule: string; regles: string[]
  exemple: { titre: string; lignes: { label: string; valeur: string }[] }
}) {
  const [ouvert, setOuvert] = useState(false)
  const colors = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', text: 'text-blue-700', badge: 'bg-blue-100 text-blue-700' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', text: 'text-purple-700', badge: 'bg-purple-100 text-purple-700' },
    amber: { bg: 'bg-amber-50', border: 'border-amber-200', text: 'text-amber-700', badge: 'bg-amber-100 text-amber-700' },
  }
  const c = colors[couleur]
  return (
    <div className={cn('rounded-xl border p-4 space-y-3', c.bg, c.border)}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className={cn('text-sm font-bold', c.text)}>{titre}</h3>
          <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', c.badge)}>{article}</span>
        </div>
        <button onClick={() => setOuvert(!ouvert)} className={cn('text-xs font-medium flex items-center gap-1', c.text)}>
          {ouvert ? 'Réduire' : 'Voir détails'}
          <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', ouvert && 'rotate-180')} />
        </button>
      </div>
      <p className="text-xs text-foreground/80">{definition}</p>
      <div className="rounded-lg bg-background/60 border border-border/50 p-3">
        <p className="text-xs font-mono font-semibold text-foreground">{formule}</p>
      </div>
      {ouvert && (
        <div className="space-y-3 pt-1">
          <div>
            <p className={cn('text-xs font-bold mb-1.5', c.text)}>Règles fiscales</p>
            <ul className="space-y-1">
              {regles.map((r, i) => (
                <li key={i} className="flex items-start gap-1.5 text-xs text-foreground/80">
                  <CheckCircle2 className={cn('h-3.5 w-3.5 mt-0.5 shrink-0', c.text)} />
                  {r}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className={cn('text-xs font-bold mb-1.5', c.text)}>Exemple chiffré</p>
            <p className="text-xs text-muted-foreground mb-2">{exemple.titre}</p>
            <div className="space-y-1">
              {exemple.lignes.map((l, i) => (
                <div key={i} className="flex justify-between text-xs py-1 border-b border-border/40 last:border-0">
                  <span className="text-muted-foreground">{l.label}</span>
                  <span className="font-semibold text-foreground font-mono">{l.valeur}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
