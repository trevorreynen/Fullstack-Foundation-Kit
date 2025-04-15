// ./backend/types/express/index.d.ts

// Imports
import User from '../models/User'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export {}
