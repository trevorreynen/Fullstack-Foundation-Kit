// import About from '@/pages/About/About'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Typography, Link, Divider } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function About() {
  // Render about page.
  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', px: 3, py: 6 }}>


      <Typography variant='h4' fontWeight={600} gutterBottom>About This Project</Typography>
      <Typography variant='body1' sx={{ mb: 3 }}>This website is a personal fullstack project designed and developed entirely from scratch using React on the frontend and Express with MySQL on the backend. The goal was to build a clean, secure, and scalable user-authenticated platform that supports posts, threaded comments, user profiles, and customizable settings.</Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant='h6' fontWeight={500} gutterBottom>Tech Stack & UI</Typography>
      <Typography variant='body1' sx={{ mb: 2 }}>
        The frontend is built using React and TypeScript, styled entirely with{' '}
        <Link href='https://mui.com' target='_blank' rel='noopener noreferrer'>Material UI (MUI)</Link>{' '}
        — a modern React UI framework that provides accessible, responsive, and consistent components.
      </Typography>
      <Typography variant='body1' sx={{ mb: 3 }}>Backend services are handled with Node.js, Express, Sequelize ORM, and a MySQL database. Authentication is powered by JWT, and all user-related features are protected via middleware.</Typography>

      <Divider sx={{ my: 4 }} />

      <Typography variant='h6' fontWeight={500} gutterBottom>Credits & Open Source Acknowledgments</Typography>
      <Typography variant='body2' color='text.secondary'>This project is powered by open source software. All icons, UI components, and utilities used are either part of MUI or fall under permissive licenses. Previously used icon collections have been replaced by MUI components.</Typography>


    </Box>
  )
}
