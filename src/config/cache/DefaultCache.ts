import { ICache, SetOptions } from "./ICache";

export class DefaultCache implements ICache {

    get( key: string ): Promise<string | null> {
        return Promise.resolve( null );
    };

    set( key: string, value: string, options?: SetOptions ): Promise<string | null> {
        return Promise.resolve( null )
    };

    async start() : Promise<void> {
        return Promise.resolve();
    }
}