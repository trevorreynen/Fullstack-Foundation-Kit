// ./backend/routes/index.ts

// Imports
import { Application } from 'express'

// Import Routes
import authRoutes from './auth'
import accountRoutes from './account'
import settingsRoutes from './settings'
import postsRoutes from './posts'
import likesRoutes from './likes'
import commentsRoutes from './comments'


export default function registerRoutes(app: Application) {
  app.use('/api/auth', authRoutes)
  app.use('/api/account', accountRoutes)
  app.use('/api/settings', settingsRoutes)
  app.use('/api/posts', postsRoutes)
  app.use('/api/likes', likesRoutes)
  app.use('/api/comments', commentsRoutes)
}
