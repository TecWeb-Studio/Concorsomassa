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
  email: text('email').notNull().unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// ---------------------------------------------------------------------------
// ticket_types  (es. "Competitore", "Ospite", "VIP")
// ---------------------------------------------------------------------------
export const ticketTypes = sqliteTable('ticket_types', {
  id: text('id').primaryKey(),
  nome: text('nome').notNull(),
  prezzo: real('prezzo').notNull(),         // prezzo in euro
  maxQuantity: integer('max_quantity').notNull(),
  quantitySold: integer('quantity_sold').notNull().default(0),
})

// ---------------------------------------------------------------------------
// orders
// ---------------------------------------------------------------------------
export const orderStatusEnum = ['PENDING', 'COMPLETED', 'FAILED'] as const
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
  // expires_at: UNIX timestamp (secondi). Lock di 15 minuti dal momento della
  // creazione dell'ordine; scade se il pagamento non viene completato.
  expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// ---------------------------------------------------------------------------
// tickets  (generati SOLO quando l'ordine passa a COMPLETED)
// ---------------------------------------------------------------------------
export const tickets = sqliteTable('tickets', {
  id: text('id').primaryKey(),
  orderId: text('order_id')
    .notNull()
    .references(() => orders.id),
  ticketTypeId: text('ticket_type_id')
    .notNull()
    .references(() => ticketTypes.id),
  // Numero seriale univoco assegnato al momento della conferma del pagamento.
  // NULL finché l'ordine non è COMPLETED.
  ticketNumber: integer('ticket_number').unique(),
  createdAt: integer('created_at', { mode: 'timestamp' })
    .notNull()
    .default(sql`(unixepoch())`),
})

// ---------------------------------------------------------------------------
// TypeScript inferred types
// ---------------------------------------------------------------------------
export type User = typeof users.$inferSelect
export type NewUser = typeof users.$inferInsert

export type TicketType = typeof ticketTypes.$inferSelect
export type NewTicketType = typeof ticketTypes.$inferInsert

export type Order = typeof orders.$inferSelect
export type NewOrder = typeof orders.$inferInsert

export type Ticket = typeof tickets.$inferSelect
export type NewTicket = typeof tickets.$inferInsert
