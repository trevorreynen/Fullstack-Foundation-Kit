// import FullPostSidebar from '@/components/post/FullPostSidebar'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Typography, IconButton, Stack, Divider } from '@mui/material'
import CommentCard from '@/components/comment/CommentCard'
import CommentInput from '@/components/comment/CommentInput'

// ====================< IMPORTS: TYPES >=================================
import { FullPostSidebarProps } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================
import { usePostStore } from '@/stores/usePostStore'
import { useCommentStore } from '@/stores/useCommentStore'

// ====================< IMPORTS: STYLES >================================
import CloseIcon from '@mui/icons-material/Close'


export default function FullPostSidebar({ onClose, highlightId }: FullPostSidebarProps) {
  // Global post list + comment state access.
  const { posts } = usePostStore()
  const { comments, fetchCommentsForPost } = useCommentStore()

  // Pull the post from posts store.
  const post = posts[0]

  // Loading state fallback.
  if (!post) {
    return <div>Post not found.</div>
  }


  // Render full post sidebar.
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%', height: '100%' }}>


      <Stack direction='row' alignItems='center' justifyContent='space-between' sx={{ height: '48px', px: 2, py: 0.5 }}>
        <Stack direction='row' alignItems='baseline' spacing={1}>
          <Typography sx={{ fontSize: '20px', fontWeight: 'bold' }}>Comments</Typography>

          <Typography sx={{ fontSize: '16px', color: 'text.secondary' }}>
            {post.commentCount ?? 0} comment{post.commentCount === 1 ? '' : 's'}
          </Typography>
        </Stack>

        <IconButton onClick={onClose} size='medium'>
          <CloseIcon fontSize='medium' />
        </IconButton>
      </Stack>

      <Divider />

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          px: 2, pt: 2,
          '&::-webkit-scrollbar': {
            width: '8px',
            marginTop: '4px',
            marginBottom: '4px'
          },
          '&::-webkit-scrollbar-thumb': {
            background: '#464749',
            borderRadius: '4px',
            marginTop: '4px',
            marginBottom: '4px'
          },
          '&::-webkit-scrollbar-track': {
            background: '#949596',
            borderRadius: '4px',
            cursor: 'pointer',
            marginTop: '4px',
            marginBottom: '4px'
          },
          '&::-webkit-scrollbar-thumb:hover': {
            background: '#545657',
            cursor: 'pointer'
          }
        }}
      >
        {comments.length === 0 ? (
          <Typography variant='body2' color='text.secondary'>No comments yet. Be the first to comment!</Typography>
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} highlightId={highlightId} />
          ))
        )}
      </Box>

      <Divider />

      <Box sx={{ width: '100%', p: 2 }}>
        <CommentInput
          mode='comment'
          onSubmit={async (text) => {
            await api('/comments', {
              method: 'POST',
              body: { postId: post.id, content: text }
            })

            fetchCommentsForPost(post.id)
          }}
        />
      </Box>


    </Box>
  )
}
