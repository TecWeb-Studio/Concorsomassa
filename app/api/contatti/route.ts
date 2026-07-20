import { type NextRequest } from 'next/server'
import { Resend } from 'resend'

interface ContattoBody {
  nome:      string
  email:     string
  telefono?: string
  oggetto:   string
  messaggio: string
}

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) throw new Error('RESEND_API_KEY non configurata')
  return new Resend(key)
}

export async function POST(request: NextRequest) {
  let body: ContattoBody
  try {
    body = (await request.json()) as ContattoBody
  } catch {
    return Response.json({ error: 'JSON malformato' }, { status: 400 })
  }

  const { nome, email, telefono, oggetto, messaggio } = body

  if (!nome?.trim() || !email?.trim() || !oggetto?.trim() || !messaggio?.trim()) {
    return Response.json({ error: 'Campi obbligatori mancanti' }, { status: 400 })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return Response.json({ error: 'Email non valida' }, { status: 400 })
  }

  // Anti-spam: lunghezza massima campi
  if (messaggio.length > 2000 || nome.length > 100 || oggetto.length > 200) {
    return Response.json({ error: 'Contenuto troppo lungo' }, { status: 400 })
  }

  try {
    const resend = getResend()
    const staffEmail = process.env.STAFF_EMAIL ?? 'info@campionatomassaggiatori.it'

    // Email allo staff
    await resend.emails.send({
      from:    'CIM Contatti <noreply@campionatomassaggiatori.it>',
      to:      staffEmail,
      subject: `[CIM] ${oggetto} — da ${nome}`,
      html: `
        <h2>Nuovo messaggio dal sito CIM</h2>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${telefono ? `<p><strong>Telefono:</strong> ${telefono}</p>` : ''}
        <p><strong>Oggetto:</strong> ${oggetto}</p>
        <hr />
        <p>${messaggio.replace(/\n/g, '<br />')}</p>
      `,
      replyTo: email,
    })

    // Auto-risposta al mittente
    await resend.emails.send({
      from:    'Campionato Italiano Massaggiatori <noreply@campionatomassaggiatori.it>',
      to:      email,
      subject: 'Abbiamo ricevuto il tuo messaggio — CIM 2026',
      html: `
        <h2>Ciao ${nome},</h2>
        <p>Abbiamo ricevuto il tuo messaggio relativo a: <strong>${oggetto}</strong>.</p>
        <p>Ti risponderemo entro 24–48 ore lavorative all'indirizzo ${email}.</p>
        <br />
        <p>Per urgenze puoi scrivere direttamente a <a href="mailto:${staffEmail}">${staffEmail}</a>.</p>
        <br />
        <p>A presto,<br />Il team del Campionato Italiano Massaggiatori</p>
      `,
    })

    return Response.json({ success: true })
  } catch (err) {
    console.error('[contatti]', err)
    return Response.json({ error: 'Invio non riuscito' }, { status: 500 })
  }
}
