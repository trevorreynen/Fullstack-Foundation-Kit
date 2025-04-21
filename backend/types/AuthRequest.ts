// import { AuthRequest } from '../types/AuthRequest'

// Imports
import { Request } from 'express'
import { JWTPayloadUser } from './JWTPayloadUser'


export type AuthRequest = Request & {
  authUser?: JWTPayloadUser
}

