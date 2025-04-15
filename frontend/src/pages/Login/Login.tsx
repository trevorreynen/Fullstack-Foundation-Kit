// =========================< IMPORTS: REACT >=================================
import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'

// =========================< IMPORTS: OTHER >=================================
import { api } from '@/utils/api'
import { useUser } from '@/hooks/useUser'

// =========================< IMPORTS: COMPONENTS >============================
import AuthForm from '@/components/AuthForm/AuthForm'

// =========================< IMPORTS: STYLES >================================
import './Login.scss'


export default function Login() {
  const navigate = useNavigate()
  const { setUser } = useUser()


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
      } else {
        sessionStorage.setItem('token', res.token)
      }

      setUser(res.user)
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
