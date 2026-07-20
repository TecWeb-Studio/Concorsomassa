import { sql } from 'drizzle-orm'
import {
  integer,
  real,
  sqliteTable,
  text,
} from 'drizzle-orm/sqlite-core'

// ---------------------------------------------------------------------------
// users
// ---------------------------------------------------------------------------
export const users = sqliteTable('users', {
  id: text('id').primaryKey(),
  nome: text('nome').notNull(),
  cognome: text('cognome').notNull().default(''),
  email: text('email').notNull().unique(),
  telefono: text('telefono').notNull().default(''),
  professione: text('professione').notNull().default(''),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// ---------------------------------------------------------------------------
// categorie_competizione  — le 5 discipline del campionato
// ---------------------------------------------------------------------------
export const categorieCompetizione = sqliteTable('categorie_competizione', {
  id: text('id').primaryKey(),
  nome: text('nome').notNull(),
  slug: text('slug').notNull().unique(),
  descrizione: text('descrizione').notNull().default(''),
  chiPuoIscriversi: text('chi_puo_iscriversi').notNull().default(''),
  durataProva: text('durata_prova').notNull().default(''),
  criteriValutazione: text('criteri_valutazione').notNull().default(''),  // JSON array as text
  premioOro: real('premio_oro').notNull().default(0),
  premioArgento: real('premio_argento').notNull().default(0),
  premioBronzo: real('premio_bronzo').notNull().default(0),
  prezzoIscrizione: real('prezzo_iscrizione').notNull(),
  postiDisponibili: integer('posti_disponibili').notNull(),
  postiOccupati: integer('posti_occupati').notNull().default(0),
  attivo: integer('attivo', { mode: 'boolean' }).notNull().default(true),
  ordine: integer('ordine').notNull().default(0),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// ---------------------------------------------------------------------------
// orders
// ---------------------------------------------------------------------------
export const orderStatusEnum = ['PENDING', 'COMPLETED', 'FAILED', 'EXPIRED'] as const
export type OrderStatus = (typeof orderStatusEnum)[number]

export const orders = sqliteTable('orders', {
  id: text('id').primaryKey(),
  userId: text('user_id')
    .notNull()
    .references(() => users.id),
  status: text('status', { enum: orderStatusEnum })
    .notNull()
    .default('PENDING'),
  totalPrice: real('total_price').notNull(),
  // Stripe Checkout Session ID — usato per riconciliare il webhook
  stripeSessionId: text('stripe_session_id'),
  // Stripe Payment Intent ID — disponibile dopo payment_intent.succeeded
  stripePaymentIntentId: text('stripe_payment_intent_id'),
  // expires_at: UNIX timestamp. Lock di 30 minuti per completare il pagamento.
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// ---------------------------------------------------------------------------
// iscrizioni_categorie  — linee d'ordine: una per ogni categoria selezionata
// Vengono create insieme all'ordine (PENDING) e materializzano l'iscrizione
// definitiva quando l'ordine passa a COMPLETED.
// ---------------------------------------------------------------------------
export const iscrizioniCategorie = sqliteTable('iscrizioni_categorie', {
  id: text('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id),
  categoriaId: text('categoria_id')
    .notNull()
    .references(() => categorieCompetizione.id),
  // Prezzo bloccato al momento della creazione dell'ordine
  prezzoBloccato: real('prezzo_bloccato').notNull(),
  // Numero iscrizione univoco — assegnato SOLO quando l'ordine diventa COMPLETED
  numeroIscrizione: integer('numero_iscrizione').unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// ---------------------------------------------------------------------------
// TypeScript inferred types
// ---------------------------------------------------------------------------
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type CategoriaCompetizione = typeof categorieCompetizione.$inferSelect
export type NewCategoriaCompetizione = typeof categorieCompetizione.$inferInsert

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert

export type IscrizioneCategoria = typeof iscrizioniCategorie.$inferSelect
export type NewIscrizioneCategoria = typeof iscrizioniCategorie.$inferInsert
