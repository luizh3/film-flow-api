import { Static, Type } from '@sinclair/typebox'

export const ParamsUserIdSchema = Type.Object({
  userId: Type.String()
})

export type ParamsUserId = Static<typeof ParamsUserIdSchema>