import './ProgressBar.css'

const STEP_LABELS = [
  { icon: '👋', label: 'Welcome' },
  { icon: '💡', label: 'Request' },
  { icon: '📅', label: 'Schedule' },
  { icon: '🎯', label: 'Verify' },
  { icon: '🎉', label: 'Confirm' },
  { icon: '✨', label: 'Thanks' },
]

export default function ProgressBar({ currentStep, totalSteps }) {
  return (
    <nav className="progress-nav" aria-label="Step progress">
      <div className="progress-steps">
        {STEP_LABELS.slice(0, totalSteps).map((s, idx) => {
          const stepNum = idx + 1
          const isDone = stepNum < currentStep
          const isActive = stepNum === currentStep
          return (
            <div key={stepNum} className={`progress-step ${isDone ? 'done' : ''} ${isActive ? 'active' : ''}`}>
              <div className="step-dot" aria-current={isActive ? 'step' : undefined}>
                {isDone ? <span className="check">✓</span> : <span className="step-icon">{s.icon}</span>}
              </div>
              <span className="step-label">{s.label}</span>
              {stepNum < totalSteps && (
                <div className={`connector ${isDone ? 'done' : ''}`} />
              )}
            </div>
          )
        })}
      </div>
      <div className="progress-bar-track">
        <div
          className="progress-bar-fill"
          style={{ width: `${((currentStep - 1) / (totalSteps - 1)) * 100}%` }}
        />
      </div>
    </nav>
  )
}
