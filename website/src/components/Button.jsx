import { Link } from 'react-router-dom'

const variants = {
  primary:
    'bg-brand-500 text-white shadow-[0_6px_20px_rgba(124,58,237,0.28)] hover:bg-brand-600 hover:-translate-y-0.5 hover:shadow-[0_10px_26px_rgba(124,58,237,0.36)]',
  outline:
    'bg-white text-ink border border-line hover:border-brand-500 hover:text-brand-600 hover:-translate-y-0.5',
  outlineOnDark:
    'bg-white text-brand-600 border border-white hover:bg-brand-50',
  ghostOnDark:
    'bg-white/15 text-white border border-white/40 hover:bg-white/25',
}

const base =
  'inline-flex items-center justify-center gap-2 rounded-[10px] px-7 py-3.5 text-[0.95rem] font-bold whitespace-nowrap transition-all duration-150 cursor-pointer'

export default function Button({ to, href, onClick, type = 'button', variant = 'primary', className = '', children }) {
  const classes = `${base} ${variants[variant]} ${className}`

  if (to) {
    return (
      <Link to={to} className={classes} onClick={onClick}>
        {children}
      </Link>
    )
  }
  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  )
}
