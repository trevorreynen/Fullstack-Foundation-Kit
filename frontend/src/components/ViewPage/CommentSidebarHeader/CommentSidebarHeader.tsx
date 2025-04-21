// import CommentSidebarHeader from '@/components/ViewPage/CommentSidebarHeader/CommentSidebarHeader'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './CommentSidebarHeader.scss'


interface CommentSidebarHeaderProps {
  username: string
  profileIconUrl?: string
  onClose: () => void
}


export default function CommentSidebarHeader({ username, profileIconUrl, onClose }: CommentSidebarHeaderProps) {


  return (
    <div className='CommentSidebarHeader comment-sidebar-header'>


      <div className='user-info'>
        <img src={profileIconUrl || '/default-avatar.png'} alt={`${username}'s profile`} className='avatar' />
        <span className='username'>{username}</span>
      </div>

      <button className='close-button' onClick={onClose} aria-label='Close comment sidebar'>✕</button>


    </div>
  )
}
