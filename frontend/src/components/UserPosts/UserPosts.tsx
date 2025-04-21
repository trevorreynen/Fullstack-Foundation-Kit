// import UserPosts from '@/components/UserPosts/UserPosts'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import PostCard from '@/components/Cards/PostCard'

// ====================< IMPORTS: TYPES >=================================
import { UserProfile } from '@/types/ProfilePageTypes'
import { Post } from '@/types/ViewPostTypes'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './UserPosts.scss'


export default function UserPosts({ user }: { user: UserProfile }) {
  const [error, setError] = useState<string | null>(null)
  const [userPosts, setUserPosts] = useState<Post[] | null>(null)
  const [isOpen, setIsOpen] = useState(true)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const posts = await api(`/posts/user/${user.id}`)
        setUserPosts(posts)
      } catch {
        setError('User posts not found.')
      }
    }

    if (user.username) {
      fetchPosts()
    }
  }, [user.username])


  if (error) {
    return (
    <p>{error}</p>
    )
  }

  if (!userPosts) {
    return (
      <p>Post not found.</p>
    )
  }


  return (
    <div className='UserPosts'>


      <div className={`user-posts-header ${isOpen ? 'open' : 'closed'}`} onClick={() => setIsOpen(!isOpen)}>
        <div className='header'>{user.username}'s Posts</div>

        <div className='header-right'>
          <div className={`arrow ${isOpen ? 'close-it' : 'open-it'}`}></div>
        </div>
      </div>

      {isOpen && (
        <div className='user-posts-list'>
          {userPosts.map((post) => (
            <div className='post-wrapper'>
              <PostCard key={post.id} post={post} viewMode='forum' />
            </div>
          ))}
        </div>
      )}


    </div>
  )
}
