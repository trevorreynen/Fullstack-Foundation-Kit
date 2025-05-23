// import MainLayout from '@/layouts/MainLayout'

// ====================< IMPORTS: REACT >=================================
import { Outlet } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import Box from '@mui/material/Box'
import Header from '@/components/layout/Header'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function MainLayout() {
  return (
    <Box className='App' sx={{ width: '100%', height: '100%' }}>


      <Header />

      <Box className='App-Wrapper' sx={{ width: '100%', height: '100%' }}>
        <Outlet />
      </Box>


    </Box>
  )
}
