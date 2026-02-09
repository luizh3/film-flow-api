import { Static, Type } from '@sinclair/typebox'

export const MessageResponseSchema = Type.Object({
  message: Type.String(),
})

export type MessageResponse = Static<typeof MessageResponseSchema>