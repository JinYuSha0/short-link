import {
  ExecutionContext,
  CallHandler,
  ForbiddenException,
} from '@nestjs/common';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { Observable } from 'rxjs';
import * as Utils from '@utils/common';
import { FastifyRequest as Request } from 'fastify';

type LimitStage = {
  count: number;
  duration: number;
};

export function IpAccessLimitInterceptor(limit: LimitStage): any {
  return class Interceptor extends CacheInterceptor {
    async intercept(
      context: ExecutionContext,
      next: CallHandler<any>,
    ): Promise<Observable<any>> {
      const req = context.switchToHttp().getRequest() as Request;
      const ip = Utils.getReallyIp(req);
      const controllerName = Utils.getControllerName(req);
      const keyName = `ip.limit.${controllerName}.${ip}`;
      let currCount = (await this.cacheManager.get(keyName)) || 0;
      const { count, duration } = limit;
      await this.cacheManager.set(keyName, ++currCount, {
        ttl: duration,
      });
      if (currCount > count) {
        throw new ForbiddenException();
      }
      return next.handle();
    }
  };
}
