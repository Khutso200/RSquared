export default function Eyebrow({ children, dark = false, className = '' }) {
  const theme = dark
    ? 'border-white/15 bg-white/10 text-brand-300'
    : 'border-brand-100 bg-brand-50 text-brand-600'

  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1.5 font-mono text-xs font-semibold tracking-[0.12em] uppercase ${theme} ${className}`}
    >
      <span className={`h-1.5 w-1.5 flex-none rounded-full ${dark ? 'bg-brand-400' : 'bg-brand-500'}`} />
      {children}
    </div>
  )
}
