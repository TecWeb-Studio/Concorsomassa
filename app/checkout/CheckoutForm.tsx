'use client'

import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import {
  ArrowLeft,
  ArrowRight,
  Loader2,
  Check,
  X,
  AlertCircle,
  Shield,
  Sparkles,
} from 'lucide-react'
import { PASS_CONFIG, calcolaImponibile } from '@/lib/ticket-config'

// ---------------------------------------------------------------------------
// Zod schema — factory che adatta la validazione al tipo di pass
// ---------------------------------------------------------------------------
function makeSchema(isCompetitore: boolean) {
  return z.object({
    nome: z
      .string()
      .min(2, 'Il nome deve contenere almeno 2 caratteri')
      .max(50, 'Nome troppo lungo')
      .regex(/^[A-Za-zÀ-ÿ\s'-]+$/, 'Caratteri non validi nel nome'),
    cognome: z
      .string()
      .min(2, 'Il cognome deve contenere almeno 2 caratteri')
      .max(50, 'Cognome troppo lungo')
      .regex(/^[A-Za-zÀ-ÿ\s'-]+$/, 'Caratteri non validi nel cognome'),
    email: z
      .string()
      .email('Inserisci un indirizzo email valido')
      .max(120, 'Email troppo lunga'),
    telefono: z
      .string()
      .regex(
        /^\+?[\d\s\-().]{8,20}$/,
        'Formato non valido (es. +39 02 1234567 oppure 3201234567)'
      ),
    categoria: isCompetitore
      ? z.string().min(1, 'Seleziona la categoria di gara in cui vuoi competere')
      : z.string().optional(),
    privacy: z.literal(true, {
      message: 'È necessario accettare la privacy policy per procedere',
    }),
  })
}

type CheckoutFormValues = z.infer<ReturnType<typeof makeSchema>>

// ---------------------------------------------------------------------------
// API response types
// ---------------------------------------------------------------------------
interface CheckoutSuccessData {
  orderId:   string
  status:    'PENDING'
  totalPrice: number
  expiresAt: string
  ticketType: { id: string; nome: string; prezzo: number }
  quantity:  number
  cliente:   { nome: string; cognome: string; email: string }
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export default function CheckoutForm() {
  const searchParams  = useSearchParams()
  const router        = useRouter()
  const typeParam     = searchParams.get('type') ?? ''
  const pass          = PASS_CONFIG[typeParam]
  const isCompetitore = typeParam === 'pass-competitore'

  // Form state
  const schema = makeSchema(isCompetitore)
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(schema),
    defaultValues: { categoria: '', privacy: undefined as unknown as true },
  })

  // UI state
  const [apiError,   setApiError]   = useState<string | null>(null)
  const [successData, setSuccessData] = useState<CheckoutSuccessData | null>(null)
  const [countdown,   setCountdown]   = useState(5)
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Redirect to tickets if no valid type provided
  useEffect(() => {
    if (typeParam && !pass) {
      router.replace('/tickets')
    }
  }, [typeParam, pass, router])

  // Countdown after success
  useEffect(() => {
    if (!successData) return
    countdownRef.current = setInterval(() => {
      setCountdown((c) => {
        if (c <= 1) {
          clearInterval(countdownRef.current!)
          router.push('/')   // In produzione: redirect al payment gateway
          return 0
        }
        return c - 1
      })
    }, 1000)
    return () => { if (countdownRef.current) clearInterval(countdownRef.current) }
  }, [successData, router])

  // Invalid pass type — render nothing while redirecting
  if (!pass) return null

  const { imponibile, iva, totale } = calcolaImponibile(pass.prezzo)

  // ---------------------------------------------------------------------------
  // Submit handler
  // ---------------------------------------------------------------------------
  async function onSubmit(values: CheckoutFormValues) {
    setApiError(null)
    try {
      const res = await fetch('/api/checkout', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome:         values.nome,
          cognome:      values.cognome,
          email:        values.email,
          telefono:     values.telefono,
          ticketTypeId: pass.id,
          quantity:     1,
          categoria:    values.categoria ?? undefined,
        }),
      })

      const json = await res.json()

      if (!res.ok) {
        setApiError(json.error ?? 'Errore imprevisto. Riprova tra qualche istante.')
        return
      }

      setSuccessData(json.data as CheckoutSuccessData)
    } catch {
      setApiError(
        'Impossibile raggiungere il server. Controlla la connessione e riprova.'
      )
    }
  }

  return (
    <>
      {/* ── Full-screen success modal ── */}
      {successData && (
        <SuccessModal
          passNome={pass.nome}
          countdown={countdown}
          cliente={successData.cliente}
        />
      )}

      {/* ── Page background & atmosphere ── */}
      <div className="relative min-h-screen bg-ink overflow-hidden">

        {/* Atmospheric blooms */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: '-20%', right: '-15%',
            width: '60vw', height: '60vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(58,80,64,0.12) 0%, transparent 70%)',
            filter: 'blur(100px)',
          }}
        />
        <div
          className="absolute pointer-events-none"
          style={{
            bottom: '-15%', left: '-10%',
            width: '50vw', height: '50vw',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(190,153,56,0.07) 0%, transparent 70%)',
            filter: 'blur(120px)',
          }}
        />

        {/* Film grain */}
        <div className="absolute inset-0 pointer-events-none grain opacity-[0.04]" aria-hidden="true" />

        {/* ── Minimal header ── */}
        <header className="relative z-20 max-w-[1440px] mx-auto px-8 md:px-20 lg:px-28 pt-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3" aria-label="Home">
            <span className="font-headline text-gold text-2xl font-light tracking-[0.12em]">CIM</span>
            <span className="w-px h-5 bg-gold/20 hidden sm:block" />
            <span className="font-body text-[9px] tracking-[0.3em] uppercase text-warm/30 hidden sm:block leading-tight">
              Campionato<br />Italiano di Massaggio
            </span>
          </Link>

          {/* Breadcrumb */}
          <div className="hidden sm:flex items-center gap-2 font-body text-[9px] tracking-[0.28em] uppercase">
            <Link href="/" className="text-warm/30 hover:text-warm/60 transition-colors">Home</Link>
            <span className="text-warm/15">›</span>
            <span className="text-gold/60">Checkout</span>
          </div>
        </header>

        {/* Back link */}
        <div className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 lg:px-28 pt-10">
          <Link
            href="/"
            className="inline-flex items-center gap-2 font-body text-[10px] tracking-[0.28em] uppercase text-warm/35 hover:text-warm/65 transition-colors duration-300 group"
          >
            <ArrowLeft size={12} className="transition-transform duration-300 group-hover:-translate-x-0.5" />
            Torna alla Home
          </Link>
        </div>

        {/* ── Main checkout layout ── */}
        <main className="relative z-10 max-w-[1440px] mx-auto px-8 md:px-20 lg:px-28 pt-12 pb-24 md:pb-36">
          {/* Coming Soon Section */}
          <ComingSoonSection />
        </main>
      </div>
    </>
  )
}

