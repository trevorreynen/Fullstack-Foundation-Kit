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
        const res = await api('/posts', { method: 'GET' })
        setPosts(res.data.items)
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
  const [totalPages, setTotalPages] = useState(0)

  // 3. Sort query states + options.
  const [sort, setSort] = useState<'ASC' | 'DESC'>('DESC')
  const [sortBy, setSortBy] = useState<string>('createdAt')
  const sortByOptions = [
    { label: 'Date Created', value: 'createdAt' },
    { label: 'Like Count', value: 'likeCount' },
    { label: 'Comment Count', value: 'commentCount' },
  ]

  // 4. Search field states + options.
  const [search, setSearch] = useState('')
  const [searchField, setSearchField] = useState<string>('title')
  const searchFields = [
    { label: 'Title', value: 'title' },
    { label: 'Body', value: 'content' },
    { label: 'Title + Content', value: 'combined' }
  ]

  // 4. Pagination page logic.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = {
          page,
          pageSize: perPage,
          sort,
          sortBy,
          search,
          searchableFields: JSON.stringify(
            Array.isArray(searchField) ? searchField : [searchField]
          )
        }

        const res = await api('/posts', { method: 'GET', query })

        setPosts(res.data.items)
        setTotalPages(res.data.meta.totalPages)
      } catch (err) {
        setError('Failed to load posts')
        console.error(err)
      }
    }

    fetchPosts()
  }, [page, perPage, sort, sortBy, search, searchField, setPosts])

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
          {posts.map(post => (
            <PostCard key={post.id} post={post} viewMode='full' />
          ))}
        </Stack>
      </Box>

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
      />


    </Box>
  )
}
