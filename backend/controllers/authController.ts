// ./backend/controllers/authController.ts

// Imports
import { Request, Response } from 'express'
import { Op } from 'sequelize'
import { User, UserSettings } from '../models'
import { generateToken } from '../utils/jwt'

// Helper regex to enforce password rules
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{5,}$/


// (For POST) Register a user.
export const registerUser = async (req: Request, res: Response) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400).json({ error: 'Missing required fields.' })
    return
  }

  try {
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        error: 'Password must be at least 5 characters long and include a lowercase, uppercase, and a symbol.'
      })
      return
    }

    const existingUser = await User.findOne({
      where: { [Op.or]: [{ email }, { username }] }
    })

    if (existingUser) {
      res.status(409).json({ error: 'Email or username already exists.' })
      return
    }

    const newUser = await User.create({ username, email, password })

    await UserSettings.create({
      userId: newUser.id,
      uiTheme: 'dark',
      customNote: null,
      notificationsEnabled: true
    })

    res.status(201).json({
      id: newUser.id,
      username: newUser.username,
      email: newUser.email
    })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Registration failed.' })
    return
  }
}


// (For POST) Sign in to account.
export const loginUser = async (req: Request, res: Response) => {
  // identifier = username or email as intended
  const { identifier, password } = req.body
  if (!identifier || !password) {
    res.status(400).json({ error: 'Invalid username or password.' })
    return
  }

  try {
    const user = await User.findOne({
      where: {
        [Op.or]: [{ email: identifier }, { username: identifier }]
      }
    })

    if (!user) {
      res.status(401).json({ error: 'Invalid username or password.' })
      console.log(`Login failed for identifier "${identifier}"`)
      return
    }

    const token = generateToken(user.id, user.username)

    const isMatch = await user.checkPassword(password)
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid username or password.' })
      // TODO: Remove above console.log (and all console.logs) before ever going to production (obviously).
      return
    }

    res.status(200).json({
      message: 'Login successful',
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        profileIconUrl: user.profileIconUrl,
      },
    })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error logging in.' })
    return
  }
}


// (For GET) Get authenticated user.
export const getAuthenticatedUser = async (req: Request, res: Response) => {
  try {
    const user = req.user
    if (!user) {
      res.status(401).json({ error: 'Not authenticated' })
      return
    }

    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      profileIconUrl: user.profileIconUrl,
    })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Failed to fetch user data' })
    return
  }
}


// (For POST) Upload profile image.
export const uploadProfileImage = async (req: Request, res: Response) => {
  try {
    const file = req.file
    if (!file) {
      res.status(400).json({ error: 'No file uploaded' })
      return
    }

    const user = req.user
    if (!user) {
      res.status(401).json({ error: 'Not authenticated' })
      return
    }

    const filePath = `/uploads/${file.filename}`

    await user.update({ profileIconUrl: filePath })

    res.status(200).json({ message: 'Image uploaded', profileIconUrl: filePath })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Failed to upload image' })
    return
  }
}

