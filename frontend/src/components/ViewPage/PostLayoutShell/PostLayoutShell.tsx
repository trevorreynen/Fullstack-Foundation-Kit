// import PostLayoutShell from '@/components/ViewPage/PostLayoutShell/PostLayoutShell'

// ====================< IMPORTS: REACT >=================================
import { ReactNode } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './PostLayoutShell.scss'


interface PostLayoutShellProps {
  children: ReactNode
  showCommentsSidebar: boolean
}


export default function PostLayoutShell({ children, showCommentsSidebar }: PostLayoutShellProps) {


  return (
    <div className={`PostLayoutShell ${showCommentsSidebar ? 'show-comments' : ''}`}>


      {children}


    </div>
  )
}
