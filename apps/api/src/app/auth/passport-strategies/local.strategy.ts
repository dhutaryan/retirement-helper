import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { User } from '@prisma/client';
import { Strategy } from 'passport-local';

import { ErrorCode } from '@shared/models';
import { AuthService } from '../services/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email: string, password: string): Promise<User> {
    const user = await this.authService.validateUser(email, password);

    if (!user) {
      throw new HttpException(
        {
          errorCode: ErrorCode.INVALID_CREDENTIALS,
          message: 'Invalid credentials',
        },
        HttpStatus.BAD_REQUEST
      );
    }

    return user;
  }
}
