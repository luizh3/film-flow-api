import { Static, Type } from '@sinclair/typebox'

export const ErrorResponse = Type.Object({
  path: Type.String(),
  message: Type.String(),
  timestamp: Type.String({ format: 'date-time' })
})

export type ErrorResponseType = Static<typeof ErrorResponse>