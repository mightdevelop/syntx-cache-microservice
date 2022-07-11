import { NestFactory } from '@nestjs/core'
import { Transport } from '@nestjs/microservices'
import { join } from 'path'
import { CacheModule } from './cache.module'
import { CACHE_PACKAGE_NAME } from './cache.pb'

async function bootstrap() {
    const app = await NestFactory.createMicroservice(
        CacheModule,
        {
            transport: Transport.GRPC,
            options: {
                url: process.env.APP_URL,
                package: CACHE_PACKAGE_NAME,
                protoPath: join(__dirname, '..', 'node_modules', 'syntx-protos', 'cache', 'cache.proto'),
            }
        },
    )
    await app.listen()
    console.log('Cache service started at ' + process.env.APP_URL)
}
bootstrap()