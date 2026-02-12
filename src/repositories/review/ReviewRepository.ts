import prismaClient from "@/config/prisma";
import { InternalErrorException } from "@/exceptions/InternalErrorException";
import { ReviewWithLikes } from "@/types/prisma/ReviewWithLikes";
import { logger } from "@/utils/Logger";
import { Prisma, Review } from "@prisma/client";

export class ReviewRepository {

    async insert(data: Prisma.ReviewCreateInput): Promise<Review> {
        return await prismaClient.review.create({ data }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on insert review!");
        });
    }

    async update(reviewId: string, data: Prisma.ReviewUpdateInput): Promise<Review> {
        return await prismaClient.review.update({
            where: {
                reviewId: reviewId
            },
            data: data
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on update review!");
        });
    }

    async findAllByIdMovie(userId: string, movieId: string, offset: number, limit: number): Promise<ReviewWithLikes[] | null> {
        return await prismaClient.review.findMany({
            skip: offset,
            take: limit,
            where: {
                movieId: movieId
            },
            include: {
                likeReviews: {
                    where: {
                        userId: userId
                    },
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        likeReviews: true
                    }
                }
            },
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on find reviews!");
        })
    }

    async findAllByIdUser(userId: string, offset: number, limit: number): Promise<ReviewWithLikes[] | null> {
        return await prismaClient.review.findMany({
            skip: offset,
            take: limit,
            where: {
                authorId: userId
            },
            include: {
                likeReviews: {
                    where: {
                        userId: userId
                    },
                    select: {
                        userId: true
                    }
                },
                _count: {
                    select: {
                        likeReviews: true
                    }
                }
            },
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on find reviews!");
        })
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

    async findOneByUserIdAndMovieId(userId: string, movieId: string): Promise<Review | null> {
        return await prismaClient.review.findUnique({
            where: {
                movieId_authorId: {
                    movieId,
                    authorId: userId
                }
            }
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on find review!");
        })
    }

    async findOne(reviewId: string) {
        return await prismaClient.review.findUnique({
            where: {
                reviewId
            }
        }).catch((exception: Error) => {
            logger.error({ message: exception.message });
            throw new InternalErrorException("Failed on find review!");
        })
    }

}
