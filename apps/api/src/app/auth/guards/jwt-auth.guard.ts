import {
  applyDecorators,
  CanActivate,
  ExecutionContext,
  Injectable,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

export const Auth = () => applyDecorators(UseGuards(JwtAuthGuard));

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') implements CanActivate {
  canActivate(context: ExecutionContext) {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }
}
