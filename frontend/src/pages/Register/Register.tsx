// import Register from '@/pages/Register/Register'

// ====================< IMPORTS: REACT >=================================
import { useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box } from '@mui/material'
import AuthForm from '@/components/auth/AuthForm'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function Register() {
  // React router navigate hook.
  const navigate = useNavigate()

  // Form submission handler for creating a new user account.
  const handleSubmit = async (values: { identifier: string, email: string, password: string, confirmPassword: string }) => {
    try {
      const res = await api('/auth/register', {
        method: 'POST',
        body: { username: values.identifier, email: values.email, password: values.password }
      })

      navigate('/login')

      return null
    } catch (err: any) {
      return err?.message || 'Registration failed.'
    }
  }


  // Render register page.
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>


      <AuthForm
        title='Register'
        fields={[
          { key: 'identifier', label: 'Username', required: true },
          { key: 'email', label: 'Email', required: true },
          { key: 'password', label: 'Password', type: 'password', required: true },
          { key: 'confirmPassword', label: 'Confirm Password', type: 'password', required: true },
        ]}
        onSubmit={handleSubmit}
        submitText='Create Account'
        footer={<p>Already have an account?{' '}<button type='button' className='footer-btn' onClick={() => navigate('/login')}>Sign in here</button></p>}
      />


    </Box>
  )
}
