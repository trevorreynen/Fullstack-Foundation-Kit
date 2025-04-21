// import CommentForm from '@/components/ViewPage/CommentForm/CommentForm'

// ====================< IMPORTS: REACT >=================================
import { useState } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './CommentForm.scss'


interface CommentFormProps {
  postId: number
  onCommentSubmit: (newComment: Comment) => void
}

interface Comment {
  id: number
  userId: number
  content: string
  createdAt: string
  updatedAt: string | null
  user: {
    username: string
    profileIconUrl?: string
  }
}


export default function CommentForm({ postId, onCommentSubmit }: CommentFormProps) {
  const [content, setContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!content.trim()) return

    setSubmitting(true)

    try {
      const res = await fetch(`/api/comments/post/${postId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content.trim() }),
      })

      const data = await res.json()
      onCommentSubmit(data)
      setContent('')
    } catch (err) {
      console.error('Comment submit failed:', err)
    } finally {
      setSubmitting(false)
    }
  }


  return (
    <div className='CommentForm'>


      <form className='comment-form' onSubmit={handleSubmit}>
        <input
          type='text'
          placeholder='Add a comment...'
          value={content}
          onChange={(e) => setContent(e.target.value)}
          disabled={submitting}
        />

        <button type='submit' disabled={submitting || !content.trim()}>
          Post
        </button>
      </form>


    </div>
  )
}
