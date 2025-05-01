// import Explore from '@/pages/Explore/Explore'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Typography, Stack } from '@mui/material'
import PostCard from '@/components/Cards/PostCard'
import PaginationBox from '@/components/common/PaginationBox'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================
import { usePostStore } from '@/stores/usePostStore'

// ====================< IMPORTS: STYLES >================================


export default function Explore() {
  // 1. Posts fetch + error states.
  const { posts, setPosts } = usePostStore()
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api('/posts')
        setPosts(res)
      } catch (err) {
        setError('Failed to load posts')
        console.error(err)
      }
    }

    fetchPosts()
  }, [setPosts])


  // 2. Pagination states.
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(15)

  // 3. Pagination page logic.
  const start = (page - 1) * perPage
  const end = start + perPage
  const paginatedPosts = posts.slice(start, end)
  const totalPages = Math.ceil(posts.length / perPage)

  // 4. Pagination page logic.
  const handlePageChange = (_: any, value: number) => setPage(value)
  const handlePerPageChange = (e: any) => {
    setPerPage(e.target.value)
    setPage(1)
  }

  // 5. Loading & Errors.
  if (error) {
    return <Typography>{error}</Typography> // TODO: Add alert errors?
  }

  if (!posts) {
    return <Typography>Loading...</Typography> // TODO: Add skeletons.
  }


  // 6. Render explore page.
  return (
    // TODO: Decide to keep or remove custom classes when not using custom style sheets.
    <Box className='Explore' sx={{ display: 'flex', flexDirection: 'column', px: { xs: 0, sm: 2 }, py: { xs: 1, sm: 2 } }}>


      <Typography variant='h4' sx={{ width: '100%', mb: 2, textAlign: 'center' }}>Explore</Typography>

      <Box className='explore-post-list' sx={{ pb: 6 }}>
        <Stack spacing={2}>
          {paginatedPosts.map(post => (
            <PostCard key={post.id} post={post} viewMode='full' />
          ))}
        </Stack>
      </Box>

      <PaginationBox
        totalPages={totalPages}
        page={page}
        onPageChange={handlePageChange}
        showPerPageSelect
        perPage={perPage}
        onPerPageChange={handlePerPageChange}
        perPageOptions={[15, 30, 50]}
      />


    </Box>
  )
}
