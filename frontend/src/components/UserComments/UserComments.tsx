// import UserComments from '@/components/UserComments/UserComments'

// ====================< IMPORTS: REACT >=================================
import { useState } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Accordion, AccordionSummary, AccordionDetails, Typography, Skeleton, Box, Stack } from '@mui/material'
import ProfileCommentCard from '@/components/Cards/ProfileCommentCard'

// ====================< IMPORTS: TYPES >=================================
import { UserProfile, PostComment } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


type Props = {
  user: UserProfile
  comments: PostComment[] | null
}


export default function UserComments({ user, comments }: Props) {

  const dummyComments = [
    { id: 1, content: 'Nice post!', postId: 101 },
    { id: 2, content: 'I disagree.', postId: 102 }
  ]


  return (
    <Accordion defaultExpanded disableGutters elevation={3} sx={{ mb: 3 }}>


      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' fontWeight={600}>
          {user.username}'s Comments
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        {!comments ? (
          <Stack spacing={2}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} variant='rectangular' height={100} />
            ))}
          </Stack>
        ) : comments.length === 0 ? (
          <Typography variant='body2' color='text.secondary'>
            No comments to display.
          </Typography>
        ) : (
          <Stack spacing={2}>
            {comments.map((comment) => (
              <ProfileCommentCard key={comment.id} comment={comment} />
            ))}
          </Stack>
        )}
      </AccordionDetails>


    </Accordion>
  )
}
