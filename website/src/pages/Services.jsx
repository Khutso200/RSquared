import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { services } from '../data/services'

export default function Services() {
  const { hash } = useLocation()
  const [openSlug, setOpenSlug] = useState(hash ? hash.slice(1) : services[0].slug)

  useEffect(() => {
    if (hash) setOpenSlug(hash.slice(1))
  }, [hash])

  return (
    <>
      <div className="border-b border-line-soft bg-[#faf9fc] py-16 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow className="mx-auto">Our Services</Eyebrow>
          <h1 className="mb-3.5 text-balance text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Everything your infrastructure <span className="text-muted">needs.</span>
          </h1>
          <p className="mx-auto max-w-lg text-[1.02rem] text-body">
            Click any service below to explore capabilities and how we deliver results.
          </p>
        </div>
      </div>

      <div className="py-14 pb-25">
        <div className="mx-auto max-w-6xl px-6">
          <div className="flex flex-col gap-4">
            {services.map((s) => {
              const isOpen = openSlug === s.slug
              return (
                <div
                  key={s.slug}
                  id={s.slug}
                  className={`scroll-mt-24 overflow-hidden rounded-2xl border bg-white transition-shadow ${
                    isOpen ? 'border-brand-500 shadow-[0_8px_24px_rgba(40,20,90,0.08)]' : 'border-line hover:border-brand-100 hover:shadow-[0_8px_24px_rgba(40,20,90,0.08)]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenSlug(isOpen ? null : s.slug)}
                    className={`flex w-full items-center gap-5 px-7.5 py-6.5 text-left transition-colors ${
                      isOpen ? 'border-b border-brand-100 bg-brand-50' : 'hover:bg-[#faf9fc]'
                    }`}
                  >
                    <span className="flex h-11 w-11 flex-none items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                      <Icon name={s.icon} className="h-5 w-5" />
                    </span>
                    <span className="flex-1">
                      <span className="mb-1 block text-[1.12rem] font-extrabold text-ink">{s.name}</span>
                      <span className="block text-sm text-body">{s.tagline}</span>
                    </span>
                    <span
                      className={`flex h-8.5 w-8.5 flex-none items-center justify-center rounded-[9px] transition-all duration-250 ${
                        isOpen ? 'rotate-180 bg-brand-500 text-white' : 'bg-panel text-body'
                      }`}
                    >
                      <Icon name="chevronDown" className="h-4 w-4" />
                    </span>
                  </button>

                  {isOpen && (
                    <div className="px-7.5 py-7.5">
                      <h4 className="mb-3.5 text-[1.05rem] font-bold text-brand-600">Key Capabilities</h4>
                      <div className="mb-6 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                        {s.capabilities.map((cap) => (
                          <div key={cap} className="flex items-start gap-2.5 text-[0.87rem] font-medium text-ink-soft">
                            <Icon name="check" className="mt-0.5 h-3.5 w-3.5 flex-none text-brand-500" strokeWidth={2.5} />
                            {cap}
                          </div>
                        ))}
                      </div>
                      {s.description.map((para) => (
                        <p key={para} className="mb-4 max-w-3xl text-[0.92rem] leading-relaxed text-body last:mb-0">
                          {para}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-11 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-line-soft bg-panel px-9 py-8">
            <div>
              <h3 className="mb-1 text-[1.1rem] font-extrabold text-ink">Not sure which service you need?</h3>
              <p className="text-sm text-body">Tell us about your environment and we'll recommend the right service, or a combination.</p>
            </div>
            <Button to="/contact">Get a Free Consultation</Button>
          </div>
        </div>
      </div>
    </>
  )
}
