import { redirect } from 'next/navigation'

// La pagina /tickets è stata sostituita dal flusso diretto /checkout
export default function TicketsPage() {
  redirect('/checkout')
}

