// ./backend/routes/likes.ts

// Imports
import express from 'express'
import { toggleLike, getPostLikes, checkUserLikedPost } from '../controllers/likesController'
import { requireAuth } from '../middleware/requireAuth'


const router = express.Router()


router.post('/toggle',           requireAuth, toggleLike)         // POST: Toggles a like on a post or comment for the authenticated user.
router.get('/post/:postId',                   getPostLikes)       // GET: Returns the total number of likes for a specific post.
router.get('/user/post/:postId',              checkUserLikedPost) // GET: Checks whether a specific user has liked a given post.


export default router
