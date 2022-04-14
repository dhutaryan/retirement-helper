import { AxiosResponse } from 'axios';

import { User } from '@shared/models';
import $http from '../http';

export class UsersService {
  static me(): Promise<AxiosResponse<User>> {
    return $http.get('/users/me');
  }
}
