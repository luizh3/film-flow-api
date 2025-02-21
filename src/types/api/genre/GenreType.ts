import { Static, Type } from '@sinclair/typebox'

export const Genre = Type.Object({
  id: Type.Number(),
  name: Type.String()
})

export type GenreType = Static<typeof Genre>