// import { useCommentStore } from '@/stores/useCommentStore'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================
import { PostComment } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================
import { create } from 'zustand'


interface CommentState {
  comments: PostComment[]
  setComments: (comments: PostComment[]) => void
  updateCommentLike: (commentId: number, liked: boolean, likeCount: number) => void
  fetchCommentsForPost: (postId: number) => void
  activeReplyTargetId: number | null
  setActiveReplyTargetId: (id: number | null) => void
  currentlyEditingCommentId: number | null,
  setCurrentlyEditingCommentId: (id: number | null) => void
}


export const useCommentStore = create<CommentState>((set) => ({

  comments: [],
  setComments: (comments) => set({ comments }),

  updateCommentLike: (commentId: number, liked: boolean, likeCount: number) =>
    set((state) => ({
      comments: state.comments.map((comment) =>
        comment.id === commentId
          ? { ...comment, likedByUser: liked, likeCount }
          : {
              ...comment,
              replies: comment.replies?.map((r) =>
                r.id === commentId ? { ...r, likedByUser: liked, likeCount } : r
              )
            }
      )
    })),

  fetchCommentsForPost: async (postId: number) => {
    try {
      const res = await api(`/comments/post/${postId}`, { method: 'GET' })
      set({ comments: res.data.items })
    } catch (err) {
      console.error('Failed to fetch comments:', err)
    }
  },

  activeReplyTargetId: null,
  setActiveReplyTargetId: (id) => set({ activeReplyTargetId: id }),

  currentlyEditingCommentId: null,
  setCurrentlyEditingCommentId: (id) => set({ currentlyEditingCommentId: id }),

}))
