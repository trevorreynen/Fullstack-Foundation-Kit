// import DropdownMenu from '@/components/DropdownMenu/DropdownMenu'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect, useRef } from 'react'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================
import { DropdownMenuProps, MenuLevel } from '@/types/DropdownMenuTypes'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './DropdownMenu.scss'


export default function DropdownMenu({ items, button }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const [menuStack, setMenuStack] = useState<MenuLevel[]>([{ items }])

  const currentMenu = menuStack[menuStack.length - 1].items

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


  return (
    <div className='DropdownMenu' ref={menuRef}>


      <div
        onClick={() => {
          setOpen(!open)
          if (!open) {
            setMenuStack([{ items }])
          }
        }}
        className='dropdown-trigger'
      >
        {button}
      </div>

      {open && (
        <div className='dropdown-list'>

          {menuStack.length > 1 && (
            <div className='dropdown-submenu-header'>
              <div className='icon-wrapper' onClick={() => setMenuStack(menuStack.slice(0, -1))}>
                <div className='icon-left-arrow'></div>
              </div>
              <div className='submenu-label'>{menuStack[menuStack.length - 1].label}</div>
            </div>
          )}

          {currentMenu.map((item, idx) => {

            if (item.type === 'divider') {
              return <div key={idx} className='dropdown-divider' />
            }

            if (item.type === 'header') {
              return (
                <div key={idx} className='dropdown-profile-header'>
                  <img
                    src={`${process.env.API_BASE!.replace('/api', '')}${item.profileIconUrl || '/uploads/default-profile-icon.png'}`}
                    className='profile-avatar'
                    alt='Profile Icon'
                    onError={(e) => e.currentTarget.src = `${process.env.API_BASE!.replace('/api', '')}/uploads/default-profile-icon.png`}
                    draggable={false}
                    onClick={() => {
                      setOpen(false)
                      setTimeout(() => {
                        item.onViewProfile?.()
                      }, 100)
                    }}
                  />
                  <div className='profile-info'>
                    <div className='username'>{item.username}</div>
                    <div
                      className='view-profile'
                      onClick={() => {
                        setOpen(false)
                        setTimeout(() => {
                          item.onViewProfile?.()
                        }, 100)
                      }}
                    >
                      View your profile
                    </div>
                  </div>
                </div>
              )
            }

            if (item.type === 'submenu') {
              return (
                <div key={idx} className='dropdown-item-submenu' onClick={() => setMenuStack([...menuStack, { label: item.label, items: item.submenu }])}>
                  <div className='left'>
                    {item.iconClass !== 'no-icon' && (
                      <div className={`icon-placeholder ${item.iconClass || 'empty-placeholder-icon'}`}></div>
                    )}
                    <span>{item.label}</span>
                  </div>
                  <div className='right'>
                    <div className='submenu-arrow'></div>
                  </div>
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
                {item.iconClass !== 'no-icon' && (
                  <div className={`icon-placeholder ${item.iconClass || 'empty-placeholder-icon'}`}></div>
                )}
                <span>{item.label}</span>
              </div>
            )

          })}

        </div>
      )}


    </div>
  )
}
