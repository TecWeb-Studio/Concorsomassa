import { ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section
      id="evento"
      className="relative min-h-screen bg-ink flex flex-col overflow-hidden"
    >

      {/* ────────────────────────────────────────────
          ATMOSPHERIC LAYERS
      ──────────────────────────────────────────── */}

      {/* Sage radial bloom — upper right */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          top: "-15%",
          right: "-10%",
          width: "65vw",
          height: "65vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(58,80,64,0.18) 0%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
      {/* Gold bloom — lower left */}
      <div
        className="absolute pointer-events-none select-none"
        style={{
          bottom: "-10%",
          left: "-5%",
          width: "45vw",
          height: "45vw",
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(190,153,56,0.09) 0%, transparent 70%)",
          filter: "blur(100px)",
        }}
      />

      {/* Film grain texture */}
      <div
        className="absolute inset-0 pointer-events-none grain opacity-[0.045]"
        aria-hidden="true"
      />

      {/* Thin vertical accent line */}
      <div
        className="absolute top-0 bottom-0 w-px hidden lg:block pointer-events-none"
        style={{
          left: "13%",
          background: "linear-gradient(to bottom, transparent, rgba(190,153,56,0.12) 30%, rgba(190,153,56,0.06) 70%, transparent)",
        }}
      />

      {/* ────────────────────────────────────────────
          GHOST EDITION NUMERAL
      ──────────────────────────────────────────── */}
      <div
        className="absolute right-0 bottom-0 font-headline font-thin leading-[0.75] select-none pointer-events-none"
        style={{
          fontSize: "clamp(10rem, 18vw, 22rem)",
          color: "rgba(190,153,56,0.055)",
          letterSpacing: "-0.05em",
        }}
        aria-hidden="true"
      >
        2026
      </div>

      {/* ────────────────────────────────────────────
          HERO CONTENT
      ──────────────────────────────────────────── */}
      <div className="relative z-10 flex-1 flex flex-col justify-end max-w-[1440px] mx-auto w-full px-8 md:px-20 lg:px-28 pb-24 md:pb-36 pt-36">

        {/* Eyebrow */}
        <div className="flex items-center gap-4 mb-12 animate-fade-up [animation-delay:0.25s]">
          <div
            className="h-px bg-sage-light"
            style={{ width: "32px" }}
          />
          <p className="font-body text-[10px] tracking-[0.4em] uppercase text-sage-light">
            Seconda&nbsp;Edizione&nbsp;&nbsp;·&nbsp;&nbsp;In&nbsp;Preparazione&nbsp;&nbsp;·&nbsp;&nbsp;2027
          </p>
        </div>

        {/* ── TITLE — the centrepiece ── */}
        <h1 className="font-headline font-light leading-[0.87] mb-12">
          <span
            className="block text-warm animate-fade-up [animation-delay:0.4s]"
            style={{ fontSize: "clamp(3.2rem, 8.5vw, 9.5rem)" }}
          >
            Campionato
          </span>
          <span
            className="block text-warm animate-fade-up [animation-delay:0.55s]"
            style={{ fontSize: "clamp(3.2rem, 8.5vw, 9.5rem)" }}
          >
            Italiano
          </span>
          <span
            className="block text-gold animate-fade-up [animation-delay:0.7s] italic"
            style={{ fontSize: "clamp(3.2rem, 8.5vw, 9.5rem)" }}
          >
            Massaggiatori
          </span>
        </h1>

        {/* Gold rule */}
        <div
          className="h-px bg-gold/60 mb-12 origin-left animate-draw-line [animation-delay:0.95s]"
          style={{ width: "88px" }}
        />

        {/* Meta + CTA row */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-10 animate-fade-up [animation-delay:1.1s]">

          {/* Date & venue */}
          <div className="space-y-2">
            <p className="font-body text-[11px] tracking-[0.3em] uppercase text-warm/38 flex items-center gap-2">
              <span
                className="inline-block w-4 h-px bg-warm/20"
              />
              Date da confermare · 2027
            </p>
            <p className="font-body text-[11px] tracking-[0.3em] uppercase text-warm/38 flex items-center gap-2">
              <span
                className="inline-block w-4 h-px bg-warm/20"
              />
              <a href="#location" className="hover:text-warm/70 transition-colors">Palazzo delle Stelline, Milano</a>
            </p>
          </div>

          {/* CTA buttons */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <a
              href="/checkout"
              className="group relative inline-flex items-center gap-3 font-body text-[12px] tracking-[0.28em] uppercase text-ink bg-gold rounded-full px-11 py-4.5 overflow-hidden transition-all duration-300 hover:bg-gold-light hover:shadow-[0_0_50px_rgba(190,153,56,0.4)] shadow-[0_0_30px_rgba(190,153,56,0.18)]"
            >
              <span className="relative z-10 font-medium">Iscriviti al Campionato</span>
              <ArrowRight
                size={14}
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              />
            </a>
            <a
              href="#categorie"
              className="font-body text-[10px] tracking-[0.28em] uppercase text-warm/45 hover:text-warm/80 transition-colors underline underline-offset-4 decoration-warm/20 hover:decoration-warm/50"
            >
              Scopri le categorie
            </a>
          </div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="relative z-10 flex justify-center pb-10 animate-fade-in [animation-delay:1.7s]">
        <div className="flex flex-col items-center gap-2">
          <span className="font-body text-[8px] tracking-[0.45em] uppercase text-warm/20">
            Scopri
          </span>
          <div
            className="w-px h-10"
            style={{
              background: "linear-gradient(to bottom, rgba(232,224,207,0.2), transparent)",
            }}
          />
        </div>
      </div>
    </section>
  )
}
