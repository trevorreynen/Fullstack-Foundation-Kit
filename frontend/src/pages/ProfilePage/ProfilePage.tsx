// =========================< IMPORTS: REACT >=================================
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// =========================< IMPORTS: OTHER >=================================
import { api } from '@/utils/api'

// =========================< IMPORTS: COMPONENTS >============================


// =========================< IMPORTS: CSS >===================================
import './ProfilePage.scss'


interface UserProfile {
  id: number
  username: string
  email: string
}


export default function ProfilePage() {
  const { username } = useParams<{ username: string }>()
  const [user, setUser] = useState<UserProfile | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true)
        const data = await api(`/account/username/${username}`)
        setUser(data)
      } catch (err: any) {
        setError('User not found.')
      } finally {
        setLoading(false)
      }
    }

    if (username) fetchUser()
  }, [username])


  if (loading) {
    return <div>Loading profile...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  if (!user) {
    return null
  }


  return (
    <div className='ProfilePage'>


      <h1>@{user.username}</h1>
      <p>User ID: {user.id}</p>
      {/* TODO: Later: add posts, likes, comments here */}


    </div>
  )
}

