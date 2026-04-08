import { Trash2, UploadCloud } from 'lucide-react'
import { useState } from 'react'

function TestimonialThumb({ imageUrl, name }) {
  const [broken, setBroken] = useState(false)

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  if (!imageUrl || broken) {
    return (
      <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-full bg-accent/15 font-display text-lg font-semibold text-accent">
        {initials}
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      className="h-14 w-14 shrink-0 rounded-full object-cover"
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setBroken(true)}
    />
  )
}

function TestimonialManager({
  testimonials,
  form,
  file,
  saving,
  onFieldChange,
  onFileChange,
  onReset,
  onSubmit,
  onEdit,
  onDelete,
}) {
  return (
    <div className="grid gap-8 xl:grid-cols-[0.85fr_1.15fr]">
      <form onSubmit={onSubmit} className="panel space-y-5 p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="font-display text-2xl font-semibold text-slate-900">
              {form.id ? 'Edit testimonial' : 'Add testimonial'}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Local avatar uploads go to Cloudinary and pasted image URLs stay
              unchanged.
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

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Client name
          </label>
          <input
            className="input-field"
            value={form.name}
            onChange={(event) => onFieldChange('name', event.target.value)}
            placeholder="Client name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Project type
          </label>
          <input
            className="input-field"
            value={form.project_type}
            onChange={(event) =>
              onFieldChange('project_type', event.target.value)
            }
            placeholder="Residential client"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Message
          </label>
          <textarea
            className="textarea-field"
            value={form.message}
            onChange={(event) => onFieldChange('message', event.target.value)}
            placeholder="What did the client appreciate most?"
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Rating
            </label>
            <select
              className="input-field"
              value={form.rating}
              onChange={(event) =>
                onFieldChange('rating', Number(event.target.value))
              }
            >
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Avatar upload
            </label>
            <input
              type="file"
              accept="image/*"
              className="input-field file:mr-4 file:rounded-full file:border-0 file:bg-accent file:px-4 file:py-2 file:text-sm file:font-semibold file:text-slate-950"
              onChange={(event) => onFileChange(event.target.files?.[0] || null)}
            />
            {file ? <p className="mt-2 text-xs text-mint">{file.name}</p> : null}
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-600">
            Avatar remote URL
          </label>
          <input
            className="input-field"
            value={form.remote_image_url}
            onChange={(event) =>
              onFieldChange('remote_image_url', event.target.value)
            }
            placeholder="https://..."
          />
        </div>

        <button type="submit" className="cta-primary" disabled={saving}>
          <UploadCloud size={18} />
          {saving ? 'Saving testimonial...' : 'Save testimonial'}
        </button>
      </form>

      <div className="panel custom-scrollbar max-h-[950px] space-y-4 overflow-y-auto p-6">
        <h2 className="font-display text-2xl font-semibold text-slate-900">
          Saved testimonials
        </h2>
        {testimonials.length === 0 ? (
          <p className="text-slate-600">No testimonials saved yet.</p>
        ) : null}
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.id}
            className="rounded-[1.8rem] border border-slate-200 bg-white/88 p-5"
          >
            <div className="flex items-start gap-4">
              <TestimonialThumb
                imageUrl={testimonial.image_url}
                name={testimonial.name}
              />
              <div className="flex-1">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h3 className="font-display text-xl font-semibold text-slate-900">
                      {testimonial.name}
                    </h3>
                    {testimonial.project_type ? (
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                        {testimonial.project_type}
                      </p>
                    ) : null}
                    <p className="mt-2 text-sm text-slate-600">
                      {testimonial.message}
                    </p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900">
                    {testimonial.rating}/5
                  </span>
                </div>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => onEdit(testimonial)}
                    className="cta-secondary px-4 py-2 text-sm"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => onDelete(testimonial)}
                    className="inline-flex items-center gap-2 rounded-full border border-rose-300/25 bg-rose-300/10 px-4 py-2 text-sm font-medium text-rose-200"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}

export default TestimonialManager
