import { Static, Type } from '@sinclair/typebox'

export const Pagination = Type.Object({
    page: Type.Number(),
    totalPage: Type.Number(),
    totalResults: Type.Number()
})

export type PaginationType = Static<typeof Pagination>
