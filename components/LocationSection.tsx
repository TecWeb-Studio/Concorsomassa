import { MapPin, Navigation, Train, Car, ExternalLink } from 'lucide-react'

export default function LocationSection() {
  const mapsUrl = 'https://maps.google.com/?q=Palazzo+delle+Stelline,+Corso+Magenta+61,+Milano'

  return (
    <section id="location" className="relative bg-linen overflow-hidden py-32 md:py-48">



      {/* ── Section Header ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 mb-16 md:mb-20">
        <div className="flex items-center gap-4 mb-7">
          <div className="w-6 h-px bg-sage/50" />
          <span className="font-body text-[10px] tracking-[0.38em] uppercase text-sage/70">
            La Sede
          </span>
        </div>
        <h2
          className="font-headline font-light text-stone leading-[0.9]"
          style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)' }}
        >
          Palazzo delle Stelline · Milano
        </h2>
      </div>

      {/* ── Main grid ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

        {/* Left: info */}
        <div>
          {/* Venue name + address */}
          <div className="mb-10">
            <h3
              className="font-headline font-light text-stone mb-3"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.6rem)' }}
            >
              Palazzo delle Stelline
            </h3>
            <div className="flex items-start gap-2 mb-1">
              <MapPin size={13} strokeWidth={1.5} className="text-sage/50 mt-0.5 flex-shrink-0" />
              <p className="font-body text-sm font-light text-stone/55">
                Corso Magenta 61, 20123 Milano MI
              </p>
            </div>
          </div>

          {/* Description */}
          <p className="font-body text-sm font-light leading-relaxed text-stone/60 mb-10 max-w-md">
            Palazzo delle Stelline è un'elegante struttura congressuale nel cuore di Milano, ospitata in un antico convento del XV secolo. Le sale modulari e gli spazi luminosi sono il contesto ideale per una competizione professionale di alto livello.
          </p>

          {/* Come arrivare */}
          <div className="space-y-5 mb-10">
            <p className="font-body text-[9px] tracking-[0.32em] uppercase text-stone/35">Come arrivare</p>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full border border-stone/10 flex items-center justify-center flex-shrink-0">
                <Train size={13} strokeWidth={1.5} className="text-stone/40" />
              </div>
              <div>
                <p className="font-body text-xs font-medium text-stone/65 mb-0.5">Metropolitana</p>
                <p className="font-body text-xs font-light text-stone/45">M2 (linea verde) — Fermata Cadorna o Sant&apos;Ambrogio, 8 minuti a piedi</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full border border-stone/10 flex items-center justify-center flex-shrink-0">
                <Car size={13} strokeWidth={1.5} className="text-stone/40" />
              </div>
              <div>
                <p className="font-body text-xs font-medium text-stone/65 mb-0.5">Auto</p>
                <p className="font-body text-xs font-light text-stone/45">Parcheggio convenzionato in Piazza Cadorna e via Carducci. Area C attiva nei giorni di gara.</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full border border-stone/10 flex items-center justify-center flex-shrink-0">
                <Navigation size={13} strokeWidth={1.5} className="text-stone/40" />
              </div>
              <div>
                <p className="font-body text-xs font-medium text-stone/65 mb-0.5">Stazione Centrale</p>
                <p className="font-body text-xs font-light text-stone/45">Taxi o M2 gialla da Stazione Centrale: 25 minuti. Navette dedicate sabato e domenica.</p>
              </div>
            </div>
          </div>

          {/* CTA Maps */}
          <a
            href={mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 font-body text-[10px] tracking-[0.25em] uppercase text-stone/60 border border-stone/20 rounded-full px-7 py-3 hover:border-gold/40 hover:text-gold/80 transition-all duration-300"
          >
            <MapPin size={11} strokeWidth={1.5} />
            Apri in Google Maps
            <ExternalLink size={10} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>
        </div>

        {/* Right: embedded map with fallback */}
        <div className="rounded-2xl overflow-hidden border border-stone/10 bg-stone/5" style={{ minHeight: '360px' }}>
          <div className="relative w-full h-full" style={{ minHeight: '360px' }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2798.154!2d9.17455!3d45.46451!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4786c15ad5b38c79%3A0x6c3ecb01a3fbce27!2sPalazzo%20delle%20Stelline!5e0!3m2!1sit!2sit!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0, minHeight: '360px', display: 'block' }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Palazzo delle Stelline — Sede del Campionato Italiano Massaggiatori"
            />
          </div>
          {/* Fallback text always visible below map on small screens */}
          <div className="p-5 border-t border-stone/8">
            <p className="font-body text-[11px] font-light text-stone/45">
              Palazzo delle Stelline · Corso Magenta 61, Milano ·{' '}
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="text-sage/60 hover:text-sage underline underline-offset-2">
                Apri su Google Maps
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
