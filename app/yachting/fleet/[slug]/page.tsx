// Legacy single-segment yacht URL (/yachting/fleet/49 or
// /yachting/fleet/some-slug-49). Kept only to 308-redirect already-shared
// links to the canonical /yachting/fleet/charters/[slug] URL.
import type { Metadata } from 'next'
import { notFound, permanentRedirect } from 'next/navigation'
import { getYachtById } from '@/lib/yacht-service'
import { idFromSlug, yachtHref } from '@/lib/slug'

export const revalidate = 86400
export const dynamicParams = true

// See the sibling charters/[slug] route for why this is required even
// as an empty array: without it, `revalidate` above is silently ignored.
export function generateStaticParams() {
  return []
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const id = idFromSlug(slug)
  const yacht = id !== null ? await getYachtById(id) : null
  if (!yacht) return { title: 'Yacht Not Found' }
  return { alternates: { canonical: yachtHref(yacht) } }
}

export default async function LegacyYachtDetailRedirect({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const id = idFromSlug(slug)
  if (id === null) notFound()

  const yacht = await getYachtById(id)
  if (!yacht) notFound()

  permanentRedirect(yachtHref(yacht))
}
