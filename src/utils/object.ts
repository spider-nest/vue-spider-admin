import { isObject } from "@/utils/is";

// 对象深合并
export function deepMerge<T = any>(src: any = {}, target: any = {}): T {
  let key: string;
  for (key in target) {
    src[key] = isObject(src[key])
      ? deepMerge(src[key], target[key])
      : (src[key] = target[key]);
  }
  return src;
}

/**
 * 将一个对象作为参数添加到一个 URL 中
 * @param baseUrl
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: 3, b: 4}
 *  httpBuildQuery("www.baidu.com", obj)
 *  ==> www.baidu.com?a=3&b=4
 */
export function httpBuildQuery(baseUrl: string, obj: any): string {
  let parameters = "";
  for (const key in obj) {
    parameters += `${key}=${encodeURIComponent(obj[key])}&`;
  }
  parameters = parameters.replace(/&$/, "");
  return /\?$/.test(baseUrl)
    ? baseUrl + parameters
    : baseUrl.replace(/\/?$/, "?") + parameters;
}
