// ./backend/routes/comments.ts

// Imports
import { Request, Response } from 'express'
import { User, Comment } from '../models'



// (For POST) Create comment.
export const createComment = async (req: Request, res: Response) => {
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
}


// (For GET) Get comments by post Id.
export const getCommentsByPost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId, 10)

  try {
    const comments = await Comment.findAll({
      where: { postId },
      include: [{ model: User, attributes: ['id', 'username'] }],
      order: [['createdAt', 'ASC']],
    })

    res.status(200).json(comments)
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error loading comments' })
    return
  }
}


// (For PATCH) Edit comment.
export const editComment = async (req: Request, res: Response) => {
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
}


// (For DELETE) Delete comment.
export const deleteComment = async (req: Request, res: Response) => {
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
}


// (For GET) Get comment count by post Id.
export const getCommentCountByPostId = async (req: Request, res: Response) => {
  const { postId } = req.params

  try {
    const count = await Comment.count({ where: { postId } })

    res.json({ postId, commentCount: count })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Failed to count comments' })
    return
  }
}

