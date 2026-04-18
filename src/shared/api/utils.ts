import type { RawAxiosRequestHeaders } from 'axios';

export const getHeaders = (): RawAxiosRequestHeaders => ({
  Accept: 'application/json',
  'Content-Type': 'application/json',
});
