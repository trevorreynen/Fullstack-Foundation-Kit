// ./backend/routes/posts.ts

// Imports
import express from 'express'
import { createPost, getAllPosts, getUserPosts, getPostById, deletePost, editPost } from '../controllers/postsController'
import { requireAuth } from '../middleware/requireAuth'


const router = express.Router()


router.post('/',              requireAuth, createPost)   // POST: Create post.
router.get('/',               requireAuth, getAllPosts)  // GET: Get all posts.
router.delete('/:postId',     requireAuth, deletePost)   // DELETE: Delete post.
router.patch('/:postId',      requireAuth, editPost)     // PATCH: Edit post.
router.get('/by-id/:postId',  requireAuth, getPostById)  // GET: Get single post by Id.
router.get('/user/:username',              getUserPosts) // GET: Get posts by user Id.


export default router
