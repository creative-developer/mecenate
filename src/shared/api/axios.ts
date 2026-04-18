import axios from 'axios';

import { appConfig } from '@shared/appConfig';

import { registerApiInterceptors } from './interceptors';

const axiosInstance = axios.create({
  baseURL: appConfig.api.baseUrl,
  timeout: appConfig.api.requestTimeoutMs,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

export const apiClient = registerApiInterceptors(axiosInstance);
