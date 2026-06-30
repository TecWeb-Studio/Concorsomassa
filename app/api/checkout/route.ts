import { eq, sql } from 'drizzle-orm'
import { type NextRequest } from 'next/server'
import { randomUUID } from 'node:crypto'
import { db } from '@/lib/db'
import { orders, ticketTypes } from '@/lib/schema'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface CheckoutRequestBody {
  userId: string
  ticketTypeId: string
  quantity: number
}

// ---------------------------------------------------------------------------
// POST /api/checkout
//
// Crea un ordine PENDING con lock atomico sui biglietti disponibili.
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

  const { userId, ticketTypeId, quantity } = body

  // Validazione input base
  if (!userId || !ticketTypeId || !quantity) {
    return Response.json(
      { error: 'userId, ticketTypeId e quantity sono obbligatori' },
      { status: 400 }
    )
  }
  if (!Number.isInteger(quantity) || quantity < 1) {
    return Response.json(
      { error: 'quantity deve essere un intero >= 1' },
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
          `Disponibilità insufficiente. Rimasti: ${available}`,
          409
        )
      }

      // 3. Calcola totale e scadenza (15 minuti da ora)
      const totalPrice = ticketType.prezzo * quantity
      const expiresAt = new Date(Date.now() + 15 * 60 * 1000)
      const orderId = randomUUID()

      // 4. Inserisci l'ordine in stato PENDING
      await tx.insert(orders).values({
        id: orderId,
        userId,
        status: 'PENDING',
        totalPrice,
        expiresAt,
      })

      // 5. Incrementa quantity_sold per bloccare i posti (lock ottimistico).
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
        status: 'PENDING',
        totalPrice,
        expiresAt: expiresAt.toISOString(),
        ticketType: {
          id: ticketType.id,
          nome: ticketType.nome,
          prezzo: ticketType.prezzo,
        },
        quantity,
      }
    })

    // -----------------------------------------------------------------------
    // Risposta di successo
    // -----------------------------------------------------------------------
    return Response.json(
      {
        message:
          "Ordine creato. Completa il pagamento entro 15 minuti o il posto sarà rilasciato.",
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
      { error: 'Errore interno del server' },
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
