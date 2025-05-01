// ./backend/controllers/postsController.ts

// Imports
import { Sequelize } from 'sequelize'
import { Request, Response } from 'express'
import { User, Post, Comment } from '../models'
import { AuthRequest } from '../types/AuthRequest'


// (For POST) Create post.
export const createPost = async (req: AuthRequest, res: Response) => {
  const { title, content } = req.body
  if (!title || !content) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }

  try {
    const newPost = await Post.create({ userId: req.authUser!.id, title, content })

    res.status(201).json({ success: true, post: newPost })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error creating post' })
    return
  }
}

// (For GET) Get all posts.
export const getAllPosts = async (req: AuthRequest, res: Response) => {
  try {
    const posts = await Post.findAll({
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profileIconUrl']
        },
        {
          model: Comment,
          as: 'comments',
          attributes: [] // not loading full comment data
        }
      ],
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'commentCount'],
          [ // Subquery to count likes for each post
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM Likes AS postLikes
              WHERE postLikes.postId = Post.id
            )`),
            'likeCount'
          ],
          [
            Sequelize.literal(`EXISTS (
              SELECT 1
              FROM Likes
              WHERE Likes.postId = Post.id
              AND Likes.userId = ${req.authUser!.id}
            )`),
            'likedByUser'
          ]
        ]
      },
      group: ['Post.id', 'user.id'],
      order: [['createdAt', 'DESC']]
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
export const getUserPosts = async (req: AuthRequest, res: Response) => {
  const { userId } = req.params

  try {
    const posts = await Post.findAll({
      where: { userId },
      include: [
        {
          model: Comment,
          as: 'comments',
          attributes: []
        }
      ],
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'commentCount'],
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM Likes AS postLikes
              WHERE postLikes.postId = Post.id
            )`),
            'likeCount'
          ],
          [
            Sequelize.literal(`EXISTS (
              SELECT 1
              FROM Likes
              WHERE Likes.postId = Post.id
              AND Likes.userId = ${req.authUser!.id}
            )`),
            'likedByUser'
          ]
        ]
      },
      group: ['Post.id'],
      order: [['createdAt', 'DESC']]
    })

    res.status(200).json(posts)
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error fetching user posts' })
    return
  }
}


// (For GET) Get single post by Id.
export const getPostById = async (req: AuthRequest, res: Response) => {
  const { postId } = req.params

  try {
    const post = await Post.findOne({
      where: { id: postId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profileIconUrl']
        },
        {
          model: Comment,
          as: 'comments',
          attributes: []
        }
      ],
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('comments.id')), 'commentCount'],
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM Likes AS postLikes
              WHERE postLikes.postId = Post.id
            )`),
            'likeCount'
          ],
          [
            Sequelize.literal(`EXISTS (
              SELECT 1
              FROM Likes
              WHERE Likes.postId = Post.id
              AND Likes.userId = ${req.authUser!.id}
            )`),
            'likedByUser'
          ]
        ]
      },
      group: ['Post.id', 'user.id']
    })
    if (!post) {
      res.status(404).json({ error: 'Post not found' })
      return
    }

    res.status(200).json(post)
    return
  } catch (error) {
    console.error('Failed to fetch post:', error)

    res.status(500).json({ error: 'Server error' })
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

