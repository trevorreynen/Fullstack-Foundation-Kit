// ./backend/routes/auth.ts

// Imports
import express from 'express'
import { registerUser, loginUser, getAuthenticatedUser } from '../controllers/authController'
import { requireAuth } from '../middleware/requireAuth'

const router = express.Router()


router.post('/register', registerUser)               // POST: Register a user.
router.post('/login', loginUser)                     // POST: Sign in to account.
router.get('/me', requireAuth, getAuthenticatedUser) // GET: Get authenticated user.


export default router
