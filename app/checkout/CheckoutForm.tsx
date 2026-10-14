'use client'

import { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import {
  ArrowLeft, ArrowRight, Loader2, Check, AlertCircle, Shield,
} from 'lucide-react'
import { CATEGORIE_CONFIG, CATEGORIE_ORDER, calcolaTotale, calcolaImponibile } from '@/lib/ticket-config'

// ---------------------------------------------------------------------------
// Zod schemas per ogni step
// ---------------------------------------------------------------------------
const schemaDatiPersonali = z.object({
  nome:        z.string().min(2, 'Min 2 caratteri').max(50).regex(/^[A-Za-zÀ-ÿ\s'-]+$/, 'Caratteri non validi'),
  cognome:     z.string().min(2, 'Min 2 caratteri').max(50).regex(/^[A-Za-zÀ-ÿ\s'-]+$/, 'Caratteri non validi'),
  email:       z.string().email('Email non valida').max(120),
  telefono:    z.string().regex(/^\+?[\d\s\-(). ]{7,20}$/, 'Formato non valido (es. +39 333 1234567)'),
  professione: z.string().min(1, 'Seleziona la professione'),
})

const schemaCategorie = z.object({
  categorie: z.array(z.string()).min(1, 'Seleziona almeno una categoria'),
})

const schemaConsensus = z.object({
  privacy:    z.literal(true, { message: 'Accetta la privacy policy per procedere' }),
  regolamento: z.literal(true, { message: 'Accetta il regolamento per procedere' }),
})

type DatiPersonali  = z.infer<typeof schemaDatiPersonali>
type DatiCategorie  = z.infer<typeof schemaCategorie>
type DatiConsensus  = z.infer<typeof schemaConsensus>

const professioni = ['Massaggiatore/Massaggiatrice', 'Operatore olistico', 'Fisioterapista', 'Estetista', 'Docente/Formatore', 'Studente', 'Altro']

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function CheckoutForm() {
  const searchParams = useSearchParams()
  const router       = useRouter()
  const categoriaParam = searchParams.get('categoria') ?? ''

  const [step,          setStep]         = useState<1|2|3>(1)
  const [datiPersonali, setDatiPersonali] = useState<DatiPersonali | null>(null)
  const [categorieSel,  setCategorieSel]  = useState<string[]>(
    categoriaParam && CATEGORIE_CONFIG[categoriaParam] ? [categoriaParam] : []
  )
  const [apiError, setApiError] = useState<string | null>(null)
  const [loading,  setLoading]  = useState(false)

  // ── Step 1 form ──
  const form1 = useForm<DatiPersonali>({
    resolver: zodResolver(schemaDatiPersonali),
    defaultValues: { nome: '', cognome: '', email: '', telefono: '', professione: '' },
  })

  // ── Step 3 form ──
  const form3 = useForm<DatiConsensus>({
    resolver: zodResolver(schemaConsensus),
    defaultValues: { privacy: undefined as unknown as true, regolamento: undefined as unknown as true },
  })

  // ── Category toggle ──
  function toggleCategoria(id: string) {
    setCategorieSel(prev =>
      prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
    )
  }

  const totaleEuro  = calcolaTotale(categorieSel)
  const { imponibile, iva } = calcolaImponibile(totaleEuro)

  // ── Final submit → API → Stripe redirect ──
  async function handleFinalSubmit(consensi: DatiConsensus) {
    if (!datiPersonali || categorieSel.length === 0) return
    setApiError(null)
    setLoading(true)

    try {
      const res = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome:        datiPersonali.nome,
          cognome:     datiPersonali.cognome,
          email:       datiPersonali.email,
          telefono:    datiPersonali.telefono,
          professione: datiPersonali.professione,
          categorie:   categorieSel,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        setApiError(json.error ?? 'Errore imprevisto. Riprova.')
        setLoading(false)
        return
      }

      // Redirect to Stripe Checkout
      if (json.stripeUrl) {
        window.location.href = json.stripeUrl
      } else {
        router.push(`/grazie-iscrizione?orderId=${json.orderId}`)
      }
    } catch {
      setApiError('Impossibile raggiungere il server. Controlla la connessione e riprova.')
      setLoading(false)
    }
  }

  return (
    <div className="relative min-h-screen bg-ink overflow-hidden">

      {/* Atmospheric blooms */}
      <div
        className="absolute pointer-events-none"
        style={{
          top: '-20%', right: '-15%', width: '60vw', height: '60vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(58,80,64,0.12) 0%, transparent 70%)', filter: 'blur(100px)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: '-15%', left: '-10%', width: '50vw', height: '50vw', borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(190,153,56,0.07) 0%, transparent 70%)', filter: 'blur(120px)',
        }}
      />
      <div className="absolute inset-0 pointer-events-none grain opacity-[0.04]" aria-hidden="true" />

      {/* Header */}
      <header className="relative z-20 max-w-[1440px] mx-auto px-8 md:px-20 pt-10 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3" aria-label="Home">
          <span className="font-headline text-gold text-2xl font-light tracking-[0.12em]">CIM</span>
          <span className="w-px h-5 bg-gold/20 hidden sm:block" />
          <span className="font-body text-[9px] tracking-[0.3em] uppercase text-warm/50 hidden sm:block leading-tight">
            Campionato<br />Italiano Massaggiatori
          </span>
        </Link>
        {/* Step indicator */}
        <div className="hidden sm:flex items-center gap-3 font-body text-[9px] tracking-[0.3em] uppercase">
          {(['1', '2', '3'] as const).map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              {i > 0 && <div className="w-6 h-px bg-warm/15" />}
              <div className={`w-6 h-6 rounded-full border flex items-center justify-center text-[9px] transition-all duration-300 ${
                Number(s) < step ? 'bg-gold/20 border-gold/40 text-gold/80' :
                Number(s) === step ? 'border-gold/60 text-gold' : 'border-warm/20 text-warm/40'
              }`}>
                {Number(s) < step ? <Check size={9} /> : s}
              </div>
            </div>
          ))}
        </div>
      </header>

      {/* Back link */}
      <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 pt-8">
        <button
          onClick={() => step > 1 ? setStep((step - 1) as 1|2|3) : router.push('/')}
          className="inline-flex items-center gap-2 font-body text-[10px] tracking-[0.28em] uppercase text-warm/60 hover:text-warm/85 transition-colors group"
        >
          <ArrowLeft size={12} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
          {step > 1 ? 'Indietro' : 'Torna alla Home'}
        </button>
      </div>

      {/* Main content */}
      <main className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 pt-10 pb-24">
        <div className="max-w-[900px] mx-auto">

          {/* ── STEP 1 — Dati personali ── */}
          {step === 1 && (
            <form onSubmit={form1.handleSubmit(data => { setDatiPersonali(data); setStep(2) })} noValidate>
              <div className="mb-10">
                <p className="font-body text-[9px] tracking-[0.35em] uppercase text-gold/55 mb-3">Passo 1 di 3</p>
                <h1 className="font-headline font-light text-warm" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  I tuoi dati
                </h1>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <FormField
                  id="nome" label="Nome *" error={form1.formState.errors.nome?.message}
                  {...form1.register('nome')} placeholder="Mario" autoComplete="given-name"
                />
                <FormField
                  id="cognome" label="Cognome *" error={form1.formState.errors.cognome?.message}
                  {...form1.register('cognome')} placeholder="Rossi" autoComplete="family-name"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <FormField
                  id="email" label="Email *" type="email" error={form1.formState.errors.email?.message}
                  {...form1.register('email')} placeholder="mario.rossi@email.it" autoComplete="email"
                />
                <FormField
                  id="telefono" label="Telefono *" type="tel" error={form1.formState.errors.telefono?.message}
                  {...form1.register('telefono')} placeholder="+39 333 1234567" autoComplete="tel"
                />
              </div>
              <div className="mb-8">
                <label htmlFor="professione" className="font-body text-[9px] tracking-[0.28em] uppercase text-warm/40 block mb-2">
                  Professione *
                </label>
                <select
                  id="professione"
                  {...form1.register('professione')}
                  className="w-full bg-white/5 border border-warm/15 rounded-xl px-4 py-3 font-body text-sm text-warm/80 focus:outline-none focus:border-gold/40 transition-colors"
                >
                  <option value="">Seleziona…</option>
                  {professioni.map(p => <option key={p} value={p}>{p}</option>)}
                </select>
                {form1.formState.errors.professione && (
                  <p className="font-body text-xs text-red-400/80 mt-1">{form1.formState.errors.professione.message}</p>
                )}
              </div>

              <button
                type="submit"
                className="group inline-flex items-center gap-3 font-body text-[10px] tracking-[0.25em] uppercase text-ink bg-gold rounded-full px-8 py-3.5 hover:bg-gold/90 transition-all duration-300"
              >
                Avanti: scegli le categorie
                <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </form>
          )}

          {/* ── STEP 2 — Selezione categorie ── */}
          {step === 2 && (
            <div>
              <div className="mb-10">
                <p className="font-body text-[9px] tracking-[0.35em] uppercase text-gold/55 mb-3">Passo 2 di 3</p>
                <h1 className="font-headline font-light text-warm mb-2" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  Scegli le categorie
                </h1>
                <p className="font-body text-sm font-light text-warm/40">
                  Puoi iscriverti a più discipline. La seconda categoria in poi costa €90.
                </p>
              </div>

              <div className="flex flex-col gap-3 mb-8">
                {CATEGORIE_ORDER.map(id => {
                  const cat = CATEGORIE_CONFIG[id]
                  const sel = categorieSel.includes(id)
                  return (
                    <button
                      key={id}
                      type="button"
                      onClick={() => toggleCategoria(id)}
                      className={`flex items-center justify-between px-7 py-5 rounded-2xl border transition-all duration-300 text-left ${
                        sel
                          ? 'border-gold/40 bg-gold/8'
                          : 'border-warm/10 hover:border-warm/20 bg-white/[0.03]'
                      }`}
                      aria-pressed={sel}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded border flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                          sel ? 'bg-gold border-gold' : 'border-warm/25'
                        }`}>
                          {sel && <Check size={11} strokeWidth={2.5} className="text-ink" />}
                        </div>
                        <div>
                          <p className="font-body text-sm font-light text-warm/85">{cat.nome}</p>
                          <p className="font-body text-[10px] text-warm/55">{cat.durataProva}</p>
                        </div>
                      </div>
                      <span className="font-body text-sm text-warm/50">
                        {categorieSel.length > 0 && !categorieSel.includes(id)
                          ? '€90'
                          : categorieSel[0] === id
                          ? `€${cat.prezzoIscrizione}`
                          : sel ? '€90' : `€${cat.prezzoIscrizione}`}
                      </span>
                    </button>
                  )
                })}
              </div>

              {categorieSel.length === 0 && (
                <p className="font-body text-xs text-red-400/70 mb-4 flex items-center gap-2">
                  <AlertCircle size={12} /> Seleziona almeno una categoria
                </p>
              )}

              {/* Totale */}
              {categorieSel.length > 0 && (
                <div className="border border-gold/15 rounded-xl p-5 mb-8 bg-gold/[0.04]">
                  <p className="font-body text-[9px] tracking-[0.28em] uppercase text-gold/55 mb-3">Riepilogo</p>
                  {categorieSel.map((id, i) => (
                    <div key={id} className="flex justify-between font-body text-xs text-warm/55 mb-1">
                      <span>{CATEGORIE_CONFIG[id].nome}</span>
                      <span>€{i === 0 ? CATEGORIE_CONFIG[id].prezzoIscrizione : 90}</span>
                    </div>
                  ))}
                  <div className="h-px bg-gold/15 my-3" />
                  <div className="flex justify-between font-body text-sm text-warm/80">
                    <span>Totale (IVA incl.)</span>
                    <span className="font-medium">€{totaleEuro}</span>
                  </div>
                  <p className="font-body text-[10px] text-warm/50 mt-1">
                    Imponibile €{imponibile} + IVA 22% €{iva}
                  </p>
                </div>
              )}

              <button
                type="button"
                disabled={categorieSel.length === 0}
                onClick={() => setStep(3)}
                className="group inline-flex items-center gap-3 font-body text-[10px] tracking-[0.25em] uppercase text-ink bg-gold rounded-full px-8 py-3.5 hover:bg-gold/90 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Avanti: conferma e paga
                <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
              </button>
            </div>
          )}

          {/* ── STEP 3 — Riepilogo + consensi + pagamento ── */}
          {step === 3 && (
            <form onSubmit={form3.handleSubmit(handleFinalSubmit)} noValidate>
              <div className="mb-10">
                <p className="font-body text-[9px] tracking-[0.35em] uppercase text-gold/55 mb-3">Passo 3 di 3</p>
                <h1 className="font-headline font-light text-warm" style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}>
                  Conferma e paga
                </h1>
              </div>

              {/* Riepilogo ordine */}
              <div className="border border-warm/10 rounded-2xl p-7 mb-7 bg-white/[0.03]">
                <p className="font-body text-[9px] tracking-[0.28em] uppercase text-warm/55 mb-5">Riepilogo iscrizione</p>
                <div className="grid grid-cols-2 gap-y-2 mb-5">
                  <span className="font-body text-xs text-warm/60">Concorrente</span>
                  <span className="font-body text-xs text-warm/80">{datiPersonali?.nome} {datiPersonali?.cognome}</span>
                  <span className="font-body text-xs text-warm/60">Email</span>
                  <span className="font-body text-xs text-warm/80">{datiPersonali?.email}</span>
                  <span className="font-body text-xs text-warm/60">Categorie</span>
                  <div>
                    {categorieSel.map(id => (
                      <span key={id} className="block font-body text-xs text-warm/70">{CATEGORIE_CONFIG[id].nome}</span>
                    ))}
                  </div>
                </div>
                <div className="h-px bg-warm/8 mb-4" />
                <div className="flex justify-between">
                  <span className="font-body text-sm text-warm/60">Totale (IVA 22% inclusa)</span>
                  <span className="font-headline text-xl text-gold/90">€{totaleEuro}</span>
                </div>
              </div>

              {/* Consensi */}
              <div className="space-y-4 mb-8">
                <ConsensoCheckbox
                  id="privacy"
                  error={form3.formState.errors.privacy?.message}
                  {...form3.register('privacy')}
                >
                  Ho letto e accetto la{' '}
                  <a href="/privacy-policy" target="_blank" className="text-gold/70 underline underline-offset-2 hover:text-gold">Privacy Policy</a>
                </ConsensoCheckbox>
                <ConsensoCheckbox
                  id="regolamento"
                  error={form3.formState.errors.regolamento?.message}
                  {...form3.register('regolamento')}
                >
                  Ho letto e accetto il{' '}
                  <a href="/regolamento" target="_blank" className="text-gold/70 underline underline-offset-2 hover:text-gold">Regolamento del campionato</a>
                </ConsensoCheckbox>
              </div>

              {/* Sicurezza */}
              <div className="flex items-center gap-2 mb-8">
                <Shield size={12} strokeWidth={1.5} className="text-warm/45" />
                <p className="font-body text-[10px] text-warm/45">
                  Pagamento sicuro tramite Stripe · I dati della carta non vengono mai memorizzati sul nostro server
                </p>
              </div>

              {apiError && (
                <div className="flex items-start gap-3 p-4 rounded-xl border border-red-400/20 bg-red-400/[0.05] mb-5">
                  <AlertCircle size={14} strokeWidth={1.5} className="text-red-400/70 flex-shrink-0 mt-0.5" />
                  <p className="font-body text-xs text-red-400/80">{apiError}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="group inline-flex items-center gap-3 font-body text-[10px] tracking-[0.25em] uppercase text-ink bg-gold rounded-full px-8 py-3.5 hover:bg-gold/90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <><Loader2 size={13} className="animate-spin" /> Reindirizzamento…</>
                ) : (
                  <>
                    Procedi al pagamento
                    <ArrowRight size={11} className="transition-transform duration-300 group-hover:translate-x-0.5" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  )
}

// ---------------------------------------------------------------------------
// FormField helper
// ---------------------------------------------------------------------------
interface FormFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  label: string
  error?: string
}

const FormField = ({ id, label, error, ...props }: FormFieldProps) => (
  <div>
    <label htmlFor={id} className="font-body text-[9px] tracking-[0.28em] uppercase text-warm/60 block mb-2">
      {label}
    </label>
    <input
      id={id}
      className="w-full bg-white/5 border border-warm/15 rounded-xl px-4 py-3 font-body text-sm text-warm/80 placeholder:text-warm/20 focus:outline-none focus:border-gold/40 transition-colors"
      {...props}
    />
    {error && <p className="font-body text-xs text-red-400/80 mt-1">{error}</p>}
  </div>
)

// ---------------------------------------------------------------------------
// ConsensoCheckbox helper
// ---------------------------------------------------------------------------
interface ConsensoProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  error?: string
  children: React.ReactNode
}

import { forwardRef } from 'react'

const ConsensoCheckbox = forwardRef<HTMLInputElement, ConsensoProps>(
  ({ id, error, children, ...props }, ref) => (
    <div>
      <label htmlFor={id} className="flex items-start gap-3 cursor-pointer group">
        <input
          ref={ref}
          id={id}
          type="checkbox"
          className="mt-0.5 flex-shrink-0 w-4 h-4 rounded border border-warm/25 bg-white/5 checked:bg-gold checked:border-gold focus:outline-none transition-colors"
          {...props}
        />
        <span className="font-body text-xs font-light text-warm/55 leading-relaxed group-hover:text-warm/70 transition-colors">
          {children}
        </span>
      </label>
      {error && (
        <p className="font-body text-xs text-red-400/80 mt-1 ml-7 flex items-center gap-1">
          <AlertCircle size={10} /> {error}
        </p>
      )}
    </div>
  )
)
ConsensoCheckbox.displayName = 'ConsensoCheckbox'

