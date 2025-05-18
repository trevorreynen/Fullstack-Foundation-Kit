// ./backend/routes/settings.ts

import express from 'express'
import { getUserSettings, updateUserSettings } from '../controllers/settingsController'
import { requireAuth } from '../middleware/requireAuth'


const router = express.Router()


router.get('/',   requireAuth, getUserSettings)    // GET: Fetches UI and notification settings for the authenticated user.
router.patch('/', requireAuth, updateUserSettings) // PATCH: Updates the authenticated user's settings (theme, notifications, note).


export default router
