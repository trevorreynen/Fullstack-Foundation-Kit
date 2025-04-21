// import { SidebarItem } from '@/types/SidebarTypes'

export type SidebarItem =
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



