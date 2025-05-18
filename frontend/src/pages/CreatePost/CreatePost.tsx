// import CreatePost from '@/pages/CreatePost/CreatePost'

// ====================< IMPORTS: REACT >=================================
import { useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import PostForm from '@/components/post/PostForm'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


export default function CreatePost() {
  // React router navigate hook.
  const navigate = useNavigate()


  // Render create post page.
  return (
    <PostForm
      mode='create'
      open={true}
      onCancel={() => navigate(-1)}
      onSuccess={() => navigate(-1)}
    />
  )
}
