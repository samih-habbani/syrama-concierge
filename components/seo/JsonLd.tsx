// Structured data (schema.org / JSON-LD). Rendered as <script type="application/ld+json">.
// Server components — no client JS.

const SITE_URL = 'https://www.syrama.ae'

function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify output is safe here (no user input); dangerouslySetInnerHTML
      // is the documented way to emit JSON-LD in the App Router.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}

/** Organisation + website identity — rendered once in the root layout. */
export function OrganizationJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@graph': [
          {
            '@type': ['Organization', 'ProfessionalService'],
            '@id': `${SITE_URL}/#organization`,
            name: 'Syrama',
            legalName: 'Syrama Concierge Services – FZCO',
            url: SITE_URL,
            logo: `${SITE_URL}/icon`,
            image: `${SITE_URL}/opengraph-image`,
            description:
              'Dubai private concierge for HNWI clients — private aviation, luxury villas, yacht charters, iconic events and bespoke requests.',
            slogan: 'Exclusive access. Absolute discretion.',
            email: 'contact@syrama.ae',
            telephone: '+971505548034',
            areaServed: 'Worldwide',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'IFZA Properties, Dubai Silicon Oasis',
              addressLocality: 'Dubai',
              addressCountry: 'AE',
            },
            contactPoint: {
              '@type': 'ContactPoint',
              telephone: '+971505548034',
              email: 'contact@syrama.ae',
              contactType: 'customer service',
              availableLanguage: ['English', 'French', 'Arabic'],
            },
            sameAs: [
              'https://www.instagram.com/syrama_services/',
              'https://www.linkedin.com/in/samih-habbani/',
              'https://syrama-services.com',
              'https://syrama-yachting.com',
            ],
          },
          {
            '@type': 'WebSite',
            '@id': `${SITE_URL}/#website`,
            url: SITE_URL,
            name: 'Syrama · Dubai Private Concierge',
            publisher: { '@id': `${SITE_URL}/#organization` },
            inLanguage: 'en',
          },
        ],
      }}
    />
  )
}

/** Breadcrumb trail for a deep page. Pass ordered [{name, path}] from home. */
export function BreadcrumbJsonLd({ items }: { items: { name: string; path: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((it, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: it.name,
          item: `${SITE_URL}${it.path}`,
        })),
      }}
    />
  )
}

/** A single concierge service (used on the homepage service sections). */
export function ServiceJsonLd({
  name,
  description,
  path,
}: {
  name: string
  description: string
  path: string
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Service',
        name,
        description,
        serviceType: name,
        url: `${SITE_URL}${path}`,
        areaServed: 'Worldwide',
        provider: { '@id': `${SITE_URL}/#organization` },
      }}
    />
  )
}
