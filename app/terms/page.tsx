import type { Metadata } from 'next'
import { LegalPage } from '@/components/legal/LegalPage'

export const metadata: Metadata = {
  title: 'Terms of Use · Syrama',
  description: 'Terms governing access to and use of syrama.ae.',
}

export default function TermsPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Terms of Use"
      updated="September 2026"
      sections={[
        {
          heading: 'Purpose',
          body: <>These Terms of Use govern access to and use of the site by any user. By browsing this site, you fully and unreservedly accept these terms.</>,
        },
        {
          heading: 'Site Access',
          body: <>The site is accessible 24/7 except for maintenance interruptions or force majeure. The publisher cannot be held liable for any interruptions.</>,
        },
        {
          heading: 'Site Use',
          body: <>The user agrees not to disrupt the proper functioning of the site and not to use the services in a fraudulent or illegal manner.</>,
        },
        {
          heading: 'Intellectual Property',
          body: <>All content on the site (texts, images, videos, graphics, logos…) is protected by intellectual property laws. Any unauthorized reproduction is strictly prohibited.</>,
        },
        {
          heading: 'Personal Data',
          body: <>Information collected through the contact form is processed in accordance with the GDPR. See our Privacy Policy for more information.</>,
        },
        {
          heading: 'Liability',
          body: <>The publisher cannot be held responsible in case of inaccuracy or error in the content or services provided. The user remains solely responsible for their use of the site.</>,
        },
        {
          heading: 'Changes to the Terms',
          body: <>These terms may be modified at any time. It is the user&rsquo;s responsibility to consult them regularly.</>,
        },
        {
          heading: 'Governing Law',
          body: <>These terms are governed by the laws of the United Arab Emirates. In case of dispute, the competent courts will be those within the jurisdiction of the publisher&rsquo;s headquarters.</>,
        },
      ]}
    />
  )
}
