import { motion } from 'framer-motion'
import { Image as ImageIcon, Trash2, UploadCloud } from 'lucide-react'
import { useEffect, useMemo } from 'react'

import { PROJECT_STATUS_OPTIONS } from '@/utils/constants'

function ProjectImageField({
  title,
  file,
  remoteValue,
  previewUrl,
  onFileChange,
  onRemoteChange,
  onClear,
  fallbackText,
}) {
  const actualPreviewUrl = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file)
    }

    return previewUrl
  }, [file, previewUrl])

  useEffect(() => {
    return () => {
      if (actualPreviewUrl?.startsWith('blob:')) {
        URL.revokeObjectURL(actualPreviewUrl)
      }
    }
  }, [actualPreviewUrl])

  return (
    <div className="rounded-[1.6rem] border border-slate-200 bg-white/88 p-4">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-900">{title}</p>
          <p className="mt-1 text-xs text-slate-500">
            Upload a file or paste a direct image URL.
          </p>
        </div>
        <button
          type="button"
          onClick={onClear}
          className="rounded-full border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 transition hover:border-slate-400 hover:text-slate-900"
        >
          Clear
        </button>
      </div>

      <div className="mt-4 overflow-hidden rounded-[1.3rem] border border-slate-200 bg-white/88">
        {actualPreviewUrl ? (
          <img
            src={actualPreviewUrl}
            alt={title}
            className="aspect-[16/10] w-full object-cover"
          />
        ) : (
          <div className="grid aspect-[16/10] place-items-center text-center">
            <div>
              <ImageIcon className="mx-auto text-slate-500" size={22} />
              <p className="mt-3 text-sm text-slate-600">{fallbackText}</p>
            </div>
          </div>
        )}
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

function ProjectManager({
  projects,
  form,
  files,
  saving,
  onFieldChange,
  onFilesChange,
  onClearImage,
  onReset,
  onSubmit,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid gap-8 xl:grid-cols-[0.95fr_1.05fr]">
      <form onSubmit={onSubmit} className="panel space-y-5 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-900">
              {form.id ? 'Edit project' : 'Add project'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Local uploads are sent to Cloudinary and pasted image URLs are
              saved exactly as provided.
            </p>
          </div>
          {form.id ? (
            <button
              type="button"
              className="cta-secondary px-4 py-2 text-sm"
              onClick={onReset}
            >
              Reset
            </button>
          ) : null}
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Title
            </label>
            <input
              className="input-field"
              value={form.title}
              onChange={(event) => onFieldChange('title', event.target.value)}
              placeholder="Project title"
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
              placeholder="Project location"
            />
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Category
            </label>
            <select
              className="input-field"
              value={form.category}
              onChange={(event) => onFieldChange('category', event.target.value)}
            >
              <option>Residential</option>
              <option>Commercial</option>
              <option>Renovation</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Area label
            </label>
            <input
              className="input-field"
              value={form.area_label}
              onChange={(event) =>
                onFieldChange('area_label', event.target.value)
              }
              placeholder="1850 sq ft"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Year
            </label>
            <input
              className="input-field"
              value={form.year}
              onChange={(event) => onFieldChange('year', event.target.value)}
              placeholder="2026"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Status
            </label>
            <select
              className="input-field"
              value={form.status}
              onChange={(event) => onFieldChange('status', event.target.value)}
            >
              {PROJECT_STATUS_OPTIONS.map((statusOption) => (
                <option key={statusOption}>{statusOption}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Summary
          </label>
          <textarea
            className="textarea-field"
            value={form.summary}
            onChange={(event) => onFieldChange('summary', event.target.value)}
            placeholder="Describe the design direction, site story, and outcome."
          />
        </div>

        <div className="space-y-4">
          <ProjectImageField
            title="Cover image"
            file={files.cover}
            remoteValue={form.remote_cover_url}
            previewUrl={form.cover_image_url}
            onFileChange={(file) => onFilesChange('cover', file)}
            onRemoteChange={(value) => onFieldChange('remote_cover_url', value)}
            onClear={() => onClearImage('cover')}
            fallbackText="Project cover not set yet"
          />

          <div className="grid gap-4 xl:grid-cols-2">
            <ProjectImageField
              title="Before image"
              file={files.before}
              remoteValue={form.remote_before_url}
              previewUrl={form.before_image_url}
              onFileChange={(file) => onFilesChange('before', file)}
              onRemoteChange={(value) =>
                onFieldChange('remote_before_url', value)
              }
              onClear={() => onClearImage('before')}
              fallbackText="Before image not set yet"
            />

            <ProjectImageField
              title="After image"
              file={files.after}
              remoteValue={form.remote_after_url}
              previewUrl={form.after_image_url}
              onFileChange={(file) => onFilesChange('after', file)}
              onRemoteChange={(value) => onFieldChange('remote_after_url', value)}
              onClear={() => onClearImage('after')}
              fallbackText="After image not set yet"
            />
          </div>
        </div>

        <label className="flex items-center gap-3 text-sm text-slate-600">
          <input
            type="checkbox"
            checked={form.featured}
            onChange={(event) => onFieldChange('featured', event.target.checked)}
          />
          Mark as featured
        </label>

        <button type="submit" className="cta-primary" disabled={saving}>
          <UploadCloud size={18} />
          {saving ? 'Saving project...' : 'Save project'}
        </button>
      </form>

      <div className="panel custom-scrollbar max-h-[950px] space-y-4 overflow-y-auto p-6">
        <h2 className="font-display text-2xl font-semibold text-slate-900">
          Saved projects
        </h2>
        {projects.length === 0 ? (
          <p className="text-slate-600">No projects saved yet.</p>
        ) : null}
        {projects.map((project) => (
          <motion.article
            key={project.id}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white/88"
          >
            {project.cover_image_url ? (
              <img
                src={project.cover_image_url}
                alt={project.title}
                className="aspect-[16/9] w-full object-cover"
              />
            ) : null}
            <div className="space-y-4 p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    {project.category}
                  </p>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-slate-900">
                    {project.title}
                  </h3>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900">
                  {project.status}
                </span>
              </div>
              <p className="text-sm text-slate-600">{project.summary}</p>
              <div className="flex flex-wrap gap-2">
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600">
                  Cover {project.cover_image_url ? 'ready' : 'missing'}
                </span>
                {project.area_label ? (
                  <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600">
                    {project.area_label}
                  </span>
                ) : null}
                {project.year ? (
                  <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600">
                    {project.year}
                  </span>
                ) : null}
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600">
                  Before {project.before_image_url ? 'ready' : 'optional'}
                </span>
                <span className="rounded-full border border-slate-200 bg-white/80 px-3 py-1 text-xs font-medium text-slate-600">
                  After {project.after_image_url ? 'ready' : 'optional'}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => onEdit(project)}
                  className="cta-secondary px-4 py-2 text-sm"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(project)}
                  className="inline-flex items-center gap-2 rounded-full border border-rose-300/25 bg-rose-300/10 px-4 py-2 text-sm font-medium text-rose-200"
                >
                  <Trash2 size={16} />
                  Delete
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  )
}

export default ProjectManager
