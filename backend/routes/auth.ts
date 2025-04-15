// ./backend/routes/auth.ts

// Imports
import express from 'express'
import { registerUser, loginUser } from '../controllers/authController'

const router = express.Router()


router.post('/register', registerUser) // POST: Register a user.
router.post('/login', loginUser)       // POST: Sign in to account.


export default router
