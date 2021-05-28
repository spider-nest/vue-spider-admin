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
  const offset = (page - 1) * Number(pageSize);
  return offset + Number(pageSize) >= records.length
    ? records.slice(offset, records.length)
    : records.slice(offset, offset + Number(pageSize));
}

export function successfulList<T = any>(
  page: number,
  pageSize: number,
  records: T[],
  { message = "ok" } = {}
) {
  const items = pagination(page, pageSize, records);
  return {
    ...successfulResult({
      items,
      total: records.length,
    }),
    message,
  };
}