// ---------------------------------------------------------------------------
// ComingSoonSection — Presto disponibile page
// ---------------------------------------------------------------------------
function ComingSoonSection() {
  return (
    <div className="py-20 md:py-32 flex items-center justify-center min-h-[60vh]">
      <div className="max-w-2xl mx-auto text-center animate-fade-up">
        {/* Decorative top line */}
        <div className="flex items-center justify-center mb-8">
          <div className="h-px bg-gold/30 w-12" />
          <div
            className="w-8 h-8 rounded-full border border-gold/40 flex items-center justify-center mx-4"
            style={{ animation: 'pulse-gold 2s ease-in-out infinite' }}
          >
            <Sparkles size={14} className="text-gold/60" />
          </div>
          <div className="h-px bg-gold/30 w-12" />
        </div>

        {/* Main heading */}
        <h1
          className="font-headline font-light text-warm leading-[1.0] mb-6"
          style={{ fontSize: 'clamp(2.5rem, 5vw, 4.2rem)' }}
        >
          Presto<br />
          <em className="not-italic text-gold/75">disponibile.</em>
        </h1>

        {/* Description */}
        <p className="font-body text-[14px] md:text-[16px] font-light leading-[1.9] text-warm/50 mb-12 max-w-xl mx-auto">
          La fase di prenotazione dei biglietti sarà disponibile a breve.
          <br />
          Rimani aggiornato seguendo i nostri canali per scoprire quando potrai acquistare il tuo pass per il Campionato Italiano di Massaggio 2026.
        </p>

        {/* Decorative gold line */}
        <div className="flex justify-center mb-12">
          <div 
            className="h-px bg-gold/30 origin-center animate-draw-line" 
            style={{ width: '80px' }} 
          />
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-3 font-body text-[11px] tracking-[0.28em] uppercase rounded-full px-8 py-4.5 transition-all duration-300 bg-gold text-ink hover:bg-gold-light hover:shadow-[0_0_50px_rgba(190,153,56,0.4)] active:scale-[0.98]"
          >
            <ArrowLeft size={13} strokeWidth={1.5} />
            <span>Torna alla Home</span>
          </Link>
          <a
            href="mailto:info@concorsomassaggio.it"
            className="inline-flex items-center justify-center gap-3 font-body text-[11px] tracking-[0.28em] uppercase rounded-full px-8 py-4.5 transition-all duration-300 border border-gold/40 text-gold/60 hover:border-gold/70 hover:text-gold/90"
          >
            <span>Contattaci</span>
          </a>
        </div>

        {/* Bottom note */}
        <p className="mt-16 font-body text-[10px] text-warm/25 tracking-[0.15em] uppercase">
          Campionato Italiano di Massaggio — Milano 2026
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// FormField — styled input wrapper
// ---------------------------------------------------------------------------
import { forwardRef } from 'react'
import type { InputHTMLAttributes } from 'react'

interface FormFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label:  string
  id:     string
  error?: string
  hint?:  string
}

const FormField = forwardRef<HTMLInputElement, FormFieldProps>(
  function FormField({ label, id, error, hint, ...props }, ref) {
    return (
      <div>
        <label
          htmlFor={id}
          className="block font-body text-[10px] tracking-[0.3em] uppercase text-warm/45 mb-3"
        >
          {label}
          <span className="ml-1 text-gold/60">*</span>
        </label>
        <input
          id={id}
          ref={ref}
          {...props}
          className={[
            'w-full bg-charcoal/80 border rounded-xl px-5 py-4',
            'font-body text-[13px] text-warm/80 placeholder:text-warm/20',
            'transition-all duration-300',
            'focus:outline-none focus:ring-1',
            error
              ? 'border-red-500/50 focus:border-red-500/70 focus:ring-red-500/20'
              : 'border-warm/10 focus:border-gold/50 focus:ring-gold/15 hover:border-warm/20',
          ].join(' ')}
        />
        {hint && !error && (
          <p className="mt-2 font-body text-[10px] text-warm/25 leading-relaxed">{hint}</p>
        )}
        {error && <FieldError message={error} />}
      </div>
    )
  }
)

// ---------------------------------------------------------------------------
// FieldError — inline validation message
// ---------------------------------------------------------------------------
function FieldError({ message }: { message: string }) {
  return (
    <p className="mt-2 flex items-start gap-1.5 font-body text-[11px] text-red-400/80">
      <AlertCircle size={11} className="mt-0.5 shrink-0" />
      {message}
    </p>
  )
}

// ---------------------------------------------------------------------------
// ApiErrorBanner — full-width dismissible error
// ---------------------------------------------------------------------------
function ApiErrorBanner({ message, onDismiss }: { message: string; onDismiss: () => void }) {
  return (
    <div className="flex items-start gap-3 bg-red-500/8 border border-red-500/20 rounded-xl px-5 py-4">
      <AlertCircle size={15} className="text-red-400/80 mt-0.5 shrink-0" />
      <p className="font-body text-[12px] font-light leading-[1.7] text-red-300/80 flex-1">
        {message}
      </p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="Chiudi errore"
        className="text-red-400/50 hover:text-red-400/80 transition-colors"
      >
        <X size={14} />
      </button>
    </div>
  )
}

// ---------------------------------------------------------------------------
// SubmitButton — with loading spinner
// ---------------------------------------------------------------------------
function SubmitButton({ isLoading }: { isLoading: boolean }) {
  return (
    <button
      type="submit"
      disabled={isLoading}
      className={[
        'w-full inline-flex items-center justify-center gap-3',
        'font-body text-[11px] tracking-[0.28em] uppercase',
        'rounded-full px-8 py-4.5 transition-all duration-300',
        isLoading
          ? 'bg-gold/50 text-ink/60 cursor-not-allowed'
          : 'bg-gold text-ink hover:bg-gold-light hover:shadow-[0_0_50px_rgba(190,153,56,0.4)] active:scale-[0.98]',
      ].join(' ')}
    >
      {isLoading ? (
        <>
          <Loader2 size={14} className="animate-spin" />
          <span>Elaborazione…</span>
        </>
      ) : (
        <>
          <Shield size={13} strokeWidth={1.5} />
          <span>Procedi al pagamento</span>
          <ArrowRight size={13} className="ml-0.5" />
        </>
      )}
    </button>
  )
}

// ---------------------------------------------------------------------------
// OrderSummary — right column card
// ---------------------------------------------------------------------------
interface OrderSummaryProps {
  pass:          typeof PASS_CONFIG[string]
  imponibile:    number
  iva:           number
  totale:        number
  isCompetitore: boolean
  isLoading:     boolean
  apiError:      string | null
  onDismissError: () => void
}

function OrderSummary({
  pass, imponibile, iva, totale,
  isCompetitore, isLoading, apiError, onDismissError,
}: OrderSummaryProps) {
  return (
    <div className="bg-charcoal/70 border border-warm/8 rounded-2xl overflow-hidden">

      {/* Card header */}
      <div className="relative px-8 py-7 border-b border-warm/8">
        {/* Background glow */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 100% 200% at 50% -50%, rgba(190,153,56,0.04) 0%, transparent 70%)',
          }}
        />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-4 h-px bg-gold/40" />
            <p className="font-body text-[9px] tracking-[0.35em] uppercase text-gold/50">
              Riepilogo ordine
            </p>
          </div>
          <p
            className="font-headline font-light text-warm leading-none"
            style={{ fontSize: 'clamp(1.5rem, 2.2vw, 2rem)' }}
          >
            {pass.nome}
          </p>
          <p className="font-body text-[10px] tracking-[0.2em] uppercase text-warm/30 mt-1.5">
            {pass.sottotitolo}
          </p>
        </div>
      </div>

      {/* Features recap */}
      <div className="px-8 py-6 border-b border-warm/6">
        <ul className="space-y-2.5">
          {pass.features.slice(0, isCompetitore ? 4 : 5).map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check size={10} strokeWidth={2} className="text-gold/40 mt-0.5 shrink-0" />
              <span className="font-body text-[11px] font-light leading-[1.6] text-warm/40">{f}</span>
            </li>
          ))}
          {isCompetitore && pass.features.length > 4 && (
            <li className="flex items-start gap-2.5">
              <span className="text-warm/20 font-body text-[11px] pl-[22px]">
                +{pass.features.length - 4} altro/i inclusi
              </span>
            </li>
          )}
        </ul>
      </div>

      {/* Price breakdown */}
      <div className="px-8 py-6 space-y-3">
        <div className="flex items-center justify-between">
          <span className="font-body text-[11px] tracking-[0.15em] text-warm/35">Imponibile</span>
          <span className="font-body text-[12px] text-warm/50">€{imponibile.toFixed(2)}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-body text-[11px] tracking-[0.15em] text-warm/35">IVA (22%)</span>
          <span className="font-body text-[12px] text-warm/50">€{iva.toFixed(2)}</span>
        </div>

        {/* Divider */}
        <div className="h-px bg-warm/8 my-1" />

        <div className="flex items-end justify-between pt-1">
          <span className="font-body text-[11px] tracking-[0.2em] uppercase text-warm/50">Totale</span>
          <div className="flex items-end gap-1">
            <span
              className="font-headline font-light text-gold leading-none"
              style={{ fontSize: '1.8rem' }}
            >
              €{totale}
            </span>
            <span className="font-body text-[9px] text-warm/25 mb-1">IVA incl.</span>
          </div>
        </div>
      </div>

      {/* API error (desktop) */}
      {apiError && (
        <div className="px-8 pb-4">
          <ApiErrorBanner message={apiError} onDismiss={onDismissError} />
        </div>
      )}

      {/* CTA (desktop) */}
      <div className="hidden lg:block px-8 pb-8">
        <SubmitButton isLoading={isLoading} />
      </div>

      {/* Security note */}
      <div className="px-8 pb-7 flex items-center gap-2">
        <Shield size={11} strokeWidth={1.5} className="text-warm/20 shrink-0" />
        <p className="font-body text-[10px] leading-[1.6] text-warm/20">
          Transazione sicura · Pagamento cifrato SSL · Dati protetti
        </p>
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// SuccessModal — full-screen zen overlay
// ---------------------------------------------------------------------------
interface SuccessModalProps {
  passNome:  string
  countdown: number
  cliente:   { nome: string; cognome: string; email: string }
}

