import Eyebrow from '../components/Eyebrow'
import Icon from '../components/Icon'

const values = [
  { icon: 'radar', title: 'Engineering Rigour', copy: 'Every solution is designed with industry best practice, tested before deployment and documented for long-term maintainability.' },
  { icon: 'shield', title: 'Security-First Mindset', copy: "Security isn't an add-on — it's embedded in every design, from zero-trust architecture to defence-in-depth strategies." },
  { icon: 'refresh', title: 'Continuous Improvement', copy: 'We monitor, measure and optimise relentlessly — proactive vulnerability management over reactive firefighting.' },
  { icon: 'link', title: 'Transparent Partnership', copy: 'Clear communication, detailed documentation and honest assessments — no upselling, no unnecessary complexity.' },
  { icon: 'award', title: 'Vendor-Neutral Advice', copy: "We're not locked into a single vendor. We recommend the best fit for your requirements, environment and budget." },
  { icon: 'layers', title: 'Knowledge Transfer', copy: "We don't just build and leave. Documentation and hand-over ensure your team can confidently manage what we deploy." },
]

const timeline = [
  { year: 'Foundation', title: 'RSquared IT Technologies Established', copy: 'Founded in Johannesburg, to deliver enterprise network infrastructure and cybersecurity services across South Africa.' },
  { year: 'Certifications', title: 'Industry Certifications Achieved', copy: 'Our engineers earned certifications across network, security and cloud platforms to back every recommendation with verified expertise.' },
  { year: 'Service Expansion', title: 'Five Core Service Lines Defined', copy: 'Formalised our offering around network consultation, security consultation, infrastructure delivery, penetration testing and ICT hardware & software.' },
  { year: 'Client Delivery', title: 'Enterprise Engagements Delivered', copy: 'Delivered network infrastructure rollouts, security assessments and penetration testing engagements for clients across Gauteng.' },
  { year: 'Today', title: 'Growing & Scaling', copy: 'Expanding our engineering team and deepening security capabilities, building long-term partnerships with enterprises across South Africa.' },
]

const certs = [
  { name: 'CCNP Security', vendor: 'Cisco', color: '#7c3aed' },
  { name: 'CCNP Enterprise', vendor: 'Cisco', color: '#16a34a' },
  { name: 'NSE Certified', vendor: 'Fortinet', color: '#a16207' },
  { name: 'CEH', vendor: 'EC-Council', color: '#7c3aed' },
  { name: 'OSCP', vendor: 'Offensive Security', color: '#16a34a' },
  { name: 'ITIL 4 Foundation', vendor: 'PeopleCert', color: '#a16207' },
  { name: 'Security+', vendor: 'CompTIA', color: '#7c3aed' },
  { name: 'MTCNA', vendor: 'MikroTik', color: '#5c5c68' },
]

