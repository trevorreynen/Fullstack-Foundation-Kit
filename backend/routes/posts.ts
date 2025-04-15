// ./backend/routes/posts.ts

// Imports
import express from 'express'
import { createPost, getAllPosts, getUserPosts, deletePost, editPost } from '../controllers/postsController'


const router = express.Router()


router.post('/', createPost)              // POST: Create post.
router.get('/', getAllPosts)              // GET: Get all posts.
router.get('/user/:userId', getUserPosts) // GET: Get posts by user Id.
router.delete('/:postId', deletePost)     // DELETE: Delete post.
router.patch('/:postId', editPost)        // PATCH: Edit post.


export default router
