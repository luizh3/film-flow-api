import { Static, Type } from '@sinclair/typebox'

export const MessageResponse = Type.Object({
  message: Type.String(),
})

export type MessageResponseType = Static<typeof MessageResponse>