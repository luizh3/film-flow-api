import { FastifyRequest, FastifyReply } from "fastify";
import { User } from "@prisma/client";

import { UserService } from "@/services/customer/UserService"
import { UserType } from "@/types/customer/UserType";
import { UserMapper } from "@/mappers/customer/UserMapper";
import { UserRequest } from "@/types/customer/UserRequest";
import { StatusCodes } from "@/enum/StatusCode";
import { UserUpdateRequest } from "@/types/customer/UserUpdateRequest";
import { ParamsUserId } from "@/types/params/user/ParamsUserId";
import { logger } from "@/utils/Logger";
import { LoginRequest } from "@/types/login/LoginRequest";
import { LoginResponse } from "@/types/login/LoginResponse";

export class UserController {

    async login(request: FastifyRequest, reply: FastifyReply) {

        const loginRequest = request.body as LoginRequest;

        const userService = new UserService();

        const user = await userService.login(loginRequest);

        const accessToken = request.jwt.sign({
            id: user.userId,
        });

        const userResponse = UserMapper.toResponse(user);

        const response: LoginResponse = {
            accessToken,
            ...userResponse
        }

        reply.status(StatusCodes.OK).send(response);

    }

    async insert(request: FastifyRequest, reply: FastifyReply) {

        logger.debug("UserController[insert] Inserting user")

        const userRequest = UserMapper.toModel(request.body as UserRequest);

        const userService = new UserService();
        const userResponse: User = await userService.insert(userRequest);

        logger.debug("UserController[insert] User insert sucesfull")

        reply.status(StatusCodes.OK).send(UserMapper.toResponse(userResponse));
    }

    async update(request: FastifyRequest, reply: FastifyReply) {

        logger.debug("UserController[update] Updating user")

        const userUpdateRequest = request.body as UserUpdateRequest;

        const user: Partial<UserType> = {
            avatarUrl: userUpdateRequest.avatarUrl,
            name: userUpdateRequest.name,
            userId: userUpdateRequest.userId
        };

        const userService = new UserService();
        const userResponse: User = await userService.update(user);

        logger.debug("UserController[update] User update sucesfull")

        reply.status(StatusCodes.OK).send(UserMapper.toResponse(userResponse));
    }

    async delete(request: FastifyRequest, reply: FastifyReply) {

    }

    async findOne(request: FastifyRequest, reply: FastifyReply) {

        const userId = (request.params as ParamsUserId).userId;

        const userService = new UserService();
        const userResponse: User = await userService.findOne(userId);

        reply.status(StatusCodes.OK).send(UserMapper.toResponse(userResponse));

    }

    async findAll(request: FastifyRequest, reply: FastifyReply) { }
}