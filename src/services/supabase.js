import { createClient } from '@supabase/supabase-js'

import { SITE_CONTENT_INITIAL, SITE_SETTINGS_INITIAL } from '@/utils/constants'
import { slugify } from '@/utils/helpers'

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_URL
const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY
const MEDIA_BUCKET = import.meta.env.VITE_SUPABASE_MEDIA_BUCKET || 'site-media'

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY)

export const supabase = isSupabaseConfigured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    })
  : null

function requireClient() {
  if (!supabase) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to continue.',
    )
  }

  return supabase
}

export async function getCurrentSession() {
  if (!supabase) {
    return null
  }

  const { data } = await supabase.auth.getSession()
  return data.session
}

export function onAuthStateChange(callback) {
  if (!supabase) {
    return () => {}
  }

  const { data } = supabase.auth.onAuthStateChange((_event, session) => {
    callback(session)
  })

  return () => {
    data.subscription.unsubscribe()
  }
}

export async function signInAdmin({ email, password }) {
  const client = requireClient()
  const { error } = await client.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    throw error
  }
}

export async function signOutAdmin() {
  const client = requireClient()
  const { error } = await client.auth.signOut()

  if (error) {
    throw error
  }
}

export async function fetchProjects() {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('projects')
    .select('*')
    .order('featured', { ascending: false })
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data || []
}

export async function fetchTestimonials() {
  if (!supabase) {
    return []
  }

  const { data, error } = await supabase
    .from('testimonials')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return (data || []).map((testimonial) => ({
    ...testimonial,
    image_url: getStoragePublicUrl(
      testimonial.image_url || testimonial.storage_path || '',
    ),
  }))
}

function normalizeSiteSettings(row = {}) {
  return {
    ...SITE_SETTINGS_INITIAL,
    ...row,
    remote_logo_url: '',
    remote_hero_blueprint_url: '',
    remote_hero_final_url: '',
    logo_url: getStoragePublicUrl(
      row.logo_url || SITE_SETTINGS_INITIAL.logo_url,
    ),
    hero_blueprint_url: getStoragePublicUrl(
      row.hero_blueprint_url || SITE_SETTINGS_INITIAL.hero_blueprint_url,
    ),
    hero_final_url: getStoragePublicUrl(
      row.hero_final_url || SITE_SETTINGS_INITIAL.hero_final_url,
    ),
    featured_before_after_title:
      row.featured_before_after_title ||
      SITE_SETTINGS_INITIAL.featured_before_after_title,
    featured_before_image_url: getStoragePublicUrl(
      row.featured_before_image_url ||
        SITE_SETTINGS_INITIAL.featured_before_image_url,
    ),
    featured_after_image_url: getStoragePublicUrl(
      row.featured_after_image_url || SITE_SETTINGS_INITIAL.featured_after_image_url,
    ),
  }
}

function normalizeStringArray(value, fallback = []) {
  const items = Array.isArray(value)
    ? value
        .filter((item) => typeof item === 'string' && item.trim())
        .map((item) => item.trim())
    : []

  return items.length ? items : fallback
}

function normalizeObjectArray(value, fallback = [], fields = []) {
  const items = Array.isArray(value)
    ? value
        .map((item) => {
          if (!item || typeof item !== 'object' || Array.isArray(item)) {
            return null
          }

          return fields.reduce((accumulator, field) => {
            const current = item[field]
            return {
              ...accumulator,
              [field]:
                typeof current === 'string'
                  ? current
                  : typeof current === 'number'
                    ? current
                    : '',
            }
          }, {})
        })
        .filter(Boolean)
    : []

  return items.length ? items : fallback
}

function normalizeHeroStats(value) {
  const items = Array.isArray(value)
    ? value
        .map((item) => {
          if (!item || typeof item !== 'object' || Array.isArray(item)) {
            return null
          }

          const parsedValue =
            typeof item.value === 'number'
              ? item.value
              : typeof item.value === 'string' && item.value.trim()
                ? Number(item.value)
                : null

          return {
            label: typeof item.label === 'string' ? item.label : '',
            value: Number.isFinite(parsedValue) ? parsedValue : null,
            suffix: typeof item.suffix === 'string' ? item.suffix : '',
            valueText: typeof item.valueText === 'string' ? item.valueText : '',
          }
        })
        .filter(
          (item) =>
            item &&
            item.label &&
            (item.valueText.trim() || Number.isFinite(item.value)),
        )
    : []

  return items.length ? items : SITE_CONTENT_INITIAL.hero_stats
}

