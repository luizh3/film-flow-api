import { Static, Type } from '@sinclair/typebox'

export const LoginRequest = Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String()
})

export type LoginRequestType = Static<typeof LoginRequest>
