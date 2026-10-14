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
    data:   "Venerdì — Arrivi e Accreditamento",
    eventi: [
      {
        ora:    "15:00",
        titolo: "Apertura accreditamenti",
        desc:   "Registrazione concorrenti, ritiro materiali ufficiali, assegnazione postazioni e brief organizzativo.",
        icon:   Users,
      },
      {
        ora:    "17:00",
        titolo: "Sopralluogo aree di gara",
        desc:   "Visita guidata delle sale competizione, conoscenza della configurazione spazi e incontro con lo staff tecnico.",
        icon:   Star,
      },
      {
        ora:    "19:30",
        titolo: "Welcome Dinner",
        desc:   "Cena di benvenuto per concorrenti, giuria e ospiti. Occasione di networking e presentazione ufficiale dell'evento.",
        icon:   Music,
        accent: true,
      },
    ],
  },
  {
    giorno: "Giorno II",
    data:   "Sabato — Gare Categorie 1–3",
    eventi: [
      {
        ora:    "08:30",
        titolo: "Apertura aree di gara",
        desc:   "Ingresso concorrenti e visitatori. Coffee break di benvenuto e ultima sessione di preparazione.",
        icon:   Users,
      },
      {
        ora:    "09:30",
        titolo: "Cerimonia di Apertura",
        desc:   "Inaugurazione ufficiale alla presenza delle autorità del settore, degli sponsor e della commissione giudicante.",
        icon:   Star,
        accent: true,
      },
      {
        ora:    "10:00",
        titolo: "Gare — Massaggio Tecnico Sportivo",
        desc:   "Prima sessione competitiva. 25 minuti a concorrente davanti alla commissione. Valutazione tecnica, sicurezza ed efficacia.",
        icon:   Clock,
      },
      {
        ora:    "13:00",
        titolo: "Pausa Pranzo & Networking",
        desc:   "Pranzo riservato ai partecipanti. Un momento di condivisione tra professionisti provenienti da tutta Italia.",
        icon:   Users,
      },
      {
        ora:    "14:30",
        titolo: "Gare — Kirei Kobido",
        desc:   "La delicatezza del massaggio viso in competizione. Ritmo, fluidità e precisione sotto lo sguardo attento della giuria.",
        icon:   Clock,
      },
      {
        ora:    "17:30",
        titolo: "Gare — Massaggio Thai",
        desc:   "Pressione, mobilizzazione e stretching assistito. Sicurezza e controllo del corpo al centro della valutazione.",
        icon:   Clock,
      },
    ],
  },
  {
    giorno: "Giorno III",
    data:   "Domenica — Gare Categorie 4–5 e Premiazione",
    eventi: [
      {
        ora:    "09:00",
        titolo: "Gare — Massaggio Olistico",
        desc:   "Benessere globale, ascolto e coerenza del trattamento. Una categoria che premia la qualità del contatto e la gestione dell'ambiente.",
        icon:   Clock,
      },
      {
        ora:    "11:00",
        titolo: "Gare — Massaggio Freestyle",
        desc:   "La categoria più attesa. Trenta minuti di pura espressione tecnica e artistica. Ogni performance è unica e irripetibile.",
        icon:   Star,
        accent: true,
      },
      {
        ora:    "13:30",
        titolo: "Pranzo Ufficiale",
        desc:   "Pranzo con concorrenti, giuria e ospiti istituzionali mentre la commissione delibera i punteggi finali.",
        icon:   Users,
      },
      {
        ora:    "16:00",
        titolo: "Cerimonia di Premiazione",
        desc:   "I vincitori delle cinque discipline salgono sul palco. Medaglie, premi in denaro e il riconoscimento dell'eccellenza italiana.",
        icon:   Trophy,
        accent: true,
      },
      {
        ora:    "18:30",
        titolo: "Gala di Chiusura",
        desc:   "Serata conclusiva per celebrare tutti i partecipanti. Un evento destinato a diventare un punto di riferimento del settore.",
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



      {/* ── Section Header ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 mb-20 md:mb-28">
        <div
          aria-hidden="true"
          className="font-headline font-thin leading-none select-none pointer-events-none mb-4"
          style={{ fontSize: "clamp(6rem, 14vw, 16rem)", color: "rgba(58,80,64,0.12)" }}
        >
          07
        </div>
        <h2
          className="font-headline font-light text-stone leading-[0.9]"
          style={{ fontSize: "clamp(2.4rem, 5.5vw, 5.5rem)" }}
        >
          Programma
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
                <p className="font-body text-[9px] tracking-[0.4em] uppercase text-sage/75 mb-1.5">
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
                            evento.accent ? "text-gold/60" : "text-stone/45"
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
                      <p className="font-body text-sm font-light leading-[1.8] text-stone/65 group-hover:text-stone/80 transition-colors duration-300">
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
