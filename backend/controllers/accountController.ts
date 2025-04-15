// ./backend/controllers/accountController.ts

// Imports
import { Request, Response } from 'express'
import User from '../models/User'



// (For PATCH) Update username.
export const updateUsername = async (req: Request, res: Response) => {
  const { userId, newUsername } = req.body
  if (!userId || !newUsername) {
    res.status(400).json({ error: 'Missing userId or newUsername' })
    return
  }

  try {
    const existingUser = await User.findOne({ where: { username: newUsername } })
    if (existingUser) {
      res.status(409).json({ error: 'Username is already taken' })
      return
    }

    const user = await User.findByPk(userId)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    user.username = newUsername
    await user.save()

    res.status(200).json({ success: true, username: user.username })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Server error during username update' })
    return
  }
}


// (For PATCH) Update email.
export const updateEmail = async (req: Request, res: Response) => {
  const { userId, newEmail } = req.body
  if (!userId || !newEmail) {
    res.status(400).json({ error: 'Missing userId or newEmail' })
    return
  }

  try {
    const existingUser = await User.findOne({ where: { email: newEmail } })
    if (existingUser) {
      res.status(409).json({ error: 'Email is already in use' })
      return
    }

    const user = await User.findByPk(userId)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    user.email = newEmail
    await user.save()

    res.status(200).json({ success: true, email: user.email })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Server error during email update' })
    return
  }
}


// (For PATCH) Update password.
export const updatePassword = async (req: Request, res: Response) => {
  const { userId, currentPassword, newPassword } = req.body
  if (!userId || !currentPassword || !newPassword) {
    res.status(400).json({ error: 'Missing required fields' })
    return
  }

  try {
    const user = await User.findByPk(userId)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    const isMatch = await user.checkPassword(currentPassword)
    if (!isMatch) {
      res.status(401).json({ error: 'Current password is incorrect' })
      return
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{5,}$/
    if (!passwordRegex.test(newPassword)) {
      res.status(400).json({ error: 'New password must be at least 5 characters and include lowercase, uppercase, and a symbol' })
      return
    }

    user.password = newPassword // Gets hashed by model hook
    await user.save()

    res.status(200).json({ success: true, message: 'Password updated' })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Server error during password update' })
    return
  }
}


// (For DELETE) Delete user.
export const deleteAccount = async (req: Request, res: Response) => {
  const { userId } = req.body
  if (!userId) {
    res.status(400).json({ error: 'Missing userId' })
    return
  }

  try {
    const user = await User.findByPk(userId)
    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    await user.destroy()

    res.status(200).json({ success: true, message: 'User deleted' })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Server error during user deletion' })
    return
  }
}


// (For GET) Get user profile by username.
export const getUserProfileByUsername = async (req: Request, res: Response) => {
  const { username } = req.params

  try {
    const user = await User.findOne({
      where: { username },
      attributes: ['id', 'username']
    })

    if (!user) {
      res.status(404).json({ error: 'User not found' })
      return
    }

    res.json(user)
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Internal server error' })
    return
  }
}
