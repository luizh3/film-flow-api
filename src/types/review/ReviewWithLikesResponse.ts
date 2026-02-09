import { Static, Type } from '@sinclair/typebox'

export const ReviewWithLikesResponseSchema = Type.Object({
    title: Type.String(),
    description: Type.String(),
    score: Type.Number(),
    movieId: Type.String(),
    reviewId: Type.String(),
    programType: Type.String(),
    programTitle: Type.String(),
    likesCount: Type.Number(),
    likedByMe: Type.Boolean({ default: false })
})

export type ReviewWithLikesResponse = Static<typeof ReviewWithLikesResponseSchema>
