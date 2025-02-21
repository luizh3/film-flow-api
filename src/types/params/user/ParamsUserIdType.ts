import { Static, Type } from '@sinclair/typebox'

export const ParamsUserId = Type.Object({
  userId: Type.String()
})

export type ParamsUserIdType = Static<typeof ParamsUserId>