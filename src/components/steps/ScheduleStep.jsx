import { useState, useMemo, useEffect } from 'react'
import { Calendar, Clock, ArrowRight, ChevronLeft, ChevronRight, Globe } from 'lucide-react'
import './ScheduleStep.css'

// Common timezones list
const TIMEZONES = [
  'Asia/Kabul',
  'Asia/Tehran',
  'Asia/Baku',
  'Asia/Dubai',
  'Asia/Karachi',
  'Asia/Kolkata',
  'Asia/Dhaka',
  'Asia/Bangkok',
  'Asia/Singapore',
  'Asia/Tokyo',
  'Europe/London',
  'Europe/Paris',
  'Europe/Berlin',
  'Europe/Istanbul',
  'America/New_York',
  'America/Chicago',
  'America/Denver',
  'America/Los_Angeles',
  'America/Toronto',
  'America/Sao_Paulo',
  'Australia/Sydney',
  'Pacific/Auckland',
  'UTC',
]

// Generate available dates (next 14 days, excluding today)
function getAvailableDates() {
  const today = new Date()
  const dates = []
  for (let i = 1; i <= 14; i++) {
    const d = new Date(today)
    d.setDate(today.getDate() + i)
    // Skip Sundays (0) for demo availability
    if (d.getDay() !== 0) {
      dates.push(d)
    }
  }
  return dates
}

// Sample time slots by day-of-week
function getTimeSlots(date) {
  if (!date) return []
  const dow = date.getDay()
  if (dow === 6) {
    // Saturday - fewer slots
    return ['10:00 AM', '11:00 AM', '12:00 PM', '2:00 PM']
  }
  return ['9:00 AM', '10:00 AM', '11:00 AM', '1:00 PM', '2:00 PM', '3:00 PM', '4:30 PM', '5:00 PM']
}

const DURATIONS = [
  { value: 15, label: '15 Minutes', emoji: '⚡' },
  { value: 20, label: '20 Minutes', emoji: '☕' },
  { value: 30, label: '30 Minutes', emoji: '📚' },
]

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']

function formatDate(d) {
  if (!d) return ''
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`
}

export default function ScheduleStep({ selections, onUpdate, onNext }) {
  const availableDates = getAvailableDates()
  const [weekOffset, setWeekOffset] = useState(0)

  // Detect user's timezone on first render
  const detectedTz = useMemo(() => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    } catch {
      return 'UTC'
    }
  }, [])

  const { date, time, duration, timezone = detectedTz } = selections

  // Safely ensure timezone is initialized in parent selections
  useEffect(() => {
    if (!selections.timezone) {
      onUpdate({ timezone: detectedTz })
    }
  }, [detectedTz, selections.timezone, onUpdate])

  const timeSlots = getTimeSlots(date)

  // Show 7 dates per page
  const pageStart = weekOffset * 7
  const visibleDates = availableDates.slice(pageStart, pageStart + 7)
  const canPrev = weekOffset > 0
  const canNext = pageStart + 7 < availableDates.length

  const isComplete = date && time && duration && timezone

  return (
    <div className="schedule-step">
      <div className="card schedule-card">
        <div className="schedule-art" aria-hidden="true">
          <span className="art-cal">📅</span>
          <span className="art-sp1">✨</span>
          <span className="art-sp2">⭐</span>
        </div>

        <div className="section-label">
          <Calendar size={14} />
          Schedule
        </div>

        <h2 className="schedule-heading">Let's Find a Convenient Time!</h2>
        <p className="schedule-desc">Choose a time that works best for you. No rush! 🌸</p>

        {/* ── Date picker ── */}
        <div className="schedule-section">
          <div className="schedule-section-title">
            <span className="ss-icon">📅</span>
            <span>Pick a Date</span>
          </div>

          <div className="date-nav">
            <button
              className="nav-arrow"
              onClick={() => setWeekOffset(w => w - 1)}
              disabled={!canPrev}
              aria-label="Previous dates"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="date-grid">
              {visibleDates.map((d, i) => {
                const isSelected = date && d.toDateString() === date.toDateString()
                return (
                  <button
                    key={i}
                    className={`date-btn ${isSelected ? 'selected' : ''}`}
                    onClick={() => { onUpdate({ date: d, time: null }) }}
                    aria-label={formatDate(d)}
                    aria-pressed={isSelected}
                  >
                    <span className="date-day">{DAYS[d.getDay()]}</span>
                    <span className="date-num">{d.getDate()}</span>
                    <span className="date-mon">{MONTHS[d.getMonth()].slice(0, 3)}</span>
                  </button>
                )
              })}
            </div>

            <button
              className="nav-arrow"
              onClick={() => setWeekOffset(w => w + 1)}
              disabled={!canNext}
              aria-label="Next dates"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* ── Time slots ── */}
        <div className={`schedule-section ${!date ? 'dimmed' : ''}`}>
          <div className="schedule-section-title">
            <span className="ss-icon">🕐</span>
            <span>Available Times {date ? `— ${formatDate(date)}` : ''}</span>
          </div>

          {!date && (
            <p className="pick-first">Please select a date first 👆</p>
          )}

          {date && (
            <div className="time-grid">
              {timeSlots.map((slot) => (
                <button
                  key={slot}
                  className={`time-btn ${time === slot ? 'selected' : ''}`}
                  onClick={() => onUpdate({ time: slot })}
                  aria-pressed={time === slot}
                >
                  <Clock size={13} />
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* ── Duration ── */}
        <div className="schedule-section">
          <div className="schedule-section-title">
            <span className="ss-icon">⏱️</span>
            <span>Meeting Duration</span>
          </div>

          <div className="duration-grid">
            {DURATIONS.map((d) => (
              <button
                key={d.value}
                className={`duration-btn ${duration === d.value ? 'selected' : ''}`}
                onClick={() => onUpdate({ duration: d.value })}
                aria-pressed={duration === d.value}
              >
                <span className="dur-emoji">{d.emoji}</span>
                <span className="dur-label">{d.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* ── Timezone ── */}
        <div className="schedule-section">
          <div className="schedule-section-title">
            <Globe size={14} />
            <span>Your Timezone</span>
          </div>
          <div className="tz-select-wrap">
            <select
              className="tz-select"
              value={timezone}
              onChange={e => onUpdate({ timezone: e.target.value })}
              aria-label="Select your timezone"
            >
              {TIMEZONES.map(tz => (
                <option key={tz} value={tz}>{tz.replace(/_/g, ' ')}</option>
              ))}
              {/* If detected tz isn't in list, still show it */}
              {!TIMEZONES.includes(detectedTz) && (
                <option value={detectedTz}>{detectedTz.replace(/_/g, ' ')} (detected)</option>
              )}
            </select>
            <span className="tz-detected">🌍 Auto-detected: {detectedTz.replace(/_/g, ' ')}</span>
          </div>
        </div>

        {/* Summary + CTA */}
        {isComplete && (
          <div className="schedule-summary">
            <span>📋</span>
            <span>
              <strong>{formatDate(date)}</strong> at <strong>{time}</strong> · <strong>{duration} min</strong>
            </span>
          </div>
        )}

        <div className="schedule-footer">
          <p className="schedule-note">
            <span>💬</span> This collects your preference — no meeting is booked yet.
          </p>
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
