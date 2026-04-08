import { useCallback, useRef, useState } from 'react'

const clamp = (value, min, max) => Math.min(Math.max(value, min), max)

function ComparisonImage({ image, label, className = '' }) {
  const [broken, setBroken] = useState(false)

  if (!image?.src || broken) {
    return (
      <div className={`grid h-full w-full place-items-center bg-slate-100 ${className}`}>
        <div className="text-center">
          <p className="text-sm font-medium uppercase tracking-[0.22em] text-slate-500">
            {label}
          </p>
          <p className="mt-3 text-sm text-slate-500">Image not available</p>
        </div>
      </div>
    )
  }

  return (
    <img
      src={image.src}
      alt={image.alt || label}
      className={className}
      onError={() => setBroken(true)}
    />
  )
}

function BeforeAfterSlider({ before, after, title }) {
  const [position, setPosition] = useState(56)
  const [isDragging, setIsDragging] = useState(false)
  const mediaRef = useRef(null)

  const updatePositionFromClientX = useCallback((clientX) => {
    const rect = mediaRef.current?.getBoundingClientRect()

    if (!rect || rect.width === 0) {
      return
    }

    const nextPosition = ((clientX - rect.left) / rect.width) * 100
    setPosition(Math.round(clamp(nextPosition, 0, 100)))
  }, [])

  const handlePointerDown = (event) => {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }

    setIsDragging(true)
    updatePositionFromClientX(event.clientX)
    event.currentTarget.setPointerCapture?.(event.pointerId)
  }

  const handlePointerMove = (event) => {
    if (!isDragging) {
      return
    }

    if (event.cancelable) {
      event.preventDefault()
    }

    updatePositionFromClientX(event.clientX)
  }

  const handlePointerEnd = () => {
    setIsDragging(false)
  }

  return (
    <div className="panel overflow-hidden">
      <div className="flex flex-col gap-4 border-b border-slate-200 px-4 py-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div>
          <p className="text-sm uppercase tracking-[0.22em] text-slate-500">
            Before / After
          </p>
          <h3 className="mt-1 font-display text-xl font-semibold leading-tight text-slate-900 sm:text-2xl">
            {title}
          </h3>
        </div>
        <div className="badge-pill self-start sm:self-auto">
          <span>{position}% built</span>
        </div>
      </div>

      <div
        ref={mediaRef}
        className="relative aspect-[4/5] cursor-col-resize overflow-hidden select-none sm:aspect-[16/10]"
        style={{ touchAction: 'pan-y' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        onPointerCancel={handlePointerEnd}
        onLostPointerCapture={handlePointerEnd}
      >
        <ComparisonImage
          key={before?.src || 'before-placeholder'}
          image={before}
          label="Before"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <ComparisonImage
            key={after?.src || 'after-placeholder'}
            image={after}
            label="After"
            className="h-full w-full object-cover"
          />
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 w-[3px] bg-white shadow-[0_0_0_9999px_rgba(255,255,255,0.04)]"
          style={{ left: `calc(${position}% - 1.5px)` }}
        >
          <span className="absolute left-1/2 top-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-300 bg-white/90 text-sm text-slate-700 shadow-soft sm:h-12 sm:w-12">
            <span aria-hidden="true">&harr;</span>
          </span>
        </div>
        <div className="pointer-events-none absolute left-3 top-3 rounded-full bg-white/88 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-900 sm:left-5 sm:top-5 sm:px-3 sm:text-xs sm:tracking-[0.22em]">
          Before
        </div>
        <div className="pointer-events-none absolute right-3 top-3 rounded-full bg-accent/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-950 sm:right-5 sm:top-5 sm:px-3 sm:text-xs sm:tracking-[0.22em]">
          After
        </div>
        <input
          type="range"
          min="0"
          max="100"
          value={position}
          onChange={(event) => setPosition(Number(event.target.value))}
          onPointerDown={(event) => event.stopPropagation()}
          className="absolute inset-x-3 bottom-3 h-1.5 appearance-none rounded-full bg-white/70 accent-accent sm:inset-x-5 sm:bottom-5"
          aria-label="Before after slider"
        />
      </div>

      <p className="px-4 pb-4 pt-3 text-xs uppercase tracking-[0.16em] text-slate-500 sm:px-6 sm:pb-5 sm:text-sm">
        Drag on the image or use the slider to compare progress.
      </p>
    </div>
  )
}

export default BeforeAfterSlider
