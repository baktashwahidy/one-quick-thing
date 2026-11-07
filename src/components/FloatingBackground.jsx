import './FloatingBackground.css'

const decorations = [
  { emoji: '🌸', style: { top: '8%',  left: '5%',  animationDuration: '6s',  animationDelay: '0s',   fontSize: '2rem', opacity: 0.65 } },
  { emoji: '⭐', style: { top: '15%', right: '8%', animationDuration: '5s',  animationDelay: '1s',   fontSize: '1.4rem', opacity: 0.7 } },
  { emoji: '🦋', style: { top: '30%', left: '3%',  animationDuration: '7s',  animationDelay: '2s',   fontSize: '1.6rem', opacity: 0.6 } },
  { emoji: '☕', style: { top: '55%', right: '5%', animationDuration: '8s',  animationDelay: '0.5s', fontSize: '1.8rem', opacity: 0.6 } },
  { emoji: '📚', style: { top: '72%', left: '7%',  animationDuration: '6s',  animationDelay: '1.5s', fontSize: '1.5rem', opacity: 0.55 } },
  { emoji: '🌙', style: { top: '5%',  left: '50%', animationDuration: '9s',  animationDelay: '3s',   fontSize: '1.6rem', opacity: 0.5 } },
  { emoji: '✨', style: { top: '45%', left: '1%',  animationDuration: '5.5s',animationDelay: '0.8s', fontSize: '1.2rem', opacity: 0.8 } },
  { emoji: '🐱', style: { top: '85%', right: '10%',animationDuration: '7.5s',animationDelay: '2.5s', fontSize: '2rem',  opacity: 0.55 } },
  { emoji: '🌿', style: { top: '65%', left: '94%', animationDuration: '6.5s',animationDelay: '1.2s', fontSize: '1.6rem', opacity: 0.6 } },
  { emoji: '💫', style: { top: '25%', right: '2%', animationDuration: '8s',  animationDelay: '4s',   fontSize: '1.3rem', opacity: 0.65 } },
  { emoji: '🎨', style: { top: '90%', left: '20%', animationDuration: '6s',  animationDelay: '0.3s', fontSize: '1.6rem', opacity: 0.5 } },
  { emoji: '☁️', style: { top: '12%', right: '30%',animationDuration: '10s', animationDelay: '2s',   fontSize: '2.2rem', opacity: 0.4 } },
]

export default function FloatingBackground() {
  return (
    <div className="floating-bg" aria-hidden="true">
      {/* Gradient blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />
      <div className="blob blob-3" />

      {/* Floating emojis */}
      {decorations.map((d, i) => (
        <span
          key={i}
          className="float-deco"
          style={{
            ...d.style,
            animation: `float ${d.style.animationDuration} ease-in-out ${d.style.animationDelay} infinite`,
          }}
        >
          {d.emoji}
        </span>
      ))}
    </div>
  )
}

