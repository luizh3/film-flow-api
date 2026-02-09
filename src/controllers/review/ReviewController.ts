import { StatusCodes } from "@/enum/StatusCode";
import { ReviewMapper } from "@/mappers/review/ReviewMapper";
import LikeReviewService from "@/services/like/LikeReviewService";
import { NotificationService } from "@/services/notification/NotificationService";
import ReviewService from "@/services/review/ReviewService";
import { NotificationEventType } from "@/types/notifications/NotificationEvent";
import { NotificationStatusType } from "@/types/notifications/NotificationStatusType";
import { CreateReviewRequest } from "@/types/review/CreateReviewRequest";
import { FindAllParamsRequest } from "@/types/review/FindAllParamsRequest";
import { LikeReviewParams } from "@/types/review/LikeReviewParams";
import { UpdateReviewRequest } from "@/types/review/UpdateReviewRequest";
import { NotificationsManager } from "@/websockets/manager/NotificationsManager";
import { FastifyReply, FastifyRequest } from "fastify";

export class ReviewController {

    async insert(request: FastifyRequest, reply: FastifyReply) {

        const reviewRequest = request.body as CreateReviewRequest;

        var reviewCreate = ReviewMapper.toCreate(reviewRequest, request.user.id);

        const service = new ReviewService();

        const reviewResult = await service.insert(reviewCreate);

        reply.status(StatusCodes.OK).send(ReviewMapper.toResponse(reviewResult));

    }

    async update(request: FastifyRequest, reply: FastifyReply) {

        const userId = request.user.id;

        const reviewRequest = request.body as UpdateReviewRequest;

        var reviewUpdated = ReviewMapper.toUpdate(reviewRequest);

        const service = new ReviewService();

        const reviewResult = await service.update(userId, reviewUpdated);

        reply.status(StatusCodes.OK).send(ReviewMapper.toResponse(reviewResult));

    }

    async findAllById(request: FastifyRequest, reply: FastifyReply) {

        const filters = request.query as FindAllParamsRequest;

        const userId = request.user.id;

        const service = new ReviewService();

        const reviewResult = await service.findAllByIdUser(userId, filters.page);

        const reviewResponse = reviewResult[0]?.map((review) => {
            return ReviewMapper.toResponseWithLikes(review)
        }) ?? [];

        await new Promise(resolve => setTimeout(resolve, 5000));

        reply.status(StatusCodes.OK).send({
            reviews: reviewResponse,
            ...reviewResult[1]
        });

    }

    async unlike(request: FastifyRequest, reply: FastifyReply) {

        const userId = request.user.id;
        const reviewId = (request.params as LikeReviewParams).id;

        const likeReviewService = new LikeReviewService();

        await likeReviewService.unlike(userId, reviewId);

        reply.status(StatusCodes.OK);

    }

    async like(request: FastifyRequest, reply: FastifyReply, notificationsManager: NotificationsManager) {

        const userId = request.user.id;
        const reviewId = (request.params as LikeReviewParams).id;

        const likeReviewService = new LikeReviewService();
        const reviewService = new ReviewService();

        const notificationService = new NotificationService();

        const review = await reviewService.findOne(reviewId);

        await likeReviewService.like({
            userId: userId,
            reviewId: reviewId
        });

        // TODO mover para algum lugar 
        const notification = {
            type: NotificationEventType.REVIEW_LIKE,
            data: {
                reviewId: reviewId,
                actorId: userId,
                program: {
                    id: review.movieId,
                    type: review.programType,
                    title: review.programTitle
                }
            }
        }

        await notificationService.insert({
            type: NotificationEventType.REVIEW_LIKE,
            payload: notification,
            status: NotificationStatusType.SEND,
            recipientId: review.authorId
        });

        notificationsManager.notify(
            review.authorId,
            notification
        );

        reply.status(StatusCodes.OK);

    }

}