function normalizeProcessSteps(value) {
  const items = Array.isArray(value)
    ? value
        .map((item, index) => {
          if (!item || typeof item !== 'object' || Array.isArray(item)) {
            return null
          }

          const fallback = SITE_CONTENT_INITIAL.process_steps[index] || {}
          const parsedPercent =
            typeof item.percent === 'number'
              ? item.percent
              : typeof item.percent === 'string' && item.percent.trim()
                ? Number(item.percent)
                : fallback.percent

          return {
            title:
              typeof item.title === 'string' && item.title.trim()
                ? item.title
                : fallback.title || '',
            description:
              typeof item.description === 'string' && item.description.trim()
                ? item.description
                : fallback.description || '',
            percent: Number.isFinite(parsedPercent)
              ? parsedPercent
              : fallback.percent || 0,
          }
        })
        .filter((item) => item && item.title && item.description)
    : []

  return items.length ? items : SITE_CONTENT_INITIAL.process_steps
}

function normalizeSiteContent(row = {}) {
  const aboutSource =
    row.about && typeof row.about === 'object' && !Array.isArray(row.about)
      ? row.about
      : {}

  return {
    ...SITE_CONTENT_INITIAL,
    ...row,
    about: {
      ...SITE_CONTENT_INITIAL.about,
      ...aboutSource,
      values: normalizeStringArray(
        aboutSource.values,
        SITE_CONTENT_INITIAL.about.values,
      ),
    },
    hero_features: normalizeStringArray(
      row.hero_features,
      SITE_CONTENT_INITIAL.hero_features,
    ),
    hero_stats: normalizeHeroStats(row.hero_stats),
    services: normalizeObjectArray(
      row.services,
      SITE_CONTENT_INITIAL.services,
      ['title', 'description'],
    ),
    careers: normalizeObjectArray(
      row.careers,
      SITE_CONTENT_INITIAL.careers,
      ['title', 'type', 'location'],
    ),
    social_links: normalizeObjectArray(
      row.social_links,
      SITE_CONTENT_INITIAL.social_links,
      ['label', 'url'],
    ),
    why_choose_us: normalizeObjectArray(
      row.why_choose_us,
      SITE_CONTENT_INITIAL.why_choose_us,
      ['title', 'description'],
    ),
    process_steps: normalizeProcessSteps(row.process_steps),
    faq: normalizeObjectArray(row.faq, SITE_CONTENT_INITIAL.faq, [
      'question',
      'answer',
    ]),
  }
}

export async function fetchSiteSettings() {
  if (!supabase) {
    return normalizeSiteSettings()
  }

  const { data, error } = await supabase
    .from('site_settings')
    .select('*')
    .eq('id', 1)
    .maybeSingle()

  if (error) {
    throw error
  }

  return normalizeSiteSettings(data || {})
}

export async function fetchSiteContent() {
  if (!supabase) {
    return normalizeSiteContent()
  }

  const { data, error } = await supabase
    .from('site_content')
    .select('*')
    .eq('id', 1)
    .maybeSingle()

  if (error) {
    throw error
  }

  return normalizeSiteContent(data || {})
}

export function getStoragePublicUrl(path = '') {
  if (!path) {
    return ''
  }

  if (/^https?:\/\//i.test(path) || path.startsWith('data:')) {
    return path
  }

  if (!supabase) {
    return path
  }

  const { data } = supabase.storage.from(MEDIA_BUCKET).getPublicUrl(path)
  return data.publicUrl
}

export async function fetchLeads() {
  if (!supabase) {
    return []
  }

  await assertAdminAccess()

  const { data, error } = await supabase
    .from('leads')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) {
    throw error
  }

  return data || []
}

export async function createLead(payload) {
  if (!supabase) {
    return {
      demo: true,
    }
  }

  const { error } = await supabase.from('leads').insert(payload)

  if (error) {
    throw error
  }

  return {
    demo: false,
  }
}

