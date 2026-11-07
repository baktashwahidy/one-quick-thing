import { useState, useCallback, useRef } from 'react'

const GAS_ENDPOINT =
  'https://script.google.com/macros/s/AKfycbz6xQbTql-TWPBxoaELIelsQOJxVNddpJk9WqBebxiUwnWv0FfZree3Zg_JVMDA-4yE/exec'

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

function formatDate(d) {
  if (!d) return ''
  if (typeof d === 'string') return d
  return `${DAYS[d.getDay()]}, ${MONTHS[d.getMonth()]} ${d.getDate()}`
}

/**
 * useSubmit Hook
 * Submits the user's meeting selections to the Google Apps Script Web App.
 */
export function useSubmit() {
  const [status, setStatus] = useState('idle') // 'idle' | 'loading' | 'success' | 'error'
  const submittedRef = useRef(false)

  const submit = useCallback(async (selections) => {
    if (submittedRef.current) return
    submittedRef.current = true
    setStatus('loading')

    const dateStr = formatDate(selections.date)
    const timeStr = selections.time || ''
    const durationStr = selections.duration ? `${selections.duration} Minutes` : ''
    const timezoneStr = selections.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone || 'UTC'

    // Format interests both as an Array (for (data.interests || []).join()) and as string
    const interestsArray = Array.isArray(selections.interests)
      ? selections.interests
      : (typeof selections.interests === 'string' ? selections.interests.split(', ') : [])
    const interestsString = interestsArray.join(', ')

    // Object matching user's exact Apps Script expectations:
    // data.date, data.time, data.duration, data.interests (array), data.timeZone
    const payloadObj = {
      date: dateStr,
      time: timeStr,
      duration: durationStr,
      interests: interestsArray,
      timeZone: timezoneStr,
      timezone: timezoneStr,
      submittedAt: new Date().toISOString()
    }

    const formParams = new URLSearchParams()
    formParams.append('payload', JSON.stringify(payloadObj))
    formParams.append('date', dateStr)
    formParams.append('time', timeStr)
    formParams.append('duration', durationStr)
    formParams.append('timeZone', timezoneStr)
    formParams.append('timezone', timezoneStr)
    formParams.append('interests', interestsString)

    const fullUrl = `${GAS_ENDPOINT}?${formParams.toString()}`

    try {
      await fetch(fullUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: formParams.toString()
      })

      setStatus('success')
    } catch (err) {
      console.warn('[useSubmit] Submission encountered an error:', err)
      setStatus('error')
    }
  }, [])

  return { status, submit }
}
