import { Static, Type } from '@sinclair/typebox'
import { GenresResult } from '../genre/GenresResultType'
import { Section } from './SectionType'

export const Config = Type.Object({
  movie: GenresResult,
  tv: GenresResult,
  sections: Type.Array( Section )
})

export type ConfigType = Static<typeof Config>