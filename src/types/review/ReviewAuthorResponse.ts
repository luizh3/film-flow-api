import { Static, Type } from '@sinclair/typebox'

export const ReviewAuthorResponseSchema = Type.Object({
    id: Type.String(),
    name: Type.String(),
    avatarUrl: Type.Union([Type.String(), Type.Null()])
})

export type ReviewAuthorResponse = Static<typeof ReviewAuthorResponseSchema>
