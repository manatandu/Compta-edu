import BackButton from '@/components/BackButton'
import React, { useState, useMemo } from 'react'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Search, ChevronRight, ChevronDown } from 'lucide-react'
import { cn } from '@/lib/utils'

// ─── Types ────────────────────────────────────────────────────────────────────
type TypeCompte = 'actif' | 'passif' | 'charge' | 'produit' | 'autre'

interface CompteSYCEBNL {
  numero: string
  intitule: string
  classe: number
  type: TypeCompte
}

// ─── Design constants (identiques à PlanComptablePage) ───────────────────────
const CLASS_NAMES: Record<number, string> = {
  1: 'Comptes de Ressources Durables',
  2: "Comptes d'Actif Immobilisé",
  3: 'Comptes de Stocks',
  4: 'Comptes de Tiers',
  5: 'Comptes de Trésorerie',
  6: 'Comptes de Charges',
  7: 'Comptes de Revenus',
  8: 'Comptes des Autres Charges et Produits',
}

const TYPE_COLOR: Record<string, string> = {
  actif:   'bg-blue-100 text-blue-800',
  passif:  'bg-purple-100 text-purple-800',
  charge:  'bg-red-100 text-red-800',
  produit: 'bg-green-100 text-green-800',
  autre:   'bg-gray-100 text-gray-700',
}

