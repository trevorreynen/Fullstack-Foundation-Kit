// ./backend/routes/likes.ts

// Imports
import express from 'express'
import { toggleLike, getPostLikes, checkUserLikedPost } from '../controllers/likesController'
import { requireAuth } from '../middleware/requireAuth'


const router = express.Router()


router.post('/toggle',           requireAuth, toggleLike)         // POST: Toggle a post or comment like on or off.
router.get('/post/:postId',                   getPostLikes)       // GET: Get total likes on post.
router.get('/user/post/:postId',              checkUserLikedPost) // GET: Check if user liked post.


export default router
