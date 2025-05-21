// import UserPosts from '@/components/profile/UserPosts'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Accordion, AccordionSummary, AccordionDetails, Typography, Stack } from '@mui/material'
import PostCard from '@/components/post/PostCard'
import PaginationBox from '@/components/shared/PaginationBox'

// ====================< IMPORTS: TYPES >=================================
import { UserPostsProps, Post } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'


export default function UserPosts({ user, initialData }: UserPostsProps) {
  // Return early if no data provided.
  if (!initialData) {
    return null
  }

  // Post list state.
  const [posts, setPosts] = useState<Post[]>(initialData.items)

  // Local pagination states.
  const [page, setPage] = useState(initialData.meta.page)
  const [totalPages, setTotalPages] = useState(initialData.meta.totalPages)

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

  // Fetch posts on mount using pagination, sorting, search filters, and username.
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const query = {
            page,
            pageSize: 10,
            sort,
            sortBy,
            search,
            searchableFields: JSON.stringify(Array.isArray(searchField) ? searchField : [searchField])
          }

        const { data } = await api(`/posts/user/${user.username}`, { method: 'GET', query })

        setPosts(data.items)
        setTotalPages(data.meta.totalPages)
      } catch (err) {
        console.error('Failed to fetch posts', err)
      }
    }

    fetchPosts()
  }, [page, sort, sortBy, search, searchField, user.username])


  // Render user posts.
  return (
    <Accordion defaultExpanded disableGutters elevation={3} sx={{ mb: 3 }}>


      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
        <Typography variant='h6' fontWeight={600}>
          {user.username}'s Posts
        </Typography>
      </AccordionSummary>

      <AccordionDetails>
        {posts.length === 0 ? (
          <Typography variant='body2'>No posts yet.</Typography>
        ) : (
          <Stack spacing={2}>
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </Stack>
        )}

        <PaginationBox
          totalPages={totalPages}
          page={page}
          onPageChange={(_, val) => setPage(val)}
          showFilterMenu
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
      </AccordionDetails>


    </Accordion>
  )
}
