import prismaClient from "@/config/prisma";
import { InternalErrorException } from "@/exceptions/InternalErrorException";
import { ReviewWithAuthor } from "@/types/prisma/ReviewWithAuthor";
import { ReviewWithLikesAndAuthor } from "@/types/prisma/ReviewWithLikes";
import { logger } from "@/utils/Logger";
import { Prisma } from "@prisma/client";
import { IReviewRepository } from "@/ports/repositories/IReviewRepository";

export class ReviewRepository implements IReviewRepository {

    async insert(data: Prisma.ReviewCreateInput): Promise<ReviewWithAuthor> {
        return await prismaClient.review.create({
            data,
            include: { author: true }
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on insert review!");
        });
    }

    async update(reviewId: string, data: Prisma.ReviewUpdateInput): Promise<ReviewWithAuthor> {
        return await prismaClient.review.update({
            where: { reviewId },
            data,
            include: { author: true }
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on update review!");
        });
    }

    async findAllByIdMovie(userId: string, movieId: string, offset: number, limit: number): Promise<ReviewWithLikesAndAuthor[] | null> {
        return await prismaClient.review.findMany({
            skip: offset,
            take: limit,
            where: { movieId },
            include: {
                likeReviews: {
                    where: { userId },
                    select: { userId: true }
                },
                _count: { select: { likeReviews: true } },
                author: true
            },
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on find reviews!");
        });
    }

    async findAllByIdUser(userId: string, offset: number, limit: number): Promise<ReviewWithLikesAndAuthor[] | null> {
        return await prismaClient.review.findMany({
            skip: offset,
            take: limit,
            where: { authorId: userId },
            include: {
                likeReviews: {
                    where: { userId },
                    select: { userId: true }
                },
                _count: { select: { likeReviews: true } },
                author: true
            },
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on find reviews!");
        });
    }

    async findCountByIdMovie(movieId: string): Promise<number> {
        return await prismaClient.review.count({
            where: {
                movieId: movieId
            },
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on find reviews count!");
        })
    }

    async findCountByIdUser(userId: string): Promise<number> {
        return await prismaClient.review.count({
            where: {
                authorId: userId
            },
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on find reviews count!");
        })
    }

    async findOneByUserIdAndMovieId(userId: string, movieId: string): Promise<ReviewWithAuthor | null> {
        return await prismaClient.review.findUnique({
            where: {
                movieId_authorId: { movieId, authorId: userId }
            },
            include: { author: true }
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on find review!");
        });
    }

    async findOne(reviewId: string): Promise<ReviewWithAuthor | null> {
        return await prismaClient.review.findUnique({
            where: { reviewId },
            include: { author: true }
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on find review!");
        });
    }
}
