/*
import {
  FieldKey, FieldConfig, AuthFormProps,
  CommentCardProps, CommentInputProps,
  DropdownItem, DropdownMenuProps, MenuLevel,
  FullPostProps, FullPostSidebarProps, PostCardProps, PostFormMode, PostFormProps,
  UserProfile, UserCommentsProps, UserPostsProps,
  NotificationSettingsProps, UserNotesProps,
  CommentBtnProps, DateDisplayProps, HoverMenuBtnOption, HoverMenuBtnProps, LikeBtnProps, PaginationBoxProps, PaginationFilterMenuProps, UserAvatarSize, UserAvatarProps,
  Post, PostComment, PaginatedResponse,
} from '@/types'
*/


// Imports
import { Dispatch, SetStateAction } from 'react'
import { SxProps, Theme } from '@mui/material/styles'



// =======================================================================
// ==============================<  auth  >===============================
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
// =============================<  comment  >=============================
// =======================================================================

export type CommentCardProps = {
  comment: PostComment
  depth?: number
  highlightId?: number
}

export type CommentInputProps = {
  mode: 'comment' | 'reply'
  onSubmit: (text: string) => void
  replyingToUsername?: string
  autoFocus?: boolean
  submitLabel?: string
  onCancel?: () => void
}



// =======================================================================
// ============================<  dropdown  >=============================
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
      profileIconKey: string | null
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
// ==============================<  post  >===============================
// =======================================================================

export interface FullPostProps {
  postId: number
  onCommentClick: () => void
}

export interface FullPostSidebarProps {
  onClose: () => void
  highlightId?: number
}

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
      profileIconKey?: string
    }
  },
  viewMode?: 'forum' | 'full'
}

export type PostFormMode = 'create' | 'edit'

export type PostFormProps = {
  mode: PostFormMode
  initialTitle?: string
  initialContent?: string
  postId?: number // only needed for edit mode
  open: boolean
  onCancel: () => void
  onSuccess: () => void
  dialogTitle?: string
  submitLabel?: string
}



// =======================================================================
// =============================<  profile  >=============================
// =======================================================================

export interface UserProfile {
  id: number
  username: string
  email: string
  profileIconKey?: string
}

export type UserCommentsProps = {
  user: UserProfile
  initialData?: PaginatedResponse<PostComment>
}

export type UserPostsProps = {
  user: UserProfile
  initialData?: PaginatedResponse<Post>
}



// =======================================================================
// ============================<  settings  >=============================
// =======================================================================

export type NotificationSettingsProps = {
  initialNotifications: boolean
}

export type UserNotesProps = {
  initialNote: string
}



// =======================================================================
// =============================<  shared  >==============================
// =======================================================================

export interface CommentBtnProps {
  commentCount: number
  onClick: (e: React.MouseEvent) => void
  countPlacement: 'right' | 'bottom'
  btnSize?: 'small' | 'medium' | 'large'
  iconSize?: 'small' | 'medium' | 'large'
}

export interface DateDisplayProps {
  createdAt: string
  updatedAt?: string | null
  showLabel?: boolean
  displayFontSize?: string | number
  withTooltip?: boolean
  tooltipFontSize?: string | number
}

export type HoverMenuBtnOption = {
  label: string
  action: 'delete' | 'edit' | 'report'
  targetType: 'comment' | 'post'
  targetId: number
  disabled?: boolean
}

export type HoverMenuBtnProps = {
  options: HoverMenuBtnOption[]
  onAction: (action: HoverMenuBtnOption['action'], targetType: HoverMenuBtnOption['targetType'], id: number) => void
  tooltip?: string
  disabled?: boolean
}

export type LikeBtnProps = {
  type: 'post' | 'comment'
  targetId: number
  defaultLiked: boolean
  defaultLikeCount: number
  countPlacement: 'right' | 'bottom'
  btnSize?: 'small' | 'medium' | 'large'
  iconSize?: 'small' | 'medium' | 'large'
}

export interface PaginationBoxProps {
  totalPages: number
  page: number
  onPageChange: (_: any, value: number) => void

  // Optional: Per-page settings
  showPerPageSelect?: boolean
  perPage?: number
  perPageOptions?: number[]
  onPerPageChange?: (e: any) => void

  // Optional: Extra sx
  sx?: object

  // Optional: Filter menu
  showFilterMenu?: boolean
  sort?: 'ASC' | 'DESC'
  setSort?: Dispatch<SetStateAction<'ASC' | 'DESC'>>
  sortBy?: string
  setSortBy?: Dispatch<SetStateAction<string>>
  sortByOptions?: { label: string; value: string }[]
  search?: string
  setSearch?: Dispatch<SetStateAction<string>>
  searchField?: string
  setSearchField?: Dispatch<SetStateAction<string>>
  searchFields?: { label: string; value: string }[]

  // Optional: Filter menu button
  btnSize?: 'small' | 'medium' | 'large'
  iconSize?: 'small' | 'medium' | 'large'
}

export interface PaginationFilterMenuProps {
  // Optional external control props
  sort?: 'ASC' | 'DESC'
  setSort?: Dispatch<SetStateAction<'ASC' | 'DESC'>>

  sortBy?: string
  setSortBy?: Dispatch<SetStateAction<string>>
  sortByOptions?: { label: string; value: string }[]

  search?: string
  setSearch?: (val: string) => void

  searchField?: string
  setSearchField?: (val: string) => void

  searchFieldOptions?: { label: string; value: string }[]

  btnSize?: 'small' | 'medium' | 'large'
  iconSize?: 'small' | 'medium' | 'large'
}

export type UserAvatarSize = 64 | 128 | 256 | 'original'

export interface UserAvatarProps {
  profileIconKey: string | null
  urlSize: UserAvatarSize
  renderSize?: string | number
  draggable?: boolean
  alt?: string
  sx?: SxProps<Theme>
}



// =======================================================================
// ==============================<  OTHER  >==============================
// =======================================================================

export interface Post {
  id: number
  userId: number
  title: string
  content: string
  createdAt: string
  updatedAt: string | null
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
  parentCommentId?: number
  user: {
    username: string
    profileIconKey?: string
  }
  replies?: PostComment[]
}

export type PaginatedResponse<T> = {
  items: T[]
  meta: {
    page: number
    pageSize: number
    totalPages: number
    totalItems: number
  }
}

