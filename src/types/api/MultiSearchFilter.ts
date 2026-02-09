import { Static, Type } from '@sinclair/typebox'

export const MultiSearchFilterSchema = Type.Object({
    language: Type.String( { default: "en-US" } ),
    page: Type.Number(),
    genres: Type.String(),
})

export type MultiSearchFilter = Static<typeof MultiSearchFilterSchema>