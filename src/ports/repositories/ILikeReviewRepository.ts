import { LikeReview, Prisma } from "@prisma/client";

export interface ILikeReviewRepository {
    insert(data: Prisma.LikeReviewUncheckedCreateInput): Promise<LikeReview>;
    delete(userId: string, reviewId: string): Promise<LikeReview>;
}
