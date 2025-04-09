// ./backend/routes/settings.ts

import express from 'express'
import UserSettings from '../models/UserSettings'

const router = express.Router()


// GET: Load user settings.
router.get('/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10)
  if (isNaN(userId)) {
    res.status(400).json({ error: 'Invalid userId' })
    return
  }

  try {
    const settings = await UserSettings.findOne({ where: { userId } })
    if (!settings) {
      res.status(404).json({ error: 'Settings not found for this user' })
      return
    }

    res.status(200).json(settings)
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error loading user settings' })
    return
  }
})


// PATCH: Update user settings.
router.patch('/:userId', async (req, res) => {
  const userId = parseInt(req.params.userId, 10)
  if (isNaN(userId)) {
    res.status(400).json({ error: 'Invalid userId' })
    return
  }

  const { uiTheme, notificationsEnabled, customNote } = req.body

  try {
    const settings = await UserSettings.findOne({ where: { userId } })
    if (!settings) {
      res.status(404).json({ error: 'Settings not found' })
      return
    }

    if (uiTheme !== undefined) {
      settings.uiTheme = uiTheme
    }

    if (notificationsEnabled !== undefined) {
      settings.notificationsEnabled = notificationsEnabled
    }

    if (customNote !== undefined) {
      settings.customNote = customNote
    }

    await settings.save()

    res.status(200).json({ success: true, settings })
    return
  } catch (err) {
    console.error(err)

    res.status(500).json({ error: 'Error updating user settings' })
    return
  }
})


export default router
