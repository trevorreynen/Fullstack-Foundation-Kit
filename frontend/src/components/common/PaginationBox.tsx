// import PaginationBox from '@/components/common/PaginationBox'

// ====================< IMPORTS: REACT >=================================
import { useState, Dispatch, SetStateAction } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, FormControl, InputLabel, MenuItem, Pagination, Select } from '@mui/material'
import PaginationFilterMenu from '@/components/common/PaginationFilterMenu'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'

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
  searchFields
}: PaginationBoxProps) {
  // 1. Access MUI theme (for responsive breakpoint logic).
  const theme = useTheme()

  // 2. Detect if current screen width matches 'sm' breakpoint or smaller.
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'))


  // 3. Render pagination box + optional per-page input.
  return (
    <Box
      sx={{
        zIndex: 1000,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        px: 2,
        py: 1,
        bgcolor: 'background.paper',
        boxShadow: '0 -2px 6px rgba(0,0,0,0.15)',
        ...sx
      }}
    >


      {showPerPageSelect && (
        <FormControl size='small' sx={{ width: '80px' }}>
          <InputLabel id='per-page-label'>Per Page</InputLabel>

          <Select labelId='per-page-label' value={perPage} label='Per Page' onChange={onPerPageChange}>
            {perPageOptions.map((num) => (
              <MenuItem key={num} value={num}>{num}</MenuItem>
            ))}
          </Select>
        </FormControl>
      )}

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
        />
      )}

      <Pagination
        count={totalPages}
        page={page}
        onChange={onPageChange}
        size={isSmall ? 'small' : 'medium'}
      />


    </Box>
  )
}
