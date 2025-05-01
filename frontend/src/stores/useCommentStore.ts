// import { usePostStore } from '@/stores/usePostStore'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================
import { PostComment } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================

// ====================< IMPORTS: OTHER >=================================
import { create } from 'zustand'


interface CommentState {
  comments: PostComment[]
  setComments: (comments: PostComment[]) => void
  updateCommentLike: (commentId: number, liked: boolean, likeCount: number) => void
}


export const useCommentStore = create<CommentState>((set) => ({
  comments: [],
  setComments: (comments) => set({ comments }),
  updateCommentLike: (commentId, liked, likeCount) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === commentId ? { ...comment, likedByUser: liked, likeCount } : comment
      )
    }))
}))

