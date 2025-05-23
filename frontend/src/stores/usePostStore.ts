// import { usePostStore } from '@/stores/usePostStore'

// ====================< IMPORTS: REACT >=================================

// ====================< IMPORTS: LAYOUT >================================

// ====================< IMPORTS: PAGES >=================================

// ====================< IMPORTS: COMPONENTS >============================

// ====================< IMPORTS: TYPES >=================================
import { PostCardProps } from '@/types'

// ====================< IMPORTS: CONTEXTS/HOOKS >========================

// ====================< IMPORTS: UTILS >=================================
import { api } from '@/utils/api'

// ====================< IMPORTS: OTHER >=================================
import { create } from 'zustand'


interface PostStoreState {
  posts: PostCardProps['post'][]
  setPosts: (posts: PostCardProps['post'][]) => void
  updatePostLike: (postId: number, likedByUser: boolean, likeCount: number) => void
  fetchPosts: () => Promise<void>
  fetchPostById: (postId: number) => Promise<void>
}


export const usePostStore = create<PostStoreState>((set) => ({

  posts: [],

  setPosts: (posts) => set({ posts }),

  updatePostLike: (postId, likedByUser, likeCount) => set((state) => ({
    posts: state.posts.map(post => post.id === postId ? { ...post, likedByUser, likeCount } : post)
  })),

  fetchPosts: async () => {
    try {
      const res = await api('/posts', { method: 'GET' })
      set({ posts: res.data })
    } catch (error) {
      console.error('Failed to fetch posts:', error)
    }
  },

  fetchPostById: async (postId) => {
    try {
      const { data } = await api(`/posts/${postId}`, { method: 'GET' })
      set((state) => ({
        posts: state.posts.map((p) => (p.id === postId ? data.post : p))
      }))
    } catch (err) {
      console.error('Failed to fetch post by ID:', err)
    }
  },

}))

