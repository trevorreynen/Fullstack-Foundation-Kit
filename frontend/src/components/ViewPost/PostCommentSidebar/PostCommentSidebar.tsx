// import PostCommentSidebar from '@/components/ViewPost/PostCommentSidebar/PostCommentSidebar'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Typography, IconButton, Stack, Divider, Avatar } from '@mui/material'
import CommentCard from '@/components/Cards/CommentCard'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================
import { usePostStore } from '@/stores/usePostStore'
import { useCommentStore } from '@/stores/useCommentStore'

// ====================< IMPORTS: STYLES >================================
import CloseIcon from '@mui/icons-material/Close'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder'


interface PostCommentSidebarProps {
  onClose: () => void
}


export default function PostCommentSidebar({ onClose }: PostCommentSidebarProps) {
  const { comments } = useCommentStore()
  const { posts } = usePostStore()

  // Pull the post from posts store (we assume only one post is loaded in ViewPost mode)
  const post = posts[0]

  if (!post) {
    return <div>Post not found.</div>
  }


  return (
    // TODO: Decide to keep or remove custom classes when not using custom style sheets.
    <Box
      className='PostCommentSidebar'
      sx={{
        zIndex: 1300,
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        right: 0,
        width: { xs: '100%', sm: '450px' },
        height: '100%',
        p: 2,
        boxShadow: 4,
      }}
    >


      {/* Top: Post author info */}
      <Stack direction='row' alignItems='center' justifyContent='space-between'>
        <Stack direction='row' spacing={2} alignItems='center'>
          <Avatar
            src={`${process.env.API_BASE!.replace('/api', '')}${post.user?.profileIconUrl || '/uploads/default-profile-icon.png'}`}
            sx={{ width: 40, height: 40 }}
          />
          <Box>
            <Typography variant='subtitle1'>{post.user?.username}</Typography>
            <Typography variant='caption' color='text.secondary'>
              {post.updatedAt ? `Edited: ${new Date(post.updatedAt).toLocaleString()}` : `Created: ${new Date(post.createdAt).toLocaleString()}`}
            </Typography>
          </Box>
        </Stack>

        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Stack>


      <Divider sx={{ my: 2 }} />


      <Box sx={{ flex: 1, overflowY: 'auto', pr: 1 }}>
        {comments.length === 0 ? (
          <Typography variant='body2' color='text.secondary'>No comments yet. Be the first to comment!</Typography>
        ) : (
          comments.map((comment) => (
            <CommentCard key={comment.id} comment={comment} />
          ))
        )}
      </Box>


      <Divider sx={{ my: 2 }} />


      <Stack spacing={1}>
        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <Typography variant='caption' color='text.secondary'>
            {post.commentCount ?? 0} comment{post.commentCount === 1 ? '' : 's'}
          </Typography>

          <IconButton>
            <FavoriteBorderIcon />
          </IconButton>
        </Stack>


        <Box sx={{ mt: 1 }}>
          <input
            type='text'
            placeholder='Write a comment...'
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              fontSize: '14px',
            }}
          />
        </Box>
      </Stack>


    </Box>
  )
}
