// =========================< IMPORTS: REACT >=================================


// =========================< IMPORTS: LAYOUT >================================


// =========================< IMPORTS: OTHER >=================================


// =========================< IMPORTS: COMPONENTS >============================
import Header from '@/components/Header/Header'

// =========================< IMPORTS: STYLES >================================
import './Landing.scss'


export default function Landing() {
  return (
    <div className='Landing'>


      <Header />

      <div className='content'>
        <p>Hello! This is the Landing Page!</p>
      </div>


    </div>
  )
}

