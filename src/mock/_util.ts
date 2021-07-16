export interface requestParams {
  method: string;
  body: any;
  headers?: { authorization?: string };
  query: any;
}

export const apiPrefix = "/api";

export function successfulResult<T = any>(data: T, { message = "ok" } = {}) {
  return {
    code: 0,
    data,
    message,
  };
}

export function failureResult(
  message = "Failure",
  { code = -1, data = null } = {}
) {
  return {
    code,
    data,
    message,
  };
}

export function pagination<T = any>(
  page: number,
  pageSize: number,
  records: T[]
): T[] {
  const offset = (page - 1) * pageSize;
  return offset + pageSize >= records.length
    ? records.slice(offset, records.length)
    : records.slice(offset, offset + pageSize);
}

export function successfulListResult<T = any>(
  page: number,
  pageSize: number,
  records: T[]
) {
  const lists = pagination(page, pageSize, records);
  return {
    ...successfulResult({
      lists,
      total: records.length,
    }),
  };
}

export function getRequestToken({
  headers,
}: requestParams): string | undefined {
  return headers?.authorization;
}
