import { Waves, Leaf, Zap, Sparkles } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Disciplina {
  numero:     string
  numeral:    string
  nome:       string
  icon:       LucideIcon
  etichetta:  string
  descrizione: string
}

const discipline: Disciplina[] = [
  {
    numero:    "01",
    numeral:   "I",
    nome:      "Massaggio Svedese",
    icon:      Waves,
    etichetta: "Tecnica Classica",
    descrizione:
      "La disciplina fondamentale. I concorrenti eseguono le cinque tecniche classiche — effleurage, pétrissage, frizione, tapotement e vibrazione — con fluidità, ritmo e precisione millimetrica. La giuria valuta la continuità del tocco, la pressione applicata e l'armonia della sequenza.",
  },
  {
    numero:    "02",
    numeral:   "II",
    nome:      "Massaggio Orientale",
    icon:      Leaf,
    etichetta: "Tradizioni d'Asia",
    descrizione:
      "Un viaggio tra le antiche tradizioni dell'Asia. Shiatsu, massaggio tailandese e tecniche ayurvediche si fondono in un'armonia di pressioni, stiramenti e meridiani energetici. Ogni gesto racconta secoli di sapere trasmesso di maestro in allievo.",
  },
  {
    numero:    "03",
    numeral:   "III",
    nome:      "Deep Tissue",
    icon:      Zap,
    etichetta: "Terapia Profonda",
    descrizione:
      "La categoria per i professionisti del benessere muscolare profondo. Tecnica, forza controllata e comprensione anatomica si misurano in ogni singolo gesto terapeutico. La capacità di lavorare sui tessuti profondi senza provocare disagio è l'arte da dimostrare.",
  },
  {
    numero:    "04",
    numeral:   "IV",
    nome:      "Massaggio Freestyle",
    icon:      Sparkles,
    etichetta: "Espressione Libera",
    descrizione:
      "La categoria dell'espressione creativa. I concorrenti costruiscono una sequenza originale di 15 minuti, valutata su creatività, coerenza stilistica, efficacia e impatto emotivo sul ricevente. Una performance unica e irripetibile per ogni concorrente.",
  },
]

export default function CategorieSection() {
  return (
    <section id="categorie" className="relative bg-linen overflow-hidden py-32 md:py-48">

      {/* Soft shadow from hero */}
      <div
        className="absolute top-0 inset-x-0 h-32 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(20,18,14,0.9), transparent)",
        }}
      />

      {/* Faint sage tint in background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 110%, rgba(58,80,64,0.05) 0%, transparent 70%)",
        }}
      />

      {/* ── Section Header ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 mb-20 md:mb-28">
        <div className="flex items-center gap-4 mb-7">
          <div className="w-6 h-px bg-sage/50" />
          <span className="font-body text-[10px] tracking-[0.38em] uppercase text-sage/70">
            Le Discipline
          </span>
        </div>
        <h2
          className="font-headline font-light text-stone leading-[0.9]"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
        >
          Categorie<br />
          <em className="not-italic text-sage/70">di Gara</em>
        </h2>
      </div>

      {/* ── Cards Grid ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
        {discipline.map((disc) => {
          const Icon = disc.icon
          return (
            <div
              key={disc.nome}
              className="group relative bg-white/40 border border-stone/8 rounded-2xl p-10 md:p-12 overflow-hidden cursor-default transition-all duration-500 hover:border-gold/25 hover:bg-white/60 hover:shadow-[0_12px_60px_rgba(58,80,64,0.08)]"
            >
              {/* Ghost numeral */}
              <span
                className="absolute -bottom-6 -right-4 font-headline font-light leading-none select-none pointer-events-none text-stone/[0.05] transition-all duration-700 group-hover:text-gold/[0.07]"
                style={{ fontSize: "clamp(7rem, 14vw, 14rem)" }}
                aria-hidden="true"
              >
                {disc.numeral}
              </span>

              {/* Top row: category number + icon */}
              <div className="flex items-start justify-between mb-10">
                <div>
                  <p className="font-body text-[9px] tracking-[0.35em] uppercase text-stone/35 mb-0.5">
                    Categoria
                  </p>
                  <p className="font-body text-[11px] tracking-[0.3em] uppercase text-sage/60 font-medium">
                    {disc.numero}
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full border border-stone/12 flex items-center justify-center text-stone/30 transition-all duration-400 group-hover:border-gold/35 group-hover:text-gold/70">
                  <Icon size={16} strokeWidth={1.5} />
                </div>
              </div>

              {/* Name */}
              <h3
                className="font-headline font-light text-stone leading-[1.05] mb-2"
                style={{ fontSize: "clamp(1.7rem, 2.6vw, 2.6rem)" }}
              >
                {disc.nome}
              </h3>

              {/* Etichetta */}
              <p className="font-body text-[9px] tracking-[0.28em] uppercase text-sage/55 mb-6">
                {disc.etichetta}
              </p>

              {/* Animated divider */}
              <div
                className="h-px bg-sage/20 mb-6 origin-left transition-all duration-500 group-hover:bg-gold/35"
                style={{ width: "48px" }}
              />
              {/* On hover, extend via pseudo-element trick using inline style transition */}

              {/* Description */}
              <p className="font-body text-sm font-light leading-[1.8] text-stone/55">
                {disc.descrizione}
              </p>
            </div>
          )
        })}
      </div>

      {/* Bottom gradient to next section */}
      <div
        className="absolute bottom-0 inset-x-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(29,27,22,0.08))",
        }}
      />
    </section>
  )
}
