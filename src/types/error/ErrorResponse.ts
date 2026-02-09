import { Static, Type } from '@sinclair/typebox'

export const ErrorResponseSchema = Type.Object({
  path: Type.String(),
  message: Type.String(),
  timestamp: Type.String({ format: 'date-time' })
})

export type ErrorResponse = Static<typeof ErrorResponseSchema>