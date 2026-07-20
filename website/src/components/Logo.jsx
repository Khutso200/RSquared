export default function Logo({ dark = false, iconOnly = false }) {
  return (
    <span className="flex items-center gap-3">
      <svg viewBox="0 0 100 100" className="h-10 w-10 flex-none" xmlns="http://www.w3.org/2000/svg">
        <polygon
          points="50,4 92,27 92,73 50,96 8,73 8,27"
          fill={dark ? '#241a38' : '#f3eefc'}
          stroke={dark ? '#a855f7' : '#7c3aed'}
          strokeWidth="6"
        />
        <text
          x="50"
          y="62"
          textAnchor="middle"
          fontFamily="Arial, Helvetica, sans-serif"
          fontWeight="800"
          fontSize="34"
          fill={dark ? '#e8e0f7' : '#0f0f14'}
        >
          R<tspan fontSize="20" dy="-14">2</tspan>
        </text>
      </svg>
      {!iconOnly && (
        <span className="flex flex-col leading-tight text-left">
          <span className={`text-[1.12rem] font-extrabold tracking-tight ${dark ? 'text-white' : 'text-ink'}`}>
            RSquared
          </span>
          <span className={`font-mono text-[0.56rem] font-bold tracking-[0.16em] ${dark ? 'text-brand-400' : 'text-brand-500'}`}>
            IT TECHNOLOGIES
          </span>
        </span>
      )}
    </span>
  )
}
