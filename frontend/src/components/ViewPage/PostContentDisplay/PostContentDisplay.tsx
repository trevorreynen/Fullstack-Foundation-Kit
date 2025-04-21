// import PostContentDisplay from '@/components/ViewPage/PostContentDisplay/PostContentDisplay'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './PostContentDisplay.scss'


interface PostContentDisplayProps {
  title: string
  content: string
}


export default function PostContentDisplay({ title, content }: PostContentDisplayProps) {


  return (
    <div className='PostContentDisplay post-body'>


      <h2 className='post-title'>{title}</h2>
      <p className='post-content'>{content}</p>


    </div>
  )
}
