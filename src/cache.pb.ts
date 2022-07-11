/* eslint-disable */
import { GrpcMethod, GrpcStreamMethod } from "@nestjs/microservices";
import Long from "long";
import * as _m0 from "protobufjs/minimal";
import { Observable } from "rxjs";
import { Any } from "./google/protobuf/any.pb";

export const protobufPackage = "cache";

export interface Void {}

export interface Cache {
  data: string;
}

export interface CacheKey {
  packageName: string;
  rpcMethod: string;
  rpcArg: string;
}

export interface SetCacheRequest {
  key: CacheKey | undefined;
  data: Any[];
  ttl?: number | undefined;
}

export const CACHE_PACKAGE_NAME = "cache";

export interface CacheServiceClient {
  getCacheByKey(request: CacheKey): Observable<Cache>;

  setCacheByKey(request: SetCacheRequest): Observable<Cache>;
}

export interface CacheServiceController {
  getCacheByKey(request: CacheKey): Promise<Cache> | Observable<Cache> | Cache;

  setCacheByKey(
    request: SetCacheRequest
  ): Promise<Cache> | Observable<Cache> | Cache;
}

export function CacheServiceControllerMethods() {
  return function (constructor: Function) {
    const grpcMethods: string[] = ["getCacheByKey", "setCacheByKey"];
    for (const method of grpcMethods) {
      const descriptor: any = Reflect.getOwnPropertyDescriptor(
        constructor.prototype,
        method
      );
      GrpcMethod("CacheService", method)(
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
      GrpcStreamMethod("CacheService", method)(
        constructor.prototype[method],
        method,
        descriptor
      );
    }
  };
}

export const CACHE_SERVICE_NAME = "CacheService";

if (_m0.util.Long !== Long) {
  _m0.util.Long = Long as any;
  _m0.configure();
}
