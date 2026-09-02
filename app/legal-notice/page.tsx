import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Legal Notice',
  description: 'Legal notice for syrama.ae — publisher, hosting and intellectual property information.',
  alternates: { canonical: '/legal-notice' },
}

export default function LegalNoticePage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Legal Notice"
      updated="September 2026"
      sections={[
        {
          heading: 'Publisher',
          body: (
            <>
              The website <strong>https://syrama.ae</strong> is published by:<br />
              <strong>Syrama Concierge Services – FZCO</strong><br />
              Company registered in the United Arab Emirates<br />
              Address: IFZA Properties, Dubai Silicon Oasis, Dubai, UAE<br />
              Email: contact@syrama.ae<br />
              Phone: +971 50 554 8034
            </>
          ),
        },
        {
          heading: 'Publication Director',
          body: <>Samih Habbani &amp; Adel Tahan — legal representatives.</>,
        },
        {
          heading: 'Hosting Provider',
          body: (
            <>
              Vercel Inc.<br />
              340 S Lemon Ave #4133, Walnut, CA 91789, United States<br />
              vercel.com
            </>
          ),
        },
        {
          heading: 'Intellectual Property',
          body: <>All site content (content, visuals, texts, logo, design) is protected by copyright. Any full or partial reproduction without authorization is prohibited.</>,
        },
        {
          heading: 'Liability',
          body: <>We aim to maintain current and trustworthy information. However, the website disclaims responsibility for inaccuracies, gaps, or technical malfunctions.</>,
        },
        {
          heading: 'Personal Data',
          body: <>Information obtained through the contact form or other means is handled in line with the GDPR. Additional details are available in our Privacy Policy.</>,
        },
        {
          heading: 'Cookies',
          body: <>This site uses cookies to enhance your browsing experience and measure traffic. You can disable them at any time via your browser settings. See our Cookie Policy for details.</>,
        },
      ]}
    />
  )
}
