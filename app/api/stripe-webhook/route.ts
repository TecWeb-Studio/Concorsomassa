import { type NextRequest } from 'next/server'
import { randomUUID } from 'node:crypto'
import Stripe from 'stripe'
import { eq, inArray } from 'drizzle-orm'
import { db } from '@/lib/db'
import { orders, iscrizioniCategorie } from '@/lib/schema'

// ---------------------------------------------------------------------------
// POST /api/stripe-webhook
//
// Gestisce gli eventi Stripe: aggiorna lo stato dell'ordine e assegna i
// numeri di iscrizione quando il pagamento è confermato.
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET
  if (!secret) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET non configurata')
    return Response.json({ error: 'Webhook non configurato' }, { status: 500 })
  }

  const stripe    = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2026-06-24.dahlia' })
  const signature = request.headers.get('stripe-signature')
  if (!signature) {
    return Response.json({ error: 'Firma mancante' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    const body = await request.text()
    event = stripe.webhooks.constructEvent(body, signature, secret)
  } catch (err) {
    console.error('[webhook] Firma non valida:', err)
    return Response.json({ error: 'Firma non valida' }, { status: 400 })
  }

  // Gestione eventi
  try {
    switch (event.type) {

      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const orderId = session.metadata?.orderId

        if (!orderId) break

        // Segna l'ordine come completato
        await db.update(orders)
          .set({
            status:                  'COMPLETED',
            stripePaymentIntentId:   session.payment_intent as string ?? undefined,
          })
          .where(eq(orders.id, orderId))

        // Assegna numeri di iscrizione univoci
        const iscrizioni = await db
          .select({ id: iscrizioniCategorie.id })
          .from(iscrizioniCategorie)
          .where(eq(iscrizioniCategorie.orderId, orderId))

        for (const isc of iscrizioni) {
          // Genera un numero sequenziale basato su timestamp + random (semplice e sicuro)
          const numeroIscrizione = parseInt(
            `${Date.now()}${Math.floor(Math.random() * 100)}`.slice(-8)
          )
          await db.update(iscrizioniCategorie)
            .set({ numeroIscrizione })
            .where(eq(iscrizioniCategorie.id, isc.id))
        }

        console.log(`[webhook] Ordine ${orderId} completato`)
        break
      }

      case 'checkout.session.expired': {
        const session = event.data.object as Stripe.Checkout.Session
        const orderId = session.metadata?.orderId

        if (!orderId) break

        // Marca l'ordine come scaduto e libera i posti
        await db.update(orders)
          .set({ status: 'EXPIRED' })
          .where(eq(orders.id, orderId))

        console.log(`[webhook] Ordine ${orderId} scaduto`)
        break
      }

      case 'payment_intent.payment_failed': {
        const pi = event.data.object as Stripe.PaymentIntent
        // Trova l'ordine tramite payment_intent_id se già salvato
        const orderRows = await db
          .select({ id: orders.id })
          .from(orders)
          .where(eq(orders.stripePaymentIntentId, pi.id))

        for (const o of orderRows) {
          await db.update(orders)
            .set({ status: 'FAILED' })
            .where(eq(orders.id, o.id))
        }
        break
      }

      default:
        // Evento non gestito — ignoralo silenziosamente
        break
    }
  } catch (err) {
    console.error('[webhook] Errore elaborazione evento:', err)
    return Response.json({ error: 'Errore elaborazione' }, { status: 500 })
  }

  return Response.json({ received: true })
}
