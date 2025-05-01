// import Register from '@/pages/Register/Register'

// ====================< IMPORTS: REACT >=================================
import { useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import AuthForm from '@/components/AuthForm/AuthForm'
import { Box } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function Register() {
  // 1. React router navigate hook.
  const navigate = useNavigate()

  // 2. Form submit handler for registering user via API.
  const handleSubmit = async (values: { identifier: string, email: string, password: string, confirmPassword: string }) => {
    try {
      const res = await api('/auth/register', {
        method: 'POST',
        body: { username: values.identifier, email: values.email, password: values.password }
      })

      console.log('Registration success:', res) // TODO: Remove console.log.

      navigate('/login')

      return null
    } catch (err: any) {
      return err?.message || 'Registration failed.'
    }
  }


  // 3. Render register page.
  return (
    // TODO: Decide to keep or remove custom classes when not using custom style sheets.
    <Box className='RegisterPage' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>


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
