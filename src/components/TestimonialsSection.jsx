import { AnimatePresence, motion } from 'framer-motion'
import { Quote, Star } from 'lucide-react'
import { useEffect, useState } from 'react'

import SectionHeader from '@/components/SectionHeader'

function TestimonialAvatar({ imageUrl, name }) {
  const [broken, setBroken] = useState(false)

  const initials = name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')

  if (!imageUrl || broken) {
    return (
      <div className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-accent/15 font-display text-lg font-semibold text-accent">
        {initials}
      </div>
    )
  }

  return (
    <img
      src={imageUrl}
      alt={name}
      className="h-14 w-14 shrink-0 rounded-full border border-slate-200 object-cover"
      loading="lazy"
      referrerPolicy="no-referrer"
      onError={() => setBroken(true)}
    />
  )
}

function TestimonialsSection({ testimonials }) {
  const [activeIndex, setActiveIndex] = useState(0)

  useEffect(() => {
    if (testimonials.length <= 1) {
      return undefined
    }

    const timer = window.setInterval(() => {
      setActiveIndex((value) => (value + 1) % testimonials.length)
    }, 5200)

    return () => {
      window.clearInterval(timer)
    }
  }, [testimonials.length])

  const activeTestimonial = testimonials[activeIndex]

  return (
    <section id="testimonials" className="scroll-mt-28 section-space">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Testimonials"
          title="What clients say about the way we plan, communicate, and deliver"
          description="Testimonials come from Supabase when configured and fall back to seeded client-friendly examples during local setup."
        />

        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr]">
          <div className="panel relative overflow-hidden p-8 sm:p-10">
            <Quote className="mb-6 text-accent" size={42} />

            <AnimatePresence mode="wait">
              <motion.article
                key={activeTestimonial.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.45 }}
                className="space-y-6"
              >
                <div className="flex gap-1 text-accent">
                  {Array.from({ length: activeTestimonial.rating || 5 }).map(
                    (_, index) => (
                      <Star key={index} size={18} fill="currentColor" />
                    ),
                  )}
                </div>
                <p className="max-w-3xl text-2xl leading-relaxed text-slate-900 sm:text-3xl">
                  "{activeTestimonial.message}"
                </p>
                <div className="flex items-center gap-4">
                  <TestimonialAvatar
                    imageUrl={activeTestimonial.image_url}
                    name={activeTestimonial.name}
                  />
                  <div>
                    <p className="text-lg font-semibold text-slate-900">
                      {activeTestimonial.name}
                    </p>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                      {activeTestimonial.project_type || 'Verified client feedback'}
                    </p>
                  </div>
                </div>
              </motion.article>
            </AnimatePresence>
          </div>

          <div className="space-y-4">
            {testimonials.map((testimonial, index) => (
              <button
                key={testimonial.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`panel w-full p-5 text-left transition ${
                  activeIndex === index
                    ? 'border-accent/55 bg-accent/10'
                    : 'hover:border-slate-400'
                }`}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <TestimonialAvatar
                      imageUrl={testimonial.image_url}
                      name={testimonial.name}
                    />
                    <div>
                      <p className="font-display text-xl font-semibold text-slate-900">
                        {testimonial.name}
                      </p>
                      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-slate-500">
                        {testimonial.project_type || 'Verified client feedback'}
                      </p>
                      <p className="mt-2 line-clamp-2 text-sm text-slate-600">
                        {testimonial.message}
                      </p>
                    </div>
                  </div>
                  <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-800">
                    {testimonial.rating}/5
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TestimonialsSection
