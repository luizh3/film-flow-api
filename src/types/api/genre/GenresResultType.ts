import { Static, Type } from '@sinclair/typebox'
import { Genre } from './GenreType'

export const GenresResult = Type.Object({
  genres: Type.Array( Genre )
})

export type GenresResultType = Static<typeof GenresResult>