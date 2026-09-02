import { prisma } from '@/lib/prisma'
import { requireAdmin, isUnauthorized, unauthorized, serverError } from '@/lib/admin-auth'
import { slugify } from '@/lib/slug'

function normTags(tags: unknown): string[] {
  if (Array.isArray(tags)) return tags.map((t) => String(t).replace(/^#/, '').trim()).filter(Boolean)
  if (typeof tags === 'string') return tags.split(',').map((t) => t.replace(/^#/, '').trim()).filter(Boolean)
  return []
}

export async function GET() {
  try {
    await requireAdmin()
    const posts = await prisma.blogPost.findMany({ orderBy: { publishedAt: 'desc' } })
    return Response.json({ posts })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/blog GET]', err)
    return serverError('Failed to load articles')
  }
}

export async function POST(request: Request) {
  try {
    await requireAdmin()
    const d = await request.json()
    if (!d.title || !d.body || !d.category || !d.heroImage) {
      return Response.json({ error: 'Title, body, category and hero image are required' }, { status: 400 })
    }
    const slug = (d.slug ? slugify(d.slug) : slugify(d.title)) || `article-${Date.now()}`
    const exists = await prisma.blogPost.findUnique({ where: { slug } })
    if (exists) return Response.json({ error: `The slug "${slug}" is already used` }, { status: 409 })

    const post = await prisma.blogPost.create({
      data: {
        slug,
        title: d.title,
        excerpt: d.excerpt || '',
        category: d.category,
        tags: normTags(d.tags),
        heroImage: d.heroImage,
        heroAlt: d.heroAlt || d.title,
        body: d.body,
        published: d.published !== false,
        publishedAt: d.publishedAt ? new Date(d.publishedAt) : new Date(),
      },
    })
    return Response.json({ post }, { status: 201 })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/blog POST]', err)
    return serverError('Failed to create article')
  }
}

export async function PUT(request: Request) {
  try {
    await requireAdmin()
    const d = await request.json()
    if (!d.id) return Response.json({ error: 'id required' }, { status: 400 })

    const data: Record<string, unknown> = {}
    if (d.title !== undefined) data.title = d.title
    if (d.excerpt !== undefined) data.excerpt = d.excerpt
    if (d.category !== undefined) data.category = d.category
    if (d.tags !== undefined) data.tags = normTags(d.tags)
    if (d.heroImage !== undefined) data.heroImage = d.heroImage
    if (d.heroAlt !== undefined) data.heroAlt = d.heroAlt
    if (d.body !== undefined) data.body = d.body
    if (d.published !== undefined) data.published = d.published !== false
    if (d.publishedAt) data.publishedAt = new Date(d.publishedAt)
    if (d.slug) {
      const s = slugify(d.slug)
      const clash = await prisma.blogPost.findFirst({ where: { slug: s, NOT: { id: Number(d.id) } } })
      if (clash) return Response.json({ error: `The slug "${s}" is already used` }, { status: 409 })
      data.slug = s
    }

    const post = await prisma.blogPost.update({ where: { id: Number(d.id) }, data: data as never })
    return Response.json({ post })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/blog PUT]', err)
    return serverError('Failed to update article')
  }
}

export async function DELETE(request: Request) {
  try {
    await requireAdmin()
    const id = new URL(request.url).searchParams.get('id')
    if (!id) return Response.json({ error: 'id required' }, { status: 400 })
    await prisma.blogPost.delete({ where: { id: Number(id) } })
    return Response.json({ success: true })
  } catch (err) {
    if (isUnauthorized(err)) return unauthorized()
    console.error('[admin/blog DELETE]', err)
    return serverError('Failed to delete article')
  }
}
