import type { MenuModeEnum, MenuTypeEnum } from "/@/enums/menu";
import type { ThemeEnum } from "/@/enums/app";
import type { AppConfig } from "/#/config";

export interface BeforeRestoreInfo {
  menuCollapsed?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}

export interface AppState {
  darkMode?: ThemeEnum;
  pageLoading: boolean;
  config: AppConfig;
  beforeRestoreInfo: BeforeRestoreInfo;
}
