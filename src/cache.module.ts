import { CacheModule as NestCacheModule, Module } from '@nestjs/common'
import { CacheService } from './services/cache.service'
import { CacheController } from './cache.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { create } from 'cache-manager-redis-store'
import 'dotenv/config'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [ `@${process.env.NODE_ENV}.env`, '@.env' ],
            isGlobal: true,
        }),
        NestCacheModule.registerAsync({
            inject: [ ConfigService ],
            useFactory: (config: ConfigService) => ({
                store: create({ db: +config.get('REDIS_DB_NUMBER') }),
                host: config.get('REDIS_HOST'),
                port: +config.get('REDIS_PORT'),
                ttl: 28800 // 8 hours
            }),
        }),
    ],
    controllers: [ CacheController ],
    providers: [
        CacheService,
    ],
})
export class CacheModule {}
