// import HoverMenuBtn from '@/components/common/HoverMenuBtn'

// ====================< IMPORTS: REACT >=================================
import { useState, MouseEvent } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { IconButton, Menu, MenuItem, Tooltip } from '@mui/material'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import MoreHorizIcon from '@mui/icons-material/MoreHoriz'


type Option = {
  label: string
  onClick: () => void
  disabled?: boolean
}

type Props = {
  options: Option[]
  tooltip?: string
  disabled?: boolean
}


export default function HoverMenuBtn({ options, tooltip, disabled }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const handleOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)

  return (
    <>
      <Tooltip title={tooltip ?? ''}>
        <span>
          <IconButton
            onClick={handleOpen}
            disabled={disabled}
            size='small'
            sx={{ opacity: disabled ? 0.4 : 1 }}
          >
            <MoreHorizIcon />
          </IconButton>
        </span>
      </Tooltip>

      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {options.map(({ label, onClick, disabled }) => (
          <MenuItem
            key={label}
            disabled={disabled}
            onClick={() => {
              handleClose()
              onClick()
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>
    </>
  )
}

