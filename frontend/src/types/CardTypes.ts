// import { PostCardProps, CommentCardProps } from '@/types/CardTypes'


export interface PostCardProps {
  post: {
    id: number
    userId: number
    title: string
    content: string
    createdAt: string
    updatedAt: string | null
    commentCount?: number
    user?: {
      id?: number
      username?: string
      profileIconUrl?: string
    }
  },
  viewMode?: 'forum' | 'full' // forum = compact view (for UserPosts), full = default view
}


export interface CommentCardProps {
  comment: {
    id: number
    content: string
    postId: number
  }
}


