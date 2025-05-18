// import PostCard from '@/components/post/PostCard'

// ====================< IMPORTS: REACT >=================================
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Card, CardContent, Typography, Stack, Divider } from '@mui/material'
import { Link as MUILink } from '@mui/material'
import CommentBtn from '@/components/shared/CommentBtn'
import DateDisplay from '@/components/shared/DateDisplay'
import LikeBtn from '@/components/shared/LikeBtn'
import UserAvatar from '@/components/shared/UserAvatar'

// ====================< IMPORTS: TYPES >=================================
import { PostCardProps } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================
import { usePostStore } from '@/stores/usePostStore'

// ====================< IMPORTS: STYLES >================================



export default function PostCard({ post, viewMode = 'forum' }: PostCardProps) {
  // React router navigate hook.
  const navigate = useNavigate()

  // Global posts list and setter from Zustand store.
  const { posts, setPosts } = usePostStore()

  // Get live synced version of this post from Zustand store (keeps like/comment count fresh).
  const livePost = usePostStore((state) => state.posts.find((p) => p.id === post.id))

  // Sync this post into global store if missing.
  useEffect(() => {
    if (!posts.find((p) => p.id === post.id)) {
      setPosts([...posts, post])
    }
  }, [post, posts, setPosts])

  // Handle comment click to view post with comments open.
  // TODO: Need to add proper functionality for this.
  const handleCommentClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    navigate(`/posts/${post.id}`)
  }

  // Loading state fallback.
  if (!livePost) {
    return <div>Error loading post..</div> // TODO: Add skeleton?
  }


  // Render post card.
  return (
    <Card
      elevation={3}
      onClick={(e) => {
        const target = e.target as HTMLElement
        // Ignore if the click was inside a link or button
        if (target.closest('a') || target.closest('button') || target.closest('[role="button"]')) {
          return
        }

        navigate(`/post/${post.id}`)
      }}
      sx={{
        p: 2,
        pb: 1.5,
        cursor: 'pointer',
        transition: 'background-color 0.3s',
        '&:hover': { backgroundColor: (theme) => theme.palette.action.hover }
      }}
    >
      <CardContent sx={{ p: '0px !important' }}>


        <Stack direction='row' alignItems='center' sx={{ width: '100%', mb: 1 }}>
          <UserAvatar
            profileIconKey={post.user?.profileIconKey ?? null}
            urlSize={128}
            sx={{ width: 40, height: 40 }}
            draggable={false}
          />
          <MUILink
            component={Link}
            to={`/user/${post.user?.username}`}
            underline='hover'
            sx={{
              ml: 1.5,
              color: 'text.primary',
              fontSize: '20px',
              fontWeight: 600
            }}
          >
            {post.user?.username}
          </MUILink>
        </Stack>


        <Typography
          sx={{
            fontSize: '22px',
            fontWeight: 'bold',
            lineHeight: '30px',
            display: '-webkit-box',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 1,
            overflow: 'hidden',
            textOverflow: 'ellipsis'
          }}
        >
          {post.title}
        </Typography>



        {viewMode === 'full' && (
          <Typography
            sx={{
              fontSize: '16px',
              color: 'text.secondary',
              display: '-webkit-box',
              WebkitBoxOrient: 'vertical',
              WebkitLineClamp: { xs: 1, sm: 1, md: 2 },
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {post.content}
          </Typography>
        )}


        <Divider sx={{ my: 1 }} />


        <Stack direction='row' justifyContent='space-between' alignItems='center'>
          <DateDisplay createdAt={post.createdAt} updatedAt={post.updatedAt} displayFontSize='14px' />


          <Stack direction='row' spacing={1} alignItems='center'>
            <LikeBtn
              type='post'
              targetId={livePost.id}
              defaultLiked={livePost.likedByUser ?? false}
              defaultLikeCount={livePost.likeCount ?? 0}
              countPlacement='right'
              btnSize='medium'
              iconSize='small'
            />

            <CommentBtn
              commentCount={livePost.commentCount ?? 0}
              onClick={handleCommentClick}
              countPlacement='right'
              btnSize='medium'
              iconSize='small'
            />
          </Stack>
        </Stack>


      </CardContent>
    </Card>
  )
}
