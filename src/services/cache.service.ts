import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common'
import 'dotenv/config'
import {
    Cache as ProtoCache,
    CacheKey,
    SetCacheRequest,
} from '../cache.pb'
import { Cache } from 'cache-manager'


@Injectable()
export class CacheService {

    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    public async getCacheByKey(key: CacheKey): Promise<ProtoCache> {
        return this.cacheManager.get(JSON.stringify(key))
    }

    public async setCacheByKey({ key, data, ttl }: SetCacheRequest): Promise<ProtoCache> {
        if (ttl && ttl > 1814400) {
            ttl = 1814400   // 1814400 sec = 3 weeks = max ttl
        }
        return {
            data: JSON.parse(
                await this.cacheManager.set(
                    JSON.stringify(key),
                    JSON.stringify(data),
                    { ttl }
                )
            )
        }
    }

}
