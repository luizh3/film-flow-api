import { ICache, SetOptions } from "../ICache";
import redisClient from "@/config/cache/redis/RedisConfig";

export class RedisCache implements ICache {

    get( key: string ): Promise<string | null> {
        return redisClient.get( key )
    };

    set( key: string, value: string, options?: SetOptions ): Promise<string | null> {
        return redisClient.set( key, value, options );
    };

    async start() : Promise<void> {
        await redisClient.connect();
    }
    
}