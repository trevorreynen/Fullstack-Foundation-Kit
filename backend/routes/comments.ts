// ./backend/routes/comments.ts

// Imports
import express from 'express'
import { createComment, getCommentsByPost, editComment, deleteComment, getCommentCountByPostId } from '../controllers/commentsController'


const router = express.Router()


router.post('/', createComment)                       // POST: Create comment.
router.get('/post/:postId', getCommentsByPost)        // GET: Get comments by post Id.
router.patch('/:commentId', editComment)              // PATCH: Edit comment.
router.delete('/:commentId', deleteComment)           // DELETE: Delete comment.
router.get('/count/:postId', getCommentCountByPostId) // GET: Get comment count by post Id.


export default router
