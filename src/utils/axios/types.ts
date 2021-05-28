import type { AxiosRequestConfig, AxiosResponse } from "axios";

export type InfoFeedbackMode = "none" | "modal" | "message" | undefined;

export interface Result<T = any> {
  code: number;
  message: string;
  data: T;
}

export interface UploadFileParams {
  file: File | Blob;
  data?: Recordable;
  name?: string;
  filename?: string;
  [key: string]: any;
}

export interface RequestOptions {
  withPrefix?: boolean; // url with prefix
  withQuery?: boolean; // parameters to url
  withTimestamp?: boolean; // add timestamp
  withFullResult?: boolean; // return full result
  widthNativeResponse?: boolean; // return native response headers
  ignoreCancelToken?: boolean; // Ignore duplicate requests
  infoFeedbackMode?: InfoFeedbackMode;
}

export abstract class AxiosTransform {
  /**
   * Request pre-processing parameters
   */
  preRequestHook?: (
    config: AxiosRequestConfig,
    options: RequestOptions
  ) => AxiosRequestConfig;

  /**
   * Processing results after a successful request
   */
  requestSuccessfulHook?: (
    result: AxiosResponse<Result>,
    options: RequestOptions
  ) => any;

  /**
   * Processing results after request failure
   */
  requestFailureHook?: (e: Error) => Promise<any>;

  /**
   * Pre-request interceptor
   */
  requestInterceptors?: (config: AxiosRequestConfig) => AxiosRequestConfig;

  /**
   * Rear-request interceptor
   */
  responseInterceptors?: (result: AxiosResponse<any>) => AxiosResponse<any>;

  /**
   * Pre-request interceptor error handling
   */
  requestInterceptorsCatch?: (error: Error) => void;

  /**
   * Rear-request interceptor error handling
   */
  responseInterceptorsCatch?: (error: Error) => void;
}

export interface AxiosRequestOption extends AxiosRequestConfig {
  transform?: AxiosTransform;
  requestOptions?: RequestOptions;
}
