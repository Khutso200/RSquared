export default function EngagementLoop({ steps, index, onSelect, onPause, className = '' }) {
  const step = steps[index]

  return (
    <div
      className={`rounded-2xl border border-white/10 bg-[#0f0f14]/90 p-6 backdrop-blur-md ${className}`}
      onMouseEnter={() => onPause?.(true)}
      onMouseLeave={() => onPause?.(false)}
    >
      <div className="mb-4 flex items-center justify-between">
        <span className="font-mono text-[0.68rem] font-bold tracking-[0.1em] text-white/40 uppercase">
          How an engagement runs
        </span>
        <span className="font-mono text-[0.68rem] font-bold text-brand-300">{step.num}</span>
      </div>

      <div key={step.num} className="mb-5 min-h-[4.5rem] animate-[fadeIn_.4s_ease]">
        <h4 className="mb-1 text-[1.05rem] font-bold text-white">{step.title}</h4>
        <p className="text-[0.86rem] leading-relaxed text-white/60">{step.tagline}</p>
      </div>

      <div className="flex items-center gap-1.5">
        {steps.map((s, i) => (
          <button
            key={s.num}
            type="button"
            aria-label={`Show step ${s.num}: ${s.title}`}
            aria-current={i === index}
            onClick={() => onSelect(i)}
            className={`h-1.5 flex-1 rounded-full transition-colors ${i === index ? 'bg-brand-400' : 'bg-white/15 hover:bg-white/25'}`}
          />
        ))}
      </div>
    </div>
  )
}
