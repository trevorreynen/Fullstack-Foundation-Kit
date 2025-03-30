// import DelayedFallback from '@/components/Loading/DelayedFallback'

// =========================< IMPORTS: REACT >=================================
import { useEffect, useState } from 'react'

// =========================< IMPORTS: COMPONENTS >============================
import FullPageLoader from './FullPageLoader'


/** W.I.P. (I have yet to properly test this)
 * Shows a fallback UI (like a loader) only after a short delay.
 */
export default function DelayedFallback({ delay = 200 }) {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const timeout = setTimeout(() => setShow(true), delay)

    return () => clearTimeout(timeout)
  }, [delay])

  return show ? <FullPageLoader /> : null
}
