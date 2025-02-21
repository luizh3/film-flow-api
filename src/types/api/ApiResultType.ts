import { Static, Type } from '@sinclair/typebox'
import { Pagination } from './PaginationType'

export const ApiResult = Type.Intersect([
    Pagination
])

export type ApiResultType = Static<typeof ApiResult>
