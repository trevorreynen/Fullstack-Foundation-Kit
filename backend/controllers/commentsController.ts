// ./backend/routes/comments.ts

// Imports
import { Request, Response } from 'express'
import { User, Post, Comment, Like } from '../models'
import { AuthRequest } from '../types/AuthRequest'



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
export const getCommentsForPost = async (req: Request, res: Response) => {
  const postId = req.params.postId

  try {
    const topLevelComments = await Comment.findAll({
      where: {
        postId,
        parentCommentId: null
      },
      include: [
        {
          model: Comment,
          as: 'replies',
          required: false,
          separate: true,
          order: [['createdAt', 'ASC']]
        }
      ],
      order: [['createdAt', 'ASC']]
    })

    // Attach like counts
    for (const comment of topLevelComments) {
      const likeCount = await Like.count({ where: { commentId: comment.id } })
      ;(comment as any).likeCount = likeCount

      const replies = (comment as any).replies || []
      if (replies.length > 0) {
        for (const reply of replies) {
          const replyLikeCount = await Like.count({ where: { commentId: reply.id } })
          ;(reply as any).likeCount = replyLikeCount
        }
      }
    }

    res.status(200).json(topLevelComments)
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ message: 'Server error' })
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


// (For POST) Reply to a comment.
export const createReply = async (req: AuthRequest, res: Response) => {
  const { postId, parentCommentId, content } = req.body
  const userId = req.user!.id

  if (!postId || !parentCommentId || !content?.trim()) {
    res.status(400).json({ message: 'Missing required fields' })
    return
  }

  try {
    // Make sure post exists
    const post = await Post.findByPk(postId)
    if (!post) {
      res.status(404).json({ message: 'Post not found' })
      return
    }

    // Check that parent comment exists and belongs to same post
    const parentComment = await Comment.findByPk(parentCommentId)
    if (!parentComment || parentComment.postId !== Number(postId)) {
      res.status(400).json({ message: 'Invalid parent comment for this post' })
      return
    }

    // Check nesting level (only 2 levels allowed)
    if (parentComment.parentCommentId !== null) {
      res.status(400).json({ message: 'Cannot reply to a reply (max depth reached)' })
      return
    }

    const newReply = await Comment.create({
      userId,
      postId,
      parentCommentId,
      content: content.trim()
    })

    res.status(201).json(newReply)
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ message: 'Server error' })
    return
  }
}

