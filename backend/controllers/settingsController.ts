// ./backend/controllers/settingsController.ts

// Imports
import { Response } from 'express'
import { UserSettings } from '../models'
import { AuthRequest } from '../types/AuthRequest'
import { resSuccess, resError } from '../utils/response'


// (For GET) Get user settings.
export const getUserSettings = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser!.id

  try {
    const settings = await UserSettings.findOne({ where: { userId } })
    if (!settings) {
      resError(404, res, 'SETTINGS_NOT_FOUND')
      return
    }

    resSuccess(res, settings)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_FETCHING_SETTINGS')
    return
  }
}


// (For PATCH) Update user settings.
export const updateUserSettings = async (req: AuthRequest, res: Response) => {
  const userId = req.authUser!.id

  const { uiTheme, notificationsEnabled, customNote } = req.body

  try {
    const settings = await UserSettings.findOne({ where: { userId } })
    if (!settings) {
      resError(404, res, 'SETTINGS_NOT_FOUND')
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

    resSuccess(res, settings)
    return
  } catch (err) {
    console.error(err)

    resError(500, res, 'ERROR_UPDATING_SETTINGS')
    return
  }
}
