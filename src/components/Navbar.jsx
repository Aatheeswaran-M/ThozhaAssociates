import { ArrowRight, Menu, X } from 'lucide-react'
import { useMemo, useState } from 'react'

import { NAV_LINKS } from '@/utils/constants'

function NavbarLogo({ company }) {
  const [broken, setBroken] = useState(false)
  const initials = useMemo(
    () =>
      (company.name || 'TA')
        .split(' ')
        .map((part) => part[0])
        .slice(0, 2)
        .join('')
        .toUpperCase(),
    [company.name],
  )

  if (!company.logo_url || broken) {
    return (
      <div className="grid h-11 w-11 place-items-center rounded-2xl bg-accent/15 text-accent">
        <span className="font-display text-lg font-bold">{initials}</span>
      </div>
    )
  }

  return (
    <img
      src={company.logo_url}
      alt={`${company.name} logo`}
      className="h-11 w-11 rounded-2xl object-cover"
      onError={() => setBroken(true)}
    />
  )
}

function Navbar({ company }) {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/90 bg-white/95 backdrop-blur">
      <div className="section-shell py-2.5">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <a href="#home" className="flex items-center gap-3">
            <NavbarLogo key={company.logo_url || company.name} company={company} />
            <div>
              <p className="font-display text-xl font-semibold text-slate-900">
                {company.name}
              </p>
              <p className="hidden text-[10px] uppercase tracking-[0.2em] text-slate-500 sm:block">
                {company.location || 'Construction Studio'}
              </p>
            </div>
          </a>

          <nav className="hidden items-center gap-7 lg:flex">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-600 hover:text-slate-900"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <a href="#quote" className="cta-primary px-4 py-2 text-[11px]">
              Get Free Quote
              <ArrowRight size={16} />
            </a>
          </div>

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="grid h-10 w-10 place-items-center rounded-md border border-slate-200 bg-white text-slate-900 lg:hidden"
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {open ? (
          <div className="mt-3 flex flex-col gap-4 rounded-xl border border-slate-200 bg-white px-4 py-4 shadow-[0_14px_30px_rgba(15,23,42,0.08)] lg:hidden">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <div className="flex flex-col gap-3 pt-3">
              <a
                href="#quote"
                className="cta-primary justify-center"
                onClick={() => setOpen(false)}
              >
                Get Free Quote
              </a>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  )
}

export default Navbar
