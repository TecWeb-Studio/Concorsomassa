import { Users, Star, Clock, Music, Trophy } from "lucide-react"
import type { LucideIcon } from "lucide-react"

interface Evento {
  ora:     string
  titolo:  string
  desc:    string
  icon:    LucideIcon
  accent?: boolean
}

interface GiornoData {
  giorno: string
  data:   string
  eventi: Evento[]
}

const programma: GiornoData[] = [
  {
    giorno: "Giorno I",
    data:   "Sabato 14 Giugno 2026",
    eventi: [
      {
        ora:    "08:00",
        titolo: "Accreditamento",
        desc:   "Registrazione dei concorrenti e ritiro dei materiali ufficiali. Welcome coffee, incontro con il team organizzativo e sorteggio delle postazioni di gara.",
        icon:   Users,
      },
      {
        ora:    "09:30",
        titolo: "Cerimonia di Apertura",
        desc:   "Inaugurazione ufficiale del Campionato alla presenza delle autorità sportive, degli sponsor istituzionali e della stampa specializzata. Presentazione della commissione giudicante.",
        icon:   Star,
        accent: true,
      },
      {
        ora:    "10:00",
        titolo: "Gare · Massaggio Svedese",
        desc:   "Prima sessione competitiva. I concorrenti eseguono la sequenza completa — 25 minuti ciascuno — davanti alla commissione giudicante. Valutazione tecnica e qualitativa.",
        icon:   Clock,
      },
      {
        ora:    "13:00",
        titolo: "Pausa Pranzo & Networking",
        desc:   "Pranzo riservato ai partecipanti nel cortile interno del Palazzo. Un momento di condivisione tra professionisti provenienti da tutta Italia.",
        icon:   Users,
      },
      {
        ora:    "14:30",
        titolo: "Gare · Massaggio Orientale",
        desc:   "Seconda sessione del giorno. Shiatsu, tecniche tailandesi e tradizioni ayurvediche si incontrano nella sala principale. La giuria valuta aderenza alla tradizione e maestria esecutiva.",
        icon:   Clock,
      },
      {
        ora:    "19:00",
        titolo: "Cocktail di Benvenuto",
        desc:   "Serata di networking in un'atmosfera esclusiva. Drink, musica soft e la possibilità di connettere professionisti del benessere da tutta la penisola.",
        icon:   Music,
      },
    ],
  },
  {
    giorno: "Giorno II",
    data:   "Domenica 15 Giugno 2026",
    eventi: [
      {
        ora:    "09:00",
        titolo: "Gare · Deep Tissue",
        desc:   "Le gare di Deep Tissue aprono la seconda giornata. Precisione, forza controllata e sensibilità terapeutica sotto la lente attenta della giuria internazionale.",
        icon:   Clock,
      },
      {
        ora:    "11:00",
        titolo: "Gare · Massaggio Freestyle",
        desc:   "La categoria più attesa. Quindici minuti di pura espressione artistica e tecnica. Ogni performance è unica e irripetibile, costruita per sorprendere e toccare nel profondo.",
        icon:   Star,
        accent: true,
      },
      {
        ora:    "13:30",
        titolo: "Pranzo Ufficiale",
        desc:   "Pranzo di gala con tutti i concorrenti, la giuria e gli ospiti istituzionali. Menu a cura di uno chef stellato milanese.",
        icon:   Users,
      },
      {
        ora:    "15:00",
        titolo: "Deliberazioni della Giuria",
        desc:   "La commissione si riunisce in sessione privata per deliberare i punteggi finali. Momento di attesa e crescente suspense per tutti i concorrenti.",
        icon:   Clock,
      },
      {
        ora:    "17:30",
        titolo: "Cerimonia di Premiazione",
        desc:   "I vincitori delle quattro discipline salgono sul palco. Trofei, riconoscimenti ufficiali e la consacrazione dell'eccellenza italiana nel massaggio.",
        icon:   Trophy,
        accent: true,
      },
      {
        ora:    "19:30",
        titolo: "Gala di Chiusura",
        desc:   "Cena di gala per celebrare la prima storica edizione. Un evento destinato a diventare un punto di riferimento nel panorama internazionale del benessere.",
        icon:   Music,
      },
    ],
  },
]

