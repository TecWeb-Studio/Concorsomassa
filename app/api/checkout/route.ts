import { eq, sql, inArray } from 'drizzle-orm'
import { type NextRequest } from 'next/server'
import { randomUUID } from 'node:crypto'
import Stripe from 'stripe'
import { db } from '@/lib/db'
import { orders, users, categorieCompetizione, iscrizioniCategorie } from '@/lib/schema'
import { calcolaTotale } from '@/lib/ticket-config'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface CheckoutRequestBody {
  nome:        string
  cognome:     string
  email:       string
  telefono:    string
  professione: string
  categorie:   string[]   // array di ID categorie
}

// ---------------------------------------------------------------------------
// Stripe client (lazy init per evitare errori in assenza di chiave)
// ---------------------------------------------------------------------------
function getStripe() {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY non configurata')
  return new Stripe(key, { apiVersion: '2026-06-24.dahlia' })
}

// ---------------------------------------------------------------------------
// POST /api/checkout
// ---------------------------------------------------------------------------
export async function POST(request: NextRequest) {
  let body: CheckoutRequestBody

  try {
    body = (await request.json()) as CheckoutRequestBody
  } catch {
    return Response.json({ error: 'JSON malformato' }, { status: 400 })
  }

  const { nome, cognome, email, telefono, professione, categorie } = body

  // Validazione input
  if (!nome?.trim() || !cognome?.trim() || !email?.trim() || !telefono?.trim()) {
    return Response.json({ error: 'Tutti i campi obbligatori devono essere compilati' }, { status: 400 })
  }
  if (!Array.isArray(categorie) || categorie.length === 0) {
    return Response.json({ error: 'Seleziona almeno una categoria' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Indirizzo email non valido' }, { status: 400 })
  }

  try {
    const result = await db.transaction(async (tx) => {

      // 1. Verifica che tutte le categorie esistano e abbiano posti disponibili
      const cats = await tx
        .select()
        .from(categorieCompetizione)
        .where(inArray(categorieCompetizione.id, categorie))

      if (cats.length !== categorie.length) {
        throw new Error('Una o più categorie non trovate')
      }

      for (const cat of cats) {
        const disponibili = cat.postiDisponibili - cat.postiOccupati
        if (disponibili <= 0) {
          throw new Error(`La categoria "${cat.nome}" è esaurita. Scegli un'altra disciplina.`)
        }
      }

      // 2. Trova o crea l'utente
      const emailNorm = email.toLowerCase().trim()
      const [existing] = await tx
        .select({ id: users.id })
        .from(users)
        .where(eq(users.email, emailNorm))

      let userId: string
      if (existing) {
        userId = existing.id
        // Aggiorna i dati se necessario
        await tx.update(users)
          .set({ nome: nome.trim(), cognome: cognome.trim(), telefono: telefono.trim(), professione: professione.trim() })
          .where(eq(users.id, userId))
      } else {
        userId = randomUUID()
        await tx.insert(users).values({
          id:          userId,
          nome:        nome.trim(),
          cognome:     cognome.trim(),
          email:       emailNorm,
          telefono:    telefono.trim(),
          professione: professione.trim(),
        })
      }

      // 3. Calcola totale e crea ordine PENDING
      const totalPrice = calcolaTotale(categorie)
      const orderId    = randomUUID()
      const expiresAt  = new Date(Date.now() + 30 * 60 * 1000)  // 30 minuti

      await tx.insert(orders).values({
        id: orderId,
        userId,
        status:     'PENDING',
        totalPrice,
        expiresAt,
      })

      // 4. Crea le righe di iscrizione (una per categoria)
      for (const catId of categorie) {
        const cat      = cats.find(c => c.id === catId)!
        const isExtra  = categorie.indexOf(catId) > 0
        const prezzo   = isExtra ? 90 : cat.prezzoIscrizione

        await tx.insert(iscrizioniCategorie).values({
          id:             randomUUID(),
          orderId,
          categoriaId:    catId,
          prezzoBloccato: prezzo,
        })

        // Blocca il posto (incrementa posti_occupati atomicamente)
        await tx.update(categorieCompetizione)
          .set({ postiOccupati: sql`${categorieCompetizione.postiOccupati} + 1` })
          .where(eq(categorieCompetizione.id, catId))
      }

      return { orderId, totalPrice, emailNorm, nome: nome.trim(), cognome: cognome.trim() }
    })

    // -----------------------------------------------------------------------
    // Crea Stripe Checkout Session
    // -----------------------------------------------------------------------
    const stripe   = getStripe()
    const origin   = request.headers.get('origin') ?? process.env.NEXT_PUBLIC_BASE_URL ?? 'http://localhost:3000'

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = categorie.map((catId, i) => {
      const prezzo    = i === 0 ? 120 : 90
      const nomeCat   = catId.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase())
      return {
        price_data: {
          currency:     'eur',
          unit_amount:  prezzo * 100,   // Stripe usa centesimi
          product_data: {
            name:        `Iscrizione: ${nomeCat}`,
            description: 'Campionato Italiano Massaggiatori 2026',
          },
        },
        quantity: 1,
      }
    })

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items:           lineItems,
      mode:                 'payment',
      customer_email:       result.emailNorm,
      success_url:          `${origin}/grazie-iscrizione?orderId=${result.orderId}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url:           `${origin}/checkout`,
      metadata: {
        orderId:   result.orderId,
        concorrente: `${result.nome} ${result.cognome}`,
      },
      expires_at: Math.floor(Date.now() / 1000) + 30 * 60,
    })

    // Salva l'ID sessione Stripe sull'ordine
    await db.update(orders)
      .set({ stripeSessionId: session.id })
      .where(eq(orders.id, result.orderId))

    return Response.json({
      orderId:    result.orderId,
      stripeUrl:  session.url,
    })

  } catch (err) {
    const msg = err instanceof Error ? err.message : 'Errore imprevisto'
    console.error('[checkout]', msg)
    return Response.json({ error: msg }, { status: 500 })
  }
}
