import { ReviewWithLikes } from "@/types/prisma/ReviewWithLikes";
import { CreateReviewRequest } from "@/types/review/CreateReviewRequest";
import { ReviewResponse } from "@/types/review/ReviewResponse";
import { ReviewWithLikesResponse } from "@/types/review/ReviewWithLikesResponse";
import { UpdateReviewRequest } from "@/types/review/UpdateReviewRequest";
import { Prisma, Review } from "@prisma/client";

export class ReviewMapper {

    static toCreate(reviewRequest: CreateReviewRequest, authorId: string): Prisma.ReviewCreateInput {
        return {
            title: reviewRequest.title,
            description: reviewRequest.description,
            score: reviewRequest.score,
            movieId: reviewRequest.movieId,
            programType: reviewRequest.programType,
            programTitle: reviewRequest.programTitle,
            author: {
                connect: {
                    userId: authorId
                }
            }
        }
    }

    static toUpdate(reviewRequest: UpdateReviewRequest): Prisma.ReviewUpdateInput {
        return {
            title: reviewRequest.title,
            description: reviewRequest.description,
            movieId: reviewRequest.movieId,
            score: reviewRequest.score
        }
    }

    static toResponse(review: Review): ReviewResponse {
        return {
            title: review.title,
            movieId: review.movieId,
            score: review.score.toNumber(),
            description: review.description,
            reviewId: review.reviewId,
            programTitle: review.programTitle,
            programType: review.programType
        }
    }

    static toResponseWithLikes(review: ReviewWithLikes): ReviewWithLikesResponse {
        return {
            title: review.title,
            movieId: review.movieId,
            score: review.score.toNumber(),
            description: review.description,
            reviewId: review.reviewId,
            programTitle: review.programTitle,
            programType: review.programType,
            likedByMe: review.likeReviews.length > 0,
            likesCount: review._count.likeReviews
        }
    }

}