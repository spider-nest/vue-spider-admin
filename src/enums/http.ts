export enum HttpCodeEnum {
  UNAUTHORIZED = 401,
  NOT_FOUND = 404,
  REQUEST_TIMEOUT = 408,
  GATEWAY_TIMEOUT = 504,
}

export enum CodeEnum {
  ERROR = -1,
  SUCCESS = 0,
  TIMEOUT = 50004,
}

export enum MethodEnum {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export enum ContentTypeEnum {
  JSON = "application/json;charset=UTF-8",
  FORM_URLENCODED = "application/x-www-form-urlencoded;charset=UTF-8",
  FORM_DATA = "multipart/form-data;charset=UTF-8",
}
