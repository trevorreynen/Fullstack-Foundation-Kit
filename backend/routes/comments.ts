// ./backend/routes/comments.ts

// Imports
import express from 'express'

import Comment from '../models/Comment'
import User from '../models/User'

const router = express.Router()


// POST: Create comment.
router.post('/', async (req, res) => {
  const { userId, postId, content } = req.body
  if (!userId || !postId || !content) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }

  try {
    const comment = await Comment.create({ userId, postId, content })

    res.status(201).json({ success: true, comment })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error creating comment' })
    return
  }
})


// GET: Comments by post Id.
router.get('/post/:postId', async (req, res) => {
  const postId = parseInt(req.params.postId, 10)

  try {
    const comments = await Comment.findAll({
      where: { postId },
      include: [{ model: User, attributes: ['id', 'username'] }],
      order: [['createdAt', 'ASC']]
    })

    res.status(200).json(comments)
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error loading comments' })
    return
  }
})


// PATCH: Edit comment.
router.patch('/:commentId', async (req, res) => {
  const commentId = parseInt(req.params.commentId, 10)
  const { content } = req.body

  try {
    const comment = await Comment.findByPk(commentId)
    if (!comment) {
      res.status(404).json({ error: 'Comment not found' })
      return
    }

    comment.content = content
    await comment.save()

    res.status(200).json({ success: true, comment })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error editing comment' })
    return
  }
})


// DELETE: Comment.
router.delete('/:commentId', async (req, res) => {
  const commentId = parseInt(req.params.commentId, 10)

  try {
    const comment = await Comment.findByPk(commentId)
    if (!comment) {
      res.status(404).json({ error: 'Comment not found' })
      return
    }

    await comment.destroy()

    res.status(200).json({ success: true })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error deleting comment' })
    return
  }
})


export default router
