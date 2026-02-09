import { ReviewController } from "@/controllers/review/ReviewController";
import { StatusCodes } from "@/enum/StatusCode";
import { ErrorResponseSchema, ErrorResponse } from "@/types/error/ErrorResponse";
import { CreateReviewRequestSchema, CreateReviewRequest } from "@/types/review/CreateReviewRequest";
import { FindAllParamsRequestSchema, FindAllParamsRequest } from "@/types/review/FindAllParamsRequest";
import { FindAllReviewResponseSchema, FindAllReviewResponse } from "@/types/review/FindAllReviewResponse";
import { LikeReviewParamsSchema, LikeReviewParams } from "@/types/review/LikeReviewParams";
import { ReviewResponseSchema, ReviewResponse } from "@/types/review/ReviewResponse";
import { UpdateReviewRequestSchema, UpdateReviewRequest } from "@/types/review/UpdateReviewRequest";
import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";

export default async function ReviewRoutes(fastify: FastifyInstance) {

    fastify.post<{ Body: CreateReviewRequest, Reply: ReviewResponse }>(
        "/",
        {
            preHandler: [fastify.authenticate],
            schema: {
                body: CreateReviewRequestSchema,
                response: {
                    [StatusCodes.OK]: ReviewResponseSchema,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                }
            }
        },
        new ReviewController().insert
    );

    fastify.put<{ Body: UpdateReviewRequest, Reply: ReviewResponse }>(
        "/",
        {
            preHandler: [fastify.authenticate],
            schema: {
                body: UpdateReviewRequestSchema,
                response: {
                    [StatusCodes.OK]: ReviewResponseSchema,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                }
            }
        },
        new ReviewController().update
    );

    fastify.get<{ Querystring: FindAllParamsRequest, Reply: FindAllReviewResponse }>(
        "/",
        {
            preHandler: [fastify.authenticate],
            schema: {
                querystring: FindAllParamsRequestSchema,
                response: {
                    [StatusCodes.OK]: FindAllReviewResponseSchema,
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                }
            }
        },
        new ReviewController().findAllById
    )

    fastify.post<{ Params: LikeReviewParams }>(
        "/:id/like",
        {
            preHandler: [fastify.authenticate],
            schema: {
                params: LikeReviewParamsSchema,
                response: {
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                }
            }
        },
        (request: FastifyRequest, reply: FastifyReply) => {
            return new ReviewController().like(request, reply, fastify.notificationsManager);
        }
    )

    fastify.delete<{ Params: LikeReviewParams }>(
        "/:id/like",
        {
            preHandler: [fastify.authenticate],
            schema: {
                params: LikeReviewParamsSchema,
                response: {
                    [StatusCodes.INTERNAL_SERVER_ERROR]: ErrorResponseSchema
                }
            }
        },
        (request: FastifyRequest, reply: FastifyReply) => {
            return new ReviewController().unlike(request, reply);
        }
    )

}