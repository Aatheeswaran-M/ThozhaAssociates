import { motion } from 'framer-motion'
import { Clock3, Gem, ThumbsUp } from 'lucide-react'

import { truncateWords } from '@/utils/helpers'

function AboutSection({ about }) {
  const values = Array.isArray(about?.values) ? about.values.filter(Boolean) : []
  const cityCoverageLabel = '10+ cities'

  const intro = truncateWords(
    about?.story ||
      'We combine planning discipline and field execution to deliver reliable construction outcomes.',
    24,
  )

  const qualitySource = values.length
    ? values.slice(0, 3).join(', ')
    : about?.service_area

  const highlights = [
    {
      title: 'Reliability',
      icon: ThumbsUp,
      detail: truncateWords(
        about?.brand_meaning ||
          'We choose smart, experienced, and accountable professionals for every project stage.',
        18,
      ),
    },
    {
      title: 'Expertise',
      icon: Clock3,
      detail: truncateWords(
        about?.mission ||
          `Technical planning and project execution across ${cityCoverageLabel}.`,
        18,
      ),
    },
    {
      title: 'Quality',
      icon: Gem,
      detail: truncateWords(
        qualitySource ||
          'Quality checks and durable finishing standards are maintained through every milestone.',
        18,
      ),
    },
  ]

  return (
    <section id="about" className="scroll-mt-28 section-space bg-white">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            About Us
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold uppercase tracking-[0.04em] text-slate-900 sm:text-4xl">
            Why Choose Us
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            {intro}
          </p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-3 sm:gap-4"
          >
            <div className="row-span-2 overflow-hidden rounded-sm border border-slate-200 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1483366774565-c783b9f70e2c?q=80&w=900&auto=format&fit=crop"
                alt="Modern architecture"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="overflow-hidden rounded-sm border border-slate-200 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=900&auto=format&fit=crop"
                alt="Architectural planning"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="overflow-hidden rounded-sm border border-slate-200 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1464146072230-91cabc968266?q=80&w=900&auto=format&fit=crop"
                alt="Building facade detail"
                className="h-full w-full object-cover"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="space-y-8"
          >
            {highlights.map((item) => {
              const Icon = item.icon

              return (
                <article key={item.title} className="flex items-start gap-4">
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                    <Icon size={18} />
                  </span>

                  <div>
                    <h3 className="text-2xl font-semibold uppercase tracking-[0.03em] text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-base leading-8 text-slate-600">
                      {item.detail}
                    </p>
                  </div>
                </article>
              )
            })}

            <div className="pt-1">
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                Service Coverage
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm text-accent">
                  {cityCoverageLabel}
                </span>
                <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm text-accent">
                  Tamil Nadu Region
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
