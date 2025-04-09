// =========================< IMPORTS: REACT >=================================
import { useState } from 'react'

// =========================< IMPORTS: OTHER >=================================
import { api } from '@/utils/api'

// =========================< IMPORTS: COMPONENTS >============================


// =========================< IMPORTS: STYLES >================================
import './RegisterPage.scss'


export default function RegisterPage() {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await api('/auth/register', {
        method: 'POST',
        body: { email, username, password }
      })

      console.log('Register success:', res)
      // TODO: redirect or auto-login
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className='RegisterPage'>


      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} />
        <input type='text' placeholder='Username' value={username} onChange={(e) => setUsername(e.target.value)} />
        <input type='password' placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} />

        {error && <p className='error'>{error}</p>}

        <button type='submit' disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>


    </div>
  )
}