function getFileExtension(fileName, mimeType = '') {
  const direct = fileName?.split('.').pop()?.toLowerCase()

  if (direct && direct !== fileName) {
    return direct
  }

  const normalizedMimeType = mimeType.split(';')[0].trim().toLowerCase()

  const mimeMap = {
    'image/jpeg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif',
    'image/svg+xml': 'svg',
  }

  if (mimeMap[normalizedMimeType]) {
    return mimeMap[normalizedMimeType]
  }

  if (normalizedMimeType.includes('/')) {
    return normalizedMimeType.split('/').pop().split('+')[0]
  }

  return 'jpg'
}

function normalizeContentType(mimeType = '') {
  return mimeType.split(';')[0].trim().toLowerCase()
}

function getFileBaseName(fileName = 'asset') {
  return (
    slugify(fileName.replace(/\.[^.]+$/, '')).slice(0, 60) ||
    'asset'
  )
}

async function getCurrentUser() {
  const client = requireClient()
  const {
    data: { user },
    error,
  } = await client.auth.getUser()

  if (error) {
    throw error
  }

  if (!user) {
    throw new Error('Your session has expired. Sign in again and retry.')
  }

  return user
}

async function ensureCurrentProfile() {
  const client = requireClient()
  const user = await getCurrentUser()

  const { data: existingProfile, error: fetchError } = await client
    .from('profiles')
    .select('id, is_admin, full_name')
    .eq('id', user.id)
    .maybeSingle()

  if (fetchError) {
    throw fetchError
  }

  if (existingProfile) {
    return {
      user,
      profile: existingProfile,
    }
  }

  const { data: insertedProfile, error: insertError } = await client
    .from('profiles')
    .insert({
      id: user.id,
      full_name: user.user_metadata?.full_name || user.email || 'Admin User',
    })
    .select('id, is_admin, full_name')
    .single()

  if (insertError) {
    throw new Error(
      'Your profile row does not exist yet. Re-run the latest schema.sql and sign in again so the admin profile can be created.',
    )
  }

  return {
    user,
    profile: insertedProfile,
  }
}

export async function assertAdminAccess() {
  const { user, profile } = await ensureCurrentProfile()

  if (!profile?.is_admin) {
    throw new Error(
      `Your account is signed in but is not marked as admin. Run: update public.profiles set is_admin = true where id = '${user.id}';`,
    )
  }

  return {
    user,
    profile,
  }
}

export async function uploadAssetToStorage(source, { folder = 'projects' } = {}) {
  const client = requireClient()
  await assertAdminAccess()

  let fileBlob = null
  let fileName = 'asset'
  let contentType = 'image/jpeg'

  if (source instanceof File) {
    fileBlob = source
    fileName = source.name
    contentType = source.type || contentType
  } else if (typeof source === 'string' && source.trim()) {
    const response = await fetch(source)

    if (!response.ok) {
      throw new Error('Could not download the remote image for upload.')
    }

    fileBlob = await response.blob()
    fileName = source.split('/').pop()?.split('?')[0] || fileName
    contentType =
      response.headers.get('content-type') || fileBlob.type || contentType
  }

  if (!fileBlob) {
    throw new Error(
      'Choose a file or provide a remote image URL before uploading.',
    )
  }

  contentType = normalizeContentType(contentType || fileBlob.type || 'image/jpeg')

  if (contentType && !contentType.startsWith('image/')) {
    throw new Error(
      'The selected file is not a supported image. Use JPG, PNG, WEBP, GIF, AVIF, or SVG.',
    )
  }

  const extension = getFileExtension(fileName, contentType)
  const baseName = getFileBaseName(fileName)
  const uniqueToken =
    typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function'
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
  const filePath = `${folder}/${uniqueToken}-${baseName}.${extension}`

  const { error } = await client.storage.from(MEDIA_BUCKET).upload(
    filePath,
    fileBlob,
    {
      cacheControl: '3600',
      upsert: false,
      contentType,
    },
  )

  if (error) {
    throw new Error(
      `Storage upload failed: ${error.message}. If this is an admin upload, confirm the latest schema.sql has been run and your public.profiles row has is_admin = true.`,
    )
  }

  const { data } = client.storage.from(MEDIA_BUCKET).getPublicUrl(filePath)

  return {
    path: filePath,
    publicUrl: data.publicUrl,
  }
}

export async function removeStorageAssets(paths = []) {
  if (!supabase || !paths.length) {
    return
  }

  const { error } = await supabase.storage.from(MEDIA_BUCKET).remove(paths)

  if (error) {
    throw error
  }
}

