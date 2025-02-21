import { FastifyInstance } from 'fastify';

import { UserController } from '@/controllers/customer/UserController';
import { StatusCodes } from '@/enum/StatusCode';
import { UserRequest, UserRequestType } from '@/types/customer/UserRequestType';
import { UserResponse, UserResponseType } from '@/types/customer/UserResponseType';
import { UserUpdateRequest, UserUpdateRequestType } from '@/types/customer/UserUpdateRequestType';
import { ErrorResponse } from '@/types/error/ErrorResponseType';
import { ParamsUserId } from '@/types/params/user/ParamsUserIdType';
import { LoginResponse, LoginResponseType } from '@/types/login/LoginResponseType';
import { LoginRequest, LoginRequestType } from '@/types/login/LoginRequestType';

export default async function userRoutes( fastify: FastifyInstance ) {

    fastify.post<{ Body: UserRequestType, Reply: UserResponseType }>(
    '/',
    {
        schema: {
            body: UserRequest,
            response: {
                [StatusCodes.OK]: UserResponse,
                [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponse
            },
        },
    },
    new UserController().insert
    );

    fastify.put<{ Body: UserUpdateRequestType, Reply: UserResponseType }>(
        '/',
        {
            preHandler: [fastify.authenticate],
            schema: {
                body: UserUpdateRequest,
                response: {
                    [StatusCodes.OK]: UserResponse,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponse
                },
            },
        },
        new UserController().update
    )

    fastify.get<{ Reply: UserResponseType }>(
        '/:userId',
        {
            preHandler: [fastify.authenticate],
            schema: {
                params: ParamsUserId,
                response : {
                    [StatusCodes.OK]: UserResponse,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponse,
                    [StatusCodes.NOT_FOUND]: ErrorResponse
                }
            }
        },
        new UserController().findOne
    )

    fastify.post<{ Body: LoginRequestType, Reply: LoginResponseType }>(
        '/login',
        {
            schema: {
                body: LoginRequest,
                response: {
                    [StatusCodes.OK]: LoginResponse,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponse
                },
            },
        },
        new UserController().login
    );

}
