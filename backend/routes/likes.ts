// ./backend/routes/likes.ts

// Imports
import express from 'express'
import { likePost, unlikePost, getPostLikes, checkUserLikedPost } from '../controllers/likesController'


const router = express.Router()


router.post('/', likePost)                                   // POST: Like a post.
router.delete('/', unlikePost)                               // DELETE: Like from post (unlike a post).
router.get('/post/:postId', getPostLikes)                    // GET: Total likes on post.
router.get('/user/:userId/post/:postId', checkUserLikedPost) // GET: Check if user liked post.


export default router
