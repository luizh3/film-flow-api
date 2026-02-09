import { LikeReviewRepository } from "@/repositorys/like/LikeReviewRepository";
import { Prisma } from "@prisma/client";

export default class LikeReviewService {

    async like(likeReview: Prisma.LikeReviewUncheckedCreateInput) {

        const repository = new LikeReviewRepository();

        const result = await repository.insert(likeReview);

        return result;
    }

    async unlike(userId: string, reviewId: string) {

        const repository = new LikeReviewRepository();

        const result = await repository.delete(userId, reviewId);

        return result;
    }

}