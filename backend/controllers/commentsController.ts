// ./backend/routes/comments.ts

// Imports
import { Request, Response } from 'express'
import { Post, Comment, Like } from '../models'
import { AuthRequest } from '../types/AuthRequest'
import { resSuccess, resError } from '../utils/response'
import { buildQueryOptions } from '../utils/queryUtils'
import { buildPaginatedResponse } from '../utils/pagination'


// (For POST) Create comment.
export const createComment = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser!.id
  const { postId, content } = req.body
  if (!postId || !content) {
    resError(400, res, 'MISSING_REQUIRED_FIELDS')
    return
  }

  try {
    const comment = await Comment.create({ userId, postId, content })

    resSuccess(res, comment)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_CREATING_COMMENT')
    return
  }
}


// (For PATCH) Edit comment.
export const editComment = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser!.id
  const commentId = parseInt(req.params.commentId, 10)
  const { content } = req.body

  try {
    const comment = await Comment.findByPk(commentId)
    if (!comment || comment.userId !== userId) {
      resError(404, res, 'COMMENT_NOT_FOUND')
      return
    }

    comment.content = content
    await comment.save()

    resSuccess(res, comment)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_EDITING_COMMENT')
    return
  }
}


// (For DELETE) Delete comment.
export const deleteComment = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser!.id
  const commentId = parseInt(req.params.commentId, 10)

  try {
    const comment = await Comment.findByPk(commentId)
    if (!comment) {
      resError(404, res, 'COMMENT_NOT_FOUND')
      return
    }

    const post = await Post.findByPk(comment.postId)
    const isOwner = comment.userId === userId || post?.userId === userId

    if (!isOwner) {
      resError(403, res, 'UNAUTHORIZED_ACTION')
      return
    }

    await comment.destroy()

    resSuccess(res)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_DELETING_COMMENT')
    return
  }
}


// (For GET) Get comment count by post Id.
export const getCommentCountByPostId = async (req: Request, res: Response) => {
  const { postId } = req.params

  try {
    const count = await Comment.count({ where: { postId } })

    resSuccess(res, { postId, commentCount: count })
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_COUNTING_COMMENTS')
    return
  }
}


// (For GET) Get comments by post Id.
export const getCommentsForPost = async (req: Request, res: Response) => {
  const postId = req.params.postId

  try {
    // Step 1: Extract query params and options
    const rawSearchableFields = req.query.searchableFields as string | undefined
    const parsedSearchableFields: string[] = rawSearchableFields ? JSON.parse(rawSearchableFields) : []
    const { page, pageSize, options } = buildQueryOptions(req, parsedSearchableFields)

    // Step 2: Force filtering to this postId + top-level only
    const baseWhere = {
      postId,
      parentCommentId: null,
      ...(options.where || {})
    }

    // Step 3: Sort prep — if sorting by likeCount, remove for now and apply manually
    let sortByLikes = false

    if (
      Array.isArray(options.order) &&
      options.order.length &&
      Array.isArray(options.order[0]) &&
      typeof options.order[0][0] === 'string' &&
      options.order[0][0] === 'likeCount'
    ) {
      sortByLikes = true
      delete options.order
    }

    // Step 4: Fetch base comments
    const { rows: topLevelComments, count } = await Comment.findAndCountAll({
      ...options,
      where: baseWhere,
      include: [
        {
          model: Comment,
          as: 'replies',
          separate: true,
          required: false,
          order: [['createdAt', 'ASC']]
        }
      ],
    })

    // Step 5: Add like counts manually
    for (const comment of topLevelComments) {
      const likeCount = await Like.count({ where: { commentId: comment.id } })
      ;(comment as any).likeCount = likeCount

      const replies = (comment as any).replies || []
      for (const reply of replies) {
        const replyLikeCount = await Like.count({ where: { commentId: reply.id } })
        ;(reply as any).likeCount = replyLikeCount
      }
    }

    // Step 6: Manual sorting by like count if requested
    if (sortByLikes) {
      topLevelComments.sort((a, b) => (b as any).likeCount - (a as any).likeCount)
    }

    // Step 7: Paginate and return
    const paginated = buildPaginatedResponse(topLevelComments, count, page, pageSize)
    resSuccess(res, paginated)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_FETCHING_COMMENTS')
    return
  }
}


// (For POST) Reply to a comment.
export const createReply = async (req: AuthRequest, res: Response) => {
  const { postId, parentCommentId, content } = req.body
  const userId = req.user!.id

  if (!postId || !parentCommentId || !content?.trim()) {
    resError(400, res, 'MISSING_REQUIRED_FIELDS')
    return
  }

  try {
    // Make sure post exists
    const post = await Post.findByPk(postId)
    if (!post) {
      resError(404, res, 'POST_NOT_FOUND')
      return
    }

    // Check that parent comment exists and belongs to same post
    const parentComment = await Comment.findByPk(parentCommentId)
    if (!parentComment || parentComment.postId !== Number(postId)) {
      resError(400, res, 'INVALID_PARENT_COMMENT')
      return
    }

    const newReply = await Comment.create({
      userId,
      postId,
      parentCommentId,
      content: content.trim()
    })

    resSuccess(res, newReply, 201)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_CREATING_REPLY')
    return
  }
}

