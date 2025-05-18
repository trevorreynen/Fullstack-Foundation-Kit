// import Error404 from '@/pages/Error404/Error404'

// ====================< IMPORTS: REACT >=================================
import { useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Button, Typography } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function Error404() {
  // React router navigate hook.
  const navigate = useNavigate()

  // Render error 404 page.
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '100%', px: 3, textAlign: 'center' }}>


      <Typography variant='h1' fontWeight={700} fontSize={{ xs: '64px', md: '96px' }}>404</Typography>
      <Typography variant='h5' fontWeight={500} mb={2}>Page Not Found</Typography>
      <Typography variant='body1' color='text.secondary' mb={4}>The page you're looking for doesn't exist or has been moved.</Typography>
      <Button variant='contained' onClick={() => navigate('/')} sx={{ fontWeight: 600 }}>Go to Home</Button>


    </Box>
  )
}
