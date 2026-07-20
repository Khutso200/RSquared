import { Link } from 'react-router-dom'
import Eyebrow from '../components/Eyebrow'
import Button from '../components/Button'
import Icon from '../components/Icon'
import { services } from '../data/services'

const statusRows = [
  { icon: 'monitor', label: 'Network Uptime', value: '99.98%', ok: true },
  { icon: 'shield', label: 'Threats Blocked (30d)', value: '1,204' },
  { icon: 'search', label: 'Last Pentest Findings', value: 'Resolved', ok: true },
  { icon: 'compass', label: 'Hardware Rollout', value: 'On Track' },
]

const methodSteps = [
  { num: '01', title: 'Assess', copy: 'Infrastructure audit, gap analysis & risk benchmarking against your environment and goals.' },
  { num: '02', title: 'Design', copy: 'Clear, documented architecture and security plans your team can actually maintain.' },
  { num: '03', title: 'Deploy & Test', copy: 'Hands-on implementation followed by independent testing to verify it holds up.' },
  { num: '04', title: 'Support', copy: 'Ongoing monitoring, hardware/software support, and a direct line to our engineers.' },
]

const techDepth = [
  {
    title: 'Network Consultation & Infrastructure',
    sub: 'Enterprise-grade networking across multi-vendor environments',
    icon: 'radar',
    items: [
      'Advanced routing & switching (OSPF, EIGRP, BGP) and QoS',
      'Cost-effective routing, wireless & VPN for SMB and branch sites',
      'Controller-based Wi-Fi with seamless roaming',
      'Monitoring & visibility: SNMP, NetFlow, dashboarding',
      'High availability: gateway redundancy, link aggregation',
    ],
  },
  {
    title: 'Security Consultation & Infrastructure',
    sub: 'Comprehensive security from perimeter to endpoint',
    icon: 'shield',
    items: [
      'Next-gen firewalls with IPS & SSL inspection',
      'SIEM for log aggregation & threat hunting',
      'Vulnerability management with prioritised remediation',
      'Identity & access: SSO, RADIUS, certificate-based auth',
      'Security policy, governance & compliance alignment',
    ],
  },
  {
    title: 'Penetration Testing',
    sub: 'Structured, methodology-driven offensive security',
    icon: 'search',
    items: [
      'OWASP Top 10 aligned web application testing',
      'Internal & external network exploitation testing',
      'Wireless security & rogue access point assessment',
      'Social engineering & phishing simulations',
      'Prioritised findings with proof-of-concept & fixes',
    ],
  },
  {
    title: 'ICT Hardware & Software',
    sub: 'Sourced, licensed, and supported end-to-end',
    icon: 'box',
    items: [
      'Servers, workstations & networking hardware sourcing',
      'Software licensing & deployment coordination',
      'Asset tracking & lifecycle refresh planning',
      'Warranty coordination & vendor escalation',
      'Break-fix & on-site support',
    ],
  },
]

const impactStats = [
  { value: '70', suffix: '%', label: 'MTTR Reduction', desc: 'Mean time to resolution cut across monitored infrastructure.' },
  { value: '285', suffix: '+', label: 'Endpoints Secured', desc: 'Devices protected under active security monitoring and management.' },
  { value: '99.9', suffix: '%', label: 'Uptime SLA', desc: 'Network availability guaranteed across managed infrastructure.' },
  { value: '3', suffix: 'x', label: 'Faster Deployment', desc: 'A structured delivery process that accelerates infrastructure rollouts.' },
]

