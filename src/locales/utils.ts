import { set } from "lodash-es";

export function generateMessage(
  lang: Record<string, Record<string, any>>,
  prefix = "lang"
) {
  const obj: Recordable = {};
  Object.keys(lang).map((key) => {
    const langFileModule = lang[key].default;

    let fileName = key.replace(`./${prefix}/`, "").replace(/^\.\//, "");
    const lastIndex = fileName.lastIndexOf(".");

    fileName = fileName.substring(0, lastIndex);

    const keyList = fileName.split("/");
    const moduleName = keyList.shift();
    const objKey = keyList.join(".");

    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {});
        set(obj[moduleName], objKey, langFileModule);
      } else {
        set(obj, moduleName, langFileModule || {});
      }
    }
  });
  return obj;
}
