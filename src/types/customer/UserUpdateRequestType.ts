import { Static, Type } from '@sinclair/typebox'

export const UserUpdateRequest = Type.Object({
  name: Type.String(),
  avatarUrl: Type.String( { default: null } ),
  userId: Type.String()
})

export type UserUpdateRequestType = Static<typeof UserUpdateRequest>