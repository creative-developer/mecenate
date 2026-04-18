import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

import { ApiClientError, ApiErrorResponse } from './types';

type AuthTokenGetter = () => string | null | undefined;

let authTokenGetter: AuthTokenGetter = () => null;

export const setApiAuthTokenGetter = (getter: AuthTokenGetter) => {
  authTokenGetter = getter;
};

const withAuthHeader = (config: InternalAxiosRequestConfig) => {
  const token = authTokenGetter();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
};

const mapAxiosError = (error: AxiosError<ApiErrorResponse>) => {
  const status = error.response?.status;
  const payload = error.response?.data;

  if (payload && payload.ok === false) {
    return new ApiClientError({
      message: payload.error.message,
      status,
      code: payload.error.code,
      details: payload,
    });
  }

  return new ApiClientError({
    message: error.message || 'Request failed',
    status,
    details: error.response?.data,
  });
};

export const registerApiInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use(withAuthHeader);
  instance.interceptors.response.use(
    response => response,
    (error: AxiosError<ApiErrorResponse>) => Promise.reject(mapAxiosError(error)),
  );

  return instance;
};
