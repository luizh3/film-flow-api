import { Type, Static } from '@sinclair/typebox'
import { NotificationResponseSchema } from './NotificationResponse'
import { ApiResultSchema } from '../api/ApiResult'

export const NotificationResultsResponseSchema = Type.Intersect([
    ApiResultSchema,
    Type.Object({
        notifications: Type.Array(
            NotificationResponseSchema
        )
    })
])

export type NotificationResultsResponse = Static<typeof NotificationResultsResponseSchema>
