import { AnimatePresence, motion } from 'framer-motion'
import { ExternalLink, X } from 'lucide-react'

import BeforeAfterSlider from '@/components/BeforeAfterSlider'

function ImageModal({ project, onClose }) {
  const detailCards = [
    {
      label: 'Location',
      value: project?.location,
    },
    {
      label: 'Status',
      value: project?.status,
    },
    {
      label: 'Built-up area',
      value: project?.areaLabel,
    },
    {
      label: 'Year',
      value: project?.year,
    },
  ].filter((detail) => detail.value)

  return (
    <AnimatePresence>
      {project ? (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/78 px-4 py-10 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="panel custom-scrollbar relative max-h-[92vh] w-full max-w-5xl overflow-y-auto"
            initial={{ opacity: 0, y: 32, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            transition={{ duration: 0.35 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-5 top-5 z-10 grid h-11 w-11 place-items-center rounded-full border border-slate-200 bg-white/88 text-slate-900"
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <div className="min-h-[360px] overflow-hidden rounded-[2rem] lg:rounded-r-none">
                <img
                  src={project.image?.src}
                  alt={project.image?.alt || project.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="space-y-6 p-6 lg:p-8">
                <div className="space-y-3">
                  <span className="eyebrow">{project.category}</span>
                  <h3 className="font-display text-3xl font-bold text-slate-900">
                    {project.title}
                  </h3>
                  <p className="text-base text-slate-600">{project.summary}</p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {detailCards.map((detail) => (
                    <div
                      key={detail.label}
                      className="rounded-3xl border border-slate-200 bg-white/88 p-4"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                        {detail.label}
                      </p>
                      <p className="mt-2 text-lg font-semibold text-slate-900">
                        {detail.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="rounded-3xl border border-slate-200 bg-white/88 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Image Source
                  </p>
                  <div className="mt-3 flex items-center justify-between gap-4">
                    <p className="text-sm text-slate-600">{project.source}</p>
                    {project.image?.sourceUrl && project.image.sourceUrl !== '#' ? (
                      <a
                        href={project.image.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="badge-pill"
                      >
                        Source
                        <ExternalLink size={14} />
                      </a>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>

            {project.beforeImage && project.afterImage ? (
              <div className="p-6 pt-0 lg:p-8 lg:pt-0">
                <BeforeAfterSlider
                  before={project.beforeImage}
                  after={project.afterImage}
                  title={`${project.title} transformation`}
                />
              </div>
            ) : null}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default ImageModal
