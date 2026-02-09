import { NotificationRepository } from "@/repositorys/notification/NotificationRepository";
import { Pagination } from "@/types/api/Pagination";
import { Notification, Prisma } from "@prisma/client";

export class NotificationService {

    nrNotificationsByPage: number = 10;

    async insert(data: Prisma.NotificationUncheckedCreateInput) {

        const notificationRepository = new NotificationRepository();

        const notificationResult = await notificationRepository.insert(data);

        return notificationResult;
    }

    async findAllByIdRecipient(recipientId: string, nrPage: number): Promise<[Notification[], Pagination]> {

        const notificationRepository = new NotificationRepository();

        const nrAllNotifications = await notificationRepository.findCountByIdRecipient(recipientId);

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

        const notifications = await notificationRepository.findAllByIdRecipient(recipientId, offset, this.nrNotificationsByPage);

        const pagination = {
            page: nrPage,
            totalPage: nrTotalPages,
            totalResults: nrAllNotifications,
        }

        return [notifications, pagination];

    }

}