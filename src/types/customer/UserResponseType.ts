import { Static, Type } from '@sinclair/typebox'

export const UserResponse = Type.Object({
  id: Type.Optional( Type.String()),
  email: Type.String({ format: 'email' }),
  name: Type.String(),
  avatarUrl: Type.Union([Type.String(), Type.Null()])
})

export type UserResponseType = Static<typeof UserResponse>