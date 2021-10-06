import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { hashSync } from 'bcrypt';

import { SignUpDto } from '../dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signUp(payload: SignUpDto): Promise<void> {
    const hashedPassword = hashSync(payload.password, 10);

    await this.prisma.user.create({
      data: { ...payload, password: hashedPassword },
    });
    return;
  }
}
