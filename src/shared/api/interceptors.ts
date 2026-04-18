import { AxiosError, AxiosInstance, AxiosResponse } from 'axios';

import { ApiClientError, ApiErrorResponse } from './types';

type AuthTokenGetter = () => string | null | undefined;

let authTokenGetter: AuthTokenGetter = () => null;

export const setApiAuthTokenGetter = (getter: AuthTokenGetter) => {
  authTokenGetter = getter;
};

export const resolveApiAuthToken = () => authTokenGetter();

export const onResponse = <TResponse>(response: AxiosResponse<TResponse>) => response;

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

export const onResponseError = (error: AxiosError<ApiErrorResponse>) => Promise.reject(mapAxiosError(error));

export const registerApiInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.response.use(onResponse, onResponseError);

  return instance;
};
