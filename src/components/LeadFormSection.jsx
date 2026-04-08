import { zodResolver } from '@hookform/resolvers/zod'
import { motion } from 'framer-motion'
import { Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import SectionHeader from '@/components/SectionHeader'
import { createLead } from '@/services/supabase'
import { LEAD_PROJECT_TYPES } from '@/utils/constants'

const quoteSchema = z.object({
  name: z.string().min(2, 'Please enter your name.'),
  phone: z.string().min(8, 'Please enter a valid phone number.'),
  email: z.string().email('Please enter a valid email address.'),
  project_type: z.string().min(1, 'Select a project type.'),
  message: z.string().min(16, 'Tell us a bit more about your project.'),
})

function LeadFormSection({ company }) {
  const [notice, setNotice] = useState({
    type: 'idle',
    message: '',
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(quoteSchema),
    defaultValues: {
      project_type: 'Residential',
    },
  })

  async function onSubmit(values) {
    try {
      const result = await createLead(values)

      if (result.demo) {
        setNotice({
          type: 'info',
          message:
            'Supabase is not configured yet, so this quote request stayed in demo mode. Add your keys to store live leads.',
        })
        return
      }

      setNotice({
        type: 'success',
        message:
          `Your enquiry was sent successfully. ${company.name} can now review it from the admin dashboard.`,
      })
      reset({
        name: '',
        phone: '',
        email: '',
        project_type: 'Residential',
        message: '',
      })
    } catch (error) {
      setNotice({
        type: 'error',
        message: error.message,
      })
    }
  }

  return (
    <section id="quote" className="scroll-mt-28 section-space">
      <div className="section-shell">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-6">
            <SectionHeader
              eyebrow="Get Free Quote"
              title="Tell us what you want to build with virtual or on-site support"
              description="Share your residential, commercial, or renovation requirement and Thozha Associates can review it from the dashboard. Leads are written directly into Supabase when configured."
            />
            <div className="panel space-y-5 p-6">
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Contact
                </p>
                <p className="mt-2 text-lg text-slate-900">{company.phone}</p>
                <p className="text-slate-600">{company.email}</p>
              </div>
              <div>
                <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                  Office
                </p>
                <p className="mt-2 text-lg text-slate-900">{company.location}</p>
              </div>
              <div className="rounded-[1.6rem] border border-mint/20 bg-mint/10 p-4">
                <p className="text-sm text-mint">
                  Share the project type, location, and a short brief so the team can respond with the right next step.
                </p>
              </div>
            </div>
          </div>

          <motion.form
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 0.65 }}
            onSubmit={handleSubmit(onSubmit)}
            className="panel space-y-5 p-6 sm:p-8"
          >
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Name
                </label>
                <input
                  {...register('name')}
                  className="input-field"
                  placeholder="Your full name"
                />
                {errors.name ? (
                  <p className="mt-2 text-sm text-rose-300">{errors.name.message}</p>
                ) : null}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Phone
                </label>
                <input
                  {...register('phone')}
                  className="input-field"
                  placeholder="+91 98765 43210"
                />
                {errors.phone ? (
                  <p className="mt-2 text-sm text-rose-300">
                    {errors.phone.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Email
                </label>
                <input
                  {...register('email')}
                  className="input-field"
                  placeholder="you@example.com"
                />
                {errors.email ? (
                  <p className="mt-2 text-sm text-rose-300">
                    {errors.email.message}
                  </p>
                ) : null}
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-600">
                  Project Type
                </label>
                <select {...register('project_type')} className="input-field">
                  {LEAD_PROJECT_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                {errors.project_type ? (
                  <p className="mt-2 text-sm text-rose-300">
                    {errors.project_type.message}
                  </p>
                ) : null}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-slate-600">
                Message
              </label>
              <textarea
                {...register('message')}
                className="textarea-field"
                placeholder="Describe the scope, site size, timeline, or style direction."
              />
              {errors.message ? (
                <p className="mt-2 text-sm text-rose-300">
                  {errors.message.message}
                </p>
              ) : null}
            </div>

            {notice.message ? (
              <div
                className={`rounded-2xl border px-4 py-3 text-sm ${
                  notice.type === 'success'
                    ? 'border-mint/30 bg-mint/10 text-mint'
                    : notice.type === 'error'
                      ? 'border-rose-300/30 bg-rose-300/10 text-rose-200'
                      : 'border-accent/30 bg-accent/10 text-accent'
                }`}
              >
                {notice.message}
              </div>
            ) : null}

            <button type="submit" className="cta-primary w-full" disabled={isSubmitting}>
              {isSubmitting ? 'Submitting...' : 'Send Quote Request'}
              <Send size={18} />
            </button>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default LeadFormSection
