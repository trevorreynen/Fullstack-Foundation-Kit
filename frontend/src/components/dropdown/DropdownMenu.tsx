// import DropdownMenu from '@/components/dropdown/DropdownMenu'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect, useRef } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import { ThemeProvider, createTheme, IconButton, Divider, Stack } from '@mui/material'
import UserAvatar from '@/components/shared/UserAvatar'

// ====================< IMPORTS: TYPES >=================================
import { DropdownMenuProps, MenuLevel } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './DropdownMenu.scss'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ChevronRightIcon from '@mui/icons-material/ChevronRight';


const darkTheme = createTheme({
  palette: {
    mode: 'dark'
  }
})


export default function DropdownMenu({ items, button }: DropdownMenuProps) {
  // Local state and refs.
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  // Track nested submenu structure.
  const [menuStack, setMenuStack] = useState<MenuLevel[]>([{ items }])
  const currentMenu = menuStack[menuStack.length - 1].items

  // Handle clicks outside to close dropdown.
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
        setMenuStack([{ items }])
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])


  // Render dropdown menu.
  return (
    <ThemeProvider theme={darkTheme}>
      <div className='DropdownMenu' ref={menuRef}>


        <div onClick={() => { setOpen(!open); if (!open) { setMenuStack([{ items }]) } }} className='dropdown-trigger'>{button}</div>

        {open && (
          <div className='dropdown-list'>
            {menuStack.length > 1 && (
              <div className='dropdown-submenu-header'>
                <IconButton onClick={() => setMenuStack(menuStack.slice(0, -1))}><ArrowBackIcon fontSize='medium' /></IconButton>
                <div className='submenu-label'>{menuStack[menuStack.length - 1].label}</div>
              </div>
            )}

            {currentMenu.map((item, idx) => {
              if (item.type === 'divider') {
                return <div key={idx} className='dropdown-divider' />
              }

              if (item.type === 'header') {
                return (
                  <Stack key={idx} className='dropdown-profile-header' direction='row' divider={<Divider orientation='vertical' flexItem />} spacing={2}>
                    <div
                      onClick={() => {
                        setOpen(false)
                        setTimeout(() => {
                          item.onViewProfile?.()
                        }, 100)
                      }}
                    >
                      <UserAvatar
                        profileIconKey={item.profileIconKey}
                        urlSize={64}
                        renderSize={50}
                        draggable={false}
                      />
                    </div>
                    <Stack className='profile-info'>
                      <div className='username'>{item.username}</div>
                      <div className='view-profile' onClick={() => { setOpen(false); item.onViewProfile?.(); }}>View your profile</div>
                    </Stack>
                  </Stack>
                )
              }

              if (item.type === 'submenu') {
                return (
                  <div key={idx} className='dropdown-item-submenu' onClick={() => setMenuStack([...menuStack, { label: item.label, items: item.submenu }])}>
                    <div className='left'>
                      {item.icon && (<span className='dropdown-icon'>{item.icon}</span>)}
                      <span className='dropdown-label'>{item.label}</span>
                    </div>

                    <ChevronRightIcon className='right' fontSize='medium' />
                  </div>
                )
              }

              if (item.type === 'item-text') {
                return (
                  <div key={idx} className='dropdown-item-text'>
                    <span>{item.label}</span>
                  </div>
                )
              }

              return (
                <div key={idx} className='dropdown-item' onClick={item.onClick}>
                  {item.icon && (<span className='dropdown-icon'>{item.icon}</span>)}
                  <span className='dropdown-label'>{item.label}</span>
                </div>
              )
            })}
          </div>
        )}


      </div>
    </ThemeProvider>
  )
}

