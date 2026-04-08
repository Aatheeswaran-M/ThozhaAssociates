import {
  BriefcaseBusiness,
  FileText,
  FolderOpenDot,
  LayoutGrid,
  LogOut,
  MessageSquareQuote,
  RefreshCw,
  Settings2,
  UsersRound,
} from 'lucide-react'
import { useEffect, useState } from 'react'

import LeadsInbox from '@/components/admin/LeadsInbox'
import ContentManager from '@/components/admin/ContentManager'
import CareersManager from '@/components/admin/CareersManager'
import ProjectManager from '@/components/admin/ProjectManager'
import SiteSettingsManager from '@/components/admin/SiteSettingsManager'
import TestimonialManager from '@/components/admin/TestimonialManager'
import { uploadAssetToCloudinary } from '@/services/cloudinary'
import {
  deleteProject,
  deleteTestimonial,
  fetchLeads,
  fetchProjects,
  fetchSiteContent,
  fetchSiteSettings,
  fetchTestimonials,
  signOutAdmin,
  upsertProject,
  upsertSiteContent,
  upsertSiteSettings,
  upsertTestimonial,
} from '@/services/supabase'
import {
  PROJECT_FORM_INITIAL,
  SITE_CONTENT_INITIAL,
  SITE_SETTINGS_INITIAL,
  TESTIMONIAL_FORM_INITIAL,
} from '@/utils/constants'
import { uniqueList } from '@/utils/helpers'

const DASHBOARD_TABS = [
  { key: 'settings', label: 'Site Settings', icon: Settings2 },
  { key: 'content', label: 'Content', icon: FileText },
  { key: 'careers', label: 'Careers', icon: BriefcaseBusiness },
  { key: 'projects', label: 'Projects', icon: FolderOpenDot },
  { key: 'testimonials', label: 'Testimonials', icon: MessageSquareQuote },
  { key: 'leads', label: 'Leads', icon: UsersRound },
]

