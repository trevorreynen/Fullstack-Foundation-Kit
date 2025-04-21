// ./backend/middleware/requireAuth.ts

// Imports
import { Response, NextFunction } from 'express'
import User from '../models/User'
import { verifyToken } from '../utils/jwt'
import { AuthRequest } from '../types/AuthRequest'
import { JWTPayloadUser } from '../types/JWTPayloadUser'


export const requireAuth = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Unauthorized' })
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = verifyToken(token) as JWTPayloadUser

    const user = await User.findByPk(decoded.id)
    if (!user) {
      res.status(401).json({ error: 'User not found' })
      return
    }

    // Attach user to request
    req.authUser = {
      id: decoded.id,
      username: decoded.username
    }

    next()
  } catch (err) {
    console.error(err)

    res.status(401).json({ error: 'Invalid token' })
    return
  }
}
