import { motion } from 'framer-motion'

import SectionHeader from './SectionHeader'
import { truncateWords } from '../utils/helpers'

function LeadershipSection({ about }) {
  const profiles = [
    {
      tag: 'Founder and Lead',
      name: about?.founder_name || 'Er. Taran D V',
      role: about?.founder_role || 'Founder and Lead | Main Civil Engineer',
      summary: truncateWords(
        about?.founder_summary ||
          'Leads overall design direction, structural decisions, and quality benchmarks across projects.',
        20,
      ),
      isPrimary: true,
    },
    {
      tag: 'Partner Engineer',
      name:
        about?.partner_lead_name ||
        about?.lead_engineer_name ||
        'Er. Sampath Kumar A',
      role:
        about?.partner_lead_role ||
        about?.lead_engineer_role ||
        'Partner | Technical Execution and Project Management Lead',
      summary: truncateWords(
        about?.partner_lead_summary ||
          about?.lead_engineer_summary ||
          'Drives technical execution, AutoCAD reviews, and project coordination with clients and site teams.',
        20,
      ),
      isPrimary: false,
    },
  ]

  return (
    <section id="leadership" className="section-space pb-16 lg:pb-20">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Leadership"
          title="Engineering Leadership"
          description="Founder-led technical leadership with focused execution quality from planning to handover."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mx-auto mt-7 grid max-w-5xl gap-4 md:grid-cols-2"
        >
          {profiles.map((profile) => (
            <article
              key={`${profile.tag}-${profile.name}`}
              className={`rounded-xl border p-5 shadow-[0_10px_24px_rgba(15,23,42,0.07)] ${
                profile.isPrimary
                  ? 'border-accent/35 bg-accent/5'
                  : 'border-slate-200 bg-white'
              }`}
            >
              <p className="text-[11px] uppercase tracking-[0.2em] text-slate-500">
                {profile.tag}
              </p>
              <h3 className="mt-2 font-display text-[1.55rem] font-semibold leading-tight text-slate-900">
                {profile.name}
              </h3>
              <p className="mt-1 text-[13px] text-slate-600">{profile.role}</p>
              <p className="mt-3 text-sm leading-6 text-slate-700">
                {profile.summary}
              </p>
            </article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default LeadershipSection
