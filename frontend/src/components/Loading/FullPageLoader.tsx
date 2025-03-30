// import FullPageLoader from '@/components/Loading/FullPageLoader'

// =========================< IMPORTS: CSS >===================================
import './FullPageLoader.scss'

/** W.I.P. (I have yet to properly test this.
 * A full-screen loading UI used during initial page loads, route transitions,
 * or waiting for async data.
 */
export default function FullPageLoader() {
  return (
    <div className='FullPageLoader'>
      <div className='loader-spinner' />
    </div>
  )
}
