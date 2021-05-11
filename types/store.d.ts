import { MenuModeEnum, MenuTypeEnum } from "/@/enums/menuEnum";

export interface BeforeRestoreInfo {
  menuCollapsed?: boolean;
  menuMode?: MenuModeEnum;
  menuType?: MenuTypeEnum;
}
