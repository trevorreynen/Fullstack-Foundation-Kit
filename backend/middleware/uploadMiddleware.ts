// ./backend/middleware/uploadMiddleware.ts

// Imports
import multer from 'multer'
import path from 'path'


const MAX_FILE_SIZE = 2 * 1024 * 1024 // 2 MB


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '..', 'public', 'uploads'))
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname)
    const userId = req.user?.id
    cb(null, `profile-${userId}${ext}`)
  },
})


const fileFilter = (req: any, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true)
  } else {
    cb(new Error('Only image files are allowed'))
  }
}


export const upload = multer({
  storage,
  limits: { fileSize: MAX_FILE_SIZE },
  fileFilter,
})

