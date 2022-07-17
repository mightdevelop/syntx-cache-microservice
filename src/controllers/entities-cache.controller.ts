import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import {
    ENTITIES_CACHE_SERVICE_NAME,
    Cache,
    EntitiesCacheServiceController,
    EntityKey,
    Void,
    SetEntityByKey,
} from '../cache.pb'
import { EntitiesCacheService } from '../services/entities-cache.service'
import { from, Observable } from 'rxjs'

@Controller()
export class EntitiesCacheController implements EntitiesCacheServiceController {

    @Inject(EntitiesCacheService)
    private readonly entitiesCacheService: EntitiesCacheService

    @GrpcMethod(ENTITIES_CACHE_SERVICE_NAME, 'getEntityByKey')
    public getEntityByKey(dto: EntityKey): Observable<Cache> {
        return from(this.entitiesCacheService.getEntityByKey(dto))
    }

    @GrpcMethod(ENTITIES_CACHE_SERVICE_NAME, 'setEntityByKey')
    public setEntityByKey(dto: SetEntityByKey): Observable<Void> {
        return from(this.entitiesCacheService.setEntityByKey(dto))
    }

    @GrpcMethod(ENTITIES_CACHE_SERVICE_NAME, 'delEntityByKey')
    public delEntityByKey(dto: EntityKey): Observable<Void> {
        return from(this.entitiesCacheService.delEntityByKey(dto))
    }

}