'use client'
import { useEffect, useState } from 'react'
import { PageHead, Btn, Badge, Modal, Field, Input, Textarea, Select, F, tableStyle, thStyle, tdStyle } from '@/components/admin/ui'
import { CATEGORIES, HASHTAGS } from '@/lib/blog-taxonomy'

type Post = {
  id: number; slug: string; title: string; excerpt: string; category: string
  tags: string[]; heroImage: string; heroAlt: string; body: string
  published: boolean; publishedAt: string
}
const CAT_ENTRIES = Object.entries(CATEGORIES) as [string, { label: string }][]
const EMPTY: Partial<Post> = { title: '', slug: '', excerpt: '', category: CAT_ENTRIES[0][0], tags: [], heroImage: '', heroAlt: '', body: '', published: true }

export default function BlogAdminPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [editing, setEditing] = useState<Partial<Post> | null>(null)
  const [tagsText, setTagsText] = useState('')
  const [saving, setSaving] = useState(false)
  const [err, setErr] = useState('')

  const load = () => fetch('/api/admin/blog').then((r) => r.json()).then((d) => setPosts(d.posts || []))
  useEffect(() => { load() }, [])

  function edit(p: Partial<Post>) {
    setEditing(p)
    setTagsText((p.tags || []).join(', '))
    setErr('')
  }

  async function save() {
    if (!editing?.title || !editing.body || !editing.category || !editing.heroImage) {
      setErr('Title, body, category and hero image are required'); return
    }
    setSaving(true); setErr('')
    const payload = {
      ...editing,
      tags: tagsText,
      publishedAt: editing.publishedAt ? new Date(editing.publishedAt).toISOString() : undefined,
    }
    const res = await fetch('/api/admin/blog', {
      method: editing.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
    setSaving(false)
    if (!res.ok) { setErr((await res.json().catch(() => ({}))).error || 'Save failed'); return }
    setEditing(null); load()
  }
  async function remove(id: number) {
    if (!confirm('Delete this article?')) return
    await fetch(`/api/admin/blog?id=${id}`, { method: 'DELETE' }); load()
  }

  const set = (k: keyof Post) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setEditing((c) => ({ ...c, [k]: e.target.value }))

  return (
    <div>
      <PageHead title="Journal" subtitle="Blog articles." actions={<Btn onClick={() => edit({ ...EMPTY })}>+ New article</Btn>} />

      <div style={{ border: '1px solid rgba(184,151,74,0.12)', borderRadius: 12, overflow: 'hidden' }}>
        <table style={tableStyle}>
          <thead><tr>
            <th style={thStyle}>Article</th><th style={thStyle}>Category</th><th style={thStyle}>Published</th><th style={thStyle}>Status</th><th style={thStyle}></th>
          </tr></thead>
          <tbody>
            {posts.map((p) => (
              <tr key={p.id}>
                <td style={tdStyle}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    {p.heroImage && <img src={p.heroImage} alt="" style={{ width: 46, height: 32, objectFit: 'cover', borderRadius: 4, flexShrink: 0 }} />}
                    <div>
                      <div style={{ color: '#f5eedd' }}>{p.title}</div>
                      <div style={{ fontSize: 11, color: '#8a8a7c' }}>/blog/{p.slug}</div>
                    </div>
                  </div>
                </td>
                <td style={{ ...tdStyle, fontSize: 12 }}>{CATEGORIES[p.category as keyof typeof CATEGORIES]?.label || p.category}</td>
                <td style={{ ...tdStyle, fontSize: 12, color: '#8a8a7c' }}>{new Date(p.publishedAt).toLocaleDateString('en-GB')}</td>
                <td style={tdStyle}><Badge tone={p.published ? 'green' : 'neutral'}>{p.published ? 'Live' : 'Draft'}</Badge></td>
                <td style={{ ...tdStyle, textAlign: 'right', whiteSpace: 'nowrap' }}>
                  <Btn small variant="ghost" as="a" href={`/blog/${p.slug}`}>View</Btn>{' '}
                  <Btn small variant="ghost" onClick={() => edit(p)}>Edit</Btn>{' '}
                  <Btn small variant="danger" onClick={() => remove(p.id)}>Delete</Btn>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal open={!!editing} onClose={() => setEditing(null)} title={editing?.id ? 'Edit article' : 'New article'} wide>
        {editing && (
          <div>
            <Field label="Title"><Input value={editing.title || ''} onChange={set('title')} /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              <Field label={editing.id ? 'Slug' : 'Slug (auto from title if blank)'}><Input value={editing.slug || ''} onChange={set('slug')} placeholder="monaco-grand-prix" /></Field>
              <Field label="Category">
                <Select value={editing.category} onChange={set('category')}>
                  {CAT_ENTRIES.map(([k, v]) => <option key={k} value={k}>{v.label}</option>)}
                </Select>
              </Field>
            </div>
            <Field label="Excerpt"><Textarea rows={2} value={editing.excerpt || ''} onChange={set('excerpt')} /></Field>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 14 }}>
              <Field label="Hero image URL"><Input value={editing.heroImage || ''} onChange={set('heroImage')} placeholder="/assets/… or https://…" /></Field>
              <Field label="Hero alt text"><Input value={editing.heroAlt || ''} onChange={set('heroAlt')} /></Field>
            </div>
            {editing.heroImage && <img src={editing.heroImage} alt="" style={{ width: '100%', maxHeight: 160, objectFit: 'cover', borderRadius: 8, marginBottom: 14 }} />}
            <Field label="Hashtags (comma-separated, no #)">
              <Input value={tagsText} onChange={(e) => setTagsText(e.target.value)} placeholder="MonacoGrandPrix, FrenchRiviera" />
            </Field>
            <div style={{ fontFamily: F, fontSize: 10.5, color: '#8a8a7c', margin: '-8px 0 16px', lineHeight: 1.7 }}>
              Suggested: {Object.keys(HASHTAGS).slice(0, 12).join(' · ')}…
            </div>
            <Field label="Body (Markdown)">
              <Textarea rows={16} value={editing.body || ''} onChange={set('body')} style={{ fontFamily: 'ui-monospace, Menlo, monospace', fontSize: 12.5 }} />
            </Field>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, alignItems: 'center' }}>
              <Field label="Publish date">
                <Input type="date" value={(editing.publishedAt || '').slice(0, 10)} onChange={(e) => setEditing({ ...editing, publishedAt: e.target.value })} />
              </Field>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: F, fontSize: 13, color: '#d4d4c6', marginTop: 10 }}>
                <input type="checkbox" checked={editing.published !== false} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} />
                Published (visible on the site)
              </label>
            </div>
            {err && <p style={{ fontFamily: F, fontSize: 12, color: '#e08080' }}>{err}</p>}
            <div style={{ display: 'flex', gap: 10, marginTop: 10 }}>
              <Btn onClick={save} disabled={saving}>{saving ? 'Saving…' : 'Save article'}</Btn>
              <Btn variant="ghost" onClick={() => setEditing(null)}>Cancel</Btn>
            </div>
          </div>
        )}
      </Modal>
    </div>
  )
}
