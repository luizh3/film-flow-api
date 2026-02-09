import { Static, Type } from '@sinclair/typebox'
import { UserResponseSchema } from '../customer/UserResponse'

export const LoginResponseSchema = Type.Intersect([
    Type.Object({
        accessToken: Type.String(),
    }),
    UserResponseSchema
])

export type LoginResponse = Static<typeof LoginResponseSchema>