export default function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden py-22 pt-22 pb-20">
        <div className="pointer-events-none absolute -top-40 -right-30 h-[560px] w-[560px] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.14),rgba(124,58,237,0)_70%)]" />
        <div className="pointer-events-none absolute -bottom-50 -left-35 h-[480px] w-[480px] rounded-full bg-[radial-gradient(circle,rgba(168,85,247,0.10),rgba(168,85,247,0)_70%)]" />

        <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 px-6 lg:grid-cols-[1.05fr_0.95fr]">
          <div>
            <Eyebrow>Johannesburg, South Africa</Eyebrow>
            <h1 className="mb-5.5 text-balance text-4xl leading-[1.08] font-extrabold tracking-tight text-ink sm:text-5xl lg:text-[3.6rem]">
              Enterprise IT infrastructure, built <span className="text-brand-500">secure</span> from the ground up.
            </h1>
            <p className="mb-8 max-w-lg text-[1.15rem] leading-relaxed text-body">
              RSquared IT Technologies helps organisations plan, secure, and run resilient networks — from
              strategic consultation through to hands-on deployment, testing, and hardware supply.
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

          <div className="relative">
            <div className="absolute -top-4.5 -left-7 z-10 hidden items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-3 text-[0.85rem] font-bold shadow-[0_8px_24px_rgba(40,20,90,0.08)] sm:flex">
              <span className="flex h-7.5 w-7.5 flex-none items-center justify-center rounded-lg bg-brand-500 text-white">
                <Icon name="shield" className="h-3.5 w-3.5" />
              </span>
              Secured Network
            </div>

            <div className="relative rounded-[20px] border border-line bg-white p-8 shadow-[0_20px_50px_rgba(40,20,90,0.12)]">
              <div className="mb-5.5 flex items-center justify-between">
                <div className="flex gap-1.5">
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                  <span className="h-2.5 w-2.5 rounded-full bg-line" />
                </div>
                <div className="flex items-center gap-1.5 rounded-full bg-[#eafcf1] px-3 py-1.5 font-mono text-xs font-bold text-[#16a34a]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#16a34a]" />
                  All Systems Operational
                </div>
              </div>
              {statusRows.map((row, i) => (
                <div
                  key={row.label}
                  className={`flex items-center justify-between py-3.5 ${i !== statusRows.length - 1 ? 'border-b border-line-soft' : ''}`}
                >
                  <div className="flex items-center gap-3 text-[0.92rem] font-semibold text-ink-soft">
                    <span className="flex h-8.5 w-8.5 items-center justify-center rounded-[9px] bg-brand-50 text-brand-600">
                      <Icon name={row.icon} className="h-4 w-4" />
                    </span>
                    {row.label}
                  </div>
                  <div className={`font-mono text-[0.78rem] font-semibold ${row.ok ? 'text-[#16a34a]' : 'text-muted'}`}>
                    {row.value}
                  </div>
                </div>
              ))}
            </div>

            <div className="absolute -right-5 -bottom-5 z-10 hidden items-center gap-2.5 rounded-xl border border-line bg-white px-4 py-3 text-[0.85rem] font-bold shadow-[0_8px_24px_rgba(40,20,90,0.08)] sm:flex">
              <span className="flex h-7.5 w-7.5 flex-none items-center justify-center rounded-lg bg-brand-500 text-white">
                <Icon name="search" className="h-3.5 w-3.5" />
              </span>
              Pentest Verified
            </div>
          </div>
        </div>
      </section>

      {/* Certified strip */}
      <div className="border-y border-line-soft bg-[#faf9fc] py-8">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-9 px-6">
          <span className="font-mono text-xs font-bold tracking-[0.1em] text-muted uppercase">Certified With</span>
          <div className="flex flex-wrap justify-center gap-8.5">
            {['CISCO', 'FORTINET', 'AWS', 'Microsoft', 'MikroTik'].map((brand) => (
              <span key={brand} className="text-[0.95rem] font-extrabold tracking-wide text-body transition-colors hover:text-brand-600">
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
              Five focused service lines covering strategy, defence, deployment, testing, and supply — so you
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

            <div className="relative col-span-full flex flex-col items-start gap-6 overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 via-brand-500 to-brand-400 p-11 text-white sm:flex-row sm:items-center sm:justify-between">
              <div className="pointer-events-none absolute inset-0 opacity-35 [background-image:radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:26px_26px]" />
              <div className="relative z-10">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/15 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-[0.12em] text-white uppercase">
                  Not Sure Where To Start?
                </div>
                <h3 className="mb-2 text-[1.35rem] font-extrabold text-white">Full-stack infrastructure ownership.</h3>
                <p className="max-w-md text-[0.92rem] text-white/85">
                  Tell us about your environment and we'll recommend the right service, or a combination,
                  backed by one accountable engineering team.
                </p>
              </div>
              <Button to="/contact" variant="outlineOnDark" className="relative z-10 flex-none">
                Get a Free Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology */}
      <section className="pb-26">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <Eyebrow className="mx-auto">Our Approach</Eyebrow>
            <h2 className="mb-3.5 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-[2.6rem]">
              Straightforward engineering. No vendor lock-in.
            </h2>
            <p className="text-[1.05rem] text-body">
              We work as an extension of your team — assessing honestly, recommending the right-sized solution,
              and staying accountable after go-live.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {methodSteps.map((step) => (
              <div key={step.num} className="rounded-2xl border border-line-soft bg-panel p-6.5">
                <div className="mb-3.5 font-mono text-xs font-bold text-brand-600">{step.num}</div>
                <h4 className="mb-1.5 text-[1.02rem] font-extrabold text-ink">{step.title}</h4>
                <p className="text-[0.86rem] text-body">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical depth */}
      <section className="bg-panel py-26">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <Eyebrow className="mx-auto">Technical Depth</Eyebrow>
            <h2 className="mb-3.5 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-[2.6rem]">
              Real capability behind every service line.
            </h2>
            <p className="text-[1.05rem] text-body">
              Each of our five services is backed by hands-on, tool-level expertise — not a slide deck.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {techDepth.map((card) => (
              <div key={card.title} className="rounded-2xl border border-brand-100 bg-brand-50/40 p-8">
                <span className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-white text-brand-600 shadow-[0_1px_3px_rgba(20,10,50,0.06)]">
                  <Icon name={card.icon} className="h-5 w-5" />
                </span>
                <h3 className="mb-1 text-[1.05rem] font-extrabold text-ink">{card.title}</h3>
                <p className="mb-4 text-[0.82rem] text-brand-600">{card.sub}</p>
                <ul className="flex flex-col gap-2">
                  {card.items.map((item) => (
                    <li key={item} className="flex items-start gap-2 text-[0.86rem] text-ink-soft">
                      <Icon name="check" className="mt-0.5 h-3.5 w-3.5 flex-none text-brand-500" strokeWidth={2.5} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
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
              Every engagement is built around quantifiable results — faster response, lower risk, stronger
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
