import { ArrowRight } from 'lucide-react'
import './RequestStep.css'

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
