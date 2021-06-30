import type { AxiosRequestConfig, AxiosResponse } from "axios";

import type { RequestOptions, Result } from "./types";

// 按顺序执行
export abstract class AxiosTransform {
  // 请求前处理
  beforeRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions
  ) => AxiosRequestConfig;

  // 请求前的拦截器
  requestInterceptors?: (
    config: AxiosRequestConfig,
    options: CreateAxiosOptions
  ) => AxiosRequestConfig;

  // 请求前的拦截器的错误处理
  requestInterceptorsCatch?: (error: Error) => void;

  // 请求后的拦截器
  responseInterceptors?: (res: AxiosResponse<any>) => AxiosResponse<any>;

  // 请求后的拦截器的错误处理
  responseInterceptorsCatch?: (error: Error) => void;

  // 请求成功后处理
  transformRequestHook?: (
    res: AxiosResponse<Result>,
    options: RequestOptions
  ) => any;

  // 请求失败后处理
  requestCatchHook?: (e: Error, options: RequestOptions) => Promise<any>;
}

export interface CreateAxiosOptions extends AxiosRequestConfig {
  authenticationScheme?: string;
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}
