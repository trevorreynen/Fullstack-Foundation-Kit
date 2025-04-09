// ./backend/routes/posts.ts

// Imports
import express from 'express'

import Post from '../models/Post'
import User from '../models/User'

const router = express.Router()


// POST: Create post.
router.post('/', async (req, res) => {
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
})


// GET: All posts.
router.get('/', async (_req, res) => {
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
})


// GET: Posts by user Id.
router.get('/user/:userId', async (req, res) => {
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
})


// DELETE: Post
router.delete('/:postId', async (req, res) => {
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
})


// PATCH: Edit post
router.patch('/:postId', async (req, res) => {
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
})


export default router

