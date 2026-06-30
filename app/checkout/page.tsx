import { Suspense } from 'react'
import type { Metadata } from 'next'
import CheckoutForm from './CheckoutForm'

export const metadata: Metadata = {
  title:       'Checkout — Campionato Italiano di Massaggio 2026',
  description: 'Completa l\'acquisto del tuo pass per il CIM 2026 a Milano.',
}

// ---------------------------------------------------------------------------
// Checkout Page — Server Component
//
// Wraps the Client Component in a Suspense boundary, come richiesto da
// Next.js per i componenti che usano useSearchParams() durante il prerender.
// ---------------------------------------------------------------------------
export default function CheckoutPage() {
  return (
    <Suspense fallback={<CheckoutSkeleton />}>
      <CheckoutForm />
    </Suspense>
  )
}

// ---------------------------------------------------------------------------
// Skeleton — mostrato durante il prerender / hydration
// ---------------------------------------------------------------------------
function CheckoutSkeleton() {
  return (
    <div className="min-h-screen bg-ink flex items-center justify-center">
      <div className="flex flex-col items-center gap-6">
        {/* Animated gold orb */}
        <div
          className="w-12 h-12 rounded-full border border-gold/20"
          style={{ animation: 'pulse-gold 2s ease-in-out infinite' }}
        />
        <p className="font-body text-[10px] tracking-[0.38em] uppercase text-warm/25">
          Caricamento…
        </p>
      </div>
    </div>
  )
}
