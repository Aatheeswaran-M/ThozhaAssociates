import { MessageCircleMore, PhoneCall } from 'lucide-react'

import { formatPhoneHref } from '@/utils/helpers'

function FloatingActions({ company }) {
  const whatsappNumber = company.whatsapp?.replace(/\D/g, '') || ''
  const phoneNumber = company.phone?.trim() || ''

  if (!whatsappNumber && !phoneNumber) {
    return null
  }

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      {whatsappNumber ? (
        <a
          href={`https://wa.me/${whatsappNumber}`}
          target="_blank"
          rel="noreferrer"
          className="cta-primary h-14 w-14 rounded-full p-0"
          aria-label="Chat on WhatsApp"
        >
          <MessageCircleMore size={22} />
        </a>
      ) : null}
      {phoneNumber ? (
        <a
          href={formatPhoneHref(phoneNumber)}
          className="cta-secondary h-14 w-14 rounded-full p-0"
          aria-label="Call now"
        >
          <PhoneCall size={22} />
        </a>
      ) : null}
    </div>
  )
}

export default FloatingActions
