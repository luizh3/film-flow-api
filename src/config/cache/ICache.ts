
type MaximumOneOf<T, K extends keyof T = keyof T> = K extends keyof T ? {
    [P in K]?: T[K];
} & Partial<Record<Exclude<keyof T, K>, never>> : never;

type SetTTL = MaximumOneOf<{
    EX: number;
    PX: number;
    EXAT: number;
    PXAT: number;
    KEEPTTL: true;
}>;
type SetGuards = MaximumOneOf<{
    NX: true;
    XX: true;
}>;

export type SetOptions = SetTTL & SetGuards;

export interface ICache {

    get( key: string ): Promise<string | null>;

    set( key: string, value: string, options?: SetOptions ): Promise<string | null>;

    start() : Promise<void>;

}