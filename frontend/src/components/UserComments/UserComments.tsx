// import UserComments from '@/components/UserComments/UserComments'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import CommentCard from '@/components/Cards/CommentCard'

// ====================< IMPORTS: TYPES >=================================
import { UserProfile } from '@/types/ProfilePageTypes'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './UserComments.scss'


export default function UserComments({ user }: { user: UserProfile }) {

  const dummyComments = [
    { id: 1, content: 'Nice post!', postId: 101 },
    { id: 2, content: 'I disagree.', postId: 102 }
  ]


  return (
    <div className='UserComments'>


      <h3>User Comments</h3>

      {dummyComments.map(comment => (
        <CommentCard key={comment.id} comment={comment} />
      ))}


    </div>
  )
}
