// import { DropdownItem, DropdownMenuProps, MenuLevel } from '@/types/DropdownMenuTypes'


export type DropdownItem =
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
      profileIconUrl: string | null
      onViewProfile: () => void
    }
  | {
      type: 'submenu'
      label: string
      iconClass?: string
      submenu: DropdownItem[]
    }
  | {
    type: 'item-text'
    label: string
  }


export type DropdownMenuProps = {
  items: DropdownItem[]
  button: React.ReactNode
}


export type MenuLevel = {
  label?: string
  items: DropdownItem[]
}

