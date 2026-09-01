import { prisma } from './prisma'

// Rental villas live in the `property` table (for_sale = false). Media links
// via media.property_id (no formal Prisma relation), so the gallery is
// fetched with a raw sub-select, same pattern as getYachtById().

export interface PropertyCard {
  id: number
  title: string | null
  city: string | null
  region: string | null
  type: string | null
  bedrooms: number | null
  bathrooms: number | null
  maxGuests: number | null
  surface: number | null
  surfaceUnit: string | null
  priceDay: number | null
  priceWeek: number | null
  priceMonth: number | null
  currency: string | null
  media: { id: number; url: string | null; alt: string | null }[]
}

type RawCard<T> = Omit<T, 'media'> & { media: PropertyCard['media'] | null }

export async function getProperties(options: { region?: string | null; limit?: number } = {}): Promise<PropertyCard[]> {
  const { region = null, limit = 500 } = options

  const rows = await prisma.$queryRaw<RawCard<PropertyCard>[]>`
    SELECT
      p.id, p.title, p.city, p.region, p.type,
      p.bedrooms, p.bathrooms, p.max_guests as "maxGuests",
      p.surface, p.surface_unit as "surfaceUnit",
      p.price_day as "priceDay", p.price_week as "priceWeek", p.price_month as "priceMonth", p.currency,
      (SELECT json_agg(t) FROM (
        SELECT m.id, m.url, m.alt FROM media m WHERE m.property_id = p.id ORDER BY m.id ASC LIMIT 1
      ) t) as media
    FROM property p
    WHERE p.for_sale = false
      AND (p.available IS NULL OR p.available = true)
      AND (${region}::text IS NULL OR lower(p.region) = lower(${region}))
    ORDER BY p.id ASC
    LIMIT ${limit}
  `

  return rows.map((r) => ({ ...r, media: r.media || [] }))
}

export interface PropertyDetail extends PropertyCard {
  description: string | null
  rooms: number | null
  beds: number | null
  year: number | null
  reference: string | null
  zipCode: string | null
  terraceSurface: number | null
  hasTerrace: boolean | null
  hasBalcony: boolean | null
  petsAllowed: boolean | null
  partiesAllowed: boolean | null
  checkInFrom: string | null
  checkOutBefore: string | null
  amenities: unknown
  bedDistribution: unknown
  mapIframeSrc: string | null
}

export async function getPropertyById(id: number): Promise<PropertyDetail | null> {
  const rows = await prisma.$queryRaw<RawCard<PropertyDetail>[]>`
    SELECT
      p.id, p.title, p.description, p.city, p.zip_code as "zipCode", p.region, p.type,
      p.surface, p.surface_unit as "surfaceUnit", p.rooms, p.bedrooms, p.bathrooms, p.beds,
      p.max_guests as "maxGuests", p.year, p.reference,
      p.price_day as "priceDay", p.price_week as "priceWeek", p.price_month as "priceMonth", p.currency,
      p.terrace_surface as "terraceSurface", p.has_terrace as "hasTerrace", p.has_balcony as "hasBalcony",
      p.pets_allowed as "petsAllowed", p.parties_allowed as "partiesAllowed",
      p.check_in_from as "checkInFrom", p.check_out_before as "checkOutBefore",
      p.amenities, p.bed_distribution as "bedDistribution", p.map_iframe_src as "mapIframeSrc",
      (SELECT json_agg(json_build_object('id', m.id, 'url', m.url, 'alt', m.alt) ORDER BY m.id)
       FROM media m WHERE m.property_id = p.id) as media
    FROM property p
    WHERE p.id = ${id} AND p.for_sale = false
  `

  if (!rows || rows.length === 0) return null
  return { ...rows[0], media: rows[0].media || [] }
}

export async function getSimilarProperties(
  property: { id: number; region: string | null; bedrooms: number | null },
  limit = 3,
): Promise<PropertyCard[]> {
  const region = property.region ?? ''
  const bedrooms = property.bedrooms ?? 0

  const rows = await prisma.$queryRaw<RawCard<PropertyCard>[]>`
    SELECT id, title, city, region, type, bedrooms, bathrooms, "maxGuests",
           surface, "surfaceUnit", "priceDay", "priceWeek", "priceMonth", currency, media
    FROM (
      SELECT DISTINCT ON (lower(p.title))
        p.id, p.title, p.city, p.region, p.type,
        p.bedrooms, p.bathrooms, p.max_guests as "maxGuests",
        p.surface, p.surface_unit as "surfaceUnit",
        p.price_day as "priceDay", p.price_week as "priceWeek", p.price_month as "priceMonth", p.currency,
        (CASE WHEN lower(p.region) = lower(${region}) THEN 0 ELSE 1 END) as region_rank,
        abs(COALESCE(p.bedrooms, 0) - ${bedrooms}) as bed_dist,
        (SELECT json_agg(t) FROM (
          SELECT m.id, m.url, m.alt FROM media m WHERE m.property_id = p.id ORDER BY m.id ASC LIMIT 1
        ) t) as media
      FROM property p
      WHERE p.for_sale = false
        AND (p.available IS NULL OR p.available = true)
        AND p.id != ${property.id}
        AND p.title IS NOT NULL
      ORDER BY lower(p.title),
               (CASE WHEN lower(p.region) = lower(${region}) THEN 0 ELSE 1 END),
               abs(COALESCE(p.bedrooms, 0) - ${bedrooms})
    ) sub
    ORDER BY region_rank, bed_dist
    LIMIT ${limit}
  `

  return rows.map((r) => ({ ...r, media: r.media || [] }))
}

