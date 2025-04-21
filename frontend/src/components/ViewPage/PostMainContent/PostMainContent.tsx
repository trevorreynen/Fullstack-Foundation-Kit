// import PostMainContent from '@/components/ViewPage/PostMainContent/PostMainContent'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import PostBodyTagList from '@/components/ViewPage/PostBodyTagList/PostBodyTagList'
import PostContentDisplay from '@/components/ViewPage/PostContentDisplay/PostContentDisplay'
import PostStatusBar from '@/components/ViewPage/PostStatusBar/PostStatusBar'

// ====================< IMPORTS: TYPES >=================================
import { PostWithUser } from '@/pages/ViewPost/ViewPost'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './PostMainContent.scss'


interface PostMainContentProps {
  post: PostWithUser
  showCommentsSidebar: boolean
  onToggleComments: () => void
}


export default function PostMainContent({ post, showCommentsSidebar, onToggleComments }: PostMainContentProps) {


  return (
    <div className='PostMainContent main-content'>


      <PostBodyTagList tags = {[]} />

      <PostContentDisplay title={post.title} content={post.content} />

      <PostStatusBar postId={post.id} createdAt={post.createdAt} updatedAt={post.updatedAt} showCommentsSidebar={showCommentsSidebar} onToggleComments={onToggleComments} />


    </div>
  )
}
