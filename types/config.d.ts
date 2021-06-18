import {
  MenuTypeEnum,
  MenuModeEnum,
  TriggerEnum,
  MixSidebarTriggerEnum,
} from "/@/enums/menu";
import { ThemeEnum } from "/@/enums/app";
import { CacheTypeEnum } from "/@/enums/cache";

export type LocaleType = "zh_CN" | "en";

export interface LocaleSetting {
  showPicker: boolean;
  locale: LocaleType;
  fallback: LocaleType;
  availableLocales: LocaleType[];
}

export interface MenuSetting {
  bgColor: string;
  fixed: boolean;
  collapsed: boolean;
  canDrag: boolean;
  show: boolean;
  hidden: boolean;
  split: boolean;
  menuWidth: number;
  mode: MenuModeEnum;
  type: MenuTypeEnum;
  theme: ThemeEnum;
  topMenuAlign: "start" | "center" | "end";
  trigger: TriggerEnum;
  accordion: boolean;
  closeMixSidebarOnChange: boolean;
  collapsedShowTitle: boolean;
  mixSideTrigger: MixSidebarTriggerEnum;
  mixSideFixed: boolean;
}

export interface TransitionSetting {
  page: boolean;
  pageLoading: boolean;
  progress: boolean;
}

export interface AppConfig {
  permissionCacheType: CacheTypeEnum;
  themeColor: string;
  grayMode: boolean;
  colorWeak: boolean;
  menuSetting: MenuSetting;
  transitionSetting: TransitionSetting;
  removeAllPending: boolean;
  removeAllFeedbackInfo: boolean;
}
