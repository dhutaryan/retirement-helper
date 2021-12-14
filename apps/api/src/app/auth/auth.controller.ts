import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseFilters,
  UseGuards,
} from '@nestjs/common';
import { Response, Request } from 'express';

import { User } from '@prisma/client';
import { AuthTokens, TokenData, TokenResponse } from '@shared/models';
import { AuthService } from './services/auth.service';
import { PrismaExceptionFilter } from '../core/filters/prisma-exception/prisma-exception.filter';
import { SignUpDto } from './dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { Cookies, Token } from '../core/decorators';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  @UseFilters(new PrismaExceptionFilter())
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }

  @Post('login')
  @UseGuards(LocalAuthGuard)
  async login(
    @Req() request: Request,
    @Res() response: Response,
  ): Promise<Response<TokenResponse>> {
    const tokens = await this.authService.generateTokens(request.user as User);

    return this.sendAccessTokenWithCookies(response, tokens);
  }

  @Post('refresh')
  async refresh(
    @Token() tokenData: TokenData,
    @Res() response: Response,
    @Cookies('refresh') refreshToken: string,
    @Cookies('fingerprint') fingerprint: string,
  ): Promise<Response<TokenResponse>> {
    const tokens = await this.authService.refreshTokens(
      { id: tokenData.sub, email: tokenData.email },
      refreshToken,
      fingerprint,
    );

    return this.sendAccessTokenWithCookies(response, tokens);
  }

  @Post('logout')
  async logout(@Cookies('refresh') refreshToken: string): Promise<void> {
    return this.authService.logout(refreshToken);
  }

  private sendAccessTokenWithCookies(
    response: Response,
    tokens: AuthTokens,
  ): Response<TokenResponse> {
    response.cookie('refresh', tokens.refreshToken, {
      sameSite: 'strict',
      httpOnly: true,
    });
    response.cookie('fingerprint', tokens.fingerprint, {
      sameSite: 'strict',
      httpOnly: true,
    });

    return response.send({ accessToken: tokens.accessToken });
  }
}
