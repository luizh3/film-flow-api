import { Static, Type } from '@sinclair/typebox'

export const PaginationSchema = Type.Object({
    page: Type.Number(),
    totalPage: Type.Number(),
    totalResults: Type.Number()
})

export type Pagination = Static<typeof PaginationSchema>