export default function ProgrammaSection() {
  return (
    <section id="programma" className="relative bg-sand py-32 md:py-48 overflow-hidden">

      {/* Top fade from charcoal */}
      <div
        className="absolute top-0 inset-x-0 h-24 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, rgba(29,27,22,0.3), transparent)",
        }}
      />

      {/* Subtle warm tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 90% 70% at 50% 0%, rgba(190,153,56,0.04) 0%, transparent 60%)",
        }}
      />

      {/* ── Section Header ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 mb-20 md:mb-28">
        <div className="flex items-center gap-4 mb-7">
          <div className="w-6 h-px bg-sage/50" />
          <span className="font-body text-[10px] tracking-[0.38em] uppercase text-sage/70">
            L&apos;Evento
          </span>
        </div>
        <h2
          className="font-headline font-light text-stone leading-[0.9]"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
        >
          Programma<br />
          <em className="not-italic text-sage/70">dell&apos;Evento</em>
        </h2>
      </div>

      {/* ── Timeline ── */}
      <div className="relative z-10 max-w-[860px] mx-auto px-8 md:px-20">
        {programma.map((giorno, gi) => (
          <div
            key={giorno.giorno}
            className={gi > 0 ? "mt-20 md:mt-28" : ""}
          >
            {/* Day header */}
            <div className="flex items-center gap-6 mb-14">
              <div>
                <p className="font-body text-[9px] tracking-[0.4em] uppercase text-sage/55 mb-1.5">
                  {giorno.giorno}
                </p>
                <p
                  className="font-headline font-light text-stone"
                  style={{ fontSize: "clamp(1.5rem, 2.8vw, 2.4rem)" }}
                >
                  {giorno.data}
                </p>
              </div>
              <div
                className="flex-1 h-px"
                style={{
                  background: "linear-gradient(to right, rgba(58,80,64,0.3), transparent)",
                }}
              />
            </div>

            {/* Events */}
            <div className="relative">
              {giorno.eventi.map((evento, ei) => {
                const Icon = evento.icon
                const isLast = ei === giorno.eventi.length - 1

                return (
                  <div
                    key={evento.titolo}
                    className="group flex gap-6 md:gap-8 relative"
                  >
                    {/* ── Timeline track ── */}
                    <div className="flex flex-col items-center flex-shrink-0 w-5">
                      {/* Dot */}
                      <div
                        className={`w-2 h-2 rounded-full mt-[7px] flex-shrink-0 border transition-all duration-300 ${
                          evento.accent
                            ? "bg-gold border-gold/60 w-2.5 h-2.5 shadow-[0_0_8px_rgba(190,153,56,0.4)]"
                            : "bg-sand border-sage/40 group-hover:border-gold/50"
                        }`}
                      />
                      {/* Connecting line */}
                      {!isLast && (
                        <div
                          className="w-px flex-1 my-1"
                          style={{
                            background: "rgba(58,80,64,0.18)",
                            minHeight: "32px",
                          }}
                        />
                      )}
                    </div>

                    {/* ── Event content ── */}
                    <div className={`pb-10 flex-1 ${isLast ? "pb-0" : ""}`}>
                      {/* Time */}
                      <div className="flex items-center gap-3 mb-2">
                        <span className="font-body text-[10px] tracking-[0.28em] uppercase text-gold/65">
                          {evento.ora}
                        </span>
                        <Icon
                          size={11}
                          strokeWidth={1.5}
                          className={`${
                            evento.accent ? "text-gold/60" : "text-stone/25"
                          }`}
                        />
                      </div>

                      {/* Title */}
                      <h4
                        className={`font-headline font-light leading-tight mb-2 transition-colors duration-300 ${
                          evento.accent ? "text-stone" : "text-stone/75 group-hover:text-stone"
                        }`}
                        style={{ fontSize: "clamp(1.15rem, 1.8vw, 1.5rem)" }}
                      >
                        {evento.titolo}
                      </h4>

                      {/* Description */}
                      <p className="font-body text-sm font-light leading-[1.8] text-stone/48 group-hover:text-stone/62 transition-colors duration-300">
                        {evento.desc}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
