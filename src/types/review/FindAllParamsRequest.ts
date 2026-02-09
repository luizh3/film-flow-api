import { Static, Type } from '@sinclair/typebox'

export const FindAllParamsRequestSchema = Type.Object({
    page: Type.Number({ default: 0 }),
})

export type FindAllParamsRequest = Static<typeof FindAllParamsRequestSchema>
