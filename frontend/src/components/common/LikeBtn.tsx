// import LikeBtn from '@/components/common/LikeBtn'

// ====================< IMPORTS: REACT >=================================
import { useState } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { IconButton, Tooltip, Typography } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'
import FavoriteIcon from '@mui/icons-material/Favorite'


type LikeBtnProps = {
  type: 'post' | 'comment'
  targetId: number
  defaultLiked: boolean
  defaultLikeCount: number
}


export default function LikeBtn({ targetId, type, defaultLiked, defaultLikeCount }: LikeBtnProps) {
  // 1. Get signed in user.
  const { user } = useUser()

  // 2. Local like states.
  const [liked, setLiked] = useState(defaultLiked)
  const [likeCount, setLikeCount] = useState(defaultLikeCount)

  // 3. Like toggle logic.
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


  // 4. Render like button.
  return (
    <Tooltip title={liked ? 'Unlike' : 'Like'}>


      <IconButton onClick={handleToggle}>
        {liked ? <FavoriteIcon color='error' /> : <FavoriteBorderIcon />}

        <Typography variant='caption' sx={{ ml: 0.5, fontSize: '14px' }}>
          {likeCount}
        </Typography>
      </IconButton>


    </Tooltip>
  )
}
