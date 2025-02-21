import { Static, Type } from '@sinclair/typebox'
import { UserResponse } from '../customer/UserResponseType'

export const LoginResponse = Type.Intersect([
    Type.Object({
        accessToken: Type.String(),
    }),
    UserResponse
])

export type LoginResponseType = Static<typeof LoginResponse>
