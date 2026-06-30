import type { Metadata } from "next"
import { Cormorant_Garamond, Jost } from "next/font/google"
import "./globals.css"

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
})

const jost = Jost({
  variable: "--font-jost",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "Campionato Italiano di Massaggio 2026 · I Edizione · Milano",
  description:
    "Il primo campionato nazionale dedicato all'arte del massaggio professionale. Milano, 14–15 Giugno 2026. Quattro discipline, i migliori professionisti italiani, una giuria internazionale.",
  keywords: [
    "campionato italiano massaggio",
    "massaggio professionale",
    "Milano 2026",
    "wellness",
    "competizione massaggio",
    "massaggio svedese",
    "deep tissue",
  ],
  openGraph: {
    title: "Campionato Italiano di Massaggio 2026",
    description: "14–15 Giugno 2026 · Palazzo delle Stelline, Milano",
    type: "website",
    locale: "it_IT",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="it"
      className={`${cormorant.variable} ${jost.variable}`}
    >
      <body className="min-h-screen">{children}</body>
    </html>
  )
}
