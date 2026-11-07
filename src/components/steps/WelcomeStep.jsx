import { useState, useRef, useCallback } from 'react'
import { Sparkles } from 'lucide-react'
import './WelcomeStep.css'

const SHY_MESSAGES = [
  "That button seems a little shy! 🐭",
  "Hmm, trying to click 'Not Now'? 😄",
  "Are you sure? It's just a tiny request! 🌸",
  "The button keeps running away! 😂",
  "Okay, this button needs some motivation! 💪",
  "You're very persistent! Impressive! 🏆",
  "Still trying? This button has stamina! 🏃",
]

export default function WelcomeStep({ onAccept }) {
  const [declinePos, setDeclinePos] = useState({ x: 0, y: 0 })
  const [attemptCount, setAttemptCount] = useState(0)
  const [message, setMessage] = useState('')
  const [showDecline, setShowDecline] = useState(false)
  const btnRef = useRef(null)
  const cooldownRef = useRef(false)

  const getRandomOffset = useCallback(() => {
    const range = Math.min(140 + attemptCount * 15, 280)
    const angle = Math.random() * 2 * Math.PI
    return {
      x: Math.cos(angle) * (range * 0.6 + Math.random() * range * 0.4),
      y: Math.sin(angle) * (range * 0.4 + Math.random() * range * 0.4),
    }
  }, [attemptCount])

  const handleDeclineApproach = useCallback(() => {
    if (cooldownRef.current) return
    cooldownRef.current = true
    setTimeout(() => { cooldownRef.current = false }, 220)

    const { x, y } = getRandomOffset()
    setDeclinePos({ x, y })
    const newCount = attemptCount + 1
    setAttemptCount(newCount)
    setMessage(SHY_MESSAGES[Math.min(newCount - 1, SHY_MESSAGES.length - 1)])
  }, [attemptCount, getRandomOffset])

  const handleDeclineClick = () => {
    // Genuine decline - after many attempts let them actually click it
    if (attemptCount >= 8) {
      setShowDecline(true)
    }
  }

  return (
    <div className="welcome-step">
      {/* Hero illustration */}
      <div className="welcome-hero" aria-hidden="true">
        <div className="hero-cat">🐱</div>
        <div className="hero-coffee">☕</div>
        <div className="hero-stars">
          <span>✨</span><span>⭐</span><span>💫</span>
        </div>
        <div className="hero-cloud">☁️</div>
      </div>

      <div className="card welcome-card">
        <div className="welcome-badge">
          <span>✨</span> One Quick Thing
        </div>

        <h1 className="welcome-heading">
          One Quick Thing<span className="dot">...</span>
        </h1>

        <p className="welcome-subtitle">
          May I borrow a few minutes of your time?
        </p>

        <p className="welcome-desc">
          Don't worry, it's nothing complicated!&nbsp;😊
        </p>

        <div className="welcome-deco-row" aria-hidden="true">
          <span>🌸</span><span>🦋</span><span>📚</span><span>🎨</span><span>🌿</span>
        </div>

        <div className="welcome-buttons">
          <button className="btn-primary welcome-accept" onClick={onAccept}>
            <Sparkles size={18} />
            Sure, Why Not?
          </button>

          {/* Shy decline button */}
          <div className="decline-wrapper" style={{ position: 'relative' }}>
            <button
              ref={btnRef}
              className="btn-secondary decline-btn"
              style={{
                transform: `translate(${declinePos.x}px, ${declinePos.y}px)`,
                transition: 'transform 0.22s cubic-bezier(0.4, 0, 0.2, 1)',
              }}
              onMouseEnter={handleDeclineApproach}
              onFocus={handleDeclineApproach}
              onClick={handleDeclineClick}
              aria-label="Not now — this button moves away playfully. After 8 attempts you can click it."
            >
              Not Now
            </button>
          </div>
        </div>

        {message && (
          <p className="shy-message" key={message}>
            {message}
          </p>
        )}

        {showDecline && (
          <div className="decline-modal" role="dialog" aria-modal="true" aria-label="Decline confirmation">
            <div className="decline-modal-box">
              <span style={{ fontSize: '2.5rem' }}>🐱</span>
              <h3>No worries at all!</h3>
              <p>That's perfectly okay. Have a wonderful day! 🌸</p>
              <button className="btn-primary" onClick={() => setShowDecline(false)}>
                Actually, Let Me See! 😄
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

