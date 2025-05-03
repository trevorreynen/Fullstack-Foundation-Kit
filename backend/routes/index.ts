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
  app.use('/api/v1/auth', authRoutes)
  app.use('/api/v1/account', accountRoutes)
  app.use('/api/v1/settings', settingsRoutes)
  app.use('/api/v1/posts', postsRoutes)
  app.use('/api/v1/likes', likesRoutes)
  app.use('/api/v1/comments', commentsRoutes)
}
