import {
  isArray as vIsArray,
  isSet as vIsSet,
  isMap as vIsMap,
  isDate as vIsDate,
  isFunction as vIsFunction,
  isString as vIsString,
  isSymbol as vIsSymbol,
  isPlainObject as vIsObject,
  isPromise as vIsPromise,
} from "@vue/shared";

const objectToString = Object.prototype.toString;
const toTypeString = (value: unknown): string => objectToString.call(value);

export const isArray = vIsArray;

export const isMap = (val: unknown): val is Map<any, any> => vIsMap(val);

export const isSet = (val: unknown): val is Set<any> => vIsSet(val);

export const isDate = (val: unknown): val is Date => vIsDate(val);

export const isFunction = (val: unknown): val is Function => vIsFunction(val);

export const isString = (val: unknown): val is string => vIsString(val);

export const isSymbol = (val: unknown): val is symbol => vIsSymbol(val);

export const isObject = (val: unknown): val is Record<any, any> =>
  vIsObject(val);

export const isPromise = <T = any>(val: unknown): val is Promise<T> =>
  vIsPromise(val);

export const is = (val: unknown, type: string) => {
  return toTypeString(val) === `[object ${type}]`;
};

export const isDefined = <T = unknown>(val?: T): val is T => {
  return val !== undefined && val !== null;
};

export const isUndefined = <T = unknown>(val?: T): val is T => {
  return !isDefined(val);
};

export function isEmpty<T = unknown>(val: T): val is T {
  if (isArray(val) || isString(val)) {
    return val.length === 0;
  }

  if (isMap(val) || isSet(val)) {
    return val.size === 0;
  }

  if (isObject(val)) {
    return Object.keys(val).length === 0;
  }

  return false;
}

export function isNumber(val: unknown): val is number {
  return is(val, "Number");
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, "Boolean");
}

export function isRegExp(val: unknown): val is RegExp {
  return is(val, "RegExp");
}

export function isUrl(path: string): boolean {
  const reg =
    /(((^https?:(?:\/\/)?)(?:[-;:&=+$,\w]+@)?[A-Za-z0-9.-]+(?::\d+)?|(?:www.|[-;:&=+$,\w]+@)[A-Za-z0-9.-]+)((?:\/[+~%/.\w-_]*)?\??(?:[-+=&;%@.\w_]*)#?(?:[\w]*))?)$/;
  return reg.test(path);
}
