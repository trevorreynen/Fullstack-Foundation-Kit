// import MainLayout from '@/layouts/MainLayout'

// ====================< IMPORTS: REACT >=================================
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import Header from '@/components/Header/Header'
import Sidebar from '@/components/Sidebar/Sidebar'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { SidebarState } from '@/contexts/GlobalUIContext'
import { useGlobalUI } from '@/hooks/useGlobalUI'
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function MainLayout() {
  const { user } = useUser()
  const { setSidebarState, sidebarState } = useGlobalUI()

  useEffect(() => {
    if (!user) {
      setSidebarState(SidebarState.Hidden)
    }
  }, [user])


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

