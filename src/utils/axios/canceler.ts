import type { AxiosRequestConfig, Canceler } from "axios";

import axios from "axios";

import { isFunction } from "/@/utils/is";

let pendingMap = new Map<string, Canceler>();
const getPendingUrl = (config: AxiosRequestConfig) =>
  [config.method, config.url].join("&");

export default class {
  addPending(config: AxiosRequestConfig) {
    this.removePending(config);
    const url = getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ||
      new axios.CancelToken((cancel) => {
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel);
        }
      });
  }

  removeAllPending() {
    pendingMap.forEach((canceler) => {
      canceler && isFunction(canceler) && canceler();
    });
    pendingMap.clear();
  }

  removePending(config: AxiosRequestConfig) {
    const url = getPendingUrl(config);

    if (pendingMap.has(url)) {
      const canceler = pendingMap.get(url);
      canceler && canceler(url);
      pendingMap.delete(url);
    }
  }

  reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
