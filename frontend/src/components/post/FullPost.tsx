// import FullPost from '@/components/post/FullPost'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect, useRef } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Stack, Typography, Paper, Divider } from '@mui/material'
import CommentBtn from '@/components/shared/CommentBtn'
import DateDisplay from '@/components/shared/DateDisplay'
import LikeBtn from '@/components/shared/LikeBtn'
import UserAvatar from '@/components/shared/UserAvatar'
import HoverMenuBtn from '@/components/shared/HoverMenuBtn'
import PostForm from '@/components/post/PostForm'

// ====================< IMPORTS: TYPES >=================================
import { FullPostProps } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useTheme, useMediaQuery } from '@mui/material'
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================
import { usePostStore } from '@/stores/usePostStore'

// ====================< IMPORTS: STYLES >================================


export default function FullPost({ postId, onCommentClick }: FullPostProps) {
  // React router navigate hook.
  const navigate = useNavigate()

  // Global authenticated user context.
  const { user } = useUser()

  // Global posts list and getter from Zustand store.
  const { posts, fetchPostById } = usePostStore()

  // Get live synced version of this post from Zustand store.
  const livePost = posts.find((p) => p.id === postId)

  // Responsive theme helpers.
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('md'))

  // UI control state and permissions.
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [showFullTitle, setShowFullTitle] = useState(false)
  const canEditOrDelete = user?.id === livePost?.userId

  // Determine if the title is being clamped (for 'See More' toggle).
  const titleRef = useRef<HTMLDivElement | null>(null)
  const [isClamped, setIsClamped] = useState(false)

  useEffect(() => {
    const el = titleRef.current
    if (el) {
      const computed = window.getComputedStyle(el)
      const lineHeight = parseFloat(computed.lineHeight) || 0
      const clampLines = 2

      const clampedHeight = lineHeight * clampLines
      setIsClamped(el.scrollHeight > clampedHeight + 1) // small buffer
    }
  }, [livePost?.title])

  // Loading state fallback.
  if (!livePost) {
    return <Navigate to='/error404' replace />
  }


  // Render fullpost.
  return (
    <>
      <Paper
        elevation={4}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          width: { xs: '90%', sm: '550px' },
          minWidth: { xs: '90%', sm: '550px' },
          height: '100%',
          minHeight: '100%',
          p: 2,
          borderRadius: 4
        }}
      >

        <Stack direction='column' spacing={1} sx={{ overflow: 'hidden', height: '100%' }}>
          <Stack direction='row' alignItems='center' spacing={2}>
            <UserAvatar
              profileIconKey={livePost.user?.profileIconKey ?? null}
              urlSize={64}
              sx={{ width: { xs: 38, sm: 48 }, height: { xs: 38, sm: 48 } }}
              draggable={false}
            />
            <Box>
              <Typography variant='h6'>{livePost.user?.username}</Typography>

              <DateDisplay createdAt={livePost.createdAt} updatedAt={livePost.updatedAt} displayFontSize={isMobile ? 12 : 14} tooltipFontSize={isMobile ? 10 : 12} />
            </Box>
          </Stack>

          <Box sx={{ minWidth: 0, maxWidth: '100%' }}>
            <Typography
              ref={titleRef}
              sx={{
                fontSize: { xs: '16px', sm: '18px', md: '20px' },
                lineHeight: { xs: '24px', sm: '28px', md: '30px' },
                fontWeight: 'bold',
                ...(!showFullTitle && {
                  display: '-webkit-box',
                  WebkitBoxOrient: 'vertical',
                  WebkitLineClamp: 2,
                  overflow: 'hidden'
                })
              }}
            >
              {livePost.title}
            </Typography>
            {isClamped && (
              <Typography
                onClick={() => setShowFullTitle((prev) => !prev)}
                sx={{ cursor: 'pointer', fontSize: '14px', mt: 0.5, color: 'primary.main' }}
              >
                {showFullTitle ? 'See less' : 'See more'}
              </Typography>
            )}
          </Box>

          <Divider />

          <Box
            className='use-custom-scrollbar'
            sx={{
              flexGrow: 1,
              whiteSpace: 'pre-line',
              fontSize: { xs: '12px', sm: '14px', md: '16px' },
              lineHeight: { xs: '20px', sm: '24px', md: '26px' }
            }}
          >
            {livePost.content}
          </Box>
        </Stack>



        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'absolute',
            right: -52,
            bottom: 5,
            width: '50px',
            zIndex: 2000
          }}
        >
          <Stack direction='column' spacing={1.5} alignItems='center' justifyContent='flex-end'>
            <LikeBtn
              type='post'
              targetId={livePost.id}
              defaultLiked={livePost.likedByUser ?? false}
              defaultLikeCount={livePost.likeCount ?? 0}
              countPlacement='bottom'
              btnSize='medium'
              iconSize='medium'
            />

            <CommentBtn
              commentCount={livePost.commentCount ?? 0}
              onClick={onCommentClick}
              countPlacement='bottom'
              btnSize='medium'
              iconSize='medium'
            />
          </Stack>

          {canEditOrDelete && (
            <Box sx={{ ml: 'auto' }}>
              <HoverMenuBtn
                tooltip='Post actions'
                options={[
                  {
                    label: 'Edit',
                    action: 'edit',
                    targetType: 'post',
                    targetId: livePost.id
                  },
                  {
                    label: 'Delete',
                    action: 'delete',
                    targetType: 'post',
                    targetId: livePost.id
                  }
                ]}
                onAction={async (action, targetType, id) => {
                  if (action === 'edit' && targetType === 'post') {
                    setEditDialogOpen(true)
                  }

                  if (action === 'delete' && targetType === 'post') {
                    try {
                      await api(`/posts/${id}`, { method: 'DELETE' })
                      navigate('/explore')
                    } catch (err) {
                      console.error('Failed to delete post:', err)
                    }
                  }
                }}
              />
            </Box>
          )}
        </Box>


      </Paper>


      <PostForm
        mode='edit'
        open={editDialogOpen}
        postId={livePost.id}
        initialTitle={livePost.title}
        initialContent={livePost.content}
        onCancel={() => setEditDialogOpen(false)}
        onSuccess={async () => {
          await fetchPostById(livePost.id)
          setEditDialogOpen(false)
        }}
      />
    </>
  )
}
