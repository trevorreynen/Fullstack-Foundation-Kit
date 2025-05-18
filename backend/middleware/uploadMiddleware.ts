// ./backend/middleware/uploadMiddleware.ts

// Imports
import multer from 'multer'
import path from 'path'
import fs from 'fs/promises'
import sharp from 'sharp'
import { Response, NextFunction } from 'express'
import { AuthRequest } from '../types/AuthRequest'
import { resError } from '../utils/response'

// Directory where processed icons are saved
const PROFILE_ICON_DIR = path.join(__dirname, '../public/uploads/profile-icons')

// Ensure output folder exists
fs.mkdir(PROFILE_ICON_DIR, { recursive: true }).catch((err) => {
  console.error('[uploadMiddleware] Failed to ensure icon folder exists:', err)
})


// Multer setup (stores uploaded image in memory)
const storage = multer.memoryStorage()
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB max for profile icons
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(new Error('[uploadMiddleware] Only image files are allowed'))
    }
    cb(null, true)
  },
}).single('profileIcon')


// Middleware to process uploaded profile icon
export const processProfileIcon = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const user = req.authUser
  const file = req.file

  if (!user || !file) {
    return next()
  }

  const profileIconKey = `user-${user.id}-icon`
  const sizes = [64, 128, 256]
  const cleanups = []

  try {
    // Delete any existing files for this user
    for (const file of await fs.readdir(PROFILE_ICON_DIR)) {
      if (file.startsWith(profileIconKey)) {
        cleanups.push(fs.unlink(path.join(PROFILE_ICON_DIR, file)))
      }
    }

    await Promise.all(cleanups)

    // Process resized versions
    const baseImage = sharp(file.buffer).webp()

    await Promise.all([
      ...sizes.map((size) =>
        baseImage
          .clone()
          .resize(size, size)
          .toFile(path.join(PROFILE_ICON_DIR, `${profileIconKey}-${size}x${size}.webp`))
      ),
      baseImage
        .clone()
        .toFile(path.join(PROFILE_ICON_DIR, `${profileIconKey}-original.webp`))
    ])

    // Expose iconKey to next handler
    req.profileIconKey = profileIconKey
    next()
  } catch (err) {
    console.error('[uploadMiddleware] Image processing failed:', err)

    resError(500, res, 'ERROR_UPLOADING_IMAGE')
    return
  }
}
