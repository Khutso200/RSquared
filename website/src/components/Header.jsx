import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { NavLink, useLocation } from 'react-router-dom'
import Logo from './Logo'
import Icon from './Icon'
import Button from './Button'

const links = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' },
]

const navLinkClasses = ({ isActive }) =>
  `relative rounded-lg px-4 py-2.5 text-[0.92rem] font-semibold transition-colors ${
    isActive ? 'text-brand-600' : 'text-ink-soft hover:bg-brand-50 hover:text-brand-600'
  }`

export default function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
  }, [open])

  return (
    <>
      <header className="sticky top-0 z-50 border-b border-line-soft bg-white/85 backdrop-blur-lg">
        <div className="mx-auto flex h-[76px] max-w-6xl items-center justify-between px-6">
          <NavLink to="/" aria-label="RSquared IT Technologies home page">
            <Logo />
          </NavLink>

          <nav className="hidden items-center gap-1 md:flex">
            {links.map((link) => (
              <NavLink key={link.to} to={link.to} end={link.to === '/'} className={navLinkClasses}>
                {({ isActive }) => (
                  <>
                    {link.label}
                    {isActive && <span className="absolute inset-x-4 -bottom-px h-0.5 rounded bg-brand-500" />}
                  </>
                )}
              </NavLink>
            ))}
            <Button to="/contact" className="ml-2.5 px-5.5 py-2.5 text-sm">
              Get a Quote
            </Button>
          </nav>

          <button
            type="button"
            className="p-2 text-ink md:hidden"
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <Icon name="menu" className="h-6 w-6" />
          </button>
        </div>
      </header>

      {open &&
        createPortal(
          <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center gap-7 bg-white/98 backdrop-blur-xl md:hidden">
            <button
              type="button"
              className="absolute top-6 right-6 text-muted"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <Icon name="close" className="h-8 w-8" />
            </button>
            {links.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  `text-2xl font-bold ${isActive ? 'text-brand-600' : 'text-ink'}`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <Button to="/contact" className="mt-2">
              Get a Quote
            </Button>
          </div>,
          document.body,
        )}
    </>
  )
}
