import { ArrowRight, MapPin, Mail } from "lucide-react"

const footerLinks = {
  evento: ["Categorie di Gara", "Programma", "La Giuria", "La Sede"],
  partecipa: ["Acquista Biglietti", "Iscrizione Competitore", "Diventa Sponsor", "Contattaci"],
  informazioni: ["Regolamento", "FAQ", "Accredito Media", "Galleria Foto"],
}

export default function Footer() {
  return (
    <footer className="relative bg-ink overflow-hidden">

      {/* ── CTA Banner ── */}
      <div className="relative border-t border-gold/12 border-b border-b-warm/5 py-20 md:py-24">
        {/* Bloom */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(ellipse 60% 80% at 50% 50%, rgba(190,153,56,0.05) 0%, transparent 70%)",
          }}
        />
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 flex flex-col md:flex-row items-start md:items-center justify-between gap-10 md:gap-20">
          <div>
            <p className="font-body text-[10px] tracking-[0.35em] uppercase text-gold/55 mb-4">
              Seconda Edizione · 2027 · Milano
            </p>
            <h3
              className="font-headline font-light text-warm leading-tight"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.2rem)" }}
            >
              Assicurati un posto<br />
              <em className="not-italic text-gold/80">alla prossima edizione</em>
            </h3>
          </div>
          <a
            href="/checkout"
            className="group flex-shrink-0 inline-flex items-center gap-3 font-body text-[11px] tracking-[0.28em] uppercase text-ink bg-gold rounded-full px-10 py-4 hover:bg-gold-light transition-all duration-300 hover:shadow-[0_0_40px_rgba(190,153,56,0.25)]"
          >
            Iscriviti ora
            <ArrowRight
              size={13}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </a>
        </div>
      </div>

      {/* ── Main Footer ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">

          {/* Brand column */}
          <div className="md:col-span-4">
            <div className="mb-6">
              <p className="font-headline text-gold text-3xl font-light tracking-[0.12em] mb-1">
                CIM
              </p>
              <p className="font-body text-[9px] tracking-[0.28em] uppercase text-warm/30">
                Campionato Italiano di Massaggio
              </p>
            </div>
            <p className="font-body text-sm font-light leading-[1.85] text-warm/28 max-w-sm mb-8">
              Il primo campionato nazionale dedicato all&apos;arte e alla scienza del massaggio professionale. Quattro discipline, i migliori professionisti italiani, una giuria internazionale.
            </p>
            {/* Location */}
            <div className="flex items-start gap-3 mb-3">
              <MapPin size={12} strokeWidth={1.5} className="text-gold/40 mt-0.5 flex-shrink-0" />
              <p className="font-body text-[11px] font-light text-warm/30 leading-relaxed">
                Palazzo delle Stelline<br />
                Corso Magenta 61, Milano
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Mail size={12} strokeWidth={1.5} className="text-gold/40 flex-shrink-0" />
              <p className="font-body text-[11px] font-light text-warm/30">
                info@campionatomassaggio.it
              </p>
            </div>
          </div>

          {/* Spacer */}
          <div className="md:col-span-1 hidden md:block" />

          {/* Links columns */}
          {Object.entries(footerLinks).map(([categoria, links]) => (
            <div key={categoria} className="md:col-span-2">
              <p className="font-body text-[9px] tracking-[0.38em] uppercase text-gold/45 mb-5">
                {categoria.charAt(0).toUpperCase() + categoria.slice(1)}
              </p>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="font-body text-[12px] font-light text-warm/30 hover:text-warm/65 transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Extra spacer */}
          <div className="md:col-span-1 hidden md:block" />
        </div>
      </div>

      {/* ── Bottom bar ── */}
      <div
        className="border-t px-8 md:px-20 py-6 max-w-[1440px] mx-auto"
        style={{ borderColor: "rgba(232,224,207,0.05)" }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="font-body text-[10px] text-warm/18">
            © 2027 Campionato Italiano di Massaggio. Tutti i diritti riservati.
          </p>
          <div className="flex flex-wrap gap-6">
            {["Privacy Policy", "Termini e Condizioni", "Cookie Policy"].map((link) => (
              <a
                key={link}
                href="#"
                className="font-body text-[10px] text-warm/18 hover:text-warm/40 transition-colors duration-300"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Large decorative background text */}
      <div
        className="absolute bottom-0 right-0 pointer-events-none select-none overflow-hidden"
        aria-hidden="true"
        style={{ lineHeight: 0.75 }}
      >
        <span
          className="font-headline font-thin text-warm leading-none"
          style={{
            fontSize: "clamp(8rem, 18vw, 22rem)",
            color: "rgba(232,224,207,0.018)",
            letterSpacing: "-0.04em",
          }}
        >
          2027
        </span>
      </div>
    </footer>
  )
}
