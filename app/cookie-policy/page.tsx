import type { Metadata } from 'next'
import { LegalPage, LegalList } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Cookie Policy',
  description: 'How syrama.ae uses cookies and how to manage them.',
  alternates: { canonical: '/cookie-policy' },
}

export default function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Cookie Policy"
      updated="September 2026"
      sections={[
        {
          heading: 'What is a cookie?',
          body: <>A cookie is a small text file placed on your device during your visit. It helps remember your preferences and enhance your user experience.</>,
        },
        {
          heading: 'Cookies used',
          body: (
            <LegalList items={[
              'Necessary cookies: to ensure the site functions properly',
              'Analytics cookies: to measure traffic and improve our content',
              'Personalization cookies: to adapt content to your preferences',
            ]} />
          ),
        },
        {
          heading: 'Consent',
          body: <>On your first visit, a banner allows you to accept or refuse non-essential cookies. You can change your choice at any time.</>,
        },
        {
          heading: 'Cookie management',
          body: <>You can configure your browser to refuse all or some cookies, or to notify you when a cookie is placed. Note that some features may not function properly if you do so.</>,
        },
        {
          heading: 'Retention period',
          body: <>Cookies are stored for a maximum of 13 months from the time they are placed on your device.</>,
        },
        {
          heading: 'Contact',
          body: <>For any questions regarding our cookie policy, contact us at: contact@syrama.ae</>,
        },
      ]}
    />
  )
}
