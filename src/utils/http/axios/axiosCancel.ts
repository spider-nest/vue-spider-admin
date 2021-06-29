import type { AxiosRequestConfig, Canceler } from "axios";

import axios from "axios";

import { isFunction } from "@/utils/is";

let pendingMap = new Map<string, Canceler>();

const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join("&");

export default class AxiosCanceler {
  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      // 如果有该请求，则需要被取消和删除
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  addPending(config: AxiosRequestConfig) {
    this.removePending(config);

    const url = getPendingUrl(config);

    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          // 如果当前没有该请求，则添加它
          pendingMap.set(url, cancel);
        }
      });
  }

  removeAllPending() {
    pendingMap.forEach((cancel) => {
      cancel && isFunction(cancel) && cancel();
    });
    pendingMap.clear();
  }

  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
