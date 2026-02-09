import { Static, Type } from '@sinclair/typebox'

export const UserRequestSchema = Type.Object({
  name: Type.String(),
  email: Type.String({ format: 'email' }),
  password: Type.String(),
  avatarUrl: Type.String({ default: null })
})

export type UserRequest = Static<typeof UserRequestSchema>