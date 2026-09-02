// The blog's controlled vocabulary. Keeping categories and hashtags to a
// fixed, reusable set is what makes the internal linking coherent: every
// article reuses the same terms, so the tag/category archive pages
// accumulate link equity instead of fragmenting into one-off tags.

export const CATEGORIES = {
  'event-coverage': {
    label: 'Event Coverage',
    blurb: 'Behind the scenes at the events we arrange — Grand Prix, festivals, opens and openings.',
  },
  destinations: {
    label: 'Destinations',
    blurb: 'City and coast guides from the places our clients spend their seasons.',
  },
  aviation: {
    label: 'Aviation',
    blurb: 'Private jet news, aircraft notes and the logistics of flying privately from Dubai.',
  },
  yachting: {
    label: 'Yachting',
    blurb: 'Charter itineraries, the fleet and life on the water across the Mediterranean and beyond.',
  },
  concierge: {
    label: 'The Art of Concierge',
    blurb: 'How a private concierge actually works — access, discretion and the requests behind the requests.',
  },
} as const

export type CategorySlug = keyof typeof CATEGORIES

export function categoryLabel(slug: string): string {
  return (CATEGORIES as Record<string, { label: string }>)[slug]?.label ?? slug
}
export function categoryBlurb(slug: string): string | null {
  return (CATEGORIES as Record<string, { blurb: string }>)[slug]?.blurb ?? null
}
export function isCategory(slug: string): slug is CategorySlug {
  return slug in CATEGORIES
}

// Curated hashtags. Article frontmatter should draw from this list; the
// description is reused as SEO copy on /blog/tag/[tag].
export const HASHTAGS: Record<string, string> = {
  MonacoGrandPrix: 'Formula 1 weekend in the Principality — paddock, port and Prince’s Palace.',
  CannesFilmFestival: 'Twelve days on the Croisette — premieres, screenings and villa season.',
  ArtBasel: 'The fairs and the parties around Basel, Miami Beach and Paris.',
  Wimbledon: 'Grass-court fortnight in SW19 — Centre Court, hospitality and London.',
  FrenchRiviera: 'From Saint-Tropez to Cap-Ferrat — the coast our clients call home in summer.',
  SaintTropez: 'The peninsula, Pampelonne and the villas above the bay.',
  Mykonos: 'Cycladic light, cliffside pools and the Aegean charter circuit.',
  Ibiza: 'Es Vedrà views, private estates and the island beyond the clubs.',
  Courchevel: 'The 1850 season — chalets, slopes and the après.',
  DubaiLife: 'Base camp — where a request placed at breakfast is solved by lunch.',
  PrivateAviation: 'Charter jets, empty legs and airport-side concierge.',
  SuperyachtCharter: 'Crewed yachts from 30 to 90 metres, and how a week aboard is planned.',
  PrivateEvents: 'Galas, bespoke dinners and one-off experiences built around a guest list.',
  BespokeTravel: 'Itineraries that exist for one trip only.',
  HNWI: 'Notes for ultra-high-net-worth travellers and their offices.',
  LuxuryLifestyle: 'The standard we hold every arrangement to.',
  BehindTheScenes: 'What the concierge desk looks like from the inside.',
  ConciergeInsight: 'Lessons from arranging the difficult and the impossible.',
}

export function hashtagBlurb(tag: string): string | null {
  return HASHTAGS[tag] ?? null
}

/** Normalise a tag to its URL form (lower-case, no #). */
export function tagSlug(tag: string): string {
  return tag.replace(/^#/, '').toLowerCase()
}

/** Find the canonical (cased) hashtag from a slug. */
export function tagFromSlug(slug: string): string {
  const found = Object.keys(HASHTAGS).find((t) => t.toLowerCase() === slug.toLowerCase())
  return found ?? slug
}
