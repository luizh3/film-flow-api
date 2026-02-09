import { Static, Type } from '@sinclair/typebox'

export const LoginRequestSchema = Type.Object({
    email: Type.String({ format: 'email' }),
    password: Type.String()
})

export type LoginRequest = Static<typeof LoginRequestSchema>
