// import Profile from '@/pages/Profile/Profile'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import ProfileInfo from '@/components/ProfileInfo/ProfileInfo'
import UserPosts from '@/components/UserPosts/UserPosts'
import UserComments from '@/components/UserComments/UserComments'

// ====================< IMPORTS: TYPES >=================================
import { UserProfile } from '@/types/ProfilePageTypes'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './Profile.scss'


export default function Profile() {
  const { username } = useParams<{ username: string }>()
  const [viewedUser, setViewedUser] = useState<UserProfile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const data = await api(`/account/username/${username}`)
        setViewedUser(data)
      } catch (err: any) {
        setError('User not found.')
      } finally {
        setLoading(false)
      }
    }

    if (username) {
      fetchUser()
    }
  }, [username])


  if (loading) {
    return <div>Loading profile...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!viewedUser) {
    return null
  }


  return (
    <div className='Profile'>


      {/*
      <h1>@{username}</h1>
      <p>User ID: {viewedUser.id}</p>
      */}
      {/* TODO: Later: add posts, likes, comments here */}

      <ProfileInfo user={viewedUser} />
      <UserPosts user={viewedUser} />
      <UserComments user={viewedUser} />


    </div>
  )
}
