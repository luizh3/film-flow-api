import { InternalErrorException } from "@/exceptions/InternalErrorException";
import { NotFoundException } from "@/exceptions/NotFoundException";
import { IReviewRepository } from "@/ports/repositories/IReviewRepository";
import { Pagination } from "@/types/api/Pagination";
import { ReviewWithAuthor } from "@/types/prisma/ReviewWithAuthor";
import { ReviewWithLikesAndAuthor } from "@/types/prisma/ReviewWithLikes";
import { Prisma } from "@prisma/client";

export default class ReviewService {

    nrReviewByPage: number = 5;

    constructor(private readonly repository: IReviewRepository) {}

    async insert(review: Prisma.ReviewCreateInput): Promise<ReviewWithAuthor> {
        return await this.repository.insert(review);
    }

    async findOneByUserIdAndMovieId(userId: string, movieId: string) {

        const review = await this.repository.findOneByUserIdAndMovieId(userId, movieId);

        return review;

    }

    async update(reviewId: string, userId: string, data: Prisma.ReviewUpdateInput) {

        const review = await this.repository.findOne(reviewId);

        if (!review) {
            throw new NotFoundException("Review not found!");
        }

        if (review.authorId !== userId) {
            throw new InternalErrorException("Not allowed to update this review");
        }

        return await this.repository.update(reviewId, data);

    }

    async findOne(reviewId: string) {

        const review = await this.repository.findOne(reviewId);

        if (!review) {
            throw new NotFoundException("Review not found!");
        }

        return review;
    }

    async findAllByIdMovie(userId: string, movieId: string, nrPage: number): Promise<[ReviewWithLikesAndAuthor[] | null, Pagination]> {

        const nrAllReviews = await this.repository.findCountByIdMovie(movieId);

        const nrTotalPages = Math.max(Math.ceil(nrAllReviews / this.nrReviewByPage), 0);

        if (nrAllReviews === 0 || nrPage > nrTotalPages) {
            return [
                [],
                {
                    page: nrPage,
                    totalPage: nrTotalPages,
                    totalResults: nrAllReviews,
                }
            ]
        }

        const offset = Math.max((nrPage - 1), 0) * this.nrReviewByPage;

        const reviews = await this.repository.findAllByIdMovie(userId, movieId, offset, this.nrReviewByPage);

        const pagination = {
            page: nrPage,
            totalPage: nrTotalPages,
            totalResults: nrAllReviews,
        }

        return [reviews, pagination];

    }

    async findAllByIdUser(userId: string, nrPage: number): Promise<[ReviewWithLikesAndAuthor[] | null, Pagination]> {

        const nrAllReviews = await this.repository.findCountByIdUser(userId);

        const nrTotalPages = Math.max(Math.ceil(nrAllReviews / this.nrReviewByPage), 0);

        if (nrAllReviews === 0 || nrPage > nrTotalPages) {
            return [
                [],
                {
                    page: nrPage,
                    totalPage: nrTotalPages,
                    totalResults: nrAllReviews,
                }
            ]
        }

        const offset = Math.max((nrPage - 1), 0) * this.nrReviewByPage;

        const reviews = await this.repository.findAllByIdUser(userId, offset, this.nrReviewByPage);

        const pagination = {
            page: nrPage,
            totalPage: nrTotalPages,
            totalResults: nrAllReviews,
        }

        return [reviews, pagination];
    }
}