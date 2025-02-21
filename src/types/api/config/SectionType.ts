import { Static, Type } from '@sinclair/typebox'

export const Section = Type.Object({
  key: Type.String(),
  name: Type.String(),
  type: Type.String()
})

export type SectionType = Static<typeof Section>