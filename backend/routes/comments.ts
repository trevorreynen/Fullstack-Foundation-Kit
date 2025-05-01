// ./backend/routes/comments.ts

// Imports
import express from 'express'
import { createComment, getCommentsForPost, editComment, deleteComment, getCommentCountByPostId, createReply } from '../controllers/commentsController'
import { requireAuth } from '../middleware/requireAuth'


const router = express.Router()


router.post('/', createComment)                       // POST: Create comment.
router.patch('/:commentId', editComment)              // PATCH: Edit comment.
router.delete('/:commentId', deleteComment)           // DELETE: Delete comment.
router.get('/count/:postId', getCommentCountByPostId) // GET: Get comment count by post Id.
router.get('/post/:postId', getCommentsForPost)       // GET: Get comments by post Id.
router.post('/reply', requireAuth, createReply)       // POST: Reply to a comment.


export default router