function AdminDashboard({ session }) {
  const [activeTab, setActiveTab] = useState('settings')
  const [projects, setProjects] = useState([])
  const [testimonials, setTestimonials] = useState([])
  const [leads, setLeads] = useState([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState('')
  const [status, setStatus] = useState({
    type: 'idle',
    message: '',
  })
  const [projectForm, setProjectForm] = useState(PROJECT_FORM_INITIAL)
  const [testimonialForm, setTestimonialForm] = useState(
    TESTIMONIAL_FORM_INITIAL,
  )
  const [savedSiteContent, setSavedSiteContent] = useState(SITE_CONTENT_INITIAL)
  const [siteContent, setSiteContent] = useState(SITE_CONTENT_INITIAL)
  const [savedSiteSettings, setSavedSiteSettings] = useState(SITE_SETTINGS_INITIAL)
  const [siteSettings, setSiteSettings] = useState(SITE_SETTINGS_INITIAL)
  const [projectFiles, setProjectFiles] = useState({
    cover: null,
    before: null,
    after: null,
  })
  const [testimonialFile, setTestimonialFile] = useState(null)
  const [siteSettingsFiles, setSiteSettingsFiles] = useState({
    logo: null,
    heroBlueprint: null,
    heroFinal: null,
    featuredBefore: null,
    featuredAfter: null,
  })

  async function loadDashboardData() {
    setLoading(true)
    setStatus({
      type: 'idle',
      message: '',
    })

    try {
      const [
        projectRows,
        testimonialRows,
        leadRows,
        siteSettingsRow,
        siteContentRow,
      ] = await Promise.all([
        fetchProjects(),
        fetchTestimonials(),
        fetchLeads(),
        fetchSiteSettings(),
        fetchSiteContent(),
      ])

      setProjects(projectRows)
      setTestimonials(testimonialRows)
      setLeads(leadRows)
      setSavedSiteSettings(siteSettingsRow)
      setSiteSettings(siteSettingsRow)
      setSavedSiteContent(siteContentRow)
      setSiteContent(siteContentRow)
      setSiteSettingsFiles({
        logo: null,
        heroBlueprint: null,
        heroFinal: null,
        featuredBefore: null,
        featuredAfter: null,
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (session?.user) {
      loadDashboardData()
    }
  }, [session?.user])

  function setProjectField(field, value) {
    setProjectForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function setProjectFile(field, value) {
    setProjectFiles((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function clearProjectImage(field) {
    const map = {
      cover: ['cover_image_url', 'remote_cover_url'],
      before: ['before_image_url', 'remote_before_url'],
      after: ['after_image_url', 'remote_after_url'],
    }

    const [urlField, remoteField] = map[field] || []

    if (!urlField || !remoteField) {
      return
    }

    setProjectFiles((current) => ({
      ...current,
      [field]: null,
    }))

    setProjectForm((current) => ({
      ...current,
      [urlField]: '',
      [remoteField]: '',
    }))
  }

  function setTestimonialField(field, value) {
    setTestimonialForm((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function setSiteSettingsField(field, value) {
    setSiteSettings((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function setSiteSettingsFile(field, value) {
    setSiteSettingsFiles((current) => ({
      ...current,
      [field]: value,
    }))
  }

  function clearSiteSettingsMedia(field) {
    const map = {
      logo: ['logo_url', 'remote_logo_url'],
      heroBlueprint: ['hero_blueprint_url', 'remote_hero_blueprint_url'],
      heroFinal: ['hero_final_url', 'remote_hero_final_url'],
      featuredBefore: [
        'featured_before_image_url',
        'remote_featured_before_image_url',
      ],
      featuredAfter: [
        'featured_after_image_url',
        'remote_featured_after_image_url',
      ],
    }

    const [urlField, remoteField] = map[field] || []

    if (!urlField || !remoteField) {
      return
    }

    setSiteSettingsFiles((current) => ({
      ...current,
      [field]: null,
    }))

    setSiteSettings((current) => ({
      ...current,
      [urlField]: '',
      [remoteField]: '',
    }))
  }

  function resetProjectComposer() {
    setProjectForm(PROJECT_FORM_INITIAL)
    setProjectFiles({
      cover: null,
      before: null,
      after: null,
    })
  }

  function resetTestimonialComposer() {
    setTestimonialForm(TESTIMONIAL_FORM_INITIAL)
    setTestimonialFile(null)
  }

  function resetSiteSettingsComposer() {
    setSiteSettings(savedSiteSettings)
    setSiteSettingsFiles({
      logo: null,
      heroBlueprint: null,
      heroFinal: null,
      featuredBefore: null,
      featuredAfter: null,
    })
  }

  function resetSiteContentComposer() {
    setSiteContent(savedSiteContent)
  }

  function setCareers(careers) {
    setSiteContent((current) => ({
      ...current,
      careers,
    }))
  }

  function setSocialLinks(socialLinks) {
    setSiteContent((current) => ({
      ...current,
      social_links: socialLinks,
    }))
  }

  async function resolveLocalAsset(file, folder) {
    if (!file) {
      return null
    }

    return uploadAssetToCloudinary(file, { folder })
  }

  async function handleProjectSubmit(event) {
    event.preventDefault()
    setSaving('project')

    try {
      let coverImageUrl = projectForm.cover_image_url
      let beforeImageUrl = projectForm.before_image_url
      let afterImageUrl = projectForm.after_image_url
      const storagePaths = [...(projectForm.storage_paths || [])]

      if (projectFiles.cover) {
        const asset = await resolveLocalAsset(projectFiles.cover, 'projects')
        coverImageUrl = asset.publicUrl
      } else if (projectForm.remote_cover_url.trim()) {
        coverImageUrl = projectForm.remote_cover_url.trim()
      }

      if (projectFiles.before) {
        const asset = await resolveLocalAsset(projectFiles.before, 'projects')
        beforeImageUrl = asset.publicUrl
      } else if (projectForm.remote_before_url.trim()) {
        beforeImageUrl = projectForm.remote_before_url.trim()
      }

      if (projectFiles.after) {
        const asset = await resolveLocalAsset(projectFiles.after, 'projects')
        afterImageUrl = asset.publicUrl
      } else if (projectForm.remote_after_url.trim()) {
        afterImageUrl = projectForm.remote_after_url.trim()
      }

      if (!coverImageUrl) {
        throw new Error(
          'Add a project cover image using upload or a remote image URL.',
        )
      }

      await upsertProject({
        ...projectForm,
        year: projectForm.year ? Number(projectForm.year) : null,
        cover_image_url: coverImageUrl,
        before_image_url: beforeImageUrl || null,
        after_image_url: afterImageUrl || null,
        storage_paths: uniqueList(storagePaths),
      })

      resetProjectComposer()
      await loadDashboardData()
      setStatus({
        type: 'success',
        message: 'Project saved successfully.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      })
    } finally {
      setSaving('')
    }
  }

  async function handleDeleteProject(project) {
    const confirmed = window.confirm(
      `Delete the project "${project.title}" from Supabase?`,
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteProject(project.id, project.storage_paths || [])
      await loadDashboardData()
      setStatus({
        type: 'success',
        message: 'Project deleted successfully.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      })
    }
  }

  async function handleTestimonialSubmit(event) {
    event.preventDefault()
    setSaving('testimonial')

    try {
      let imageUrl = testimonialForm.image_url
      let storagePath = testimonialForm.storage_path

      if (testimonialFile) {
        const asset = await resolveLocalAsset(testimonialFile, 'testimonials')
        imageUrl = asset.publicUrl
        storagePath = null
      } else if (testimonialForm.remote_image_url.trim()) {
        imageUrl = testimonialForm.remote_image_url.trim()
        storagePath = null
      }

      await upsertTestimonial({
        ...testimonialForm,
        image_url: imageUrl,
        storage_path: storagePath,
      })

      resetTestimonialComposer()
      await loadDashboardData()
      setStatus({
        type: 'success',
        message: 'Testimonial saved successfully.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      })
    } finally {
      setSaving('')
    }
  }

  async function handleSiteSettingsSubmit(event) {
    event.preventDefault()
    setSaving('settings')

    try {
      const normalizedSettings = {
        ...siteSettings,
        name: siteSettings.name.trim(),
        tagline: siteSettings.tagline.trim(),
        blurb: siteSettings.blurb.trim(),
        phone: siteSettings.phone.trim(),
        whatsapp: siteSettings.whatsapp.trim(),
        email: siteSettings.email.trim(),
        location: siteSettings.location.trim(),
      }

      if (!normalizedSettings.name || !normalizedSettings.phone || !normalizedSettings.email) {
        throw new Error('Add the company name, phone number, and email before saving site settings.')
      }

      let logoUrl = normalizedSettings.logo_url
      let heroBlueprintUrl = normalizedSettings.hero_blueprint_url
      let heroFinalUrl = normalizedSettings.hero_final_url
      let featuredBeforeImageUrl = normalizedSettings.featured_before_image_url
      let featuredAfterImageUrl = normalizedSettings.featured_after_image_url

      if (siteSettingsFiles.logo) {
        const asset = await resolveLocalAsset(siteSettingsFiles.logo, 'branding')
        logoUrl = asset.publicUrl
      } else if (normalizedSettings.remote_logo_url.trim()) {
        logoUrl = normalizedSettings.remote_logo_url.trim()
      }

      if (siteSettingsFiles.heroBlueprint) {
        const asset = await resolveLocalAsset(
          siteSettingsFiles.heroBlueprint,
          'hero',
        )
        heroBlueprintUrl = asset.publicUrl
      } else if (normalizedSettings.remote_hero_blueprint_url.trim()) {
        heroBlueprintUrl = normalizedSettings.remote_hero_blueprint_url.trim()
      }

      if (siteSettingsFiles.heroFinal) {
        const asset = await resolveLocalAsset(siteSettingsFiles.heroFinal, 'hero')
        heroFinalUrl = asset.publicUrl
      } else if (normalizedSettings.remote_hero_final_url.trim()) {
        heroFinalUrl = normalizedSettings.remote_hero_final_url.trim()
      }

      if (siteSettingsFiles.featuredBefore) {
        const asset = await resolveLocalAsset(
          siteSettingsFiles.featuredBefore,
          'before-after',
        )
        featuredBeforeImageUrl = asset.publicUrl
      } else if (normalizedSettings.remote_featured_before_image_url.trim()) {
        featuredBeforeImageUrl =
          normalizedSettings.remote_featured_before_image_url.trim()
      }

      if (siteSettingsFiles.featuredAfter) {
        const asset = await resolveLocalAsset(
          siteSettingsFiles.featuredAfter,
          'before-after',
        )
        featuredAfterImageUrl = asset.publicUrl
      } else if (normalizedSettings.remote_featured_after_image_url.trim()) {
        featuredAfterImageUrl =
          normalizedSettings.remote_featured_after_image_url.trim()
      }

      await upsertSiteSettings({
        ...normalizedSettings,
        logo_url: logoUrl,
        hero_blueprint_url: heroBlueprintUrl,
        hero_final_url: heroFinalUrl,
        featured_before_image_url: featuredBeforeImageUrl,
        featured_after_image_url: featuredAfterImageUrl,
      })

      await loadDashboardData()
      setStatus({
        type: 'success',
        message: 'Site settings saved successfully.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      })
    } finally {
      setSaving('')
    }
  }

  async function handleSiteContentSubmit(event) {
    event.preventDefault()
    setSaving('content')

    try {
      await upsertSiteContent(siteContent)
      await loadDashboardData()
      setStatus({
        type: 'success',
        message: 'Public content saved successfully.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      })
    } finally {
      setSaving('')
    }
  }

  async function handleDeleteTestimonial(testimonial) {
    const confirmed = window.confirm(
      `Delete the testimonial from ${testimonial.name}?`,
    )

    if (!confirmed) {
      return
    }

    try {
      await deleteTestimonial(testimonial.id, testimonial.storage_path)
      await loadDashboardData()
      setStatus({
        type: 'success',
        message: 'Testimonial deleted successfully.',
      })
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      })
    }
  }

  function editProject(project) {
    setActiveTab('projects')
    setProjectFiles({
      cover: null,
      before: null,
      after: null,
    })
    setProjectForm({
      ...PROJECT_FORM_INITIAL,
      ...project,
      year: project.year || '',
      remote_cover_url: '',
      remote_before_url: '',
      remote_after_url: '',
      storage_paths: project.storage_paths || [],
      featured: Boolean(project.featured),
    })
  }

  function editTestimonial(testimonial) {
    setActiveTab('testimonials')
    setTestimonialFile(null)
    setTestimonialForm({
      ...TESTIMONIAL_FORM_INITIAL,
      ...testimonial,
      remote_image_url: '',
      rating: testimonial.rating || 5,
    })
  }

  async function handleLogout() {
    try {
      await signOutAdmin()
    } catch (error) {
      setStatus({
        type: 'error',
        message: error.message,
      })
    }
  }

  return (
    <div className="space-y-8">
      <div className="panel flex flex-col gap-6 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow">Admin Dashboard</span>
          <h1 className="mt-4 font-display text-4xl font-bold text-slate-900">
            Manage {siteSettings.name}
          </h1>
          <p className="mt-3 text-slate-600">
            Signed in as {session.user.email}
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={loadDashboardData}
            className="cta-secondary"
          >
            <RefreshCw size={18} />
            Refresh
          </button>
          <button type="button" onClick={handleLogout} className="cta-primary">
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-3">
        <div className="panel p-5">
          <LayoutGrid className="text-accent" />
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-500">
            Projects
          </p>
          <p className="mt-2 font-display text-4xl font-bold text-slate-900">
            {projects.length}
          </p>
        </div>
        <div className="panel p-5">
          <MessageSquareQuote className="text-mint" />
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-500">
            Testimonials
          </p>
          <p className="mt-2 font-display text-4xl font-bold text-slate-900">
            {testimonials.length}
          </p>
        </div>
        <div className="panel p-5">
          <UsersRound className="text-slate-900" />
          <p className="mt-4 text-sm uppercase tracking-[0.2em] text-slate-500">
            Leads
          </p>
          <p className="mt-2 font-display text-4xl font-bold text-slate-900">
            {leads.length}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3">
        {DASHBOARD_TABS.map((tab) => {
          const Icon = tab.icon

          return (
            <button
              key={tab.key}
              type="button"
              onClick={() => setActiveTab(tab.key)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-medium transition ${
                activeTab === tab.key
                  ? 'border-accent bg-accent text-slate-950'
                  : 'border-slate-200 bg-white/80 text-slate-700'
              }`}
            >
              <Icon size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {status.message ? (
        <div
          className={`rounded-2xl border px-4 py-3 text-sm ${
            status.type === 'error'
              ? 'border-rose-300/30 bg-rose-300/10 text-rose-200'
              : 'border-mint/30 bg-mint/10 text-mint'
          }`}
        >
          {status.message}
        </div>
      ) : null}

      {loading ? (
        <div className="panel p-8 text-slate-600">Loading dashboard data...</div>
      ) : null}

      {!loading && activeTab === 'settings' ? (
        <SiteSettingsManager
          form={siteSettings}
          files={siteSettingsFiles}
          saving={saving === 'settings'}
          onFieldChange={setSiteSettingsField}
          onFileChange={setSiteSettingsFile}
          onReset={resetSiteSettingsComposer}
          onSubmit={handleSiteSettingsSubmit}
          onClearMedia={clearSiteSettingsMedia}
        />
      ) : null}

      {!loading && activeTab === 'content' ? (
        <ContentManager
          form={siteContent}
          saving={saving === 'content'}
          onChange={setSiteContent}
          onReset={resetSiteContentComposer}
          onSubmit={handleSiteContentSubmit}
        />
      ) : null}

      {!loading && activeTab === 'careers' ? (
        <CareersManager
          careers={siteContent.careers || []}
          socialLinks={siteContent.social_links || []}
          saving={saving === 'content'}
          onCareersChange={setCareers}
          onSocialLinksChange={setSocialLinks}
          onReset={resetSiteContentComposer}
          onSubmit={handleSiteContentSubmit}
        />
      ) : null}

      {!loading && activeTab === 'projects' ? (
        <ProjectManager
          projects={projects}
          form={projectForm}
          files={projectFiles}
          saving={saving === 'project'}
          onFieldChange={setProjectField}
          onFilesChange={setProjectFile}
          onClearImage={clearProjectImage}
          onReset={resetProjectComposer}
          onSubmit={handleProjectSubmit}
          onEdit={editProject}
          onDelete={handleDeleteProject}
        />
      ) : null}

      {!loading && activeTab === 'testimonials' ? (
        <TestimonialManager
          testimonials={testimonials}
          form={testimonialForm}
          file={testimonialFile}
          saving={saving === 'testimonial'}
          onFieldChange={setTestimonialField}
          onFileChange={setTestimonialFile}
          onReset={resetTestimonialComposer}
          onSubmit={handleTestimonialSubmit}
          onEdit={editTestimonial}
          onDelete={handleDeleteTestimonial}
        />
      ) : null}

      {!loading && activeTab === 'leads' ? <LeadsInbox leads={leads} /> : null}
    </div>
  )
}

export default AdminDashboard
