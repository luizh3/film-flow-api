import { Prisma, Review } from "@prisma/client";
import { ReviewWithLikes } from "@/types/prisma/ReviewWithLikes";

export interface IReviewRepository {
    insert(data: Prisma.ReviewCreateInput): Promise<Review>;
    update(reviewId: string, data: Prisma.ReviewUpdateInput): Promise<Review>;
    findAllByIdMovie(userId: string, movieId: string, offset: number, limit: number): Promise<ReviewWithLikes[] | null>;
    findAllByIdUser(userId: string, offset: number, limit: number): Promise<ReviewWithLikes[] | null>;
    findCountByIdMovie(movieId: string): Promise<number>;
    findCountByIdUser(userId: string): Promise<number>;
    findOneByUserIdAndMovieId(userId: string, movieId: string): Promise<Review | null>;
    findOne(reviewId: string): Promise<Review | null>;
}
