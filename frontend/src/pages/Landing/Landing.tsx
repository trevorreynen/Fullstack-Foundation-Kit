// =========================< IMPORTS: REACT >=================================


// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================


// =========================< IMPORTS: COMPONENTS >============================
import PublicHeader from '@/components/PublicHeader/PublicHeader'

// =========================< IMPORTS: STYLES >================================
import './Landing.scss'


export default function Landing() {
  return (
    <div className='Landing'>


      <PublicHeader />

      <div className='content'>
        <p>Hello! This is the Landing Page!</p>
      </div>


    </div>
  )
}

