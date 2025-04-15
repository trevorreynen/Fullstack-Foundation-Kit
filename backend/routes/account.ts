// ./backend/routes/account.ts

// Imports
import express from 'express'
import { updateUsername, updateEmail, updatePassword, deleteAccount, getUserProfileByUsername } from '../controllers/accountController'


const router = express.Router()


router.patch('/username', updateUsername) // PATCH: Update username.
router.patch('/email', updateEmail) // PATCH: Update email.
router.patch('/password', updatePassword) // PATCH: Update password.
router.delete('/', deleteAccount) // DELETE: Delete user.
router.get('/username/:username', getUserProfileByUsername) // GET: Get user profile by username.


export default router
