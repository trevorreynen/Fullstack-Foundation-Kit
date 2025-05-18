// import PaginationFilterMenu from '@/components/shared/PaginationFilterMenu'

// ====================< IMPORTS: REACT >=================================
import React, { useState, Dispatch, SetStateAction } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { Box, Menu, MenuItem, TextField, IconButton, Typography, Select, FormControl, InputLabel } from '@mui/material'

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

  btnSize?: 'small' | 'medium' | 'large'
  iconSize?: 'small' | 'medium' | 'large'
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
  searchFieldOptions = [],
  btnSize,
  iconSize
}: PaginationFilterMenuProps) {
  // Anchor state for menu dropdown.
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  // Menu open/close handlers.
  const handleOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  // Dynamic options for sort direction.
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


  // Render pagination filter menu.
  return (
    <>
      <IconButton onClick={handleOpen} size={btnSize}>
        <FilterAltIcon fontSize={iconSize} />
      </IconButton>


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
