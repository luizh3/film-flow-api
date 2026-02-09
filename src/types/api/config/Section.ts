import { Static, Type } from '@sinclair/typebox'

export const SectionSchema = Type.Object({
  key: Type.String(),
  name: Type.String(),
  type: Type.String()
})

export type Section = Static<typeof SectionSchema>