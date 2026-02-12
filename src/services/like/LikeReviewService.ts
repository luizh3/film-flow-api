import { LikeReviewRepository } from "@/repositories/like/LikeReviewRepository";
import { NotificationService } from "@/services/notification/NotificationService";
import { NotificationEventType } from "@/types/notifications/NotificationEvent";
import { NotificationStatusType } from "@/types/notifications/NotificationStatusType";
import { NotificationsManager } from "@/websockets/manager/NotificationsManager";
import { Prisma, Review } from "@prisma/client";

export interface LikeReviewOptions {
    review: Review;
    notificationService: NotificationService;
    notificationsManager: NotificationsManager;
}

export default class LikeReviewService {

    async like(
        likeReview: Prisma.LikeReviewUncheckedCreateInput,
        options?: LikeReviewOptions
    ) {

        const repository = new LikeReviewRepository();

        await repository.insert(likeReview);

        if (options) {
            const notification = {
                type: NotificationEventType.REVIEW_LIKE,
                data: {
                    reviewId: options.review.reviewId,
                    actorId: likeReview.userId,
                    program: {
                        id: options.review.movieId,
                        type: options.review.programType,
                        title: options.review.programTitle
                    }
                }
            };

            await options.notificationService.insert({
                type: NotificationEventType.REVIEW_LIKE,
                payload: notification,
                status: NotificationStatusType.SEND,
                recipientId: options.review.authorId
            });

            options.notificationsManager.notify(options.review.authorId, notification);
        }
    }

    async unlike(userId: string, reviewId: string) {

        const repository = new LikeReviewRepository();

        const result = await repository.delete(userId, reviewId);

        return result;
    }

}