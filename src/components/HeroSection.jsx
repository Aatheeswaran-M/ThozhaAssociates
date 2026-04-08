import { Button, Stack } from '@mui/material'
import { ArrowRight, BadgeCheck, MoveRight } from 'lucide-react'
import { useEffect, useRef } from 'react'

import { createHeroTimeline } from '@/animations/heroTimeline'

function HeroSection({ blueprintImage, finalImage, company, features = [] }) {
  const sectionRef = useRef(null)
  const contentRef = useRef(null)
  const blueprintRef = useRef(null)
  const revealRef = useRef(null)
  const cardRefs = useRef([])
  const heroFeatures = features.slice(0, 3)

  useEffect(() => {
    return createHeroTimeline({
      container: sectionRef.current,
      blueprint: blueprintRef.current,
      reveal: revealRef.current,
      content: contentRef.current,
      accentCards: cardRefs.current.slice(0, heroFeatures.length).filter(Boolean),
    })
  }, [blueprintImage?.src, finalImage?.src, heroFeatures.length])

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative scroll-mt-28 overflow-hidden pt-4 sm:pt-6 lg:pt-8"
    >
      <div className="absolute inset-0 bg-halo" />
      <div className="section-shell relative z-10">
        <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-950 shadow-soft sm:rounded-2xl">
          <div className="absolute inset-0">
            <img
              ref={blueprintRef}
              src={blueprintImage?.src}
              alt={blueprintImage?.alt || 'Blueprint view'}
              className="absolute inset-0 h-full w-full object-cover opacity-60 mix-blend-screen"
            />
            <img
              ref={revealRef}
              src={finalImage?.src}
              alt={finalImage?.alt || 'Finished building'}
              className="absolute inset-0 h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/42 to-slate-950/28" />
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-slate-950/40 via-slate-950/15 to-slate-950/40" />

          <div className="relative grid min-h-[440px] items-center sm:min-h-[500px] lg:min-h-[560px]">
            <div ref={contentRef} className="z-10 mx-auto max-w-3xl space-y-5 px-4 py-12 text-center sm:space-y-6 sm:px-8 sm:py-16 lg:py-20">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/12 px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/95 sm:px-4 sm:py-2 sm:text-xs sm:tracking-[0.2em]">
                Fast and Reliable
              </span>

              <div className="space-y-3">
                <h1 className="mx-auto max-w-3xl font-display text-3xl font-bold uppercase leading-[1.02] tracking-[0.02em] text-white sm:text-5xl xl:text-6xl">
                  {company.tagline}
                </h1>
                <p className="mx-auto max-w-2xl text-sm text-slate-100/95 sm:text-base lg:text-lg">
                  {company.blurb}
                </p>
              </div>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={1.5}
                sx={{ pt: 1.2, justifyContent: 'center' }}
              >
                <Button
                  component="a"
                  href="#quote"
                  variant="contained"
                  endIcon={<ArrowRight size={18} />}
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    justifyContent: { xs: 'space-between', sm: 'center' },
                    px: 3,
                    py: 1.35,
                    bgcolor: '#0a66c2',
                    color: '#ffffff',
                    border: '1px solid rgba(10, 102, 194, 0.95)',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    boxShadow: '0 12px 26px rgba(10, 102, 194, 0.35)',
                    '&:hover': {
                      bgcolor: '#004182',
                      color: '#ffffff',
                    },
                  }}
                >
                  Get Free Quote
                </Button>
                <Button
                  component="a"
                  href="#projects"
                  variant="outlined"
                  endIcon={<MoveRight size={18} />}
                  sx={{
                    width: { xs: '100%', sm: 'auto' },
                    justifyContent: { xs: 'space-between', sm: 'center' },
                    px: 3,
                    py: 1.35,
                    color: '#ffffff',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                    borderColor: 'rgba(255, 255, 255, 0.45)',
                    bgcolor: 'rgba(17, 24, 39, 0.36)',
                    '&:hover': {
                      borderColor: 'rgba(255, 255, 255, 0.72)',
                      bgcolor: 'rgba(17, 24, 39, 0.52)',
                    },
                  }}
                >
                  View Projects
                </Button>
              </Stack>

              <Stack
                spacing={1}
                sx={{ pt: 1.4, alignItems: 'center', maxWidth: { xs: '100%', sm: '34rem' }, mx: 'auto' }}
              >
                {heroFeatures.map((feature, index) => (
                  <div
                    key={`${feature}-${index}`}
                    ref={(element) => {
                      cardRefs.current[index] = element
                    }}
                    className="inline-flex max-w-full items-center gap-2.5 rounded-md border border-white/20 bg-black/35 px-3 py-2 text-sm font-medium text-slate-100 shadow-[0_8px_18px_rgba(2,6,23,0.26)]"
                  >
                    <span className="grid h-5 w-5 flex-none place-items-center rounded-full bg-accent/30 text-blue-100">
                      <BadgeCheck size={13} />
                    </span>
                    <span className="max-w-[15.5rem] truncate sm:max-w-none">{feature}</span>
                  </div>
                ))}
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
