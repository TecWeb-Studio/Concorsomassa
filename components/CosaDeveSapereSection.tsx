import { Calendar, CheckCircle, Package, MapPin, Briefcase, AlertCircle } from 'lucide-react'

const blocchi = [
  {
    icon:   Calendar,
    titolo: 'Iscrizioni in apertura',
    testo:  'Le iscrizioni per la seconda edizione apriranno nei primi mesi del 2027. Lascia la tua email per essere avvisato.',
    accent: true,
  },
  {
    icon:   CheckCircle,
    titolo: 'Requisiti di accesso',
    testo:  'Età minima 18 anni. È richiesta formazione documentabile nella disciplina scelta. Accettazione del regolamento obbligatoria al momento dell\'iscrizione.',
    accent: false,
  },
  {
    icon:   Package,
    titolo: 'Cosa è incluso',
    testo:  'Accesso all\'evento per le 3 giornate, partecipazione alla categoria selezionata, badge nominale, kit concorrente, attestato di partecipazione e certificato per eventuali vincitori.',
    accent: false,
  },
  {
    icon:   Briefcase,
    titolo: 'Cosa portare',
    testo:  'Documento d\'identità valido, abbigliamento professionale da gara, materiali personali (oli, creme se previsti dalla tua disciplina), musica se necessaria per la tua performance.',
    accent: false,
  },
  {
    icon:   MapPin,
    titolo: 'Dove si svolge',
    testo:  'L\'evento si tiene presso Palazzo delle Stelline, Corso Magenta 61, Milano. Clicca qui per aprire la mappa e pianificare il tuo viaggio.',
    link:   '#location',
    accent: false,
  },
  {
    icon:   AlertCircle,
    titolo: 'Cosa fornisce l\'organizzazione',
    testo:  'Lettini professionali, sedie, asciugamani, prodotti di base, modelli/riceventi, spogliatoi, assistenza staff, segnaletica e servizi logistici.',
    accent: false,
  },
]

const faq = [
  {
    domanda: 'Posso iscrivermi a più categorie?',
    risposta: 'Sì, puoi selezionare più discipline nel form di iscrizione. La seconda categoria in poi ha un costo ridotto a €90 invece di €120.',
  },
  {
    domanda: 'Quando ricevo la conferma?',
    risposta: 'Immediatamente dopo il pagamento riceverai una email con il riepilogo dell\'iscrizione, il numero d\'ordine e le istruzioni per i prossimi passi.',
  },
  {
    domanda: 'Devo portare il mio lettino?',
    risposta: 'No. L\'organizzazione fornisce lettini professionali per tutte le categorie. Verifica il regolamento per eventuali attrezzature specifiche della tua disciplina.',
  },
  {
    domanda: 'Vitto e alloggio sono inclusi?',
    risposta: 'L\'iscrizione include i pasti durante l\'evento (pranzi e welcome dinner). Per l\'alloggio ti forniremo una lista di strutture convenzionate.',
  },
]

export default function CosaDeveSapereSection() {
  return (
    <section id="cosa-devi-sapere" className="relative bg-charcoal py-32 md:py-48 overflow-hidden">



      {/* ── Section Header ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 mb-16 md:mb-20">
        <span
          aria-hidden="true"
          className="block font-headline font-thin text-gold/20 leading-none mb-4 select-none"
          style={{ fontSize: 'clamp(4rem, 8vw, 8rem)' }}
        >—</span>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <h2
            className="font-headline font-light text-warm leading-[0.9]"
            style={{ fontSize: 'clamp(2.4rem, 5.5vw, 5.5rem)' }}
          >
            Cosa devi sapere
          </h2>
          <p className="font-body text-sm font-light text-warm/35 max-w-xs leading-relaxed">
            Tutto quello che ti serve prima di completare l&apos;iscrizione.
          </p>
        </div>
      </div>

      {/* ── Info Cards ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
        {blocchi.map((b) => {
          const Icon = b.icon
          return (
            <div
              key={b.titolo}
              className={`rounded-2xl p-8 border transition-all duration-300 ${
                b.accent
                  ? 'bg-gold/10 border-gold/25'
                  : 'bg-warm/[0.04] border-warm/8 hover:border-warm/15'
              }`}
            >
              <div className={`w-9 h-9 rounded-full border flex items-center justify-center mb-5 ${
                b.accent ? 'border-gold/40 text-gold' : 'border-warm/15 text-warm/40'
              }`}>
                <Icon size={15} strokeWidth={1.5} />
              </div>
              <h3 className={`font-body text-[10px] tracking-[0.28em] uppercase mb-3 ${
                b.accent ? 'text-gold/80' : 'text-warm/50'
              }`}>
                {b.titolo}
              </h3>
              <p className="font-body text-sm font-light leading-relaxed text-warm/55">
                {b.testo}
                {b.link && (
                  <a href={b.link} className="ml-1 text-gold/70 hover:text-gold underline underline-offset-2 transition-colors">
                    Vedi location →
                  </a>
                )}
              </p>
            </div>
          )
        })}
      </div>

      {/* ── FAQ ── */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20">
        <p className="font-body text-[9px] tracking-[0.35em] uppercase text-gold/50 mb-8">Domande frequenti</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {faq.map((f) => (
            <div key={f.domanda} className="border-l border-gold/20 pl-6">
              <p className="font-body text-sm font-medium text-warm/80 mb-2">{f.domanda}</p>
              <p className="font-body text-sm font-light leading-relaxed text-warm/45">{f.risposta}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
