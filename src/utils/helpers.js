export function cn(...values) {
  return values.flat().filter(Boolean).join(' ')
}

export function slugify(value = '') {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function wait(duration) {
  return new Promise((resolve) => {
    window.setTimeout(resolve, duration)
  })
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function truncateWords(value = '', maxWords = 18) {
  const normalized = String(value || '')
    .replace(/\s+/g, ' ')
    .trim()

  if (!normalized) {
    return ''
  }

  const words = normalized.split(' ')

  if (words.length <= maxWords) {
    return normalized
  }

  return `${words.slice(0, maxWords).join(' ')}...`
}

function encodeSvg(value) {
  return encodeURIComponent(value)
    .replace(/%0A/g, '')
    .replace(/%20/g, ' ')
    .replace(/%3D/g, '=')
    .replace(/%3A/g, ':')
    .replace(/%2F/g, '/')
}

export function createPlaceholderMedia(query, count = 4) {
  const safeQuery = query || 'construction reference'

  return Array.from({ length: count }, (_, index) => {
    const accent = index % 2 === 0 ? '#F2A93B' : '#65D6B0'
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900">
        <defs>
          <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
            <stop offset="0%" stop-color="#0b1628" />
            <stop offset="100%" stop-color="#18263d" />
          </linearGradient>
        </defs>
        <rect width="1200" height="900" fill="url(#bg)" />
        <g stroke="${accent}" stroke-width="2" opacity="0.45">
          <path d="M120 120H1080M120 240H1080M120 360H1080M120 480H1080M120 600H1080M120 720H1080" />
          <path d="M180 80V820M360 80V820M540 80V820M720 80V820M900 80V820" />
        </g>
        <rect x="120" y="140" width="960" height="620" rx="36" fill="rgba(255,255,255,0.05)" stroke="${accent}" stroke-width="4" />
        <path d="M280 620L600 300L920 620" fill="none" stroke="${accent}" stroke-width="14" stroke-linecap="round" stroke-linejoin="round" />
        <path d="M430 620V470H770V620" fill="none" stroke="#F7F4ED" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" />
        <text x="140" y="120" fill="#65D6B0" font-family="Arial, sans-serif" font-size="28" letter-spacing="10">DYNAMIC IMAGE FEED</text>
        <text x="140" y="805" fill="#F7F4ED" font-family="Arial, sans-serif" font-size="54" font-weight="700">${safeQuery}</text>
        <text x="140" y="850" fill="#9fb4cc" font-family="Arial, sans-serif" font-size="28">Add Pexels, Unsplash, or Pixabay keys for live imagery</text>
      </svg>
    `

    return {
      id: `placeholder-${slugify(safeQuery)}-${index}`,
      src: `data:image/svg+xml;charset=UTF-8,${encodeSvg(svg)}`,
      thumbnail: `data:image/svg+xml;charset=UTF-8,${encodeSvg(svg)}`,
      alt: safeQuery,
      provider: 'Demo Placeholder',
      author: 'Local fallback',
      sourceUrl: '#',
    }
  })
}

export function pickMedia(collection = [], index = 0, query = 'construction') {
  return collection[index] || createPlaceholderMedia(query, 1)[0]
}

export function uniqueList(values = []) {
  return [...new Set(values.filter(Boolean))]
}

export function formatDate(value) {
  if (!value) {
    return 'Just now'
  }

  return new Intl.DateTimeFormat('en-IN', {
    dateStyle: 'medium',
  }).format(new Date(value))
}

export function formatPhoneHref(phone) {
  return `tel:${phone.replace(/[^\d+]/g, '')}`
}

export function buildProjectHeight(index) {
  const patterns = [
    'aspect-[4/5]',
    'aspect-[5/4]',
    'aspect-[4/6]',
    'aspect-[16/11]',
  ]

  return patterns[index % patterns.length]
}
