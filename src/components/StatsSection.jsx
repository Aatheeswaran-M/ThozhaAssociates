import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
} from 'framer-motion'
import { useEffect, useRef, useState } from 'react'

function AnimatedStat({ value, suffix }) {
  const ref = useRef(null)
  const motionValue = useMotionValue(0)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [display, setDisplay] = useState(0)

  useMotionValueEvent(motionValue, 'change', (latest) => {
    setDisplay(value % 1 === 0 ? Math.round(latest) : Number(latest.toFixed(1)))
  })

  useEffect(() => {
    if (!inView) {
      return undefined
    }

    const controls = animate(motionValue, value, {
      duration: 1.8,
      ease: 'easeOut',
    })

    return () => {
      controls.stop()
    }
  }, [inView, motionValue, value])

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  )
}

function StatValue({ stat }) {
  if (stat.valueText) {
    return <span>{stat.valueText}</span>
  }

  return <AnimatedStat value={stat.value} suffix={stat.suffix} />
}

function StatsSection({ stats = [] }) {
  return (
    <section className="section-shell py-10 sm:py-12 lg:py-14">
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <motion.article
            key={stat.label}
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.45 }}
            transition={{ duration: 0.55, delay: index * 0.08 }}
            className="panel p-6"
          >
            <p className="text-sm uppercase tracking-[0.2em] text-slate-500">
              {stat.label}
            </p>
            <p className="mt-4 font-display text-4xl font-bold text-slate-900 sm:text-5xl">
              <StatValue stat={stat} />
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}

export default StatsSection
