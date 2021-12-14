import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';
import { compare, hashSync } from 'bcrypt';
import { v4 } from 'uuid';
import { verify, VerifyErrors } from 'jsonwebtoken';

import { AuthTokens, ErrorCode } from '@shared/models';
import { SignUpDto } from '../dto/sign-up.dto';
import { UsersService } from '../../users/users.service';
import { TokenService } from './token.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly tokensService: TokenService,
    private readonly configService: ConfigService,
  ) {}

  async signUp(payload: SignUpDto): Promise<void> {
    const hashedPassword = hashSync(payload.password, 10);

    await this.prismaService.user.create({
      data: { ...payload, password: hashedPassword },
    });
    return;
  }

  async generateTokens(payload: Partial<User>): Promise<AuthTokens> {
    const authToken = this.generateAuthTokens(payload);

    await this.tokensService.save(
      payload.id,
      authToken.refreshToken,
      authToken.fingerprint,
    );

    return authToken;
  }

  async refreshTokens(
    user: Partial<User>,
    token: string,
    fingerprint: string,
  ): Promise<AuthTokens> {
    const foundToken = await this.tokensService.findFirst({
      token,
      fingerprint,
    });

    if (foundToken) {
      await this.tokensService.remove(foundToken.id);
    }

    verify(
      foundToken?.token,
      this.configService.get<string>('REFRESH_SECRET'),
      (error: VerifyErrors) => {
        if (error) {
          throw new HttpException(
            {
              errorCode: ErrorCode.INVALID_REFRESH_TOKEN,
              message: 'Invalid refresh token',
            },
            HttpStatus.BAD_REQUEST,
          );
        }
      },
    );

    const authToken = this.generateAuthTokens(user);

    await this.tokensService.save(
      user.id,
      authToken.refreshToken,
      authToken.fingerprint,
    );

    return authToken;
  }

  async logout(token: string): Promise<void> {
    await this.tokensService.removeByToken(token);
    return;
  }

  async validateUser(email: string, pass: string): Promise<User> {
    const user = await this.usersService.getOneByEmail(email);

    if (!user) {
      return null;
    }

    const match = await compare(pass, user.password);

    if (!match) {
      return null;
    }

    return user;
  }

  private generateAuthTokens(payload: Partial<User>): AuthTokens {
    return {
      accessToken: this.tokensService.generateAccessToken(payload),
      refreshToken: this.tokensService.generateRefreshToken(payload),
      fingerprint: v4(),
    };
  }
}
