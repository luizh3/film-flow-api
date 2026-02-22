import { ReviewWithAuthor } from "@/types/prisma/ReviewWithAuthor";
import { ReviewWithLikesAndAuthor } from "@/types/prisma/ReviewWithLikes";
import { CreateReviewRequest } from "@/types/review/CreateReviewRequest";
import { ReviewAuthorResponse } from "@/types/review/ReviewAuthorResponse";
import { ReviewResponse } from "@/types/review/ReviewResponse";
import { ReviewWithLikesResponse } from "@/types/review/ReviewWithLikesResponse";
import { UpdateReviewRequest } from "@/types/review/UpdateReviewRequest";
import { Prisma } from "@prisma/client";
import { User } from "@prisma/client";

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

    static authorToResponse(author: User): ReviewAuthorResponse {
        return {
            id: author.userId,
            name: author.name,
            avatarUrl: author.avatarUrl
        }
    }

    static toResponse(review: ReviewWithAuthor): ReviewResponse {
        return {
            title: review.title,
            movieId: review.movieId,
            score: review.score.toNumber(),
            description: review.description,
            reviewId: review.reviewId,
            programTitle: review.programTitle,
            programType: review.programType,
            createdDate: review.createAt?.toISOString() ?? null,
            author: ReviewMapper.authorToResponse(review.author)
        }
    }

    static toResponseWithLikes(review: ReviewWithLikesAndAuthor): ReviewWithLikesResponse {
        return {
            title: review.title,
            movieId: review.movieId,
            score: review.score.toNumber(),
            description: review.description,
            reviewId: review.reviewId,
            programTitle: review.programTitle,
            programType: review.programType,
            createdDate: review.createAt?.toISOString() ?? null,
            likedByMe: review.likeReviews.length > 0,
            likesCount: review._count.likeReviews,
            author: ReviewMapper.authorToResponse(review.author)
        }
    }
}