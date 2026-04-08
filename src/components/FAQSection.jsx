import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

import SectionHeader from '@/components/SectionHeader'

function FAQSection({ items }) {
  const [openIndex, setOpenIndex] = useState(0)

  return (
    <section id="faq" className="scroll-mt-28 section-space">
      <div className="section-shell">
        <SectionHeader
          eyebrow="FAQ"
          title="Questions clients usually ask before starting a project"
          description="The most common client questions are answered in a straightforward way to reduce uncertainty before the first conversation."
        />

        <div className="space-y-4">
          {items.map((item, index) => {
            const open = openIndex === index

            return (
              <motion.article
                key={item.question}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.5, delay: index * 0.04 }}
                className="panel overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenIndex(open ? -1 : index)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                >
                  <div>
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
                      FAQ {String(index + 1).padStart(2, '0')}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-semibold text-slate-900">
                      {item.question}
                    </h3>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-slate-600 transition ${open ? 'rotate-180' : ''}`}
                  />
                </button>

                <AnimatePresence initial={false}>
                  {open ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-200 px-6 py-5 text-base leading-8 text-slate-600">
                        {item.answer}
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.article>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default FAQSection
