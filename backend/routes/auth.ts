// ./backend/routes/auth.ts

// Imports
import express from 'express'
import { Op } from 'sequelize'

// Model Import
import User from '../models/User'
import UserSettings from '../models/UserSettings'

const router = express.Router()

// Helper regex to enforce password rules
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{5,}$/


// POST: Register a user.
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body
  if (!username || !email || !password) {
    res.status(400).json({ error: 'Missing required fields.' })
    return
  }

  try {
    if (!passwordRegex.test(password)) {
      res.status(400).json({
        error: 'Password must be at least 5 characters long and include a lowercase, uppercase, and a symbol.',
      })
      return
    }

    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email }, { username }],
      },
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
      email: newUser.email,
    })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Registration failed.' })
    return
  }
})


// POST: Sign in to account.
router.post('/login', async (req, res) => {
  // identifier = username or email as intended
  const { identifier, password } = req.body
  if (!identifier || !password) {
    res.status(400).json({ error: 'Invalid username or password.' })
    return
  }

  try {
    const user = await User.findOne({ where: { [Op.or]: [{ email: identifier }, { username: identifier }] } })
    if (!user) {
      res.status(401).json({ error: 'Invalid username or password.' })
      console.log(`Login failed for identifier "${identifier}"`)
      // TODO: Remove above console.log before ever going to production (obviously).
      return
    }

    const isMatch = await user.checkPassword(password)
    if (!isMatch) {
      res.status(401).json({ error: 'Invalid username or password.' })
      return
    }

    res.status(200).json({
      message: 'Login successful',
      id: user.id,
      username: user.username,
      email: user.email,
      profileIconUrl: user.profileIconUrl,
    })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error logging in.' })
    return
  }
})


export default router