function SuccessModal({ passNome, countdown, cliente }: SuccessModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 bg-ink/96 backdrop-blur-2xl flex items-center justify-center p-8 animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="Prenotazione avviata con successo"
    >
      {/* Atmospheric glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(58,80,64,0.2) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 40% 40% at 50% 50%, rgba(190,153,56,0.06) 0%, transparent 60%)',
        }}
      />
      <div className="absolute inset-0 grain opacity-[0.04] pointer-events-none" aria-hidden="true" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-[520px] mx-auto">

        {/* Animated circle check */}
        <div className="flex justify-center mb-10">
          <div className="relative w-20 h-20">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-gold/20 animate-[pulse-gold_2.5s_ease-in-out_infinite]" />
            {/* Inner circle */}
            <div className="absolute inset-2 rounded-full bg-sage/15 border border-sage/30 flex items-center justify-center">
              <Sparkles size={24} strokeWidth={1} className="text-gold/70" />
            </div>
          </div>
        </div>

        {/* Eyebrow */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="h-px bg-gold/30 w-8" />
          <p className="font-body text-[9px] tracking-[0.4em] uppercase text-gold/50">
            {passNome}
          </p>
          <div className="h-px bg-gold/30 w-8" />
        </div>

        {/* Main heading */}
        <h2
          className="font-headline font-light text-warm leading-[1.0] mb-6"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 3.2rem)' }}
        >
          Prenotazione<br />
          <em className="not-italic text-gold/75">avviata.</em>
        </h2>

        {/* Gold rule */}
        <div className="flex justify-center mb-8">
          <div className="h-px bg-gold/30 origin-center animate-draw-line" style={{ width: '60px' }} />
        </div>

        {/* Message */}
        <p className="font-body text-[13px] font-light leading-[1.9] text-warm/50 mb-10 max-w-sm mx-auto">
          Gentile{' '}
          <span className="text-warm/70">{cliente.nome}</span>,
          stiamo reindirizzando verso il gateway di pagamento sicuro.
          Il posto è riservato per te per i prossimi 15 minuti.
        </p>

        {/* Countdown */}
        <div className="flex items-center justify-center gap-3">
          <Loader2 size={13} className="animate-spin text-gold/40" />
          <p className="font-body text-[11px] tracking-[0.25em] uppercase text-warm/30">
            Reindirizzamento in {countdown}…
          </p>
        </div>

        {/* Bottom note */}
        <p className="mt-8 font-body text-[10px] text-warm/18 tracking-[0.15em]">
          Conferma inviata a {cliente.email}
        </p>
      </div>
    </div>
  )
}
