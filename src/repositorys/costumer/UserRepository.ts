import { UserType } from "@/types/customer/UserType"
import { InternalErrorException } from "@/exceptions/InternalErrorException";

import prismaClient from "@/config/prisma"
import { logger } from "@/utils/Logger";

export class UserRepository {

    async insert( user: UserType ) : Promise<UserType> {
        return await prismaClient.user.create({ data: user }).catch( ( exption : Error ) => {
            logger.error( { message: exption.message } );
            throw new InternalErrorException( "Failed on register user!" )
        });
    }

    async update( user: Partial<UserType> ) : Promise<UserType> {
        return await prismaClient.user.update({
            where: {
                userId: user.userId
            },
            data: {
                avatarUrl: user.avatarUrl,
                name: user.name,
            }
        }).catch( ( exption : Error ) => {
            logger.error( { message: exption.message } );
            throw new InternalErrorException( "Failed on update user!" )
        });
    }

    async findOneByEmail( email : string ) : Promise<UserType | null > {
        return await prismaClient.user.findUnique({
            where: {
                email: email,
            },
         }).catch( ( exption : Error ) => {
            logger.error( { message: exption.message } );
            throw new InternalErrorException( "Failed on find user!" )
        });
    }

    async findOne( userId : string ) : Promise<UserType | null > {
        return await prismaClient.user.findUnique({
            where: {
                userId: userId,
            },
         }).catch( ( exption : Error ) => {
            logger.error( { message: exption.message } );
            throw new InternalErrorException( "Failed on find user!" )
        });
    }

}