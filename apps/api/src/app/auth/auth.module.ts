import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy, LocalStrategy } from './passport-strategies';
import { AuthService } from './services/auth.service';
import { TokenService } from './services/token.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('ACCESS_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('ACCESS_EXPIRES_IN'),
        },
      }),
      inject: [ConfigService],
    }),
    UsersModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService, LocalStrategy, JwtStrategy],
})
export class AuthModule {}
