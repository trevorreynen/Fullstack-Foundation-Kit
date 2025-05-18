// import HoverMenuBtn from '@/components/shared/HoverMenuBtn'

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


type HoverMenuBtnOption = {
  label: string
  action: 'delete' | 'edit' | 'report'
  targetType: 'comment' | 'post'
  targetId: number
  disabled?: boolean
}

type HoverMenuBtnProps = {
  options: HoverMenuBtnOption[]
  onAction: (action: HoverMenuBtnOption['action'], targetType: HoverMenuBtnOption['targetType'], id: number) => void
  tooltip?: string
  disabled?: boolean
}


export default function HoverMenuBtn({ options, onAction, tooltip, disabled }: HoverMenuBtnProps) {
  // Anchor state for popover menu.
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  // Menu open/close handlers.
  const handleOpen = (event: MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget)
  const handleClose = () => setAnchorEl(null)


  // Render hover menu btn.
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
        {options.map(({ label, action, targetType, targetId, disabled }) => (
          <MenuItem
            key={label}
            disabled={disabled}
            onClick={() => {
              handleClose()
              onAction(action, targetType, targetId)
            }}
          >
            {label}
          </MenuItem>
        ))}
      </Menu>


    </>
  )
}
