import { useState } from 'react'
import Eyebrow from '../components/Eyebrow'
import Icon from '../components/Icon'
import { services } from '../data/services'

const initialForm = { name: '', company: '', email: '', phone: '', service: '', message: '' }

export default function Contact() {
  const [form, setForm] = useState(initialForm)

  const update = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const body =
      `Name: ${form.name}\n` +
      `Email: ${form.email}\n` +
      `Company: ${form.company || 'N/A'}\n` +
      `Phone: ${form.phone || 'N/A'}\n` +
      `Service: ${form.service || 'N/A'}\n\n` +
      `Message:\n${form.message}`

    window.location.href = `mailto:infor@rsquaredit.com?subject=${encodeURIComponent(
      `New Enquiry from ${form.name}`,
    )}&body=${encodeURIComponent(body)}`

    setTimeout(() => {
      alert('Thank you! Your email client has opened. We will respond within one business day.')
      setForm(initialForm)
    }, 400)
  }

  const inputClasses =
    'w-full rounded-[10px] border border-line bg-[#faf9fc] px-3.5 py-3 text-[0.92rem] text-ink transition-colors focus:border-brand-500 focus:bg-white focus:outline-none'

  return (
    <>
      <div className="border-b border-line-soft bg-[#faf9fc] py-16 text-center">
        <div className="mx-auto max-w-6xl px-6">
          <Eyebrow className="mx-auto">Contact Us</Eyebrow>
          <h1 className="mb-3.5 text-balance text-4xl font-extrabold tracking-tight text-ink sm:text-5xl">
            Let's build <span className="text-muted">together.</span>
          </h1>
          <p className="mx-auto max-w-lg text-[1.02rem] text-body">
            Tell us about your infrastructure challenge and we'll come back with a clear, actionable plan.
          </p>
        </div>
      </div>

      <section className="py-16 pb-27.5">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <h2 className="mb-3 text-3xl font-extrabold tracking-tight text-ink">Get in touch.</h2>
            <p className="mb-8 text-body">
              Tell us about your project, infrastructure challenges, or security concerns. We'll respond within
              one business day with an initial assessment and recommended next steps.
            </p>

            <ContactItem icon="mail" label="Email">
              <a href="mailto:infor@rsquaredit.com" className="font-semibold text-ink hover:text-brand-600">
                infor@rsquaredit.com
              </a>
            </ContactItem>
            <ContactItem icon="phone" label="Phone">
              <a href="tel:+27684301721" className="font-semibold text-ink hover:text-brand-600">
                +27 68 430 1721
              </a>
            </ContactItem>
            <ContactItem icon="pin" label="Location">
              <p className="font-semibold text-ink">Johannesburg, South Africa</p>
            </ContactItem>
            <ContactItem icon="clock" label="Response Time">
              <p className="font-semibold text-ink">Within 1 business day</p>
            </ContactItem>
          </div>

          <div className="rounded-[20px] border border-line bg-white p-10 shadow-[0_8px_24px_rgba(40,20,90,0.08)]">
            <h3 className="mb-5.5 text-[1.2rem] font-extrabold text-ink">Send us a message</h3>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full Name">
                  <input required type="text" value={form.name} onChange={update('name')} className={inputClasses} />
                </Field>
                <Field label="Company">
                  <input type="text" value={form.company} onChange={update('company')} className={inputClasses} />
                </Field>
              </div>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Email">
                  <input required type="email" value={form.email} onChange={update('email')} className={inputClasses} />
                </Field>
                <Field label="Phone">
                  <input type="tel" value={form.phone} onChange={update('phone')} className={inputClasses} />
                </Field>
              </div>
              <Field label="Service of Interest">
                <select value={form.service} onChange={update('service')} className={inputClasses}>
                  <option value="">Select a service</option>
                  {services.map((s) => (
                    <option key={s.slug} value={s.name}>{s.name}</option>
                  ))}
                  <option value="Not sure yet">Not sure yet</option>
                </select>
              </Field>
              <Field label="Message">
                <textarea
                  required
                  value={form.message}
                  onChange={update('message')}
                  placeholder="Tell us about your environment and what you need..."
                  className={`${inputClasses} min-h-[110px] resize-y`}
                />
              </Field>
              <button
                type="submit"
                className="mt-1 w-full rounded-[10px] bg-brand-500 py-3.5 text-[0.95rem] font-bold text-white shadow-[0_6px_20px_rgba(124,58,237,0.28)] transition-all hover:-translate-y-0.5 hover:bg-brand-600 hover:shadow-[0_10px_26px_rgba(124,58,237,0.36)]"
              >
                Send Message
              </button>
              <p className="text-center text-xs text-muted">We typically respond within one business day.</p>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

function ContactItem({ icon, label, children }) {
  return (
    <div className="mb-6 flex items-start gap-4">
      <span className="flex h-10.5 w-10.5 flex-none items-center justify-center rounded-[11px] border border-line bg-panel text-brand-500">
        <Icon name={icon} className="h-4.5 w-4.5" />
      </span>
      <div>
        <div className="mb-0.5 text-xs font-bold tracking-[0.05em] text-muted uppercase">{label}</div>
        {children}
      </div>
    </div>
  )
}

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-[0.82rem] font-bold text-ink-soft">{label}</span>
      {children}
    </label>
  )
}
