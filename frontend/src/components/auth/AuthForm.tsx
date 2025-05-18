// import AuthForm from '@/components/auth/AuthForm'

// ====================< IMPORTS: REACT >=================================
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, TextField, Typography, Button, Alert, FormControlLabel, Checkbox, IconButton, InputAdornment, Paper } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================
import { AuthFormProps, FieldKey } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './AuthForm.scss'
import VisibilityIcon from '@mui/icons-material/Visibility'
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff'


export default function AuthForm({
  title,
  fields,
  onSubmit,
  footer,
  submitText = 'Submit',
  showForgotPassword = false,
  showRememberMe = false
}: AuthFormProps) {
  // React router navigate hook.
  const navigate = useNavigate()

  // Form field values and validation states.
  const [values, setValues] = useState<Record<string, string>>(() => Object.fromEntries(fields.map(({ key }) => [key, ''])))
  const [generalError, setGeneralError] = useState<string | null>(null)

  // Local loading + error states.
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  // UI control states.
  const [rememberMe, setRememberMe] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  // Handle value changes and reset relevant errors.
  const handleChange = (key: string, value: string) => {
    setValues((prev) => ({ ...prev, [key]: value }))

    if (errors[key] || generalError) {
      setErrors({})
      setGeneralError(null)
    }
  }

  // Basic field-level validation rules.
  const validate = () => {
    const result: Record<string, string> = {}

    for (const field of fields) {
      if (field.required && !values[field.key]?.trim()) {
        result[field.key] = 'Required'
      }
    }

    // Extra validation for confirmPassword
    if (values['confirmPassword'] !== undefined && values['confirmPassword'] !== values['password']) {
      result['confirmPassword'] = 'Passwords do not match'
    }

    return result
  }

  // Form submission handler.
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setErrors({})
    setGeneralError(null)

    const validation = validate()

    if (Object.keys(validation).length > 0) {
      setErrors(validation)
      setGeneralError('Please fix the errors above.')
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

  // Render individual text fields.
  const renderTextField = (key: string, label: string, type = 'text', autoFocus = false) => (
    <TextField
      key={key}
      type={type === 'password' && showPassword ? 'text' : type}
      label={label}
      value={values[key]}
      onChange={(e) => handleChange(key, e.target.value)}
      error={Boolean(errors[key])}
      helperText={errors[key]}
      fullWidth
      required
      margin='normal'
      autoFocus={autoFocus}
      size='small'
      InputProps={{
        endAdornment: type === 'password' && (
          <InputAdornment position='end'>
            <IconButton onClick={() => setShowPassword((p) => !p)} edge='end' aria-label='toggle password visibility'>
              {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
          </InputAdornment>
        )
      }}
    />
  )


  // Render auth form.
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 520 }}>


      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography
          variant='h3'
          align='center'
          color='inherit'
          sx={{ mb: 2, fontWeight: 700, cursor: 'default', userSelect: 'none' }}
        >
          {title}
        </Typography>

        <form onSubmit={handleSubmit} noValidate>
          {fields.map((field, i) =>
            renderTextField(field.key, field.label, field.type, i === 0)
          )}

          {showForgotPassword && (
            <Box textAlign='right' color='inherit'>
              <Button type='button' onClick={() => navigate('/forgot-password')} size='small' sx={{ textTransform: 'none' }}>Forgot your password?</Button>
            </Box>
          )}

          {showRememberMe && (
            <FormControlLabel
              control={<Checkbox checked={rememberMe} onChange={() => setRememberMe((p) => !p)} />}
              color='inherit'
              label='Remember Me'
            />
          )}

          <Box mt={1} textAlign='center'>
            <Button
              type='submit'
              variant='outlined'
              disabled={loading}
              sx={{ px: 4, py: 1, color: '#7e0ac7', fontWeight: 700, borderColor: '#7e0ac7', borderRadius: '8px' }}
            >
              {loading ? 'Please wait...' : submitText}
            </Button>
          </Box>

          {generalError && <Alert severity='error' onClose={() => setGeneralError(null)} sx={{ mt: 2 }}>{generalError}</Alert>}
        </form>
      </Paper>

      {footer && <div className='auth-form-footer'>{footer}</div>}


    </Box>
  )
}
