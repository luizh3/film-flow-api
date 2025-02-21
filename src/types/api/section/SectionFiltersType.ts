import { Static, Type } from '@sinclair/typebox'

export const SectionFilters = Type.Object({
    page: Type.Number(),
    type: Type.String(),
    key: Type.String(),
    language: Type.String( { default: "en-US" } )
})

export type SectionFiltersType = Static<typeof SectionFilters>