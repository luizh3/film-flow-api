import { Static, Type } from '@sinclair/typebox'
import { GenresResultSchema } from '../genre/GenresResult'
import { SectionSchema } from './Section'

export const ConfigSchema = Type.Object({
  movie: GenresResultSchema,
  tv: GenresResultSchema,
  sections: Type.Array( SectionSchema )
})

export type Config = Static<typeof ConfigSchema>