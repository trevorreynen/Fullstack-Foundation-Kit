// ./backend/routes/auth.ts

// Imports
import express from 'express'
import { registerUser, loginUser, getAuthenticatedUser, uploadProfileImage } from '../controllers/authController'
import { requireAuth } from '../middleware/requireAuth'
import { upload } from '../middleware/uploadMiddleware'

const router = express.Router()


router.post('/login', loginUser)                     // POST: Sign in to account.
router.get('/me', requireAuth, getAuthenticatedUser) // GET: Get authenticated user.
router.post('/register', registerUser)               // POST: Register a user.
router.post('/upload-profile-image', requireAuth, upload.single('profileImage'), uploadProfileImage) // POST: Upload profile image.


export default router
