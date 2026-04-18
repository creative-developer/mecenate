export type ApiErrorPayload = {
  code?: string;
  message: string;
};

export type ApiErrorResponse = {
  ok: false;
  error: ApiErrorPayload;
};

export type ApiSuccessResponse<TData> = {
  ok: true;
  data: TData;
};

export type ApiResponse<TData> = ApiSuccessResponse<TData> | ApiErrorResponse;

export class ApiClientError extends Error {
  readonly status?: number;
  readonly code?: string;
  readonly details?: unknown;

  constructor(params: { message: string; status?: number; code?: string; details?: unknown }) {
    super(params.message);
    this.name = 'ApiClientError';
    this.status = params.status;
    this.code = params.code;
    this.details = params.details;
  }
}

export enum HTTP_STATUS_CODES {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  TOO_MANY_REQUESTS = 429,
  INTERNAL_SERVER_ERROR = 500,
  BAD_GATEWAY = 502,
  SERVICE_UNAVAILABLE = 503,
  GATEWAY_TIMEOUT = 504,
}
