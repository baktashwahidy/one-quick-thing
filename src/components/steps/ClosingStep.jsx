import { useState } from 'react'
import { Sparkles, CheckCircle, Coffee, Star } from 'lucide-react'
import './ClosingStep.css'

export default function ClosingStep() {
  const [isClosed, setIsClosed] = useState(false)

  const handleFinish = () => {
    setIsClosed(true)
  }

  return (
    <div className="closing-step">
      {/* Floating stars and tiny clouds in background */}
      <div className="closing-decorations" aria-hidden="true">
        <span className="c-cloud cc-1">☁️</span>
        <span className="c-cloud cc-2">☁️</span>
        <span className="c-star cs-1">⭐</span>
        <span className="c-star cs-2">✨</span>
        <span className="c-star cs-3">💫</span>
        <span className="c-confetti cp-1">🌸</span>
        <span className="c-confetti cp-2">🌿</span>
        <span className="c-confetti cp-3">🎨</span>
      </div>

      <div className="card closing-card">
        {!isClosed ? (
          <div className="closing-content active-screen">
            {/* Waving Character Illustration */}
            <div className="waving-hero" aria-label="Cute waving character illustration">
              <div className="hero-aura" />
              <div className="waving-character">
                <span className="character-body">🐱</span>
                <span className="waving-paw" aria-hidden="true">🐾</span>
              </div>
              <div className="floating-accessories">
                <span className="f-sparkle s1">✨</span>
                <span className="f-sparkle s2">⭐</span>
                <span className="f-sparkle s3">💫</span>
                <span className="f-cloud">☁️</span>
              </div>
            </div>

            <div className="closing-badge">
              <Sparkles size={14} />
              <span>Final Note</span>
            </div>

            <h1 className="closing-heading">
              Thank You So Much! <span className="sparkle-emoji">✨</span>
            </h1>

            <p className="closing-subtitle">
              Thank you for taking the time to go through this little experience.
            </p>

            <p className="closing-message">
              I truly appreciate your time and creativity. Looking forward to our conversation!
            </p>

            <div className="friendly-banner">
              <span className="fb-emoji">🌸</span>
              <span className="fb-text">Have a wonderful day!</span>
              <span className="fb-emoji">☕</span>
            </div>

            {/* Final Button */}
            <div className="closing-actions">
              <button
                className="btn-primary finish-btn"
                onClick={handleFinish}
                type="button"
                aria-label="Finish and close the experience"
              >
                <span>Finish &amp; Close</span>
                <Sparkles size={18} />
              </button>
            </div>
          </div>
        ) : (
          /* Clean, minimal closing state */
          <div className="closed-content closed-screen">
            <div className="closed-art" aria-hidden="true">
              <div className="closed-circle">
                <span className="closed-cat">🐱</span>
                <span className="closed-check">✓</span>
              </div>
              <div className="closed-stars">
                <span>✨</span><span>⭐</span><span>✨</span>
              </div>
            </div>

            <h2 className="closed-heading">
              You're awesome. Have a great day!
            </h2>

            <p className="closed-instruction">
              You can safely close this browser tab now.
            </p>

            <div className="closed-pill">
              <Coffee size={15} />
              <span>Everything is set · See you soon</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
