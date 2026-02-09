import { Prisma } from "@prisma/client"

export type ReviewWithLikes = Prisma.ReviewGetPayload<{
    include: {
        likeReviews: {
            select: {
                userId: true
            }
        }
        _count: {
            select: {
                likeReviews: true
            }
        }
    }
}>