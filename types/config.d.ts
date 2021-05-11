import { MenuTypeEnum, MenuModeEnum } from "/@/enums/menu";

export type LocaleType = "zh_CN" | "en";

export interface LocaleSetting {
  showPicker: boolean;
  locale: LocaleType;
  fallback: LocaleType;
  availableLocales: LocaleType[];
}

export interface MenuSetting {
  collapsed: boolean;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
}

export interface AppConfig {
  menuSetting: MenuSetting;
}
