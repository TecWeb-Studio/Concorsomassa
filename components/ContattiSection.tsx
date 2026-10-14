'use client'

import { useState } from 'react'
import { Mail, Phone, MessageCircle, Send, Check, Loader2 } from 'lucide-react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

const oggettiPredefiniti = [
  'Informazioni iscrizione',
  'Dubbi su categoria',
  'Problemi pagamento',
  'Documenti e requisiti',
  'Sponsor e partnership',
  'Logistica e location',
  'Altro',
]

export default function ContattiSection() {
  const [stato, setStato] = useState<FormState>('idle')
  const [errore, setErrore] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStato('loading')
    setErrore('')

    const data = new FormData(e.currentTarget)
    const body = {
      nome:      data.get('nome') as string,
      email:     data.get('email') as string,
      telefono:  data.get('telefono') as string,
      oggetto:   data.get('oggetto') as string,
      messaggio: data.get('messaggio') as string,
    }

    try {
      const res = await fetch('/api/contatti', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
      if (!res.ok) throw new Error()
      setStato('success')
    } catch {
      setStato('error')
      setErrore('Invio non riuscito. Scrivici direttamente a info@campionatomassaggiatori.it')
    }
  }

  return (
    <section id="contatti" className="relative bg-linen overflow-hidden py-32 md:py-48">

      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(58,80,64,0.05) 0%, transparent 70%)' }}
      />

      {/* ── Section Header ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 mb-16 md:mb-20">
        <div className="flex items-center gap-4 mb-7">
          <div className="w-6 h-px bg-sage/50" />
          <span className="font-body text-[10px] tracking-[0.38em] uppercase text-sage/70">
            Assistenza
          </span>
        </div>
        <h2
          className="font-headline font-light text-stone leading-[0.9]"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)' }}
        >
          Hai domande?<br />
          <em className="not-italic text-sage/70">Scrivici</em>
        </h2>
      </div>

      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 grid grid-cols-1 lg:grid-cols-5 gap-16">

        {/* ── Contact info ── */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          <p className="font-body text-sm font-light leading-relaxed text-stone/70">
            Siamo a disposizione per qualsiasi informazione sull&apos;iscrizione, le categorie, la logistica o le opportunità di sponsorizzazione. Rispondiamo entro 24–48 ore lavorative.
          </p>

          <div className="space-y-5">
            <a
              href="mailto:info@campionatomassaggiatori.it"
              className="group flex items-center gap-4 p-5 rounded-xl border border-stone/10 hover:border-sage/25 hover:bg-white/30 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-full border border-stone/15 flex items-center justify-center text-stone/40 group-hover:border-sage/40 group-hover:text-sage transition-all">
                <Mail size={14} strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-body text-[9px] tracking-[0.28em] uppercase text-stone/55 mb-0.5">Email</p>
                <p className="font-body text-sm font-light text-stone/75">info@campionatomassaggiatori.it</p>
              </div>
            </a>

            <a
              href="tel:+390200000000"
              className="group flex items-center gap-4 p-5 rounded-xl border border-stone/10 hover:border-sage/25 hover:bg-white/30 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-full border border-stone/15 flex items-center justify-center text-stone/40 group-hover:border-sage/40 group-hover:text-sage transition-all">
                <Phone size={14} strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-body text-[9px] tracking-[0.28em] uppercase text-stone/55 mb-0.5">Telefono</p>
                <p className="font-body text-sm font-light text-stone/75">+39 02 0000 0000</p>
              </div>
            </a>

            <a
              href="https://wa.me/390200000000?text=Ciao%2C%20vorrei%20informazioni%20sul%20CIM%202026"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-4 p-5 rounded-xl border border-stone/10 hover:border-sage/25 hover:bg-white/30 transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-full border border-stone/15 flex items-center justify-center text-stone/40 group-hover:border-sage/40 group-hover:text-sage transition-all">
                <MessageCircle size={14} strokeWidth={1.5} />
              </div>
              <div>
                <p className="font-body text-[9px] tracking-[0.28em] uppercase text-stone/55 mb-0.5">WhatsApp</p>
                <p className="font-body text-sm font-light text-stone/75">Scrivici su WhatsApp</p>
              </div>
            </a>
          </div>
        </div>

        {/* ── Contact form ── */}
        <div className="lg:col-span-3">
          {stato === 'success' ? (
            <div className="flex flex-col items-center justify-center h-full gap-6 py-16 border border-sage/20 rounded-2xl bg-sage/[0.04]">
              <div className="w-12 h-12 rounded-full border border-sage/40 flex items-center justify-center">
                <Check size={18} strokeWidth={1.5} className="text-sage" />
              </div>
              <div className="text-center">
                <p className="font-headline text-2xl font-light text-stone mb-2">Messaggio inviato</p>
                <p className="font-body text-sm font-light text-stone/50">Ti risponderemo entro 24–48 ore lavorative.</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="c-nome" className="font-body text-[9px] tracking-[0.28em] uppercase text-stone/60 block mb-2">
                    Nome *
                  </label>
                  <input
                    id="c-nome"
                    name="nome"
                    type="text"
                    required
                    autoComplete="given-name"
                    className="w-full bg-white/50 border border-stone/15 rounded-xl px-4 py-3 font-body text-sm text-stone/80 placeholder:text-stone/25 focus:outline-none focus:border-sage/40 transition-colors"
                    placeholder="Il tuo nome"
                  />
                </div>
                <div>
                  <label htmlFor="c-email" className="font-body text-[9px] tracking-[0.28em] uppercase text-stone/60 block mb-2">
                    Email *
                  </label>
                  <input
                    id="c-email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    className="w-full bg-white/50 border border-stone/15 rounded-xl px-4 py-3 font-body text-sm text-stone/80 placeholder:text-stone/25 focus:outline-none focus:border-sage/40 transition-colors"
                    placeholder="nome@email.it"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="c-telefono" className="font-body text-[9px] tracking-[0.28em] uppercase text-stone/60 block mb-2">
                    Telefono
                  </label>
                  <input
                    id="c-telefono"
                    name="telefono"
                    type="tel"
                    autoComplete="tel"
                    className="w-full bg-white/50 border border-stone/15 rounded-xl px-4 py-3 font-body text-sm text-stone/80 placeholder:text-stone/25 focus:outline-none focus:border-sage/40 transition-colors"
                    placeholder="+39 333 000 0000"
                  />
                </div>
                <div>
                  <label htmlFor="c-oggetto" className="font-body text-[9px] tracking-[0.28em] uppercase text-stone/60 block mb-2">
                    Oggetto *
                  </label>
                  <select
                    id="c-oggetto"
                    name="oggetto"
                    required
                    className="w-full bg-white/50 border border-stone/15 rounded-xl px-4 py-3 font-body text-sm text-stone/80 focus:outline-none focus:border-sage/40 transition-colors"
                  >
                    <option value="">Seleziona…</option>
                    {oggettiPredefiniti.map(o => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="c-messaggio" className="font-body text-[9px] tracking-[0.28em] uppercase text-stone/60 block mb-2">
                  Messaggio *
                </label>
                <textarea
                  id="c-messaggio"
                  name="messaggio"
                  required
                  rows={5}
                  className="w-full bg-white/50 border border-stone/15 rounded-xl px-4 py-3 font-body text-sm text-stone/80 placeholder:text-stone/25 focus:outline-none focus:border-sage/40 transition-colors resize-none"
                  placeholder="Scrivi il tuo messaggio…"
                />
              </div>

              {errore && (
                <p className="font-body text-xs text-red-600/70">{errore}</p>
              )}

              <button
                type="submit"
                disabled={stato === 'loading'}
                className="group inline-flex items-center gap-3 font-body text-[10px] tracking-[0.25em] uppercase text-ink bg-gold rounded-full px-8 py-3.5 hover:bg-gold/90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {stato === 'loading' ? (
                  <><Loader2 size={13} className="animate-spin" /> Invio in corso…</>
                ) : (
                  <>
                    Invia messaggio
                    <Send size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
