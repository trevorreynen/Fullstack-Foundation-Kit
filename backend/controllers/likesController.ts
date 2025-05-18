// ./backend/controllers/likesController.ts

// Imports
import { Request, Response } from 'express'
import { Like } from '../models'
import { AuthRequest } from '../types/AuthRequest'
import { resSuccess, resError } from '../utils/response'


export const toggleLike = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser?.id
  if (!userId) {
    resError(401, res, 'UNAUTHORIZED')
    return
  }

  const { postId, commentId } = req.body
  if (!postId && !commentId) {
    resError(400, res, 'MISSING_LIKE_TARGET')
    return
  }

  if (postId && commentId) {
    resError(400, res, 'CANNOT_LIKE_BOTH')
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

    resSuccess(res, { liked: true, like }, 201)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_TOGGLING_LIKE')
    return
  }
}


export const getPostLikes = async (req: Request, res: Response) => {
  const postId = parseInt(req.params.postId, 10)

  try {
    const count = await Like.count({ where: { postId } })

    resSuccess(res, { postId, likes: count })
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_FETCHING_LIKES')
    return
  }
}


export const checkUserLikedPost = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser?.id
  if (!userId) {
    resError(401, res, 'UNAUTHORIZED')
    return
  }

  const postId = parseInt(req.params.postId, 10)

  try {
    const like = await Like.findOne({ where: { userId, postId } })

    resSuccess(res, { liked: !!like })
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_FETCHING_LIKE_STATUS')
    return
  }
}

