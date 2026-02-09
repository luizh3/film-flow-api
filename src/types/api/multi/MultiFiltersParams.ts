import { Static, Type } from '@sinclair/typebox'

export const MultiFiltersParamsSchema = Type.Object({
  query: Type.String({ default: "" }),
  page: Type.Number({ default: 0 }), // TODO criar novo para determinado endpoint
  language: Type.String({ default: "en-US" }),
  mediaType: Type.String({ default: "" }),
  includeAdult: Type.Boolean({ default: false })
})

export type MultiFiltersParams = Static<typeof MultiFiltersParamsSchema>