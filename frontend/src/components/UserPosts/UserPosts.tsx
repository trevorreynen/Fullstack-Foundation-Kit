// import UserPosts from '@/components/UserPosts/UserPosts'

// ====================< IMPORTS: REACT >=================================
import { useState, useMemo } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Accordion, AccordionSummary, AccordionDetails, Typography, Pagination, Box, Stack, Skeleton } from '@mui/material'
import PostCard from '@/components/Cards/PostCard'

// ====================< IMPORTS: TYPES >=================================
import { UserProfile, Post } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


type Props = {
  user: UserProfile
  posts: Post[] | null
}


export default function UserPosts({ user, posts }: Props) {

  // Pagination states
  const [page, setPage] = useState(1)
  const postsPerPage = 10
  // Pagination logic
  const paginatedPosts = useMemo(() => {
    if (!posts) {
      return []
    }

    const start = (page - 1) * postsPerPage

    return posts.slice(start, start + postsPerPage)
  }, [page, posts])
  const totalPages = posts ? Math.ceil(posts.length / postsPerPage) : 1


  return (
    <Accordion defaultExpanded disableGutters elevation={3} sx={{ mb: 3 }}>


      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' fontWeight={600}>
          {user.username}'s Posts
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        {!posts ? (
          <Stack spacing={2}>
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} variant='rectangular' height={120} />
            ))}
          </Stack>
        ) : paginatedPosts.length === 0 ? (
          <Typography variant='body2' color='text.secondary'>
            No posts to display.
          </Typography>
        ) : (
          <>
            <Stack spacing={2}>
              {paginatedPosts.map((post) => (
                <PostCard key={post.id} post={post} viewMode='forum' />
              ))}
            </Stack>

            {totalPages > 1 && (
              <Box mt={3} display='flex' justifyContent='center'>
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(_, value) => setPage(value)}
                  color='primary'
                  shape='rounded'
                />
              </Box>
            )}
          </>
        )}
      </AccordionDetails>


    </Accordion>
  )
}
