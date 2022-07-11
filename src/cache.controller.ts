import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import {
    CACHE_SERVICE_NAME,
    Cache,
    CacheServiceController,
    CacheKey,
    SetCacheRequest,
} from './cache.pb'
import { CacheService } from './services/cache.service'
import { from, Observable } from 'rxjs'

@Controller()
export class CacheController implements CacheServiceController {

    @Inject(CacheService)
    private readonly cacheService: CacheService

    @GrpcMethod(CACHE_SERVICE_NAME, 'getCacheByKey')
    public getCacheByKey(dto: CacheKey): Observable<Cache> {
        return from(this.cacheService.getCacheByKey(dto))
    }

    @GrpcMethod(CACHE_SERVICE_NAME, 'setCacheByKey')
    public setCacheByKey(dto: SetCacheRequest): Observable<Cache> {
        return from(this.cacheService.setCacheByKey(dto))
    }

}