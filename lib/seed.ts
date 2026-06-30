/**
 * Seed script — Popola il database Turso con i tipi di biglietto ufficiali.
 *
 * Esecuzione:
 *   npx tsx lib/seed.ts
 *
 * Requisiti: TURSO_DATABASE_URL e TURSO_AUTH_TOKEN nel file .env.local
 */
import { loadEnvConfig } from '@next/env'
import { eq } from 'drizzle-orm'

// Carica .env.local prima di tutto
loadEnvConfig(process.cwd())

// Le import dei moduli DB devono avvenire DOPO loadEnvConfig
const { db }          = await import('./db.js')
const { ticketTypes } = await import('./schema.js')

const TICKET_TYPES = [
  {
    id:          'pass-competitore',
    nome:        'Pass Competitore',
    prezzo:      290.00,
    maxQuantity: 120,
  },
  {
    id:          'pass-visitatore',
    nome:        'Pass Visitatore',
    prezzo:      45.00,
    maxQuantity: 500,
  },
]

async function seed() {
  console.log('🌱  Avvio seeding database Turso…\n')

  for (const tt of TICKET_TYPES) {
    // Check if already exists
    const [existing] = await db
      .select({ id: ticketTypes.id, quantitySold: ticketTypes.quantitySold })
      .from(ticketTypes)
      .where(eq(ticketTypes.id, tt.id))

    if (existing) {
      console.log(`  ⏭  [SKIP] "${tt.nome}" già presente (quantitySold: ${existing.quantitySold})`)
      continue
    }

    await db.insert(ticketTypes).values({
      id:          tt.id,
      nome:        tt.nome,
      prezzo:      tt.prezzo,
      maxQuantity: tt.maxQuantity,
      quantitySold: 0,
    })

    console.log(`  ✅  [OK]   "${tt.nome}" — €${tt.prezzo} — max ${tt.maxQuantity} posti`)
  }

  console.log('\n✨  Seeding completato.\n')
  process.exit(0)
}

seed().catch((err) => {
  console.error('❌  Errore durante il seeding:', err)
  process.exit(1)
})
