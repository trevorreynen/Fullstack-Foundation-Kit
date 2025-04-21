// import AuthForm from '@/components/AuthForm/AuthForm'

// ====================< IMPORTS: REACT >=================================
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================
import { FieldKey, Props } from '@/types/AuthFormTypes'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './AuthForm.scss'


export default function AuthForm({ title, fields, onSubmit, footer, submitText = 'Submit', showForgotPassword = false, showRememberMe = false }: Props) {
  const navigate = useNavigate()

  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(fields.map(({ key }) => [key, ''])))
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [generalError, setGeneralError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)


  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))

    if (fieldErrors[key] || generalError) {
      setFieldErrors({})
      setGeneralError(null)
    }
  }

  const validate = () => {
    const errors: Record<string, string> = {}

    for (const field of fields) {
      if (field.required && !values[field.key]?.trim()) {
        errors[field.key] = 'Required'
      }
    }

    return errors
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormSubmitted(true)
    setFieldErrors({})
    setGeneralError(null)

    const errors = validate()
    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors)
      setGeneralError('Please fill in all required fields.')

      return
    }

    try {
      setLoading(true)

      const message = await onSubmit(values as Record<FieldKey, string>, rememberMe)
      if (message) {
        setGeneralError(message)
      }
    } catch (err: any) {
      setGeneralError(err?.message || 'Something went wrong.')
    } finally {
      setLoading(false)
    }
  }

  const hasErrors = Object.keys(fieldErrors).length > 0 || !!generalError


  return (
    <div className='AuthForm'>


      <div className='auth-form-wrapper'>
        <h2>{title}</h2>

        <form onSubmit={handleSubmit} noValidate>

          {generalError && <div className='error-message'>{generalError}</div>}

          {fields.map(({ key, label, type = 'text' }) => (

            <div key={key} className={`input-wrapper ${formSubmitted && fieldErrors[key] ? 'error' : ''}`}>

              {type === 'password' ? (
                <>
                  <div className='input-wrapper-body'>
                    <input type={showPassword ? 'text' : 'password'} value={values[key]} onChange={(e) => handleChange(key, e.target.value)} required />
                    <label>{label}</label>
                    <div className='line'></div>
                  </div>
                  <div className='show-pass-wrapper' onClick={() => setShowPassword((p) => !p)}>
                    <div className={`show-icon ${showPassword ? 'icon-hide' : 'icon-show'}`} />
                    <button type='button' className='show-password-btn'>
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <input type='text' value={values[key]} onChange={(e) => handleChange(key, e.target.value)} required autoFocus={key === fields[0].key} />
                  <label>{label}</label>
                  <div className='line'></div>
                </>
              )}
            </div>
          ))}

          {showForgotPassword && (
            <div className='forgot-password-btn-wrapper'>
              <button className='forgot-password-btn' type='button' onClick={() => navigate('/forgot-password')}>
                Forgot your password?
              </button>
            </div>
          )}

          {showRememberMe && (
            <div className='remember-me-container'>
              <label className='remember-me-wrapper'>
                <input type='checkbox' checked={rememberMe} onChange={() => setRememberMe((prev) => !prev)} />
                <span>Remember Me</span>
              </label>
            </div>
          )}

          <div className='submit-btn-wrapper'>
            <button className='submit-btn' type='submit' disabled={loading || hasErrors}>
              {loading ? 'Please wait...' : submitText}
            </button>
          </div>
        </form>
      </div>

      {footer && <div className='footer'>{footer}</div>}


    </div>
  )
}

