import {
  ExecutionContext,
  CallHandler,
  UnauthorizedException,
  NestInterceptor,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { FastifyRequest as Request } from 'fastify';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthInterceptor implements NestInterceptor {
  constructor(private configService: ConfigService) {}

  async intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest() as Request;
    const auth = req.headers['authorization'];
    if (auth !== (await this.configService.get('app.secureKey'))) {
      throw new UnauthorizedException();
    }
    return next.handle();
  }
}
