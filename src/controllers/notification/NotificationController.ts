import { InternalErrorException } from "@/exceptions/InternalErrorException";
import { UserService } from "@/services/customer/UserService";
import { NotificationService } from "@/services/notification/NotificationService";
import { UserType } from "@/types/customer/UserType";
import { FindAllNotificationRequest } from "@/types/notifications/FindAllNotificationRequest";
import { NotificationEvent } from "@/types/notifications/NotificationEvent";
import { NotificationResponse } from "@/types/notifications/NotificationResponse";
import { NotificationResultsResponse } from "@/types/notifications/NotificationResultsResponse";
import { FastifyReply, FastifyRequest } from "fastify";

export class NotificationController {

    async findAll(request: FastifyRequest, reply: FastifyReply) {

        const userId = request.user.id;
        const filters = request.query as FindAllNotificationRequest;

        console.log(filters)

        const notificationService = new NotificationService();
        const userService = new UserService();

        const notificationsPaginated = await notificationService.findAllByIdRecipient(userId, filters.page);

        const notifications = notificationsPaginated[0];
        const pagination = notificationsPaginated[1];

        const actorIds = new Set<string>();

        for (const notification of notifications) {
            const payload = notification.payload as unknown as NotificationEvent;
            actorIds.add(payload.data.actorId);
        }

        const actors = await userService.findManyByIds([...actorIds]);

        const actorsMap = new Map<string, UserType>();
        for (const actor of actors) {
            actorsMap.set(actor.userId!, actor);
        }

        const notificationsResponse: NotificationResponse[] = notifications.map(notification => {

            const payload = notification.payload as unknown as NotificationEvent;

            const actor = actorsMap.get(payload.data.actorId);

            if (!actor) {
                throw new InternalErrorException('Actor not found!');
            }

            console.log(actor)

            return {
                type: notification.type,
                data: {
                    actor: {
                        id: actor.userId!,
                        name: actor.name,
                        avatarUrl: actor.avatarUrl ?? ""
                    },
                    program: {
                        id: payload.data.program.id,
                        title: payload.data.program.title,
                        type: payload.data.program.type
                    },
                    review: {
                        id: payload.data.reviewId
                    }
                }
            };
        });

        const response: NotificationResultsResponse = {
            notifications: notificationsResponse,
            ...pagination
        }

        console.log(response)

        return reply.send(response);
    }


}