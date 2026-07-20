import Icon from './Icon'

export default function ImagePlaceholder({ label = 'Add photo', className = '' }) {
  return (
    <div
      className={`flex flex-col items-center justify-center gap-3 rounded-2xl border-2 border-dashed border-white/15 bg-gradient-to-br from-white/[0.06] to-white/[0.02] text-white/40 ${className}`}
    >
      <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-white/50">
        <Icon name="image" className="h-6 w-6" />
      </span>
      <span className="font-mono text-[0.7rem] font-semibold tracking-[0.08em] uppercase">{label}</span>
    </div>
  )
}
