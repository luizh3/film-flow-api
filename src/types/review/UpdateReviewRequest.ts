import { Static, Type } from '@sinclair/typebox'

export const UpdateReviewRequestSchema = Type.Object({
    title: Type.String(),
    description: Type.String(),
    score: Type.Number(),
    movieId: Type.String()
})

export type UpdateReviewRequest = Static<typeof UpdateReviewRequestSchema>
