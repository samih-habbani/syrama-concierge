// Shared helpers for building SEO-safe <title> values from DB content that
// can be arbitrarily long (villa/yacht names imported from a source CMS).
// The root layout appends " · Syrama" (9 chars) via its title template, so
// callers should budget for that when they want the *resolved* title to
// stay within Google's ~60-character display limit.

const SITE_SUFFIX_LEN = ' · Syrama'.length

/** Truncate at the last whole word before `max` chars and append an ellipsis. */
export function clampTitle(text: string, max: number): string {
  if (text.length <= max) return text
  const cut = text.slice(0, Math.max(0, max - 1))
  const lastSpace = cut.lastIndexOf(' ')
  const base = lastSpace > max * 0.4 ? cut.slice(0, lastSpace) : cut
  return `${base}…`
}

/**
 * Combine a (possibly already-long) base name with optional extra context
 * (e.g. a location), keeping the final resolved title — base + " · Syrama"
 * — within `maxResolved` characters. Drops the extra context first if it
 * doesn't fit, then truncates the base itself as a last resort.
 */
export function seoTitle(base: string, extra?: string | null, maxResolved = 60): string {
  const budget = maxResolved - SITE_SUFFIX_LEN
  if (extra) {
    const withExtra = `${base} — ${extra}`
    if (withExtra.length <= budget) return withExtra
  }
  return base.length <= budget ? base : clampTitle(base, budget)
}
