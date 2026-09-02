import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin',
  robots: { index: false, follow: false, nocache: true },
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <div style={{ background: '#06090f', minHeight: '100vh', color: '#f5eedd' }}>{children}</div>
}
