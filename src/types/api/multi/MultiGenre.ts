import { Static, Type } from '@sinclair/typebox'

import { GenresResultSchema } from "../genre/GenresResult";

export const MultiGenreSchema = Type.Object({
    movie: GenresResultSchema,
    tv: GenresResultSchema
})

export type MultiGenre = Static<typeof MultiGenreSchema>