export default function About() {
  return (
    <>
      <div className="border-b border-line-soft bg-[#faf9fc] py-16 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow className="mx-auto">About Us</Eyebrow>
          <h1 className="mb-3.5 text-balance text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Built by engineers.
            <br />
            <span className="text-muted">Trusted by enterprise.</span>
          </h1>
          <p className="mx-auto max-w-lg text-[1.02rem] text-body">
            The story of RSquared IT Technologies — from hands-on engineering to end-to-end infrastructure
            ownership.
          </p>
        </div>
      </div>

      {/* Story */}
      <section className="py-16">
        <div className="mx-auto grid max-w-6xl grid-cols-1 items-start gap-15 px-6 lg:grid-cols-2">
          <div>
            <h2 className="mb-5 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              Engineering-first,
              <br />
              client-focused.
            </h2>
            <p className="mb-4 text-[0.98rem] leading-relaxed text-body">
              RSquared IT Technologies was founded in Johannesburg, South Africa, with a simple mission: bring
              enterprise-grade network infrastructure and cybersecurity to organisations of every size,
              delivered with the rigour and precision of a hands-on engineering team.
            </p>
            <p className="mb-4 text-[0.98rem] leading-relaxed text-body">
              What sets us apart is depth. We don't just specify and hand over — we consult, design, deploy,
              test and support. From initial network consultation through to penetration testing and hardware
              supply, we stay involved end-to-end so nothing gets lost between the strategy deck and the server
              rack.
            </p>
            <p className="text-[0.98rem] leading-relaxed text-body">
              Our approach combines deep technical certifications with real-world operational experience across
              network engineering, security consulting and infrastructure delivery — so every recommendation
              is grounded in practice, not vendor literature.
            </p>
          </div>

          <div>
            <div className="relative overflow-hidden rounded-[18px] border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-9">
              <div className="mb-3.5 font-mono text-xs font-bold tracking-[0.1em] text-brand-600 uppercase">
                Our Engineering Team
              </div>
              <h3 className="mb-1 text-[1.3rem] font-extrabold text-ink">Our Engineers</h3>
              <div className="mb-4.5 text-sm font-bold text-brand-600">Network, Security &amp; Infrastructure Specialists</div>
              <p className="text-sm leading-relaxed text-body">
                With expertise spanning enterprise networking, firewall and VPN infrastructure, penetration
                testing and ICT procurement, our engineers lead every engagement from initial assessment
                through deployment and support. Our team brings both breadth and hands-on depth to every
                project.
              </p>
            </div>
            <div className="mt-4 rounded-[14px] border border-line-soft bg-panel px-6 py-5.5">
              <p className="mb-1.5 text-sm font-bold text-brand-600">Our Philosophy</p>
              <p className="text-sm leading-relaxed text-body italic">
                "Infrastructure should be resilient by design, security should be proactive not reactive
                and every recommendation should be one we'd make to our own network."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-panel py-25">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <Eyebrow className="mx-auto">Our Values</Eyebrow>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-[2.6rem]">
              What drives everything.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5.5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((v) => (
              <div
                key={v.title}
                className="group rounded-2xl border border-line bg-white p-7 transition-all duration-200 hover:-translate-y-1 hover:border-brand-100 hover:shadow-[0_8px_24px_rgba(40,20,90,0.08)]"
              >
                <span className="mb-4 flex h-12 w-12 items-center justify-center rounded-[13px] border border-brand-100 bg-brand-50 text-brand-600 transition-colors group-hover:border-brand-600 group-hover:bg-brand-500 group-hover:text-white">
                  <Icon name={v.icon} className="h-5.5 w-5.5" />
                </span>
                <h3 className="mb-2 text-[1.02rem] font-extrabold text-ink">{v.title}</h3>
                <p className="text-[0.87rem] leading-relaxed text-body">{v.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-25">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <Eyebrow className="mx-auto">Our Journey</Eyebrow>
            <h2 className="text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-[2.6rem]">
              Milestones &amp; momentum.
            </h2>
          </div>
          <div className="relative mx-auto max-w-2xl">
            <div className="absolute top-1.5 bottom-1.5 left-[15px] w-0.5 bg-gradient-to-b from-brand-500 to-brand-100" />
            <div className="flex flex-col gap-8">
              {timeline.map((item) => (
                <div key={item.year} className="relative flex gap-6">
                  <span className="relative left-2.5 z-10 mt-1.5 h-3 w-3 flex-none rounded-full border-2 border-white bg-brand-500 shadow-[0_0_0_2px_#7c3aed]" />
                  <div className="flex-1 pl-3.5">
                    <div className="mb-1 font-mono text-xs font-bold tracking-[0.06em] text-brand-600 uppercase">{item.year}</div>
                    <div className="mb-1 text-[1.02rem] font-bold text-ink">{item.title}</div>
                    <p className="text-sm leading-relaxed text-body">{item.copy}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Certs */}
      <section className="bg-panel py-25 pb-27.5">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mx-auto mb-14 max-w-xl text-center">
            <Eyebrow className="mx-auto">Credentials</Eyebrow>
            <h2 className="mb-3.5 text-balance text-3xl font-extrabold tracking-tight text-ink sm:text-[2.6rem]">
              Backed by the best.
            </h2>
            <p className="text-[1.05rem] text-body">
              Verified expertise across the industry's most demanding certification programmes.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-4">
            {certs.map((cert) => (
              <div
                key={cert.name}
                className="rounded-[14px] border border-line bg-white p-5 text-center transition-all duration-200 hover:-translate-y-1 hover:border-brand-100 hover:shadow-[0_8px_24px_rgba(40,20,90,0.08)]"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke={cert.color} strokeWidth="1.5" className="mx-auto mb-2.5 h-6.5 w-6.5">
                  <circle cx="12" cy="12" r="9" />
                </svg>
                <div className="mb-0.5 text-[0.84rem] font-bold text-ink-soft">{cert.name}</div>
                <div className="text-[0.72rem] text-muted">{cert.vendor}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
