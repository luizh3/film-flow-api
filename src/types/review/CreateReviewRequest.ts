import { Static, Type } from '@sinclair/typebox'

export const CreateReviewRequestSchema = Type.Object({
    title: Type.String(),
    description: Type.String(),
    score: Type.Number(),
    movieId: Type.String(),
    programType: Type.String(),
    programTitle: Type.String(),
})

export type CreateReviewRequest = Static<typeof CreateReviewRequestSchema>
