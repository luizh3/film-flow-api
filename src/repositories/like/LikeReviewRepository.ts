import prismaClient from "@/config/prisma";
import { InternalErrorException } from "@/exceptions/InternalErrorException";
import { logger } from "@/utils/Logger";
import { LikeReview, Prisma } from "@prisma/client";
import { ILikeReviewRepository } from "@/ports/repositories/ILikeReviewRepository";

export class LikeReviewRepository implements ILikeReviewRepository {

    async insert(data: Prisma.LikeReviewUncheckedCreateInput): Promise<LikeReview> {
        return await prismaClient.likeReview.create({ data }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on like review!");
        });
    }

    async delete(userId: string, reviewId: string): Promise<LikeReview> {
        return await prismaClient.likeReview.delete({
            where: {
                userId_reviewId: {
                    reviewId: reviewId,
                    userId: userId
                }
            }
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on delete like!");
        });
    }

}
