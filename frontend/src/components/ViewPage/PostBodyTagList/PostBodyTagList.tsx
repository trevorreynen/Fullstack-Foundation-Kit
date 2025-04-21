// import PostBodyTagList from '@/components/ViewPage/PostBodyTagList/PostBodyTagList'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './PostBodyTagList.scss'


interface PostBodyTagListProps {
  tags: string[]
}


export default function PostBodyTagList({ tags }: PostBodyTagListProps) {


  return (
    <div className='PostBodyTagList'>


      {tags.length === 0 ? (
        <span className='placeholder'>[Tags go here]</span>
      ) : (
        tags.map((tag, i) => (
          <span className='tag' key={i}>
            #{tag}
          </span>
        ))
      )}


    </div>
  )
}
