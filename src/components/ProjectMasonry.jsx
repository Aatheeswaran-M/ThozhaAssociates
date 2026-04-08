import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'

function ProjectMasonry({ projects, onSelect }) {
  return (
    <div className="columns-1 gap-6 sm:columns-2 xl:columns-3">
      {projects.map((project, index) => (
        <motion.button
          key={project.id}
          type="button"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6, delay: index * 0.04 }}
          whileHover={{ y: -6 }}
          onClick={() => onSelect(project)}
          className="group mb-6 w-full break-inside-avoid overflow-hidden rounded-[2.2rem_1.6rem_2.2rem_1.8rem] border border-slate-200/70 bg-white/80 text-left shadow-soft backdrop-blur"
        >
          <div className={`relative overflow-hidden ${project.aspect}`}>
            <img
              src={project.image?.src}
              alt={project.image?.alt || project.title}
              className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
            <div className="absolute left-5 right-5 top-5 flex items-start justify-between gap-3">
              <span className="rounded-full bg-white/85 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-slate-900 backdrop-blur">
                {project.category}
              </span>
              <span className="rounded-full bg-accent/92 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-white">
                {project.status}
              </span>
            </div>
            <div className="absolute inset-x-5 bottom-5">
              <h3 className="font-display text-2xl font-semibold text-white">
                {project.title}
              </h3>
              <div className="mt-2 flex items-center gap-2 text-sm text-slate-100">
                <MapPin size={15} />
                <span>{project.location}</span>
              </div>
            </div>
          </div>
        </motion.button>
      ))}
    </div>
  )
}

export default ProjectMasonry
