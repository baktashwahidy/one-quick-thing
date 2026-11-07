import { ArrowRight } from 'lucide-react'
import './VerifyStep.css'

const STICKERS = [
  { emoji: '☕', label: 'Coffee' },
  { emoji: '🐱', label: 'Cats' },
  { emoji: '🎨', label: 'Art' },
  { emoji: '🎵', label: 'Music' },
  { emoji: '📚', label: 'Books' },
  { emoji: '🦋', label: 'Butterflies' },
  { emoji: '🌸', label: 'Flowers' },
  { emoji: '🌿', label: 'Nature' },
  { emoji: '🎮', label: 'Games' },
  { emoji: '📷', label: 'Photography' },
  { emoji: '🍓', label: 'Strawberries' },
  { emoji: '🌙', label: 'Night Sky' },
]

const MAX = 3

export default function VerifyStep({ selections, onUpdate, onNext }) {
  const { interests } = selections

  const toggle = (label) => {
    const isSelected = interests.includes(label)
    if (isSelected) {
      onUpdate({ interests: interests.filter(i => i !== label) })
    } else if (interests.length < MAX) {
      onUpdate({ interests: [...interests, label] })
    }
  }

  const count = interests.length
  const isComplete = count === MAX

  return (
    <div className="verify-step">
      <div className="card verify-card">
        <div className="verify-art" aria-hidden="true">
          <span className="va-main">🎯</span>
          <span className="va-sp1">✨</span>
          <span className="va-sp2">⭐</span>
          <span className="va-sp3">💫</span>
        </div>

        <div className="section-label">
          <span>🎯</span> Human Verification
        </div>

        <h2 className="verify-heading">One Last Little Challenge!</h2>
        <p className="verify-desc">
          Select exactly <strong>THREE things</strong> you like. 🌟
        </p>

        {/* Counter */}
        <div className="verify-counter" aria-live="polite" aria-atomic="true">
          <div className="counter-dots">
            {[0, 1, 2].map(i => (
              <span key={i} className={`counter-dot ${i < count ? 'filled' : ''}`} />
            ))}
          </div>
          <span className="counter-label">
            {count === 0 && 'Nothing selected yet — pick 3!'}
            {count === 1 && '1 of 3 selected — keep going!'}
            {count === 2 && '2 of 3 selected — one more!'}
            {count === 3 && "Perfect! You've selected 3 🎉"}
          </span>
        </div>

        {/* Sticker grid */}
        <div className="sticker-grid" role="group" aria-label="Select 3 interests">
          {STICKERS.map((s, i) => {
            const isSelected = interests.includes(s.label)
            const isDisabled = !isSelected && count >= MAX
            return (
              <button
                key={s.label}
                className={`sticker-btn ${isSelected ? 'selected' : ''} ${isDisabled ? 'disabled-sticker' : ''}`}
                onClick={() => toggle(s.label)}
                aria-pressed={isSelected}
                aria-label={s.label}
                disabled={isDisabled && !isSelected}
                style={{ animationDelay: `${i * 0.055}s` }}
              >
                <span className="sticker-emoji">{s.emoji}</span>
                <span className="sticker-label">{s.label}</span>
                {isSelected && <span className="sticker-check" aria-hidden="true">✓</span>}
              </button>
            )
          })}
        </div>

        <div className="verify-footer">
          <button
            className="btn-primary"
            onClick={onNext}
            disabled={!isComplete}
            aria-disabled={!isComplete}
          >
            Continue
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  )
}

