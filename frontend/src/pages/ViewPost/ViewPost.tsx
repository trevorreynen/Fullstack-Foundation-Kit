// import ViewPost from '@/pages/ViewPost/ViewPost'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'
import { useParams, useSearchParams, Navigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Modal, Paper } from '@mui/material'
import FullPost from '@/components/post/FullPost'
import FullPostSidebar from '@/components/post/FullPostSidebar'
import FullPageLoader from '@/components/loading/FullPageLoader'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useTheme, useMediaQuery } from '@mui/material'

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================
import { usePostStore } from '@/stores/usePostStore'
import { useCommentStore } from '@/stores/useCommentStore'

// ====================< IMPORTS: STYLES >================================


export default function ViewPost() {
  // Extract postId from route params.
  const { postId } = useParams()

  // Zustand stores for storing post and comments data.
  const { setPosts } = usePostStore()
  const { setComments } = useCommentStore()

  // Local loading state.
  const [loading, setLoading] = useState(true)

  // Sidebar visibility state and toggle logic.
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const toggleSidebar = () => setSidebarOpen((prev) => !prev)

  // Fetch post and its comments on mount using postId.
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!postId) {
          return
        }

        const postRes = await api(`/posts/by-id/${postId}`, { method: 'GET' })
        setPosts([postRes.data])

        const commentsRes = await api(`/comments/post/${postId}`, { method: 'GET' })
        setComments(commentsRes.data.items)
      } catch (err) {
        console.error('Failed to fetch post or comments:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [postId, setPosts, setComments])

  // Extract highlightCommentId from URL search params (used to auto-focus a comment).
  const [searchParams] = useSearchParams()
  const highlightCommentId = Number(searchParams.get('highlightCommentId'))

  // Determine if screen size is mobile for responsive sidebar behavior.
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('lg'))

  // Handle loading and invalid post fallbacks.
  if (loading) {
    return <FullPageLoader />
  }

  if (!postId) {
    return <Navigate to='/error404' replace />
  }


  // Render view post page.
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
        height: '100%',
        p: 4
      }}
    >


      <FullPost postId={parseInt(postId)} onCommentClick={toggleSidebar} />

      <Box
        sx={{
          position: 'relative',
          height: '100%',
        }}
      >
        {sidebarOpen && (
          isMobile ? (
            <Modal
              open
              onClose={toggleSidebar}
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  maxWidth: 480,
                  maxHeight: '85%',
                  bgcolor: 'background.paper',
                  borderRadius: 4,
                  boxShadow: 24,
                  outline: 'none'
                }}
              >
                <FullPostSidebar highlightId={highlightCommentId} onClose={toggleSidebar} />
              </Box>
            </Modal>
          ) : (
            <Paper
              elevation={4}
              sx={{
                left: '100%',
                width: 480,
                height: '100%',
                ml: '54px',
                borderRadius: 4
              }}
            >
              <FullPostSidebar highlightId={highlightCommentId} onClose={toggleSidebar} />
            </Paper>
          )
        )}
      </Box>


    </Box>
  )
}
