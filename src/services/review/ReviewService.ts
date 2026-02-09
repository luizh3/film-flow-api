import { NotFoundException } from "@/exceptions/NotFoundException";
import { ReviewRepository } from "@/repositorys/review/ReviewRepository";
import { Pagination } from "@/types/api/Pagination";
import { ReviewWithLikes } from "@/types/prisma/ReviewWithLikes";
import { Prisma, Review } from "@prisma/client";

export default class ReviewService {

    nrReviewByPage: number = 5;

    async insert(review: Prisma.ReviewCreateInput): Promise<Review> {

        const repository = new ReviewRepository();

        const reviewCreated = await repository.insert(review);

        return reviewCreated;

    }

    async findOneByUserIdAndMovieId(userId: string, movieId: string) {

        const repository = new ReviewRepository();

        const review = await repository.findOneByUserIdAndMovieId(userId, movieId);

        return review;

    }

    async update(reviewId: string, data: Prisma.ReviewUpdateInput) {

        const repository = new ReviewRepository();

        const review = await repository.update(reviewId, data);

        return review;

    }

    async findOne(reviewId: string) {

        const repository = new ReviewRepository();

        const review = await repository.findOne(reviewId);

        if (!review) {
            throw new NotFoundException("Review not found!");
        }

        return review;
    }

    async findAllByIdMovie(userId: string, movieId: string, nrPage: number): Promise<[Review[] | null, Pagination]> {

        const repository = new ReviewRepository();

        const nrAllReviews = await repository.findCountByIdMovie(movieId);

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

        const reviews = await repository.findAllByIdMovie(userId, movieId, offset, this.nrReviewByPage);

        const pagination = {
            page: nrPage,
            totalPage: nrTotalPages,
            totalResults: nrAllReviews,
        }

        return [reviews, pagination];

    }

    async findAllByIdUser(userId: string, nrPage: number): Promise<[ReviewWithLikes[] | null, Pagination]> {

        const repository = new ReviewRepository();

        const nrAllReviews = await repository.findCountByIdUser(userId);

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

        const reviews = await repository.findAllByIdUser(userId, offset, this.nrReviewByPage);

        const pagination = {
            page: nrPage,
            totalPage: nrTotalPages,
            totalResults: nrAllReviews,
        }

        return [reviews, pagination];
    }
}