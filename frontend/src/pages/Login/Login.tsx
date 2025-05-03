// import Login from '@/pages/Login/Login'

// ====================< IMPORTS: REACT >=================================
import { useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import Box from '@mui/material/Box'
import AuthForm from '@/components/AuthForm/AuthForm'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function Login() {
  // 1. React router navigate hook.
  const navigate = useNavigate()

  // 2. Global user context setter for storing authenticated user data.
  const { setUser } = useUser()

  // 3. Form submit handler for signing in user via API.
  const handleSubmit = async (values: { identifier: string, password: string }, rememberMe: boolean) => {
    try {
      const res = await api('/auth/login', { method: 'POST', body: values })
      const { token, user } = res.data
      const storage = rememberMe ? localStorage : sessionStorage

      storage.setItem('token', token)
      storage.setItem('user', JSON.stringify(user))

      console.log(user)
      setUser(user)
      navigate('/home')

      return null
    } catch (err: any) {
      return err?.message || 'Invalid credentials.'
    }
  }


  // 4. Render login page.
  return (
    // TODO: Decide to keep or remove custom classes when not using custom style sheets.
    <Box className='LoginPage' sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>


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
