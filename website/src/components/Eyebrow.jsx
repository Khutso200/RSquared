export default function Eyebrow({ children, className = '' }) {
  return (
    <div
      className={`inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3.5 py-1.5 font-mono text-xs font-semibold tracking-[0.12em] text-brand-600 uppercase ${className}`}
    >
      <span className="h-1.5 w-1.5 flex-none rounded-full bg-brand-500" />
      {children}
    </div>
  )
}
