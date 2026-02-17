import { Prisma } from "@prisma/client";
import { ReviewWithAuthor } from "@/types/prisma/ReviewWithAuthor";
import { ReviewWithLikesAndAuthor } from "@/types/prisma/ReviewWithLikes";

export interface IReviewRepository {
    insert(data: Prisma.ReviewCreateInput): Promise<ReviewWithAuthor>;
    update(reviewId: string, data: Prisma.ReviewUpdateInput): Promise<ReviewWithAuthor>;
    findAllByIdMovie(userId: string, movieId: string, offset: number, limit: number): Promise<ReviewWithLikesAndAuthor[] | null>;
    findAllByIdUser(userId: string, offset: number, limit: number): Promise<ReviewWithLikesAndAuthor[] | null>;
    findCountByIdMovie(movieId: string): Promise<number>;
    findCountByIdUser(userId: string): Promise<number>;
    findOneByUserIdAndMovieId(userId: string, movieId: string): Promise<ReviewWithAuthor | null>;
    findOne(reviewId: string): Promise<ReviewWithAuthor | null>;
}
