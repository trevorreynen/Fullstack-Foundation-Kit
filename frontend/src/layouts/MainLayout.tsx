// import MainLayout from '@/layouts/MainLayout'

// =========================< IMPORTS: REACT >=================================
import { Outlet } from 'react-router-dom'

// =========================< IMPORTS: OTHER >=================================
import { useGlobalUI } from '@/hooks/useGlobalUI'

// =========================< IMPORTS: COMPONENTS >============================
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'


export default function MainLayout() {
  const { sidebarState } = useGlobalUI()

  return (
    <div className='App'>
      <Header />

      <div className={`App-Wrapper ${sidebarState}`}>
        <Sidebar />

        <div className='Router-Wrapper'>
          <Outlet />
        </div>
      </div>

    </div>
  )
}

