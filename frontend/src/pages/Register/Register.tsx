// =========================< IMPORTS: REACT >=================================
import { useNavigate } from 'react-router-dom'

// =========================< IMPORTS: OTHER >=================================
import { api } from '@/utils/api'

// =========================< IMPORTS: COMPONENTS >============================
import AuthForm from '@/components/AuthForm/AuthForm'

// =========================< IMPORTS: STYLES >================================
import './Register.scss'


export default function Register() {
  const navigate = useNavigate()


  const handleSubmit = async (
    values: {
      identifier: string
      email: string
      password: string
    },
    rememberMe: boolean
  ) => {
    try {
      const res = await api('/auth/register', {
        method: 'POST',
        body: {
          username: values.identifier,
          email: values.email,
          password: values.password
        }
      })

      console.log('Registration success:', res)

      navigate('/login')
      return null
    } catch (err: any) {
      return err?.message || 'Something went wrong'
    }
  }


  return (
    <div className='RegisterPage'>


      <AuthForm
        title='Register'
        fields={[
          { key: 'identifier', label: 'Username', required: true },
          { key: 'email', label: 'Email', required: true },
          { key: 'password', label: 'Password', type: 'password', required: true }
        ]}
        onSubmit={handleSubmit}
        submitText='Create Account'
        footer={
          <p>
            Already have an account?{' '}
            <button className='register-here-btn' type='button' onClick={() => navigate('/login')}>
              Sign in here
            </button>
          </p>
        }
      />


    </div>
  )
}
