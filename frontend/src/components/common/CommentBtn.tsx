// import CommentBtn from '@/components/common/CommentBtn'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { IconButton, Typography } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import ModeCommentIcon from '@mui/icons-material/ModeComment'


interface CommentBtnProps {
  commentCount: number
  onClick: (e: React.MouseEvent) => void
}


export default function CommentBtn({ commentCount, onClick }: CommentBtnProps) {
  // 1. Render comment button.
  return (
    <IconButton onClick={onClick} size='small'>


      <ModeCommentIcon fontSize='small' />

      <Typography variant='caption' sx={{ ml: 0.5, fontSize: '14px' }}>
        {commentCount}
      </Typography>


    </IconButton>
  )
}
