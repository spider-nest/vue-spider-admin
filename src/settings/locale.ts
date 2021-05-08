import type { DropdownMenu } from "/@/components/dropdown/types";

export const LOCALE: { [key: string]: LocaleType } = {
  ZH_CN: "zh_CN",
  EN_US: "en",
};

export const localeSetting: LocaleSetting = {
  showPicker: true,
  locale: LOCALE.ZH_CN,
  fallback: LOCALE.ZH_CN,
  availableLocales: [LOCALE.ZH_CN, LOCALE.EN_US],
};

export const localeList: DropdownMenu[] = [
  {
    event: LOCALE.ZH_CN,
    title: "简体中文",
  },
  {
    event: LOCALE.EN_US,
    title: "English",
  },
];
