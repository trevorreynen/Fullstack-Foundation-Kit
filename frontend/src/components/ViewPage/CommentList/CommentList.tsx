// import CommentList from '@/components/ViewPage/CommentList/CommentList'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import CommentCard from '@/components/Cards/CommentCard'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './CommentList.scss'


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

interface CommentListProps {
  comments: Comment[]
  loading: boolean
}


export default function CommentList({ comments, loading }: CommentListProps) {


  return (
    <div className='CommentList comment-list'>


      {loading ? (
        <div className='loading'>Loading comments...</div>
      ) : comments.length === 0 ? (
        <div className='empty'>No comments yet</div>
      ) : (
        comments.map(comment => (
          <CommentCard key={comment.id} comment={comment} />
        ))
      )}


    </div>
  )
}
