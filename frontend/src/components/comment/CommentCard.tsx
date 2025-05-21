// import CommentCard from '@/components/comment/CommentCard'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect, useRef } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Typography, Stack, Button } from '@mui/material'
import DateDisplay from '@/components/shared/DateDisplay'
import HoverMenuBtn from '@/components/shared/HoverMenuBtn'
import LikeBtn from '@/components/shared/LikeBtn'
import UserAvatar from '@/components/shared/UserAvatar'
import CommentInput from '@/components/comment/CommentInput'

// ====================< IMPORTS: TYPES >=================================
import { CommentCardProps } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================
import { useCommentStore } from '@/stores/useCommentStore'

// ====================< IMPORTS: STYLES >================================
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'




export default function CommentCard({ comment, depth = 0, highlightId }: CommentCardProps) {
  // Global user context and comment store actions.
  const { user } = useUser()
  const {
    fetchCommentsForPost,
    activeReplyTargetId,
    setActiveReplyTargetId,
    currentlyEditingCommentId,
    setCurrentlyEditingCommentId
  } = useCommentStore()

  // Permissions.
  const canDelete = user?.id === comment.userId
  const canEdit = user?.id === comment.userId
  const isEditing = currentlyEditingCommentId === comment.id

  // Replies state.
  const [repliesExpanded, setRepliesExpanded] = useState(false)
  const replies = comment.replies || []
  const isReplyingHere = activeReplyTargetId === comment.id

  // Scroll and highlight comment when navigated to via link.
  const commentRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (highlightId === comment.id && commentRef.current) {
      commentRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })

      commentRef.current.style.backgroundColor = '#ffeaa7'
      setTimeout(() => {
        if (commentRef.current) {
          commentRef.current.style.transition = 'background-color 1s ease'
          commentRef.current.style.backgroundColor = 'transparent'
        }
      }, 500)
    }
  }, [highlightId, comment.id])

  // Submission handler for reply.
  const handleReplySubmit = async (text: string) => {
    try {
      await api('/comments/reply', {
        method: 'POST',
        body: {
          postId: comment.postId,
          content: text,
          parentCommentId: depth === 0 ? comment.id : comment.parentCommentId
        }
      })

      await fetchCommentsForPost(comment.postId!)
      setActiveReplyTargetId(null)
      setRepliesExpanded(true)
    } catch (err) {
      console.error('Failed to submit reply:', err)
    }
  }


  // Render comment card.
  return (
    <Box ref={commentRef} sx={{ ml: depth === 1 ? 4 : 0, mb: 1 }}>


      <Stack direction='row' spacing={1} sx={{ alignItems: 'flex-start', width: '100%' }}>
        <UserAvatar profileIconKey={comment.user?.profileIconKey ?? null} urlSize={128} renderSize={40} draggable={false} />

        <Stack direction='column' sx={{ display: 'flex', justifyContent: 'flex-start', width: '100%' }}>
          <Stack direction='row' sx={{ display: 'flex', alignItems: 'center', width: '100%', mb: 0.2 }}>
            <Typography sx={{ lineHeight: 1, fontSize: '14px', fontWeight: '600', mr: 1 }}>@{comment.user?.username}</Typography>
            <DateDisplay createdAt={comment.createdAt} updatedAt={comment.updatedAt} displayFontSize={12} tooltipFontSize={11} showLabel={false} />
          </Stack>

          {isEditing ? (
            <Box sx={{ mt: 1 }}>
              <CommentInput
                mode='reply'
                autoFocus
                submitLabel='Save'
                replyingToUsername={undefined}
                onCancel={() => setCurrentlyEditingCommentId(null)}
                onSubmit={async (text) => {
                  try {
                    await api(`/comments/${comment.id}`, {
                      method: 'PATCH',
                      body: { content: text }
                    })

                    await fetchCommentsForPost(comment.postId!)
                    setCurrentlyEditingCommentId(null)
                  } catch (err) {
                    console.error('Failed to update comment:', err)
                  }
                }}
              />
            </Box>
          ) : (
            <Typography sx={{ width: '100%', fontSize: 13, lineHeight: '20px', whiteSpace: 'pre-line' }}>
              {comment.content}
            </Typography>
          )}


          <Stack direction='row' spacing={2} alignItems='center'>
            <LikeBtn
              type='comment'
              targetId={comment.id}
              defaultLiked={comment.likedByUser ?? false}
              defaultLikeCount={comment.likeCount ?? 0}
              countPlacement='right'
              btnSize='small'
              iconSize='small'
            />
            <Button
              className='pill-button'
              onClick={() => setActiveReplyTargetId(comment.id)}
              sx={{ height: '32px !important', color: 'text.primary', '&:hover': { backgroundColor: 'action.hover' }, fontSize: 12, }}
            >
              Reply
            </Button>

            <Box sx={{ ml: 'auto' }}>
              <HoverMenuBtn
                tooltip='Comment actions'
                disabled={!canEdit && !canDelete}
                options={[
                  {
                    label: 'Edit',
                    action: 'edit',
                    targetType: 'comment',
                    targetId: comment.id
                  },
                  {
                    label: 'Delete',
                    action: 'delete',
                    targetType: 'comment',
                    targetId: comment.id
                  }
                ]}
                onAction={async (action, targetType, id) => {
                  if (action === 'delete' && targetType === 'comment') {
                    await api(`/comments/${id}`, { method: 'DELETE' })
                    await fetchCommentsForPost(comment.postId!)
                  } else if (action === 'edit' && targetType === 'comment') {
                    setCurrentlyEditingCommentId(id)
                  }
                }}
              />
            </Box>
          </Stack>

          {isReplyingHere && (
            <Box>
              <CommentInput mode='reply' replyingToUsername={comment.user?.username} onCancel={() => setActiveReplyTargetId(null)} onSubmit={handleReplySubmit} />
            </Box>
          )}
        </Stack>
      </Stack>


      {depth === 0 && replies.length > 0 && (
        <Box sx={{ width: '100%', my: 1, pl: '56px' }}>
          <Button
            className='pill-button'
            onClick={() => setRepliesExpanded((prev) => !prev)}
            sx={{ height: '32px !important', color: '#3ea6ff', fontSize: '14px', cursor: 'pointer' }}
          >
            {repliesExpanded ? <ExpandLessIcon sx={{ mr: 0.5 }} /> : <ExpandMoreIcon sx={{ mr: 0.5 }} />}
            {repliesExpanded ? 'Hide replies' : `${replies.length} repl${replies.length === 1 ? 'y' : 'ies'}`}
          </Button>
        </Box>
      )}

      {depth === 0 && repliesExpanded && replies.map((reply) => (
        <CommentCard key={reply.id} comment={reply} depth={1} />
      ))}


    </Box>
  )
}
