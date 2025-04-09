// import EmptyLayout from '@/layouts/EmptyLayout'

// =========================< IMPORTS: REACT >=================================
import { Outlet } from 'react-router-dom'

export default function EmptyLayout() {
  return (
    <div className='App'>
      <Outlet />
    </div>
  )
}

