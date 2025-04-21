// import CommentCard from '@/components/Cards/CommentCard'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './CommentCard.scss'


interface Comment {
  id: number
  userId: number
  content: string
  createdAt: string
  updatedAt: string | null
  user: {
    username: string
    profileIconUrl?: string
  }
}

interface CommentCardProps {
  comment: Comment
}


export default function CommentCard({ comment }: CommentCardProps) {
  const createdDate = new Date(comment.createdAt)
  const updatedDate = comment.updatedAt ? new Date(comment.updatedAt) : null

  const tooltip =
    updatedDate && comment.updatedAt !== comment.createdAt
      ? `Created: ${createdDate.toLocaleString()} | Last edited: ${updatedDate.toLocaleString()}`
      : `Created: ${createdDate.toLocaleString()}`

  const displayDate =
    updatedDate && comment.updatedAt !== comment.createdAt
      ? updatedDate.toLocaleDateString()
      : createdDate.toLocaleDateString()


  return (
    <div className='CommentCard' title={tooltip}>


      <img src={comment.user.profileIconUrl || '/default-avatar.png'} alt={`${comment.user.username}'s profile`} className='avatar' />

      <div className='content-area'>
        <div className='header'>
          <span className='username'>{comment.user.username}</span>
          <span className='date'>{displayDate}</span>
        </div>

        <div className='content'>
          {comment.content}
        </div>
      </div>


    </div>
  )
}
