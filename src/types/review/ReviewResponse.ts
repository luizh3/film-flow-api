import { Static, Type } from '@sinclair/typebox'

export const ReviewResponseSchema = Type.Object({
    title: Type.String(),
    description: Type.String(),
    score: Type.Number(),
    movieId: Type.String(),
    reviewId: Type.String(),
    programType: Type.String(),
    programTitle: Type.String(),
})

export type ReviewResponse = Static<typeof ReviewResponseSchema>
