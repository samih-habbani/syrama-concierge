export type EventCategory = 'Motorsport' | 'Arts & Culture' | 'Sport & Society' | 'Fashion' | 'Music & Lifestyle'

export type PrestigiousEvent = {
  id: string
  name: string
  subtitle: string
  location: string
  country: string
  month: string
  category: EventCategory
  desc: string
  highlight: string
  image: string
}

export const events: PrestigiousEvent[] = [
  {
    id: 'monaco-gp',
    name: 'Monaco Grand Prix',
    subtitle: 'Formula 1',
    location: 'Monte-Carlo',
    country: 'Monaco',
    month: 'May',
    category: 'Motorsport',
    desc: 'The crown jewel of motorsport. Racing through the narrow streets of the Principality, this is the race every driver dreams of winning — and every guest dreams of attending from a superyacht in Port Hercule.',
    highlight: "Paddock Club access · Superyacht hospitality · Prince's Palace dinner",
    image: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1200&q=80',
  },
  {
    id: 'cannes',
    name: 'Cannes Film Festival',
    subtitle: 'Festival de Cannes',
    location: 'Cannes',
    country: 'French Riviera',
    month: 'May',
    category: 'Arts & Culture',
    desc: "Twelve days when the Croisette transforms into the world's most glamorous stage. Red-carpet premieres, private screenings, rooftop soirées, and villa retreats — Cannes demands the right doors to open.",
    highlight: 'Palais des Festivals access · Red-carpet escort · Villa rental · Yacht berth',
    image: 'https://images.unsplash.com/photo-1533106418989-88406c7cc8ca?w=1200&q=80',
  },
  {
    id: 'art-basel',
    name: 'Art Basel',
    subtitle: "The World's Premier Art Fair",
    location: 'Basel / Miami Beach',
    country: 'Switzerland · USA',
    month: 'June · December',
    category: 'Arts & Culture',
    desc: "Where the world's most significant galleries converge. Beyond the fair itself lies a constellation of private openings, collectors' dinners, and invitation-only previews accessible only through the right relationships.",
    highlight: "Vernissage access · Private collection tours · Collectors' dinners",
    image: 'https://images.unsplash.com/photo-1541367777708-7905fe3296c0?w=1200&q=80',
  },
  {
    id: 'wimbledon',
    name: 'Wimbledon',
    subtitle: 'The Championships',
    location: 'London',
    country: 'United Kingdom',
    month: 'July',
    category: 'Sport & Society',
    desc: "The oldest and most prestigious tennis tournament in the world. Strawberries, Pimm's and Centre Court — but the true Wimbledon experience unfolds in the Debenture holders' suites and private boxes overlooking the hallowed grass.",
    highlight: 'Debenture seats · Royal Box · Helicopter transfer · Mayfair hotel',
    image: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&q=80',
  },
  {
    id: 'the-masters',
    name: 'The Masters',
    subtitle: 'Augusta National Golf Club',
    location: 'Augusta, Georgia',
    country: 'United States',
    month: 'April',
    category: 'Sport & Society',
    desc: 'Augusta National is one of the most exclusive clubs on earth — and Masters badges among the most coveted tickets in sport. A pilgrimage for any golf devotee, made extraordinary with the right access.',
    highlight: 'Tournament badges · Club dining · Private jet from Dubai',
    image: 'https://images.unsplash.com/photo-1535131749006-b7f58c99034b?w=1200&q=80',
  },
  {
    id: 'venice-biennale',
    name: 'Venice Biennale',
    subtitle: 'La Biennale di Venezia',
    location: 'Venice',
    country: 'Italy',
    month: 'May – November',
    category: 'Arts & Culture',
    desc: "The oldest and most celebrated international art exhibition. Pavilions scattered across the Giardini and Arsenale, secret palazzos hosting private shows — Venice in biennale season is an art world pilgrimage unlike any other.",
    highlight: 'Vernissage invitations · Palazzo dinners · Private boat · Hotel Cipriani',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1200&q=80',
  },
  {
    id: 'royal-ascot',
    name: 'Royal Ascot',
    subtitle: 'The Royal Meeting',
    location: 'Berkshire',
    country: 'United Kingdom',
    month: 'June',
    category: 'Sport & Society',
    desc: 'Five days of world-class flat racing and unmatched ceremony. The Royal Procession, the Royal Enclosure, the hats — Ascot is as much about spectacle as sport, and the finest boxes make it unforgettable.',
    highlight: 'Royal Enclosure badges · Private box · Helicopter transfer',
    image: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=1200&q=80',
  },
  {
    id: 'goodwood',
    name: 'Goodwood Festival of Speed',
    subtitle: 'The Greatest Motoring Garden Party',
    location: 'West Sussex',
    country: 'United Kingdom',
    month: 'July',
    category: 'Motorsport',
    desc: "Set on the Duke of Richmond's estate, the Festival of Speed is the world's greatest automotive garden party. Hypercars climbing the hill, legends of motorsport signing autographs, and the finest hospitality in the sport.",
    highlight: 'Hillclimb house access · Supercar paddock · Estate dinner',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80',
  },
  {
    id: 'dubai-world-cup',
    name: 'Dubai World Cup',
    subtitle: "The World's Richest Horse Race",
    location: 'Meydan Racecourse',
    country: 'Dubai, UAE',
    month: 'March',
    category: 'Sport & Society',
    desc: "The world's richest horse race, held at the magnificent Meydan Racecourse. A spectacular evening in the desert, combining elite racing with extraordinary hospitality — the flagship event of our home city.",
    highlight: "Premium hospitality · VIP enclosures · Owner's lounge access",
    image: 'https://images.unsplash.com/photo-1568625977260-a0f76f68e6df?w=1200&q=80',
  },
  {
    id: 'le-mans',
    name: '24 Heures du Mans',
    subtitle: 'La Grande Course',
    location: 'Le Mans',
    country: 'France',
    month: 'June',
    category: 'Motorsport',
    desc: 'The greatest endurance race in history. One hundred years of drama, speed and perseverance across a circuit that stretches through the French countryside. The night session alone is one of sport\'s most primal experiences.',
    highlight: 'ACO hospitality · Pit lane walk · Ford Chicane suite',
    image: 'https://images.unsplash.com/photo-1564435900908-e0f9ad18dd5d?w=1200&q=80',
  },
  {
    id: 'frieze',
    name: 'Frieze Art Fair',
    subtitle: 'London & New York',
    location: 'London · New York',
    country: 'UK · United States',
    month: 'October',
    category: 'Arts & Culture',
    desc: 'The defining event of the contemporary art calendar. Frieze Masters, Frieze London, and Frieze Week\'s constellation of private openings, gallery dinners and auction previews demand a curated week rather than a single visit.',
    highlight: 'VIP previews · Auction access · Gallery dinners · Mayfair residences',
    image: 'https://images.unsplash.com/photo-1578301978693-85fa9c0320b9?w=1200&q=80',
  },
  {
    id: 'milan-fashion-week',
    name: 'Milan Fashion Week',
    subtitle: 'Settimana della Moda',
    location: 'Milan',
    country: 'Italy',
    month: 'February · September',
    category: 'Fashion',
    desc: 'The fashion capital at its peak. Front-row seats at Prada, Valentino, Versace and Gucci — then dinner at Bice, a suite at the Four Seasons and a private after-party at a Renaissance palazzo.',
    highlight: 'Front-row access · Private atelier visits · Suite at Four Seasons',
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?w=1200&q=80',
  },
]

export function getEvent(id: string): PrestigiousEvent | undefined {
  return events.find(e => e.id === id)
}
