/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";

export const protobufPackage = "cache";

export interface Void {}

export interface Cache {
  jsonData: string;
}

export interface EntityKey {
  entityName: string;
  entityId: string;
}

export interface SetEntityByKey {
  entityKey: EntityKey | undefined;
  jsonData: string;
  ttl?: number | undefined;
}

export interface DoesUserHavePermissionRequest {
  userId: string;
  projectId: string;
  permissionId: number;
}

export interface AddPermissionsToUserRequest {
  userId: string;
  projectId: string;
  roleId?: string | undefined;
  permissionId: number;
}

export interface RemovePermissionsFromRoleRequest {
  roleId: string;
  permissionsIds: number[];
}

export interface RemovePermissionsFromUserRequest {
  userId: string;
  permissionsIds: number[];
}

export interface RemoveRolesFromUserRequest {
  userId: string;
  rolesIds: string[];
}

export interface Bool {
  bool?: boolean | undefined;
}

export interface RoleId {
  roleId: string;
}

export const CACHE_PACKAGE_NAME = "cache";

export interface EntitiesCacheServiceClient {
  getEntityByKey(request: EntityKey): Observable<Cache>;

  setEntityByKey(request: SetEntityByKey): Observable<Void>;

  delEntityByKey(request: EntityKey): Observable<Void>;
}

export interface EntitiesCacheServiceController {
  getEntityByKey(
    request: EntityKey
  ): Promise<Cache> | Observable<Cache> | Cache;

  setEntityByKey(
    request: SetEntityByKey
  ): Promise<Void> | Observable<Void> | Void;

  delEntityByKey(request: EntityKey): Promise<Void> | Observable<Void> | Void;
}

export function EntitiesCacheServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "getEntityByKey",
      "setEntityByKey",
      "delEntityByKey",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("EntitiesCacheService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("EntitiesCacheService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const ENTITIES_CACHE_SERVICE_NAME = "EntitiesCacheService";

export interface PermissionsCacheServiceClient {
  doesUserHavePermission(
    request: DoesUserHavePermissionRequest
  ): Observable<Bool>;

  addPermissionToUserInProject(
    request: AddPermissionsToUserRequest
  ): Observable<Void>;

  removePermissionsFromUser(
    request: RemovePermissionsFromUserRequest
  ): Observable<Void>;

  removePermissionsFromRole(
    request: RemovePermissionsFromRoleRequest
  ): Observable<Void>;

  removeRolesFromUser(request: RemoveRolesFromUserRequest): Observable<Void>;

  deleteRole(request: RoleId): Observable<Void>;
}

export interface PermissionsCacheServiceController {
  doesUserHavePermission(
    request: DoesUserHavePermissionRequest
  ): Promise<Bool> | Observable<Bool> | Bool;

  addPermissionToUserInProject(
    request: AddPermissionsToUserRequest
  ): Promise<Void> | Observable<Void> | Void;

  removePermissionsFromUser(
    request: RemovePermissionsFromUserRequest
  ): Promise<Void> | Observable<Void> | Void;

  removePermissionsFromRole(
    request: RemovePermissionsFromRoleRequest
  ): Promise<Void> | Observable<Void> | Void;

  removeRolesFromUser(
    request: RemoveRolesFromUserRequest
  ): Promise<Void> | Observable<Void> | Void;

  deleteRole(request: RoleId): Promise<Void> | Observable<Void> | Void;
}

export function PermissionsCacheServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = [
      "doesUserHavePermission",
      "addPermissionToUserInProject",
      "removePermissionsFromUser",
      "removePermissionsFromRole",
      "removeRolesFromUser",
      "deleteRole",
    ];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("PermissionsCacheService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
    const grpcStreamMethods: string[] = [];
    for (const method of grpcStreamMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcStreamMethod("PermissionsCacheService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const PERMISSIONS_CACHE_SERVICE_NAME = "PermissionsCacheService";

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
