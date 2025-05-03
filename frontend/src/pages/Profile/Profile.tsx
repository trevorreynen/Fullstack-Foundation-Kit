// import Profile from '@/pages/Profile/Profile'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Skeleton, Typography } from '@mui/material'
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo'
import UserPosts from '@/components/UserPosts/UserPosts'
import UserComments from '@/components/UserComments/UserComments'

// ====================< IMPORTS: TYPES >=================================
import { UserProfile, Post } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function Profile() {
  const { username } = useParams()
  const [viewedUser, setViewedUser] = useState<UserProfile | null>(null)
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true)
        const userRes = await api(`/account/username/${username}`, { method: 'GET' })
        setViewedUser(userRes.data)

        const postsRes = await api(`/posts/user/${username}`, { method: 'GET' })
        setPosts(postsRes.data.items)
      } catch (err: any) {
        setError('User not found or failed to load.')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [username])


  if (loading || !viewedUser) {
    return (
      <Box sx={{ px: 2, py: 3 }}>
        <Skeleton variant='rectangular' height={120} sx={{ mb: 2 }} />
        <Skeleton variant='text' height={40} width='40%' />
        <Skeleton variant='text' height={30} width='60%' />
      </Box>
    )
  }

  if (error) {
    return <Typography color='error'>{error}</Typography>
  }


  return (
    <Box className='ProfilePage' sx={{ display: 'flex', flexDirection: 'column', px: { xs: 0, sm: 2 }, py: { xs: 1, sm: 2 } }}>


      <ProfileInfo user={viewedUser} />
      <UserPosts user={viewedUser} posts={posts} />
      <UserComments user={viewedUser} />


    </Box>
  )
}
