import { useState, useEffect } from 'react'
import { Copy, Check, Video, ArrowRight, Globe, Sparkles } from 'lucide-react'
import { useSubmit } from '../../hooks/useSubmit'
import './ConfirmStep.css'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function formatDate(d) {
  if (!d) return '—'
  if (typeof d === 'string') return d
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`
}

// Confetti particles
function Confetti() {
  const particles = Array.from({ length: 24 }, (_, i) => ({
    emoji: ['✨','⭐','🌸','🦋','🌿','💫','🎨','📚'][i % 8],
    left: `${Math.random() * 90 + 5}%`,
    delay: `${Math.random() * 1.5}s`,
    duration: `${1.5 + Math.random() * 1.5}s`,
    size: `${0.8 + Math.random() * 0.8}rem`,
  }))

  return (
    <div className="confetti-wrap" aria-hidden="true">
      {particles.map((p, i) => (
        <span
          key={i}
          className="confetti-p"
          style={{
            left: p.left,
            fontSize: p.size,
            animation: `confettiFall ${p.duration} ${p.delay} ease-out forwards`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  )
}

export default function ConfirmStep({ selections, onNext }) {
  const { date, time, duration, timezone, interests = [] } = selections
  const [copied, setCopied] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const { status: submitStatus, submit } = useSubmit()

  useEffect(() => {
    // Trigger confetti on mount
    setShowConfetti(true)
    const t = setTimeout(() => setShowConfetti(false), 3000)

    // Automatically submit preferences to Google Apps Script
    submit(selections)

    return () => clearTimeout(t)
  }, [selections, submit])

  const copyText = () => {
    const text = [
      '📅 My Meeting Preferences — One Quick Thing',
      `Date: ${formatDate(date)}`,
      `Time: ${time || '—'}`,
      `Duration: ${duration ? duration + ' minutes' : '—'}`,
      `Timezone: ${timezone || 'Local'}`,
      `My interests: ${interests.join(', ')}`,
      '',
      'Looking forward to our creative chat! ✨',
    ].join('\n')

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2500)
    }).catch(() => {
      window.prompt('Copy this text:', text)
    })
  }

  return (
    <div className="confirm-step">
      {showConfetti && <Confetti />}

      <div className="card confirm-card">
        {/* Celebration art */}
        <div className="confirm-art" aria-hidden="true">
          <div className="confirm-cats">
            <span className="conf-cat main-cat">🐱</span>
            <span className="conf-cat side-cat-l">🐱</span>
            <span className="conf-cat side-cat-r">🐱</span>
          </div>
          <div className="conf-stars">
            <span>✨</span><span>⭐</span><span>💫</span><span>🌸</span><span>✨</span>
          </div>
        </div>

        <div className="confirm-badge-row">
          <div className="confirm-badge">
            <span>🎉</span> You're All Set!
          </div>

          {/* Submission status pill */}
          <div className={`sync-badge sync-${submitStatus}`}>
            {submitStatus === 'loading' && (
              <>
                <span className="sync-spinner" />
                <span>Recording to Google Sheet...</span>
              </>
            )}
            {submitStatus === 'success' && (
              <>
                <span>✓</span>
                <span>Saved to Google Sheet</span>
              </>
            )}
            {submitStatus === 'error' && (
              <>
                <span>✓</span>
                <span>Preferences Ready</span>
              </>
            )}
            {submitStatus === 'idle' && (
              <>
                <span>✨</span>
                <span>Confirmed</span>
              </>
            )}
          </div>
        </div>

        <h2 className="confirm-heading">You're All Set!</h2>

        <p className="confirm-message">
          Thank you for your time! Looking forward to having a creative conversation
          and hearing your ideas. 🌟
        </p>

        {/* Summary cards (Date, Time, Duration, Timezone) */}
        <div className="confirm-details">
          <div className="detail-card">
            <span className="detail-icon">📅</span>
            <div className="detail-text">
              <span className="detail-label">Date</span>
              <span className="detail-value">{formatDate(date)}</span>
            </div>
          </div>
          <div className="detail-card">
            <span className="detail-icon">🕐</span>
            <div className="detail-text">
              <span className="detail-label">Time</span>
              <span className="detail-value">{time || '—'}</span>
            </div>
          </div>
          <div className="detail-card">
            <span className="detail-icon">⏱️</span>
            <div className="detail-text">
              <span className="detail-label">Duration</span>
              <span className="detail-value">{duration ? `${duration} Minutes` : '—'}</span>
            </div>
          </div>
          <div className="detail-card">
            <span className="detail-icon">🌍</span>
            <div className="detail-text">
              <span className="detail-label">Timezone</span>
              <span className="detail-value" title={timezone}>{timezone ? timezone.replace(/_/g, ' ') : 'Local'}</span>
            </div>
          </div>
        </div>

        {/* Interests */}
        <div className="confirm-interests">
          <div className="ci-label">
            <span>🎯</span> Your Selected Interests
          </div>
          <div className="ci-tags">
            {interests.map((interest, i) => {
              const STICKERS = {
                Coffee:'☕', Cats:'🐱', Art:'🎨', Music:'🎵', Books:'📚',
                Butterflies:'🦋', Flowers:'🌸', Nature:'🌿', Games:'🎮',
                Photography:'📷', Strawberries:'🍓', 'Night Sky':'🌙',
              }
              return (
                <span key={i} className="ci-tag" style={{ animationDelay: `${i * 0.12}s` }}>
                  {STICKERS[interest] || '✨'} {interest}
                </span>
              )
            })}
          </div>
        </div>

        {/* Zoom section */}
        <div className="zoom-banner">
          <div className="zoom-icon">
            <Video size={28} />
          </div>
          <div className="zoom-text">
            <strong>See You on Zoom!</strong>
            <span>I'll send a calendar invite once we confirm the time.</span>
          </div>
          <span className="zoom-emoji">🚀</span>
        </div>

        {/* Action buttons */}
        <div className="confirm-footer">
          <div className="confirm-buttons-group">
            <button className="btn-secondary copy-btn" onClick={copyText} type="button">
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? 'Copied!' : 'Copy My Selection'}
            </button>

            {onNext && (
              <button className="btn-primary continue-btn" onClick={onNext} type="button">
                <span>Continue</span>
                <ArrowRight size={18} />
              </button>
            )}
          </div>

          <p className="confirm-note">
            <span>💌</span>
            Your meeting preferences have been recorded.
          </p>
        </div>

        {/* Bottom floating deco */}
        <div className="confirm-bottom-art" aria-hidden="true">
          <span>🌸</span><span>🦋</span><span>⭐</span><span>🌿</span><span>📚</span>
        </div>
      </div>
    </div>
  )
}
