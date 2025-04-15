// ./backend/controllers/postsController.ts

// Imports
import { Request, Response } from 'express'
import Post from '../models/Post'
import User from '../models/User'


// (For POST) Create post.
export const createPost = async (req: Request, res: Response) => {
  const { userId, title, content } = req.body
  if (!userId || !title || !content) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }

  try {
    const user = await User.findByPk(userId)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    const newPost = await Post.create({ userId, title, content })

    res.status(201).json({ success: true, post: newPost })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error creating post' })
    return
  }
}

// (For GET) Get all posts.
export const getAllPosts = async (_req: Request, res: Response) => {
  try {
    const posts = await Post.findAll({
      include: [{ model: User, as: 'user', attributes: ['id', 'username'] }],
      order: [['createdAt', 'DESC']],
    })

    res.status(200).json(posts)
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error fetching posts' })
    return
  }
}


// (For GET) Get posts by user Id.
export const getUserPosts = async (req: Request, res: Response) => {
  const userId = parseInt(req.params.userId, 10)

  try {
    const posts = await Post.findAll({
      where: { userId },
      order: [['createdAt', 'DESC']],
    })

    res.status(200).json(posts)
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error fetching user posts' })
    return
  }
}


// (For DELETE) Delete post
export const deletePost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId, 10)

  try {
    const post = await Post.findByPk(postId)
    if (!post) {
      res.status(404).json({ error: 'Post not found' })
      return
    }

    await post.destroy()

    res.status(200).json({ success: true })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error deleting post' })
    return
  }
}


// (For PATCH) Edit post.
export const editPost = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId, 10)
  const { title, content } = req.body

  try {
    const post = await Post.findByPk(postId)
    if (!post) {
      res.status(404).json({ error: 'Post not found' })
      return
    }

    if (title !== undefined) {
      post.title = title
    }

    if (content !== undefined) {
      post.content = content
    }

    await post.save()

    res.status(200).json({ success: true, post })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error editing post' })
    return
  }
}

