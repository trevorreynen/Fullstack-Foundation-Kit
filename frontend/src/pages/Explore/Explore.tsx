// import Explore from '@/pages/Explore/Explore'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import PostCard from '@/components/Cards/PostCard'

// ====================< IMPORTS: TYPES >=================================
import { Post } from '@/types/ViewPostTypes'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './Explore.scss'


export default function Explore() {
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [error, setError] = useState<string | null>(null)


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api('/posts')
        setPosts(res)
      } catch (err) {
        setError('Failed to load posts')
        console.error(err)
      }
    }

    fetchPosts()
  }, [])

  if (error) {
    return (
      <p>{error}</p>
    )
  }

  if (!posts) {
    return (
      <p>Loading...</p>
    )
  }


  return (
    <div className='Explore'>


      <h2>Explore</h2>

      <div className='explore-post-list'>
        {posts.map(post => (
          <PostCard key={post.id} post={post} viewMode='full' />
        ))}
      </div>


    </div>
  )
}
