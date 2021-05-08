import antDesignLocale from "ant-design-vue/es/locale/zh_CN";
import momentLocale from "moment/dist/locale/zh-cn";

import { generateMessage } from "/@/locales/utils";

const modules = import.meta.globEager("./zh_CN/**/*.ts");

export default {
  message: {
    ...generateMessage(modules, "zh_CN"),
    antDesignLocale,
  },
  momentLocale,
  momentLocaleName: "zh-cn",
};
