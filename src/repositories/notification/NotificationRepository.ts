import prismaClient from "@/config/prisma";
import { InternalErrorException } from "@/exceptions/InternalErrorException";
import { logger } from "@/utils/Logger";
import { Notification, Prisma } from "@prisma/client";
import { INotificationRepository } from "@/ports/repositories/INotificationRepository";

export class NotificationRepository implements INotificationRepository {

    async insert(data: Prisma.NotificationUncheckedCreateInput) {
        return await prismaClient.notification.create({ data }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on insert notification!");
        })
    }

    async findAllByIdRecipient(recipientId: string, offset: number, limit: number) {
        return await prismaClient.notification.findMany({
            skip: offset,
            take: limit,
            where: {
                recipientId: recipientId
            }
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on find notifications!");
        })
    }

    async findCountByIdRecipient(recipientId: string) {
        return await prismaClient.notification.count({
            where: {
                recipientId: recipientId
            },
        }).catch((exception: Error) => {
            logger.error({ message: exception.message })
            throw new InternalErrorException("Failed on find notifications count!");
        })
    }

}
