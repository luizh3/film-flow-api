import { Notification, Prisma } from "@prisma/client";

export interface INotificationRepository {
    insert(data: Prisma.NotificationUncheckedCreateInput): Promise<Notification>;
    findAllByIdRecipient(recipientId: string, offset: number, limit: number): Promise<Notification[]>;
    findCountByIdRecipient(recipientId: string): Promise<number>;
}
