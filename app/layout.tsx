import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond, Tenor_Sans } from 'next/font/google'
import './globals.css'
import { OrganizationJsonLd } from '@/components/seo/JsonLd'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  display: 'swap',
})

const tenor = Tenor_Sans({
  variable: '--font-tenor',
  subsets: ['latin'],
  weight: '400',
  display: 'swap',
})

const SITE_URL = 'https://www.syrama.ae'
const SITE_NAME = 'Syrama · Dubai Private Concierge'
const DESCRIPTION =
  'Syrama is a Dubai private concierge for HNWI clients — private aviation, ultra-luxury villas, superyacht charters, iconic events and bespoke requests, arranged within hours with absolute discretion.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: '%s · Syrama',
  },
  description: DESCRIPTION,
  applicationName: 'Syrama',
  keywords: [
    'Dubai concierge',
    'luxury concierge Dubai',
    'private jet Dubai',
    'private aviation',
    'yacht charter',
    'luxury villa rental',
    'private events',
    'bespoke travel',
    'HNWI concierge',
    'Syrama',
  ],
  authors: [{ name: 'Syrama Concierge Services – FZCO' }],
  creator: 'Syrama',
  publisher: 'Syrama Concierge Services – FZCO',
  alternates: {
    canonical: '/',
  },
  category: 'Travel',
  formatDetection: {
    telephone: true,
    email: true,
    address: false,
  },
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: SITE_NAME,
    description: DESCRIPTION,
    url: SITE_URL,
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE_NAME,
    description: DESCRIPTION,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // favicon.ico, icon.tsx and apple-icon.tsx are auto-detected by Next.
  manifest: '/manifest.webmanifest',
  // Add your Google Search Console token here once verified:
  // verification: { google: 'xxxxxxxxxxxxxxxxxxxxxxxx' },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#06090f',
  colorScheme: 'dark',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      className={`${cormorant.variable} ${tenor.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">Skip to content</a>
        <OrganizationJsonLd />
        {children}
        <WhatsAppButton />
      </body>
    </html>
  )
}
