/**
 * 将对象作为参数添加到 URL 中
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

/**
 * 设置页面标题
 * @param title
 * @param subtitle
 */
export function setTitle(title: string, subtitle?: string) {
  if (title) {
    document.title = subtitle ? `${title}-${subtitle}` : title;

    const ua = navigator.userAgent;
    const regex = /\bMicroMessenger\/([\d.]+)/;
    if (regex.test(ua) && /ip(hone|od|ad)/i.test(ua)) {
      const i = document.createElement("iframe");
      i.src = "/favicon.ico";
      i.style.display = "none";
      i.onload = () => {
        setTimeout(() => {
          i.remove();
        }, 50);
      };
      document.body.appendChild(i);
    }
  }
}
