// import ViewPost from '@/pages/ViewPost/ViewPost'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import Box from '@mui/material/Box'
import FullPost from '@/components/ViewPost/FullPost'
import PostCommentSidebar from '@/components/ViewPost/PostCommentSidebar/PostCommentSidebar'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================
import { usePostStore } from '@/stores/usePostStore'
import { useCommentStore } from '@/stores/useCommentStore'

// ====================< IMPORTS: STYLES >================================


export default function ViewPost() {
  // 1. Get postId from URL.
  const { postId } = useParams()

  // 2. Zustand stores for managing single post and its comments.
  const { setPosts } = usePostStore()
  const { setComments } = useCommentStore()

  // 3. Loading states.
  const [loading, setLoading] = useState(true)

  // 4. Comment sidebar open toggle states.
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // 5. On mount, fetch post and its comments by postId and store them in zustand stores.
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!postId) {
          return
        }

        const postRes = await api(`/posts/by-id/${postId}`)
        const commentsRes = await api(`/comments/post/${postId}`)

        setPosts([postRes])
        setComments(commentsRes)
      } catch (err) {
        console.error('Failed to fetch post or comments:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [postId, setPosts, setComments])

  // 6. Toggle sidebar.
  const toggleSidebar = () => setSidebarOpen((prev) => !prev)

  // 7. Loading & Errors.
  if (loading) {
    return <div className='ViewPost loading'>Loading...</div> // TODO: Add skeleton.
  }


  // 8. Render view post page.
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', height: '100%', py: 4, px: 4 }}>


      <FullPost postId={parseInt(postId!)} showComments={sidebarOpen} onCommentClick={toggleSidebar} />
      <PostCommentSidebar onClose={toggleSidebar} />


    </Box>
  )
}
