import { MenuTypeEnum, MenuModeEnum } from "/@/enums/menu";
import { CacheTypeEnum } from "/@/enums/cache";

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

export interface TransitionSetting {
  page: boolean;
  progress: boolean;
}

export interface AppConfig {
  permissionCacheType: CacheTypeEnum;
  themeColor: string;
  grayMode: boolean;
  colorWeak: boolean;
  menuSetting: MenuSetting;
  transitionSetting: TransitionSetting;
}
