import { Static, Type } from '@sinclair/typebox'

export const MultiFiltersParams = Type.Object({
  query: Type.String(),
  page: Type.Number(),
  language: Type.String( { default: "en-US" }),
  includeAdult: Type.Boolean( { default : false } )
})

export type MultiFiltersParamsType = Static<typeof MultiFiltersParams>