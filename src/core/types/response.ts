import { User } from '@prisma/client';

export interface ResponseStatus {}

export interface RegistrationStatus extends ResponseStatus {
  data?: User;
  token?: string;
}

export interface LoginStatus extends ResponseStatus {
  data?: User;
  token?: string;
}

export interface TokenStatus extends ResponseStatus {}

export interface ApiResponse {
  ok: boolean;
  path: string;
  statusCode: string;
}

export interface ApiOkResponse extends ApiResponse {
  result: PaginationResponse<any> | any;
}

export interface ApiErrorResponse extends ApiResponse {
  result: PaginationResponse<any> | any;
}

export interface PaginationResponse<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}
