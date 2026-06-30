// ---------------------------------------------------------------------------
// Configurazione condivisa dei tipi di biglietto
// Usata sia dalla pagina /tickets sia dalla pagina /checkout
// ---------------------------------------------------------------------------

export interface PassConfig {
  id:               string
  nome:             string
  sottotitolo:      string
  prezzo:           number
  badge:            string
  badgeVariant:     'gold' | 'sage'
  features:         string[]
  disponibilita:    string
  disponibilitaTipo: 'limitata' | 'buona'
  featured:         boolean
  ctaLabel:         string
  categorie?:       string[]   // Solo per Pass Competitore
}

export const PASS_CONFIG: Record<string, PassConfig> = {
  'pass-competitore': {
    id:              'pass-competitore',
    nome:            'Pass Competitore',
    sottotitolo:     'Per i professionisti del benessere',
    prezzo:          290,
    badge:           'Professionale',
    badgeVariant:    'gold',
    featured:        true,
    ctaLabel:        'Seleziona e Competi',
    disponibilita:   'Posti limitati — 120 totali',
    disponibilitaTipo: 'limitata',
    features: [
      'Iscrizione ufficiale alla competizione',
      'Badge nominale e kit concorrente CIM 2026',
      'Accesso completo ai 2 giorni (14–15 Giugno)',
      'Partecipazione alla categoria selezionata',
      'Cena di gala ufficiale (14 Giugno)',
      'Attestato e diploma di partecipazione',
    ],
    categorie: [
      'Massaggio Svedese',
      'Massaggio Orientale',
      'Deep Tissue',
      'Massaggio Freestyle',
    ],
  },
  'pass-visitatore': {
    id:              'pass-visitatore',
    nome:            'Pass Visitatore',
    sottotitolo:     'Aperto a tutti gli appassionati',
    prezzo:          45,
    badge:           'Ospite',
    badgeVariant:    'sage',
    featured:        false,
    ctaLabel:        'Seleziona e Visita',
    disponibilita:   'Ampia disponibilità',
    disponibilitaTipo: 'buona',
    features: [
      'Accesso ai 2 giorni di competizione',
      'Badge visitatore ufficiale',
      'Programma cartaceo dell\'evento',
      'Sessioni dimostrative esclusive',
      'Area benessere & networking',
    ],
  },
}

export const PASS_ORDER: string[] = ['pass-competitore', 'pass-visitatore']

// Calcola imponibile e IVA dal prezzo IVA inclusa (22%)
export function calcolaImponibile(prezzoIvaInclusa: number) {
  const imponibile = prezzoIvaInclusa / 1.22
  const iva        = prezzoIvaInclusa - imponibile
  return {
    imponibile: Math.round(imponibile * 100) / 100,
    iva:        Math.round(iva * 100) / 100,
    totale:     prezzoIvaInclusa,
  }
}
