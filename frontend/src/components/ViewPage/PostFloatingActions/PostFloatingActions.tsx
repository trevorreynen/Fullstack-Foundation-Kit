// import PostFloatingActions from '@/components/ViewPage/PostFloatingActions/PostFloatingActions'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './PostFloatingActions.scss'


interface PostFloatingActionsProps {
  onCommentClick: () => void
  showCommentsSidebar: boolean
}


export default function PostFloatingActions({
  onCommentClick,
  showCommentsSidebar
}: PostFloatingActionsProps) {


  return (
    <div className='PostFloatingActions'>


      {/* Like button – hook up later */}
      <div className='action-button'>
        ❤️
        <span className='count'>123</span>
      </div>

      {/* Comment button */}
      <div
        className={`action-button ${showCommentsSidebar ? 'active' : ''}`}
        onClick={onCommentClick}
        title='Toggle comments'
      >
        💬
        <span className='count'>5</span>
      </div>


    </div>
  )
}
