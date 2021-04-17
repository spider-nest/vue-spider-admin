import type { ProxyOptions } from "vite";

type ProxyList = [string, string][];

type ProxyTargetList = Record<
  string,
  ProxyOptions & { rewrite: (path: string) => string }
>;

const httpsRE = /^https:\/\//;

export function createProxy(list: ProxyList = []) {
  const ret: ProxyTargetList = {};
  for (const [prefix, target] of list) {
    const isHttps = httpsRE.test(target);

    ret[prefix] = {
      target: target,
      changeOrigin: true,
      ws: true,
      rewrite: (path) => path.replace(new RegExp(`^${prefix}`), ""),
      ...(isHttps ? { secure: false } : {}),
    };
  }
  return ret;
}
