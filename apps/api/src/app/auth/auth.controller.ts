import { Body, Controller, Post, UseFilters } from '@nestjs/common';

import { AuthService } from './services/auth.service';
import { SignUpDto } from './dto/sign-up.dto';
import { PrismaExceptionFilter } from '../core/filters/prisma-exception/prisma-exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('sign-up')
  @UseFilters(new PrismaExceptionFilter())
  async signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this.authService.signUp(signUpDto);
  }
}
