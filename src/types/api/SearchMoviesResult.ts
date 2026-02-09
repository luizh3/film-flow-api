import { Static, Type } from '@sinclair/typebox'
import { MovieInformationSchema } from './MovieInformation';
import { ApiResultSchema } from './ApiResult';

export const SearchMoviesResultSchema = Type.Intersect([
    ApiResultSchema,
    Type.Object({
        movies: Type.Array(MovieInformationSchema)
    })
])

export type SearchMoviesResult = Static<typeof SearchMoviesResultSchema>
