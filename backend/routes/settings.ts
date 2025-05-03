// ./backend/routes/settings.ts

import express from 'express'
import { getUserSettings, updateUserSettings } from '../controllers/settingsController'
import { requireAuth } from '../middleware/requireAuth'


const router = express.Router()


router.get('/',   requireAuth, getUserSettings)    // GET: Get user settings.
router.patch('/', requireAuth, updateUserSettings) // PATCH: Update user settings.


export default router
