// import AccountSettings from '@/components/settings/AccountSettings'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Typography, Button, TextField, Stack, Dialog, DialogTitle, DialogContent, DialogActions, Alert, Divider } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function AccountSettings() {
  // Global authenticated user context.
  const { user, logoutUser } = useUser()

  // Form states.
  const [username, setUsername] = useState(user?.username || '')
  const [email, setEmail] = useState(user?.email || '')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmation, setConfirmation] = useState('')

  // State management.
  const [loadingField, setLoadingField] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isConfirmed, setIsConfirmed] = useState(false)

  useEffect(() => {
    setIsConfirmed(confirmation.trim() === user?.username)
  }, [confirmation, user?.username])

  const resetMessages = () => {
    setError(null)
    setSuccess(null)
  }

  // Handle updating user account.
  const handleUpdate = async (field: 'username' | 'email' | 'password') => {
    resetMessages()
    setLoadingField(field)

    try {
      if (field === 'username') {
        await api('/account/username', { method: 'PATCH', body: { username } })
      }

      if (field === 'email') {
        await api('/account/email', { method: 'PATCH', body: { email } })
      }

      if (field === 'password') {
        await api('/account/password', {
          method: 'PATCH',
          body: { oldPassword, newPassword }
        })
        setOldPassword('')
        setNewPassword('')
      }

      setSuccess(`${field.charAt(0).toUpperCase() + field.slice(1)} updated.`)
    } catch (err) {
      console.error(err)
      setError(`Failed to update ${field}.`)
    } finally {
      setLoadingField('')
    }
  }

  // Handle delete account and sign user out.
  const handleDelete = async () => {
    if (!isConfirmed) {
      return
    }

    setLoadingField('delete')
    resetMessages()

    try {
      await api('/account', { method: 'DELETE' })

      logoutUser()
    } catch (err) {
      console.error(err)
      setError('Failed to delete account.')
      setLoadingField('')
    }
  }


  // Render account settings.
  return (
    <Box>


      <Typography variant='h6' fontWeight={600} mb={2}>
        Account Settings
      </Typography>

      {/* Error / Success */}
      {error && <Alert severity='error' sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity='success' sx={{ mb: 2 }}>{success}</Alert>}

      {/* Username */}
      <Typography fontWeight={500} mb={0.5}>Update Username</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          size='small'
          fullWidth
        />
        <Button
          variant='contained'
          disabled={loadingField === 'username'}
          onClick={() => handleUpdate('username')}
        >
          Save
        </Button>
      </Box>

      {/* Email */}
      <Typography fontWeight={500} mb={0.5}>Update Email</Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
        <TextField
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          size='small'
          fullWidth
        />
        <Button
          variant='contained'
          disabled={loadingField === 'email'}
          onClick={() => handleUpdate('email')}
        >
          Save
        </Button>
      </Box>

      {/* Password */}
      <Typography fontWeight={500} mb={0.5}>Update Password</Typography>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mb: 4 }}>
        <TextField
          label='Old Password'
          type='password'
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          size='small'
          fullWidth
        />
        <TextField
          label='New Password'
          type='password'
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          size='small'
          fullWidth
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant='contained'
            disabled={loadingField === 'password'}
            onClick={() => handleUpdate('password')}
          >
            Update Password
          </Button>
        </Box>
      </Box>

      <Divider sx={{ mb: 4 }} />

      {/* Delete account */}
      <Typography fontWeight={600} mb={1} color='error'>
        Danger Zone: Delete Account
      </Typography>
      <Typography variant='body2' mb={1}>
        To confirm, type your username: <strong>{user?.username}</strong>
      </Typography>
      <TextField
        value={confirmation}
        onChange={(e) => setConfirmation(e.target.value)}
        placeholder='Enter your username'
        size='small'
        fullWidth
        sx={{ mb: 2 }}
      />
      <Button
        variant='contained'
        color='error'
        disabled={!isConfirmed || loadingField === 'delete'}
        onClick={handleDelete}
      >
        {loadingField === 'delete' ? 'Deleting...' : 'Delete Account'}
      </Button>


    </Box>
  )
}

