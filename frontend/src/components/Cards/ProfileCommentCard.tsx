// import ProfileCommentCard from '@/components/Cards/ProfileCommentCard'

// ====================< IMPORTS: REACT >=================================
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Typography, Card, CardContent, Stack, Tooltip } from '@mui/material'
import LikeBtn from '@/components/common/LikeBtn'

// ====================< IMPORTS: TYPES >=================================
import { CommentCardProps } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================
import { useCommentStore } from '@/stores/useCommentStore'

// ====================< IMPORTS: STYLES >================================



export default function ProfileCommentCard({ comment }: CommentCardProps) {

  // Comments related states and logic
  const { comments, setComments, updateCommentLike } = useCommentStore()
  const liveComment = comments.find((c) => c.id === comment.id)

  useEffect(() => {
    if (!comments.find((c) => c.id === comment.id)) {
      setComments([...comments, comment])
    }
  }, [comment, comments, setComments])

  const createdDate = new Date(comment.createdAt).toLocaleDateString()
  const createdFull = new Date(comment.createdAt).toLocaleString()
  const editedDate = comment.updatedAt ? new Date(comment.updatedAt).toLocaleDateString() : null
  const editedFull = comment.updatedAt ? new Date(comment.updatedAt).toLocaleString() : null
  const showEdited = !!editedDate


  // Loading/Errors
  if (!liveComment) {
    return (
      <Box>
        <Typography color='error'>Error loading comment...</Typography>
      </Box>
    )
  }

  return (
    <Card variant='outlined' sx={{ mb: 2 }}>
      <CardContent>
        <Typography variant='body1' sx={{ mb: 1 }}>
          {comment.content}
        </Typography>

        <Typography component={Link} to={`/post/${comment.postId}`} variant='body2' sx={{ textDecoration: 'none', color: 'primary.main' }}>
          Commented on: <strong>{comment.postTitle ?? 'Post'}</strong>
        </Typography>

        <Stack direction='row' justifyContent='space-between' alignItems='center' mt={2}>
          <Tooltip
            title={
              <Box>
                {editedFull && <Typography variant='caption'>Edited: {editedFull}</Typography>}
                <br />
                <Typography variant='caption'>Created: {createdFull}</Typography>
              </Box>
            }
          >
            <Typography variant='caption' color='text.secondary'>
              {showEdited ? 'Edited:' : 'Created:'} {editedDate || createdDate}
            </Typography>
          </Tooltip>

          <LikeBtn
            type='comment'
            targetId={liveComment.id}
            defaultLiked={liveComment.likedByUser ?? false}
            defaultLikeCount={liveComment.likeCount ?? 0}
          />
        </Stack>
      </CardContent>
    </Card>
  )
}

