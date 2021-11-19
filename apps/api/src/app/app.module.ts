import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';

import { AuthModule } from './auth/auth.module';

@Module({
  imports: [PrismaModule.forRoot({ isGlobal: true }), AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
