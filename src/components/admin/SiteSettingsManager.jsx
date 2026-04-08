import {
  Image as ImageIcon,
  Mail,
  MapPin,
  MessageCircleMore,
  PhoneCall,
  UploadCloud,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'

function MediaPreview({ label, alt, imageUrl, fallbackText, fallbackClassName = '' }) {
  const [broken, setBroken] = useState(false)

  const fallback = (
    <div
      className={`grid aspect-[4/3] w-full place-items-center rounded-[1.4rem] border border-dashed border-slate-200 bg-white/88 text-center ${fallbackClassName}`}
    >
      <div>
        <ImageIcon className="mx-auto text-slate-500" size={24} />
        <p className="mt-3 text-sm font-medium text-slate-600">{label}</p>
        <p className="mt-1 text-xs text-slate-500">{fallbackText}</p>
      </div>
    </div>
  )

  if (!imageUrl || broken) {
    return fallback
  }

  return (
    <div className="overflow-hidden rounded-[1.4rem] border border-slate-200 bg-white/88">
      <img
        src={imageUrl}
        alt={alt}
        className="aspect-[4/3] w-full object-cover"
        onError={() => setBroken(true)}
      />
    </div>
  )
}

function LogoBadge({ name, logoUrl }) {
  const [broken, setBroken] = useState(false)

  const initials = (name || 'TA')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  if (!logoUrl || broken) {
    return (
      <div className="grid h-20 w-20 place-items-center rounded-[1.8rem] bg-accent/15 font-display text-2xl font-semibold text-accent">
        {initials}
      </div>
    )
  }

  return (
    <img
      src={logoUrl}
      alt={`${name} logo`}
      className="h-20 w-20 rounded-[1.8rem] object-cover"
      onError={() => setBroken(true)}
    />
  )
}

function SettingsMediaField({
  title,
  file,
  remoteValue,
  previewUrl,
  onFileChange,
  onRemoteChange,
  onClear,
  fallbackText,
}) {
  return (
    <div className="rounded-[1.8rem] border border-slate-200 bg-white/88 p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h3 className="font-display text-lg font-semibold text-slate-900">{title}</h3>
          <p className="mt-1 text-sm text-slate-500">
            Upload a local image or paste a direct image URL.
          </p>
        </div>
        <button
          type="button"
          className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
          onClick={onClear}
        >
          Clear
        </button>
      </div>

      <div className="mt-4">
        <MediaPreview
          key={previewUrl || title}
          label={title}
          alt={title}
          imageUrl={previewUrl}
          fallbackText={fallbackText}
        />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Upload file
          </label>
          <input
            type="file"
            accept="image/*"
            className="input-field file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950"
            onChange={(event) => onFileChange(event.target.files?.[0] || null)}
          />
          {file ? <p className="mt-2 text-xs text-mint">{file.name}</p> : null}
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Remote URL
          </label>
          <input
            className="input-field"
            value={remoteValue}
            onChange={(event) => onRemoteChange(event.target.value)}
            placeholder="https://..."
          />
        </div>
      </div>
    </div>
  )
}

function SiteSettingsManager({
  form,
  files,
  saving,
  onFieldChange,
  onFileChange,
  onReset,
  onSubmit,
  onClearMedia,
}) {
  const logoPreviewUrl = useMemo(() => {
    if (files.logo) {
      return URL.createObjectURL(files.logo)
    }

    return form.remote_logo_url.trim() || form.logo_url
  }, [files.logo, form.logo_url, form.remote_logo_url])

  const heroBlueprintPreviewUrl = useMemo(() => {
    if (files.heroBlueprint) {
      return URL.createObjectURL(files.heroBlueprint)
    }

    return form.remote_hero_blueprint_url.trim() || form.hero_blueprint_url
  }, [
    files.heroBlueprint,
    form.hero_blueprint_url,
    form.remote_hero_blueprint_url,
  ])

  const heroFinalPreviewUrl = useMemo(() => {
    if (files.heroFinal) {
      return URL.createObjectURL(files.heroFinal)
    }

    return form.remote_hero_final_url.trim() || form.hero_final_url
  }, [files.heroFinal, form.hero_final_url, form.remote_hero_final_url])

  const featuredBeforePreviewUrl = useMemo(() => {
    if (files.featuredBefore) {
      return URL.createObjectURL(files.featuredBefore)
    }

    return (
      form.remote_featured_before_image_url.trim() || form.featured_before_image_url
    )
  }, [
    files.featuredBefore,
    form.featured_before_image_url,
    form.remote_featured_before_image_url,
  ])

  const featuredAfterPreviewUrl = useMemo(() => {
    if (files.featuredAfter) {
      return URL.createObjectURL(files.featuredAfter)
    }

    return (
      form.remote_featured_after_image_url.trim() || form.featured_after_image_url
    )
  }, [
    files.featuredAfter,
    form.featured_after_image_url,
    form.remote_featured_after_image_url,
  ])

  useEffect(() => {
    return () => {
      if (logoPreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(logoPreviewUrl)
      }
    }
  }, [logoPreviewUrl])

  useEffect(() => {
    return () => {
      if (heroBlueprintPreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(heroBlueprintPreviewUrl)
      }
    }
  }, [heroBlueprintPreviewUrl])

  useEffect(() => {
    return () => {
      if (heroFinalPreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(heroFinalPreviewUrl)
      }
    }
  }, [heroFinalPreviewUrl])

  useEffect(() => {
    return () => {
      if (featuredBeforePreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(featuredBeforePreviewUrl)
      }
    }
  }, [featuredBeforePreviewUrl])

  useEffect(() => {
    return () => {
      if (featuredAfterPreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(featuredAfterPreviewUrl)
      }
    }
  }, [featuredAfterPreviewUrl])

  return (
    <div className="grid gap-8 xl:grid-cols-[0.92fr_1.08fr]">
      <form onSubmit={onSubmit} className="panel space-y-5 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-900">
              Site settings
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Update the business details and hero media shown across the
              website. Local uploads go to Cloudinary and pasted image URLs stay
              unchanged.
            </p>
          </div>
          <button
            type="button"
            className="cta-secondary px-4 py-2 text-sm"
            onClick={onReset}
          >
            Reset
          </button>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Company name
            </label>
            <input
              className="input-field"
              value={form.name}
              onChange={(event) => onFieldChange('name', event.target.value)}
              placeholder="Thozha Associates"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Tagline
            </label>
            <input
              className="input-field"
              value={form.tagline}
              onChange={(event) => onFieldChange('tagline', event.target.value)}
              placeholder="From Blueprint to Reality"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Brand story
          </label>
          <textarea
            className="textarea-field"
            value={form.blurb}
            onChange={(event) => onFieldChange('blurb', event.target.value)}
            placeholder="Short company introduction shown in the hero, footer, and quote section."
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Phone number
            </label>
            <input
              className="input-field"
              value={form.phone}
              onChange={(event) => onFieldChange('phone', event.target.value)}
              placeholder="+91 98765 43210"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              WhatsApp number
            </label>
            <input
              className="input-field"
              value={form.whatsapp}
              onChange={(event) => onFieldChange('whatsapp', event.target.value)}
              placeholder="919876543210"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Email
            </label>
            <input
              type="email"
              className="input-field"
              value={form.email}
              onChange={(event) => onFieldChange('email', event.target.value)}
              placeholder="hello@example.com"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Location
            </label>
            <input
              className="input-field"
              value={form.location}
              onChange={(event) => onFieldChange('location', event.target.value)}
              placeholder="Tamil Nadu, India"
            />
          </div>
        </div>

        <SettingsMediaField
          title="Logo"
          file={files.logo}
          remoteValue={form.remote_logo_url}
          previewUrl={logoPreviewUrl}
          onFileChange={(file) => onFileChange('logo', file)}
          onRemoteChange={(value) => onFieldChange('remote_logo_url', value)}
          onClear={() => onClearMedia('logo')}
          fallbackText="Logo not set yet"
        />

        <SettingsMediaField
          title="Hero blueprint image"
          file={files.heroBlueprint}
          remoteValue={form.remote_hero_blueprint_url}
          previewUrl={heroBlueprintPreviewUrl}
          onFileChange={(file) => onFileChange('heroBlueprint', file)}
          onRemoteChange={(value) =>
            onFieldChange('remote_hero_blueprint_url', value)
          }
          onClear={() => onClearMedia('heroBlueprint')}
          fallbackText="Falls back to the live blueprint feed"
        />

        <SettingsMediaField
          title="Hero final building image"
          file={files.heroFinal}
          remoteValue={form.remote_hero_final_url}
          previewUrl={heroFinalPreviewUrl}
          onFileChange={(file) => onFileChange('heroFinal', file)}
          onRemoteChange={(value) => onFieldChange('remote_hero_final_url', value)}
          onClear={() => onClearMedia('heroFinal')}
          fallbackText="Falls back to the live completed-build feed"
        />

        <div className="rounded-[1.8rem] border border-slate-200 bg-white/88 p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h3 className="font-display text-lg font-semibold text-slate-900">
                Before / after showcase
              </h3>
              <p className="mt-1 text-sm text-slate-500">
                Control the standalone comparison section shown on the website.
              </p>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Showcase title
            </label>
            <input
              className="input-field"
              value={form.featured_before_after_title}
              onChange={(event) =>
                onFieldChange('featured_before_after_title', event.target.value)
              }
              placeholder="Villa renovation before and after"
            />
          </div>

          <div className="mt-4 grid gap-4 xl:grid-cols-2">
            <SettingsMediaField
              title="Showcase before image"
              file={files.featuredBefore}
              remoteValue={form.remote_featured_before_image_url}
              previewUrl={featuredBeforePreviewUrl}
              onFileChange={(file) => onFileChange('featuredBefore', file)}
              onRemoteChange={(value) =>
                onFieldChange('remote_featured_before_image_url', value)
              }
              onClear={() => onClearMedia('featuredBefore')}
              fallbackText="Falls back to the first project before image"
            />

            <SettingsMediaField
              title="Showcase after image"
              file={files.featuredAfter}
              remoteValue={form.remote_featured_after_image_url}
              previewUrl={featuredAfterPreviewUrl}
              onFileChange={(file) => onFileChange('featuredAfter', file)}
              onRemoteChange={(value) =>
                onFieldChange('remote_featured_after_image_url', value)
              }
              onClear={() => onClearMedia('featuredAfter')}
              fallbackText="Falls back to the first project after image"
            />
          </div>
        </div>

        <div className="flex flex-wrap gap-3">
          <button type="submit" className="cta-primary" disabled={saving}>
            <UploadCloud size={18} />
            {saving ? 'Saving settings...' : 'Save site settings'}
          </button>
        </div>
      </form>

      <div className="space-y-6">
        <div className="panel p-6">
          <p className="text-sm uppercase tracking-[0.22em] text-slate-500">
            Brand preview
          </p>
          <div className="mt-5 flex items-center gap-4">
            <LogoBadge
              key={logoPreviewUrl || form.name}
              name={form.name}
              logoUrl={logoPreviewUrl}
            />
            <div>
              <h3 className="font-display text-2xl font-semibold text-slate-900">
                {form.name}
              </h3>
              <p className="mt-1 text-sm uppercase tracking-[0.18em] text-slate-500">
                {form.location || 'Construction Studio'}
              </p>
            </div>
          </div>

          <div className="mt-6 rounded-[1.8rem] border border-accent/20 bg-accent/10 p-5">
            <p className="eyebrow">Hero Headline</p>
            <p className="mt-3 font-display text-3xl font-semibold text-slate-900">
              {form.tagline}
            </p>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
              {form.blurb}
            </p>
          </div>
        </div>

        <div className="panel p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.22em] text-slate-500">
                Hero media preview
              </p>
              <p className="mt-2 text-sm text-slate-500">
                These images drive the blueprint-to-reality animation when set.
              </p>
            </div>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <MediaPreview
              key={heroBlueprintPreviewUrl || 'hero-blueprint'}
              label="Blueprint"
              alt="Hero blueprint"
              imageUrl={heroBlueprintPreviewUrl}
              fallbackText="Live blueprint feed"
            />
            <MediaPreview
              key={heroFinalPreviewUrl || 'hero-final'}
              label="Final building"
              alt="Hero final"
              imageUrl={heroFinalPreviewUrl}
              fallbackText="Live final-build feed"
            />
          </div>
        </div>

        <div className="panel p-6">
          <p className="text-sm uppercase tracking-[0.22em] text-slate-500">
            Before / after preview
          </p>
          <p className="mt-2 text-sm text-slate-500">
            When both images are set here, this showcase is controlled directly
            from the dashboard.
          </p>

          <div className="mt-4 rounded-[1.8rem] border border-slate-200 bg-white/88 p-5">
            <p className="font-display text-2xl font-semibold text-slate-900">
              {form.featured_before_after_title || 'Before and after showcase'}
            </p>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <MediaPreview
                key={featuredBeforePreviewUrl || 'featured-before'}
                label="Before"
                alt="Showcase before"
                imageUrl={featuredBeforePreviewUrl}
                fallbackText="Project fallback before image"
              />
              <MediaPreview
                key={featuredAfterPreviewUrl || 'featured-after'}
                label="After"
                alt="Showcase after"
                imageUrl={featuredAfterPreviewUrl}
                fallbackText="Project fallback after image"
              />
            </div>
          </div>
        </div>

        <div className="panel space-y-4 p-6">
          <p className="text-sm uppercase tracking-[0.22em] text-slate-500">
            Contact details
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-[1.6rem] border border-slate-200 bg-white/88 p-4">
              <PhoneCall className="text-accent" size={18} />
              <p className="mt-3 text-sm text-slate-500">Phone</p>
              <p className="mt-1 text-slate-900">{form.phone || 'Not set yet'}</p>
            </div>
            <div className="rounded-[1.6rem] border border-slate-200 bg-white/88 p-4">
              <MessageCircleMore className="text-mint" size={18} />
              <p className="mt-3 text-sm text-slate-500">WhatsApp</p>
              <p className="mt-1 text-slate-900">{form.whatsapp || 'Not set yet'}</p>
            </div>
            <div className="rounded-[1.6rem] border border-slate-200 bg-white/88 p-4">
              <Mail className="text-slate-900" size={18} />
              <p className="mt-3 text-sm text-slate-500">Email</p>
              <p className="mt-1 break-all text-slate-900">{form.email || 'Not set yet'}</p>
            </div>
            <div className="rounded-[1.6rem] border border-slate-200 bg-white/88 p-4">
              <MapPin className="text-accent" size={18} />
              <p className="mt-3 text-sm text-slate-500">Location</p>
              <p className="mt-1 text-slate-900">{form.location || 'Not set yet'}</p>
            </div>
          </div>
          <p className="text-sm text-slate-500">
            These values are used in the navbar, hero section, quote section,
            footer, floating actions, and the hero media animation.
          </p>
        </div>
      </div>
    </div>
  )
}

export default SiteSettingsManager
