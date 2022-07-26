import { Injectable } from '@nestjs/common'
import 'dotenv/config'
import { RedisService } from '@liaoliaots/nestjs-redis'
import {
    Void,
    Bool,
    DoesUserHavePermissionRequest,
    AddPermissionsToUserRequest,
    RemovePermissionsFromRoleRequest,
    RemovePermissionsFromUserRequest,
    RemoveRolesFromUserRequest,
    RoleId,
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
        const ttl = 28800
        const permissionKey: string = JSON.stringify(key)
        const result = await this.client.get(permissionKey)
        this.client.expireat(permissionKey, Date.now() + ttl)
        return { bool: result === 'true' }
    }

    public async addPermissionToUserInProject(
        { roleId, permissionId, projectId, userId }: AddPermissionsToUserRequest
    ): Promise<Void> {
        const ttl = 28800
        const permissionKey: string = JSON.stringify({ userId, projectId, permissionId })
        if (roleId) {
            await Promise.all([
                this.client.sadd('role:' + roleId, permissionKey),
                this.client.expireat('role:' + roleId, ttl),
                this.client.set(permissionKey, 'true', 'EX', ttl),
            ])
            return {}
        }
        await this.client.set(permissionKey, 'true', 'EX', ttl)
        return {}
    }

    public async removePermissionsFromRole(
        { roleId, permissionsIds }: RemovePermissionsFromRoleRequest
    ): Promise<Void> {
        const roleKey: string = 'role:' + roleId
        const permissionsKeys: string[] = await Promise.all(permissionsIds.map(permissionId => {
            return this.client.sscan(
                'role:' + roleId,
                0,
                'MATCH',
                '*"permissionId":' + permissionId + '*',
            )[1]
        }))

        await Promise.all([
            this.client.srem(roleKey, permissionsKeys),
            this.client.del('role:' + roleId, ...permissionsKeys),
        ])
        return {}
    }

    public async removePermissionsFromUser(
        { userId, permissionsIds }: RemovePermissionsFromUserRequest
    ): Promise<Void> {
        const keys: string[] = await Promise.all(permissionsIds.map(permissionId => {
            return this.client.scan(
                0,
                'MATCH',
                '*"userId":"' + userId + '*"permissionId":' + permissionId + '*',
                'COUNT',
                10000,
            )[1]
        }))

        await this.client.del(keys)
        return {}
    }

    public async removeRolesFromUser(
        { rolesIds, userId }: RemoveRolesFromUserRequest
    ): Promise<Void> {
        const rolesKeys: string[] = rolesIds.map(roleId => 'role:' + roleId)
        const permissionsKeys: string[] = await Promise.all(
            rolesIds.map(roleId => {
                return this.client.sscan(
                    'role:' + roleId,
                    0,
                    'MATCH',
                    '*"userId":' + userId + '*',
                    'COUNT',
                    10000,
                )[1]
            })
        )

        await Promise.all([
            rolesKeys.map(key => this.client.srem(key, permissionsKeys)),
            this.client.del(permissionsKeys),
        ])
        return {}
    }

    public async deleteRole(
        { roleId }: RoleId
    ): Promise<Void> {
        const roleKey: string = 'role:' + roleId
        const permissionsKeys: string[] = await this.client.smembers('role:' + roleId)

        await this.client.del(roleKey, ...permissionsKeys)
        return {}
    }

}
