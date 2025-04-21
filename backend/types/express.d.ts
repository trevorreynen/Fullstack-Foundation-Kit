// ./backend/types/express/index.d.ts

// Imports
import { User } from '../models'

declare global {
  namespace Express {
    interface Request {
      user?: User
    }
  }
}

export {}
