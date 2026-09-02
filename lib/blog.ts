import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { Marked } from 'marked'
import { categoryLabel, tagSlug } from './blog-taxonomy'

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')

export interface BlogPost {
  slug: string
  title: string
  excerpt: string
  date: string // ISO
  updated: string | null // ISO
  category: string
  categoryLabel: string
  tags: string[] // canonical cased hashtags, no #
  heroImage: string
  heroAlt: string
  readingMinutes: number
  contentHtml: string
  contentText: string
}

export interface BlogPostSummary extends Omit<BlogPost, 'contentHtml' | 'contentText'> {}

// A dedicated Marked instance so we can style output and keep internal
// links as real <a> (Next intercepts same-origin <a> for soft nav anyway).
const md = new Marked({ gfm: true, breaks: false })

function readRaw(slug: string): { data: Record<string, unknown>; content: string } | null {
  const file = path.join(BLOG_DIR, `${slug}.md`)
  if (!fs.existsSync(file)) return null
  return matter(fs.readFileSync(file, 'utf8'))
}

function toPost(slug: string, data: Record<string, unknown>, content: string): BlogPost {
  const contentHtml = md.parse(content, { async: false }) as string
  const contentText = content.replace(/[#>*_`\-!\[\]()]/g, ' ').replace(/\s+/g, ' ').trim()
  const words = contentText.split(' ').filter(Boolean).length
  const rawTags = Array.isArray(data.tags) ? (data.tags as string[]) : []

  return {
    slug,
    title: String(data.title ?? slug),
    excerpt: String(data.excerpt ?? ''),
    date: new Date(String(data.date ?? Date.now())).toISOString(),
    updated: data.updated ? new Date(String(data.updated)).toISOString() : null,
    category: String(data.category ?? 'concierge'),
    categoryLabel: categoryLabel(String(data.category ?? 'concierge')),
    tags: rawTags.map((t) => t.replace(/^#/, '')),
    heroImage: String(data.heroImage ?? '/assets/iconic-events.webp'),
    heroAlt: String(data.heroAlt ?? data.title ?? ''),
    readingMinutes: Math.max(1, Math.round(words / 200)),
    contentHtml,
    contentText,
  }
}

export function getAllSlugs(): string[] {
  if (!fs.existsSync(BLOG_DIR)) return []
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => f.replace(/\.md$/, ''))
}

export function getPost(slug: string): BlogPost | null {
  const raw = readRaw(slug)
  if (!raw) return null
  if (raw.data.draft === true && process.env.NODE_ENV === 'production') return null
  return toPost(slug, raw.data, raw.content)
}

export function getAllPosts(): BlogPost[] {
  return getAllSlugs()
    .map((s) => getPost(s))
    .filter((p): p is BlogPost => p !== null)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function summarise(p: BlogPost): BlogPostSummary {
  const { contentHtml: _h, contentText: _t, ...rest } = p
  return rest
}

export function getAllPostSummaries(): BlogPostSummary[] {
  return getAllPosts().map(summarise)
}

export function getPostsByCategory(category: string): BlogPostSummary[] {
  return getAllPostSummaries().filter((p) => p.category === category)
}

export function getPostsByTag(tag: string): BlogPostSummary[] {
  const wanted = tagSlug(tag)
  return getAllPostSummaries().filter((p) => p.tags.some((t) => tagSlug(t) === wanted))
}

export function getAllCategoriesInUse(): { slug: string; label: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const p of getAllPosts()) counts.set(p.category, (counts.get(p.category) ?? 0) + 1)
  return [...counts.entries()]
    .map(([slug, count]) => ({ slug, label: categoryLabel(slug), count }))
    .sort((a, b) => b.count - a.count)
}

export function getAllTagsInUse(): { tag: string; slug: string; count: number }[] {
  const counts = new Map<string, number>()
  for (const p of getAllPosts()) for (const t of p.tags) counts.set(t, (counts.get(t) ?? 0) + 1)
  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, slug: tagSlug(tag), count }))
    .sort((a, b) => b.count - a.count || a.tag.localeCompare(b.tag))
}

/**
 * Related posts for internal linking: score other posts by shared hashtags
 * (weight 3) and same category (weight 2), newest first as a tie-break.
 */
export function getRelatedPosts(current: BlogPost, limit = 3): BlogPostSummary[] {
  const currentTags = new Set(current.tags.map(tagSlug))
  return getAllPostSummaries()
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
