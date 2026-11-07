import { useState } from 'react'
import FloatingBackground from './components/FloatingBackground'
import ProgressBar from './components/ProgressBar'
import WelcomeStep from './components/steps/WelcomeStep'
import RequestStep from './components/steps/RequestStep'
import ScheduleStep from './components/steps/ScheduleStep'
import VerifyStep from './components/steps/VerifyStep'
import ConfirmStep from './components/steps/ConfirmStep'
import ClosingStep from './components/steps/ClosingStep'
import './App.css'

const TOTAL_STEPS = 6

function App() {
  const [step, setStep] = useState(1)
  const [selections, setSelections] = useState(() => {
    let defaultTz = 'UTC'
    try {
      defaultTz = Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'
    } catch {
      defaultTz = 'UTC'
    }
    return {
      date: null,
      time: null,
      duration: null,
      timezone: defaultTz,
      interests: [],
    }
  })

  const goNext = () => setStep(s => Math.min(s + 1, TOTAL_STEPS))

  const updateSelections = (patch) =>
    setSelections(prev => ({ ...prev, ...patch }))

  return (
    <div className="app-shell">
      <FloatingBackground />
      <div className="app-content">
        {step > 1 && (
          <ProgressBar currentStep={step} totalSteps={TOTAL_STEPS} />
        )}
        <div className="step-wrapper" key={step}>
          {step === 1 && <WelcomeStep onAccept={goNext} />}
          {step === 2 && <RequestStep onNext={goNext} />}
          {step === 3 && (
            <ScheduleStep
              selections={selections}
              onUpdate={updateSelections}
              onNext={goNext}
            />
          )}
          {step === 4 && (
            <VerifyStep
              selections={selections}
              onUpdate={updateSelections}
              onNext={goNext}
            />
          )}
          {step === 5 && (
            <ConfirmStep
              selections={selections}
              onNext={goNext}
            />
          )}
          {step === 6 && <ClosingStep />}
        </div>
      </div>
    </div>
  )
}

export default App
