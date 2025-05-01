/*
import {
  FieldKey, FieldConfig, AuthFormProps,
  PostCardProps, CommentCardProps, PostComment,
  DropdownItem, DropdownMenuProps, MenuLevel,
  UserProfile,
  TABS, Tab, SettingsTabsProps,
  Post,
} from '@/types'
*/


// =======================================================================
// ============================<  Auth Form  >============================
// =======================================================================

export type FieldKey = 'identifier' | 'password' | 'email' | 'confirmPassword'

export type FieldConfig = {
  key: FieldKey
  label: string
  type?: 'text' | 'password'
  placeholder?: string
  required?: boolean
}

export type AuthFormProps = {
  title: string
  fields: FieldConfig[]
  onSubmit: (values: Record<FieldKey, string>, rememberMe: boolean) => Promise<string | null>
  footer?: React.ReactNode
  submitText?: string
  showForgotPassword?: boolean
  showRememberMe?: boolean
}



// =======================================================================
// ==============================<  Cards  >==============================
// =======================================================================

export interface PostCardProps {
  post: {
    id: number
    userId: number
    title: string
    content: string
    createdAt: string
    updatedAt: string | null
    commentCount?: number
    likedByUser?: boolean
    likeCount?: number
    user?: {
      id?: number
      username?: string
      profileIconUrl?: string
    }
  },
  viewMode?: 'forum' | 'full'
}

export interface CommentCardProps {
  comment: PostComment
}

export interface PostComment {
  id: number
  userId: number
  content: string
  createdAt: string
  updatedAt: string | null
  postId?: number
  postTitle?: string
  likedByUser?: boolean
  likeCount?: number
  user: {
    username: string
    profileIconUrl?: string
  }
  replies?: PostComment[]
}



// =======================================================================
// ==========================<  Dropdown Menu  >==========================
// =======================================================================

export type DropdownItem =
  | {
      type: 'item'
      label: string
      onClick: () => void
      icon?: React.ReactNode
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
      icon?: React.ReactNode
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



// =======================================================================
// =============================<  Profile  >=============================
// =======================================================================

export interface UserProfile {
  id: number
  username: string
  email: string
  profileIconUrl?: string
}



// =======================================================================
// ============================<  Settings  >=============================
// =======================================================================

export const TABS = ['Theme', 'Profile Icon', 'Notifications', 'Notes'] as const

export type Tab = typeof TABS[number]

export interface SettingsTabsProps {
  tabs: readonly Tab[]
  activeTab: Tab
  onTabClick: (tab: Tab) => void
}



// =======================================================================
// ==============================<  Post  >===============================
// =======================================================================

export interface Post {
  id: number
  userId: number
  title: string
  content: string
  createdAt: string
  updatedAt: string | null
}



// =======================================================================
// ================================<  =  >================================
// =======================================================================




// =======================================================================
// ================================<  =  >================================
// =======================================================================




// =======================================================================
// ================================<  =  >================================
// =======================================================================



