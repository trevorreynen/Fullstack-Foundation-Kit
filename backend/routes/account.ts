// ./backend/routes/account.ts

// Imports
import express from 'express'
import { deleteAccount, updateEmail, updatePassword, uploadProfileImage, updateUsername, getUserProfileByUsername, getUserActivitySummary } from '../controllers/accountController'
import { requireAuth } from '../middleware/requireAuth'
import { upload, processProfileIcon } from '../middleware/uploadMiddleware'

const router = express.Router()


router.delete('/',                   requireAuth,                             deleteAccount)            // DELETE: Permanently deletes the authenticated user's account.
router.patch('/email',               requireAuth,                             updateEmail)              // PATCH: Updates the authenticated user's email if the new one isn't already in use.
router.patch('/password',            requireAuth,                             updatePassword)           // PATCH: Updates the user's password after verifying the current password and validating the new one.
router.post('/upload-profile-image', requireAuth, upload, processProfileIcon, uploadProfileImage)       // POST: Uploads and stores a new profile image key for the authenticated user.
router.patch('/username',            requireAuth,                             updateUsername)           // PATCH: Updates the user's username if the new one is not taken.
router.get('/username/:username',                                             getUserProfileByUsername) // GET: Retrieves a public profile (id, username, icon) based on the given username.
router.get('/userstats/:username',                                            getUserActivitySummary)   // GET: Get a users post and comment count by username.


export default router
