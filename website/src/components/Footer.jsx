import { Link } from 'react-router-dom'
import Logo from './Logo'
import { services } from '../data/services'

export default function Footer() {
  return (
    <footer className="bg-[#0f0f14] pt-16 pb-7 text-[#c7c7d1]">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr_1fr]">
          <div>
            <Link to="/" className="mb-4 inline-flex">
              <Logo dark />
            </Link>
            <p className="max-w-[280px] text-sm leading-relaxed text-[#8f8f9c]">
              Network consultation, security consultation, infrastructure, penetration testing, and ICT
              hardware &amp; software — from Johannesburg, South Africa.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-[0.82rem] font-bold tracking-[0.06em] text-white uppercase">Navigation</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link to="/" className="text-sm text-[#9a9aa8] hover:text-brand-400">Home</Link></li>
              <li><Link to="/services" className="text-sm text-[#9a9aa8] hover:text-brand-400">Services</Link></li>
              <li><Link to="/about" className="text-sm text-[#9a9aa8] hover:text-brand-400">About</Link></li>
              <li><Link to="/contact" className="text-sm text-[#9a9aa8] hover:text-brand-400">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[0.82rem] font-bold tracking-[0.06em] text-white uppercase">Services</h4>
            <ul className="flex flex-col gap-2.5">
              {services.map((s) => (
                <li key={s.slug}>
                  <Link to={`/services#${s.slug}`} className="text-sm text-[#9a9aa8] hover:text-brand-400">
                    {s.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-[0.82rem] font-bold tracking-[0.06em] text-white uppercase">Get in Touch</h4>
            <ul className="flex flex-col gap-2.5">
              <li><a href="mailto:infor@rsquaredit.com" className="text-sm text-[#9a9aa8] hover:text-brand-400">infor@rsquaredit.com</a></li>
              <li><a href="tel:+27684301721" className="text-sm text-[#9a9aa8] hover:text-brand-400">+27 68 430 1721</a></li>
              <li><Link to="/contact" className="text-sm text-[#9a9aa8] hover:text-brand-400">Johannesburg, South Africa</Link></li>
            </ul>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#232330] pt-6">
          <p className="text-[0.82rem] text-[#75758a]">
            &copy; {new Date().getFullYear()} RSquared IT Technologies. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
