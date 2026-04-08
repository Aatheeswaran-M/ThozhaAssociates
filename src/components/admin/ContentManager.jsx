import { Plus, Save, Trash2 } from 'lucide-react'

function EditorCard({ title, description, children }) {
  return (
    <div className="panel space-y-5 p-6">
      <div>
        <h2 className="font-display text-2xl font-semibold text-slate-900">{title}</h2>
        <p className="mt-2 text-sm text-slate-500">{description}</p>
      </div>
      {children}
    </div>
  )
}

function TextListEditor({
  title,
  description,
  items,
  onAdd,
  onChange,
  onRemove,
  placeholder,
}) {
  return (
    <EditorCard title={title} description={description}>
      <div className="space-y-3">
        {items.map((item, index) => (
          <div key={`${title}-${index + 1}`} className="flex gap-3">
            <input
              className="input-field"
              value={item}
              onChange={(event) => onChange(index, event.target.value)}
              placeholder={placeholder}
            />
            <button
              type="button"
              onClick={() => onRemove(index)}
              className="inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-rose-300/20 bg-rose-300/10 text-rose-200"
              aria-label={`Remove ${title} item ${index + 1}`}
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
      <button type="button" className="cta-secondary px-4 py-2 text-sm" onClick={onAdd}>
        <Plus size={16} />
        Add item
      </button>
    </EditorCard>
  )
}

function StructuredListEditor({
  title,
  description,
  items,
  fields,
  onAdd,
  onChange,
  onRemove,
  addLabel = 'Add item',
}) {
  return (
    <EditorCard title={title} description={description}>
      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={`${title}-${index + 1}`}
            className="rounded-[1.8rem] border border-slate-200 bg-white/88 p-5"
          >
            <div className="mb-4 flex items-center justify-between gap-3">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                Item {String(index + 1).padStart(2, '0')}
              </p>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-rose-300/20 bg-rose-300/10 text-rose-200"
                aria-label={`Remove ${title} item ${index + 1}`}
              >
                <Trash2 size={16} />
              </button>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field.key}
                  className={field.fullWidth ? 'md:col-span-2' : undefined}
                >
                  <label className="mb-2 block text-sm font-medium text-slate-600">
                    {field.label}
                  </label>
                  {field.type === 'textarea' ? (
                    <textarea
                      className="textarea-field"
                      value={item[field.key] ?? ''}
                      onChange={(event) =>
                        onChange(index, field.key, event.target.value)
                      }
                      placeholder={field.placeholder}
                    />
                  ) : (
                    <input
                      type={field.type || 'text'}
                      className="input-field"
                      value={item[field.key] ?? ''}
                      onChange={(event) =>
                        onChange(index, field.key, event.target.value)
                      }
                      placeholder={field.placeholder}
                    />
                  )}
                  {field.helpText ? (
                    <p className="mt-2 text-xs text-slate-500">{field.helpText}</p>
                  ) : null}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button type="button" className="cta-secondary px-4 py-2 text-sm" onClick={onAdd}>
        <Plus size={16} />
        {addLabel}
      </button>
    </EditorCard>
  )
}

function ContentManager({ form, saving, onChange, onReset, onSubmit }) {
  function updateAboutField(field, value) {
    onChange({
      ...form,
      about: {
        ...form.about,
        [field]: value,
      },
    })
  }

  function updateAboutValues(updater) {
    onChange({
      ...form,
      about: {
        ...form.about,
        values: updater(form.about.values),
      },
    })
  }

  function updateList(key, updater) {
    onChange({
      ...form,
      [key]: updater(form[key]),
    })
  }

  return (
    <form onSubmit={onSubmit} className="space-y-8">
      <div className="panel flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <span className="eyebrow">Content Studio</span>
          <h1 className="mt-4 font-display text-4xl font-bold text-slate-900">
            Manage public website copy
          </h1>
          <p className="mt-3 max-w-2xl text-slate-600">
            These sections are seeded from the client document and control the
            public-facing marketing content shown on the homepage.
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
            {saving ? 'Saving content...' : 'Save content'}
          </button>
        </div>
      </div>

      <EditorCard
        title="About and company story"
        description="Edit the company story, brand meaning, mission, service area, and leadership profiles shown on the website."
      >
        <div className="grid gap-4 md:grid-cols-2">
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-600">
              About headline
            </label>
            <input
              className="input-field"
              value={form.about.headline}
              onChange={(event) => updateAboutField('headline', event.target.value)}
              placeholder="Trusted civil engineering and construction partners"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Company story
            </label>
            <textarea
              className="textarea-field"
              value={form.about.story}
              onChange={(event) => updateAboutField('story', event.target.value)}
              placeholder="Company introduction"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Brand meaning
            </label>
            <textarea
              className="textarea-field"
              value={form.about.brand_meaning}
              onChange={(event) =>
                updateAboutField('brand_meaning', event.target.value)
              }
              placeholder="Brand meaning"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Founder name
            </label>
            <input
              className="input-field"
              value={form.about.founder_name}
              onChange={(event) =>
                updateAboutField('founder_name', event.target.value)
              }
              placeholder="Er. Taran D V"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Founder role
            </label>
            <input
              className="input-field"
              value={form.about.founder_role}
              onChange={(event) =>
                updateAboutField('founder_role', event.target.value)
              }
              placeholder="Founder | Main Civil Engineer"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Founder summary
            </label>
            <textarea
              className="textarea-field"
              value={form.about.founder_summary}
              onChange={(event) =>
                updateAboutField('founder_summary', event.target.value)
              }
              placeholder="Founder profile summary"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Partner and lead name
            </label>
            <input
              className="input-field"
              value={form.about.partner_lead_name}
              onChange={(event) =>
                updateAboutField('partner_lead_name', event.target.value)
              }
              placeholder="Er. Sampath Kumar A"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Partner and lead role
            </label>
            <input
              className="input-field"
              value={form.about.partner_lead_role}
              onChange={(event) =>
                updateAboutField('partner_lead_role', event.target.value)
              }
              placeholder="Partner | Technical Execution and Project Management Lead"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Partner and lead summary
            </label>
            <textarea
              className="textarea-field"
              value={form.about.partner_lead_summary}
              onChange={(event) =>
                updateAboutField('partner_lead_summary', event.target.value)
              }
              placeholder="Partner and lead profile summary"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Mission
            </label>
            <textarea
              className="textarea-field"
              value={form.about.mission}
              onChange={(event) => updateAboutField('mission', event.target.value)}
              placeholder="Mission statement"
            />
          </div>
          <div className="md:col-span-2">
            <label className="mb-2 block text-sm font-medium text-slate-600">
              Service area
            </label>
            <textarea
              className="textarea-field"
              value={form.about.service_area}
              onChange={(event) =>
                updateAboutField('service_area', event.target.value)
              }
              placeholder="Service area"
            />
          </div>
        </div>
      </EditorCard>

      <TextListEditor
        title="About values"
        description="These values appear as compact trust signals in the About section."
        items={form.about.values}
        onAdd={() => updateAboutValues((items) => [...items, ''])}
        onChange={(index, value) =>
          updateAboutValues((items) =>
            items.map((item, itemIndex) => (itemIndex === index ? value : item)),
          )
        }
        onRemove={(index) =>
          updateAboutValues((items) => items.filter((_, itemIndex) => itemIndex !== index))
        }
        placeholder="Transparency"
      />

      <TextListEditor
        title="Hero feature bullets"
        description="Short supporting lines that appear under the hero heading."
        items={form.hero_features}
        onAdd={() => updateList('hero_features', (items) => [...items, ''])}
        onChange={(index, value) =>
          updateList('hero_features', (items) =>
            items.map((item, itemIndex) => (itemIndex === index ? value : item)),
          )
        }
        onRemove={(index) =>
          updateList('hero_features', (items) =>
            items.filter((_, itemIndex) => itemIndex !== index),
          )
        }
        placeholder="Trusted civil engineering support from design to handover"
      />

      <StructuredListEditor
        title="Hero stats"
        description="Use either a numeric value and suffix or fill value text for text-only stats."
        items={form.hero_stats}
        fields={[
          {
            key: 'label',
            label: 'Label',
            placeholder: 'Established',
          },
          {
            key: 'value',
            label: 'Numeric value',
            type: 'number',
            placeholder: '8',
          },
          {
            key: 'suffix',
            label: 'Suffix',
            placeholder: '+',
          },
          {
            key: 'valueText',
            label: 'Value text',
            placeholder: 'Since 2014',
            helpText: 'If value text is filled, it will be shown instead of the numeric value.',
          },
        ]}
        onAdd={() =>
          updateList('hero_stats', (items) => [
            ...items,
            { label: '', value: '', suffix: '', valueText: '' },
          ])
        }
        onChange={(index, field, value) =>
          updateList('hero_stats', (items) =>
            items.map((item, itemIndex) =>
              itemIndex === index ? { ...item, [field]: value } : item,
            ),
          )
        }
        onRemove={(index) =>
          updateList('hero_stats', (items) =>
            items.filter((_, itemIndex) => itemIndex !== index),
          )
        }
        addLabel="Add stat"
      />

      <StructuredListEditor
        title="Services"
        description="Public service cards shown on the homepage."
        items={form.services}
        fields={[
          { key: 'title', label: 'Title', placeholder: 'Residential House Construction' },
          {
            key: 'description',
            label: 'Description',
            type: 'textarea',
            fullWidth: true,
            placeholder: 'Service description',
          },
        ]}
        onAdd={() =>
          updateList('services', (items) => [...items, { title: '', description: '' }])
        }
        onChange={(index, field, value) =>
          updateList('services', (items) =>
            items.map((item, itemIndex) =>
              itemIndex === index ? { ...item, [field]: value } : item,
            ),
          )
        }
        onRemove={(index) =>
          updateList('services', (items) =>
            items.filter((_, itemIndex) => itemIndex !== index),
          )
        }
        addLabel="Add service"
      />

      <StructuredListEditor
        title="Why choose us"
        description="Trust and credibility points shown in the Why Choose Us section."
        items={form.why_choose_us}
        fields={[
          { key: 'title', label: 'Title', placeholder: 'Licensed engineering leadership' },
          {
            key: 'description',
            label: 'Description',
            type: 'textarea',
            fullWidth: true,
            placeholder: 'Reason description',
          },
        ]}
        onAdd={() =>
          updateList('why_choose_us', (items) => [
            ...items,
            { title: '', description: '' },
          ])
        }
        onChange={(index, field, value) =>
          updateList('why_choose_us', (items) =>
            items.map((item, itemIndex) =>
              itemIndex === index ? { ...item, [field]: value } : item,
            ),
          )
        }
        onRemove={(index) =>
          updateList('why_choose_us', (items) =>
            items.filter((_, itemIndex) => itemIndex !== index),
          )
        }
        addLabel="Add point"
      />

      <StructuredListEditor
        title="Process steps"
        description="These steps power the visual process section and its progress indicator."
        items={form.process_steps}
        fields={[
          { key: 'title', label: 'Title', placeholder: 'Consultation & Project Brief' },
          {
            key: 'percent',
            label: 'Progress percent',
            type: 'number',
            placeholder: '25',
          },
          {
            key: 'description',
            label: 'Description',
            type: 'textarea',
            fullWidth: true,
            placeholder: 'Process step description',
          },
        ]}
        onAdd={() =>
          updateList('process_steps', (items) => [
            ...items,
            { title: '', description: '', percent: 0 },
          ])
        }
        onChange={(index, field, value) =>
          updateList('process_steps', (items) =>
            items.map((item, itemIndex) =>
              itemIndex === index ? { ...item, [field]: value } : item,
            ),
          )
        }
        onRemove={(index) =>
          updateList('process_steps', (items) =>
            items.filter((_, itemIndex) => itemIndex !== index),
          )
        }
        addLabel="Add process step"
      />

      <StructuredListEditor
        title="FAQ"
        description="Frequently asked questions shown near the contact section."
        items={form.faq}
        fields={[
          { key: 'question', label: 'Question', placeholder: 'Do you handle both residential and commercial projects?' },
          {
            key: 'answer',
            label: 'Answer',
            type: 'textarea',
            fullWidth: true,
            placeholder: 'Answer',
          },
        ]}
        onAdd={() =>
          updateList('faq', (items) => [...items, { question: '', answer: '' }])
        }
        onChange={(index, field, value) =>
          updateList('faq', (items) =>
            items.map((item, itemIndex) =>
              itemIndex === index ? { ...item, [field]: value } : item,
            ),
          )
        }
        onRemove={(index) =>
          updateList('faq', (items) =>
            items.filter((_, itemIndex) => itemIndex !== index),
          )
        }
        addLabel="Add question"
      />
    </form>
  )
}

export default ContentManager
