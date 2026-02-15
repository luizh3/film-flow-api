import { FastifyInstance } from 'fastify';

import { UserController } from '@/controllers/customer/UserController';
import { StatusCodes } from '@/enum/StatusCode';
import { UserRequestSchema, UserRequest } from '@/types/customer/UserRequest';
import { UserResponseSchema, UserResponse } from '@/types/customer/UserResponse';
import { UserUpdateRequestSchema, UserUpdateRequest } from '@/types/customer/UserUpdateRequest';
import { ErrorResponseSchema, ErrorResponse } from '@/types/error/ErrorResponse';
import { ParamsUserIdSchema, ParamsUserId } from '@/types/params/user/ParamsUserId';

export default async function userRoutes(
    fastify: FastifyInstance,
    options: { userController: UserController }
) {

    const { userController } = options;

    fastify.put<{ Body: UserUpdateRequest, Reply: UserResponse }>(
        '/',
        {
            preHandler: [fastify.authenticate],
            schema: {
                body: UserUpdateRequestSchema,
                response: {
                    [StatusCodes.OK]: UserResponseSchema,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                },
            },
        },
        userController.update.bind(userController)
    )

    fastify.get<{ Reply: UserResponse }>(
        '/:userId',
        {
            preHandler: [fastify.authenticate],
            schema: {
                params: ParamsUserIdSchema,
                response: {
                    [StatusCodes.OK]: UserResponseSchema,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema,
                    [StatusCodes.NOT_FOUND]: ErrorResponseSchema
                }
            }
        },
        userController.findOne.bind(userController)
    )

}
