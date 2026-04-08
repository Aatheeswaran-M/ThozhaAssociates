import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function createScrollBuildTimeline({
  section,
  stages,
  onProgress,
  onStageChange,
}) {
  const stageElements = stages.filter(Boolean)

  if (!section || !stageElements.length) {
    return () => {}
  }

  const ctx = gsap.context(() => {
    gsap.set(stageElements, {
      autoAlpha: 0,
      y: 36,
      scale: 0.92,
    })

    gsap.set(stageElements[0], {
      autoAlpha: 1,
      y: 0,
      scale: 1,
    })

    ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: () => `+=${window.innerHeight * (stageElements.length + 0.5)}`,
      scrub: 1,
      pin: true,
      anticipatePin: 1,
      onUpdate: (self) => {
        onProgress?.(self.progress)

        const stageIndex = Math.min(
          stageElements.length - 1,
          Math.floor(self.progress * stageElements.length),
        )

        onStageChange?.(stageIndex)
      },
    })

    stageElements.forEach((stage, index) => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: () => `top top-=${window.innerHeight * index}`,
            end: () => `top top-=${window.innerHeight * (index + 1)}`,
            scrub: true,
          },
        })
        .to(stage, {
          autoAlpha: 1,
          y: 0,
          scale: 1,
        })
        .to(
          stage,
          {
            autoAlpha: index === stageElements.length - 1 ? 1 : 0.22,
            y: index === stageElements.length - 1 ? 0 : -18,
            scale: index === stageElements.length - 1 ? 1 : 0.96,
          },
          '+=0.2',
        )
    })
  }, section)

  return () => {
    ctx.revert()
    ScrollTrigger.refresh()
  }
}
