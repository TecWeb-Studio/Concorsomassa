/**
 * Seed script — Popola il database Turso con le categorie ufficiali del campionato.
 *
 * Esecuzione:
 *   npx tsx lib/seed.ts
 *
 * Requisiti: TURSO_DATABASE_URL e TURSO_AUTH_TOKEN nel file .env.local
 */
import { loadEnvConfig } from '@next/env'
import { eq } from 'drizzle-orm'

loadEnvConfig(process.cwd())

const { db }                    = await import('./db.js')
const { categorieCompetizione } = await import('./schema.js')

const CATEGORIE = [
  {
    id:                 'massaggio-tecnico-sportivo',
    nome:               'Massaggio Tecnico Sportivo',
    slug:               'massaggio-tecnico-sportivo',
    descrizione:        'Categoria dedicata alle tecniche manuali applicate al contesto sportivo, con attenzione a valutazione funzionale, preparazione muscolare, scarico e recupero.',
    chiPuoIscriversi:   'Massaggiatori sportivi, operatori del benessere, fisioterapisti, studenti avanzati con formazione in massaggio sportivo. Età minima: 18 anni.',
    durataProva:        '25 minuti di prova + 5 minuti tecnici',
    criteriValutazione: JSON.stringify(['Precisione tecnica', 'Scelta delle manovre', 'Ergonomia', 'Efficacia percepita', 'Sicurezza', 'Comunicazione', 'Igiene e gestione del tempo']),
    premioOro:          500, premioArgento: 300, premioBronzo: 150,
    prezzoIscrizione:   120, postiDisponibili: 30, ordine: 1,
  },
  {
    id:                 'kirei-kobido',
    nome:               'Kirei Kobido',
    slug:               'kirei-kobido',
    descrizione:        'Categoria dedicata al trattamento viso di ispirazione Kobido/Kirei, con focus su manualità, ritmo, delicatezza, sequenza, precisione e qualità dell\'esperienza per il ricevente.',
    chiPuoIscriversi:   'Operatori formati in tecniche viso, Kobido, Kirei, estetica avanzata o massaggio facciale con conoscenza delle controindicazioni.',
    durataProva:        '25 minuti di prova + 5 minuti setup',
    criteriValutazione: JSON.stringify(['Fluidità', 'Ritmo', 'Precisione delle manovre', 'Postura', 'Delicatezza', 'Continuità', 'Comfort del ricevente', 'Igiene']),
    premioOro:          500, premioArgento: 300, premioBronzo: 150,
    prezzoIscrizione:   120, postiDisponibili: 30, ordine: 2,
  },
  {
    id:                 'massaggio-thai',
    nome:               'Massaggio Thai',
    slug:               'massaggio-thai',
    descrizione:        'Categoria dedicata al massaggio Thai con tecniche di pressione, mobilizzazione e stretching assistito, con attenzione a sicurezza, controllo del corpo e fluidità.',
    chiPuoIscriversi:   'Operatori con formazione specifica in Thai massage o discipline corporee compatibili con conoscenza delle controindicazioni.',
    durataProva:        '30 minuti di prova + 5 minuti tecnici',
    criteriValutazione: JSON.stringify(['Sequenza', 'Postura', 'Controllo della pressione', 'Sicurezza degli allungamenti', 'Fluidità', 'Ascolto del ricevente', 'Igiene']),
    premioOro:          500, premioArgento: 300, premioBronzo: 150,
    prezzoIscrizione:   120, postiDisponibili: 30, ordine: 3,
  },
  {
    id:                 'massaggio-olistico',
    nome:               'Massaggio Olistico',
    slug:               'massaggio-olistico',
    descrizione:        'Categoria dedicata a trattamenti orientati al benessere globale, con integrazione di tecniche rilassanti, riequilibranti o energetiche, mantenendo standard professionali.',
    chiPuoIscriversi:   'Operatori olistici, massaggiatori del benessere, estetisti, professionisti o studenti avanzati con formazione in tecniche manuali non sanitarie.',
    durataProva:        '30 minuti di prova',
    criteriValutazione: JSON.stringify(['Coerenza del trattamento', 'Qualità del contatto', 'Ritmo', 'Ascolto', 'Gestione ambiente', 'Comfort', 'Igiene', 'Postura']),
    premioOro:          500, premioArgento: 300, premioBronzo: 150,
    prezzoIscrizione:   120, postiDisponibili: 30, ordine: 4,
  },
  {
    id:                 'massaggio-freestyle',
    nome:               'Massaggio Freestyle',
    slug:               'massaggio-freestyle',
    descrizione:        'Categoria libera dedicata alla capacità di costruire un trattamento originale, coerente e sicuro, combinando tecniche diverse in una performance professionale.',
    chiPuoIscriversi:   'Professionisti e studenti avanzati. Le tecniche devono restare sicure, non invasive e compatibili con il regolamento.',
    durataProva:        '30 minuti di prova',
    criteriValutazione: JSON.stringify(['Originalità', 'Coerenza della sequenza', 'Qualità tecnica', 'Sicurezza', 'Comunicazione', 'Gestione del tempo', 'Esperienza del ricevente', 'Presentazione']),
    premioOro:          500, premioArgento: 300, premioBronzo: 150,
    prezzoIscrizione:   120, postiDisponibili: 30, ordine: 5,
  },
]

async function seed() {
  console.log('🌱  Avvio seeding database Turso…\n')

  for (const cat of CATEGORIE) {
    const [existing] = await db
      .select({ id: categorieCompetizione.id })
      .from(categorieCompetizione)
      .where(eq(categorieCompetizione.id, cat.id))

    if (existing) {
      console.log(`  ⏭  [SKIP] "${cat.nome}" già presente`)
      continue
    }

    await db.insert(categorieCompetizione).values(cat)
    console.log(`  ✅  [OK]   "${cat.nome}" — €${cat.prezzoIscrizione} — max ${cat.postiDisponibili} posti`)
  }

  console.log('\n✨  Seeding completato.\n')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌  Seeding fallito:', err)
  process.exit(1)
})
