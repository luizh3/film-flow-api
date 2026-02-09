import { FastifyInstance } from 'fastify';

import { StatusCodes } from '@/enum/StatusCode';
import { ErrorResponseSchema, ErrorResponse } from '@/types/error/ErrorResponse';
import { NotificationController } from '@/controllers/notification/NotificationController';
import { NotificationResultsResponse, NotificationResultsResponseSchema } from '@/types/notifications/NotificationResultsResponse';
import { FindAllNotificationRequest, FindAllNotificationRequestSchema } from '@/types/notifications/FindAllNotificationRequest';

export default async function notificationRoutes(fastify: FastifyInstance) {

    fastify.get<{ Querystring: FindAllNotificationRequest, Reply: NotificationResultsResponse }>(
        '/',
        {
            preHandler: [fastify.authenticate],
            schema: {
                querystring: FindAllNotificationRequestSchema,
                response: {
                    [StatusCodes.OK]: NotificationResultsResponseSchema,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                },
            },
        },
        new NotificationController().findAll
    );

}