// ─── Plan comptable SYCEBNL officiel ─────────────────────────────────────────
// Source : Acte Uniforme OHADA relatif au Droit Comptable : SYCEBNL révisé
const COMPTES_SYCEBNL: CompteSYCEBNL[] = [

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASSE 1 : COMPTES DE RESSOURCES DURABLES
  // ═══════════════════════════════════════════════════════════════════════════
  { numero: '10',   intitule: 'Dotations et fonds propres',                                          classe: 1, type: 'passif' },
  { numero: '101',  intitule: 'Dotation non consomptible sans droit de reprise',                     classe: 1, type: 'passif' },
  { numero: '102',  intitule: 'Dotation non consomptible avec droit de reprise',                     classe: 1, type: 'passif' },
  { numero: '103',  intitule: "Droits d'entrée et cotisations constitutives de capital",            classe: 1, type: 'passif' },
  { numero: '104',  intitule: 'Dotation consomptible',                                               classe: 1, type: 'passif' },
  { numero: '105',  intitule: 'Écarts de réévaluation',                                              classe: 1, type: 'passif' },
  { numero: '106',  intitule: 'Réserves',                                                             classe: 1, type: 'passif' },
  { numero: '1061', intitule: 'Réserve légale',                                                       classe: 1, type: 'passif' },
  { numero: '1068', intitule: 'Autres réserves',                                                      classe: 1, type: 'passif' },
  { numero: '107',  intitule: 'Report à nouveau',                                                     classe: 1, type: 'passif' },
  { numero: '1071', intitule: 'Report à nouveau créditeur',                                           classe: 1, type: 'passif' },
  { numero: '1072', intitule: 'Report à nouveau débiteur',                                            classe: 1, type: 'passif' },
  { numero: '108',  intitule: "Résultat de l'exercice (Excédent ou Déficit)",                        classe: 1, type: 'passif' },
  { numero: '109',  intitule: "Compte de l'entité (gestion décentralisée)",                          classe: 1, type: 'passif' },

  { numero: '11',   intitule: "Subventions d'investissement",                                        classe: 1, type: 'passif' },
  { numero: '111',  intitule: "Subventions d'équipement",                                            classe: 1, type: 'passif' },
  { numero: '118',  intitule: "Autres subventions d'investissement",                                 classe: 1, type: 'passif' },

  { numero: '12',   intitule: 'Provisions réglementées',                                              classe: 1, type: 'passif' },
  { numero: '121',  intitule: 'Provisions pour investissements',                                      classe: 1, type: 'passif' },
  { numero: '128',  intitule: 'Autres provisions réglementées',                                       classe: 1, type: 'passif' },

  { numero: '13',   intitule: 'Fonds affectés et reportés',                                           classe: 1, type: 'passif' },
  { numero: '131',  intitule: 'Fonds affectés non encore utilisés',                                   classe: 1, type: 'passif' },
  { numero: '132',  intitule: 'Fonds reportés',                                                        classe: 1, type: 'passif' },
  { numero: '138',  intitule: 'Autres fonds affectés',                                                 classe: 1, type: 'passif' },

  { numero: '14',   intitule: 'Emprunts et dettes assimilées',                                        classe: 1, type: 'passif' },
  { numero: '141',  intitule: 'Emprunts obligataires',                                                classe: 1, type: 'passif' },
  { numero: '142',  intitule: 'Emprunts auprès des établissements de crédit',                         classe: 1, type: 'passif' },
  { numero: '143',  intitule: 'Emprunts et dettes financières divers',                                classe: 1, type: 'passif' },
  { numero: '144',  intitule: 'Dettes de location-acquisition',                                       classe: 1, type: 'passif' },
  { numero: '148',  intitule: 'Autres emprunts et dettes assimilées',                                 classe: 1, type: 'passif' },

  { numero: '15',   intitule: 'Provisions financières pour risques et charges',                       classe: 1, type: 'passif' },
  { numero: '151',  intitule: 'Provisions pour risques',                                               classe: 1, type: 'passif' },
  { numero: '155',  intitule: 'Provisions pour charges',                                               classe: 1, type: 'passif' },
  { numero: '158',  intitule: 'Autres provisions pour risques et charges',                            classe: 1, type: 'passif' },

  { numero: '16',   intitule: 'Dépôts et cautionnements reçus',                                       classe: 1, type: 'passif' },
  { numero: '161',  intitule: 'Dépôts reçus',                                                          classe: 1, type: 'passif' },
  { numero: '162',  intitule: 'Cautionnements reçus',                                                  classe: 1, type: 'passif' },
  { numero: '168',  intitule: 'Autres dépôts et cautionnements reçus',                                classe: 1, type: 'passif' },

  { numero: '17',   intitule: 'Dettes de location-acquisition et emprunts liés',                     classe: 1, type: 'passif' },
  { numero: '171',  intitule: 'Dettes de location-acquisition',                                       classe: 1, type: 'passif' },
  { numero: '178',  intitule: 'Autres dettes assimilées',                                              classe: 1, type: 'passif' },

  { numero: '18',   intitule: 'Dettes liées à des participations',                                    classe: 1, type: 'passif' },
  { numero: '181',  intitule: 'Comptes de liaison des établissements',                                classe: 1, type: 'passif' },
  { numero: '188',  intitule: 'Intérêts courus sur dettes liées',                                     classe: 1, type: 'passif' },

  { numero: '19',   intitule: 'Provisions pour dépréciation des immobilisations financières',        classe: 1, type: 'passif' },
  { numero: '191',  intitule: 'Provisions pour dépréciation des titres de participation',            classe: 1, type: 'passif' },
  { numero: '198',  intitule: 'Autres provisions pour dépréciation des immobilisations financières', classe: 1, type: 'passif' },

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASSE 2 : COMPTES D'ACTIF IMMOBILISÉ
  // ═══════════════════════════════════════════════════════════════════════════
  { numero: '20',   intitule: 'Charges immobilisées',                                                  classe: 2, type: 'actif' },
  { numero: '201',  intitule: 'Frais de développement et de prospection',                             classe: 2, type: 'actif' },
  { numero: '202',  intitule: 'Brevets, licences, logiciels et droits similaires',                   classe: 2, type: 'actif' },
  { numero: '203',  intitule: 'Fonds commercial',                                                      classe: 2, type: 'actif' },
  { numero: '204',  intitule: 'Marques',                                                               classe: 2, type: 'actif' },
  { numero: '205',  intitule: 'Droits au bail',                                                        classe: 2, type: 'actif' },
  { numero: '208',  intitule: 'Autres immobilisations incorporelles',                                 classe: 2, type: 'actif' },

  { numero: '21',   intitule: 'Immobilisations corporelles',                                           classe: 2, type: 'actif' },
  { numero: '211',  intitule: 'Terrains',                                                               classe: 2, type: 'actif' },
  { numero: '212',  intitule: 'Agencements et aménagements de terrains',                              classe: 2, type: 'actif' },
  { numero: '213',  intitule: 'Bâtiments et constructions',                                            classe: 2, type: 'actif' },
  { numero: '214',  intitule: 'Installations techniques, matériels et outillages',                   classe: 2, type: 'actif' },
  { numero: '215',  intitule: 'Matériels de bureau et informatique, mobiliers',                       classe: 2, type: 'actif' },
  { numero: '216',  intitule: 'Matériels de transport',                                                classe: 2, type: 'actif' },
  { numero: '218',  intitule: 'Autres immobilisations corporelles',                                   classe: 2, type: 'actif' },

  { numero: '22',   intitule: 'Immobilisations mises en concession',                                  classe: 2, type: 'actif' },
  { numero: '221',  intitule: 'Immobilisations corporelles mises en concession',                      classe: 2, type: 'actif' },
  { numero: '228',  intitule: 'Autres immobilisations mises en concession',                           classe: 2, type: 'actif' },

  { numero: '23',   intitule: 'Immobilisations en cours',                                              classe: 2, type: 'actif' },
  { numero: '231',  intitule: 'Immobilisations corporelles en cours',                                 classe: 2, type: 'actif' },
  { numero: '232',  intitule: 'Immobilisations incorporelles en cours',                               classe: 2, type: 'actif' },
  { numero: '238',  intitule: 'Avances et acomptes versés sur immobilisations',                       classe: 2, type: 'actif' },

  { numero: '24',   intitule: 'Dépôts et cautionnements versés',                                      classe: 2, type: 'actif' },
  { numero: '241',  intitule: 'Dépôts versés',                                                         classe: 2, type: 'actif' },
  { numero: '242',  intitule: 'Cautionnements versés',                                                 classe: 2, type: 'actif' },
  { numero: '248',  intitule: 'Autres dépôts et cautionnements versés',                               classe: 2, type: 'actif' },

  { numero: '25',   intitule: 'Titres de participation',                                               classe: 2, type: 'actif' },
  { numero: '251',  intitule: 'Titres de participation dans des entités liées',                       classe: 2, type: 'actif' },
  { numero: '258',  intitule: 'Autres titres de participation',                                        classe: 2, type: 'actif' },

  { numero: '26',   intitule: 'Autres immobilisations financières',                                   classe: 2, type: 'actif' },
  { numero: '261',  intitule: 'Prêts et créances liés à des participations',                          classe: 2, type: 'actif' },
  { numero: '262',  intitule: 'Prêts au personnel',                                                    classe: 2, type: 'actif' },
  { numero: '268',  intitule: 'Autres créances et prêts',                                              classe: 2, type: 'actif' },

  { numero: '27',   intitule: 'Crédit-bail et contrats assimilés',                                    classe: 2, type: 'actif' },
  { numero: '271',  intitule: 'Immobilisations en location-acquisition',                              classe: 2, type: 'actif' },
  { numero: '278',  intitule: 'Autres droits de jouissance',                                           classe: 2, type: 'actif' },

  { numero: '28',   intitule: 'Amortissements des immobilisations',                                   classe: 2, type: 'actif' },
  { numero: '281',  intitule: 'Amortissements des immobilisations incorporelles',                     classe: 2, type: 'actif' },
  { numero: '282',  intitule: 'Amortissements des immobilisations mises en concession',              classe: 2, type: 'actif' },
  { numero: '284',  intitule: 'Amortissements des immobilisations corporelles',                       classe: 2, type: 'actif' },
  { numero: '285',  intitule: 'Amortissements du matériel de bureau et informatique',                classe: 2, type: 'actif' },
  { numero: '286',  intitule: 'Amortissements des matériels de transport',                            classe: 2, type: 'actif' },

  { numero: '29',   intitule: 'Provisions pour dépréciation des immobilisations',                    classe: 2, type: 'actif' },
  { numero: '291',  intitule: 'Provisions pour dépréciation des immobilisations incorporelles',      classe: 2, type: 'actif' },
  { numero: '294',  intitule: 'Provisions pour dépréciation des immobilisations corporelles',        classe: 2, type: 'actif' },
  { numero: '296',  intitule: 'Provisions pour dépréciation des titres de participation',            classe: 2, type: 'actif' },
  { numero: '298',  intitule: 'Provisions pour dépréciation des autres immobilisations financières', classe: 2, type: 'actif' },

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASSE 3 : COMPTES DE STOCKS
  // ═══════════════════════════════════════════════════════════════════════════
  { numero: '30',   intitule: 'Marchandises',                                                          classe: 3, type: 'actif' },
  { numero: '301',  intitule: 'Marchandises A',                                                        classe: 3, type: 'actif' },
  { numero: '302',  intitule: 'Marchandises B',                                                        classe: 3, type: 'actif' },
  { numero: '308',  intitule: 'Autres marchandises',                                                   classe: 3, type: 'actif' },

  { numero: '31',   intitule: 'Matières premières et fournitures',                                    classe: 3, type: 'actif' },
  { numero: '311',  intitule: 'Matières premières',                                                    classe: 3, type: 'actif' },
  { numero: '312',  intitule: 'Matières consommables',                                                 classe: 3, type: 'actif' },
  { numero: '318',  intitule: 'Autres matières et fournitures',                                        classe: 3, type: 'actif' },

  { numero: '32',   intitule: 'Autres approvisionnements',                                             classe: 3, type: 'actif' },
  { numero: '321',  intitule: 'Fournitures de bureau',                                                 classe: 3, type: 'actif' },
  { numero: '322',  intitule: "Fournitures d'atelier et d'usine",                                   classe: 3, type: 'actif' },
  { numero: '328',  intitule: 'Autres fournitures',                                                    classe: 3, type: 'actif' },

  { numero: '33',   intitule: 'Encours de production de biens',                                       classe: 3, type: 'actif' },
  { numero: '331',  intitule: 'Produits en cours',                                                     classe: 3, type: 'actif' },
  { numero: '333',  intitule: 'Travaux en cours',                                                      classe: 3, type: 'actif' },
  { numero: '338',  intitule: 'Autres encours de production',                                          classe: 3, type: 'actif' },

  { numero: '35',   intitule: 'Stocks de produits',                                                    classe: 3, type: 'actif' },
  { numero: '351',  intitule: 'Produits finis',                                                        classe: 3, type: 'actif' },
  { numero: '358',  intitule: 'Produits résiduels et matières de récupération',                       classe: 3, type: 'actif' },

  { numero: '36',   intitule: 'Stocks provenant de dons et legs',                                     classe: 3, type: 'actif' },
  { numero: '361',  intitule: 'Stocks reçus en dons ou legs à distribuer',                            classe: 3, type: 'actif' },
  { numero: '368',  intitule: 'Autres stocks reçus en dons ou legs',                                  classe: 3, type: 'actif' },

  { numero: '37',   intitule: 'Stocks en cours de route, en consignation ou en dépôt',               classe: 3, type: 'actif' },
  { numero: '371',  intitule: 'Stocks en cours de route',                                              classe: 3, type: 'actif' },
  { numero: '372',  intitule: 'Stocks en consignation ou en dépôt',                                   classe: 3, type: 'actif' },

  { numero: '38',   intitule: 'Stocks en entrepôt spécial (magasin général)',                         classe: 3, type: 'actif' },
  { numero: '381',  intitule: 'Stocks déposés en entrepôt spécial',                                   classe: 3, type: 'actif' },

  { numero: '39',   intitule: 'Provisions pour dépréciation des stocks',                              classe: 3, type: 'actif' },
  { numero: '391',  intitule: 'Provisions pour dépréciation des marchandises',                        classe: 3, type: 'actif' },
  { numero: '394',  intitule: 'Provisions pour dépréciation des matières',                            classe: 3, type: 'actif' },
  { numero: '395',  intitule: 'Provisions pour dépréciation des produits',                            classe: 3, type: 'actif' },

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASSE 4 : COMPTES DE TIERS
  // ═══════════════════════════════════════════════════════════════════════════
  { numero: '40',   intitule: 'Fournisseurs et comptes rattachés',                                    classe: 4, type: 'passif' },
  { numero: '401',  intitule: 'Fournisseurs',                                                          classe: 4, type: 'passif' },
  { numero: '402',  intitule: 'Fournisseurs : effets à payer',                                        classe: 4, type: 'passif' },
  { numero: '408',  intitule: 'Fournisseurs : factures non parvenues',                                classe: 4, type: 'passif' },
  { numero: '409',  intitule: 'Fournisseurs débiteurs : avances et acomptes versés',                 classe: 4, type: 'actif' },

  { numero: '41',   intitule: 'Adhérents, clients et comptes rattachés',                              classe: 4, type: 'actif' },
  { numero: '411',  intitule: 'Clients',                                                               classe: 4, type: 'actif' },
  { numero: '412',  intitule: 'Clients : effets à recevoir',                                          classe: 4, type: 'actif' },
  { numero: '413',  intitule: 'Adhérents et membres',                                                 classe: 4, type: 'actif' },
  { numero: '416',  intitule: 'Clients douteux',                                                       classe: 4, type: 'actif' },
  { numero: '418',  intitule: 'Clients : produits non encore facturés',                               classe: 4, type: 'actif' },
  { numero: '419',  intitule: 'Clients créditeurs',                                                    classe: 4, type: 'passif' },

  { numero: '42',   intitule: 'Personnel et comptes rattachés',                                       classe: 4, type: 'passif' },
  { numero: '421',  intitule: 'Personnel : rémunérations dues',                                       classe: 4, type: 'passif' },
  { numero: '422',  intitule: 'Personnel : avances et acomptes',                                      classe: 4, type: 'actif' },
  { numero: '424',  intitule: 'Personnel : charges à payer et produits à recevoir',                  classe: 4, type: 'passif' },
  { numero: '426',  intitule: 'Personnel : dépôts reçus',                                             classe: 4, type: 'passif' },
  { numero: '428',  intitule: 'Personnel : autres charges à payer',                                   classe: 4, type: 'passif' },
  { numero: '429',  intitule: 'Déficits et débours : personnel',                                      classe: 4, type: 'actif' },

  { numero: '43',   intitule: 'Organismes sociaux',                                                    classe: 4, type: 'passif' },
  { numero: '431',  intitule: 'Sécurité sociale',                                                      classe: 4, type: 'passif' },
  { numero: '432',  intitule: 'Caisses de retraite',                                                   classe: 4, type: 'passif' },
  { numero: '438',  intitule: 'Autres organismes sociaux',                                             classe: 4, type: 'passif' },

  { numero: '44',   intitule: 'État et collectivités publiques',                                       classe: 4, type: 'passif' },
  { numero: '441',  intitule: "État : impôts et taxes sur le chiffre d'affaires",                   classe: 4, type: 'passif' },
  { numero: '442',  intitule: 'État : impôts et versements assimilés',                                classe: 4, type: 'passif' },
  { numero: '444',  intitule: 'État : impôts sur les résultats',                                      classe: 4, type: 'passif' },
  { numero: '445',  intitule: "État : taxes sur le chiffre d'affaires récupérables",                classe: 4, type: 'actif' },
  { numero: '447',  intitule: 'État : autres impôts et taxes',                                        classe: 4, type: 'passif' },
  { numero: '448',  intitule: 'État : charges à payer et produits à recevoir',                       classe: 4, type: 'passif' },

  { numero: '45',   intitule: 'Organismes internationaux et bailleurs de fonds',                      classe: 4, type: 'actif' },
  { numero: '451',  intitule: "Bailleurs de fonds : subventions d'exploitation",                    classe: 4, type: 'actif' },
  { numero: '452',  intitule: "Bailleurs de fonds : subventions d'investissement",                  classe: 4, type: 'actif' },
  { numero: '458',  intitule: 'Autres bailleurs de fonds',                                             classe: 4, type: 'actif' },

  { numero: '46',   intitule: 'Débiteurs divers et créditeurs divers',                                classe: 4, type: 'actif' },
  { numero: '461',  intitule: 'Débiteurs divers',                                                      classe: 4, type: 'actif' },
  { numero: '462',  intitule: 'Créditeurs divers',                                                     classe: 4, type: 'passif' },
  { numero: '464',  intitule: "Produits reçus d'avance",                                              classe: 4, type: 'passif' },
  { numero: '465',  intitule: "Charges constatées d'avance",                                          classe: 4, type: 'actif' },
  { numero: '468',  intitule: 'Divers : créances et dettes',                                           classe: 4, type: 'actif' },

  { numero: '47',   intitule: "Comptes transitoires ou d'attente",                                   classe: 4, type: 'autre' },
  { numero: '471',  intitule: "Compte d'attente : débit",                                            classe: 4, type: 'actif' },
  { numero: '472',  intitule: "Compte d'attente : crédit",                                           classe: 4, type: 'passif' },
  { numero: '478',  intitule: 'Autres comptes transitoires',                                           classe: 4, type: 'autre' },

  { numero: '48',   intitule: 'Créances et dettes hors activités ordinaires',                         classe: 4, type: 'actif' },
  { numero: '481',  intitule: "Créances HAO sur cessions d'immobilisations",                         classe: 4, type: 'actif' },
  { numero: '482',  intitule: "Dettes HAO sur acquisitions d'immobilisations",                       classe: 4, type: 'passif' },
  { numero: '488',  intitule: 'Divers créances et dettes HAO',                                        classe: 4, type: 'actif' },

  { numero: '49',   intitule: 'Provisions pour dépréciation des comptes de tiers',                   classe: 4, type: 'actif' },
  { numero: '491',  intitule: 'Provisions pour dépréciation des comptes clients',                    classe: 4, type: 'actif' },
  { numero: '495',  intitule: 'Provisions pour dépréciation des comptes du groupe',                  classe: 4, type: 'actif' },
  { numero: '498',  intitule: 'Provisions pour dépréciation des autres comptes de tiers',            classe: 4, type: 'actif' },

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASSE 5 : COMPTES DE TRÉSORERIE
  // ═══════════════════════════════════════════════════════════════════════════
  { numero: '50',   intitule: 'Titres de placement',                                                   classe: 5, type: 'actif' },
  { numero: '501',  intitule: 'Titres de placement : actions',                                         classe: 5, type: 'actif' },
  { numero: '502',  intitule: 'Titres de placement : obligations',                                     classe: 5, type: 'actif' },
  { numero: '508',  intitule: 'Autres titres de placement',                                            classe: 5, type: 'actif' },

  { numero: '51',   intitule: 'Valeurs à encaisser',                                                   classe: 5, type: 'actif' },
  { numero: '511',  intitule: "Effets à l'encaissement",                                              classe: 5, type: 'actif' },
  { numero: '512',  intitule: 'Chèques à encaisser',                                                   classe: 5, type: 'actif' },
  { numero: '514',  intitule: "Chèques à encaisser à l'étranger",                                    classe: 5, type: 'actif' },

  { numero: '52',   intitule: 'Banques',                                                                classe: 5, type: 'actif' },
  { numero: '521',  intitule: 'Banques locales : comptes courants',                                    classe: 5, type: 'actif' },
  { numero: '522',  intitule: 'Banques locales : comptes à terme',                                     classe: 5, type: 'actif' },
  { numero: '523',  intitule: "Banques à l'étranger : comptes courants",                             classe: 5, type: 'actif' },
  { numero: '528',  intitule: 'Autres établissements financiers',                                      classe: 5, type: 'actif' },

  { numero: '53',   intitule: 'Établissements financiers et assimilés',                               classe: 5, type: 'actif' },
  { numero: '531',  intitule: 'Chèques postaux',                                                       classe: 5, type: 'actif' },
  { numero: '532',  intitule: 'Trésor public',                                                         classe: 5, type: 'actif' },
  { numero: '538',  intitule: 'Autres organismes',                                                     classe: 5, type: 'actif' },

  { numero: '54',   intitule: 'Instruments de monnaie électronique et mobile money',                  classe: 5, type: 'actif' },
  { numero: '541',  intitule: 'Mobile money',                                                           classe: 5, type: 'actif' },
  { numero: '548',  intitule: 'Autres instruments de monnaie électronique',                           classe: 5, type: 'actif' },

  { numero: '57',   intitule: 'Caisse',                                                                 classe: 5, type: 'actif' },
  { numero: '571',  intitule: 'Caisse siège social',                                                   classe: 5, type: 'actif' },
  { numero: '572',  intitule: 'Caisse succursale',                                                     classe: 5, type: 'actif' },
  { numero: '578',  intitule: 'Autres caisses',                                                        classe: 5, type: 'actif' },

  { numero: '58',   intitule: "Régies d'avances, accréditifs et virements internes",                 classe: 5, type: 'actif' },
  { numero: '581',  intitule: 'Virements internes',                                                    classe: 5, type: 'actif' },
  { numero: '582',  intitule: "Régies d'avances",                                                     classe: 5, type: 'actif' },
  { numero: '583',  intitule: 'Accréditifs',                                                            classe: 5, type: 'actif' },

  { numero: '59',   intitule: 'Provisions pour dépréciation des comptes de trésorerie',              classe: 5, type: 'actif' },
  { numero: '591',  intitule: 'Provisions pour dépréciation des titres de placement',                classe: 5, type: 'actif' },
  { numero: '598',  intitule: 'Provisions pour dépréciation des autres comptes de trésorerie',       classe: 5, type: 'actif' },

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASSE 6 : COMPTES DE CHARGES
  // ═══════════════════════════════════════════════════════════════════════════
  { numero: '60',   intitule: 'Achats et variations de stocks',                                        classe: 6, type: 'charge' },
  { numero: '601',  intitule: 'Achats de marchandises',                                                classe: 6, type: 'charge' },
  { numero: '602',  intitule: 'Achats de matières premières et fournitures',                          classe: 6, type: 'charge' },
  { numero: '603',  intitule: 'Variations de stocks de biens achetés',                                classe: 6, type: 'charge' },
  { numero: '604',  intitule: 'Achats stockés : matières et fournitures',                             classe: 6, type: 'charge' },
  { numero: '605',  intitule: 'Achats non stockés de matières et fournitures',                        classe: 6, type: 'charge' },
  { numero: '608',  intitule: "Achats d'emballages commerciaux",                                     classe: 6, type: 'charge' },

  { numero: '61',   intitule: 'Transports',                                                             classe: 6, type: 'charge' },
  { numero: '611',  intitule: 'Transports sur achats',                                                 classe: 6, type: 'charge' },
  { numero: '612',  intitule: 'Transports sur ventes',                                                 classe: 6, type: 'charge' },
  { numero: '614',  intitule: 'Transports du personnel',                                               classe: 6, type: 'charge' },
  { numero: '618',  intitule: 'Autres frais de transport',                                             classe: 6, type: 'charge' },

  { numero: '62',   intitule: 'Services extérieurs A',                                                 classe: 6, type: 'charge' },
  { numero: '621',  intitule: 'Sous-traitance générale',                                               classe: 6, type: 'charge' },
  { numero: '622',  intitule: 'Locations et charges locatives',                                        classe: 6, type: 'charge' },
  { numero: '623',  intitule: 'Redevances de crédit-bail et de location',                             classe: 6, type: 'charge' },
  { numero: '624',  intitule: 'Entretiens, réparations et maintenance',                               classe: 6, type: 'charge' },
  { numero: '625',  intitule: "Primes d'assurances",                                                  classe: 6, type: 'charge' },
  { numero: '626',  intitule: 'Études, recherches et documentation',                                  classe: 6, type: 'charge' },
  { numero: '627',  intitule: 'Publicité, publications et relations publiques',                       classe: 6, type: 'charge' },
  { numero: '628',  intitule: 'Frais de télécommunications',                                           classe: 6, type: 'charge' },

  { numero: '63',   intitule: 'Services extérieurs B',                                                 classe: 6, type: 'charge' },
  { numero: '631',  intitule: 'Frais bancaires',                                                       classe: 6, type: 'charge' },
  { numero: '632',  intitule: "Rémunérations d'intermédiaires et honoraires",                        classe: 6, type: 'charge' },
  { numero: '633',  intitule: 'Frais de formation du personnel',                                       classe: 6, type: 'charge' },
  { numero: '634',  intitule: 'Dons, libéralités et cotisations',                                     classe: 6, type: 'charge' },
  { numero: '635',  intitule: 'Cotisations',                                                            classe: 6, type: 'charge' },
  { numero: '638',  intitule: 'Autres charges externes',                                               classe: 6, type: 'charge' },

  { numero: '64',   intitule: 'Impôts et taxes',                                                       classe: 6, type: 'charge' },
  { numero: '641',  intitule: "Impôts et taxes sur le chiffre d'affaires",                           classe: 6, type: 'charge' },
  { numero: '642',  intitule: 'Droits de douane',                                                      classe: 6, type: 'charge' },
  { numero: '645',  intitule: 'Impôts et taxes directs',                                               classe: 6, type: 'charge' },
  { numero: '648',  intitule: 'Autres impôts et taxes',                                                classe: 6, type: 'charge' },

  { numero: '65',   intitule: 'Autres charges',                                                        classe: 6, type: 'charge' },
  { numero: '651',  intitule: 'Pertes sur créances irrécouvrables',                                   classe: 6, type: 'charge' },
  { numero: '658',  intitule: 'Charges diverses',                                                      classe: 6, type: 'charge' },

  { numero: '66',   intitule: 'Charges de personnel',                                                  classe: 6, type: 'charge' },
  { numero: '661',  intitule: 'Rémunérations directes versées au personnel',                          classe: 6, type: 'charge' },
  { numero: '662',  intitule: 'Rémunérations congés payés',                                            classe: 6, type: 'charge' },
  { numero: '663',  intitule: 'Indemnités forfaitaires versées au personnel',                         classe: 6, type: 'charge' },
  { numero: '664',  intitule: 'Charges sociales',                                                      classe: 6, type: 'charge' },
  { numero: '666',  intitule: 'Rémunérations des associés (gérants)',                                 classe: 6, type: 'charge' },
  { numero: '667',  intitule: "Rémunérations d'administrateurs, de gérants",                         classe: 6, type: 'charge' },
  { numero: '668',  intitule: 'Autres charges de personnel',                                           classe: 6, type: 'charge' },

  { numero: '67',   intitule: 'Frais financiers et charges assimilées',                               classe: 6, type: 'charge' },
  { numero: '671',  intitule: 'Intérêts des emprunts',                                                 classe: 6, type: 'charge' },
  { numero: '672',  intitule: 'Intérêts sur dettes de location-acquisition',                          classe: 6, type: 'charge' },
  { numero: '674',  intitule: 'Escomptes accordés',                                                    classe: 6, type: 'charge' },
  { numero: '675',  intitule: 'Escomptes des effets de commerce',                                     classe: 6, type: 'charge' },
  { numero: '676',  intitule: 'Perte de change',                                                       classe: 6, type: 'charge' },
  { numero: '677',  intitule: 'Pertes sur cessions de valeurs mobilières de placement',              classe: 6, type: 'charge' },
  { numero: '678',  intitule: 'Autres charges financières',                                            classe: 6, type: 'charge' },

  { numero: '68',   intitule: 'Dotations aux amortissements et aux provisions',                       classe: 6, type: 'charge' },
  { numero: '681',  intitule: 'Dotations aux amortissements des immobilisations',                     classe: 6, type: 'charge' },
  { numero: '682',  intitule: 'Dotations aux provisions pour dépréciation des immobilisations',      classe: 6, type: 'charge' },
  { numero: '683',  intitule: 'Dotations aux provisions pour dépréciation des actifs circulants',    classe: 6, type: 'charge' },
  { numero: '685',  intitule: 'Dotations aux provisions pour risques et charges',                    classe: 6, type: 'charge' },
  { numero: '686',  intitule: 'Dotations aux amortissements des primes de remboursement',            classe: 6, type: 'charge' },
  { numero: '688',  intitule: 'Dotations aux provisions réglementées',                               classe: 6, type: 'charge' },

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASSE 7 : COMPTES DE REVENUS
  // ═══════════════════════════════════════════════════════════════════════════
  { numero: '70',   intitule: 'Ventes de marchandises et de produits fabriqués',                     classe: 7, type: 'produit' },
  { numero: '701',  intitule: 'Ventes de marchandises',                                                classe: 7, type: 'produit' },
  { numero: '702',  intitule: 'Ventes de produits finis',                                              classe: 7, type: 'produit' },
  { numero: '703',  intitule: 'Ventes de produits résiduels',                                          classe: 7, type: 'produit' },
  { numero: '704',  intitule: 'Travaux facturés',                                                      classe: 7, type: 'produit' },
  { numero: '705',  intitule: 'Études facturées',                                                      classe: 7, type: 'produit' },
  { numero: '706',  intitule: 'Services vendus',                                                       classe: 7, type: 'produit' },
  { numero: '707',  intitule: 'Produits accessoires',                                                  classe: 7, type: 'produit' },
  { numero: '708',  intitule: 'Produits des activités annexes',                                        classe: 7, type: 'produit' },

  { numero: '71',   intitule: 'Cotisations et dons reçus',                                             classe: 7, type: 'produit' },
  { numero: '711',  intitule: 'Cotisations des membres',                                               classe: 7, type: 'produit' },
  { numero: '712',  intitule: 'Dons reçus : affectation générale',                                    classe: 7, type: 'produit' },
  { numero: '713',  intitule: 'Dons reçus : affectation spéciale',                                    classe: 7, type: 'produit' },
  { numero: '714',  intitule: 'Dons en nature reçus consommés',                                       classe: 7, type: 'produit' },
  { numero: '716',  intitule: 'Dotations consomptibles utilisées',                                    classe: 7, type: 'produit' },
  { numero: '718',  intitule: 'Générosité du public et autres libéralités',                           classe: 7, type: 'produit' },

  { numero: '72',   intitule: 'Production stockée (ou déstockage)',                                   classe: 7, type: 'produit' },
  { numero: '721',  intitule: 'Variation des stocks de produits finis',                               classe: 7, type: 'produit' },
  { numero: '722',  intitule: 'Variation des stocks de produits en cours',                            classe: 7, type: 'produit' },

  { numero: '73',   intitule: 'Production immobilisée',                                                classe: 7, type: 'produit' },
  { numero: '731',  intitule: 'Immobilisations corporelles produites',                                classe: 7, type: 'produit' },
  { numero: '732',  intitule: 'Immobilisations incorporelles produites',                              classe: 7, type: 'produit' },

  { numero: '74',   intitule: "Subventions d'exploitation",                                          classe: 7, type: 'produit' },
  { numero: '741',  intitule: "Subventions d'exploitation : État",                                   classe: 7, type: 'produit' },
  { numero: '742',  intitule: "Subventions d'exploitation : collectivités locales",                  classe: 7, type: 'produit' },
  { numero: '744',  intitule: "Subventions d'exploitation : bailleurs de fonds internationaux",     classe: 7, type: 'produit' },
  { numero: '748',  intitule: "Autres subventions d'exploitation",                                   classe: 7, type: 'produit' },

  { numero: '75',   intitule: 'Autres produits',                                                       classe: 7, type: 'produit' },
  { numero: '752',  intitule: "Revenus des immeubles non affectés aux activités de l'entité",       classe: 7, type: 'produit' },
  { numero: '754',  intitule: 'Revenus des autres immobilisations financières',                       classe: 7, type: 'produit' },
  { numero: '755',  intitule: "Quote-part de subventions d'investissement virée au résultat",       classe: 7, type: 'produit' },
  { numero: '758',  intitule: 'Produits divers',                                                       classe: 7, type: 'produit' },

  { numero: '77',   intitule: 'Revenus financiers',                                                    classe: 7, type: 'produit' },
  { numero: '771',  intitule: 'Intérêts de prêts',                                                     classe: 7, type: 'produit' },
  { numero: '772',  intitule: 'Revenus des titres de placement',                                       classe: 7, type: 'produit' },
  { numero: '774',  intitule: 'Escomptes obtenus',                                                     classe: 7, type: 'produit' },
  { numero: '776',  intitule: 'Gains de change',                                                       classe: 7, type: 'produit' },
  { numero: '777',  intitule: 'Gains sur cessions de titres de placement',                            classe: 7, type: 'produit' },
  { numero: '778',  intitule: 'Autres revenus financiers',                                             classe: 7, type: 'produit' },

  { numero: '78',   intitule: 'Reprises de provisions et amortissements',                             classe: 7, type: 'produit' },
  { numero: '781',  intitule: "Reprises d'amortissements des immobilisations",                       classe: 7, type: 'produit' },
  { numero: '782',  intitule: 'Reprises sur provisions pour dépréciation des immobilisations',       classe: 7, type: 'produit' },
  { numero: '783',  intitule: 'Reprises sur provisions pour dépréciation des actifs circulants',     classe: 7, type: 'produit' },
  { numero: '785',  intitule: 'Reprises sur provisions pour risques et charges',                     classe: 7, type: 'produit' },
  { numero: '786',  intitule: 'Reprises sur provisions réglementées',                                 classe: 7, type: 'produit' },
  { numero: '788',  intitule: "Reprises sur subventions d'investissement",                           classe: 7, type: 'produit' },

  // ═══════════════════════════════════════════════════════════════════════════
  // CLASSE 8 : COMPTES DES AUTRES CHARGES ET PRODUITS (HAO)
  // ═══════════════════════════════════════════════════════════════════════════
  { numero: '81',   intitule: "Valeurs comptables des cessions d'immobilisations",                   classe: 8, type: 'charge' },
  { numero: '811',  intitule: "Valeurs comptables des cessions d'immobilisations incorporelles",    classe: 8, type: 'charge' },
  { numero: '812',  intitule: "Valeurs comptables des cessions d'immobilisations corporelles",      classe: 8, type: 'charge' },
  { numero: '813',  intitule: 'Valeurs comptables des cessions de titres de participation',          classe: 8, type: 'charge' },
  { numero: '818',  intitule: 'Valeurs comptables des autres cessions',                               classe: 8, type: 'charge' },

  { numero: '82',   intitule: "Produits des cessions d'immobilisations",                             classe: 8, type: 'produit' },
  { numero: '821',  intitule: "Produits des cessions d'immobilisations incorporelles",              classe: 8, type: 'produit' },
  { numero: '822',  intitule: "Produits des cessions d'immobilisations corporelles",                classe: 8, type: 'produit' },
  { numero: '823',  intitule: 'Produits des cessions de titres de participation',                    classe: 8, type: 'produit' },
  { numero: '828',  intitule: 'Produits des autres cessions',                                          classe: 8, type: 'produit' },

  { numero: '83',   intitule: 'Autres charges hors activités ordinaires',                             classe: 8, type: 'charge' },
  { numero: '831',  intitule: 'Charges hors activités ordinaires',                                    classe: 8, type: 'charge' },
  { numero: '838',  intitule: 'Dotations HAO aux provisions et dépréciations',                        classe: 8, type: 'charge' },

  { numero: '84',   intitule: 'Autres produits hors activités ordinaires',                            classe: 8, type: 'produit' },
  { numero: '841',  intitule: 'Produits hors activités ordinaires',                                   classe: 8, type: 'produit' },
  { numero: '848',  intitule: 'Reprises HAO de provisions et dépréciations',                          classe: 8, type: 'produit' },

  { numero: '85',   intitule: 'Dotations HAO aux amortissements',                                     classe: 8, type: 'charge' },
  { numero: '851',  intitule: 'Dotations HAO aux amortissements des immobilisations',                classe: 8, type: 'charge' },

  { numero: '86',   intitule: "Reprises HAO d'amortissements",                                       classe: 8, type: 'produit' },
  { numero: '861',  intitule: "Reprises HAO d'amortissements des immobilisations",                  classe: 8, type: 'produit' },

  { numero: '88',   intitule: 'Subventions accordées',                                                 classe: 8, type: 'charge' },
  { numero: '881',  intitule: 'Subventions accordées',                                                 classe: 8, type: 'charge' },
  { numero: '888',  intitule: 'Dons accordés',                                                         classe: 8, type: 'charge' },

  { numero: '89',   intitule: 'Impôts sur le résultat',                                               classe: 8, type: 'charge' },
  { numero: '891',  intitule: 'Impôts sur les bénéfices',                                             classe: 8, type: 'charge' },
  { numero: '898',  intitule: 'Autres impôts sur les résultats',                                      classe: 8, type: 'charge' },
]

