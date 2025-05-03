// import PaginationFilterMenu from '@/components/common/PaginationFilterMenu'

// ====================< IMPORTS: REACT >=================================
import React, { useState, useRef, Dispatch, SetStateAction } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Menu, MenuItem, TextField, Button, Typography, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import FilterAltIcon from '@mui/icons-material/FilterAlt'


interface PaginationFilterMenuProps {
  // Optional external control props
  sort?: 'ASC' | 'DESC'
  setSort?: Dispatch<SetStateAction<'ASC' | 'DESC'>>

  sortBy?: string
  setSortBy?: Dispatch<SetStateAction<string>>
  sortByOptions?: { label: string; value: string }[]

  search?: string
  setSearch?: (val: string) => void

  searchField?: string
  setSearchField?: (val: string) => void

  searchFieldOptions?: { label: string; value: string }[]
}


export default function PaginationFilterMenu({
  sort,
  setSort,
  sortBy,
  setSortBy,
  sortByOptions = [],
  search,
  setSearch,
  searchField,
  setSearchField,
  searchFieldOptions = []
}: PaginationFilterMenuProps) {
  // 1. Anchor states for menu.
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // 2. Handle anchor state functions.
  const handleClick = (event: React.MouseEvent<HTMLElement>) => { setAnchorEl(event.currentTarget) }
  const handleClose = () => { setAnchorEl(null) }

  // 3. Dynamic options for sort direction.
  const selectedSortByLabel = sortByOptions?.find((opt) => opt.value === sortBy)?.label
  const sortDirectionOptions =
    selectedSortByLabel?.includes('Like')
      ? [
          { label: 'Most Liked', value: 'DESC' },
          { label: 'Least Liked', value: 'ASC' }
        ]
      : selectedSortByLabel?.includes('Comment')
      ? [
          { label: 'Most Comments', value: 'DESC' },
          { label: 'Least Comments', value: 'ASC' }
        ]
      : [
          { label: 'Newest', value: 'DESC' },
          { label: 'Oldest', value: 'ASC' }
        ]


  // 4. Render pagination filter menu.
  return (
    <>


      <Button variant='outlined' onClick={handleClick} startIcon={<FilterAltIcon />} sx={{ ml: 2 }}>Filters</Button>


      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        PaperProps={{ sx: { padding: 2, width: 300 } }}
        anchorOrigin={{ vertical: 'top', horizontal: 'left' }}
        transformOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      >


        <Box mb={2}>
          <Typography variant='subtitle2' mb={0.5}>Sort by</Typography>

          <FormControl fullWidth size='small'>
            <Select value={sortBy || ''} onChange={(e) => setSortBy?.(e.target.value)}>
              {sortByOptions?.map((opt) => (
                <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box mb={2}>
          <Typography variant='subtitle2' mb={0.5}>Sort Direction</Typography>

          <FormControl fullWidth size='small'>
            <InputLabel id='sort-label'>Sort Direction</InputLabel>

            <Select labelId='sort-label' value={sort ?? ''} onChange={(e) => setSort?.(e.target.value as 'ASC' | 'DESC')} label='Sort Direction'>
              {sortDirectionOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Box mb={2}>
          <Typography variant='subtitle2' mb={0.5}>Search</Typography>

          <TextField size='small' placeholder='Search...' fullWidth value={search || ''} onChange={(e) => setSearch?.(e.target.value)} />
        </Box>

        {/* Search By Field (Dropdown) */}
        {searchFieldOptions.length > 0 && (
          <Box>
            <Typography variant='subtitle2' mb={0.5}>Search Field</Typography>

            <FormControl fullWidth size='small'>
              <InputLabel id='search-field-label'>Field</InputLabel>

              <Select
                labelId='search-field-label'
                value={searchField || ''}
                onChange={(e) => setSearchField?.(e.target.value)}
                label='Field'
              >
                {searchFieldOptions.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>{opt.label}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        )}


      </Menu>


    </>
  )
}

