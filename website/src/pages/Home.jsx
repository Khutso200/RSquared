import { Link } from 'react-router-dom'
import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import Icon from '../components/Icon'
import ImagePlaceholder from '../components/ImagePlaceholder'
import EngagementLoop from '../components/EngagementLoop'
import InteractiveGlobe from '../components/InteractiveGlobe'
import GlowText from '../components/GlowText'
import useAutoLoop from '../hooks/useAutoLoop'
import { services } from '../data/services'

const oemLogos = ['CISCO', 'FORTINET', 'AWS', 'Microsoft', 'MikroTik', 'Splunk']

const approachSteps = [
  {
    num: '01',
    title: 'Assess',
    tagline: 'Infrastructure audit, gap analysis & risk benchmarking against your environment and goals.',
    detail: 'We start with your environment, not a pre-set product list, auditing what you run today and benchmarking it against real risk.',
    photoCaption: 'Add photo: infrastructure audit on site',
  },
  {
    num: '02',
    title: 'Design',
    tagline: 'Clear, documented architecture and security plans your team can actually maintain.',
    detail: 'Every recommendation is documented in plain language, sized to your budget and team and built to be maintained long after we hand it over.',
    photoCaption: 'Add photo: architecture & design review',
  },
  {
    num: '03',
    title: 'Deploy & Test',
    tagline: 'Hands-on implementation followed by independent testing to verify it holds up.',
    detail: 'Our engineers implement the plan hands-on, then test it independently, so what goes live is verified, not just deployed.',
    photoCaption: 'Add photo: deployment & testing day',
  },
  {
    num: '04',
    title: 'Support',
    tagline: 'Ongoing monitoring, hardware/software support and a direct line to our engineers.',
    detail: "The relationship doesn't end at go-live. Ongoing monitoring and a direct line to the engineers who built it keep things running.",
    photoCaption: 'Add photo: monitoring & support desk',
  },
]

const approachStats = [
  { value: '5', label: 'Integrated service lines' },
  { value: '1', label: 'Accountable engineering team' },
]

const impactStats = [
  { value: '70', suffix: '%', label: 'MTTR Reduction', desc: 'Mean time to resolution cut across monitored infrastructure.' },
  { value: '285', suffix: '+', label: 'Endpoints Secured', desc: 'Devices protected under active security monitoring and management.' },
  { value: '99.9', suffix: '%', label: 'Uptime SLA', desc: 'Network availability guaranteed across managed infrastructure.' },
  { value: '3', suffix: 'x', label: 'Faster Deployment', desc: 'A structured delivery process that accelerates infrastructure rollouts.' },
]

