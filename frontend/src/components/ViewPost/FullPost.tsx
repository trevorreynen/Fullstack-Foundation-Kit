// import FullPost from '@/components/ViewPost/FullPost'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Stack, Typography, Avatar, Divider, Paper } from '@mui/material'
import CommentBtn from '@/components/common/CommentBtn'
import DateDisplay from '@/components/common/DateDisplay'
import LikeBtn from '@/components/common/LikeBtn'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================
import { usePostStore } from '@/stores/usePostStore'

// ====================< IMPORTS: STYLES >================================


interface FullPostProps {
  postId: number
  showComments: boolean
  onCommentClick: () => void
}


export default function FullPost({ postId, showComments, onCommentClick }: FullPostProps) {
  // 1. Get posts from store and find matching post.
  const { posts } = usePostStore()
  const livePost = posts.find((p) => p.id === postId)

  // 2. Loading & Errors.
  if (!livePost) {
    return <div>Error loading post...</div> // TODO: Add skeleton or error page.
  }


  // 3. Render fullpost.
  return (
    <Paper elevation={4} sx={{ width: '100%', maxWidth: 600, height: '100%', minHeight: '100%', p: 2 }}>


      {!showComments && (
        <Stack direction='row' alignItems='center' spacing={2} sx={{ mb: 2 }}>
          <Avatar
            src={`${process.env.API_BASE!.replace('/api', '')}${livePost.user?.profileIconUrl || '/uploads/default-profile-icon.png'}`}
            sx={{ width: 48, height: 48 }}
          />
          <Box>
            <Typography variant='h6'>{livePost.user?.username}</Typography>

            <DateDisplay createdAt={livePost.createdAt} updatedAt={livePost.updatedAt} />
          </Box>
        </Stack>
      )}


      <Typography variant='h5' sx={{ mb: 1 }}>{livePost.title}</Typography>
      <Typography variant='body1' sx={{ mb: 2 }}>{livePost.content}</Typography>


      <Divider sx={{ my: 2 }} />


      {!showComments && (
        <Stack direction='row' spacing={1} alignItems='center' justifyContent='flex-end'>
          <LikeBtn
            type='post'
            targetId={livePost.id}
            defaultLiked={livePost.likedByUser ?? false}
            defaultLikeCount={livePost.likeCount ?? 0}
          />

          <CommentBtn commentCount={livePost.commentCount ?? 0} onClick={onCommentClick} />
        </Stack>
      )}


    </Paper>
  )
}
