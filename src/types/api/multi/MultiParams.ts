import { Static, Type } from "@sinclair/typebox";

export const MultiParamsSchema = Type.Object({
    id: Type.Number()
});

export type MultiParams = Static<typeof MultiParamsSchema>;
