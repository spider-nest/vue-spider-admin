import { isObject } from "/@/utils/is";

/**
 * Adding an object as a parameter to a URL
 * @param baseUrl
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: 3, b: 4}
 *  httpBuildQuery("www.baidu.com", obj)
 *  ==> www.baidu.com?a=3&b=4
 */
export function httpBuildQuery(baseUrl: string, obj: Object): string {
  let parameters = "";
  for (const key in obj) {
    parameters += `${key}=${encodeURIComponent(obj[key])}&`;
  }
  parameters = parameters.replace(/&$/, "");
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, "?") + parameters;
}

export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  }
  return src;
}
