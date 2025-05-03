// ./backend/routes/account.ts

// Imports
import express from 'express'
import { updateUsername, updateEmail, updatePassword, deleteAccount, getUserProfileByUsername } from '../controllers/accountController'
import { requireAuth } from '../middleware/requireAuth'


const router = express.Router()


router.delete('/',                requireAuth, deleteAccount)            // DELETE: Delete user.
router.patch('/email',            requireAuth, updateEmail)              // PATCH: Update email.
router.patch('/password',         requireAuth, updatePassword)           // PATCH: Update password.
router.patch('/username',         requireAuth, updateUsername)           // PATCH: Update username.
router.get('/username/:username', requireAuth, getUserProfileByUsername) // GET: Get user profile by username.


export default router
