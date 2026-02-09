import { Static, Type } from '@sinclair/typebox'

export const SectionFiltersSchema = Type.Object({
    page: Type.Number(),
    mediaType: Type.String(),
    key: Type.String(),
    language: Type.String({ default: "en-US" })
})

export type SectionFilters = Static<typeof SectionFiltersSchema>