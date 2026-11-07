import { Palette, Lightbulb, Monitor, ArrowRight } from 'lucide-react'
import './RequestStep.css'

const FEATURES = [
  {
    icon: <Monitor size={22} />,
    emoji: '🖥️',
    title: 'Website Design',
    desc: 'Visual layout, color palette, and overall aesthetics.',
    color: 'lavender',
  },
  {
    icon: <Lightbulb size={22} />,
    emoji: '💡',
    title: 'Creative Ideas',
    desc: 'Fresh perspectives and innovative suggestions.',
    color: 'sky',
  },
  {
    icon: <Palette size={22} />,
    emoji: '🎨',
    title: 'User Experience',
    desc: 'Navigation flow, usability, and interaction design.',
    color: 'mint',
  },
]

export default function RequestStep({ onNext }) {
  return (
    <div className="request-step">
      <div className="card request-card">
        {/* Top decoration */}
        <div className="request-art" aria-hidden="true">
          <span className="art-cat">🐱</span>
          <span className="art-sparkle sp1">✨</span>
          <span className="art-sparkle sp2">⭐</span>
          <span className="art-sparkle sp3">💫</span>
        </div>

        <div className="section-label">
          <span>💡</span> The Request
        </div>

        <h2 className="request-heading">
          Actually, I Need Your <span className="highlight">Creative Opinion!</span>
        </h2>

        <p className="request-desc">
          I'm currently working on a website project, and I'd love to get your feedback
          on its design, layout, and overall user experience.
        </p>
        <p className="request-desc-2">
          I thought you might have some interesting ideas and perspectives that could
          help me improve it. 🌟
        </p>

        {/* Feature cards */}
        <div className="feature-grid">
          {FEATURES.map((f, i) => (
            <div
              key={i}
              className={`feature-card feature-${f.color}`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              <div className="feature-icon-wrap">
                <span className="feature-emoji">{f.emoji}</span>
              </div>
              <div className="feature-text">
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="request-footer">
          <div className="request-note">
            <span>🕐</span>
            <span>Just 15–30 minutes of your time, that's all!</span>
          </div>
          <button className="btn-primary request-btn" onClick={onNext}>
            Let's Talk!
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