export default function Home() {
  const { index: stepIndex, setIndex: setStepIndex, setPaused: setStepPaused } = useAutoLoop(approachSteps.length)
  const activeStep = approachSteps[stepIndex]

  return (
    <>
      {/* Hero */}
      <section className="relative min-h-[620px] overflow-hidden py-22 pt-22 pb-20 sm:min-h-[680px] lg:min-h-[740px]">
        <div className="pointer-events-none absolute -top-40 -right-30 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.14),rgba(124,58,237,0)_70%)]" />
        <div className="pointer-events-none absolute -bottom-50 -left-35 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.10),rgba(168,85,247,0)_70%)]" />

        <InteractiveGlobe className="pointer-events-auto absolute inset-0 z-0 h-full w-full" originX={0.68} originY={0.42} />

        <div className="relative z-10 mx-auto max-w-6xl px-6">
          <div className="max-w-xl">
            <Eyebrow>Johannesburg, South Africa</Eyebrow>
            <h1 className="mb-5.5 text-balance text-4xl leading-[1.08] font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
              Enterprise IT infrastructure, built <span className="text-brand-500">secure</span> from the ground up.
            </h1>
            <p className="mb-8 max-w-lg text-[1.15rem] leading-relaxed text-body">
              RSquared IT Technologies helps organisations plan, secure and run resilient networks, from
              strategic consultation through to hands-on deployment, testing and hardware supply.
            </p>
            <div className="mb-11 flex flex-wrap gap-3.5">
              <Button to="/contact">
                Talk to a Consultant
                <Icon name="arrowRight" className="h-3.5 w-3.5" />
              </Button>
              <Button to="/services" variant="outline">Explore Services</Button>
            </div>
            <div className="flex flex-wrap gap-9">
              <Stat value="5" label="Core Service Lines" />
              <Stat value="24/7" label="Monitoring & Support" />
              <Stat value="100%" label="Vendor-Neutral Advice" />
            </div>
          </div>
        </div>
      </section>

      {/* Certified strip */}
      <div className="border-y border-line-soft bg-[#faf9fc] py-8">
        <div className="mx-auto mb-5 max-w-6xl px-6 text-center">
          <span className="font-mono text-xs font-bold tracking-[0.1em] text-muted uppercase">Certified With</span>
        </div>
        <div className="marquee-mask overflow-hidden">
          <div className="marquee-track flex w-max items-center gap-16 pr-16">
            {[...oemLogos, ...oemLogos].map((brand, i) => (
              <span
                key={`${brand}-${i}`}
                className="text-[0.95rem] font-extrabold tracking-wide whitespace-nowrap text-body transition-colors hover:text-brand-600"
              >
                {brand}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Services preview */}
      <section className="py-26">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <Eyebrow className="mx-auto">What We Do</Eyebrow>
            <h2 className="mb-3.5 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-[2.6rem]">
              Everything your network and security posture needs.
            </h2>
            <p className="text-[1.05rem] text-body">
              Five focused service lines covering strategy, defence, deployment, testing and supply, so you
              can work with one accountable partner.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <Link
                key={s.slug}
                to={`/services#${s.slug}`}
                className="rounded-2xl border border-line bg-white p-7.5 text-left transition-all duration-200 hover:-translate-y-1.5 hover:border-brand-100 hover:shadow-[0_20px_50px_rgba(40,20,90,0.12)]"
              >
                <span className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <Icon name={s.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="mb-2 text-[1.08rem] font-extrabold text-ink">{s.name}</h3>
                <p className="mb-4 text-sm text-body">{s.preview}</p>
                <div className="flex flex-wrap gap-1.5">
                  {s.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-brand-50 px-2.5 py-1 font-mono text-[0.68rem] font-bold text-brand-600">
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="overflow-hidden bg-[#0f0f14] py-26">
        <div className="mx-auto max-w-6xl px-6">
          <div className="relative mx-auto mb-16 max-w-2xl text-center">
            <div className="pointer-events-none absolute top-1/2 left-1/2 -z-10 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.35),rgba(124,58,237,0.12)_45%,rgba(124,58,237,0)_72%)] blur-2xl" />
            <Eyebrow dark className="mx-auto">Our Approach</Eyebrow>
            <h2 className="mt-5 text-balance text-3xl font-extrabold tracking-tight text-white sm:text-[2.6rem]">
              <GlowText text="Why teams trust RSquared with infrastructure that can't go down." />
            </h2>
          </div>

          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[1fr_1.05fr]">
            <div>
              <div className="mb-7 flex gap-10">
                {approachStats.map((stat) => (
                  <div key={stat.label}>
                    <div className="mb-1 bg-gradient-to-br from-brand-400 to-brand-200 bg-clip-text text-4xl font-extrabold text-transparent">
                      {stat.value}
                    </div>
                    <div className="max-w-[9rem] text-[0.8rem] leading-snug font-semibold text-white/60">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>

              <h3 className="mb-3 text-[1.3rem] font-extrabold text-white">
                Straightforward engineering. No vendor lock-in.
              </h3>

              <div key={activeStep.num} className="mb-7 max-w-md animate-[fadeIn_.4s_ease]">
                <div className="mb-2 flex items-center gap-2 font-mono text-[0.7rem] font-bold tracking-[0.08em] text-brand-300 uppercase">
                  <span>Phase {activeStep.num}</span>
                  <span className="text-white/25">/</span>
                  <span>{activeStep.title}</span>
                </div>
                <p className="text-[1.02rem] leading-relaxed text-white/70">{activeStep.detail}</p>
              </div>

              <div className="mb-8 max-w-md rounded-2xl border border-white/10 bg-white/5 px-6 py-5">
                <p className="mb-1.5 text-sm font-bold text-brand-300">Our Philosophy</p>
                <p className="text-sm leading-relaxed text-white/70 italic">
                  "Infrastructure should be resilient by design, security should be proactive not reactive
                  and every recommendation should be one we'd make to our own network."
                </p>
                <p className="mt-3 text-xs font-semibold text-white/40">RSquared Engineering Team</p>
              </div>

              <div className="flex flex-wrap gap-3.5">
                <Button to="/contact">Talk to a Consultant</Button>
                <Button to="/services" variant="ghostOnDark">Explore Services</Button>
              </div>
            </div>

            <div className="relative pb-10 sm:pb-14">
              <ImagePlaceholder
                key={activeStep.num}
                label={activeStep.photoCaption}
                className="aspect-[4/5] w-full animate-[fadeIn_.4s_ease]"
              />
              <EngagementLoop
                steps={approachSteps}
                index={stepIndex}
                onSelect={setStepIndex}
                onPause={setStepPaused}
                className="absolute inset-x-6 -bottom-2 sm:inset-x-10"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Business impact stats */}
      <section className="py-26">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <Eyebrow className="mx-auto">Business Impact</Eyebrow>
            <h2 className="mb-3.5 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-[2.6rem]">
              Measurable outcomes that matter.
            </h2>
            <p className="text-[1.05rem] text-body">
              Every engagement is built around quantifiable results: faster response, lower risk, stronger
              infrastructure.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-5 lg:grid-cols-4">
            {impactStats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-brand-100 bg-brand-50/40 p-8 text-center transition-colors hover:border-brand-300 hover:bg-brand-50"
              >
                <div className="mb-2 bg-gradient-to-br from-brand-600 to-brand-400 bg-clip-text text-4xl font-extrabold text-transparent sm:text-5xl">
                  {stat.value}
                  <span className="text-3xl sm:text-4xl">{stat.suffix}</span>
                </div>
                <div className="mb-2 text-sm font-bold text-ink">{stat.label}</div>
                <p className="text-[0.8rem] text-body">{stat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <div className="mx-auto mb-26 max-w-6xl px-6">
        <div className="relative flex flex-wrap items-center justify-between gap-8 overflow-hidden rounded-3xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 px-14 py-16 text-white">
          <div className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:26px_26px]" />
          <div className="relative z-10">
            <h2 className="mb-2 text-balance text-2xl font-extrabold text-white sm:text-[2.1rem]">
              Ready to secure your infrastructure?
            </h2>
            <p className="max-w-md text-white/85">
              Book a free consultation and we'll come back with a clear, actionable plan for your network and
              security posture.
            </p>
          </div>
          <div className="relative z-10 flex flex-wrap gap-3.5">
            <Button to="/contact" variant="outlineOnDark">Book a Consultation</Button>
            <Button href="mailto:infor@rsquaredit.com" variant="ghostOnDark">Email Us</Button>
          </div>
        </div>
      </div>
    </>
  )
}

function Stat({ value, label }) {
  return (
    <div>
      <b className="block text-[1.7rem] font-extrabold text-ink">{value}</b>
      <span className="text-[0.82rem] font-semibold text-muted">{label}</span>
    </div>
  )
}
