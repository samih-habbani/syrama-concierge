import type { Metadata } from 'next'
import { Cormorant_Garamond, Tenor_Sans } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
})

const tenor = Tenor_Sans({
  variable: '--font-tenor',
  subsets: ['latin'],
  weight: '400',
})

export const metadata: Metadata = {
  title: 'Syrama · Dubai Private Concierge',
  description: 'Extraordinary private experiences for HNWI clients. Private aviation, villas, yachting and bespoke events from Dubai.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${tenor.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  )
}
