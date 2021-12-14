import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';

import { Token, User } from '@prisma/client';
import { Cron, CronExpression } from '@nestjs/schedule';

export interface TokenUpdate {
  userId: string;
  token: string;
  fingerprint: string;
  oldRefreshToken: string;
  oldFingerprint: string;
}

@Injectable()
export class TokenService {
  private accessExpiresIn = this.configService.get<string>('ACCESS_EXPIRES_IN');
  private refreshExpiresInSeconds = Number(
    this.configService.get<string>('REFRESH_EXPIRES_IN_SECONDS'),
  );

  constructor(
    private readonly jwtService: JwtService,
    private readonly prismaService: PrismaService,
    private readonly configService: ConfigService,
  ) {}

  async findFirst(refreshToken: Partial<Token>): Promise<Token> {
    return this.prismaService.token.findFirst({
      where: {
        AND: refreshToken,
      },
    });
  }

  async save(
    userId: string,
    token: string,
    fingerprint: string,
  ): Promise<void> {
    await this.prismaService.token.create({
      data: { userId, token, fingerprint },
    });

    return;
  }

  async remove(id: string): Promise<Token> {
    return this.prismaService.token.delete({
      where: { id },
    });
  }

  async removeByToken(token: string): Promise<Token> {
    return this.prismaService.token.delete({ where: { token } });
  }

  @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
  async removeExpiredTokens(): Promise<void> {
    const lessThanDate = new Date(
      Date.now() - this.refreshExpiresInSeconds * 1000,
    );

    await this.prismaService.token.deleteMany({
      where: { updatedAt: { lt: lessThanDate } },
    });
  }

  generateAccessToken(payload: Partial<User>): string {
    return this.jwtService.sign(
      {
        email: payload.email,
        sub: payload.id,
      },
      { expiresIn: this.accessExpiresIn },
    );
  }

  generateRefreshToken(payload: Partial<User>): string {
    return this.jwtService.sign(
      { email: payload.email },
      {
        expiresIn: this.refreshExpiresInSeconds,
        secret: this.configService.get<string>('REFRESH_SECRET'),
      },
    );
  }
}
