import { pickBy, cloneDeep } from "lodash";

import { isObject, isArray, isUndefined, isString } from "@/utils/is";

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

/**
 * 从对象中获取有效值
 * @param obj {{}} { a: 1, b: "2", c: null, d: undefined, e: []}
 * @param props {string[]} ["a", "c"]
 * @param deep {boolean} 深克隆
 * @returns {Dictionary<unknown>} { a: 1 }
 */
export function pickByValid(obj: Recordable, props: string[], deep = false) {
  if (!isObject(obj)) {
    throw new Error("非对象类型");
  }
  if (!isArray(props)) {
    throw new Error("非数组类型");
  }

  const result = pickBy(obj, (value, index) => {
    let flag = true;
    if (!props.includes(index)) {
      flag = false;
    } else if (isUndefined(value)) {
      flag = false;
    } else if (isString(value) && (value as string).length === 0) {
      flag = false;
    } else if (isArray(value) && (value as []).length === 0) {
      flag = false;
    } else if (isObject(value) && Object.keys(value).length === 0) {
      flag = false;
    }
    return flag;
  });

  if (deep) {
    return cloneDeep(result);
  }

  return result;
}
