import { motion } from 'framer-motion'
import {
  BadgeCheck,
  ClipboardList,
  HardHat,
  MapPinned,
  ShieldCheck,
} from 'lucide-react'

import SectionHeader from '@/components/SectionHeader'
import { truncateWords } from '@/utils/helpers'

function getTrustIcon(title = '') {
  if (/licensed|engineer/i.test(title)) {
    return ShieldCheck
  }

  if (/local/i.test(title)) {
    return MapPinned
  }

  if (/supervision|transparent/i.test(title)) {
    return ClipboardList
  }

  if (/quality|timeline/i.test(title)) {
    return HardHat
  }

  return BadgeCheck
}

function createWheelGradient(size) {
  const colors = [
    'rgba(242, 169, 59, 0.92)',
    'rgba(101, 214, 176, 0.92)',
    'rgba(255, 255, 255, 0.82)',
    'rgba(119, 198, 255, 0.75)',
  ]
  const safeSize = Math.max(size, 1)
  const step = 100 / safeSize

  return `conic-gradient(${Array.from({ length: safeSize }, (_, index) => {
    const start = index * step
    const end = start + step

    return `${colors[index % colors.length]} ${start}% ${end}%`
  }).join(', ')})`
}

function WhyChooseUsSection({ items = [] }) {
  const trustHighlights = items.slice(0, 4).map((item) => ({
    ...item,
    icon: getTrustIcon(item?.title),
  }))

  return (
    <section id="why-choose-us" className="scroll-mt-28 section-space">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Why Choose Us"
          title="A clearer trust story with less text and stronger signals"
          description="This section now reads like a decision dashboard instead of a long paragraph wall."
        />

        <div className="grid gap-10 xl:grid-cols-2">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6 }}
            className="panel relative overflow-hidden p-8 sm:p-12"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(242,169,59,0.16),transparent_26%),radial-gradient(circle_at_bottom_right,rgba(101,214,176,0.12),transparent_28%)]" />
            <div className="relative">
              <div className="flex flex-wrap items-center justify-between gap-6">
                <span className="badge-pill border-accent/20 bg-accent/10 text-accent">
                  Trust Map
                </span>
                <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Built for faster client decisions
                </p>
              </div>

              <div className="mt-10 flex justify-center">
                <div
                  className="relative grid h-72 w-72 place-items-center rounded-full p-8 shadow-soft"
                  style={{ backgroundImage: createWheelGradient(trustHighlights.length) }}
                >
                  <div className="absolute inset-[24px] rounded-full bg-cover bg-center opacity-40 mix-blend-overlay" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1541888086225-ee5b5d848197?q=80&w=800&auto=format&fit=crop)' }} />
                  <div className="absolute inset-[24px] rounded-full bg-canvas/80 backdrop-blur-[8px]" />
                  <div className="absolute inset-[50px] rounded-full border border-slate-200" />

                  <div className="relative z-10 text-center">
                    <p className="text-xs uppercase tracking-[0.24em] text-slate-500">
                      Thozha Associates
                    </p>
                    <p className="mt-5 font-display text-4xl font-semibold text-slate-900">
                      Trusted
                    </p>
                    <p className="mt-4 text-sm leading-6 text-slate-600">
                      Engineer-led execution.
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-12 grid gap-6 sm:grid-cols-2">
                {trustHighlights.map((item) => {
                  const Icon = item.icon

                  return (
                    <div
                      key={item.title}
                      className="rounded-[2rem] border border-slate-200 bg-white/88 p-6"
                    >
                      <Icon className="text-mint" size={24} />
                      <p className="mt-5 font-display text-xl font-semibold text-slate-900">
                        {item.title}
                      </p>
                      <p className="mt-4 text-sm leading-8 text-slate-600">
                        {truncateWords(item.description, 8)}
                      </p>
                    </div>
                  )
                })}
              </div>
            </div>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="panel p-8 sm:p-12"
          >
            <div className="flex flex-wrap items-center justify-between gap-6">
              <span className="badge-pill border-mint/20 bg-mint/10 text-mint">
                Assurance Ladder
              </span>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                {items.length} reasons clients stay confident
              </p>
            </div>

            <div className="mt-10 space-y-8">
              {items.map((item, index) => {
                const Icon = getTrustIcon(item?.title)

                return (
                  <div
                    key={item.title}
                    className="relative rounded-[2rem] border border-slate-200 bg-white/88 p-6"
                  >
                    <div className="flex items-start gap-5">
                      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-[1.2rem] bg-slate-100 text-slate-900">
                        <span className="font-display text-xl font-semibold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-4">
                          <Icon className="text-accent" size={20} />
                          <h3 className="font-display text-2xl font-semibold text-slate-900">
                            {item.title}
                          </h3>
                        </div>

                        <p className="mt-4 text-[15px] leading-8 text-slate-600">
                          {truncateWords(item.description, 15)}
                        </p>

                        <div className="mt-4 flex gap-2">
                          <span className="h-2 w-10 rounded-full bg-accent" />
                          <span className="h-2 w-6 rounded-full bg-mint" />
                          <span className="h-2 w-3 rounded-full bg-white/800" />
                        </div>
                      </div>
                    </div>

                    {index < items.length - 1 ? (
                      <div className="absolute left-10 top-[calc(100%+4px)] hidden h-5 w-px bg-slate-100 sm:block" />
                    ) : null}
                  </div>
                )
              })}
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {[
                'Clear planning conversations',
                'Local execution awareness',
                'Dependable site follow-through',
              ].map((point) => (
                <div
                  key={point}
                  className="rounded-[1.6rem] border border-slate-200 bg-white/80 px-4 py-5 text-sm text-slate-700"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <BadgeCheck className="text-mint" size={16} />
                    <span className="text-xs uppercase tracking-[0.2em] text-slate-500">
                      Outcome
                    </span>
                  </div>
                  {point}
                </div>
              ))}
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

export default WhyChooseUsSection
