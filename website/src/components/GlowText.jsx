const GLOW_PALETTE = [
  [124, 58, 237], // violet
  [56, 189, 248], // sky
  [236, 72, 153], // pink
  [245, 158, 11], // amber
  [20, 184, 166], // teal
  [99, 102, 241], // indigo
  [244, 63, 94], // rose
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
