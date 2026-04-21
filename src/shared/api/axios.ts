import axios, { AxiosRequestConfig, type AxiosRequestHeaders, type RawAxiosRequestHeaders } from 'axios';

import { appConfig } from '@shared/appConfig';

import { registerApiInterceptors, resolveApiAuthToken } from './interceptors';
import { getHeaders } from './utils';

const client = axios.create({
  baseURL: appConfig.api.baseUrl,
  withCredentials: true,
  timeout: appConfig.api.requestTimeoutMs,
  headers: { ...getHeaders() },
});

client.interceptors.request.use(
  config => {
    const mergedHeaders = { ...getHeaders(), ...(config.headers ?? {}) } as RawAxiosRequestHeaders;

    const token = resolveApiAuthToken();

    if (token && !mergedHeaders.Authorization) {
      mergedHeaders.Authorization = `Bearer ${token}`;
    }

    config.headers = mergedHeaders as unknown as AxiosRequestHeaders;

    return config;
  },
  error => Promise.reject(error),
);

export const apiClient = registerApiInterceptors(client);

export const get = <ResponseData>(resource: string, config?: AxiosRequestConfig) =>
  apiClient.get<ResponseData>(resource, {
    ...config,
    headers: { ...getHeaders(), ...(config?.headers ?? {}) },
  });

export const post = <ResponseData>(resource: string, data: AxiosRequestConfig['data'], config?: AxiosRequestConfig) =>
  apiClient.post<ResponseData>(resource, data, {
    ...config,
    headers: { ...getHeaders(), ...(config?.headers ?? {}) },
  });

export const patch = <ResponseData>(resource: string, data: AxiosRequestConfig['data'], config?: AxiosRequestConfig) =>
  apiClient.patch<ResponseData>(resource, data, {
    ...config,
    headers: { ...getHeaders(), ...(config?.headers ?? {}) },
  });

export const put = <ResponseData>(resource: string, data: AxiosRequestConfig['data'], config?: AxiosRequestConfig) =>
  apiClient.put<ResponseData>(resource, data, {
    ...config,
    headers: { ...getHeaders(), ...(config?.headers ?? {}) },
  });

export const del = (resource: string, config?: AxiosRequestConfig) =>
  apiClient.delete(resource, {
    ...config,
    headers: { ...getHeaders(), ...(config?.headers ?? {}) },
  });
