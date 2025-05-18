// import CommentInput from '@/components/comment/CommentInput'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect, useRef } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Stack, TextField, Button, Typography } from '@mui/material'
import UserAvatar from '@/components/shared/UserAvatar'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


type CommentInputProps = {
  mode: 'comment' | 'reply'
  onSubmit: (text: string) => void
  replyingToUsername?: string
  autoFocus?: boolean
  submitLabel?: string
  onCancel?: () => void
}


export default function CommentInput({
  mode,
  onSubmit,
  replyingToUsername,
  autoFocus = false,
  submitLabel,
  onCancel
}: CommentInputProps) {
  // Global authenticated user context.
  const { user } = useUser()

  // Input and UI interaction state.
  const [value, setValue] = useState('')
  const [active, setActive] = useState(false)

  // Ref for text field focus handling.
  const inputRef = useRef<HTMLTextAreaElement | null>(null)

  // Focus the input on mount if autoFocus is enabled.
  useEffect(() => {
    if (autoFocus && inputRef.current) {
      inputRef.current.focus()
    }
  }, [autoFocus])

  // Handle comment submission.
  const handleSubmit = () => {
    if (!value.trim()) {
      return
    }

    onSubmit(value.trim())
    setValue('')
    setActive(false)
  }


  // Render comment input.
  return (
    <Stack direction='row' spacing={1} alignItems='flex-start' sx={{ mr: 2 }}>


      <UserAvatar
        profileIconKey={user?.profileIconKey ?? null}
        urlSize={mode === 'reply' ? 64 : 128}
        renderSize={mode === 'reply' ? 28 : 40}
        sx={{ mt: mode === 'reply' ? 0.5 : 1 }}
        draggable={false}
      />

      <Box sx={{ flexGrow: 1 }}>
        {replyingToUsername && (
          <Typography variant='caption' sx={{ mb: 0.5 }}>
            <strong>@{replyingToUsername}</strong>
          </Typography>
        )}

        <TextField
          inputRef={inputRef}
          size='small'
          multiline
          minRows={1}
          maxRows={5}
          fullWidth
          autoFocus
          placeholder={mode === 'reply' ? 'Reply...' : 'Add a comment...'}
          value={value}
          variant='standard'
          onChange={(e) => setValue(e.target.value)}
          onFocus={() => setActive(true)}
          sx={{
            '& .MuiInput-underline:after': {
              borderBottomColor: '#7e0ac7'
            },
          }}
        />

        {active && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1, gap: 1 }}>
            <Button
              className='pill-button'
              onClick={() => {
                setActive(false)
                onCancel?.()
              }}
              sx={{
                color: 'text.primary',
                '&:hover': {
                  backgroundColor: 'action.hover'
                }
              }}
            >
              Cancel
            </Button>

            <Button
              className='pill-button'
              variant='contained'
              disabled={!value.trim()}
              onClick={handleSubmit}
              sx={{
                color: '#f1f1f1',
                backgroundColor: '#7e0ac7',
                '&:hover': {
                  backgroundColor: '#75009d'
                }
              }}
            >
              {submitLabel ?? (mode === 'reply' ? 'Reply' : 'Comment')}
            </Button>
          </Box>
        )}
      </Box>


    </Stack>
  )
}
