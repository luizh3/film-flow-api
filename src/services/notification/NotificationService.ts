import { INotificationRepository } from "@/ports/repositories/INotificationRepository";
import { Pagination } from "@/types/api/Pagination";
import { Notification, Prisma } from "@prisma/client";

export class NotificationService {

    nrNotificationsByPage: number = 10;

    constructor(private readonly notificationRepository: INotificationRepository) {}

    async insert(data: Prisma.NotificationUncheckedCreateInput) {

        const notificationResult = await this.notificationRepository.insert(data);

        return notificationResult;
    }

    async findAllByIdRecipient(recipientId: string, nrPage: number): Promise<[Notification[], Pagination]> {

        const nrAllNotifications = await this.notificationRepository.findCountByIdRecipient(recipientId);

        const nrTotalPages = Math.max(Math.ceil(nrAllNotifications / this.nrNotificationsByPage), 0)

        if (nrAllNotifications === 0 || nrPage > nrTotalPages) {
            return [
                [],
                {
                    page: nrPage,
                    totalPage: nrTotalPages,
                    totalResults: nrAllNotifications
                }
            ]
        }

        const offset = Math.max((nrPage - 1), 0) * this.nrNotificationsByPage;

        const notifications = await this.notificationRepository.findAllByIdRecipient(recipientId, offset, this.nrNotificationsByPage);

        const pagination = {
            page: nrPage,
            totalPage: nrTotalPages,
            totalResults: nrAllNotifications,
        }

        return [notifications, pagination];

    }

}