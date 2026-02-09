import { Static, Type } from '@sinclair/typebox'

export const UserUpdateRequestSchema = Type.Object({
  name: Type.String(),
  avatarUrl: Type.String( { default: null } ),
  userId: Type.String()
})

export type UserUpdateRequest = Static<typeof UserUpdateRequestSchema>