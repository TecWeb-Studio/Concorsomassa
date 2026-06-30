import { Award, Globe } from "lucide-react"

interface Giudice {
  iniziali:   string
  nome:       string
  titolo:     string
  bio:        string
  specialita: string[]
  nazionalita: string
  bgGradient: string
}

const giudici: Giudice[] = [
  {
    iniziali:    "EM",
    nome:        "Dott.ssa Elena Marchetti",
    titolo:      "Maestra di Massaggio & Fisioterapista",
    bio:         "Con oltre vent'anni di esperienza clinica e didattica, la Dott.ssa Marchetti ha formato centinaia di professionisti del benessere. Direttrice dell'Accademia del Tocco di Milano, è riconosciuta come una delle maggiori autorità italiane nel massaggio terapeutico.",
    specialita:  ["Massaggio Svedese", "Riabilitazione"],
    nazionalita: "Italia",
    bgGradient:  "from-sage/25 to-stone/50",
  },
  {
    iniziali:    "ME",
    nome:        "Prof. Marco Esposito",
    titolo:      "Campione Europeo · Docente Universitario",
    bio:         "Pluricampione europeo e fondatore della scuola di Deep Tissue Therapy più rinomata d'Italia. Docente presso l'Università degli Studi di Roma, il Prof. Esposito è autore di tre manuali di riferimento internazionale sulla tecnica del massaggio profondo.",
    specialita:  ["Deep Tissue", "Sports Massage"],
    nazionalita: "Italia",
    bgGradient:  "from-gold/15 to-stone/50",
  },
  {
    iniziali:    "HT",
    nome:        "Hiroshi Tanaka",
    titolo:      "Maestro di Shiatsu · V Generazione",
    bio:         "Maestro di quinta generazione nella tradizione dello Shiatsu Namikoshi, Hiroshi Tanaka ha portato la sua arte dai templi di Kyoto alle accademie europee. La sua filosofia del massaggio come dialogo tra i corpi è diventata un punto di riferimento per la comunità internazionale.",
    specialita:  ["Shiatsu", "Massaggio Ayurvedico"],
    nazionalita: "Giappone",
    bgGradient:  "from-sage/20 to-charcoal",
  },
]

export default function GiuriaSection() {
  return (
    <section id="giuria" className="relative bg-charcoal py-32 md:py-48 overflow-hidden">

      {/* Atmospheric bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 70% 50% at 50% 60%, rgba(58,80,64,0.12) 0%, transparent 70%)",
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 pointer-events-none grain opacity-[0.03]"
        aria-hidden="true"
      />

      {/* Top divider fade */}
      <div
        className="absolute top-0 inset-x-0 h-20 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(29,27,22,0.4), transparent)",
        }}
      />

      {/* ── Section Header ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 mb-20 md:mb-28">
        <div className="flex items-center gap-4 mb-7">
          <div className="w-6 h-px bg-gold/50" />
          <span className="font-body text-[10px] tracking-[0.38em] uppercase text-gold/60">
            I Giudici
          </span>
        </div>
        <h2
          className="font-headline font-light text-warm leading-[0.9]"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
        >
          La Commissione<br />
          <em className="not-italic text-gold/75">di Valutazione</em>
        </h2>
      </div>

      {/* ── Judges Grid ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {giudici.map((g) => (
          <div
            key={g.nome}
            className="group flex flex-col"
          >
            {/* Portrait card */}
            <div className="relative mb-8 flex justify-center">
              {/* Outer decorative ring */}
              <div className="relative">
                <div
                  className="w-36 h-36 rounded-full border border-warm/10 transition-all duration-500 group-hover:border-gold/35 flex items-center justify-center overflow-hidden"
                  style={{
                    background: `radial-gradient(135deg, var(--tw-gradient-stops))`,
                  }}
                >
                  {/* Portrait background */}
                  <div
                    className={`absolute inset-0 rounded-full bg-gradient-to-br ${g.bgGradient}`}
                  />
                  {/* Initials */}
                  <span
                    className="relative z-10 font-headline text-[2.2rem] font-light text-warm/60 group-hover:text-warm/90 transition-colors duration-400 select-none"
                  >
                    {g.iniziali}
                  </span>
                </div>

                {/* Gold accent ring on hover */}
                <div
                  className="absolute inset-[-4px] rounded-full border border-gold/0 group-hover:border-gold/20 transition-all duration-500"
                />

                {/* Nationality badge */}
                <div className="absolute -bottom-1 -right-1 flex items-center gap-1.5 bg-charcoal border border-warm/10 rounded-full px-2.5 py-1 group-hover:border-gold/25 transition-colors duration-300">
                  <Globe size={9} strokeWidth={1.5} className="text-gold/50" />
                  <span className="font-body text-[8px] tracking-[0.2em] uppercase text-warm/35">
                    {g.nazionalita}
                  </span>
                </div>
              </div>
            </div>

            {/* Name */}
            <h3
              className="font-headline font-light text-warm leading-tight mb-1 text-center"
              style={{ fontSize: "clamp(1.25rem, 1.8vw, 1.6rem)" }}
            >
              {g.nome}
            </h3>

            {/* Title */}
            <p className="font-body text-[9px] tracking-[0.22em] uppercase text-gold/55 mb-6 text-center">
              {g.titolo}
            </p>

            {/* Divider */}
            <div
              className="h-px bg-warm/8 mb-6 mx-auto transition-all duration-500 group-hover:bg-gold/20"
              style={{ width: "40px" }}
            />

            {/* Bio */}
            <p className="font-body text-sm font-light leading-[1.85] text-warm/38 mb-8 text-center flex-1">
              {g.bio}
            </p>

            {/* Specialties */}
            <div className="flex flex-wrap gap-2 justify-center">
              {g.specialita.map((s) => (
                <span
                  key={s}
                  className="font-body text-[8px] tracking-[0.22em] uppercase text-sage-light/70 border border-sage/20 rounded-full px-3.5 py-1.5 group-hover:border-sage/40 group-hover:text-sage-light transition-all duration-300"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* Award icon — appears on hover */}
            <div className="flex justify-center mt-6">
              <Award
                size={14}
                strokeWidth={1.5}
                className="text-gold/0 group-hover:text-gold/40 transition-all duration-500"
              />
            </div>
          </div>
        ))}
      </div>

      {/* ── Closing note ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 mt-20 md:mt-24 text-center">
        <div
          className="h-px mx-auto mb-8"
          style={{
            width: "60px",
            background: "rgba(190,153,56,0.25)",
          }}
        />
        <p className="font-body text-[11px] tracking-[0.25em] uppercase text-warm/25">
          La commissione sarà annunciata integralmente entro Marzo 2026
        </p>
      </div>
    </section>
  )
}
