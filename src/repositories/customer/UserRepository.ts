import { User } from "@prisma/client";
import { UserType } from "@/types/customer/UserType"
import { InternalErrorException } from "@/exceptions/InternalErrorException";

import prismaClient from "@/config/prisma"
import { logger } from "@/utils/Logger";

export class UserRepository {

    async insert(user: UserType): Promise<User> {
        return await prismaClient.user.create({ data: user }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on register user!")
        });
    }

    async update(user: Partial<UserType>): Promise<User> {
        return await prismaClient.user.update({
            where: {
                userId: user.userId
            },
            data: {
                avatarUrl: user.avatarUrl,
                name: user.name,
            }
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on update user!")
        });
    }

    async findOneByEmail(email: string): Promise<User | null> {
        return await prismaClient.user.findUnique({
            where: {
                email: email,
            },
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on find user!")
        });
    }

    async findOne(userId: string): Promise<User | null> {
        return await prismaClient.user.findUnique({
            where: {
                userId: userId,
            },
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on find user!")
        });
    }

    async findManyByIds(userIds: string[]): Promise<User[]> {
        return prismaClient.user.findMany({
            where: {
                userId: {
                    in: userIds
                }
            }
        });
    }

}
