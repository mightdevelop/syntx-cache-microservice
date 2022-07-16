import { Module } from '@nestjs/common'
import { CacheService } from './services/cache.service'
import { CacheController } from './controllers/cache.controller'
import { ConfigModule, ConfigService } from '@nestjs/config'
import 'dotenv/config'
import { RedisModule } from '@liaoliaots/nestjs-redis'
import { PermissionsCacheService } from './services/permissions-cache.service'
import { PermissionsCacheController } from './controllers/permissions-cache.controller'

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [ `@${process.env.NODE_ENV}.env`, '@.env' ],
            isGlobal: true,
        }),
        RedisModule.forRootAsync({
            inject: [ ConfigService ],
            useFactory: (config: ConfigService) => ({
                config: {
                    db: +config.get('REDIS_DB_NUMBER'),
                    host: config.get('REDIS_HOST'),
                    port: +config.get('REDIS_PORT'),
                }
            }),
        }),
    ],
    controllers: [
        CacheController,
        PermissionsCacheController,
    ],
    providers: [
        CacheService,
        PermissionsCacheService,
    ],
})
export class CacheModule {}
