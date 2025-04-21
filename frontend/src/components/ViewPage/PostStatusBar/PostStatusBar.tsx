// import PostStatusBar from '@/components/ViewPage/PostStatusBar/PostStatusBar'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './PostStatusBar.scss'


interface PostStatusBarProps {
  postId: number
  createdAt: string
  updatedAt: string | null
  showCommentsSidebar: boolean
  onToggleComments: () => void
}


export default function PostStatusBar({
  postId,
  createdAt,
  updatedAt,
  showCommentsSidebar,
  onToggleComments
}: PostStatusBarProps) {

  const [label, setLabel] = useState('')
  const [displayDate, setDisplayDate] = useState('')
  const [tooltip, setTooltip] = useState('')


  useEffect(() => {
    const createdDate = new Date(createdAt)
    const updatedDate = updatedAt ? new Date(updatedAt) : null

    if (updatedDate && updatedAt !== createdAt) {
      setLabel('Last edited:')
      setDisplayDate(updatedDate.toLocaleDateString())
      setTooltip(`Created: ${createdDate.toLocaleString()} | Last edited: ${updatedDate.toLocaleString()}`)
    } else {
      setLabel('Created:')
      setDisplayDate(createdDate.toLocaleDateString())
      setTooltip(`Created: ${createdDate.toLocaleString()}`)
    }
  }, [createdAt, updatedAt])


  return (
    <div className='PostStatusBar'>


      <div className='status-meta' title={tooltip}>
        <span className='label'>{label}</span>
        <span className='date'>{displayDate}</span>
      </div>

      <div className='post-id'>
        ID: {postId}
      </div>


    </div>
  )
}
