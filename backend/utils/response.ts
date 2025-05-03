// ./backend/utils/response.ts
// import { resSuccess, resError } from '../utils/response'

// Imports
import { Response } from 'express'
import { ERROR_MESSAGES } from './errorCodes'

type ErrorCode = keyof typeof ERROR_MESSAGES

export const resSuccess = (res: Response, data: Record<string, any> = {}, statusCode = 200, message?: string) => {
  const responsePayload = {
    success: true,
    data: typeof data === 'object' && !Array.isArray(data) ? data : { value: data },
    ...(message && { message }),
  }

  return res.status(statusCode).json(responsePayload)
}

export const resError = (statusCode = 400, res: Response, code: ErrorCode) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message: ERROR_MESSAGES[code]
    }
  })
}
