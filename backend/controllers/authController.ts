// ./backend/controllers/authController.ts

// Imports
import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { User, UserSettings } from '../models'
import { generateToken } from '../utils/jwt'
import { resSuccess, resError } from '../utils/response'

// Helper regex to enforce password rules
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{5,}$/


export const loginUser = async (req: Request, res: Response) => {
  // identifier = username or email as intended
  const { identifier, password } = req.body
  if (!identifier || !password) {
    resError(400, res, 'INVALID_USERNAME_OR_PASSWORD')
    return
  }

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }]
      }
    })

    if (!user) {
      resError(400, res, 'INVALID_USERNAME_OR_PASSWORD')
      return
    }

    const token = generateToken(user.id, user.username)

    const isMatch = await user.checkPassword(password)
    if (!isMatch) {
      resError(400, res, 'INVALID_USERNAME_OR_PASSWORD')
      return
    }

    resSuccess(res, {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profileIconKey: user.profileIconKey,
      }
    })
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'LOGIN_FAILED')
    return
  }
}


export const getAuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const user = req.user
    if (!user) {
      resError(401, res, 'NOT_AUTHENTICATED')
      return
    }

    resSuccess(res, {
      id: user.id,
      username: user.username,
      email: user.email,
      profileIconKey: user.profileIconKey,
    })
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_FETCHING_USER')
    return
  }
}


export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    resError(400, res, 'MISSING_REQUIRED_FIELDS')
    return
  }

  try {
    if (!passwordRegex.test(password)) {
      resError(400, res, 'INVALID_PASSWORD_FORMAT')
      return
    }

    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] }
    })

    if (existingUser) {
      resError(409, res, 'EMAIL_OR_USERNAME_EXISTS')
      return
    }

    const newUser = await User.create({ username, email, password })

    await UserSettings.create({
      userId: newUser.id,
      uiTheme: 'dark',
      customNote: null,
      notificationsEnabled: true
    })

    resSuccess(res, {
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    })
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'REGISTRATION_FAILED')
    return
  }
}
