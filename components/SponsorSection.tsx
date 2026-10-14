import { ArrowRight } from 'lucide-react'

const benefitSponsor = [
  'Logo visibile in homepage, sezioni categorie e premiazione',
  'Stand fisico durante le 3 giornate dell\'evento',
  'Menzione su tutti i materiali comunicazione',
  'Post dedicato sui canali social ufficiali',
  'Presenza nel kit concorrente distribuito ai partecipanti',
  'Accesso esclusivo alla community di professionisti del settore',
]

export default function SponsorSection() {
  return (
    <section id="sponsor" className="relative bg-ink overflow-hidden py-32 md:py-48">

      {/* Atmospheric bloom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 80%, rgba(190,153,56,0.05) 0%, transparent 70%)' }}
      />
      <div className="absolute inset-0 pointer-events-none grain opacity-[0.03]" aria-hidden="true" />



      {/* ── Partner note ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 mb-20">
        <p className="font-body text-sm text-warm/60 italic">
          I partner della prima edizione verranno comunicati nei prossimi mesi.
        </p>
      </div>

      {/* ── Diventa Sponsor CTA ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center border border-gold/12 rounded-3xl p-10 md:p-14">
          <div>
            <p className="font-body text-[9px] tracking-[0.35em] uppercase text-gold/55 mb-4">
              Opportunità sponsor
            </p>
            <h3
              className="font-headline font-light text-warm mb-6"
              style={{ fontSize: 'clamp(1.6rem, 3vw, 2.8rem)' }}
            >
              Porta il tuo brand<br />davanti a{' '}
              <em className="not-italic text-gold/80">150+ professionisti</em>
            </h3>
            <p className="font-body text-sm font-light leading-relaxed text-warm/65 mb-8 max-w-md">
              Raggiungi massaggiatori professionisti, operatori del benessere, docenti e scuole di formazione da tutta Italia. Visibilità online e offline durante le 3 giornate dell&apos;evento.
            </p>
            <ul className="space-y-2 mb-10">
              {benefitSponsor.map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <div className="w-1 h-1 rounded-full bg-gold/50 mt-2 flex-shrink-0" />
                  <p className="font-body text-xs font-light text-warm/65">{b}</p>
                </li>
              ))}
            </ul>
            <a
              href="mailto:sponsor@campionatomassaggiatori.it?subject=Richiesta%20informazioni%20sponsorizzazione%20CIM%202026"
              className="group inline-flex items-center gap-3 font-body text-[10px] tracking-[0.25em] uppercase text-ink bg-gold rounded-full px-8 py-3.5 hover:bg-gold/90 transition-all duration-300 hover:shadow-[0_0_30px_rgba(190,153,56,0.2)]"
            >
              Diventa Sponsor
              <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </a>
          </div>
          <div className="hidden lg:block">
            <div className="grid grid-cols-2 gap-4">
              {['Main Sponsor', 'Category Sponsor', 'Technical Partner', 'Media Partner'].map((tipo, i) => (
                <div
                  key={tipo}
                  className={`rounded-xl p-6 border ${i === 0 ? 'border-gold/20 bg-gold/5' : 'border-warm/8 bg-warm/[0.03]'}`}
                >
                  <p className="font-body text-[9px] tracking-[0.25em] uppercase text-gold/50 mb-1">Pacchetto</p>
                  <p className="font-body text-xs font-light text-warm/70">{tipo}</p>
                </div>
              ))}
            </div>
            <p className="font-body text-[10px] font-light text-warm/45 mt-5 text-center">
              Contattaci per il media kit completo
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
