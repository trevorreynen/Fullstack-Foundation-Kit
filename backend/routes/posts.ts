// ./backend/routes/posts.ts

// Imports
import express from 'express'
import { createPost, getAllPosts, getUserPosts, getPostById, deletePost, editPost } from '../controllers/postsController'
import { requireAuth } from '../middleware/requireAuth'


const router = express.Router()


router.post('/', requireAuth, createPost) // POST: Create post.
router.get('/', getAllPosts)              // GET: Get all posts.
router.get('/user/:userId', getUserPosts) // GET: Get posts by user Id.
router.get('/by-id/:postId', getPostById) // GET: Get single post by Id.
router.delete('/:postId', deletePost)     // DELETE: Delete post.
router.patch('/:postId', editPost)        // PATCH: Edit post.


export default router
