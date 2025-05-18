// import PaginationBox from '@/components/shared/PaginationBox'

// ====================< IMPORTS: REACT >=================================
import { Dispatch, SetStateAction } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Paper, FormControl, InputLabel, MenuItem, Pagination, Select, Stack } from '@mui/material'
import PaginationFilterMenu from '@/components/shared/PaginationFilterMenu'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useTheme, useMediaQuery } from '@mui/material'

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================


interface PaginationBoxProps {
  totalPages: number
  page: number
  onPageChange: (_: any, value: number) => void

  // Optional: Per-page settings
  showPerPageSelect?: boolean
  perPage?: number
  perPageOptions?: number[]
  onPerPageChange?: (e: any) => void

  // Optional: Extra sx
  sx?: object

  // Optional: Filter menu
  showFilterMenu?: boolean
  sort?: 'ASC' | 'DESC'
  setSort?: Dispatch<SetStateAction<'ASC' | 'DESC'>>
  sortBy?: string
  setSortBy?: Dispatch<SetStateAction<string>>
  sortByOptions?: { label: string; value: string }[]
  search?: string
  setSearch?: Dispatch<SetStateAction<string>>
  searchField?: string
  setSearchField?: Dispatch<SetStateAction<string>>
  searchFields?: { label: string; value: string }[]

  // Optional: Filter menu button
  btnSize?: 'small' | 'medium' | 'large'
  iconSize?: 'small' | 'medium' | 'large'
}


export default function PaginationBox({
  totalPages,
  page,
  onPageChange,
  showPerPageSelect = false,
  perPage = 15,
  perPageOptions = [15, 30, 50],
  onPerPageChange,
  sx = {},
  showFilterMenu,
  sort,
  setSort,
  sortBy,
  setSortBy,
  sortByOptions,
  search,
  setSearch,
  searchField,
  setSearchField,
  searchFields,
  btnSize,
  iconSize
}: PaginationBoxProps) {
  // Responsive theme helpers.
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))


  // Render pagination with optional filters.
  return (
    <Paper
      elevation={8}
      sx={{
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        px: 2,
        py: 1,
        bgcolor: 'background.paper',
        ...sx
      }}
    >


      {showPerPageSelect && (
        <FormControl size='small' sx={{ width: '76px' }}>
          <InputLabel id='per-page-label'>Per Page</InputLabel>

          <Select labelId='per-page-label' value={perPage} label='Per Page' onChange={onPerPageChange} sx={{ fontSize: '12px' }}>
            {perPageOptions.map((num) => (
              <MenuItem key={num} value={num} sx={{ fontSize: '12px' }}>{num}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

      <Stack direction='row' spacing={0.5} alignItems='center'>
        <Pagination
          count={totalPages}
          page={page}
          onChange={onPageChange}
          size={isMobile ? 'small' : 'medium'}
          sx={{
            '& .MuiPaginationItem-root': {
              fontSize: { xs: '12px !important', md: '14px !important' }
            },
            '& .MuiPaginationItem-icon': {
              fontSize: '12px'
            }
          }}
        />

        {showFilterMenu && (
          <PaginationFilterMenu
            sort={sort}
            setSort={setSort}
            sortBy={sortBy}
            setSortBy={setSortBy}
            sortByOptions={sortByOptions}
            search={search}
            setSearch={setSearch}
            searchField={searchField}
            setSearchField={setSearchField}
            searchFieldOptions={searchFields}
            btnSize={btnSize}
            iconSize={iconSize}
          />
        )}
      </Stack>


    </Paper>
  )
}
