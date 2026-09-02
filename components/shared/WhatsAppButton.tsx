// Floating WhatsApp button — fixed bottom-right on every page.
// Uses /public/whatsapp.png. Sits below the navbar (z-50) and the mobile
// menu overlay (z-40) so it never covers navigation.

const WHATSAPP_URL = 'https://wa.me/971505548034'

export function WhatsAppButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Syrama on WhatsApp"
      data-cursor
      className="wa-fab"
    >
      <span className="wa-fab__pulse" aria-hidden="true" />
      <img src="/whatsapp.png" alt="" width={56} height={56} className="wa-fab__icon" />
    </a>
  )
}
