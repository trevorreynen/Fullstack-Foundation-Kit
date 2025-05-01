// import CreatePost from '@/pages/CreatePost/CreatePost'

// ====================< IMPORTS: REACT >=================================
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button, Stack } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function CreatePost() {
  const navigate = useNavigate()

  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})


  const handleSubmit = async () => {
    const newErrors: typeof errors = {}

    if (!title.trim()) newErrors.title = 'Title is required'
    if (!content.trim()) newErrors.content = 'Content is required'

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    try {
      await api('/posts', { method: 'POST', body: { title, content } })
      navigate(-1)
    } catch (err: any) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const handleReset = () => {
    setTitle('')
    setContent('')
    setErrors({})
  }


  return (
    <Dialog open onClose={handleCancel} fullWidth maxWidth='sm'>
      <DialogTitle>Create Post</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            label='Title'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            error={!!errors.title}
            helperText={errors.title}
            fullWidth
          />
          <TextField
            label='Content'
            value={content}
            onChange={(e) => setContent(e.target.value)}
            error={!!errors.content}
            helperText={errors.content}
            fullWidth
            multiline
            rows={4}
          />
        </Stack>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleReset}>Reset</Button>
        <Button onClick={handleSubmit} variant='contained' disabled={loading}>
          {loading ? 'Posting...' : 'Post'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}
