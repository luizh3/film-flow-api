import { Static, Type } from '@sinclair/typebox'
import { MovieInformation } from './MovieInformationType';
import { ApiResult } from './ApiResultType';

export const SearchMoviesResult = Type.Intersect([
    ApiResult,
    Type.Object({
        movies: Type.Array( MovieInformation )
    })
])

export type SearchMoviesResultType = Static<typeof SearchMoviesResult>
