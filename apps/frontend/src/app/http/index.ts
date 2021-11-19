import axios from 'axios';

import { environment } from '@frontend/env/environment';

export const $http = axios.create({
  withCredentials: true,
  baseURL: environment.api,
});
