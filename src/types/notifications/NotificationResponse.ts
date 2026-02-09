import { Type, Static } from '@sinclair/typebox'

export const NotificationResponseSchema = Type.Object({
    type: Type.String(),
    data: Type.Object({
        review: Type.Object({
            id: Type.String({ format: 'uuid' }),
        }),

        actor: Type.Object({
            id: Type.String({ format: 'uuid' }),
            name: Type.String(),
            avatarUrl: Type.String({ format: 'uri' }),
        }),

        program: Type.Object({
            id: Type.String(),
            type: Type.String(),
            title: Type.String(),
        }),
    }),
})

export type NotificationResponse = Static<typeof NotificationResponseSchema>
