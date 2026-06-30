import { eq, sql } from 'drizzle-orm'
import { type NextRequest } from 'next/server'
import { randomUUID } from 'node:crypto'
import { db } from '@/lib/db'
import { orders, ticketTypes, users } from '@/lib/schema'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface CheckoutRequestBody {
  // Dati anagrafici (necessari per creare/trovare l'utente)
  nome:        string
  cognome:     string
  email:       string
  telefono:    string
  // Dati ordine
  ticketTypeId: string
  quantity:    number
  // Solo per Pass Competitore
  categoria?:  string
}

// ---------------------------------------------------------------------------
// POST /api/checkout
//
// Crea un utente (o recupera l'esistente via email) e un ordine PENDING
// con lock atomico sui biglietti disponibili.
// Usa una transazione Drizzle (db.transaction()) per garantire atomicità
// ed evitare overselling su Turso/LibSQL.
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  let body: CheckoutRequestBody

  try {
    body = (await request.json()) as CheckoutRequestBody
  } catch {
    return Response.json(
      { error: 'Corpo della richiesta non valido (JSON malformato)' },
      { status: 400 }
    )
  }

  const { nome, cognome, email, telefono, ticketTypeId, quantity, categoria } = body

  // Validazione input base
  if (!nome || !cognome || !email || !telefono || !ticketTypeId || !quantity) {
    return Response.json(
      { error: 'Tutti i campi obbligatori devono essere compilati' },
      { status: 400 }
    )
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return Response.json(
      { error: 'quantity deve essere un intero >= 1' },
      { status: 400 }
    )
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json(
      { error: 'Indirizzo email non valido' },
      { status: 400 }
    )
  }

  try {
    // -----------------------------------------------------------------------
    // TRANSAZIONE ATOMICA
    // Drizzle esegue BEGIN / COMMIT / ROLLBACK attorno al callback.
    // Se il callback lancia, la transazione fa automaticamente ROLLBACK.
    // -----------------------------------------------------------------------
    const result = await db.transaction(async (tx) => {
      // 1. Leggi il ticket_type con un lock FOR UPDATE emulato:
      //    su SQLite/Turso il lock è implicito nella transazione serializzabile.
      const [ticketType] = await tx
        .select()
        .from(ticketTypes)
        .where(eq(ticketTypes.id, ticketTypeId))

      if (!ticketType) {
        throw new CheckoutError('Tipo biglietto non trovato', 404)
      }

      // 2. Verifica disponibilità
      const available = ticketType.maxQuantity - ticketType.quantitySold
      if (available < quantity) {
        throw new CheckoutError(
          available === 0
            ? 'Ci dispiace, i biglietti per questa categoria si sono appena esauriti.'
            : `Disponibilità insufficiente. Rimasti solo ${available} posto${available === 1 ? '' : 'i'}.`,
          409
        )
      }

      // 3. Trova o crea l'utente tramite email (unica chiave identificativa)
      const [existingUser] = await tx
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, email.toLowerCase().trim()))

      let userId: string
      if (existingUser) {
        userId = existingUser.id
      } else {
        userId = randomUUID()
        await tx.insert(users).values({
          id:    userId,
          nome:  `${nome.trim()} ${cognome.trim()}`,
          email: email.toLowerCase().trim(),
        })
      }

      // 4. Calcola totale e scadenza (15 minuti da ora)
      const totalPrice = ticketType.prezzo * quantity
      const expiresAt  = new Date(Date.now() + 15 * 60 * 1000)
      const orderId    = randomUUID()

      // 5. Inserisci l'ordine in stato PENDING
      await tx.insert(orders).values({
        id: orderId,
        userId,
        status: 'PENDING',
        totalPrice,
        expiresAt,
      })

      // 6. Incrementa quantity_sold per bloccare i posti (lock ottimistico).
      //    Se un altro writer concorrente ha già aggiornato la riga,
      //    la transazione serializzabile di Turso rileverà il conflitto
      //    e farà rollback automaticamente.
      await tx
        .update(ticketTypes)
        .set({
          quantitySold: sql`${ticketTypes.quantitySold} + ${quantity}`,
        })
        .where(eq(ticketTypes.id, ticketTypeId))

      return {
        orderId,
        status: 'PENDING' as const,
        totalPrice,
        expiresAt:  expiresAt.toISOString(),
        ticketType: {
          id:     ticketType.id,
          nome:   ticketType.nome,
          prezzo: ticketType.prezzo,
        },
        quantity,
        categoria: categoria ?? null,
        cliente:   { nome: nome.trim(), cognome: cognome.trim(), email: email.toLowerCase().trim() },
      }
    })

    // -----------------------------------------------------------------------
    // Risposta di successo
    // -----------------------------------------------------------------------
    return Response.json(
      {
        message:
          'Ordine creato. Completa il pagamento entro 15 minuti o il posto sarà rilasciato.',
        data: result,
      },
      { status: 201 }
    )
  } catch (err) {
    if (err instanceof CheckoutError) {
      return Response.json({ error: err.message }, { status: err.statusCode })
    }

    console.error('[checkout] Errore transazione:', err)
    return Response.json(
      { error: 'Errore interno del server. Riprova tra qualche istante.' },
      { status: 500 }
    )
  }
}

// ---------------------------------------------------------------------------
// Helper: errore tipizzato con HTTP status code
// ---------------------------------------------------------------------------
class CheckoutError extends Error {
  constructor(
    message: string,
    public readonly statusCode: number
  ) {
    super(message)
    this.name = 'CheckoutError'
  }
}
