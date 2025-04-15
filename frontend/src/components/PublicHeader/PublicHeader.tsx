// import PublicHeader from '@/components/PublicHeader/PublicHeader'

// =========================< IMPORTS: REACT >=================================
import { Link, useLocation } from 'react-router-dom'

// =========================< IMPORTS: CSS >===================================
import './PublicHeader.scss'


export default function PublicHeader() {
  const { pathname } = useLocation()


  return (
    <div className='PublicHeader'>


      <div className='header-left-side-content'>
        <div className='link-wrapper'><Link to='/' className='logo'>Landing Page</Link></div>
      </div>

      <div className='header-right-side-content'>
        {pathname !== '/login' && <div className='link-wrapper'><Link to='/login'>Login</Link></div>}
        {pathname !== '/register' && <div className='link-wrapper'><Link to='/register'>Register</Link></div>}
      </div>


    </div>
  )
}

