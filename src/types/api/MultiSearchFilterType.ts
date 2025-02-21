import { Static, Type } from '@sinclair/typebox'

export const MultiSearchFilter = Type.Object({
    language: Type.String( { default: "en-US" } ),
    page: Type.Number(),
    genres: Type.String(),
})

export type MultiSearchFilterType = Static<typeof MultiSearchFilter>