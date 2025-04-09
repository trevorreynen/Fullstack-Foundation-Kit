// import Header from '@/components/Header/Header'

// =========================< IMPORTS: REACT >=================================
import { useState, useEffect, useRef, useLayoutEffect } from 'react'
import { useNavigate } from 'react-router-dom'

// =========================< IMPORTS: OTHER >=================================
import { SidebarState, useGlobalUI, useUser } from '@/hooks/common-context'

// =========================< IMPORTS: COMPONENTS >============================
import DropdownMenu from '@/components/DropdownMenu/DropdownMenu'

// =========================< IMPORTS: CSS >===================================
import './Header.scss'


export default function Header() {
  const navigate = useNavigate()

  const { sidebarState, setSidebarState } = useGlobalUI()
  const [signedIn, setSignedIn] = useState(false)
  const { user, setUser } = useUser()

  const leftRef = useRef<HTMLDivElement>(null)
  const centerRef = useRef<HTMLDivElement>(null)
  const rightRef = useRef<HTMLDivElement>(null)
  const [hideCenter, setHideCenter] = useState(false)
  const [hideRight, setHideRight] = useState(false)


  const toggleSidebar = () => {
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


  useLayoutEffect(() => {
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

    checkOverlap()

    const resizeObserver = new ResizeObserver(() => {
      checkOverlap()
    })

    if (leftRef.current) resizeObserver.observe(leftRef.current)
    if (centerRef.current) resizeObserver.observe(centerRef.current)
    if (rightRef.current) resizeObserver.observe(rightRef.current)

    window.addEventListener('resize', checkOverlap)

    return () => {
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
        <button className='sidebar-header-state-btn' onClick={toggleSidebar}>
          <div className='menu-icon' />
        </button>
      </div>


      <div ref={centerRef} className={`header-center-content ${hideCenter ? '' : 'visible'}`}>
        <h2>Test Project by Trevor Reynen</h2>
      </div>


      {!hideRight && (
        <div ref={rightRef} className='header-right-side-content'>
          {!signedIn ? (
            <>
              <DropdownMenu
                button={<div className='menu-ellipsis-btn'>⋮</div>}
                items={[
                  { type: 'item', label: 'Appearance', onClick: () => {}, iconClass: 'icon-appearance' },
                  { type: 'divider' },
                  { type: 'item', label: 'Settings', onClick: () => {}, iconClass: 'icon-settings' },
                  { type: 'item', label: 'Help', onClick: () => {}, iconClass: 'icon-help' }
                ]}
              />

              <button className='sign-in-btn' onClick={() => navigate('/login')}>Sign In</button>
            </>
          ) : (
            <div className='signed-in-actions'>
              <button className='create-btn'>+ Create</button>

              <div className='notifications-icon'>
                {/* Replace with real SVG/icon later */}
                <div className='white-square-icon' />
              </div>

              <DropdownMenu
                button={<div className='profile-avatar-placeholder' />}
                items={[
                  {
                    type: 'header',
                    username: 'whodislol',
                    onViewProfile: () => {}
                  },
                  { type: 'divider' },
                  {
                    type: 'item',
                    label: 'Sign Out',
                    onClick: () => {setSignedIn(false); setUser(null); navigate('/')},
                    iconClass: 'icon-signout'
                  },
                  { type: 'divider' },
                  {
                    type: 'item',
                    label: 'Settings',
                    onClick: () => {},
                    iconClass: 'icon-settings'
                  },
                  {
                    type: 'item',
                    label: 'Help',
                    onClick: () => {},
                    iconClass: 'icon-help'
                  }
                ]}
              />
            </div>
          )}
        </div>
      )}


    </div>
  )
}

