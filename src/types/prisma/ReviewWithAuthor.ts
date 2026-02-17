import { Prisma } from "@prisma/client";

export type ReviewWithAuthor = Prisma.ReviewGetPayload<{
    include: {
        author: true;
    };
}>;
