import { Static, Type } from '@sinclair/typebox'

export const UserResponseSchema = Type.Object({
  id: Type.Optional( Type.String()),
  email: Type.String({ format: 'email' }),
  name: Type.String(),
  avatarUrl: Type.Union([Type.String(), Type.Null()])
})

export type UserResponse = Static<typeof UserResponseSchema>