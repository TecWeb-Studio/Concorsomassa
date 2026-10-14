'use client'

import { useState } from 'react'
import { ChevronDown, Trophy, Clock, ArrowRight } from 'lucide-react'
import { CATEGORIE_CONFIG, CATEGORIE_ORDER } from '@/lib/ticket-config'

export default function CategorieSection() {
  const [aperte, setAperte] = useState<Set<string>>(new Set())

  function toggleCategoria(id: string) {
    setAperte(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const categorie = CATEGORIE_ORDER.map(id => CATEGORIE_CONFIG[id])

  return (
    <section id="categorie" className="relative bg-linen overflow-hidden py-32 md:py-48">

      {/* Soft shadow from hero */}
      <div
        className="absolute top-0 inset-x-0 h-32 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, rgba(20,18,14,0.9), transparent)' }}
      />


      {/* ── Section Header ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 mb-16 md:mb-20">
        <div className="flex items-center gap-4 mb-7">
          <div className="w-6 h-px bg-sage/50" />
          <span className="font-body text-[10px] tracking-[0.38em] uppercase text-sage/70">
            Le Discipline
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2
            className="font-headline font-light text-stone leading-[0.9]"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)' }}
          >
            Categorie<br />
            <em className="not-italic text-sage/70">di Gara</em>
          </h2>
          <p className="font-body text-sm font-light text-stone/50 max-w-xs leading-relaxed">
            Puoi iscriverti a una o più categorie. Apri ogni disciplina per vedere requisiti, premi e criteri di valutazione.
          </p>
        </div>
      </div>

      {/* ── Accordion ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 flex flex-col gap-3">
        {categorie.map((cat, index) => {
          const isAperta = aperte.has(cat.id)
          return (
            <div
              key={cat.id}
              className={`border rounded-2xl overflow-hidden transition-all duration-500 ${
                isAperta
                  ? 'border-gold/30 bg-white/70 shadow-[0_8px_40px_rgba(190,153,56,0.08)]'
                  : 'border-stone/10 bg-white/40 hover:border-stone/20 hover:bg-white/55'
              }`}
            >
              {/* ── Header row (always visible) ── */}
              <button
                type="button"
                className="w-full flex items-center justify-between px-8 md:px-10 py-7 text-left"
                onClick={() => toggleCategoria(cat.id)}
                aria-expanded={isAperta}
                aria-controls={`cat-${cat.id}`}
              >
                <div className="flex items-center gap-5">
                  <span className="font-body text-[10px] tracking-[0.3em] text-stone/30 hidden sm:block">
                    0{index + 1}
                  </span>
                  <div>
                    <h3
                      className="font-headline font-light text-stone"
                      style={{ fontSize: 'clamp(1.3rem, 2.2vw, 2rem)' }}
                    >
                      {cat.nome}
                    </h3>
                    <p className="font-body text-[10px] tracking-[0.25em] uppercase text-sage/60 mt-1">
                      {cat.durataProva}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="font-body text-sm font-light text-stone/50 hidden md:block">
                    €{cat.prezzoIscrizione}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-full border border-stone/15 flex items-center justify-center transition-all duration-400 ${
                      isAperta ? 'border-gold/40 bg-gold/10 rotate-180' : ''
                    }`}
                  >
                    <ChevronDown
                      size={14}
                      strokeWidth={1.5}
                      className={`text-stone/40 transition-colors ${isAperta ? 'text-gold/70' : ''}`}
                    />
                  </div>
                </div>
              </button>

              {/* ── Expandable body ── */}
              <div
                id={`cat-${cat.id}`}
                className={`transition-all duration-500 ${isAperta ? 'max-h-[800px]' : 'max-h-0'} overflow-hidden`}
              >
                <div className="px-8 md:px-10 pb-10 pt-2">
                  <div className="h-px bg-stone/8 mb-8" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {/* Descrizione + chi si può iscrivere */}
                    <div className="md:col-span-2 space-y-6">
                      <div>
                        <p className="font-body text-[9px] tracking-[0.32em] uppercase text-stone/35 mb-2">Descrizione</p>
                        <p className="font-body text-sm font-light leading-relaxed text-stone/65">{cat.descrizione}</p>
                      </div>
                      <div>
                        <p className="font-body text-[9px] tracking-[0.32em] uppercase text-stone/35 mb-2">Chi può iscriversi</p>
                        <p className="font-body text-sm font-light leading-relaxed text-stone/65">{cat.chiPuoIscriversi}</p>
                      </div>
                      <div>
                        <p className="font-body text-[9px] tracking-[0.32em] uppercase text-stone/35 mb-3">Criteri di valutazione</p>
                        <ul className="flex flex-wrap gap-2">
                          {cat.criteri.map(c => (
                            <li
                              key={c}
                              className="font-body text-[10px] tracking-[0.15em] uppercase text-stone/50 border border-stone/12 rounded-full px-3 py-1"
                            >
                              {c}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {/* Premi + CTA */}
                    <div className="flex flex-col gap-5">
                      <div>
                        <p className="font-body text-[9px] tracking-[0.32em] uppercase text-stone/35 mb-3">Premi</p>
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <Trophy size={12} className="text-yellow-600" />
                            <span className="font-body text-xs text-stone/60">Oro</span>
                            <span className="font-body text-sm font-medium text-stone/80 ml-auto">€{cat.premioOro}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Trophy size={12} className="text-stone/40" />
                            <span className="font-body text-xs text-stone/60">Argento</span>
                            <span className="font-body text-sm font-medium text-stone/80 ml-auto">€{cat.premioArgento}</span>
                          </div>
                          <div className="flex items-center gap-3">
                            <Trophy size={12} className="text-amber-700/50" />
                            <span className="font-body text-xs text-stone/60">Bronzo</span>
                            <span className="font-body text-sm font-medium text-stone/80 ml-auto">€{cat.premioBronzo}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <Clock size={11} className="text-stone/35" />
                          <p className="font-body text-[9px] tracking-[0.32em] uppercase text-stone/35">Durata prova</p>
                        </div>
                        <p className="font-body text-xs text-stone/55">{cat.durataProva}</p>
                      </div>
                      <a
                        href={`/checkout?categoria=${cat.id}`}
                        className="group mt-2 inline-flex items-center justify-center gap-2 font-body text-[10px] tracking-[0.25em] uppercase text-ink bg-gold rounded-full px-6 py-3 hover:bg-gold/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(190,153,56,0.2)]"
                      >
                        Pre-iscriviti
                        <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Nota iscrizione multipla */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 mt-10">
        <p className="font-body text-[11px] font-light text-stone/40 text-center">
          Puoi iscriverti a più categorie — la seconda categoria ha un costo ridotto a €90.
        </p>
      </div>

      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, rgba(29,27,22,0.08))' }}
      />
    </section>
  )
}

