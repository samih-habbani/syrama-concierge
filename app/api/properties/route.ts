import { getProperties } from '@/lib/property-service'

export async function GET(request: Request) {
  try {
    const url = new URL(request.url)
    const villas = await getProperties({
      region: url.searchParams.get('region'),
      limit: parseInt(url.searchParams.get('limit') || '500'),
    })
    return Response.json(villas)
  } catch (error) {
    console.error('Error fetching villas:', error)
    return Response.json({ error: 'Failed to fetch villas' }, { status: 500 })
  }
}
