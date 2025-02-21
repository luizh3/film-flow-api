import { Static, Type } from '@sinclair/typebox'

import { GenresResult } from "../genre/GenresResultType";

export const MultiGenre = Type.Object({
    movie: GenresResult,
    tv: GenresResult
})

export type MultiGenreType = Static<typeof MultiGenre>