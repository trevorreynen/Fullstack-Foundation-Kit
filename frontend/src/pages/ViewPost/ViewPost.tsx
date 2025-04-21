// import ViewPost from '@/pages/ViewPost/ViewPost'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import CommentSidebar from '@/components/ViewPage/CommentSidebar/CommentSidebar'
import PostFloatingActions from '@/components/ViewPage/PostFloatingActions/PostFloatingActions'
import PostLayoutShell from '@/components/ViewPage/PostLayoutShell/PostLayoutShell'
import PostMainContent from '@/components/ViewPage/PostMainContent/PostMainContent'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './ViewPost.scss'


export interface PostWithUser {
  id: number
  userId: number
  title: string
  content: string
  createdAt: string
  updatedAt: string | null
  user: {
    username: string
    profileIconUrl?: string
  }
}


export default function ViewPost() {
  const { postId } = useParams<{ postId: string }>()
  const [post, setPost] = useState<PostWithUser | null>(null)
  const [showCommentsSidebar, setShowCommentsSidebar] = useState(false)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await api(`/posts/by-id/${postId}`)

        setPost(res)
      } catch (err) {
        console.error('Failed to fetch post:', err)
      }
    }

    if (postId) {
      console.log('[ViewPost] Fetching post')
      fetchPost()
    }
  }, [postId])

  const toggleSidebar = () => setShowCommentsSidebar(prev => !prev)

  if (!post) {
    return <div className='ViewPost loading'>Loading...</div>
  }


  return (
    <div className='ViewPost'>


      <PostLayoutShell showCommentsSidebar={showCommentsSidebar}>
        <PostMainContent post={post} showCommentsSidebar={showCommentsSidebar} onToggleComments={toggleSidebar} />

        <PostFloatingActions onCommentClick={toggleSidebar} showCommentsSidebar={showCommentsSidebar} />

        {showCommentsSidebar && (
          <CommentSidebar postId={post.id} postUser={post.user} onClose={toggleSidebar} />
        )}
      </PostLayoutShell>


    </div>
  )
}