export async function upsertProject(project) {
  const client = requireClient()
  await assertAdminAccess()

  const payload = {
    title: project.title,
    slug: slugify(project.slug || project.title),
    category: project.category,
    location: project.location,
    area_label: project.area_label || null,
    year: project.year || null,
    status: project.status,
    summary: project.summary,
    cover_image_url: project.cover_image_url,
    before_image_url: project.before_image_url || null,
    after_image_url: project.after_image_url || null,
    storage_paths: project.storage_paths || [],
    featured: Boolean(project.featured),
  }

  if (project.id) {
    const { error } = await client
      .from('projects')
      .update(payload)
      .eq('id', project.id)

    if (error) {
      throw error
    }

    return
  }

  const { error } = await client.from('projects').insert(payload)

  if (error) {
    throw error
  }
}

export async function upsertSiteSettings(settings) {
  const client = requireClient()
  await assertAdminAccess()

  const payload = {
    id: 1,
    name: settings.name,
    tagline: settings.tagline,
    blurb: settings.blurb,
    phone: settings.phone,
    whatsapp: settings.whatsapp,
    email: settings.email,
    location: settings.location,
    logo_url: settings.logo_url || null,
    hero_blueprint_url: settings.hero_blueprint_url || null,
    hero_final_url: settings.hero_final_url || null,
    featured_before_after_title:
      settings.featured_before_after_title ||
      SITE_SETTINGS_INITIAL.featured_before_after_title,
    featured_before_image_url: settings.featured_before_image_url || null,
    featured_after_image_url: settings.featured_after_image_url || null,
  }

  const { error } = await client
    .from('site_settings')
    .upsert(payload, { onConflict: 'id' })

  if (error) {
    throw error
  }
}

export async function upsertSiteContent(content) {
  const client = requireClient()
  await assertAdminAccess()

  const payload = {
    id: 1,
    about: {
      ...SITE_CONTENT_INITIAL.about,
      ...(content.about || {}),
      values: normalizeStringArray(
        content.about?.values,
        SITE_CONTENT_INITIAL.about.values,
      ),
    },
    hero_features: normalizeStringArray(
      content.hero_features,
      SITE_CONTENT_INITIAL.hero_features,
    ),
    hero_stats: normalizeHeroStats(content.hero_stats),
    services: normalizeObjectArray(content.services, [], ['title', 'description']),
    careers: normalizeObjectArray(content.careers, [], [
      'title',
      'type',
      'location',
    ]),
    social_links: normalizeObjectArray(content.social_links, [], [
      'label',
      'url',
    ]),
    why_choose_us: normalizeObjectArray(content.why_choose_us, [], [
      'title',
      'description',
    ]),
    process_steps: normalizeProcessSteps(content.process_steps),
    faq: normalizeObjectArray(content.faq, [], ['question', 'answer']),
  }

  const { error } = await client
    .from('site_content')
    .upsert(payload, { onConflict: 'id' })

  if (error) {
    throw error
  }
}

export async function deleteProject(projectId, storagePaths = []) {
  const client = requireClient()
  await assertAdminAccess()

  const { error } = await client.from('projects').delete().eq('id', projectId)

  if (error) {
    throw error
  }

  if (storagePaths.length) {
    await removeStorageAssets(storagePaths)
  }
}

export async function upsertTestimonial(testimonial) {
  const client = requireClient()
  await assertAdminAccess()

  const payload = {
    name: testimonial.name,
    project_type: testimonial.project_type || null,
    message: testimonial.message,
    rating: Number(testimonial.rating),
    image_url: testimonial.image_url || null,
    storage_path: testimonial.storage_path || null,
  }

  if (testimonial.id) {
    const { error } = await client
      .from('testimonials')
      .update(payload)
      .eq('id', testimonial.id)

    if (error) {
      throw error
    }

    return
  }

  const { error } = await client.from('testimonials').insert(payload)

  if (error) {
    throw error
  }
}

export async function deleteTestimonial(testimonialId, storagePath = '') {
  const client = requireClient()
  await assertAdminAccess()

  const { error } = await client
    .from('testimonials')
    .delete()
    .eq('id', testimonialId)

  if (error) {
    throw error
  }

  if (storagePath) {
    await removeStorageAssets([storagePath])
  }
}
