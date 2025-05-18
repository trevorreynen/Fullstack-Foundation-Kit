// import PostForm from '@/components/post/PostForm'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'

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


type PostFormMode = 'create' | 'edit'

type PostFormProps = {
  mode: PostFormMode
  initialTitle?: string
  initialContent?: string
  postId?: number // only needed for edit mode
  open: boolean
  onCancel: () => void
  onSuccess: () => void
  dialogTitle?: string
  submitLabel?: string
}


export default function PostForm({
  mode,
  initialTitle = '',
  initialContent = '',
  postId,
  open,
  onCancel,
  onSuccess,
  dialogTitle,
  submitLabel
}: PostFormProps) {
  // Form input states.
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)

  // Local loading + error states.
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState<{ title?: string; content?: string }>({})

  // Reset title/content if initial values change.
  useEffect(() => {
    setTitle(initialTitle)
    setContent(initialContent)
  }, [initialTitle, initialContent])

  // Form submit handler (create or edit post).
  const handleSubmit = async () => {
    const newErrors: typeof errors = {}

    if (!title.trim()) {
      newErrors.title = 'Title is required'
    }

    if (!content.trim()) {
      newErrors.content = 'Content is required'
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setLoading(true)

    try {
      if (mode === 'create') {
        await api('/posts', { method: 'POST', body: { title, content } })
      } else if (mode === 'edit' && postId) {
        await api(`/posts/${postId}`, { method: 'PATCH', body: { title, content } })
      }

      onSuccess()
    } catch (err) {
      console.error('Failed to submit post:', err)
    } finally {
      setLoading(false)
    }
  }

  // Reset form to initial values.
  const handleReset = () => {
    setTitle(initialTitle)
    setContent(initialContent)
    setErrors({})
  }


  // Render post form.
  return (
    <Dialog open={open} onClose={onCancel} fullWidth maxWidth='sm'>
      <DialogTitle>{dialogTitle ?? (mode === 'edit' ? 'Edit Post' : 'Create Post')}</DialogTitle>

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
          {submitLabel ?? (mode === 'edit' ? 'Save Changes' : 'Post')}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

