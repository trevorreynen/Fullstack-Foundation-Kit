// ./backend/middleware/requireAuth.ts

// Imports
import { Request, Response, NextFunction } from 'express'
import User from '../models/User'
import jwt from 'jsonwebtoken'
import { verifyToken } from '../utils/jwt'


const JWT_SECRET = process.env.JWT_SECRET!


export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = verifyToken(token) as { id: number }

    const user = await User.findByPk(decoded.id)
    if (!user) {
      res.status(401).json({ error: 'User not found' })
      return
    }

    // Attach user to request
    req.user = user

    next()
  } catch (err) {
    console.error(err)

    res.status(401).json({ error: 'Invalid token' })
    return
  }
}
