// ./backend/routes/comments.ts

// Imports
import express from 'express'
import { createComment, getCommentsForPost, editComment, deleteComment, getCommentCountByPostId, createReply, getUserComments } from '../controllers/commentsController'
import { requireAuth } from '../middleware/requireAuth'


const router = express.Router()


router.post('/',             requireAuth, createComment)           // POST: Adds a top-level comment to a post for the authenticated user.
router.patch('/:commentId',  requireAuth, editComment)             // PATCH: Updates the content of a comment if it belongs to the authenticated user.
router.delete('/:commentId', requireAuth, deleteComment)           // DELETE: Deletes a comment if it belongs to the user or the owner of the post.
router.get('/count/:postId',              getCommentCountByPostId) // GET: Returns the total number of comments for a given post.
router.get('/post/:postId',  requireAuth, getCommentsForPost)      // GET: Retrieves all top-level comments and replies for a post with like counts, paginated.
router.post('/reply',        requireAuth, createReply)             // POST: Creates a reply to an existing comment under a post for the authenticated user.
router.get('/user/:username',             getUserComments)         // GET: Retrieves all posts created by the authenticated user in a paginated format.


export default router
