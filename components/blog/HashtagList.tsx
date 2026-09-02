import Link from 'next/link'
import { tagSlug } from '@/lib/blog-taxonomy'

// Hashtags are the blog's lateral navigation. Each chip links to its tag
// archive, so related articles connect through shared tags even when they
// sit in different categories.
export function HashtagList({
  tags,
  size = 'md',
  label,
}: {
  tags: string[]
  size?: 'sm' | 'md'
  label?: string
}) {
  if (!tags.length) return null
  const fs = size === 'sm' ? 10 : 11
  const pad = size === 'sm' ? '5px 10px' : '7px 14px'

  return (
    <div>
      {label && (
        <div style={{ fontFamily: 'var(--font-tenor)', fontSize: 9, letterSpacing: '0.28em', textTransform: 'uppercase', color: 'var(--or)', marginBottom: 14 }}>
          {label}
        </div>
      )}
      <ul style={{ display: 'flex', flexWrap: 'wrap', gap: 10, listStyle: 'none', margin: 0, padding: 0 }}>
        {tags.map((tag) => (
          <li key={tag}>
            <Link
              href={`/blog/tag/${tagSlug(tag)}`}
              data-cursor
              style={{
                display: 'inline-block',
                fontFamily: 'var(--font-tenor)', fontSize: fs, letterSpacing: '0.06em',
                color: 'var(--or-clair)', textDecoration: 'none',
                border: '1px solid rgba(184,151,74,0.28)', padding: pad,
                transition: 'border-color 0.3s ease, background 0.3s ease',
              }}
            >
              #{tag}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
