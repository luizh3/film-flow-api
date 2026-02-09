import { Static, Type } from '@sinclair/typebox'

export const FindAllNotificationRequestSchema = Type.Object({
    page: Type.Number({ default: 0 }),
})

export type FindAllNotificationRequest = Static<typeof FindAllNotificationRequestSchema>
