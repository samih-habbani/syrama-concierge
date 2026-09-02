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

/** A blog article — BlogPosting with Sam Habbani as the author. */
export function ArticleJsonLd({
  slug,
  title,
  description,
  image,
  datePublished,
  dateModified,
}: {
  slug: string
  title: string
  description: string
  image: string
  datePublished: string
  dateModified?: string | null
}) {
  const url = `${SITE_URL}/blog/${slug}`
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        '@id': `${url}#article`,
        headline: title,
        description,
        image: image.startsWith('http') ? image : `${SITE_URL}${image}`,
        datePublished,
        dateModified: dateModified || datePublished,
        url,
        mainEntityOfPage: url,
        inLanguage: 'en',
        author: {
          '@type': 'Person',
          name: 'Sam Habbani',
          jobTitle: 'Founder, Syrama',
          sameAs: [
            'https://www.instagram.com/syrama_services/',
            'https://www.linkedin.com/in/samih-habbani/',
          ],
        },
        publisher: { '@id': `${SITE_URL}/#organization` },
      }}
    />
  )
}

/** The blog itself — rendered on /blog. */
export function BlogJsonLd({ posts }: { posts: { slug: string; title: string; date: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'Blog',
        '@id': `${SITE_URL}/blog#blog`,
        name: 'The Syrama Journal',
        description:
          'Event coverage, destination notes and concierge insight from Syrama, the Dubai private concierge.',
        url: `${SITE_URL}/blog`,
        publisher: { '@id': `${SITE_URL}/#organization` },
        blogPost: posts.map((p) => ({
          '@type': 'BlogPosting',
          headline: p.title,
          url: `${SITE_URL}/blog/${p.slug}`,
          datePublished: p.date,
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
