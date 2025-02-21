import { FastifyRequest, FastifyReply } from "fastify";

import { UserService } from "@/services/customer/UserService" 
import { UserType } from "@/types/customer/UserType";
import { CustomerMapper } from "@/mappers/customer/UserMapper";
import { UserRequestType } from "@/types/customer/UserRequestType";
import { StatusCodes } from "@/enum/StatusCode";
import { UserUpdateRequestType } from "@/types/customer/UserUpdateRequestType";
import { ParamsUserIdType } from "@/types/params/user/ParamsUserIdType";
import { logger } from "@/utils/Logger";
import { LoginRequestType } from "@/types/login/LoginRequestType";
import { LoginResponseType } from "@/types/login/LoginResponseType";

export class UserController {

    async login( request : FastifyRequest, reply : FastifyReply ) {

        const loginRequest = request.body as LoginRequestType;

        const userService = new UserService();

        const user = await userService.login( loginRequest );

        const accessToken = request.jwt.sign( {
            id: user.userId,
        } );

        const response : LoginResponseType = {
            accessToken,
            ...user
        }

        return response;

    }

    async insert( request : FastifyRequest, reply : FastifyReply ) {

        logger.debug("UserController[insert] Inserting user")

        const userRequest = CustomerMapper.toModel( request.body as UserRequestType ) ;

        const userService = new UserService();
        const userResponse : UserType = await userService.insert( userRequest );

        logger.debug("UserController[insert] User insert sucesfull")

        reply.status( StatusCodes.OK ).send( CustomerMapper.toResponse( userResponse ) );
    }

    async update ( request : FastifyRequest, reply : FastifyReply ) {

        logger.debug("UserController[update] Updating user")

        const userUpdateRequest = request.body as UserUpdateRequestType;

        const user : Partial<UserType> = {
            avatarUrl: userUpdateRequest.avatarUrl,
            name: userUpdateRequest.name,
            userId: userUpdateRequest.userId
        };

        const userService = new UserService();
        const userResponse : UserType = await userService.update( user );

        logger.debug("UserController[update] User update sucesfull")

        reply.status( StatusCodes.OK ).send( CustomerMapper.toResponse( userResponse ) );
    }

    async delete ( request : FastifyRequest, reply : FastifyReply ) {

    }

    async findOne ( request : FastifyRequest, reply : FastifyReply  ) {

        const userId = ( request.params as ParamsUserIdType ).userId;

        const userService = new UserService();
        const userResponse : UserType = await userService.findOne( userId );

        reply.status( StatusCodes.OK ).send( CustomerMapper.toResponse( userResponse ) );

    }

    async findAll ( request : FastifyRequest, reply : FastifyReply  ) {}
}