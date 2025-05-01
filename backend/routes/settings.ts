// ./backend/routes/settings.ts

import express from 'express'
import { getUserSettings, updateUserSettings } from '../controllers/settingsController'


const router = express.Router()


router.get('/:userId', getUserSettings)      // GET: Get user settings.
router.patch('/:userId', updateUserSettings) // PATCH: Update user settings.


export default router
