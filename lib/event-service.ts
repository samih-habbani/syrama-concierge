import { prisma } from './prisma'

export const EVENT_CATEGORIES = [
  'Motorsport',
  'Arts & Culture',
  'Sport & Society',
  'Fashion',
  'Music & Lifestyle',
] as const

export type EventCategory = (typeof EVENT_CATEGORIES)[number]

export interface PrestigiousEvent {
  id: number
  name: string
  subtitle: string
  location: string
  country: string
  month: string
  category: string
  desc: string
  highlight: string
  image: string
}

function shape(row: {
  id: number
  name: string
  subtitle: string | null
  location: string | null
  country: string | null
  month: string | null
  category: string
  description: string | null
  highlight: string | null
  image: string
}): PrestigiousEvent {
  return {
    id: row.id,
    name: row.name,
    subtitle: row.subtitle ?? '',
    location: row.location ?? '',
    country: row.country ?? '',
    month: row.month ?? '',
    category: row.category,
    desc: row.description ?? '',
    highlight: row.highlight ?? '',
    image: row.image,
  }
}

export async function getEvents(): Promise<PrestigiousEvent[]> {
  const rows = await prisma.event.findMany({
    where: process.env.NODE_ENV === 'production' ? { published: true } : {},
    orderBy: [{ sortOrder: 'asc' }, { createdAt: 'asc' }],
  })
  return rows.map(shape)
}
