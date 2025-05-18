// import ProfileCommentCard from '@/components/profile/ProfileCommentCard'

// ====================< IMPORTS: REACT >=================================
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Typography, Card, Stack } from '@mui/material'
import LikeBtn from '@/components/shared/LikeBtn'
import DateDisplay from '@/components/shared/DateDisplay'

// ====================< IMPORTS: TYPES >=================================
import { CommentCardProps } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================
import { useCommentStore } from '@/stores/useCommentStore'

// ====================< IMPORTS: STYLES >================================



export default function ProfileCommentCard({ comment }: CommentCardProps) {
  // Global comments list and setter from Zustand store.
  const { comments, setComments } = useCommentStore()

  // Get live synced version of this comment from Zustand store.
  const liveComment = comments.find((c) => c.id === comment.id)

  // Sync this comment into global store if missing.
  useEffect(() => {
    if (!liveComment) {
      setComments([...comments, comment])
    }
  }, [comment, comments, liveComment, setComments])

  // No liveComment fallback.
  if (!liveComment) {
    return <div>Error loading comment..</div>
  }


  // Render profile comment card.
  return (
    <Card variant='outlined' sx={{ mb: 2, p: 2 }}>


      <Typography variant='caption' color='text.secondary' sx={{ mb: 1 }}>
        Replied to a comment on{' '}
        <Link to={`/post/${comment.postId}?highlightCommentId=${comment.id}`} style={{ color: '#62a3ff', textDecoration: 'none' }}>
          {comment.postTitle ?? 'Post'}
        </Link>
      </Typography>

      <Typography variant='body1' sx={{ my: 1, whiteSpace: 'pre-line', fontSize: 15 }}>
        {comment.content}
      </Typography>

      <Stack direction='row' justifyContent='space-between' alignItems='center' mt={1}>
        <LikeBtn
          type='comment'
          targetId={comment.id}
          defaultLiked={comment.likedByUser ?? false}
          defaultLikeCount={comment.likeCount ?? 0}
          countPlacement='right'
          btnSize='small'
          iconSize='small'
        />

        <DateDisplay
          createdAt={comment.createdAt}
          updatedAt={comment.updatedAt}
          showLabel={false}
          displayFontSize={13}
          tooltipFontSize={12}
        />
      </Stack>


    </Card>
  )
}
