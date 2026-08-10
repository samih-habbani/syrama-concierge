export type Yacht = {
  id: string
  name: string
  length: string
  guests: string
  crew: string
  range: string
  year: string
  builder: string
  speed: string
  desc: string
  longDesc: string
  amenities: string[]
  images: string[]
}

export const yachts: Yacht[] = [
  {
    id: 'sovereign',
    name: 'Sovereign',
    length: '62 m',
    guests: '12 guests',
    crew: '14 crew',
    range: 'Global',
    year: '2019',
    builder: 'Lürssen',
    speed: '17 kn',
    desc: 'Our flagship superyacht — a 62-metre Lürssen with helipad, beach club and cinema.',
    longDesc: "Sovereign represents the pinnacle of ocean living. Built by Lürssen in 2019, she offers six lavish staterooms, a full beach club at sea level, an on-deck Jacuzzi, and a helipad for seamless transfers. Her 14-strong crew ensures every detail is attended to before you think to ask. Whether crossing the Atlantic or anchored off Positano, Sovereign sets a standard all her own.",
    amenities: [
      'Helipad', 'Beach club', 'Cinema room', 'Jacuzzi', 'Gym & spa',
      'Tender garage', 'Dive equipment', 'Chef & sommelier', 'Satellite internet', 'Air conditioning',
    ],
    images: [
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1400&q=80',
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1400&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80',
      'https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=1400&q=80',
    ],
  },
  {
    id: 'alta',
    name: 'Alta',
    length: '48 m',
    guests: '10 guests',
    crew: '10 crew',
    range: 'Mediterranean · Caribbean',
    year: '2021',
    builder: 'Feadship',
    speed: '16 kn',
    desc: "A 48-metre Feadship built for effortless Mediterranean cruising with five staterooms.",
    longDesc: "Alta is a study in understated elegance. Feadship's signature craftsmanship is evident in every detail — from the hand-stitched interior fabrics to the silent hull gliding through calm waters. Five guest staterooms accommodate up to ten, while her shallow draft opens anchorages inaccessible to larger vessels. Alta is the yacht for those who know.",
    amenities: [
      'Shallow draft', 'Sundeck pool', 'Zero-speed stabilisers', 'Water toys garage',
      'Alfresco dining', 'Wine cellar', 'Private chef', 'Satellite comms', 'Tender', 'Air conditioning',
    ],
    images: [
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1400&q=80',
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1400&q=80',
      'https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=1400&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80',
    ],
  },
  {
    id: 'mira',
    name: 'Mira',
    length: '38 m',
    guests: '8 guests',
    crew: '7 crew',
    range: 'Mediterranean',
    year: '2020',
    builder: 'Sanlorenzo',
    speed: '18 kn',
    desc: "A sleek 38-metre Sanlorenzo with modern Italian design — perfect for the Med.",
    longDesc: "Mira embodies Italian savoir-faire at sea. Sanlorenzo's 38-metre hull combines sharp design lines with generous deck spaces and four luxurious staterooms. With a top speed of 18 knots, Mira is ideal for island-hopping along the Côte d'Azur, the Greek islands or the Balearics — stylishly, quickly, and in total comfort.",
    amenities: [
      'Sports sundeck', 'Seabobs', 'Paddleboards', 'Kayaks', 'Snorkelling gear',
      "Italian galley kitchen", 'Alfresco bar', 'Sound system', 'Stabilisers at anchor', 'Air conditioning',
    ],
    images: [
      'https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=1400&q=80',
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1400&q=80',
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1400&q=80',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80',
    ],
  },
  {
    id: 'zenith',
    name: 'Zenith',
    length: '28 m',
    guests: '6 guests',
    crew: '4 crew',
    range: 'Day charter · Coastal',
    year: '2022',
    builder: 'Princess',
    speed: '32 kn',
    desc: "A fast 28-metre Princess — ideal for day charters and coastal escapes.",
    longDesc: "Zenith is speed and style distilled into 28 metres. Built by Princess in 2022, she reaches 32 knots for those who want to be at anchor in a secluded cove within the hour. Three staterooms and an open-plan saloon make her as comfortable at sunset as she is thrilling at full throttle. The ideal choice for shorter charters and coastal discovery.",
    amenities: [
      'High speed', 'Open deck sunbathing', 'Jet ski launch', 'Snorkelling kit',
      'Day bar', 'BBQ grill', 'Wakeboard', 'Sound system', 'Air conditioning', 'Crew of 4',
    ],
    images: [
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1400&q=80',
      'https://images.unsplash.com/photo-1566847438217-76e82d383f84?w=1400&q=80',
      'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=1400&q=80',
      'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=1400&q=80',
    ],
  },
]

export function getYacht(id: string): Yacht | undefined {
  return yachts.find(y => y.id === id)
}
