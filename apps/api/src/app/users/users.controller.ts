import {
  ClassSerializerInterceptor,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';

import { TokenData, User } from '@shared/models';
import { UsersService } from './users.service';
import { Auth, Token } from '../core/decorators';
import { UserDto } from './dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('me')
  @Auth()
  @UseInterceptors(ClassSerializerInterceptor)
  async getMe(@Token() tokenObj: TokenData): Promise<User> {
    const user = await this.usersService.getOneById(tokenObj.sub);

    return plainToClass(UserDto, user);
  }
}
