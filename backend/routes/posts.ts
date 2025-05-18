// ./backend/routes/posts.ts

// Imports
import express from 'express'
import { createPost, getAllPosts, getUserPosts, getPostById, deletePost, editPost } from '../controllers/postsController'
import { requireAuth } from '../middleware/requireAuth'


const router = express.Router()


router.post('/',              requireAuth, createPost)   // POST: Creates a new post with a title and content for the authenticated user.
router.get('/',               requireAuth, getAllPosts)  // GET: Retrieves a paginated list of all posts including metadata like comment/like counts and user’s like status.
router.delete('/:postId',     requireAuth, deletePost)   // DELETE: Deletes a post if it belongs to the authenticated user.
router.patch('/:postId',      requireAuth, editPost)     // PATCH: Updates the title and/or content of a post if it belongs to the authenticated user.
router.get('/by-id/:postId',  requireAuth, getPostById)  // GET: Retrieves a specific post by its ID along with metadata and user like status.
router.get('/user/:username',              getUserPosts) // GET: Retrieves all posts created by the specified user (by username) in a paginated format.


export default router
