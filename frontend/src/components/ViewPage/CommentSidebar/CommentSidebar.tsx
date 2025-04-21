// import CommentSidebar from '@/components/ViewPage/CommentSidebar/CommentSidebar'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import CommentForm from '@/components/ViewPage/CommentForm/CommentForm'
import CommentList from '@/components/ViewPage/CommentList/CommentList'
import CommentSidebarHeader from '@/components/ViewPage/CommentSidebarHeader/CommentSidebarHeader'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './CommentSidebar.scss'


interface CommentSidebarProps {
  postId: number
  postUser: {
    username: string
    profileIconUrl?: string
  }
  onClose: () => void
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


export default function CommentSidebar({ postId, postUser, onClose }: CommentSidebarProps) {
  const [comments, setComments] = useState<Comment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const res = await fetch(`/api/comments/post/${postId}`)
        const data = await res.json()
        setComments(data)
      } catch (err) {
        console.error('Failed to load comments', err)
      } finally {
        setLoading(false)
      }
    }

    fetchComments()
  }, [postId])

  const handleNewComment = (newComment: Comment) => {
    setComments(prev => [newComment, ...prev])
  }


  return (
    <div className='CommentSidebar comment-sidebar'>


      <CommentSidebarHeader username={postUser.username} profileIconUrl={postUser.profileIconUrl} onClose={onClose} />

      <CommentList comments={comments} loading={loading} />

      <CommentForm postId={postId} onCommentSubmit={handleNewComment} />


    </div>
  )
}
