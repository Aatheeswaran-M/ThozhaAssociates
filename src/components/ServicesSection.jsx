import { motion } from 'framer-motion'
import { Building2, ClipboardList, Ruler, Wrench } from 'lucide-react'

import { truncateWords } from '@/utils/helpers'

const serviceGroups = [
  {
    key: 'construction',
    title: 'Construction',
    summary: 'Residential and commercial build execution from planning to handover.',
    matcher: /residential|commercial/i,
    icon: Building2,
  },
  {
    key: 'technical',
    title: 'Technical',
    summary: 'Structural drawings, approvals, and foundation planning support.',
    matcher: /structural|drawing|approval|soil|foundation/i,
    icon: Ruler,
  },
  {
    key: 'delivery',
    title: 'Site Delivery',
    summary: 'Supervision, coordination, and on-site quality control workflows.',
    matcher: /project management|site supervision/i,
    icon: ClipboardList,
  },
  {
    key: 'upgrades',
    title: 'Upgrades',
    summary: 'Renovation, remodeling, and interior civil finishing improvements.',
    matcher: /renovation|remodelling|remodeling|interior/i,
    icon: Wrench,
  },
]

function createDetail(group) {
  if (!group.items.length) {
    return truncateWords(group.summary, 18)
  }

  const listed = group.items.slice(0, 3).map((item) => item.title).join(', ')

  return truncateWords(`${group.summary} Includes ${listed}.`, 20)
}

function ServicesSection({ services = [] }) {
  const normalizedServices = Array.isArray(services) ? services : []

  const grouped = serviceGroups.map((group) => ({
    ...group,
    items: normalizedServices.filter((service) =>
      group.matcher.test(service?.title || ''),
    ),
  }))

  const activeGroups = grouped.filter((group) => group.items.length)
  const highlights = (activeGroups.length ? activeGroups : grouped).slice(0, 3)

  return (
    <section id="services" className="scroll-mt-28 section-space bg-white">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Services
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold uppercase tracking-[0.04em] text-slate-900 sm:text-4xl">
            What We Offer
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            Practical service lanes designed for predictable construction outcomes and transparent delivery.
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
                src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=900&auto=format&fit=crop"
                alt="Construction site planning"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="overflow-hidden rounded-sm border border-slate-200 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1523413651479-597eb2da0ad6?q=80&w=900&auto=format&fit=crop"
                alt="Architectural technical review"
                className="h-full w-full object-cover"
              />
            </div>

            <div className="overflow-hidden rounded-sm border border-slate-200 bg-slate-100">
              <img
                src="https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?q=80&w=900&auto=format&fit=crop"
                alt="Construction detail and finishing"
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
                <article key={item.key} className="flex items-start gap-4">
                  <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-accent/30 bg-accent/10 text-accent">
                    <Icon size={18} />
                  </span>

                  <div>
                    <h3 className="text-2xl font-semibold uppercase tracking-[0.03em] text-slate-900">
                      {item.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-base leading-8 text-slate-600">
                      {createDetail(item)}
                    </p>
                  </div>
                </article>
              )
            })}

            {normalizedServices.length ? (
              <div className="pt-1">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  All Services
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {normalizedServices.slice(0, 8).map((service) => (
                    <span
                      key={service.title}
                      className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-sm text-accent"
                    >
                      {service.title}
                    </span>
                  ))}
                </div>
              </div>
            ) : null}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default ServicesSection
