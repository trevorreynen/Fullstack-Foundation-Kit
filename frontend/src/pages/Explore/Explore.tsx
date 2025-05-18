// import Explore from '@/pages/Explore/Explore'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Typography, Stack } from '@mui/material'
import PaginationBox from '@/components/shared/PaginationBox'
import PostCard from '@/components/post/PostCard'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================
import { usePostStore } from '@/stores/usePostStore'

// ====================< IMPORTS: STYLES >================================


export default function Explore() {
  // Zustand post store and local error state.
  const { posts, setPosts } = usePostStore()
  const [error, setError] = useState<string | null>(null)

  // Initial post fetch on mount.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await api('/posts', { method: 'GET' })
        setPosts(res.data.items)
      } catch (err) {
        setError('Failed to load posts')
        console.error(err)
      }
    }

    fetchPosts()
  }, [setPosts])

  // Local pagination states.
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(15)
  const [totalPages, setTotalPages] = useState(0)

  // Local sort query state and available sorting options.
  const [sort, setSort] = useState<'ASC' | 'DESC'>('DESC')
  const [sortBy, setSortBy] = useState<string>('createdAt')
  const sortByOptions = [
    { label: 'Date Created', value: 'createdAt' },
    { label: 'Like Count', value: 'likeCount' },
    { label: 'Comment Count', value: 'commentCount' },
  ]

  // Local search query state and available searchable fields.
  const [search, setSearch] = useState('')
  const [searchField, setSearchField] = useState<string>('title')
  const searchFields = [
    { label: 'Title', value: 'title' },
    { label: 'Body', value: 'content' },
    { label: 'Title + Content', value: 'combined' }
  ]

  // Fetch posts on mount using pagination, sorting, and search filters.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = {
          page,
          pageSize: perPage,
          sort,
          sortBy,
          search,
          searchableFields: JSON.stringify(Array.isArray(searchField) ? searchField : [searchField])
        }

        const { data } = await api('/posts', { method: 'GET', query })

        setPosts(data.items)
        setTotalPages(data.meta.totalPages)
      } catch (err) {
        setError('Failed to load posts')
        console.error(err)
      }
    }

    fetchPosts()
  }, [page, perPage, sort, sortBy, search, searchField, setPosts])

  // Handle loading and error fallbacks.
  if (error) {
    return <Typography>{error}</Typography>
  }

  if (!posts) {
    return <Typography>Loading...</Typography>
  }


  // Render explore page.
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: { xs: '95%', sm: '85%', md: '70%', lg: '65%' },
        px: { xs: 0, sm: 2 }, py: { xs: 1, sm: 2 },
        mx: 'auto'
      }}
    >


      <Typography variant='h4' sx={{ width: '100%', mb: 2, textAlign: 'center' }}>Explore</Typography>

      <Box sx={{ pb: 6 }}>
        <Stack spacing={2}>
          {posts.map(post => (
            <PostCard key={post.id} post={post} viewMode='full' />
          ))}
        </Stack>
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: '50%',
          width: { xs: '95%', sm: '85%', md: '70%', lg: '65%' },
          mx: 'auto',
          transform: 'translateX(-50%)'
        }}
      >
        <PaginationBox
          totalPages={totalPages}
          page={page}
          onPageChange={(_, val) => setPage(val)}
          showPerPageSelect
          perPage={perPage}
          onPerPageChange={(e) => {
            setPerPage(e.target.value)
            setPage(1)
          }}
          perPageOptions={[15, 30, 50]}
          showFilterMenu={true}
          sort={sort}
          setSort={setSort}
          sortBy={sortBy}
          setSortBy={setSortBy}
          sortByOptions={sortByOptions}
          search={search}
          setSearch={setSearch}
          searchField={searchField}
          setSearchField={setSearchField}
          searchFields={searchFields}
          btnSize='small'
          iconSize='small'
        />
      </Box>


    </Box>
  )
}
