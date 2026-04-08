import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

import { createScrollBuildTimeline } from '@/animations/scrollBuildTimeline'
import SectionHeader from '@/components/SectionHeader'
import { cn } from '@/utils/helpers'

function ScrollBuildSection({ stages }) {
  const sectionRef = useRef(null)
  const stageRefs = useRef([])
  const [activeStage, setActiveStage] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    return createScrollBuildTimeline({
      section: sectionRef.current,
      stages: stageRefs.current,
      onProgress: (value) => setProgress(Math.round(value * 100)),
      onStageChange: setActiveStage,
    })
  }, [stages])

  return (
    <section id="process" className="scroll-mt-28 section-space">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Construction Process"
          title="A clear construction journey from first brief to final handover"
          description="This section turns the client process into a visual sequence so visitors can understand how planning, engineering, execution, and handover flow together."
        />

        <div ref={sectionRef} className="panel overflow-hidden">
          <div className="grid min-h-[78vh] gap-8 lg:grid-cols-[0.82fr_1.18fr]">
            <div className="flex flex-col justify-between gap-8 border-b border-slate-200 p-6 lg:border-b-0 lg:border-r lg:p-10">
              <div className="space-y-5">
                <div>
                  <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                    Progress
                  </p>
                  <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-mint via-accent to-accentDark transition-all duration-300"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <p className="mt-3 font-display text-4xl font-bold text-slate-900">
                    {progress}%
                  </p>
                </div>

                <div className="space-y-4">
                  {stages.map((stage, index) => (
                    <button
                      key={stage.key}
                      type="button"
                      className={cn(
                        'w-full rounded-[1.6rem] border p-4 text-left transition duration-300',
                        activeStage === index
                          ? 'border-accent/60 bg-accent/10 shadow-glow'
                          : 'border-slate-200 bg-white/80 hover:border-slate-400',
                      )}
                    >
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                            Stage {index + 1}
                          </p>
                          <h3 className="mt-1 font-display text-xl font-semibold text-slate-900">
                            {stage.title}
                          </h3>
                        </div>
                        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-800">
                          {stage.percent}%
                        </span>
                      </div>
                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {stage.description}
                      </p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="relative min-h-[520px] overflow-hidden p-6 lg:p-10">
              {stages.map((stage, index) => (
                <article
                  key={stage.key}
                  ref={(element) => {
                    stageRefs.current[index] = element
                  }}
                  className="absolute inset-6 overflow-hidden rounded-[2rem] border border-slate-200 bg-white/88 shadow-soft lg:inset-10"
                >
                  <img
                    src={stage.image?.src}
                    alt={stage.image?.alt || stage.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                    <motion.div
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      className="max-w-xl rounded-[1.8rem] border border-slate-200 bg-white/88 p-5 backdrop-blur"
                    >
                      <p className="text-xs uppercase tracking-[0.2em] text-mint">
                        {stage.title}
                      </p>
                      <p className="mt-3 text-base text-slate-700">
                        {stage.description}
                      </p>
                    </motion.div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ScrollBuildSection
