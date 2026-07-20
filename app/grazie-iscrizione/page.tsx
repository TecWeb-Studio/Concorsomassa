import Link from 'next/link'
import { Check, MapPin, Calendar, ArrowRight, Mail } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:  'Iscrizione confermata — Campionato Italiano Massaggiatori 2026',
  robots: { index: false, follow: false },
}

export default function GrazieIscrizioneePage() {
  return (
    <div className="relative min-h-screen bg-ink flex flex-col overflow-hidden">

      {/* Blooms */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-10%', right: '-10%', width: '55vw', height: '55vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58,80,64,0.15) 0%, transparent 70%)', filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%', left: '-5%', width: '45vw', height: '45vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(190,153,56,0.08) 0%, transparent 70%)', filter: 'blur(120px)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none grain opacity-[0.04]" aria-hidden="true" />

      {/* Header */}
      <header className="relative z-10 max-w-[1440px] mx-auto w-full px-8 md:px-20 pt-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
          <span className="font-headline text-gold text-2xl font-light tracking-[0.12em]">CIM</span>
          <span className="w-px h-5 bg-gold/20 hidden sm:block" />
          <span className="font-body text-[9px] tracking-[0.3em] uppercase text-warm/30 hidden sm:block leading-tight">
            Campionato<br />Italiano Massaggiatori
          </span>
        </Link>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-8 md:px-20 py-20">
        <div className="max-w-xl mx-auto text-center">

          {/* Checkmark */}
          <div className="flex justify-center mb-10">
            <div className="relative">
              <div className="w-20 h-20 rounded-full border border-sage/30 flex items-center justify-center">
                <Check size={32} strokeWidth={1.5} className="text-sage/80" />
              </div>
              <div
                className="absolute inset-0 rounded-full"
                style={{ animation: 'ping 1.5s cubic-bezier(0,0,0.2,1) forwards', border: '1px solid rgba(58,80,64,0.3)' }}
              />
            </div>
          </div>

          {/* Heading */}
          <p className="font-body text-[9px] tracking-[0.38em] uppercase text-gold/55 mb-4">
            Iscrizione ricevuta
          </p>
          <h1
            className="font-headline font-light text-warm mb-5"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          >
            Ci vediamo<br />
            <em className="not-italic text-gold/80">al Campionato</em>
          </h1>
          <p className="font-body text-sm font-light leading-relaxed text-warm/45 mb-12 max-w-md mx-auto">
            La tua iscrizione è stata confermata. Riceverai a breve una email di riepilogo con tutte le informazioni sulla tua partecipazione.
          </p>

          {/* Next steps */}
          <div className="text-left border border-warm/8 rounded-2xl p-7 mb-10 bg-warm/[0.02]">
            <p className="font-body text-[9px] tracking-[0.28em] uppercase text-warm/35 mb-5">Prossimi step</p>
            <div className="space-y-4">
              {[
                { icon: Mail,     testo: 'Controlla la tua email per il riepilogo dell\'iscrizione' },
                { icon: Calendar, testo: 'Salva le date dell\'evento in calendario' },
                { icon: MapPin,   testo: 'Scopri la location e pianifica il tuo viaggio' },
                { icon: Check,    testo: 'Leggi il regolamento e prepara i documenti richiesti' },
              ].map(({ icon: Icon, testo }) => (
                <div key={testo} className="flex items-start gap-4">
                  <div className="w-7 h-7 rounded-full border border-warm/10 flex items-center justify-center flex-shrink-0">
                    <Icon size={12} strokeWidth={1.5} className="text-warm/35" />
                  </div>
                  <p className="font-body text-sm font-light text-warm/55">{testo}</p>
                </div>
              ))}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="group inline-flex items-center gap-3 font-body text-[10px] tracking-[0.25em] uppercase text-ink bg-gold rounded-full px-8 py-3.5 hover:bg-gold/90 transition-all duration-300"
            >
              Torna alla Home
              <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
            <Link
              href="/#location"
              className="inline-flex items-center gap-3 font-body text-[10px] tracking-[0.25em] uppercase text-warm/40 border border-warm/15 rounded-full px-8 py-3.5 hover:border-warm/30 hover:text-warm/70 transition-all duration-300"
            >
              <MapPin size={11} strokeWidth={1.5} />
              Vedi la location
            </Link>
          </div>

          {/* Sharing */}
          <p className="mt-12 font-body text-[10px] font-light text-warm/22 tracking-[0.15em] uppercase">
            Condividi la tua partecipazione sui social e usa #CIM2026
          </p>
        </div>
      </main>
    </div>
  )
}
