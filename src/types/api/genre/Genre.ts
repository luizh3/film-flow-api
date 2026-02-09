import { Static, Type } from '@sinclair/typebox'

export const GenreSchema = Type.Object({
  id: Type.Number(),
  name: Type.String()
})

export type Genre = Static<typeof GenreSchema>