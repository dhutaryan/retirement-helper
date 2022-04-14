import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async getOneByEmail(email: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async getOneById(id: string): Promise<User> {
    return this.prisma.user.findUnique({ where: { id } });
  }
}
