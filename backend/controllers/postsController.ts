// ./backend/controllers/postsController.ts

// Imports
import { Sequelize } from 'sequelize'
import { Request, Response } from 'express'
import { User, Post, Comment, Like } from '../models'
import { AuthRequest } from '../types/AuthRequest'
import { resSuccess, resError } from '../utils/response'
import { buildQueryOptions } from '../utils/queryUtils'
import { buildPaginatedResponse } from '../utils/pagination'
import { log } from '../utils/logger'


export const createPost = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser?.id
  if (!userId) {
    resError(401, res, 'UNAUTHORIZED')
    return
  }

  const { title, content } = req.body
  if (!title || !content) {
    resError(400, res, 'MISSING_REQUIRED_FIELDS')
    return
  }

  try {
    const newPost = await Post.create({ userId, title, content })

    resSuccess(res, newPost, 201)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_CREATING_POST')
    return
  }
}


export const getAllPosts = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser?.id
  if (!userId) {
    resError(401, res, 'UNAUTHORIZED')
    return
  }

  const rawSearchableFields = req.query.searchableFields as string | undefined
  const parsedSearchableFields: string[] = rawSearchableFields ? JSON.parse(rawSearchableFields) : []
  const { page, pageSize, options } = buildQueryOptions(req, parsedSearchableFields)

  options.include = [
    {
      model: User,
      as: 'user',
      attributes: ['id', 'username', 'profileIconKey']
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


export const deletePost = async (req: AuthRequest, res: Response) => {
  const postId = parseInt(req.params.postId, 10)
  const userId = req.authUser?.id
  if (!userId) {
    resError(401, res, 'UNAUTHORIZED')
    return
  }

  try {
    const post = await Post.findByPk(postId)
    if (!post || post.userId !== userId) {
      resError(404, res, 'POST_NOT_FOUND')
      return
    }

    // Fetch comments and replies.
    const comments = await Comment.findAll({ where: { postId } })
    const commentIds = comments.map(c => c.id)

    const replies = await Comment.findAll({ where: { parentCommentId: commentIds } })

    // Fetch likes on post, comments, and replies.
    const postLikes = await Like.findAll({ where: { postId } })
    const commentLikes = await Like.findAll({ where: { commentId: commentIds } })
    const replyLikes = await Like.findAll({ where: { commentId: replies.map(r => r.id) } })

    log(`[deletePost] Deleting Post ID: ${postId}`, 'info')
    log(`[deletePost] -> Likes on Post: ${JSON.stringify(postLikes.map(l => l.toJSON()), null, 2)}`, 'log', undefined, { showDate: true, showTime: true, showAmPm: false }, true)
    log(`[deletePost] -> Comments: ${JSON.stringify(comments.map(c => c.toJSON()), null, 2)}`, 'log', undefined, { showDate: true, showTime: true, showAmPm: false }, true)
    log(`[deletePost] -> Replies: ${JSON.stringify(replies.map(r => r.toJSON()), null, 2)}`, 'log', undefined, { showDate: true, showTime: true, showAmPm: false }, true)
    log(`[deletePost] -> Likes on Comments: ${JSON.stringify(commentLikes.map(l => l.toJSON()), null, 2)}`, 'log', undefined, { showDate: true, showTime: true, showAmPm: false }, true)
    log(`[deletePost] -> Likes on Replies: ${JSON.stringify(replyLikes.map(l => l.toJSON()), null, 2)}`, 'log', undefined, { showDate: true, showTime: true, showAmPm: false }, true)


    // Delete post.
    await post.destroy()

    resSuccess(res)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_DELETING_POST')
    return
  }
}


export const editPost = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser?.id
  if (!userId) {
    resError(401, res, 'UNAUTHORIZED')
    return
  }

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


export const getPostById = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser?.id
  if (!userId) {
    resError(401, res, 'UNAUTHORIZED')
    return
  }

  const { postId } = req.params

  try {
    const post = await Post.findOne({
      where: { id: postId },
      include: [
        {
          model: User,
          as: 'user',
          attributes: ['id', 'username', 'profileIconKey']
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

    options.where = {
      ...(options.where || {}),
      userId
    }

    options.include = [
      {
        model: User,
        as: 'user',
        attributes: ['id', 'username', 'profileIconKey']
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

