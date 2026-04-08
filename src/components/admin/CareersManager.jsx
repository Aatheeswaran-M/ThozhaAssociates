import { Plus, Save, Trash2 } from 'lucide-react'

function CareersManager({
  careers,
  socialLinks,
  saving,
  onCareersChange,
  onSocialLinksChange,
  onReset,
  onSubmit,
}) {
  function updateCareer(index, field, value) {
    onCareersChange(
      careers.map((career, careerIndex) =>
        careerIndex === index ? { ...career, [field]: value } : career,
      ),
    )
  }

  function addCareer() {
    onCareersChange([
      ...careers,
      {
        title: '',
        type: '',
        location: '',
      },
    ])
  }

  function removeCareer(index) {
    onCareersChange(careers.filter((_, careerIndex) => careerIndex !== index))
  }

  function updateSocialLink(index, field, value) {
    onSocialLinksChange(
      socialLinks.map((link, linkIndex) =>
        linkIndex === index ? { ...link, [field]: value } : link,
      ),
    )
  }

  function addSocialLink() {
    onSocialLinksChange([
      ...socialLinks,
      {
        label: '',
        url: '',
      },
    ])
  }

  function removeSocialLink(index) {
    onSocialLinksChange(
      socialLinks.filter((_, linkIndex) => linkIndex !== index),
    )
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow">Careers Studio</span>
          <h1 className="mt-4 font-display text-4xl font-bold text-slate-900">
            Careers dashboard and social links
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            Manage open roles shown on the careers section and set social media links used on the public website.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            type="button"
            onClick={onReset}
            className="cta-secondary px-5 py-3 text-sm"
          >
            Reset
          </button>
          <button type="submit" className="cta-primary px-5 py-3 text-sm" disabled={saving}>
            <Save size={16} />
            {saving ? 'Saving careers...' : 'Save careers'}
          </button>
        </div>
      </div>

      <div className="panel space-y-5 p-6">
        <div>
          <h2 className="font-display text-2xl font-semibold text-slate-900">
            Career roles
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            Add roles for the careers dashboard cards.
          </p>
        </div>

        <div className="space-y-4">
          {careers.map((career, index) => (
            <div
              key={`career-${index + 1}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Role {String(index + 1).padStart(2, '0')}
                </p>
                <button
                  type="button"
                  onClick={() => removeCareer(index)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-300/20 bg-rose-300/10 text-rose-200"
                  aria-label={`Remove career role ${index + 1}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Role title
                  </label>
                  <input
                    className="input-field"
                    value={career.title || ''}
                    onChange={(event) =>
                      updateCareer(index, 'title', event.target.value)
                    }
                    placeholder="Site Engineer"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Employment type
                  </label>
                  <input
                    className="input-field"
                    value={career.type || ''}
                    onChange={(event) =>
                      updateCareer(index, 'type', event.target.value)
                    }
                    placeholder="Full Time"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Location
                  </label>
                  <input
                    className="input-field"
                    value={career.location || ''}
                    onChange={(event) =>
                      updateCareer(index, 'location', event.target.value)
                    }
                    placeholder="Tamil Nadu"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="cta-secondary px-4 py-2 text-sm" onClick={addCareer}>
          <Plus size={16} />
          Add role
        </button>
      </div>

      <div className="panel space-y-5 p-6">
        <div>
          <h2 className="font-display text-2xl font-semibold text-slate-900">
            Social links
          </h2>
          <p className="mt-2 text-sm text-slate-500">
            These links are shown in the careers section social row.
          </p>
        </div>

        <div className="space-y-4">
          {socialLinks.map((link, index) => (
            <div
              key={`social-${index + 1}`}
              className="rounded-[1.5rem] border border-slate-200 bg-white/90 p-4"
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Link {String(index + 1).padStart(2, '0')}
                </p>
                <button
                  type="button"
                  onClick={() => removeSocialLink(index)}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-rose-300/20 bg-rose-300/10 text-rose-200"
                  aria-label={`Remove social link ${index + 1}`}
                >
                  <Trash2 size={15} />
                </button>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    Label
                  </label>
                  <input
                    className="input-field"
                    value={link.label || ''}
                    onChange={(event) =>
                      updateSocialLink(index, 'label', event.target.value)
                    }
                    placeholder="LinkedIn"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    URL
                  </label>
                  <input
                    className="input-field"
                    value={link.url || ''}
                    onChange={(event) =>
                      updateSocialLink(index, 'url', event.target.value)
                    }
                    placeholder="https://www.linkedin.com/company/..."
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button type="button" className="cta-secondary px-4 py-2 text-sm" onClick={addSocialLink}>
          <Plus size={16} />
          Add social link
        </button>
      </div>
    </form>
  )
}

export default CareersManager
