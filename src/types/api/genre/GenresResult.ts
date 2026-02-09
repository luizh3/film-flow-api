import { Static, Type } from '@sinclair/typebox'
import { GenreSchema } from './Genre'

export const GenresResultSchema = Type.Object({
  genres: Type.Array( GenreSchema )
})

export type GenresResult = Static<typeof GenresResultSchema>