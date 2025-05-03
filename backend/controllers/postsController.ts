// ./backend/controllers/postsController.ts

// Imports
import { Sequelize } from 'sequelize'
import { Request, Response } from 'express'
import { User, Post, Comment } from '../models'
import { AuthRequest } from '../types/AuthRequest'
import { resSuccess, resError } from '../utils/response'
import { buildQueryOptions } from '../utils/queryUtils'
import { buildPaginatedResponse } from '../utils/pagination'


// (For POST) Create post.
export const createPost = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser!.id

  const { title, content } = req.body
  if (!title || !content) {
    resError(400, res, 'MISSING_REQUIRED_FIELDS')
    return
  }

  try {
    const newPost = await Post.create({ userId, title, content })

    resSuccess(res, newPost, 201)
    res.status(201).json({ success: true, post: newPost })
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_CREATING_POST')
    return
  }
}


// (For GET) Get all posts.
export const getAllPosts = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser!.id
  const rawSearchableFields = req.query.searchableFields as string | undefined
  const parsedSearchableFields: string[] = rawSearchableFields ? JSON.parse(rawSearchableFields) : []
  const { page, pageSize, options } = buildQueryOptions(req, parsedSearchableFields)

  options.include = [
    {
      model: User,
      as: 'user',
      attributes: ['id', 'username', 'profileIconUrl']
    }
  ]

  options.attributes = {
    include: [
      [
        Sequelize.literal(`(
          SELECT COUNT(*)
          FROM Comments
          WHERE Comments.postId = Post.id
        )`),
        'commentCount'
      ],
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
          AND Likes.userId = ${userId}
        )`),
        'likedByUser'
      ]
    ]
  }

  options.group = ['Post.id', 'user.id']

  try {
    const { count, rows } = await Post.findAndCountAll(options)

    const total = Array.isArray(count) ? count.length : count
    const data = buildPaginatedResponse(rows, total, page, pageSize)

    resSuccess(res, data)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_FETCHING_POSTS')
    return
  }
}


// (For DELETE) Delete post.
export const deletePost = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser!.id
  const postId = parseInt(req.params.postId, 10)

  try {
    const post = await Post.findByPk(postId)
    if (!post || post.userId !== userId) {
      resError(404, res, 'POST_NOT_FOUND')
      return
    }

    await post.destroy()

    resSuccess(res)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_DELETING_POST')
    return
  }
}


// (For PATCH) Edit post.
export const editPost = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser!.id
  const postId = parseInt(req.params.postId, 10)
  const { title, content } = req.body

  try {
    const post = await Post.findByPk(postId)
    if (!post || post.userId !== userId) {
      resError(404, res, 'POST_NOT_FOUND')
      return
    }

    if (title !== undefined) {
      post.title = title
    }

    if (content !== undefined) {
      post.content = content
    }

    await post.save()

    resSuccess(res, post)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_EDITING_POST')
    return
  }
}


// (For GET) Get single post by Id.
export const getPostById = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser!.id
  const { postId } = req.params

  try {
    const post = await Post.findOne({
      where: { id: postId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profileIconUrl']
        }
      ],
      attributes: {
        include: [
          [
            Sequelize.literal(`(
              SELECT COUNT(*)
              FROM Comments
              WHERE Comments.postId = Post.id
            )`),
            'commentCount'
          ],
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
              AND Likes.userId = ${userId}
            )`),
            'likedByUser'
          ]
        ]
      },
      group: ['Post.id', 'user.id']
    })
    if (!post) {
      resError(404, res, 'POST_NOT_FOUND')
      return
    }

    resSuccess(res, post)
    return
  } catch (error) {
    console.error('Failed to fetch post:', error)

    resError(500, res, 'ERROR_FETCHING_POST')
    return
  }
}


// (For GET) Get posts by user Id.
export const getUserPosts = async (req: Request, res: Response) => {
  const { username } = req.params
  const rawSearchableFields = req.query.searchableFields as string | undefined
  const parsedSearchableFields: string[] = rawSearchableFields ? JSON.parse(rawSearchableFields) : []
  const { page, pageSize, options } = buildQueryOptions(req, parsedSearchableFields)

  try {
    const user = await User.findOne({ where: { username } })
    if (!user) {
      resError(404, res, 'USER_NOT_FOUND')
      return
    }

    const userId = user.id

    options.include = [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'profileIconUrl']
      }
    ]

    options.attributes = {
      include: [
        [
          Sequelize.literal(`(
            SELECT COUNT(*)
            FROM Comments
            WHERE Comments.postId = Post.id
          )`),
          'commentCount'
        ],
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
            AND Likes.userId = ${userId}
          )`),
          'likedByUser'
        ]
      ]
    }

    options.group = ['Post.id', 'user.id']

    const { count, rows } = await Post.findAndCountAll(options)

    const total = Array.isArray(count) ? count.length : count
    const data = buildPaginatedResponse(rows, total, page, pageSize)

    resSuccess(res, data)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_FETCHING_USER_POSTS')
    return
  }
}

