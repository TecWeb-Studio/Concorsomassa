import Navbar               from "@/components/Navbar"
import HeroSection          from "@/components/HeroSection"
import CategorieSection     from "@/components/CategorieSection"
import CosaDeveSapereSection from "@/components/CosaDeveSapereSection"
import GiuriaSection        from "@/components/GiuriaSection"
import LocationSection      from "@/components/LocationSection"
import SponsorSection       from "@/components/SponsorSection"
import ProgrammaSection     from "@/components/ProgrammaSection"
import ContattiSection      from "@/components/ContattiSection"
import Footer               from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        {/* Sezione 1 — Hero / Evento */}
        <HeroSection />
        {/* Sezione 2 — Categorie (accordion con 5 discipline) */}
        <CategorieSection />
        {/* Sezione 3 — Cosa devi sapere (requisiti, deadline, FAQ) */}
        <CosaDeveSapereSection />
        {/* Sezione 4 — Giuria */}
        <GiuriaSection />
        {/* Sezione 5 — Location */}
        <LocationSection />
        {/* Sezione 6 — Sponsor */}
        <SponsorSection />
        {/* Sezione 7 — Programma (3 giorni) */}
        <ProgrammaSection />
        {/* Sezione 8 — Contatti */}
        <ContattiSection />
      </main>
      <Footer />
    </>
  )
}

