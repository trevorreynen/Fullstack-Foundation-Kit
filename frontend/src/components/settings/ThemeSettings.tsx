// import ThemeSettings from '@/components/settings/ThemeSettings'

// ====================< IMPORTS: REACT >=================================
import { useState } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Typography, RadioGroup, FormControlLabel, Radio, Button, Alert } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useGlobalUI } from '@/hooks/useGlobalUI'

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function ThemeSettings() {
  // Global theme management via UI context.
  const { theme, setTheme } = useGlobalUI()

  const [selected, setSelected] = useState(theme)

  // Local error + saving + success states.
  const [error, setError] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)

  // Handle saving theme.
  const handleSave = async () => {
    setSaving(true)
    setSuccess(false)
    setError(null)

    try {
      await setTheme(selected)
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setError('Failed to save theme.')
    } finally {
      setSaving(false)
    }
  }


  // Render theme settings.
  return (
    <Box>


      <Typography variant='h6' fontWeight={600} mb={2}>
        Theme Preferences
      </Typography>

      {error && <Alert severity='error' sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity='success' sx={{ mb: 2 }}>Saved successfully.</Alert>}

      <RadioGroup value={selected} onChange={(e) => setSelected(e.target.value as any)}>
        <FormControlLabel value='light' control={<Radio />} label='Light' />
        <FormControlLabel value='dark' control={<Radio />} label='Dark' />
        <FormControlLabel value='system' control={<Radio />} label='System Default' />
      </RadioGroup>

      <Box sx={{ mt: 2 }}>
        <Button variant='contained' disabled={saving} onClick={handleSave}>
          {saving ? 'Saving...' : 'Save'}
        </Button>
      </Box>


    </Box>
  )
}

