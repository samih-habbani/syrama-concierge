'use client'
import { usePathname } from 'next/navigation'
import { WhatsAppButton } from '@/components/shared/WhatsAppButton'

// Skip-link + floating WhatsApp button — shown on the public site only,
// hidden inside the /admin back-office.
export function SiteChrome() {
  const pathname = usePathname()
  if (pathname?.startsWith('/admin')) return null
  return (
    <>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <WhatsAppButton />
    </>
  )
}
