import { Exclude } from 'class-transformer';

import { User } from '@shared/models';

export class UserDto implements User {
  id: string;
  email: string;

  @Exclude()
  password: string;

  name: string;
  createdAt: string;
  updatedAt: string;
}
