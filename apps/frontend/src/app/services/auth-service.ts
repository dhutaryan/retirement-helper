import { AxiosResponse } from 'axios';

import { $http } from '../http';

export class AuthService {
  static async signUp(
    name: string,
    email: string,
    password: string
  ): Promise<AxiosResponse<void>> {
    return $http.post<void>(`/auth/sign-up`, { name, email, password });
  }
}
