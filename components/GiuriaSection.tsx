import { Award } from "lucide-react"

const ruoli = [
  { ruolo: "Esperto internazionale", specialita: "Massaggio terapeutico" },
  { ruolo: "Campione europeo",       specialita: "Discipline orientali"   },
  { ruolo: "Docente senior",         specialita: "Massaggio sportivo"     },
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

      {/* ── Announcement ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 mb-16 text-center">
        <h3
          className="font-headline font-light text-warm mb-4"
          style={{ fontSize: "clamp(1.4rem, 2.5vw, 2rem)" }}
        >
          La giuria sarà annunciata
        </h3>
        <p className="font-body text-sm font-light text-warm/65 max-w-lg mx-auto leading-relaxed">
          I nominativi della commissione di valutazione verranno comunicati nelle settimane precedenti all&apos;evento.
        </p>
      </div>

      {/* ── Role Cards Grid ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10">
        {ruoli.map((r) => (
          <div
            key={r.specialita}
            className="group flex flex-col items-center"
          >
            {/* Portrait card */}
            <div className="relative mb-8 flex justify-center">
              <div className="relative">
                <div className="w-36 h-36 rounded-full border border-warm/10 transition-all duration-500 group-hover:border-gold/35 flex items-center justify-center bg-warm/[0.04]">
                  <Award
                    size={32}
                    strokeWidth={1}
                    className="text-warm/30 group-hover:text-gold/50 transition-colors duration-400"
                  />
                </div>
                <div
                  className="absolute inset-[-4px] rounded-full border border-gold/0 group-hover:border-gold/20 transition-all duration-500"
                />
              </div>
            </div>

            {/* Specialty */}
            <p className="font-body text-[9px] tracking-[0.22em] uppercase text-gold/55 mb-2 text-center">
              {r.specialita}
            </p>

            {/* Divider */}
            <div
              className="h-px bg-warm/8 mb-4 mx-auto transition-all duration-500 group-hover:bg-gold/20"
              style={{ width: "40px" }}
            />

            {/* Role */}
            <p className="font-body text-sm font-light text-warm/60 text-center">
              {r.ruolo}
            </p>
          </div>
        ))}
      </div>

      {/* ── Note ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 mt-20 md:mt-24 text-center">
        <div
          className="h-px mx-auto mb-8"
          style={{
            width: "60px",
            background: "rgba(190,153,56,0.25)",
          }}
        />
        <p className="font-body text-xs text-warm/50">
          I nominativi verranno rivelati nelle settimane precedenti all&apos;evento.
        </p>
      </div>
    </section>
  )
}
