// import NotificationSettings from '@/components/settings/NotificationSettings'

// ====================< IMPORTS: REACT >=================================
import { useState } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Typography, FormControlLabel, Switch, Button, Alert } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================
import { NotificationSettingsProps } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function NotificationSettings({ initialNotifications }: NotificationSettingsProps) {
  // Local enabled state
  const [enabled, setEnabled] = useState<boolean>(initialNotifications)

  // Local success state.
  const [success, setSuccess] = useState(false)

  // Local loading + error states.
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Handle saving notification settings to backend.
  const handleSave = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await api('/settings', {
        method: 'PATCH',
        body: { notificationsEnabled: enabled }
      })
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setError('Failed to update notification setting.')
    } finally {
      setLoading(false)
    }
  }


  // Render notification settings.
  return (
    <Box>


      <Typography variant='h6' fontWeight={600}>Notification Settings</Typography>

      {error && <Alert severity='error' sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity='success' sx={{ mb: 2 }}>Saved successfully.</Alert>}

      <FormControlLabel
        control={<Switch checked={enabled} onChange={(e) => setEnabled(e.target.checked)} disabled={loading} />}
        label='Enable Notifications'
      />

      <Box sx={{ mt: 2 }}>
        <Button variant='contained' disabled={loading} onClick={handleSave}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </Box>


    </Box>
  )
}
