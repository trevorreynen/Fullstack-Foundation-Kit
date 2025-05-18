// import Profile from '@/pages/Profile/Profile'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Typography } from '@mui/material'
import ProfileInfo from '@/components/profile/ProfileInfo'
import UserPosts from '@/components/profile/UserPosts'
import UserComments from '@/components/profile/UserComments'
import FullPageLoader from '@/components/loading/FullPageLoader'

// ====================< IMPORTS: TYPES >=================================
import { UserProfile, Post, PaginatedResponse, PostComment } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function Profile() {
  // Extract username from route params.
  const { username } = useParams()

  // Local states for fetched user and their content.
  const [viewedUser, setViewedUser] = useState<UserProfile | null>(null)
  const [postsData, setPostsData] = useState<PaginatedResponse<Post> | null>(null)
  const [commentsData, setCommentsData] = useState<PaginatedResponse<PostComment> | null>(null)

  // Local loading + error states.
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch user profile, posts, and comments on mount using username.
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const userRes = await api(`/account/username/${username}`, { method: 'GET' })
        setViewedUser(userRes.data)

        const postsRes = await api(`/posts/user/${username}?page=1&pageSize=10`, { method: 'GET' })
        setPostsData(postsRes.data)

        const commentsRes = await api(`/comments/user/${username}?page=1&pageSize=10`, { method: 'GET' })
        setCommentsData(commentsRes.data)
      } catch (err: any) {
        setError('User not found or failed to load.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [username])

  // Handle loading and error fallbacks.
  if (loading || !viewedUser) {
    return <FullPageLoader />
  }

  if (error) {
    return <Typography color='error'>{error}</Typography>
  }


  // Render profile page.
  return (
    <Box className='ProfilePage' sx={{ display: 'flex', flexDirection: 'column', px: { xs: 0, sm: 2 }, py: { xs: 1, sm: 2 } }}>


      <ProfileInfo user={viewedUser} />
      <UserPosts user={viewedUser} initialData={postsData ?? { items: [], meta: { page: 1, pageSize: 10, totalPages: 1, totalItems: 0 } }} />
      <UserComments user={viewedUser} initialData={commentsData ?? { items: [], meta: { page: 1, pageSize: 10, totalPages: 1, totalItems: 0 } }} />


    </Box>
  )
}
