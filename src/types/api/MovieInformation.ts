import { Static, Type } from '@sinclair/typebox'
import { GenreSchema } from './genre/Genre'
import { ReviewResponseSchema } from '../review/ReviewResponse'

export const MovieInformationSchema = Type.Object({
    title: Type.String(),
    id: Type.String(),
    backdropUrl: Type.String({ default: "" }),
    posterUrl: Type.String({ default: "" }),
    overview: Type.String({ default: "" }),
    genres: Type.Array(GenreSchema, { default: [] }),
    average: Type.Union([Type.Null(), Type.Number()]),
    release: Type.String({ default: "" }),
    mediaType: Type.String({ default: "" }),
    myReview: Type.Optional(ReviewResponseSchema)
})

export type MovieInformation = Static<typeof MovieInformationSchema>