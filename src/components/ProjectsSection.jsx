import { useMemo, useState } from 'react'

import ImageModal from '@/components/ImageModal'
import ProjectMasonry from '@/components/ProjectMasonry'
import SectionHeader from '@/components/SectionHeader'
import { PROJECT_CATEGORIES } from '@/utils/constants'
import { cn } from '@/utils/helpers'

function ProjectsSection({
  projects,
}) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [selectedProject, setSelectedProject] = useState(null)

  const filteredProjects = useMemo(() => {
    if (activeFilter === 'All') {
      return projects
    }

    return projects.filter((project) => project.category === activeFilter)
  }, [activeFilter, projects])

  return (
    <section id="projects" className="scroll-mt-28 section-space">
      <div className="section-shell">
        <SectionHeader
          eyebrow="Projects"
          title="Selected residential, commercial, and renovation work from the dashboard"
          description={
            projects.length
              ? 'Each project shown here is published from the admin dashboard and can be updated with new imagery, area details, and progress notes.'
              : 'No projects have been published yet. Add projects from the admin dashboard to populate this section.'
          }
          actions={
            <div className="flex flex-wrap gap-2">
              {PROJECT_CATEGORIES.map((category) => (
                <button
                  key={category}
                  type="button"
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm font-medium transition backdrop-blur',
                    activeFilter === category
                      ? 'border-accent bg-accent text-white shadow-glow'
                      : 'border-slate-200/80 bg-white/70 text-slate-700 hover:border-slate-400 hover:bg-white/90',
                  )}
                  onClick={() => setActiveFilter(category)}
                >
                  {category}
                </button>
              ))}
            </div>
          }
        />

        {filteredProjects.length ? (
          <ProjectMasonry
            projects={filteredProjects}
            onSelect={setSelectedProject}
          />
        ) : (
          <div className="panel p-8 text-center">
            <p className="font-display text-2xl font-semibold text-slate-900">
              No projects in this category yet
            </p>
            <p className="mt-3 text-slate-500">
              Publish projects from the dashboard to show them here.
            </p>
          </div>
        )}

        <ImageModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      </div>
    </section>
  )
}

export default ProjectsSection
