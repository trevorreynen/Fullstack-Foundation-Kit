// import LikeBtn from '@/components/shared/LikeBtn'

// ====================< IMPORTS: REACT >=================================
import { useState } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, IconButton, Stack, Typography } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================
import { LikeBtnProps } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'


export default function LikeBtn({ targetId, type, defaultLiked, defaultLikeCount, countPlacement, btnSize, iconSize }: LikeBtnProps) {
  // Global authenticated user context.
  const { user } = useUser()

  // Like state for UI.
  const [liked, setLiked] = useState(defaultLiked)
  const [likeCount, setLikeCount] = useState(defaultLikeCount)

  // Handle like/unlike toggle.
  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!user) {
      console.error('User not logged in')
      return
    }

    // Optimistically update UI.
    const optimisticLiked = !liked
    const optimisticCount = liked ? likeCount - 1 : likeCount + 1

    setLiked(optimisticLiked)
    setLikeCount(optimisticCount)

    try {
      await api('/likes/toggle', {
        method: 'POST',
        body: {
          postId: type === 'post' ? targetId : undefined,
          commentId: type === 'comment' ? targetId : undefined
        }
      })
    } catch (error) {
      console.error('Failed to toggle like:', error)

      // Revert if request fails.
      setLiked(liked)
      setLikeCount(likeCount)
    }
  }


  // Render like button.
  return (
    <Box>


      <Stack
        direction={countPlacement === 'bottom' ? 'column' : 'row'}
        spacing={0.3}
        alignItems='center'
        justifyContent='center'
      >
        <IconButton onClick={handleToggle} size={btnSize}>
          {liked ? <FavoriteIcon color='error' fontSize={iconSize} /> : <FavoriteBorderIcon fontSize={iconSize} />}
        </IconButton>

        <Typography variant='caption' sx={{ fontSize: '14px', cursor: 'default' }}>
          {likeCount}
        </Typography>
      </Stack>


    </Box>
  )
}
