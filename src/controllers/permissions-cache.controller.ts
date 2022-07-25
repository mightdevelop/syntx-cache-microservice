import { Controller, Inject } from '@nestjs/common'
import { GrpcMethod } from '@nestjs/microservices'
import {
    PERMISSIONS_CACHE_SERVICE_NAME,
    PermissionsCacheServiceController,
    Bool,
    Void,
    DoesUserHavePermissionRequest,
    AddPermissionsToUserRequest,
    RemovePermissionsFromRoleRequest,
    RemoveRolesFromUserRequest,
    RoleId,
} from '../cache.pb'
import { PermissionsCacheService } from '../services/permissions-cache.service'
import { from, Observable } from 'rxjs'

@Controller()
export class PermissionsCacheController implements PermissionsCacheServiceController {

    @Inject(PermissionsCacheService)
    private readonly permissionsCacheService: PermissionsCacheService

    @GrpcMethod(PERMISSIONS_CACHE_SERVICE_NAME, 'doesUserHavePermission')
    public doesUserHavePermission(dto: DoesUserHavePermissionRequest): Observable<Bool> {
        return from(this.permissionsCacheService.doesUserHavePermission(dto))
    }

    @GrpcMethod(PERMISSIONS_CACHE_SERVICE_NAME, 'addPermissionToUserInProject')
    public addPermissionToUserInProject(dto: AddPermissionsToUserRequest): Observable<Void> {
        return from(this.permissionsCacheService.addPermissionToUserInProject(dto))
    }

    @GrpcMethod(PERMISSIONS_CACHE_SERVICE_NAME, 'removePermissionsFromRole')
    public removePermissionsFromRole(dto: RemovePermissionsFromRoleRequest): Observable<Void> {
        return from(this.permissionsCacheService.removePermissionsFromRole(dto))
    }

    @GrpcMethod(PERMISSIONS_CACHE_SERVICE_NAME, 'removeRolesFromUser')
    public removeRolesFromUser(dto: RemoveRolesFromUserRequest): Observable<Void> {
        return from(this.permissionsCacheService.removeRolesFromUser(dto))
    }

    @GrpcMethod(PERMISSIONS_CACHE_SERVICE_NAME, 'deleteRole')
    public deleteRole(dto: RoleId): Observable<Void> {
        return from(this.permissionsCacheService.deleteRole(dto))
    }

}