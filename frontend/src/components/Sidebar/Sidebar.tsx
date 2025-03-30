// import Sidebar from '@/components/Sidebar/Sidebar'

// =========================< IMPORTS: REACT >=================================
import { JSX, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

// =========================< IMPORTS: OTHER >=================================
import { SidebarState, useCommonStore } from '@/hooks/common-context'

// =========================< IMPORTS: COMPONENTS >============================

// =========================< IMPORTS: CSS >===================================
import './Sidebar.scss'


type SidebarItem =
  | {
      type: 'dropdown'
      key: string
      label: string
      iconClass?: string
      children: SidebarItem[]
    }
  | {
      type: 'group'
      key: string
      label: string
      iconClass?: string
      children: SidebarItem[]
    }
  | {
      type: 'submenu'
      key: string
      label: string
      iconClass?: string
      children: SidebarItem[]
    }
  | {
      type: 'link'
      key: string
      label: string
      path: string
      iconClass?: string
    }


const menuItems: SidebarItem[] = [
  {
    type: 'dropdown',
    key: 'nav1',
    label: 'Navigation One',
    iconClass: 'icon-home',
    children: [
      {
        type: 'group',
        key: 'group1',
        label: 'Item 1 (w/ placeholder)',
        iconClass: '',
        children: [
          { type: 'link', key: '1', label: 'Option 1', path: '/option-1', iconClass: 'icon-link' },
          { type: 'link', key: '2', label: 'Option 2', path: '/option-2', iconClass: 'icon-link' }
        ]
      },
      {
        type: 'group',
        key: 'group2',
        label: 'Item 2 (w/ no icon)',
        iconClass: 'no-icon',
        children: [
          { type: 'link', key: '3', label: 'Option 3', path: '/option-3', iconClass: 'icon-link' },
          { type: 'link', key: '4', label: 'Option 4', path: '/option-4', iconClass: 'icon-link' }
        ]
      }
    ]
  },
  {
    type: 'dropdown',
    key: 'nav2',
    label: 'Navigation Two',
    iconClass: '',
    children: [
      { type: 'link', key: '5', label: 'Option 5', path: '/option-5', iconClass: 'icon-link' },
      { type: 'link', key: '6', label: 'Option 6', path: '/option-6', iconClass: 'icon-link' },
      {
        type: 'submenu',
        key: 'submenu1',
        label: 'Submenu',
        iconClass: 'icon-down-right-2',
        children: [
          { type: 'link', key: '7', label: 'Option 7', path: '/option-7', iconClass: 'icon-link' },
          { type: 'link', key: '8', label: 'Option 8', path: '/option-8', iconClass: 'icon-link' }
        ]
      }
    ]
  },
  {
    type: 'dropdown',
    key: 'nav3',
    label: 'Navigation Three',
    iconClass: 'icon-settings',
    children: [
      { type: 'link', key: '9', label: 'Option 9', path: '/option-9', iconClass: 'icon-link' },
      { type: 'link', key: '10', label: 'Option 10', path: '/option-10', iconClass: 'icon-link' },
      { type: 'link', key: '11', label: 'Option 11', path: '/option-11', iconClass: 'icon-link' },
      { type: 'link', key: '12', label: 'Option 12', path: '/option-12', iconClass: 'icon-link' }
    ]
  },
  {
    type: 'group',
    key: 'bottom-group',
    label: 'Group',
    iconClass: 'no-icon',
    children: [
      { type: 'link', key: '13', label: 'Option 13', path: '/option-13', iconClass: 'icon-link' },
      { type: 'link', key: '14', label: 'Option 14', path: '/option-14', iconClass: 'icon-link' }
    ]
  }
]


export default function Sidebar() {
  const { sidebarState } = useCommonStore()

  const location = useLocation() // Get current route

  // Set ALL menus and submenus to CLOSED by default
  const [openSections, setOpenSections] = useState<string[]>([]) // Empty means all collapsed
  const [openSubmenus, setOpenSubmenus] = useState<string[]>([]) // Track open submenus separately
  const [selectedItem, setSelectedItem] = useState<string>('')


  if (sidebarState === SidebarState.Hidden) {
    return null
  }

  // Toggle main menu sections
  const toggleSection = (key: string) => {
    setOpenSections((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]))
  }

  // Toggle submenu sections
  const toggleSubmenu = (key: string) => {
    setOpenSubmenus((prev) => (prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]))
  }

  // Handle item selection
  const handleItemClick = (key: string) => {
    setSelectedItem(key)
  }


  const renderItem = (item: SidebarItem): JSX.Element => {
    if (item.type === 'dropdown') {
      const isOpen = openSections.includes(item.key)

      return (
        <div key={item.key} className='sidebar-dropdown'>

          <div className='sidebar-dropdown-label' onClick={() => toggleSection(item.key)}>
            <div className='label-left'>
              {item.iconClass !== 'no-icon' && (
                <div className={`icon-placeholder ${item.iconClass ? item.iconClass : 'empty-placeholder-icon'}`} />
              )}
              <span className='item-label'>{item.label}</span>
            </div>

            <div className='label-right'>
              <div className={`arrow ${isOpen ? 'close-it' : 'open-it'}`}></div>
            </div>
          </div>


          {isOpen && (
            <div className='sidebar-dropdown-children'>
              {item.children.map(renderItem)}
            </div>
          )}

        </div>
      )
    }

    if (item.type === 'submenu') {
      const isOpen = openSubmenus.includes(item.key)

      return (
        <div key={item.key} className='sidebar-submenu'>

          <div className='sidebar-submenu-label' onClick={() => toggleSubmenu(item.key)}>
            <div className='label-left'>
              {item.iconClass !== 'no-icon' && (
                <div className={`icon-placeholder ${item.iconClass ? item.iconClass : 'empty-placeholder-icon'}`} />
              )}
              <span className='item-label'>{item.label}</span>
            </div>

            <div className='label-right'>
              <div className={`arrow ${isOpen ? 'close-it' : 'open-it'}`}></div>
            </div>
          </div>


          {isOpen && (
            <div className='sidebar-submenu-children'>
              {item.children.map(renderItem)}
            </div>
          )}

        </div>
      )
    }

    if (item.type === 'group') {
      return (
        <div key={item.key} className='sidebar-group'>

          <div className='sidebar-group-label'>
            {item.iconClass !== 'no-icon' && (
              <div className={`icon-placeholder ${item.iconClass ? item.iconClass : 'empty-placeholder-icon'}`} />
            )}
            <div className='item-label'>{item.label}</div>
          </div>

          {item.children.map(renderItem)}

        </div>
      )
    }

    const isSelected = location.pathname === item.path

    return (
      <Link key={item.key} to={item.path} className={`sidebar-link-wrapper ${isSelected ? 'selected' : ''}`}>

        <div className='sidebar-link'>
          {item.iconClass !== 'no-icon' && (
            <div className={`icon-placeholder ${item.iconClass ? item.iconClass : 'empty-placeholder-icon'}`} />
          )}
          <span>{item.label}</span>
        </div>

      </Link>
    )
  }


  return (
    <div className={`Sidebar ${sidebarState}`}>

      {menuItems.map((item) => renderItem(item))}

    </div>
  )
}

