import antDesignLocale from "ant-design-vue/es/locale/en_US";
import momentLocale from "moment/dist/locale/eu";

import { generateMessage } from "/@/locales/utils";

const modules = import.meta.globEager("./en/**/*.ts");

export default {
  message: {
    ...generateMessage(modules, "en"),
    antDesignLocale,
  },
  momentLocale,
  momentLocaleName: "eu",
};
