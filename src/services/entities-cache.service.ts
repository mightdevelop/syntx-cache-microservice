import { Injectable } from '@nestjs/common'
import 'dotenv/config'
import {
    Cache as ProtoCache,
    EntityKey,
    SetEntityByKey,
    Void,
} from '../cache.pb'
import { RedisService } from '@liaoliaots/nestjs-redis'
import { RpcException } from '@nestjs/microservices'
import { Status } from '@grpc/grpc-js/build/src/constants'


@Injectable()
export class EntitiesCacheService {

    constructor(
        private readonly redisService: RedisService,
    ) {}

    private client = this.redisService.getClient()

    public async getEntityByKey(
        key: EntityKey
    ): Promise<ProtoCache> {
        const jsonKey = JSON.stringify(key)
        try {
            const jsonData = await this.client.get(jsonKey)
            this.client.expireat(jsonKey, Date.now() + 28800)
            return { jsonData }
        } catch (error) {
            throw new RpcException({ code: Status.UNAVAILABLE })
        }
    }

    public async setEntityByKey(
        dto: SetEntityByKey
    ): Promise<Void> {
        try {
            await this.client.set(
                JSON.stringify(dto.entityKey),
                dto.jsonData,
                'EX',
                dto.ttl | 28800,
            )
            return {}
        } catch (error) {
            throw new RpcException({ code: Status.UNAVAILABLE })
        }
    }

    public async delEntityByKey(
        key: EntityKey
    ): Promise<Void> {
        try {
            await this.client.del(JSON.stringify(key))
            return {}
        } catch (error) {
            throw new RpcException({ code: Status.UNAVAILABLE })
        }
    }

}
