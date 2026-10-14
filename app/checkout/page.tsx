import Link from 'next/link'
import { ArrowLeft, ArrowRight, Clock } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title:       'Iscrizioni — Campionato Italiano Massaggiatori',
  description: 'Le iscrizioni per la seconda edizione del Campionato Italiano Massaggiatori apriranno nel 2027.',
}

export default function CheckoutPage() {
  return (
    <div className="relative min-h-screen bg-ink flex flex-col overflow-hidden">

      {/* Blooms */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-15%', right: '-10%', width: '60vw', height: '60vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58,80,64,0.14) 0%, transparent 70%)', filter: 'blur(90px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-10%', left: '-5%', width: '45vw', height: '45vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(190,153,56,0.07) 0%, transparent 70%)', filter: 'blur(110px)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none grain opacity-[0.04]" aria-hidden="true" />

      {/* Header */}
      <header className="relative z-10 max-w-[1440px] mx-auto w-full px-8 md:px-20 pt-10">
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
          <span className="font-headline text-gold text-2xl font-light tracking-[0.12em]">CIM</span>
          <span className="w-px h-5 bg-gold/20 hidden sm:block" />
          <span className="font-body text-[9px] tracking-[0.3em] uppercase text-warm/50 hidden sm:block leading-tight">
            Campionato<br />Italiano Massaggiatori
          </span>
        </Link>
      </header>

      {/* Back */}
      <div className="relative z-10 max-w-[1440px] mx-auto w-full px-8 md:px-20 pt-8">
        <Link
          href="/"
          className="inline-flex items-center gap-2 font-body text-[10px] tracking-[0.28em] uppercase text-warm/60 hover:text-warm/85 transition-colors group"
        >
          <ArrowLeft size={12} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          Torna alla Home
        </Link>
      </div>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-8 md:px-20 py-20">
        <div className="max-w-lg mx-auto text-center">

          {/* Icon */}
          <div className="flex justify-center mb-12">
            <div className="w-20 h-20 rounded-full border border-gold/20 flex items-center justify-center">
              <Clock size={28} strokeWidth={1} className="text-gold/50" />
            </div>
          </div>

          {/* Eyebrow */}
          <p className="font-body text-[9px] tracking-[0.42em] uppercase text-gold/55 mb-6">
            Seconda Edizione · 2027
          </p>

          {/* Heading */}
          <h1
            className="font-headline font-light text-warm leading-[0.9] mb-8"
            style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)' }}
          >
            Iscrizioni<br />in apertura
          </h1>

          {/* Body */}
          <p className="font-body text-sm font-light leading-relaxed text-warm/65 mb-12 max-w-sm mx-auto">
            Le iscrizioni per la seconda edizione apriranno nei primi mesi del 2027.
            Scrivici per ricevere un avviso appena saranno disponibili.
          </p>

          {/* Gold rule */}
          <div className="h-px bg-gold/20 mx-auto mb-12" style={{ width: '60px' }} />

          {/* CTA */}
          <Link
            href="/#contatti"
            className="group inline-flex items-center gap-3 font-body text-[11px] tracking-[0.28em] uppercase text-ink bg-gold rounded-full px-10 py-4 hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(190,153,56,0.3)]"
          >
            Ricevi aggiornamenti
            <ArrowRight size={13} className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>
      </main>
    </div>
  )
}
