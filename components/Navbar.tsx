"use client"

import { useState, useEffect } from "react"
import { Menu, X } from "lucide-react"

const navLinks = [
  { label: "Evento",          href: "/#evento"           },
  { label: "Categorie",       href: "/#categorie"        },
  { label: "Giuria",          href: "/#giuria"           },
  { label: "Location",        href: "/#location"         },
  { label: "Sponsor",         href: "/#sponsor"          },
  { label: "Contatti",        href: "/#contatti"         },
]

export default function Navbar() {
  const [scrolled,  setScrolled]  = useState(false)
  const [menuOpen,  setMenuOpen]  = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ${
        scrolled
          ? "bg-ink/90 backdrop-blur-2xl border-b border-gold/10 shadow-[0_1px_60px_rgba(0,0,0,0.6)]"
          : ""
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-14 flex items-center justify-between h-[72px]">

        {/* ── Wordmark ── */}
        <a
          href="/"
          className="flex items-center gap-3 group"
          aria-label="Campionato Italiano Massaggiatori — Home"
        >
          <span className="font-headline text-gold text-2xl font-light tracking-[0.12em]">
            CIM
          </span>
          <span className="w-px h-5 bg-gold/20 hidden sm:block" />
          <span className="font-body text-[9px] tracking-[0.3em] uppercase text-warm/30 hidden sm:block leading-tight">
            Campionato<br />Italiano Massaggiatori
          </span>
        </a>

        {/* ── Desktop Links ── */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="font-body text-[10px] tracking-[0.22em] uppercase text-warm/45 hover:text-warm/90 transition-colors duration-300 relative after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-px after:bg-gold/50 hover:after:w-full after:transition-all after:duration-300"
            >
              {link.label}
            </a>
          ))}

          <a
            href="/#iscrizione"
            className="font-body text-[10px] tracking-[0.25em] uppercase text-gold border border-gold/40 rounded-full px-6 py-2.5 hover:bg-gold hover:text-ink hover:border-gold transition-all duration-400"
          >
            Iscriviti
          </a>
        </div>

        {/* ── Mobile Trigger ── */}
        <button
          className="lg:hidden w-10 h-10 flex items-center justify-center text-warm/60 hover:text-warm transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? "Chiudi menu" : "Apri menu"}
        >
          {menuOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* ── Mobile Dropdown ── */}
      <div
        className={`lg:hidden transition-all duration-500 overflow-hidden ${
          menuOpen ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0"
        } bg-ink/95 backdrop-blur-2xl border-t border-gold/10`}
      >
        <div className="px-6 py-8 flex flex-col gap-5">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="font-body text-[11px] tracking-[0.28em] uppercase text-warm/50 hover:text-warm transition-colors"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/#iscrizione"
            onClick={() => setMenuOpen(false)}
            className="font-body text-[11px] tracking-[0.28em] uppercase text-gold border border-gold/40 rounded-full px-6 py-3 text-center hover:bg-gold hover:text-ink transition-all duration-300 mt-2"
          >
            Iscriviti ora
          </a>
        </div>
      </div>
    </nav>
  )
}

