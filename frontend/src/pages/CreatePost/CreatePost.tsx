// import CreatePost from '@/pages/CreatePost/CreatePost'

// ====================< IMPORTS: REACT >=================================
import { useState } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './CreatePost.scss'


export default function CreatePost() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    try {
      const res = await api('/posts', { method: 'POST', body: { title: title, content: content }})
      console.log('res', res)
      setSuccess(true)
      setTitle('')
      setContent('')
    } catch (err: any) {
      console.error(err)
      setError(err.response?.data?.message || 'Failed to create post')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className='CreatePost'>


      <div className='create-post-page'>
        <h2>Create New Post</h2>

        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Post title" value={title} onChange={e => setTitle(e.target.value)} required />
          <textarea value={content} onChange={e => setContent(e.target.value)} placeholder="Write your post..." rows={5} required />
          <button type="submit" disabled={loading || !content.trim()}> {loading ? 'Posting...' : 'Post'} </button>
        </form>

        {success && <p style={{ color: 'lime' }}>Post created!</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

      </div>


    </div>
  )
}
