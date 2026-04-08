import AboutSection from '@/components/AboutSection'
import BeforeAfterShowcaseSection from '@/components/BeforeAfterShowcaseSection'
import CareersSection from '@/components/CareersSection'
import FloatingActions from '@/components/FloatingActions'
import HeroSection from '@/components/HeroSection'
import LeadFormSection from '@/components/LeadFormSection'
import LeadershipSection from '@/components/LeadershipSection'
import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import ProjectsSection from '@/components/ProjectsSection'
import ServicesSection from '@/components/ServicesSection'
import { useEffect } from 'react'
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaWhatsapp } from 'react-icons/fa'
import { useHomeData } from '@/hooks/useHomeData'
import { buildProjectHeight, formatPhoneHref } from '@/utils/helpers'

function HomePage() {
  const {
    loading,
    buildStages,
    cmsProjects,
    company,
    siteContent,
    warnings,
  } = useHomeData()

  const managedProjects = cmsProjects.map((project, index) => ({
    id: project.id,
    title: project.title,
    category: project.category,
    location: project.location,
    areaLabel: project.area_label,
    year: project.year,
    status: project.status,
    summary: project.summary,
    image: {
      src: project.cover_image_url,
      alt: project.title,
      sourceUrl: project.cover_image_url,
    },
    beforeImage: project.before_image_url
      ? {
          src: project.before_image_url,
          alt: `${project.title} before`,
        }
      : null,
    afterImage: project.after_image_url
      ? {
          src: project.after_image_url,
          alt: `${project.title} after`,
        }
      : null,
    aspect: buildProjectHeight(index),
    source: 'Client project library',
  }))

  const liveHeroBlueprint = buildStages[0]?.image
  const liveHeroFinal = buildStages.at(-1)?.image || buildStages[0]?.image
  const heroBlueprint = company.hero_blueprint_url
    ? {
        src: company.hero_blueprint_url,
        alt: `${company.name} blueprint`,
        sourceUrl: company.hero_blueprint_url,
      }
    : liveHeroBlueprint
  const heroFinal = company.hero_final_url
    ? {
        src: company.hero_final_url,
        alt: `${company.name} completed project`,
        sourceUrl: company.hero_final_url,
      }
    : liveHeroFinal
  const brandInitials = (company.name || 'TA')
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const socialLinks = Array.isArray(siteContent?.social_links)
    ? siteContent.social_links
    : []

  const getSocialUrl = (keyword, fallbackUrl) => {
    const matched = socialLinks.find((item) =>
      String(item?.label || '')
        .toLowerCase()
        .includes(keyword),
    )

    return matched?.url?.trim() || fallbackUrl
  }

  const whatsappNumber = company.whatsapp?.replace(/\D/g, '') || ''

  const footerSocialLinks = [
    {
      label: 'Instagram',
      href: getSocialUrl('instagram', 'https://www.instagram.com'),
      icon: FaInstagram,
    },
    {
      label: 'WhatsApp',
      href: whatsappNumber ? `https://wa.me/${whatsappNumber}` : '',
      icon: FaWhatsapp,
    },
    {
      label: 'Facebook',
      href: getSocialUrl('facebook', 'https://www.facebook.com'),
      icon: FaFacebookF,
    },
    {
      label: 'LinkedIn',
      href: getSocialUrl('linkedin', 'https://www.linkedin.com'),
      icon: FaLinkedinIn,
    },
  ].filter((item) => item.href)

  useEffect(() => {
    const brandName = company?.name || 'Thozha Associates'
    document.title = `${brandName} | Building Your Dreams in Pollachi`

    const iconHref = company?.logo_url || '/favicon.svg'
    const iconRels = ['icon', 'shortcut icon', 'apple-touch-icon']

    iconRels.forEach((relValue) => {
      let link = document.querySelector(`link[rel="${relValue}"]`)

      if (!link) {
        link = document.createElement('link')
        link.setAttribute('rel', relValue)
        document.head.appendChild(link)
      }

      link.setAttribute('href', iconHref)
    })
  }, [company?.logo_url, company?.name])

  return (
    <div className="relative overflow-x-hidden">
      <Loader active={loading} />
      <Navbar company={company} />

      <main>
        <HeroSection
          blueprintImage={heroBlueprint}
          finalImage={heroFinal}
          company={company}
          features={siteContent.hero_features}
        />
        <AboutSection about={siteContent.about} />
        <BeforeAfterShowcaseSection company={company} projects={managedProjects} />
        <ServicesSection services={siteContent.services} />
        <ProjectsSection projects={managedProjects} />
        <CareersSection
          company={company}
          careers={siteContent.careers}
          socialLinks={siteContent.social_links}
        />
        <LeadFormSection company={company} />
        <LeadershipSection about={siteContent.about} />
      </main>

      <FloatingActions company={company} />

      <footer className="border-t border-slate-200 bg-white py-10">
        <div className="section-shell">
          <div className="rounded-3xl border border-slate-200 bg-white px-5 py-6 shadow-[0_16px_34px_rgba(15,23,42,0.06)] sm:px-7 sm:py-8">
            <div className="grid gap-8 lg:grid-cols-[1.25fr_0.8fr_0.95fr]">
              <div>
                <div className="flex items-center gap-4">
                  {company.logo_url ? (
                    <img
                      src={company.logo_url}
                      alt={`${company.name} logo`}
                      className="h-16 w-16 rounded-[1.2rem] object-cover"
                    />
                  ) : (
                    <div className="grid h-16 w-16 place-items-center rounded-[1.2rem] bg-accent/15 font-display text-xl font-semibold text-accent">
                      {brandInitials}
                    </div>
                  )}
                  <div>
                    <p className="font-display text-2xl font-semibold text-slate-900">
                      {company.name}
                    </p>
                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                      Civil Engineering and Construction
                    </p>
                  </div>
                </div>

                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                  {company.name} designs, builds, and renovates spaces with a cinematic
                  approach to{' '}
                  <a
                    href="/admin"
                    className="text-slate-600 no-underline hover:text-slate-600"
                    aria-label="Admin"
                  >
                    admin
                  </a>{' '}
                  planning, execution, and handover.
                </p>
              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Contact
                </p>
                <div className="mt-4 space-y-3 text-sm text-slate-700">
                  <a href={formatPhoneHref(company.phone || '')} className="block hover:text-accent">
                    {company.phone}
                  </a>
                  <a href={`mailto:${company.email || ''}`} className="block break-all hover:text-accent">
                    {company.email}
                  </a>
                  <p>{company.location}</p>
                </div>

              </div>

              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-slate-500">
                  Social Links
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {footerSocialLinks.map((item) => {
                    const Icon = item.icon

                    return (
                      <a
                        key={item.label}
                        href={item.href}
                        target="_blank"
                        rel="noreferrer"
                        title={item.label}
                        aria-label={item.label}
                        className="grid h-10 w-10 place-items-center rounded-full border border-accent/20 bg-accent/10 text-accent transition hover:bg-accent hover:text-white"
                      >
                        <Icon size={15} />
                      </a>
                    )
                  })}
                </div>
              </div>
            </div>

            <div className="mt-7 border-t border-slate-200 pt-4 text-xs uppercase tracking-[0.16em] text-slate-500">
              © {new Date().getFullYear()} {company.name}. All rights reserved.
            </div>
          </div>
        </div>

        {warnings.length ? (
          <div className="section-shell mt-6">
            <div className="rounded-2xl border border-accent/25 bg-accent/10 px-4 py-3 text-sm text-accent">
              {warnings.join(' ')}
            </div>
          </div>
        ) : null}
      </footer>
    </div>
  )
}

export default HomePage
