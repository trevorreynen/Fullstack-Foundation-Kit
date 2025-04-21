// ./backend/controllers/likesController.ts

// Imports
import { Request, Response } from 'express'
import { Like } from '../models'


// (For POST) Toggle a post or comment like on or off.
export const toggleLike = async (req: Request, res: Response) => {
  const { userId, postId, commentId } = req.body
  if (!userId || (!postId && !commentId)) {
    res.status(400).json({ error: 'Missing required like target or userId' })
    return
  }

  if (postId && commentId) {
    res.status(400).json({ error: 'Cannot like both a post and comment at once' })
    return
  }

  const whereClause = {
    userId,
    ...(postId ? { postId } : { commentId })
  }

  try {
    const existing = await Like.findOne({ where: whereClause })
    if (existing) {
      await existing.destroy()

      res.json({ liked: false })
      return
    }

    const like = await Like.create(whereClause)

    res.status(201).json({ liked: true, like })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error toggling like' })
    return
  }
}


// (For GET) Total likes on post.
export const getPostLikes = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId, 10)

  try {
    const count = await Like.count({ where: { postId } })

    res.status(200).json({ postId, likes: count })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error fetching likes' })
    return
  }
}


// (For GET) Check if user liked post.
export const checkUserLikedPost = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10)
  const postId = parseInt(req.params.postId, 10)

  try {
    const like = await Like.findOne({ where: { userId, postId } })

    res.status(200).json({ liked: !!like })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error checking like status' })
    return
  }
}

