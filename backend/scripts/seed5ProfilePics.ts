// ./backend/scripts/seed5ProfilePics.ts

// Note: This seeder will not work unless you have two folders:
//         - One folder (PFP_DIR) with square images.
//         - Another folder (IMAGES_DIR) with any size WxH images.


// Imports
import fs from 'fs'
import path from 'path'
import axios from 'axios'
import FormData from 'form-data'
import { sequelize } from '../config/database'
import { User } from '../models'
import { cropRandomSquare } from './seeder-utils/cropRandomSquare'
import { convertISO8601ToFormatted } from './seeder-utils/usefulFunctions'
import { initLogger, log, closeLogger } from '../utils/logger'


// ==============================< CONFIG >===============================
initLogger('timestamp', 'seed5ProfilePics', './Logs-Seeders')

// Paths for images.
const PFP_DIR = 'C:/GitHub/React Fullstack Template Project/backend/scripts/seeder-assets/pfp/'
const IMAGES_DIR = 'C:/GitHub/React Fullstack Template Project/backend/scripts/seeder-assets/images/'

// Path to save cropped image temporarily.
const TEMP_DIR = 'C:/GitHub/React Fullstack Template Project/backend/scripts/seeder-assets/temp/'

// Percent chance of using './seeder-assets/pfp/' over './seeder-assets/images/'.
const USE_PFP_FOLDER_PROBABILITY = 0.4

// Cropped image scale percent of max size.
const CROPPED_MIN_PERCENT = 0.4 // Minimum % of smaller dimension
const CROPPED_MAX_PERCENT = 0.9 // Maximum % of smaller dimension

// Login API URL.
const LOGIN_URL = 'http://localhost:3050/api/v1/auth/login'

// Upload profile picture URL.
const UPLOAD_URL = 'http://localhost:3050/api/v1/account/upload-profile-image'

// Default user password.
const DEFAULT_PASSWORD = 'Password1!'

// Ignore adding a profile picture to users:
const IGNORE_USERS = [ 'trevor' ]


// =========================< MAIN FUNCTION(S) >==========================
async function getRandomImagePath(): Promise<string> {
  const usePfp = Math.random() < USE_PFP_FOLDER_PROBABILITY
  const dir = usePfp ? PFP_DIR : IMAGES_DIR

  const MAX_MB = 2
  const MAX_BYTES = MAX_MB * 1024 * 1024

  const files = fs.readdirSync(dir)
    .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
    .filter(file => {
      const { size } = fs.statSync(path.join(dir, file))
      return size <= MAX_BYTES
    })

  if (files.length === 0) {
    throw new Error(`[error] No valid image found in ${dir}.`)
  }

  const picked = path.join(dir, files[Math.floor(Math.random() * files.length)])

  if (usePfp) {
    return picked
  }

  // Crop if it's from './seeder-assets/images/'
  return await cropRandomSquare(picked, TEMP_DIR, CROPPED_MIN_PERCENT, CROPPED_MAX_PERCENT)
}


async function loginAndGetToken(username: string): Promise<string> {
  try {
    const res = await axios.post(LOGIN_URL, { identifier: username, password: DEFAULT_PASSWORD })

    return res.data.data.token
  } catch (err: any) {
    log(`Login failed for ${username}: ${err.response?.data || err.message}`, 'error', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
    throw err
  }
}


async function uploadProfileImage(token: string, imagePath: string) {
  const form = new FormData()
  form.append('profileIcon', fs.createReadStream(imagePath))

  const headers = {
    ...form.getHeaders(),
    Authorization: `Bearer ${token}`
  }

  const res = await axios.post(UPLOAD_URL, form, { headers })
}


async function seedProfilePictures() {
  const startTime = Date.now()
  log(`[start] Starting profile pic seeding at: ${convertISO8601ToFormatted(new Date(startTime).toISOString())}`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })

  await sequelize.authenticate()

  const users = (await User.findAll()).filter(user => !IGNORE_USERS.includes(user.username))

  let successfulSeededPfp = 0
  let failedSeededPfp = 0

  for (const user of users) {
    const userStart = Date.now()
    const username = user.username || 'unknown'

    try {
      log(`  Processing user: ${username}`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
      let uploadSucceeded = false

      const token = await loginAndGetToken(username)
      const imgPath = await getRandomImagePath()

      try {
        await uploadProfileImage(token, imgPath)
        uploadSucceeded = true
      } catch {
        log(`Error occurred in: uploadProfileImage(token, imgPath) for ${username}`, 'error', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
        failedSeededPfp++
      }

      const userEnd = Date.now()

      if (uploadSucceeded) {
        log(`[success] Uploaded for ${username} (${userEnd - userStart} ms)`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
        successfulSeededPfp++
      }
    } catch {
      log(`Failed for user: ${username}`, 'error', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
      failedSeededPfp++
    }
  }

  const endTime = Date.now()
  const duration = endTime - startTime

  log(`\n[done] Profile picture seeding complete.`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
  log(`[note] Successful: ${successfulSeededPfp}, Failed: ${failedSeededPfp}`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })
  log(`[time] Finished at: ${convertISO8601ToFormatted(new Date(endTime).toISOString())} (Duration: ${duration} ms)`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })

  await closeLogger()
  process.exit(0)
}

seedProfilePictures().catch(err => {
  (async () => {
    log(`Profile pic seeding error: ${err}`, 'log', undefined, { showDate: true, showTime: true, showAmPm: true }, { showDate: true, showTime: true, showAmPm: true })

    await closeLogger()
    process.exit(1)
  })()
})
