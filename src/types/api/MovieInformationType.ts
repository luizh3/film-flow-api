import { Static, Type } from '@sinclair/typebox'

export const MovieInformation = Type.Object({
    title: Type.String(),
    id: Type.String(),
    backdropUrl: Type.String( { default: "" }),
    posterUrl: Type.String( { default: "" }),
    overview: Type.String(),
    genres: Type.Array( Type.Number() ),
    average: Type.Union([Type.Null(), Type.Number()]),
    release: Type.String( { default: "" } )
})

export type MovieInformationType = Static<typeof MovieInformation>