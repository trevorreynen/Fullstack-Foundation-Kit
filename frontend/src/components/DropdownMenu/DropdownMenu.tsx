// import DropdownMenu from '@/components/DropdownMenu/DropdownMenu'

// =========================< IMPORTS: REACT >=================================
import { useState, useRef, useEffect } from 'react'

// =========================< IMPORTS: CSS >===================================
import './DropdownMenu.scss'


type DropdownItem =
  | {
      type: 'item'
      label: string
      onClick: () => void
      iconClass?: string
    }
  | {
      type: 'divider'
    }
  | {
      type: 'header'
      username: string
      onViewProfile: () => void
    }

type DropdownMenuProps = {
  items: DropdownItem[]
  button: React.ReactNode
}


export default function DropdownMenu({ items, button }: DropdownMenuProps) {
  const [open, setOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])


  return (
    <div className='DropdownMenu' ref={menuRef}>


      <div onClick={() => setOpen(!open)} className='dropdown-trigger'>
        {button}
      </div>

      {open && (
        <div className='dropdown-list'>
          {items.map((item, idx) => {
            if (item.type === 'divider') {
              return <div key={idx} className='dropdown-divider' />
            }

            if (item.type === 'header') {
              return (
                <div key={idx} className='dropdown-profile-header'>
                  <div className='profile-icon-placeholder' />
                  <div className='profile-info'>
                    <div className='username'>{item.username}</div>
                    <div className='view-profile' onClick={item.onViewProfile}>View your profile</div>
                  </div>
                </div>
              )
            }

            return (
              <div key={idx} className='dropdown-item' onClick={item.onClick}>
                <div className={`icon-placeholder ${item.iconClass || ''}`} />
                <span>{item.label}</span>
              </div>
            )
          })}
        </div>
      )}


    </div>
  )
}
