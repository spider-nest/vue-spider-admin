import type { AxiosResponse } from "axios";

import type { RequestOptions, Result } from "./types";
import type { AxiosTransform, CreateAxiosOptions } from "./axiosTransform";

import { deepMerge, httpBuildQuery } from "@/utils/object";
import { isString } from "@/utils/is";

import { ContentTypeEnum, ResultEnum, RequestEnum } from "@/enums/httpEnum";

import { useErrorMessage } from "@/hooks/web/useMessage";

import { getToken } from "@/utils/auth";

import SAxios from "./Axios";
import { joinTimestamp, formatRequestDate } from "./helper";
import checkStatus from "./checkStatus";

const transform: AxiosTransform = {
  transformRequestHook: (
    res: AxiosResponse<Result>,
    options: RequestOptions
  ) => {
    const { isTransformResponse, isReturnNativeResponse } = options;

    if (isReturnNativeResponse) {
      return res;
    }

    if (!isTransformResponse) {
      return res.data;
    }

    const { data } = res;
    if (!data) {
      throw new Error("请求失败");
    }

    const { code, message } = data;

    const hasSuccess =
      data && Reflect.has(data, "code") && code === ResultEnum.SUCCESS;
    if (hasSuccess) {
      return data.data;
    }

    let timeoutMsg = "";
    switch (code) {
      case ResultEnum.TIMEOUT:
        timeoutMsg = "请求超时";
        break;
      default:
        if (message) {
          timeoutMsg = message;
        }
        break;
    }

    useErrorMessage(timeoutMsg);

    throw new Error(timeoutMsg || "请求失败");
  },

  beforeRequestHook: (config, options) => {
    const { apiUrl, joinParamsToUrl, formatDate, joinTime = true } = options;

    if (apiUrl && isString(apiUrl)) {
      config.url = `${apiUrl}${config.url}`;
    }

    const params = config.params || {};
    if (config.method?.toUpperCase() === RequestEnum.GET) {
      if (isString(params)) {
        // 兼容 restful 风格
        config.url = `${config.url}${params}${joinTimestamp(joinTime, true)}`;
        config.params = undefined;
      } else {
        // 给 get 请求加上时间戳参数，避免从缓存中拿数据
        config.params = Object.assign(
          params || {},
          joinTimestamp(joinTime, false)
        );
      }
    } else {
      if (isString(params)) {
        // 兼容 restful 风格
        config.url = config.url + params;
        config.params = undefined;
      } else {
        formatDate && formatRequestDate(params);
        config.data = params;
        config.params = undefined;
        if (joinParamsToUrl) {
          config.url = httpBuildQuery(config.url as string, config.data);
        }
      }
    }

    return config;
  },

  requestInterceptors: (config, options) => {
    const token = getToken();
    if (token && options?.requestOptions?.withToken !== false) {
      config.headers.Authorization = options.authenticationScheme
        ? `${options.authenticationScheme} ${token}`
        : token;
    }
    return config;
  },

  responseInterceptors: (res: AxiosResponse<any>) => {
    return res;
  },

  responseInterceptorsCatch: (error: any) => {
    const { response, code, message } = error || {};
    const msg: string = response?.data?.error?.message ?? "";
    const err: string = error?.toString?.() ?? "";
    let errMessage = "";

    try {
      if (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) {
        errMessage = "请求超时";
      }
      if (err?.includes("Network Error")) {
        errMessage = "网络错误";
      }

      if (errMessage) {
        useErrorMessage(errMessage);
        return Promise.reject(error);
      }
    } catch (error) {
      throw new Error(error);
    }

    checkStatus(error?.response?.status, msg);
    return Promise.reject(error);
  },
};

function createAxios(options?: Partial<CreateAxiosOptions>) {
  return new SAxios(
    deepMerge(
      {
        // Bearer
        authenticationScheme: "",
        timeout: 0,
        headers: { "Content-Type": ContentTypeEnum.JSON },
        transform,
        requestOptions: {
          isReturnNativeResponse: false,
          isTransformResponse: true,
          joinParamsToUrl: false,
          formatDate: true,
          apiUrl: __VITE_ENV__.apiPrefix,
          joinTime: true,
          ignoreCancelToken: true,
          withToken: true,
        },
      },
      options || {}
    )
  );
}

const defaultHttp = createAxios();

export default defaultHttp;
