import { Static, Type } from '@sinclair/typebox'
import { ReviewAuthorResponseSchema } from './ReviewAuthorResponse'

export const ReviewResponseSchema = Type.Object({
    title: Type.String(),
    description: Type.String(),
    score: Type.Number(),
    movieId: Type.String(),
    reviewId: Type.String(),
    programType: Type.String(),
    programTitle: Type.String(),
    createdDate: Type.Union([Type.Null(), Type.String()]),
    author: ReviewAuthorResponseSchema,
})

export type ReviewResponse = Static<typeof ReviewResponseSchema>
