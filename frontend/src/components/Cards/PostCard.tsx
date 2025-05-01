// import PostCard from '@/components/Cards/PostCard'

// ====================< IMPORTS: REACT >=================================
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Card, CardContent, Typography, Stack, CardMedia, Divider } from '@mui/material'
import { Link as MUILink } from '@mui/material'
import CommentBtn from '@/components/common/CommentBtn'
import DateDisplay from '@/components/common/DateDisplay'
import LikeBtn from '@/components/common/LikeBtn'

// ====================< IMPORTS: TYPES >=================================
import { PostCardProps } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================
import { usePostStore } from '@/stores/usePostStore'

// ====================< IMPORTS: STYLES >================================



export default function PostCard({ post, viewMode = 'forum' }: PostCardProps) {
  // 1. React router navigate hook.
  const navigate = useNavigate()

  // 2. Get global posts list and setter from Zustand store.
  const { posts, setPosts } = usePostStore()

  // 3. Get live synced version of this post from Zustand store (keeps like/comment count fresh).
  const livePost = usePostStore((state) =>
    state.posts.find((p) => p.id === post.id)
  )

  // 4. Add post to the store if it's not already.
  useEffect(() => {
    if (!posts.find((p) => p.id === post.id)) {
      setPosts([...posts, post])
    }
  }, [post, posts, setPosts])

  // 5. Comment click handler.
  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/posts/${post.id}`)
  }

  // 6. Loading & Errors.
  if (!livePost) {
    return <div>Error loading post..</div> // TODO: Add skeleton?
  }


  // 7. Render post card.
  return (
    <Card
      elevation={5}
      onClick={(e) => {
        const target = e.target as HTMLElement
        // Ignore if the click was inside a link or button
        if (target.closest('a') || target.closest('button') || target.closest('[role="button"]')) return
        navigate(`/post/${post.id}`)
      }}
      sx={{ cursor: 'pointer', transition: 'background-color 0.3s', '&:hover': { backgroundColor: (theme) => theme.palette.action.hover }}}
    >
      <CardContent>


        <Stack direction='row' alignItems='center' sx={{ width: '100%', mb: 1 }}>
          <CardMedia
            image={`${process.env.API_BASE!.replace('/api', '')}${post.user?.profileIconUrl || '/uploads/default-profile-icon.png'}`}
            sx={{ width: 60, height: 60, clipPath: 'polygon(0 0, 100% 0%, 80% 100%, 0% 100%)', mr: 1 }}
          />
          <MUILink component={Link} to={`/user/${post.user?.username}`} variant='h5' underline='hover' sx={{ color: 'text.primary', fontWeight: 600 }}>
            {post.user?.username}
          </MUILink>
        </Stack>


        <Typography variant='h6'>{post.title}</Typography>



        {viewMode === 'full' && (
          <Typography variant='body2' color='text.secondary' sx={{ mb: 1 }}>
            {post.content.length > 140 ? post.content.slice(0, 140) + '...' : post.content}
          </Typography>
        )}


        <Divider sx={{ my: 1 }} />


        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <DateDisplay createdAt={post.createdAt} updatedAt={post.updatedAt} />


          <Stack direction='row' spacing={1} alignItems='center'>
            <LikeBtn
              type='post'
              targetId={livePost.id}
              defaultLiked={livePost.likedByUser ?? false}
              defaultLikeCount={livePost.likeCount ?? 0}
            />

            <CommentBtn commentCount={livePost.commentCount ?? 0} onClick={handleCommentClick} />
          </Stack>
        </Stack>


      </CardContent>
    </Card>
  )
}
