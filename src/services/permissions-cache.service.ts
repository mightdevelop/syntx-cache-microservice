import { Injectable } from '@nestjs/common'
import 'dotenv/config'
import { RedisService } from '@liaoliaots/nestjs-redis'
import {
    Void,
    Bool,
    DoesUserHavePermissionRequest,
    AddPermissionsToUserRequest,
    RemovePermissionsFromRoleRequest,
} from 'src/cache.pb'


@Injectable()
export class PermissionsCacheService {

    constructor(
        private readonly redisService: RedisService,
    ) {}

    private client = this.redisService.getClient()

    public async doesUserHavePermission(
        key: DoesUserHavePermissionRequest,
    ): Promise<Bool> {
        const jsonKey = JSON.stringify(key)
        const result = await this.client.get(jsonKey)
        this.client.expireat(jsonKey, Date.now() + 28800)
        return { bool: result === 'true' }
    }

    public async addPermissionToUserInProject(
        { roleId, permissionId, projectId, userId }: AddPermissionsToUserRequest
    ): Promise<Void> {
        const jsonKey = JSON.stringify({ permissionId, projectId, userId })
        this.client.set(jsonKey, 'true', 'EX', 28800)
        if (roleId) {
            this.client.sadd(JSON.stringify({
                permissionId,
                roleId,
            }), jsonKey)
        }
        return {}
    }

    public async removePermissionsFromRole(
        { roleId, permissionsIds }: RemovePermissionsFromRoleRequest
    ): Promise<Void> {
        this.client.del(...permissionsIds.map(id => id.toString()))
        this.client.del(permissionsIds.map(permissionId => JSON.stringify({
            permissionId,
            roleId,
        })))
        return {}
    }

}
