const GLOW_PALETTE = [
  [124, 58, 237], // violet-500
  [59, 130, 246], // blue-500
  [45, 212, 191], // teal-400
  [99, 102, 241], // indigo-500
  [34, 211, 238], // cyan-400
  [147, 51, 234], // purple-600
  [56, 189, 248], // sky-400
]

export default function GlowText({ text, className = '' }) {
  const words = text.split(' ')

  const spans = words.map((word, i) => {
    const [r, g, b] = GLOW_PALETTE[i % GLOW_PALETTE.length]
    return (
      <span
        key={`${word}-${i}`}
        className={`glow-word ${className}`}
        style={{ '--glow-color': `${r}, ${g}, ${b}`, animationDelay: `${i * 0.18}s` }}
      >
        {word}
      </span>
    )
  })

  return spans.reduce((acc, el) => (acc.length ? [...acc, ' ', el] : [el]), [])
}
