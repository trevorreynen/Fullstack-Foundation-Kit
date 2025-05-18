// ./logger.ts
// import { initLogger, log, closeLogger } from '../utils/logger'

// Imports
import fs from 'fs'
import path from 'path'
import chalk from 'chalk'


// Type Declarations
type Mode = 'overwrite' | 'timestamp' | 'increment'

type TimestampOptions = {
  showDate?: boolean
  showTime?: boolean
  showAmPm?: boolean
}

type TimestampSetting = boolean | TimestampOptions | undefined


let logStream: fs.WriteStream | null = null

function getLogPath(folderPath: string, fileName: string, mode: Mode): string {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true })
  }

  if (mode === 'overwrite') {
    return path.join(folderPath, `${fileName}.txt`)
  }

  if (mode === 'timestamp') {
    const timestamp = new Date().toISOString().replace(/:/g, '-')

    return path.join(folderPath, `${fileName}_${timestamp}.txt`)
  }

  if (mode === 'increment') {
    let index = 1

    while (true) {
      const logPath = path.join(folderPath, `${fileName}_${index}.txt`)

      if (!fs.existsSync(logPath)) {
        return logPath
      }

      index++
    }
  }

  throw new Error('Invalid mode. Use \'overwrite\', \'timestamp\', or \'increment\'')
}


/**
 * Generates a formatted timestamp based on option flags or ISO fallback.
 */
function getTimestamp(opts?: TimestampSetting): string {
  const now = new Date()

  // If explicitly false or undefined: no timestamp.
  if (opts === false || opts === undefined) {
    return ''
  }

  // If true or all fields false or missing: use ISO.
  if (opts === true || typeof opts !== 'object') {
    return new Date().toISOString()
  }

  const keys = ['showDate', 'showTime', 'showAmPm'] as const
  const userSetAny = keys.some((k) => Object.hasOwn(opts, k))
  if (!userSetAny || keys.every((k) => opts[k] === false)) {
    return new Date().toISOString()
  }

  // Fill in defaults for missing keys if at least one field is touched.
  const showDate = opts.showDate !== false
  const showTime = opts.showTime !== false
  const showAmPm = opts.showAmPm !== false

  const month = String(now.getMonth() + 1).padStart(2, '0')
  const day = String(now.getDate()).padStart(2, '0')
  const year = now.getFullYear()

  const hours24 = now.getHours()
  const minutes = String(now.getMinutes()).padStart(2, '0')
  const seconds = String(now.getSeconds()).padStart(2, '0')

  const formattedHours = showAmPm ? String(((hours24 + 11) % 12) + 1).padStart(2, '0') : String(hours24).padStart(2, '0')
  const amPm = showAmPm ? (hours24 >= 12 ? 'PM' : 'AM') : ''

  const parts: string[] = []

  if (showDate) {
    parts.push(`${month}/${day}/${year}`)
  }

  if (showTime) {
    parts.push(`${formattedHours}:${minutes}:${seconds}${showAmPm ? ` ${amPm}` : ''}`)
  }

  return parts.join(' ')
}


/**
 * Initializes the logger by creating a log file based on naming mode and path.
 *
 * @param mode - File naming mode ('overwrite' | 'timestamp' | 'increment')
 * @param fileName - Base name for log file (default: 'log')
 * @param folderPath - Folder to store log files in (default: './Logs')
 */
export function initLogger(mode: Mode = 'timestamp', fileName: string = 'log', folderPath: string = './Logs'): void {
  const logPath = getLogPath(folderPath, fileName, mode)

  logStream = fs.createWriteStream(logPath, { flags: 'a' })
  logStream.write(`Log started at ${new Date().toISOString()}\n`)
}


/**
 * Logs a message to the file and/or console, optionally with a timestamp and styled output.
 *
 * @param message - The message to log.
 * @param type - The log level. Affects tag and console color.
 *               Options: 'log' | 'error' | 'warn' | 'info'. Default is 'log'.
 * @param mode - Output destination:
 *               - `undefined`: log to both file and console (default)
 *               - `true`: log to file only
 *               - `false`: log to console only
 *
 * @param addConsoleLogDT - Timestamp settings for console logs:
 *               - `false` or `undefined`: no timestamp
 *               - `true`: use full ISO timestamp
 *               - `{ showDate?: boolean, showTime?: boolean, showAmPm?: boolean }`:
 *                   - showDate (default: true): show date (MM/DD/YYYY)
 *                   - showTime (default: true): show time (HH:MM:SS)
 *                   - showAmPm (default: true): use 12-hour format with AM/PM
 *                 If at least one field is provided, the others default to true unless explicitly false.
 *
 * @param addLogFileDT - Same as `addConsoleLogDT`, but applies to log file output.
 */
export function log(message: string, type: 'log' | 'error' | 'warn' | 'info' = 'log', mode: boolean | undefined = undefined, addConsoleLogDT: TimestampSetting = false, addLogFileDT: TimestampSetting = false): void {
  const tag = `[${type}]`
  const fileTimestamp = getTimestamp(addLogFileDT)
  const filePrefix = fileTimestamp ? `${fileTimestamp} ${tag}` : tag
  const fileLine = `${filePrefix} ${message}`

  if (mode !== false && logStream) {
    logStream.write(fileLine + '\n')
  }

  if (mode !== true) {
    const tsRaw = getTimestamp(addConsoleLogDT)
    const tsColored = (() => {
      if (!tsRaw) {
        return ''
      }

      if (type === 'error') {
        return chalk.redBright(tsRaw)
      }

      if (type === 'warn') {
        return chalk.yellowBright(tsRaw)
      }

      if (type === 'info') {
        return chalk.cyan(tsRaw)
      }

      return chalk.blue(tsRaw)
    })()

    const msgColored = (() => {
      if (type === 'error') {
        return chalk.red(message)
      }

      if (type === 'warn') {
        return chalk.yellow(message)
      }

      if (type === 'info') {
        return chalk.cyan(message)
      }

      return message
    })()

    const consolePrefix = tsColored ? `${tsColored} ${tag}` : tag
    console.log(`${consolePrefix} ${msgColored}`)
  }
}


/**
 * Closes the logger by ending the file stream.
 */
export function closeLogger(): Promise<void> {
  return new Promise((resolve) => {
    if (logStream) {
      logStream.end(() => {
        logStream = null
        resolve()
      })
    } else {
      resolve()
    }
  })
}


