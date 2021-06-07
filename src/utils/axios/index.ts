import type { AxiosResponse, AxiosError } from "axios";

import type {
  RequestOptions,
  Result,
  AxiosTransform,
  AxiosRequestOption,
} from "./types";

import AxiosModule from "./module";
import handleStatus from "./status";
import {
  HttpCodeEnum,
  MethodEnum,
  CodeEnum,
  ContentTypeEnum,
} from "/@/enums/http";
import { httpBuildQuery, deepMerge } from "/@/utils";
import { isString } from "/@/utils/is";
import { getToken } from "/@/utils/auth";
import { useSetting } from "/@/hooks/useSetting";
import { useI18n } from "/@/hooks/useLocale";
import { useInfoFeedback } from "/@/hooks/useInfoFeedback";
import { sError, sLog } from "/@/utils/console";

const { apiPrefix } = useSetting();
const { SMessage, SModalError } = useInfoFeedback();
const { t } = useI18n();

function createNow(withTimestamp: boolean, returnString = false) {
  if (!withTimestamp) {
    return returnString ? "" : {};
  }
  const timestamp = new Date().getTime();
  return returnString ? `?_t=${timestamp}` : { _t: timestamp };
}

const transform: AxiosTransform = {
  preRequestHook: (config, options) => {
    const { withPrefix, withQuery, withTimestamp = true } = options;

    if (withPrefix) {
      config.url = `${apiPrefix}${config.url}`;
    }

    const params = config.params || {};
    if (config.method?.toUpperCase() === MethodEnum.GET) {
      if (isString(params)) {
        config.url = `${config.url + params}${createNow(withTimestamp, true)}`;
        config.params = undefined;
      } else {
        config.params = Object.assign(params, createNow(withTimestamp, false));
      }
    } else {
      if (isString(params)) {
        config.url = config.url + params;
        config.params = undefined;
      } else {
        config.data = params;
        config.params = undefined;
        if (withQuery) {
          config.url = httpBuildQuery(config.url as string, config.data);
        }
      }
    }

    return config;
  },
  requestSuccessfulHook: (
    result: AxiosResponse<Result>,
    options: RequestOptions
  ) => {
    const { withFullResult, widthNativeResponse } = options;
    if (widthNativeResponse) {
      return result;
    }

    const responseData = result.data;
    if (withFullResult) {
      return responseData;
    }

    if (!responseData) {
      sError(t("http.systemFailure"), true);
    }

    const { code, data, message } = responseData;
    if (
      responseData &&
      Reflect.has(responseData, "code") &&
      code === CodeEnum.SUCCESS
    ) {
      return data;
    }

    if (code === CodeEnum.ERROR) {
      if (message) {
        SMessage.error(responseData.message);
        sError(message, true);
      } else {
        const msg = t("feedback.operationFailure");
        SMessage.error(msg);
        sError(msg, true);
      }
    } else if (code === CodeEnum.TIMEOUT) {
      const timeoutMsg = t("http.systemFailure");
      SModalError({
        title: t("feedback.operationFailed"),
        content: timeoutMsg,
      });
      sError(timeoutMsg, true);
    }
    sError(t("http.systemFailure"), true);
  },
  requestInterceptors: (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  responseInterceptorsCatch: (error: AxiosError) => {
    const { response, code, message } = error || {};
    const msg: string = response?.data?.error?.message ?? "";
    const err: string = error?.toString?.() ?? "";
    try {
      if (
        (code === "ECONNABORTED" && message.indexOf("timeout") !== -1) ||
        err?.includes("Network Error")
      ) {
        SMessage.error(t(`http.${HttpCodeEnum.REQUEST_TIMEOUT}`));
      }
    } catch (error) {
      sError(error, true);
    }
    sLog(msg);
    handleStatus(error?.response?.status || 0, msg);
    return Promise.reject(error);
  },
};

export default ((options: Partial<AxiosRequestOption> = {}) => {
  return new AxiosModule(
    deepMerge(
      {
        timeout: 0,
        headers: { "Content-Type": ContentTypeEnum.JSON },
        transform,
        requestOptions: {
          withPrefix: true,
          withQuery: false,
          withTimestamp: true,
          withFullResult: false,
          widthNativeResponse: false,
          ignoreCancelToken: true,
          infoFeedbackMode: "message",
        },
      },
      options
    )
  );
})();
