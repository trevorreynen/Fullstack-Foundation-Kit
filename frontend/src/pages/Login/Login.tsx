// import Login from '@/pages/Login/Login'

// ====================< IMPORTS: REACT >=================================
import { useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import Box from '@mui/material/Box'
import AuthForm from '@/components/auth/AuthForm'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function Login() {
  // React router navigate hook.
  const navigate = useNavigate()

  // Global user context setter to store authenticated user info.
  const { setUser } = useUser()

  // Form submission handler for signing in the user.
  const handleSubmit = async (values: { identifier: string, password: string }, rememberMe: boolean) => {
    try {
      const res = await api('/auth/login', { method: 'POST', body: values })
      const { token, user } = res.data
      const storage = rememberMe ? localStorage : sessionStorage

      storage.setItem('token', token)
      storage.setItem('user', JSON.stringify(user))

      console.log(user) // TODO: Remove console.log.
      setUser(user)
      navigate('/explore')

      return null
    } catch (err: any) {
      return err.data?.error?.message || 'Invalid credentials.'
    }
  }


  // Render login page.
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>


      <AuthForm
        title='Sign in'
        fields={[
          { key: 'identifier', label: 'Username or Email', required: true },
          { key: 'password', label: 'Password', type: 'password', required: true }
        ]}
        onSubmit={handleSubmit}
        submitText='Sign In'
        showRememberMe
        showForgotPassword
        footer={
          <p>
            Don't have an account?
            {' '}
            <button type='button' className='footer-btn' onClick={() => navigate('/register')}>Register here</button>
          </p>
        }
      />


    </Box>
  )
}
