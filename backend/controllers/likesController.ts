// ./backend/controllers/likesController.ts

// Imports
import { Request, Response } from 'express'
import Like from '../models/Like'

// (For POST) Like a post.
export const likePost = async (req: Request, res: Response) => {
  const { userId, postId } = req.body
  if (!userId || !postId) {
    res.status(400).json({ error: 'Missing userId or postId' })
    return
  }

  try {
    const existing = await Like.findOne({ where: { userId, postId } })
    if (existing) {
      res.status(409).json({ error: 'Already liked' })
      return
    }

    const like = await Like.create({ userId, postId })

    res.status(201).json({ success: true, like })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error liking post' })
    return
  }
}


// (For DELETE) Unlike a post.
export const unlikePost = async (req: Request, res: Response) => {
  const { userId, postId } = req.body
  if (!userId || !postId) {
    res.status(400).json({ error: 'Missing userId or postId' })
    return
  }

  try {
    const like = await Like.findOne({ where: { userId, postId } })
    if (!like) {
      res.status(404).json({ error: 'Like not found' })
      return
    }

    await like.destroy()

    res.status(200).json({ success: true })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error unliking post' })
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

