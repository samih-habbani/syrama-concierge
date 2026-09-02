import type { Metadata } from 'next'
import { LegalPage, LegalList } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Privacy Policy · Syrama',
  description: 'How Syrama collects, uses and protects your personal data.',
}

export default function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      updated="September 2026"
      intro="This privacy policy explains how we collect, use, and protect your personal data when you use our site."
      sections={[
        {
          heading: 'Data Controller',
          body: <>The data controller is Syrama Concierge Services – FZCO, reachable at: contact@syrama.ae.</>,
        },
        {
          heading: 'Collected Data',
          body: <LegalList items={['First and last name', 'Email address', 'Phone number', 'Messages sent via the contact form']} />,
        },
        {
          heading: 'Purpose of Processing',
          body: (
            <>
              Your data is collected for the following purposes:
              <LegalList items={['To respond to your contact request', 'Client follow-up', 'Improving our service']} />
            </>
          ),
        },
        {
          heading: 'Data Retention',
          body: <>Contact-form data is kept for a maximum of 12 months, unless otherwise requested.</>,
        },
        {
          heading: 'Data Sharing',
          body: <>Your data is never sold. It is shared only internally or with technical providers (hosting, security).</>,
        },
        {
          heading: 'Your Rights',
          body: (
            <>
              In accordance with the GDPR, you have the following rights:
              <LegalList items={['Right to access your data', 'Right to rectification', 'Right to object', 'Right to erasure (right to be forgotten)']} />
              To exercise your rights, contact us at: contact@syrama.ae
            </>
          ),
        },
        {
          heading: 'Cookies',
          body: <>The site uses cookies for functional purposes. You can accept or decline them at any time. See our Cookie Policy.</>,
        },
        {
          heading: 'Security',
          body: <>Your data is stored on secure servers and only accessible to authorized personnel.</>,
        },
      ]}
    />
  )
}
