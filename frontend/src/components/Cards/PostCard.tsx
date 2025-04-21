// import PostCard from '@/components/Cards/PostCard'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================
import { PostCardProps } from '@/types/CardTypes'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './PostCard.scss'


export default function PostCard({ post, viewMode = 'full' }: PostCardProps) {
  const isForum = viewMode === 'forum'

  const wasEdited = !!post.updatedAt && post.updatedAt !== post.createdAt
  const createdDate = new Date(post.createdAt)
  const updatedDate = post.updatedAt ? new Date(post.updatedAt) : null
  const dateLabel = wasEdited ? 'Last edited:' : 'Created:'
  const displayDate = wasEdited ? updatedDate?.toLocaleDateString() : createdDate.toLocaleDateString()
  const tooltipText = wasEdited
    ? `Created: ${createdDate.toLocaleDateString()} | Last edited: ${updatedDate?.toLocaleDateString()}`
    : `Created: ${createdDate.toLocaleDateString()}`


  // in props: post.commentCount (from preload)
  const [commentCount, setCommentCount] = useState(post.commentCount)

  const refreshCommentCount = async () => {
    try {
      const res = await api(`/comments/count/${post.id}`)
      setCommentCount(res.commentCount)
    } catch (err) {
      console.error('Failed to refresh comment count')
    }
  }


  return (
    <div className={`PostCard ${isForum ? 'forum-style-card' : 'full-style-card'}`}>

      <div className='post-header'>
        <div className='profile-icon-wrapper'>
          <Link to={`/user/${post.user!.username}`}>
            <img
              src={`${process.env.API_BASE!.replace('/api', '')}${post.user!.profileIconUrl}`}
              className='profile-icon'
              draggable={false}
            />
          </Link>
        </div>
        <div className='username-wrapper'>
          <Link to={`/user/${post.user!.username}`} className='profile-username'>{post.user!.username}</Link>
        </div>
      </div>


      <div className='post-title-wrapper'>
        <Link to={`/post/${post.id}`} className='post-title'>{post.title}</Link>
      </div>


      <div className='post-content-wrapper'>
        <div className='post-content'>{post.content}</div>
      </div>


      <div className='post-footer'>
        <div className='post-date' title={tooltipText}>
          <span className='post-date-label'>{dateLabel}</span>
          <span className='post-date-value'>{displayDate}</span>
        </div>

        <div className='comment-count'>
          {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
        </div>

        <div className='post-id'>
          <div className='post-id-label'>Post ID:</div>
          <div className='post-id-value'>{post.id}</div>
        </div>
      </div>


    </div>
  )
}
