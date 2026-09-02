import { prisma } from './prisma'
import { Marked } from 'marked'
import { categoryLabel, tagSlug } from './blog-taxonomy'
import type { BlogPost as DbBlogPost } from '@prisma/client'

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string // ISO (publishedAt)
  updated: string | null // ISO
  category: string
  categoryLabel: string
  tags: string[]
  heroImage: string
  heroAlt: string
  readingMinutes: number
  contentHtml: string
  contentText: string
}

export type BlogPostSummary = Omit<BlogPost, 'contentHtml' | 'contentText'>

const md = new Marked({ gfm: true, breaks: false })

function shape(row: DbBlogPost): BlogPost {
  const contentHtml = md.parse(row.body, { async: false }) as string
  const contentText = row.body.replace(/[#>*_`\-!\[\]()]/g, ' ').replace(/\s+/g, ' ').trim()
  const words = contentText.split(' ').filter(Boolean).length
  return {
    slug: row.slug,
    title: row.title,
    excerpt: row.excerpt,
    date: row.publishedAt.toISOString(),
    updated: row.updatedAt ? row.updatedAt.toISOString() : null,
    category: row.category,
    categoryLabel: categoryLabel(row.category),
    tags: row.tags,
    heroImage: row.heroImage,
    heroAlt: row.heroAlt,
    readingMinutes: Math.max(1, Math.round(words / 200)),
    contentHtml,
    contentText,
  }
}

const publishedWhere = process.env.NODE_ENV === 'production' ? { published: true } : {}

export async function getAllPosts(): Promise<BlogPost[]> {
  try {
    const rows = await prisma.blogPost.findMany({
      where: publishedWhere,
      orderBy: { publishedAt: 'desc' },
    })
    return rows.map(shape)
  } catch (err) {
    // A DB blip during build/ISR should degrade gracefully, not crash the page.
    console.error('[blog] getAllPosts failed:', err)
    return []
  }
}

export async function getAllSlugs(): Promise<string[]> {
  try {
    const rows = await prisma.blogPost.findMany({ where: publishedWhere, select: { slug: true } })
    return rows.map((r) => r.slug)
  } catch (err) {
    console.error('[blog] getAllSlugs failed:', err)
    return []
  }
}

export async function getPost(slug: string): Promise<BlogPost | null> {
  const row = await prisma.blogPost.findUnique({ where: { slug } })
  if (!row) return null
  if (!row.published && process.env.NODE_ENV === 'production') return null
  return shape(row)
}

function summarise(p: BlogPost): BlogPostSummary {
  const { contentHtml: _h, contentText: _t, ...rest } = p
  return rest
}

export async function getAllPostSummaries(): Promise<BlogPostSummary[]> {
  return (await getAllPosts()).map(summarise)
}

export async function getPostsByCategory(category: string): Promise<BlogPostSummary[]> {
  return (await getAllPostSummaries()).filter((p) => p.category === category)
}

export async function getPostsByTag(tag: string): Promise<BlogPostSummary[]> {
  const wanted = tagSlug(tag)
  return (await getAllPostSummaries()).filter((p) => p.tags.some((t) => tagSlug(t) === wanted))
}

export async function getAllCategoriesInUse(): Promise<{ slug: string; label: string; count: number }[]> {
  const posts = await getAllPosts()
  const counts = new Map<string, number>()
  for (const p of posts) counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
  return [...counts.entries()]
    .map(([slug, count]) => ({ slug, label: categoryLabel(slug), count }))
    .sort((a, b) => b.count - a.count)
}

export async function getAllTagsInUse(): Promise<{ tag: string; slug: string; count: number }[]> {
  const posts = await getAllPosts()
  const counts = new Map<string, number>()
  for (const p of posts) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: tagSlug(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

/**
 * Related posts: score other posts by shared hashtags (×3) and same
 * category (×2), newest first as a tie-break.
 */
export async function getRelatedPosts(current: BlogPost, limit = 3): Promise<BlogPostSummary[]> {
  const currentTags = new Set(current.tags.map(tagSlug))
  return (await getAllPostSummaries())
    .filter((p) => p.slug !== current.slug)
    .map((p) => {
      const shared = p.tags.filter((t) => currentTags.has(tagSlug(t))).length
      const score = shared * 3 + (p.category === current.category ? 2 : 0)
      return { p, score }
    })
    .filter((x) => x.score > 0)
    .sort((a, b) => b.score - a.score || (a.p.date < b.p.date ? 1 : -1))
    .slice(0, limit)
    .map((x) => x.p)
}
