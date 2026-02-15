import { FastifyInstance } from 'fastify';

import { UserController } from '@/controllers/customer/UserController';
import { StatusCodes } from '@/enum/StatusCode';
import { ErrorResponseSchema, ErrorResponse } from '@/types/error/ErrorResponse';
import { LoginResponseSchema, LoginResponse } from '@/types/login/LoginResponse';
import { LoginRequestSchema, LoginRequest } from '@/types/login/LoginRequest';
import { UserRequestSchema, UserRequest } from '@/types/customer/UserRequest';
import { UserResponseSchema, UserResponse } from '@/types/customer/UserResponse';

export default async function authRoutes(
    fastify: FastifyInstance,
    options: { userController: UserController }
) {

    const { userController } = options;

    fastify.post<{ Body: LoginRequest, Reply: LoginResponse }>(
        '/sign-in',
        {
            schema: {
                body: LoginRequestSchema,
                response: {
                    [StatusCodes.OK]: LoginResponseSchema,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                },
            },
        },
        userController.login.bind(userController)
    );

    fastify.post<{ Body: UserRequest, Reply: UserResponse }>(
        '/sign-up',
        {
            schema: {
                body: UserRequestSchema,
                response: {
                    [StatusCodes.OK]: UserResponseSchema,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                },
            },
        },
        userController.insert.bind(userController)
    );

}
