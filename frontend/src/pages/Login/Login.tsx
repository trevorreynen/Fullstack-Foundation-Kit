// import Login from '@/pages/Login/Login'

// ====================< IMPORTS: REACT >=================================
import { useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import AuthForm from '@/components/AuthForm/AuthForm'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { SidebarState } from '@/contexts/GlobalUIContext'
import { useGlobalUI } from '@/hooks/useGlobalUI'
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './Login.scss'



export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useUser()
  const { setSidebarState } = useGlobalUI()


  const handleSubmit = async (
    values: { identifier: string; password: string },
    rememberMe: boolean
  ) => {
    try {
      const res = await api('/auth/login', {
        method: 'POST',
        body: { identifier: values.identifier, password: values.password }
      })

      // TODO: Remove console.log eventually.
      console.log('Login success:', res)

      if (rememberMe) {
        localStorage.setItem('token', res.token)
        localStorage.setItem('user', JSON.stringify(res.user))
      } else {
        sessionStorage.setItem('token', res.token)
        sessionStorage.setItem('user', JSON.stringify(res.user))
      }

      setUser(res.user)
      setSidebarState(SidebarState.Expanded)
      navigate('/home')

      return null
    } catch (err: any) {
      return err?.message || 'Something went wrong'
    }
  }


  return (
    <div className='LoginPage'>


      <AuthForm
        title='Sign in'
        fields={[
          { key: 'identifier', label: 'Username or Email', required: true },
          { key: 'password', label: 'Password', type: 'password', required: true }
        ]}
        onSubmit={handleSubmit}
        submitText='Sign In'
        showForgotPassword
        showRememberMe
        footer={
          <p>
            Don't have an account?{' '}
            <button className='register-here-btn' type='button' onClick={() => navigate('/register')}>
              Register here
            </button>
          </p>
        }
      />


    </div>
  )
}
