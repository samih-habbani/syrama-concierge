import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Syrama · Dubai Private Concierge',
    short_name: 'Syrama',
    description:
      'Dubai private concierge — private aviation, luxury villas, yacht charters, iconic events and bespoke requests.',
    start_url: '/',
    display: 'standalone',
    background_color: '#06090f',
    theme_color: '#06090f',
    lang: 'en',
    categories: ['travel', 'lifestyle'],
    icons: [
      { src: '/favicon.ico', sizes: 'any', type: 'image/x-icon' },
      { src: '/icon', sizes: '512x512', type: 'image/png' },
      { src: '/apple-icon', sizes: '180x180', type: 'image/png' },
    ],
  }
}
