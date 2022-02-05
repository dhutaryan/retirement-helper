import { AxiosResponse } from 'axios';

import { TokenResponse } from '@shared/models';
import $http from '../http';

export class AuthService {
  static async signUp(
    name: string,
    email: string,
    password: string,
  ): Promise<AxiosResponse<void>> {
    return $http.post<void>(`/auth/sign-up`, { name, email, password });
  }

  static async login(
    email: string,
    password: string,
  ): Promise<AxiosResponse<TokenResponse>> {
    return $http.post<TokenResponse>(`/auth/login`, { email, password });
  }

  static async logout(): Promise<AxiosResponse<void>> {
    return $http.post<void>('/auth/logout', {});
  }

  static async refreshToken(): Promise<AxiosResponse<TokenResponse>> {
    return $http.post<TokenResponse>('/auth/refresh');
  }
}
