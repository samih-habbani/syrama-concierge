import type { MetadataRoute } from 'next'
import { getYachts } from '@/lib/yacht-service'
import { getProperties } from '@/lib/property-service'
import { yachtHref, propertyHref } from '@/lib/slug'

const SITE_URL = 'https://www.syrama.ae'

// Regenerate at most once a day.
export const revalidate = 86400

type Entry = MetadataRoute.Sitemap[number]

const staticRoutes: { path: string; priority: number; changeFrequency: Entry['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/jet', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/villas', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/villas/rentals', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/yachting', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/yachting/fleet', priority: 0.8, changeFrequency: 'weekly' },
  { path: '/events', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/legal-notice', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/privacy-policy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/cookie-policy', priority: 0.2, changeFrequency: 'yearly' },
]

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date()

  const entries: MetadataRoute.Sitemap = staticRoutes.map((r) => ({
    url: `${SITE_URL}${r.path}`,
    lastModified: now,
    changeFrequency: r.changeFrequency,
    priority: r.priority,
  }))

  // Charter yacht detail pages.
  try {
    const yachts = await getYachts({ type: 'charter', limit: 1000 })
    for (const y of yachts) {
      entries.push({
        url: `${SITE_URL}${yachtHref(y)}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  } catch (err) {
    console.error('[sitemap] could not load yachts:', err)
  }

  // Rental villa detail pages.
  try {
    const villas = await getProperties({ limit: 1000 })
    for (const v of villas) {
      if (!v.title) continue
      entries.push({
        url: `${SITE_URL}${propertyHref({ id: v.id, title: v.title })}`,
        lastModified: now,
        changeFrequency: 'weekly',
        priority: 0.6,
      })
    }
  } catch (err) {
    console.error('[sitemap] could not load villas:', err)
  }

  return entries
}
