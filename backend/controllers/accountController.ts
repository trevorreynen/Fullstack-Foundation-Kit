// ./backend/controllers/accountController.ts

// Imports
import { Request, Response } from 'express'
import { User, Post, Comment, Like, UserSettings } from '../models'
import { AuthRequest } from '../types/AuthRequest'
import { resSuccess, resError } from '../utils/response'
import { log } from '../utils/logger'


export const deleteAccount = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser?.id
  if (!userId) {
    resError(401, res, 'UNAUTHORIZED')
    return
  }

  try {
    const user = await User.findByPk(userId)
    if (!user) {
      resError(404, res, 'USER_NOT_FOUND')
      return
    }

    log(`[deleteAccount] Deleting User ID: ${userId}`, 'info')
    log(`[deleteAccount] -> User: ${JSON.stringify(user.toJSON(), null, 2)}`, 'log')

    const settings = await UserSettings.findOne({ where: { userId } })
    if (settings) {
      log(`[deleteAccount] -> UserSettings: ${JSON.stringify(settings.toJSON(), null, 2)}`, 'log')
    }

    const posts = await Post.findAll({ where: { userId } })
    log(`[deleteAccount] -> Posts: ${JSON.stringify(posts.map(p => p.toJSON()), null, 2)}`, 'log')

    const comments = await Comment.findAll({ where: { userId } })
    log(`[deleteAccount] -> Comments: ${JSON.stringify(comments.map(c => c.toJSON()), null, 2)}`, 'log')

    const likes = await Like.findAll({ where: { userId } })
    log(`[deleteAccount] -> Likes: ${JSON.stringify(likes.map(l => l.toJSON()), null, 2)}`, 'log')

    // Delete account.
    await user.destroy()

    resSuccess(res)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_DELETING_USER')
    return
  }
}


export const updateEmail = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser?.id
  if (!userId) {
    resError(401, res, 'UNAUTHORIZED')
    return
  }

  const { newEmail } = req.body
  if (!newEmail) {
    resError(400, res, 'MISSING_REQUIRED_FIELDS')
    return
  }

  try {
    const existingUser = await User.findOne({ where: { email: newEmail } })
    if (existingUser) {
      resError(409, res, 'EMAIL_IN_USE')
      return
    }

    const user = await User.findByPk(userId)
    if (!user) {
      resError(404, res, 'USER_NOT_FOUND')
      return
    }

    user.email = newEmail
    await user.save()

    resSuccess(res, { email: user.email })
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_UPDATING_EMAIL')
    return
  }
}


export const updatePassword = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser?.id
  if (!userId) {
    resError(401, res, 'UNAUTHORIZED')
    return
  }

  const { currentPassword, newPassword } = req.body
  if (!currentPassword || !newPassword) {
    resError(400, res, 'MISSING_REQUIRED_FIELDS')
    return
  }

  try {
    const user = await User.findByPk(userId)
    if (!user) {
      resError(404, res, 'USER_NOT_FOUND')
      return
    }

    const isMatch = await user.checkPassword(currentPassword)
    if (!isMatch) {
      resError(401, res, 'PASSWORD_INCORRECT')
      return
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{5,}$/
    if (!passwordRegex.test(newPassword)) {
      resError(400, res, 'INVALID_PASSWORD_FORMAT')
      return
    }

    user.password = newPassword // Gets hashed by model hook
    await user.save()

    resSuccess(res)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_UPDATING_PASSWORD')
    return
  }
}


export const uploadProfileImage = async (req: AuthRequest, res: Response) => {
  const authUser = req.authUser
  if (!authUser) {
    resError(401, res, 'NOT_AUTHENTICATED')
    return
  }

  const profileIconKey = req.profileIconKey
  if (!profileIconKey) {
    resError(400, res, 'INVALID_FILE')
    return
  }


  try {
    const user = await User.findByPk(authUser.id)
    if (!user) {
      resError(401, res, 'USER_NOT_FOUND')
      return
    }

    user.profileIconKey = profileIconKey
    await user.save()

    resSuccess(res)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_UPLOADING_IMAGE')
    return
  }
}


export const updateUsername = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser?.id
  if (!userId) {
    resError(401, res, 'UNAUTHORIZED')
    return
  }

  const { newUsername } = req.body
  if (!newUsername) {
    resError(400, res, 'MISSING_REQUIRED_FIELDS')
    return
  }

  try {
    const existingUser = await User.findOne({ where: { username: newUsername } })
    if (existingUser) {
      resError(409, res, 'USERNAME_TAKEN')
      return
    }

    const user = await User.findByPk(userId)
    if (!user) {
      resError(404, res, 'USER_NOT_FOUND')
      return
    }

    user.username = newUsername
    await user.save()

    resSuccess(res, { username: user.username })
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_UPDATING_USERNAME')
    return
  }
}


export const getUserProfileByUsername = async (req: Request, res: Response) => {
  const { username } = req.params

  try {
    const user = await User.findOne({
      where: { username },
      attributes: ['id', 'username', 'profileIconKey']
    })

    if (!user) {
      resError(404, res, 'USER_NOT_FOUND')
      return
    }

    resSuccess(res, user)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'SERVER_ERROR')
    return
  }
}


export const getUserActivitySummary = async (req: Request, res: Response) => {
  const { username } = req.params

  try {
    const user = await User.findOne({ where: { username } })
    if (!user) {
      resError(404, res, 'USER_NOT_FOUND')
      return
    }

    const [postCount, commentCount] = await Promise.all([
      Post.count({ where: { userId: user.id } }),
      Comment.count({ where: { userId: user.id } })
    ])

    resSuccess(res, { postCount, commentCount })
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'SERVER_ERROR')
    return
  }
}
