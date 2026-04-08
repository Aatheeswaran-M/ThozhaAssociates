import { motion } from 'framer-motion'

import BeforeAfterSlider from '@/components/BeforeAfterSlider'
import SectionHeader from '@/components/SectionHeader'

function BeforeAfterShowcaseSection({ company, projects }) {
  const dashboardTransformation =
    company.featured_before_image_url && company.featured_after_image_url
      ? {
          id: 'dashboard-before-after',
          title:
            company.featured_before_after_title ||
            `${company.name} before and after`,
          beforeImage: {
            src: company.featured_before_image_url,
            alt: `${company.name} before`,
          },
          afterImage: {
            src: company.featured_after_image_url,
            alt: `${company.name} after`,
          },
        }
      : null

  const projectTransformation = projects.find(
    (project) => project.beforeImage && project.afterImage,
  )

  const featuredTransformation = dashboardTransformation || projectTransformation

  if (!featuredTransformation) {
    return null
  }

  return (
    <section className="section-space">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Before / After"
          title="See how engineering decisions translate into visible change"
          description="This comparison block helps prospective clients understand the difference between an unfinished condition and the finished construction outcome."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
        >
          <BeforeAfterSlider
            before={featuredTransformation.beforeImage}
            after={featuredTransformation.afterImage}
            title={
              featuredTransformation.id === 'dashboard-before-after'
                ? featuredTransformation.title
                : `${featuredTransformation.title} transformation`
            }
          />
        </motion.div>
      </div>
    </section>
  )
}

export default BeforeAfterShowcaseSection
