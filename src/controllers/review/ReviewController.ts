import { StatusCodes } from "@/enum/StatusCode";
import { ReviewMapper } from "@/mappers/review/ReviewMapper";
import LikeReviewService from "@/services/like/LikeReviewService";
import { NotificationService } from "@/services/notification/NotificationService";
import ReviewService from "@/services/review/ReviewService";
import { CreateReviewRequest } from "@/types/review/CreateReviewRequest";
import { FindAllParamsRequest } from "@/types/review/FindAllParamsRequest";
import { LikeReviewParams } from "@/types/review/LikeReviewParams";
import { UpdateReviewRequest } from "@/types/review/UpdateReviewRequest";
import { NotificationsManager } from "@/websockets/manager/NotificationsManager";
import { FastifyReply, FastifyRequest } from "fastify";

export class ReviewController {

    constructor(
        private readonly reviewService: ReviewService,
        private readonly likeReviewService: LikeReviewService,
        private readonly notificationService: NotificationService
    ) { }

    async insert(request: FastifyRequest, reply: FastifyReply) {

        const reviewRequest = request.body as CreateReviewRequest;

        var reviewCreate = ReviewMapper.toCreate(reviewRequest, request.user.id);

        const reviewResult = await this.reviewService.insert(reviewCreate);

        reply.status(StatusCodes.OK).send(ReviewMapper.toResponse(reviewResult));

    }

    async update(request: FastifyRequest, reply: FastifyReply) {

        const userId = request.user.id;
        const reviewId = (request.params as LikeReviewParams).id;
        const reviewRequest = request.body as UpdateReviewRequest;

        const reviewUpdated = ReviewMapper.toUpdate(reviewRequest);

        const reviewResult = await this.reviewService.update(reviewId, userId, reviewUpdated);

        reply.status(StatusCodes.OK).send(ReviewMapper.toResponse(reviewResult));

    }

    async findAllById(request: FastifyRequest, reply: FastifyReply) {

        const filters = request.query as FindAllParamsRequest;

        const userId = request.user.id;

        const reviewResult = await this.reviewService.findAllByIdUser(userId, filters.page);

        const reviewResponse = reviewResult[0]?.map((review) => {
            return ReviewMapper.toResponseWithLikes(review)
        }) ?? [];

        reply.status(StatusCodes.OK).send({
            reviews: reviewResponse,
            ...reviewResult[1]
        });

    }

    async unlike(request: FastifyRequest, reply: FastifyReply) {

        const userId = request.user.id;
        const reviewId = (request.params as LikeReviewParams).id;

        await this.likeReviewService.unlike(userId, reviewId);

        reply.status(StatusCodes.OK);

    }

    async like(request: FastifyRequest, reply: FastifyReply, notificationsManager: NotificationsManager) {

        const userId = request.user.id;
        const reviewId = (request.params as LikeReviewParams).id;

        const review = await this.reviewService.findOne(reviewId);

        await this.likeReviewService.like(
            { userId, reviewId },
            {
                review,
                notificationService: this.notificationService,
                notificationsManager
            }
        );

        reply.status(StatusCodes.OK);

    }

}