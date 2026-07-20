// ---------------------------------------------------------------------------
// Configurazione statica delle 5 categorie di competizione
// Usata nei componenti UI e nella validazione del checkout
// ---------------------------------------------------------------------------

export interface CategoriaConfig {
  id:                string
  nome:              string
  slug:              string
  descrizione:       string
  chiPuoIscriversi:  string
  durataProva:       string
  criteri:           string[]
  premioOro:         number
  premioArgento:     number
  premioBronzo:      number
  prezzoIscrizione:  number
  postiDisponibili:  number
  icona:             string          // emoji o identificatore
}

export const CATEGORIE_CONFIG: Record<string, CategoriaConfig> = {
  'massaggio-tecnico-sportivo': {
    id:               'massaggio-tecnico-sportivo',
    nome:             'Massaggio Tecnico Sportivo',
    slug:             'massaggio-tecnico-sportivo',
    descrizione:      'Tecniche manuali applicate al contesto sportivo: preparazione muscolare, scarico e recupero con standard professionali e sicurezza.',
    chiPuoIscriversi: 'Massaggiatori sportivi, operatori del benessere, fisioterapisti, studenti avanzati con formazione documentabile. Età minima 18 anni.',
    durataProva:      '25 min + 5 min tecnici',
    criteri:          ['Precisione tecnica', 'Scelta delle manovre', 'Ergonomia', 'Efficacia percepita', 'Sicurezza', 'Comunicazione', 'Igiene'],
    premioOro:        500,
    premioArgento:    300,
    premioBronzo:     150,
    prezzoIscrizione: 120,
    postiDisponibili: 30,
    icona:            '🏃',
  },
  'kirei-kobido': {
    id:               'kirei-kobido',
    nome:             'Kirei Kobido',
    slug:             'kirei-kobido',
    descrizione:      'Trattamento viso di ispirazione Kobido/Kirei con focus su manualità, ritmo, delicatezza e qualità dell\'esperienza per il ricevente.',
    chiPuoIscriversi: 'Operatori formati in Kobido, Kirei, estetica avanzata o massaggio facciale con conoscenza delle controindicazioni.',
    durataProva:      '25 min + 5 min setup',
    criteri:          ['Fluidità', 'Ritmo', 'Precisione', 'Postura', 'Delicatezza', 'Continuità', 'Comfort del ricevente', 'Igiene'],
    premioOro:        500,
    premioArgento:    300,
    premioBronzo:     150,
    prezzoIscrizione: 120,
    postiDisponibili: 30,
    icona:            '✨',
  },
  'massaggio-thai': {
    id:               'massaggio-thai',
    nome:             'Massaggio Thai',
    slug:             'massaggio-thai',
    descrizione:      'Pressione, mobilizzazione e stretching assistito in una sequenza fluida che esprime controllo del corpo, sicurezza e maestria tecnica.',
    chiPuoIscriversi: 'Operatori con formazione specifica in Thai massage o discipline corporee compatibili con conoscenza delle controindicazioni.',
    durataProva:      '30 min + 5 min tecnici',
    criteri:          ['Sequenza', 'Postura', 'Controllo pressione', 'Sicurezza allungamenti', 'Fluidità', 'Ascolto', 'Igiene'],
    premioOro:        500,
    premioArgento:    300,
    premioBronzo:     150,
    prezzoIscrizione: 120,
    postiDisponibili: 30,
    icona:            '🙏',
  },
  'massaggio-olistico': {
    id:               'massaggio-olistico',
    nome:             'Massaggio Olistico',
    slug:             'massaggio-olistico',
    descrizione:      'Trattamenti orientati al benessere globale con integrazione di tecniche rilassanti, riequilibranti o energetiche nel rispetto degli standard professionali.',
    chiPuoIscriversi: 'Operatori olistici, massaggiatori del benessere, estetisti e studenti avanzati con formazione in tecniche manuali non sanitarie.',
    durataProva:      '30 min',
    criteri:          ['Coerenza trattamento', 'Qualità del contatto', 'Ritmo', 'Ascolto', 'Gestione ambiente', 'Comfort', 'Igiene', 'Postura'],
    premioOro:        500,
    premioArgento:    300,
    premioBronzo:     150,
    prezzoIscrizione: 120,
    postiDisponibili: 30,
    icona:            '🌿',
  },
  'massaggio-freestyle': {
    id:               'massaggio-freestyle',
    nome:             'Massaggio Freestyle',
    slug:             'massaggio-freestyle',
    descrizione:      'Categoria libera: costruisci un trattamento originale e sicuro combinando tecniche diverse in una performance professionale e riconoscibile.',
    chiPuoIscriversi: 'Professionisti e studenti avanzati. Le tecniche devono essere sicure, non invasive e compatibili con il regolamento.',
    durataProva:      '30 min',
    criteri:          ['Originalità', 'Coerenza', 'Qualità tecnica', 'Sicurezza', 'Comunicazione', 'Gestione del tempo', 'Esperienza ricevente', 'Presentazione'],
    premioOro:        500,
    premioArgento:    300,
    premioBronzo:     150,
    prezzoIscrizione: 120,
    postiDisponibili: 30,
    icona:            '⭐',
  },
}

export const CATEGORIE_ORDER: string[] = [
  'massaggio-tecnico-sportivo',
  'kirei-kobido',
  'massaggio-thai',
  'massaggio-olistico',
  'massaggio-freestyle',
]

// Prezzo categoria aggiuntiva (sconto multi-categoria)
export const PREZZO_CATEGORIA_EXTRA = 90  // invece di 120

// Calcola il totale in base alle categorie selezionate
export function calcolaTotale(categorieSelezionate: string[]): number {
  if (categorieSelezionate.length === 0) return 0
  const prima = CATEGORIE_CONFIG[categorieSelezionate[0]]?.prezzoIscrizione ?? 120
  const extra = (categorieSelezionate.length - 1) * PREZZO_CATEGORIA_EXTRA
  return prima + extra
}

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
