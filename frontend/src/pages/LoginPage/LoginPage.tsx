// =========================< IMPORTS: REACT >=================================
import { useState } from 'react'

// =========================< IMPORTS: OTHER >=================================
import { api } from '@/utils/api'

// =========================< IMPORTS: COMPONENTS >============================


// =========================< IMPORTS: STYLES >================================
import './LoginPage.scss'


export default function LoginPage() {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    try {
      const res = await api('/auth/login', {
        method: 'POST',
        body: { identifier, password }
      })

      console.log('Login success:', res)
      // TODO: save user to context/localStorage
    } catch (err: any) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className='LoginPage'>


      <div className='login-form-wrapper'>
        <h2>Login</h2>

        <form onSubmit={handleSubmit}>

          <div className='input-wrapper'>
            <input type='text' /*placeholder='Username or Email'*/ value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
            <label>Username or Email</label>
          </div>

          <div className='input-wrapper'>
            <input type='password' /*placeholder='Password'*/ value={password} onChange={(e) => setPassword(e.target.value)} />
            <label>Password</label>
          </div>

          {error && <p className='error'>{error}</p>}


          <a className='submit-btn'>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
            <button className='' type='submit' disabled={loading}>
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </a>
        </form>
      </div>


    </div>
  )
}
