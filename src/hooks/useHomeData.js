import { useEffect, useMemo, useState } from 'react'

import { fetchSiteMedia, hasImageApiKeys } from '@/services/imageProviders'
import {
  fetchSiteContent,
  fetchProjects,
  fetchSiteSettings,
  fetchTestimonials,
  getStoragePublicUrl,
  isSupabaseConfigured,
} from '@/services/supabase'
import {
  BUILD_STAGE_BLUEPRINTS,
  DEFAULT_COMPANY,
  SITE_CONTENT_INITIAL,
  DEFAULT_TESTIMONIALS,
} from '@/utils/constants'
import { pickMedia, wait } from '@/utils/helpers'

function normalizeTestimonials(records = []) {
  return records.map((testimonial) => ({
    ...testimonial,
    image_url: getStoragePublicUrl(
      testimonial.image_url || testimonial.storage_path || '',
    ),
  }))
}

export function useHomeData() {
  const [state, setState] = useState({
    loading: true,
    media: {
      collections: {},
      providers: ['Demo Placeholder'],
    },
    company: DEFAULT_COMPANY,
    siteContent: SITE_CONTENT_INITIAL,
    cmsProjects: [],
    testimonials: DEFAULT_TESTIMONIALS,
    warnings: [],
  })

  useEffect(() => {
    let active = true

    async function bootstrap() {
      const startedAt = Date.now()

      const [
        mediaResult,
        projectsResult,
        testimonialsResult,
        siteSettingsResult,
        siteContentResult,
      ] =
        await Promise.allSettled([
          fetchSiteMedia(),
          fetchProjects(),
          fetchTestimonials(),
          fetchSiteSettings(),
          fetchSiteContent(),
        ])

      const elapsed = Date.now() - startedAt

      if (elapsed < 1200) {
        await wait(1200 - elapsed)
      }

      if (!active) {
        return
      }

      const warnings = []
      const media =
        mediaResult.status === 'fulfilled'
          ? mediaResult.value
          : {
              collections: {},
              providers: ['Demo Placeholder'],
            }

      if (mediaResult.status === 'rejected') {
        warnings.push(
          'Dynamic image feeds are unavailable, so placeholders are being shown.',
        )
      }

      const company =
        siteSettingsResult.status === 'fulfilled'
          ? siteSettingsResult.value
          : DEFAULT_COMPANY

      if (siteSettingsResult.status === 'rejected') {
        warnings.push('Site settings could not be loaded, so default company details are being used.')
      }

      const siteContent =
        siteContentResult.status === 'fulfilled'
          ? siteContentResult.value
          : SITE_CONTENT_INITIAL

      if (siteContentResult.status === 'rejected') {
        warnings.push(
          'Site content could not be loaded, so the default company copy is being used.',
        )
      }

      const cmsProjects =
        projectsResult.status === 'fulfilled' ? projectsResult.value : []

      if (projectsResult.status === 'rejected') {
        warnings.push('Supabase projects could not be loaded.')
      }

      const testimonialRecords =
        testimonialsResult.status === 'fulfilled'
          ? normalizeTestimonials(testimonialsResult.value)
          : []

      if (testimonialsResult.status === 'rejected') {
        warnings.push('Supabase testimonials could not be loaded.')
      }

      setState({
        loading: false,
        media,
        company,
        siteContent,
        cmsProjects,
        testimonials:
          testimonialRecords.length > 0
            ? testimonialRecords
            : DEFAULT_TESTIMONIALS,
        warnings,
      })
    }

    bootstrap()

    return () => {
      active = false
    }
  }, [])

  const buildStages = useMemo(
    () =>
      state.siteContent.process_steps.map((step, index) => {
        const fallbackStage =
          BUILD_STAGE_BLUEPRINTS[index] ||
          BUILD_STAGE_BLUEPRINTS[BUILD_STAGE_BLUEPRINTS.length - 1]

        return {
          ...fallbackStage,
          key: `${fallbackStage.key}-${index + 1}`,
          title: step.title || fallbackStage.title,
          description: step.description || fallbackStage.description,
          percent:
            typeof step.percent === 'number'
              ? step.percent
              : fallbackStage.percent,
          image: pickMedia(
            state.media.collections[fallbackStage.collectionKey],
            index,
            fallbackStage.collectionKey,
          ),
        }
      }),
    [state.media.collections, state.siteContent.process_steps],
  )

  return {
    ...state,
    buildStages,
    providerSummary: state.media.providers,
    liveImagesEnabled: hasImageApiKeys,
    cmsEnabled: isSupabaseConfigured,
  }
}
