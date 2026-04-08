import { IMAGE_COLLECTIONS } from '@/utils/constants'
import { createPlaceholderMedia } from '@/utils/helpers'

const CACHE_PREFIX = 'thozha:image:v2:'
const CACHE_TTL = 1000 * 60 * 60 * 6

function readCache(key) {
  if (typeof window === 'undefined') {
    return null
  }

  try {
    const cachedValue = window.localStorage.getItem(`${CACHE_PREFIX}${key}`)

    if (!cachedValue) {
      return null
    }

    const parsed = JSON.parse(cachedValue)

    if (Date.now() - parsed.cachedAt > CACHE_TTL) {
      window.localStorage.removeItem(`${CACHE_PREFIX}${key}`)
      return null
    }

    return parsed.data
  } catch {
    return null
  }
}

function writeCache(key, data) {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(
    `${CACHE_PREFIX}${key}`,
    JSON.stringify({
      cachedAt: Date.now(),
      data,
    }),
  )
}

async function assertResponse(response, providerName) {
  if (!response.ok) {
    const message = await response.text()
    throw new Error(`${providerName} image request failed: ${message}`)
  }
}

function scoreImageMatch(image, preferredTerms = []) {
  const haystack = `${image.alt || ''} ${image.author || ''}`.toLowerCase()

  return preferredTerms.reduce((score, term) => {
    return haystack.includes(term.toLowerCase()) ? score + 3 : score
  }, 0)
}

function dedupeImages(images = []) {
  const seen = new Set()

  return images.filter((image) => {
    const key = image.src || image.id

    if (!key || seen.has(key)) {
      return false
    }

    seen.add(key)
    return true
  })
}

async function searchPexels(query, count, apiKey, preferredTerms = []) {
  const response = await fetch(
    `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${Math.max(
      count * 3,
      12,
    )}&orientation=landscape`,
    {
      headers: {
        Authorization: apiKey,
      },
    },
  )

  await assertResponse(response, 'Pexels')

  const payload = await response.json()

  return dedupeImages(
    (payload.photos || [])
      .map((photo) => ({
        id: `pexels-${photo.id}`,
        src:
          photo.src.landscape ||
          photo.src.large2x ||
          photo.src.large ||
          photo.src.original,
        thumbnail:
          photo.src.medium ||
          photo.src.small ||
          photo.src.landscape ||
          photo.src.large,
        alt: photo.alt || query,
        provider: 'Pexels',
        author: photo.photographer,
        sourceUrl: photo.url,
        score: scoreImageMatch(
          {
            alt: photo.alt || query,
            author: photo.photographer,
          },
          preferredTerms,
        ),
      }))
      .sort((left, right) => right.score - left.score)
      .slice(0, count),
  )
}

async function searchUnsplash(query, count, apiKey) {
  const response = await fetch(
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&page=1&per_page=${count}&orientation=landscape&client_id=${apiKey}`,
    {
      headers: {
        'Accept-Version': 'v1',
      },
    },
  )

  await assertResponse(response, 'Unsplash')

  const payload = await response.json()

  return (payload.results || []).map((photo) => ({
    id: `unsplash-${photo.id}`,
    src: photo.urls.regular || photo.urls.full,
    thumbnail: photo.urls.small || photo.urls.thumb || photo.urls.regular,
    alt: photo.alt_description || query,
    provider: 'Unsplash',
    author: photo.user?.name || 'Unsplash contributor',
    sourceUrl: photo.links?.html || '',
  }))
}

async function searchPixabay(query, count, apiKey) {
  const response = await fetch(
    `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(query)}&image_type=photo&orientation=horizontal&per_page=${count}&safesearch=true`,
  )

  await assertResponse(response, 'Pixabay')

  const payload = await response.json()

  return (payload.hits || []).map((photo) => ({
    id: `pixabay-${photo.id}`,
    src: photo.largeImageURL || photo.webformatURL,
    thumbnail: photo.webformatURL || photo.previewURL,
    alt: photo.tags || query,
    provider: 'Pixabay',
    author: photo.user || 'Pixabay contributor',
    sourceUrl: photo.pageURL || '',
  }))
}

const PROVIDERS = [
  {
    name: 'Pexels',
    key: import.meta.env.VITE_PEXELS_API_KEY,
    search: searchPexels,
    priority: 0,
  },
  {
    name: 'Unsplash',
    key: import.meta.env.VITE_UNSPLASH_ACCESS_KEY,
    search: searchUnsplash,
    priority: 1,
  },
  {
    name: 'Pixabay',
    key: import.meta.env.VITE_PIXABAY_API_KEY,
    search: searchPixabay,
    priority: 2,
  },
]

const ENABLED_PROVIDERS = PROVIDERS.filter((provider) => Boolean(provider.key)).sort(
  (left, right) => left.priority - right.priority,
)

export const hasImageApiKeys = ENABLED_PROVIDERS.length > 0

export async function fetchImageCollection({
  key,
  query,
  queries = [],
  preferredTerms = [],
  count = 4,
}) {
  const cacheKey = `${key}:${[query, ...queries].join('|')}:${count}`
  const cached = readCache(cacheKey)

  if (cached && (!hasImageApiKeys || cached.provider !== 'Demo Placeholder')) {
    return cached
  }

  const searchTerms = [...new Set([query, ...queries].filter(Boolean))]

  for (const provider of ENABLED_PROVIDERS) {
    for (const searchTerm of searchTerms) {
      try {
        const images = await provider.search(
          searchTerm,
          count,
          provider.key,
          preferredTerms,
        )

        if (images.length > 0) {
          const result = {
            provider: provider.name,
            images,
          }
          writeCache(cacheKey, result)
          return result
        }
      } catch (error) {
        console.warn(error)
      }
    }
  }

  const fallbackResult = {
    provider: 'Demo Placeholder',
    images: createPlaceholderMedia(query, count),
  }

  writeCache(cacheKey, fallbackResult)
  return fallbackResult
}

export async function fetchSiteMedia() {
  const entries = await Promise.all(
    IMAGE_COLLECTIONS.map(async (collection) => {
      const data = await fetchImageCollection({
        ...collection,
      })

      return [collection.key, data]
    }),
  )

  return {
    collections: Object.fromEntries(
      entries.map(([key, data]) => [key, data.images]),
    ),
    providers: [...new Set(entries.map(([, data]) => data.provider))],
  }
}