// ─── Composant ────────────────────────────────────────────────────────────────
export default function PlanComptableSYCEBNLPage() {
  const [search, setSearch] = useState('')
  const [openClasses, setOpenClasses] = useState<Set<string>>(new Set(['1']))
  const [openSections, setOpenSections] = useState<Set<string>>(new Set())
  const [openSubSections, setOpenSubSections] = useState<Set<string>>(new Set())

  const filtered = useMemo(() => {
    if (!search.trim()) return COMPTES_SYCEBNL
    const q = search.toLowerCase()
    return COMPTES_SYCEBNL.filter(c =>
      c.numero.includes(q) ||
      c.intitule.toLowerCase().includes(q)
    )
  }, [search])

  const isSearching = search.trim().length > 0

  // Group by class -> 2-digit -> 3-digit -> full
  const grouped = useMemo(() => {
    const map = new Map<number, Map<string, Map<string, CompteSYCEBNL[]>>>()
    filtered.forEach(c => {
      if (!map.has(c.classe)) map.set(c.classe, new Map())
      const cl = map.get(c.classe)!
      const twoDigit = c.numero.substring(0, 2)
      if (!cl.has(twoDigit)) cl.set(twoDigit, new Map())
      const td = cl.get(twoDigit)!
      const threeDigit = c.numero.substring(0, 3)
      if (!td.has(threeDigit)) td.set(threeDigit, [])
      td.get(threeDigit)!.push(c)
    })
    return map
  }, [filtered])

  const toggle = (set: Set<string>, key: string): Set<string> => {
    const s = new Set(set)
    if (s.has(key)) s.delete(key)
    else s.add(key)
    return s
  }

  return (
    <div className="space-y-4 animate-fadeIn">
      <BackButton />
      <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        <div>
          <h1 className="text-2xl font-display font-bold text-foreground">Plan Comptable SYCEBNL</h1>
          <p className="text-sm text-muted-foreground">
            {COMPTES_SYCEBNL.length} comptes : Système Comptable des Entités à But Non Lucratif (Acte Uniforme OHADA)
          </p>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          className="pl-9"
          placeholder="Rechercher par numéro ou intitulé..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {isSearching ? (
        /* Flat list for search results */
        <Card className="border-border">
          <CardContent className="px-0 pt-0 pb-0">
            {filtered.length === 0 ? (
              <div className="text-center text-muted-foreground py-8">Aucun compte trouvé.</div>
            ) : (
              <div className="divide-y divide-border">
                {filtered.map(c => (
                  <div key={c.numero} className="flex items-center gap-3 px-4 py-2 hover:bg-muted/30 transition-colors duration-150 hover:translate-x-0.5 transition-transform">
                    <span className="font-mono font-semibold text-primary text-sm w-16 shrink-0">{c.numero}</span>
                    <span className="flex-1 text-sm">{c.intitule}</span>
                    <span className={cn('text-xs px-2 py-0.5 rounded-full font-medium', TYPE_COLOR[c.type])}>{c.type}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      ) : (
        /* Accordion tree */
        <div className="space-y-2">
          {[1,2,3,4,5,6,7,8].map(classe => {
            const classData = grouped.get(classe)
            if (!classData) return null
            const classOpen = openClasses.has(String(classe))
            const totalInClass = Array.from(classData.values()).reduce(
              (s, m) => s + Array.from(m.values()).reduce((ss, arr) => ss + arr.length, 0), 0
            )

            return (
              <Card key={classe} className="border-border overflow-hidden">
                <button
                  className={cn(
                    'w-full flex items-center gap-3 p-4 text-left transition-colors hover:bg-muted/30',
                    classOpen && 'bg-primary text-primary-foreground hover:bg-primary/90'
                  )}
                  onClick={() => setOpenClasses(toggle(openClasses, String(classe)))}
                >
                  {classOpen
                    ? <ChevronDown className="h-5 w-5 flex-shrink-0" />
                    : <ChevronRight className="h-5 w-5 flex-shrink-0" />
                  }
                  <span className="font-bold text-base">Classe {classe}</span>
                  <span className="flex-1 font-medium text-sm">{CLASS_NAMES[classe]}</span>
                  <Badge variant="outline" className={cn('text-xs', classOpen ? 'border-primary-foreground/50 text-primary-foreground' : '')}>
                    {totalInClass} comptes
                  </Badge>
                </button>

                {classOpen && (
                  <CardContent className="pt-0 pb-2 px-0">
                    {Array.from(classData.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([twoDigit, threeMap]) => {
                      const sectionOpen = openSections.has(twoDigit)
                      const sectionCount = Array.from(threeMap.values()).reduce((s, arr) => s + arr.length, 0)
                      const firstCompte = Array.from(threeMap.values())[0]?.[0]

                      return (
                        <div key={twoDigit} className="border-t border-border/50">
                          <button
                            className="w-full flex items-center gap-3 px-6 py-2.5 text-left hover:bg-muted/20 transition-colors"
                            onClick={() => setOpenSections(toggle(openSections, twoDigit))}
                          >
                            {sectionOpen
                              ? <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                              : <ChevronRight className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            }
                            <span className="font-mono font-semibold text-primary text-sm w-12 shrink-0">{twoDigit}</span>
                            <span className="flex-1 text-sm font-medium truncate">
                              {firstCompte?.intitule?.split('–')[0]?.split('-')[0]?.trim() || `Comptes ${twoDigit}`}
                            </span>
                            <span className="text-xs text-muted-foreground">{sectionCount}</span>
                          </button>

                          {sectionOpen && (
                            <div>
                              {Array.from(threeMap.entries()).sort(([a], [b]) => a.localeCompare(b)).map(([threeDigit, accounts]) => {
                                const subOpen = openSubSections.has(threeDigit)
                                const firstAcc = accounts[0]
                                const subAccounts = accounts.filter(a => a.numero.length > 3)

                                return (
                                  <div key={threeDigit} className="border-t border-border/30">
                                    <button
                                      className="w-full flex items-center gap-3 px-10 py-2 text-left hover:bg-muted/10 transition-colors"
                                      onClick={() => setOpenSubSections(toggle(openSubSections, threeDigit))}
                                    >
                                      {subAccounts.length > 0
                                        ? (subOpen
                                          ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                                          : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground flex-shrink-0" />
                                        )
                                        : <span className="w-3.5 h-3.5 flex-shrink-0" />
                                      }
                                      <span className="font-mono font-medium text-primary text-xs w-12 shrink-0">{threeDigit}</span>
                                      <span className="flex-1 text-xs truncate">{firstAcc?.intitule || threeDigit}</span>
                                      <span className={cn('text-xs px-1.5 py-0.5 rounded-full', TYPE_COLOR[firstAcc?.type || 'autre'])}>{firstAcc?.type}</span>
                                    </button>

                                    {subOpen && subAccounts.length > 0 && (
                                      <div className="bg-muted/10">
                                        {subAccounts.map(acc => (
                                          <div key={acc.numero} className="flex items-center gap-3 px-14 py-1.5 border-t border-border/20">
                                            <span className="font-mono text-primary text-xs w-14 shrink-0">{acc.numero}</span>
                                            <span className="flex-1 text-xs text-muted-foreground">{acc.intitule}</span>
                                            <span className={cn('text-xs px-1.5 py-0.5 rounded-full', TYPE_COLOR[acc.type])}>{acc.type}</span>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </div>
                                )
                              })}
                            </div>
                          )}
                        </div>
                      )
                    })}
                  </CardContent>
                )}
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
