// import ProfileImageSettings from '@/components/settings/ProfileImageSettings'

// ====================< IMPORTS: REACT >=================================
import { useState, useRef } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Typography, Button, Avatar, Stack, Alert } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function ProfileImageSettings() {
  const { user } = useUser()
  const inputRef = useRef<HTMLInputElement | null>(null)

  const [preview, setPreview] = useState<string | null>(null)
  const [file, setFile] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const currentUrl = user?.profileIconKey
    ? `${process.env.API_BASE?.replace('/api', '')}/uploads/profile-icons/${user.profileIconKey}-128x128.webp`
    : `${process.env.API_BASE?.replace('/api', '')}/uploads/default-profile-icon.png`

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0]
    if (!selected) return

    setFile(selected)
    setPreview(URL.createObjectURL(selected))
    setSuccess(false)
    setError(null)
  }

  const handleUpload = async () => {
    if (!file) {
      return
    }

    setLoading(true)
    setSuccess(false)
    setError(null)

    const formData = new FormData()
    formData.append('image', file)

    try {
      await api('/account/upload-profile-image', {
        method: 'POST',
        body: formData
      })

      setFile(null)
      setPreview(null)
      setSuccess(true)
    } catch (err) {
      console.error(err)
      setError('Upload failed. Make sure your image is valid.')
    } finally {
      setLoading(false)
    }
  }


  // Render profile image settings.
  return (
    <Box>


      <Typography variant='h6' fontWeight={600} mb={2}>Profile Image</Typography>

      {error && <Alert severity='error' sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity='success' sx={{ mb: 2 }}>Image uploaded successfully.</Alert>}

      <Avatar src={preview || currentUrl} alt='Profile' sx={{ width: 96, height: 96, mb: 2 }} />

      <input
        ref={inputRef}
        type='file'
        accept='image/*'
        onChange={handleFileSelect}
        hidden
      />

      <Box sx={{ display: 'flex', gap: 2 }}>
        <Button variant='outlined' onClick={() => inputRef.current?.click()}>
          Choose Image
        </Button>
        <Button
          variant='contained'
          onClick={handleUpload}
          disabled={!file || loading}
        >
          {loading ? 'Uploading...' : 'Upload'}
        </Button>
      </Box>


    </Box>
  )
}
