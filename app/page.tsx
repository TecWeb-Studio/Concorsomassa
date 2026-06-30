import Navbar          from "@/components/Navbar"
import HeroSection     from "@/components/HeroSection"
import CategorieSection from "@/components/CategorieSection"
import GiuriaSection   from "@/components/GiuriaSection"
import ProgrammaSection from "@/components/ProgrammaSection"
import Footer          from "@/components/Footer"

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CategorieSection />
        <GiuriaSection />
        <ProgrammaSection />
      </main>
      <Footer />
    </>
  )
}
