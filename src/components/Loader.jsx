import { AnimatePresence, motion } from 'framer-motion'

function Loader({ active }) {
  return (
    <AnimatePresence>
      {active ? (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-[rgba(246,247,251,0.94)] backdrop-blur-md"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5 } }}
        >
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="relative flex h-24 w-24 items-end justify-center gap-2">
              <motion.span
                className="w-4 rounded-t-2xl bg-accent"
                animate={{ height: [22, 56, 22] }}
                transition={{ duration: 1.3, repeat: Infinity }}
              />
              <motion.span
                className="w-4 rounded-t-2xl bg-mint"
                animate={{ height: [46, 20, 46] }}
                transition={{ duration: 1.3, repeat: Infinity, delay: 0.15 }}
              />
              <motion.span
                className="w-4 rounded-t-2xl bg-slate-900"
                animate={{ height: [18, 68, 18] }}
                transition={{ duration: 1.3, repeat: Infinity, delay: 0.3 }}
              />
            </div>
            <div className="space-y-2">
              <p className="font-display text-2xl font-semibold text-slate-900">
                Raising the site experience
              </p>
              <p className="text-sm text-slate-600">
                Aligning blueprint visuals, live imagery, and construction flow.
              </p>
            </div>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

export default Loader
