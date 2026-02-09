import { Static, Type } from '@sinclair/typebox'
import { ApiResultSchema } from '../api/ApiResult'
import { ReviewWithLikesResponseSchema } from './ReviewWithLikesResponse'

export const FindAllReviewResponseSchema = Type.Intersect([
    ApiResultSchema,
    Type.Object({
        reviews: Type.Array(ReviewWithLikesResponseSchema)
    })
])


export type FindAllReviewResponse = Static<typeof FindAllReviewResponseSchema>
