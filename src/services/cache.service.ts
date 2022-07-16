import { Injectable } from '@nestjs/common'
import 'dotenv/config'
import {
    Cache as ProtoCache,
    CacheKey,
    SetCacheRequest,
    Void,
} from '../cache.pb'
import { RedisService } from '@liaoliaots/nestjs-redis'
import { RpcException } from '@nestjs/microservices'
import { Status } from '@grpc/grpc-js/build/src/constants'


@Injectable()
export class CacheService {

    constructor(
        private readonly redisService: RedisService,
    ) {}

    private client = this.redisService.getClient()

    public async getCacheByKey(key: CacheKey): Promise<ProtoCache> {
        return JSON.parse(await this.client.get(JSON.stringify(key)))
    }

    public async setCacheByKey({ key, data, ttl }: SetCacheRequest): Promise<Void> {
        try {
            await this.client.set(
                JSON.stringify(key),
                JSON.stringify(data),
                'EX',
                ttl,
            )
        } catch (error) {
            throw new RpcException({ status: Status.UNAVAILABLE })
        }
        return {}
    }

}
