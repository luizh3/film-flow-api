import { Static, Type } from "@sinclair/typebox";

export const LikeReviewParamsSchema = Type.Object({
    id: Type.String()
});

export type LikeReviewParams = Static<typeof LikeReviewParamsSchema>;
