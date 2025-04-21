// ./backend/utils/jwt.ts

// Imports
import jwt, { SignOptions } from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'path'
import ms from 'ms'

dotenv.config({ path: path.resolve(__dirname, '../../.env') })

const JWT_SECRET = process.env.JWT_SECRET! as string
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN ? ms(process.env.JWT_EXPIRES_IN as ms.StringValue) : ms('3d')


/**
 * Generates a JWT from a payload.
 *
 * @param payload - The data to encode in the token (for example, { id: number }).
 * @returns A signed JWT string.
 */
export const generateToken = (id: number, username: string): string => {
  const options: SignOptions = { expiresIn: JWT_EXPIRES_IN }
  return jwt.sign({ id, username }, JWT_SECRET, options)
}


/**
 * Verifies a JWT and decodes its payload.
 *
 * @param token - The JWT string to verify.
 * @returns The decoded payload (for example, { id: number, iat: number, exp: number }).
 */
export const verifyToken = (token: string) => {
  return jwt.verify(token, JWT_SECRET)
}

