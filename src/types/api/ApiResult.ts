import { Static, Type } from '@sinclair/typebox'
import { PaginationSchema } from './Pagination'

export const ApiResultSchema = Type.Intersect([
    PaginationSchema
])

export type ApiResult = Static<typeof ApiResultSchema>
