// Display helpers for rental villas.

// Amenities come in mixed shapes across imported rows — some snake_case
// keys ("air_conditioning"), some already human ("Air conditioning").
// Normalise both to "Air conditioning".
export function humanizeAmenity(raw: string): string {
  const s = raw.replace(/_/g, ' ').trim()
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function amenityList(amenities: unknown): string[] {
  if (!Array.isArray(amenities)) return []
  return amenities
    .filter((a): a is string => typeof a === 'string' && a.trim() !== '')
    .map(humanizeAmenity)
}

export interface BedRoom {
  room: string
  beds: number
  bedType: string
}

export function bedDistribution(raw: unknown): BedRoom[] {
  if (!Array.isArray(raw)) return []
  return raw
    .filter((r): r is Record<string, unknown> => !!r && typeof r === 'object')
    .map((r) => ({
      room: String(r.room ?? 'Room'),
      beds: Number(r.beds ?? 1) || 1,
      bedType: String(r.bedType ?? ''),
    }))
}

// The primary rate to show — most listings price by week; fall back to
// day, then month. Returns null when nothing is set.
export function displayRate(p: {
  priceWeek: number | null
  priceDay: number | null
  priceMonth: number | null
  currency: string | null
}): { amount: number; unit: 'week' | 'day' | 'month'; currency: string } | null {
  const cur = p.currency || '€'
  if (p.priceWeek) return { amount: p.priceWeek, unit: 'week', currency: cur }
  if (p.priceDay) return { amount: p.priceDay, unit: 'day', currency: cur }
  if (p.priceMonth) return { amount: p.priceMonth, unit: 'month', currency: cur }
  return null
}

export function formatRate(rate: ReturnType<typeof displayRate>): string {
  if (!rate) return 'Price on request'
  return `${rate.currency}${rate.amount.toLocaleString('en-US')}/${rate.unit}`
}

// Weekly-equivalent number for sorting mixed day/week/month listings.
export function weeklyEquivalent(p: { priceWeek: number | null; priceDay: number | null; priceMonth: number | null }): number | null {
  if (p.priceWeek) return p.priceWeek
  if (p.priceDay) return p.priceDay * 7
  if (p.priceMonth) return p.priceMonth / 4
  return null
}

// "Morroco" is how the region is spelled in the DB — keep that value for
// filtering, but show it correctly.
export function regionLabel(region: string): string {
  return region === 'Morroco' ? 'Morocco' : region
}

// The `description` column holds rich HTML imported from a CMS, with its own
// (light-theme) Tailwind classes. Keep the semantic tags, drop everything
// that could be unsafe or clash with the dark styling.
const ALLOWED_TAGS = new Set(['p', 'br', 'ul', 'ol', 'li', 'strong', 'b', 'em', 'i', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'a', 'span', 'div'])

export function sanitizeDescription(html: string | null | undefined): string {
  if (!html) return ''
  return html
    // drop script/style blocks entirely
    .replace(/<\s*(script|style|iframe|object|embed)[\s\S]*?<\s*\/\s*\1\s*>/gi, '')
    // strip class / style / inline event handlers and other attributes,
    // keeping only href on links
    .replace(/<([a-z0-9]+)((?:\s+[^<>]*?)?)\s*(\/?)>/gi, (m, tag: string, attrs: string, selfClose: string) => {
      const t = tag.toLowerCase()
      if (!ALLOWED_TAGS.has(t)) return ''
      if (t === 'a') {
        const href = /\shref\s*=\s*("([^"]*)"|'([^']*)')/i.exec(attrs)
        const url = href ? (href[2] ?? href[3] ?? '') : ''
        return /^https?:\/\//i.test(url) ? `<a href="${url}" target="_blank" rel="noopener noreferrer">` : '<a>'
      }
      return `<${t}${selfClose ? ' /' : ''}>`
    })
    .replace(/<\s*\/\s*([a-z0-9]+)\s*>/gi, (m, tag: string) =>
      ALLOWED_TAGS.has(tag.toLowerCase()) ? `</${tag.toLowerCase()}>` : '')
    .trim()
}
