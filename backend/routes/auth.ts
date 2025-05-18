// ./backend/routes/auth.ts

// Imports
import express from 'express'
import { registerUser, loginUser, getAuthenticatedUser } from '../controllers/authController'
import { requireAuth } from '../middleware/requireAuth'


const router = express.Router()


router.post('/login',                 loginUser)            // POST: Authenticates a user using their email or username and returns a JWT on success.
router.get('/me',        requireAuth, getAuthenticatedUser) // GET: Returns basic profile details of the currently authenticated user.
router.post('/register',              registerUser)         // POST: Registers a new user, creates default settings, and returns their profile data.


export default router
