import { motion } from 'framer-motion'
import {
  ArrowRight,
  BriefcaseBusiness,
  CalendarClock,
  Link2,
  MapPin,
} from 'lucide-react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'

const fallbackOpenRoles = [
  {
    title: 'Site Engineer',
    type: 'Full Time',
    location: 'Tamil Nadu',
  },
  {
    title: 'Junior Structural Designer',
    type: 'Full Time',
    location: 'Tamil Nadu',
  },
  {
    title: 'Project Coordinator',
    type: 'Full Time',
    location: 'Tamil Nadu',
  },
]

const socialIconMap = {
  linkedin: FaLinkedinIn,
  instagram: FaInstagram,
  facebook: FaFacebookF,
  whatsapp: FaWhatsapp,
}

function CareersSection({ company, careers = [], socialLinks = [] }) {
  const normalizedCareers = Array.isArray(careers)
    ? careers.filter((item) => item?.title)
    : []
  const roles = normalizedCareers.length ? normalizedCareers : fallbackOpenRoles

  const whatsappNumber = company?.whatsapp?.replace(/\D/g, '') || ''

  const fallbackSocialLinks = [
    {
      label: 'LinkedIn',
      href: company?.linkedin_url || 'https://www.linkedin.com',
    },
    {
      label: 'Instagram',
      href: company?.instagram_url || 'https://www.instagram.com',
    },
    {
      label: 'Facebook',
      href: company?.facebook_url || 'https://www.facebook.com',
    },
    {
      label: 'WhatsApp',
      href: whatsappNumber ? `https://wa.me/${whatsappNumber}` : '',
    },
  ].filter((item) => item.href)

  const normalizedSocialLinks = Array.isArray(socialLinks)
    ? socialLinks.filter((item) => item?.label && (item?.url || item?.href))
    : []

  const finalLinks = (normalizedSocialLinks.length
    ? normalizedSocialLinks
    : fallbackSocialLinks
  )
    .map((item) => {
      const key = String(item.label || '')
        .toLowerCase()
        .replace(/\s+/g, '')

      return {
        label: item.label,
        href: item.url || item.href,
        icon: socialIconMap[key] || Link2,
      }
    })
    .filter((item) => item.href)

  const careerStats = [
    {
      label: 'Open Roles',
      value: String(roles.length).padStart(2, '0'),
      icon: BriefcaseBusiness,
    },
    { label: 'Hiring Cycle', value: 'Monthly', icon: CalendarClock },
    { label: 'Work Mode', value: 'On-site + Hybrid', icon: MapPin },
  ]

  const resumeMail = `mailto:${company?.email || 'hello@thozhaassociates.com'}?subject=Career%20Application`

  return (
    <section id="careers" className="scroll-mt-28 section-space bg-slate-50/70">
      <div className="section-shell">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-accent">
            Careers
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold uppercase tracking-[0.04em] text-slate-900 sm:text-4xl">
            Join Our Team
          </h2>
          <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-600">
            We are building a practical engineering team focused on quality execution, accountability, and long-term growth.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6 }}
            className="rounded-2xl border border-accent/20 bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.07)]"
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent">
                Careers Dashboard
              </p>
              <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 text-xs text-accent">
                Hiring Active
              </span>
            </div>

            <div className="mt-5 grid gap-3">
              {careerStats.map((item) => {
                const Icon = item.icon

                return (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50/70 px-4 py-3"
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-full border border-accent/25 bg-accent/10 text-accent">
                        <Icon size={16} />
                      </span>
                      <p className="text-sm font-medium text-slate-700">{item.label}</p>
                    </div>
                    <p className="font-display text-lg font-semibold text-slate-900">{item.value}</p>
                  </div>
                )
              })}
            </div>

            <a
              href={resumeMail}
              className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full border border-accent bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accentDark"
            >
              Send Your Resume
              <ArrowRight size={16} />
            </a>
          </motion.article>

          <motion.article
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, delay: 0.08 }}
            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-[0_14px_30px_rgba(15,23,42,0.07)]"
          >
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
              Current Openings
            </p>

            <div className="mt-4 space-y-3">
              {roles.map((role) => (
                <div
                  key={`${role.title}-${role.location || ''}`}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-3"
                >
                  <p className="text-lg font-semibold text-slate-900">{role.title}</p>
                  <p className="mt-1 text-sm text-slate-600">
                    {role.type} | {role.location}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 border-t border-slate-200 pt-5">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                Social Media
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {finalLinks.map((item) => {
                  const Icon = item.icon

                  return (
                    <a
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/10 px-3 py-1.5 text-sm text-accent transition hover:bg-accent hover:text-white"
                    >
                      <Icon size={14} />
                      {item.label}
                    </a>
                  )
                })}
              </div>
            </div>
          </motion.article>
        </div>
      </div>
    </section>
  )
}

export default CareersSection
