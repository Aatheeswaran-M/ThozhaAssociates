import gsap from 'gsap'

export function createHeroTimeline({
  container,
  blueprint,
  reveal,
  content,
  accentCards = [],
}) {
  if (!container || !blueprint || !reveal || !content) {
    return () => {}
  }

  const ctx = gsap.context(() => {
    const items = Array.from(content.children)

    const timeline = gsap.timeline({
      defaults: {
        ease: 'power3.out',
      },
    })

    timeline.fromTo(
      items,
      {
        y: 42,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 0.9,
        stagger: 0.1,
      },
    )

    timeline.fromTo(
      blueprint,
      {
        autoAlpha: 1,
        scale: 1.08,
      },
      {
        autoAlpha: 0.16,
        scale: 1,
        duration: 1.9,
      },
      0.12,
    )

    timeline.fromTo(
      reveal,
      {
        clipPath: 'inset(0 100% 0 0 round 28px)',
        scale: 1.16,
      },
      {
        clipPath: 'inset(0 0% 0 0 round 28px)',
        scale: 1,
        duration: 2.1,
      },
      0.08,
    )

    if (accentCards.length) {
      timeline.fromTo(
        accentCards,
        {
          y: 16,
          autoAlpha: 0,
        },
        {
          y: 0,
          autoAlpha: 1,
          duration: 0.6,
          stagger: 0.12,
        },
        0.8,
      )
    }
  }, container)

  return () => {
    ctx.revert()
  }
}
