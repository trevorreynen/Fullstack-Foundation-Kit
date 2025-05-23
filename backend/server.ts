// ./backend/server.ts
/// <reference path="./types/express.d.ts" />

// Imports
import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import cors from 'cors'

// Database Import
import { sequelize } from './config/database'

// Routes Import
import registerRoutes from './routes'

// Logger Import
import { initLogger, closeLogger } from './utils/logger'

initLogger('increment', 'backend', './Logs')

dotenv.config({ path: path.resolve(__dirname, '../../.env') })


const app = express()
const PORT = parseInt(process.env.BACKEND_PORT!, 10)

// Allow local + LAN access
const allowedOrigins = [
  `http://localhost:${process.env.FRONTEND_PORT}`,
  `http://${process.env.DEV_IP}:${process.env.FRONTEND_PORT}`
]

app.use(cors({
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  },
  credentials: true,
}))

// Middleware to parse JSON bodies
app.use(express.json())


// Define API routes
registerRoutes(app)


app.get('/', (req, res) => {
  res.send('API is running')
})


// Serve static frontend assets from backend
app.use('/v1/uploads', express.static(path.join(__dirname, 'public', 'uploads')))


// Start the server.
async function startServer() {
  try {
    await sequelize.authenticate()

    app.listen(PORT, '0.0.0.0', () => {
      console.log(`Server is running at http://localhost:${PORT}`)
    })
  } catch (err) {
    console.error('[error] Failed to connect to database:', err)
  }
}

startServer()

// Handle manual shutdown (Ctrl+C, kill, etc.)
process.on('SIGINT', () => {
  console.log('🛑 SIGINT received, shutting down gracefully...')
  closeLogger()
  process.exit()
})

process.on('SIGTERM', () => {
  console.log('🛑 SIGTERM received, shutting down gracefully...')
  closeLogger()
  process.exit()
})
