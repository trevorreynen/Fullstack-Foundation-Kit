// ./backend/controllers/accountController.ts

// Imports
import { Request, Response } from 'express'
import { User } from '../models'
import { AuthRequest } from '../types/AuthRequest'
import { resSuccess, resError } from '../utils/response'


// (For DELETE) Delete user.
export const deleteAccount = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser!.id

  try {
    const user = await User.findByPk(userId)
    if (!user) {
      resError(404, res, 'USER_NOT_FOUND')
      return
    }

    await user.destroy()

    resSuccess(res)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_DELETING_USER')
    return
  }
}


// (For PATCH) Update email.
export const updateEmail = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser!.id
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


// (For PATCH) Update password.
export const updatePassword = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser!.id
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


// (For PATCH) Update username.
export const updateUsername = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser!.id
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


// (For GET) Get user profile by username.
export const getUserProfileByUsername = async (req: Request, res: Response) => {
  const { username } = req.params

  try {
    const user = await User.findOne({
      where: { username },
      attributes: ['id', 'username', 'profileIconUrl']
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
