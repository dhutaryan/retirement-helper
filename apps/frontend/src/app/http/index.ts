import axios, { AxiosError, AxiosRequestConfig } from 'axios';

import { environment } from '@frontend/env/environment';
import { AuthService } from '../services';
import { store } from '../store';
import { AppActionCreators } from '@frontend/store/reducers/app/action-creators';

const $http = axios.create({
  withCredentials: true,
  baseURL: environment.api,
});

$http.interceptors.request.use((config: AxiosRequestConfig) => {
  const { accessToken } = store.getState().app;
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

$http.interceptors.response.use(
  (config) => config,
  (error: AxiosError) => {
    const originalRequest = error.config;

    if (error.response?.status === 401) {
      return AuthService.refreshToken()
        .then(({ data }) => {
          store.dispatch(AppActionCreators.setAccessToken(data.accessToken));
          return $http.request(originalRequest);
        })
        .catch(() => {
          store.dispatch(AppActionCreators.logout());
        });
    }

    return;
  },
);

export default $http;
