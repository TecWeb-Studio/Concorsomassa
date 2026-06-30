import Link from 'next/link'
import { Check, ArrowRight, MapPin, Calendar } from 'lucide-react'
import { PASS_CONFIG, PASS_ORDER } from '@/lib/ticket-config'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Biglietti — Campionato Italiano di Massaggio 2026',
  description:
    'Acquista il tuo Pass Competitore o Pass Visitatore per il Campionato Italiano di Massaggio 2026 a Milano.',
}

export default function TicketsPage() {
  const passes = PASS_ORDER.map((id) => PASS_CONFIG[id])

  return (
    <div className="relative min-h-screen bg-ink overflow-hidden">

      {/* ── Atmospheric blooms ── */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          top: '-20%',
          right: '-15%',
          width: '70vw',
          height: '70vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58,80,64,0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute pointer-events-none select-none"
        style={{
          bottom: '-10%',
          left: '-10%',
          width: '55vw',
          height: '55vw',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(190,153,56,0.08) 0%, transparent 70%)',
          filter: 'blur(120px)',
        }}
      />

      {/* Film grain */}
      <div className="absolute inset-0 pointer-events-none grain opacity-[0.045]" aria-hidden="true" />

      {/* Ghost numeral */}
      <div
        className="absolute right-0 top-0 font-headline font-thin leading-[0.75] select-none pointer-events-none"
        style={{
          fontSize: 'clamp(14rem, 28vw, 36rem)',
          color: 'rgba(190,153,56,0.03)',
          letterSpacing: '-0.05em',
          transform: 'translateY(-5%)',
        }}
        aria-hidden="true"
      >
        I
      </div>

      {/* ── Minimal header / back navigation ── */}
      <header className="relative z-20 max-w-[1440px] mx-auto px-8 md:px-20 lg:px-28 pt-10 pb-0 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Torna alla home"
        >
          <span className="font-headline text-gold text-2xl font-light tracking-[0.12em]">CIM</span>
          <span className="w-px h-5 bg-gold/20 hidden sm:block" />
          <span className="font-body text-[9px] tracking-[0.3em] uppercase text-warm/30 hidden sm:block leading-tight">
            Campionato<br />Italiano di Massaggio
          </span>
        </Link>

        <div className="flex items-center gap-2 text-warm/30 font-body text-[10px] tracking-[0.3em] uppercase">
          <span className="w-4 h-px bg-warm/20" />
          <span>Biglietti</span>
        </div>
      </header>

      {/* ── Page header ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 lg:px-28 pt-20 md:pt-28 pb-16 md:pb-20">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-8 animate-fade-up [animation-delay:0.1s]">
          <div className="h-px bg-gold/50" style={{ width: '32px' }} />
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-gold/70">
            Acquista il tuo Pass
          </p>
        </div>

        {/* Heading */}
        <h1
          className="font-headline font-light text-warm leading-[0.9] mb-6 animate-fade-up [animation-delay:0.2s]"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)' }}
        >
          Scegli la tua<br />
          <em className="not-italic text-gold/80">esperienza</em>
        </h1>

        {/* Animated gold rule */}
        <div
          className="h-px bg-gold/40 mb-8 origin-left animate-draw-line [animation-delay:0.35s]"
          style={{ width: '72px' }}
        />

        {/* Event meta */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-10 animate-fade-up [animation-delay:0.45s]">
          <div className="flex items-center gap-2 text-warm/35">
            <Calendar size={12} strokeWidth={1.5} />
            <span className="font-body text-[10px] tracking-[0.3em] uppercase">
              14 – 15 Giugno 2026
            </span>
          </div>
          <div className="flex items-center gap-2 text-warm/35">
            <MapPin size={12} strokeWidth={1.5} />
            <span className="font-body text-[10px] tracking-[0.3em] uppercase">
              Palazzo delle Stelline, Milano
            </span>
          </div>
        </div>
      </div>

      {/* ── Cards grid ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 lg:px-28 pb-24 md:pb-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 max-w-[1000px]">
          {passes.map((pass, i) => (
            <PassCard key={pass.id} pass={pass} delay={0.5 + i * 0.15} />
          ))}
        </div>

        {/* ── Bottom note ── */}
        <div className="mt-16 md:mt-20 max-w-[480px] animate-fade-up [animation-delay:0.9s]">
          <div className="h-px bg-warm/8 mb-8" />
          <p className="font-body text-[11px] leading-[1.9] text-warm/30">
            I prezzi sono IVA inclusa (22%). Il posto viene riservato atomicamente
            al momento della prenotazione per 15 minuti. Dopo la conferma del pagamento
            riceverai il biglietto nominale via email.
          </p>
        </div>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// PassCard — sub-component (Server Component)
// ---------------------------------------------------------------------------
interface PassCardProps {
  pass:  ReturnType<typeof PASS_CONFIG['pass-competitore']['features']['map']> extends never ? never : typeof PASS_CONFIG[string]
  delay: number
}

function PassCard({ pass, delay }: { pass: typeof PASS_CONFIG[string]; delay: number }) {
  const isFeatured = pass.featured

  return (
    <div
      className={[
        'group relative rounded-2xl overflow-hidden transition-all duration-500',
        'hover:shadow-[0_24px_80px_rgba(0,0,0,0.5)]',
        isFeatured
          ? 'bg-charcoal border border-gold/20 hover:border-gold/45'
          : 'bg-charcoal/60 border border-warm/8 hover:border-sage/35',
        `animate-fade-up`,
      ].join(' ')}
      style={{ animationDelay: `${delay}s` }}
    >
      {/* Featured glow */}
      {isFeatured && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(190,153,56,0.06) 0%, transparent 70%)',
          }}
        />
      )}

      {/* Ghost numeral */}
      <span
        className={[
          'absolute -bottom-4 -right-2 font-headline font-thin leading-none select-none pointer-events-none transition-all duration-700',
          isFeatured ? 'text-gold/[0.04] group-hover:text-gold/[0.07]' : 'text-warm/[0.03] group-hover:text-sage/[0.06]',
        ].join(' ')}
        style={{ fontSize: 'clamp(8rem, 16vw, 16rem)' }}
        aria-hidden="true"
      >
        {pass.id === 'pass-competitore' ? 'C' : 'V'}
      </span>

      <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">

        {/* Top row: badge + availability */}
        <div className="flex items-start justify-between mb-8">
          {/* Badge */}
          <span
            className={[
              'inline-flex items-center font-body text-[9px] tracking-[0.3em] uppercase px-3 py-1.5 rounded-full border',
              pass.badgeVariant === 'gold'
                ? 'text-gold/80 border-gold/25 bg-gold/5'
                : 'text-sage-light/80 border-sage/25 bg-sage/5',
            ].join(' ')}
          >
            {pass.badge}
          </span>

          {/* Availability indicator */}
          <div className="flex items-center gap-2">
            <div
              className={[
                'w-1.5 h-1.5 rounded-full',
                pass.disponibilitaTipo === 'limitata'
                  ? 'bg-gold/70 shadow-[0_0_6px_rgba(190,153,56,0.5)]'
                  : 'bg-sage-light/70 shadow-[0_0_6px_rgba(99,125,106,0.5)]',
              ].join(' ')}
            />
            <span className="font-body text-[9px] tracking-[0.2em] uppercase text-warm/35">
              {pass.disponibilita}
            </span>
          </div>
        </div>

        {/* Pass name */}
        <h2
          className={[
            'font-headline font-light leading-[0.95] mb-2',
            isFeatured ? 'text-warm' : 'text-warm/85',
          ].join(' ')}
          style={{ fontSize: 'clamp(1.8rem, 2.8vw, 2.6rem)' }}
        >
          {pass.nome}
        </h2>

        {/* Sottotitolo */}
        <p className="font-body text-[10px] tracking-[0.22em] uppercase text-warm/30 mb-8">
          {pass.sottotitolo}
        </p>

        {/* Price */}
        <div className="flex items-end gap-2 mb-8">
          <span
            className={[
              'font-headline font-light leading-none',
              isFeatured ? 'text-gold' : 'text-warm/70',
            ].join(' ')}
            style={{ fontSize: 'clamp(2.6rem, 4vw, 3.8rem)' }}
          >
            €{pass.prezzo}
          </span>
          <span className="font-body text-[9px] tracking-[0.25em] uppercase text-warm/25 mb-1.5">
            IVA incl.
          </span>
        </div>

        {/* Animated divider */}
        <div
          className={[
            'h-px mb-8 transition-all duration-500',
            isFeatured
              ? 'bg-gold/20 group-hover:bg-gold/40'
              : 'bg-warm/8 group-hover:bg-sage/25',
          ].join(' ')}
        />

        {/* Features list */}
        <ul className="space-y-3 mb-10 flex-1">
          {pass.features.map((feature) => (
            <li key={feature} className="flex items-start gap-3">
              <Check
                size={12}
                strokeWidth={2}
                className={[
                  'mt-0.5 shrink-0',
                  isFeatured ? 'text-gold/60' : 'text-sage-light/60',
                ].join(' ')}
              />
              <span className="font-body text-[12px] font-light leading-[1.7] text-warm/50">
                {feature}
              </span>
            </li>
          ))}
        </ul>

        {/* CTA button */}
        <Link
          href={`/checkout?type=${pass.id}`}
          className={[
            'group/btn relative inline-flex items-center justify-center gap-3',
            'font-body text-[11px] tracking-[0.28em] uppercase rounded-full px-8 py-4',
            'transition-all duration-300 overflow-hidden',
            isFeatured
              ? 'bg-gold text-ink hover:bg-gold-light hover:shadow-[0_0_40px_rgba(190,153,56,0.35)]'
              : 'border border-sage/40 text-sage-light hover:bg-sage hover:text-warm/90 hover:border-sage hover:shadow-[0_0_30px_rgba(58,80,64,0.3)]',
          ].join(' ')}
        >
          <span>{pass.ctaLabel}</span>
          <ArrowRight
            size={13}
            className="transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        </Link>
      </div>
    </div>
  )
}
