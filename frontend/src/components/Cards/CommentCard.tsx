// import CommentCard from '@/components/Cards/CommentCard'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Typography, Tooltip, Stack } from '@mui/material'
import LikeBtn from '@/components/common/LikeBtn'
import HoverMenuBtn from '@/components/common/HoverMenuBtn'

// ====================< IMPORTS: TYPES >=================================
import { PostComment } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================
import { useCommentStore } from '@/stores/useCommentStore'

// ====================< IMPORTS: STYLES >================================


type Props = {
  comment: PostComment
  depth?: number
}


export default function CommentCard({ comment, depth = 0 }: Props) {
  const { comments } = useCommentStore()

  // Find replies for this comment
  const replies = comments.filter((c) => c.postId === comment.id)


  return (
    <Box
      sx={{
        ml: depth === 1 ? 4 : 0,
        mt: 2,
        p: 2,
        border: 1,
        borderColor: 'divider',
        borderRadius: 2
      }}
    >
      <Typography variant='body2' sx={{ mb: 1 }}>
        {comment.content}
      </Typography>

      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Tooltip title={new Date(comment.updatedAt || comment.createdAt).toLocaleString()}>
          <Typography variant='caption' color='text.secondary'>
            {comment.updatedAt ? 'Edited: ' : 'Created: '}
            {new Date(comment.updatedAt || comment.createdAt).toLocaleDateString()}
          </Typography>
        </Tooltip>

        <LikeBtn
          type='comment'
          targetId={comment.id}
          defaultLiked={comment.likedByUser ?? false}
          defaultLikeCount={comment.likeCount ?? 0}
        />
      </Stack>

      {/* replies */}
      {depth === 0 && comment.replies && comment.replies.length > 0 && (
        <Box sx={{ mt: 2 }}>
          {comment.replies.map((reply) => (
            <CommentCard key={reply.id} comment={reply} depth={1} />
          ))}
        </Box>
      )}
    </Box>
  )
}
