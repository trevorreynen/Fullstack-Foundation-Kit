// import CommentBtn from '@/components/shared/CommentBtn'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, IconButton, Stack, Typography } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================
import { CommentBtnProps } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import ModeCommentIcon from '@mui/icons-material/ModeComment'


export default function CommentBtn({ commentCount, onClick, countPlacement, btnSize, iconSize }: CommentBtnProps) {
  // Render comment button.
  return (
    <Box>


      <Stack
        direction={countPlacement === 'bottom' ? 'column' : 'row'}
        spacing={0.3}
        alignItems='center'
        justifyContent='center'
      >
        <IconButton onClick={onClick} size={btnSize}>
          <ModeCommentIcon fontSize={iconSize} />
        </IconButton>

        <Typography variant='caption' sx={{ fontSize: '14px' }}>
          {commentCount}
        </Typography>
      </Stack>


    </Box>
  )
}
