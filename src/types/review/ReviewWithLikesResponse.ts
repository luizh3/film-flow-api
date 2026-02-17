import { Static, Type } from '@sinclair/typebox'
import { ReviewAuthorResponseSchema } from './ReviewAuthorResponse'

export const ReviewWithLikesResponseSchema = Type.Object({
    title: Type.String(),
    description: Type.String(),
    score: Type.Number(),
    movieId: Type.String(),
    reviewId: Type.String(),
    programType: Type.String(),
    programTitle: Type.String(),
    likesCount: Type.Number(),
    likedByMe: Type.Boolean({ default: false }),
    author: ReviewAuthorResponseSchema,
})

export type ReviewWithLikesResponse = Static<typeof ReviewWithLikesResponseSchema>
