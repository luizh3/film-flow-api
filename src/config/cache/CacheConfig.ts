import { cache } from "./Cache";
import { RedisCache } from "./redis/RedisCache";

export default function cacheConfig() {

    cache.init( new RedisCache() );
    
}