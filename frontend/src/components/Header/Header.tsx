// import Header from '@/components/Header/Header'

// ====================< IMPORTS: REACT >=================================
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu'

// ====================< IMPORTS: TYPES >=================================

// ====================< IMPORTS: CONTEXTS/HOOKS >========================
import { SidebarState } from '@/contexts/GlobalUIContext'
import { useGlobalUI } from '@/hooks/useGlobalUI'
import { useUser } from '@/hooks/useUser'

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================

// ====================< IMPORTS: STYLES >================================
import './Header.scss'


export default function Header() {
  const navigate = useNavigate()

  const { theme, setTheme, sidebarState, setSidebarState, isMobile, isMobileMenuOpen, setIsMobileMenuOpen } = useGlobalUI()
  const { user, logoutUser } = useUser()

  const leftRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [hideCenter, setHideCenter] = useState(false)
  const [hideRight, setHideRight] = useState(false)


  const toggleSidebar = () => {
    if (isMobile) {
      setIsMobileMenuOpen(!isMobileMenuOpen)
      return
    }

    let nextState

    switch (sidebarState) {
      case SidebarState.Expanded:
        nextState = SidebarState.Collapsed
        break
      case SidebarState.Collapsed:
        nextState = SidebarState.Hidden
        break
      case SidebarState.Hidden:
        nextState = SidebarState.Minimal
        break
      case SidebarState.Minimal:
      default:
        nextState = SidebarState.Expanded
        break
    }

    setSidebarState(nextState)
  }

  const checkOverlap = () => {
    const left = leftRef.current?.getBoundingClientRect()
    const center = centerRef.current?.getBoundingClientRect()
    const right = rightRef.current?.getBoundingClientRect()

    if (!left || !center || !right) return

    const centerOverlapsLeft = center.left < left.right + 8
    const centerOverlapsRight = center.right > right.left - 8
    const rightTooClose = right.left - left.right < 80

    setHideCenter(centerOverlapsLeft || centerOverlapsRight)
    setHideRight(rightTooClose)
  }

  useLayoutEffect(() => {
    const resizeObserver = new ResizeObserver(checkOverlap)

    if (leftRef.current) resizeObserver.observe(leftRef.current)
    if (centerRef.current) resizeObserver.observe(centerRef.current)
    if (rightRef.current) resizeObserver.observe(rightRef.current)

    window.addEventListener('resize', checkOverlap)

    // Delay first call to ensure DOM is ready
    const timer = setTimeout(() => {
      checkOverlap()
    }, 0)

    return () => {
      clearTimeout(timer)
      window.removeEventListener('resize', checkOverlap)
      resizeObserver.disconnect()
    }
  }, [sidebarState])

  // Resets the header center and right divs to reappear after exiting minimal state.
  useEffect(() => {
    if (sidebarState !== 'minimal') {
      setHideCenter(false)
      setHideRight(false)
    }
  }, [sidebarState])


  return (
    <div className={`Header ${sidebarState}`}>


      <div ref={leftRef} className='header-left-side-sidebar-button'>
        {user && (
          <button className='sidebar-header-state-btn' onClick={toggleSidebar}>
            <div className={isMobile && isMobileMenuOpen ? 'close-icon' : 'menu-icon'} />
          </button>
        )}
      </div>


      <div ref={centerRef} className={`header-center-content ${hideCenter ? 'hidden' : 'visible'}`}>
        <h2>Test Project by Trevor Reynen</h2>
      </div>


      <div
        ref={rightRef}
        className={`header-right-side-content ${hideRight ? 'hidden' : 'visible'}`}
      >
        {!user ? (
          <>
            <DropdownMenu
              button={<div className='menu-ellipsis-btn'>⋮</div>}
              items={[
                {
                  type: 'submenu',
                  label: 'Appearance',
                  iconClass: 'icon-appearance',
                  submenu: [
                    { type: 'item-text', label: 'Setting applies to this browser only' },
                    { type: 'item', label: 'Dark theme', iconClass: theme === 'dark' ? 'icon-checkmark' : 'icon-empty-placeholder-no-border', onClick: () => setTheme('dark') },
                    { type: 'item', label: 'Light theme', iconClass: theme === 'light' ? 'icon-checkmark' : 'icon-empty-placeholder-no-border', onClick: () => setTheme('light') },
                  ]
                },
                { type: 'divider' },
                { type: 'item', label: 'Settings', onClick: () => {}, iconClass: 'icon-settings' }
              ]}
            />

            <button className='sign-in-btn' onClick={() => navigate('/login')}>Sign In</button>
          </>
        ) : (
          <div className='signed-in-actions'>
            <button className='create-post-btn' onClick={() => navigate('/create')}>Post</button>

            <DropdownMenu
              button={<img
                        src={`${process.env.API_BASE!.replace('/api', '')}${user.profileIconUrl || '/uploads/default-profile-icon.png'}`}
                        className='profile-avatar'
                        onError={(e) => e.currentTarget.src = `${process.env.API_BASE!.replace('/api', '')}/uploads/default-profile-icon.png`}
                        draggable={false}
                      />
              }
              items={[
                {
                  type: 'header',
                  username: user.username,
                  profileIconUrl: user.profileIconUrl,
                  onViewProfile: () => navigate(`/user/${user.username}`)
                },
                { type: 'divider' },
                {
                  type: 'item',
                  label: 'Sign Out',
                  onClick: () => {
                    logoutUser()
                  },
                  iconClass: 'icon-logout-uxasp'
                },
                { type: 'divider' },
                {
                  type: 'submenu',
                  label: 'Appearance',
                  iconClass: 'icon-appearance',
                  submenu: [
                    { type: 'item-text', label: 'Setting applies to this browser only' },
                    { type: 'item', label: 'Dark theme', iconClass: theme === 'dark' ? 'icon-checkmark' : 'icon-empty-placeholder-no-border', onClick: () => setTheme('dark') },
                    { type: 'item', label: 'Light theme', iconClass: theme === 'light' ? 'icon-checkmark' : 'icon-empty-placeholder-no-border', onClick: () => setTheme('light') },
                  ]
                },
                {
                  type: 'item',
                  label: 'Settings',
                  iconClass: 'icon-settings',
                  onClick: () => navigate('/settings')
                }
              ]}
            />
          </div>
        )}
      </div>


    </div>
  )
}

