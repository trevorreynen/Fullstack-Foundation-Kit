// ./backend/utils/response.ts
// import { resSuccess, resError } from '../utils/response'

// Imports
import { Response } from 'express'
import { ERROR_MESSAGES } from './errorCodes'

type ErrorCode = keyof typeof ERROR_MESSAGES


/**
 * Sends a standardized success response.
 *
 * @param res - The Express response object.
 * @param data - The payload to return.
 * @param statusCode - The HTTP status code (default 200).
 * @param message - Optional success message.
 */
export const resSuccess = (res: Response, data: Record<string, any> = {}, statusCode = 200, message?: string) => {
  const responsePayload = {
    success: true,
    data: typeof data === 'object' && !Array.isArray(data) ? data : { value: data },
    ...(message && { message }),
  }

  return res.status(statusCode).json(responsePayload)
}


/**
 * Sends a standardized error response using a predefined error code.
 *
 * @param statusCode - The HTTP status code to return (default 400).
 * @param res - The Express response object.
 * @param code - A key from the ERROR_MESSAGES map.
 */
export const resError = (statusCode = 400, res: Response, code: ErrorCode) => {
  return res.status(statusCode).json({
    success: false,
    error: {
      code,
      message: ERROR_MESSAGES[code]
    }
  })
}
