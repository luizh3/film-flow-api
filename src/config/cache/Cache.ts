import { ICache, SetOptions } from "./ICache";

class Cache implements ICache {

    private instance : ICache | null = null;

    private secondsTimeToLive: number = 3600;

    init( cache : ICache ) {
        this.instance = cache;
    }

    get( key: string ): Promise<string | null> {
        return this.instance ? this.instance.get( key ) : Promise.resolve( null ) ;
    };

    set( key: string, value: string, options?: SetOptions ): Promise<string | null> {
        return this.instance ? this.instance.set( key, value, options ?? { EX: this.secondsTimeToLive } ) : Promise.resolve( null );
    };

    async start() {
        return this.instance?.start();
    }

}

export const cache : Cache = new Cache();