// import UserNotes from '@/components/settings/UserNotes'

// ====================< IMPORTS: REACT >=================================
import { useState } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Typography, TextField, Button, Alert } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


type UserNotesProps = {
  initialNote: string
}


export default function UserNotes({ initialNote }: UserNotesProps) {
  // Local note state.
  const [note, setNote] = useState(initialNote)

  // Local loading + error + success states.
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  // Handle saving user notes.
  const handleSave = async () => {
    setLoading(true)
    setError(null)
    setSuccess(false)

    try {
      await api('/settings', {
        method: 'PATCH',
        body: { customNote: note }
      })

      setSuccess(true)
    } catch (err) {
      console.error(err)
      setError('Failed to save your note.')
    } finally {
      setLoading(false)
    }
  }


  // Render user notes.
  return (
    <Box>


      <Typography variant='h6' fontWeight={600} mb={2}>
        Personal Note
      </Typography>

      {error && <Alert severity='error' sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity='success' sx={{ mb: 2 }}>Saved successfully.</Alert>}

      <TextField
        multiline
        rows={5}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder='Write something for your future self...'
        fullWidth
        sx={{ mb: 2 }}
      />

      <Button
        variant='contained'
        onClick={handleSave}
        disabled={loading}
      >
        {loading ? 'Saving...' : 'Save'}
      </Button>


    </Box>
  )
}

